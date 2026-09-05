import { createApp } from './app';
import { env } from './config/env';
import { closeDb } from './db';
import { logger } from './lib/logger';

const app = createApp();

const server = app.listen(env.PORT, env.HOST, () => {
  logger.info(
    { port: env.PORT, host: env.HOST, env: env.NODE_ENV, version: env.APP_VERSION },
    'workerznow api listening',
  );
});

server.keepAliveTimeout = 65_000;
server.headersTimeout = 70_000;

/** Fail loudly instead of running with a broken global state. */
process.on('unhandledRejection', (reason) => {
  logger.error({ err: reason }, 'unhandled promise rejection');
  shutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'uncaught exception');
  shutdown('uncaughtException');
});

let shuttingDown = false;

function shutdown(signal: string): void {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, 'shutting down');

  server.close((error) => {
    if (error) logger.error({ err: error }, 'error closing http server');
    try {
      closeDb();
    } catch (dbError) {
      logger.error({ err: dbError }, 'error closing database');
    }
    process.exit(error ? 1 : 0);
  });

  // Never hang forever on a stuck socket.
  setTimeout(() => {
    logger.warn('forced shutdown after timeout');
    process.exit(1);
  }, 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export { app, server };
