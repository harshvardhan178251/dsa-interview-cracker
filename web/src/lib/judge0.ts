/**
 * Minimal client for the public Judge0 CE API.
 *
 * Judge0 compiles a single file (`Main.java`) in the default package and runs
 * `java Main`. The generator therefore ships a self-contained `judgeSource` for
 * every problem — see `web/scripts/generate-data.mjs`.
 */

export const DEFAULT_JUDGE0_BASE = 'https://ce.judge0.com'

/** Judge0 language id for Java (OpenJDK 13.0.1). */
export const JAVA_LANGUAGE_ID = 62

export type RunStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compile Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'
  | 'In Queue'
  | 'Processing'
  | 'Error'

export interface RunResult {
  status: RunStatus
  stdout: string
  stderr: string
  compileOutput: string
  message: string
  time: string | null
  memoryKb: number | null
}

export interface RunOptions {
  baseUrl?: string
  stdin?: string
  timeoutMs?: number
}

export class Judge0Error extends Error {
  readonly hint?: string

  constructor(message: string, hint?: string) {
    super(message)
    this.name = 'Judge0Error'
    this.hint = hint
  }
}

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

const STATUS_BY_ID: Record<number, RunStatus> = {
  1: 'In Queue',
  2: 'Processing',
  3: 'Accepted',
  4: 'Wrong Answer',
  5: 'Time Limit Exceeded',
  6: 'Compile Error',
  7: 'Runtime Error',
  8: 'Runtime Error',
  9: 'Runtime Error',
  10: 'Runtime Error',
  11: 'Runtime Error',
  12: 'Runtime Error',
  13: 'Error',
  14: 'Error',
}

/**
 * Compiles and runs a Java source file on Judge0 and returns the outcome.
 *
 * @throws {Judge0Error} when the service is unreachable, rate-limits, or the
 *         request times out.
 */
export async function runJava(source: string, options: RunOptions = {}): Promise<RunResult> {
  const base = (options.baseUrl || DEFAULT_JUDGE0_BASE).replace(/\/+$/, '')
  const stdin = options.stdin ?? ''
  const timeoutMs = options.timeoutMs ?? 30_000

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  let payload: Record<string, unknown>
  try {
    const response = await fetch(
      `${base}/submissions?base64_encoded=true&wait=true&fields=stdout,stderr,compile_output,message,status,time,memory,exit_code`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          source_code: toBase64(source),
          language_id: JAVA_LANGUAGE_ID,
          stdin: toBase64(stdin),
          cpu_time_limit: 3,
          wall_time_limit: 5,
          memory_limit: 128000,
        }),
      },
    )

    if (response.status === 429) {
      throw new Judge0Error(
        'The public Judge0 instance is rate limiting requests.',
        'Wait a few seconds and try again, or point the runner at your own Judge0 deployment.',
      )
    }

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      throw new Judge0Error(
        `Judge0 responded with ${response.status}.`,
        detail.slice(0, 400) || undefined,
      )
    }

    payload = (await response.json()) as Record<string, unknown>
  } catch (error) {
    if (error instanceof Judge0Error) throw error
    if ((error as Error).name === 'AbortError') {
      throw new Judge0Error(
        'The run timed out.',
        'The public Judge0 instance may be busy. Try again in a moment.',
      )
    }
    throw new Judge0Error(
      'Could not reach the Judge0 API.',
      'Check your network connection — the runner needs internet access. You can also copy the code and run it locally.',
    )
  } finally {
    clearTimeout(timer)
  }

  return normalise(payload)
}

function normalise(payload: Record<string, unknown>): RunResult {
  const statusObj = payload.status as { id?: number; description?: string } | undefined
  const description = statusObj?.description ?? 'Error'
  const mapped = STATUS_BY_ID[statusObj?.id ?? 13] ?? 'Error'

  return {
    status: description === 'Accepted' ? 'Accepted' : mapped,
    stdout: fromBase64(String(payload.stdout ?? '')),
    stderr: fromBase64(String(payload.stderr ?? '')),
    compileOutput: fromBase64(String(payload.compile_output ?? '')),
    message: String(payload.message ?? ''),
    time: payload.time != null ? String(payload.time) : null,
    memoryKb: payload.memory != null ? Number(payload.memory) : null,
  }
}

/** Compares actual program output with the expected sample output. */
export function outputsMatch(actual: string, expected: string): boolean {
  const normalise = (s: string) => s.replace(/\r\n/g, '\n').trim()
  return normalise(actual) === normalise(expected)
}
