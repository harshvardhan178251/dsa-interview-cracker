import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { problems, siteMeta } from '../../lib/data'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10', end: true },
  { to: '/dashboard', label: 'My dashboard', icon: 'M4 13h6V4H4v9zM4 20h6v-3H4v3zM14 20h6v-9h-6v9zM14 4v3h6V4h-6z' },
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
  const [topicsOpen, setTopicsOpen] = useState(true)
  const [companiesOpen, setCompaniesOpen] = useState(false)
  const location = useLocation()
  const path = location.pathname

  const topics = useMemo(
    () => siteMeta.topics.filter((t) => t.count > 0).sort((a, b) => a.order - b.order),
    [],
  )
  const companies = useMemo(
    () =>
      siteMeta.companies.map((company) => ({
        company,
        count: problems.filter((p) => p.companies.includes(company)).length,
      })),
    [],
  )

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
          aria-expanded={topicsOpen}
          className="flex w-full items-center justify-between px-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint"
        >
          Topics
          <span className={cn('transition-transform', topicsOpen && 'rotate-90')}>›</span>
        </button>
        {topicsOpen && (
          <div className="flex flex-col gap-0.5">
            {topics.map((topic) => {
              const active = path === `/topics/${topic.key}`
              return (
                <NavLink
                  key={topic.key}
                  to={`/topics/${topic.key}`}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                    active
                      ? 'bg-elevated font-medium text-ink'
                      : 'text-muted hover:bg-elevated hover:text-ink',
                  )}
                >
                  <span className="truncate">{topic.label}</span>
                  <span className="ml-2 shrink-0 rounded bg-elevated px-1.5 text-[10px] font-semibold text-faint">
                    {topic.count}
                  </span>
                </NavLink>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setCompaniesOpen((v) => !v)}
          aria-expanded={companiesOpen}
          className="flex w-full items-center justify-between px-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint"
        >
          Companies
          <span className={cn('transition-transform', companiesOpen && 'rotate-90')}>›</span>
        </button>
        {companiesOpen && (
          <div className="flex flex-col gap-0.5">
            {companies.map(({ company, count }) => {
              const active = path === `/companies/${encodeURIComponent(company)}`
              return (
                <NavLink
                  key={company}
                  to={`/companies/${encodeURIComponent(company)}`}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                    active
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
