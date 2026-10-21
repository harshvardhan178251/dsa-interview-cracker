package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Rotting Oranges
 * LeetCode: 994 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Multi-source BFS, level order
 *
 * <p>Problem: Every minute, any orange that touches a rotten orange becomes rotten. Return the
 * number of minutes until every orange has rotted, or {@code -1} if some orange never rots.
 * Cells hold {@code 0} = fresh orange, {@code 1} = rotten orange, {@code 2} = empty cell.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * row0        (cols characters, no spaces: '0' fresh, '1' rotten, '2' empty)
 * row1
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 4
 * 1000
 * 1000
 * 1000
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: multi-source BFS. Every rotten orange starts in the queue at minute 0. Each BFS
 * level is exactly one minute of spreading. If, when the queue drains, fresh oranges are left,
 * the answer is {@code -1}.
 *
 * <p>Complexity: Time O(rows * cols), Space O(rows * cols).
 */
public class RottingOranges {

    private static final int[][] DIRS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    /**
     * Number of minutes until no fresh orange is left, or {@code -1}.
     *
     * @param grid 0 = fresh, 1 = rotten, 2 = empty
     * @return the number of minutes, {@code -1} when some orange never rots
     */
    public static int orangesRotting(int[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return 0;
        }
        int rows = grid.length;
        int cols = grid[0].length;

        Deque<int[]> queue = new ArrayDeque<>();
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    queue.add(new int[]{r, c});
                } else if (grid[r][c] == 0) {
                    fresh++;
                }
            }
        }

        int minutes = 0;
        while (!queue.isEmpty() && fresh > 0) {
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                int[] cell = queue.poll();
                for (int[] dir : DIRS) {
                    int nr = cell[0] + dir[0];
                    int nc = cell[1] + dir[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 0) {
                        grid[nr][nc] = 1;
                        fresh--;
                        queue.add(new int[]{nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
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

        System.out.println(orangesRotting(grid));
    }
}
