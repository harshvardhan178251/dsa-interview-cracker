package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Palindromic Subsequence
 * LeetCode: 516 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Dynamic programming, Interval DP
 *
 * <p>Problem: Given a string {@code s}, return the length of the longest
 * <b>subsequence</b> of {@code s} that is a palindrome. A subsequence keeps the
 * relative order of the characters but may skip any of them.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * bbbab
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: interval DP. {@code dp[i][j]} is the length of the longest palindromic
 * subsequence of {@code s[i..j]}. If the two ends match we can always use them and add
 * two to the answer for the inside; otherwise we drop one end and take the better of
 * the two remaining ranges.
 *
 * <p>Complexity: Time O(n²), Space O(n²).
 */
public class LongestPalindromicSubsequence {

    /**
     * Returns the length of the longest palindromic subsequence of {@code s}.
     *
     * @param s the input string
     * @return the length of the longest palindromic subsequence (0 for an empty string)
     */
    public static int longestPalindromeSubsequence(String s) {
        int n = s.length();
        if (n == 0) {
            return 0;
        }

        // dp[i][j] = length of the longest palindromic subsequence of s[i..j].
        int[][] dp = new int[n][n];

        // A single character is a palindrome of length 1.
        for (int i = 0; i < n; i++) {
            dp[i][i] = 1;
        }

        // Fill the table by increasing interval length.
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                if (s.charAt(i) == s.charAt(j)) {
                    // Both ends fit around the best palindrome strictly inside.
                    dp[i][j] = 2 + dp[i + 1][j - 1];
                } else {
                    // The ends cannot both be used — drop one of them.
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[0][n - 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestPalindromeSubsequence(s));
    }
}
