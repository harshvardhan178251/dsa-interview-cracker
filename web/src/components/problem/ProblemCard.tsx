import { Link } from 'react-router-dom'

import { useProgress } from '../../hooks/useProgress'
import { cn, heatStars } from '../../lib/utils'
import type { Problem } from '../../lib/types'
import { Badge } from '../common/Badge'
import { DifficultyBadge } from './DifficultyBadge'
import { StatusToggle } from './StatusToggle'

export function ProblemCard({ problem }: { problem: Problem }) {
  const { entryFor } = useProgress()
  const entry = entryFor(problem.id)

  return (
    <div
      className={cn(
        'group relative flex flex-col gap-3 rounded-xl border bg-surface p-4 transition-all',
        'hover:border-brand/50 hover:shadow-lg hover:shadow-black/5',
        entry.status === 'solved' ? 'border-ok/30' : 'border-line',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            to={`/problems/${problem.slug}`}
            className="block truncate text-[15px] font-semibold text-ink hover:text-brand"
          >
            {problem.title}
          </Link>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge tone="brand">{problem.topicLabel}</Badge>
            <DifficultyBadge difficulty={problem.difficulty} />
            {problem.leetcode != null && (
              <Badge tone="neutral" title={`LeetCode #${problem.leetcode}`}>
                LC {problem.leetcode}
              </Badge>
            )}
          </div>
        </div>
        <StatusToggle id={problem.id} compact />
      </div>

      {problem.patterns.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {problem.patterns.slice(0, 3).map((pattern) => (
            <span
              key={pattern}
              className="rounded border border-line bg-elevated px-1.5 py-0.5 text-[11px] text-muted"
            >
              {pattern}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3">
        <span
          className="text-xs tracking-tight text-warn"
          title={`Interview frequency ${problem.frequency} of 5`}
        >
          {heatStars(problem.frequency)}
        </span>
        <div className="flex items-center gap-2">
          {problem.companies.slice(0, 3).map((company) => (
            <span key={company} className="text-[11px] text-faint">
              {company}
            </span>
          ))}
          {problem.companies.length > 3 && (
            <span className="text-[11px] text-faint">+{problem.companies.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  )
}
