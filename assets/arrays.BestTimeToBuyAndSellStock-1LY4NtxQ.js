var e=`arrays.BestTimeToBuyAndSellStock`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Best Time to Buy and Sell Stock
 * LeetCode: 121 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Greedy, One-pass minimum tracking
 *
 * <p>Problem:
 * You are given an array {@code prices} where {@code prices[i]} is the price of a given
 * stock on day {@code i}. You may buy on one day and sell on a later day. Return the
 * maximum profit you can achieve. If no profitable transaction exists, return 0.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 7 1 5 3 6 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: single left-to-right pass. Keep the cheapest price seen so far; for every
 * day compute the profit of selling today and keep the best one. The buy day never has
 * to be recorded explicitly because the running minimum always refers to some earlier day.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class BestTimeToBuyAndSellStock {

    /**
     * Returns the maximum profit from a single buy/sell transaction.
     *
     * @param prices daily prices, oldest first
     * @return the best achievable profit, or 0 when no profitable transaction exists
     */
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int best = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > best) {
                best = price - minPrice;
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] prices = fs.nextIntArray(n);

        System.out.println(maxProfit(prices));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Best Time to Buy and Sell Stock
 * LeetCode: 121 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Greedy, One-pass minimum tracking
 *
 * <p>Problem:
 * You are given an array {@code prices} where {@code prices[i]} is the price of a given
 * stock on day {@code i}. You may buy on one day and sell on a later day. Return the
 * maximum profit you can achieve. If no profitable transaction exists, return 0.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 7 1 5 3 6 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: single left-to-right pass. Keep the cheapest price seen so far; for every
 * day compute the profit of selling today and keep the best one. The buy day never has
 * to be recorded explicitly because the running minimum always refers to some earlier day.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the maximum profit from a single buy/sell transaction.
     *
     * @param prices daily prices, oldest first
     * @return the best achievable profit, or 0 when no profitable transaction exists
     */
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int best = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > best) {
                best = price - minPrice;
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] prices = fs.nextIntArray(n);

        System.out.println(maxProfit(prices));
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
# Best Time to Buy and Sell Stock — LeetCode 121

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Greedy · One-pass minimum tracking |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on day \`i\`.

- You may **buy** on one day and **sell** on a later day.
- You may hold **at most one** share at a time.
- Return the **maximum profit** you can achieve.
- If no profitable transaction exists, return \`0\`.

## Input Format

\`\`\`
n
prices[0] prices[1] ... prices[n-1]
\`\`\`

- \`n\` — number of days (1 ≤ n ≤ 10⁵)
- \`prices\` — n space-separated integers, oldest first

## Sample Input

\`\`\`
6
7 1 5 3 6 4
\`\`\`

## Expected Output

\`\`\`
5
\`\`\`

Buy on day 1 at \`1\`, sell on day 4 at \`6\` → profit \`5\`.

## Approach — Running Minimum

The naive approach is to try every buy/sell pair: **O(n²)**. The key observation is that
for a fixed sell day, the best buy day is simply the **cheapest day before it**. So we
never need to look backwards.

Walk the array once, keeping two numbers:

- \`minPrice\` — the cheapest price seen so far
- \`best\` — the best profit found so far

At each day:

1. If \`price < minPrice\`, this day is the new cheapest → update \`minPrice\`.
2. Otherwise the profit from selling today is \`price - minPrice\` → update \`best\` if it
   beats what we have.

The buy day never has to be stored: \`minPrice\` always refers to *some* earlier day, and
that is all the profit calculation needs.

**Why it works:** for any sell day \`j\`, the best possible profit is
\`prices[j] - min(prices[0..j-1])\`. The loop computes exactly that value for every \`j\`,
so \`best\` is the maximum over all sell days — which is the maximum over all valid
transactions.

## Dry Run

Input: \`prices = [7, 1, 5, 3, 6, 4]\`

| Step | i | \`price\` | \`minPrice\` before | \`best\` before | \`minPrice\` after | \`best\` after | note |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 7 | ∞ | 0 | 7 | 0 | day 0 is the cheapest so far |
| 2 | 1 | 1 | 7 | 0 | 1 | 0 | new minimum — no profit yet |
| 3 | 2 | 5 | 1 | 0 | 1 | 4 | sell today: 5 − 1 = 4 |
| 4 | 3 | 3 | 1 | 4 | 1 | 4 | 3 − 1 = 2 < 4, keep 4 |
| 5 | 4 | 6 | 1 | 4 | 1 | 5 | sell today: 6 − 1 = 5 ✔ best |
| 6 | 5 | 4 | 1 | 5 | 1 | 5 | 4 − 1 = 3 < 5, keep 5 |

Answer: **5**

## Java Solution

See [\`BestTimeToBuyAndSellStock.java\`](./BestTimeToBuyAndSellStock.java).

\`\`\`java
public static int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int best = 0;
    for (int price : prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > best) {
            best = price - minPrice;
        }
    }
    return best;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, constant work per day |
| **Space** | O(1) | Two scalars, no extra arrays |

**Optimal?** Yes — every element must be looked at at least once, so O(n) is a lower bound.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if I can hold multiple shares?"* → the unlimited-transaction variant; see
  [Best Time to Buy and Sell Stock II](BestTimeToBuyAndSellStockII.md).
- *"What if transactions have a fee?"* → subtract the fee from every transaction; the
  same running-minimum idea still works.
- *"What if I must hold exactly one share for the whole period?"* → that is just
  \`prices[n-1] - prices[0]\`.
- *"Can this work on a stream of prices?"* → yes, the state is only \`minPrice\` and
  \`best\`, so it is O(1) memory and single-pass by construction.

**Common mistakes:**
- ❌ Forgetting that the **buy day must be strictly earlier** than the sell day — updating
  \`minPrice\` *after* computing the profit would allow buying and selling on the same day.
- ❌ Returning a negative number when prices only fall — the answer must be \`0\`.
- ❌ Using \`Integer.MIN_VALUE\` for \`minPrice\` and then subtracting from it (overflow) —
  seed it with \`Integer.MAX_VALUE\` or with \`prices[0]\`.

**How to narrate:**
> "For a fixed sell day, the best buy day is the cheapest day before it. So instead of
> trying all pairs, I scan once and keep the running minimum price. At each day I
> compute what selling today would earn, and I keep the max of those. That's O(n) time
> and O(1) space, and it naturally returns 0 when prices only fall."

## Related Problems

- [Best Time to Buy and Sell Stock II](BestTimeToBuyAndSellStockII.md) — unlimited transactions
- [Maximum Subarray](MaxSubarray.md) — the same "running best" shape over sums
- [Contains Duplicate II](ContainsDuplicateII.md) — a distance-limited scan
`,i=[`maxProfit`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};