package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Find Minimum in Rotated Sorted Array
 * LeetCode: 153 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a rotated sorted array
 *
 * <p>Problem:
 * An array sorted in ascending order with distinct values is rotated at an unknown pivot,
 * for example {@code [0,1,2,4,5,6,7]} becomes {@code [4,5,6,7,0,1,2]}. Find and return the
 * minimum element.
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
 * 3 4 5 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: compare the middle element with the rightmost element. If
 * {@code nums[mid] > nums[right]} the minimum lies strictly to the right of {@code mid};
 * otherwise the minimum is at {@code mid} or to the left. One half is discarded each step.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class FindMinimumInRotatedSortedArray {

    /**
     * Returns the smallest element of the rotated sorted array {@code nums}.
     *
     * @param nums rotated ascending array with distinct values
     * @return the minimum element
     */
    public static int findMin(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                // The rotation point — and the minimum — is to the right of mid.
                left = mid + 1;
            } else {
                // nums[mid] is the smallest element seen so far.
                right = mid;
            }
        }
        return nums[left];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(findMin(nums));
    }
}
