import { describe, expect, it } from 'vitest';
import {
  DEFAULT_ROSTER_SIZE,
  filterEmployees,
  generateEmployees,
  paginate,
  sortEmployees,
} from '@shared/employees';
import {
  DEPARTMENTS,
  DEPARTMENT_BY_ROSTER_NAME,
  DEPARTMENT_FILTERS,
  DEPARTMENT_NAMES,
  departmentByRosterName,
} from '@shared/catalog';
import type { AIEmployee } from '@shared/types';

const roster: AIEmployee[] = generateEmployees();

describe('roster generation', () => {
  it('produces the full catalogue', () => {
    expect(roster).toHaveLength(DEFAULT_ROSTER_SIZE);
  });

  it('is deterministic across calls', () => {
    expect(generateEmployees()).toEqual(generateEmployees());
  });

  it('uses ids that are unique and well-formed', () => {
    const ids = new Set(roster.map((employee) => employee.id));
    expect(ids.size).toBe(roster.length);
    for (const id of ids) expect(id).toMatch(/^EMP-\d{4}$/);
  });

  it('keeps every field inside a sane range', () => {
    for (const employee of roster) {
      expect(employee.dailyRate).toBeGreaterThanOrEqual(39.99);
      expect(employee.dailyRate).toBeLessThanOrEqual(89.99);
      expect(employee.rating).toBeGreaterThanOrEqual(4.5);
      expect(employee.rating).toBeLessThanOrEqual(5);
      expect(Number.isInteger(employee.ownershipPrice)).toBe(true);
      expect(employee.capabilities.length).toBeGreaterThan(0);
      expect(DEPARTMENT_NAMES).toContain(employee.department);
    }
  });

  /**
   * Regression: the old generator called Math.random(), so prices and ratings
   * changed on every reload and never matched the API's copy of the roster.
   */
  it('does not depend on Math.random', () => {
    const spy = Math.random;
    Math.random = () => {
      throw new Error('Math.random must not be used in roster generation');
    };
    try {
      expect(() => generateEmployees()).not.toThrow();
    } finally {
      Math.random = spy;
    }
  });
});

describe('department catalogue', () => {
  /**
   * Regression: department counts were joined on the display label, so the
   * roster's "HR" never matched the catalogue's "Human Resources" and every HR
   * employee vanished from the totals (875 reported instead of 1,000).
   */
  it('maps every roster department name to display metadata', () => {
    for (const rosterName of DEPARTMENT_NAMES) {
      expect(departmentByRosterName(rosterName), `no metadata for "${rosterName}"`).toBeDefined();
    }
    expect(Object.keys(DEPARTMENT_BY_ROSTER_NAME)).toHaveLength(DEPARTMENTS.length);
  });

  it('counts every employee exactly once across departments', () => {
    const perDepartment = new Map<string, number>();
    for (const employee of roster) {
      perDepartment.set(employee.department, (perDepartment.get(employee.department) ?? 0) + 1);
    }
    const total = DEPARTMENT_NAMES.reduce(
      (sum, rosterName) => sum + (perDepartment.get(rosterName) ?? 0),
      0,
    );
    expect(total).toBe(roster.length);
  });
});

describe('filtering', () => {
  /**
   * Regression: the Employees page filtered on short labels ("Support") that
   * never matched the stored department ("Customer Support"), so that chip
   * always returned zero results.
   */
  it('exposes a filter option for every department present in the data', () => {
    const departmentsInData = new Set(roster.map((employee) => employee.department));
    for (const department of departmentsInData) {
      expect(DEPARTMENT_FILTERS).toContain(department);
    }
  });

  it('returns a non-empty result for every department filter', () => {
    for (const department of DEPARTMENT_FILTERS) {
      expect(filterEmployees(roster, { department }).length, `department "${department}" matched nothing`).toBeGreaterThan(0);
    }
  });

  it('matches on name, role and department', () => {
    expect(filterEmployees(roster, { q: 'support' }).length).toBeGreaterThan(0);
    expect(filterEmployees(roster, { q: 'zzzz-no-match' })).toHaveLength(0);
  });

  it('filters by status and minimum rating', () => {
    expect(filterEmployees(roster, { status: 'available' }).every((e) => e.status === 'available')).toBe(true);
    expect(filterEmployees(roster, { minRating: 4.9 }).every((e) => e.rating >= 4.9)).toBe(true);
  });
});

describe('sorting and pagination', () => {
  it('sorts by rating in both directions', () => {
    const desc = sortEmployees(roster, 'rating', 'desc');
    expect(desc[0].rating).toBeGreaterThanOrEqual(desc[desc.length - 1].rating);
    const asc = sortEmployees(roster, 'rating', 'asc');
    expect(asc[0].rating).toBeLessThanOrEqual(asc[asc.length - 1].rating);
  });

  it('clamps pagination instead of returning an empty out-of-range page', () => {
    const page = paginate(roster, 999, 24);
    expect(page.data.length).toBeGreaterThan(0);
    expect(page.totalPages).toBe(Math.ceil(roster.length / 24));
  });

  it('caps page size', () => {
    expect(paginate(roster, 1, 10_000).pageSize).toBe(200);
  });
});
