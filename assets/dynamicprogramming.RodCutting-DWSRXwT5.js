var e=`dynamicprogramming.RodCutting`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Rod Cutting
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Unbounded knapsack, Bottom-up DP
 *
 * <p>Problem: Given the price of a rod of every length from 1 up to \`n\`, and the fact that a cut costs nothing, return the highest revenue obtainable by cutting the rod into pieces.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * price[0] price[1] ... price[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 6 8 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 12
 * </pre>
 *
 * <p>Approach: For every length, try every possible first cut and keep the best price plus the best revenue of the remainder.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class RodCutting {

    /**
     * Returns the highest revenue obtainable from a rod of {@code length} units.
     *
     * <p>{@code price[i]} is the price of an uncut rod of length {@code i + 1}. A rod may be cut into
     * any number of pieces and every piece is sold at its own length price.
     *
     * @param length the length of the rod
     * @param price  the price of a rod of length {@code i + 1} is {@code price[i]}
     * @return the maximum revenue
     */
    public static int maxRevenue(int length, int[] price) {
        int[] dp = new int[length + 1];

        for (int i = 1; i <= length; i++) {
            int best = 0;
            for (int cut = 1; cut <= i; cut++) {
                // sell a piece of length 'cut' and solve the rest
                best = Math.max(best, price[cut - 1] + dp[i - cut]);
            }
            dp[i] = best;
        }
        return dp[length];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] price = fs.nextIntArray(n);

        System.out.println(maxRevenue(n, price));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Rod Cutting
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Unbounded knapsack, Bottom-up DP
 *
 * <p>Problem: Given the price of a rod of every length from 1 up to \`n\`, and the fact that a cut costs nothing, return the highest revenue obtainable by cutting the rod into pieces.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * price[0] price[1] ... price[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 6 8 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 12
 * </pre>
 *
 * <p>Approach: For every length, try every possible first cut and keep the best price plus the best revenue of the remainder.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class Main {

    /**
     * Returns the highest revenue obtainable from a rod of {@code length} units.
     *
     * <p>{@code price[i]} is the price of an uncut rod of length {@code i + 1}. A rod may be cut into
     * any number of pieces and every piece is sold at its own length price.
     *
     * @param length the length of the rod
     * @param price  the price of a rod of length {@code i + 1} is {@code price[i]}
     * @return the maximum revenue
     */
    public static int maxRevenue(int length, int[] price) {
        int[] dp = new int[length + 1];

        for (int i = 1; i <= length; i++) {
            int best = 0;
            for (int cut = 1; cut <= i; cut++) {
                // sell a piece of length 'cut' and solve the rest
                best = Math.max(best, price[cut - 1] + dp[i - cut]);
            }
            dp[i] = best;
        }
        return dp[length];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] price = fs.nextIntArray(n);

        System.out.println(maxRevenue(n, price));
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
# Rod Cutting

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Unbounded knapsack · Bottom-up DP |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Microsoft, Adobe |

## Problem Statement

A rod of length \`n\` inches is worth \`price[i]\` when it is sold uncut at length \`i + 1\`. Cuts are free, and any number of pieces may be sold.

Return the **maximum revenue** obtainable for the whole rod.

## Input Format

The program reads from standard input:

\`\`\`
n
price[0] price[1] ... price[n-1]
\`\`\`

- \`n\` — the rod length (1 ≤ n ≤ 100)
- \`price[i]\` — the price of a rod of length \`i + 1\` (1 ≤ price[i] ≤ 10⁴)

## Sample Input

\`\`\`
4
2 6 8 10
\`\`\`

## Expected Output

\`\`\`
12
\`\`\`

Two rods of length 2 are worth \`6 + 6 = 12\`, which beats the uncut rod (\`10\`) → **12**.

## Approach

This is the **unbounded knapsack** with values instead of counts:

1. \`dp[i]\` = the maximum revenue from a rod of length \`i\`.
2. \`dp[0] = 0\` — a rod of length 0 is worth nothing.
3. Suppose the first piece has length \`cut\` (1 … i). It is sold for \`price[cut - 1]\`, and the    remaining \`i - cut\` units are worth \`dp[i - cut]\`:
   \`dp[i] = max over cut of (price[cut - 1] + dp[i - cut])\`.
4. The answer is \`dp[n]\`.

**Why greedy fails.** With \`price = [2, 6, 8, 10]\` and a rod of length 4, the greedy strategy "always take the most valuable piece that fits" takes the whole rod — worth 10. But two pieces of length 2 are worth \`6 + 6 = 12\`. The DP compares every legal split and finds 12.

Note that the price list need not be super-additive (a piece of length 4 may be worth less than two pieces of length 2), so the greedy strategy can be beaten — which is exactly why this is a DP problem.

## Dry Run

Input: \`length = 4\`, \`price = [2, 6, 8, 10]\` (prices for lengths 1, 2, 3, 4).

| \`i\` | candidate splits | \`dp[i]\` |
|---:|---|---:|
| 1 | 1 → \`price[0] + dp[0]\` = 2 + 0 = 2 | **2** |
| 2 | 1 → 2 + 2 = 4 · 2 → 6 + 0 = 6 | **6** |
| 3 | 1 → 2 + 6 = 8 · 2 → 6 + 2 = 8 · 3 → 8 + 0 = 8 | **8** |
| 4 | 1 → 2 + 8 = 10 · 2 → 6 + 6 = 12 · 3 → 8 + 2 = 10 · 4 → 10 + 0 = 10 | **12** |

Full table: \`dp = [0, 2, 6, 8, 12]\` → answer **12**.

**The winning split.** Length 4 = 2 + 2 → \`6 + 6 = 12\`.

**The unbounded structure.** The same piece length may be used many times (\`2 + 2\` uses the length-2 price twice), which is why the inner loop always refers to \`dp[i - cut]\` — a *shorter* rod — and never to a "used pieces" flag.

**Contrast with 0/1 knapsack.** In 0/1 knapsack the item loop is outside and the capacity loop runs downwards. Here the capacity is outside and the item loop runs over all lengths — the mirrored shape of [Coin Change](./CoinChange.java).

## Java Solution

See [\`RodCutting.java\`](./RodCutting.java).

\`\`\`java
    public static int maxRevenue(int length, int[] price) {
        int[] dp = new int[length + 1];

        for (int i = 1; i <= length; i++) {
            int best = 0;
            for (int cut = 1; cut <= i; cut++) {
                best = Math.max(best, price[cut - 1] + dp[i - cut]);
            }
            dp[i] = best;
        }
        return dp[length];
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | \`n\` lengths, each trying \`n\` splits |
| **Space** | O(n) | the \`dp\` array holds \`n + 1\` entries |

**Space \`O(n)\`.** The table cannot be rolled up as easily as the coin-change one, because the inner loop reads arbitrary earlier entries.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if each cut costs money?"* → subtract the cut cost from the price inside the recurrence.
- "What if only certain lengths may be produced?"* → set the other prices to \`-∞\` (unreachable).
- "How is this related to coin change?"* → the same unbounded-knapsack shape, minimising the number of coins instead of maximising the revenue.
- "Can it be \`O(n log n)\`?"* → not for the general case; the \`O(n²)\` DP is the standard answer.

**Common mistakes:**

- ❌ Using \`price[cut]\` instead of \`price[cut - 1]\` — off by one on the price list.
- ❌ Forgetting that the rod may be sold **uncut** (\`cut == i\` must be allowed).
- ❌ Using a 0/1 style inner loop (once per piece) — that would forbid selling two pieces of the same length.

**How to narrate:**

> "\`dp[i]\` is the best revenue from a rod of length \`i\`. If the first piece has length \`cut\`, I sell it for \`price[cut-1]\` and optimally cut the remaining \`i - cut\`, so \`dp[i] = max(price[cut-1] + dp[i-cut])\`. Trying every cut gives \`O(n²)\`. The same piece length may be repeated, which makes this the unbounded variant of knapsack."

## Related Problems

- [Coin Change — LeetCode 322](./CoinChange.java) — the same shape, minimising coins
- [Coin Change II — LeetCode 518](./CoinChangeII.java) — the counting variant
`,i=[`maxRevenue`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};