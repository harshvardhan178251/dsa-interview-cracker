package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Best Time to Buy and Sell Stock
 * LeetCode: 121 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Greedy, One-pass minimum tracking
 *
 * <p>Problem:
 * You are given an array {@code prices} where {@code prices[i]} is the price of a given
 * stock on day {@code i}. You may buy on one day and sell on a later day. Return the
 * maximum profit you can achieve. If no profitable transaction exists, return 0.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 7 1 5 3 6 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: single left-to-right pass. Keep the cheapest price seen so far; for every
 * day compute the profit of selling today and keep the best one. The buy day never has
 * to be recorded explicitly because the running minimum always refers to some earlier day.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class BestTimeToBuyAndSellStock {

    /**
     * Returns the maximum profit from a single buy/sell transaction.
     *
     * @param prices daily prices, oldest first
     * @return the best achievable profit, or 0 when no profitable transaction exists
     */
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int best = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > best) {
                best = price - minPrice;
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] prices = fs.nextIntArray(n);

        System.out.println(maxProfit(prices));
    }
}
