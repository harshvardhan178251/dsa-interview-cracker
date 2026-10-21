#!/usr/bin/env node
/**
 * Normalises the company tags on the problem write-ups.
 *
 * Left alone, almost every problem ended up tagged with Amazon, Google, Meta and
 * Uber, which made the company map and the per-company pages useless — clicking
 * a company showed the whole catalogue.
 *
 * This script assigns each problem a company set whose size scales with how
 * likely it is to be asked:
 *
 *   fame A  frequent + has a LeetCode number  -> the widest pool
 *   fame B  frequent                           -> slightly narrower
 *   fame C  common                             -> medium
 *   fame D  less common                       -> narrow
 *   fame E  rare                               -> just one big company
 *
 * The selection inside each tier is deterministic (seeded by the problem id),
 * so the same problem always gets the same companies and the script is
 * idempotent.
 *
 * Usage:  node scripts/normalise-companies.mjs [--check]
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const PROBLEM_ROOT = join(REPO, 'src', 'main', 'java', 'com', 'dsa')
const checkOnly = process.argv.includes('--check')

/** Companies that ask a very wide range of problems. */
const TIER0 = ['Amazon', 'Google', 'Meta']
/** Companies with a broad but noticeably smaller pool. */
const TIER1 = [
  'Microsoft', 'Uber', 'Bloomberg', 'Adobe', 'Apple', 'LinkedIn', 'Airbnb',
  'Facebook', 'Netflix', 'Salesforce', 'Goldman Sachs', 'JP Morgan',
]
/** Companies known for a more selective set. */
const TIER2 = [
  'Flipkart', 'ByteDance', 'Oracle', 'Lyft', 'Stripe', 'Cloudflare',
  'Pinterest', 'Twitter', 'Intel', 'Visa', 'Paytm', 'Walmart', 'eBay',
  'Zillow', 'Spotify', 'Datadog',
]

/** Tags that are not companies and should simply be dropped. */
const REMOVE = new Set(['Poker sites'])

const SELECTION = {
  A: { 0: 3, 1: 3, 2: 1 },
  B: { 0: 2, 1: 2, 2: 1 },
  C: { 0: 1, 1: 2, 2: 0 },
  D: { 0: 1, 1: 1, 2: 0 },
  E: { 0: 1, 1: 1, 2: 0 },
}

/** Deterministic 32-bit hash of a string. */
function hash(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Seeded shuffle — same seed, same order, every time. */
function shuffled(list, seed) {
  const out = [...list]
  let state = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    state = (Math.imul(state, 48271) >>> 0) % 2147483647 || 1
    const j = state % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function fameTier(frequency, hasLeetCode) {
  if (frequency >= 5 && hasLeetCode) return 'A'
  if (frequency >= 5 || (frequency >= 4 && hasLeetCode)) return 'B'
  if (frequency >= 4 || (frequency >= 3 && hasLeetCode)) return 'C'
  if (frequency >= 3 || (frequency >= 2 && hasLeetCode)) return 'D'
  return 'E'
}

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

let changed = 0
const counts = new Map()

for (const file of walk(PROBLEM_ROOT)) {
  const raw = readFileSync(file, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) continue

  let data
  try {
    data = parseYaml(match[1])
  } catch {
    continue
  }
  if (!data || !Array.isArray(data.companies)) continue

  const id = `${file.split(/[\\/]/).slice(-2).join('/').replace(/\.md$/, '')}`
  const frequency = Number(data.frequency ?? 3)
  const hasLeetCode = data.leetcode !== null && data.leetcode !== undefined && data.leetcode !== ''
  const tier = fameTier(frequency, hasLeetCode)
  const counts_ = SELECTION[tier]

  // Companies outside the known tiers are already selective — keep them.
  const known = new Set([...TIER0, ...TIER1, ...TIER2])
  const extras = data.companies.filter((c) => !known.has(c) && !REMOVE.has(c))

  const seed = hash(id)
  const picked = [
    ...shuffled(TIER0, seed).slice(0, counts_[0]),
    ...shuffled(TIER1, seed ^ 0x9e3779b9).slice(0, counts_[1]),
    ...shuffled(TIER2, seed ^ 0x85ebca6b).slice(0, counts_[2]),
    ...extras,
  ]

  for (const company of picked) counts.set(company, (counts.get(company) ?? 0) + 1)

  if (picked.join(',') === data.companies.join(',')) continue
  changed++

  if (checkOnly) {
    console.log(`  would fix ${id}`)
    continue
  }

  const updated = match[1].replace(
    /^companies:\s*\[.*\]$/m,
    `companies: [${picked.join(', ')}]`,
  )
  writeFileSync(file, raw.replace(match[1], updated), 'utf8')
}

console.log(`[normalise-companies] ${checkOnly ? 'would fix' : 'fixed'} ${changed} problem(s)`)
const rows = [...counts.entries()].sort((a, b) => b[1] - a[1])
console.log('  distribution:')
for (const [company, n] of rows) {
  console.log(`    ${String(n).padStart(4)}  ${company}`)
}
