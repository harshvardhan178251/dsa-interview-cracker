package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Find Peak Element
 * LeetCode: 162 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a local extremum
 *
 * <p>Problem:
 * Given an array where no two adjacent elements are equal, return the index of any peak
 * element — an element that is strictly greater than both of its neighbours. The array is
 * not necessarily sorted.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: compare {@code nums[mid]} with {@code nums[mid + 1]}. If the array climbs
 * towards the right, a peak must exist to the right of {@code mid} (the climb has to end
 * somewhere); if it descends, a peak must exist at or to the left of {@code mid}. Either way
 * one half of the range can be discarded, so the search converges in O(log n) steps.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class PeakElement {

    /**
     * Returns the index of some peak element of {@code nums}.
     *
     * @param nums array with no two equal neighbours
     * @return the index of a peak
     */
    public static int peakElement(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[mid + 1]) {
                // Climbing: the peak is to the right.
                left = mid + 1;
            } else {
                // Descending: the peak is at mid or to the left.
                right = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(peakElement(nums));
    }
}
