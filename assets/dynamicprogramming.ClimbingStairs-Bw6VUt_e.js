var e=`dynamicprogramming.ClimbingStairs`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Climbing Stairs
 * LeetCode: 70 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bottom-up DP, Recursion + memoization
 *
 * <p>Problem: Count the distinct ways to climb {@code n} stairs when every move may take either 1 or 2 stairs.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: Every climb ends with either a 1-step (coming from stair n-1) or a 2-step (coming from stair n-2), so the answer is the sum of the answers for those two smaller problems.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ClimbingStairs {

    /**
     * Counts the distinct ways to climb {@code n} stairs using moves of one or two stairs.
     *
     * <p>{@code dp[i]} = ways to reach stair {@code i}. The last move is either a single step
     * (from {@code i - 1}) or a double step (from {@code i - 2}), therefore
     * {@code dp[i] = dp[i - 1] + dp[i - 2]}.
     *
     * @param n number of stairs
     * @return the number of ways to climb them; {@code 1} for {@code n == 0} (the empty climb)
     */
    public static int climbStairs(int n) {
        if (n <= 1) {
            return 1;
        }
        int[] dp = new int[n + 1];
        dp[0] = 1; // one way to stay on the ground: take no steps at all
        dp[1] = 1; // one way to reach stair 1: a single step
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(climbStairs(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Climbing Stairs
 * LeetCode: 70 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bottom-up DP, Recursion + memoization
 *
 * <p>Problem: Count the distinct ways to climb {@code n} stairs when every move may take either 1 or 2 stairs.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: Every climb ends with either a 1-step (coming from stair n-1) or a 2-step (coming from stair n-2), so the answer is the sum of the answers for those two smaller problems.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Counts the distinct ways to climb {@code n} stairs using moves of one or two stairs.
     *
     * <p>{@code dp[i]} = ways to reach stair {@code i}. The last move is either a single step
     * (from {@code i - 1}) or a double step (from {@code i - 2}), therefore
     * {@code dp[i] = dp[i - 1] + dp[i - 2]}.
     *
     * @param n number of stairs
     * @return the number of ways to climb them; {@code 1} for {@code n == 0} (the empty climb)
     */
    public static int climbStairs(int n) {
        if (n <= 1) {
            return 1;
        }
        int[] dp = new int[n + 1];
        dp[0] = 1; // one way to stay on the ground: take no steps at all
        dp[1] = 1; // one way to reach stair 1: a single step
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(climbStairs(n));
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
`,r='\n# Climbing Stairs — LeetCode 70\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Bottom-up DP · Recursion + memoization |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Adobe, Uber |\n\n## Problem Statement\n\nYou are climbing a staircase with `n` steps. Each time you can climb **one** or **two** steps. How many distinct ways can you reach the top?\n\nThe order of the moves matters: `1,2` and `2,1` are two different ways to climb three stairs.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the number of stairs to climb (1 ≤ n ≤ 45)\n\n## Sample Input\n\n```\n5\n```\n\n## Expected Output\n\n```\n8\n```\n\nThe eight ways are the eight possible arrangements of `1` and `2` steps whose sum is 5: `1+1+1+1+1`, `2+1+1+1`, `1+2+1+1`, `1+1+2+1`, `1+1+1+2`, `2+2+1`, `2+1+2`, `1+2+2`.\n\n## Approach\n\nA brute-force recursion `f(n) = f(n-1) + f(n-2)` explores a binary tree of depth `n`: `O(2ⁿ)` calls, and the sub-problems `f(n-1)` / `f(n-2)` are recomputed over and over.\n\nThe fix is the classic **bottom-up dynamic programme**:\n\n1. Define `dp[i]` = the number of ways to reach stair `i`.\n2. Base cases: `dp[0] = 1` (stay put — the empty climb) and `dp[1] = 1` (one single step).\n3. Transition: the last move onto stair `i` is either a 1-step or a 2-step, so\n   `dp[i] = dp[i-1] + dp[i-2]`.\n4. Fill the table left to right and return `dp[n]`.\n\nThe recurrence is the Fibonacci sequence, which is why `climbStairs(n)` equals `fib(n+1)`. You can also solve it with **top-down memoisation** (a hash map keyed by the stair number) — same `O(n)` work, but it also shows you how to spot the repeated sub-problems.\n\n## Dry Run\n\nInput: `n = 5`. The table `dp` has one slot per stair.\n\n| stair `i` | `dp[i-1]` | `dp[i-2]` | `dp[i]` | where `dp[i]` came from |\n|---:|---:|---:|---:|---|\n| 0 | — | — | **1** | base case — the empty climb |\n| 1 | — | — | **1** | base case — one single step |\n| 2 | `dp[1]` = 1 | `dp[0]` = 1 | **2** | `1 + 1` — last move is 1 step or 2 steps |\n| 3 | `dp[2]` = 2 | `dp[1]` = 1 | **3** | `2 + 1` |\n| 4 | `dp[3]` = 3 | `dp[2]` = 2 | **5** | `3 + 2` |\n| 5 | `dp[4]` = 5 | `dp[3]` = 3 | **8** | `5 + 3` |\n\nFull table: `dp = [1, 1, 2, 3, 5, 8]` → answer **8**.\n\n**Why the naive recursion is slow.** `climb(5)` expands into `climb(4) + climb(3)`, and `climb(4)` is evaluated twice (once through each branch). The number of calls is `O(2ⁿ)` — 32 calls for `n = 5`, and about a million for `n = 20`. The table version evaluates every stair exactly once.\n\n## Java Solution\n\nSee [`ClimbingStairs.java`](./ClimbingStairs.java).\n\n```java\n    public static int climbStairs(int n) {\n        if (n <= 1) {\n            return 1;\n        }\n        int[] dp = new int[n + 1];\n        dp[0] = 1;\n        dp[1] = 1;\n        for (int i = 2; i <= n; i++) {\n            dp[i] = dp[i - 1] + dp[i - 2];\n        }\n        return dp[n];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | one pass over the `n` stairs |\n| **Space** | O(n) | the `dp` array holds `n + 1` entries (it can be reduced to `O(1)` — see the notes) |\n\n**Space can be `O(1)`.** Only the previous two values are ever needed, so a rolling pair (`prev2`, `prev1`) replaces the array. The table is kept here because it is what you draw on the whiteboard.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Can you do it in `O(1)` space?"* → keep only the last two values; mention that the table was only for teaching.\n- "What if the moves are 1, 3 or 5 stairs?"* → generalise to `dp[i] = dp[i-1] + dp[i-3] + dp[i-5]`.\n- "What if you must use an even number of 2-steps?"* → keep a second table that also tracks parity.\n- "How is this related to Fibonacci?"* → `climbStairs(n) = fib(n + 1)`; the first two values coincide.\n- "Can you solve it recursively with memoisation?"* → yes, and show that the memo table is the same bottom-up table written top-down.\n\n**Common mistakes:**\n\n- ❌ Setting `dp[0] = 0` — that removes the "empty climb" and makes `climbStairs(1)` wrong for the recurrence (use `dp[0] = 1`).\n- ❌ Forgetting the base case for `n == 1` and reading `dp[-1]`.\n- ❌ Returning `dp[n-1]` or `fib(n)` instead of `dp[n] = fib(n+1)`.\n\n**How to narrate:**\n\n> "A brute-force recursion is exponential because `f(n)` calls `f(n-1)` and `f(n-2)` and those sub-problems repeat. I can memoise them, or better, build the answer bottom-up: the last move onto stair `i` is either one step or two steps, so `dp[i] = dp[i-1] + dp[i-2]` with `dp[0] = dp[1] = 1`. That is `O(n)` time and `O(n)` space, and the table is just the Fibonacci sequence shifted by one."\n\n## Related Problems\n\n- [Fibonacci Number — LeetCode 509](./FibonacciNumber.java) — the same recurrence\n- [House Robber — LeetCode 198](./HouseRobber.java) — "take or skip" DP\n- [Coin Change — LeetCode 322](./CoinChange.java) — unbounded knapsack\n',i=[`climbStairs`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};