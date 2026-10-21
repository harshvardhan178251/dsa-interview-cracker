package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: 01 Matrix
 * LeetCode: 542 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Multi-source BFS
 *
 * <p>Problem: For every cell of a binary matrix, compute the distance to the nearest cell that
 * holds 0.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * row0        (cols characters, no spaces: '0' and '1')
 * row1
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 4
 * 0001
 * 1011
 * 1111
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 0 0 1
 * 1 0 1 2
 * 2 1 2 3
 * </pre>
 *
 * <p>Approach: multi-source BFS. All the zeroes are the sources of the search, so they all sit in
 * the queue with distance 0. The BFS expands in rings, and the ring a cell is reached in is
 * exactly its distance to the nearest zero.
 *
 * <p>Complexity: Time O(rows * cols), Space O(rows * cols).
 */
public class DistanceToNearestZero {

    private static final int[][] DIRS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    /**
     * Distance of every cell to the nearest zero.
     *
     * @param grid 0 = zero, 1 = one
     * @return a matrix of distances
     */
    public static int[][] updateMatrix(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int[][] dist = new int[rows][cols];
        Deque<int[]> queue = new ArrayDeque<>();

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 0) {
                    dist[r][c] = 0;
                    queue.add(new int[]{r, c});
                } else {
                    dist[r][c] = -1; // not visited yet
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
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] == -1) {
                        dist[nr][nc] = dist[cell[0]][cell[1]] + 1;
                        queue.add(new int[]{nr, nc});
                    }
                }
            }
        }
        return dist;
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

        int[][] dist = updateMatrix(grid);
        for (int r = 0; r < rows; r++) {
            StringBuilder row = new StringBuilder();
            for (int c = 0; c < cols; c++) {
                if (c > 0) {
                    row.append(' ');
                }
                row.append(dist[r][c]);
            }
            System.out.println(row);
        }
    }
}
