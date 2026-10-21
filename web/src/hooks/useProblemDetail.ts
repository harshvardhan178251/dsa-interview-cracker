import { useEffect, useState } from 'react'

import { loadProblemDetail } from '../lib/data'
import type { ProblemDetail } from '../lib/types'

/**
 * Loads the heavy payload for a problem (source, runner source and write-up).
 *
 * The listing data is bundled eagerly; the payload is a separate chunk that is
 * fetched the first time a problem is opened.
 */
export function useProblemDetail(id: string | undefined) {
  const [detail, setDetail] = useState<ProblemDetail | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setDetail(undefined)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    loadProblemDetail(id)
      .then((result) => {
        if (cancelled) return
        if (!result) {
          setError('This problem has no generated content yet.')
          setLoading(false)
          return
        }
        setDetail(result)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Could not load the problem.')
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { detail, loading, error }
}
