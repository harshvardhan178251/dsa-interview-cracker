/**
 * The study site's backend.
 *
 * It does two things:
 *
 *  1. Serves the built single-page app from `web/dist`.
 *  2. Owns the compiler: `POST /api/run` compiles a Java submission with the
 *     local JDK, runs it against the supplied input, and reports the result —
 *     including a line-by-line diff when the answer is wrong.
 *
 * Run it with:
 *
 *     npm run build && npm run serve
 *
 * The site also works without this server (it falls back to the public Judge0
 * API), so a purely static deployment is still fine.
 */

import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join, extname, normalize, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

import { judge, loadReferenceSource, validateSource, javaVersion, LIMITS } from './judge.js'
import { checkSyllabus } from './ibps.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = join(__dirname, '..')
const DIST_DIR = join(WEB_ROOT, 'dist')
const DATA_DIR = join(WEB_ROOT, 'src', 'data')

const PORT = Number(process.env.PORT ?? 4173)
const HOST = process.env.HOST ?? '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  })
  res.end(body)
}

function readBody(req, limitBytes = LIMITS.maxSourceBytes + 64 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limitBytes) {
        reject(new Error('The request body is too large.'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

/** Loads the catalogue once, so the server can look up test cases by problem id. */
function loadCatalogue() {
  const file = join(DATA_DIR, 'index.json')
  if (!existsSync(file)) return new Map()
  try {
    const list = JSON.parse(readFileSync(file, 'utf8'))
    return new Map(list.map((p) => [p.id, p]))
  } catch {
    return new Map()
  }
}

const catalogue = loadCatalogue()

/* -------------------------------------------------------------------------- */
/* Static files                                                                */
/* -------------------------------------------------------------------------- */

const COMPRESSIBLE = new Set(['.html', '.js', '.mjs', '.css', '.json', '.svg', '.txt', '.xml', '.webmanifest'])

function serveFile(req, res, filePath, { immutable = false } = {}) {
  const ext = extname(filePath).toLowerCase()
  const raw = readFileSync(filePath)
  const headers = {
    'Content-Type': MIME[ext] ?? 'application/octet-stream',
    'Cache-Control': immutable
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=0, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
  }

  const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')
  if (acceptsGzip && COMPRESSIBLE.has(ext) && raw.length > 1024) {
    const body = gzipSync(raw)
    res.writeHead(200, { ...headers, 'Content-Encoding': 'gzip', 'Content-Length': body.length })
    res.end(body)
    return
  }

  res.writeHead(200, { ...headers, 'Content-Length': raw.length })
  res.end(raw)
}

/* -------------------------------------------------------------------------- */
/* API                                                                         */
/* -------------------------------------------------------------------------- */

async function handleRun(req, res) {
  let payload
  try {
    payload = JSON.parse(await readBody(req))
  } catch (error) {
    sendJson(res, 400, { error: error.message ?? 'Invalid JSON body.' })
    return
  }

  const source = payload?.source
  const problemId = typeof payload?.problemId === 'string' ? payload.problemId : null

  const invalid = validateSource(source)
  if (invalid) {
    sendJson(res, 200, {
      status: 'Compile Error',
      stdout: '',
      stderr: '',
      compileOutput: invalid,
      durationMs: 0,
      cases: [],
    })
    return
  }

  // The cases come from the problem's frontmatter; the client may add its own.
  const problem = problemId ? catalogue.get(problemId) : null
  const documented = problem?.tests ?? []
  const clientCases = Array.isArray(payload?.cases) ? payload.cases : []

  const cases = [
    ...documented.map((t) => ({ name: t.name, stdin: t.input, expected: t.expected })),
    ...clientCases.map((t, i) => ({
      name: t.name ?? `your case ${i + 1}`,
      stdin: typeof t.stdin === 'string' ? t.stdin : (t.input ?? ''),
      expected: t.expected ?? null,
    })),
  ]

  // The input the user typed is an extra case. It has no recorded expected
  // output, so it is checked against the reference solution instead.
  const stdin = typeof payload?.stdin === 'string' ? payload.stdin : ''
  const sameInput = (a, b) => a.replace(/\s+$/, '') === b.replace(/\s+$/, '')
  if (stdin && !cases.some((c) => sameInput(c.stdin ?? '', stdin))) {
    cases.push({ name: 'your input', stdin, expected: null })
  }

  // Nothing at all to run — fall back to an empty run so the user still gets output.
  if (cases.length === 0) {
    cases.push({ name: 'your input', stdin: '', expected: null })
  }

  const referenceSource = loadReferenceSource(problemId, DATA_DIR)

  try {
    const result = await judge({ source, cases, referenceSource })
    sendJson(res, 200, { ...result, ranOn: 'local' })
  } catch (error) {
    sendJson(res, 500, {
      status: 'Error',
      stdout: '',
      stderr: '',
      compileOutput: String(error?.message ?? error),
      durationMs: 0,
      cases: [],
    })
  }
}

function handleProblemCases(res, problemId) {
  const problem = catalogue.get(problemId)
  if (!problem) {
    sendJson(res, 404, { error: `Unknown problem "${problemId}".` })
    return
  }
  sendJson(res, 200, {
    id: problem.id,
    title: problem.title,
    topic: problem.topic,
    tests: problem.tests ?? [],
    sampleInput: problem.sampleInput,
    sampleOutput: problem.sampleOutput,
  })
}

/* -------------------------------------------------------------------------- */
/* Server                                                                      */
/* -------------------------------------------------------------------------- */

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
  const pathname = decodeURIComponent(url.pathname)

  // --- API ---
  if (pathname.startsWith('/api/')) {
    if (req.method === 'GET' && pathname === '/api/health') {
      sendJson(res, 200, {
        ok: true,
        service: 'dsa-interview-cracker',
        problems: catalogue.size,
        java: javaVersion(),
        limits: {
          runTimeoutMs: LIMITS.runTimeoutMs,
          compileTimeoutMs: LIMITS.compileTimeoutMs,
          maxSourceBytes: LIMITS.maxSourceBytes,
        },
      })
      return
    }

    if (req.method === 'POST' && pathname === '/api/run') {
      await handleRun(req, res)
      return
    }

    if (req.method === 'GET' && pathname === '/api/ibps/status') {
      try {
        const force = url.searchParams.get('force') === '1'
        const status = await checkSyllabus({ force })
        sendJson(res, 200, status)
      } catch (error) {
        sendJson(res, 500, { error: String(error?.message ?? error) })
      }
      return
    }

    if (req.method === 'GET' && pathname.startsWith('/api/problems/')) {
      const id = pathname.slice('/api/problems/'.length).replace(/\/cases$/, '')
      handleProblemCases(res, id)
      return
    }

    sendJson(res, 404, { error: `Unknown endpoint "${pathname}".` })
    return
  }

  // --- Static files ---
  if (!existsSync(DIST_DIR)) {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('The site has not been built yet. Run `npm run build` first.')
    return
  }

  // Normalise and refuse anything that escapes the dist directory.
  const relative = normalize(pathname).replace(/^([/\\])+/, '')
  const candidate = join(DIST_DIR, relative)

  if (candidate.startsWith(DIST_DIR) && existsSync(candidate) && statSync(candidate).isFile()) {
    const immutable = relative.startsWith('assets' + '/') || relative.startsWith('assets\\')
    serveFile(req, res, candidate, { immutable })
    return
  }

  // Single-page app fallback.
  serveFile(req, res, join(DIST_DIR, 'index.html'))
})

function spawnSafe(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' })
  return (result.stderr || result.stdout || '').split('\n')[0].trim()
}

server.listen(PORT, HOST, () => {
  console.log(`[dsa-server] listening on http://localhost:${PORT}`)
  console.log(`[dsa-server] serving ${DIST_DIR}`)
  console.log(`[dsa-server] catalogue: ${catalogue.size} problems`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
  })
}
