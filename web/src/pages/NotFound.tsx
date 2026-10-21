import { Link } from 'react-router-dom'

import { problems, siteMeta } from '../lib/data'

export function NotFound() {
  const topics = siteMeta.topics.filter((t) => t.count > 0).sort((a, b) => a.order - b.order)

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center py-16 text-center">
      <div className="text-7xl font-black tracking-tight text-brand">404</div>
      <h1 className="mt-3 text-xl font-semibold text-ink">This page does not exist</h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        The link may be outdated, or the problem may have been renamed. There are{' '}
        {problems.length} problems waiting in the catalogue.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-brand-ink hover:opacity-90"
        >
          Back to the home page
        </Link>
        <Link
          to="/problems"
          className="inline-flex h-10 items-center rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-ink hover:bg-elevated"
        >
          Browse all problems
        </Link>
      </div>

      <div className="mt-12 w-full">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-faint">
          Or jump straight to a topic
        </h2>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {topics.map((topic) => (
            <Link
              key={topic.key}
              to={`/topics/${topic.key}`}
              className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:border-brand/40 hover:text-brand"
            >
              {topic.label}
              <span className="ml-1.5 text-[10px] font-semibold text-faint">{topic.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
