/**
 * Shared domain types for the DSA site.
 * These mirror exactly what `web/scripts/generate-data.mjs` emits.
 */

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type Status = 'todo' | 'attempted' | 'solved'

export interface Problem {
  /** Stable unique id, e.g. `arrays.TwoSum` */
  id: string
  /** URL friendly slug, e.g. `arrays-two-sum` */
  slug: string
  title: string
  /** Package segment, e.g. `arrays` */
  topic: string
  /** Human readable topic name, e.g. `Arrays` */
  topicLabel: string
  /** Java class name */
  className: string
  /** LeetCode problem number when applicable */
  leetcode: number | null
  difficulty: Difficulty
  /** Interview patterns this problem demonstrates, e.g. `Two Pointers` */
  patterns: string[]
  /** Companies known to ask this problem */
  companies: string[]
  /** Free-form tags */
  tags: string[]
  /** Interview heat, 1 (rare) to 5 (asked constantly) */
  frequency: number
  /** Sample stdin */
  sampleInput: string
  /** Expected stdout */
  sampleOutput: string
  /** True when a JUnit test class exists for this problem */
  hasTest: boolean
  /** True when a companion `.md` write-up exists */
  hasDoc: boolean
}

/**
 * The heavy payload for a single problem. Kept in its own JSON file so the
 * catalogue can be loaded without pulling every source file and write-up into
 * the initial bundle.
 */
export interface ProblemDetail {
  id: string
  /** Original Java source (as committed in the repo) */
  source: string
  /** Self-contained Java source, ready to compile & run on Judge0 */
  judgeSource: string
  /** Markdown body of the companion `.md` file (frontmatter stripped) */
  doc: string
  /** Public API method signatures found in the source */
  methods: string[]
}

export type GuideCategory = 'topic' | 'system-design' | 'lld' | 'guide' | 'ibps'

export interface Guide {
  id: string
  slug: string
  title: string
  category: GuideCategory
  /** Owning topic for `category === 'topic'` */
  topic: string | null
  order: number
  summary: string
  /** File name of the lazily-loaded body, relative to `src/data/guides` */
  file: string
}

/** The lazily-loaded body of a guide. */
export interface GuideBody {
  id: string
  body: string
}

export interface TopicMeta {
  key: string
  label: string
  description: string
  count: number
  order: number
}

export interface SiteMeta {
  title: string
  generatedAt: string
  problemCount: number
  guideCount: number
  topics: TopicMeta[]
  companies: string[]
  patterns: string[]
  difficulties: Record<Difficulty, number>
}

export interface ProblemBundle {
  problems: Problem[]
  guides: Guide[]
  meta: SiteMeta
}
/** Per-problem progress record persisted in localStorage. */
export interface ProgressEntry {
  status: Status
  attempts: number
  starred: boolean
  notes: string
  updatedAt: number
  /** Epoch ms of the last successful solve — drives the review queue. */
  solvedAt: number | null
}
