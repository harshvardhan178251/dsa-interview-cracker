package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Common Substring
 * LeetCode: 718 | Difficulty: Medium | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the length of the longest **contiguous** substring that appears in both of the two given strings.
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
 * 1
 * </pre>
 *
 * <p>Approach: A cell holds the length of the common substring that **ends** at both positions, so a mismatch resets the cell to zero.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class LongestCommonSubstring {

    /**
     * Returns the length of the longest common substring of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the length of the common substring that ends at {@code a[i-1]} and
     * {@code b[j-1]}. Equal characters extend the diagonal by one; a mismatch resets the cell to
     * {@code 0} because a substring may not skip characters.
     *
     * @param a the first string
     * @param b the second string
     * @return the length of the longest common substring
     */
    public static int longestCommonSubstring(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];
        int best = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    best = Math.max(best, dp[i][j]);
                } else {
                    dp[i][j] = 0; // a substring cannot skip a character
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();
        String a = fs.next();
        String b = fs.next();

        System.out.println(longestCommonSubstring(a, b));
    }
}
