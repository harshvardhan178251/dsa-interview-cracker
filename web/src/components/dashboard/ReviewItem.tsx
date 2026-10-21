import { Link } from 'react-router-dom'

import { cn, heatStars, timeAgo } from '../../lib/utils'
import type { Problem, ProgressEntry } from '../../lib/types'

/**
 * A problem that has been attempted (or solved) and is due for another look.
 */
export function ReviewItem({
  problem,
  entry,
  reason,
}: {
  problem: Problem
  entry: ProgressEntry
  reason: string
}) {
  return (
    <Link
      to={`/problems/${problem.slug}`}
      className={cn(
        'flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-3',
        'transition-colors hover:border-brand/50 hover:bg-elevated',
      )}
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-ink">{problem.title}</div>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-faint">
          <span>{problem.topicLabel}</span>
          <span>·</span>
          <span className="text-warn">{heatStars(problem.frequency)}</span>
          <span>·</span>
          <span>{reason}</span>
        </div>
      </div>
      <span className="shrink-0 text-[11px] text-faint">{timeAgo(entry.updatedAt)}</span>
    </Link>
  )
}
