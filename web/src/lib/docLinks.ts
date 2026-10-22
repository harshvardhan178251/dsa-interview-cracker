/**
 * Rewrites the repository's file-relative markdown links into links that work on
 * the website.
 *
 * The write-ups link to each other with paths that are correct on GitHub:
 *
 *     ./01-8-week-study-plan.md             a sibling guide
 *     ../../../../../../docs/topics/02-strings.md   a topic note
 *     TwoSumII.md                            a sibling problem's write-up
 *     ../twopointers/TwoSumII.java           the Java source of another problem
 *     ./TwoSum.java                          this problem's own source
 *
 * On the site those paths mean nothing. This module turns them into the right
 * thing:
 *
 *     /guides/guide/8-week-study-plan
 *     /guides/topic/strings
 *     /problems/twopointers-two-sum-ii-input-array-is-sorted
 *     https://github.com/owner/repo/blob/main/src/main/java/.../TwoSumII.java
 */

import { problems } from './data'
import type { GuideCategory } from './types'

/** The guide categories, matching the slugs in `docs/`. */
export type DocCategory = GuideCategory

/** Class name -> the site's slug for that problem. */
const slugByClassName = new Map(problems.map((p) => [p.className, p.slug]))

/** `docs/guides` is exposed on the site as the `guide` category. */
const FOLDER_TO_CATEGORY: Record<string, DocCategory> = {
  guides: 'guide',
  topics: 'topic',
  'system-design': 'system-design',
  lld: 'lld',
  ibps: 'ibps',
}

/** Joins POSIX path segments, resolving `.` and `..`. */
function resolvePath(base: string, relative: string): string {
  const parts = base.split('/').filter(Boolean)
  for (const segment of relative.split('/')) {
    if (segment === '' || segment === '.') continue
    if (segment === '..') {
      parts.pop()
      continue
    }
    parts.push(segment)
  }
  return parts.join('/')
}

/**
 * Rewrites a link found inside a guide or a problem write-up.
 *
 * @param href        the link as written in the markdown
 * @param category    the category of the document the link was found in
 * @param repoUrl     the GitHub repository, for links to source files
 * @param sourceDir   where the current document lives in the source tree, e.g.
 *                    `src/main/java/com/dsa/arrays` — needed to resolve relative
 *                    links to `.java` files
 * @returns the rewritten href, or null when the link should be left alone
 */
export function rewriteDocLink(
  href: string,
  category: DocCategory,
  repoUrl: string,
  sourceDir?: string,
): string | null {
  if (/^(https?:|mailto:|#)/i.test(href)) return null

  // --- A link to a Java source file -> the file in the repository ---
  if (href.endsWith('.java')) {
    if (!sourceDir) return null
    const resolved = resolvePath(sourceDir, href)
    if (!resolved.startsWith('src/main/java/')) return null
    const base = repoUrl.replace(/\/+$/, '')
    return `${base}/blob/main/${resolved}`
  }

  if (!href.endsWith('.md')) {
    // An explicit site-style path, e.g. ../guides/guide/8-week-study-plan
    const routeMatch = href.match(
      /^(?:\.\.\/)*guides\/(guide|ibps|topic|system-design|lld)\/([\w-]+)$/,
    )
    if (routeMatch) {
      const [, target, name] = routeMatch
      return `/guides/${target}/${name}`
    }

    // A bare sibling reference with a numeric prefix, e.g. 04-computer-apptitude
    const bareMatch = href.match(/^(?:\d+-)?([\w-]+)$/)
    if (bareMatch && !href.includes('/')) {
      return `/guides/${category}/${bareMatch[1]}`
    }

    return null
  }

  // --- A link into the docs tree -> a guide route ---
  const docsMatch = href.match(
    /^(?:\.\.\/)*(?:docs\/)?(guides|topics|system-design|lld|ibps)\/(?:\d+-)?([\w-]+)\.md$/,
  )
  if (docsMatch) {
    const [, folder, name] = docsMatch
    return `/guides/${FOLDER_TO_CATEGORY[folder] ?? folder}/${name}`
  }

  // --- A link to a sibling problem's write-up -> that problem's page ---
  const className = href.replace(/\.md$/, '').split('/').pop() ?? ''
  const problemSlug = slugByClassName.get(className)
  if (problemSlug) {
    return `/problems/${problemSlug}`
  }

  // --- Anything else that looks like a guide -> its route ---
  const guideMatch = href.match(/^(?:\.\.\/|\.\/)?(?:([a-z][a-z-]*)\/)?(?:\d+-)?([\w-]+)\.md$/)
  if (guideMatch) {
    const [, folder, name] = guideMatch
    const target = folder ? (FOLDER_TO_CATEGORY[folder] ?? folder) : category
    return `/guides/${target}/${name}`
  }

  return null
}
