import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { matchesQuery, searchHaystack, tokenize } from '../lib/utils'
import type { Difficulty, Problem, Status } from '../lib/types'

export type SortKey = 'default' | 'title' | 'heat' | 'difficulty' | 'status'

export interface FilterState {
  q: string
  topics: string[]
  difficulties: Difficulty[]
  companies: string[]
  patterns: string[]
  status: Status | 'all'
  sort: SortKey
}

const EMPTY: FilterState = {
  q: '',
  topics: [],
  difficulties: [],
  companies: [],
  patterns: [],
  status: 'all',
  sort: 'default',
}

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']
const STATUSES: Status[] = ['todo', 'attempted', 'solved']
const SORTS: SortKey[] = ['default', 'title', 'heat', 'difficulty', 'status']

function list(params: URLSearchParams, key: string): string[] {
  const raw = params.get(key)
  if (!raw) return []
  return raw
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

/**
 * Filter state that lives entirely in the URL, so any filtered view can be
 * bookmarked or shared.
 */
export function useFilters() {
  const [params, setParams] = useSearchParams()

  const filters = useMemo<FilterState>(() => {
    const status = params.get('status') as Status | null
    const sort = params.get('sort') as SortKey | null
    return {
      q: params.get('q') ?? '',
      topics: list(params, 'topic'),
      difficulties: list(params, 'diff').filter((d): d is Difficulty =>
        DIFFICULTIES.includes(d as Difficulty),
      ),
      companies: list(params, 'company'),
      patterns: list(params, 'pattern'),
      status: status && STATUSES.includes(status) ? status : 'all',
      sort: sort && SORTS.includes(sort) ? sort : 'default',
    }
  }, [params])

  const write = useCallback(
    (next: FilterState) => {
      const sp = new URLSearchParams()
      if (next.q) sp.set('q', next.q)
      if (next.topics.length) sp.set('topic', next.topics.join(','))
      if (next.difficulties.length) sp.set('diff', next.difficulties.join(','))
      if (next.companies.length) sp.set('company', next.companies.join(','))
      if (next.patterns.length) sp.set('pattern', next.patterns.join(','))
      if (next.status !== 'all') sp.set('status', next.status)
      if (next.sort !== 'default') sp.set('sort', next.sort)
      setParams(sp, { replace: true })
    },
    [setParams],
  )

  const update = useCallback(
    (patch: Partial<FilterState>) => write({ ...filters, ...patch }),
    [filters, write],
  )

  const toggle = useCallback(
    (key: 'topics' | 'difficulties' | 'companies' | 'patterns', value: string) => {
      const current = filters[key] as string[]
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      update({ [key]: next } as Partial<FilterState>)
    },
    [filters, update],
  )

  const reset = useCallback(() => write(EMPTY), [write])

  const activeCount =
    filters.topics.length +
    filters.difficulties.length +
    filters.companies.length +
    filters.patterns.length +
    (filters.status !== 'all' ? 1 : 0) +
    (filters.q ? 1 : 0)

  return { filters, update, toggle, reset, activeCount }
}

const DIFFICULTY_RANK: Record<Difficulty, number> = { Easy: 0, Medium: 1, Hard: 2 }
const STATUS_RANK: Record<Status, number> = { solved: 0, attempted: 1, todo: 2 }

export interface FilteredOptions {
  statusOf: (problem: Problem) => Status
  sort: SortKey
}

/** Applies the active filters and sort to a list of problems. */
export function applyFilters(
  all: Problem[],
  filters: FilterState,
  statusOf: (problem: Problem) => Status,
): Problem[] {
  const tokens = tokenize(filters.q)
  const haystacks = new Map(all.map((p) => [p.id, searchHaystack(p)]))

  let result = all.filter((problem) => {
    if (!matchesQuery(haystacks.get(problem.id) ?? '', tokens)) return false
    if (filters.topics.length && !filters.topics.includes(problem.topic)) return false
    if (filters.difficulties.length && !filters.difficulties.includes(problem.difficulty)) return false
    if (filters.companies.length && !filters.companies.some((c) => problem.companies.includes(c)))
      return false
    if (filters.patterns.length && !filters.patterns.some((p) => problem.patterns.includes(p)))
      return false
    if (filters.status !== 'all' && statusOf(problem) !== filters.status) return false
    return true
  })

  result = [...result]
  switch (filters.sort) {
    case 'title':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'heat':
      result.sort((a, b) => b.frequency - a.frequency || a.title.localeCompare(b.title))
      break
    case 'difficulty':
      result.sort(
        (a, b) =>
          DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty] ||
          a.title.localeCompare(b.title),
      )
      break
    case 'status':
      result.sort(
        (a, b) =>
          STATUS_RANK[statusOf(a)] - STATUS_RANK[statusOf(b)] ||
          b.frequency - a.frequency ||
          a.title.localeCompare(b.title),
      )
      break
    default:
      break
  }
  return result
}
