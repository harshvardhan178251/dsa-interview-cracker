import type { Difficulty, Problem, Status } from './types'

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** `Arrays` from `arrays`; `Dynamic Programming` from `dynamicprogramming`. */
export function humanizeTopic(key: string): string {
  const special: Record<string, string> = {
    twopointers: 'Two Pointers',
    slidingwindow: 'Sliding Window',
    binarysearch: 'Binary Search',
    linkedlist: 'Linked List',
    advancedgraphs: 'Advanced Graphs',
    bitmanipulation: 'Bit Manipulation',
    dynamicprogramming: 'Dynamic Programming',
    systemdesign: 'System Design',
  }
  if (special[key]) return special[key]
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Turn `arrays.TwoSum` into `arrays-two-sum`. */
export function problemSlug(topic: string, className: string): string {
  return `${slugify(topic)}-${slugify(className)}`
}

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: 'text-ok bg-ok-soft border-ok/30',
  Medium: 'text-warn bg-warn-soft border-warn/30',
  Hard: 'text-bad bg-bad-soft border-bad/30',
}

export const STATUS_STYLES: Record<Status, string> = {
  todo: 'bg-elevated text-muted border-line',
  attempted: 'bg-warn-soft text-warn border-warn/30',
  solved: 'bg-ok-soft text-ok border-ok/30',
}

export const STATUS_LABEL: Record<Status, string> = {
  todo: 'To do',
  attempted: 'Attempted',
  solved: 'Solved',
}

export const STATUS_ORDER: Status[] = ['todo', 'attempted', 'solved']

export function nextStatus(current: Status): Status {
  const i = STATUS_ORDER.indexOf(current)
  return STATUS_ORDER[(i + 1) % STATUS_ORDER.length]
}

/** Star display, e.g. `★★★☆☆`. */
export function heatStars(frequency: number): string {
  const n = Math.max(0, Math.min(5, Math.round(frequency)))
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}

/**
 * Normalised text used for free-text search across a problem.
 */
export function searchHaystack(p: Problem): string {
  return [
    p.title,
    p.topicLabel,
    p.className,
    p.leetcode ? `leetcode ${p.leetcode} lc${p.leetcode}` : '',
    p.patterns.join(' '),
    p.companies.join(' '),
    p.tags.join(' '),
    p.difficulty,
  ]
    .join(' ')
    .toLowerCase()
}

/** Split a query into lowercase tokens; every token must match somewhere. */
export function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter(Boolean)
}

export function matchesQuery(haystack: string, tokens: string[]): boolean {
  if (tokens.length === 0) return true
  return tokens.every((t) => haystack.includes(t))
}

/** Human readable elapsed time for the review queue. */
export function timeAgo(ts: number | null): string {
  if (!ts) return 'never'
  const diff = Date.now() - ts
  const day = 86_400_000
  if (diff < 3_600_000) return `${Math.max(1, Math.floor(diff / 60_000))}m ago`
  if (diff < day) return `${Math.floor(diff / 3_600_000)}h ago`
  const days = Math.floor(diff / day)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

export function formatCount(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1)}…`
}

/** Highlight matched search tokens inside a string, returning JSX-safe segments. */
export function splitHighlight(text: string, tokens: string[]): { text: string; hit: boolean }[] {
  if (tokens.length === 0) return [{ text, hit: false }]
  const pattern = tokens
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  if (!pattern) return [{ text, hit: false }]
  const re = new RegExp(`(${pattern})`, 'gi')
  return text
    .split(re)
    .filter((s) => s !== '')
    .map((s) => ({ text: s, hit: tokens.some((t) => s.toLowerCase() === t.toLowerCase()) }))
}
