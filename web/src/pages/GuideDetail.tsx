import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { EmptyState } from '../components/common/EmptyState'
import { Spinner } from '../components/common/Spinner'
import { MarkdownView } from '../components/detail/MarkdownView'
import { findGuide, loadGuideBody } from '../lib/data'

export function GuideDetail() {
  const params = useParams()
  const slug = params['*'] ?? ''
  const guide = findGuide(slug)
  const [body, setBody] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!guide) {
      setBody(undefined)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    loadGuideBody(guide)
      .then((result) => {
        if (cancelled) return
        setBody(result ?? '')
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Could not load the guide.')
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [guide])

  if (!guide) {
    return (
      <EmptyState
        title="Guide not found"
        description={`Nothing matches "${slug}".`}
        action={
          <Link
            to="/guides"
            className="inline-flex h-9 items-center rounded-lg bg-brand px-3.5 text-sm font-medium text-brand-ink"
          >
            Back to guides
          </Link>
        }
      />
    )
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <nav className="text-xs text-faint">
        <Link to="/guides" className="hover:text-muted hover:underline">
          Guides
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-muted">{guide.title}</span>
      </nav>

      <article className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
        {loading && <Spinner label="Loading the guide…" />}
        {error && <p className="text-sm text-bad">{error}</p>}
        {!loading && !error && (
          <MarkdownView content={body ?? ''} category={guide.category} />
        )}
      </article>
    </div>
  )
}
