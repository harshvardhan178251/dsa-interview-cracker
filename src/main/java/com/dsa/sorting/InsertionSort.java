package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Insertion Sort
 * LeetCode: null | Difficulty: Easy | Frequency: 3/5
 * Pattern: Comparison sort, Growing sorted prefix
 *
 * <p>Problem: Sort an array of integers in ascending order with the insertion sort
 * algorithm and return the sorted array.
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
 * <p>Approach: the first element is a sorted prefix of length one. For every following
 * element, take it out ("the key"), shift all larger elements of the prefix one
 * position to the right and drop the key into the gap.
 *
 * <p>Complexity: Time O(n²) worst case, O(n) best case, Space O(1).
 */
public class InsertionSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] insertionSort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            int key = nums[i];
            int j = i - 1;
            // Shift every larger element of the sorted prefix one step to the right.
            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
        return nums;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = insertionSort(nums);

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
