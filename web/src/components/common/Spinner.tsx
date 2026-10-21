import { cn } from '../../lib/utils'

export function Spinner({ className, label }: { className?: string; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted">
      <svg
        viewBox="0 0 24 24"
        className={cn('h-4 w-4 animate-spin', className)}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      {label}
    </span>
  )
}
