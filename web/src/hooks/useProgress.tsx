import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import {
  EMPTY_ENTRY,
  loadProgress,
  saveProgress,
  withNotes,
  withStar,
  withStatus,
} from '../lib/progress'
import type { ProgressMap } from '../lib/progress'
import type { ProgressEntry, Status } from '../lib/types'

interface ProgressContextValue {
  progress: ProgressMap
  entryFor: (id: string) => ProgressEntry
  setStatus: (id: string, status: Status) => void
  toggleStar: (id: string) => void
  setNotes: (id: string, notes: string) => void
  reset: () => void
  counts: { todo: number; attempted: number; solved: number }
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const entryFor = useCallback(
    (id: string) => progress[id] ?? EMPTY_ENTRY,
    [progress],
  )

  const setStatus = useCallback((id: string, status: Status) => {
    setProgress((prev) => ({ ...prev, [id]: withStatus(prev[id] ?? EMPTY_ENTRY, status) }))
  }, [])

  const toggleStar = useCallback((id: string) => {
    setProgress((prev) => {
      const entry = prev[id] ?? EMPTY_ENTRY
      return { ...prev, [id]: withStar(entry, !entry.starred) }
    })
  }, [])

  const setNotes = useCallback((id: string, notes: string) => {
    setProgress((prev) => ({ ...prev, [id]: withNotes(prev[id] ?? EMPTY_ENTRY, notes) }))
  }, [])

  const reset = useCallback(() => {
    setProgress({})
  }, [])

  const counts = useMemo(() => {
    const totals = { todo: 0, attempted: 0, solved: 0 }
    for (const entry of Object.values(progress)) {
      if (entry.status in totals) totals[entry.status as Status] += 1
    }
    return totals
  }, [progress])

  const value = useMemo(
    () => ({ progress, entryFor, setStatus, toggleStar, setNotes, reset, counts }),
    [progress, entryFor, setStatus, toggleStar, setNotes, reset, counts],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>')
  return ctx
}
