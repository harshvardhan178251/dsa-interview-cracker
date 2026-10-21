export function StatCard({
  label,
  value,
  hint,
  tone = 'neutral',
}: {
  label: string
  value: string | number
  hint?: string
  tone?: 'neutral' | 'ok' | 'warn' | 'brand'
}) {
  const toneClass = {
    neutral: 'text-ink',
    ok: 'text-ok',
    warn: 'text-warn',
    brand: 'text-brand',
  }[tone]

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">{label}</div>
      <div className={`mt-1.5 text-2xl font-bold tracking-tight ${toneClass}`}>{value}</div>
      {hint && <div className="mt-0.5 text-xs text-muted">{hint}</div>}
    </div>
  )
}
