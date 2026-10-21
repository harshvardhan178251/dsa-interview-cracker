package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Burst Balloons
 * LeetCode: 312 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Interval DP, Bottom-up DP
 *
 * <p>Problem: Burst every balloon for the maximum number of coins. A balloon earns the product of its value and the values of its two neighbours at the moment it is burst.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 3 1 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 35
 * </pre>
 *
 * <p>Approach: Ask "which balloon is burst **last** in this interval?" -- then its neighbours are known and the interval splits in two.
 *
 * <p>Complexity: Time O(n^3), Space O(n^2).
 */
public class BurstBalloons {

    /**
     * Returns the maximum number of coins obtainable by bursting all balloons.
     *
     * <p>The balloons are padded with two virtual balloons of value {@code 1}. {@code dp[l][r]} is
     * the best score for bursting everything strictly between {@code l} and {@code r} while those two
     * balloons stay alive. Choosing the last balloon {@code k} of that interval fixes its neighbours,
     * so the interval splits into two independent sub-intervals.
     *
     * @param nums the value of each balloon
     * @return the maximum number of coins
     */
    public static int maxBurst(int[] nums) {
        int n = nums.length;
        int[] balloons = new int[n + 2];
        balloons[0] = 1;
        balloons[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            balloons[i + 1] = nums[i];
        }

        int[][] dp = new int[n + 2][n + 2];
        for (int left = n; left >= 0; left--) {
            for (int right = left + 1; right <= n + 1; right++) {
                for (int last = left + 1; last < right; last++) {
                    int coins = balloons[left] * balloons[last] * balloons[right]
                            + dp[left][last] + dp[last][right];
                    dp[left][right] = Math.max(dp[left][right], coins);
                }
            }
        }
        return dp[0][n + 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxBurst(nums));
    }
}
