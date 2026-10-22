var e=`dynamicprogramming.GridUniquePathsIII`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Unique Paths III
 * LeetCode: 980 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Backtracking, DFS on a grid
 *
 * <p>Problem: Count the 4-directional walks from the start square to the end square that visit every non-obstacle square exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * grid[0][0] grid[0][1] ... grid[rows-1][cols-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 3
 * 1 0 0 0 0 0 0 0 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Depth-first search that remembers which cells are already used, because the set of visited cells is part of the state.
 *
 * <p>Complexity: Time O(3^(rowsxcols)), Space O(rows x cols).
 */
public class GridUniquePathsIII {

    /**
     * Counts the 4-directional walks that visit every non-obstacle cell exactly once.
     *
     * <p>The state of the search is the current cell plus the set of cells already visited, so the
     * visited cells are marked in the grid itself (and unmarked again when backtracking).
     *
     * @param grid the grid -- {@code 1} marks the start, {@code 2} the end, {@code -1} an obstacle
     * @return the number of valid walks
     */
    public static int uniquePathsIII(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;

        int startRow = 0;
        int startCol = 0;
        int total = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    startRow = r;
                    startCol = c;
                }
                if (grid[r][c] != -1) {
                    total++; // every non-obstacle cell has to be visited
                }
            }
        }

        int[] answer = new int[1];
        dfs(grid, startRow, startCol, total, answer);
        return answer[0];
    }

    /**
     * Depth-first search over the grid.
     *
     * @param grid   the grid, mutated while searching and restored afterwards
     * @param row    the current row
     * @param col    the current column
     * @param left   the number of cells that have not been visited yet
     * @param answer the running answer, boxed so the recursion can update it
     */
    private static void dfs(int[][] grid, int row, int col, int left, int[] answer) {
        int rows = grid.length;
        int cols = grid[0].length;

        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] == -1) {
            return; // outside the grid, an obstacle, or already visited
        }
        if (grid[row][col] == 2) {
            if (left == 1) {
                answer[0]++; // the end square is the last cell of the walk
            }
            return;
        }

        int original = grid[row][col];
        grid[row][col] = -1; // take the cell
        dfs(grid, row + 1, col, left - 1, answer);
        dfs(grid, row - 1, col, left - 1, answer);
        dfs(grid, row, col + 1, left - 1, answer);
        dfs(grid, row, col - 1, left - 1, answer);
        grid[row][col] = original; // give the cell back
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

        System.out.println(uniquePathsIII(grid));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Unique Paths III
 * LeetCode: 980 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Backtracking, DFS on a grid
 *
 * <p>Problem: Count the 4-directional walks from the start square to the end square that visit every non-obstacle square exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * grid[0][0] grid[0][1] ... grid[rows-1][cols-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 3
 * 1 0 0 0 0 0 0 0 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Depth-first search that remembers which cells are already used, because the set of visited cells is part of the state.
 *
 * <p>Complexity: Time O(3^(rowsxcols)), Space O(rows x cols).
 */
public class Main {

    /**
     * Counts the 4-directional walks that visit every non-obstacle cell exactly once.
     *
     * <p>The state of the search is the current cell plus the set of cells already visited, so the
     * visited cells are marked in the grid itself (and unmarked again when backtracking).
     *
     * @param grid the grid -- {@code 1} marks the start, {@code 2} the end, {@code -1} an obstacle
     * @return the number of valid walks
     */
    public static int uniquePathsIII(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;

        int startRow = 0;
        int startCol = 0;
        int total = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    startRow = r;
                    startCol = c;
                }
                if (grid[r][c] != -1) {
                    total++; // every non-obstacle cell has to be visited
                }
            }
        }

        int[] answer = new int[1];
        dfs(grid, startRow, startCol, total, answer);
        return answer[0];
    }

    /**
     * Depth-first search over the grid.
     *
     * @param grid   the grid, mutated while searching and restored afterwards
     * @param row    the current row
     * @param col    the current column
     * @param left   the number of cells that have not been visited yet
     * @param answer the running answer, boxed so the recursion can update it
     */
    private static void dfs(int[][] grid, int row, int col, int left, int[] answer) {
        int rows = grid.length;
        int cols = grid[0].length;

        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] == -1) {
            return; // outside the grid, an obstacle, or already visited
        }
        if (grid[row][col] == 2) {
            if (left == 1) {
                answer[0]++; // the end square is the last cell of the walk
            }
            return;
        }

        int original = grid[row][col];
        grid[row][col] = -1; // take the cell
        dfs(grid, row + 1, col, left - 1, answer);
        dfs(grid, row - 1, col, left - 1, answer);
        dfs(grid, row, col + 1, left - 1, answer);
        dfs(grid, row, col - 1, left - 1, answer);
        grid[row][col] = original; // give the cell back
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

        System.out.println(uniquePathsIII(grid));
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
# Unique Paths III — LeetCode 980

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · DFS on a grid |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

You are given an \`m × n\` grid where each cell is:

- \`1\` — the starting square (exactly one)
- \`2\` — the ending square (exactly one)
- \`0\` — an empty square that may be walked over
- \`-1\` — an obstacle that may not be entered

Count the **4-directional walks** that start at the \`1\`, end at the \`2\` and step on **every non-obstacle square exactly once**.

## Input Format

The program reads from standard input:

\`\`\`
rows cols
grid[0][0] grid[0][1] ... grid[rows-1][cols-1]
\`\`\`

- \`rows\` — number of rows (1 ≤ rows ≤ 20)
- \`cols\` — number of columns (1 ≤ cols ≤ 20)
- the next \`rows * cols\` integers are the grid values read row by row:
  \`1\` = start square, \`2\` = end square, \`0\` = empty square, \`-1\` = obstacle

## Sample Input

\`\`\`
3 3
1 0 0 0 0 0 0 0 2
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

The 3 × 3 grid has exactly **2** walks that start at \`1\`, end at \`2\` and step on every cell exactly once.

## Approach

A normal grid DP cannot work here: the state would have to contain the **set** of visited cells, not just the position. So this is a backtracking search.

1. Count the non-obstacle cells (\`total\`) and find the start square.
2. Mark the start as visited and start a depth-first search from it.
3. At every step, try the four neighbours; skip the ones outside the grid, on an obstacle or    already visited.
4. When the search reaches the \`2\`, it only counts if every cell has been visited.
5. Undo the mark when the branch is finished — that is the backtracking.

The visited cells are stored **in the grid itself** (marked \`-1\`), which saves a separate set. The search is \`O(3^(m·n))\` in the worst case, which is why the grid is limited to 20 × 20.

## Dry Run

Input: a 3 × 3 grid with the start at \`(0,0)\`, the end at \`(2,2)\` and no obstacles — so all **9** cells have to be visited.

The search tries all four directions from every cell and backtracks when it dead-ends. The two complete walks are:

| walk | path (row, col) |
|---:|---|
| 1 | (0,0) → (0,1) → (0,2) → (1,2) → (1,1) → (2,1) → (2,0) → (1,0) → (2,2) |
| 2 | (0,0) → (1,0) → (2,0) → (2,1) → (1,1) → (0,1) → (0,2) → (1,2) → (2,2) |

Every other branch reaches the end square before all nine cells were used, or gets stuck.

**The search tree around the start** (the four branches, with the ones that die marked):

| branch | first move | outcome |
|---:|---|---|
| 1 | down to (1,0) | completes the walk shown above |
| 2 | right to (0,1) | completes the mirror walk |
| 3 | up to (−1,0) | outside the grid — pruned |
| 4 | left to (0,−1) | outside the grid — pruned |

Answer **2**.

**How the visited-mark works.** The grid cell itself is the visited flag:

| moment | cell \`(1,1)\` | meaning |
|---|---|---|
| before the search | \`0\` | free |
| while the walk steps on it | \`-1\` | already used — the neighbours are skipped |
| after the branch is done | \`0\` | free again — the backtrack |

**Pruning.** A walk that reaches the \`2\` while \`left > 1\` is discarded: the walk has to end there, and the remaining cells could not be visited afterwards.

**The count of cells.** \`total\` counts every cell that is not an obstacle — the start and the end included. The search starts with \`left = total\`.

## Java Solution

See [\`GridUniquePathsIII.java\`](./GridUniquePathsIII.java).

\`\`\`java
    public static int uniquePathsIII(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;

        int startRow = 0;
        int startCol = 0;
        int total = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    startRow = r;
                    startCol = c;
                }
                if (grid[r][c] != -1) {
                    total++;
                }
            }
        }

        int[] answer = new int[1];
        grid[startRow][startCol] = -1;
        dfs(grid, startRow, startCol, total, answer);
        return answer[0];
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(3^(rows·cols)) | the search explores up to \`3^(rows·cols)\` walks (four directions, minus the one you came from) |
| **Space** | O(rows · cols) | the recursion stack is at most \`rows · cols\` deep; the grid is reused for the visited marks |

**Space \`O(rows · cols)\`** — the grid doubles as the visited set, so only the recursion stack is extra.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you prune the search?"* → yes: a connectivity check (flood fill from the current cell must still reach every unvisited cell) and a parity check for the bipartite colouring.
- "Why not a DP?"* → the state would have to contain the visited set; a bitmask DP works only for tiny grids.
- "How would you change it to count only the paths that visit every cell in order?"* → that is the ordinary Unique Paths II DP.
- "What if the robot may also move diagonally?"* → add the two diagonal directions to the search.

**Common mistakes:**

- ❌ Forgetting to restore the cell after the recursive calls — the backtrack is what makes the other branches work.
- ❌ Counting a walk that reaches the end before every cell was visited.
- ❌ Treating the start cell as an obstacle permanently — it must be marked only while the search stands on it.
- ❌ Forgetting that the end square is also one of the cells that has to be visited.

**How to narrate:**

> "This cannot be a normal grid DP because the state would have to include the set of visited cells, so it is a backtracking search. I count the non-obstacle cells, then do a DFS that marks each cell as it steps on it and unmarks it when it backtracks. When the search reaches the end square I only count it if every cell was visited. Four directions, \`O(3^(m·n))\` time."

## Related Problems

- [Unique Paths — LeetCode 62](./UniquePaths.java) — the monotone version that does fit in a DP
- [Minimum Path Sum — LeetCode 64](./MinimumPathSum.java) — the minimising version
`,i=[`uniquePathsIII`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};