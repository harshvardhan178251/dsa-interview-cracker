package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Remove Element
 * LeetCode: 27 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code val}, remove every occurrence
 * of {@code val} from {@code nums} <em>in place</em> and return the number of elements
 * left. The surviving elements must keep their original relative order. The first
 * {@code k} positions of the array hold the survivors, where {@code k} is the returned
 * count.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * val
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 2 2 3 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: two pointers. {@code read} scans the array while {@code write} marks the
 * next free slot; every element that is not equal to {@code val} is copied to
 * {@code nums[write]} and {@code write} advances. The copy is a self-assignment when
 * {@code read == write}, so it is always safe.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class RemoveElement {

    /**
     * Removes every occurrence of {@code val} in place.
     *
     * @param nums array that is compacted in place
     * @param val  the value to strip out
     * @return the number of elements that remain
     */
    public static int removeElement(int[] nums, int val) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != val) {
                nums[write] = nums[read];
                write++;
            }
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int val = fs.nextInt();

        System.out.println(removeElement(nums, val));
    }
}
