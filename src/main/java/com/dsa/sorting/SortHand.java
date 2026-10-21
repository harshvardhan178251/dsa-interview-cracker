package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sort a Hand of Cards
 * LeetCode: null | Difficulty: Medium | Frequency: 2/5
 * Pattern: Radix sort, Stable counting sort
 *
 * <p>Problem: A standard deck has 13 ranks (1 = Ace … 13 = King) and 4 suits
 * (0 = Clubs, 1 = Diamonds, 2 = Hearts, 3 = Spades). Sort a dealt hand of {@code n}
 * cards into canonical deck order: ranks ascending, and inside a rank the suits in
 * the order Clubs, Diamonds, Hearts, Spades.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * rank[0] suit[0] rank[1] suit[1] ... rank[n-1] suit[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 5 2 3 0 5 1 3 3 5 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 0 3 3 5 0 5 1 5 2
 * </pre>
 *
 * <p>Approach: pack every card into a single key {@code rank * 4 + suit} and run a
 * least-significant-digit radix sort: a stable counting sort by suit, then a stable
 * counting sort by rank.
 *
 * <p>Complexity: Time O(n + 13 + 4) = O(n), Space O(n).
 */
public class SortHand {

    /**
     * Sorts a hand of cards into canonical deck order.
     *
     * @param ranks the rank of every card (1 … 13)
     * @param suits the suit of every card (0 … 3)
     * @return an array of {@code {rank, suit}} pairs in sorted order
     */
    public static int[][] sortHand(int[] ranks, int[] suits) {
        int n = ranks.length;

        // Pack the card into one key: the suit becomes the least significant digit.
        int[] keys = new int[n];
        for (int i = 0; i < n; i++) {
            keys[i] = ranks[i] * 4 + suits[i];
        }

        // Pass 1: stable counting sort by suit (the least significant digit).
        keys = countingSort(keys, 1, 4);
        // Pass 2: stable counting sort by rank (the most significant digit).
        keys = countingSort(keys, 4, 14);

        int[][] hand = new int[n][2];
        for (int i = 0; i < n; i++) {
            hand[i][0] = keys[i] / 4;
            hand[i][1] = keys[i] % 4;
        }
        return hand;
    }

    /**
     * Stable counting sort by the digit {@code (key / divisor) % bucketCount}.
     *
     * @param keys        the keys to sort
     * @param divisor     the power of the digit to sort by (1 = least significant)
     * @param bucketCount the number of buckets of that digit
     * @return a new array with the keys sorted by that digit
     */
    private static int[] countingSort(int[] keys, int divisor, int bucketCount) {
        int[] counts = new int[bucketCount];
        for (int key : keys) {
            counts[(key / divisor) % bucketCount]++;
        }
        // Prefix sums turn the counts into the end position of every bucket.
        for (int i = 1; i < bucketCount; i++) {
            counts[i] += counts[i - 1];
        }

        int[] result = new int[keys.length];
        // Walking backwards keeps the sort stable.
        for (int i = keys.length - 1; i >= 0; i--) {
            int bucket = (keys[i] / divisor) % bucketCount;
            result[--counts[bucket]] = keys[i];
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] ranks = new int[n];
        int[] suits = new int[n];
        for (int i = 0; i < n; i++) {
            ranks[i] = fs.nextInt();
            suits[i] = fs.nextInt();
        }

        int[][] hand = sortHand(ranks, suits);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < hand.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(hand[i][0]).append(' ').append(hand[i][1]);
        }
        System.out.println(sb);
    }
}
