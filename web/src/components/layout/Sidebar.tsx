import { useMemo, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

import { problems, siteMeta } from '../../lib/data'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: 'M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10', end: true },
  { to: '/problems', label: 'All problems', icon: 'M4 6h16M4 12h16M4 18h10' },
  { to: '/review', label: 'Review queue', icon: 'M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/guides', label: 'Guides & notes', icon: 'M4 5h7v15H4zM13 5h7v15h-7z' },
]

function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-4 w-4 shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path.split(' M').map((d, i) => (
        <path key={i} d={i === 0 ? d : `M${d}`} />
      ))}
    </svg>
  )
}

export function Sidebar() {
  const [params] = useSearchParams()
  const [topicsOpen, setTopicsOpen] = useState(true)
  const [companiesOpen, setCompaniesOpen] = useState(false)

  const activeTopic = params.get('topic')
  const activeCompany = params.get('company')

  const topics = useMemo(
    () => siteMeta.topics.filter((t) => t.count > 0).sort((a, b) => a.order - b.order),
    [],
  )
  const companies = useMemo(() => siteMeta.companies, [])

  return (
    <nav className="flex h-full flex-col gap-6 p-4">
      <NavLink to="/" className="flex items-center gap-2.5 px-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-ink">
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6 4 12l5 6M15 6l5 6-5 6M13 4l-2 16" />
          </svg>
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold tracking-tight text-ink">DSA Cracker</span>
          <span className="block text-[11px] text-faint">Java · SDE interviews</span>
        </span>
      </NavLink>

      <div className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-soft text-brand'
                  : 'text-muted hover:bg-elevated hover:text-ink',
              )
            }
          >
            <Icon path={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setTopicsOpen((v) => !v)}
          className="flex w-full items-center justify-between px-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint"
        >
          Topics
          <span className={cn('transition-transform', topicsOpen && 'rotate-90')}>›</span>
        </button>
        {topicsOpen && (
          <div className="flex flex-col gap-0.5">
            {topics.map((topic) => (
              <NavLink
                key={topic.key}
                to={`/problems?topic=${topic.key}`}
                className={cn(
                  'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                  activeTopic === topic.key
                    ? 'bg-elevated font-medium text-ink'
                    : 'text-muted hover:bg-elevated hover:text-ink',
                )}
              >
                <span className="truncate">{topic.label}</span>
                <span className="ml-2 shrink-0 rounded bg-elevated px-1.5 text-[10px] font-semibold text-faint">
                  {topic.count}
                </span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setCompaniesOpen((v) => !v)}
          className="flex w-full items-center justify-between px-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint"
        >
          Companies
          <span className={cn('transition-transform', companiesOpen && 'rotate-90')}>›</span>
        </button>
        {companiesOpen && (
          <div className="flex flex-col gap-0.5">
            {companies.map((company) => {
              const count = problems.filter((p) => p.companies.includes(company)).length
              return (
                <NavLink
                  key={company}
                  to={`/problems?company=${encodeURIComponent(company)}`}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                    activeCompany === company
                      ? 'bg-elevated font-medium text-ink'
                      : 'text-muted hover:bg-elevated hover:text-ink',
                  )}
                >
                  <span className="truncate">{company}</span>
                  <span className="ml-2 shrink-0 rounded bg-elevated px-1.5 text-[10px] font-semibold text-faint">
                    {count}
                  </span>
                </NavLink>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
