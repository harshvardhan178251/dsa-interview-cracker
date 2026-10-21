import { useEffect, useMemo, useState } from 'react'

import { EmptyState } from '../components/common/EmptyState'
import { Button } from '../components/common/Button'
import { FilterBar } from '../components/problem/FilterBar'
import { ProblemCard } from '../components/problem/ProblemCard'
import { applyFilters, useFilters } from '../hooks/useFilters'
import { useProgress } from '../hooks/useProgress'
import { problems } from '../lib/data'

const PAGE_SIZE = 48

export function Catalog() {
  const { filters, update, toggle, reset, activeCount } = useFilters()
  const { entryFor } = useProgress()
  const [page, setPage] = useState(0)

  const results = useMemo(
    () => applyFilters(problems, filters, (problem) => entryFor(problem.id).status),
    [filters, entryFor],
  )

  // Reset to the first page whenever the filter set changes.
  useEffect(() => {
    setPage(0)
  }, [filters])

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const current = Math.min(page, pageCount - 1)
  const visible = results.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <header>
        <h1 className="text-xl font-bold tracking-tight text-ink">Problem catalogue</h1>
        <p className="mt-1 text-sm text-muted">
          Every problem ships with a clean Java solution, the exact stdin format, a step-by-step
          dry run, complexity analysis and interview notes.
        </p>
      </header>

      <FilterBar
        filters={filters}
        update={update}
        toggle={toggle}
        reset={reset}
        activeCount={activeCount}
        resultCount={results.length}
      />

      {results.length === 0 ? (
        <EmptyState
          title="No problems match those filters"
          description="Try removing a filter or searching for something broader."
          action={
            <Button variant="primary" onClick={reset}>
              Clear all filters
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>

          {pageCount > 1 && (
            <nav className="flex items-center justify-center gap-3 pt-2">
              <Button size="sm" onClick={() => setPage(current - 1)} disabled={current === 0}>
                Previous
              </Button>
              <span className="text-xs text-muted">
                Page {current + 1} of {pageCount}
              </span>
              <Button
                size="sm"
                onClick={() => setPage(current + 1)}
                disabled={current >= pageCount - 1}
              >
                Next
              </Button>
            </nav>
          )}
        </>
      )}
    </div>
  )
}
