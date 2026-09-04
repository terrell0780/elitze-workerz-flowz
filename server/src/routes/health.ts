import { Router } from 'express';
import type { HealthResponse, ReadinessResponse } from '@shared/types';
import { buildId, env } from '../config/env';
import { getDb } from '../db';

const startedAt = Date.now();

export const healthRouter: Router = Router();

/** Liveness probe — never touches dependencies, safe for orchestrators. */
healthRouter.get('/', (_req, res) => {
  const body: HealthResponse = {
    status: 'ok',
    service: 'zevanto-api',
    version: env.APP_VERSION,
    environment: env.NODE_ENV,
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  };
  res.json(body);
});

/** Readiness probe — verifies the database is reachable. */
healthRouter.get('/ready', (_req, res) => {
  let database: 'up' | 'down' = 'up';
  try {
    getDb().prepare('SELECT 1').get();
  } catch {
    database = 'down';
  }

  const body: ReadinessResponse = {
    status: database === 'up' ? 'ok' : 'degraded',
    service: 'zevanto-api',
    version: env.APP_VERSION,
    environment: env.NODE_ENV,
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
    checks: { database },
  };
  res.status(body.status === 'ok' ? 200 : 503).json(body);
});

/** Build/version metadata, useful for release verification. */
healthRouter.get('/version', (_req, res) => {
  res.json({ version: env.APP_VERSION, commit: env.COMMIT_SHA, buildId, node: process.version });
});
