import { chromium } from 'patchright'

const BASE = process.argv[2] ?? 'http://localhost:5173'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const out = {}
for (const slug of ['guide/company-problem-map', 'guide/problem-index', 'topic/arrays', 'system-design/caching', 'lld/lru-cache']) {
  await page.goto(`${BASE}/guides/${slug}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2500)
  const article = page.locator('article')
  const text = (await article.innerText().catch(() => '')) ?? ''
  out[slug] = {
    found: text.length > 200,
    chars: text.length,
    mentionsTcs: text.includes('TCS'),
    mentionsWipro: text.includes('Wipro'),
    h2s: await page.locator('article h2').count(),
  }
}

console.log(JSON.stringify(out, null, 2))
await browser.close()
