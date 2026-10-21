package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Interleaving String
 * LeetCode: 97 | Difficulty: Medium | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Decide whether the third string can be produced by interleaving the first two while keeping the relative order of the characters in each.
 *
 * <p>Input format (stdin):
 * <pre>
 * n m k
 * a
 * b
 * c
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2 2 4
 * ab
 * cd
 * acbd
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: The next character of the result comes either from the first string or from the second one.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class InterleavingString {

    /**
     * Decides whether {@code c} is an interleaving of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} is true when the first {@code i} characters of {@code a} and the first
     * {@code j} characters of {@code b} can be interleaved into the first {@code i + j} characters of
     * {@code c}. The last character comes either from {@code a} or from {@code b}.
     *
     * @param a the first string
     * @param b the second string
     * @param c the candidate interleaving
     * @return {@code true} when {@code c} is an interleaving of {@code a} and {@code b}
     */
    public static boolean isInterleave(String a, String b, String c) {
        int n = a.length();
        int m = b.length();
        if (n + m != c.length()) {
            return false; // the interleaving must use every character
        }

        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0 && a.charAt(i - 1) == c.charAt(i + j - 1) && dp[i - 1][j]) {
                    dp[i][j] = true;
                } else if (j > 0 && b.charAt(j - 1) == c.charAt(i + j - 1) && dp[i][j - 1]) {
                    dp[i][j] = true;
                }
            }
        }
        return dp[n][m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();
        int k = fs.nextInt();
        String a = fs.next();
        String b = fs.next();
        String c = fs.next();

        System.out.println(isInterleave(a, b, c) ? 1 : 0);
    }
}
