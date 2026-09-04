import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware';
import { HttpError } from '../lib/errors';
import { issueAdminToken, verifyAdminToken, verifyPin } from '../lib/adminToken';
import { logger } from '../lib/logger';

export const authRouter: Router = Router();

const pinSchema = z.object({ pin: z.string().regex(/^\d{4}$/, 'PIN must be 4 digits') });

/**
 * Exchanges the admin PIN for a short-lived signed token.
 *
 * The check happens here — never in the browser — and the endpoint is
 * rate-limited at the router level in `app.ts`.
 */
authRouter.post('/auth/pin', validate({ body: pinSchema }), (req, res) => {
  const { pin } = req.body as z.infer<typeof pinSchema>;

  if (!verifyPin(pin)) {
    logger.warn({ requestId: req.requestId }, 'failed admin PIN attempt');
    throw HttpError.unauthorized('Invalid PIN');
  }

  const { token, expiresAt } = issueAdminToken();
  res.json({ token, expiresAt });
});

authRouter.get('/auth/session', (req, res) => {
  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  const claims = token ? verifyAdminToken(token) : null;
  if (!claims) throw HttpError.unauthorized('No valid admin session');
  res.json({ subject: claims.sub, expiresAt: new Date(claims.exp * 1000).toISOString() });
});
