package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Minimum Path Sum
 * LeetCode: 64 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Grid DP, Bottom-up DP
 *
 * <p>Problem: Return the smallest possible sum of the values along a path from the top-left cell to the bottom-right cell of a grid, moving only right or down.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * grid[0][0] grid[0][1] ... grid[rows-1][cols-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 3
 * 1 3 1 1 5 1 4 2 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: The cheapest way into a cell is the cheaper of the two ways in, plus the value of the cell.
 *
 * <p>Complexity: Time O(rows x cols), Space O(rows x cols).
 */
public class MinimumPathSum {

    /**
     * Returns the minimum sum of a right / down path through {@code grid}.
     *
     * <p>{@code dp[i][j]} = the cheapest path sum that ends in cell {@code (i, j)}. The cell can be
     * entered from above or from the left, so
     * {@code dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])}.
     *
     * @param grid the grid of non-negative values
     * @return the smallest possible path sum
     */
    public static int minPathSum(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int[][] dp = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (i == 0 && j == 0) {
                    dp[i][j] = grid[i][j]; // the start cell
                } else if (i == 0) {
                    dp[i][j] = dp[i][j - 1] + grid[i][j];
                } else if (j == 0) {
                    dp[i][j] = dp[i - 1][j] + grid[i][j];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
                }
            }
        }
        return dp[rows - 1][cols - 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        int[][] grid = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                grid[i][j] = fs.nextInt();
            }
        }

        System.out.println(minPathSum(grid));
    }
}
