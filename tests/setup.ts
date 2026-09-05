import { rmSync } from 'node:fs';

/**
 * Test bootstrap.
 *
 * Runs before any test module is imported, so environment-dependent config
 * (database location, log level, secrets) is in place before `env.ts` parses it.
 */
process.env.NODE_ENV = 'test';
process.env.DATABASE_FILE = ':memory:';
process.env.SEED_DATABASE = 'true';
process.env.LOG_LEVEL = 'silent';
process.env.ADMIN_PIN = '4321';
process.env.ADMIN_TOKEN_SECRET = 'test-secret-that-is-long-enough-0001';
process.env.CORS_ORIGIN = '*';

// Ensure a stale dev database never leaks into a test run.
rmSync('.data', { recursive: true, force: true });
