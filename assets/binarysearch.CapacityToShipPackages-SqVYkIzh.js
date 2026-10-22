var e=`binarysearch.CapacityToShipPackages`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Capacity To Ship Packages Within D Days
 * LeetCode: 1011 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * A conveyor belt carries {@code n} packages in order; package {@code i} weighs
 * {@code weights[i]}. Every day a ship can carry a total weight of at most
 * {@code capacity}. Return the smallest capacity that allows all packages to be shipped
 * within {@code d} days.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * weights[0] weights[1] ... weights[n-1]
 * d
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 1 2 3 4 5 6
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: for a fixed capacity, greedily pack as many consecutive packages as fit each
 * day — this minimises the number of days because a package can never be split. The number of
 * days needed is monotone in the capacity, so binary search the smallest capacity that needs
 * at most {@code d} days.
 *
 * <p>Complexity: Time O(n log(sum(weights))), Space O(1).
 */
public class CapacityToShipPackages {

    /**
     * Returns the minimum ship capacity that ships every package within {@code days} days.
     *
     * @param weights the package weights in conveyor order
     * @param days    the number of available days
     * @return the smallest feasible capacity
     */
    public static int shipWithinDays(int[] weights, int days) {
        long low = 0;
        long high = 0;
        for (int weight : weights) {
            low = Math.max(low, weight);
            high += weight;
        }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (daysNeeded(weights, mid) <= days) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return (int) low;
    }

    /** Days required when each day may carry at most {@code capacity} weight. */
    private static int daysNeeded(int[] weights, long capacity) {
        int days = 1;
        long load = 0;
        for (int weight : weights) {
            if (load + weight > capacity) {
                days++;
                load = 0;
            }
            load += weight;
        }
        return days;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] weights = fs.nextIntArray(n);
        int days = fs.nextInt();

        System.out.println(shipWithinDays(weights, days));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Capacity To Ship Packages Within D Days
 * LeetCode: 1011 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * A conveyor belt carries {@code n} packages in order; package {@code i} weighs
 * {@code weights[i]}. Every day a ship can carry a total weight of at most
 * {@code capacity}. Return the smallest capacity that allows all packages to be shipped
 * within {@code d} days.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * weights[0] weights[1] ... weights[n-1]
 * d
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 1 2 3 4 5 6
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: for a fixed capacity, greedily pack as many consecutive packages as fit each
 * day — this minimises the number of days because a package can never be split. The number of
 * days needed is monotone in the capacity, so binary search the smallest capacity that needs
 * at most {@code d} days.
 *
 * <p>Complexity: Time O(n log(sum(weights))), Space O(1).
 */
public class Main {

    /**
     * Returns the minimum ship capacity that ships every package within {@code days} days.
     *
     * @param weights the package weights in conveyor order
     * @param days    the number of available days
     * @return the smallest feasible capacity
     */
    public static int shipWithinDays(int[] weights, int days) {
        long low = 0;
        long high = 0;
        for (int weight : weights) {
            low = Math.max(low, weight);
            high += weight;
        }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (daysNeeded(weights, mid) <= days) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return (int) low;
    }

    /** Days required when each day may carry at most {@code capacity} weight. */
    private static int daysNeeded(int[] weights, long capacity) {
        int days = 1;
        long load = 0;
        for (int weight : weights) {
            if (load + weight > capacity) {
                days++;
                load = 0;
            }
            load += weight;
        }
        return days;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] weights = fs.nextIntArray(n);
        int days = fs.nextInt();

        System.out.println(shipWithinDays(weights, days));
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
# Capacity To Ship Packages Within D Days — LeetCode 1011

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search on the answer · Greedy |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

A conveyor belt carries \`n\` packages in order; package \`i\` weighs \`weights[i]\`. Every day a
ship can carry packages of total weight at most \`capacity\` — and the packages on the belt
must be loaded **in order**, so a ship's cargo is always a contiguous run.

Return the **minimum** capacity that allows all packages to be shipped within \`d\` days.

- \`1 <= n <= 10⁵\`
- \`1 <= weights[i] <= 10⁴\`
- \`1 <= d <= n\`

## Input Format

The program reads from standard input:

\`\`\`
n
weights[0] weights[1] ... weights[n-1]
d
\`\`\`

- \`n\` — number of packages (1 ≤ n ≤ 10⁵)
- \`weights\` — n space-separated package weights, in conveyor order
- \`d\` — the number of days available

## Sample Input

\`\`\`
6
1 2 3 4 5 6
3
\`\`\`

## Expected Output

\`\`\`
9
\`\`\`

With capacity \`9\` the ship loads \`[1,2,3]\`, \`[4,5]\`, \`[6]\` — three days.
Capacity \`8\` would need \`[1,2,3]\`, \`[4]\`, \`[5]\`, \`[6]\` — four days, which is too many.

## Approach — Binary search on the capacity

The unknown is a **capacity**, so we binary search a monotone predicate:

> \`P(c) = "all packages fit into at most d days when a ship carries c per day"\`.

\`P\` is monotone: a bigger ship can always replicate a smaller ship's schedule. So the
feasible capacities form a suffix \`[c*, ∞)\` and we want the first element of that suffix.

**The feasibility check is greedy.** Load the ship until the next package would exceed the
capacity, then start a new day. Because packages must stay in order and cannot be split, the
greedy "fill each day as much as possible" schedule uses the **minimum** number of days. Any
other schedule that closes a day earlier leaves more work for the later days and can only
use more days.

**The search range.** \`low = max(weights)\` (a package heavier than the ship can never be
carried) and \`high = sum(weights)\` (one ship, one day, everything).

## Dry Run

Input: \`weights = [1, 2, 3, 4, 5, 6]\`, \`d = 3\`

| Step | low | high | mid | greedy day-by-day load | days needed | feasible? | range after |
|---:|---:|---:|---:|---|---:|---|---|
| 1 | 6 | 21 | 13 | \`[1,2,3,4]\` \`[5]\` \`[6]\` | 3 | yes | \`[6, 13]\` |
| 2 | 6 | 13 | 9 | \`[1,2,3]\` \`[4,5]\` \`[6]\` | 3 | yes | \`[6, 9]\` |
| 3 | 6 | 9 | 7 | \`[1,2,3]\` \`[4]\` \`[5]\` \`[6]\` | 4 | no | \`[7, 9]\` |
| 4 | 7 | 9 | 8 | \`[1,2,3]\` \`[4]\` \`[5]\` \`[6]\` | 4 | no | \`[9, 9]\` |

\`low == high == 9\` → return **9**.

### The greedy day-by-day detail for \`capacity = 9\`

| Day | Package | Load before | Load after | Decision |
|---:|---:|---:|---:|---|
| 1 | 1 | 0 | 1 | fits |
| 1 | 2 | 1 | 3 | fits |
| 1 | 3 | 3 | 6 | fits |
| 1 | 4 | 6 | — | \`6 + 4 = 10 > 9\` → new day |
| 2 | 4 | 0 | 4 | fits |
| 2 | 5 | 4 | 9 | fits |
| 2 | 6 | 9 | — | \`9 + 6 = 15 > 9\` → new day |
| 3 | 6 | 0 | 6 | fits → **3 days** |

## Java Solution

See [\`CapacityToShipPackages.java\`](./CapacityToShipPackages.java).

\`\`\`java
public static int shipWithinDays(int[] weights, int days) {
    long low = 0;
    long high = 0;
    for (int weight : weights) {
        low = Math.max(low, weight);
        high += weight;
    }
    while (low < high) {
        long mid = low + (high - low) / 2;
        if (daysNeeded(weights, mid) <= days) {
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
| **Time** | O(n log W) | W = sum(weights); one O(n) check per binary-search step |
| **Space** | O(1) | No extra containers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if packages could be reordered?"* → then the answer is \`max(max(weights), ceil(sum / d))\`
  and no binary search is needed. **Ask about the ordering constraint** — it is the whole
  problem.
- *"What if a ship must carry exactly \`d\` days' worth, no more?"* → the same algorithm, but
  the search must also verify that \`d\` groups are achievable, which requires \`n >= d\`.
- *"Can you return the actual loading plan?"* → yes, record the day boundaries during the
  successful feasibility check.
- *"How would you parallelise this?"* → the feasibility check is a prefix scan; a
  parallel-prefix implementation gives O(n) work per check but with a much worse constant —
  rarely worth it.

**Common mistakes:**
- ❌ Forgetting the in-order constraint → the greedy check then produces a smaller answer
  than the problem allows.
- ❌ Starting \`low\` at \`0\` → capacity \`0\` cannot carry anything and makes the check loop
  forever on the first package.
- ❌ Using \`int\` for the running load → \`load + weight\` can overflow with 10⁵ packages of
  weight 10⁴ (sum ≈ 10⁹, still inside \`int\`, but the pattern is fragile).
- ❌ Checking \`days == d\` instead of \`days <= d\` → an early ship can finish before the
  deadline; that is allowed.

**How to narrate:**
> "The answer is a capacity, so I'll binary search over the predicate 'can we ship
> everything within d days at this capacity'. It's monotone, so that works. The check is
> greedy: keep loading packages until the next one doesn't fit, then start a new day —
> because packages are in order and can't be split, filling each day maximally minimises
> the number of days."

## Related Problems

- [Split Array Largest Sum](./SplitArrayLargestSum.java) — the same skeleton with groups instead of days
- [Allocate Minimum Number of Painters](./AllocateMinimumNumberOfPainters.java) — greedy check + binary search on a limit
- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on a rate
`,i=[`shipWithinDays`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};