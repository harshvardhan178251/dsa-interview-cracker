var e=`dynamicprogramming.CoinChange`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;
import java.util.Arrays;

/**
 * Problem: Coin Change
 * LeetCode: 322 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Unbounded knapsack, Bottom-up DP
 *
 * <p>Problem: Given unlimited coins of each denomination, return the fewest coins that add up to a target amount, or {@code -1} when the amount cannot be made.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * coins[0] coins[1] ... coins[n-1]
 * amount
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 5
 * 11
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: For every amount, try every coin as the last coin used and keep the smallest resulting count.
 *
 * <p>Complexity: Time O(n x amount), Space O(amount).
 */
public class CoinChange {

    /**
     * Returns the fewest coins that add up to {@code amount}, or {@code -1} if it is impossible.
     *
     * <p>{@code dp[a]} = the minimum number of coins needed to make {@code a}. The last coin used is
     * some {@code coins[j]}, so {@code dp[a] = 1 + min(dp[a - coins[j]])} over all usable coins.
     *
     * @param coins  the available denominations (unlimited copies of each)
     * @param amount the target sum
     * @return the minimum number of coins, or {@code -1} when the amount cannot be formed
     */
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (coin <= a && dp[a - coin] != Integer.MAX_VALUE) {
                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] coins = fs.nextIntArray(n);
        int amount = fs.nextInt();

        System.out.println(coinChange(coins, amount));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Coin Change
 * LeetCode: 322 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Unbounded knapsack, Bottom-up DP
 *
 * <p>Problem: Given unlimited coins of each denomination, return the fewest coins that add up to a target amount, or {@code -1} when the amount cannot be made.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * coins[0] coins[1] ... coins[n-1]
 * amount
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 5
 * 11
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: For every amount, try every coin as the last coin used and keep the smallest resulting count.
 *
 * <p>Complexity: Time O(n x amount), Space O(amount).
 */
public class Main {

    /**
     * Returns the fewest coins that add up to {@code amount}, or {@code -1} if it is impossible.
     *
     * <p>{@code dp[a]} = the minimum number of coins needed to make {@code a}. The last coin used is
     * some {@code coins[j]}, so {@code dp[a] = 1 + min(dp[a - coins[j]])} over all usable coins.
     *
     * @param coins  the available denominations (unlimited copies of each)
     * @param amount the target sum
     * @return the minimum number of coins, or {@code -1} when the amount cannot be formed
     */
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (coin <= a && dp[a - coin] != Integer.MAX_VALUE) {
                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] coins = fs.nextIntArray(n);
        int amount = fs.nextInt();

        System.out.println(coinChange(coins, amount));
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
`,r='\n# Coin Change — LeetCode 322\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Unbounded knapsack · Bottom-up DP |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |\n\n## Problem Statement\n\nYou have an unlimited number of each coin denomination. Return the **fewest** coins needed to make up `amount`. If it cannot be made, return `-1`.\n\n- `coins[i]` — the value of the `i`-th coin\n- `amount` — the target sum\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\ncoins[0] coins[1] ... coins[n-1]\namount\n```\n\n- `n` — number of coin denominations (1 ≤ n ≤ 12)\n- `coins` — n space-separated positive integers (`coin[i] == 1` always exists)\n- `amount` — the target amount (1 ≤ amount ≤ 10⁴)\n\n## Sample Input\n\n```\n3\n1 2 5\n11\n```\n\n## Expected Output\n\n```\n3\n```\n\n`5 + 5 + 1 = 11` uses only three coins, and no two-coin sum reaches 11.\n\n## Approach\n\nThis is the **unbounded knapsack** (min-coins) problem. The greedy choice "always take the biggest coin that fits" is wrong: for `coins = [1, 3, 4]` and `amount = 6` greedy takes `4 + 1 + 1` (three coins) while the optimum is `3 + 3` (two coins).\n\nThe DP state is the amount:\n\n1. `dp[a]` = the minimum number of coins needed to make exactly `a`.\n2. `dp[0] = 0`; everything else starts at "unreachable" (`Integer.MAX_VALUE`).\n3. For each amount `a` and each coin `c ≤ a`, use `c` as the **last** coin:\n   `dp[a] = min(dp[a], dp[a - c] + 1)`.\n4. If `dp[amount]` is still unreachable, return `-1`.\n\nBecause the coin list is processed for every amount (not the other way round), the same denomination may be used any number of times — that is what makes it *unbounded*.\n\n## Dry Run\n\nInput: `coins = [1, 2, 5]`, `amount = 11`. The table has one cell per amount.\n\n| amount `a` | `dp[a-1]` (coin 1) | `dp[a-2]` (coin 2) | `dp[a-5]` (coin 5) | `dp[a]` | winning coin |\n|---:|---:|---:|---:|---:|---|\n| 0 | — | — | — | **0** | base case |\n| 1 | 0 + 1 = 1 | — | — | **1** | 1 |\n| 2 | 1 + 1 = 2 | 0 + 1 = 1 | — | **1** | 2 |\n| 3 | 1 + 1 = 2 | 1 + 1 = 2 | — | **2** | 1 or 2 |\n| 4 | 2 + 1 = 3 | 2 + 1 = 3 | — | **2** | 2 |\n| 5 | 2 + 1 = 3 | 2 + 1 = 3 | 0 + 1 = 1 | **1** | 5 |\n| 6 | 1 + 1 = 2 | 2 + 1 = 3 | 1 + 1 = 2 | **2** | 1 or 5 |\n| 7 | 2 + 1 = 3 | 1 + 1 = 2 | 2 + 1 = 3 | **2** | 2 |\n| 8 | 2 + 1 = 3 | 2 + 1 = 3 | 1 + 1 = 2 | **3** | 5 |\n| 9 | 3 + 1 = 4 | 2 + 1 = 3 | 2 + 1 = 3 | **3** | 2 or 5 |\n| 10 | 3 + 1 = 4 | 3 + 1 = 4 | 1 + 1 = 2 | **2** | 5 |\n| 11 | 2 + 1 = 3 | 3 + 1 = 4 | 2 + 1 = 3 | **3** | 1 |\n\nFull table: `dp = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]` → answer **3**.\n\n**Greedy is not optimal.** With `coins = [1, 3, 4]` and `amount = 6`, greedy takes `4 + 1 + 1` = three coins, while the DP finds `3 + 3` = two coins. The DP is the only safe answer.\n\n**The `-1` case.** If no coin divides the amount — e.g. `coins = [3]`, `amount = 7` — every `dp[a]` stays at `Integer.MAX_VALUE` and the method returns `-1`.\n\n## Java Solution\n\nSee [`CoinChange.java`](./CoinChange.java).\n\n```java\n    public static int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, Integer.MAX_VALUE);\n        dp[0] = 0;\n\n        for (int a = 1; a <= amount; a++) {\n            for (int coin : coins) {\n                if (coin <= a && dp[a - coin] != Integer.MAX_VALUE) {\n                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · amount) | `amount + 1` states, each trying every coin |\n| **Space** | O(amount) | the `dp` array holds `amount + 1` entries |\n\n**Space can be `O(amount)`** — that is what we use. There is no simple `O(1)` version because the amounts are visited out of order.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "How many **ways** are there to make the amount?"* → that is [Coin Change II — LeetCode 518](./CoinChangeII.java), same table, different aggregation (sum instead of min).\n- "What if each coin can be used only once?"* → 0/1 knapsack: iterate the coins in the outer loop.\n- "Reconstruct the coins used."* → keep a `choice[a]` array remembering which coin won the `min`.\n- "Why is greedy wrong?"* → the `[1, 3, 4]` / `6` counter-example.\n\n**Common mistakes:**\n\n- ❌ Using `Integer.MAX_VALUE` without the `dp[a - coin] != Integer.MAX_VALUE` guard — the addition overflows into a negative number.\n- ❌ Looping over the coins in the outer loop and the amounts in the inner loop with the *same* formula — that silently turns the problem into the 0/1 variant.\n- ❌ Forgetting `dp[0] = 0`, which makes every other entry unreachable.\n\n**How to narrate:**\n\n> "Greedy is wrong here — taking the largest coin first can cost extra coins. I define `dp[a]` as the minimum number of coins to make `a`. Every solution ends with some coin `c`, so I try each coin as the last one: `dp[a] = min(dp[a], dp[a-c] + 1)`. Amounts are computed in increasing order, so `dp[a-c]` is always ready, and the coin list is scanned inside the amount loop, which is what allows unlimited copies."\n\n## Related Problems\n\n- [Coin Change II — LeetCode 518](./CoinChangeII.java) — count the ways instead of minimising\n- [Target Sum — LeetCode 494](./TargetSum.java) — the subset-sum cousin\n- [Rod Cutting](./RodCutting.java) — unbounded knapsack with values\n',i=[`coinChange`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};