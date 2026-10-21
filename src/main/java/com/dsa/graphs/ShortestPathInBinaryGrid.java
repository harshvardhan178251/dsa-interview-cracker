package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Shortest Path in a Binary Maze
 * LeetCode: 1293 | Difficulty: Medium | Frequency: 3/5
 * Pattern: BFS on a grid, shortest path
 *
 * <p>Problem: A maze is a grid where {@code 0} is an open cell and {@code 1} is a blocked cell.
 * Find the shortest number of steps from the top-left cell to the bottom-right cell, moving one
 * cell up, down, left or right. Return {@code -1} when the target cannot be reached.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * row0        (cols characters, no spaces: '0' = open, '1' = blocked)
 * row1
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 4
 * 0000
 * 1110
 * 0000
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: BFS from {@code (0, 0)}. Every move costs one step, so BFS reaches the cells in
 * non-decreasing distance and the first time the bottom-right cell is reached its distance is
 * minimal.
 *
 * <p>Complexity: Time O(rows * cols), Space O(rows * cols).
 */
public class ShortestPathInBinaryGrid {

    private static final int[][] DIRS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    /**
     * Shortest distance from the top-left to the bottom-right cell.
     *
     * @param grid 0 = open, 1 = blocked
     * @return the number of steps, {@code -1} when the target is unreachable
     */
    public static int shortestPathBinaryGrid(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        if (grid[0][0] == 1 || grid[rows - 1][cols - 1] == 1) {
            return -1;
        }

        int[][] dist = new int[rows][cols];
        for (int[] row : dist) {
            java.util.Arrays.fill(row, -1);
        }
        Deque<int[]> queue = new ArrayDeque<>();
        dist[0][0] = 0;
        queue.add(new int[]{0, 0});

        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int r = cell[0];
            int c = cell[1];
            if (r == rows - 1 && c == cols - 1) {
                return dist[r][c];
            }
            for (int[] dir : DIRS) {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                    continue;
                }
                if (grid[nr][nc] == 1 || dist[nr][nc] != -1) {
                    continue;
                }
                dist[nr][nc] = dist[r][c] + 1;
                queue.add(new int[]{nr, nc});
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();

        int[][] grid = new int[rows][cols];
        for (int r = 0; r < rows; r++) {
            String row = fs.next();
            for (int c = 0; c < cols && c < row.length(); c++) {
                grid[r][c] = row.charAt(c) - '0';
            }
        }

        System.out.println(shortestPathBinaryGrid(grid));
    }
}
