package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

/**
 * Problem: Running Sum of 1d Array
 * LeetCode: 1480 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Running sum, In-place accumulation
 *
 * <p>Problem:
 * Given an array {@code nums}, return an array where {@code result[i]} is the sum of
 * {@code nums[0..i]} — the running (prefix) sum of the original array.
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
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 6 10
 * </pre>
 *
 * <p>Approach: one pass with an accumulator. The accumulator holds the sum of everything
 * seen so far; each slot of the result receives the accumulator after the current value
 * has been added.
 *
 * <p>Complexity: Time O(n), Space O(n) for the result.
 */
public class RunningSum {

    /**
     * Returns the running sums of the array.
     *
     * @param nums the input array
     * @return an array where element {@code i} is the sum of {@code nums[0..i]}
     */
    public static int[] runningSum(int[] nums) {
        int[] result = new int[nums.length];
        int accumulator = 0;
        for (int i = 0; i < nums.length; i++) {
            accumulator += nums[i];
            result[i] = accumulator;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] result = runningSum(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < result.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(result[i]);
        }
        System.out.println(out);
    }
}
