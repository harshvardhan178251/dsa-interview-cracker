var e=`binarysearch.AllocateMinimumNumberOfPainters`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Allocate Minimum Number of Painters
 * LeetCode: null (classic "painter's partition" problem) | Difficulty: Hard | Frequency: 3/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * There are {@code n} boards of lengths {@code boards[0..n-1]} and {@code k} painters. Each
 * painter paints one continuous run of boards and takes exactly as much time as the total
 * length of the boards assigned to them. All painters work in parallel, so the total time is
 * the largest workload of any single painter. Return the minimum possible time.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * boards[0] boards[1] ... boards[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 10 10 10 10
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 20
 * </pre>
 *
 * <p>Approach: binary search the maximum workload a single painter may be given. The lower
 * bound is the longest board (it cannot be split) and the upper bound is the sum of all
 * lengths (one painter does everything). The greedy feasibility check packs as many boards as
 * possible into the current painter's run; the number of painters needed is monotone in the
 * limit, so binary search finds the smallest limit that needs at most {@code k} painters.
 *
 * <p>Complexity: Time O(n log(sum(boards))), Space O(1).
 */
public class AllocateMinimumNumberOfPainters {

    /**
     * Returns the minimum time needed for {@code painters} painters to paint every board.
     *
     * @param boards   the board lengths, in painting order
     * @param painters the number of painters available
     * @return the minimum possible makespan
     */
    public static int minTimeToPaint(int[] boards, int painters) {
        long low = 0;
        long high = 0;
        for (int board : boards) {
            low = Math.max(low, board);
            high += board;
        }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (paintersNeeded(boards, mid) <= painters) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return (int) low;
    }

    /** Painters required when no single painter may exceed {@code limit} work. */
    private static int paintersNeeded(int[] boards, long limit) {
        int painters = 1;
        long load = 0;
        for (int board : boards) {
            if (load + board > limit) {
                painters++;
                load = 0;
            }
            load += board;
        }
        return painters;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] boards = fs.nextIntArray(n);
        int painters = fs.nextInt();

        System.out.println(minTimeToPaint(boards, painters));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Allocate Minimum Number of Painters
 * LeetCode: null (classic "painter's partition" problem) | Difficulty: Hard | Frequency: 3/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * There are {@code n} boards of lengths {@code boards[0..n-1]} and {@code k} painters. Each
 * painter paints one continuous run of boards and takes exactly as much time as the total
 * length of the boards assigned to them. All painters work in parallel, so the total time is
 * the largest workload of any single painter. Return the minimum possible time.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * boards[0] boards[1] ... boards[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 10 10 10 10
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 20
 * </pre>
 *
 * <p>Approach: binary search the maximum workload a single painter may be given. The lower
 * bound is the longest board (it cannot be split) and the upper bound is the sum of all
 * lengths (one painter does everything). The greedy feasibility check packs as many boards as
 * possible into the current painter's run; the number of painters needed is monotone in the
 * limit, so binary search finds the smallest limit that needs at most {@code k} painters.
 *
 * <p>Complexity: Time O(n log(sum(boards))), Space O(1).
 */
public class Main {

    /**
     * Returns the minimum time needed for {@code painters} painters to paint every board.
     *
     * @param boards   the board lengths, in painting order
     * @param painters the number of painters available
     * @return the minimum possible makespan
     */
    public static int minTimeToPaint(int[] boards, int painters) {
        long low = 0;
        long high = 0;
        for (int board : boards) {
            low = Math.max(low, board);
            high += board;
        }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (paintersNeeded(boards, mid) <= painters) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return (int) low;
    }

    /** Painters required when no single painter may exceed {@code limit} work. */
    private static int paintersNeeded(int[] boards, long limit) {
        int painters = 1;
        long load = 0;
        for (int board : boards) {
            if (load + board > limit) {
                painters++;
                load = 0;
            }
            load += board;
        }
        return painters;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] boards = fs.nextIntArray(n);
        int painters = fs.nextInt();

        System.out.println(minTimeToPaint(boards, painters));
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
# Allocate Minimum Number of Painters — classic painter's-partition problem

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Binary search on the answer · Greedy · Partition |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Adobe, Flipkart |

## Problem Statement

There are \`n\` boards with lengths \`boards[0..n-1]\` and \`k\` painters. Each painter paints one
**continuous run** of boards and takes exactly as much time as the total length of the boards
assigned to them. All painters work **in parallel**, so the total time is the **largest**
workload of any single painter.

Return the minimum possible total time.

- \`1 <= n <= 10⁵\`, \`1 <= boards[i] <= 10⁵\`
- \`1 <= k <= n\`
- A painter may take no boards at all (if there are more painters than boards the answer is
  the longest board).

## Input Format

The program reads from standard input:

\`\`\`
n
boards[0] boards[1] ... boards[n-1]
k
\`\`\`

- \`n\` — number of boards (1 ≤ n ≤ 10⁵)
- \`boards\` — n space-separated board lengths, in painting order
- \`k\` — the number of painters

## Sample Input

\`\`\`
4
10 10 10 10
2
\`\`\`

## Expected Output

\`\`\`
20
\`\`\`

Each painter takes two boards: \`10 + 10 = 20\`. With a limit of 19 each painter could take
only one board, so four painters would be needed — more than the two available.

## Approach — Binary search on the maximum workload

The unknown is the **maximum work** a single painter may be given. Search a monotone
predicate:

> \`P(L) = "all boards can be painted by at most k painters if no painter exceeds L"\`.

\`P\` is monotone: if \`L\` is enough, every larger limit is enough too. The feasible limits
form a suffix \`[L*, ∞)\`; we want the first element.

**The feasibility check is greedy.** Walk the boards in order, giving each painter as many
consecutive boards as fit under \`L\`, then start a new painter. This greedy split uses the
**minimum** number of painters for a given limit — closing a painter's run earlier only
creates more painters. If the greedy split needs more than \`k\` painters, the limit is too
small.

**The search range.** \`low = max(boards)\` (a board cannot be split between painters) and
\`high = sum(boards)\` (one painter takes everything).

**Why this is "Hard".** The greedy split is easy; the insight that the *limit* is the
monotone quantity — and that the answer is the **smallest** feasible limit — is what makes
it hard. Many candidates binary search on "how many painters" instead, which is not the
monotone direction.

## Dry Run

Input: \`boards = [10, 10, 10, 10]\`, \`k = 2\`

| Step | low | high | mid | greedy split for \`mid\` | painters needed | feasible? | range after |
|---:|---:|---:|---:|---|---:|---|---|
| 1 | 10 | 40 | 25 | \`[10,10]\` \`[10,10]\` | 2 | yes | \`[10, 25]\` |
| 2 | 10 | 25 | 17 | \`[10]\` \`[10]\` \`[10]\` \`[10]\` | 4 | no | \`[18, 25]\` |
| 3 | 18 | 25 | 21 | \`[10,10]\` \`[10,10]\` | 2 | yes | \`[18, 21]\` |
| 4 | 18 | 21 | 19 | \`[10]\` \`[10]\` \`[10]\` \`[10]\` | 4 | no | \`[20, 21]\` |

\`low == high == 20\` → return **20**.

### The greedy split in detail — limit \`L = 19\` on \`[10, 10, 10, 10]\`

| Painter | Boards taken | Load | Decision |
|---:|---|---:|---|
| 1 | 10 | 10 | next board would make \`10 + 10 = 20 > 19\` → new painter |
| 2 | 10 | 10 | \`20 > 19\` → new painter |
| 3 | 10 | 10 | \`20 > 19\` → new painter |
| 4 | 10 | 10 | done — **4 painters needed** > 2 → infeasible |

With \`L = 20\`: painter 1 takes \`[10, 10]\` (load 20), painter 2 takes \`[10, 10]\` (load 20) —
exactly 2 painters.

## Java Solution

See [\`AllocateMinimumNumberOfPainters.java\`](./AllocateMinimumNumberOfPainters.java).

\`\`\`java
public static int minTimeToPaint(int[] boards, int painters) {
    long low = 0;
    long high = 0;
    for (int board : boards) {
        low = Math.max(low, board);
        high += board;
    }
    while (low < high) {
        long mid = low + (high - low) / 2;
        if (paintersNeeded(boards, mid) <= painters) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return (int) low;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log S) | S = sum(boards); one O(n) check per binary-search step |
| **Space** | O(1) | No extra containers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you return the actual assignment of boards to painters?"* → yes, record the split
  boundaries during the successful check.
- *"What if the boards can be reordered?"* → the answer becomes
  \`max(max(boards), ceil(sum / k))\`; no search needed.
- *"What if a painter may skip boards (paint non-contiguous runs)?"* → the greedy
  justification changes; the binary search on the limit still works but the check becomes a
  bin-packing feasibility test (NP-hard in general).
- *"How would you prove the greedy check is optimal?"* → exchange argument: in any feasible
  split the first painter can be given at least as many boards as the greedy gives them
  without exceeding the limit, so the greedy never needs more painters.

**Common mistakes:**
- ❌ Binary searching on the number of painters instead of on the limit → the wrong monotone
  direction.
- ❌ Setting \`low = 0\` → a limit of 0 cannot hold any board.
- ❌ Returning the *number of painters* instead of the *limit* → the question asks for the
  time.
- ❌ Forgetting that the makespan is the **max** over painters, not the sum.

**How to narrate:**
> "The unknown is how much work one painter may be given. I binary search that limit: 'can
> k painters finish if nobody exceeds L?' The check is greedy — give each painter as many
> consecutive boards as fit — and because the answer is the *smallest* feasible limit, I
> keep the lower half whenever the check succeeds."

## Related Problems

- [Capacity To Ship Packages Within D Days](./CapacityToShipPackages.java) — the same shape with ships and days
- [Split Array Largest Sum](./SplitArrayLargestSum.java) — the same shape with groups
- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on a rate
`,i=[`minTimeToPaint`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};