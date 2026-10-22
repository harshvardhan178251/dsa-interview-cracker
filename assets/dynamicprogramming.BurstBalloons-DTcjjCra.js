var e=`dynamicprogramming.BurstBalloons`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Burst Balloons
 * LeetCode: 312 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Interval DP, Bottom-up DP
 *
 * <p>Problem: Burst every balloon for the maximum number of coins. A balloon earns the product of its value and the values of its two neighbours at the moment it is burst.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 3 1 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 35
 * </pre>
 *
 * <p>Approach: Ask "which balloon is burst **last** in this interval?" -- then its neighbours are known and the interval splits in two.
 *
 * <p>Complexity: Time O(n^3), Space O(n^2).
 */
public class BurstBalloons {

    /**
     * Returns the maximum number of coins obtainable by bursting all balloons.
     *
     * <p>The balloons are padded with two virtual balloons of value {@code 1}. {@code dp[l][r]} is
     * the best score for bursting everything strictly between {@code l} and {@code r} while those two
     * balloons stay alive. Choosing the last balloon {@code k} of that interval fixes its neighbours,
     * so the interval splits into two independent sub-intervals.
     *
     * @param nums the value of each balloon
     * @return the maximum number of coins
     */
    public static int maxBurst(int[] nums) {
        int n = nums.length;
        int[] balloons = new int[n + 2];
        balloons[0] = 1;
        balloons[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            balloons[i + 1] = nums[i];
        }

        int[][] dp = new int[n + 2][n + 2];
        for (int left = n; left >= 0; left--) {
            for (int right = left + 1; right <= n + 1; right++) {
                for (int last = left + 1; last < right; last++) {
                    int coins = balloons[left] * balloons[last] * balloons[right]
                            + dp[left][last] + dp[last][right];
                    dp[left][right] = Math.max(dp[left][right], coins);
                }
            }
        }
        return dp[0][n + 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxBurst(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Burst Balloons
 * LeetCode: 312 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Interval DP, Bottom-up DP
 *
 * <p>Problem: Burst every balloon for the maximum number of coins. A balloon earns the product of its value and the values of its two neighbours at the moment it is burst.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 3 1 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 35
 * </pre>
 *
 * <p>Approach: Ask "which balloon is burst **last** in this interval?" -- then its neighbours are known and the interval splits in two.
 *
 * <p>Complexity: Time O(n^3), Space O(n^2).
 */
public class Main {

    /**
     * Returns the maximum number of coins obtainable by bursting all balloons.
     *
     * <p>The balloons are padded with two virtual balloons of value {@code 1}. {@code dp[l][r]} is
     * the best score for bursting everything strictly between {@code l} and {@code r} while those two
     * balloons stay alive. Choosing the last balloon {@code k} of that interval fixes its neighbours,
     * so the interval splits into two independent sub-intervals.
     *
     * @param nums the value of each balloon
     * @return the maximum number of coins
     */
    public static int maxBurst(int[] nums) {
        int n = nums.length;
        int[] balloons = new int[n + 2];
        balloons[0] = 1;
        balloons[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            balloons[i + 1] = nums[i];
        }

        int[][] dp = new int[n + 2][n + 2];
        for (int left = n; left >= 0; left--) {
            for (int right = left + 1; right <= n + 1; right++) {
                for (int last = left + 1; last < right; last++) {
                    int coins = balloons[left] * balloons[last] * balloons[right]
                            + dp[left][last] + dp[last][right];
                    dp[left][right] = Math.max(dp[left][right], coins);
                }
            }
        }
        return dp[0][n + 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxBurst(nums));
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
`,r='\n# Burst Balloons — LeetCode 312\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Interval DP · Bottom-up DP |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nYou are given `n` balloons. The `i`-th balloon has the value `nums[i]`. Burst a balloon and you collect `nums[i-1] × nums[i] × nums[i+1]` coins — where the neighbours are the balloons that are still alive at that moment (a missing neighbour counts as `1`).\n\nReturn the **maximum** number of coins you can collect by bursting every balloon.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — number of balloons (1 ≤ n ≤ 100)\n- `nums` — n space-separated non-negative integers\n\n## Sample Input\n\n```\n3\n3 1 5\n```\n\n## Expected Output\n\n```\n35\n```\n\nBurst the `1` first (`3 × 1 × 5 = 15`), then the `3` (`1 × 3 × 5 = 15`), then the `5` (`1 × 5 × 1 = 5`) → `35`.\n\n## Approach\n\n**The insight is to pick the LAST balloon of an interval, not the first.**\n\nThe naive state "the best score for the interval `[i, j]`" is broken, because bursting order changes the neighbours. But if we ask *"which balloon is burst last inside this interval?"*, then at that moment its two neighbours are exactly the balloons that frame the interval — and those are known.\n\n1. Pad the array with two virtual balloons of value `1`: `a = [1, nums…, 1]`.\n2. `dp[l][r]` = the best score for bursting everything **strictly between** `l` and `r`, while    `l` and `r` stay alive.\n3. If balloon `k` (with `l < k < r`) is burst last, its neighbours are `a[l]` and `a[r]`, so it    earns `a[l] × a[k] × a[r]`, and the two sub-intervals are independent:\n   `dp[l][r] = max over k of ( dp[l][k] + dp[k][r] + a[l]·a[k]·a[r] )`.\n4. The answer is `dp[0][n+1]`.\n\nThe table is filled with `left` decreasing and `right` increasing, so both sub-intervals are already known when a cell is computed.\n\n## Dry Run\n\nInput: `nums = [3, 1, 5]` → padded `a = [1, 3, 1, 5, 1]` (indices 0 … 4).\n\n| `dp[l][r]` | last balloon `k` | computation | value |\n|---|---|---|---:|\n| `dp[0][2]` | 1 | `dp[0][1] + dp[1][2] + 1·3·1 = 0 + 0 + 3` | **3** |\n| `dp[1][3]` | 2 | `dp[1][2] + dp[2][3] + 3·1·5 = 15` | **15** |\n| `dp[2][4]` | 3 | `dp[2][3] + dp[3][4] + 1·5·1 = 5` | **5** |\n| `dp[0][3]` | 1 or 2 | `max(0 + 15 + 15, 3 + 0 + 5) = 30` | **30** |\n| `dp[1][4]` | 2 or 3 | `max(0 + 5 + 3, 15 + 0 + 15) = 30` | **30** |\n| `dp[0][4]` | 1, 2 or 3 | `max(0 + 30 + 3, 3 + 5 + 1, 30 + 0 + 5) = 35` | **35** |\n\nFull table: `dp[0][4] = 35` → answer **35**.\n\n**The whole table** (rows `l`, columns `r`, `-` means not applicable):\n\n| | r=0 | r=1 | r=2 | r=3 | r=4 |\n|---|---:|---:|---:|---:|---:|\n| l=0 | – | 0 | 3 | 30 | **35** |\n| l=1 | – | – | 0 | 15 | 30 |\n| l=2 | – | – | – | 0 | 5 |\n| l=3 | – | – | – | – | 0 |\n\n**The optimal order** for `[3, 1, 5]`:\n\n| step | balloon burst | coins | why |\n|---:|---|---:|---|\n| 1 | `1` (middle) | `3 × 1 × 5 = 15` | it separates the two big ones |\n| 2 | `3` | `1 × 3 × 5 = 15` | its neighbours are now the virtual `1` and the `5` |\n| 3 | `5` | `1 × 5 × 1 = 5` | only the virtual balloons are left |\n\nTotal `15 + 15 + 5 = 35` ✓\n\n## Java Solution\n\nSee [`BurstBalloons.java`](./BurstBalloons.java).\n\n```java\n    public static int maxBurst(int[] nums) {\n        int n = nums.length;\n        int[] balloons = new int[n + 2];\n        balloons[0] = 1;\n        balloons[n + 1] = 1;\n        for (int i = 0; i < n; i++) {\n            balloons[i + 1] = nums[i];\n        }\n\n        int[][] dp = new int[n + 2][n + 2];\n        for (int left = n; left >= 0; left--) {\n            for (int right = left + 1; right <= n + 1; right++) {\n                for (int last = left + 1; last < right; last++) {\n                    int coins = balloons[left] * balloons[last] * balloons[right]\n                            + dp[left][last] + dp[last][right];\n                    dp[left][right] = Math.max(dp[left][right], coins);\n                }\n            }\n        }\n        return dp[0][n + 1];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n³) | `O(n²)` intervals, each trying `O(n)` last balloons |\n| **Space** | O(n²) | the `(n + 2) × (n + 2)` table |\n\n**Space `O(n²)`.** The table cannot be rolled up easily, because each cell reads two sub-intervals that are not adjacent in the filling order.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Why do we need the virtual balloons?"* → they model the "missing neighbour counts as 1" rule and make the answer a single cell, `dp[0][n+1]`.\n- "Why can we not just pick the biggest balloon first?"* → because bursting a balloon changes the neighbours of its neighbours; the order matters and greedy fails.\n- "How is this related to matrix chain multiplication?"* → it is the same interval DP with a different score function.\n- "Can it be `O(n²)`?"* → not with the classic formulation; the `O(n³)` DP is the standard answer.\n\n**Common mistakes:**\n\n- ❌ Forgetting the virtual `1` balloons and then special-casing the edges.\n- ❌ Choosing the **first** balloon of the interval instead of the last — the neighbours are then unknown and the recurrence does not close.\n- ❌ Filling the table with `left` increasing (the sub-intervals would not be ready yet).\n\n**How to narrate:**\n\n> "The trick is to decide the **last** balloon of an interval, not the first. I pad the array with two virtual balloons of value 1, and `dp[l][r]` is the best score for bursting everything between `l` and `r` while they stay alive. If balloon `k` goes last, its neighbours are exactly `l` and `r`, so the score is `dp[l][k] + dp[k][r] + a[l]*a[k]*a[r]`, and I take the best `k`. That is `O(n³)` time and `O(n²)` space."\n\n## Related Problems\n\n- [Longest Palindromic Subsequence](./PalindromicSubstrings.java) — interval DP on strings\n- [Unique Paths — LeetCode 62](./UniquePaths.java) — the 2-D DP baseline\n',i=[`maxBurst`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};