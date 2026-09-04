/**
 * Deterministic pseudo-random number generation.
 *
 * The roster used to be generated with `Math.random()`, which meant ratings,
 * prices and deployment counts changed on every reload (and would never match
 * between the browser and the API). Seeding makes the catalogue reproducible:
 * the same seed always yields byte-identical data on both sides of the wire.
 */

/** Mulberry32 — small, fast, well-distributed 32-bit PRNG. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Rng {
  /** Float in [0, 1). */
  next(): number;
  /** Integer in [min, max]. */
  int(min: number, max: number): number;
  /** Float in [min, max) rounded to `decimals` places. */
  float(min: number, max: number, decimals?: number): number;
  pick<T>(items: readonly T[]): T;
}

export function createRng(seed: number): Rng {
  const next = mulberry32(seed);
  const float = (min: number, max: number, decimals = 2): number => {
    const raw = min + next() * (max - min);
    const factor = 10 ** decimals;
    return Math.round(raw * factor) / factor;
  };
  return {
    next,
    int: (min, max) => Math.floor(min + next() * (max - min + 1)),
    float,
    pick: <T,>(items: readonly T[]): T => items[Math.floor(next() * items.length)],
  };
}

/** Stable 32-bit hash — lets us derive a per-record seed from a string key. */
export function hashString(input: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
