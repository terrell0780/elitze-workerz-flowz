import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import { env } from '../config/env';

/**
 * Admin session tokens.
 *
 * The PIN check used to live in the browser (`pin.join('') === '1234'`), which
 * shipped the credential to every visitor. The PIN is now verified server-side
 * with a constant-time comparison and exchanged for a short-lived HMAC token.
 */

export interface AdminClaims {
  sub: string;
  exp: number;
  jti: string;
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString('base64url');
}

function sign(payload: string): string {
  return createHmac('sha256', env.ADMIN_TOKEN_SECRET).update(payload).digest('base64url');
}

export function verifyPin(pin: string): boolean {
  const provided = Buffer.from(pin, 'utf8');
  const expected = Buffer.from(env.ADMIN_PIN, 'utf8');
  // timingSafeEqual throws on length mismatch, so compare a fixed-size digest instead.
  const a = createHmac('sha256', 'pin-a').update(provided).digest();
  const b = createHmac('sha256', 'pin-a').update(expected).digest();
  return timingSafeEqual(a, b);
}

export function issueAdminToken(subject = 'admin'): { token: string; expiresAt: string } {
  const exp = Math.floor(Date.now() / 1000) + env.ADMIN_TOKEN_TTL_SECONDS;
  const claims: AdminClaims = { sub: subject, exp, jti: randomUUID() };
  const payload = base64url(JSON.stringify(claims));
  const signature = sign(payload);
  return { token: `${payload}.${signature}`, expiresAt: new Date(exp * 1000).toISOString() };
}

export function verifyAdminToken(token: string): AdminClaims | null {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AdminClaims;
    if (typeof claims.exp !== 'number' || claims.exp * 1000 < Date.now()) return null;
    return claims;
  } catch {
    return null;
  }
}
