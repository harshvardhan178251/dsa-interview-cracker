package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Unique Paths
 * LeetCode: 62 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Grid DP, Combinatorics
 *
 * <p>Problem: Count the paths from the top-left cell to the bottom-right cell of a grid when only right and down moves are allowed.
 *
 * <p>Input format (stdin):
 * <pre>
 * m n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 28
 * </pre>
 *
 * <p>Approach: The number of paths to a cell is the sum of the numbers of paths to the cell above and the cell to the left.
 *
 * <p>Complexity: Time O(m x n), Space O(m x n).
 */
public class UniquePaths {

    /**
     * Counts the monotone (right / down) paths across an {@code m x n} grid.
     *
     * <p>{@code dp[i][j]} = the number of paths that reach cell {@code (i, j)}. Every path arrives
     * either from above or from the left, so {@code dp[i][j] = dp[i-1][j] + dp[i][j-1]}.
     *
     * @param m number of rows
     * @param n number of columns
     * @return the number of distinct paths
     */
    public static int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1; // one path down the first column
        }
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1; // one path across the first row
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();
        int n = fs.nextInt();

        System.out.println(uniquePaths(m, n));
    }
}
