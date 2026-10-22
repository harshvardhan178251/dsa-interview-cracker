import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { guides } from '../lib/data'
import { cn } from '../lib/utils'
import type { GuideCategory } from '../lib/types'

const CATEGORY_LABELS: Record<GuideCategory, string> = {
  topic: 'Topic notes',
  'system-design': 'System design',
  lld: 'Low-level design',
  guide: 'Guides',
  ibps: 'IBPS PO — bank exam prep',
}

const CATEGORY_ORDER: GuideCategory[] = ['guide', 'ibps', 'topic', 'system-design', 'lld']

export function Guides() {
  const [query, setQuery] = useState('')

  const grouped = useMemo(() => {
    const filtered = query.trim()
      ? guides.filter((g) =>
          `${g.title} ${g.summary} ${g.category}`.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : guides

    return CATEGORY_ORDER.map((category) => ({
      category,
      items: filtered.filter((g) => g.category === category),
    })).filter((group) => group.items.length > 0)
  }, [query])

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header>
        <h1 className="text-xl font-bold tracking-tight text-ink">Guides & notes</h1>
        <p className="mt-1 text-sm text-muted">
          Concept notes for every topic, the interview playbook, the study plan, and system and
          low-level design material.
        </p>
      </header>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter guides…"
        aria-label="Filter guides"
        className="h-9 w-full max-w-sm rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-none"
      />

      {grouped.length === 0 ? (
        <EmptyState title="No guides match that search" description="Try a different keyword." />
      ) : (
        grouped.map(({ category, items }) => (
          <section key={category}>
            <h2 className="mb-3 text-sm font-semibold text-ink">{CATEGORY_LABELS[category]}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((guide) => (
                <Link
                  key={guide.id}
                  to={`/guides/${guide.slug}`}
                  className={cn(
                    'group flex flex-col gap-1.5 rounded-xl border border-line bg-surface p-4',
                    'transition-all hover:border-brand/50 hover:shadow-lg hover:shadow-black/5',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-ink group-hover:text-brand">
                      {guide.title}
                    </span>
                    {guide.topic && <Badge tone="brand">{guide.topic}</Badge>}
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted">{guide.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
