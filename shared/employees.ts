import { AVATAR_GRADIENTS, CAPABILITIES_BY_DEPARTMENT, DEPARTMENT_NAMES, ROLES_BY_DEPARTMENT } from './catalog';
import { createRng, hashString } from './rng';
import type { AIEmployee, EmployeeStatus } from './types';

/**
 * Deterministic roster generation.
 *
 * Replaces the previous `Math.random()` implementation so that:
 *  - the browser and the API produce identical records (no hydration/fetch drift),
 *  - prices/ratings stop flickering between reloads,
 *  - tests can assert against stable fixtures.
 */

export const DEFAULT_ROSTER_SIZE = 1000;
export const DEFAULT_ROSTER_SEED = 20240917;

const NAME_PREFIXES = ['Nova', 'Orion', 'Atlas', 'Echo', 'Pulse', 'Vertex', 'Nexus', 'Cipher', 'Axiom', 'Prism'];
const NAME_SUFFIXES = ['Pro', 'Plus', 'Elite', 'Prime', 'Core', 'Edge', 'Flow', 'Sync', 'Link', 'Hub'];

export function employeeId(index: number): string {
  return `EMP-${String(index).padStart(4, '0')}`;
}

export function employeeName(index: number): string {
  const prefix = NAME_PREFIXES[index % NAME_PREFIXES.length];
  const suffix = NAME_SUFFIXES[Math.floor(index / NAME_PREFIXES.length) % NAME_SUFFIXES.length];
  return `${prefix} ${suffix}`;
}

function statusFor(index: number): EmployeeStatus {
  if (index % 20 === 0) return 'enterprise-only';
  if (index % 7 === 0) return 'busy';
  return 'available';
}

export interface GenerateOptions {
  total?: number;
  seed?: number;
}

export function generateEmployees(options: GenerateOptions = {}): AIEmployee[] {
  const total = options.total ?? DEFAULT_ROSTER_SIZE;
  const seed = options.seed ?? DEFAULT_ROSTER_SEED;
  const rng = createRng(seed);

  const employees: AIEmployee[] = [];
  const perDepartment = Math.ceil(total / DEPARTMENT_NAMES.length);
  let index = 1;

  for (let d = 0; d < DEPARTMENT_NAMES.length && employees.length < total; d++) {
    const department = DEPARTMENT_NAMES[d];
    const roles = ROLES_BY_DEPARTMENT[department];
    const capabilities = CAPABILITIES_BY_DEPARTMENT[department];

    for (let i = 0; i < perDepartment && employees.length < total; i++, index++) {
      const role = roles[i % roles.length];
      // 39.99 base, +$10 every 10 employees, capped at 6 steps.
      const dailyRate = Math.round((39.99 + (Math.floor(index / 10) % 6) * 10) * 100) / 100;
      const ownershipPrice = Math.round(dailyRate * 20 + rng.next() * 500);

      employees.push({
        id: employeeId(index),
        name: employeeName(index),
        role,
        department,
        description: `LangGraph-orchestrated ${role.toLowerCase()} trained for ${department.toLowerCase()} operations, supervised by Lindy and executed by Hermes.`,
        capabilities: ['LangGraph orchestration', ...capabilities].slice(0, 4 + (index % 2)),
        dailyRate,
        ownershipPrice,
        deployed: rng.int(50, 549),
        rating: rng.float(4.5, 5, 1),
        avatar: AVATAR_GRADIENTS[d % AVATAR_GRADIENTS.length],
        status: statusFor(index),
      });
    }
  }

  return employees;
}

export const EMPLOYEE_SORT_FIELDS = ['name', 'rating', 'dailyRate', 'deployed'] as const;
export type EmployeeSortField = (typeof EMPLOYEE_SORT_FIELDS)[number];

export function sortEmployees<T extends AIEmployee>(items: T[], sort: EmployeeSortField, order: 'asc' | 'desc'): T[] {
  const direction = order === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name) * direction;
    return (a[sort] - b[sort]) * direction;
  });
}

export function filterEmployees<T extends AIEmployee>(
  items: T[],
  query: { q?: string; department?: string; status?: EmployeeStatus; minRating?: number },
): T[] {
  const needle = query.q?.trim().toLowerCase() ?? '';
  return items.filter((employee) => {
    if (query.department && query.department !== 'All' && employee.department !== query.department) return false;
    if (query.status && employee.status !== query.status) return false;
    if (typeof query.minRating === 'number' && employee.rating < query.minRating) return false;
    if (!needle) return true;
    return (
      employee.name.toLowerCase().includes(needle) ||
      employee.role.toLowerCase().includes(needle) ||
      employee.department.toLowerCase().includes(needle)
    );
  });
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const safePageSize = Math.min(Math.max(pageSize, 1), 200);
  const totalPages = Math.max(Math.ceil(items.length / safePageSize), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * safePageSize;
  return { page: safePage, pageSize: safePageSize, total: items.length, totalPages, data: items.slice(start, start + safePageSize) };
}

/** Deterministic activity feed derived from the roster (no `Math.random()`). */
export function generateActivity(employees: AIEmployee[], count = 6): { employee: string; action: string }[] {
  const actions = [
    'Resolved 12 tickets',
    'Closed 3 deals',
    'Created content',
    'Reconciled ledger',
    'Reviewed 8 pull requests',
    'Scheduled 14 interviews',
    'Optimized a workflow',
    'Processed 22 invoices',
  ];
  const seedEmployees = employees.slice(0, Math.max(count, actions.length));
  return Array.from({ length: Math.min(count, seedEmployees.length) }, (_, i) => {
    const employee = seedEmployees[i];
    const rng = createRng(hashString(employee.id));
    return { employee: employee.name, action: rng.pick(actions) };
  });
}
