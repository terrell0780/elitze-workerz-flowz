import 'dotenv/config';
import { z } from 'zod';
import { createHash } from 'node:crypto';

/**
 * Environment configuration.
 *
 * Nothing in the app reads `process.env` directly — every value is validated
 * once at boot so a missing/invalid setting fails fast instead of surfacing as
 * an undefined behaviour at request time.
 */

const booleanish = z
  .union([z.boolean(), z.enum(['true', 'false', '1', '0'])])
  .transform((value) => value === true || value === 'true' || value === '1');

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().max(65535).default(4000),
  HOST: z.string().min(1).default('0.0.0.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  CORS_ORIGIN: z.string().default('*'),
  DATABASE_FILE: z.string().default('.data/zevanto.db'),
  SEED_DATABASE: booleanish.default(true),

  /** PIN gate for admin actions. Must be overridden in any deployed environment. */
  ADMIN_PIN: z.string().regex(/^\d{4,8}$/, 'ADMIN_PIN must be 4-8 digits').default('1234'),
  ADMIN_TOKEN_SECRET: z.string().min(16, 'ADMIN_TOKEN_SECRET must be at least 16 characters').default('dev-only-insecure-secret-change-me'),
  ADMIN_TOKEN_TTL_SECONDS: z.coerce.number().int().positive().default(3600),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(1000),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),

  APP_VERSION: z.string().default('0.1.0'),
  COMMIT_SHA: z.string().default('unknown'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.issues.map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n');
  console.error(`\n[config] Invalid environment configuration:\n${formatted}\n`);
  process.exit(1);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

/** Deployment guardrails evaluated at boot. */
export function collectConfigWarnings(): string[] {
  const warnings: string[] = [];
  if (isProduction && env.ADMIN_PIN === '1234') {
    warnings.push('ADMIN_PIN is still the default "1234". Set a unique value before shipping.');
  }
  if (isProduction && env.ADMIN_TOKEN_SECRET.startsWith('dev-only')) {
    warnings.push('ADMIN_TOKEN_SECRET is the development default. Generate one with `openssl rand -hex 32`.');
  }
  if (isProduction && env.CORS_ORIGIN === '*') {
    warnings.push('CORS_ORIGIN is "*". Restrict it to the deployed web origin(s).');
  }
  return warnings;
}

/** Short fingerprint so logs can identify which build is running. */
export const buildId = createHash('sha256').update(`${env.APP_VERSION}:${env.COMMIT_SHA}`).digest('hex').slice(0, 12);
