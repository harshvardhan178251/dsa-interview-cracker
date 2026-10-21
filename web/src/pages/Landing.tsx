import { Link } from 'react-router-dom'

import { Badge } from '../components/common/Badge'
import { ProblemCard } from '../components/problem/ProblemCard'
import { guides, problems, siteMeta } from '../lib/data'
import { cn, formatCount } from '../lib/utils'

const FEATURES = [
  {
    title: 'Every problem has a dry run',
    body: 'Not just the code — a step-by-step table of what the algorithm actually does, which is exactly what an interviewer probes.',
    icon: 'M4 6h16M4 12h16M4 18h10',
  },
  {
    title: 'Runs in your browser',
    body: 'Compile and execute the Java solution against your own stdin on the Judge0 API, and check the output against the sample.',
    icon: 'M6 4l12 8-12 8V4z',
  },
  {
    title: 'Topic-wise concept notes',
    body: 'One deep note per topic: the intuition, the pattern decision tree, the traps, and a complexity cheat sheet.',
    icon: 'M4 5h7v15H4zM13 5h7v15h-7z',
  },
  {
    title: 'Progress that survives',
    body: 'Mark problems solved, star the hard ones, and let the spaced-repetition review queue bring them back at the right time.',
    icon: 'M9 11l3 3 8-8M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Search that finds the pattern',
    body: 'Filter by topic, difficulty, company, pattern or progress. Every filter lives in the URL, so any view is shareable.',
    icon: 'M11 19a8 8 0 100-16 8 8 0 00016 8zm10 2l-4.35-4.35',
  },
  {
    title: 'Built for the interview',
    body: 'The 8-week plan, the interview playbook and the company map turn a pile of solutions into a preparation schedule.',
    icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
  },
]

export function Landing() {
  const topics = siteMeta.topics.filter((t) => t.count > 0).sort((a, b) => a.order - b.order)
  const hot = problems
    .filter((p) => p.frequency >= 5)
    .sort((a, b) => b.frequency - a.frequency || a.title.localeCompare(b.title))
    .slice(0, 6)

  const studyPlan = guides.find((g) => g.slug === 'guide/8-week-study-plan')

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16">
      {/* ---------------------------------------------------------------- Hero */}
      <section className="pt-6">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-surface p-8 sm:p-12">
          <Badge tone="brand">
            {formatCount(siteMeta.problemCount)} problems · {topics.length} topics · Java 17
          </Badge>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Crack your next DSA interview
            <span className="text-brand">.</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Every interview problem, written the way it should be learned: a clean Java
            solution, the exact input format, a{' '}
            <strong className="font-semibold text-ink">step-by-step dry run</strong> that shows
            what the algorithm really does, the complexity trade-off, and the follow-ups an
            interviewer will ask. Then run it, right here in the browser.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/problems"
              className="inline-flex h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-brand-ink transition-opacity hover:opacity-90"
            >
              Browse all problems
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex h-11 items-center rounded-xl border border-line bg-elevated px-5 text-sm font-semibold text-ink transition-colors hover:bg-line/60"
            >
              Open my dashboard
            </Link>
            {studyPlan && (
              <Link
                to={`/guides/${studyPlan.slug}`}
                className="inline-flex h-11 items-center rounded-xl border border-transparent px-5 text-sm font-semibold text-muted transition-colors hover:text-ink"
              >
                Read the study plan →
              </Link>
            )}
          </div>

          <dl className="mt-2 grid w-full grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4">
            {[
              { label: 'Problems', value: siteMeta.problemCount },
              { label: 'Topics', value: topics.length },
              { label: 'Written guides', value: siteMeta.guideCount },
              { label: 'Interview hot', value: siteMeta.difficulties.Easy + siteMeta.difficulties.Medium + siteMeta.difficulties.Hard > 0 ? problems.filter((p) => p.frequency >= 5).length : 0 },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ Features */}
      <section>
        <SectionHeading
          eyebrow="What is inside"
          title="Built to be studied, not skimmed"
          body="Most preparation sets give you a solution and call it a day. This one gives you the reasoning the interviewer is actually testing for."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4.5 w-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {feature.icon.split(' M').map((d, i) => (
                    <path key={i} d={i === 0 ? d : `M${d}`} />
                  ))}
                </svg>
              </span>
              <h3 className="mt-3.5 text-[15px] font-semibold text-ink">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- Topics */}
      <section>
        <SectionHeading
          eyebrow="24 topics"
          title="Pick a topic and see every problem in it"
          body="Each topic page lists all of its problems, its difficulty mix, the patterns it covers, and the companies that ask it."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const list = problems.filter((p) => p.topic === topic.key)
            const easy = list.filter((p) => p.difficulty === 'Easy').length
            const medium = list.filter((p) => p.difficulty === 'Medium').length
            const hard = list.filter((p) => p.difficulty === 'Hard').length
            const hotCount = list.filter((p) => p.frequency >= 5).length

            return (
              <Link
                key={topic.key}
                to={`/topics/${topic.key}`}
                className="group flex flex-col gap-2 rounded-2xl border border-line bg-surface p-4 transition-all hover:border-brand/50 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-ink group-hover:text-brand">
                    {topic.label}
                  </h3>
                  <span className="rounded bg-elevated px-1.5 py-0.5 text-[11px] font-semibold text-muted">
                    {topic.count}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted">
                  {topic.description}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-[11px]">
                  <span className="text-ok">{easy} easy</span>
                  <span className="text-warn">{medium} med</span>
                  <span className="text-bad">{hard} hard</span>
                  {hotCount > 0 && (
                    <span className="ml-auto text-warn" title={`${hotCount} asked constantly`}>
                      {'★'.repeat(Math.min(hotCount, 5))}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* --------------------------------------------------------- Most asked */}
      <section>
        <SectionHeading
          eyebrow="Start here"
          title="The problems that come up again and again"
          body="Marked ★★★★★ — asked repeatedly across companies. If you only have two weeks, do these."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hot.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            to="/problems?sort=heat"
            className="inline-flex h-10 items-center rounded-xl border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-brand/50"
          >
            See all {problems.filter((p) => p.frequency >= 5).length} hot problems
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section className="rounded-3xl border border-line bg-surface p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          A plan, not just a pile of problems
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
          The eight-week plan sequences the topics so each one builds on the last, with weekly
          mock interviews, a scoring rubric, and a tracker to keep you honest.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/guides/guide/8-week-study-plan"
            className="inline-flex h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-brand-ink hover:opacity-90"
          >
            Open the study plan
          </Link>
          <Link
            to="/guides"
            className="inline-flex h-10 items-center rounded-xl border border-line bg-elevated px-4 text-sm font-semibold text-ink hover:bg-line/60"
          >
            Browse all guides
          </Link>
        </div>
      </section>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
      <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-ink">{title}</h2>
      <p className={cn('mt-2 text-sm leading-relaxed text-muted')}>{body}</p>
    </div>
  )
}
