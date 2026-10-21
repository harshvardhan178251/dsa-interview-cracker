package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Common Subsequence
 * LeetCode: 1143 | Difficulty: Medium | Frequency: 5/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the length of the longest subsequence that appears in both of the two given strings, preserving the order of the characters.
 *
 * <p>Input format (stdin):
 * <pre>
 * n m
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5 3
 * abcde
 * ace
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Compare the two strings prefix by prefix; if the last characters match they extend the diagonal, otherwise the answer comes from the best of the two neighbours.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class LongestCommonSubsequence {

    /**
     * Returns the length of the longest common subsequence of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the LCS length of {@code a[0 .. i-1]} and {@code b[0 .. j-1]}. If the two
     * last characters are equal the answer is the diagonal plus one, otherwise it is the better of
     * "drop {@code a[i-1]}" and "drop {@code b[j-1]}".
     *
     * @param a the first string
     * @param b the second string
     * @return the length of the longest common subsequence
     */
    public static int lcs(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();
        String a = fs.next();
        String b = fs.next();

        System.out.println(lcs(a, b));
    }
}
