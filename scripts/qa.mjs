#!/usr/bin/env node
/**
 * End-to-end smoke test for the study site.
 *
 * Starts nothing itself — point it at a running server:
 *
 *   cd web && npm run dev        # in one terminal
 *   npm run qa                   # in another
 *
 * Or against a production build:
 *
 *   cd web && npm run build && npm run preview
 *   npm run qa -- --url http://localhost:4173
 *
 * Checks that the catalogue, the search, the filters, a problem page, the code
 * viewer and the progress tracking all work, and reports console errors.
 */

import { chromium } from 'patchright'

const args = process.argv.slice(2)
const urlIndex = args.indexOf('--url')
const BASE = urlIndex >= 0 ? args[urlIndex + 1] : 'http://localhost:5173'

const checks = []
function check(name, passed, detail = '') {
  checks.push({ name, passed, detail })
  console.log(`  ${passed ? 'ok  ' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const consoleErrors = []
const failedRequests = []
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('requestfailed', (request) => {
  failedRequests.push(`${request.method()} ${request.url()}`)
})

try {
  // --- Dashboard ---
  await page.goto(BASE, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('h1', { timeout: 30000 })
  const heading = await page.locator('h1').first().innerText()
  check('dashboard renders', heading.includes('DSA interview preparation'), heading)

  const totalText = await page.locator('main').innerText()
  const match = totalText.match(/(\d+)\s+Java problems across (\d+) topics/)
  check('catalogue is populated', match !== null, match ? `${match[1]} problems / ${match[2]} topics` : 'no counts found')

  // --- Catalogue + filters ---
  await page.goto(`${BASE}/#/problems`)
  await page.waitForSelector('a[href*="#/problems/"]', { timeout: 30000 })
  await page.waitForTimeout(500)
  const cardCount = await page.locator('a[href*="#/problems/"]').count()
  check('catalogue lists problems', cardCount > 0, `${cardCount} cards on the page`)

  await page.goto(`${BASE}/#/problems?q=sliding`)
  await page.waitForTimeout(700)
  const searchText = await page.locator('main').innerText()
  check('search updates the URL', page.url().includes('q=sliding'))
  check('search filters the list', !searchText.includes('0 problems match'), '')

  // --- Problem detail ---
  await page.goto(`${BASE}/#/problems/arrays-two-sum`)
  await page.waitForSelector('h1', { timeout: 30000 })
  await page.waitForTimeout(900)
  const detailText = await page.locator('.md').first().innerText()
  check('write-up renders', detailText.includes('Dry Run'))
  const tableCount = await page.locator('.md table').count()
  check('dry-run tables render', tableCount > 0, `${tableCount} tables`)

  await page.getByRole('tab', { name: 'Solution' }).click()
  await page.waitForTimeout(600)
  const source = await page.locator('pre').first().innerText()
  check('code viewer shows the Java source', source.includes('twoSum'))

  await page.getByRole('button', { name: 'Runner source' }).click()
  await page.waitForTimeout(400)
  const runner = await page.locator('pre').first().innerText()
  check('runner source is self-contained', runner.includes('class Main') && runner.includes('class FastScanner'))

  // --- Progress tracking ---
  await page.goto(`${BASE}/#/problems`)
  await page.waitForSelector('button[aria-label^="Status:"]', { timeout: 30000 })
  await page.waitForTimeout(500)
  const toggle = page.locator('button[aria-label^="Status:"]').first()
  const before = await toggle.innerText()
  await toggle.click()
  await page.waitForTimeout(400)
  const after = await toggle.innerText()
  check('status toggle advances', before !== after, `${before.trim()} -> ${after.trim()}`)

  const stored = await page.evaluate(() => window.localStorage.getItem('dsa.progress.v1'))
  check('progress persists to localStorage', stored !== null && Object.keys(JSON.parse(stored)).length > 0)

  await page.reload()
  await page.waitForTimeout(900)
  const persisted = await page.locator('button[aria-label^="Status:"]').first().innerText()
  check('progress survives a reload', persisted === after, persisted.trim())

  // --- Guides ---
  await page.goto(`${BASE}/#/guides`)
  await page.waitForSelector('h1', { timeout: 30000 })
  await page.waitForTimeout(600)
  const guideCount = await page.locator('a[href*="#/guides/"]').count()
  check('guides are listed', guideCount > 0, `${guideCount} guides`)

  await page.goto(`${BASE}/#/guides/topic/arrays`)
  await page.waitForTimeout(900)
  const guideText = await page.locator('article').innerText()
  check('guide body loads', guideText.length > 500, `${guideText.length} characters`)

  // --- Console health ---
  check('no console errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '))
  check('no failed requests', failedRequests.length === 0, failedRequests.slice(0, 3).join(' | '))
} finally {
  await browser.close()
}

const failed = checks.filter((c) => !c.passed)
console.log(`\n[qa] ${checks.length - failed.length}/${checks.length} checks passed against ${BASE}`)
if (failed.length) {
  console.log('Failed:')
  for (const f of failed) console.log(`  - ${f.name}${f.detail ? ` (${f.detail})` : ''}`)
  process.exit(1)
}
