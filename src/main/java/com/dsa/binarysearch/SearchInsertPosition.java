package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Search Insert Position
 * LeetCode: 35 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Lower-bound binary search
 *
 * <p>Problem:
 * Given a sorted array of distinct ascending integers and a {@code target} value, return the
 * index where {@code target} would be inserted to keep the array sorted. When the target is
 * already present the returned index is the position of an existing equal element.
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
 * 1 3 5 6 8 9
 * 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: this is the <em>lower bound</em> of the target — the first index whose value is
 * greater than or equal to it. Binary search keeps the invariant that every element before
 * {@code left} is strictly smaller than the target and every element from {@code right} on is
 * strictly larger, so the answer is {@code left} when the range collapses.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class SearchInsertPosition {

    /**
     * Returns the index at which {@code target} belongs in the sorted array {@code nums}.
     *
     * @param nums   ascending, distinct values
     * @param target the value to locate
     * @return the insertion index, in {@code [0, nums.length]}
     */
    public static int searchInsert(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        // Invariant: nums[left-1] < target <= nums[right] (out-of-range indices read as -inf / +inf).
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(searchInsert(nums, target));
    }
}
