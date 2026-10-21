package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

/**
 * Problem: Hand of Straights
 * LeetCode: 846 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Frequency counting
 *
 * <p>Problem:
 * You are given an integer array {@code cards} and an integer {@code k}. Each card
 * carries a value. Decide whether the cards can be split into groups of exactly
 * {@code k} cards such that every group holds {@code k} consecutive values
 * ({@code x, x+1, ..., x+k-1}).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * cards[0] cards[1] ... cards[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 3 6 2 3 4
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: count how many cards carry each value. Walk the values in ascending
 * order. If value {@code v} still has {@code c} unused cards then every one of those
 * cards must open a group, and each of those groups also needs one card of every value
 * {@code v+1 .. v+k-1}. Take the {@code c} cards of each of those values or fail.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class HandOfStraights {

    /**
     * Returns whether the cards can be arranged into groups of {@code k} consecutive values.
     *
     * @param cards card values
     * @param k     size of every group
     * @return {@code true} when such a grouping exists
     */
    public static boolean isStraightHand(int[] cards, int k) {
        if (k <= 1) {
            return true;
        }
        if (cards == null || cards.length == 0) {
            return true;
        }
        if (cards.length % k != 0) {
            return false;
        }
        Map<Integer, Integer> count = new TreeMap<>();
        for (int card : cards) {
            count.merge(card, 1, Integer::sum);
        }
        for (Map.Entry<Integer, Integer> entry : new ArrayList<>(count.entrySet())) {
            int value = entry.getKey();
            int groups = entry.getValue();
            if (groups <= 0) {
                continue;
            }
            for (int offset = 1; offset < k; offset++) {
                Integer available = count.get(value + offset);
                if (available == null || available < groups) {
                    return false;
                }
                count.put(value + offset, available - groups);
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] cards = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(isStraightHand(cards, k) ? "true" : "false");
    }
}
