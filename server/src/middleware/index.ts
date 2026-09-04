import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { ZodError, type ZodSchema } from 'zod';
import { HttpError } from '../lib/errors';
import { logger } from '../lib/logger';
import { verifyAdminToken } from '../lib/adminToken';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

/** Assigns (or forwards) a correlation id on every request. */
export const requestId: RequestHandler = (req, res, next) => {
  const incoming = req.header('x-request-id');
  req.requestId = incoming && incoming.length <= 128 ? incoming : randomUUID();
  res.setHeader('x-request-id', req.requestId);
  next();
};

export const requestLogger: RequestHandler = (req, res, next) => {
  const startedAt = process.hrtime.bigint();
  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    const payload = {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Math.round(durationMs * 100) / 100,
      ip: req.ip,
    };
    if (res.statusCode >= 500) logger.error(payload, 'request failed');
    else if (res.statusCode >= 400) logger.warn(payload, 'request rejected');
    else logger.info(payload, 'request completed');
  });
  next();
};

/** Validates `req.body` / `req.query` / `req.params` against a zod schema. */
export function validate(schema: { body?: ZodSchema; query?: ZodSchema; params?: ZodSchema }): RequestHandler {
  return (req, _res, next) => {
    try {
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.query) req.query = schema.query.parse(req.query) as typeof req.query;
      if (schema.params) req.params = schema.params.parse(req.params) as typeof req.params;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(HttpError.badRequest('Validation failed', error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }))));
        return;
      }
      next(error);
    }
  };
}

/** Requires a valid admin bearer token. */
export const requireAdmin: RequestHandler = (req, _res, next) => {
  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  const claims = token ? verifyAdminToken(token) : null;
  if (!claims) {
    next(HttpError.unauthorized('A valid admin token is required'));
    return;
  }
  next();
};

export function notFound(_req: Request, _res: Response, next: NextFunction): void {
  next(HttpError.notFound('Route not found'));
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message, details: err.details }, requestId: req.requestId });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: err.issues },
      requestId: req.requestId,
    });
    return;
  }

  logger.error({ err, requestId: req.requestId }, 'unhandled error');
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Internal server error' },
    requestId: req.requestId,
  });
}
