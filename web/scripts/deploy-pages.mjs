#!/usr/bin/env node
/**
 * Publishes the built site to GitHub Pages using a `gh-pages` branch.
 *
 * This is the fallback path for repositories whose token cannot push
 * `.github/workflows/*` (the `workflow` scope is needed for the Actions
 * workflow). Once the scope is available, `.github/workflows/deploy.yml`
 * takes over and this script is no longer needed.
 *
 * Usage:
 *   node scripts/deploy-pages.mjs --repo harshvardhan178251/dsa-interview-cracker
 *
 * Options:
 *   --repo   owner/name of the GitHub repository
 *   --site   the public origin, e.g. https://harshvardhan178251.github.io
 *   --base   the sub-path, e.g. /dsa-interview-cracker
 */

import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync, writeFileSync, readdirSync, statSync, copyFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = join(__dirname, '..')
const REPO_ROOT = join(WEB_ROOT, '..')

function arg(name, fallback) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : fallback
}

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

const REPO = arg('--repo')
if (!REPO) {
  console.error('Usage: node scripts/deploy-pages.mjs --repo owner/name [--site url] [--base path]')
  process.exit(1)
}

const SITE = arg('--site', `https://${REPO.split('/')[0]}.github.io`)
const BASE = arg('--base', `/${REPO.split('/')[1]}`)

// ------------------------------------------------------------------- build
console.log(`[deploy-pages] building for ${SITE}${BASE}`)
// On Windows `npm` is a .cmd shim, which execFile cannot launch directly.
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
execFileSync(npm, ['run', 'build'], {
  cwd: WEB_ROOT,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, VITE_SITE_URL: SITE, BASE_PATH: `${BASE}/` },
})

// GitHub Pages serves 404.html for unknown paths — that is the SPA fallback.
// The build already generates a redirecting 404.html; only fall back to a plain
// copy of index.html when it is missing.
const DIST = join(WEB_ROOT, 'dist')
if (!existsSync(join(DIST, '404.html'))) {
  copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'))
}
// Stop Jekyll from ignoring files and directories that start with an underscore.
writeFileSync(join(DIST, '.nojekyll'), '')

// ------------------------------------------------------------ publish
const work = join(tmpdir(), `gh-pages-${process.pid}`)
rmSync(work, { recursive: true, force: true })
mkdirSync(work, { recursive: true })

function copyTree(from, to) {
  mkdirSync(to, { recursive: true })
  for (const entry of readdirSync(from)) {
    const source = join(from, entry)
    const target = join(to, entry)
    if (statSync(source).isDirectory()) copyTree(source, target)
    else copyFileSync(source, target)
  }
}

copyTree(DIST, work)

const remote = `https://github.com/${REPO}.git`
git(['init', '--initial-branch=main'], work)
git(['remote', 'add', 'origin', remote], work)
git(['add', '-A'], work)
git(['-c', 'user.name=github-actions[bot]', '-c', 'user.email=41898282+github-actions[bot]@users.noreply.github.com',
  'commit', '-m', `Deploy ${BASE} to GitHub Pages`], work)
git(['push', '--force', 'origin', 'main:gh-pages'], work)

rmSync(work, { recursive: true, force: true })

console.log(`[deploy-pages] pushed ${BASE} to the gh-pages branch`)
console.log(`[deploy-pages] now enable Pages with source = the gh-pages branch:`)
console.log(`  gh api -X POST repos/${REPO}/pages -f "source[branch]=gh-pages" -f "source[path]=/"`)
console.log(`[deploy-pages] the site will be at ${SITE}${BASE}/`)
