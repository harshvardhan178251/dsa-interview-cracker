package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Single Number
 * LeetCode: 136 | Difficulty: Easy | Frequency: 5/5
 * Pattern: XOR
 *
 * <p>Problem:
 * Given an integer array {@code nums} in which **every element appears twice except for
 * one**, find and return the single element that appears exactly once.
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
 * 4 1 2 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: XOR every element. XOR is associative and commutative, so the pairs cancel
 * out ({@code x ^ x == 0}) and only the unpaired value survives.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class SingleNumber {

    /**
     * Returns the element that appears exactly once.
     *
     * @param nums an array where every element but one appears twice
     * @return the single element
     */
    public static int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(singleNumber(nums));
    }
}
