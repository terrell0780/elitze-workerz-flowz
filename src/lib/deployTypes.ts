import type { AIEmployee } from '@shared/types';

/** A roster entry enriched with a recommendation score for the deploy wizard. */
export interface PageCandidate extends AIEmployee {
  match: number;
  reason: string;
}
