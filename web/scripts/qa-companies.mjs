import { chromium } from 'patchright'

const BASE = process.argv[2] ?? 'http://localhost:5173'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const consoleErrors = []
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text())
})
page.on('pageerror', (e) => consoleErrors.push(String(e)))

const out = { companies: {} }

for (const company of ['TCS', 'Wipro', 'Infosys', 'HCLTech', 'Cognizant', 'Tech Mahindra', 'Capgemini', 'Accenture']) {
  await page.goto(`${BASE}/companies/${encodeURIComponent(company)}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2000)
  out.companies[company] = {
    h1: await page.locator('h1').first().innerText().catch(() => 'ERR'),
    rows: await page.locator('main ul li').count(),
    url: page.url().replace(BASE, ''),
  }
}

// The sidebar should list every company.
await page.goto(`${BASE}/problems`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1500)
await page.getByRole('button', { name: /Companies/ }).click()
await page.waitForTimeout(600)
out.sidebarCompanyCount = await page.locator('aside a[href*="/companies/"]').count()

out.consoleErrors = consoleErrors.filter((e) => !e.includes('status of 404'))

console.log(JSON.stringify(out, null, 2))
await browser.close()
