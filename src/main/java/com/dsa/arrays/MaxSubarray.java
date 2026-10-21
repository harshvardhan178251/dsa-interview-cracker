package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Maximum Subarray
 * LeetCode: 53 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dynamic programming, Kadane's algorithm
 *
 * <p>Problem:
 * Given an integer array {@code nums}, find the contiguous non-empty subarray with the
 * largest sum and return that sum.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * -2 1 -3 4 -1 2 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Kadane's algorithm. {@code current} is the best sum of a subarray that ends
 * at the current position; at every index we either extend the previous subarray or start
 * a fresh one at this element, whichever is larger. {@code best} remembers the global
 * maximum seen so far.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MaxSubarray {

    /**
     * Returns the largest sum obtainable from a contiguous subarray.
     *
     * @param nums the input array
     * @return the maximum subarray sum, or 0 for an empty array
     */
    public static int maxSubarraySum(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int best = nums[0];
        int current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxSubarraySum(nums));
    }
}
