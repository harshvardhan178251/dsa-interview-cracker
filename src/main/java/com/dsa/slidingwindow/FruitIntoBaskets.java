package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Fruit Into Baskets
 * LeetCode: 904 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * You have two baskets and each can hold a single fruit type. Given an array
 * {@code fruits} where {@code fruits[i]} is the type of the i-th fruit, return the largest
 * number of fruits you can pick with the two baskets, picking them in order and never
 * picking a fruit type that has already been picked.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * fruits[0] fruits[1] ... fruits[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 2 2
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: the problem is "longest subarray with at most {@code k} distinct values".
 * Slide a window, keep a map of the value frequencies, and shrink the window from the left
 * whenever the window holds more than {@code k} distinct values.
 *
 * <p>Complexity: Time O(n), Space O(k).
 */
public class FruitIntoBaskets {

    /**
     * Returns the largest number of fruits that can be collected with {@code k} baskets.
     *
     * @param fruits the fruit types, in picking order
     * @param k     the number of baskets (distinct types allowed)
     * @return the maximum number of fruits
     */
    public static int maxFruitBaskets(int[] fruits, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < fruits.length; right++) {
            count.merge(fruits[right], 1, Integer::sum);
            while (count.size() > k) {
                int outgoing = fruits[left];
                int remaining = count.merge(outgoing, -1, Integer::sum);
                if (remaining == 0) {
                    count.remove(outgoing);
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] fruits = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxFruitBaskets(fruits, k));
    }
}
