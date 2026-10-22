import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { guides } from '../lib/data'
import ibpsRaw from '../data/ibps-syllabus.json'
import { cn } from '../lib/utils'

interface Topic {
  name: string
  level: 'basic' | 'intermediate' | 'advanced'
  prelimsWeight: string
  mainsWeight: string
  priority: string
}

interface PhaseSection {
  name: string
  questions: number
  marks: number
  minutes: number
  medium: string
}

interface IbpsSyllabus {
  exam: string
  fullName: string
  conductingBody: string
  vacancyCycle: string
  version: string
  authorityNote: string
  lastCheckedAt: string | null
  lastReviewedAt: string | null
  changeDetectedAt: string | null
  prelims: {
    totalQuestions: number
    totalMarks: number
    totalMinutes: number
    sections: PhaseSection[]
  }
  mains: {
    totalQuestions: number
    totalMarks: number
    totalMinutes: number
    sections: PhaseSection[]
  }
  descriptive: { questions: number; marks: number; minutes: number; paper: string }
  interview: { marks: number; finalMerit: string; weightage: string }
  topics: Record<string, Topic[]>
}

const syllabus = ibpsRaw as unknown as IbpsSyllabus

interface LiveStatus {
  checkedAt: string
  changed: boolean
  changedAt: string | null
  lastCheckedAt: string | null
  lastReviewedAt: string | null
  reachable: number
  total: number
}

interface Topic {
  name: string
  level: 'basic' | 'intermediate' | 'advanced'
  prelimsWeight: string
  mainsWeight: string
  priority: string
}

interface Section {
  key: 'english' | 'quant' | 'reasoning' | 'computer' | 'ga'
  label: string
  blurb: string
  topics: Topic[]
}

const LEVELS = ['basic', 'intermediate', 'advanced'] as const
type Level = (typeof LEVELS)[number]

const LEVEL_LABEL: Record<Level, string> = {
  basic: 'From scratch',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const PRIORITY_TONE: Record<string, 'bad' | 'warn' | 'neutral'> = {
  critical: 'bad',
  high: 'warn',
  medium: 'neutral',
  low: 'neutral',
}

function timeAgo(iso: string | null): string {
  if (!iso) return 'never'
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 1) return 'less than an hour ago'
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export function IbpsPage() {
  const [level, setLevel] = useState<Level | 'all'>('all')
  const [live, setLive] = useState<LiveStatus | null>(null)

  // The backend re-fetches the IBPS sources and compares them with the recorded
  // snapshot, so a change is visible here within minutes of it happening.
  useEffect(() => {
    let cancelled = false
    fetch('/api/ibps/status')
      .then((response) => (response.ok ? response.json() : null))
      .then((status: LiveStatus | null) => {
        if (!cancelled && status) setLive(status)
      })
      .catch(() => {
        /* a static deployment has no backend — the recorded snapshot is used */
      })
    return () => {
      cancelled = true
    }
  }, [])

  const sections: Section[] = useMemo(
    () => [
      {
        key: 'english',
        label: 'English Language',
        blurb: 'Reading comprehension, grammar and vocabulary. The cheapest section to score in Mains.',
        topics: syllabus.topics.english,
      },
      {
        key: 'quant',
        label: 'Quantitative Aptitude',
        blurb: 'DI and arithmetic are roughly two thirds of the section. Speed is the whole game.',
        topics: syllabus.topics.quant,
      },
      {
        key: 'reasoning',
        label: 'Reasoning Ability',
        blurb: 'Puzzles dominate — 15 to 25 of 35 questions in Prelims.',
        topics: syllabus.topics.reasoning,
      },
      {
        key: 'computer',
        label: 'Computer Aptitude',
        blurb: 'No longer its own section; folded into Reasoning and General Awareness.',
        topics: syllabus.topics.computer,
      },
      {
        key: 'ga',
        label: 'Banking, Economy & Current Affairs',
        blurb: 'The highest cut-off in Mains, and the most marks per minute.',
        topics: syllabus.topics.ga,
      },
    ],
    [],
  )

  const ibpsGuides = guides.filter((g) => g.category === 'ibps').sort((a, b) => a.order - b.order)

  const stale = Boolean(live?.changed ?? syllabus.changeDetectedAt)
  const changedAt = live?.changedAt ?? (syllabus.changeDetectedAt as string | null)
  const lastChecked = live?.checkedAt ?? (syllabus.lastCheckedAt as string | null)
  const lastReviewed = live?.lastReviewedAt ?? (syllabus.lastReviewedAt as string | null)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* --------------------------------------------------------------- Hero */}
      <section className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{syllabus.exam}</Badge>
              <Badge tone="neutral">{syllabus.vacancyCycle} cycle</Badge>
              <Badge tone="accent">version {syllabus.version}</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
              Probationary Officer — from scratch to advanced
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {syllabus.fullName}, conducted by the {syllabus.conductingBody}. Nine written
              guides covering the full syllabus, plus the exam pattern, the topic-wise weightage
              and a twelve-week plan.
            </p>
          </div>
          <div className="shrink-0 rounded-xl border border-line bg-elevated p-3 text-right">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">
              Source checked
            </div>
            <div className="mt-0.5 text-sm font-semibold text-ink">{timeAgo(lastChecked)}</div>
            <div className="mt-2 text-[11px] text-faint">Notes reviewed {timeAgo(lastReviewed)}</div>
            {live && (
              <div className="mt-2 text-[11px] text-faint">
                {live.reachable}/{live.total} sources reachable
              </div>
            )}
          </div>
        </div>

        {stale && (
          <div className="mt-5 rounded-xl border border-warn/40 bg-warn-soft p-4">
            <p className="text-sm font-semibold text-warn">The source may have changed</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              An automated check found a change in the IBPS sources on{' '}
              {changedAt ? new Date(changedAt).toLocaleDateString() : 'a recent date'}. The
              notes may be out of date — confirm the exam pattern against{' '}
              <a
                href="https://www.ibps.in/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand underline"
              >
                ibps.in
              </a>{' '}
              before you plan.
            </p>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------ Pattern */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-ink">Exam pattern</h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <PhaseCard
            title="Prelims"
            questions={syllabus.prelims.totalQuestions}
            marks={syllabus.prelims.totalMarks}
            minutes={syllabus.prelims.totalMinutes}
            note="Sectionally timed — you cannot carry minutes forward."
            sections={syllabus.prelims.sections.map((s) => ({
              name: s.name,
              questions: s.questions,
              marks: s.marks,
              minutes: s.minutes,
            }))}
          />
          <PhaseCard
            title="Mains — objective"
            questions={syllabus.mains.totalQuestions}
            marks={syllabus.mains.totalMarks}
            minutes={syllabus.mains.totalMinutes}
            note="Then the descriptive paper: essay and comprehension, 25 marks, 30 minutes."
            sections={syllabus.mains.sections.map((s) => ({
              name: s.name,
              questions: s.questions,
              marks: s.marks,
              minutes: s.minutes,
            }))}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: 'Descriptive',
              value: `${syllabus.descriptive.marks} marks`,
              detail: `${syllabus.descriptive.questions} questions · ${syllabus.descriptive.minutes} min · ${syllabus.descriptive.paper}`,
            },
            {
              title: 'Personality test',
              value: 'Non-qualifying',
              detail: 'Mandatory to attend, otherwise you are ineligible for the interview.',
            },
            {
              title: 'Final merit',
              value: `${syllabus.interview.weightage}`,
              detail: `${syllabus.interview.finalMerit}. Prelims marks do not count.`,
            },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-line bg-surface p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                {card.title}
              </div>
              <div className="mt-1 text-lg font-bold tracking-tight text-ink">{card.value}</div>
              <div className="mt-1 text-xs leading-relaxed text-muted">{card.detail}</div>
            </div>
          ))}
        </div>

        <p className="rounded-xl border border-line bg-elevated p-4 text-xs leading-relaxed text-muted">
          <strong className="text-ink">Negative marking:</strong> −0.25 for every wrong
          objective answer, in both papers. A blank costs nothing. {syllabus.authorityNote}
        </p>
      </section>

      {/* ---------------------------------------------------------- Topic map */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-ink">The syllabus, topic by topic</h2>
            <p className="mt-1 text-xs text-muted">
              Weightage is the typical question count across recent papers. Filter by depth to
              see only what you should be working on now.
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-line bg-surface p-0.5">
            <button
              type="button"
              onClick={() => setLevel('all')}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                level === 'all' ? 'bg-brand-soft text-brand' : 'text-muted hover:text-ink',
              )}
            >
              All
            </button>
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                  level === l ? 'bg-brand-soft text-brand' : 'text-muted hover:text-ink',
                )}
              >
                {LEVEL_LABEL[l]}
              </button>
            ))}
          </div>
        </div>

        {sections.map((section) => {
          const topics = section.topics.filter((t) => level === 'all' || t.level === level)
          if (!topics.length) return null
          return (
            <div key={section.key} className="rounded-2xl border border-line bg-surface p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-ink">{section.label}</h3>
                <span className="text-[11px] text-faint">{topics.length} topics</span>
              </div>
              <p className="mt-1 text-xs text-muted">{section.blurb}</p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
                      <th className="py-2 pr-3 font-semibold">Topic</th>
                      <th className="py-2 pr-3 font-semibold">Depth</th>
                      <th className="py-2 pr-3 font-semibold">Prelims</th>
                      <th className="py-2 pr-3 font-semibold">Mains</th>
                      <th className="py-2 font-semibold">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topics.map((topic) => (
                      <tr key={topic.name} className="border-b border-line/50 last:border-0">
                        <td className="py-2 pr-3 font-medium text-ink">{topic.name}</td>
                        <td className="py-2 pr-3">
                          <span
                            className={cn(
                              'rounded px-1.5 py-0.5 text-[10px] font-medium',
                              topic.level === 'basic' && 'bg-ok-soft text-ok',
                              topic.level === 'intermediate' && 'bg-warn-soft text-warn',
                              topic.level === 'advanced' && 'bg-bad-soft text-bad',
                            )}
                          >
                            {LEVEL_LABEL[topic.level]}
                          </span>
                        </td>
                        <td className="py-2 pr-3 text-muted">{topic.prelimsWeight}</td>
                        <td className="py-2 pr-3 text-muted">{topic.mainsWeight}</td>
                        <td className="py-2">
                          <Badge tone={PRIORITY_TONE[topic.priority] ?? 'neutral'}>
                            {topic.priority}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}

        {sections.every((s) => !s.topics.some((t) => level === 'all' || t.level === level)) && (
          <EmptyState
            title="No topics at that depth"
            description="Pick another depth, or choose All."
          />
        )}
      </section>

      {/* ------------------------------------------------------------- Guides */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-ink">The guides</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ibpsGuides.map((guide) => (
            <Link
              key={guide.id}
              to={`/guides/${guide.slug}`}
              className="group flex flex-col gap-1.5 rounded-xl border border-line bg-surface p-4 transition-all hover:border-brand/50 hover:shadow-lg hover:shadow-black/5"
            >
              <span className="text-sm font-semibold text-ink group-hover:text-brand">
                {guide.title}
              </span>
              <span className="line-clamp-2 text-xs leading-relaxed text-muted">
                {guide.summary}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function PhaseCard({
  title,
  questions,
  marks,
  minutes,
  note,
  sections,
}: {
  title: string
  questions: number
  marks: number
  minutes: number
  note: string
  sections: { name: string; questions: number; marks: number; minutes: number }[]
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <span className="text-[11px] text-faint">
          {questions} questions · {marks} marks · {minutes} min
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {sections.map((section) => (
          <div
            key={section.name}
            className="flex items-start justify-between gap-3 rounded-lg border border-line bg-elevated px-3 py-2"
          >
            <span className="min-w-0 text-xs font-medium leading-snug text-ink">
              {section.name}
            </span>
            <span className="shrink-0 whitespace-nowrap text-[11px] text-muted">
              {section.questions} Q · {section.marks} M · {section.minutes} min
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-faint">{note}</p>
    </div>
  )
}
