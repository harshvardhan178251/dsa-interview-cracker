package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Coin Change with Greedy
 * LeetCode: none | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Largest denomination first
 *
 * <p>Problem:
 * Given an amount and a set of coin denominations, return the minimum number of coins
 * needed to make up that amount using the greedy strategy — always take as many coins as
 * possible of the largest denomination that still fits. Return {@code -1} when the
 * amount cannot be made up.
 *
 * <p>The greedy strategy is optimal for a <em>canonical</em> coin system such as
 * {@code 1, 5, 10, 25} (or any currency where every denomination is a multiple of the
 * one below it). For an arbitrary coin set the greedy answer can be larger than the
 * optimum and a dynamic program is required.
 *
 * <p>Input format (stdin):
 * <pre>
 * amount
 * k
 * coins[0] coins[1] ... coins[k-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 63
 * 4
 * 1 5 10 25
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: sort the denominations descending and, for each of them, take
 * {@code amount / coin} coins and shrink the remaining amount. Stop as soon as the
 * amount reaches zero.
 *
 * <p>Complexity: Time O(k log k), Space O(k).
 */
public class GreedyCoinChange {

    /**
     * Returns the number of coins the greedy strategy uses for {@code amount}.
     *
     * @param amount amount to make up, {@code amount >= 0}
     * @param coins  the available denominations
     * @return the number of coins, or {@code -1} when the amount cannot be made up
     */
    public static int minCoins(int amount, int[] coins) {
        if (amount <= 0) {
            return 0;
        }
        if (coins == null || coins.length == 0) {
            return -1;
        }
        int[] sorted = coins.clone();
        Arrays.sort(sorted);

        int used = 0;
        int remaining = amount;
        for (int i = sorted.length - 1; i >= 0 && remaining > 0; i--) {
            int coin = sorted[i];
            if (coin <= 0) {
                continue;
            }
            int take = remaining / coin;
            if (take > 0) {
                used += take;
                remaining -= take * coin;
            }
        }
        return remaining == 0 ? used : -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int amount = fs.nextInt();
        int k = fs.nextInt();
        int[] coins = fs.nextIntArray(k);

        System.out.println(minCoins(amount, coins));
    }
}
