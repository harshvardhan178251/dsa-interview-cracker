package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Maximum Circular Subarray
 * LeetCode: 134 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Kadane's algorithm, Complement trick
 *
 * <p>Problem:
 * Given a circular array of integers {@code nums}, find the maximum sum of a non-empty
 * contiguous subarray of the circular array. A circular array means that the last element
 * is adjacent to the first element.
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
 * 5 -3 5 -2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Approach: the best circular subarray is either (a) an ordinary subarray, or (b) a
 * suffix followed by a prefix of the array, which is the complement of an ordinary
 * subarray. So the answer is {@code max(maxSubarray, total - minSubarray)}. The
 * {@code total - minSubarray} case is only valid when the array is not all negative.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MaxCircularSubarray {

    /**
     * Returns the largest sum of any non-empty contiguous subarray of the circular array.
     *
     * @param nums the circular input array
     * @return the maximum circular subarray sum, or 0 for an empty array
     */
    public static int maxCircularSubarraySum(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int total = 0;
        int maxSum = nums[0];
        int minSum = nums[0];
        int currentMax = 0;
        int currentMin = 0;
        for (int value : nums) {
            total += value;
            currentMax = Math.max(value, currentMax + value);
            maxSum = Math.max(maxSum, currentMax);
            currentMin = Math.min(value, currentMin + value);
            minSum = Math.min(minSum, currentMin);
        }
        if (maxSum < 0) {
            return maxSum; // every element is negative: the best answer is the largest one
        }
        return Math.max(maxSum, total - minSum);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxCircularSubarraySum(nums));
    }
}
