package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Decode Ways
 * LeetCode: 91 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix DP, String DP
 *
 * <p>Problem: Count the ways to decode a digit string where `A`->`1`, `B`->`2`, ..., `Z`->`26`. A `0` may only appear as part of `10` or `20`.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 226
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: At every position either take one digit or take two -- as long as the digits form a valid code.
 *
 * <p>Complexity: Time O(|s|), Space O(|s|).
 */
public class DecodeWays {

    /**
     * Counts how many ways the digit string {@code s} can be decoded.
     *
     * <p>{@code dp[i]} = the number of decodings of the first {@code i} characters. The last letter
     * consumes either one digit ({@code 1}..{@code 9}) or two digits ({@code 10}..{@code 26}).
     *
     * @param s the digit string
     * @return the number of decodings, {@code 0} when the string cannot be decoded
     */
    public static int decodeWays(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1; // one way to decode the empty prefix

        for (int i = 1; i <= n; i++) {
            if (s.charAt(i - 1) != '0') {
                dp[i] += dp[i - 1]; // a single digit 1..9
            }
            if (i >= 2) {
                int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
                if (two >= 10 && two <= 26) {
                    dp[i] += dp[i - 2]; // a two digit code 10..26
                }
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(decodeWays(s));
    }
}
