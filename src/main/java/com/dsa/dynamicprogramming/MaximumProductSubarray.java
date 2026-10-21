package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Maximum Product Subarray
 * LeetCode: 152 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bottom-up DP, State compression
 *
 * <p>Problem: Return the largest product of a **contiguous** non-empty subarray of an integer array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 3 -2 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Keep the maximum **and** the minimum product ending at each position, because a negative number turns the minimum into the maximum.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MaximumProductSubarray {

    /**
     * Returns the largest product of a contiguous non-empty subarray.
     *
     * <p>A negative number flips the sign, so the smallest product ending at a position can become the
     * largest one after multiplying by the next element. Both extremes are therefore tracked.
     *
     * @param nums the input array
     * @return the maximum product of a contiguous subarray
     */
    public static int maxProduct(int[] nums) {
        int best = nums[0];
        int maxEnding = nums[0]; // largest product of a subarray ending here
        int minEnding = nums[0]; // smallest product of a subarray ending here

        for (int i = 1; i < nums.length; i++) {
            int value = nums[i];
            int candidateMax = Math.max(value, Math.max(maxEnding * value, minEnding * value));
            int candidateMin = Math.min(value, Math.min(maxEnding * value, minEnding * value));
            maxEnding = candidateMax;
            minEnding = candidateMin;
            best = Math.max(best, maxEnding);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxProduct(nums));
    }
}
