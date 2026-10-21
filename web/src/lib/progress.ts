import type { ProgressEntry, Status } from './types'

const STORAGE_KEY = 'dsa.progress.v1'

export type ProgressMap = Record<string, ProgressEntry>

export const EMPTY_ENTRY: ProgressEntry = {
  status: 'todo',
  attempts: 0,
  starred: false,
  notes: '',
  updatedAt: 0,
  solvedAt: null,
}

function isEntry(value: unknown): value is ProgressEntry {
  if (!value || typeof value !== 'object') return false
  const e = value as Partial<ProgressEntry>
  return (
    typeof e.status === 'string' &&
    ['todo', 'attempted', 'solved'].includes(e.status) &&
    typeof e.attempts === 'number' &&
    typeof e.starred === 'boolean' &&
    typeof e.notes === 'string' &&
    typeof e.updatedAt === 'number'
  )
}

/** Reads the persisted progress map, tolerating corrupt or legacy payloads. */
export function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    const out: ProgressMap = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (isEntry(value)) out[key] = value
    }
    return out
  } catch {
    return {}
  }
}

export function saveProgress(map: ProgressMap): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    /* quota exceeded or private mode — progress simply will not persist */
  }
}

export function getEntry(map: ProgressMap, id: string): ProgressEntry {
  return map[id] ?? EMPTY_ENTRY
}

export function withStatus(entry: ProgressEntry, status: Status): ProgressEntry {
  return {
    ...entry,
    status,
    attempts: status === 'todo' ? entry.attempts : entry.attempts + 1,
    solvedAt: status === 'solved' ? Date.now() : entry.solvedAt,
    updatedAt: Date.now(),
  }
}

export function withStar(entry: ProgressEntry, starred: boolean): ProgressEntry {
  return { ...entry, starred, updatedAt: Date.now() }
}

export function withNotes(entry: ProgressEntry, notes: string): ProgressEntry {
  return { ...entry, notes, updatedAt: Date.now() }
}
