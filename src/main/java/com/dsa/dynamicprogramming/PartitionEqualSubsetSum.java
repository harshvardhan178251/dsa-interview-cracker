package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Partition Equal Subset Sum
 * LeetCode: 416 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Subset-sum DP, 0/1 knapsack
 *
 * <p>Problem: Decide whether a multiset of numbers can be split into two subsets with the same sum.
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
 * 1 5 11 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Look for a subset whose sum is exactly half of the total -- that is a 0/1 subset-sum DP.
 *
 * <p>Complexity: Time O(n x S), Space O(S).
 */
public class PartitionEqualSubsetSum {

    /**
     * Decides whether {@code nums} can be split into two subsets of equal sum.
     *
     * <p>The total must be even; then the question is whether some subset sums to exactly half of it.
     * That is the classic 0/1 subset-sum problem, solved with a one-dimensional table that is updated
     * from high to low so that every element is used at most once.
     *
     * @param nums the values to partition
     * @return {@code true} when an equal-sum partition exists
     */
    public static boolean canPartition(int[] nums) {
        if (nums.length == 0) {
            return false; // there is nothing to partition
        }
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        if ((total & 1) != 0) {
            return false; // an odd total can never be split in half
        }
        int target = total / 2;

        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;

        for (int value : nums) {
            for (int sum = target; sum >= value; sum--) {
                reachable[sum] = reachable[sum] || reachable[sum - value];
            }
        }
        return reachable[target];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(canPartition(nums) ? 1 : 0);
    }
}
