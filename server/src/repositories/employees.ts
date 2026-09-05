import { getDb } from '../db';
import { DEPARTMENT_NAMES, departmentByRosterName } from '@shared/catalog';
import { filterEmployees, paginate, sortEmployees, type EmployeeSortField } from '@shared/employees';
import type { AIEmployee, Department, EmployeeQuery, EmployeeStatus, Paginated } from '@shared/types';
import { HttpError } from '../lib/errors';

interface EmployeeRow {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  capabilities: string;
  daily_rate: number;
  ownership_price: number;
  deployed: number;
  rating: number;
  avatar: string;
  status: string;
}

function toEmployee(row: EmployeeRow): AIEmployee {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    department: row.department,
    description: row.description,
    capabilities: JSON.parse(row.capabilities) as string[],
    dailyRate: row.daily_rate,
    ownershipPrice: row.ownership_price,
    deployed: row.deployed,
    rating: row.rating,
    avatar: row.avatar,
    status: row.status as EmployeeStatus,
  };
}

export function listEmployees(query: EmployeeQuery): Paginated<AIEmployee> {
  // The roster is a fixed 1k catalogue; filtering/sorting in memory keeps the
  // contract identical to the client-side fallback path used when the API is down.
  const rows = getDb().prepare('SELECT * FROM employees').all() as EmployeeRow[];
  const employees = rows.map(toEmployee);

  const filtered = filterEmployees(employees, {
    q: query.q,
    department: query.department,
    status: query.status,
    minRating: query.minRating,
  });

  const sorted = sortEmployees(filtered, (query.sort ?? 'name') as EmployeeSortField, query.order ?? 'asc');
  const page = paginate(sorted, query.page ?? 1, query.pageSize ?? 24);
  return { data: page.data, page: page.page, pageSize: page.pageSize, total: page.total, totalPages: page.totalPages };
}

export function getEmployeeById(id: string): AIEmployee {
  const row = getDb().prepare('SELECT * FROM employees WHERE id = ?').get(id) as EmployeeRow | undefined;
  if (!row) throw HttpError.notFound(`Employee ${id} not found`);
  return toEmployee(row);
}

/**
 * Department counts are computed from the roster (never hard-coded) and joined
 * to display metadata by *roster* name, so no department can silently count 0.
 */
export function listDepartments(): Department[] {
  const rows = getDb()
    .prepare('SELECT department, COUNT(*) AS count FROM employees GROUP BY department')
    .all() as { department: string; count: number }[];

  const counts = new Map(rows.map((row) => [row.department, row.count]));

  return DEPARTMENT_NAMES.flatMap((rosterName) => {
    const metadata = departmentByRosterName(rosterName);
    if (!metadata) return [];
    return [{ ...metadata, employeeCount: counts.get(rosterName) ?? 0 }];
  });
}
