var e=`advancedgraphs.FloydWarshall`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Floyd-Warshall All-Pairs Shortest Path
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Floyd-Warshall, dynamic programming on a graph
 *
 * <p>Problem: Compute the shortest distance between <b>every</b> pair of vertices. Negative edge
 * weights are allowed, but a negative cycle makes the answer meaningless.
 *
 * <p>Input format (stdin) — a directed, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 0 1 3
 * 1 2 4
 * 0 2 1
 * 2 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 3 1 3
 * INF 0 4 6
 * INF INF 0 2
 * INF INF INF 0
 * </pre>
 *
 * <p>Output: the distance matrix, one row per line, with {@code INF} for unreachable pairs and
 * {@code 0} on the diagonal.
 *
 * <p>Approach: classic dynamic programming over the intermediate vertices. Let
 * {@code dist[i][j]} be the best distance using only the vertices {@code 0..k} as intermediate
 * stops. Each round either keeps the old distance or routes through vertex {@code k}:
 * {@code dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])}.
 *
 * <p>Complexity: Time O(n³), Space O(n²).
 */
public class FloydWarshall {

    /**
     * All-pairs shortest distances.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed weighted edges {@code {u, v, weight}}
     * @return the distance matrix; {@link Integer#MAX_VALUE} marks an unreachable pair
     */
    public static int[][] allPairsShortestPaths(int n, int[][] edges) {
        int[][] dist = new int[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], Integer.MAX_VALUE);
            dist[i][i] = 0;
        }
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int weight = edge[2];
            if (weight < dist[u][v]) {
                dist[u][v] = weight; // keep the cheapest parallel edge
            }
        }

        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                if (dist[i][k] == Integer.MAX_VALUE) {
                    continue;
                }
                for (int j = 0; j < n; j++) {
                    if (dist[k][j] == Integer.MAX_VALUE) {
                        continue;
                    }
                    int throughK = dist[i][k] + dist[k][j];
                    if (throughK < dist[i][j]) {
                        dist[i][j] = throughK;
                    }
                }
            }
        }
        return dist;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
            edges[i][2] = fs.nextInt();
        }

        int[][] dist = allPairsShortestPaths(n, edges);
        for (int i = 0; i < n; i++) {
            StringBuilder row = new StringBuilder();
            for (int j = 0; j < n; j++) {
                if (j > 0) {
                    row.append(' ');
                }
                row.append(dist[i][j] == Integer.MAX_VALUE ? "INF" : String.valueOf(dist[i][j]));
            }
            System.out.println(row);
        }
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Floyd-Warshall All-Pairs Shortest Path
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Floyd-Warshall, dynamic programming on a graph
 *
 * <p>Problem: Compute the shortest distance between <b>every</b> pair of vertices. Negative edge
 * weights are allowed, but a negative cycle makes the answer meaningless.
 *
 * <p>Input format (stdin) — a directed, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 0 1 3
 * 1 2 4
 * 0 2 1
 * 2 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 3 1 3
 * INF 0 4 6
 * INF INF 0 2
 * INF INF INF 0
 * </pre>
 *
 * <p>Output: the distance matrix, one row per line, with {@code INF} for unreachable pairs and
 * {@code 0} on the diagonal.
 *
 * <p>Approach: classic dynamic programming over the intermediate vertices. Let
 * {@code dist[i][j]} be the best distance using only the vertices {@code 0..k} as intermediate
 * stops. Each round either keeps the old distance or routes through vertex {@code k}:
 * {@code dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])}.
 *
 * <p>Complexity: Time O(n³), Space O(n²).
 */
public class Main {

    /**
     * All-pairs shortest distances.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed weighted edges {@code {u, v, weight}}
     * @return the distance matrix; {@link Integer#MAX_VALUE} marks an unreachable pair
     */
    public static int[][] allPairsShortestPaths(int n, int[][] edges) {
        int[][] dist = new int[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], Integer.MAX_VALUE);
            dist[i][i] = 0;
        }
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int weight = edge[2];
            if (weight < dist[u][v]) {
                dist[u][v] = weight; // keep the cheapest parallel edge
            }
        }

        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                if (dist[i][k] == Integer.MAX_VALUE) {
                    continue;
                }
                for (int j = 0; j < n; j++) {
                    if (dist[k][j] == Integer.MAX_VALUE) {
                        continue;
                    }
                    int throughK = dist[i][k] + dist[k][j];
                    if (throughK < dist[i][j]) {
                        dist[i][j] = throughK;
                    }
                }
            }
        }
        return dist;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
            edges[i][2] = fs.nextInt();
        }

        int[][] dist = allPairsShortestPaths(n, edges);
        for (int i = 0; i < n; i++) {
            StringBuilder row = new StringBuilder();
            for (int j = 0; j < n; j++) {
                if (j > 0) {
                    row.append(' ');
                }
                row.append(dist[i][j] == Integer.MAX_VALUE ? "INF" : String.valueOf(dist[i][j]));
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
# Floyd-Warshall All-Pairs Shortest Path

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dynamic programming · All-pairs |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Compute the shortest distance between **every pair** of vertices in a directed, weighted graph.

Negative edge weights are allowed, but a **negative cycle** makes the answers meaningless (the
distance would be \`−∞\`).

## Input Format

The program reads a directed, weighted graph given as an **edge list**:

\`\`\`
n m
u1 v1 w1
u2 v2 w2
...
um vm wm
\`\`\`

- \`n\` — number of vertices, numbered \`0 … n-1\`
- \`m\` — number of directed edges
- \`m\` lines, each with three integers \`u v w\`: the edge \`u → v\` with weight \`w\`

## Sample Input

\`\`\`
4 4
0 1 3
1 2 4
0 2 1
2 3 2
\`\`\`

## Expected Output

\`\`\`
0 3 1 3
INF 0 4 6
INF INF 0 2
INF INF INF 0
\`\`\`

The matrix has one row per source vertex. \`INF\` marks an unreachable pair, \`0\` is on the
diagonal, and \`dist[1][3] = 6\` is the cost of \`1 → 2 → 3\`.

## Approach — DP over the intermediate vertices

The recurrence is the whole algorithm:

> \`dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\`

Think of it as: "the shortest path from \`i\` to \`j\` either does not use vertex \`k\`, or it goes
through \`k\` — in which case it is the shortest \`i → k\` path plus the shortest \`k → j\` path."

The **order** of the loops is the whole trick:

\`\`\`
for k = 0 .. n-1:      // the intermediate vertex
    for i = 0 .. n-1:
        for j = 0 .. n-1:
            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
\`\`\`

\`k\` must be the **outermost** loop. Then, after round \`k\`, \`dist[i][j]\` is the shortest path
whose intermediate vertices are all in \`{0 … k}\`. If \`k\` were the inner loop, a single round
could chain several \`k\` vertices and produce a path that is not allowed at that stage.

The result is the full all-pairs matrix in O(n³).

## Dry Run

Initial matrix (\`INF\` = unreachable):

\`\`\`
0    3    1    ∞
∞    0    4    ∞
∞    ∞    0    2
∞    ∞    ∞    0
\`\`\`

**k = 0** — only vertex \`0\` may be an intermediate stop. \`dist[i][0]\` is finite only for
\`i = 0\`, and \`dist[0][j]\` for every \`j\`; routing through \`0\` only helps if \`dist[i][0]\` is
finite, so only row \`0\` can change — and \`dist[0][0] = 0\`, so nothing changes.

**k = 1** — \`dist[0][j] = min(dist[0][j], dist[0][1] + dist[1][j]) = min(dist[0][j], 3 + dist[1][j])\`

| \`i\` | \`j\` | old | \`dist[i][1] + dist[1][j]\` | new |
|---:|---:|---:|---:|---:|
| 0 | 2 | 1 | 3 + 4 = 7 | 1 |
| 0 | 3 | ∞ | 3 + ∞ = ∞ | ∞ |
| 2 | 3 | 2 | \`dist[2][1] = ∞\` → skip | 2 |

Nothing changes (the matrix is unchanged after k = 1 as well).

**k = 2** — \`dist[i][j] = min(dist[i][j], dist[i][2] + dist[2][j])\`

| \`i\` | \`j\` | old | \`dist[i][2] + dist[2][j]\` | new |
|---:|---:|---:|---:|---:|
| 0 | 3 | ∞ | 1 + 2 = 3 | **3** |
| 1 | 3 | ∞ | 4 + 2 = 6 | **6** |
| 2 | 3 | 2 | 0 + 2 = 2 | 2 |

**k = 3** — \`dist[i][3] = min(dist[i][3], dist[i][3] + dist[3][3])\` — adding \`0\` never improves
anything, so the matrix stays the same.

**Final matrix:**

\`\`\`
0    3    1    3
∞    0    4    6
∞    ∞    0    2
∞    ∞    ∞    0
\`\`\`

## Java Solution

See [\`FloydWarshall.java\`](./FloydWarshall.java).

\`\`\`java
for (int k = 0; k < n; k++) {
    for (int i = 0; i < n; i++) {
        if (dist[i][k] == Integer.MAX_VALUE) {
            continue;
        }
        for (int j = 0; j < n; j++) {
            if (dist[k][j] == Integer.MAX_VALUE) {
                continue;
            }
            int throughK = dist[i][k] + dist[k][j];
            if (throughK < dist[i][j]) {
                dist[i][j] = throughK;
            }
        }
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n³) | \`n\` rounds × \`n²\` pairs |
| **Space** | O(n²) | The distance matrix |

**When is it worth it?** Floyd-Warshall is the best choice when the graph is **small and dense**
and you need **all** pairs; for a single source, Dijkstra or Bellman-Ford are faster.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you detect a negative cycle with Floyd-Warshall?"* → after the algorithm,
  \`dist[i][i] < 0\` for some \`i\` means a negative cycle passes through \`i\`.
- *"Can you recover the paths?"* → keep a \`next[i][j]\` matrix that records the first hop of the
  best path and update it whenever you improve \`dist[i][j]\`.
- *"How would you do this for a sparse graph with one source?"* → Dijkstra, O(m log n) instead of
  O(n³).
- *"What is the space complexity of the in-place version?"* → O(n²) for the matrix itself; you
  need the whole matrix, so you cannot stream it.
- *"How do you detect that a graph is a DAG in O(n³)?"* → Floyd-Warshall detects cycles via
  \`dist[i][i] < 0\` for negative cycles; for arbitrary cycles, a topological sort is O(n + m).

**Common mistakes:**
- ❌ Putting \`k\` **inside** the loops → the algorithm uses intermediate vertices it is not
  allowed to use yet, and the result can be wrong.
- ❌ Not initialising \`dist[i][i] = 0\` → every path looks longer than it is.
- ❌ Overwriting a parallel edge instead of taking the minimum → a heavier parallel edge would
  win.
- ❌ Forgetting the \`INF\` guards → \`Integer.MAX_VALUE + something\` overflows to a negative
  number and the matrix gets garbage.

**How to narrate:**
> "Floyd-Warshall is dynamic programming over the set of allowed intermediate vertices. I
> initialise the matrix with the direct edges, zero on the diagonal and infinity elsewhere.
> Then for each vertex k, in the outermost loop, I relax every pair: either the best path from
> i to j avoids k, or it goes through k, which costs dist[i][k] + dist[k][j]. The order of the
> loops matters — k has to be outermost — and the whole thing is O(n cubed) time and O(n squared)
> space."

## Related Problems

- [Dijkstra's Shortest Path](./DijkstraShortestPath.java)
- [Bellman-Ford](./BellmanFord.java)
- [Network Delay Time](../graphs/NetworkDelayTime.java)
- [Cheapest Flights Within K Stops](../graphs/CheapestFlightsWithinKStops.java)
`,i=[`allPairsShortestPaths`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};