package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Bubble Sort
 * LeetCode: null | Difficulty: Easy | Frequency: 3/5
 * Pattern: Comparison sort, Repeated swapping
 *
 * <p>Problem: Sort an array of integers in ascending order with the bubble sort
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
 * <p>Approach: repeated passes over the array. In every pass adjacent elements are
 * compared and swapped when they are out of order, so the largest remaining element
 * "bubbles" to the end of the unsorted region. A pass without a single swap means
 * the array is sorted and the algorithm stops early.
 *
 * <p>Complexity: Time O(n²) worst case, O(n) best case, Space O(1).
 */
public class BubbleSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] bubbleSort(int[] nums) {
        for (int end = nums.length - 1; end > 0; end--) {
            boolean swapped = false;
            for (int i = 0; i < end; i++) {
                if (nums[i] > nums[i + 1]) {
                    int temp = nums[i];
                    nums[i] = nums[i + 1];
                    nums[i + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break; // no swap in a whole pass -> already sorted
            }
        }
        return nums;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = bubbleSort(nums);

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
