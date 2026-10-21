package com.dsa.sorting;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Merge Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Merging
 *
 * <p>Problem: Sort an array of integers in ascending order with merge sort and return
 * the sorted array.
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
 * 5 2 4 6 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 4 5 6
 * </pre>
 *
 * <p>Approach: split the array in half, sort both halves recursively and merge the two
 * sorted halves back together in linear time. The recursion stops when a range holds
 * zero or one element.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MergeSort {

    /**
     * Sorts {@code nums} in ascending order.
     *
     * @param nums the array to sort
     * @return a new, sorted array
     */
    public static int[] mergeSort(int[] nums) {
        if (nums.length <= 1) {
            return nums;
        }
        int mid = nums.length / 2;
        int[] left = Arrays.copyOfRange(nums, 0, mid);
        int[] right = Arrays.copyOfRange(nums, mid, nums.length);

        int[] sortedLeft = mergeSort(left);
        int[] sortedRight = mergeSort(right);
        return merge(sortedLeft, sortedRight);
    }

    /**
     * Merges two sorted arrays into one sorted array.
     *
     * @param left  the first sorted array
     * @param right the second sorted array
     * @return the merged array
     */
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0;
        int j = 0;
        int k = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        while (i < left.length) {
            result[k++] = left[i++];
        }
        while (j < right.length) {
            result[k++] = right[j++];
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = mergeSort(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < sorted.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(sorted[i]);
        }
        System.out.println(sb);
    }
}
