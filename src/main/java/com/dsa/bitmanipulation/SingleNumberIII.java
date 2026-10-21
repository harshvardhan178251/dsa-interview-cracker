package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Single Number III
 * LeetCode: 260 | Difficulty: Medium | Frequency: 4/5
 * Pattern: XOR, Bit partitioning
 *
 * <p>Problem:
 * Given an integer array {@code nums} in which **exactly two** elements appear once and every
 * other element appears twice, return the two single elements in ascending order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 1 2 1 3 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 5
 * </pre>
 *
 * <p>Approach: XOR everything — the result is {@code a ^ b}, the two singles combined. Its
 * lowest set bit is a bit where {@code a} and {@code b} differ. Partition the array by that
 * bit: each half then contains exactly one single element, and XORing each half gives one of
 * them.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class SingleNumberIII {

    /**
     * Returns the two elements that appear exactly once, in ascending order.
     *
     * @param nums an array where exactly two elements appear once
     * @return {@code {a, b}} with {@code a <= b}
     */
    public static int[] singleNumberIII(int[] nums) {
        int xorAll = 0;
        for (int num : nums) {
            xorAll ^= num;
        }
        // The lowest set bit of xorAll is a bit where the two singles differ.
        int differingBit = xorAll & (-xorAll);

        int a = 0;
        int b = 0;
        for (int num : nums) {
            if ((num & differingBit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return new int[]{Math.min(a, b), Math.max(a, b)};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = singleNumberIII(nums);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
