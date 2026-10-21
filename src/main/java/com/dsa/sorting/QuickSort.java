package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Quick Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Partitioning
 *
 * <p>Problem: Sort an array of integers in ascending order with quick sort and return
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
 * <p>Approach: pick a pivot, partition the range so that everything smaller than the
 * pivot is on its left and everything greater is on its right, then recurse into both
 * sides. The partition uses the Lomuto scheme with the last element of the range as
 * the pivot.
 *
 * <p>Complexity: Time O(n log n) on average, O(n²) worst case, Space O(log n) for the
 * recursion stack.
 */
public class QuickSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] quickSort(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    /** Sorts the range {@code nums[low..high]} in place. */
    private static void quickSort(int[] nums, int low, int high) {
        if (low >= high) {
            return; // zero or one element -> already sorted
        }
        int pivotIndex = partition(nums, low, high);
        quickSort(nums, low, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, high);
    }

    /**
     * Moves every element smaller than or equal to the pivot to the left of it and
     * returns the final index of the pivot.
     */
    private static int partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int boundary = low - 1; // last index of the "smaller or equal" region

        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                boundary++;
                swap(nums, boundary, j);
            }
        }
        swap(nums, boundary + 1, high); // put the pivot between the two regions
        return boundary + 1;
    }

    /** Swaps two elements of the array. */
    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = quickSort(nums);

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
