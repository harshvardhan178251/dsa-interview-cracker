#!/usr/bin/env node
/**
 * Verifies that every problem can run standalone — exactly the way Judge0 will run it.
 *
 * For each problem it:
 *   1. writes the generated `judgeSource` to a temp dir as `Main.java`
 *   2. compiles it with `javac`
 *   3. runs it with the problem's sample stdin
 *   4. compares stdout against the documented sample output
 *
 * Usage:  node scripts/verify-judge-sources.mjs [--id <problemId>]
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync, spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'src', 'data', 'problems')
const INDEX_FILE = join(__dirname, '..', 'src', 'data', 'index.json')

/** Usual Windows JDK install locations, used when JAVA_HOME is missing or stale. */
const JDK_ROOTS = [
  'C:\\Program Files\\Eclipse Adoptium',
  'C:\\Program Files\\Java',
  'C:\\Program Files\\Microsoft',
  'C:\\Program Files\\Zulu',
  'C:\\Program Files\\Amazon Corretto',
  'C:\\Program Files\\BellSoft',
  'C:\\Program Files\\Oracle',
]

function jdkCandidates() {
  const candidates = []
  if (process.env.JAVA_HOME) {
    candidates.push(join(process.env.JAVA_HOME, 'bin', 'javac.exe'))
    candidates.push(join(process.env.JAVA_HOME, 'bin', 'javac'))
  }
  for (const root of JDK_ROOTS) {
    let entries = []
    try {
      entries = readdirSync(root, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => join(root, e.name))
    } catch {
      continue
    }
    for (const dir of entries) {
      candidates.push(join(dir, 'bin', 'javac.exe'))
      candidates.push(join(dir, 'bin', 'javac'))
    }
  }
  candidates.push('javac')
  return candidates
}

function findJavac() {
  for (const c of jdkCandidates()) {
    const probe = spawnSync(c, ['-version'], { encoding: 'utf8' })
    if (!probe.error && probe.status === 0) return c
  }
  throw new Error(
    'javac not found. Install a JDK 17+ and set JAVA_HOME, e.g.\n' +
      '  $env:JAVA_HOME = "C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.20.101-hotspot"',
  )
}

/** The `java` launcher of the very same JDK that `javac` came from. */
function findJava(javac) {
  const dir = dirname(javac)
  const candidates = [join(dir, 'java.exe'), join(dir, 'java')]
  if (process.env.JAVA_HOME) {
    candidates.push(join(process.env.JAVA_HOME, 'bin', 'java.exe'), join(process.env.JAVA_HOME, 'bin', 'java'))
  }
  candidates.push('java')
  for (const c of candidates) {
    const probe = spawnSync(c, ['-version'], { encoding: 'utf8' })
    if (!probe.error && probe.status === 0) return c
  }
  throw new Error('java not found next to ' + javac)
}

function normalise(text) {
  return text.replace(/\r\n/g, '\n').trim()
}

const problemFiles = readdirSync(DATA_DIR).filter((f) => f.endsWith('.json')).sort()
// The per-problem detail files carry the source and the judge runner; the sample
// input/output live in the catalogue index. Prefer the detail file when it has them.
const summaries = existsSync(INDEX_FILE)
  ? new Map(JSON.parse(readFileSync(INDEX_FILE, 'utf8')).map((p) => [p.id, p]))
  : new Map()
const problems = problemFiles.map((file) => {
  const detail = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf8'))
  const summary = summaries.get(detail.id) ?? {}
  return {
    id: detail.id,
    judgeSource: detail.judgeSource,
    sampleInput: detail.sampleInput ?? summary.sampleInput,
    sampleOutput: detail.sampleOutput ?? summary.sampleOutput,
  }
})

const only = process.argv.includes('--id') ? process.argv[process.argv.indexOf('--id') + 1] : null
const selected = only ? problems.filter((p) => p.id === only || p.id.endsWith(`.${only}`)) : problems

if (!selected.length) {
  console.error(`No problem matched "${only}".`)
  process.exit(1)
}

const javac = findJavac()
const java = findJava(javac)
// A per-process directory keeps concurrent verification runs from deleting each other's work.
const workRoot = join(tmpdir(), `dsa-judge-verify-${process.pid}`)
rmSync(workRoot, { recursive: true, force: true })

let compiled = 0
let ranOk = 0
let mismatched = 0
let failed = 0
const failures = []

for (const problem of selected) {
  const dir = join(workRoot, problem.id.replace(/[^\w.-]/g, '_'))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'Main.java'), problem.judgeSource, 'utf8')

  const compile = spawnSync(javac, ['-nowarn', 'Main.java'], { cwd: dir, encoding: 'utf8' })
  if (compile.status !== 0) {
    failed++
    failures.push({ id: problem.id, stage: 'compile', detail: (compile.stderr || '').trim() })
    console.log(`  FAIL  ${problem.id}  (compile error)`)
    continue
  }
  compiled++

  if (!problem.sampleInput) {
    console.log(`  compile-only  ${problem.id}  (no sample input recorded)`)
    continue
  }

  const run = spawnSync(java, ['-cp', '.', 'Main'], {
    cwd: dir,
    encoding: 'utf8',
    input: problem.sampleInput,
    timeout: 20_000,
  })

  if (run.error) {
    failed++
    failures.push({ id: problem.id, stage: 'run', detail: run.error.message })
    console.log(`  FAIL  ${problem.id}  (runtime error: ${run.error.message})`)
    continue
  }

  const actual = normalise(run.stdout ?? '')
  const expected = normalise(problem.sampleOutput ?? '')

  if (expected && actual !== expected) {
    mismatched++
    failures.push({
      id: problem.id,
      stage: 'output',
      detail: `expected "${expected}" but got "${actual}"${run.stderr ? `\nstderr: ${run.stderr.trim()}` : ''}`,
    })
    console.log(`  MISMATCH  ${problem.id}\n     expected: ${expected}\n     actual:   ${actual}`)
    continue
  }

  ranOk++
  console.log(`  ok  ${problem.id}`)
}

rmSync(workRoot, { recursive: true, force: true })

console.log(
  `\n[verify-judge-sources] ${selected.length} problem(s): ` +
    `${compiled} compiled, ${ranOk} ran with matching output, ` +
    `${mismatched} output mismatch, ${failed} failed`,
)

if (failures.length) {
  console.log('\nFailures:')
  for (const f of failures) console.log(`  ${f.id} [${f.stage}]\n    ${f.detail}`)
  process.exit(1)
}
