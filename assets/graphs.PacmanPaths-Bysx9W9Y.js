var e=`graphs.PacmanPaths`,t=`package com.dsa.graphs;

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
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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
# Pacman Paths

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Shortest path on a grid |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Pacman walks through a maze of pellets and walls. Find the **minimum number of moves** needed to
get from the start cell to the target cell.

Pacman moves one cell **up, down, left or right** per move, and cannot enter a wall. Return
\`-1\` when the target cannot be reached.

## Input Format

\`\`\`
rows cols
row0
row1
...
startRow startCol
targetRow targetCol
\`\`\`

- \`rows\`, \`cols\` — the size of the maze
- \`rows\` lines follow, each holding exactly \`cols\` characters **without spaces**:
  - \`'.'\` = pellet / open cell
  - \`'#'\` = wall
- \`startRow startCol\` — the start cell (0-based)
- \`targetRow targetCol\` — the target cell (0-based)

## Sample Input

\`\`\`
5 5
.....
.###.
.###.
.###.
.....
0 0
4 4
\`\`\`

## Expected Output

\`\`\`
8
\`\`\`

The only route is around the wall block: right 4, down 4 — 8 moves.

## Approach — BFS on the grid

Every move costs exactly one step, so the maze is an unweighted graph and BFS gives the
shortest path:

1. \`dist[sr][sc] = 0\` and push the start cell.
2. Dequeue a cell and look at its four neighbours. A neighbour is enterable when it is inside
   the grid, is not a wall and has not been visited.
3. Set \`dist[neighbour] = dist[cell] + 1\`, enqueue it, and return immediately when it is the
   target.

The \`dist\` matrix doubles as the visited marker: \`-1\` means "not visited yet".

**Edge cases:** the start or the target sitting on a wall → \`-1\`; start == target → \`0\`.

## Dry Run

Level = the number of moves so far. The frontier is the set of cells at that distance.

| Level | Frontier (cells reached) | New cells | Frontier size |
|---:|---|---|---:|
| 0 | \`(0,0)\` | — | 1 |
| 1 | \`(0,0)\` | \`(0,1)\`, \`(1,0)\` | 2 |
| 2 | \`(0,1)\`, \`(1,0)\` | \`(0,2)\`, \`(2,0)\` | 2 |
| 3 | \`(0,2)\`, \`(2,0)\` | \`(0,3)\`, \`(3,0)\` | 2 |
| 4 | \`(0,3)\`, \`(3,0)\` | \`(0,4)\`, \`(4,0)\` | 2 |
| 5 | \`(0,4)\`, \`(4,0)\` | \`(1,4)\`, \`(4,1)\` | 2 |
| 6 | \`(1,4)\`, \`(4,1)\` | \`(2,4)\`, \`(4,2)\` | 2 |
| 7 | \`(2,4)\`, \`(4,2)\` | \`(3,4)\`, \`(4,3)\` | 2 |
| 8 | \`(3,4)\`, \`(4,3)\` | **\`(4,4)\` = target** | — |

The target is reached at level **8** → answer **\`8\`**.

### Unreachable target

\`\`\`
3 3
...
.#.
...
0 0
2 2
\`\`\`

| Level | Frontier | New cells |
|---:|---|---|
| 0 | \`(0,0)\` | — |
| 1 | \`(0,0)\` | \`(0,1)\`, \`(1,0)\` |
| 2 | \`(0,1)\`, \`(1,0)\` | \`(0,2)\` (from \`(0,1)\`); \`(1,0)\` has no open neighbour below — \`(2,0)\` is open → \`(2,0)\` |

Hmm — with the wall only at \`(1,1)\`, the maze is still connected: \`0,0 → 1,0 → 2,0 → 2,1 → 2,2\`
is 4 moves. The unreachable case needs a **wall that separates** the maze, for example:

\`\`\`
3 3
.#.
.#.
.#.
\`\`\`

Here column 1 is entirely wall, so \`(0,0)\` and \`(2,2)\` are in different components → the BFS
exhausts the frontier without reaching the target → answer **\`-1\`**.

## Java Solution

See [\`PacmanPaths.java\`](./PacmanPaths.java).

\`\`\`java
public static int shortestPath(char[][] maze, int sr, int sc, int tr, int tc) {
    int[][] dist = new int[rows][cols];
    Arrays.fill(dist[r], -1);
    Deque<int[]> queue = new ArrayDeque<>();
    dist[sr][sc] = 0;
    queue.add(new int[]{sr, sc});
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] dir : DIRS) {
            int nr = cell[0] + dir[0], nc = cell[1] + dir[1];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                continue;
            }
            if (maze[nr][nc] == '#' || dist[nr][nc] != -1) {
                continue;
            }
            dist[nr][nc] = dist[cell[0]][cell[1]] + 1;
            if (nr == tr && nc == tc) {
                return dist[nr][nc];
            }
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
- *"Pacman eats the pellet — does that change anything?"* → not for the shortest path, but it
  changes the problem if Pacman must eat **all** pellets (that is NP-hard — the "Pac-Man
  problem").
- *"What if the moves have different costs?"* → use Dijkstra with a priority queue.
- *"What if Pacman can tunnel through walls after eating a power pill?"* → the state becomes
  \`(row, col, hasPowerPill)\` and you run BFS over the enlarged state space.
- *"How would you return the path, not just its length?"* → keep a parent array and walk it back.

**Common mistakes:**
- ❌ Forgetting the boundary check → \`ArrayIndexOutOfBoundsException\`.
- ❌ Marking visited **after** dequeuing → the same cell can be enqueued several times.
- ❌ Treating \`'#'\` as an open cell → the path goes through walls.

**How to narrate:**
> "Every move has the same cost, so it's a plain BFS on the grid. I keep a distance matrix that
> doubles as the visited flag, start from the given cell and expand in four directions, skipping
> walls and already visited cells. The first time I reach the target its distance is the
> minimum number of moves; if the queue empties first the target is unreachable and I return
> -1."

## Related Problems

- [Shortest Path in a Binary Maze](./ShortestPathInBinaryGrid.java) — the same shape, \`0\`/\`1\` cells
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [01 Matrix](./DistanceToNearestZero.java) — multi-source BFS
- [Word Ladder](./WordLadder.java) — BFS over a graph of strings
`,i=[`shortestPath`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};