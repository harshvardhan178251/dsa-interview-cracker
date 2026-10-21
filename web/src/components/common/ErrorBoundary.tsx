import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Shown instead of the default panel when the error is recoverable. */
  fallback?: ReactNode
}

interface State {
  error: Error | null
}

/**
 * Catches render-time errors so a single bad page cannot white-screen the
 * whole app.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled error in the UI:', error, info.componentStack)
  }

  private reset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (!error) return children
    if (fallback) return fallback

    return (
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl font-black tracking-tight text-bad">Oops</div>
        <h1 className="mt-3 text-lg font-semibold text-ink">Something went wrong</h1>
        <p className="mt-1 text-sm text-muted">
          This page failed to render. Reloading usually fixes it — your saved progress is
          stored in this browser and is not affected.
        </p>
        <pre className="mt-4 max-w-full overflow-x-auto rounded-lg border border-line bg-elevated px-3 py-2 text-left font-mono text-xs text-muted">
          {error.message}
        </pre>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={this.reset}
            className="inline-flex h-9 items-center rounded-lg bg-brand px-4 text-sm font-medium text-brand-ink hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-9 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:bg-elevated"
          >
            Back to the home page
          </a>
        </div>
      </div>
    )
  }
}
