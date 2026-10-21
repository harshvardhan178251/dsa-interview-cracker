package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Dutch National Flag
 * LeetCode: 75 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Three-way partitioning, Two pointers
 *
 * <p>Problem: An array holds only the values {@code 0}, {@code 1} and {@code 2}. Sort
 * it in place so that all the zeros come first, then all the ones, then all the
 * twos — in a single pass over the array.
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
 * 2 0 2 1 1 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 0 1 1 2 2
 * </pre>
 *
 * <p>Approach: three pointers. {@code low} marks the end of the zero region,
 * {@code mid} is the current element and {@code high} marks the start of the two
 * region. Everything before {@code low} is a zero, everything from {@code high} on is
 * a two, and everything between is a one.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class DutchNationalFlag {

    /**
     * Sorts {@code nums} so that all zeros come before all ones and all ones before
     * all twos.
     *
     * @param nums the array to sort, containing only 0, 1 and 2
     * @return the same array, sorted
     */
    public static int[] dutchNationalFlag(int[] nums) {
        int low = 0;
        int mid = 0;
        int high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low, mid);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high);
                high--;
            }
        }
        return nums;
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

        int[] sorted = dutchNationalFlag(nums);

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
