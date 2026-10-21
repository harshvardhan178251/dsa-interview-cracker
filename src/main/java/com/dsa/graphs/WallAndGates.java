package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Walls and Gates
 * LeetCode: 286 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Multi-source BFS
 *
 * <p>Problem: Every cell of a grid is a wall, a gate or an open space. The distance of an open
 * space is the number of steps to the nearest gate. Gates keep distance 0 and walls keep
 * {@code -1}. Compute the distance of every open space in the least possible number of steps.
 *
 * <p>Input format (stdin) — one line of space-separated integers per row:
 * <pre>
 * rows cols
 * row0        (0 = gate, -1 = wall, any positive value = open space)
 * row1
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 3
 * 100000 -1 100000
 * 100000 -1 100000
 * 100000 100000 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 -1 2
 * 3 -1 1
 * 2 1 0
 * </pre>
 *
 * <p>Approach: multi-source BFS starting from <em>all</em> gates at once. Every gate starts at
 * distance 0, so the first time BFS reaches an open space it arrives along a shortest path.
 * Walls are simply never enqueued.
 *
 * <p>Complexity: Time O(rows * cols), Space O(rows * cols).
 */
public class WallAndGates {

    private static final int[][] DIRS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    /**
     * Replaces every open space with its distance to the nearest gate. The grid is modified in
     * place.
     *
     * @param grid 0 = gate, -1 = wall, positive = open space
     */
    public static void wallsAndGates(int[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return;
        }
        int rows = grid.length;
        int cols = grid[0].length;

        Deque<int[]> queue = new ArrayDeque<>();
        boolean[][] settled = new boolean[rows][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 0) {
                    queue.add(new int[]{r, c});
                    settled[r][c] = true;
                }
            }
        }

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                int[] cell = queue.poll();
                for (int[] dir : DIRS) {
                    int nr = cell[0] + dir[0];
                    int nc = cell[1] + dir[1];
                    // walls (-1) are never entered; settled cells already have their distance
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                        continue;
                    }
                    if (grid[nr][nc] <= 0 || settled[nr][nc]) {
                        continue;
                    }
                    settled[nr][nc] = true;
                    grid[nr][nc] = grid[cell[0]][cell[1]] + 1;
                    queue.add(new int[]{nr, nc});
                }
            }
        }
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

        wallsAndGates(grid);

        for (int r = 0; r < rows; r++) {
            StringBuilder row = new StringBuilder();
            for (int c = 0; c < cols; c++) {
                if (c > 0) {
                    row.append(' ');
                }
                row.append(grid[r][c]);
            }
            System.out.println(row);
        }
    }
}
