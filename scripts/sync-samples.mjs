#!/usr/bin/env node
/**
 * Keeps the JavaDoc sample-output block in step with the frontmatter.
 *
 * The frontmatter `sampleOutput` is the authoritative value — it is what
 * `verify-judge-sources.mjs` compares the program's real stdout against. This
 * script copies it into the last `<pre>` block of the JavaDoc so the two
 * cannot drift apart.
 *
 * Usage:  node scripts/sync-samples.mjs [--check]
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const PROBLEM_ROOT = join(REPO, 'src', 'main', 'java', 'com', 'dsa')
const checkOnly = process.argv.includes('--check')

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

/** The JavaDoc `*`-prefixed body of the last `<pre>` block. */
function javadocSampleBlock(source) {
  const blocks = [...source.matchAll(/<pre>\s*\*(.*?)<\/pre>/gs)]
  if (blocks.length < 3) return null
  return blocks[blocks.length - 1]
}

let changed = 0
let checked = 0

for (const md of walk(PROBLEM_ROOT)) {
  const raw = readFileSync(md, 'utf8')
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!frontmatter) continue

  let data
  try {
    data = parseYaml(frontmatter[1])
  } catch {
    continue
  }
  if (!data || data.sampleOutput === undefined) continue

  const java = join(dirname(md), `${md.split(/[\\/]/).pop().replace(/\.md$/, '')}.java`)
  if (!existsSync(java)) continue

  const source = readFileSync(java, 'utf8')
  const block = javadocSampleBlock(source)
  if (!block) continue

  checked++
  const current = block[1]
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').replace(/\s+$/, ''))
    .filter((line, index, all) => !(index === all.length - 1 && line === ''))
    .join('\n')
    .trim()

  const expected = String(data.sampleOutput).replace(/\r/g, '').trim()
  if (current === expected) continue

  changed++
  if (checkOnly) {
    console.log(`  would fix ${java.replace(`${REPO}\\`, '')}`)
    continue
  }

  const body = expected
    .split('\n')
    .map((line) => ` * ${line}`.trimEnd())
    .join('\n')

  const updated = source.replace(block[0], `<pre>\n${body}\n * </pre>`)
  writeFileSync(java, updated, 'utf8')
  console.log(`  fixed ${java.replace(`${REPO}\\`, '')}`)
}

console.log(
  `[sync-samples] checked ${checked} problem(s); ${checkOnly ? 'would fix' : 'fixed'} ${changed}`,
)
if (changed > 0 && checkOnly) process.exit(1)
