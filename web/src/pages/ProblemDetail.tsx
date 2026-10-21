import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Badge } from '../components/common/Badge'
import { CopyButton } from '../components/common/CopyButton'
import { EmptyState } from '../components/common/EmptyState'
import { Spinner } from '../components/common/Spinner'
import { Tabs } from '../components/common/Tabs'
import { CodeBlock } from '../components/detail/CodeBlock'
import { MarkdownView } from '../components/detail/MarkdownView'
import { RunPanel } from '../components/detail/RunPanel'
import { DifficultyBadge } from '../components/problem/DifficultyBadge'
import { ProblemCard } from '../components/problem/ProblemCard'
import { StatusToggle } from '../components/problem/StatusToggle'
import { useProblemDetail } from '../hooks/useProblemDetail'
import { useProgress } from '../hooks/useProgress'
import { findProblem, problems } from '../lib/data'
import { cn, heatStars } from '../lib/utils'

const TABS = [
  { id: 'explanation', label: 'Explanation' },
  { id: 'solution', label: 'Solution' },
  { id: 'run', label: 'Run' },
  { id: 'related', label: 'Related' },
]

export function ProblemDetail() {
  const { slug = '' } = useParams()
  const problem = findProblem(slug)
  const { entryFor, toggleStar } = useProgress()
  const [tab, setTab] = useState('explanation')
  const [sourceView, setSourceView] = useState<'solution' | 'judge'>('solution')

  const { detail, loading, error } = useProblemDetail(problem?.id)

  const related = useMemo(() => {
    if (!problem) return []
    const scored = problems
      .filter((p) => p.id !== problem.id)
      .map((p) => {
        let score = 0
        if (p.topic === problem.topic) score += 3
        score += p.patterns.filter((x) => problem.patterns.includes(x)).length * 2
        score += p.tags.filter((x) => problem.tags.includes(x)).length
        return { problem: p, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || b.problem.frequency - a.problem.frequency)
      .slice(0, 6)
    return scored.map((x) => x.problem)
  }, [problem])

  if (!problem) {
    return (
      <EmptyState
        title="Problem not found"
        description={`Nothing matches "${slug}". It may have been renamed.`}
        action={
          <Link
            to="/problems"
            className="inline-flex h-9 items-center rounded-lg bg-brand px-3.5 text-sm font-medium text-brand-ink"
          >
            Back to the catalogue
          </Link>
        }
      />
    )
  }

  const entry = entryFor(problem.id)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <nav className="text-xs text-faint">
        <Link to="/problems" className="hover:text-muted hover:underline">
          Problems
        </Link>
        <span className="mx-1.5">/</span>
        <Link to={`/problems?topic=${problem.topic}`} className="hover:text-muted hover:underline">
          {problem.topicLabel}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-muted">{problem.title}</span>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-ink">{problem.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge tone="brand">{problem.topicLabel}</Badge>
              <DifficultyBadge difficulty={problem.difficulty} />
              {problem.leetcode != null && (
                <a
                  href={`https://leetcode.com/problems/${problem.leetcode}/`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-md border border-line bg-elevated px-1.5 py-0.5 text-[11px] font-medium text-muted hover:text-ink"
                >
                  LeetCode #{problem.leetcode} ↗
                </a>
              )}
              <span
                className="text-xs tracking-tight text-warn"
                title={`Interview frequency ${problem.frequency} of 5`}
              >
                {heatStars(problem.frequency)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusToggle id={problem.id} />
            <button
              type="button"
              onClick={() => toggleStar(problem.id)}
              title={entry.starred ? 'Remove from shortlist' : 'Add to shortlist'}
              className={cn(
                'rounded-lg border px-2.5 py-1.5 text-sm transition-colors',
                entry.starred
                  ? 'border-warn/40 bg-warn-soft text-warn'
                  : 'border-line bg-surface text-muted hover:text-ink',
              )}
            >
              {entry.starred ? '★' : '☆'}
            </button>
          </div>
        </div>

        {(problem.patterns.length > 0 || problem.companies.length > 0) && (
          <div className="flex flex-wrap gap-1.5">
            {problem.patterns.map((pattern) => (
              <Link
                key={pattern}
                to={`/problems?pattern=${encodeURIComponent(pattern)}`}
                className="rounded border border-line bg-elevated px-2 py-0.5 text-[11px] text-muted hover:border-brand/40 hover:text-brand"
              >
                {pattern}
              </Link>
            ))}
            {problem.companies.map((company) => (
              <Link
                key={company}
                to={`/problems?company=${encodeURIComponent(company)}`}
                className="rounded border border-line bg-elevated px-2 py-0.5 text-[11px] text-muted hover:border-brand/40 hover:text-brand"
              >
                {company}
              </Link>
            ))}
          </div>
        )}
      </header>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'explanation' && (
        <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          {loading && <Spinner label="Loading the write-up…" />}
          {error && <p className="text-sm text-bad">{error}</p>}
          {!loading && !error && <MarkdownView content={detail?.doc ?? ''} />}
        </section>
      )}

      {tab === 'solution' && (
        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-line bg-surface p-0.5">
              <button
                type="button"
                onClick={() => setSourceView('solution')}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                  sourceView === 'solution'
                    ? 'bg-brand-soft text-brand'
                    : 'text-muted hover:text-ink',
                )}
              >
                Repository source
              </button>
              <button
                type="button"
                onClick={() => setSourceView('judge')}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                  sourceView === 'judge'
                    ? 'bg-brand-soft text-brand'
                    : 'text-muted hover:text-ink',
                )}
              >
                Runner source
              </button>
            </div>
            {detail && (
              <CopyButton
                text={sourceView === 'solution' ? detail.source : detail.judgeSource}
                label="Copy source"
              />
            )}
          </div>

          {loading && <Spinner label="Loading the source…" />}
          {error && <p className="text-sm text-bad">{error}</p>}

          {detail && (
            <>
              {sourceView === 'solution' ? (
                <>
                  <CodeBlock code={detail.source} language="java" maxHeight={640} />
                  <p className="text-xs text-faint">
                    This is the file exactly as it lives in the repository —{' '}
                    <code className="font-mono">src/main/java/com/dsa/{problem.topic}/</code>.
                  </p>
                </>
              ) : (
                <>
                  <CodeBlock code={detail.judgeSource} language="java" maxHeight={640} />
                  <p className="text-xs text-faint">
                    The runner source is what the in-browser compiler receives: the class is
                    renamed to <code className="font-mono">Main</code> and every shared helper is
                    inlined so the file compiles on its own.
                  </p>
                </>
              )}
            </>
          )}
        </section>
      )}

      {tab === 'run' && (
        <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          {loading && <Spinner label="Preparing the runner…" />}
          {error && <p className="text-sm text-bad">{error}</p>}
          {detail && <RunPanel problem={problem} judgeSource={detail.judgeSource} />}
        </section>
      )}

      {tab === 'related' && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-ink">
            Problems that share a pattern or topic
          </h2>
          {related.length === 0 ? (
            <p className="text-sm text-muted">Nothing related yet.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProblemCard key={p.id} problem={p} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
