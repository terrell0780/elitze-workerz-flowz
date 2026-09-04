import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, api } from '../src/lib/api';

/**
 * The client wrapper is the piece that turns transport failures into typed
 * errors the UI can render, so its mapping behaviour is worth pinning down.
 */
describe('api client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('serialises query parameters and drops empty ones', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ data: [], total: 0 }), { status: 200 }));

    await api.listEmployees({ q: 'nova', department: 'All' });

    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('/api/v1/employees?q=nova');
    expect(String(url)).not.toContain('department');
  });

  it('maps error envelopes onto ApiError', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: { code: 'NOT_FOUND', message: 'missing' }, requestId: 'abc' }), {
        status: 404,
      }),
    );

    await expect(api.getEmployee('EMP-9999')).rejects.toMatchObject({
      status: 404,
      code: 'NOT_FOUND',
      requestId: 'abc',
    });
  });

  it('surfaces network failures as status 0', async () => {
    vi.mocked(fetch).mockRejectedValue(new TypeError('Failed to fetch'));

    const error = await api.getMetrics().catch((err: unknown) => err);
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).code).toBe('NETWORK_ERROR');
    expect(ApiError.isOffline(error)).toBe(true);
  });

  it('posts a JSON body for deployments', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: 'DEP-1' }), { status: 201 }));

    await api.createDeployment({ employeeId: 'EMP-0001', status: 'active' });

    const [, init] = fetchMock.mock.calls[0];
    expect(init?.method).toBe('POST');
    expect(JSON.parse(String(init?.body))).toEqual({ employeeId: 'EMP-0001', status: 'active' });
  });
});
