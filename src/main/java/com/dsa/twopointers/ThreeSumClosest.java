package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: 3Sum Closest
 * LeetCode: 16 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Sorting, Running best
 *
 * <p>Problem:
 * Given an integer array {@code nums} of length {@code n} and an integer {@code target},
 * find the integer in {@code nums} such that the sum of three elements is closest to
 * {@code target}. Every input has exactly one answer.
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
 * -1 2 1 -4
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: sort the array, fix the first element and use two pointers for the other
 * two. Because the array is sorted, moving a pointer can only make the sum go up or
 * down, so the closest sum is always found by walking the pointers towards it.
 *
 * <p>Complexity: Time O(n²), Space O(n) for the sort.
 */
public class ThreeSumClosest {

    /**
     * Returns the sum of the three elements closest to {@code target}.
     *
     * @param nums   the input array (at least three elements)
     * @param target the wanted sum
     * @return the closest sum
     */
    public static int threeSumClosest(int[] nums, int target) {
        if (nums == null || nums.length < 3) {
            return Integer.MIN_VALUE;
        }

        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        int best = sorted[0] + sorted[1] + sorted[2];
        for (int i = 0; i < sorted.length - 2; i++) {
            int left = i + 1;
            int right = sorted.length - 1;
            while (left < right) {
                int sum = sorted[i] + sorted[left] + sorted[right];
                if (Math.abs(sum - target) < Math.abs(best - target)) {
                    best = sum;
                }
                if (sum == target) {
                    return sum;
                }
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(threeSumClosest(nums, target));
    }
}
