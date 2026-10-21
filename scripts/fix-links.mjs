#!/usr/bin/env node
/**
 * Repairs relative links inside the problem write-ups.
 *
 * Each problem lives at
 *
 *     src/main/java/com/dsa/<topic>/<Problem>.md
 *
 * so a link to a sibling problem has to be written relative to that folder
 * (`../<otherTopic>/<Class>.md`), not relative to the repository root
 * (`../../src/main/java/com/dsa/...`) — which is what a lot of the write-ups
 * ended up with.
 *
 * The script rewrites every relative link so that it resolves, and reports
 * anything it cannot fix.
 *
 * Usage:  node scripts/fix-links.mjs [--check]
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, basename, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const PROBLEM_ROOT = join(REPO, 'src', 'main', 'java', 'com', 'dsa')
const checkOnly = process.argv.includes('--check')

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

/** Every markdown in the repository that may contain links. */
function collectMarkdownFiles() {
  const files = walk(PROBLEM_ROOT)
  for (const dir of ['docs', 'web']) {
    const full = join(REPO, dir)
    if (existsSync(full)) {
      for (const file of walk(full)) {
        if (!file.includes(`${sep}node_modules${sep}`) && !file.includes(`${sep}dist${sep}`)) {
          files.push(file)
        }
      }
    }
  }
  const readme = join(REPO, 'README.md')
  if (existsSync(readme)) files.push(readme)
  return files
}

/** class name -> { topic, java, md } */
const classIndex = new Map()
/** topic name -> the concept note for that topic */
const topicNotes = new Map()
for (const dir of readdirSync(PROBLEM_ROOT, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue
  const topic = dir.name
  const topicDir = join(PROBLEM_ROOT, topic)
  for (const entry of readdirSync(topicDir)) {
    if (!entry.endsWith('.md')) continue
    const className = entry.replace(/\.md$/, '')
    classIndex.set(className, {
      topic,
      md: join(topicDir, entry),
      java: join(topicDir, `${className}.java`),
    })
  }
}

const TOPIC_NOTES_DIR = join(REPO, 'docs', 'topics')
if (existsSync(TOPIC_NOTES_DIR)) {
  for (const entry of readdirSync(TOPIC_NOTES_DIR)) {
    if (!entry.endsWith('.md')) continue
    const topic = entry.replace(/^\d+-/, '').replace(/\.md$/, '')
    topicNotes.set(topic, join(TOPIC_NOTES_DIR, entry))
  }
}

/** site slug (`heaps-task-scheduler`) -> the write-up it refers to */
const slugIndex = new Map()
for (const [className, entry] of classIndex) {
  let title = className
  try {
    const raw = readFileSync(entry.md, 'utf8')
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const titleLine = match && match[1].match(/^title:\s*(.+)$/m)
    if (titleLine) title = titleLine[1].trim().replace(/^["']|["']$/g, '')
  } catch {
    /* fall back to the class name */
  }
  const slug = `${entry.topic}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
  slugIndex.set(slug, entry.md)
  slugIndex.set(`${entry.topic}-${className.toLowerCase().replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`, entry.md)
}

/** guide slug (`topic/arrays`) -> the guide markdown */
const guideIndex = new Map()
const GUIDES_DIR = join(REPO, 'docs', 'guides')
if (existsSync(GUIDES_DIR)) {
  for (const entry of readdirSync(GUIDES_DIR)) {
    if (!entry.endsWith('.md')) continue
    const name = entry.replace(/\.md$/, '').replace(/^\d+-/, '')
    const category = name.startsWith('system-design-') ? 'system-design'
      : name.startsWith('lld-') ? 'lld'
        : existsSync(join(GUIDES_DIR, entry)) && readFileSync(join(GUIDES_DIR, entry), 'utf8').includes('category: topic')
          ? 'topic'
          : 'guide'
    guideIndex.set(`${category}/${name}`, join(GUIDES_DIR, entry))
  }
}

let fixed = 0
let unfixable = 0
const problems = []

for (const file of collectMarkdownFiles()) {
  const original = readFileSync(file, 'utf8')
  const fileDir = dirname(file)

  const updated = original.replace(/\]\(([^)\s]+)\)/g, (match, link) => {
    if (/^(https?:|mailto:|#)/i.test(link)) return match

    const hashIndex = link.indexOf('#')
    const pathPart = hashIndex === -1 ? link : link.slice(0, hashIndex)
    const anchor = hashIndex === -1 ? '' : link.slice(hashIndex)
    if (!pathPart) return match

    // Site-absolute links (`/problems/<slug>`, `/guides/<slug>`) — map them onto the
    // markdown they refer to, so they work when the write-up is read in the repository.
    if (pathPart.startsWith('/problems/')) {
      const slug = pathPart.slice('/problems/'.length)
      const target = slugIndex.get(slug)
      if (target) {
        fixed++
        return `](${relative(fileDir, target).split(sep).join('/')}${anchor})`
      }
    }
    if (pathPart.startsWith('/problems?topic=')) {
      const topic = pathPart.slice('/problems?topic='.length)
      const target = topicNotes.get(topic)
      if (target) {
        fixed++
        return `](${relative(fileDir, target).split(sep).join('/')}${anchor})`
      }
    }
    if (pathPart.startsWith('/guides/')) {
      const slug = pathPart.slice('/guides/'.length)
      const target = guideIndex.get(slug)
      if (target) {
        fixed++
        return `](${relative(fileDir, target).split(sep).join('/')}${anchor})`
      }
    }

    let target = resolve(fileDir, pathPart)
    if (existsSync(target)) return match

    // (a) The link was written relative to the repository root.
    const repoRelative = pathPart.replace(/^(\.\.\/)+/, '')
    const candidate = join(REPO, repoRelative)
    if (existsSync(candidate)) {
      target = candidate
    } else {
      // (b) The link names a problem class, possibly as `topic.ClassName`.
      const bare = pathPart.replace(/\.(java|md)$/, '')
      const className = bare.includes('.')
        ? bare.split('.').pop()
        : bare.split(/[\\/]/).pop()
      const entry = classIndex.get(className)
      if (entry) {
        target = pathPart.endsWith('.java') ? entry.java : entry.md
      } else if (topicNotes.has(className)) {
        // (c) The link names a topic — point at that topic's concept note.
        target = topicNotes.get(className)
      } else {
        // (d) The link omits the `.md` extension.
        const withExt = resolve(fileDir, `${pathPart}.md`)
        if (existsSync(withExt)) {
          target = withExt
        } else {
          // (e) The link names a sibling folder and a file inside it.
          const dirTarget = resolve(fileDir, pathPart)
          if (statExistsAsDir(dirTarget)) {
            const entries = readdirSync(dirTarget).filter((f) => f.endsWith('.md'))
            if (entries.length === 1) {
              target = join(dirTarget, entries[0])
            }
          }
          // (f) The target file exists but carries a numeric prefix.
          if (target === resolve(fileDir, pathPart)) {
            const parent = dirname(resolve(fileDir, pathPart))
            const base = basename(resolve(fileDir, pathPart))
            if (existsSync(parent)) {
              const prefixed = readdirSync(parent).find(
                (f) => f.replace(/^\d+-/, '') === `${base}.md`,
              )
              if (prefixed) target = join(parent, prefixed)
            }
          }
        }
        if (target === resolve(fileDir, pathPart)) {
          unfixable++
          problems.push(`${relative(REPO, file)} -> ${link}`)
          return match
        }
      }
    }

    let next = relative(fileDir, target).split(sep).join('/')
    if (!next.startsWith('.')) next = `./${next}`
    fixed++
    return `](${next}${anchor})`
  })

  if (updated !== original) {
    if (!checkOnly) writeFileSync(file, updated, 'utf8')
  }
}

function statExistsAsDir(path) {
  try {
    return statSync(path).isDirectory()
  } catch {
    return false
  }
}

console.log(
  `[fix-links] ${checkOnly ? 'would fix' : 'fixed'} ${fixed} link(s); ` +
    `${unfixable} could not be resolved`,
)
for (const p of problems.slice(0, 20)) console.log(`  ${p}`)
if (problems.length > 20) console.log(`  ... and ${problems.length - 20} more`)
