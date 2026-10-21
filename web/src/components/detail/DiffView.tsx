import { cn } from '../../lib/utils'
import type { DiffRow } from '../../lib/api'

/**
 * Shows the expected output next to the actual output, with the differing lines
 * highlighted. This is what turns "Wrong Answer" into something actionable.
 */
export function DiffView({
  rows,
  expected,
  actual,
}: {
  rows: DiffRow[]
  expected: string
  actual: string
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-line bg-canvas p-3 text-sm text-muted">
        The outputs differ only in trailing whitespace.
      </div>
    )
  }

  const differing = rows.filter((r) => r.type !== 'equal').length

  return (
    <div className="overflow-hidden rounded-lg border border-bad/40">
      <div className="flex items-center justify-between border-b border-line bg-elevated px-3 py-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-bad">
          {differing} line{differing === 1 ? '' : 's'} differ
        </span>
        <span className="text-[11px] text-faint">expected vs actual</span>
      </div>

      <div className="grid grid-cols-2 divide-x divide-line">
        <div className="min-w-0">
          <div className="border-b border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-faint">
            Expected
          </div>
          <pre className="max-h-72 overflow-auto bg-canvas p-3 font-mono text-[12px] leading-relaxed">
            {expected || <span className="text-faint">(no output)</span>}
          </pre>
        </div>
        <div className="min-w-0">
          <div className="border-b border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-faint">
            Actual
          </div>
          <pre className="max-h-72 overflow-auto bg-canvas p-3 font-mono text-[12px] leading-relaxed">
            {actual || <span className="text-faint">(no output)</span>}
          </pre>
        </div>
      </div>

      <div className="border-t border-line">
        {rows.map((row, index) => (
          <div
            key={index}
            className={cn(
              'grid grid-cols-[2.5rem_1fr_1fr] items-center gap-2 border-b border-line/60 px-2 py-1 font-mono text-[12px] last:border-b-0',
              row.type === 'equal' ? 'text-faint' : 'text-bad',
            )}
          >
            <span className="text-right text-[10px] opacity-60">{row.line}</span>
            <span
              className={cn(
                'truncate px-1',
                row.type === 'missing' && 'bg-bad-soft font-semibold',
                row.type === 'extra' && 'bg-ok-soft',
              )}
            >
              {row.expected ?? ''}
            </span>
            <span
              className={cn(
                'truncate px-1',
                row.type === 'extra' && 'bg-bad-soft font-semibold',
                row.type === 'missing' && 'bg-ok-soft',
              )}
            >
              {row.actual ?? ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
