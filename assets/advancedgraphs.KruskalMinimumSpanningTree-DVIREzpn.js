var e=`advancedgraphs.KruskalMinimumSpanningTree`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

import java.util.Arrays;
import java.util.Comparator;

/**
 * Problem: Kruskal's Minimum Spanning Tree
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Kruskal, Union-Find, greedy
 *
 * <p>Problem: Given an undirected, weighted graph, find the total weight of a minimum spanning
 * tree — a set of edges that connects every vertex with the smallest possible total weight.
 * Return {@code -1} when the graph is disconnected and no spanning tree exists.
 *
 * <p>Input format (stdin) — an <b>undirected</b>, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 5
 * 0 1 3
 * 1 2 4
 * 0 2 2
 * 2 3 5
 * 1 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: sort the edges by weight and add them one at a time. An edge is kept only when it
 * joins two different components — that is decided in O(alpha(n)) by a {@link UnionFind}. The
 * algorithm stops after {@code n - 1} accepted edges.
 *
 * <p>Complexity: Time O(m log m) — the sort dominates. Space O(n + m).
 */
public class KruskalMinimumSpanningTree {

    /**
     * Total weight of a minimum spanning tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected weighted edges {@code {u, v, weight}}
     * @return the MST weight, {@code -1} when the graph is disconnected
     */
    public static int mstWeight(int n, int[][] edges) {
        if (n <= 1) {
            return 0;
        }
        int[][] sorted = edges.clone();
        Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2])
                .thenComparingInt(e -> e[0])
                .thenComparingInt(e -> e[1]));

        UnionFind uf = new UnionFind(n);
        int total = 0;
        int accepted = 0;
        for (int[] edge : sorted) {
            if (uf.union(edge[0], edge[1])) {
                total += edge[2];
                accepted++;
                if (accepted == n - 1) {
                    break;
                }
            }
        }
        return accepted == n - 1 ? total : -1;
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

        System.out.println(mstWeight(n, edges));
    }
}
`,n=`import java.util.Arrays;
import java.util.Comparator;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Kruskal's Minimum Spanning Tree
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Kruskal, Union-Find, greedy
 *
 * <p>Problem: Given an undirected, weighted graph, find the total weight of a minimum spanning
 * tree — a set of edges that connects every vertex with the smallest possible total weight.
 * Return {@code -1} when the graph is disconnected and no spanning tree exists.
 *
 * <p>Input format (stdin) — an <b>undirected</b>, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 5
 * 0 1 3
 * 1 2 4
 * 0 2 2
 * 2 3 5
 * 1 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: sort the edges by weight and add them one at a time. An edge is kept only when it
 * joins two different components — that is decided in O(alpha(n)) by a {@link UnionFind}. The
 * algorithm stops after {@code n - 1} accepted edges.
 *
 * <p>Complexity: Time O(m log m) — the sort dominates. Space O(n + m).
 */
public class Main {

    /**
     * Total weight of a minimum spanning tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected weighted edges {@code {u, v, weight}}
     * @return the MST weight, {@code -1} when the graph is disconnected
     */
    public static int mstWeight(int n, int[][] edges) {
        if (n <= 1) {
            return 0;
        }
        int[][] sorted = edges.clone();
        Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2])
                .thenComparingInt(e -> e[0])
                .thenComparingInt(e -> e[1]));

        UnionFind uf = new UnionFind(n);
        int total = 0;
        int accepted = 0;
        for (int[] edge : sorted) {
            if (uf.union(edge[0], edge[1])) {
                total += edge[2];
                accepted++;
                if (accepted == n - 1) {
                    break;
                }
            }
        }
        return accepted == n - 1 ? total : -1;
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

        System.out.println(mstWeight(n, edges));
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

// ---------- inlined com.dsa.utils.UnionFind ----------
/**
 * Disjoint Set Union with union by rank and path compression.
 *
 * <p>Used by the Kruskal minimum-spanning-tree and redundant-connection problems.
 */
class UnionFind {

    private final int[] parent;
    private final int[] rank;
    private int components;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        components = n;
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    /** Representative of the set containing {@code x}. */
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    /** Merges the sets of {@code a} and {@code b}; returns false if already merged. */
    public boolean union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        if (rootA == rootB) {
            return false;
        }
        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }
        components--;
        return true;
    }

    public boolean connected(int a, int b) {
        return find(a) == find(b);
    }

    /** Number of disjoint sets remaining. */
    public int components() {
        return components;
    }
}
`,r=`
# Kruskal's Minimum Spanning Tree

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Union-Find |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given an undirected, weighted graph, find the total weight of a **minimum spanning tree** — a set
of edges that connects every vertex and whose total weight is as small as possible.

Return \`-1\` when the graph is disconnected, because then no spanning tree exists.

## Input Format

The program reads an **undirected**, weighted graph given as an **edge list**:

\`\`\`
n m
u1 v1 w1
u2 v2 w2
...
um vm wm
\`\`\`

- \`n\` — number of vertices, numbered \`0 … n-1\`
- \`m\` — number of undirected edges
- \`m\` lines, each with three integers \`u v w\`: the undirected edge \`u — v\` with weight \`w\`

## Sample Input

\`\`\`
4 5
0 1 3
1 2 4
0 2 2
2 3 5
1 3 1
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

The MST is \`1—3 (1)\`, \`0—2 (2)\`, \`0—1 (3)\` — total weight **6**.

## Approach — sort, then add edges that do not create a cycle

Kruskal's algorithm is the "sort and greedily accept" version of the MST problem:

1. **Sort** all edges by weight (ascending).
2. Start with \`n\` singleton components.
3. Walk the sorted edges. For each edge, add it **only if** its two endpoints are in different
   components — otherwise it would create a cycle.
4. Stop after \`n - 1\` accepted edges.

Step 3 is exactly what a {@link com.dsa.utils.UnionFind} answers: \`union(u, v)\` returns \`false\`
when the two vertices are already in the same set.

**Why the greedy choice is safe (the cut property).** At any moment the accepted edges form a
forest. Consider the cheapest edge that connects two different components of that forest: any
spanning tree must connect those two components somehow, and the cheapest edge crossing that cut
is exactly the edge we are looking at. So there is always an MST that contains it — we can
commit to it without losing optimality.

## Dry Run

Edges sorted by weight:

| Rank | Edge | Weight |
|---:|---|---:|
| 1 | \`1 — 3\` | 1 |
| 2 | \`0 — 2\` | 2 |
| 3 | \`0 — 1\` | 3 |
| 4 | \`1 — 2\` | 4 |
| 5 | \`2 — 3\` | 5 |

Union-Find starts with 4 components:

| Step | Edge | \`find(u)\` | \`find(v)\` | \`union\` | Accepted | Total | Components |
|---:|---|---:|---:|---|---:|---:|---:|
| 0 | — | — | — | — | — | 0 | 4 |
| 1 | \`1 — 3\` (1) | 1 | 3 | ✔ | ✔ | 1 | 3 |
| 2 | \`0 — 2\` (2) | 0 | 2 | ✔ | ✔ | 3 | 2 |
| 3 | \`0 — 1\` (3) | 0 | 1 | ✔ (different sets: \`{0,2}\` and \`{1,3}\`) | ✔ | 6 | 1 |
| 4 | — | — | — | — | — | 6 | 1 |

3 accepted edges = \`n - 1\` → the tree is complete → total weight **\`6\`**.

### A disconnected graph

\`\`\`
4 2
0 1 1
2 3 1
\`\`\`

| Step | Edge | \`union\` | Accepted | Total | Components |
|---:|---|---|---:|---:|---:|
| 1 | \`0 — 1\` (1) | ✔ | ✔ | 1 | 3 |
| 2 | \`2 — 3\` (1) | ✔ | ✔ | 2 | 2 |

Only 2 edges were accepted but \`n - 1 = 3\` are needed → the graph is disconnected → answer
**\`-1\`**.

## Java Solution

See [\`KruskalMinimumSpanningTree.java\`](./KruskalMinimumSpanningTree.java).

\`\`\`java
public static int mstWeight(int n, int[][] edges) {
    int[][] sorted = edges.clone();
    Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2]));
    UnionFind uf = new UnionFind(n);
    int total = 0;
    int accepted = 0;
    for (int[] edge : sorted) {
        if (uf.union(edge[0], edge[1])) {
            total += edge[2];
            if (++accepted == n - 1) {
                break;
            }
        }
    }
    return accepted == n - 1 ? total : -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log m) | The sort dominates; the unions are O(m · α(n)) |
| **Space** | O(n + m) | The Union-Find arrays and the copy of the edge list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How does Prim's algorithm differ?"* → Prim grows one tree at a time from a single vertex
  (see [Prim's MST](./PrimMinimumSpanningTree.java));
  Kruskal grows a forest over the whole edge set.
- *"Which one is faster?"* → Kruskal is O(m log m) and good for sparse graphs; Prim with a
  binary heap is O(m log n) and good for dense graphs.
- *"What if the graph is disconnected?"* → you get a **minimum spanning forest**; report the
  weight per component.
- *"Can you return the edges, not just the weight?"* → keep the accepted edges, see
  [Minimum Spanning Tree](./MinimumSpanningTree.java).
- *"How do you prove it is optimal?"* → the cut property (see the Approach section).

**Common mistakes:**
- ❌ Not sorting the edges → the greedy step picks expensive edges and the result is not minimal.
- ❌ Adding an edge without checking for a cycle → the result contains a cycle and is not a tree.
- ❌ Forgetting to check that \`n - 1\` edges were accepted → a disconnected graph silently returns
  a wrong total.

**How to narrate:**
> "Kruskal is sort-and-greedily-accept. I sort the edges by weight, then walk them in order and
> keep an edge only when it joins two different components — union-find answers that in
> effectively constant time. I stop after n-1 accepted edges; if I never get that many the graph
> is disconnected and I return -1."

## Related Problems

- [Prim's Minimum Spanning Tree](./PrimMinimumSpanningTree.java)
- [Minimum Spanning Tree](./MinimumSpanningTree.java)
- [Number of Connected Components](../graphs/NumberOfConnectedComponents.java)
- [Graph Valid Tree](../graphs/GraphValidTree.java)
`,i=[`mstWeight`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};