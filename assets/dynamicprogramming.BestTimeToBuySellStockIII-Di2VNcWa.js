var e=`dynamicprogramming.BestTimeToBuySellStockIII`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Best Time to Buy and Sell Stock III
 * LeetCode: 123 | Difficulty: Hard | Frequency: 4/5
 * Pattern: State-compression DP, Greedy
 *
 * <p>Problem: Return the maximum profit achievable with **at most two** buy/sell transactions.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 3 3 5 0 0 3 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Keep four states -- the best profit after each of the four phases of two transactions -- and update them in one pass.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class BestTimeToBuySellStockIII {

    /**
     * Returns the maximum profit with at most two buy / sell transactions.
     *
     * <p>Four states are tracked: the best profit while holding the first share, after selling it, while
     * holding the second share, and after selling that one. Every state is updated from the previous
     * day's values, so the day is used at most once.
     *
     * @param prices the price on each day
     * @return the maximum profit
     */
    public static int maxProfit(int[] prices) {
        if (prices.length < 2) {
            return 0;
        }

        int buyOne = -prices[0];   // best profit while holding the first share
        int sellOne = 0;           // best profit after selling the first share
        int buyTwo = -prices[0];   // best profit while holding the second share
        int sellTwo = 0;           // best profit after selling both shares

        for (int i = 1; i < prices.length; i++) {
            int price = prices[i];
            buyOne = Math.max(buyOne, -price);
            sellOne = Math.max(sellOne, buyOne + price);
            buyTwo = Math.max(buyTwo, sellOne - price);
            sellTwo = Math.max(sellTwo, buyTwo + price);
        }
        return sellTwo;
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
 * Problem: Best Time to Buy and Sell Stock III
 * LeetCode: 123 | Difficulty: Hard | Frequency: 4/5
 * Pattern: State-compression DP, Greedy
 *
 * <p>Problem: Return the maximum profit achievable with **at most two** buy/sell transactions.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 3 3 5 0 0 3 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Keep four states -- the best profit after each of the four phases of two transactions -- and update them in one pass.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the maximum profit with at most two buy / sell transactions.
     *
     * <p>Four states are tracked: the best profit while holding the first share, after selling it, while
     * holding the second share, and after selling that one. Every state is updated from the previous
     * day's values, so the day is used at most once.
     *
     * @param prices the price on each day
     * @return the maximum profit
     */
    public static int maxProfit(int[] prices) {
        if (prices.length < 2) {
            return 0;
        }

        int buyOne = -prices[0];   // best profit while holding the first share
        int sellOne = 0;           // best profit after selling the first share
        int buyTwo = -prices[0];   // best profit while holding the second share
        int sellTwo = 0;           // best profit after selling both shares

        for (int i = 1; i < prices.length; i++) {
            int price = prices[i];
            buyOne = Math.max(buyOne, -price);
            sellOne = Math.max(sellOne, buyOne + price);
            buyTwo = Math.max(buyTwo, sellOne - price);
            sellTwo = Math.max(sellTwo, buyTwo + price);
        }
        return sellTwo;
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
# Best Time to Buy and Sell Stock III — LeetCode 123

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | State-compression DP · Greedy |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Bloomberg |

## Problem Statement

You are given an array \`prices\` where \`prices[i]\` is the price of a stock on day \`i\`.

You may complete **at most two** transactions (buy one share and sell it, then do that once more), and you may not hold two shares at the same time. Return the **maximum profit** you can achieve.

A transaction means buying and then selling — selling without having bought is not allowed.

## Input Format

The program reads from standard input:

\`\`\`
n
prices[0] prices[1] ... prices[n-1]
\`\`\`

- \`n\` — number of days (1 ≤ n ≤ 10⁵)
- \`prices\` — n space-separated integers (0 ≤ prices[i] ≤ 10⁴)

## Sample Input

\`\`\`
8
3 3 5 0 0 3 1 4
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

Buy at 3 and sell at 5 (profit 2), then buy at 0 and sell at 4 (profit 4) → **6**.

## Approach

Two transactions mean four phases, and each phase has a state:

| state | meaning |
|---|---|
| \`buyOne\` | the best profit while **holding** the first share (it is negative — you paid for it) |
| \`sellOne\` | the best profit after **selling** the first share |
| \`buyTwo\` | the best profit while holding the second share (the first transaction is already banked) |
| \`sellTwo\` | the best profit after selling both shares |

For every price \`p\`:

\`\`\`
buyOne  = max(buyOne,  -p)          // buy today
sellOne = max(sellOne, buyOne + p)  // sell today
buyTwo  = max(buyTwo,  sellOne - p) // buy the second share today
sellTwo = max(sellTwo, buyTwo + p)  // sell the second share today
\`\`\`

Each line either keeps the old value or takes the better of the old value and the new one. Because the states are updated **in this order**, a single day can never be used for both a buy and a sell of the same share.

The answer is \`sellTwo\` — it is \`0\` when no profitable transaction exists.

## Dry Run

Input: \`prices = [3, 3, 5, 0, 0, 3, 1, 4]\`.

| day | price | \`buyOne\` | \`sellOne\` | \`buyTwo\` | \`sellTwo\` |
|---:|---:|---:|---:|---:|---:|
| init | 3 | −3 | 0 | −3 | 0 |
| 1 | 3 | −3 | 0 | −3 | 0 |
| 2 | 5 | −3 | **2** | −3 | **2** |
| 3 | 0 | **0** | 2 | **2** | 2 |
| 4 | 0 | 0 | 2 | 2 | 2 |
| 5 | 3 | 0 | **3** | 2 | **5** |
| 6 | 1 | 0 | 3 | 2 | 5 |
| 7 | 4 | 0 | 4 | 2 | **6** |

\`sellTwo = 6\` → answer **6**.

**The two transactions behind the answer.**

| transaction | buy | sell | profit |
|---|---|---|---:|
| 1 | day 0 (price 3) | day 2 (price 5) | 2 |
| 2 | day 3 (price 0) | day 7 (price 4) | 4 |

Total \`2 + 4 = 6\`.

**The important update order.** On day 3 (price 0) \`buyOne\` becomes \`0\` — buying at 0 is better than buying at 3 — and only *after* that does \`buyTwo\` use the improved \`sellOne\`. If the states were updated in a different order, one day could be used twice.

**"At most two" is handled for free.** The initial values are \`0\`, so doing fewer than two transactions is always allowed: \`sellOne\` alone already holds the best single-transaction profit.

## Java Solution

See [\`BestTimeToBuySellStockIII.java\`](./BestTimeToBuySellStockIII.java).

\`\`\`java
    public static int maxProfit(int[] prices) {
        if (prices.length < 2) {
            return 0;
        }

        int buyOne = -prices[0];
        int sellOne = 0;
        int buyTwo = -prices[0];
        int sellTwo = 0;

        for (int i = 1; i < prices.length; i++) {
            int price = prices[i];
            buyOne = Math.max(buyOne, -price);
            sellOne = Math.max(sellOne, buyOne + price);
            buyTwo = Math.max(buyTwo, sellOne - price);
            sellTwo = Math.max(sellTwo, buyTwo + price);
        }
        return sellTwo;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass over the prices |
| **Space** | O(1) | four integers |

**Space \`O(1)\`.** The same four states can be written with explicit loops over the number of transactions, which is the usual generalisation to "at most \`k\` transactions".

## Interview Notes

**Follow-ups to raise yourself:**

- "What if there may be \`k\` transactions?"* → generalise to \`buy[t]\` / \`sell[t]\` arrays, \`O(n·k)\` time and \`O(k)\` space.
- "What if you may hold several shares at once?"* → the state becomes "how many shares do I hold", and the answer becomes a different (unbounded) problem.
- "Can you solve it greedily?"* → yes: the best single transaction, then the best transaction after it, but the "must be after" constraint makes it subtle — the DP is safer.
- "What if the fees are non-zero?"* → subtract the fee in the sell transitions.

**Common mistakes:**

- ❌ Updating the states in the wrong order and using the same day for a buy and a sell.
- ❌ Forgetting that \`buyOne\` and \`buyTwo\` are **negative** profits (money paid out).
- ❌ Returning \`sellOne\` instead of \`sellTwo\`.
- ❌ Assuming the two transactions must be on non-overlapping days — they only have to be in order.

**How to narrate:**

> "Two transactions mean four phases, so I keep four states: the best profit holding the first share, after selling it, holding the second share and after selling that one. Each day I either keep the old value or act today — buy, sell, buy, sell — and I update them in that order so a single day is never used twice. The answer is the last state, and because the states start at zero, doing fewer than two transactions is allowed for free."

## Related Problems

- [House Robber — LeetCode 198](./HouseRobber.java) — the take-or-skip baseline
- [Maximum Product Subarray — LeetCode 152](./MaximumProductSubarray.java) — running extremes
`,i=[`maxProfit`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};