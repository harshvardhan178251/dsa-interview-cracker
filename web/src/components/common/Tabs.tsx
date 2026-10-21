import type { ReactNode } from 'react'

import { cn } from '../../lib/utils'

export function Tabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { id: string; label: ReactNode; badge?: ReactNode }[]
  active: string
  onChange: (id: string) => void
  className?: string
}) {
  return (
    <div
      role="tablist"
      className={cn('flex items-center gap-1 overflow-x-auto border-b border-line', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative -mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'border-brand text-ink'
                : 'border-transparent text-muted hover:border-line-strong hover:text-ink',
            )}
          >
            {tab.label}
            {tab.badge != null && (
              <span className="rounded bg-elevated px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
