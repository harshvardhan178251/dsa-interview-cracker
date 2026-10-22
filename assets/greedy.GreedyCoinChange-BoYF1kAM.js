var e=`greedy.GreedyCoinChange`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Coin Change with Greedy
 * LeetCode: none | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Largest denomination first
 *
 * <p>Problem:
 * Given an amount and a set of coin denominations, return the minimum number of coins
 * needed to make up that amount using the greedy strategy — always take as many coins as
 * possible of the largest denomination that still fits. Return {@code -1} when the
 * amount cannot be made up.
 *
 * <p>The greedy strategy is optimal for a <em>canonical</em> coin system such as
 * {@code 1, 5, 10, 25} (or any currency where every denomination is a multiple of the
 * one below it). For an arbitrary coin set the greedy answer can be larger than the
 * optimum and a dynamic program is required.
 *
 * <p>Input format (stdin):
 * <pre>
 * amount
 * k
 * coins[0] coins[1] ... coins[k-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 63
 * 4
 * 1 5 10 25
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: sort the denominations descending and, for each of them, take
 * {@code amount / coin} coins and shrink the remaining amount. Stop as soon as the
 * amount reaches zero.
 *
 * <p>Complexity: Time O(k log k), Space O(k).
 */
public class GreedyCoinChange {

    /**
     * Returns the number of coins the greedy strategy uses for {@code amount}.
     *
     * @param amount amount to make up, {@code amount >= 0}
     * @param coins  the available denominations
     * @return the number of coins, or {@code -1} when the amount cannot be made up
     */
    public static int minCoins(int amount, int[] coins) {
        if (amount <= 0) {
            return 0;
        }
        if (coins == null || coins.length == 0) {
            return -1;
        }
        int[] sorted = coins.clone();
        Arrays.sort(sorted);

        int used = 0;
        int remaining = amount;
        for (int i = sorted.length - 1; i >= 0 && remaining > 0; i--) {
            int coin = sorted[i];
            if (coin <= 0) {
                continue;
            }
            int take = remaining / coin;
            if (take > 0) {
                used += take;
                remaining -= take * coin;
            }
        }
        return remaining == 0 ? used : -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int amount = fs.nextInt();
        int k = fs.nextInt();
        int[] coins = fs.nextIntArray(k);

        System.out.println(minCoins(amount, coins));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Coin Change with Greedy
 * LeetCode: none | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Largest denomination first
 *
 * <p>Problem:
 * Given an amount and a set of coin denominations, return the minimum number of coins
 * needed to make up that amount using the greedy strategy — always take as many coins as
 * possible of the largest denomination that still fits. Return {@code -1} when the
 * amount cannot be made up.
 *
 * <p>The greedy strategy is optimal for a <em>canonical</em> coin system such as
 * {@code 1, 5, 10, 25} (or any currency where every denomination is a multiple of the
 * one below it). For an arbitrary coin set the greedy answer can be larger than the
 * optimum and a dynamic program is required.
 *
 * <p>Input format (stdin):
 * <pre>
 * amount
 * k
 * coins[0] coins[1] ... coins[k-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 63
 * 4
 * 1 5 10 25
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: sort the denominations descending and, for each of them, take
 * {@code amount / coin} coins and shrink the remaining amount. Stop as soon as the
 * amount reaches zero.
 *
 * <p>Complexity: Time O(k log k), Space O(k).
 */
public class Main {

    /**
     * Returns the number of coins the greedy strategy uses for {@code amount}.
     *
     * @param amount amount to make up, {@code amount >= 0}
     * @param coins  the available denominations
     * @return the number of coins, or {@code -1} when the amount cannot be made up
     */
    public static int minCoins(int amount, int[] coins) {
        if (amount <= 0) {
            return 0;
        }
        if (coins == null || coins.length == 0) {
            return -1;
        }
        int[] sorted = coins.clone();
        Arrays.sort(sorted);

        int used = 0;
        int remaining = amount;
        for (int i = sorted.length - 1; i >= 0 && remaining > 0; i--) {
            int coin = sorted[i];
            if (coin <= 0) {
                continue;
            }
            int take = remaining / coin;
            if (take > 0) {
                used += take;
                remaining -= take * coin;
            }
        }
        return remaining == 0 ? used : -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int amount = fs.nextInt();
        int k = fs.nextInt();
        int[] coins = fs.nextIntArray(k);

        System.out.println(minCoins(amount, coins));
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
# Coin Change with Greedy

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Largest denomination first |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an \`amount\` and a set of coin denominations, return the number of coins the
**greedy strategy** uses to make up that amount: always take as many coins as possible
of the largest denomination that still fits.

- Return \`-1\` when the amount cannot be made up.
- The greedy strategy is optimal for a **canonical** coin system such as \`1, 5, 10, 25\`
  (every denomination is a multiple of the one below it). For an arbitrary coin set
  the greedy answer can be larger than the true minimum — see *Interview Notes*.

## Input Format

The program reads from standard input:

\`\`\`
amount
k
coins[0] coins[1] ... coins[k-1]
\`\`\`

- \`amount\` — the amount to make up (0 ≤ amount ≤ 10⁹)
- \`k\` — number of denominations (1 ≤ k ≤ 100)
- \`coins\` — k space-separated positive denominations

## Sample Input

\`\`\`
63
4
1 5 10 25
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

\`25 + 25 + 10 + 1 + 1 + 1 = 63\` — six coins, which is also the true optimum.

## Approach — take the biggest coin that fits

Sort the denominations in descending order. For each denomination \`c\`:

- take \`amount / c\` coins of it (as many as still fit),
- shrink the remaining amount by \`take * c\`,
- move on to the next denomination.

When the remaining amount reaches \`0\` the job is done; if it is still positive after
the smallest denomination, the amount cannot be made up.

**Exchange argument (why the greedy choice is safe on a canonical system):** on a
canonical system, replacing \`k\` coins of a smaller denomination by one coin of the
next larger denomination never increases the number of coins and never changes the
total value — that is exactly what "canonical" means. Any solution that uses a
smaller coin where a larger one fits can therefore be rewritten without using more
coins, so a solution that always takes the largest possible coin is optimal.

**The counter-example to remember:** for the coin set \`{1, 3, 4}\` and amount \`6\` the
greedy takes \`4 + 1 + 1\` (3 coins) while the optimum is \`3 + 3\` (2 coins). The greedy
is only correct when the denominations are canonical — for a general system use the
dynamic program of [Coin Change](../dynamicprogramming/CoinChange.java).

## Dry Run

Input: \`amount = 63\`, coins \`1, 5, 10, 25\` (sorted descending: \`25, 10, 5, 1\`)

| Step | coin | remaining before | \`remaining / coin\` | coins taken | remaining after | coins used |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 25 | 63 | \`63 / 25 = 2\` | 2 | \`63 - 50 = 13\` | 2 |
| 2 | 10 | 13 | \`13 / 10 = 1\` | 1 | \`13 - 10 = 3\` | 3 |
| 3 | 5 | 3 | \`3 / 5 = 0\` | 0 | 3 | 3 |
| 4 | 1 | 3 | \`3 / 1 = 3\` | 3 | \`3 - 3 = 0\` | 6 |

The remaining amount is \`0\` → the answer is **6**.

### Trace where it is impossible — \`amount = 7\`, coins \`2, 4\`

| Step | coin | remaining before | taken | remaining after |
|---:|---:|---:|---:|---:|
| 1 | 4 | 7 | \`7 / 4 = 1\` | 3 |
| 2 | 2 | 3 | \`3 / 2 = 1\` | 1 |

The remaining amount is \`1\` and no coin of value \`1\` exists → the answer is **-1**.

## Java Solution

See [\`GreedyCoinChange.java\`](./GreedyCoinChange.java).

\`\`\`java
public static int minCoins(int amount, int[] coins) {
    if (amount <= 0) {
        return 0;
    }
    int[] sorted = coins.clone();
    Arrays.sort(sorted);

    int used = 0;
    int remaining = amount;
    for (int i = sorted.length - 1; i >= 0 && remaining > 0; i--) {
        int coin = sorted[i];
        if (coin <= 0) {
            continue;
        }
        int take = remaining / coin;
        if (take > 0) {
            used += take;
            remaining -= take * coin;
        }
    }
    return remaining == 0 ? used : -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(k log k) | one sort plus one linear pass |
| **Space** | O(k) | a copy of the denominations, sorted |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the coin system is not canonical?"* → the greedy can be wrong; use the
  O(amount × k) dynamic program. Say this out loud — it is the whole point of the
  question.
- *"What if you have a limited number of each coin?"* → the greedy breaks immediately
  (take \`amount / c\` is no longer valid); it becomes a bounded knapsack.
- *"How do you check whether a system is canonical?"* → try small amounts and compare
  the greedy result with the DP result; there is no cheap closed form.

**Common mistakes:**
- ❌ Claiming the greedy is always optimal — it is only optimal for canonical systems.
- ❌ Returning the number of coins for a system where the amount cannot be made up
  instead of \`-1\`.
- ❌ Forgetting that a denomination of \`0\` would cause an infinite loop — the code
  skips non-positive coins.

**How to narrate:**
> "I'll sort the denominations and always take as many as possible of the largest one
> that fits. This is optimal on a canonical system like \`1, 5, 10, 25\`, because a
> group of smaller coins can always be swapped for one larger coin without increasing
> the coin count. I should mention that for a non-canonical system like \`1, 3, 4\` the
> greedy is not optimal and a DP would be required."

## Related Problems

- [Coin Change](../dynamicprogramming/CoinChange.java) — the DP that works for every system
- [Minimum Number of Refueling Stops](./MinimumNumberOfRefuelingStops.md) — the other "largest value first" greedy
`,i=[`minCoins`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};