export function ProgressRing({
  value,
  total,
  size = 132,
  stroke = 11,
  label = 'solved',
}: {
  value: number
  total: number
  size?: number
  stroke?: number
  label?: string
}) {
  const pct = total === 0 ? 0 : Math.min(1, value / total)
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dash = circumference * pct

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-line"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className="stroke-brand transition-[stroke-dasharray] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tracking-tight text-ink">{value}</span>
        <span className="text-[11px] uppercase tracking-wider text-faint">
          {label} / {total}
        </span>
      </div>
    </div>
  )
}
