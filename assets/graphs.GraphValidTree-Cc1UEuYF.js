var e=`graphs.GraphValidTree`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

/**
 * Problem: Graph Valid Tree
 * LeetCode: 261 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Union-Find, cycle detection
 *
 * <p>Problem: Given an undirected graph with {@code n} vertices, decide whether it is a valid
 * tree. A graph is a tree when it is connected and has no cycle. Equivalently: it has
 * {@code n - 1} edges and no two edges close a cycle.
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
 * 5 4
 * 0 1
 * 0 2
 * 1 2
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: add the edges one by one to a {@link UnionFind}. If an edge joins two vertices
 * that are already in the same set, it closes a cycle — the graph is not a tree. If no edge does
 * and only one set remains at the end, the graph is connected, so it is a tree.
 *
 * <p>Complexity: Time O(m * alpha(n)), Space O(n).
 */
public class GraphValidTree {

    /**
     * Decides whether the undirected graph is a tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code true} when the graph is a tree
     */
    public static boolean isValidTree(int n, int[][] edges) {
        if (n <= 0) {
            return false;
        }
        // A tree on n vertices has exactly n - 1 edges.
        if (edges.length != n - 1) {
            return false;
        }
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            if (!uf.union(edge[0], edge[1])) {
                return false; // this edge closes a cycle
            }
        }
        return uf.components() == 1;
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

        System.out.println(isValidTree(n, edges));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Graph Valid Tree
 * LeetCode: 261 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Union-Find, cycle detection
 *
 * <p>Problem: Given an undirected graph with {@code n} vertices, decide whether it is a valid
 * tree. A graph is a tree when it is connected and has no cycle. Equivalently: it has
 * {@code n - 1} edges and no two edges close a cycle.
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
 * 5 4
 * 0 1
 * 0 2
 * 1 2
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: add the edges one by one to a {@link UnionFind}. If an edge joins two vertices
 * that are already in the same set, it closes a cycle — the graph is not a tree. If no edge does
 * and only one set remains at the end, the graph is connected, so it is a tree.
 *
 * <p>Complexity: Time O(m * alpha(n)), Space O(n).
 */
public class Main {

    /**
     * Decides whether the undirected graph is a tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code true} when the graph is a tree
     */
    public static boolean isValidTree(int n, int[][] edges) {
        if (n <= 0) {
            return false;
        }
        // A tree on n vertices has exactly n - 1 edges.
        if (edges.length != n - 1) {
            return false;
        }
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            if (!uf.union(edge[0], edge[1])) {
                return false; // this edge closes a cycle
            }
        }
        return uf.components() == 1;
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

        System.out.println(isValidTree(n, edges));
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
# Graph Valid Tree — LeetCode 261

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Union-Find · Cycle detection |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given an undirected graph with \`n\` vertices, decide whether it is a **valid tree**.

A graph is a tree exactly when it is **connected** and **acyclic**. Equivalently, a tree on \`n\`
vertices has exactly \`n - 1\` edges and no edge closes a cycle.

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

> Every edge is undirected: \`0 1\` means the edge joins vertices \`0\` and \`1\` in **both**
> directions.

## Sample Input

\`\`\`
5 4
0 1
0 2
1 2
3 4
\`\`\`

## Expected Output

\`\`\`
false
\`\`\`

Vertices \`0, 1, 2\` form a triangle — a cycle — so this is not a tree (it is also disconnected:
\`{3, 4}\` is a separate component).

## Approach — edge count plus Union-Find

Two facts about trees do all the work:

1. A tree on \`n\` vertices has **exactly \`n - 1\` edges**. If the count differs, it cannot be a
   tree.
2. Adding an edge to a forest either **merges two components** (fine) or **closes a cycle** (not
   fine). A {@link com.dsa.utils.UnionFind} answers "are these two vertices already connected?"
   in effectively constant time.

So: reject immediately if \`m != n - 1\`; then add the edges one at a time and reject as soon as
one of them joins two vertices that are already connected. If every edge was accepted and only
one component is left, the graph is a tree.

**A neat shortcut:** with \`m == n - 1\` guaranteed, "no cycle" already implies "connected" — a
forest with \`n\` vertices and \`n - 1\` edges has exactly one component. We still check the
component count because it makes the code self-evident and costs nothing.

## Dry Run

\`n = 5\`, \`m = 4\`, so \`m == n - 1\` ✔ — the edge count check passes.

Union-Find starts with 5 singleton sets:

| Step | Edge | \`find(u)\` | \`find(v)\` | \`union\` | Components after | Verdict |
|---:|---|---:|---:|---|---:|---|
| 0 | — | — | — | — | 5 | start |
| 1 | \`0 — 1\` | 0 | 1 | ✔ merged | 4 | keep going |
| 2 | \`0 — 2\` | 0 | 2 | ✔ merged | 3 | keep going |
| 3 | \`1 — 2\` | 0 | 0 | ✘ already in the same set | 3 | **cycle → false** |

The third edge closes the triangle \`0 — 1 — 2 — 0\`, so the answer is **\`false\`**.

### A valid tree

\`\`\`
4 3
0 1
1 2
2 3
\`\`\`

| Step | Edge | \`find(u)\` | \`find(v)\` | \`union\` | Components after |
|---:|---|---:|---:|---|---:|
| 1 | \`0 — 1\` | 0 | 1 | ✔ | 3 |
| 2 | \`1 — 2\` | 0 | 2 | ✔ | 2 |
| 3 | \`2 — 3\` | 0 | 3 | ✔ | 1 |

One component left → **\`true\`**.

## Java Solution

See [\`GraphValidTree.java\`](./GraphValidTree.java).

\`\`\`java
public static boolean isValidTree(int n, int[][] edges) {
    if (edges.length != n - 1) {
        return false;
    }
    UnionFind uf = new UnionFind(n);
    for (int[] edge : edges) {
        if (!uf.union(edge[0], edge[1])) {
            return false; // this edge closes a cycle
        }
    }
    return uf.components() == 1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m · α(n)) | One union per edge; \`α\` is the inverse Ackermann function, effectively constant |
| **Space** | O(n) | The parent and rank arrays |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the graph is directed?"* → a directed tree has all in-degrees ≤ 1 and exactly one
  vertex with in-degree 0; check that plus connectivity.
- *"Can you count the number of valid trees?"* → Cayley's formula: \`n^(n-2)\` labelled trees.
- *"What if edges arrive one at a time and you must answer 'is it still a tree?' after each?"* →
  keep the Union-Find and the edge counter; a forest stays a forest only while no edge closes a
  cycle.
- *"How would you check a tree in O(n + m) with DFS instead?"* → count the edges seen per vertex
  and check that every vertex reaches the root.

**Common mistakes:**
- ❌ Only checking \`m == n - 1\` → a triangle plus an isolated pair also has 4 edges on 5
  vertices but is not a tree.
- ❌ Only checking connectivity → a triangle plus a pendant vertex is connected but has a cycle.
- ❌ Forgetting the single-vertex tree: \`n = 1, m = 0\` **is** a tree.

**How to narrate:**
> "A tree has exactly n-1 edges, so I check that first. Then I add the edges to a union-find: if
> an edge joins two vertices that are already connected it closes a cycle and the graph is not a
> tree. If all edges are accepted and only one component remains, it's a tree."

## Related Problems

- [Number of Connected Components](./NumberOfConnectedComponents.java) — the same Union-Find
- [Number of Provinces](./NumberOfProvinces.java) — components in an adjacency matrix
- [Keys and Rooms](./KeysAndRooms.java) — reachability from a starting vertex
- [Bipartite Check](./BipartiteCheck.java) — another undirected-graph property
`,i=[`isValidTree`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};