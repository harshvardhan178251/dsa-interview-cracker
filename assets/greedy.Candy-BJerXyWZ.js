var e=`greedy.Candy`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

/**
 * Problem: Candy
 * LeetCode: 135 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Greedy, Two-pass constraint propagation
 *
 * <p>Problem:
 * Every child in a row of {@code n} children has a rating. Each child receives at
 * least one candy, and:
 * <ul>
 *   <li>a child with a higher rating than the left neighbour gets more candies;</li>
 *   <li>a child with a higher rating than the right neighbour gets more candies.</li>
 * </ul>
 * Return the fewest candies that satisfy both constraints.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * ratings[0] ratings[1] ... ratings[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 0 2 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: hand out one candy to everybody, then sweep left to right enforcing the
 * "greater than the left neighbour" rule and right to left enforcing the "greater than
 * the right neighbour" rule. Taking the maximum of the two passes keeps every
 * constraint satisfied and never hands out more than necessary.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Candy {

    /**
     * Returns the minimum total number of candies for the given ratings.
     *
     * @param ratings rating of every child, left to right
     * @return the minimum number of candies that satisfies both neighbour rules
     */
    public static int minCandies(int[] ratings) {
        if (ratings == null || ratings.length == 0) {
            return 0;
        }
        int n = ratings.length;
        int[] candies = new int[n];
        for (int i = 0; i < n; i++) {
            candies[i] = 1;
        }
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }
        int total = 0;
        for (int c : candies) {
            total += c;
        }
        return total;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] ratings = fs.nextIntArray(n);

        System.out.println(minCandies(ratings));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Main
 * LeetCode: 135 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Greedy, Two-pass constraint propagation
 *
 * <p>Problem:
 * Every child in a row of {@code n} children has a rating. Each child receives at
 * least one candy, and:
 * <ul>
 *   <li>a child with a higher rating than the left neighbour gets more candies;</li>
 *   <li>a child with a higher rating than the right neighbour gets more candies.</li>
 * </ul>
 * Return the fewest candies that satisfy both constraints.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * ratings[0] ratings[1] ... ratings[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 0 2 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: hand out one candy to everybody, then sweep left to right enforcing the
 * "greater than the left neighbour" rule and right to left enforcing the "greater than
 * the right neighbour" rule. Taking the maximum of the two passes keeps every
 * constraint satisfied and never hands out more than necessary.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the minimum total number of candies for the given ratings.
     *
     * @param ratings rating of every child, left to right
     * @return the minimum number of candies that satisfies both neighbour rules
     */
    public static int minCandies(int[] ratings) {
        if (ratings == null || ratings.length == 0) {
            return 0;
        }
        int n = ratings.length;
        int[] candies = new int[n];
        for (int i = 0; i < n; i++) {
            candies[i] = 1;
        }
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }
        int total = 0;
        for (int c : candies) {
            total += c;
        }
        return total;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] ratings = fs.nextIntArray(n);

        System.out.println(minCandies(ratings));
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
# Candy — LeetCode 135

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Greedy · Two-pass constraint propagation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Every child in a row has a rating. Each child receives at least one candy and:

- if a child's rating is **higher** than the left neighbour's, it gets **more** candies;
- if a child's rating is **higher** than the right neighbour's, it gets **more** candies.

Return the **fewest** candies that satisfy both rules. Equal ratings impose no
constraint.

## Input Format

The program reads from standard input:

\`\`\`
n
ratings[0] ratings[1] ... ratings[n-1]
\`\`\`

- \`n\` — number of children (1 ≤ n ≤ 10⁵)
- \`ratings\` — n space-separated integers (0 ≤ ratings[i] ≤ 10⁴)

## Sample Input

\`\`\`
5
1 0 2 2 5
\`\`\`

## Expected Output

\`\`\`
8
\`\`\`

Candy counts \`[2, 1, 2, 1, 2]\` → 8 candies.

## Approach — two greedy passes

The two constraints pull in opposite directions, so they are enforced in two separate
passes and the larger requirement wins.

1. **Left to right.** Give everybody one candy. Then, whenever \`ratings[i] >
   ratings[i-1]\`, set \`candies[i] = candies[i-1] + 1\`. This satisfies the "greater than
   the left neighbour" rule.
2. **Right to left.** Whenever \`ratings[i] > ratings[i+1]\`, set
   \`candies[i] = max(candies[i], candies[i+1] + 1)\`. This satisfies the "greater than
   the right neighbour" rule without breaking the first one — the \`max\` is what keeps
   both rules valid at the same time.
3. Sum the array.

**Exchange argument (why the greedy choice is safe):** the constraints only ever say
"this child needs strictly more than that child", so they form a forest of chains
running up-hill. Along such a chain the candy counts must increase by at least 1 per
step, so the smallest valid assignment on a chain of length \`L\` is \`1, 2, 3, …, L\`. The
left-to-right pass computes exactly the "increasing run from the left" and the
right-to-left pass computes exactly the "increasing run from the right"; the child at
the meeting point of two runs needs \`max(left, right)\`, which is the tightest bound
that still satisfies both directions. Since the assignment is pointwise minimal, the
sum is minimal too.

## Dry Run

Input: \`ratings = [1, 0, 2, 2, 5]\`, \`n = 5\`

| Step | Pass | i | ratings[i] | rule applied | \`candies\` after | note |
|---:|---|---:|---:|---|---|---|
| 0 | init | — | — | everyone starts with 1 | \`[1, 1, 1, 1, 1]\` | |
| 1 | → | 1 | 0 | \`0 > 1\`? no | \`[1, 1, 1, 1, 1]\` | |
| 2 | → | 2 | 2 | \`2 > 0\` → \`candies[2] = candies[1]+1 = 2\` | \`[1, 1, 2, 1, 1]\` | |
| 3 | → | 3 | 2 | \`2 > 2\`? no | \`[1, 1, 2, 1, 1]\` | equal ratings, no rule |
| 4 | → | 4 | 5 | \`5 > 2\` → \`candies[4] = candies[3]+1 = 2\` | \`[1, 1, 2, 1, 2]\` | |
| 5 | ← | 3 | 2 | \`2 > 5\`? no | \`[1, 1, 2, 1, 2]\` | |
| 6 | ← | 2 | 2 | \`2 > 2\`? no | \`[1, 1, 2, 1, 2]\` | |
| 7 | ← | 1 | 0 | \`0 > 2\`? no | \`[1, 1, 2, 1, 2]\` | |
| 8 | ← | 0 | 1 | \`1 > 0\` → \`candies[0] = max(1, candies[1]+1 = 2) = 2\` | \`[2, 1, 2, 1, 2]\` | |

Total = 2 + 1 + 2 + 1 + 2 = **8**.

## Java Solution

See [\`Candy.java\`](./Candy.java).

\`\`\`java
public static int minCandies(int[] ratings) {
    if (ratings == null || ratings.length == 0) {
        return 0;
    }
    int n = ratings.length;
    int[] candies = new int[n];
    for (int i = 0; i < n; i++) {
        candies[i] = 1;
    }
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    int total = 0;
    for (int c : candies) {
        total += c;
    }
    return total;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | two passes plus a sum |
| **Space** | O(n) | the \`candies\` array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) space?"* → yes, with two running counters (a "left run" and a
  "right run" that meet in the middle); the trick is easy to get wrong, so mention it
  as an optimisation rather than the main solution.
- *"What if there were three rules (left, right and same rating)?"* → the problem
  becomes a graph/DP problem: assign candies so that adjacent children differ by at
  least 1 and equal ratings get equal candies.
- *"What if the children are in a circle?"* → the left and right constraints meet; the
  two-pass trick still works but you have to re-check the wrap-around pair.

**Common mistakes:**
- ❌ Doing only the left-to-right pass — the "greater than the right neighbour" rule is
  violated.
- ❌ Using \`candies[i] = candies[i+1] + 1\` in the second pass without the \`max\` — the
  left-to-right requirement can be destroyed.
- ❌ Comparing \`>=\` instead of \`>\` — equal ratings do **not** force more candies.

**How to narrate:**
> "The two rules point in opposite directions, so I handle them separately. First a
> left-to-right pass fixes the 'greater than the left neighbour' rule, then a
> right-to-left pass fixes the other one but takes the max with what I already have, so
> neither pass undoes the other. Each pass produces the smallest possible candy count
> for its direction, so the pointwise max is the minimum valid assignment."

## Related Problems

- [Partition Array Into Maximum Subarrays](./PartitionArrayToMaximumSum.md) — greedy with two constraints
- [Non-overlapping Intervals](../intervals/NonOverlappingIntervals.md) — the same "smallest sufficient value" idea
`,i=[`minCandies`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};