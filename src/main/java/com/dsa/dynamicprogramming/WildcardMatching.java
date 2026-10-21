package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Wildcard Matching
 * LeetCode: 44 | Difficulty: Hard | Frequency: 4/5
 * Pattern: 2-D DP, String DP, Greedy
 *
 * <p>Problem: Decide whether a string matches a pattern that may contain `*` (any sequence, including the empty one) and `?` (exactly one character).
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * p
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * adceb
 * *a*b
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: A `*` can swallow any number of characters, so the DP needs a second dimension for the pattern.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class WildcardMatching {

    /**
     * Decides whether the text {@code s} matches the wildcard pattern {@code p}.
     *
     * <p>{@code dp[i][j]} is true when the first {@code i} characters of {@code s} match the first
     * {@code j} characters of {@code p}. A {@code *} either matches nothing (keep the cell above) or
     * swallows one more character (keep the cell to the left).
     *
     * @param s the text
     * @param p the pattern
     * @return {@code true} when the pattern matches the whole text
     */
    public static boolean isMatch(String s, String p) {
        int n = s.length();
        int m = p.length();
        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int j = 1; j <= m; j++) {
            dp[0][j] = dp[0][j - 1] && p.charAt(j - 1) == '*';
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (pc == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = dp[i - 1][j - 1] && pc == s.charAt(i - 1);
                }
            }
        }
        return dp[n][m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String p = fs.next();

        System.out.println(isMatch(s, p) ? 1 : 0);
    }
}
