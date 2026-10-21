package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sort Array By Parity
 * LeetCode: 905 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, Partitioning
 *
 * <p>Problem: Given an array of integers, move every even number before every odd
 * number. The relative order inside the two groups does not matter.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 3 1 2 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 2 1 3
 * </pre>
 *
 * <p>Approach: two pointers walking towards each other. The left pointer skips over
 * the even numbers that are already in place, the right pointer skips over the odd
 * numbers that are already in place, and the two that meet are swapped.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class SortArrayByParity {

    /**
     * Rearranges {@code nums} so that every even number comes before every odd
     * number.
     *
     * @param nums the array to rearrange, in place
     * @return the same array, rearranged
     */
    public static int[] sortArrayByParity(int[] nums) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            // Move the left pointer to the first odd number.
            while (left < right && nums[left] % 2 == 0) {
                left++;
            }
            // Move the right pointer to the first even number.
            while (left < right && nums[right] % 2 != 0) {
                right--;
            }
            if (left < right) {
                swap(nums, left, right);
                left++;
                right--;
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

        int[] sorted = sortArrayByParity(nums);

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
