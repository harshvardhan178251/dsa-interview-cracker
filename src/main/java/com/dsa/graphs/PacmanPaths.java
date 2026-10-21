package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Pacman Paths
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: BFS on a grid, shortest path
 *
 * <p>Problem: Pacman walks through a maze of pellets and walls. Find the minimum number of
 * moves needed to get from the start cell to the target cell, moving one cell up, down, left or
 * right into an open cell. Return {@code -1} when the target cannot be reached.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * row0        (cols characters, no spaces: '.' = pellet, '#' = wall)
 * row1
 * ...
 * startRow startCol
 * targetRow targetCol
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5 5
 * .....
 * .###.
 * .###.
 * .###.
 * .....
 * 0 0
 * 4 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: BFS from the start cell. Because every move costs exactly one step, the first
 * time the target is dequeued its distance is the answer. A visited grid stops us from looping.
 *
 * <p>Complexity: Time O(rows * cols), Space O(rows * cols).
 */
public class PacmanPaths {

    private static final int[][] DIRS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    /**
     * Minimum number of moves from {@code (sr, sc)} to {@code (tr, tc)}.
     *
     * @param maze rows of {@code '.'} (open) and {@code '#'} (wall)
     * @param sr   start row
     * @param sc   start column
     * @param tr   target row
     * @param tc   target column
     * @return the number of moves, {@code -1} when the target is unreachable
     */
    public static int shortestPath(char[][] maze, int sr, int sc, int tr, int tc) {
        int rows = maze.length;
        int cols = maze[0].length;
        if (sr < 0 || sr >= rows || sc < 0 || sc >= cols
                || tr < 0 || tr >= rows || tc < 0 || tc >= cols) {
            return -1;
        }
        if (maze[sr][sc] == '#' || maze[tr][tc] == '#') {
            return -1;
        }
        if (sr == tr && sc == tc) {
            return 0;
        }

        int[][] dist = new int[rows][cols];
        for (int[] row : dist) {
            java.util.Arrays.fill(row, -1);
        }
        Deque<int[]> queue = new ArrayDeque<>();
        dist[sr][sc] = 0;
        queue.add(new int[]{sr, sc});

        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int r = cell[0];
            int c = cell[1];
            for (int[] dir : DIRS) {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                    continue;
                }
                if (maze[nr][nc] == '#' || dist[nr][nc] != -1) {
                    continue;
                }
                dist[nr][nc] = dist[r][c] + 1;
                if (nr == tr && nc == tc) {
                    return dist[nr][nc];
                }
                queue.add(new int[]{nr, nc});
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();

        char[][] maze = new char[rows][cols];
        for (int r = 0; r < rows; r++) {
            String row = fs.next();
            for (int c = 0; c < cols && c < row.length(); c++) {
                maze[r][c] = row.charAt(c);
            }
        }
        int sr = fs.nextInt();
        int sc = fs.nextInt();
        int tr = fs.nextInt();
        int tc = fs.nextInt();

        System.out.println(shortestPath(maze, sr, sc, tr, tc));
    }
}
