var e=`dynamicprogramming.TargetSum`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Target Sum
 * LeetCode: 494 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Subset-sum DP, Counting DP
 *
 * <p>Problem: Count the assignments of \`+\` / \`-\` signs to the numbers of an array such that the resulting sum equals a target.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 1 1 1 1
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: Turn the sign assignment into a subset-sum counting problem, then count the subsets with a one-dimensional DP.
 *
 * <p>Complexity: Time O(n x S), Space O(S).
 */
public class TargetSum {

    /**
     * Counts the sign assignments whose sum equals {@code target}.
     *
     * <p>Let {@code P} be the sum of the positively signed numbers and {@code total} the sum of all
     * numbers. Then {@code P - (total - P) = target}, so {@code P = (total + target) / 2}: the problem
     * becomes "count the subsets with sum {@code P}".
     *
     * @param nums   the numbers to sign
     * @param target the wanted sum
     * @return the number of assignments
     */
    public static int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int wanted = total + target;
        if (wanted < 0 || (wanted & 1) != 0) {
            return 0; // no subset can have a negative or odd sum
        }
        int subsetSum = wanted / 2;

        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;

        for (int value : nums) {
            for (int sum = subsetSum; sum >= value; sum--) {
                dp[sum] += dp[sum - value];
            }
        }
        return dp[subsetSum];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(findTargetSumWays(nums, target));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Target Sum
 * LeetCode: 494 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Subset-sum DP, Counting DP
 *
 * <p>Problem: Count the assignments of \`+\` / \`-\` signs to the numbers of an array such that the resulting sum equals a target.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 1 1 1 1
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: Turn the sign assignment into a subset-sum counting problem, then count the subsets with a one-dimensional DP.
 *
 * <p>Complexity: Time O(n x S), Space O(S).
 */
public class Main {

    /**
     * Counts the sign assignments whose sum equals {@code target}.
     *
     * <p>Let {@code P} be the sum of the positively signed numbers and {@code total} the sum of all
     * numbers. Then {@code P - (total - P) = target}, so {@code P = (total + target) / 2}: the problem
     * becomes "count the subsets with sum {@code P}".
     *
     * @param nums   the numbers to sign
     * @param target the wanted sum
     * @return the number of assignments
     */
    public static int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int wanted = total + target;
        if (wanted < 0 || (wanted & 1) != 0) {
            return 0; // no subset can have a negative or odd sum
        }
        int subsetSum = wanted / 2;

        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;

        for (int value : nums) {
            for (int sum = subsetSum; sum >= value; sum--) {
                dp[sum] += dp[sum - value];
            }
        }
        return dp[subsetSum];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(findTargetSumWays(nums, target));
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
`,r='\n# Target Sum — LeetCode 494\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Subset-sum DP · Counting DP |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Adobe |\n\n## Problem Statement\n\nYou are given an integer array `nums` and a target `target`. Assign a `+` or `-` sign to every number so that the signed sum equals `target`. Return the number of different assignments.\n\n- Each number must get exactly one sign\n- `0` can carry either sign and still counts as two assignments\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\ntarget\n```\n\n- `n` — number of values (1 ≤ n ≤ 20)\n- `nums` — n space-separated non-negative integers\n- `target` — the target sum (−1000 ≤ target ≤ 1000)\n\n## Sample Input\n\n```\n5\n1 1 1 1 1\n3\n```\n\n## Expected Output\n\n```\n5\n```\n\nThe total is 5 and the positives must sum to `(5 + 3) / 2 = 4`, i.e. four of the five ones — **5** ways.\n\n## Approach\n\n**Brute force** tries every sign assignment: `2ⁿ` combinations, `O(2ⁿ · n)`.\n\n**The reduction.** Let `P` be the sum of the numbers that get a `+` sign and `total` the sum of all numbers. The signed sum is `P - (total - P) = 2P - total`, so:\n\n> `P = (total + target) / 2`\n\nIf `(total + target)` is negative or odd, no assignment exists. Otherwise the problem is exactly "count the subsets with sum `P`".\n\n**The DP.** `dp[s]` = the number of subsets of the numbers processed so far whose sum is `s`.\n`dp[0] = 1` (the empty subset). For each value `v` we update **downwards**:\n`dp[s] += dp[s - v]` — each number may be used at most once.\n\n**The alternative** is to keep the sign in the state: `dp[s]` = ways to reach signed sum `s`, with `dp[s + v] += dp[s]` and `dp[s - v] += dp[s]`. That needs a table over `[-total, total]`, and it counts `0` twice (once for `+0` and once for `-0`) just like this version does.\n\n## Dry Run\n\nInput: `nums = [1, 1, 1, 1, 1]`, `target = 3`.\n\n`total = 5` → `wanted = 5 + 3 = 8` → `subsetSum = 4`.\n\n| value | sums updated (downwards) | `dp` after the step |\n|---:|---|---|\n| 1 | 4 … 1 | `[1, 1, 0, 0, 0]` |\n| 1 | 4 … 1 | `[1, 2, 1, 0, 0]` |\n| 1 | 4 … 1 | `[1, 3, 3, 1, 0]` |\n| 1 | 4 … 1 | `[1, 4, 6, 4, 1]` |\n| 1 | 4 … 1 | `[1, 5, 10, 10, 5]` |\n\n`dp[4] = 5` → answer **5**.\n\n**Why five?** The subset must contain four of the five ones — `C(5, 4) = 5` choices. The remaining one gets the `-` sign.\n\n**Zero handling.** `nums = [0]`, `target = 0` → `total = 0`, `wanted = 0`, `subsetSum = 0`, and the single zero produces `dp[0] = 2` — the `+0` and the `-0` assignments are counted separately, exactly as LeetCode expects.\n\n**The direct formulation** (no reduction) for the same input:\n\n| step | `dp` over signed sums `-4 … 4` |\n|---:|---|\n| start | `[0, 0, 0, 0, 0, 0, 0, 0, 0]` (only sum 0 reachable) |\n| +1 | sums `±1` reachable once each |\n| +1 | sums `0` (2 ways), `±2` (1 way each) |\n| +1 | sums `±1` (3 ways), `±3` (1 way) |\n| +1 | sums `0` (4), `±2` (3), `±4` (1) |\n| +1 | sums `±1` (5), `±3` (4), `±5` (1) |\n\nSum `3` has 5 ways ✓ — the same answer, a bigger table.\n\n## Java Solution\n\nSee [`TargetSum.java`](./TargetSum.java).\n\n```java\n    public static int findTargetSumWays(int[] nums, int target) {\n        int total = 0;\n        for (int value : nums) {\n            total += value;\n        }\n        int wanted = total + target;\n        if (wanted < 0 || (wanted & 1) != 0) {\n            return 0;\n        }\n        int subsetSum = wanted / 2;\n\n        int[] dp = new int[subsetSum + 1];\n        dp[0] = 1;\n\n        for (int value : nums) {\n            for (int sum = subsetSum; sum >= value; sum--) {\n                dp[sum] += dp[sum - value];\n            }\n        }\n        return dp[subsetSum];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · S) | `n` values, each scanning at most `subsetSum` sums |\n| **Space** | O(S) | the `dp` array holds `subsetSum + 1` entries |\n\n**Time `O(n · S)`** where `S = (total + target) / 2`. The brute force `O(2ⁿ)` is fine for `n ≤ 20` and is a good first answer to mention before optimising.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Can you solve it with the `O(2ⁿ)` brute force?"* → yes, recurse over "assign `+` or assign `-`".\n- "What if the numbers can be negative?"* → the subset-sum reduction still works, but the sum range must be `[min, max]` and the table needs offsetting.\n- "How does this compare with Partition Equal Subset Sum?"* → same subset-sum machinery, but that one asks for existence and this one asks for a count.\n- "What if you had to return the assignments themselves?"* → backtrack through the DP table.\n\n**Common mistakes:**\n\n- ❌ Forgetting the parity check — `(total + target)` must be even.\n- ❌ Iterating the sums upwards (that would count assignments that reuse a number).\n- ❌ Dividing by two before adding the target: `P = (total + target) / 2`, not `(total − target) / 2`.\n\n**How to narrate:**\n\n> "Instead of trying all `2ⁿ` sign assignments I rewrite the condition. If the positives sum to `P`, the signed sum is `2P - total`, so `P` has to be `(total + target) / 2`. That turns the problem into counting subsets with a given sum, which is a one-dimensional DP updated downwards — `O(n·S)`."\n\n## Related Problems\n\n- [Partition Equal Subset Sum — LeetCode 416](./PartitionEqualSubsetSum.java) — existence instead of counting\n- [Coin Change II — LeetCode 518](./CoinChangeII.java) — the unbounded cousin\n',i=[`findTargetSumWays`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};