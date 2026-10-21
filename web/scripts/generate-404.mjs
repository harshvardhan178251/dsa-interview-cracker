#!/usr/bin/env node
/**
 * Writes `dist/404.html` for GitHub Pages.
 *
 * GitHub Pages has no rewrite rules: an unknown path is answered with
 * `404.html` and a 404 status. This page stores the requested URL and bounces
 * to the app shell, which then restores the URL with `history.replaceState`
 * (see `src/main.tsx`). The user ends up on the right page, and the request
 * that carried the content was a 200.
 *
 * Usage:  node scripts/generate-404.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = join(__dirname, '..')
const DIST = join(WEB_ROOT, 'dist')

const BASE = (process.env.BASE_PATH ?? '/').replace(/\/+$/, '')

if (!existsSync(DIST)) {
  console.error('[generate-404] dist/ not found — run the build first.')
  process.exit(1)
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loading…</title>
    <link rel="icon" type="image/svg+xml" href="${BASE}/favicon.svg" />
    <script>
      (function () {
        try {
          sessionStorage.setItem('dsa:redirect', location.href);
        } catch (e) {
          /* private mode — the app still loads, just at the root */
        }
        location.replace('${BASE}/');
      })();
    </script>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #070a12;
        color: #98a3bb;
        font: 15px/1.6 system-ui, -apple-system, 'Segoe UI', sans-serif;
      }
    </style>
  </head>
  <body>
    <p>Taking you to the app…</p>
    <p><a href="${BASE}/" style="color:#818cf8">Or open the home page</a>.</p>
  </body>
</html>
`

writeFileSync(join(DIST, '404.html'), html, 'utf8')
console.log(`[generate-404] wrote dist/404.html (base path: ${BASE}/)`)
