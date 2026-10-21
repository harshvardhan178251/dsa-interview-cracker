package com.dsa.templates;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Copy-paste starting points for the dynamic-programming shapes.
 *
 * <p>Before using any of these, fill in the four questions: **state**, **transition**,
 * **base case** and **order**. See the
 * [DP notes](../../../docs/topics/17-dynamicprogramming.md).
 */
public final class DpTemplate {

    private DpTemplate() {
    }

    /** Linear DP — {@code dp[i]} depends on {@code dp[i-1]}. */
    public static int maxSubarray(int[] nums) {
        int current = nums[0];
        int best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }

    /** 0/1 knapsack — the capacity loop must run DOWNWARDS. */
    public static int knapsack01(int[] weights, int[] values, int capacity) {
        int[] dp = new int[capacity + 1];
        for (int i = 0; i < weights.length; i++) {
            for (int w = capacity; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        return dp[capacity];
    }

    /** Unbounded knapsack — the capacity loop runs UPWARDS. */
    public static int knapsackUnbounded(int[] weights, int[] values, int capacity) {
        int[] dp = new int[capacity + 1];
        for (int i = 0; i < weights.length; i++) {
            for (int w = weights[i]; w <= capacity; w++) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        return dp[capacity];
    }

    /** Two-dimensional DP — grid paths. */
    public static int uniquePaths(int rows, int cols) {
        int[][] dp = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                dp[i][j] = (i == 0 || j == 0) ? 1 : dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[rows - 1][cols - 1];
    }

    /** Longest common subsequence. */
    public static int lcs(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];
        for (int i = 1; i <= a.length(); i++) {
            for (int j = 1; j <= b.length(); j++) {
                dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1)
                        ? dp[i - 1][j - 1] + 1
                        : Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[a.length()][b.length()];
    }

    /** Edit distance (Levenshtein). */
    public static int editDistance(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];
        for (int i = 0; i <= a.length(); i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= b.length(); j++) {
            dp[0][j] = j;
        }
        for (int i = 1; i <= a.length(); i++) {
            for (int j = 1; j <= b.length(); j++) {
                dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1)
                        ? dp[i - 1][j - 1]
                        : 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
        return dp[a.length()][b.length()];
    }

    /** Subarray sum equals K — prefix sums plus a hash map. */
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        counts.put(0, 1);                            // the empty prefix
        int sum = 0;
        int result = 0;
        for (int x : nums) {
            sum += x;
            result += counts.getOrDefault(sum - k, 0);
            counts.merge(sum, 1, Integer::sum);
        }
        return result;
    }

    /** Top-down memoisation. */
    public static int fibonacci(int n, Map<Integer, Integer> memo) {
        if (n < 2) {
            return n;
        }
        Integer cached = memo.get(n);
        if (cached != null) {
            return cached;
        }
        int result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
        memo.put(n, result);
        return result;
    }

    /** Top-down memoisation over a prefix. */
    public static int climbStairs(int n, int[] memo) {
        if (n <= 2) {
            return n;
        }
        if (memo[n] != -1) {
            return memo[n];
        }
        return memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
    }

    /** Top-down memoisation over a prefix, with the memo array allocated for you. */
    public static int climbStairs(int n) {
        int[] memo = new int[n + 1];
        java.util.Arrays.fill(memo, -1);
        return climbStairs(n, memo);
    }

    /** Interval DP — filled by increasing interval length. */
    public static int burstBalloons(int[] balloons) {
        int n = balloons.length;
        int[] values = new int[n + 2];
        values[0] = values[n + 1] = 1;            // sentinels on both sides
        System.arraycopy(balloons, 0, values, 1, n);

        int[][] dp = new int[n + 2][n + 2];
        for (int length = 1; length <= n; length++) {
            for (int left = 1; left + length - 1 <= n; left++) {
                int right = left + length - 1;
                for (int k = left; k <= right; k++) {
                    dp[left][right] = Math.max(dp[left][right],
                            dp[left][k - 1] + values[k] * values[left - 1] * values[right + 1]
                                    + dp[k + 1][right]);
                }
            }
        }
        return dp[1][n];
    }

    public static void main(String[] args) {
        System.out.println("maxSubarray        = " + maxSubarray(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}));
        System.out.println("knapsack01         = " + knapsack01(
                new int[]{1, 3, 4}, new int[]{15, 20, 30}, 4));
        System.out.println("knapsackUnbounded  = " + knapsackUnbounded(
                new int[]{1, 3, 4}, new int[]{15, 20, 30}, 4));
        System.out.println("uniquePaths(3,7)   = " + uniquePaths(3, 7));
        System.out.println("lcs                = " + lcs("abcde", "ace"));
        System.out.println("editDistance       = " + editDistance("horse", "ros"));
        System.out.println("subarraySum        = " + subarraySum(new int[]{1, 2, 3}, 3));
        System.out.println("fibonacci(30)      = " + fibonacci(30, new HashMap<>()));
        System.out.println("climbStairs(10)    = " + climbStairs(10));
        System.out.println("burstBalloons      = " + burstBalloons(new int[]{2, 1, 5, 10}));
    }
}
