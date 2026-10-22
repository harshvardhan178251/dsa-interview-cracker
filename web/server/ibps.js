/**
 * Keeps the IBPS PO syllabus snapshot honest.
 *
 * The recorded snapshot lives in `docs/ibps/syllabus.json`. This module
 * fingerprints every configured source and compares it with the snapshot, so a
 * change on ibps.in is detected within minutes of anyone loading the site — and
 * certainly within the 24 hours the scheduled job allows.
 *
 * Shared by the CLI checker (`web/scripts/check-ibps-updates.mjs`) and the
 * `/api/ibps/status` endpoint.
 */

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = join(__dirname, '..', '..')
export const SYLLABUS_FILE = join(REPO, 'docs', 'ibps', 'syllabus.json')

/** How long a fingerprint stays fresh before it is recomputed. */
const CACHE_MS = 30 * 60 * 1000

/**
 * Fetches a URL with curl, which uses the operating system's certificate
 * store.
 *
 * Node's bundled CA set does not always include the full chain a public site
 * serves, which makes `fetch` fail with `UNABLE_TO_VERIFY_LEAF_SIGNATURE`.
 * Weakening TLS verification would be the wrong trade, so we fall back to curl,
 * which trusts the system store.
 *
 * @returns {Promise<{ok: boolean, status: number, body: Buffer, contentType: string}>}
 */
function fetchWithCurl(url, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn(
      'curl',
      ['-sL', '--compressed', '--max-time', String(Math.ceil(timeoutMs / 1000)),
        '-A', 'dsa-interview-cracker-content-checker/1.0', '-w', '\n__STATUS__%{http_code}', url],
      { windowsHide: true },
    )
    const chunks = []
    child.stdout.on('data', (chunk) => chunks.push(chunk))
    child.on('error', () => resolve({ ok: false, status: 0, body: Buffer.alloc(0), contentType: '' }))
    child.on('close', () => {
      const raw = Buffer.concat(chunks)
      const marker = raw.lastIndexOf('\n__STATUS__')
      if (marker === -1) {
        resolve({ ok: false, status: 0, body: raw, contentType: '' })
        return
      }
      const status = Number(raw.slice(marker + 11).toString().trim()) || 0
      const body = raw.slice(0, marker)
      resolve({ ok: status >= 200 && status < 400, status, body, contentType: '' })
    })
  })
}

/** Strips markup so a cosmetic page change is not mistaken for a content change. */
export function normaliseText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Fetches one source and returns its fingerprint. */
export async function fingerprintSource(source, timeoutMs = 20000) {
  let body = null
  let status = 0
  let contentType = ''
  let viaCurl = false

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const response = await fetch(source.url, {
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent': 'dsa-interview-cracker-content-checker/1.0',
          Accept: '*/*',
        },
      })
      status = response.status
      contentType = response.headers.get('content-type') ?? ''
      body = Buffer.from(await response.arrayBuffer())
    } finally {
      clearTimeout(timer)
    }
    if (status < 200 || status >= 400) {
      return { ok: false, status, fingerprint: null, bytes: 0 }
    }
  } catch (error) {
    // Node could not complete the request — try curl, which trusts the system
    // certificate store.
    const fallback = await fetchWithCurl(source.url, timeoutMs)
    if (!fallback.ok) {
      return {
        ok: false,
        status: fallback.status || 0,
        fingerprint: null,
        bytes: 0,
        error: String(error?.message ?? error),
      }
    }
    body = fallback.body
    status = fallback.status
    contentType = source.url.toLowerCase().endsWith('.pdf') ? 'application/pdf' : ''
    viaCurl = true
  }

  const payload = (contentType.includes('pdf') || source.url.toLowerCase().endsWith('.pdf'))
    ? body.toString('latin1').replace(/\r\n/g, '\n')
    : normaliseText(body.toString('utf8'))

  return {
    ok: true,
    status,
    fingerprint: `sha256:${createHash('sha256').update(payload).digest('hex')}`,
    bytes: body.length,
    viaCurl,
  }
}

let cache = null

/**
 * Checks every source against the recorded snapshot.
 *
 * @returns {Promise<{checkedAt: string, changed: boolean, changedAt: string|null,
 *   lastCheckedAt: string|null, lastReviewedAt: string|null, sources: object[],
 *   reachable: number, total: number}>}
 */
export async function checkSyllabus({ force = false } = {}) {
  if (cache && !force && Date.now() - cache.at < CACHE_MS) {
    return cache.value
  }

  const syllabus = existsSync(SYLLABUS_FILE)
    ? JSON.parse(readFileSync(SYLLABUS_FILE, 'utf8'))
    : { sources: [], lastCheckedAt: null, lastReviewedAt: null, changeDetectedAt: null }

  const sources = []
  let changed = false
  let reachable = 0

  for (const source of syllabus.sources ?? []) {
    const result = await fingerprintSource(source)
    if (!result.ok) {
      sources.push({ name: source.name, url: source.url, state: 'unreachable', status: result.status })
      continue
    }
    reachable += 1
    const differs = source.fingerprint !== null && source.fingerprint !== result.fingerprint
    if (differs) changed = true
    sources.push({
      name: source.name,
      url: source.url,
      state: source.fingerprint === null ? 'recorded' : differs ? 'changed' : 'unchanged',
      status: result.status,
    })
  }

  const value = {
    checkedAt: new Date().toISOString(),
    changed,
    changedAt: syllabus.changeDetectedAt ?? null,
    lastCheckedAt: syllabus.lastCheckedAt ?? null,
    lastReviewedAt: syllabus.lastReviewedAt ?? null,
    version: syllabus.version ?? null,
    sources,
    reachable,
    total: (syllabus.sources ?? []).length,
  }

  cache = { at: Date.now(), value }
  return value
}
