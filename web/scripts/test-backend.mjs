#!/usr/bin/env node
/**
 * Exercises the compiler backend end to end.
 *
 *   node scripts/test-backend.mjs [baseUrl]
 *
 * Covers: health, a correct submission, a wrong submission (must be detected
 * with a diff), a compile error, a runtime error, and the differential check
 * against the reference solution on an input with no recorded expected output.
 */

const BASE = (process.argv[2] ?? 'http://localhost:4173').replace(/\/+$/, '')

const checks = []
function check(name, passed, detail = '') {
  checks.push({ name, passed, detail })
  console.log(`  ${passed ? 'ok  ' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`)
}

async function run(payload) {
  const response = await fetch(`${BASE}/api/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

const CORRECT = `
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = in.nextInt();
        int target = in.nextInt();
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < n; i++) {
            Integer j = seen.get(target - a[i]);
            if (j != null) { System.out.println(j + " " + i); return; }
            seen.put(a[i], i);
        }
        System.out.println("-1 -1");
    }
}
`

const WRONG = `
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = in.nextInt();
        System.out.println("0 0");
    }
}
`

const NO_MAIN = `
public class Main {
    public static void notMain(String[] args) {}
}
`

const CRASHES = `
public class Main {
    public static void main(String[] args) {
        throw new RuntimeException("boom");
    }
}
`

try {
  // --- health ---
  const health = await (await fetch(`${BASE}/api/health`)).json()
  check('health endpoint responds', health.ok === true, `${health.problems} problems, java: ${health.java}`)

  // --- correct submission ---
  const correct = await run({
    problemId: 'arrays.TwoSum',
    source: CORRECT,
    stdin: '4\n2 7 11 15\n9',
  })
  check('correct submission is accepted', correct.status === 'Accepted', correct.status)
  check('correct submission prints the right output', correct.stdout.trim() === '0 1', JSON.stringify(correct.stdout))
  check(
    'correct submission ran on the documented case',
    correct.cases?.some((c) => c.basis === 'expected' && c.passed === true) === true,
    `${correct.cases?.length} case(s)`,
  )

  // --- wrong submission ---
  const wrong = await run({
    problemId: 'arrays.TwoSum',
    source: WRONG,
    stdin: '4\n2 7 11 15\n9',
  })
  check('wrong submission is detected', wrong.status === 'Wrong Answer', wrong.status)
  const failing = wrong.cases?.find((c) => !c.passed)
  check('wrong submission reports the expected output', failing?.expected?.trim() === '0 1', JSON.stringify(failing?.expected))
  check('wrong submission reports the actual output', failing?.actual?.trim() === '0 0', JSON.stringify(failing?.actual))
  check(
    'wrong submission produces a line diff',
    Array.isArray(failing?.diff) && failing.diff.some((r) => r.type !== 'equal'),
    `${failing?.diff?.length} diff row(s)`,
  )

  // --- compile error ---
  const broken = await run({ source: NO_MAIN })
  check('missing main is rejected', broken.status === 'Compile Error', broken.status)
  check(
    'compile error explains the problem',
    broken.compileOutput.includes('main'),
    broken.compileOutput.slice(0, 60).replace(/\n/g, ' '),
  )

  // --- runtime error ---
  const crashed = await run({ source: CRASHES })
  check('runtime error is reported', crashed.status === 'Runtime Error', crashed.status)
  check('runtime error keeps the stack trace', crashed.cases?.[0]?.stderr?.includes('boom') === true)

  // --- differential check against the reference solution ---
  const differential = await run({
    problemId: 'arrays.TwoSum',
    source: CORRECT,
    stdin: '2\n3 4\n8',
  })
  const diffCase = differential.cases?.find((c) => c.basis === 'reference')
  check(
    'the input the user typed is checked against the reference solution',
    diffCase !== undefined,
    `cases: ${differential.cases?.map((c) => `${c.name}(${c.basis})`).join(', ')}`,
  )
  check(
    'differential check agrees with the reference',
    diffCase?.passed === true,
    `expected ${JSON.stringify(diffCase?.expected)} actual ${JSON.stringify(diffCase?.actual)}`,
  )
  check(
    'the documented case still runs alongside it',
    differential.cases?.some((c) => c.basis === 'expected') === true,
  )

  // --- a wrong answer on an input with no recorded expected output ---
  const differentialWrong = await run({
    problemId: 'arrays.TwoSum',
    source: WRONG,
    stdin: '2\n3 4\n8',
  })
  check(
    'differential check catches a wrong answer on any input',
    differentialWrong.status === 'Wrong Answer',
    differentialWrong.status,
  )

  // --- user-supplied test cases ---
  const withCase = await run({
    problemId: 'arrays.TwoSum',
    source: CORRECT,
    stdin: '4\n2 7 11 15\n9',
    cases: [{ name: 'mine', stdin: '2\n5 5\n10', expected: '0 1' }],
  })
  check(
    'user test cases are run',
    withCase.cases?.some((c) => c.name === 'mine' && c.passed === true) === true,
    `${withCase.cases?.length} case(s)`,
  )
} catch (error) {
  check('backend reachable', false, error.message)
}

const failed = checks.filter((c) => !c.passed)
console.log(`\n[test-backend] ${checks.length - failed.length}/${checks.length} checks passed against ${BASE}`)
if (failed.length) {
  console.log('Failed:')
  for (const f of failed) console.log(`  - ${f.name}${f.detail ? ` (${f.detail})` : ''}`)
  process.exit(1)
}
