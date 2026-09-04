import pino from 'pino';
import { env, isTest } from '../config/env';

/**
 * Structured JSON logger.
 *
 * `pino` writes newline-delimited JSON so logs stay greppable and ingestable by
 * any log pipeline. Redacted fields ensure credentials/PINs never land in logs.
 */
export const logger = pino({
  level: isTest ? 'silent' : env.LOG_LEVEL,
  base: { service: 'zevanto-api', env: env.NODE_ENV, version: env.APP_VERSION },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.pin',
      'body.pin',
      '*.pin',
      '*.password',
      '*.token',
    ],
    censor: '[redacted]',
  },
  ...(env.NODE_ENV === 'production' || isTest
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'HH:MM:ss', ignore: 'pid,hostname' },
        },
      }),
});

export type Logger = typeof logger;
