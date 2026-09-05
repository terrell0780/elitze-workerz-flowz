import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { env } from '../config/env';
import { logger } from '../lib/logger';
import { generateEmployees } from '@shared/employees';
import { generateActivity } from '@shared/employees';

/**
 * SQLite is used for local/dev/CI so the stack boots with zero external
 * services. The repository layer is the only place that touches SQL, so
 * swapping in Postgres is a single-file change.
 */

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  // `:memory:` keeps tests fast and isolated from the on-disk dev database.
  const file = env.DATABASE_FILE === ':memory:' ? ':memory:' : resolve(process.cwd(), env.DATABASE_FILE);
  if (file !== ':memory:') mkdirSync(dirname(file), { recursive: true });

  db = new Database(file);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  migrate(db);
  if (env.SEED_DATABASE) seed(db);

  logger.info({ file }, 'database ready');
  return db;
}

export function closeDb(): void {
  db?.close();
  db = null;
}

export function migrate(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id               TEXT PRIMARY KEY,
      name             TEXT NOT NULL,
      role             TEXT NOT NULL,
      department       TEXT NOT NULL,
      description      TEXT NOT NULL,
      capabilities     TEXT NOT NULL,
      daily_rate       REAL NOT NULL,
      ownership_price  INTEGER NOT NULL,
      deployed         INTEGER NOT NULL,
      rating           REAL NOT NULL,
      avatar           TEXT NOT NULL,
      status           TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS deployments (
      id            TEXT PRIMARY KEY,
      employee_id   TEXT NOT NULL REFERENCES employees(id),
      employee_name TEXT NOT NULL,
      department    TEXT NOT NULL,
      daily_rate    REAL NOT NULL,
      status        TEXT NOT NULL,
      created_at    TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activity_events (
      id         TEXT PRIMARY KEY,
      employee   TEXT NOT NULL,
      action     TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
    CREATE INDEX IF NOT EXISTS idx_employees_status     ON employees(status);
    CREATE INDEX IF NOT EXISTS idx_employees_rating     ON employees(rating);
    CREATE INDEX IF NOT EXISTS idx_deployments_created  ON deployments(created_at DESC);
  `);
}

export function seed(database: Database.Database): void {
  const row = database.prepare('SELECT COUNT(*) AS count FROM employees').get() as { count: number };
  if (row.count > 0) return;

  const insertEmployee = database.prepare(`
    INSERT INTO employees (id, name, role, department, description, capabilities, daily_rate, ownership_price, deployed, rating, avatar, status)
    VALUES (@id, @name, @role, @department, @description, @capabilities, @dailyRate, @ownershipPrice, @deployed, @rating, @avatar, @status)
  `);
  const insertActivity = database.prepare(`
    INSERT INTO activity_events (id, employee, action, created_at) VALUES (@id, @employee, @action, @createdAt)
  `);

  const employees = generateEmployees();
  const activity = generateActivity(employees, 8);
  const now = Date.now();

  const insertDeployment = database.prepare(`
    INSERT INTO deployments (id, employee_id, employee_name, department, daily_rate, status, created_at)
    VALUES (@id, @employeeId, @employeeName, @department, @dailyRate, @status, @createdAt)
  `);

  /** A small starting workforce so the dashboard reflects real state on first boot. */
  const seedDeploymentIds = ['EMP-0003', 'EMP-0128', 'EMP-0257'];

  const run = database.transaction(() => {
    for (const employee of employees) {
      insertEmployee.run({ ...employee, capabilities: JSON.stringify(employee.capabilities) });
    }
    activity.forEach((event, i) => {
      insertActivity.run({
        id: `EVT-${String(i + 1).padStart(4, '0')}`,
        employee: event.employee,
        action: event.action,
        createdAt: new Date(now - (i + 1) * 7 * 60_000).toISOString(),
      });
    });
    seedDeploymentIds.forEach((id, i) => {
      const employee = employees.find((candidate) => candidate.id === id);
      if (!employee) return;
      insertDeployment.run({
        id: `DEP-SEED-${String(i + 1).padStart(4, '0')}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        dailyRate: employee.dailyRate,
        status: 'active',
        createdAt: new Date(now - (i + 1) * 90 * 60_000).toISOString(),
      });
    });
  });

  run();
  logger.info({ employees: employees.length, activity: activity.length }, 'database seeded');
}
