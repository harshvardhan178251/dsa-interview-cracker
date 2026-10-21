/**
 * Checks that the production build works when served as plain static files.
 *
 * Note: browsers refuse to load ES modules over `file://` (CORS), so the built
 * bundle has to be served over http — `npm run preview` or any static server
 * is enough. This script verifies that path.
 *
 * Usage:  node scripts/qa-offline.mjs [url]
 */

import { chromium } from 'patchright'

const BASE = process.argv[2] ?? 'http://localhost:4173'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const consoleErrors = []
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text())
})
page.on('pageerror', (e) => consoleErrors.push(String(e)))

const out = {}
try {
  await page.goto(BASE, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('h1', { timeout: 30000 })
  out.heading = await page.locator('h1').first().innerText()

  await page.goto(`${BASE}#/problems`)
  await page.waitForSelector('a[href*="#/problems/"]', { timeout: 30000 })
  await page.waitForTimeout(800)
  out.cards = await page.locator('a[href*="#/problems/"]').count()

  await page.goto(`${BASE}#/problems/arrays-two-sum`)
  await page.waitForSelector('h1', { timeout: 30000 })
  await page.waitForTimeout(1200)
  out.dryRunVisible = (await page.locator('main').innerText()).includes('Dry Run')
  out.tables = await page.locator('.md table').count()

  await page.getByRole('tab', { name: 'Solution' }).click()
  await page.waitForTimeout(600)
  out.sourceVisible = (await page.locator('pre').first().innerText()).includes('twoSum')

  await page.goto(`${BASE}#/guides`)
  await page.waitForTimeout(1200)
  out.guides = await page.locator('a[href*="#/guides/"]').count()

  out.consoleErrors = consoleErrors
} finally {
  await browser.close()
}

console.log(JSON.stringify(out, null, 2))
if (consoleErrors.length) process.exit(1)
