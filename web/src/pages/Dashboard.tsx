import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { ProgressRing } from '../components/dashboard/ProgressRing'
import { ReviewItem } from '../components/dashboard/ReviewItem'
import { StatCard } from '../components/dashboard/StatCard'
import { TopicProgressBar } from '../components/dashboard/TopicProgressBar'
import { ProblemCard } from '../components/problem/ProblemCard'
import { Badge } from '../components/common/Badge'
import { useProgress } from '../hooks/useProgress'
import { problems, siteMeta } from '../lib/data'
import { cn } from '../lib/utils'

export function Dashboard() {
  const { entryFor } = useProgress()

  const stats = useMemo(() => {
    let solved = 0
    let attempted = 0
    let starred = 0
    const perTopic = new Map<string, number>()

    for (const problem of problems) {
      const entry = entryFor(problem.id)
      if (entry.status === 'solved') {
        solved += 1
        perTopic.set(problem.topic, (perTopic.get(problem.topic) ?? 0) + 1)
      } else if (entry.status === 'attempted') {
        attempted += 1
      }
      if (entry.starred) starred += 1
    }
    return { solved, attempted, starred, perTopic }
  }, [entryFor])

  const inProgress = useMemo(
    () =>
      problems
        .filter((p) => {
          const entry = entryFor(p.id)
          return entry.status === 'attempted'
        })
        .sort((a, b) => entryFor(b.id).updatedAt - entryFor(a.id).updatedAt)
        .slice(0, 6),
    [entryFor],
  )

  const recommended = useMemo(
    () =>
      problems
        .filter((p) => entryFor(p.id).status === 'todo')
        .sort((a, b) => b.frequency - a.frequency || a.title.localeCompare(b.title))
        .slice(0, 6),
    [entryFor],
  )

  const dueForReview = useMemo(() => {
    const now = Date.now()
    return problems
      .map((problem) => {
        const entry = entryFor(problem.id)
        if (entry.status === 'todo') return null
        const ageDays = entry.updatedAt ? (now - entry.updatedAt) / 86_400_000 : 0
        const interval = entry.status === 'solved' ? 7 : 2
        if (ageDays < interval) return null
        return {
          problem,
          entry,
          reason:
            entry.status === 'solved'
              ? `solved ${Math.floor(ageDays)}d ago — revisit`
              : 'attempted, not yet solved',
        }
      })
      .filter(Boolean)
      .slice(0, 6) as { problem: (typeof problems)[number]; entry: ReturnType<typeof entryFor>; reason: string }[]
  }, [entryFor])

  const topics = useMemo(
    () => siteMeta.topics.filter((t) => t.count > 0).sort((a, b) => a.order - b.order),
    [],
  )

  const pct = problems.length ? Math.round((stats.solved / problems.length) * 100) : 0

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <section className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <ProgressRing value={stats.solved} total={problems.length} />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold tracking-tight text-ink">
              Your DSA interview preparation
            </h1>
            <p className="mt-1 text-sm text-muted">
              {problems.length} Java problems across {topics.length} topics, each with a dry run,
              complexity analysis and a runnable solution. You have solved{' '}
              <span className="font-semibold text-ink">{pct}%</span> so far.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/problems"
                className="inline-flex h-9 items-center rounded-lg bg-brand px-3.5 text-sm font-medium text-brand-ink hover:opacity-90"
              >
                Browse problems
              </Link>
              <Link
                to="/guides"
                className="inline-flex h-9 items-center rounded-lg border border-line bg-elevated px-3.5 text-sm font-medium text-ink hover:bg-line/60"
              >
                Study plan & notes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Problems" value={problems.length} hint="in the catalogue" />
        <StatCard label="Solved" value={stats.solved} tone="ok" hint={`${pct}% of the set`} />
        <StatCard label="Attempted" value={stats.attempted} tone="warn" hint="not yet solved" />
        <StatCard label="Starred" value={stats.starred} tone="brand" hint="your shortlist" />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Progress by topic</h2>
            <Link to="/problems" className="text-xs text-brand hover:underline">
              Open catalogue
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {topics.map((topic) => (
              <TopicProgressBar
                key={topic.key}
                label={topic.label}
                solved={stats.perTopic.get(topic.key) ?? 0}
                total={topic.count}
                href={`/topics/${topic.key}`}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Needs review</h2>
            <Link to="/review" className="text-xs text-brand hover:underline">
              See all
            </Link>
          </div>
          {dueForReview.length === 0 ? (
            <p className="text-sm text-muted">
              Nothing due right now. Solve a few problems and they will come back for a second
              look after a few days.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {dueForReview.map(({ problem, entry, reason }) => (
                <ReviewItem key={problem.id} problem={problem} entry={entry} reason={reason} />
              ))}
            </div>
          )}
        </section>
      </div>

      {inProgress.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-ink">Pick up where you left off</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Most frequently asked</h2>
          <Badge tone="brand">start here</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>

      <section className={cn('rounded-2xl border border-line bg-surface p-5')}>
        <h2 className="mb-2 text-sm font-semibold text-ink">How to use this repository</h2>        <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted">
          <li>
            Read the <strong className="text-ink">dry run</strong> first — it shows exactly what
            happens at every step, which is what interviewers probe.
          </li>
          <li>
            Implement it yourself in an editor, then compare against the solution tab.
          </li>
          <li>
            Run it in the browser with your own test cases, and verify against the sample.
          </li>
          <li>
            Mark it solved, then revisit it a week later from the review queue — spaced repetition
            is what turns recognition into recall.
          </li>
        </ol>
      </section>
    </div>
  )
}
