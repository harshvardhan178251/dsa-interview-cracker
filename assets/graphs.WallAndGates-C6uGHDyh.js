var e=`graphs.WallAndGates`,t=`package com.dsa.graphs;

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
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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
# Walls and Gates — LeetCode 286

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Multi-source BFS · Grid traversal |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Every cell of a grid is a **wall**, a **gate** or an **open space**. The distance of an open
space is the number of steps to the nearest gate. Gates keep distance \`0\` and walls keep \`-1\`.

Compute the distance of every open space in the least possible number of steps.

## Input Format

\`\`\`
rows cols
row0
row1
...
\`\`\`

- \`rows\`, \`cols\` — the size of the grid
- \`rows\` lines follow, each with \`cols\` **space-separated integers**:
  - \`0\` = gate
  - \`-1\` = wall
  - any **positive** value = open space (the value itself is irrelevant — it is just a marker)

## Sample Input

\`\`\`
3 3
100000 -1 100000
100000 -1 100000
100000 100000 0
\`\`\`

## Expected Output

\`\`\`
4 -1 2
3 -1 1
2 1 0
\`\`\`

The single gate is at the bottom-right corner; the distances ripple outwards from it, and the
two wall cells keep \`-1\`.

## Approach — multi-source BFS from every gate

All gates are the **sources** of the same wave, so put them all into the queue at distance \`0\`
and run one BFS:

1. Seed the queue with every gate; mark them as settled.
2. Pop a cell; each unvisited open neighbour gets \`distance = distance[cell] + 1\` and is queued.
3. Walls are never entered.

BFS explores in rings, and the ring a cell is reached in **is** its distance to the nearest gate.

**Why not run BFS from every gate separately?** That is \`O(gates · rows · cols)\` — one full
traversal per gate. Multi-source BFS does it in a single traversal.

**A subtlety.** The open cells are marked with an arbitrary positive number, so "has this cell
already been visited?" cannot be answered by looking at its value — after we write the distance
the value is still positive. We keep a separate \`settled\` matrix for exactly that reason.

## Dry Run

| Level | Queue at start | Cell | Neighbours (open) | Distances written | Queue at end |
|---:|---|---|---|---|---|
| 0 | \`[(2,2)]\` | — | — | the gate \`(2,2)\` is \`0\` | \`[(2,2)]\` |
| 1 | \`[(2,2)]\` | \`(2,2)\` | \`(1,2)\`, \`(2,1)\` | \`(1,2)=1\`, \`(2,1)=1\` | \`[(1,2), (2,1)]\` |
| 2 | \`[(1,2), (2,1)]\` | \`(1,2)\` | \`(0,2)\` — \`(1,1)\` is a wall | \`(0,2)=2\` | \`[(2,1), (0,2)]\` |
| 2 | \`[(2,1)]\` | \`(2,1)\` | \`(2,0)\` — \`(1,1)\` is a wall | \`(2,0)=2\` | \`[(0,2), (2,0)]\` |
| 3 | \`[(0,2), (2,0)]\` | \`(0,2)\` | none — \`(0,1)\` is a wall | — | \`[(2,0)]\` |
| 3 | \`[(2,0)]\` | \`(2,0)\` | \`(1,0)\` | \`(1,0)=3\` | \`[(1,0)]\` |
| 4 | \`[(1,0)]\` | \`(1,0)\` | \`(0,0)\` | \`(0,0)=4\` | \`[(0,0)]\` |
| 5 | \`[(0,0)]\` | \`(0,0)\` | none | — | \`[]\` |

Final grid:

\`\`\`
4 -1 2
3 -1 1
2 1 0
\`\`\`

## Java Solution

See [\`WallAndGates.java\`](./WallAndGates.java).

\`\`\`java
public static void wallsAndGates(int[][] grid) {
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
                // ... skip walls and already settled cells, otherwise write the distance ...
            }
        }
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | Each cell is settled once |
| **Space** | O(rows × cols) | The queue and the \`settled\` matrix |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if we also want the direction back to the nearest gate?"* → keep a \`parent\` array
  alongside the distances and walk it backwards.
- *"What if the gates have different 'open times'?"* → it becomes a time-dependent problem;
  use a priority queue keyed on arrival time.
- *"What if the grid is a maze with doors?"* → model doors as extra edge weights and use Dijkstra.
- *"What if you have to answer this for many grids?"* → the algorithm is linear in the grid size,
  which is optimal.

**Common mistakes:**
- ❌ Running a separate BFS from each gate → O(gates · cells) instead of O(cells).
- ❌ Using the cell value to detect "already visited" → after writing the distance the value is
  still positive, so the cell would be re-entered forever (infinite loop).
- ❌ Letting the BFS walk **through** walls → the distance to a cell behind a wall would be wrong.

**How to narrate:**
> "Every gate is a source, so this is a multi-source BFS: I put all the gates in the queue at
> distance 0 and expand in rings. The first time a cell is reached its distance is the distance
> to the nearest gate. Walls are never enqueued. I keep a separate visited matrix because the
> open cells are marked with an arbitrary positive number that doesn't tell me whether they've
> been settled."

## Related Problems

- [01 Matrix](./DistanceToNearestZero.java) — the same pattern with the sources in the grid
- [Rotting Oranges](./RottingOranges.java) — the same pattern with time as the distance
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [Shortest Path in a Binary Maze](./ShortestPathInBinaryGrid.java) — single-source BFS on a grid
`,i=[`wallsAndGates`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};