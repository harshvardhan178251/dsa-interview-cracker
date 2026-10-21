package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Binary Search
 * LeetCode: 704 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on a sorted index range
 *
 * <p>Problem:
 * Given an array of integers {@code nums} sorted in ascending order with all values
 * distinct, and a {@code target} value, return the index of {@code target}. If the target is
 * not present in {@code nums}, return {@code -1}.
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
 * 6
 * -1 0 3 5 9 12
 * 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: keep the still-viable index range {@code [left, right]}. Look at the middle
 * element; if it equals the target we are done, otherwise throw away the half that cannot
 * contain the target. The range halves every iteration, so the search takes O(log n) steps.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class BinarySearch {

    /**
     * Returns the index of {@code target} in the sorted array {@code nums}.
     *
     * @param nums   ascending, distinct values
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
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
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
