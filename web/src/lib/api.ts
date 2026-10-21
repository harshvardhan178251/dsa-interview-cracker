/**
 * Client for the site's own compiler backend.
 *
 * The backend (`web/server`) compiles the submission with the local JDK, runs it
 * against the input, and reports a verdict — including a line-by-line diff when
 * the answer is wrong.
 *
 * When the backend is not available (a purely static deployment), the site falls
 * back to the public Judge0 API. `backendAvailable()` decides which.
 */

import { outputsMatch } from './judge-shared'

export type Verdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compile Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Error'

export interface DiffRow {
  type: 'equal' | 'diff' | 'missing' | 'extra'
  expected: string | null
  actual: string | null
  line: number
}

export interface TestCaseResult {
  name: string
  stdin: string
  passed: boolean
  expected: string | null
  actual: string
  status: Verdict
  basis: 'expected' | 'reference' | 'none'
  stderr: string
  compileOutput: string
  diff: DiffRow[] | null
}

export interface RunResponse {
  status: Verdict
  stdout: string
  stderr: string
  compileOutput: string
  durationMs: number
  cases: TestCaseResult[]
  /** Which engine produced the verdict. */
  ranOn: 'local' | 'judge0'
}

export interface TestCase {
  name: string
  stdin: string
  expected: string | null
}

let backendChecked: boolean | null = null

/** Probes the backend once per session. */
export async function backendAvailable(): Promise<boolean> {
  if (backendChecked !== null) return backendChecked
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 2500)
    const response = await fetch('/api/health', { signal: controller.signal })
    clearTimeout(timer)
    backendChecked = response.ok
  } catch {
    backendChecked = false
  }
  return backendChecked
}

/** Forgets the cached probe — used by the "retry with the local compiler" button. */
export function resetBackendProbe() {
  backendChecked = null
}

/**
 * Runs a submission.
 *
 * @param options.source     the Java code to run
 * @param options.stdin      the input for an ad-hoc run
 * @param options.problemId  the problem, used to look up its test cases and the reference solution
 * @param options.cases      extra test cases the user added
 */
export async function runSubmission(options: {
  source: string
  stdin?: string
  problemId?: string | null
  cases?: TestCase[]
}): Promise<RunResponse> {
  if (await backendAvailable()) {
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: options.source,
          stdin: options.stdin ?? '',
          problemId: options.problemId ?? null,
          cases: options.cases ?? [],
        }),
      })
      if (response.ok) {
        const payload = (await response.json()) as RunResponse
        return { ...payload, ranOn: 'local' }
      }
    } catch {
      // Fall through to Judge0.
    }
  }

  return runOnJudge0(options)
}

/* -------------------------------------------------------------------------- */
/* Judge0 fallback                                                             */
/* -------------------------------------------------------------------------- */

const JUDGE0_BASE = 'https://ce.judge0.com'
const JAVA_LANGUAGE_ID = 62

function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function fromBase64(value: string): string {
  if (!value) return ''
  try {
    const binary = atob(value)
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return value
  }
}

async function runOnJudge0(options: {
  source: string
  stdin?: string
  problemId?: string | null
  cases?: TestCase[]
}): Promise<RunResponse> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30_000)

  try {
    const response = await fetch(
      `${JUDGE0_BASE}/submissions?base64_encoded=true&wait=true&fields=stdout,stderr,compile_output,message,status,time,memory`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          source_code: toBase64(options.source),
          language_id: JAVA_LANGUAGE_ID,
          stdin: toBase64(options.stdin ?? ''),
          cpu_time_limit: 3,
          wall_time_limit: 5,
          memory_limit: 128000,
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Judge0 responded with ${response.status}.`)
    }

    const payload = (await response.json()) as Record<string, unknown>
    const statusId = (payload.status as { id?: number } | undefined)?.id ?? 13
    const stdout = fromBase64(String(payload.stdout ?? ''))
    const stderr = fromBase64(String(payload.stderr ?? ''))
    const compileOutput = fromBase64(String(payload.compile_output ?? ''))

    const status: Verdict =
      statusId === 3 ? 'Accepted'
        : statusId === 4 ? 'Wrong Answer'
          : statusId === 5 ? 'Time Limit Exceeded'
            : statusId === 6 ? 'Compile Error'
              : statusId >= 7 && statusId <= 12 ? 'Runtime Error'
                : 'Error'

    return {
      status,
      stdout,
      stderr,
      compileOutput,
      durationMs: payload.time ? Math.round(Number(payload.time) * 1000) : 0,
      ranOn: 'judge0',
      cases: [
        {
          name: 'your input',
          stdin: options.stdin ?? '',
          passed: status === 'Accepted',
          expected: null,
          actual: stdout,
          status,
          basis: 'none',
          stderr,
          compileOutput,
          diff: null,
        },
      ],
    }
  } catch (error) {
    return {
      status: 'Error',
      stdout: '',
      stderr: '',
      compileOutput:
        'Could not reach the compiler backend or Judge0. Check your connection and try again.',
      durationMs: 0,
      ranOn: 'judge0',
      cases: [],
    }
  } finally {
    clearTimeout(timer)
  }
}

export { outputsMatch }
