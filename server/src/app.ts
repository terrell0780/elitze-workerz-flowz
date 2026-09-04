import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { collectConfigWarnings, env, isProduction } from './config/env';
import { errorHandler, notFound, requestId, requestLogger } from './middleware';
import { authRouter } from './routes/auth';
import { catalogRouter } from './routes/catalog';
import { deploymentsRouter } from './routes/deployments';
import { employeesRouter } from './routes/employees';
import { healthRouter } from './routes/health';
import { metricsRouter } from './routes/metrics';
import { logger } from './lib/logger';

export function createApp(): Express {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(requestId);
  app.use(requestLogger);

  app.use(
    helmet({
      // The single-file client build inlines scripts/styles, so allow inline
      // sources rather than disabling CSP entirely.
      contentSecurityPolicy: isProduction
        ? {
            useDefaults: true,
            directives: {
              'default-src': ["'self'"],
              'script-src': ["'self'", "'unsafe-inline'"],
              'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
              'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
              'img-src': ["'self'", 'data:', 'https:'],
              'connect-src': ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
              'object-src': ["'none'"],
              'frame-ancestors': ["'none'"],
            },
          }
        : false,
      hsts: isProduction ? { maxAge: 15552000, includeSubDomains: true } : false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }),
  );

  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',').map((o) => o.trim()),
      credentials: false,
      maxAge: 600,
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: '256kb' }));
  app.use(express.urlencoded({ extended: false, limit: '256kb' }));

  // Baseline abuse protection for every API route.
  app.use(
    '/api/',
    rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      max: env.RATE_LIMIT_MAX,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: { error: { code: 'RATE_LIMITED', message: 'Too many requests, please slow down' } },
    }),
  );

  // Credential endpoints get a much tighter budget.
  app.use(
    '/api/v1/auth/pin',
    rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      max: env.AUTH_RATE_LIMIT_MAX,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: { error: { code: 'RATE_LIMITED', message: 'Too many PIN attempts. Try again later.' } },
    }),
  );

  app.get('/', (_req, res) => {
    res.json({
      service: 'workerznow-api',
      version: env.APP_VERSION,
      docs: '/health',
      api: '/api/v1',
    });
  });

  app.use('/health', healthRouter);

  app.use('/api/v1', catalogRouter);
  app.use('/api/v1', employeesRouter);
  app.use('/api/v1', deploymentsRouter);
  app.use('/api/v1', metricsRouter);
  app.use('/api/v1', authRouter);

  app.use('/api', notFound);

  // In production the API also serves the compiled client so the whole product
  // can ship as one container.
  const clientDist = resolve(process.cwd(), 'dist/client');
  if (isProduction && existsSync(clientDist)) {
    app.use(express.static(clientDist, { index: false, maxAge: '1h' }));
    app.get(/^\/(?!api|health).*/, (_req, res) => {
      res.sendFile(resolve(clientDist, 'index.html'));
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  for (const warning of collectConfigWarnings()) {
    logger.warn({ guardrail: warning }, 'configuration warning');
  }

  return app;
}
