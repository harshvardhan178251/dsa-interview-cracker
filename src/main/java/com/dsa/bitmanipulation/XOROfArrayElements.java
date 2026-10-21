package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: XOR of All Elements
 * LeetCode: 1486 | Difficulty: Easy | Frequency: 3/5
 * Pattern: XOR
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the bitwise XOR of **all** elements of the
 * array.
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
 * 4
 * </pre>
 *
 * <p>Approach: fold the array with XOR. XOR is associative and commutative, so the order does
 * not matter, and every value that appears an even number of times cancels out.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class XOROfArrayElements {

    /**
     * Returns the bitwise XOR of every element of {@code nums}.
     *
     * @param nums the input array
     * @return the XOR of all elements
     */
    public static int xorAll(int[] nums) {
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

        System.out.println(xorAll(nums));
    }
}
