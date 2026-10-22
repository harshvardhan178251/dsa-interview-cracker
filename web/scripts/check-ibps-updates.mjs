#!/usr/bin/env node
/**
 * Checks whether the IBPS PO syllabus sources have changed.
 *
 * The site must not go stale: IBPS revises the exam pattern, and a candidate
 * planning against an old pattern wastes months. This script fingerprints every
 * configured source, compares it with the recorded snapshot, and records what
 * changed.
 *
 *   node scripts/check-ibps-updates.mjs            # report only
 *   node scripts/check-ibps-updates.mjs --write    # update the snapshot + changelog
 *
 * The same check is served live at `GET /api/ibps/status`, so the site tells a
 * visitor to verify the pattern within minutes of a change. The scheduled job
 * runs this script daily, which keeps the recorded snapshot current within 24
 * hours and opens an issue for the notes to be revised.
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { SYLLABUS_FILE, fingerprintSource } from '../server/ibps.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = join(__dirname, '..', '..')
const CHANGELOG_FILE = join(REPO, 'docs', 'ibps', 'CHANGELOG.md')

const write = process.argv.includes('--write')

if (!existsSync(SYLLABUS_FILE)) {
  console.error(`[ibps-check] ${SYLLABUS_FILE} not found.`)
  process.exit(1)
}

const syllabus = JSON.parse(readFileSync(SYLLABUS_FILE, 'utf8'))

const results = []
let changed = false
let unreachable = 0

for (const source of syllabus.sources ?? []) {
  const result = await fingerprintSource(source)
  const previous = source.fingerprint

  if (!result.ok) {
    unreachable += 1
    results.push({ name: source.name, state: 'unreachable', status: result.status, error: result.error })
    continue
  }

  if (previous === null) {
    results.push({ name: source.name, state: 'recorded', status: result.status })
    if (write) source.fingerprint = result.fingerprint
    continue
  }

  if (previous !== result.fingerprint) {
    changed = true
    results.push({ name: source.name, state: 'CHANGED', status: result.status, url: source.url })
    if (write) {
      source.previousFingerprint = previous
      source.fingerprint = result.fingerprint
    }
  } else {
    results.push({ name: source.name, state: 'unchanged', status: result.status })
  }
}

const now = new Date().toISOString()

if (write) {
  syllabus.lastCheckedAt = now
  if (changed && !syllabus.changeDetectedAt) {
    syllabus.changeDetectedAt = now
  }
  writeFileSync(SYLLABUS_FILE, `${JSON.stringify(syllabus, null, 2)}\n`, 'utf8')

  if (changed) {
    const entry = [
      '',
      `## ${now.slice(0, 10)}`,
      '',
      'A source changed since the last check:',
      '',
      ...results.filter((r) => r.state === 'CHANGED').map((r) => `- **${r.name}** — ${r.url}`),
      '',
      'The notes in `docs/ibps/` may be out of date. Review them, then set',
      '`lastReviewedAt` and clear `changeDetectedAt` in `syllabus.json`.',
      '',
    ].join('\n')
    if (!existsSync(CHANGELOG_FILE)) {
      writeFileSync(CHANGELOG_FILE, '# IBPS PO content changelog\n', 'utf8')
    }
    appendFileSync(CHANGELOG_FILE, entry, 'utf8')
  }
}

console.log(`[ibps-check] ${syllabus.sources?.length ?? 0} source(s) checked at ${now}`)
for (const result of results) {
  console.log(`  ${result.state.padEnd(12)} ${result.name}${result.error ? ` (${result.error})` : ''}`)
}

if (unreachable > 0) {
  console.warn(
    `[ibps-check] ${unreachable} source(s) could not be reached. ` +
      'A network failure is not a content change — the recorded fingerprint is unchanged.',
  )
}

if (changed) {
  console.warn(
    '[ibps-check] A SOURCE CHANGED. The snapshot has been updated and the site shows a ' +
      '"content may be stale" banner until the notes are reviewed.',
  )
  process.exitCode = 2
} else {
  console.log('[ibps-check] No changes detected.')
}
