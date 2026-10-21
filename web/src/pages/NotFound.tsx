import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl font-black tracking-tight text-brand">404</div>
      <h1 className="mt-3 text-lg font-semibold text-ink">This page does not exist</h1>
      <p className="mt-1 text-sm text-muted">
        The link may be outdated, or the problem may have been renamed.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex h-9 items-center rounded-lg bg-brand px-4 text-sm font-medium text-brand-ink hover:opacity-90"
      >
        Back to the dashboard
      </Link>
    </div>
  )
}
