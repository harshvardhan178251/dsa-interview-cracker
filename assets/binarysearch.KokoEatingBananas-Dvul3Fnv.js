var e=`binarysearch.KokoEatingBananas`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Koko Eating Bananas
 * LeetCode: 875 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * Koko eats bananas at a constant speed of {@code x} bananas per hour and prefers to eat as
 * many bananas as possible each hour, so she finishes a pile of {@code p} bananas in
 * {@code ceil(p / x)} hours. Given a list of piles and a limit of {@code h} hours, find the
 * minimum speed at which she can finish all the piles.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * piles[0] piles[1] ... piles[n-1]
 * h
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 1 4 1 5
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: "can Koko finish in time at speed x?" is a monotone yes/no question — a faster
 * Koko never needs more hours than a slower one. Binary search the smallest speed for which
 * the answer is yes. The search range is {@code [1, max(piles)]}.
 *
 * <p>Complexity: Time O(n log max(piles)), Space O(1).
 */
public class KokoEatingBananas {

    /**
     * Returns the minimum eating speed that lets Koko finish every pile within {@code h} hours.
     *
     * @param piles the banana counts of each pile
     * @param h     the hour budget
     * @return the smallest feasible speed
     */
    public static int minEatingSpeed(int[] piles, int h) {
        int low = 1;
        int high = 0;
        for (int pile : piles) {
            high = Math.max(high, pile);
        }
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (hoursNeeded(piles, mid) <= h) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    /** Total hours Koko needs at the given speed (ceiling division per pile). */
    private static long hoursNeeded(int[] piles, int speed) {
        long hours = 0;
        for (int pile : piles) {
            hours += ((long) pile + speed - 1) / speed;
        }
        return hours;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] piles = fs.nextIntArray(n);
        int h = fs.nextInt();

        System.out.println(minEatingSpeed(piles, h));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Koko Eating Bananas
 * LeetCode: 875 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * Koko eats bananas at a constant speed of {@code x} bananas per hour and prefers to eat as
 * many bananas as possible each hour, so she finishes a pile of {@code p} bananas in
 * {@code ceil(p / x)} hours. Given a list of piles and a limit of {@code h} hours, find the
 * minimum speed at which she can finish all the piles.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * piles[0] piles[1] ... piles[n-1]
 * h
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 1 4 1 5
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: "can Koko finish in time at speed x?" is a monotone yes/no question — a faster
 * Koko never needs more hours than a slower one. Binary search the smallest speed for which
 * the answer is yes. The search range is {@code [1, max(piles)]}.
 *
 * <p>Complexity: Time O(n log max(piles)), Space O(1).
 */
public class Main {

    /**
     * Returns the minimum eating speed that lets Koko finish every pile within {@code h} hours.
     *
     * @param piles the banana counts of each pile
     * @param h     the hour budget
     * @return the smallest feasible speed
     */
    public static int minEatingSpeed(int[] piles, int h) {
        int low = 1;
        int high = 0;
        for (int pile : piles) {
            high = Math.max(high, pile);
        }
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (hoursNeeded(piles, mid) <= h) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    /** Total hours Koko needs at the given speed (ceiling division per pile). */
    private static long hoursNeeded(int[] piles, int speed) {
        long hours = 0;
        for (int pile : piles) {
            hours += ((long) pile + speed - 1) / speed;
        }
        return hours;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] piles = fs.nextIntArray(n);
        int h = fs.nextInt();

        System.out.println(minEatingSpeed(piles, h));
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
# Koko Eating Bananas — LeetCode 875

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search on the answer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Koko eats bananas at a constant speed of \`x\` bananas per hour and prefers to eat as many
bananas as possible each hour, so she finishes a pile of \`p\` bananas in \`ceil(p / x)\` hours.

Given the pile sizes and a limit of \`h\` hours, return the **minimum** speed at which she can
finish all the piles.

- \`1 <= piles.length <= 10⁴\`
- \`1 <= piles[i] <= 10⁹\`
- \`1 <= h <= 10⁹\`

## Input Format

The program reads from standard input:

\`\`\`
n
piles[0] piles[1] ... piles[n-1]
h
\`\`\`

- \`n\` — number of piles (1 ≤ n ≤ 10⁴)
- \`piles\` — n space-separated integers, the banana count of each pile
- \`h\` — the hour budget

## Sample Input

\`\`\`
5
3 1 4 1 5
5
\`\`\`

## Expected Output

\`\`\`
5
\`\`\`

At speed \`5\` Koko needs \`1 + 1 + 1 + 1 + 1 = 5\` hours. At speed \`4\` she needs
\`1 + 1 + 1 + 1 + 2 = 6\` hours, which is too many.

## Approach — Binary search on the answer

The answer is not a position in the array, it is a **value** — the speed. That is the signal
to search for a *predicate* instead:

> \`P(x) = "Koko can finish all piles within h hours when eating at speed x"\`.

\`P\` is monotone: if speed \`x\` is fast enough, every larger speed is fast enough too. So the
set of feasible speeds is a suffix \`[x*, ∞)\` and we binary search for its first element.

**The feasibility check.** For a fixed speed \`x\`, the total time is

\`\`\`
hours(x) = Σ ceil(piles[i] / x)
\`\`\`

which we compute with integer arithmetic as \`(piles[i] + x - 1) / x\`. A \`long\` accumulator
is used because the sum can exceed \`int\` range (10⁴ piles × 10⁹ hours).

**The search range.** \`low = 1\` (you cannot eat slower than one banana per hour) and
\`high = max(piles)\` (at that speed every pile takes exactly one hour, which is the fastest
possible schedule shape).

## Dry Run

Input: \`piles = [3, 1, 4, 1, 5]\`, \`h = 5\`

| Step | low | high | mid | \`hours(mid)\` | feasible? | range after |
|---:|---:|---:|---:|---|---|---|
| 1 | 1 | 5 | 3 | \`1+1+2+1+2 = 7\` | no (7 > 5) | \`[4, 5]\` |
| 2 | 4 | 5 | 4 | \`1+1+1+1+2 = 6\` | no (6 > 5) | \`[5, 5]\` |

\`low == high == 5\` → return **5**.

### The per-pile detail — \`hours(4)\` for \`piles = [3, 1, 4, 1, 5]\`

| Pile | Bananas | \`ceil(pile / 4)\` | Running total |
|---:|---:|---:|---:|
| 0 | 3 | \`ceil(3/4) = 1\` | 1 |
| 1 | 1 | \`ceil(1/4) = 1\` | 2 |
| 2 | 4 | \`ceil(4/4) = 1\` | 3 |
| 3 | 1 | \`ceil(1/4) = 1\` | 4 |
| 4 | 5 | \`ceil(5/4) = 2\` | 6 |

\`6 > 5\` → speed \`4\` is too slow.

## Java Solution

See [\`KokoEatingBananas.java\`](./KokoEatingBananas.java).

\`\`\`java
public static int minEatingSpeed(int[] piles, int h) {
    int low = 1;
    int high = 0;
    for (int pile : piles) {
        high = Math.max(high, pile);
    }
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (hoursNeeded(piles, mid) <= h) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
}

private static long hoursNeeded(int[] piles, int speed) {
    long hours = 0;
    for (int pile : piles) {
        hours += ((long) pile + speed - 1) / speed;
    }
    return hours;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log M) | M = max(piles); each feasibility check is O(n) |
| **Space** | O(1) | No extra containers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you avoid the O(n) feasibility check?"* → precompute prefix sums of the piles and
  note that \`Σ ceil(p / x)\` can be computed with a histogram of pile sizes in
  O(max(pile)) — but only pays off when max(pile) is small.
- *"What if \`h\` is very large?"* → the answer collapses to \`1\` as soon as
  \`Σ piles <= h\`; check that first.
- *"What if piles can be split between hours?"* → the model changes (it becomes a rate
  problem), and the ceil disappears.
- *"Why not binary search on the number of hours instead?"* → the hour budget is fixed; the
  unknown is the speed.

**Common mistakes:**
- ❌ Using integer division \`pile / speed\` instead of the ceiling → under-counts the hours
  and returns a speed that is too small.
- ❌ Overflowing \`(pile + speed - 1)\` → cast to \`long\` before adding.
- ❌ Searching the range \`[0, max(piles)]\` → speed \`0\` is meaningless and causes a division
  by zero.
- ❌ Assuming the piles can be eaten in parallel → the hours **add up**, they do not max out.

**How to narrate:**
> "The unknown here is a speed, not an index, so I'll binary search over the answer. The
> predicate 'can she finish in time at speed x' is monotone, so I search the range
> \`[1, max(piles)]\`. Each check sums \`ceil(pile / x)\` — the total number of hours — and I
> keep the smallest speed whose total fits in the budget."

## Related Problems

- [Capacity To Ship Packages Within D Days](./CapacityToShipPackages.java) — the same shape, a different feasibility check
- [Split Array Largest Sum](./SplitArrayLargestSum.java) — binary search on a limit
- [Square Root of a Number](./SquareRootOfANumber.java) — the simplest binary search on an answer
`,i=[`minEatingSpeed`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};