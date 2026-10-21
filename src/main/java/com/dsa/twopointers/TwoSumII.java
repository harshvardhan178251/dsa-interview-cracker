package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Two Sum II - Input Array Is Sorted
 * LeetCode: 167 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Sorted array
 *
 * <p>Problem:
 * Given a 1-indexed sorted array {@code nums} and an integer {@code target}, return the
 * 1-based indices of the two numbers that add up to {@code target}. Exactly one
 * solution exists and the same element may not be used twice.
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
 * 4
 * 2 7 11 15
 * 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * </pre>
 *
 * <p>Approach: two pointers, one at each end. The sum of the two ends tells us which
 * pointer has to move: if the sum is too small, the left pointer moves right; if it is
 * too large, the right pointer moves left. Because the array is sorted, moving the
 * wrong pointer cannot produce the target.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class TwoSumII {

    /**
     * Returns the 1-based indices of the two numbers that add up to {@code target}.
     *
     * @param nums   a sorted array
     * @param target the required sum
     * @return {@code {i, j}} with 1-based indices, or {@code {-1, -1}} when no pair exists
     */
    public static int[] twoSumII(int[] nums, int target) {
        if (nums == null || nums.length < 2) {
            return new int[]{-1, -1};
        }

        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            }
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = twoSumII(nums, target);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
