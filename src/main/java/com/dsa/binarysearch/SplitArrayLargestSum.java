package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Split Array Largest Sum
 * LeetCode: 410 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * Given a non-negative array {@code nums} and an integer {@code k}, split it into {@code k}
 * non-empty contiguous groups so that the largest group sum is as small as possible. Return
 * that minimum possible largest sum.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 7 2 5 10 8
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 18
 * </pre>
 *
 * <p>Approach: for a candidate limit {@code L}, greedily extend each group while its sum
 * stays within {@code L}; start a new group when the next element would overflow it. The
 * number of groups needed is monotone in {@code L}, so binary search the smallest limit that
 * needs at most {@code k} groups.
 *
 * <p>Complexity: Time O(n log(sum(nums))), Space O(1).
 */
public class SplitArrayLargestSum {

    /**
     * Returns the smallest possible largest group sum.
     *
     * @param nums the non-negative values to split
     * @param k    the number of groups
     * @return the minimum achievable maximum group sum
     */
    public static int splitArray(int[] nums, int k) {
        long low = 0;
        long high = 0;
        for (int value : nums) {
            low = Math.max(low, value);
            high += value;
        }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (groupsNeeded(nums, mid) <= k) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return (int) low;
    }

    /** Groups required when no group may exceed {@code limit}. */
    private static int groupsNeeded(int[] nums, long limit) {
        int groups = 1;
        long load = 0;
        for (int value : nums) {
            if (load + value > limit) {
                groups++;
                load = 0;
            }
            load += value;
        }
        return groups;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(splitArray(nums, k));
    }
}
