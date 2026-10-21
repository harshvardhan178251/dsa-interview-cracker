package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Capacity To Ship Packages Within D Days
 * LeetCode: 1011 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * A conveyor belt carries {@code n} packages in order; package {@code i} weighs
 * {@code weights[i]}. Every day a ship can carry a total weight of at most
 * {@code capacity}. Return the smallest capacity that allows all packages to be shipped
 * within {@code d} days.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * weights[0] weights[1] ... weights[n-1]
 * d
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 1 2 3 4 5 6
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: for a fixed capacity, greedily pack as many consecutive packages as fit each
 * day — this minimises the number of days because a package can never be split. The number of
 * days needed is monotone in the capacity, so binary search the smallest capacity that needs
 * at most {@code d} days.
 *
 * <p>Complexity: Time O(n log(sum(weights))), Space O(1).
 */
public class CapacityToShipPackages {

    /**
     * Returns the minimum ship capacity that ships every package within {@code days} days.
     *
     * @param weights the package weights in conveyor order
     * @param days    the number of available days
     * @return the smallest feasible capacity
     */
    public static int shipWithinDays(int[] weights, int days) {
        long low = 0;
        long high = 0;
        for (int weight : weights) {
            low = Math.max(low, weight);
            high += weight;
        }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (daysNeeded(weights, mid) <= days) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return (int) low;
    }

    /** Days required when each day may carry at most {@code capacity} weight. */
    private static int daysNeeded(int[] weights, long capacity) {
        int days = 1;
        long load = 0;
        for (int weight : weights) {
            if (load + weight > capacity) {
                days++;
                load = 0;
            }
            load += weight;
        }
        return days;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] weights = fs.nextIntArray(n);
        int days = fs.nextInt();

        System.out.println(shipWithinDays(weights, days));
    }
}
