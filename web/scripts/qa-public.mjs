import { chromium } from 'patchright'

const BASE = 'https://harshvardhan178251.github.io/dsa-interview-cracker'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const consoleErrors = []
const failedRequests = []
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text())
})
page.on('pageerror', (e) => consoleErrors.push(String(e)))
page.on('requestfailed', (r) => failedRequests.push(`${r.method()} ${r.url()}`))
page.on('response', (r) => {
  if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`)
})

const out = {}

async function go(path) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1200)
}

// 1. Landing page
await go('/')
out.landing = {
  h1: await page.locator('h1').first().innerText(),
  topicTiles: await page.locator('a[href*="/topics/"]').count(),
  problemLinks: await page.locator('a[href*="/problems/"]').count(),
}

// 2. Deep link straight to a problem — GitHub Pages answers with 404.html, which
//    redirects to the app shell; the deep link must be restored in the address bar.
await go('/problems/arrays-two-sum')
out.problem = {
  h1: await page.locator('h1').first().innerText(),
  tables: await page.locator('.md table').count(),
  hasDryRun: (await page.locator('.md').first().innerText()).includes('Dry Run'),
  finalUrl: page.url().replace(BASE, ''),
}

// 3. Topic page (all its problems)
await go('/topics/dynamicprogramming')
out.topic = {
  h1: await page.locator('h1').first().innerText(),
  rows: await page.locator('main ul li').count(),
}

// 4. Company page
await go('/companies/Amazon')
out.company = {
  h1: await page.locator('h1').first().innerText(),
  rows: await page.locator('main ul li').count(),
}

// 5. A guide
await go('/guides/topic/arrays')
out.guide = {
  chars: (await page.locator('article').innerText()).length,
}

// 6. The compiler tab falls back to Judge0 (no backend on static hosting)
await go('/problems/arrays-two-sum')
await page.getByRole('tab', { name: 'Run' }).click()
await page.waitForTimeout(3000)
const runPanelText = await page.locator('main').innerText()
out.compiler = {
  editorLoaded: (await page.locator('.cm-content').count()) > 0,
  engine: runPanelText.includes('Judge0 fallback')
    ? 'Judge0 fallback'
    : runPanelText.includes('local compiler')
      ? 'local compiler'
      : 'unknown',
}

// 7. A deep 404
await go('/this/route/does/not/exist')
out.notFound = (await page.locator('main').innerText()).includes('404')

out.consoleErrors = consoleErrors
out.failedRequests = failedRequests.filter((r) => !r.includes('favicon'))

console.log(JSON.stringify(out, null, 2))
await browser.close()
