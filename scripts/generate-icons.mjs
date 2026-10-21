#!/usr/bin/env node
/**
 * Generates the PWA icons from the site's own logo.
 *
 * The logo is an SVG; the manifest wants PNGs. Rather than pulling in an image
 * library, this renders the SVG in the headless browser and screenshots it at
 * the exact sizes the manifest declares.
 *
 * Usage:  node scripts/generate-icons.mjs
 */

import { chromium } from 'patchright'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const PUBLIC_DIR = join(REPO, 'web', 'public')

const BRAND = '#4338ca'
const INK = '#ffffff'

/** The app logo, matching web/public/favicon.svg. */
const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="${BRAND}" />
  <path d="M24 18 12 32l12 14M40 18l12 14-12 14M36 12l-8 40"
        fill="none" stroke="${INK}" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round" />
</svg>`

/** A maskable icon needs its content inside the safe zone (80% of the canvas). */
const MASKABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="${BRAND}" />
  <g transform="translate(32 32) scale(0.72) translate(-32 -32)">
    <path d="M24 18 12 32l12 14M40 18l12 14-12 14M36 12l-8 40"
          fill="none" stroke="${INK}" stroke-width="5"
          stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`

const TARGETS = [
  { file: 'icon-192.png', size: 192, svg: LOGO },
  { file: 'icon-512.png', size: 512, svg: LOGO },
  { file: 'icon-maskable-512.png', size: 512, svg: MASKABLE },
  { file: 'apple-touch-icon.png', size: 180, svg: LOGO, background: BRAND },
]

const browser = await chromium.launch()

try {
  for (const target of TARGETS) {
    const page = await browser.newPage({
      viewport: { width: target.size, height: target.size },
      deviceScaleFactor: 1,
    })
    await page.setContent(
      `<!doctype html><html><body style="margin:0;background:${target.background ?? BRAND}">
       ${target.svg.replace('width="64" height="64"', `width="${target.size}" height="${target.size}"`)}
       </body></html>`,
      { waitUntil: 'load' },
    )
    const buffer = await page.screenshot({ omitBackground: !target.background })
    writeFileSync(join(PUBLIC_DIR, target.file), buffer)
    console.log(`  wrote web/public/${target.file} (${target.size}x${target.size})`)
    await page.close()
  }
} finally {
  await browser.close()
}

console.log(`[generate-icons] ${TARGETS.length} icon(s) written`)
