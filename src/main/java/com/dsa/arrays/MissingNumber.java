package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Missing Number
 * LeetCode: 268 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Arithmetic, XOR trick
 *
 * <p>Problem:
 * Given an array {@code nums} containing {@code n} distinct integers taken from the range
 * {@code 0 .. n} (inclusive), return the single number that is missing from it.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 1 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the complete range {@code 0 .. n} sums to {@code n(n+1)/2}. Subtracting
 * the sum of the given array leaves exactly the missing number. The XOR variant (XOR all
 * values with all indices) avoids overflow and works for any n.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MissingNumber {

    /**
     * Returns the missing number of the range {@code 0 .. nums.length}.
     *
     * @param nums the array that misses exactly one value
     * @return the missing number
     */
    public static int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int value : nums) {
            actual += value;
        }
        return expected - actual;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(missingNumber(nums));
    }
}
