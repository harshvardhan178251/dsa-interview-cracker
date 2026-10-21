package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Target Sum
 * LeetCode: 494 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Subset-sum DP, Counting DP
 *
 * <p>Problem: Count the assignments of `+` / `-` signs to the numbers of an array such that the resulting sum equals a target.
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
 * 5
 * 1 1 1 1 1
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: Turn the sign assignment into a subset-sum counting problem, then count the subsets with a one-dimensional DP.
 *
 * <p>Complexity: Time O(n x S), Space O(S).
 */
public class TargetSum {

    /**
     * Counts the sign assignments whose sum equals {@code target}.
     *
     * <p>Let {@code P} be the sum of the positively signed numbers and {@code total} the sum of all
     * numbers. Then {@code P - (total - P) = target}, so {@code P = (total + target) / 2}: the problem
     * becomes "count the subsets with sum {@code P}".
     *
     * @param nums   the numbers to sign
     * @param target the wanted sum
     * @return the number of assignments
     */
    public static int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int wanted = total + target;
        if (wanted < 0 || (wanted & 1) != 0) {
            return 0; // no subset can have a negative or odd sum
        }
        int subsetSum = wanted / 2;

        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;

        for (int value : nums) {
            for (int sum = subsetSum; sum >= value; sum--) {
                dp[sum] += dp[sum - value];
            }
        }
        return dp[subsetSum];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(findTargetSumWays(nums, target));
    }
}
