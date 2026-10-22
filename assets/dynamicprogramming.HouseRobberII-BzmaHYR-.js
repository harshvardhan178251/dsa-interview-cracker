var e=`dynamicprogramming.HouseRobberII`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: House Robber II
 * LeetCode: 213 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Circular DP, Divide and conquer
 *
 * <p>Problem: The same house-robbery problem, but the houses form a circle: the first and the last house are adjacent and cannot both be robbed.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 3 2 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Break the circle: either skip the last house or skip the first one, and solve the linear problem twice.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class HouseRobberII {

    /**
     * Returns the maximum amount that can be robbed on a circular street.
     *
     * <p>The first and the last house are adjacent, so at least one of them must be skipped.
     * The answer is the better of the linear solution over {@code [0, n-2]} and over {@code [1, n-1]}.
     *
     * @param nums money in each house
     * @return the maximum total that can be robbed
     */
    public static int rob(int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return nums[0];
        }
        int skipLast = robRange(nums, 0, n - 2);
        int skipFirst = robRange(nums, 1, n - 1);
        return Math.max(skipLast, skipFirst);
    }

    /**
     * Linear version of House Robber over the half-open range {@code [from, to]}.
     *
     * @param nums money in each house
     * @param from  first house of the range (inclusive)
     * @param to    last house of the range (inclusive)
     * @return the maximum total obtainable inside the range
     */
    private static int robRange(int[] nums, int from, int to) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = from; i <= to; i++) {
            int current = Math.max(oneBack, nums[i] + twoBack);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(rob(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: House Robber II
 * LeetCode: 213 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Circular DP, Divide and conquer
 *
 * <p>Problem: The same house-robbery problem, but the houses form a circle: the first and the last house are adjacent and cannot both be robbed.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 3 2 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Break the circle: either skip the last house or skip the first one, and solve the linear problem twice.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the maximum amount that can be robbed on a circular street.
     *
     * <p>The first and the last house are adjacent, so at least one of them must be skipped.
     * The answer is the better of the linear solution over {@code [0, n-2]} and over {@code [1, n-1]}.
     *
     * @param nums money in each house
     * @return the maximum total that can be robbed
     */
    public static int rob(int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return nums[0];
        }
        int skipLast = robRange(nums, 0, n - 2);
        int skipFirst = robRange(nums, 1, n - 1);
        return Math.max(skipLast, skipFirst);
    }

    /**
     * Linear version of House Robber over the half-open range {@code [from, to]}.
     *
     * @param nums money in each house
     * @param from  first house of the range (inclusive)
     * @param to    last house of the range (inclusive)
     * @return the maximum total obtainable inside the range
     */
    private static int robRange(int[] nums, int from, int to) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = from; i <= to; i++) {
            int current = Math.max(oneBack, nums[i] + twoBack);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(rob(nums));
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
# House Robber II — LeetCode 213

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Circular DP · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

The houses on the street form a **circle**: house \`0\` and house \`n-1\` are neighbours. Rob two adjacent houses and the police catch you. Return the maximum money you can rob.

- \`nums[i]\` — money in the \`i\`-th house

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — number of houses (1 ≤ n ≤ 100)
- \`nums\` — n space-separated non-negative integers

## Sample Input

\`\`\`
5
2 3 2 3 2
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

Robbing houses 1 and 3 (\`3 + 3 = 6\`) is legal — they are not adjacent. The best possible total is **6**.

## Approach

The circular constraint only ever couples **house 0** and **house n-1**. Every valid solution must leave one of them empty:

- **Case A — skip the last house:** solve the linear problem on \`nums[0 … n-2]\`.
- **Case B — skip the first house:** solve the linear problem on \`nums[1 … n-1]\`.

The answer is \`max(A, B)\`. Both cases use the linear take-or-skip recurrence \`dp[i] = max(dp[i-1], nums[i] + dp[i-2])\`.

Taking the two halves separately is what keeps the solution correct — you must **not** just run the linear algorithm on the whole array, because that would happily rob houses 0 and n-1 together.

## Dry Run

Input: \`nums = [2, 3, 2, 3, 2]\`, \`n = 5\`.

**Case A — skip house 4, rob from \`nums[0 … 3] = [2, 3, 2, 3]\`**

| house \`i\` | \`nums[i]\` | skip → \`dp[i-1]\` | rob → \`nums[i] + dp[i-2]\` | \`dp[i]\` |
|---:|---:|---:|---:|---:|
| 0 | 2 | 0 | 2 + 0 = 2 | **2** |
| 1 | 3 | 2 | 3 + 0 = 3 | **3** |
| 2 | 2 | 3 | 2 + 2 = 4 | **4** |
| 3 | 3 | 4 | 3 + 3 = 6 | **6** |

**Case B — skip house 0, rob from \`nums[1 … 4] = [3, 2, 3, 2]\`**

| house \`i\` | \`nums[i]\` | skip → \`dp[i-1]\` | rob → \`nums[i] + dp[i-2]\` | \`dp[i]\` |
|---:|---:|---:|---:|---:|
| 1 | 3 | 0 | 3 + 0 = 3 | **3** |
| 2 | 2 | 3 | 2 + 0 = 2 | **3** |
| 3 | 3 | 3 | 3 + 3 = 6 | **6** |
| 4 | 2 | 6 | 2 + 3 = 5 | **6** |

\`max(6, 6) = 6\` → answer **6**.

**Why two cases and not one.** Any legal solution must skip house 0 or skip house 4, so the two cases cover every legal solution — and each case is a plain linear run.

**Edge cases.** \`n == 1\` → rob the only house. \`n == 2\` → rob the richer one (each case degenerates to a single house).

## Java Solution

See [\`HouseRobberII.java\`](./HouseRobberII.java).

\`\`\`java
    public static int rob(int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return nums[0];
        }
        int skipLast = robRange(nums, 0, n - 2);
        int skipFirst = robRange(nums, 1, n - 1);
        return Math.max(skipLast, skipFirst);
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | two linear passes, \`O(n)\` each |
| **Space** | O(1) | the rolling variables of the linear helper |

**Space \`O(1)\`.** A tabulated version of the linear helper would use \`O(n)\`.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the street is a circle of unknown size and you only know the values?"* → same idea, you still need the index of the first house.
- "What if you can rob at most \`k\` houses in a row on a circle?"* → the two-case trick still applies, the inner DP gains a "how many consecutive houses" dimension.
- "Can this be done in one pass?"* → yes, but you need to remember the value of \`dp[n-1]\` computed without the last house while the real pass also includes it — two runs are simpler to explain.

**Common mistakes:**

- ❌ Running the linear algorithm over the whole array and taking \`dp[n-1]\` — that robs house 0 and house n-1 together.
- ❌ Forgetting the \`n == 1\` case, which makes \`robRange(nums, 1, 0)\` return \`0\` and hides the answer.
- ❌ Taking \`min\` instead of \`max\` of the two cases.

**How to narrate:**

> "The circle only couples the first and the last house, so one of them has to be skipped. I run the linear take-or-skip DP twice — once on houses 0 to n-2 and once on houses 1 to n-1 — and take the better result. Each run is \`O(n)\` time and \`O(1)\` space."

## Related Problems

- [House Robber — LeetCode 198](./HouseRobber.java) — the linear version
- [Best Time to Buy and Sell Stock III — LeetCode 123](./BestTimeToBuySellStockIII.java) — state-compression DP
`,i=[`rob`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};