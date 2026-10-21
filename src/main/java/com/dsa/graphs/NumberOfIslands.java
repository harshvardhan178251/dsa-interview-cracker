package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Number of Islands
 * LeetCode: 200 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Grid DFS, flood fill
 *
 * <p>Problem: Given an {@code m x n} grid where {@code '1'} is land and {@code '0'} is water,
 * count the number of islands. Two cells belong to the same island when they are connected
 * through 4-directional (up/down/left/right) moves over land cells.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * row0        (cols characters, no spaces: '1' = land, '0' = water)
 * row1
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 3
 * 110
 * 001
 * 100
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: scan the grid in row-major order. Every time we meet land that has not been
 * flooded yet we have discovered a new island: bump the counter and run an iterative DFS that
 * flips every reachable land cell to water. Flipping on <em>push</em> (not on pop) is what
 * keeps the algorithm linear — a cell is never pushed twice.
 *
 * <p>Complexity: Time O(rows * cols) — every cell is scanned once and every land cell is
 * pushed/popped at most once. Space O(rows * cols) worst case for the DFS stack.
 */
public class NumberOfIslands {

    private static final int[][] DIRS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    /**
     * Counts the islands in {@code grid}. The grid is modified in place (land becomes water).
     *
     * @param grid rows of {@code '1'} (land) and {@code '0'} (water)
     * @return the number of connected land groups
     */
    public static int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return 0;
        }
        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    sinkIsland(grid, r, c);
                }
            }
        }
        return islands;
    }

    /** Floods the island that contains {@code (sr, sc)} by turning every land cell into water. */
    private static void sinkIsland(char[][] grid, int sr, int sc) {
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{sr, sc});
        grid[sr][sc] = '0'; // mark on push so a cell is never scheduled twice
        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            int r = cell[0];
            int c = cell[1];
            for (int[] dir : DIRS) {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length
                        && grid[nr][nc] == '1') {
                    grid[nr][nc] = '0';
                    stack.push(new int[]{nr, nc});
                }
            }
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();

        char[][] grid = new char[rows][cols];
        for (int r = 0; r < rows; r++) {
            String row = fs.next();
            for (int c = 0; c < cols && c < row.length(); c++) {
                grid[r][c] = row.charAt(c);
            }
        }

        System.out.println(numIslands(grid));
    }
}
