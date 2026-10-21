package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Coin Change II
 * LeetCode: 518 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Unbounded knapsack, Counting DP
 *
 * <p>Problem: Count the number of **combinations** of coins that add up to an amount -- the order of the coins does not matter.
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
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: Process one coin denomination at a time and let the table count the combinations built so far.
 *
 * <p>Complexity: Time O(n x amount), Space O(amount).
 */
public class CoinChangeII {

    /**
     * Counts the combinations of coins that add up to {@code amount}.
     *
     * <p>The outer loop runs over the coin denominations and the inner loop over the amounts in
     * increasing order. That order guarantees that a denomination can be reused (unbounded) while the
     * counts stay combination-based -- the same set of coins is never counted twice.
     *
     * @param coins  the available denominations
     * @param amount the target sum
     * @return the number of combinations, {@code 0} when the amount cannot be made
     */
    public static int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1; // exactly one way to make 0: use no coins at all

        for (int coin : coins) {
            for (int a = coin; a <= amount; a++) {
                dp[a] += dp[a - coin];
            }
        }
        return dp[amount];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] coins = fs.nextIntArray(n);
        int amount = fs.nextInt();

        System.out.println(change(amount, coins));
    }
}
