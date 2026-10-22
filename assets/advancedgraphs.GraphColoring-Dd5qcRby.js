var e=`advancedgraphs.GraphColoring`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Graph Coloring
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, DSATUR, chromatic number
 *
 * <p>Problem: Colour the vertices of an undirected graph so that no edge joins two vertices of
 * the same colour, using as few colours as possible. The minimum number of colours is the
 * <b>chromatic number</b>.
 *
 * <p>Input format (stdin) — an <b>undirected</b> graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5 5
 * 0 1
 * 1 2
 * 2 0
 * 2 3
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 1 2 3 1 2
 * </pre>
 *
 * <p>Output: the chromatic number on the first line, then the colour of every vertex
 * {@code 0..n-1} separated by spaces. Colours are numbered from 1.
 *
 * <p>Approach: the chromatic number is NP-hard in general, so the search is exponential. We try
 * {@code k = 1, 2, 3, ...} and for each {@code k} run a backtracking search that colours one
 * vertex at a time. The vertex to colour next is the one with the most <em>distinct</em> colours
 * among its already coloured neighbours (the DSATUR heuristic), which prunes the search
 * dramatically. The first {@code k} that works is the answer.
 *
 * <p>Complexity: Time exponential in the worst case (NP-hard), in practice far smaller thanks to
 * DSATUR and the early exit on the first colour count that works. Space O(n + m).
 */
public class GraphColoring {

    /**
     * Computes a minimum colouring of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code {numberOfColours, colour of vertex 0, ..., colour of vertex n-1}}, or an
     *         empty array when the graph cannot be coloured
     */
    public static int[] minimumColoring(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        for (int k = 1; k <= n; k++) {
            int[] colours = new int[n]; // 0 = uncoloured
            if (canColour(adj, colours, k)) {
                int[] result = new int[n + 1];
                result[0] = k;
                System.arraycopy(colours, 0, result, 1, n);
                return result;
            }
        }
        return new int[0];
    }

    /**
     * Backtracking search for a proper colouring with at most {@code k} colours.
     *
     * @param adj     adjacency list
     * @param colours current colouring, {@code 0} for uncoloured vertices
     * @param k       the number of colours we are allowed to use
     * @return {@code true} when a complete colouring was found
     */
    private static boolean canColour(List<List<Integer>> adj, int[] colours, int k) {
        int n = adj.size();

        // DSATUR: pick the uncoloured vertex whose coloured neighbours use the most colours.
        int vertex = -1;
        int bestSaturation = -1;
        for (int v = 0; v < n; v++) {
            if (colours[v] != 0) {
                continue;
            }
            int saturation = 0;
            boolean[] seen = new boolean[colours.length + 1];
            for (int u : adj.get(v)) {
                if (colours[u] != 0 && !seen[colours[u]]) {
                    seen[colours[u]] = true;
                    saturation++;
                }
            }
            if (saturation > bestSaturation) {
                bestSaturation = saturation;
                vertex = v;
            }
        }
        if (vertex == -1) {
            return true; // every vertex is coloured
        }

        for (int colour = 1; colour <= k; colour++) {
            if (isAllowed(adj, colours, vertex, colour)) {
                colours[vertex] = colour;
                if (canColour(adj, colours, k)) {
                    return true;
                }
                colours[vertex] = 0; // undo
            }
        }
        return false;
    }

    /** True when no already coloured neighbour of {@code v} uses {@code colour}. */
    private static boolean isAllowed(List<List<Integer>> adj, int[] colours, int v, int colour) {
        for (int u : adj.get(v)) {
            if (colours[u] == colour) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] edges = new int[m][2];
        for (int i = 0; i < m; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
        }

        int[] colouring = minimumColoring(n, edges);
        if (colouring.length == 0) {
            System.out.println(-1);
            return;
        }
        System.out.println(colouring[0]);
        StringBuilder sb = new StringBuilder();
        for (int v = 0; v < n; v++) {
            if (v > 0) {
                sb.append(' ');
            }
            sb.append(colouring[v + 1]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Graph Coloring
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, DSATUR, chromatic number
 *
 * <p>Problem: Colour the vertices of an undirected graph so that no edge joins two vertices of
 * the same colour, using as few colours as possible. The minimum number of colours is the
 * <b>chromatic number</b>.
 *
 * <p>Input format (stdin) — an <b>undirected</b> graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5 5
 * 0 1
 * 1 2
 * 2 0
 * 2 3
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 1 2 3 1 2
 * </pre>
 *
 * <p>Output: the chromatic number on the first line, then the colour of every vertex
 * {@code 0..n-1} separated by spaces. Colours are numbered from 1.
 *
 * <p>Approach: the chromatic number is NP-hard in general, so the search is exponential. We try
 * {@code k = 1, 2, 3, ...} and for each {@code k} run a backtracking search that colours one
 * vertex at a time. The vertex to colour next is the one with the most <em>distinct</em> colours
 * among its already coloured neighbours (the DSATUR heuristic), which prunes the search
 * dramatically. The first {@code k} that works is the answer.
 *
 * <p>Complexity: Time exponential in the worst case (NP-hard), in practice far smaller thanks to
 * DSATUR and the early exit on the first colour count that works. Space O(n + m).
 */
public class Main {

    /**
     * Computes a minimum colouring of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code {numberOfColours, colour of vertex 0, ..., colour of vertex n-1}}, or an
     *         empty array when the graph cannot be coloured
     */
    public static int[] minimumColoring(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        for (int k = 1; k <= n; k++) {
            int[] colours = new int[n]; // 0 = uncoloured
            if (canColour(adj, colours, k)) {
                int[] result = new int[n + 1];
                result[0] = k;
                System.arraycopy(colours, 0, result, 1, n);
                return result;
            }
        }
        return new int[0];
    }

    /**
     * Backtracking search for a proper colouring with at most {@code k} colours.
     *
     * @param adj     adjacency list
     * @param colours current colouring, {@code 0} for uncoloured vertices
     * @param k       the number of colours we are allowed to use
     * @return {@code true} when a complete colouring was found
     */
    private static boolean canColour(List<List<Integer>> adj, int[] colours, int k) {
        int n = adj.size();

        // DSATUR: pick the uncoloured vertex whose coloured neighbours use the most colours.
        int vertex = -1;
        int bestSaturation = -1;
        for (int v = 0; v < n; v++) {
            if (colours[v] != 0) {
                continue;
            }
            int saturation = 0;
            boolean[] seen = new boolean[colours.length + 1];
            for (int u : adj.get(v)) {
                if (colours[u] != 0 && !seen[colours[u]]) {
                    seen[colours[u]] = true;
                    saturation++;
                }
            }
            if (saturation > bestSaturation) {
                bestSaturation = saturation;
                vertex = v;
            }
        }
        if (vertex == -1) {
            return true; // every vertex is coloured
        }

        for (int colour = 1; colour <= k; colour++) {
            if (isAllowed(adj, colours, vertex, colour)) {
                colours[vertex] = colour;
                if (canColour(adj, colours, k)) {
                    return true;
                }
                colours[vertex] = 0; // undo
            }
        }
        return false;
    }

    /** True when no already coloured neighbour of {@code v} uses {@code colour}. */
    private static boolean isAllowed(List<List<Integer>> adj, int[] colours, int v, int colour) {
        for (int u : adj.get(v)) {
            if (colours[u] == colour) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] edges = new int[m][2];
        for (int i = 0; i < m; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
        }

        int[] colouring = minimumColoring(n, edges);
        if (colouring.length == 0) {
            System.out.println(-1);
            return;
        }
        System.out.println(colouring[0]);
        StringBuilder sb = new StringBuilder();
        for (int v = 0; v < n; v++) {
            if (v > 0) {
                sb.append(' ');
            }
            sb.append(colouring[v + 1]);
        }
        System.out.println(sb);
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
# Graph Coloring

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · DSATUR |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Intel |

## Problem Statement

Colour the vertices of an undirected graph so that **no edge joins two vertices of the same
colour**, using as few colours as possible. The minimum number of colours is the **chromatic
number** of the graph.

## Input Format

The program reads an **undirected** graph given as an **edge list**:

\`\`\`
n m
u1 v1
u2 v2
...
um vm
\`\`\`

- \`n\` — number of vertices, numbered \`0 … n-1\`
- \`m\` — number of undirected edges
- \`m\` lines, each with two integers \`u v\` in \`0 … n-1\`: the undirected edge \`u — v\`

## Sample Input

\`\`\`
5 5
0 1
1 2
2 0
2 3
3 4
\`\`\`

## Expected Output

\`\`\`
3
1 2 3 1 2
\`\`\`

Line 1 is the chromatic number, line 2 is the colour of every vertex \`0 … n-1\` (colours are
numbered from 1).

Three colours are necessary because \`0 — 1 — 2\` is a triangle, and three are sufficient as the
output shows.

## Approach — try \`k\` colours, backtrack when stuck

The chromatic number is **NP-hard** in general, so there is no polynomial algorithm; the
interview answer is a pruned exponential search.

1. For \`k = 1, 2, 3, …\` try to colour the graph with at most \`k\` colours.
2. The search is a **backtracking** one: pick an uncoloured vertex, try every colour that is not
   used by its coloured neighbours, recurse, and undo on failure.
3. The first \`k\` that works is the chromatic number.

**Which vertex to colour next matters enormously.** Plain backtracking can take forever. The
**DSATUR** heuristic picks the uncoloured vertex whose coloured neighbours use the **most
distinct colours** (its *saturation*), breaking ties by the smallest index. A vertex with
saturation \`k\` cannot be coloured at all, so the search fails immediately — DSATUR finds those
dead ends much earlier.

**Why the search is fast in practice.** Trying \`k = 1\` and \`k = 2\` fails almost immediately for
any graph with an odd cycle, and DSATUR drives the search into the constrained vertices first.

## Dry Run

Graph: \`0—1\`, \`1—2\`, \`2—0\` (a triangle) plus \`2—3\`, \`3—4\`.

**k = 1**

| Step | Vertex chosen (saturation) | Colour tried | Result | State |
|---:|---|---:|---|---|
| 1 | \`0\` (sat 0) | 1 | ok | \`[1, 0, 0, 0, 0]\` |
| 2 | \`1\` (sat 1 — neighbour \`0\` uses colour 1) | 1 | **blocked** (colour 1 is taken by \`0\`) | no colour available → backtrack |

\`k = 1\` is impossible.

**k = 2**

| Step | Vertex chosen (saturation) | Colour tried | Result | State |
|---:|---|---:|---|---|
| 1 | \`0\` (sat 0) | 1 | ok | \`[1, 0, 0, 0, 0]\` |
| 2 | \`1\` (sat 1) | 1 blocked → try 2 | ok | \`[1, 2, 0, 0, 0]\` |
| 3 | \`2\` (sat 2 — neighbours \`0\`=1 and \`1\`=2) | 1 blocked, 2 blocked | **no colour available** → backtrack | \`k = 2\` is impossible |

**k = 3**

| Step | Vertex chosen (saturation) | Colour tried | Result | State |
|---:|---|---:|---|---|
| 1 | \`0\` (sat 0) | 1 | ok | \`[1, 0, 0, 0, 0]\` |
| 2 | \`1\` (sat 1) | 1 blocked → try 2 | ok | \`[1, 2, 0, 0, 0]\` |
| 3 | \`2\` (sat 2) | 1 blocked, 2 blocked → try 3 | ok | \`[1, 2, 3, 0, 0]\` |
| 4 | \`3\` (sat 1 — neighbour \`2\` uses colour 3) | 1 | ok | \`[1, 2, 3, 1, 0]\` |
| 5 | \`4\` (sat 1 — neighbour \`3\` uses colour 1) | 1 blocked → try 2 | ok | \`[1, 2, 3, 1, 2]\` |

Every vertex is coloured → the chromatic number is **3** and the colouring is
**\`1 2 3 1 2\`**.

\`\`\`
3
1 2 3 1 2
\`\`\`

## Java Solution

See [\`GraphColoring.java\`](./GraphColoring.java).

\`\`\`java
private static boolean canColour(List<List<Integer>> adj, int[] colours, int k) {
    // DSATUR: pick the uncoloured vertex with the most distinct coloured-neighbour colours.
    int vertex = -1;
    int bestSaturation = -1;
    for (int v = 0; v < adj.size(); v++) {
        if (colours[v] != 0) {
            continue;
        }
        int saturation = 0;
        boolean[] seen = new boolean[colours.length + 1];
        for (int u : adj.get(v)) {
            if (colours[u] != 0 && !seen[colours[u]]) {
                seen[colours[u]] = true;
                saturation++;
            }
        }
        if (saturation > bestSaturation) {
            bestSaturation = saturation;
            vertex = v;
        }
    }
    if (vertex == -1) {
        return true; // every vertex is coloured
    }
    for (int colour = 1; colour <= k; colour++) {
        if (isAllowed(adj, colours, vertex, colour)) {
            colours[vertex] = colour;
            if (canColour(adj, colours, k)) {
                return true;
            }
            colours[vertex] = 0; // undo
        }
    }
    return false;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | Exponential (NP-hard) | In the worst case the search tries every assignment; DSATUR and the \`k = 1, 2, …\` loop prune it heavily in practice |
| **Space** | O(n + m) | Adjacency list, colour array and the recursion stack (depth ≤ n) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is there a faster algorithm?"* → for **bipartite** graphs, yes: two colours, decided in
  O(n + m) with BFS — see [Is Graph Bipartite](../graphs/BipartiteCheck.java).
  In general the problem is NP-hard, but there are good heuristics (DSATUR, simulated annealing)
  and exact solvers for small instances.
- *"What if the graph is a tree?"* → exactly 2 colours (1 if there is only one vertex).
- *"What if the graph is a complete graph on \`k\` vertices?"* → exactly \`k\` colours.
- *"Can you give a greedy approximation instead?"* → yes: first-fit colouring uses at most
  \`Δ + 1\` colours (where \`Δ\` is the maximum degree) and at most twice the optimum.
- *"How would you colour a huge real-world graph?"* → the heuristic greedy colouring, not the
  exact search.

**Common mistakes:**
- ❌ Trying colours in a random order → the output is not reproducible; the program must always
  print the same colouring for the same input.
- ❌ Forgetting to undo the colour on backtracking → the search explores states that do not
  exist and can report a wrong answer.
- ❌ Assuming the chromatic number is \`3\` (the "five-colour theorem" of planar graphs only says
  *at most* 5) → planar graphs need at most 4 by the four-colour theorem.
- ❌ Not checking that an already coloured neighbour does not use the colour you are trying.

**How to narrate:**
> "The chromatic number is NP-hard in general, so I'd do a pruned exact search. I try k = 1, 2,
> 3 … and for each k I backtrack: I colour one vertex at a time, trying only colours that no
> coloured neighbour uses, and undo on failure. The important part is the vertex order — I use
> DSATUR and always colour the vertex whose neighbours already use the most distinct colours,
> because a vertex with saturation k fails immediately and the search then backtracks much
> earlier. The first k that succeeds is the chromatic number."

## Related Problems

- [Is Graph Bipartite](../graphs/BipartiteCheck.java) — the \`k = 2\` case
- [Bridges in a Graph](./BridgesInGraph.java)
- [Graph Valid Tree](../graphs/GraphValidTree.java)
- [Minimum Spanning Tree](./MinimumSpanningTree.java)
`,i=[`minimumColoring`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};