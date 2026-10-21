package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Distinct Subsequences
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Counting DP, Prefix DP
 *
 * <p>Problem: Count the ways to pick indices from a string so that the characters read in order spell a given target string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * babgbag
 * bag
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: Sweep the source string; whenever a character matches the next target character, extend every way that was already possible.
 *
 * <p>Complexity: Time O(n x m), Space O(m).
 */
public class DistinctSubsequences {

    /**
     * Counts the ways to choose indices from {@code s} that spell {@code t}.
     *
     * <p>{@code dp[j]} = the number of ways to form the first {@code j} characters of {@code t} using
     * the part of {@code s} processed so far. The loop over {@code j} runs **downwards** so that the
     * current character of {@code s} is used at most once.
     *
     * @param s the source string
     * @param t the target string
     * @return the number of index selections that spell {@code t}
     */
    public static int countDistinctSubsequences(String s, String t) {
        int m = t.length();
        int[] dp = new int[m + 1];
        dp[0] = 1; // one way to form the empty target: pick nothing

        for (int i = 0; i < s.length(); i++) {
            for (int j = m; j >= 1; j--) {
                if (s.charAt(i) == t.charAt(j - 1)) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(countDistinctSubsequences(s, t));
    }
}
