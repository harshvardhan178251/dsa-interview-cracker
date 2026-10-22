import { chromium } from 'patchright'

const BASE = process.argv[2] ?? 'http://localhost:5173'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

const consoleErrors = []
const failedRequests = []
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text())
})
page.on('pageerror', (e) => consoleErrors.push(String(e)))
page.on('requestfailed', (r) => failedRequests.push(`${r.method()} ${r.url()}`))

const out = {}

// --- The IBPS landing page ---
await page.goto(`${BASE}/ibps`, { waitUntil: 'domcontentloaded' })
await page.waitForSelector('h1', { timeout: 30000 })
await page.waitForTimeout(1500)

out.page = {
  h1: await page.locator('h1').first().innerText(),
  patternRows: await page.locator('main table tbody tr').count(),
  guides: await page.locator('main a[href*="/guides/ibps/"]').count(),
}

// The depth filter must narrow the topic table.
const before = await page.locator('main table tbody tr').count()
await page.getByRole('button', { name: 'From scratch' }).click()
await page.waitForTimeout(500)
const after = await page.locator('main table tbody tr').count()
out.depthFilter = { before, after, narrows: after < before }

// --- The freshness indicator ---
out.freshness = {
  showsChecked: /source checked/i.test(await page.locator('main').innerText()),
  showsReviewed: /notes reviewed/i.test(await page.locator('main').innerText()),
}

// --- A guide inside the section ---
await page.goto(`${BASE}/guides/ibps/overview`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2000)
const guide = await page.locator('article').innerText()
out.guide = {
  chars: guide.length,
  hasDryRunStyleTables: guide.includes('|'),
  headings: await page.locator('article h2').count(),
}

// The cross-links inside the guide must resolve to real routes.
const links = await page.locator('article a').evaluateAll((els) =>
  els.map((el) => ({ text: el.textContent?.trim(), href: el.getAttribute('href') })),
)
out.guideLinks = links.filter((l) => l.href?.includes('/guides/ibps/')).slice(0, 8)

// Follow one.
const target = links.find((l) => l.href?.includes('/guides/ibps/'))
if (target) {
  await page.goto(`${BASE}${target.href.replace(BASE, '')}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1800)
  out.followed = {
    href: target.href,
    h1: await page.locator('h1').first().innerText().catch(() => 'ERR'),
    chars: (await page.locator('article').innerText().catch(() => '')).length,
  }
}

// --- The Guides page must list the IBPS category ---
await page.goto(`${BASE}/guides`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1200)
const guidesText = await page.locator('main').innerText()
out.guidesPage = {
  listsIbps: guidesText.includes('IBPS PO'),
  ibpsLinks: await page.locator('main a[href*="/guides/ibps/"]').count(),
}

out.consoleErrors = consoleErrors.filter((e) => !e.includes('status of 404'))
out.failedRequests = failedRequests.filter((r) => !r.includes('favicon'))

console.log(JSON.stringify(out, null, 2))
await browser.close()
