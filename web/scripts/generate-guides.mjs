#!/usr/bin/env node
/**
 * Generates the data-driven guides from the problem catalogue:
 *
 *   docs/guides/02-company-problem-map.md
 *   docs/guides/03-pattern-index.md
 *
 * These are regenerated rather than hand-maintained so they can never drift
 * out of sync with the problems that actually exist.
 *
 * Usage:  node scripts/generate-guides.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { TIER_LABELS, TIERS, tierIndexOf } from '../../scripts/company-tiers.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = join(__dirname, '..')
const REPO_ROOT = join(WEB_ROOT, '..')
const DATA_FILE = join(WEB_ROOT, 'src', 'data', 'index.json')
const OUT_DIR = join(REPO_ROOT, 'docs', 'guides')

if (!existsSync(DATA_FILE)) {
  console.error('index.json not found — run `node scripts/generate-data.mjs` first.')
  process.exit(1)
}

const problems = JSON.parse(readFileSync(DATA_FILE, 'utf8'))
mkdirSync(OUT_DIR, { recursive: true })

const byId = new Map(problems.map((p) => [p.id, p]))
const link = (p) => `[${p.title}](https://github.com/)`

/* -------------------------------------------------------------------------- */
/* Company map                                                                */
/* -------------------------------------------------------------------------- */

const companyCounts = new Map()
for (const p of problems) {
  for (const company of p.companies) {
    if (!companyCounts.has(company)) companyCounts.set(company, [])
    companyCounts.get(company).push(p)
  }
}

const sortedCompanies = [...companyCounts.entries()].sort(
  (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
)

const companyRows = sortedCompanies
  .map(([company, list]) => {
    const hot = list.filter((p) => p.frequency >= 5).length
    const medium = list.filter((p) => p.frequency === 4).length
    const tier = tierIndexOf(company)
    return `| **${company}** | ${TIER_LABELS[tier] ?? '—'} | ${list.length} | ${hot} | ${medium} | ${list.filter((p) => p.difficulty === 'Hard').length} |`
  })
  .join('\n')

const tierSections = TIERS.map((tier, index) => {
  const members = tier
    .map((company) => ({ company, count: companyCounts.get(company)?.length ?? 0 }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count || a.company.localeCompare(b.company))
  if (!members.length) return ''
  const rows = members
    .map((entry) => `| ${entry.company} | ${entry.count} | ${Math.round((entry.count / problems.length) * 100)}% |`)
    .join('\n')
  return `### ${TIER_LABELS[index]}\n\n| Company | Problems tagged | Share of the set |\n|---|---:|---:|\n${rows}\n`
}).join('\n')

const itServices = TIERS[3]
  .map((company) => ({ company, count: companyCounts.get(company)?.length ?? 0 }))
  .filter((entry) => entry.count > 0)
  .sort((a, b) => b.count - a.count)

const itServicesRows = itServices
  .map((entry) => `| **${entry.company}** | ${entry.count} | ${Math.round((entry.count / problems.length) * 100)}% |`)
  .join('\n')

const companyDetail = sortedCompanies
  .map(([company, list]) => {
    const items = list
      .sort((a, b) => b.frequency - a.frequency || a.title.localeCompare(b.title))
      .map((p) => `- **${p.title}** — ${p.difficulty} · \`${p.id}\``)
      .join('\n')
    return `### ${company} (${list.length})\n\n${items}\n`
  })
  .join('\n')

const companyDoc = `---
title: Company problem map
order: 2
summary: Which problems are tagged for which company, so you can focus revision on the set that actually comes up in your target company's loop.
---

# Company problem map

> **This page is generated.** It is rebuilt from the problem catalogue by
> \`web/scripts/generate-guides.mjs\`, so it always matches the problems that exist.

Companies are tagged from publicly reported interview experiences. Treat them as a
*frequency hint*, not a guarantee — the same core set of problems keeps coming back
regardless of who is interviewing.

## How the tags are assigned

A problem's company set is sized to **how likely it is to be asked**, so the map stays
discriminating instead of tagging everything with everybody:

- A ★★★★★ problem with a LeetCode number gets the widest set — the big product
  companies, most of the large product and fintech names, and a couple of the rest.
- A rarer problem gets a much narrower set.
- The selection inside each tier is deterministic, so the map is stable across runs.

That is why **Amazon shows ~190 problems and Flipkart shows ~13** — rather than every
company showing all ${problems.length}.

## Summary

| Company | Tier | Problems | ★★★★★ | ★★★★ | Hard |
|---|---|---:|---:|---:|---:|
${companyRows}

## Reading this

- **★★★★★** means the problem is asked repeatedly and often appears in the first round.
  If you have limited time, do these first.
- A ★★★★★ problem in a company you are targeting outranks a ★★★ problem at a company
  you are not.
- The intersection across companies is the safest set to master.

## Companies by tier

${tierSections}
## IT services and campus hiring

The IT services and global SIs hire at volume and run **DSA-heavy campus loops**, so
their problem pools are wide — but narrower than the product companies, and weighted
towards the classic curriculum: arrays, strings, linked lists, trees, graphs, sorting and
dynamic programming.

| Company | Problems tagged | Share of the set |
|---|---:|---:|
${itServicesRows}

**What to expect in an IT services interview.** The loop is usually **aptitude → coding →
HR**, and the coding round leans hard on the standard patterns:

- Arrays and strings — frequency counting, two pointers, sliding window
- Sorting and searching — custom comparators, binary search
- Linked lists and stacks — reversal, cycle detection, queues
- Trees — traversals, BST operations, lowest common ancestor
- Graphs — BFS/DFS, topological sort, shortest path
- Dynamic programming — the classics: knapsack, LIS/LCS, coin change, grid paths

Covering those six areas well is more valuable for these loops than covering the hard
problems that product companies ask. The ★★★★ and ★★★ problems in this catalogue are
the ones that show up in the second and third rounds.

## The universal core

These problems show up at essentially every company. If you only do one thing, do these:

${problems
  .filter((p) => p.frequency >= 5)
  .sort((a, b) => a.topic.localeCompare(b.topic) || a.title.localeCompare(b.title))
  .map((p) => `- **${p.title}** (${p.difficulty}) — \`${p.id}\``)
  .join('\n')}

## Per-company breakdown

${companyDetail}
`

writeFileSync(join(OUT_DIR, '02-company-problem-map.md'), companyDoc)

/* -------------------------------------------------------------------------- */
/* Pattern index                                                              */
/* -------------------------------------------------------------------------- */

const byPattern = new Map()
for (const p of problems) {
  for (const pattern of p.patterns) {
    if (!byPattern.has(pattern)) byPattern.set(pattern, [])
    byPattern.get(pattern).push(p)
  }
}

const sortedPatterns = [...byPattern.entries()].sort(
  (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
)

const patternRows = sortedPatterns
  .map(([pattern, list]) => {
    const hot = list.filter((p) => p.frequency >= 5).length
    return `| **${pattern}** | ${list.length} | ${hot} | ${list[0].topicLabel} |`
  })
  .join('\n')

const patternDetail = sortedPatterns
  .map(([pattern, list]) => {
    const topics = [...new Set(list.map((p) => p.topicLabel))].join(', ')
    const items = list
      .sort((a, b) => b.frequency - a.frequency || a.title.localeCompare(b.title))
      .map((p) => `- ${p.title} — ${p.difficulty} · \`${p.id}\``)
      .join('\n')
    return `### ${pattern}\n\n*Topics: ${topics}*\n\n${items}\n`
  })
  .join('\n')

const patternDoc = `---
title: Interview pattern index
order: 3
summary: Every DSA problem is an instance of a small number of patterns. This index groups the whole catalogue by pattern so you can recognise one you have not seen yet.
---

# Interview pattern index

> **This page is generated.** It is rebuilt from the problem catalogue by
> \`web/scripts/generate-guides.mjs\`.

Almost every interview problem is one of a few dozen patterns wearing a different hat.
When you are stuck, the question is not *"which problem is this?"* but *"which pattern does
this shape match?"*.

## How to use the patterns

1. Read the problem statement and ask: **what is the shape of the input?**
   - Sorted array → two pointers, binary search
   - Array with duplicates → hash map, or sorting
   - Tree → recursion
   - Graph → BFS/DFS
   - Grid → BFS/DFS
   - "Minimum/maximum with a constraint" → greedy or DP
   - "How many ways" → DP
   - "Choose a subset" → backtracking
2. Look the shape up below.
3. Solve the **easiest** problem with that pattern first — usually there are three or four,
   and the easy one teaches you the shape.

## Pattern summary

| Pattern | Problems | ★★★★★ | Main topic |
|---|---:|---:|---|
${patternRows}

## The pattern families

**Linear scans** — Two Pointers, Sliding Window, Prefix Sum, Prefix/Suffix, Dutch National Flag.
*Shape:* you are looking at a contiguous range and can rule out candidates as you go.

**Lookup** — Hashing, Frequency Counting, Hash Map, Hash Set.
*Shape:* you need "have I seen this before?" in constant time.

**Ordered access** — Binary Search, Binary Search on Answer, Rotated Sorted Array, Tapping.
*Shape:* the input is sorted, or the answer is monotonic.

**Selection** — Heaps, Top-K, Two Heaps, Quickselect.
*Shape:* you need the k-th smallest, or the k largest, without sorting everything.

**Structure building** — Linked List, Stack, Queue, Monotonic Stack, Deque, Trie, Heap.
*Shape:* the problem is really asking you to maintain a data structure under a sequence of
operations.

**Traversal** — BFS, DFS, Trees, Graph Traversal, Topological Sort, Union-Find.
*Shape:* you are exploring a structure, and order matters (or does not).

**Recursive decomposition** — Dynamic Programming, Divide and Conquer, Backtracking,
Bit Manipulation.
*Shape:* the problem splits into smaller copies of itself.

**Optimisation** — Greedy, Intervals, Sliding Window, Two Pointers, Greedy + Heap.
*Shape:* there is a constraint and you want the best arrangement under it.

**Merger** — Merge Sort, Merge K Sorted Lists, K-Way Merge, Linked List Merge.
*Shape:* several already-ordered inputs.

## Per-pattern breakdown

${patternDetail}
`

writeFileSync(join(OUT_DIR, '03-pattern-index.md'), patternDoc)

/* -------------------------------------------------------------------------- */
/* Coverage matrix                                                             */
/* -------------------------------------------------------------------------- */

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

const TOPIC_ORDER = [
  'arrays', 'strings', 'linkedlist', 'stacks', 'queues', 'heaps', 'binarysearch',
  'sorting', 'hashing', 'twopointers', 'slidingwindow', 'prefixsum', 'trees', 'trie',
  'graphs', 'advancedgraphs', 'dynamicprogramming', 'backtracking', 'greedy', 'intervals',
  'bitmanipulation', 'math', 'design', 'concurrency',
]

const byTopic = new Map()
for (const topic of TOPIC_ORDER) {
  const list = problems.filter((p) => p.topic === topic)
  if (list.length) {
    byTopic.set(
      { key: topic, label: list[0].topicLabel, order: TOPIC_ORDER.indexOf(topic) },
      list,
    )
  }
}

const matrixRows = [...byTopic.entries()]
  .sort((a, b) => a[0].order - b[0].order)
  .map(([topic, list]) => {
    const counts = DIFFICULTIES.map((d) => list.filter((p) => p.difficulty === d).length)
    const hot = list.filter((p) => p.frequency >= 5).length
    const tested = list.filter((p) => p.hasTest).length
    const documented = list.filter((p) => p.hasDoc).length
    return `| **${topic.label}** | ${list.length} | ${counts[0]} | ${counts[1]} | ${counts[2]} | ${hot} | ${documented}/${list.length} | ${tested}/${list.length} |`
  })
  .join('\n')

const total = problems.length
const totalEasy = problems.filter((p) => p.difficulty === 'Easy').length
const totalMedium = problems.filter((p) => p.difficulty === 'Medium').length
const totalHard = problems.filter((p) => p.difficulty === 'Hard').length
const totalHot = problems.filter((p) => p.frequency >= 5).length
const totalDocs = problems.filter((p) => p.hasDoc).length
const totalTests = problems.filter((p) => p.hasTest).length

const companyTotals = sortedCompanies
  .map(([company, list]) => `| ${company} | ${list.length} |`)
  .join('\n')

const coverageDoc = `---
title: Coverage matrix
order: 4
summary: Exactly what is in the set — problem counts per topic and difficulty, how many are interview hot, and how complete the write-ups and tests are.
---

# Coverage matrix

> **This page is generated.** It is rebuilt from the problem catalogue by
> \`web/scripts/generate-guides.mjs\`.

## Totals

| Metric | Count |
|---|---:|
| **Problems** | ${total} |
| Easy | ${totalEasy} |
| Medium | ${totalMedium} |
| Hard | ${totalHard} |
| ★★★★★ (asked constantly) | ${totalHot} |
| With a write-up | ${totalDocs} / ${total} |
| With a JUnit test | ${totalTests} / ${total} |

**If you only have two weeks**, the ★★★★★ problems are the set to work through.

## By topic

| Topic | Problems | Easy | Medium | Hard | ★★★★★ | Write-ups | Tests |
|---|---:|---:|---:|---:|---:|---:|---:|
${matrixRows}

## By company

| Company | Problems tagged |
|---|---:|
${companyTotals}

## Difficulty mix

A healthy interview-prep set is roughly **50% easy, 40% medium, 10% hard**. The easy
problems are not padding — they are where you build the pattern recognition that makes the
medium ones fast, and they are what you will actually be asked in a phone screen.

The ★★★★★ column is the better signal of what to prioritise. It marks the problems that
keep appearing across companies, not the ones that are conceptually the hardest.
`

writeFileSync(join(OUT_DIR, '04-coverage-matrix.md'), coverageDoc)

/* -------------------------------------------------------------------------- */
/* Full problem index                                                          */
/* -------------------------------------------------------------------------- */

const indexRows = [...byTopic.entries()]
  .sort((a, b) => a[0].order - b[0].order)
  .map(([topic, list]) => {
    const items = list
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((p) => {
        const lc = p.leetcode ? `LC ${p.leetcode}` : '—'
        const stars = '★'.repeat(p.frequency) + '☆'.repeat(5 - p.frequency)
        const patterns = p.patterns.join(', ')
        const companies = p.companies.length ? p.companies.slice(0, 3).join(', ') : '—'
        return `| ${p.title} | ${p.difficulty} | ${lc} | ${stars} | ${patterns} | ${companies} |`
      })
      .join('\n')
    return `### ${topic.label} (${list.length})\n\n| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |\n|---|---|---|---|---|---|\n${items}\n`
  })
  .join('\n')

const problemIndexDoc = `---
title: Full problem index
order: 5
summary: Every problem in the repository, grouped by topic, with difficulty, LeetCode number, interview heat, patterns and company tags.
---

# Full problem index

> **This page is generated.** It is rebuilt from the problem catalogue by
> \`web/scripts/generate-guides.mjs\`.

**${total} problems** across ${byTopic.size} topics. The heat column is the interview
frequency: ★★★★★ means the problem is asked constantly, ★ means it is rare.

Use the [pattern index](03-pattern-index) to work by technique instead, and the
[company problem map](02-company-problem-map) to work by target company.

${indexRows}
`

writeFileSync(join(OUT_DIR, '05-problem-index.md'), problemIndexDoc)

// The hand-written guides use the same numbering; shift the generated ones so the
// `order` values stay unique across the whole set.
for (const [file, order] of [
  ['02-company-problem-map.md', 2],
  ['03-pattern-index.md', 3],
  ['04-coverage-matrix.md', 4],
  ['05-problem-index.md', 7],
]) {
  const path = join(OUT_DIR, file)
  const text = readFileSync(path, 'utf8')
  writeFileSync(path, text.replace(/^order: \d+$/m, `order: ${order}`))
}

console.log(
  `[generate-guides] wrote 02-company-problem-map.md, 03-pattern-index.md, ` +
    `04-coverage-matrix.md and 05-problem-index.md (${problems.length} problems, ` +
    `${sortedCompanies.length} companies, ${sortedPatterns.length} patterns)`,
)
