package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Remove Duplicates from Sorted Array
 * LeetCode: 26 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Given a sorted array {@code nums}, remove the duplicates <b>in place</b> so that the
 * first {@code k} elements contain the distinct values in sorted order. Return {@code k}.
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
 * 0 0 1 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 0 1 2
 * </pre>
 * The first line is the number of distinct values, the second line holds them.
 *
 * <p>Approach: two pointers over the same array - {@code read} scans every element,
 * {@code write} marks where the next distinct value goes. A value is copied only when it
 * differs from the last one written.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class RemoveDuplicatesFromSortedArray {

    /**
     * Removes the duplicates in place.
     *
     * @param nums a sorted array
     * @return the number of distinct values, stored in {@code nums[0 .. k-1]}
     */
    public static int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int write = 1;
        for (int read = 1; read < nums.length; read++) {
            if (nums[read] != nums[write - 1]) {
                nums[write++] = nums[read];
            }
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int k = removeDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(k);
        System.out.println(sb);
    }
}
