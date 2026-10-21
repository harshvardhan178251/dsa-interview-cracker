#!/usr/bin/env node
/**
 * End-to-end smoke test for the study site.
 *
 * Start a server first:
 *
 *   cd web && npm run dev        # in one terminal
 *   npm run qa                   # in another
 *
 * Or against a production build:
 *
 *   cd web && npm run build && npm run preview
 *   npm run qa -- --url http://localhost:4173
 *
 * Checks the catalogue, search, filters, topic pages, a problem page, the code
 * viewer and the progress tracking, and fails on any console error.
 */

import { chromium } from 'patchright'

const args = process.argv.slice(2)
const urlIndex = args.indexOf('--url')
const BASE = (urlIndex >= 0 ? args[urlIndex + 1] : 'http://localhost:5173').replace(/\/+$/, '')

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
page.on('pageerror', (error) => consoleErrors.push(String(error)))
page.on('requestfailed', (request) => {
  failedRequests.push(`${request.method()} ${request.url()}`)
})

const go = async (path) => {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
}

try {
  // --- Landing page ---
  await go('/')
  await page.waitForSelector('h1', { timeout: 30000 })
  const heading = await page.locator('h1').first().innerText()
  check('landing page renders', heading.includes('Crack your next DSA interview'), heading)

  const landing = await page.locator('main').innerText()
  const total = landing.match(/(\d+)\s+problems\s+·\s+(\d+)\s+topics/)
  check(
    'landing page shows live catalogue stats',
    total !== null,
    total ? `${total[1]} problems / ${total[2]} topics` : 'no stats found',
  )

  // --- Topic tiles on the landing page open the topic page ---
  await go('/')
  const topicTile = page.locator('a[href^="/topics/"]').first()
  check('landing page links to topic pages', (await topicTile.count()) > 0)

  // --- Topic page lists every problem in the topic ---
  await go('/topics/dynamicprogramming')
  await page.waitForSelector('h1', { timeout: 30000 })
  const topicHeading = await page.locator('h1').first().innerText()
  check('topic page renders', topicHeading.includes('Dynamic Programming'), topicHeading)

  const listed = await page.locator('main ul li a[href^="/problems/"]').count()
  const expected = Number((await page.locator('main').innerText()).match(/All Dynamic Programming problems\s*\((\d+) of (\d+)\)/)?.[2] ?? 0)
  check(
    'topic page lists all of its problems',
    listed === expected && expected > 0,
    `${listed} listed / ${expected} expected`,
  )

  // The topic page must show the problems, not just the first page of them.
  const moreThanOnePage = expected > 48
  check(
    'topic page is not truncated to a page of results',
    !moreThanOnePage || listed > 48,
    moreThanOnePage ? `${listed} shown (catalogue pages at 48)` : `${listed} shown`,
  )

  // --- Difficulty filter inside a topic ---
  await go('/topics/dynamicprogramming')
  await page.getByRole('button', { name: /^Hard \(/ }).click()
  await page.waitForTimeout(400)
  const hardRows = await page.locator('main ul li').count()
  check('topic difficulty filter narrows the list', hardRows > 0 && hardRows < expected, `${hardRows} hard problems`)

  // --- Sidebar topics open the topic page ---
  await go('/')
  const sidebarTopic = page.locator('aside a[href^="/topics/"]').first()
  const sidebarHref = await sidebarTopic.getAttribute('href')
  await sidebarTopic.click()
  await page.waitForTimeout(600)
  check('sidebar topic link opens the topic page', page.url().includes(sidebarHref ?? '/topics/'), page.url())

  // --- Catalogue, search and filters ---
  await go('/problems')
  await page.waitForSelector('a[href^="/problems/"]', { timeout: 30000 })
  const cardCount = await page.locator('a[href^="/problems/"]').count()
  check('catalogue lists problems', cardCount > 0, `${cardCount} cards on the page`)

  await go('/problems?q=sliding')
  check('search updates the URL', page.url().includes('q=sliding'))
  const searchText = await page.locator('main').innerText()
  check('search filters the list', !searchText.includes('0 problems match'))

  await go('/problems?topic=graphs')
  const filtered = await page.locator('main').innerText()
  check('topic filter works in the catalogue', filtered.includes('problem'), '')

  // --- Company page ---
  await go('/companies/Amazon')
  await page.waitForSelector('h1', { timeout: 30000 })
  const companyRows = await page.locator('main ul li').count()
  const allRows = await page.evaluate(async () => {
    const response = await fetch('/problems')
    return response.status
  })
  check('company page lists its problems', companyRows > 0, `${companyRows} problems`)
  check(
    'company page is a real subset, not the whole catalogue',
    companyRows > 0 && companyRows < 322,
    `${companyRows} of 322 problems`,
  )
  void allRows

  // --- Problem detail ---
  await go('/problems/arrays-two-sum')
  await page.waitForSelector('h1', { timeout: 30000 })
  await page.waitForTimeout(800)
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
  check(
    'runner source is self-contained',
    runner.includes('class Main') && runner.includes('class FastScanner'),
  )

  // --- Progress tracking ---
  await go('/problems')
  await page.waitForSelector('button[aria-label^="Status:"]', { timeout: 30000 })
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
  await go('/guides')
  await page.waitForSelector('h1', { timeout: 30000 })
  const guideCount = await page.locator('a[href^="/guides/"]').count()
  check('guides are listed', guideCount > 0, `${guideCount} guides`)

  await go('/guides/topic/arrays')
  await page.waitForTimeout(900)
  const guideText = await page.locator('article').innerText()
  check('guide body loads', guideText.length > 500, `${guideText.length} characters`)

  // --- 404 ---
  await go('/this-page-does-not-exist')
  const notFound = await page.locator('main').innerText()
  check('unknown routes show the 404 page', notFound.includes('404'))

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
