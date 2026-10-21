import { useCallback, useEffect, useState } from 'react'

import { Badge } from '../common/Badge'
import { Button } from '../common/Button'
import { CopyButton } from '../common/CopyButton'
import { Spinner } from '../common/Spinner'
import { Judge0Error, outputsMatch, runJava } from '../../lib/judge0'
import type { RunResult } from '../../lib/judge0'
import type { Problem } from '../../lib/types'

const SETTINGS_KEY = 'dsa.judge0.url'

function readBaseUrl(): string {
  try {
    return window.localStorage.getItem(SETTINGS_KEY) ?? ''
  } catch {
    return ''
  }
}

const STATUS_TONE: Record<string, 'ok' | 'bad' | 'warn' | 'neutral'> = {
  Accepted: 'ok',
  'Wrong Answer': 'bad',
  'Compile Error': 'bad',
  'Runtime Error': 'bad',
  'Time Limit Exceeded': 'bad',
  'Memory Limit Exceeded': 'bad',
  'In Queue': 'neutral',
  Processing: 'neutral',
  Error: 'warn',
}

export function RunPanel({
  problem,
  judgeSource,
}: {
  problem: Problem
  judgeSource: string
}) {
  const [stdin, setStdin] = useState(problem.sampleInput)
  const [result, setResult] = useState<RunResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hint, setHint] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [baseUrl, setBaseUrl] = useState(readBaseUrl)
  const [showSettings, setShowSettings] = useState(false)

  // Reset the console when the user opens a different problem.
  useEffect(() => {
    setStdin(problem.sampleInput)
    setResult(null)
    setError(null)
    setHint(null)
  }, [problem.id, problem.sampleInput])

  const execute = useCallback(async () => {
    setRunning(true)
    setError(null)
    setHint(null)
    setResult(null)
    try {
      const outcome = await runJava(judgeSource, { stdin, baseUrl: baseUrl || undefined })
      setResult(outcome)
    } catch (err) {
      if (err instanceof Judge0Error) {
        setError(err.message)
        setHint(err.hint ?? null)
      } else {
        setError('Something went wrong while running the code.')
      }
    } finally {
      setRunning(false)
    }
  }, [baseUrl, judgeSource, stdin])

  const verified = result
    ? result.status === 'Accepted' &&
      problem.sampleOutput &&
      outputsMatch(result.stdout, problem.sampleOutput)
    : false

  const mismatch =
    result &&
    result.status === 'Accepted' &&
    problem.sampleOutput &&
    !outputsMatch(result.stdout, problem.sampleOutput)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-ink">Run this solution</h3>
          <p className="text-xs text-muted">
            Compiled and executed on the public Judge0 API (Java / OpenJDK 13).
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={() => setShowSettings((v) => !v)}>
          {showSettings ? 'Hide settings' : 'Settings'}
        </Button>
      </div>

      {showSettings && (
        <div className="rounded-lg border border-line bg-elevated p-3">
          <label className="text-xs font-medium text-muted" htmlFor="judge0-url">
            Custom Judge0 base URL (optional — for a self-hosted instance)
          </label>
          <div className="mt-1.5 flex gap-2">
            <input
              id="judge0-url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              onBlur={() => {
                try {
                  if (baseUrl) window.localStorage.setItem(SETTINGS_KEY, baseUrl)
                  else window.localStorage.removeItem(SETTINGS_KEY)
                } catch {
                  /* ignore */
                }
              }}
              placeholder="https://ce.judge0.com"
              className="h-9 flex-1 rounded-lg border border-line bg-surface px-2.5 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-none"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted" htmlFor="stdin">
            Standard input
          </label>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setStdin(problem.sampleInput)}
              disabled={!problem.sampleInput}
            >
              Reset to sample
            </Button>
            <CopyButton text={stdin} label="Copy input" />
          </div>
        </div>
        <textarea
          id="stdin"
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          spellCheck={false}
          rows={8}
          placeholder="Values to read from standard input…"
          className="w-full resize-y rounded-lg border border-line bg-canvas p-3 font-mono text-[13px] leading-relaxed text-ink placeholder:text-faint focus:border-brand focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" onClick={execute} disabled={running}>
          {running ? <Spinner label="Running…" /> : 'Run code'}
        </Button>
        <Button onClick={execute} disabled={running}>
          Run & verify against sample
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-bad/40 bg-bad-soft p-3">
          <p className="text-sm font-medium text-bad">{error}</p>
          {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
        </div>
      )}

      {result && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={STATUS_TONE[result.status] ?? 'neutral'}>{result.status}</Badge>
            {verified && <Badge tone="ok">Output matched the sample ✓</Badge>}
            {mismatch && <Badge tone="warn">Output differs from the sample</Badge>}
            {result.time && <span className="text-xs text-faint">time {result.time}s</span>}
            {result.memoryKb != null && (
              <span className="text-xs text-faint">memory {Math.round(result.memoryKb / 1024)} MB</span>
            )}
          </div>

          {result.compileOutput && (
            <OutputBox title="Compiler output" tone="bad" content={result.compileOutput} />
          )}

          <OutputBox title="Standard output" content={result.stdout} />

          {result.stderr && <OutputBox title="Standard error" tone="bad" content={result.stderr} />}

          {result.message && !result.compileOutput && !result.stderr && (
            <OutputBox title="Message" tone="warn" content={result.message} />
          )}
        </div>
      )}
    </div>
  )
}

function OutputBox({
  title,
  content,
  tone = 'neutral',
}: {
  title: string
  content: string
  tone?: 'neutral' | 'bad' | 'warn'
}) {
  const border =
    tone === 'bad' ? 'border-bad/40' : tone === 'warn' ? 'border-warn/40' : 'border-line'

  return (
    <div className={`overflow-hidden rounded-lg border ${border}`}>
      <div className="flex items-center justify-between border-b border-line bg-elevated px-3 py-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-faint">{title}</span>
        <CopyButton text={content} label="Copy" />
      </div>
      <pre className="overflow-x-auto bg-canvas p-3 font-mono text-[13px] leading-relaxed text-ink">
        {content || <span className="text-faint">(empty)</span>}
      </pre>
    </div>
  )
}
