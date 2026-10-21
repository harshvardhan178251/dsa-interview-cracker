#!/usr/bin/env node
/**
 * Generates the website's data files by scanning the Java problem tree.
 *
 *   src/main/java/com/dsa/<topic>/<Problem>.java   -> solution source
 *   src/main/java/com/dsa/<topic>/<Problem>.md     -> frontmatter + prose
 *   src/test/java/com/dsa/<topic>/<Name>Test.java  -> test detection
 *   docs tree (markdown files)                     -> guides
 *
 * Outputs (committed to the repo so the site builds without running Node):
 *   web/src/data/problems.json
 *   web/src/data/guides.json
 *   web/src/data/meta.json
 *
 * Usage:  node scripts/generate-data.mjs [--watch]
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname, basename, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = join(__dirname, '..')
const REPO_ROOT = join(WEB_ROOT, '..')
const JAVA_ROOT = join(REPO_ROOT, 'src', 'main', 'java', 'com', 'dsa')
const TEST_ROOT = join(REPO_ROOT, 'src', 'test', 'java', 'com', 'dsa')
const DOCS_ROOT = join(REPO_ROOT, 'docs')
const OUT_DIR = join(WEB_ROOT, 'src', 'data')
const PROBLEM_DIR = join(OUT_DIR, 'problems')
const GUIDE_DIR = join(OUT_DIR, 'guides')

/* -------------------------------------------------------------------------- */
/* Topic registry                                                              */
/* -------------------------------------------------------------------------- */

const TOPICS = [
  ['arrays', 'Arrays', 'Scan and rearrange a flat collection of values.', 1],
  ['strings', 'Strings', 'Parsing, palindromes, anagrams and character-level tricks.', 2],
  ['linkedlist', 'Linked List', 'Pointer chasing, reversal and pointer rewiring.', 3],
  ['stacks', 'Stacks', 'LIFO structures, monotonic stacks and expression evaluation.', 4],
  ['queues', 'Queues & Deques', 'FIFO structures and the two-ended variants.', 5],
  ['heaps', 'Heaps & Priority Queues', 'Top-K selection, streaming and merge problems.', 6],
  ['binarysearch', 'Binary Search', 'Search on an index, on an answer, and on rotated arrays.', 7],
  ['sorting', 'Sorting', 'The classic comparison sorts plus counting and partitioning.', 8],
  ['hashing', 'Hashing', 'Maps and sets for near-constant-time lookups.', 9],
  ['twopointers', 'Two Pointers', 'Two indices walking the same array.', 10],
  ['slidingwindow', 'Sliding Window', 'A window that expands and contracts.', 11],
  ['prefixsum', 'Prefix & Suffix Sums', 'Precomputed running totals and difference arrays.', 12],
  ['trees', 'Trees & BST', 'Depth-first and breadth-first work on binary trees.', 13],
  ['trie', 'Trie', 'Prefix trees for dictionary and autocomplete problems.', 14],
  ['graphs', 'Graphs', 'BFS, DFS, topological order and shortest paths.', 15],
  ['advancedgraphs', 'Advanced Graphs', 'MST, strongly connected components and all-pairs paths.', 16],
  ['dynamicprogramming', 'Dynamic Programming', 'Memoised subproblems, knapsack, LIS/LCS and grids.', 17],
  ['backtracking', 'Backtracking', 'Choose, explore, undo.', 18],
  ['greedy', 'Greedy', 'Take the locally best move and prove it works.', 19],
  ['intervals', 'Intervals', 'Overlapping and nested ranges.', 20],
  ['bitmanipulation', 'Bit Manipulation', 'XOR, shifts and masks.', 21],
  ['math', 'Math & Number Theory', 'Modular arithmetic, primes and number tricks.', 22],
  ['design', 'Design', 'Data structures built from scratch under a contract.', 23],
  ['concurrency', 'Concurrency', 'Threads, locks, atomics and queues.', 24],
]

const TOPIC_META = new Map(TOPICS.map(([key, label, description, order]) => [key, { key, label, description, order }]))

/* -------------------------------------------------------------------------- */
/* Utility class registry — used to inline dependencies into Judge0 sources     */
/* -------------------------------------------------------------------------- */

/** util class name -> other util classes it needs inlined alongside it */
const UTIL_DEPS = {
  FastScanner: [],
  ListNode: [],
  TreeNode: [],
  TrieNode: [],
  MinHeap: [],
  MaxHeap: ['MinHeap'],
  UnionFind: [],
  Pair: [],
  Interval: [],
}

const UTIL_FILES = new Map(
  Object.keys(UTIL_DEPS).map((name) => [name, join(JAVA_ROOT, 'utils', `${name}.java`)]),
)

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function read(file) {
  return readFileSync(file, 'utf8')
}

function listFiles(dir, ext) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith(ext) && statSync(join(dir, f)).isFile())
    .sort()
}

function listDirs(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter((f) => statSync(join(dir, f)).isDirectory()).sort()
}

/** Split a markdown file into its YAML frontmatter and the body. */
function splitFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text)
  if (!match) return { data: {}, body: text }
  let data = {}
  try {
    data = parseYaml(match[1]) ?? {}
  } catch (err) {
    console.warn(`  ! could not parse frontmatter: ${err.message}`)
  }
  return { data, body: match[2] }
}

/** Pull public static method names out of a Java source file. */
function extractMethods(source) {
  const methods = []
  const re = /public\s+static\s+(?!class\b)[\w<>\[\],.?\s]*?(\w+)\s*\(/g
  let m
  while ((m = re.exec(source)) !== null) {
    if (!methods.includes(m[1])) methods.push(m[1])
  }
  return methods
}

/**
 * Prepare a util source so it can be appended to another compilation unit.
 * The `package` line and the import lines are returned separately because
 * imports must precede every type declaration in the finished file.
 */
function splitUtilSource(source) {
  const withoutPackage = source.replace(/^\s*package\s+[\w.]+\s*;?\s*$/m, '')
  const imports = [...withoutPackage.matchAll(/^\s*import\s+[\w.]+\s*;\s*$/gm)].map((m) => m[0].trim())
  const body = withoutPackage
    .replace(/^\s*import\s+[\w.]+\s*;\s*$/gm, '')
    .replace(/\bpublic\s+(final\s+)?(class|interface|enum)\b/g, '$1$2')
    .trim()
  return { imports, body }
}

/**
 * Make a problem source self-contained:
 *  - strip the package declaration (Judge0 compiles a default-package `Main.java`)
 *  - rename the problem class to `Main`
 *  - inline every `com.dsa.utils.*` type it uses as a package-private class
 *  - hoist and de-duplicate all imports so they precede every type declaration
 */
function buildJudgeSource(source, className) {
  let out = source

  // Which utils does this file use?
  const used = new Set()
  const wildcard = /^import\s+com\.dsa\.utils\.\*\s*;$/m.test(out)
  const explicit = [...out.matchAll(/^import\s+com\.dsa\.utils\.(\w+)\s*;$/gm)].map((m) => m[1])

  for (const name of explicit) used.add(name)
  if (wildcard) {
    for (const name of Object.keys(UTIL_FILES)) {
      if (new RegExp(`\\b${name}\\b`).test(out)) used.add(name)
    }
  }
  for (const name of Object.keys(UTIL_FILES)) {
    if (!used.has(name) && new RegExp(`new\\s+${name}\\s*[<(]`).test(out)) used.add(name)
  }

  // Expand dependencies.
  const inlined = new Set()
  const visit = (name) => {
    if (inlined.has(name)) return
    if (name === className) return // never shadow the problem class
    inlined.add(name)
    for (const dep of UTIL_DEPS[name] ?? []) visit(dep)
  }
  for (const name of used) visit(name)

  // Drop the now-unnecessary imports of the inlined utils.
  out = out.replace(/^\s*import\s+com\.dsa\.utils\.\*;\s*$/gm, '')
  for (const name of inlined) {
    out = out.replace(new RegExp(`^\\s*import\\s+com\\.dsa\\.utils\\.${name}\\s*;\\s*$`, 'gm'), '')
  }

  // Rename the problem class to Main.
  const declRe = new RegExp(`^(\\s*)((?:[\\w$]+\\s+)*?)class\\s+${className}\\b`, 'm')
  out = out.replace(declRe, (_m, indent, mods) => {
    const cleaned = mods.replace(/\b(public|final|abstract|static|strictfp)\b/g, '').trim()
    return `${indent}public ${cleaned ? cleaned + ' ' : ''}class Main`
  })
  out = out.replace(new RegExp(`\\b${className}\\b`, 'g'), 'Main')

  // Judge0 compiles a default-package `Main.java`, so drop the package declaration.
  out = out.replace(/^\s*package\s+[\w.]+\s*;?\s*$/m, '')

  // Collect imports from the problem and from the inlined utils, then hoist them.
  const problemImports = [...out.matchAll(/^\s*import\s+[\w.]+\s*;\s*$/gm)].map((m) => m[0].trim())
  out = out.replace(/^\s*import\s+[\w.]+\s*;\s*$/gm, '')

  const utilBodies = []
  const extraImports = []
  for (const name of inlined) {
    const file = UTIL_FILES.get(name)
    if (!file || !existsSync(file)) {
      console.warn(`  ! missing util source for ${name}`)
      continue
    }
    const { imports, body } = splitUtilSource(read(file))
    extraImports.push(...imports)
    utilBodies.push(`// ---------- inlined com.dsa.utils.${name} ----------\n${body}`)
  }

  const imports = []
  const seenImports = new Set()
  for (const imp of [...problemImports, ...extraImports]) {
    if (!seenImports.has(imp)) {
      seenImports.add(imp)
      imports.push(imp)
    }
  }

  const header = imports.length ? `${imports.join('\n')}\n\n` : ''
  const tail = utilBodies.length ? `\n\n${utilBodies.join('\n\n')}\n` : ''
  return `${header}${out.trim()}${tail}`
}

/* -------------------------------------------------------------------------- */
/* Problems                                                                    */
/* -------------------------------------------------------------------------- */

function collectProblems() {
  const problems = []
  const topics = listDirs(JAVA_ROOT)

  for (const topic of topics) {
    if (topic === 'utils' || topic === 'templates') continue
    const topicDir = join(JAVA_ROOT, topic)
    const javaFiles = listFiles(topicDir, '.java')

    for (const file of javaFiles) {
      const className = basename(file, '.java')
      const source = read(join(topicDir, file))
      const mdFile = join(topicDir, `${className}.md`)
      const hasDoc = existsSync(mdFile)

      let data = {}
      let body = ''
      if (hasDoc) {
        const split = splitFrontmatter(read(mdFile))
        data = split.data
        body = split.body
      }

      const meta = TOPIC_META.get(topic) ?? {
        key: topic,
        label: topic,
        description: '',
        order: 99,
      }

      const title = data.title ?? className
      const slug = `${topic}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

      const difficulty = ['Easy', 'Medium', 'Hard'].includes(data.difficulty) ? data.difficulty : 'Easy'
      const hasTest = existsSync(join(TEST_ROOT, topic, `${className}Test.java`))

      problems.push({
        id: `${topic}.${className}`,
        slug,
        title,
        topic,
        topicLabel: meta.label,
        className,
        leetcode: toLeetCodeNumber(data.leetcode),
        difficulty,
        patterns: toArray(data.patterns),
        companies: toArray(data.companies),
        tags: toArray(data.tags),
        frequency: clamp(Number(data.frequency ?? 3), 1, 5),
        source,
        judgeSource: buildJudgeSource(source, className),
        doc: body,
        sampleInput: stringify(data.sampleInput ?? ''),
        sampleOutput: stringify(data.sampleOutput ?? ''),
        methods: extractMethods(source),
        hasTest,
        hasDoc,
      })
    }
  }

  problems.sort((a, b) => a.topic.localeCompare(b.topic) || a.title.localeCompare(b.title))
  return problems
}

/**
 * Normalises the `leetcode` frontmatter field.
 *
 * `Number(null)` is `0`, which is finite — so a naive `Number.isFinite(Number(x))`
 * check would turn "no LeetCode number" into problem 0. Only a real, positive
 * number counts.
 */
function toLeetCodeNumber(value) {
  if (value === null || value === undefined || value === '') return null
  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) return null
  return Math.trunc(number)
}

function toArray(value) {  if (value == null) return []
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean)
  return String(value)
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

function stringify(value) {
  if (value == null) return ''
  return String(value).replace(/\\n/g, '\n')
}

function clamp(n, lo, hi) {
  if (!Number.isFinite(n)) return lo
  return Math.min(hi, Math.max(lo, Math.round(n)))
}

/* -------------------------------------------------------------------------- */
/* Guides                                                                      */
/* -------------------------------------------------------------------------- */

const GUIDE_SOURCES = [
  { dir: join(DOCS_ROOT, 'guides'), category: 'guide' },
  { dir: join(DOCS_ROOT, 'topics'), category: 'topic' },
  { dir: join(DOCS_ROOT, 'system-design'), category: 'system-design' },
  { dir: join(DOCS_ROOT, 'lld'), category: 'lld' },
]

function collectGuides() {
  const guides = []

  for (const source of GUIDE_SOURCES) {
    if (!existsSync(source.dir)) continue
    const files = listFiles(source.dir, '.md')

    for (const file of files) {
      const raw = read(join(source.dir, file))
      const { data, body } = splitFrontmatter(raw)
      const name = basename(file, '.md')
      const slug = name.replace(/^\d+-/, '')
      const title = data.title ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

      guides.push({
        id: `${source.category}:${slug}`,
        slug: `${source.category}/${slug}`,
        title,
        category: source.category,
        topic: source.category === 'topic' ? slug : null,
        order: Number(data.order ?? 99),
        summary: data.summary ?? firstParagraph(body),
        body,
      })
    }
  }

  guides.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order || a.title.localeCompare(b.title))
  return guides
}

/** File name used for a guide's lazily-loaded body. */
function guideFileName(guide) {
  return `${guide.category}-${guide.slug.split('/').join('-')}.json`
}

function firstParagraph(body) {
  const match = body.match(/^(?:#+\s*)?([^\n#].*)$/m)
  return match ? match[1].trim().slice(0, 180) : ''
}

/* -------------------------------------------------------------------------- */
/* Meta                                                                        */
/* -------------------------------------------------------------------------- */

function buildMeta(problems, guides) {
  const counts = new Map()
  for (const p of problems) counts.set(p.topic, (counts.get(p.topic) ?? 0) + 1)

  const topics = TOPICS.map(([key, label, description, order]) => ({
    key,
    label,
    description,
    order,
    count: counts.get(key) ?? 0,
  })).filter((t) => t.count > 0 || TOPIC_META.has(t.key))

  const companies = [...new Set(problems.flatMap((p) => p.companies))].sort((a, b) =>
    a.localeCompare(b),
  )
  const patterns = [...new Set(problems.flatMap((p) => p.patterns))].sort((a, b) => a.localeCompare(b))

  const difficulties = { Easy: 0, Medium: 0, Hard: 0 }
  for (const p of problems) difficulties[p.difficulty] += 1

  return {
    title: 'DSA Interview Cracker',
    generatedAt: new Date().toISOString(),
    problemCount: problems.length,
    guideCount: guides.length,
    topics,
    companies,
    patterns,
    difficulties,
  }
}

/* -------------------------------------------------------------------------- */
/* Main                                                                        */
/* -------------------------------------------------------------------------- */

/** The heavy per-problem payload, split out so the catalogue stays small. */
function detailOf(problem) {
  return {
    id: problem.id,
    source: problem.source,
    judgeSource: problem.judgeSource,
    doc: problem.doc,
    methods: problem.methods,
  }
}

/** The light record used for listings, search and filters. */
function summaryOf(problem) {
  return {
    id: problem.id,
    slug: problem.slug,
    title: problem.title,
    topic: problem.topic,
    topicLabel: problem.topicLabel,
    className: problem.className,
    leetcode: problem.leetcode,
    difficulty: problem.difficulty,
    patterns: problem.patterns,
    companies: problem.companies,
    tags: problem.tags,
    frequency: problem.frequency,
    sampleInput: problem.sampleInput,
    sampleOutput: problem.sampleOutput,
    hasTest: problem.hasTest,
    hasDoc: problem.hasDoc,
  }
}

function main() {
  const problems = collectProblems()
  const guides = collectGuides()
  const meta = buildMeta(problems, guides)

  mkdirSync(OUT_DIR, { recursive: true })
  mkdirSync(PROBLEM_DIR, { recursive: true })
  mkdirSync(GUIDE_DIR, { recursive: true })

  // Remove stale per-item files so a renamed entry does not linger.
  for (const file of listFiles(PROBLEM_DIR, '.json')) {
    rmSync(join(PROBLEM_DIR, file), { force: true })
  }
  for (const file of listFiles(GUIDE_DIR, '.json')) {
    rmSync(join(GUIDE_DIR, file), { force: true })
  }

  writeFileSync(
    join(OUT_DIR, 'index.json'),
    JSON.stringify(problems.map(summaryOf), null, 2) + '\n',
  )
  for (const problem of problems) {
    const file = join(PROBLEM_DIR, `${problem.id}.json`)
    writeFileSync(file, JSON.stringify(detailOf(problem), null, 2) + '\n')
  }

  writeFileSync(
    join(OUT_DIR, 'guides.json'),
    JSON.stringify(
      guides.map(({ body, ...summary }) => ({ ...summary, file: guideFileName(summary) })),
      null,
      2,
    ) + '\n',
  )
  for (const guide of guides) {
    writeFileSync(
      join(GUIDE_DIR, guideFileName(guide)),
      JSON.stringify({ id: guide.id, body: guide.body }, null, 2) + '\n',
    )
  }

  writeFileSync(join(OUT_DIR, 'meta.json'), JSON.stringify(meta, null, 2) + '\n')

  const missingDoc = problems.filter((p) => !p.hasDoc)
  console.log(
    `[generate-data] ${problems.length} problems, ${guides.length} guides, ` +
      `${meta.topics.filter((t) => t.count).length} topics -> ${relative(REPO_ROOT, OUT_DIR)}`,
  )
  if (missingDoc.length) {
    console.log(`[generate-data] ${missingDoc.length} problem(s) without a .md doc:`)
    for (const p of missingDoc) console.log(`   - ${p.id}`)
  }
}

main()
