import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand text-brand-ink hover:opacity-90 border border-transparent shadow-sm disabled:opacity-50',
  secondary: 'bg-elevated text-ink hover:bg-line/60 border border-line',
  ghost: 'bg-transparent text-muted hover:text-ink hover:bg-elevated border border-transparent',
  danger: 'bg-bad text-white hover:opacity-90 border border-transparent',
}

const SIZES: Record<Size, string> = {
  sm: 'h-7 px-2.5 text-xs gap-1.5',
  md: 'h-9 px-3.5 text-sm gap-2',
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: Variant
  size?: Size
}) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {children}
    </button>
  )
}
