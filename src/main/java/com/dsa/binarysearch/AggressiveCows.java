package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Aggressive Cows
 * LeetCode: null (classic "maximum aggression" problem) | Difficulty: Medium | Frequency: 3/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * There are {@code c} cows and {@code s} stalls along a single line. The stalls are given by
 * their positions on that line. Place the cows so that the minimum distance between any two
 * cows is as large as possible, and return that distance.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * stalls[0] stalls[1] ... stalls[n-1]
 * c
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 4 8 9
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: "can we place {@code c} cows with at least {@code d} distance between them?" is
 * a monotone question — if a distance {@code d} works, every smaller distance works too.
 * Greedily place each cow as far left as possible and binary search for the largest
 * feasible distance.
 *
 * <p>Complexity: Time O(n log(span)), Space O(n) for the sorted copy of the stalls.
 */
public class AggressiveCows {

    /**
     * Returns the largest minimum distance that still allows all cows to be placed.
     *
     * @param stalls positions of the stalls (order does not matter)
     * @param cows   number of cows to place
     * @return the maximum achievable minimum distance
     */
    public static int maxMinimumDistance(int[] stalls, int cows) {
        if (cows <= 1 || stalls.length < 2) {
            return 0;
        }
        int[] sorted = stalls.clone();
        Arrays.sort(sorted);

        int low = 0;
        int high = sorted[sorted.length - 1] - sorted[0];
        while (low < high) {
            // Round the midpoint up so the loop always makes progress.
            int mid = low + (high - low + 1) / 2;
            if (canPlace(sorted, cows, mid)) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }

    /** Greedy feasibility check: place each cow at the first stall far enough from the last one. */
    private static boolean canPlace(int[] sorted, int cows, int distance) {
        int placed = 1;
        int lastPosition = sorted[0];
        for (int i = 1; i < sorted.length; i++) {
            if (sorted[i] - lastPosition >= distance) {
                placed++;
                lastPosition = sorted[i];
                if (placed >= cows) {
                    return true;
                }
            }
        }
        return placed >= cows;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] stalls = fs.nextIntArray(n);
        int cows = fs.nextInt();

        System.out.println(maxMinimumDistance(stalls, cows));
    }
}
