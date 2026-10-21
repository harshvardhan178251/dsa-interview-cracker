package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Find Minimum and Maximum Element
 * LeetCode: 1470 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Linear scan, Single pass
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return its smallest element and its largest
 * element. The array is not guaranteed to be sorted and may contain duplicates and
 * negative values.
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
 * 3 -1 8 8 0 -5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -5 8
 * </pre>
 *
 * <p>Approach: one linear pass keeps a running minimum and a running maximum. Both are
 * seeded with the first element so the very first comparison needs no special case.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class FindMinimumAndMaximumElement {

    /**
     * Returns the smallest and the largest element of the array.
     *
     * @param nums the input array
     * @return {@code {min, max}}
     */
    public static int[] minAndMax(int[] nums) {
        if (nums.length == 0) {
            return new int[]{Integer.MIN_VALUE, Integer.MAX_VALUE};
        }
        int min = nums[0];
        int max = nums[0];
        for (int value : nums) {
            if (value < min) {
                min = value;
            }
            if (value > max) {
                max = value;
            }
        }
        return new int[]{min, max};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = minAndMax(nums);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
