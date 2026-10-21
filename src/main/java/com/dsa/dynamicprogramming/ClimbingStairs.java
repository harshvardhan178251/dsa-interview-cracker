package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Climbing Stairs
 * LeetCode: 70 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bottom-up DP, Recursion + memoization
 *
 * <p>Problem: Count the distinct ways to climb {@code n} stairs when every move may take either 1 or 2 stairs.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: Every climb ends with either a 1-step (coming from stair n-1) or a 2-step (coming from stair n-2), so the answer is the sum of the answers for those two smaller problems.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ClimbingStairs {

    /**
     * Counts the distinct ways to climb {@code n} stairs using moves of one or two stairs.
     *
     * <p>{@code dp[i]} = ways to reach stair {@code i}. The last move is either a single step
     * (from {@code i - 1}) or a double step (from {@code i - 2}), therefore
     * {@code dp[i] = dp[i - 1] + dp[i - 2]}.
     *
     * @param n number of stairs
     * @return the number of ways to climb them; {@code 1} for {@code n == 0} (the empty climb)
     */
    public static int climbStairs(int n) {
        if (n <= 1) {
            return 1;
        }
        int[] dp = new int[n + 1];
        dp[0] = 1; // one way to stay on the ground: take no steps at all
        dp[1] = 1; // one way to reach stair 1: a single step
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(climbStairs(n));
    }
}
