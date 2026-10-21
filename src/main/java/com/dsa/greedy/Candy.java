package com.dsa.greedy;

import com.dsa.utils.FastScanner;

/**
 * Problem: Candy
 * LeetCode: 135 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Greedy, Two-pass constraint propagation
 *
 * <p>Problem:
 * Every child in a row of {@code n} children has a rating. Each child receives at
 * least one candy, and:
 * <ul>
 *   <li>a child with a higher rating than the left neighbour gets more candies;</li>
 *   <li>a child with a higher rating than the right neighbour gets more candies.</li>
 * </ul>
 * Return the fewest candies that satisfy both constraints.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * ratings[0] ratings[1] ... ratings[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 0 2 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: hand out one candy to everybody, then sweep left to right enforcing the
 * "greater than the left neighbour" rule and right to left enforcing the "greater than
 * the right neighbour" rule. Taking the maximum of the two passes keeps every
 * constraint satisfied and never hands out more than necessary.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Candy {

    /**
     * Returns the minimum total number of candies for the given ratings.
     *
     * @param ratings rating of every child, left to right
     * @return the minimum number of candies that satisfies both neighbour rules
     */
    public static int minCandies(int[] ratings) {
        if (ratings == null || ratings.length == 0) {
            return 0;
        }
        int n = ratings.length;
        int[] candies = new int[n];
        for (int i = 0; i < n; i++) {
            candies[i] = 1;
        }
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }
        int total = 0;
        for (int c : candies) {
            total += c;
        }
        return total;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] ratings = fs.nextIntArray(n);

        System.out.println(minCandies(ratings));
    }
}
