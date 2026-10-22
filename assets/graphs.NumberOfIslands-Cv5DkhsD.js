var e=`graphs.NumberOfIslands`,t=`package com.dsa.graphs;

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
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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
# Number of Islands — LeetCode 200

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Grid DFS · Flood fill |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Given an \`m × n\` grid where \`'1'\` is land and \`'0'\` is water, return the number of **islands**.

An island is a maximal group of land cells connected **4-directionally** (up, down, left, right).
Diagonal contact does *not* count.

## Input Format

\`\`\`
rows cols
row0
row1
...
\`\`\`

- \`rows\`, \`cols\` — the size of the grid (1 ≤ rows, cols ≤ 300)
- \`rows\` lines follow, each holding exactly \`cols\` characters **without spaces**:
  - \`'1'\` = land, \`'0'\` = water

## Sample Input

\`\`\`
3 3
110
001
100
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

The land cells form three separate groups: \`{0,0)-(0,1)}\`, \`{(1,2)}\` and \`{(2,0)}\`.

## Approach — scan and flood

The naive way ("for every land cell, run a full search") is O(cells²) because the same island is
re-explored once per cell. The fix is to **destroy** what you have explored:

1. Walk the grid in row-major order.
2. The moment you see a land cell that has not been flooded yet, you have found a **new
   island** — increment the counter.
3. Run an iterative DFS from that cell, turning every reachable land cell into water (\`'0'\`).
   Those cells can never be counted again, so each cell is visited at most once overall.

**Mark on push, not on pop.** The cell is flipped to \`'0'\` the moment it is pushed onto the
stack. If you flipped it on pop instead, the same cell could be pushed several times before it
was processed, and the stack could grow quadratically.

**Why iterative DFS?** The recursive version blows the stack on a 300 × 300 grid of land
(90 000 frames). An explicit \`ArrayDeque\` of coordinates has the same time complexity and no
recursion limit.

## Dry Run

Grid (rows separated by \`/\`):

\`\`\`
110 / 001 / 100
\`\`\`

| Step | Scan hits | Action | Stack (top → bottom) | Grid after |
|---:|---|---|---|---|
| 0 | — | initial grid | \`[]\` | \`110 / 001 / 100\` |
| 1 | \`(0,0)='1'\` | island **#1** found, push \`(0,0)\`, mark it water | \`[(0,0)]\` | \`110 / 001 / 100\` |
| 2 | — | pop \`(0,0)\`; neighbour \`(0,1)\` is land → mark, push | \`[(0,1)]\` | \`100 / 001 / 100\` |
| 3 | — | pop \`(0,1)\`; neighbours \`(0,0)\`,\`(0,2)\`,\`(1,1)\` are water | \`[]\` | \`100 / 001 / 100\` |
| 4 | \`(1,2)='1'\` | island **#2** found, push \`(1,2)\`, mark it water | \`[(1,2)]\` | \`100 / 001 / 100\` |
| 5 | — | pop \`(1,2)\`; neighbours \`(0,2)\`,\`(2,2)\`,\`(1,1)\` are water | \`[]\` | \`100 / 000 / 100\` |
| 6 | \`(2,0)='1'\` | island **#3** found, push \`(2,0)\`, mark it water | \`[(2,0)]\` | \`100 / 000 / 100\` |
| 7 | — | pop \`(2,0)\`; neighbours \`(1,0)\`,\`(2,1)\` are water | \`[]\` | \`000 / 000 / 000\` |
| 8 | — | scan finishes — every remaining cell is water | \`[]\` | \`000 / 000 / 000\` |

**Answer: 3 islands.**

## Java Solution

See [\`NumberOfIslands.java\`](./NumberOfIslands.java).

\`\`\`java
public static int numIslands(char[][] grid) {
    int rows = grid.length, cols = grid[0].length;
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
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | The outer scan touches every cell once; every land cell is pushed and popped exactly once |
| **Space** | O(rows × cols) | The DFS stack can hold every land cell in the worst case |

**Optimal?** Yes — you have to look at every cell.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the grid is huge and does not fit in memory?"* → use a disjoint-set union over the
  land cells and merge horizontally/vertically adjacent ones; the answer is the number of
  remaining sets (see [Number of Connected Components](./NumberOfConnectedComponents.java)).
- *"What if we had to label each island instead of counting them?"* → keep the island index in a
  second grid instead of overwriting with \`'0'\`.
- *"Does diagonal connection count?"* → it does **not** here; if it did, add the two diagonal
  offsets to the direction array.

**Common mistakes:**
- ❌ Marking the cell as visited **after** popping it → the same cell can be pushed many times
  and the stack explodes.
- ❌ Forgetting to check the grid boundaries → \`ArrayIndexOutOfBoundsException\` on every edge.
- ❌ Using recursion on a large grid → \`StackOverflowError\`; an explicit deque is the safe choice.

**How to narrate:**
> "I scan the grid once. Whenever I find land that hasn't been flooded yet, that's a new island:
> I bump the counter and then flood the whole island by DFS, turning every reachable land cell
> into water. Because the flood destroys what it visits, no cell is ever processed twice, so the
> whole thing is O(rows × cols). I'll use an explicit stack rather than recursion so a large
> grid can't blow the call stack."

## Related Problems

- [Walls and Gates](./WallAndGates.java) — the same multi-source flood fill on a grid
- [01 Matrix](./DistanceToNearestZero.java) — flood fill from every source at once
- [Number of Connected Components](./NumberOfConnectedComponents.java) — the general graph version
- [Clone Graph](./CloneGraph.java) — copying an arbitrary connected structure
`,i=[`numIslands`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};