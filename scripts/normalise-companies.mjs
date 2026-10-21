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

import { REMOVE, SELECTION, TIERS, fameTier } from './company-tiers.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const PROBLEM_ROOT = join(REPO, 'src', 'main', 'java', 'com', 'dsa')
const checkOnly = process.argv.includes('--check')

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
  const known = new Set(TIERS.flat())
  const extras = data.companies.filter((c) => !known.has(c) && !REMOVE.has(c))

  const seed = hash(id)
  const picked = []
  TIERS.forEach((tier, index) => {
    const count = counts_[index] ?? 0
    if (count === 0) return
    picked.push(...shuffled(tier, seed ^ (index * 0x9e3779b9)).slice(0, count))
  })
  picked.push(...extras)

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
