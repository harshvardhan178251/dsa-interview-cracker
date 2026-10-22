var e=`dynamicprogramming.LongestIncreasingSubsequence`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Increasing Subsequence
 * LeetCode: 300 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Bottom-up DP, Patience sorting
 *
 * <p>Problem: Return the length of the longest strictly increasing subsequence of an array -- the longest sequence that keeps the original order but may skip elements.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 10 9 2 5 3 7 101 18
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: For each element, look back for the longest subsequence that can be extended with it.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class LongestIncreasingSubsequence {

    /**
     * Returns the length of the longest strictly increasing subsequence of {@code nums}.
     *
     * <p>{@code dp[i]} = the length of the longest increasing subsequence that **ends** at index
     * {@code i}. Every earlier element {@code j < i} with {@code nums[j] < nums[i]} can extend a
     * subsequence ending at {@code j}, so
     * {@code dp[i] = 1 + max(dp[j] | j < i and nums[j] < nums[i])}.
     *
     * @param nums the input array
     * @return the length of the longest increasing subsequence
     */
    public static int lengthOfLIS(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int[] dp = new int[nums.length];
        int best = 1;
        for (int i = 0; i < nums.length; i++) {
            dp[i] = 1; // the element alone is a subsequence of length 1
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            best = Math.max(best, dp[i]);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(lengthOfLIS(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Longest Increasing Subsequence
 * LeetCode: 300 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Bottom-up DP, Patience sorting
 *
 * <p>Problem: Return the length of the longest strictly increasing subsequence of an array -- the longest sequence that keeps the original order but may skip elements.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 10 9 2 5 3 7 101 18
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: For each element, look back for the longest subsequence that can be extended with it.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class Main {

    /**
     * Returns the length of the longest strictly increasing subsequence of {@code nums}.
     *
     * <p>{@code dp[i]} = the length of the longest increasing subsequence that **ends** at index
     * {@code i}. Every earlier element {@code j < i} with {@code nums[j] < nums[i]} can extend a
     * subsequence ending at {@code j}, so
     * {@code dp[i] = 1 + max(dp[j] | j < i and nums[j] < nums[i])}.
     *
     * @param nums the input array
     * @return the length of the longest increasing subsequence
     */
    public static int lengthOfLIS(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int[] dp = new int[nums.length];
        int best = 1;
        for (int i = 0; i < nums.length; i++) {
            dp[i] = 1; // the element alone is a subsequence of length 1
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            best = Math.max(best, dp[i]);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(lengthOfLIS(nums));
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
`,r='\n# Longest Increasing Subsequence — LeetCode 300\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Bottom-up DP · Patience sorting |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |\n\n## Problem Statement\n\nGiven an integer array `nums`, return the **length** of the longest strictly increasing subsequence.\n\nA subsequence keeps the relative order of the elements but does not have to be contiguous — so `10, 9, 2, 5, 3, 7, 101, 18` has the increasing subsequence `2, 3, 7, 101`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — length of the array (1 ≤ n ≤ 1000)\n- `nums` — n space-separated integers\n\n## Sample Input\n\n```\n8\n10 9 2 5 3 7 101 18\n```\n\n## Expected Output\n\n```\n4\n```\n\nOne longest increasing subsequence is `2, 3, 7, 101` (length 4); `2, 5, 7, 101` is another.\n\n## Approach\n\nThe quadratic DP is the easiest thing to write and to explain:\n\n1. `dp[i]` = length of the longest increasing subsequence that **ends** at `nums[i]`.\n2. Every element alone is a subsequence of length 1.\n3. For each earlier `j < i` with `nums[j] < nums[i]`, we can append `nums[i]` to the best subsequence ending at `j`: `dp[i] = max(dp[i], dp[j] + 1)`.\n4. The answer is `max(dp)`.\n\n`O(n²)` is fine for `n ≤ 1000`, and it is the version to write in an interview unless the interviewer asks for better. The `O(n log n)` version uses **patience sorting**: keep a `tails` array where `tails[k]` is the smallest possible last element of an increasing subsequence of length `k + 1`; binary-search `tails` for the first entry `≥ nums[i]` and replace it. `tails.length` is then the answer.\n\n## Dry Run\n\nInput: `nums = [10, 9, 2, 5, 3, 7, 101, 18]`. Each row extends the DP with one more element.\n\n| `i` | `nums[i]` | candidate `dp[j] + 1` for every `j < i` with `nums[j] < nums[i]` | `dp[i]` |\n|---:|---:|---|---:|\n| 0 | 10 | none → start at 1 | **1** |\n| 1 | 9 | none (10 is not < 9) → 1 | **1** |\n| 2 | 2 | none (10, 9 are not < 2) → 1 | **1** |\n| 3 | 5 | j=2 (2 < 5): 1 + 1 = 2 | **2** |\n| 4 | 3 | j=2 (2 < 3): 1 + 1 = 2 | **2** |\n| 5 | 7 | j=2: 1+1=2, j=3: 2+1=3, j=4: 2+1=3 | **3** |\n| 6 | 101 | j=0: 1+1=2, j=1: 1+1=2, j=2: 1+1=2, j=3: 2+1=3, j=4: 2+1=3, j=5: 3+1=4 | **4** |\n| 7 | 18 | j=0: 2, j=1: 2, j=2: 2, j=3: 3, j=4: 3, j=5: 4 | **4** |\n\nFull table: `dp = [1, 1, 1, 2, 2, 3, 4, 4]` → answer **4**.\n\n**Reconstructing the subsequence.** Keep a `parent[i]` array: whenever `dp[i] = dp[j] + 1` improves the best, remember `parent[i] = j`. Walking backwards from the best index rebuilds `2, 3, 7, 101`.\n\n**The `O(n log n)` version.** `tails` after the same input is `[2, 3, 7, 101]` — `tails[k]` is the smallest tail of a subsequence of length `k+1`, and `tails.length` is the answer.\n\n## Java Solution\n\nSee [`LongestIncreasingSubsequence.java`](./LongestIncreasingSubsequence.java).\n\n```java\n    public static int lengthOfLIS(int[] nums) {\n        if (nums.length == 0) {\n            return 0;\n        }\n        int[] dp = new int[nums.length];\n        int best = 1;\n        for (int i = 0; i < nums.length; i++) {\n            dp[i] = 1;\n            for (int j = 0; j < i; j++) {\n                if (nums[j] < nums[i]) {\n                    dp[i] = Math.max(dp[i], dp[j] + 1);\n                }\n            }\n            best = Math.max(best, dp[i]);\n        }\n        return best;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n²) | the inner loop scans all earlier elements — `O(n²)` comparisons |\n| **Space** | O(n) | the `dp` array holds `n` entries |\n\n**`O(n log n)` is achievable** with the `tails` + binary search technique. It is also the technique behind the "Russian doll envelopes" and "minimum number of increasing subsequences" problems.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Can you make it `O(n log n)`?"* → patience sorting with `tails` and `Arrays.binarySearch`.\n- "Print the subsequence itself."* → keep the `parent` array and walk it backwards.\n- "What if it must be contiguous?"* → that is the longest increasing **subarray**, `O(n)` with a single pass.\n- "Longest **non-decreasing** subsequence?"* → change the comparison to `<=`.\n- "Count how many LIS exist?"* → a different DP that counts the number of maximal subsequences of that length.\n\n**Common mistakes:**\n\n- ❌ Using `<=` instead of `<` — that computes the longest non-decreasing subsequence, a different problem.\n- ❌ Confusing *subsequence* with *substring* — the elements do not have to be contiguous.\n- ❌ Setting `dp[i] = 0` initially instead of `1` (the element alone is always a valid subsequence).\n\n**How to narrate:**\n\n> "I define `dp[i]` as the length of the longest increasing subsequence that ends at `i`. For each earlier element smaller than `nums[i]`, I can extend that subsequence, so `dp[i] = max(dp[i], dp[j]+1)`. That is `O(n²)`; if you want `O(n log n)` I can keep a `tails` array of minimal tails and binary search for the replacement position."\n\n## Related Problems\n\n- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — the two-sequence version\n- [Partition Array for Maximum Sum](./MaximumProductSubarray.java) — another "keep or skip" DP\n',i=[`lengthOfLIS`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};