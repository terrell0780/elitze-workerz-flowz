import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered instead of the default panel when provided. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * App-level error boundary.
 *
 * Without this, a single thrown error anywhere in the tree unmounted the whole
 * app and left a blank screen with no way to recover.
 */
export class ErrorBoundary extends Component<Props, State> {
  public override state: State = { error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[workerznow] unhandled UI error', error, info.componentStack);
  }

  private reset = (): void => {
    this.setState({ error: null });
  };

  public override render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <div role="alert" className="min-h-screen flex items-center justify-center bg-[#0a0a14] p-8">
        <div className="max-w-md w-full rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
          <h1 className="text-xl font-bold text-white">Something went wrong</h1>
          <p className="mt-2 text-sm text-slate-400">
            The interface hit an unexpected error. Reloading usually clears it.
          </p>
          <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-black/40 p-3 text-left text-xs text-red-300">
            {error.message}
          </pre>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={this.reset}
              className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex-1 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
