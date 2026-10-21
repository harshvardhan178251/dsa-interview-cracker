package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

/**
 * Problem: Pivot Index
 * LeetCode: 724 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Prefix sums, Running balance
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the index of the pivot element, where the
 * pivot is the element for which the sum of all elements strictly to its left equals the
 * sum of all elements strictly to its right. If no such element exists, return -1. If
 * several pivots exist, return the leftmost one.
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
 * <p>Approach: compute the total once, then walk the array keeping the sum of the
 * elements already passed. At index {@code i} the left sum is {@code left} and the right
 * sum is {@code total - left - nums[i]}; the two are equal exactly at a pivot.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class PivotIndex {

    /**
     * Returns the index of the leftmost pivot element.
     *
     * @param nums the input array
     * @return the pivot index, or -1 when there is none
     */
    public static int pivotIndex(int[] nums) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) {
                return i;
            }
            left += nums[i];
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(pivotIndex(nums));
    }
}
