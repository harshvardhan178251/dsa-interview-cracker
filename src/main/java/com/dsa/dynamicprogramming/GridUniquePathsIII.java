package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Unique Paths III
 * LeetCode: 980 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Backtracking, DFS on a grid
 *
 * <p>Problem: Count the 4-directional walks from the start square to the end square that visit every non-obstacle square exactly once.
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
 * 1 0 0 0 0 0 0 0 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Depth-first search that remembers which cells are already used, because the set of visited cells is part of the state.
 *
 * <p>Complexity: Time O(3^(rowsxcols)), Space O(rows x cols).
 */
public class GridUniquePathsIII {

    /**
     * Counts the 4-directional walks that visit every non-obstacle cell exactly once.
     *
     * <p>The state of the search is the current cell plus the set of cells already visited, so the
     * visited cells are marked in the grid itself (and unmarked again when backtracking).
     *
     * @param grid the grid -- {@code 1} marks the start, {@code 2} the end, {@code -1} an obstacle
     * @return the number of valid walks
     */
    public static int uniquePathsIII(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;

        int startRow = 0;
        int startCol = 0;
        int total = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    startRow = r;
                    startCol = c;
                }
                if (grid[r][c] != -1) {
                    total++; // every non-obstacle cell has to be visited
                }
            }
        }

        int[] answer = new int[1];
        dfs(grid, startRow, startCol, total, answer);
        return answer[0];
    }

    /**
     * Depth-first search over the grid.
     *
     * @param grid   the grid, mutated while searching and restored afterwards
     * @param row    the current row
     * @param col    the current column
     * @param left   the number of cells that have not been visited yet
     * @param answer the running answer, boxed so the recursion can update it
     */
    private static void dfs(int[][] grid, int row, int col, int left, int[] answer) {
        int rows = grid.length;
        int cols = grid[0].length;

        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] == -1) {
            return; // outside the grid, an obstacle, or already visited
        }
        if (grid[row][col] == 2) {
            if (left == 1) {
                answer[0]++; // the end square is the last cell of the walk
            }
            return;
        }

        int original = grid[row][col];
        grid[row][col] = -1; // take the cell
        dfs(grid, row + 1, col, left - 1, answer);
        dfs(grid, row - 1, col, left - 1, answer);
        dfs(grid, row, col + 1, left - 1, answer);
        dfs(grid, row, col - 1, left - 1, answer);
        grid[row][col] = original; // give the cell back
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        int[][] grid = new int[rows][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                grid[r][c] = fs.nextInt();
            }
        }

        System.out.println(uniquePathsIII(grid));
    }
}
