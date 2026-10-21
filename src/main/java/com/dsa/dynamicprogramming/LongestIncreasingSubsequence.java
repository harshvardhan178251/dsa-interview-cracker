package com.dsa.dynamicprogramming;

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
