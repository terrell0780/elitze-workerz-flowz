import { randomUUID } from 'node:crypto';
import { getDb } from '../db';
import type { ActivityEvent, Deployment, DeploymentStatus } from '@shared/types';
import { HttpError } from '../lib/errors';
import { getEmployeeById } from './employees';

interface DeploymentRow {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  daily_rate: number;
  status: string;
  created_at: string;
}

function toDeployment(row: DeploymentRow): Deployment {
  return {
    id: row.id,
    employeeId: row.employee_id,
    employeeName: row.employee_name,
    department: row.department,
    dailyRate: row.daily_rate,
    status: row.status as DeploymentStatus,
    createdAt: row.created_at,
  };
}

export function listDeployments(status?: DeploymentStatus): Deployment[] {
  const db = getDb();
  const rows = status
    ? (db.prepare('SELECT * FROM deployments WHERE status = ? ORDER BY created_at DESC').all(status) as DeploymentRow[])
    : (db.prepare('SELECT * FROM deployments ORDER BY created_at DESC').all() as DeploymentRow[]);
  return rows.map(toDeployment);
}

export interface CreateDeploymentInput {
  employeeId: string;
  department?: string;
  dailyRate?: number;
  status?: DeploymentStatus;
}

export function createDeployment(input: CreateDeploymentInput): Deployment {
  const employee = getEmployeeById(input.employeeId);

  const deployment: Deployment = {
    id: `DEP-${randomUUID().slice(0, 8).toUpperCase()}`,
    employeeId: employee.id,
    employeeName: employee.name,
    department: input.department ?? employee.department,
    dailyRate: input.dailyRate ?? employee.dailyRate,
    status: input.status ?? 'provisioning',
    createdAt: new Date().toISOString(),
  };

  getDb()
    .prepare(
      `INSERT INTO deployments (id, employee_id, employee_name, department, daily_rate, status, created_at)
       VALUES (@id, @employeeId, @employeeName, @department, @dailyRate, @status, @createdAt)`,
    )
    .run(deployment);

  recordActivity(employee.name, `Deployed to ${deployment.department}`);

  return deployment;
}

export function deleteDeployment(id: string): void {
  const result = getDb().prepare('DELETE FROM deployments WHERE id = ?').run(id);
  if (result.changes === 0) throw HttpError.notFound(`Deployment ${id} not found`);
}

export function recordActivity(employee: string, action: string): ActivityEvent {
  const event: ActivityEvent = {
    id: `EVT-${randomUUID().slice(0, 8).toUpperCase()}`,
    employee,
    action,
    createdAt: new Date().toISOString(),
  };
  getDb()
    .prepare('INSERT INTO activity_events (id, employee, action, created_at) VALUES (@id, @employee, @action, @createdAt)')
    .run(event);
  return event;
}

export function listActivity(limit = 8): ActivityEvent[] {
  const rows = getDb()
    .prepare('SELECT id, employee, action, created_at FROM activity_events ORDER BY created_at DESC LIMIT ?')
    .all(limit) as { id: string; employee: string; action: string; created_at: string }[];

  return rows.map((row) => ({
    id: row.id,
    employee: row.employee,
    action: row.action,
    createdAt: row.created_at,
  }));
}
