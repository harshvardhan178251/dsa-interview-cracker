import type { ReactNode } from 'react'

import { cn } from '../../lib/utils'

type BadgeTone = 'neutral' | 'brand' | 'ok' | 'warn' | 'bad' | 'accent'

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-elevated text-muted border-line',
  brand: 'bg-brand-soft text-brand border-brand/30',
  ok: 'bg-ok-soft text-ok border-ok/30',
  warn: 'bg-warn-soft text-warn border-warn/30',
  bad: 'bg-bad-soft text-bad border-bad/30',
  accent: 'bg-elevated text-accent border-accent/30',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
  title,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
  title?: string
}) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-none whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
