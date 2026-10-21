package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Heap Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Heap, In-place sorting
 *
 * <p>Problem: Sort an array of integers in ascending order with heap sort and return
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
 * <p>Approach: build a max heap in place, then repeatedly move the root (the largest
 * element) to the end of the unsorted region and restore the heap property by
 * sifting the new root down.
 *
 * <p>Complexity: Time O(n log n), Space O(1).
 */
public class HeapSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] heapSort(int[] nums) {
        int n = nums.length;

        // Build the max heap: every internal node is sifted down, from bottom to top.
        for (int i = n / 2 - 1; i >= 0; i--) {
            siftDown(nums, i, n);
        }

        // Move the maximum to the back, then repair the heap.
        for (int end = n - 1; end > 0; end--) {
            swap(nums, 0, end);
            siftDown(nums, 0, end);
        }
        return nums;
    }

    /**
     * Restores the max heap property by moving the value at {@code root} down until
     * both of its children are smaller than it.
     *
     * @param nums the heap
     * @param root the index to start from
     * @param size the number of elements that belong to the heap
     */
    private static void siftDown(int[] nums, int root, int size) {
        while (true) {
            int largest = root;
            int left = 2 * root + 1;
            int right = 2 * root + 2;

            if (left < size && nums[left] > nums[largest]) {
                largest = left;
            }
            if (right < size && nums[right] > nums[largest]) {
                largest = right;
            }
            if (largest == root) {
                return; // the heap property holds here
            }
            swap(nums, root, largest);
            root = largest;
        }
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

        int[] sorted = heapSort(nums);

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
