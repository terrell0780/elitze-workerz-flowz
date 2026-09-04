/**
 * Domain types are defined once in `/shared` (see `shared/types.ts`) and
 * re-exported here so the client and the API can never drift apart.
 */
export type * from '@shared/types';
