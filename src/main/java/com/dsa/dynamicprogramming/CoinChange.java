package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;
import java.util.Arrays;

/**
 * Problem: Coin Change
 * LeetCode: 322 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Unbounded knapsack, Bottom-up DP
 *
 * <p>Problem: Given unlimited coins of each denomination, return the fewest coins that add up to a target amount, or {@code -1} when the amount cannot be made.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * coins[0] coins[1] ... coins[n-1]
 * amount
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 5
 * 11
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: For every amount, try every coin as the last coin used and keep the smallest resulting count.
 *
 * <p>Complexity: Time O(n x amount), Space O(amount).
 */
public class CoinChange {

    /**
     * Returns the fewest coins that add up to {@code amount}, or {@code -1} if it is impossible.
     *
     * <p>{@code dp[a]} = the minimum number of coins needed to make {@code a}. The last coin used is
     * some {@code coins[j]}, so {@code dp[a] = 1 + min(dp[a - coins[j]])} over all usable coins.
     *
     * @param coins  the available denominations (unlimited copies of each)
     * @param amount the target sum
     * @return the minimum number of coins, or {@code -1} when the amount cannot be formed
     */
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (coin <= a && dp[a - coin] != Integer.MAX_VALUE) {
                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] coins = fs.nextIntArray(n);
        int amount = fs.nextInt();

        System.out.println(coinChange(coins, amount));
    }
}
