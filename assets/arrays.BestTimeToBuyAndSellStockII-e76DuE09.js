var e=`arrays.BestTimeToBuyAndSellStockII`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Best Time to Buy and Sell Stock II
 * LeetCode: 122 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Running difference
 *
 * <p>Problem:
 * You are given an array {@code prices} where {@code prices[i]} is the price of a given
 * stock on day {@code i}. You may buy and sell as often as you like, but you may only hold
 * one share at a time. Return the maximum total profit.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 7 1 5 3 6 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: every positive day-to-day difference can be captured independently, because
 * we may sell and re-buy on consecutive days for free. Summing all positive differences
 * is therefore optimal.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class BestTimeToBuyAndSellStockII {

    /**
     * Returns the maximum total profit with unlimited transactions.
     *
     * @param prices daily prices, oldest first
     * @return the best achievable total profit
     */
    public static int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
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
 * Problem: Best Time to Buy and Sell Stock II
 * LeetCode: 122 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Running difference
 *
 * <p>Problem:
 * You are given an array {@code prices} where {@code prices[i]} is the price of a given
 * stock on day {@code i}. You may buy and sell as often as you like, but you may only hold
 * one share at a time. Return the maximum total profit.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 7 1 5 3 6 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: every positive day-to-day difference can be captured independently, because
 * we may sell and re-buy on consecutive days for free. Summing all positive differences
 * is therefore optimal.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the maximum total profit with unlimited transactions.
     *
     * @param prices daily prices, oldest first
     * @return the best achievable total profit
     */
    public static int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
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
# Best Time to Buy and Sell Stock II — LeetCode 122

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Running difference |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

You are given an array \`prices\` where \`prices[i]\` is the price of a stock on day \`i\`.

- You may buy and sell as **often as you like**.
- You may hold **at most one** share at a time.
- Return the **maximum total profit**.

## Input Format

\`\`\`
n
prices[0] prices[1] ... prices[n-1]
\`\`\`

- \`n\` — number of days (1 ≤ n ≤ 10⁵)
- \`prices\` — n space-separated integers, oldest first

## Sample Input

\`\`\`
7
7 1 5 3 6 4
\`\`\`

## Expected Output

\`\`\`
7
\`\`\`

Buy at \`1\` → sell at \`5\` (profit 4), buy at \`3\` → sell at \`6\` (profit 3). Total = **7**.

## Approach — Sum the Positive Differences

The tempting mistake is to look for valleys and peaks. There is a much simpler way.

**Key insight:** because you may sell and re-buy on the same day for free, any single
rise from day \`i-1\` to day \`i\` can be captured on its own. A "buy at 1, sell at 6" trade
decomposes into buying at 1 and re-buying at 5 on the way up, which is exactly the same
profit.

So the answer is the sum of every **positive** day-to-day difference:

\`\`\`
profit = Σ max(0, prices[i] - prices[i-1])
\`\`\`

**Why it works (upper bound):** no strategy can earn more than the total upward movement
of the price, because that upward movement is exactly what a share gains while you hold
it. **Why it is achievable:** hold the share through every rising stretch and flatten out
during the falling ones — which is precisely what the sum of positive differences buys.

## Dry Run

Input: \`prices = [7, 1, 5, 3, 6, 4]\`

| Step | i | \`prices[i-1]\` | \`prices[i]\` | difference | \`profit\` before | taken? | \`profit\` after |
|---:|---:|---:|---:|---:|---:|---|---:|
| 1 | 1 | 7 | 1 | −6 | 0 | no (not positive) | 0 |
| 2 | 2 | 1 | 5 | +4 | 0 | **yes** | 4 |
| 3 | 3 | 5 | 3 | −2 | 4 | no | 4 |
| 4 | 4 | 3 | 6 | +3 | 4 | **yes** | 7 |
| 5 | 5 | 6 | 4 | −2 | 7 | no | 7 |

Answer: **7**

## Java Solution

See [\`BestTimeToBuyAndSellStockII.java\`](./BestTimeToBuyAndSellStockII.java).

\`\`\`java
public static int maxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass |
| **Space** | O(1) | A single accumulator |

**Optimal?** Yes — O(n) time, O(1) space.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if there is a transaction fee \`f\`?"* → only take a rise when it exceeds \`f\`:
  \`if (prices[i] - prices[i-1] > f) profit += prices[i] - prices[i-1] - f;\`
- *"What if you can only hold at most \`k\` shares?"* → the answer becomes the \`k\` best
  non-overlapping rises; a heap or a DP over \`k\` handles it.
- *"How does this relate to the maximum subarray of the difference array?"* → the total
  upward movement is the sum of the positive entries of the difference array, i.e. the
  *maximum* subarray problem applied to \`max(0, diff)\`.
- *"Can I compute it in one pass without materialising the differences?"* → yes, that is
  exactly the code above.

**Common mistakes:**
- ❌ Trying to find local minima/maxima and pairing them up — it works but is longer and
  easier to get wrong on plateaus.
- ❌ Forgetting to start the loop at \`i = 1\` (there is no previous day for \`i = 0\`).
- ❌ Assuming you must sell before the next buy — here that is allowed, which is the whole
  reason the simple solution works.

**How to narrate:**
> "Because I can sell and re-buy on the same day at no cost, every upward move can be
> captured independently. So the maximum profit is the sum of all positive day-to-day
> differences. That's a single pass with O(1) space, and it also generalises nicely to
> transaction fees."

## Related Problems

- [Best Time to Buy and Sell Stock](BestTimeToBuyAndSellStock.md) — the single-transaction variant
- [Maximum Subarray](MaxSubarray.md) — Kadane over a difference array
- [Maximum Circular Subarray](MaxCircularSubarray.md) — the circular variant of Kadane
`,i=[`maxProfit`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};