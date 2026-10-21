import { chromium } from 'patchright'

const BASE = process.argv[2] ?? 'http://localhost:5173'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const out = {}

// A problem write-up links to its Java source and to other problems.
await page.goto(`${BASE}/problems/arrays-two-sum`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2000)

const problemLinks = await page.locator('.md a').evaluateAll((els) =>
  els.map((el) => ({ text: el.textContent?.trim(), href: el.getAttribute('href') })),
)
out.problemLinks = problemLinks.slice(0, 8)
out.problemJavaLinksResolved = problemLinks.filter((l) => l.href?.includes('blob/main/src/main/java'))
out.problemSiblingLinksResolved = problemLinks.filter((l) => l.href?.startsWith('/problems/'))

// A guide links to other guides.
await page.goto(`${BASE}/guides/guide/how-to-use-this-repo`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2000)
const guideLinks = await page.locator('.md a').evaluateAll((els) =>
  els.map((el) => ({ text: el.textContent?.trim(), href: el.getAttribute('href') })),
)
out.guideLinks = guideLinks
out.guideLinksResolved = guideLinks.filter((l) => l.href?.startsWith('/guides/'))

// A topic note links to another topic note and to a Java file.
await page.goto(`${BASE}/guides/topic/stacks`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2000)
const topicLinks = await page.locator('.md a').evaluateAll((els) =>
  els.map((el) => ({ text: el.textContent?.trim(), href: el.getAttribute('href') })),
)
out.topicLinks = topicLinks.slice(0, 8)
out.topicLinksResolved = topicLinks.filter((l) => l.href?.startsWith('/guides/'))

// Follow one of the rewritten links to make sure it lands.
const target = out.guideLinksResolved[0]?.href
if (target) {
  await page.goto(`${BASE}${target}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2000)
  out.followedLink = {
    href: target,
    h1: await page.locator('h1').first().innerText().catch(() => 'ERR'),
    chars: (await page.locator('article').innerText().catch(() => '')).length,
  }
}

console.log(JSON.stringify(out, null, 2))
await browser.close()
