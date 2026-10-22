var e=`graphs.DistanceToNearestZero`,t=`package com.dsa.graphs;

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
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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
# 01 Matrix — LeetCode 542

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Multi-source BFS · Grid traversal |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given a binary matrix, return the distance of every cell to the **nearest** cell that holds \`0\`.

## Input Format

\`\`\`
rows cols
row0
row1
...
\`\`\`

- \`rows\`, \`cols\` — the size of the grid (1 ≤ rows, cols ≤ 10⁴)
- \`rows\` lines follow, each holding exactly \`cols\` characters **without spaces**: \`'0'\` and \`'1'\`

## Sample Input

\`\`\`
3 4
0001
1011
1111
\`\`\`

## Expected Output

\`\`\`
0 0 0 1
1 0 1 2
2 1 2 3
\`\`\`

## Approach — multi-source BFS from every zero

Every \`0\` is a source with distance \`0\`. Put them all in the queue and run one BFS; the first
time a cell is reached, the level number is its distance to the nearest zero.

\`\`\`
dist[r][c] = 0      for every zero (and it joins the queue)
dist[r][c] = -1     for every one (not visited yet)
\`\`\`

The BFS then only has to look at \`dist == -1\` cells, which doubles as the visited marker.

**Why multi-source and not "one BFS per zero"?** One BFS per zero would be O(zeros · cells).
The multi-source version is a single traversal.

**Alternative: two-pass DP.** A left-to-right / right-to-left sweep computes the same distances
in O(cells) with O(1) extra space beyond the matrix, but it only works when movement is
4-directional *and* the matrix is processed in the right order. BFS is easier to reason about and
handles any neighbourhood.

## Dry Run

Initial \`dist\` (\`-1\` = unvisited):

\`\`\`
 0  0  0 -1
-1  0 -1 -1
-1 -1 -1 -1
\`\`\`

Queue (the four zeros): \`[(0,0), (0,1), (0,2), (1,1)]\`

| Level | Cell expanded | Newly reached | \`dist\` after |
|---:|---|---|---|
| 0 | — (the four zeros) | — | \`0 0 0 -1 / -1 0 -1 -1 / -1 -1 -1 -1\` |
| 1 | \`(0,0)\` | \`(1,0)\` = 1 | \`0 0 0 -1 / 1 0 -1 -1 / -1 -1 -1 -1\` |
| 1 | \`(0,1)\` | — (all neighbours already known) | unchanged |
| 1 | \`(0,2)\` | \`(1,2)\` = 1, \`(0,3)\` = 1 | \`0 0 0 1 / 1 0 1 -1 / -1 -1 -1 -1\` |
| 1 | \`(1,1)\` | \`(2,1)\` = 1 | \`0 0 0 1 / 1 0 1 -1 / -1 1 -1 -1\` |
| 2 | \`(1,0)\` | \`(2,0)\` = 2 | \`0 0 0 1 / 1 0 1 -1 / 2 1 -1 -1\` |
| 2 | \`(1,2)\` | \`(2,2)\` = 2 | \`0 0 0 1 / 1 0 1 -1 / 2 1 2 -1\` |
| 2 | \`(0,3)\` | \`(1,3)\` = 2 | \`0 0 0 1 / 1 0 1 2 / 2 1 2 -1\` |
| 2 | \`(2,1)\` | — | unchanged |
| 3 | \`(2,0)\` | — | unchanged |
| 3 | \`(2,2)\` | \`(2,3)\` = 3 | \`0 0 0 1 / 1 0 1 2 / 2 1 2 3\` |
| 3 | \`(1,3)\` | — (already 3) | unchanged |

Final answer:

\`\`\`
0 0 0 1
1 0 1 2
2 1 2 3
\`\`\`

## Java Solution

See [\`DistanceToNearestZero.java\`](./DistanceToNearestZero.java).

\`\`\`java
public static int[][] updateMatrix(int[][] grid) {
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
                if (dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[cell[0]][cell[1]] + 1;
                    queue.add(new int[]{nr, nc});
                }
            }
        }
    }
    return dist;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | Each cell is enqueued once |
| **Space** | O(rows × cols) | The distance matrix and the queue |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) extra space?"* → yes, the two-pass DP sweep: first left-to-right and
  top-to-bottom, then right-to-left and bottom-to-top, using the matrix itself.
- *"What if the zeros were weighted differently?"* → Dijkstra with a priority queue.
- *"What if movement is diagonal as well?"* → add the diagonal offsets to \`DIRS\`; the distances
  change but the algorithm does not.
- *"What if you only need the distance for one cell?"* → a single-source BFS from that cell is
  simpler, but it gives the distance to the *nearest* one from that cell, not from a zero.

**Common mistakes:**
- ❌ Running BFS from each zero separately → quadratic.
- ❌ Forgetting to initialise the \`1\` cells to \`-1\` → the "unvisited" test never fires.
- ❌ Marking a cell as visited when it is **dequeued** → it can be enqueued several times.

**How to narrate:**
> "This is multi-source BFS: all the zeroes are sources at distance 0, so I put them in the
> queue together and expand in rings. The ring a cell is reached in is exactly its distance to
> the nearest zero. I mark cells with -1 and use that as the visited flag, so each cell is
> enqueued exactly once."

## Related Problems

- [Walls and Gates](./WallAndGates.java) — the same pattern with gates as the sources
- [Rotting Oranges](./RottingOranges.java) — the same pattern with time as the distance
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [Pacman Paths](./PacmanPaths.java) — single-source BFS on a grid
`,i=[`updateMatrix`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};