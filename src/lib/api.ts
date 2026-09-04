import type {
  ActivityEvent,
  AIEmployee,
  AuthSuccess,
  Department,
  EmployeeQuery,
  MetricsSummary,
  Paginated,
  Deployment,
  DeploymentStatus,
} from '@shared/types';

/**
 * Typed HTTP client for the Elitze WorkerzNow API.
 *
 * Defaults to a *relative* `/api/v1` base so the app works unchanged in local
 * dev (Vite proxy), preview and production behind the same origin. Set
 * `VITE_API_BASE_URL` only when the API lives on a separate host.
 */
const configuredBase = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '');

export const API_BASE_URL = configuredBase;
export const API_ROOT = `${configuredBase}/api/v1`;
const DEFAULT_TIMEOUT_MS = 8_000;

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;
  public readonly requestId?: string;

  constructor(status: number, code: string, message: string, details?: unknown, requestId?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }

  /** Network/DNS/offline failures never produce a response object. */
  static isOffline(error: unknown): boolean {
    return error instanceof ApiError && error.status === 0;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
  retries?: number;
  headers?: Record<string, string>;
}

function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === '') continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal, timeoutMs = DEFAULT_TIMEOUT_MS, retries = method === 'GET' ? 1 : 0 } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const onAbort = () => controller.abort();
    signal?.addEventListener('abort', onAbort, { once: true });

    try {
      const response = await fetch(`${API_ROOT}${path}`, {
        method,
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
          ...options.headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });

      if (response.status === 204) return undefined as T;

      const text = await response.text();
      const payload = text ? (JSON.parse(text) as unknown) : null;

      if (!response.ok) {
        const errorBody = (payload ?? {}) as { error?: { code?: string; message?: string; details?: unknown }; requestId?: string };
        throw new ApiError(
          response.status,
          errorBody.error?.code ?? 'UNKNOWN_ERROR',
          errorBody.error?.message ?? `Request failed with status ${response.status}`,
          errorBody.error?.details,
          errorBody.requestId,
        );
      }

      return payload as T;
    } catch (error) {
      const aborted = error instanceof DOMException && error.name === 'AbortError';
      lastError = aborted ? new ApiError(0, 'TIMEOUT', 'The request timed out') : apiErrorFrom(error);
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }

    // Only transport failures and server errors are worth retrying. A 4xx is a
    // definitive answer — replaying it just doubles the latency of a real error.
    const status = lastError instanceof ApiError ? lastError.status : 0;
    const retryable = status === 0 || status >= 500;
    if (!retryable) throw lastError;

    if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
  }

  throw lastError;
}

function apiErrorFrom(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (error instanceof TypeError) {
    return new ApiError(0, 'NETWORK_ERROR', 'Cannot reach the Elitze WorkerzNow API');
  }
  if (error instanceof SyntaxError) {
    return new ApiError(0, 'INVALID_JSON', 'The API returned an unreadable response');
  }
  return new ApiError(0, 'UNKNOWN_ERROR', error instanceof Error ? error.message : 'Unknown error');
}

export const api = {
  listEmployees(query: EmployeeQuery = {}, signal?: AbortSignal): Promise<Paginated<AIEmployee>> {
    return request<Paginated<AIEmployee>>(
      `/employees${buildQuery({
        q: query.q,
        department: query.department && query.department !== 'All' ? query.department : undefined,
        status: query.status,
        minRating: query.minRating,
        sort: query.sort,
        order: query.order,
        page: query.page,
        pageSize: query.pageSize,
      })}`,
      { signal },
    );
  },

  getEmployee(id: string, signal?: AbortSignal): Promise<AIEmployee> {
    return request<AIEmployee>(`/employees/${encodeURIComponent(id)}`, { signal });
  },

  listDepartments(signal?: AbortSignal): Promise<{ data: Department[] }> {
    return request<{ data: Department[] }>('/departments', { signal });
  },

  listExecutives(signal?: AbortSignal): Promise<{ data: unknown[] }> {
    return request<{ data: unknown[] }>('/executives', { signal });
  },

  listPricing(signal?: AbortSignal): Promise<{ data: unknown[] }> {
    return request<{ data: unknown[] }>('/pricing', { signal });
  },

  getMetrics(signal?: AbortSignal): Promise<MetricsSummary> {
    return request<MetricsSummary>('/metrics/summary', { signal });
  },

  listDeployments(status?: DeploymentStatus, signal?: AbortSignal): Promise<{ data: Deployment[] }> {
    return request<{ data: Deployment[] }>(`/deployments${buildQuery({ status })}`, { signal });
  },

  createDeployment(input: { employeeId: string; department?: string; status?: DeploymentStatus }): Promise<Deployment> {
    return request<Deployment>('/deployments', { method: 'POST', body: input });
  },

  deleteDeployment(id: string, token: string): Promise<void> {
    return request<void>(`/deployments/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /** Verifies the admin PIN server-side; returns a short-lived signed token. */
  verifyPin(pin: string): Promise<AuthSuccess> {
    return request<AuthSuccess>('/auth/pin', { method: 'POST', body: { pin } });
  },
};

export type { ActivityEvent };
