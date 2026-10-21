import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { DifficultyBadge } from '../components/problem/DifficultyBadge'
import { StatusToggle } from '../components/problem/StatusToggle'
import { useProgress } from '../hooks/useProgress'
import { guides, problems, siteMeta } from '../lib/data'
import { cn, heatStars } from '../lib/utils'
import type { Difficulty, Problem } from '../lib/types'

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']

type Kind = 'topic' | 'company'

/**
 * A landing page for one topic or one company, listing **every** problem it
 * covers — not a filtered slice of the catalogue.
 */
function ListingPage({ kind }: { kind: Kind }) {
  const params = useParams()
  const key = decodeURIComponent(params[kind] ?? '')
  const { entryFor } = useProgress()
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')

  const meta = siteMeta.topics.find((t) => t.key === key)
  const title = kind === 'topic' ? meta?.label : key
  const description =
    kind === 'topic'
      ? meta?.description
      : `Every problem in this repository that has been reported for ${key}.`

  const list = useMemo(() => {
    const filtered = problems.filter((p) =>
      kind === 'topic' ? p.topic === key : p.companies.includes(key),
    )
    return filtered.sort(
      (a, b) =>
        DIFFICULTIES.indexOf(a.difficulty) - DIFFICULTIES.indexOf(b.difficulty) ||
        b.frequency - a.frequency ||
        a.title.localeCompare(b.title),
    )
  }, [kind, key])

  const visible = difficulty === 'all' ? list : list.filter((p) => p.difficulty === difficulty)

  const patterns = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of list) {
      for (const pattern of p.patterns) counts.set(pattern, (counts.get(pattern) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1])
  }, [list])

  const companies = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of list) {
      for (const company of p.companies) counts.set(company, (counts.get(company) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)
  }, [list])

  const note = kind === 'topic' ? guides.find((g) => g.category === 'topic' && g.topic === key) : undefined

  if (!title || list.length === 0) {
    return (
      <EmptyState
        title={kind === 'topic' ? 'Topic not found' : 'Company not found'}
        description={`Nothing matches "${key}".`}
        action={
          <Link
            to="/problems"
            className="inline-flex h-9 items-center rounded-lg bg-brand px-3.5 text-sm font-medium text-brand-ink"
          >
            Browse all problems
          </Link>
        }
      />
    )
  }

  const solved = list.filter((p) => entryFor(p.id).status === 'solved').length
  const counts = {
    Easy: list.filter((p) => p.difficulty === 'Easy').length,
    Medium: list.filter((p) => p.difficulty === 'Medium').length,
    Hard: list.filter((p) => p.difficulty === 'Hard').length,
  }
  const hot = list.filter((p) => p.frequency >= 5).length

  const catalogueQuery =
    kind === 'topic'
      ? `/problems?topic=${key}`
      : `/problems?company=${encodeURIComponent(key)}`

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <nav className="text-xs text-faint">
        <Link to="/problems" className="hover:text-muted hover:underline">
          Problems
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-muted">{title}</span>
      </nav>

      {/* ------------------------------------------------------------- Header */}
      <header className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
              <Badge tone="brand">{meta ? `${meta.count} problems` : `${list.length} problems`}</Badge>
              {kind === 'company' && <Badge tone="accent">Company</Badge>}
            </div>
            {description && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {note && (
                <Link
                  to={`/guides/topic/${key}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-elevated px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:border-brand/40"
                >
                  <span className="text-brand">Note</span>
                  Read the concept notes
                </Link>
              )}
              <Link
                to={catalogueQuery}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-elevated px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:border-brand/40"
              >
                Open in the catalogue
              </Link>
            </div>
          </div>

          <div className="shrink-0 rounded-xl border border-line bg-elevated p-4 text-center">
            <div className="text-3xl font-bold tracking-tight text-ink">
              {solved}
              <span className="text-lg text-faint">/{list.length}</span>
            </div>
            <div className="mt-0.5 text-[11px] uppercase tracking-wider text-faint">solved</div>
            <div className="mt-3 h-1.5 w-28 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-500"
                style={{ width: `${list.length ? (solved / list.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5 sm:grid-cols-4">
          {[
            { label: 'Easy', value: counts.Easy, className: 'text-ok' },
            { label: 'Medium', value: counts.Medium, className: 'text-warn' },
            { label: 'Hard', value: counts.Hard, className: 'text-bad' },
            { label: 'Asked constantly', value: hot, className: 'text-warn' },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                {stat.label}
              </dt>
              <dd className={cn('mt-0.5 text-xl font-bold tracking-tight', stat.className)}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ---------------------------------------------------- Patterns/companies */}
      {(patterns.length > 0 || companies.length > 0) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {patterns.length > 0 && (
            <section className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-sm font-semibold text-ink">Patterns in this list</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {patterns.map(([pattern, count]) => (
                  <Link
                    key={pattern}
                    to={`${catalogueQuery}&pattern=${encodeURIComponent(pattern)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-elevated px-2.5 py-1 text-xs text-muted transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    {pattern}
                    <span className="text-[10px] font-semibold text-faint">{count}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {companies.length > 0 && (
            <section className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-sm font-semibold text-ink">Companies that ask these</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {companies.map(([company, count]) => (
                  <Link
                    key={company}
                    to={`/problems?company=${encodeURIComponent(company)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-elevated px-2.5 py-1 text-xs text-muted transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    {company}
                    <span className="text-[10px] font-semibold text-faint">{count}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------ Problems */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ink">
            All {title} problems
            <span className="ml-2 font-normal text-faint">
              ({visible.length} of {list.length})
            </span>
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDifficulty('all')}
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                difficulty === 'all'
                  ? 'border-brand/40 bg-brand-soft text-brand'
                  : 'border-line bg-surface text-muted hover:text-ink',
              )}
            >
              All
            </button>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                  difficulty === d
                    ? 'border-brand/40 bg-brand-soft text-brand'
                    : 'border-line bg-surface text-muted hover:text-ink',
                )}
              >
                {d} ({counts[d]})
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Nothing at this difficulty" description="Pick another difficulty." />
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {visible.map((problem) => (
              <li key={problem.id}>
                <ProblemRow problem={problem} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function ProblemRow({ problem }: { problem: Problem }) {
  const { entryFor } = useProgress()
  const entry = entryFor(problem.id)

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-xl border bg-surface p-3.5 transition-colors sm:flex-row sm:items-center sm:gap-4',
        entry.status === 'solved' ? 'border-ok/30' : 'border-line',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link
            to={`/problems/${problem.slug}`}
            className="truncate text-sm font-semibold text-ink hover:text-brand"
          >
            {problem.title}
          </Link>
          {problem.leetcode != null && (
            <span className="shrink-0 text-[11px] text-faint">LC {problem.leetcode}</span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {problem.patterns.slice(0, 3).map((pattern) => (
            <span
              key={pattern}
              className="rounded border border-line bg-elevated px-1.5 py-0.5 text-[11px] text-muted"
            >
              {pattern}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="w-16 text-right text-xs tracking-tight text-warn" title="Interview heat">
          {heatStars(problem.frequency)}
        </span>
        <DifficultyBadge difficulty={problem.difficulty} />
        <StatusToggle id={problem.id} compact />
      </div>
    </div>
  )
}

export function TopicPage() {
  return <ListingPage kind="topic" />
}

export function CompanyPage() {
  return <ListingPage kind="company" />
}
