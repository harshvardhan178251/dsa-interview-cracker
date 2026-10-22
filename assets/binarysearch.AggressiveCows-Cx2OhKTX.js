var e=`binarysearch.AggressiveCows`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Aggressive Cows
 * LeetCode: null (classic "maximum aggression" problem) | Difficulty: Medium | Frequency: 3/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * There are {@code c} cows and {@code s} stalls along a single line. The stalls are given by
 * their positions on that line. Place the cows so that the minimum distance between any two
 * cows is as large as possible, and return that distance.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * stalls[0] stalls[1] ... stalls[n-1]
 * c
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 4 8 9
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: "can we place {@code c} cows with at least {@code d} distance between them?" is
 * a monotone question — if a distance {@code d} works, every smaller distance works too.
 * Greedily place each cow as far left as possible and binary search for the largest
 * feasible distance.
 *
 * <p>Complexity: Time O(n log(span)), Space O(n) for the sorted copy of the stalls.
 */
public class AggressiveCows {

    /**
     * Returns the largest minimum distance that still allows all cows to be placed.
     *
     * @param stalls positions of the stalls (order does not matter)
     * @param cows   number of cows to place
     * @return the maximum achievable minimum distance
     */
    public static int maxMinimumDistance(int[] stalls, int cows) {
        if (cows <= 1 || stalls.length < 2) {
            return 0;
        }
        int[] sorted = stalls.clone();
        Arrays.sort(sorted);

        int low = 0;
        int high = sorted[sorted.length - 1] - sorted[0];
        while (low < high) {
            // Round the midpoint up so the loop always makes progress.
            int mid = low + (high - low + 1) / 2;
            if (canPlace(sorted, cows, mid)) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }

    /** Greedy feasibility check: place each cow at the first stall far enough from the last one. */
    private static boolean canPlace(int[] sorted, int cows, int distance) {
        int placed = 1;
        int lastPosition = sorted[0];
        for (int i = 1; i < sorted.length; i++) {
            if (sorted[i] - lastPosition >= distance) {
                placed++;
                lastPosition = sorted[i];
                if (placed >= cows) {
                    return true;
                }
            }
        }
        return placed >= cows;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] stalls = fs.nextIntArray(n);
        int cows = fs.nextInt();

        System.out.println(maxMinimumDistance(stalls, cows));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Aggressive Cows
 * LeetCode: null (classic "maximum aggression" problem) | Difficulty: Medium | Frequency: 3/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * There are {@code c} cows and {@code s} stalls along a single line. The stalls are given by
 * their positions on that line. Place the cows so that the minimum distance between any two
 * cows is as large as possible, and return that distance.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * stalls[0] stalls[1] ... stalls[n-1]
 * c
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 4 8 9
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: "can we place {@code c} cows with at least {@code d} distance between them?" is
 * a monotone question — if a distance {@code d} works, every smaller distance works too.
 * Greedily place each cow as far left as possible and binary search for the largest
 * feasible distance.
 *
 * <p>Complexity: Time O(n log(span)), Space O(n) for the sorted copy of the stalls.
 */
public class Main {

    /**
     * Returns the largest minimum distance that still allows all cows to be placed.
     *
     * @param stalls positions of the stalls (order does not matter)
     * @param cows   number of cows to place
     * @return the maximum achievable minimum distance
     */
    public static int maxMinimumDistance(int[] stalls, int cows) {
        if (cows <= 1 || stalls.length < 2) {
            return 0;
        }
        int[] sorted = stalls.clone();
        Arrays.sort(sorted);

        int low = 0;
        int high = sorted[sorted.length - 1] - sorted[0];
        while (low < high) {
            // Round the midpoint up so the loop always makes progress.
            int mid = low + (high - low + 1) / 2;
            if (canPlace(sorted, cows, mid)) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }

    /** Greedy feasibility check: place each cow at the first stall far enough from the last one. */
    private static boolean canPlace(int[] sorted, int cows, int distance) {
        int placed = 1;
        int lastPosition = sorted[0];
        for (int i = 1; i < sorted.length; i++) {
            if (sorted[i] - lastPosition >= distance) {
                placed++;
                lastPosition = sorted[i];
                if (placed >= cows) {
                    return true;
                }
            }
        }
        return placed >= cows;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] stalls = fs.nextIntArray(n);
        int cows = fs.nextInt();

        System.out.println(maxMinimumDistance(stalls, cows));
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
# Aggressive Cows — classic maximum-aggression problem

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search on the answer · Greedy |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Adobe |

## Problem Statement

There are \`c\` cows and \`s\` stalls along a single line. The stalls are identified by their
positions on that line. Place the cows so that the **minimum** distance between any two cows
is as large as possible, and return that distance.

- \`1 <= c <= s\`
- Stall positions are distinct and lie in \`[0, 10⁹]\`.
- The stalls do not need to be given in sorted order — the solution sorts them first.

## Input Format

The program reads from standard input:

\`\`\`
n
stalls[0] stalls[1] ... stalls[n-1]
c
\`\`\`

- \`n\` — number of stalls (1 ≤ n ≤ 10⁵)
- \`stalls\` — n space-separated integers, the stall positions (any order)
- \`c\` — the number of cows to place (1 ≤ c ≤ n)

## Sample Input

\`\`\`
5
1 2 4 8 9
3
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

The cows can be placed at stalls \`1, 4, 8\` (distances 3 and 4) so the minimum distance is 3.
A minimum distance of 4 is impossible: the only stall at least 4 away from stall \`1\` is \`8\`,
and no third stall is 4 away from \`8\`.

## Approach — Binary search on the distance

The unknown is a **distance**, not an index, so we search a predicate:

> \`P(d) = "all c cows can be placed with every pair at least d apart"\`.

\`P\` is monotone: if distance \`d\` works, every smaller distance works too (the same
placement is still legal). So the feasible distances form a prefix \`[0, d*]\` and we binary
search for the largest one.

**The feasibility check is greedy.** Sort the stalls, put the first cow in the leftmost
stall, and then repeatedly place the next cow in the *first* stall that is at least \`d\`
away from the previous cow. Placing a cow as far left as possible can only leave more room
for the cows that follow, so this greedy strategy places the maximum possible number of
cows — if it cannot place \`c\` cows, no placement can.

**Search range.** \`low = 0\` (always feasible) and \`high = max(stall) - min(stall)\` (the
largest distance that physically exists).

**Rounding the midpoint up.** The loop uses \`mid = low + (high - low + 1) / 2\` so that
\`mid > low\` whenever \`low < high\`. With a rounded-down midpoint the loop can stall on
\`low == high - 1\`.

## Dry Run

Input: \`stalls = [1, 2, 4, 8, 9]\` (already sorted), \`c = 3\`

| Step | low | high | mid | greedy placement for \`mid\` | cows placed | feasible? | range after |
|---:|---:|---:|---:|---|---:|---|---|
| 1 | 0 | 8 | 4 | 1 → 8 → (none ≥ 12) | 2 | no | \`[0, 3]\` |
| 2 | 0 | 3 | 2 | 1 → 4 → 8 | 3 | **yes** | \`[2, 3]\` |
| 3 | 2 | 3 | 3 | 1 → 4 → 8 | 3 | **yes** | \`[3, 3]\` |

\`low == high == 3\` → return **3**.

### The greedy placement in detail — \`d = 3\` on \`[1, 2, 4, 8, 9]\`

| Cow | Last cow at | Candidate stall | Distance | Accepted? |
|---:|---:|---:|---:|---|
| 1 | — | 1 | — | yes (leftmost stall) |
| 2 | 1 | 2 | 1 | no — \`1 < 3\` |
| 2 | 1 | 4 | 3 | **yes** |
| 3 | 4 | 8 | 4 | **yes** — three cows placed |

## Java Solution

See [\`AggressiveCows.java\`](./AggressiveCows.java).

\`\`\`java
public static int maxMinimumDistance(int[] stalls, int cows) {
    if (cows <= 1 || stalls.length < 2) {
        return 0;
    }
    int[] sorted = stalls.clone();
    Arrays.sort(sorted);

    int low = 0;
    int high = sorted[sorted.length - 1] - sorted[0];
    while (low < high) {
        int mid = low + (high - low + 1) / 2;
        if (canPlace(sorted, cows, mid)) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }
    return low;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n + n log S) | Sorting, then one O(n) check per binary-search step (S = span) |
| **Space** | O(n) | A sorted copy of the stalls |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the cows must be placed on specific stalls?"* → then it is a different problem
  (max-min over subsets); clarify the constraints before coding.
- *"Can you do it without sorting?"* → no, the greedy argument needs the order.
- *"How would you scale this to 10⁹ stalls?"* → the positions fit in an array; if they were
  a stream, use an order-statistics structure or bucket the positions.
- *"Why is the greedy check optimal?"* → exchange argument: moving a cow left can only
  increase the room available for the remaining cows.

**Common mistakes:**
- ❌ Rounding the midpoint **down** → infinite loop when \`high == low + 1\`.
- ❌ Placing a cow at the *rightmost* possible stall → leaves no room for the next cow.
- ❌ Forgetting to sort the stalls → the greedy check silently produces wrong answers.
- ❌ Using \`int\` for the positions when they can reach 10⁹ and the span can overflow
  \`int\` arithmetic in \`mid\` computations → use \`long\` for spans.

**How to narrate:**
> "The answer is a distance, so I'll binary search the predicate 'can I place all the cows
> with minimum distance d'. It's monotone, so a binary search is valid. The check itself is
> greedy: sort the stalls and always place the next cow in the leftmost stall that is far
> enough away, because placing it further right could only hurt the cows after it."

## Related Problems

- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on an answer with a different check
- [Capacity To Ship Packages Within D Days](./CapacityToShipPackages.java) — greedy feasibility + binary search
- [Allocate Minimum Number of Painters](./AllocateMinimumNumberOfPainters.java) — the same shape again
`,i=[`maxMinimumDistance`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};