package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Best Time to Buy and Sell Stock III
 * LeetCode: 123 | Difficulty: Hard | Frequency: 4/5
 * Pattern: State-compression DP, Greedy
 *
 * <p>Problem: Return the maximum profit achievable with **at most two** buy/sell transactions.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 3 3 5 0 0 3 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Keep four states -- the best profit after each of the four phases of two transactions -- and update them in one pass.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class BestTimeToBuySellStockIII {

    /**
     * Returns the maximum profit with at most two buy / sell transactions.
     *
     * <p>Four states are tracked: the best profit while holding the first share, after selling it, while
     * holding the second share, and after selling that one. Every state is updated from the previous
     * day's values, so the day is used at most once.
     *
     * @param prices the price on each day
     * @return the maximum profit
     */
    public static int maxProfit(int[] prices) {
        if (prices.length < 2) {
            return 0;
        }

        int buyOne = -prices[0];   // best profit while holding the first share
        int sellOne = 0;           // best profit after selling the first share
        int buyTwo = -prices[0];   // best profit while holding the second share
        int sellTwo = 0;           // best profit after selling both shares

        for (int i = 1; i < prices.length; i++) {
            int price = prices[i];
            buyOne = Math.max(buyOne, -price);
            sellOne = Math.max(sellOne, buyOne + price);
            buyTwo = Math.max(buyTwo, sellOne - price);
            sellTwo = Math.max(sellTwo, buyTwo + price);
        }
        return sellTwo;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] prices = fs.nextIntArray(n);

        System.out.println(maxProfit(prices));
    }
}
