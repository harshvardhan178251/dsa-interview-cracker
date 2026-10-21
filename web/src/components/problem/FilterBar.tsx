import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

import { siteMeta } from '../../lib/data'
import { cn } from '../../lib/utils'
import type { Difficulty, Status } from '../../lib/types'
import type { FilterState } from '../../hooks/useFilters'
import { Button } from '../common/Button'

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']
const STATUSES: Status[] = ['todo', 'attempted', 'solved']
const STATUS_LABEL: Record<Status, string> = {
  todo: 'To do',
  attempted: 'Attempted',
  solved: 'Solved',
}

function Chip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  count?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
        active
          ? 'border-brand/40 bg-brand-soft text-brand'
          : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink',
      )}
    >
      {children}
      {count != null && (
        <span className="rounded-full bg-elevated px-1.5 text-[10px] font-semibold text-faint">
          {count}
        </span>
      )}
    </button>
  )
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

export function FilterBar({
  filters,
  update,
  toggle,
  reset,
  activeCount,
  resultCount,
}: {
  filters: FilterState
  update: (patch: Partial<FilterState>) => void
  toggle: (key: 'topics' | 'difficulties' | 'companies' | 'patterns', value: string) => void
  reset: () => void
  activeCount: number
  resultCount: number
}) {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      if (event.key === '/' && !typing) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const topics = siteMeta.topics.filter((t) => t.count > 0).sort((a, b) => a.order - b.order)

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={searchRef}
            value={filters.q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search by title, pattern, company, tag or LeetCode id…"
            aria-label="Search problems"
            className="h-9 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-faint" htmlFor="sort-select">
            Sort
          </label>
          <select
            id="sort-select"
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value as typeof filters.sort })}
            className="h-9 rounded-lg border border-line bg-canvas px-2 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="heat">Most asked</option>
            <option value="title">Title A–Z</option>
            <option value="difficulty">Difficulty</option>
            <option value="status">Progress</option>
          </select>
        </div>

        {activeCount > 0 && (
          <Button size="sm" variant="ghost" onClick={reset}>
            Clear ({activeCount})
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-4">
        <Group label="Topic">
          {topics.map((topic) => (
            <Chip
              key={topic.key}
              active={filters.topics.includes(topic.key)}
              onClick={() => toggle('topics', topic.key)}
              count={topic.count}
            >
              {topic.label}
            </Chip>
          ))}
        </Group>

        <Group label="Difficulty">
          {DIFFICULTIES.map((difficulty) => (
            <Chip
              key={difficulty}
              active={filters.difficulties.includes(difficulty)}
              onClick={() => toggle('difficulties', difficulty)}
            >
              {difficulty}
            </Chip>
          ))}
        </Group>

        <Group label="Status">
          <Chip
            active={filters.status === 'all'}
            onClick={() => update({ status: 'all' })}
          >
            All
          </Chip>
          {STATUSES.map((status) => (
            <Chip
              key={status}
              active={filters.status === status}
              onClick={() => update({ status })}
            >
              {STATUS_LABEL[status]}
            </Chip>
          ))}
        </Group>

        {siteMeta.patterns.length > 0 && (
          <Group label="Pattern">
            {siteMeta.patterns.map((pattern) => (
              <Chip
                key={pattern}
                active={filters.patterns.includes(pattern)}
                onClick={() => toggle('patterns', pattern)}
              >
                {pattern}
              </Chip>
            ))}
          </Group>
        )}

        {siteMeta.companies.length > 0 && (
          <Group label="Company">
            {siteMeta.companies.map((company) => (
              <Chip
                key={company}
                active={filters.companies.includes(company)}
                onClick={() => toggle('companies', company)}
              >
                {company}
              </Chip>
            ))}
          </Group>
        )}
      </div>

      <div className="border-t border-line pt-3 text-xs text-faint">
        <span className="font-semibold text-muted">{resultCount}</span> problem
        {resultCount === 1 ? '' : 's'} match the current filters
      </div>
    </div>
  )
}
