package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Repeating Substring
 * LeetCode: 1062 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Sliding window, Dynamic programming, String hashing
 *
 * <p>Problem:
 * Given a string {@code s}, return the length of the **longest substring that occurs at
 * least twice**. The two occurrences may overlap.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * banana
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: the answer is the longest pair of suffixes that share a common prefix. Define
 * {@code lcp(i, j)} as the length of the longest common prefix of the suffixes starting at
 * {@code i} and {@code j}. It satisfies
 * {@code lcp(i, j) = (s[i] == s[j]) ? 1 + lcp(i+1, j+1) : 0}. Rolling this DP into a
 * single array gives an O(n²) time, O(n) space solution.
 *
 * <p>Complexity: Time O(n²), Space O(n).
 */
public class LongestRepeatingSubstring {

    /**
     * Returns the length of the longest substring of {@code s} that appears at least twice.
     *
     * @param s the input string
     * @return the length of the longest repeating substring
     */
    public static int longestRepeatingSubstring(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        int best = 0;
        for (int i = n - 1; i >= 0; i--) {
            // Ascending j keeps dp[j + 1] on the previous row while dp[j] is rewritten.
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    dp[j] = dp[j + 1] + 1;
                    if (dp[j] > best) {
                        best = dp[j];
                    }
                } else {
                    dp[j] = 0;
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestRepeatingSubstring(s));
    }
}
