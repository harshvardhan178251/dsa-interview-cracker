var e=`dynamicprogramming.HouseRobber`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: House Robber
 * LeetCode: 198 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Bottom-up DP, Take-or-skip
 *
 * <p>Problem: Given the amount of money in each house, return the maximum total that can be robbed without robbing two adjacent houses.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 7 9 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Approach: At every house either rob it (and skip the previous one) or skip it, so each answer is the better of two options.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class HouseRobber {

    /**
     * Returns the maximum amount that can be robbed without robbing two adjacent houses.
     *
     * <p>{@code dp[i]} = the best total from the first {@code i + 1} houses. House {@code i} is either
     * skipped ({@code dp[i-1]}) or robbed ({@code nums[i] + dp[i-2]}).
     *
     * @param nums money in each house
     * @return the maximum total that can be robbed
     */
    public static int rob(int[] nums) {
        int twoBack = 0; // dp[i-2]
        int oneBack = 0; // dp[i-1]
        for (int i = 0; i < nums.length; i++) {
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
 * Problem: House Robber
 * LeetCode: 198 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Bottom-up DP, Take-or-skip
 *
 * <p>Problem: Given the amount of money in each house, return the maximum total that can be robbed without robbing two adjacent houses.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 7 9 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Approach: At every house either rob it (and skip the previous one) or skip it, so each answer is the better of two options.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the maximum amount that can be robbed without robbing two adjacent houses.
     *
     * <p>{@code dp[i]} = the best total from the first {@code i + 1} houses. House {@code i} is either
     * skipped ({@code dp[i-1]}) or robbed ({@code nums[i] + dp[i-2]}).
     *
     * @param nums money in each house
     * @return the maximum total that can be robbed
     */
    public static int rob(int[] nums) {
        int twoBack = 0; // dp[i-2]
        int oneBack = 0; // dp[i-1]
        for (int i = 0; i < nums.length; i++) {
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
`,r='\n# House Robber — LeetCode 198\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Bottom-up DP · Take-or-skip |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Uber, Adobe |\n\n## Problem Statement\n\nYou are planning to rob houses on a street. Each house has a non-negative amount of money; **two adjacent houses must not both be robbed**. Return the maximum amount you can rob.\n\n- `nums[i]` — money in the `i`-th house\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — number of houses (1 ≤ n ≤ 100)\n- `nums` — n space-separated non-negative integers\n\n## Sample Input\n\n```\n4\n2 7 9 3\n```\n\n## Expected Output\n\n```\n11\n```\n\nRobbing houses 1 and 3 (`7 + 3 = 10`) is legal but not optimal. The best legal choice is house 2 (`9`) together with house 0 (`2`) — houses 0 and 2 are not adjacent — giving `9 + 2 = 11`. See the dry run.\n\n## Approach\n\nThis is the canonical **take-or-skip** dynamic programme.\n\n1. Define `dp[i]` = the maximum total obtainable from houses `0 … i`.\n2. At house `i` there are exactly two options:\n   - **skip** it → we keep `dp[i-1]`;\n   - **rob** it → we get `nums[i]` but must skip house `i-1`, so the total is `nums[i] + dp[i-2]`.\n3. Take the better of the two: `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`.\n4. Base cases: `dp[-1] = dp[-2] = 0` (nothing to rob yet).\n\nThe recurrence only looks back two steps, so the table collapses into two rolling variables — `O(1)` space. Greedy does **not** work here: picking the richest house greedily (`9`) blocks `7` and `3`, giving `9`, while the optimum is `2 + 9 = 11`.\n\n## Dry Run\n\nInput: `nums = [2, 7, 9, 3]`. Two rolling variables hold `dp[i-2]` and `dp[i-1]`.\n\n| house `i` | `nums[i]` | skip → `dp[i-1]` | rob → `nums[i] + dp[i-2]` | `dp[i]` | chosen |\n|---:|---:|---:|---:|---:|---|\n| 0 | 2 | 0 | 2 + 0 = 2 | **2** | rob |\n| 1 | 7 | 2 | 7 + 0 = 7 | **7** | rob |\n| 2 | 9 | 7 | 9 + 2 = 11 | **11** | rob |\n| 3 | 3 | 11 | 3 + 7 = 10 | **11** | skip |\n\nFull table: `dp = [2, 7, 11, 11]` → answer **11**.\n\n**Greedy fails here.** Taking the richest house (`9`) first blocks both `7` and `3` and yields `9`. The DP instead keeps `9` *and* `3` (they are not adjacent) for `11`.\n\n**Space optimisation.** The table `[2, 7, 11, 11]` is only ever read at offsets `0` and `1`, so the rolling variables `twoBack` / `oneBack` reproduce it exactly.\n\n## Java Solution\n\nSee [`HouseRobber.java`](./HouseRobber.java).\n\n```java\n    public static int rob(int[] nums) {\n        int twoBack = 0; // dp[i-2]\n        int oneBack = 0; // dp[i-1]\n        for (int i = 0; i < nums.length; i++) {\n            int current = Math.max(oneBack, nums[i] + twoBack);\n            twoBack = oneBack;\n            oneBack = current;\n        }\n        return oneBack;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | one pass over the houses |\n| **Space** | O(1) | two rolling variables replace the table |\n\n**Space `O(1)`.** With a full table it would be `O(n)` time and `O(n)` space — the classic version you will see on LeetCode.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if the houses are in a circle?"* → [House Robber II — LeetCode 213](./HouseRobberII.java): run the linear solution twice and take the max.\n- "What if you cannot rob houses on two consecutive days?"* → same recurrence, different story.\n- "What if each house has a different amount you want to steal per visit?"* → that is the unbounded knapsack / [Coin Change II](./CoinChangeII.java) shape.\n- "Can you reconstruct which houses were robbed?"* → yes, keep the table and walk it backwards comparing `dp[i]` with `dp[i-1]`.\n- "Why not a greedy strategy?"* → counter-example: `[2, 7, 9, 3]` — greedy takes `9`, the optimum takes `11`.\n\n**Common mistakes:**\n\n- ❌ Using `dp[i-1] + dp[i-2]` instead of `max(dp[i-1], nums[i] + dp[i-2])` — that is the "rob every other house" mistake and it over-counts.\n- ❌ Reading `dp[i-2]` when `i == 0` (index out of bounds) instead of treating it as `0`.\n- ❌ Forgetting that robbing house `i` forbids house `i-1`, not house `i-2`.\n\n**How to narrate:**\n\n> "At each house I have two choices: skip it, or rob it and forfeit the previous house. So the best total up to house `i` is `max(dp[i-1], nums[i] + dp[i-2])`. The recurrence only needs the last two values, so I keep two variables instead of a table. Greedy would take the biggest house and lose, so this really is a DP."\n\n## Related Problems\n\n- [House Robber II — LeetCode 213](./HouseRobberII.java) — the circular variant\n- [Best Time to Buy and Sell Stock III — LeetCode 123](./BestTimeToBuySellStockIII.java) — another take-or-skip DP\n- [Climbing Stairs — LeetCode 70](./ClimbingStairs.java) — the same rolling-window trick\n',i=[`rob`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};