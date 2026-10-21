package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Move Zeroes
 * LeetCode: 283 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Move all the {@code 0}s of an array to the <b>end</b> of it, keeping the relative
 * order of the non-zero elements. The operation must be done in place.
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
 * 0 1 0 3 12
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 12 0 0
 * </pre>
 *
 * <p>Approach: two pointers over the same array. {@code read} scans every element and
 * {@code write} marks the next free position for a non-zero value. The zeroes are
 * simply left behind and overwritten by zeros at the end.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MoveZeroes {

    /**
     * Moves the zeroes to the end in place, keeping the order of the other values.
     *
     * @param nums the array that is rearranged
     */
    public static void moveZeroes(int[] nums) {
        if (nums == null) {
            return;
        }

        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                nums[write++] = nums[read];
            }
        }
        while (write < nums.length) {
            nums[write++] = 0;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        moveZeroes(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < nums.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(sb);
    }
}
