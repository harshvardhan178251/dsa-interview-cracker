import { useCallback, useEffect, useMemo, useState } from 'react'
import { lazy, Suspense } from 'react'

import { Badge } from '../common/Badge'
import { Button } from '../common/Button'
import { CopyButton } from '../common/CopyButton'
import { Spinner } from '../common/Spinner'
import { DiffView } from './DiffView'
import { backendAvailable, runSubmission } from '../../lib/api'
import type { RunResponse, TestCase } from '../../lib/api'
import { cn } from '../../lib/utils'
import type { Problem } from '../../lib/types'

const JavaEditor = lazy(() =>
  import('../editor/JavaEditor').then((m) => ({ default: m.JavaEditor })),
)

type Mode = 'reference' | 'mine'

const VERDICT_TONE: Record<string, 'ok' | 'bad' | 'warn' | 'neutral'> = {
  Accepted: 'ok',
  'Wrong Answer': 'bad',
  'Compile Error': 'bad',
  'Runtime Error': 'bad',
  'Time Limit Exceeded': 'bad',
  Error: 'warn',
}

export function RunPanel({
  problem,
  referenceSource,
}: {
  problem: Problem
  referenceSource: string
}) {
  const [mode, setMode] = useState<Mode>('reference')
  const [code, setCode] = useState(referenceSource)
  const [stdin, setStdin] = useState(problem.sampleInput)
  const [cases, setCases] = useState<TestCase[]>([])
  const [result, setResult] = useState<RunResponse | null>(null)
  const [running, setRunning] = useState(false)
  const [backend, setBackend] = useState<boolean | null>(null)

  useEffect(() => {
    backendAvailable().then(setBackend)
  }, [])

  const effectiveCode = mode === 'reference' ? referenceSource : code

  const execute = useCallback(async () => {
    setRunning(true)
    setResult(null)
    try {
      const response = await runSubmission({
        source: effectiveCode,
        stdin,
        problemId: problem.id,
        cases,
      })
      setResult(response)
    } finally {
      setRunning(false)
    }
  }, [cases, effectiveCode, problem.id, stdin])

  const reset = useCallback(() => {
    setMode('reference')
    setCode(referenceSource)
    setStdin(problem.sampleInput)
    setCases([])
    setResult(null)
  }, [problem.sampleInput, referenceSource])

  const addCase = useCallback(() => {
    setCases((current) => [
      ...current,
      { name: `case ${current.length + 1}`, stdin, expected: null },
    ])
  }, [stdin])

  const updateCase = useCallback((index: number, patch: Partial<TestCase>) => {
    setCases((current) =>
      current.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    )
  }, [])

  const removeCase = useCallback((index: number) => {
    setCases((current) => current.filter((_, i) => i !== index))
  }, [])

  const failedCases = useMemo(
    () => result?.cases.filter((c) => !c.passed) ?? [],
    [result],
  )

  return (
    <div className="flex flex-col gap-5">
      {/* ------------------------------------------------------------ Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">Java compiler</h3>
          <p className="text-xs text-muted">
            {backend === true
              ? 'Running on the local compiler — your code is compiled and executed by the server.'
              : backend === false
                ? 'The local compiler is not available, so runs go to the public Judge0 API.'
                : 'Checking for the local compiler…'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {backend !== null && (
            <Badge tone={backend ? 'ok' : 'neutral'}>
              {backend ? 'local compiler' : 'Judge0 fallback'}
            </Badge>
          )}
          <Button size="sm" variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------ Code + input */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-line bg-surface p-0.5">
              <button
                type="button"
                onClick={() => setMode('reference')}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                  mode === 'reference'
                    ? 'bg-brand-soft text-brand'
                    : 'text-muted hover:text-ink',
                )}
              >
                Reference solution
              </button>
              <button
                type="button"
                onClick={() => setMode('mine')}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                  mode === 'mine' ? 'bg-brand-soft text-brand' : 'text-muted hover:text-ink',
                )}
              >
                Your code
              </button>
            </div>
            <div className="flex items-center gap-1">
              {mode === 'mine' && (
                <Button size="sm" variant="ghost" onClick={() => setCode(referenceSource)}>
                  Load reference
                </Button>
              )}
              <CopyButton text={effectiveCode} label="Copy code" />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-line">
            <Suspense
              fallback={
                <div className="flex h-[260px] items-center justify-center">
                  <Spinner label="Loading the editor…" />
                </div>
              }
            >
              <JavaEditor
                value={effectiveCode}
                onChange={setCode}
                readOnly={mode === 'reference'}
                ariaLabel="Java source"
                onSubmit={execute}
              />
            </Suspense>
          </div>

          {mode === 'mine' && (
            <p className="text-[11px] text-faint">
              Press <kbd className="rounded border border-line bg-elevated px-1">Ctrl</kbd>+
              <kbd className="rounded border border-line bg-elevated px-1">Enter</kbd> to run.
              Your code must declare a <code className="font-mono">main(String[] args)</code> method.
            </p>
          )}
        </section>

        <section className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted" htmlFor="stdin">
              Standard input
            </label>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={() => setStdin(problem.sampleInput)}>
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
            rows={10}
            placeholder="Values to read from standard input…"
            className="w-full resize-y rounded-lg border border-line bg-canvas p-3 font-mono text-[13px] leading-relaxed text-ink placeholder:text-faint focus:border-brand focus:outline-none"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" onClick={execute} disabled={running}>
              {running ? <Spinner label="Compiling…" /> : 'Run code'}
            </Button>
            <Button onClick={addCase} disabled={running}>
              Add as test case
            </Button>
          </div>
        </section>
      </div>

      {/* --------------------------------------------------------- Test cases */}
      {cases.length > 0 && (
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Your test cases
            </h4>
            <span className="text-[11px] text-faint">
              Leave the expected output empty to compare against the reference solution.
            </span>
          </div>
          {cases.map((testCase, index) => (
            <div key={index} className="rounded-lg border border-line bg-surface p-3">
              <div className="mb-2 flex items-center gap-2">
                <input
                  value={testCase.name}
                  onChange={(e) => updateCase(index, { name: e.target.value })}
                  className="h-7 flex-1 rounded border border-line bg-canvas px-2 text-xs text-ink focus:border-brand focus:outline-none"
                  aria-label={`Test case ${index + 1} name`}
                />
                <Button size="sm" variant="ghost" onClick={() => removeCase(index)}>
                  Remove
                </Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <textarea
                  value={testCase.stdin}
                  onChange={(e) => updateCase(index, { stdin: e.target.value })}
                  spellCheck={false}
                  rows={3}
                  placeholder="input"
                  aria-label={`Test case ${index + 1} input`}
                  className="w-full resize-y rounded border border-line bg-canvas p-2 font-mono text-[12px] text-ink focus:border-brand focus:outline-none"
                />
                <textarea
                  value={testCase.expected ?? ''}
                  onChange={(e) =>
                    updateCase(index, { expected: e.target.value === '' ? null : e.target.value })
                  }
                  spellCheck={false}
                  rows={3}
                  placeholder="expected output (optional)"
                  aria-label={`Test case ${index + 1} expected output`}
                  className="w-full resize-y rounded border border-line bg-canvas p-2 font-mono text-[12px] text-ink focus:border-brand focus:outline-none"
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ------------------------------------------------------------- Result */}
      {result && (
        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={VERDICT_TONE[result.status] ?? 'neutral'}>{result.status}</Badge>
            {result.ranOn === 'local' ? (
              <Badge tone="ok">compiled locally</Badge>
            ) : (
              <Badge tone="neutral">ran on Judge0</Badge>
            )}
            {result.durationMs > 0 && (
              <span className="text-xs text-faint">{result.durationMs} ms</span>
            )}
            {result.cases.length > 0 && (
              <span className="text-xs text-faint">
                {result.cases.filter((c) => c.passed).length}/{result.cases.length} case
                {result.cases.length === 1 ? '' : 's'} passed
              </span>
            )}
          </div>

          {result.status === 'Wrong Answer' && (
            <div className="rounded-lg border border-bad/40 bg-bad-soft p-3">
              <p className="text-sm font-semibold text-bad">Wrong answer</p>
              <p className="mt-0.5 text-xs text-muted">
                The program ran without errors but did not produce the expected output. The
                comparison below shows exactly where it diverged.
              </p>
            </div>
          )}

          {result.compileOutput && (
            <OutputBox title="Compiler output" tone="bad" content={result.compileOutput} />
          )}

          {failedCases.map((testCase) => (
            <div key={testCase.name} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="bad">{testCase.name} failed</Badge>
                {testCase.basis === 'reference' && (
                  <span className="text-[11px] text-faint">
                    compared against the reference solution
                  </span>
                )}
              </div>
              {testCase.compileOutput ? (
                <OutputBox title="Compiler output" tone="bad" content={testCase.compileOutput} />
              ) : (
                <DiffView
                  rows={testCase.diff ?? []}
                  expected={testCase.expected ?? ''}
                  actual={testCase.actual}
                />
              )}
              {testCase.stderr && (
                <OutputBox title="Standard error" tone="bad" content={testCase.stderr} />
              )}
            </div>
          ))}

          {result.cases.length === 0 && result.status === 'Accepted' && (
            <OutputBox title="Standard output" content={result.stdout} />
          )}

          {result.status === 'Accepted' && result.cases.every((c) => c.passed) && (
            <div className="rounded-lg border border-ok/40 bg-ok-soft p-3">
              <p className="text-sm font-semibold text-ok">Accepted</p>
              <p className="mt-0.5 text-xs text-muted">
                Every test case produced the expected output.
              </p>
            </div>
          )}
        </section>
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
      <pre className="max-h-96 overflow-auto bg-canvas p-3 font-mono text-[13px] leading-relaxed text-ink">
        {content || <span className="text-faint">(empty)</span>}
      </pre>
    </div>
  )
}
