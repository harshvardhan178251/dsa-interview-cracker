package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Minimum Absolute Difference
 * LeetCode: 1200 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Sorting, Adjacent pair scan
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the smallest absolute difference between
 * any two <em>distinct</em> elements of the array. (LeetCode 1200 asks for the values
 * themselves; this variant returns the difference.)
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
 * 4 2 1 3 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: after sorting, the closest pair must be adjacent — if two values were
 * the closest but not adjacent, the values between them would be even closer. So one
 * sort plus a single linear scan over the sorted array gives the answer.
 *
 * <p>Complexity: Time O(n log n), Space O(n) for the sorted copy.
 */
public class MinimumAbsoluteDifference {

    /**
     * Returns the smallest absolute difference between two distinct elements.
     *
     * @param nums the input array (at least two elements)
     * @return the smallest absolute difference, or 0 when fewer than two elements exist
     */
    public static int minimumAbsoluteDifference(int[] nums) {
        if (nums.length < 2) {
            return 0;
        }
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int best = Integer.MAX_VALUE;
        for (int i = 1; i < sorted.length; i++) {
            best = Math.min(best, sorted[i] - sorted[i - 1]);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(minimumAbsoluteDifference(nums));
    }
}
