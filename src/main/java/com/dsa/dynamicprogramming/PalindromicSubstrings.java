package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Palindromic Substrings
 * LeetCode: 647 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Interval DP, Expand around the centre
 *
 * <p>Problem: Count the palindromic **substrings** of a string -- every occurrence is counted, so `"aaa"` has six.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aaa
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: A palindrome is a palindrome when its ends match and the inside is a palindrome -- so one table answers everything.
 *
 * <p>Complexity: Time O(n^2), Space O(n^2).
 */
public class PalindromicSubstrings {

    /**
     * Counts the palindromic substrings of {@code s} (occurrences, not distinct values).
     *
     * <p>{@code dp[i][j]} is true when {@code s[i .. j]} is a palindrome. Such a substring is a
     * palindrome when its two ends are equal and either the inside is a palindrome or the two ends are
     * adjacent.
     *
     * @param s the input string
     * @return the number of palindromic substrings
     */
    public static int countSubstrings(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        int count = 0;

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    count++;
                }
            }
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(countSubstrings(s));
    }
}
