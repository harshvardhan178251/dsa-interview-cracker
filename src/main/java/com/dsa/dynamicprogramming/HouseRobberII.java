package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: House Robber II
 * LeetCode: 213 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Circular DP, Divide and conquer
 *
 * <p>Problem: The same house-robbery problem, but the houses form a circle: the first and the last house are adjacent and cannot both be robbed.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 3 2 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Break the circle: either skip the last house or skip the first one, and solve the linear problem twice.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class HouseRobberII {

    /**
     * Returns the maximum amount that can be robbed on a circular street.
     *
     * <p>The first and the last house are adjacent, so at least one of them must be skipped.
     * The answer is the better of the linear solution over {@code [0, n-2]} and over {@code [1, n-1]}.
     *
     * @param nums money in each house
     * @return the maximum total that can be robbed
     */
    public static int rob(int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return nums[0];
        }
        int skipLast = robRange(nums, 0, n - 2);
        int skipFirst = robRange(nums, 1, n - 1);
        return Math.max(skipLast, skipFirst);
    }

    /**
     * Linear version of House Robber over the half-open range {@code [from, to]}.
     *
     * @param nums money in each house
     * @param from  first house of the range (inclusive)
     * @param to    last house of the range (inclusive)
     * @return the maximum total obtainable inside the range
     */
    private static int robRange(int[] nums, int from, int to) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = from; i <= to; i++) {
            int current = Math.max(oneBack, nums[i] + twoBack);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(rob(nums));
    }
}
