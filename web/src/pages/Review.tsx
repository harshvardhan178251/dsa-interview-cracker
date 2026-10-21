import { useMemo } from 'react'

import { EmptyState } from '../components/common/EmptyState'
import { ReviewItem } from '../components/dashboard/ReviewItem'
import { useProgress } from '../hooks/useProgress'
import { problems } from '../lib/data'

export function Review() {
  const { entryFor } = useProgress()

  const queue = useMemo(() => {
    const now = Date.now()
    return problems
      .map((problem) => {
        const entry = entryFor(problem.id)
        if (entry.status === 'todo' && !entry.starred) return null

        const ageDays = entry.updatedAt ? (now - entry.updatedAt) / 86_400_000 : 999
        const interval = entry.status === 'solved' ? 7 : 2
        const overdue = ageDays >= interval

        return { problem, entry, ageDays, overdue, reason: overdue ? 'due for a revisit' : 'recent' }
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a!.overdue !== b!.overdue) return a!.overdue ? -1 : 1
        if (a!.entry.starred !== b!.entry.starred) return a!.entry.starred ? -1 : 1
        return a!.ageDays - b!.ageDays
      }) as {
      problem: (typeof problems)[number]
      entry: ReturnType<typeof entryFor>
      ageDays: number
      overdue: boolean
      reason: string
    }[]
  }, [entryFor])

  const due = queue.filter((item) => item.overdue)
  const rest = queue.filter((item) => !item.overdue)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header>
        <h1 className="text-xl font-bold tracking-tight text-ink">Review queue</h1>
        <p className="mt-1 text-sm text-muted">
          Spaced repetition, kept deliberately simple: a solved problem comes back after 7 days, an
          attempted one after 2. Starred problems always stay in the queue.
        </p>
      </header>

      {queue.length === 0 ? (
        <EmptyState
          title="Nothing to review yet"
          description="Solve or attempt a few problems and they will show up here when they are due."
        />
      ) : (
        <>
          {due.length > 0 && (
            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold text-ink">Due now ({due.length})</h2>
              {due.map(({ problem, entry, reason }) => (
                <ReviewItem key={problem.id} problem={problem} entry={entry} reason={reason} />
              ))}
            </section>
          )}

          {rest.length > 0 && (
            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold text-ink">Recently touched ({rest.length})</h2>
              {rest.map(({ problem, entry, reason }) => (
                <ReviewItem key={problem.id} problem={problem} entry={entry} reason={reason} />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  )
}
