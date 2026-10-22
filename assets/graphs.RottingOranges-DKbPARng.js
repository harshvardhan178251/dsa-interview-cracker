var e=`graphs.RottingOranges`,t=`package com.dsa.graphs;

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
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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
# Rotting Oranges — LeetCode 994

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Multi-source BFS · Level order |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Every minute, any orange that is **adjacent to a rotten orange** becomes rotten. Return the
number of minutes until every orange has rotted, or \`-1\` if some orange never rots.

Cell values:

| Value | Meaning |
|---|---|
| \`0\` | fresh orange |
| \`1\` | rotten orange |
| \`2\` | empty cell (no orange) |

## Input Format

\`\`\`
rows cols
row0
row1
...
\`\`\`

- \`rows\`, \`cols\` — the size of the grid (1 ≤ rows, cols ≤ 10)
- \`rows\` lines follow, each holding exactly \`cols\` characters **without spaces**:
  \`'0'\` fresh, \`'1'\` rotten, \`'2'\` empty

## Sample Input

\`\`\`
3 4
1000
1000
1000
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

Column 0 is rotten at minute 0, column 1 rots at minute 1, column 2 at minute 2 and column 3 at
minute 3.

## Approach — multi-source BFS

All rotten oranges rot **simultaneously**, so they are all sources of the same wave. Put every
rotten orange into the queue at the start and run a level-order BFS:

1. Seed the queue with every rotten orange and count the fresh ones.
2. Take the current queue **size** — that many oranges all rot in the same minute. Process
   exactly that many and enqueue the fresh oranges they infect.
3. Increment the minute counter.
4. Stop as soon as no fresh orange is left. If the queue empties while fresh oranges remain,
   they are cut off from every rotten orange → answer \`-1\`.

**Why level-order and not "time per cell"?** Because the minute a cell rots is exactly its
distance from the nearest initially-rotten orange. BFS computes those distances in one pass.

## Dry Run

| Minute | Queue at start | Cells that become rotten | Fresh left | Queue at end |
|---:|---|---|---:|---|
| 0 | \`[(0,0), (1,0), (2,0)]\` | — (the initial rotten ones) | 9 | \`[(0,0), (1,0), (2,0)]\` |
| 1 | \`[(0,0), (1,0), (2,0)]\` | \`(0,1)\`, \`(1,1)\`, \`(2,1)\` | 6 | \`[(0,1), (1,1), (2,1)]\` |
| 2 | \`[(0,1), (1,1), (2,1)]\` | \`(0,2)\`, \`(1,2)\`, \`(2,2)\` | 3 | \`[(0,2), (1,2), (2,2)]\` |
| 3 | \`[(0,2), (1,2), (2,2)]\` | \`(0,3)\`, \`(1,3)\`, \`(2,3)\` | 0 | \`[(0,3), (1,3), (2,3)]\` |

No fresh orange is left after minute **3** → answer **\`3\`**.

### The unreachable case

\`\`\`
3 3
200
000
000
\`\`\`

There is no rotten orange at all, so the queue starts empty, the loop never runs and 7 fresh
oranges remain → answer **\`-1\`**.

## Java Solution

See [\`RottingOranges.java\`](./RottingOranges.java).

\`\`\`java
public static int orangesRotting(int[][] grid) {
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
                // ... infect fresh neighbours ...
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | Each cell is enqueued at most once |
| **Space** | O(rows × cols) | The queue can hold every cell |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the infection also spreads diagonally?"* → add the two diagonal offsets to \`DIRS\`.
- *"What if different oranges rot at different rates?"* → it is a Dijkstra problem: use a
  min-heap keyed on the time at which each cell becomes rotten.
- *"What if the grid is a torus (it wraps around)?"* → the neighbour coordinates become
  \`(r ± 1) mod rows\` and \`(c ± 1) mod cols\`.
- *"Can you do it without a queue?"* → yes, with repeated passes over the grid, but that is
  O(rows × cols × minutes) instead of O(rows × cols).

**Common mistakes:**
- ❌ Incrementing the minute counter **per cell** instead of per level → the answer is too big.
- ❌ Taking \`queue.size()\` again inside the loop → new infections would be processed in the same
  minute. Snapshot the size before the loop.
- ❌ Forgetting the \`fresh > 0\` condition → with no fresh orange left you would keep counting
  empty minutes.

**How to narrate:**
> "This is multi-source BFS: every initially rotten orange is a source, so I put them all in
> the queue at once. Then each BFS level is exactly one minute of spreading — I snapshot the
> queue size so newly infected oranges wait for the next minute. If fresh oranges are left when
> the queue drains, they were never connected to a rotten one and the answer is -1."

## Related Problems

- [Walls and Gates](./WallAndGates.java) — the same multi-source pattern
- [01 Matrix](./DistanceToNearestZero.java) — distance to the nearest source
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [Shortest Path in a Binary Maze](./ShortestPathInBinaryGrid.java) — single-source BFS on a grid
`,i=[`orangesRotting`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};