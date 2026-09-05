import { describe, expect, it } from 'vitest';
import { issueAdminToken, verifyAdminToken, verifyPin } from '../server/src/lib/adminToken';

describe('PIN verification', () => {
  it('accepts the configured PIN', () => {
    expect(verifyPin(process.env.ADMIN_PIN!)).toBe(true);
  });

  it('rejects a wrong PIN of the same length', () => {
    const wrong = process.env.ADMIN_PIN === '0000' ? '1111' : '0000';
    expect(verifyPin(wrong)).toBe(false);
  });

  it('rejects a PIN of a different length without throwing', () => {
    expect(verifyPin('')).toBe(false);
    expect(verifyPin('123456789')).toBe(false);
  });
});

describe('admin tokens', () => {
  it('round-trips a freshly issued token', () => {
    const { token } = issueAdminToken();
    const claims = verifyAdminToken(token);
    expect(claims?.sub).toBe('admin');
    expect(claims?.exp).toBeGreaterThan(Date.now() / 1000);
  });

  it('rejects a tampered payload', () => {
    const { token } = issueAdminToken();
    const [payload, signature] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ sub: 'admin', exp: Math.floor(Date.now() / 1000) + 600, jti: 'x' })).toString('base64url');
    expect(verifyAdminToken(`${forged}.${signature}`)).toBeNull();
    expect(verifyAdminToken(`${payload}.${signature.slice(0, -2)}xx`)).toBeNull();
  });

  it('rejects an expired token', () => {
    const expiredPayload = Buffer.from(
      JSON.stringify({ sub: 'admin', exp: Math.floor(Date.now() / 1000) - 60, jti: 'x' }),
    ).toString('base64url');
    expect(verifyAdminToken(`${expiredPayload}.signature`)).toBeNull();
  });

  it('rejects malformed input', () => {
    expect(verifyAdminToken('')).toBeNull();
    expect(verifyAdminToken('nonsense')).toBeNull();
  });
});
