package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: House Robber
 * LeetCode: 198 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Bottom-up DP, Take-or-skip
 *
 * <p>Problem: Given the amount of money in each house, return the maximum total that can be robbed without robbing two adjacent houses.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 7 9 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Approach: At every house either rob it (and skip the previous one) or skip it, so each answer is the better of two options.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class HouseRobber {

    /**
     * Returns the maximum amount that can be robbed without robbing two adjacent houses.
     *
     * <p>{@code dp[i]} = the best total from the first {@code i + 1} houses. House {@code i} is either
     * skipped ({@code dp[i-1]}) or robbed ({@code nums[i] + dp[i-2]}).
     *
     * @param nums money in each house
     * @return the maximum total that can be robbed
     */
    public static int rob(int[] nums) {
        int twoBack = 0; // dp[i-2]
        int oneBack = 0; // dp[i-1]
        for (int i = 0; i < nums.length; i++) {
            int current = Math.max(oneBack, nums[i] + twoBack);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(rob(nums));
    }
}
