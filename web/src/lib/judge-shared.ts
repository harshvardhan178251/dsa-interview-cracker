/**
 * Output comparison shared by the client and the server.
 *
 * The server has the authoritative implementation in `web/server/judge.js`; this
 * is the client-side copy used to show a verdict for the Judge0 fallback.
 */

/** Normalises output for comparison: line endings, trailing whitespace, blank lines. */
export function normaliseOutput(text: string): string {
  return String(text ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
    .trim()
}

export function outputsMatch(actual: string, expected: string): boolean {
  return normaliseOutput(actual) === normaliseOutput(expected)
}
