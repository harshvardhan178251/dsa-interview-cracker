import { Link } from 'react-router-dom'

import { cn } from '../../lib/utils'

export function TopicProgressBar({
  label,
  solved,
  total,
  href,
}: {
  label: string
  solved: number
  total: number
  href?: string
}) {
  const pct = total === 0 ? 0 : Math.round((solved / total) * 100)

  const body = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-sm font-medium text-ink">{label}</span>
        <span className="shrink-0 text-xs text-faint">
          {solved}/{total}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-elevated">
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-500',
            pct === 100 ? 'bg-ok' : 'bg-brand',
          )}
          style={{ width: `${Math.max(pct > 0 ? 4 : 0, pct)}%` }}
        />
      </div>
    </>
  )

  if (href) {
    return (
      <Link
        to={href}
        className="block rounded-lg p-2 transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:outline-brand"
      >
        {body}
      </Link>
    )
  }
  return <div className="p-2">{body}</div>
}
