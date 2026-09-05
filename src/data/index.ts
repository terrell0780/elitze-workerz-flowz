/**
 * Client data layer.
 *
 * Static catalogue values now come from `/shared`, the same module the API
 * serves, so the UI and the backend always agree. The client keeps a local
 * generator only as an offline fallback (see `src/lib/hooks.ts`).
 */
export {
  DEPARTMENTS,
  DEPARTMENT_FILTERS,
  DEPARTMENT_NAMES,
  EXECUTIVE_AIS,
  PLATFORM_STATS,
  PRICING_TIERS,
} from '@shared/catalog';

export {
  DEFAULT_ROSTER_SIZE,
  filterEmployees,
  generateActivity,
  generateEmployees,
  paginate,
  sortEmployees,
} from '@shared/employees';

/** Backwards-compatible aliases used by the legacy dashboard widgets. */
export { DEPARTMENTS as departments, EXECUTIVE_AIS as executiveAIs, PRICING_TIERS as pricingTiers, PLATFORM_STATS as stats } from '@shared/catalog';
