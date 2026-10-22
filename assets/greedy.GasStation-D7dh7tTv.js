var e=`greedy.GasStation`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

/**
 * Problem: Gas Station
 * LeetCode: 134 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Prefix-sum reset
 *
 * <p>Problem:
 * There are {@code n} gas stations in a circle. Station {@code i} has
 * {@code gas[i]} units of fuel and the trip from station {@code i} to station
 * {@code i+1} costs {@code cost[i]}. Starting with an empty tank, return the index of
 * the station from which the circuit can be completed, or {@code -1} when it is
 * impossible.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * gas[0] gas[1] ... gas[n-1]
 * cost[0] cost[1] ... cost[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 3 4 5 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: keep the running tank of the current candidate start. Whenever the tank
 * goes negative the candidate start is impossible, so restart from the next station.
 * If the total of {@code gas - cost} is negative no circuit exists at all.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class GasStation {

    /**
     * Returns the index of a station from which the whole circuit can be driven.
     *
     * @param gas  fuel available at each station
     * @param cost fuel needed to drive from each station to the next
     * @return a valid starting index, or {@code -1} when the circuit is impossible
     */
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        if (gas == null || cost == null || gas.length == 0 || gas.length != cost.length) {
            return -1;
        }
        int total = 0;   // fuel left over after a full lap
        int tank = 0;    // fuel left over since the current candidate start
        int start = 0;
        for (int i = 0; i < gas.length; i++) {
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;
            if (tank < 0) {
                start = i + 1;   // station i cannot be the start, try the next one
                tank = 0;
            }
        }
        return total >= 0 ? start % gas.length : -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] gas = fs.nextIntArray(n);
        int[] cost = fs.nextIntArray(n);

        System.out.println(canCompleteCircuit(gas, cost));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Gas Station
 * LeetCode: 134 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Prefix-sum reset
 *
 * <p>Problem:
 * There are {@code n} gas stations in a circle. Station {@code i} has
 * {@code gas[i]} units of fuel and the trip from station {@code i} to station
 * {@code i+1} costs {@code cost[i]}. Starting with an empty tank, return the index of
 * the station from which the circuit can be completed, or {@code -1} when it is
 * impossible.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * gas[0] gas[1] ... gas[n-1]
 * cost[0] cost[1] ... cost[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 3 4 5 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: keep the running tank of the current candidate start. Whenever the tank
 * goes negative the candidate start is impossible, so restart from the next station.
 * If the total of {@code gas - cost} is negative no circuit exists at all.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the index of a station from which the whole circuit can be driven.
     *
     * @param gas  fuel available at each station
     * @param cost fuel needed to drive from each station to the next
     * @return a valid starting index, or {@code -1} when the circuit is impossible
     */
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        if (gas == null || cost == null || gas.length == 0 || gas.length != cost.length) {
            return -1;
        }
        int total = 0;   // fuel left over after a full lap
        int tank = 0;    // fuel left over since the current candidate start
        int start = 0;
        for (int i = 0; i < gas.length; i++) {
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;
            if (tank < 0) {
                start = i + 1;   // station i cannot be the start, try the next one
                tank = 0;
            }
        }
        return total >= 0 ? start % gas.length : -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] gas = fs.nextIntArray(n);
        int[] cost = fs.nextIntArray(n);

        System.out.println(canCompleteCircuit(gas, cost));
    }
}

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r=`
# Gas Station — LeetCode 134

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Prefix-sum reset |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

There are \`n\` gas stations arranged in a circle. Station \`i\` holds \`gas[i]\` units of
fuel; driving from station \`i\` to station \`i+1\` costs \`cost[i]\` units. You start with
an empty tank at some station and must complete the whole circle.

Return the **index of a station** from which the circuit can be completed, or \`-1\` when
it is impossible. If several stations work, any of them is accepted.

## Input Format

The program reads from standard input:

\`\`\`
n
gas[0] gas[1] ... gas[n-1]
cost[0] cost[1] ... cost[n-1]
\`\`\`

- \`n\` — number of stations (1 ≤ n ≤ 10⁵)
- \`gas\` — n space-separated non-negative integers
- \`cost\` — n space-separated non-negative integers

## Sample Input

\`\`\`
5
1 2 3 4 5
3 4 5 1 2
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

From station 3 the tank never goes negative: \`4-1=3\`, \`+5-2=6\`, \`+1-3=4\`, \`+2-4=2\`,
\`+3-5=0\`.

## Approach — reset the candidate start

Two numbers do all the work:

- \`total\` — \`gas - cost\` summed over **all** stations. If \`total < 0\` the whole circle
  consumes more fuel than it provides, so no start works → \`-1\`.
- \`tank\` — \`gas - cost\` summed from the **current candidate start** up to the station
  we are looking at.

Walk the stations in order. Whenever \`tank\` drops below zero, the current candidate
start is dead — the car ran dry *before* reaching the next station — so move the
candidate to the next station and reset \`tank\` to 0.

**Exchange argument (why skipping to the next station is safe):** suppose the candidate
start is \`s\` and the tank first goes negative at station \`k\`. Then the sum of
\`gas - cost\` over \`[s .. k]\` is negative. Any start \`s' ∈ (s, k]\` is worse: the sum
over \`[s' .. k]\` is *even smaller* (we removed a prefix whose sum is at least as large
as the whole negative sum), so the car also runs dry at or before \`k\` when starting
from \`s'\`. Therefore every station between \`s\` and \`k\` can be discarded, and the search
may continue at \`k + 1\`. No valid start is ever skipped.

Together with \`total >= 0\` (which guarantees that *some* start works) the final
candidate is the answer.

## Dry Run

Input: \`gas = [1, 2, 3, 4, 5]\`, \`cost = [3, 4, 5, 1, 2]\`

| Step | i | gas[i] | cost[i] | diff | \`total\` after | \`tank\` before | \`tank\` after | \`start\` after | Note |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 3 | -2 | -2 | 0 | -2 | 1 | tank negative → restart at 1 |
| 2 | 1 | 2 | 4 | -2 | -4 | 0 | -2 | 2 | tank negative → restart at 2 |
| 3 | 2 | 3 | 5 | -2 | -6 | 0 | -2 | 3 | tank negative → restart at 3 |
| 4 | 3 | 4 | 1 | 3 | -3 | 0 | 3 | 3 | tank positive, keep candidate |
| 5 | 4 | 5 | 2 | 3 | 0 | 3 | 6 | 3 | tank positive, keep candidate |

\`total = 0 ≥ 0\` → the circuit is possible and the answer is \`start = 3\`.

## Java Solution

See [\`GasStation.java\`](./GasStation.java).

\`\`\`java
public static int canCompleteCircuit(int[] gas, int[] cost) {
    if (gas == null || cost == null || gas.length == 0 || gas.length != cost.length) {
        return -1;
    }
    int total = 0;
    int tank = 0;
    int start = 0;
    for (int i = 0; i < gas.length; i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start % gas.length : -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | a single pass over the stations |
| **Space** | O(1) | three counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the stations are not given in a circle but on a line?"* → the same reset
  logic works, but you must also check that the total fuel covers the total distance.
- *"Return **all** valid starting stations."* → after finding one candidate, scan again
  from it and collect every index whose running tank never dips below zero.
- *"What if a station can hold only a limited amount of fuel?"* → the greedy reset no
  longer holds; it becomes a flow problem.

**Common mistakes:**
- ❌ Forgetting the \`total\` check — a candidate start can survive the scan even when
  the whole circle is impossible.
- ❌ Resetting \`tank\` but not \`total\` (or vice versa) — they track different ranges.
- ❌ Assuming the answer is unique — with \`total >= 0\` there can be several valid
  starts; any of them is accepted.

**How to narrate:**
> "Two running sums do the work. \`total\` tells me whether the circle is possible at
> all. \`tank\` tracks the fuel since my current candidate start; when it goes negative
> I know that start — and every start before the failure point — is dead, so I jump to
> the next station. That never skips a valid answer, because any start inside the
> failing segment has an even smaller amount of fuel."

## Related Problems

- [Jump Game](./JumpGame.md) — the same "extend or give up" greedy shape
- [Partition Array Into Maximum Subarrays](./PartitionArrayToMaximumSum.md) — greedy with a heap
`,i=[`canCompleteCircuit`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};