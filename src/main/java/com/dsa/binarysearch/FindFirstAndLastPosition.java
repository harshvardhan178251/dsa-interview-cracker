package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Find First and Last Position of Element in Sorted Array
 * LeetCode: 34 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Lower-bound / upper-bound binary search
 *
 * <p>Problem:
 * Given a sorted array and a {@code target} value, return the starting and the ending index
 * of the target within that array. If the target is not present return {@code {-1, -1}}.
 * The array is sorted in non-decreasing order.
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
 * 5 7 7 8 8 10
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4
 * </pre>
 *
 * <p>Approach: the first occurrence is the <em>lower bound</em> of the target and the last
 * occurrence is the <em>upper bound</em> minus one. Two binary searches, each of which
 * converges on a boundary rather than on an element, give the whole answer.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class FindFirstAndLastPosition {

    /**
     * Returns the first and last index of {@code target} in the sorted array {@code nums}.
     *
     * @param nums   ascending (non-decreasing) values
     * @param target the value to look for
     * @return {@code {first, last}}, or {@code {-1, -1}} when the target is absent
     */
    public static int[] searchRange(int[] nums, int target) {
        int first = lowerBound(nums, target);
        if (first == nums.length || nums[first] != target) {
            return new int[]{-1, -1};
        }
        int last = upperBound(nums, target) - 1;
        return new int[]{first, last};
    }

    /** First index whose value is {@code >= target} (may be {@code nums.length}). */
    private static int lowerBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
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

    /** First index whose value is {@code > target} (may be {@code nums.length}). */
    private static int upperBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target) {
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

        int[] answer = searchRange(nums, target);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
