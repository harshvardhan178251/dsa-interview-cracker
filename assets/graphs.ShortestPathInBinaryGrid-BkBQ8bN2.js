var e=`graphs.ShortestPathInBinaryGrid`,t=`package com.dsa.graphs;

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
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r=`
# Shortest Path in a Binary Maze — LeetCode 1293

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Shortest path on a grid |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A maze is a grid where \`0\` is an **open** cell and \`1\` is a **blocked** cell. Find the shortest
number of steps from the **top-left** cell to the **bottom-right** cell. Return \`-1\` when the
target cannot be reached.

## Input Format

\`\`\`
rows cols
row0
row1
...
\`\`\`

- \`rows\`, \`cols\` — the size of the maze (1 ≤ rows, cols ≤ 100)
- \`rows\` lines follow, each holding exactly \`cols\` characters **without spaces**:
  \`'0'\` = open, \`'1'\` = blocked

## Sample Input

\`\`\`
3 4
0000
1110
0000
\`\`\`

## Expected Output

\`\`\`
5
\`\`\`

The only route is along the top row and then down the right column:
\`(0,0) → (0,1) → (0,2) → (0,3) → (1,3) → (2,3)\` — 5 steps.

## Approach — BFS from the top-left corner

Every step costs one, so the maze is an unweighted graph and BFS gives the shortest path.

1. \`dist[0][0] = 0\`, push \`(0, 0)\`.
2. Expand in the four directions, skipping cells that are out of bounds, blocked, or already
   visited.
3. When the bottom-right cell is dequeued its distance is the answer.

**Movement.** This implementation moves **up, down, left and right** — a general maze. LeetCode
1293 restricts the movement to **right and down only**; with that restriction the same BFS
works, you just shrink the direction list to \`{{0, 1}, {1, 0}}\`. (With right/down only a
right-to-left / top-to-bottom DP sweep is another valid solution, since every path has the same
length structure.)

## Dry Run

| Level | Cell dequeued | Open neighbours | \`dist\` written |
|---:|---|---|---|
| 0 | \`(0,0)\` | \`(0,1)\`; \`(1,0)\` is blocked | \`dist[0][1] = 1\` |
| 1 | \`(0,1)\` | \`(0,2)\`; \`(1,1)\` is blocked | \`dist[0][2] = 2\` |
| 2 | \`(0,2)\` | \`(0,3)\`; \`(1,2)\` is blocked | \`dist[0][3] = 3\` |
| 3 | \`(0,3)\` | \`(1,3)\` | \`dist[1][3] = 4\` |
| 4 | \`(1,3)\` | \`(2,3)\` | \`dist[2][3] = 5\` |
| 5 | \`(2,3)\` | — this is the target | return **5** |

The \`dist\` matrix after the run:

\`\`\`
0 1 2 3
-1 -1 -1 4
-1 -1 -1 5
\`\`\`

## Java Solution

See [\`ShortestPathInBinaryGrid.java\`](./ShortestPathInBinaryGrid.java).

\`\`\`java
public static int shortestPathBinaryGrid(int[][] grid) {
    int[][] dist = new int[rows][cols];
    Arrays.fill(dist[r], -1);
    Deque<int[]> queue = new ArrayDeque<>();
    dist[0][0] = 0;
    queue.add(new int[]{0, 0});
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        int r = cell[0], c = cell[1];
        if (r == rows - 1 && c == cols - 1) {
            return dist[r][c];
        }
        for (int[] dir : DIRS) {
            int nr = r + dir[0], nc = c + dir[1];
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
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | Each cell is enqueued at most once |
| **Space** | O(rows × cols) | The distance matrix and the queue |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the movement is only right and down?"* → restrict the direction list; the answer can
  then also be computed with a two-line DP.
- *"What if there are weighted cells?"* → Dijkstra.
- *"What if the maze has portals?"* → model the portals as extra zero-cost edges; BFS needs to
  handle multiple sources per level.
- *"Can you count the number of shortest paths?"* → do DP over the distance matrix, adding the
  number of ways of each predecessor.

**Common mistakes:**
- ❌ Not checking that the **start** is open → the BFS starts inside a wall.
- ❌ Using \`dist == 0\` as "unvisited" → the start cell has distance \`0\`; use \`-1\`.
- ❌ Returning the distance of the cell *when it is generated* instead of when it is dequeued —
  that is still correct here, but returning early on generation is only valid because BFS
  distances are non-decreasing; dequeueing is the safer habit.

**How to narrate:**
> "All moves cost one step, so it's a plain BFS over the grid. I keep a distance matrix that
> doubles as the visited flag, start in the top-left corner and expand in four directions,
> skipping blocked and already visited cells. When I dequeue the bottom-right cell its distance
> is the shortest path length; if the queue empties first the target is unreachable and I
> return -1."

## Related Problems

- [Pacman Paths](./PacmanPaths.java) — the same BFS with an explicit start and target
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [01 Matrix](./DistanceToNearestZero.java) — multi-source BFS
- [Network Delay Time](./NetworkDelayTime.java) — the weighted version of the same idea
`,i=[`shortestPathBinaryGrid`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};