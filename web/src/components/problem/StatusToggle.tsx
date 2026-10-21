import { useProgress } from '../../hooks/useProgress'
import { STATUS_LABEL, STATUS_STYLES, cn, nextStatus } from '../../lib/utils'
import type { Status } from '../../lib/types'

const DOT: Record<Status, string> = {
  todo: 'bg-faint',
  attempted: 'bg-warn',
  solved: 'bg-ok',
}

/** Click to cycle todo → attempted → solved → todo. */
export function StatusToggle({
  id,
  compact = false,
  className,
}: {
  id: string
  compact?: boolean
  className?: string
}) {
  const { entryFor, setStatus } = useProgress()
  const entry = entryFor(id)
  const next = nextStatus(entry.status)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setStatus(id, next)
      }}
      title={`${STATUS_LABEL[entry.status]} — click to mark as ${STATUS_LABEL[next].toLowerCase()}`}
      aria-label={`Status: ${STATUS_LABEL[entry.status]}. Click to mark as ${STATUS_LABEL[next]}.`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border font-medium transition-colors',
        compact ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-1 text-xs',
        STATUS_STYLES[entry.status],
        'hover:brightness-110',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', DOT[entry.status])} />
      {STATUS_LABEL[entry.status]}
    </button>
  )
}
