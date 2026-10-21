#!/usr/bin/env node
/**
 * Writes `web/public/sitemap.xml` from the problem catalogue and the guides.
 *
 * Usage:  node scripts/generate-sitemap.mjs [--url https://example.com]
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = join(__dirname, '..')
const OUT = join(WEB_ROOT, 'public', 'sitemap.xml')

const args = process.argv.slice(2)
const urlIndex = args.indexOf('--url')
const SITE = (
  urlIndex >= 0 ? args[urlIndex + 1] : process.env.VITE_SITE_URL ?? 'http://localhost:5173'
).replace(/\/+$/, '')

/** The sub-path the site is served from, e.g. "/dsa-interview-cracker". */
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/+$/, '')

if (!process.env.VITE_SITE_URL && urlIndex === -1) {
  console.warn(
    '[generate-sitemap] VITE_SITE_URL is not set — emitting localhost URLs. ' +
      'Set it at build time (see web/.env.example) for a real deployment.',
  )
}

const problems = JSON.parse(readFileSync(join(WEB_ROOT, 'src', 'data', 'index.json'), 'utf8'))
const guides = JSON.parse(readFileSync(join(WEB_ROOT, 'src', 'data', 'guides.json'), 'utf8'))
const meta = JSON.parse(readFileSync(join(WEB_ROOT, 'src', 'data', 'meta.json'), 'utf8'))

const entries = []
const seen = new Set()

function add(path, priority, changefreq) {
  const loc = `${SITE}${BASE}${path}`
  if (seen.has(loc)) return
  seen.add(loc)
  entries.push({ loc, priority, changefreq })
}

add('/', '1.0', 'weekly')
add('/problems', '0.9', 'weekly')
add('/dashboard', '0.6', 'monthly')
add('/review', '0.5', 'monthly')
add('/guides', '0.8', 'monthly')

for (const topic of meta.topics) {
  if (topic.count > 0) add(`/topics/${topic.key}`, '0.8', 'weekly')
}

for (const company of meta.companies) {
  add(`/companies/${encodeURIComponent(company)}`, '0.6', 'monthly')
}

for (const guide of guides) {
  add(`/guides/${guide.slug}`, '0.6', 'monthly')
}

for (const problem of problems) {
  add(`/problems/${problem.slug}`, '0.7', 'monthly')
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${e.loc.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</loc>\n` +
      `    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, xml, 'utf8')

console.log(
  `[generate-sitemap] ${entries.length} URLs -> web/public/sitemap.xml (origin: ${SITE})`,
)
