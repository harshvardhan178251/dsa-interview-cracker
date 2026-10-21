package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Koko Eating Bananas
 * LeetCode: 875 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * Koko eats bananas at a constant speed of {@code x} bananas per hour and prefers to eat as
 * many bananas as possible each hour, so she finishes a pile of {@code p} bananas in
 * {@code ceil(p / x)} hours. Given a list of piles and a limit of {@code h} hours, find the
 * minimum speed at which she can finish all the piles.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * piles[0] piles[1] ... piles[n-1]
 * h
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 1 4 1 5
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: "can Koko finish in time at speed x?" is a monotone yes/no question — a faster
 * Koko never needs more hours than a slower one. Binary search the smallest speed for which
 * the answer is yes. The search range is {@code [1, max(piles)]}.
 *
 * <p>Complexity: Time O(n log max(piles)), Space O(1).
 */
public class KokoEatingBananas {

    /**
     * Returns the minimum eating speed that lets Koko finish every pile within {@code h} hours.
     *
     * @param piles the banana counts of each pile
     * @param h     the hour budget
     * @return the smallest feasible speed
     */
    public static int minEatingSpeed(int[] piles, int h) {
        int low = 1;
        int high = 0;
        for (int pile : piles) {
            high = Math.max(high, pile);
        }
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (hoursNeeded(piles, mid) <= h) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    /** Total hours Koko needs at the given speed (ceiling division per pile). */
    private static long hoursNeeded(int[] piles, int speed) {
        long hours = 0;
        for (int pile : piles) {
            hours += ((long) pile + speed - 1) / speed;
        }
        return hours;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] piles = fs.nextIntArray(n);
        int h = fs.nextInt();

        System.out.println(minEatingSpeed(piles, h));
    }
}
