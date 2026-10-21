package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Best Time to Buy and Sell Stock II
 * LeetCode: 122 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Running difference
 *
 * <p>Problem:
 * You are given an array {@code prices} where {@code prices[i]} is the price of a given
 * stock on day {@code i}. You may buy and sell as often as you like, but you may only hold
 * one share at a time. Return the maximum total profit.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 7 1 5 3 6 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: every positive day-to-day difference can be captured independently, because
 * we may sell and re-buy on consecutive days for free. Summing all positive differences
 * is therefore optimal.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class BestTimeToBuyAndSellStockII {

    /**
     * Returns the maximum total profit with unlimited transactions.
     *
     * @param prices daily prices, oldest first
     * @return the best achievable total profit
     */
    public static int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] prices = fs.nextIntArray(n);

        System.out.println(maxProfit(prices));
    }
}
