package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Rod Cutting
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Unbounded knapsack, Bottom-up DP
 *
 * <p>Problem: Given the price of a rod of every length from 1 up to `n`, and the fact that a cut costs nothing, return the highest revenue obtainable by cutting the rod into pieces.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * price[0] price[1] ... price[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 6 8 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 12
 * </pre>
 *
 * <p>Approach: For every length, try every possible first cut and keep the best price plus the best revenue of the remainder.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class RodCutting {

    /**
     * Returns the highest revenue obtainable from a rod of {@code length} units.
     *
     * <p>{@code price[i]} is the price of an uncut rod of length {@code i + 1}. A rod may be cut into
     * any number of pieces and every piece is sold at its own length price.
     *
     * @param length the length of the rod
     * @param price  the price of a rod of length {@code i + 1} is {@code price[i]}
     * @return the maximum revenue
     */
    public static int maxRevenue(int length, int[] price) {
        int[] dp = new int[length + 1];

        for (int i = 1; i <= length; i++) {
            int best = 0;
            for (int cut = 1; cut <= i; cut++) {
                // sell a piece of length 'cut' and solve the rest
                best = Math.max(best, price[cut - 1] + dp[i - cut]);
            }
            dp[i] = best;
        }
        return dp[length];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] price = fs.nextIntArray(n);

        System.out.println(maxRevenue(n, price));
    }
}
