package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Search in Rotated Sorted Array II
 * LeetCode: 81 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a rotated array with duplicates
 *
 * <p>Problem:
 * An ascending array of integers may contain duplicates and is rotated at an unknown pivot.
 * Given the rotated array and a {@code target}, return {@code true} if the target is present.
 * This version is a decision problem, so the answer is a boolean rather than an index.
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
 * 2 5 6 0 0 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: identical to the distinct-value version, except for the case
 * {@code nums[left] == nums[mid] == nums[right]}. There we cannot tell which half is sorted,
 * so we shrink the range by one on both sides — this is the only step that can degrade the
 * running time to O(n), and it happens at most once per such ambiguity.
 *
 * <p>Complexity: Time O(log n) in the average case, O(n) in the worst case (all elements equal).
 * Space O(1).
 */
public class SearchInRotatedSortedArrayII {

    /**
     * Returns {@code true} when {@code target} occurs in the rotated sorted array {@code nums}.
     *
     * @param nums   rotated ascending array, duplicates allowed
     * @param target the value to look for
     * @return whether the target is present
     */
    public static boolean search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return true;
            }
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                // Ambiguous: shrink both ends.
                left++;
                right--;
            } else if (nums[left] <= nums[mid]) {
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
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(search(nums, target));
    }
}
