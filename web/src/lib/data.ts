import indexJson from '../data/index.json'
import guidesJson from '../data/guides.json'
import metaJson from '../data/meta.json'

import type { Guide, Problem, ProblemDetail, SiteMeta } from './types'

/**
 * The catalogue is generated from the Java sources by `scripts/generate-data.mjs`
 * and committed to the repository, so the site works with no build step and no
 * network access.
 *
 * The listing data (`index.json`) is bundled eagerly — it is small. The heavy
 * per-problem payload (source, runner source and the write-up) lives in one
 * JSON file per problem and is fetched only when a problem is opened.
 */
export const problems = indexJson as Problem[]
export const guides = guidesJson as Guide[]
export const siteMeta = metaJson as SiteMeta

export const problemsById = new Map(problems.map((p) => [p.id, p]))
export const problemsBySlug = new Map(problems.map((p) => [p.slug, p]))
export const guidesBySlug = new Map(guides.map((g) => [g.slug, g]))

/** Vite turns this into one lazy chunk per problem. */
const detailModules = import.meta.glob<ProblemDetail>('../data/problems/*.json')

/** One lazy chunk per guide body. */
const guideModules = import.meta.glob<{ id: string; body: string }>('../data/guides/*.json')

const detailCache = new Map<string, ProblemDetail>()
const guideCache = new Map<string, string>()

export function findProblem(idOrSlug: string): Problem | undefined {
  return problemsById.get(idOrSlug) ?? problemsBySlug.get(idOrSlug)
}

export function findGuide(slug: string): Guide | undefined {
  return guidesBySlug.get(slug)
}

/** Loads the heavy payload for a problem, from cache when possible. */
export async function loadProblemDetail(id: string): Promise<ProblemDetail | undefined> {
  const cached = detailCache.get(id)
  if (cached) return cached

  const loader = detailModules[`../data/problems/${id}.json`]
  if (!loader) return undefined

  const detail = (await loader()) as ProblemDetail
  detailCache.set(id, detail)
  return detail
}

/** Loads the body of a guide, from cache when possible. */
export async function loadGuideBody(guide: Guide): Promise<string | undefined> {
  const cached = guideCache.get(guide.id)
  if (cached !== undefined) return cached

  const loader = guideModules[`../data/guides/${guide.file}`]
  if (!loader) return undefined

  const module = (await loader()) as { id: string; body: string }
  guideCache.set(guide.id, module.body)
  return module.body
}

export function problemsInTopic(topic: string): Problem[] {
  return problems.filter((p) => p.topic === topic)
}

export function problemsForCompany(company: string): Problem[] {
  return problems.filter((p) => p.companies.includes(company))
}

export function problemsWithPattern(pattern: string): Problem[] {
  return problems.filter((p) => p.patterns.includes(pattern))
}
