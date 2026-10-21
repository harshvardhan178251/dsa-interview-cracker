package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Search in Rotated Sorted Array
 * LeetCode: 33 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Binary search on a rotated sorted array
 *
 * <p>Problem:
 * An array sorted in ascending order is rotated at an unknown pivot, for example
 * {@code [0,1,2,4,5,6,7]} becomes {@code [4,5,6,7,0,1,2]}. Given the rotated array and a
 * {@code target}, return the index of the target, or {@code -1} when it is absent. All values
 * are distinct.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 4 5 6 7 0 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: a rotated array still contains one sorted half. Compare {@code nums[mid]} with
 * {@code nums[left]}: if {@code nums[left] <= nums[mid]} the left half is sorted, otherwise the
 * right half is sorted. Check whether the target falls inside the sorted half's value range;
 * if it does, keep that half, otherwise keep the other one.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class SearchInRotatedSortedArray {

    /**
     * Returns the index of {@code target} inside the rotated sorted array {@code nums}.
     *
     * @param nums   rotated ascending array with distinct values
     * @param target the value to look for
     * @return the index of the target, or {@code -1} when it is absent
     */
    public static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[left] <= nums[mid]) {
                // The left half [left, mid] is sorted.
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // The right half [mid, right] is sorted.
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(search(nums, target));
    }
}
