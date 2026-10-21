package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Maximum Difference Between Two Elements of an Array
 * LeetCode: 1346 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Running minimum, One pass, Greedy
 *
 * <p>Problem:
 * Given an array {@code nums}, find the maximum value of {@code nums[j] - nums[i]} over
 * all pairs with {@code i < j} and {@code nums[i] < nums[j]}. When no such pair exists
 * the answer is {@code -1}.
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
 * 7 1 5 3 6 9 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: walk the array once and remember the **smallest value seen so far**.
 * For the current element {@code nums[j]} the best partner is that minimum, because
 * {@code nums[j] - min} is the largest difference ending at {@code j}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MaximumDifferenceBetweenTwoElements {

    /**
     * Returns the maximum difference {@code nums[j] - nums[i]} with {@code i < j}.
     *
     * @param nums the input array
     * @return the maximum positive difference, or {@code -1} when there is none
     */
    public static int maximumDifference(int[] nums) {
        if (nums == null || nums.length < 2) {
            return -1;
        }

        int smallest = Integer.MAX_VALUE;
        int best = -1;
        for (int value : nums) {
            if (value > smallest) {
                best = Math.max(best, value - smallest);
            }
            if (value < smallest) {
                smallest = value;
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maximumDifference(nums));
    }
}
