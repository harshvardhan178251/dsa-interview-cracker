package com.dsa.templates;

import java.util.Arrays;

/**
 * Copy-paste starting points for the three binary-search shapes.
 *
 * <p>See the [binary search notes](../../../docs/topics/07-binarysearch.md) for when to use
 * each one.
 */
public final class BinarySearchTemplate {

    private BinarySearchTemplate() {
    }

    /** Exact match. Returns the index of {@code target}, or -1. */
    public static int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;      // avoids overflow
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    /** First index where {@code nums[i] >= target}. May return {@code nums.length}. */
    public static int lowerBound(int[] nums, int target) {
        int low = 0;
        int high = nums.length;

        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    /** First index where {@code nums[i] > target}. May return {@code nums.length}. */
    public static int upperBound(int[] nums, int target) {
        int low = 0;
        int high = nums.length;

        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] <= target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    /**
     * Binary search on the answer.
     *
     * <p>Find the smallest {@code x} in {@code [min, max]} for which {@code can(x)} is true.
     * {@code can} must be **monotone**: if {@code can(x)} holds, {@code can(y)} holds for
     * every {@code y > x}.
     */
    public static int searchOnAnswer(int min, int max, java.util.function.IntPredicate can) {
        int low = min;
        int high = max;

        while (low < high) {
            int mid = low + (high - low) / 2;
            if (can.test(mid)) {
                high = mid;                       // feasible — try something smaller
            } else {
                low = mid + 1;                    // infeasible — need more
            }
        }
        return low;
    }

    /** Search in a rotated sorted array (no duplicates). */
    public static int searchRotated(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[low] <= nums[mid]) {         // the left half is sorted
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {                              // the right half is sorted
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = {1, 3, 5, 7, 9, 11};
        System.out.println("search(7)          = " + search(sorted, 7));
        System.out.println("lowerBound(7)      = " + lowerBound(sorted, 7));
        System.out.println("upperBound(7)      = " + upperBound(sorted, 7));
        System.out.println("searchRotated      = "
                + searchRotated(new int[]{4, 5, 6, 1, 2, 3}, 1));
        System.out.println("searchOnAnswer     = "
                + searchOnAnswer(1, 100, x -> canEatAll(x, new int[]{30, 11, 23, 4, 20}, 5)));
        System.out.println("first/last position= " + Arrays.toString(
                new int[]{lowerBound(sorted, 7), upperBound(sorted, 7) - 1}));
    }

    private static boolean canEatAll(int speed, int[] piles, int hours) {
        long taken = 0;
        for (int pile : piles) {
            taken += (pile + speed - 1) / speed;    // ceiling division
        }
        return taken <= hours;
    }
}
