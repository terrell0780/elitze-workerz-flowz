import { useCallback, useEffect, useRef, useState } from 'react';

export interface ResourceState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  /** True when the API could not be reached and local fallback data is shown. */
  degraded: boolean;
  refetch: () => void;
}

/**
 * Async resource hook with cancellation, manual refetch and graceful fallback.
 *
 * Every page previously rendered hard-coded fixtures with no loading or error
 * state. This gives them all three, and keeps the UI usable when the API is
 * unreachable instead of throwing an unhandled rejection.
 */
export function useResource<T>(fetcher: () => Promise<T>, deps: unknown[], fallback?: T): ResourceState<T> {
  const [state, setState] = useState<Omit<ResourceState<T>, 'refetch'>>(() => ({
    data: fallback ?? null,
    error: null,
    loading: true,
    degraded: false,
  }));

  const fetcherRef = useRef(fetcher);
  const fallbackRef = useRef(fallback);

  useEffect(() => {
    fetcherRef.current = fetcher;
    fallbackRef.current = fallback;
  }, [fetcher, fallback]);

  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true }));

    fetcherRef
      .current()
      .then((data) => {
        if (cancelled) return;
        setState({ data, error: null, loading: false, degraded: false });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const normalised = error instanceof Error ? error : new Error(String(error));
        setState({
          data: fallbackRef.current ?? null,
          error: normalised,
          loading: false,
          degraded: fallbackRef.current !== undefined,
        });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  return { ...state, refetch };
}

/** Debounces a rapidly-changing value (search inputs, filters). */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

/** Runs `handler` on Escape while `active`. */
export function useEscapeKey(active: boolean, handler: () => void): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handlerRef.current();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active]);
}

const THEME_STORAGE_KEY = 'workerznow:theme';

export type ThemePreference = 'dark' | 'light';

/** Persists the theme choice so it survives reloads instead of resetting. */
export function usePersistentTheme(): [ThemePreference, () => void] {
  const [theme, setTheme] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => setTheme((current) => (current === 'dark' ? 'light' : 'dark')), []);

  return [theme, toggle];
}
