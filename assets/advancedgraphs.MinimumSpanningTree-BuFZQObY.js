var e=`advancedgraphs.MinimumSpanningTree`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Minimum Spanning Tree
 * LeetCode: 1584 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Minimum spanning tree, Union-Find, cut property
 *
 * <p>Problem: Given an undirected, weighted graph, build a minimum spanning tree and report
 * both its total weight and the edges it contains. This is the same MST problem as
 * <a href="https://leetcode.com/problems/min-cost-to-connect-all-points/">LeetCode 1584</a>
 * ("Min Cost to Connect All Points"), where the graph is implicit: the points form a complete
 * graph whose edge weights are Manhattan distances. Here the edges are given explicitly, which
 * is the general form of the problem.
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
 * 1 3 1
 * 0 2 2
 * 0 1 3
 * </pre>
 *
 * <p>Output: the total weight on the first line, then every MST edge as {@code u v w}, sorted
 * by weight (ties broken by {@code u} then {@code v}).
 *
 * <p>Approach: Kruskal's algorithm. Sort the edges by weight and keep an edge only when it
 * joins two different components, which a {@link UnionFind} answers in O(alpha(n)).
 *
 * <p>Complexity: Time O(m log m), Space O(n + m).
 */
public class MinimumSpanningTree {

    /**
     * Builds a minimum spanning tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected weighted edges {@code {u, v, weight}}
     * @return {@code {totalWeight, u1, v1, w1, ...}} with one triple per tree edge, or an
     *         empty array when the graph is disconnected
     */
    public static int[] minimumSpanningTree(int n, int[][] edges) {
        if (n <= 1) {
            return new int[]{0};
        }
        int[][] sorted = edges.clone();
        Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2])
                .thenComparingInt(e -> e[0])
                .thenComparingInt(e -> e[1]));

        UnionFind uf = new UnionFind(n);
        List<int[]> tree = new ArrayList<>();
        int total = 0;
        for (int[] edge : sorted) {
            if (uf.union(edge[0], edge[1])) {
                tree.add(edge);
                total += edge[2];
                if (tree.size() == n - 1) {
                    break;
                }
            }
        }
        if (tree.size() != n - 1) {
            return new int[0]; // disconnected: no spanning tree exists
        }

        int[] result = new int[1 + 3 * tree.size()];
        result[0] = total;
        for (int i = 0; i < tree.size(); i++) {
            result[1 + 3 * i] = tree.get(i)[0];
            result[2 + 3 * i] = tree.get(i)[1];
            result[3 + 3 * i] = tree.get(i)[2];
        }
        return result;
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

        int[] mst = minimumSpanningTree(n, edges);
        if (mst.length == 0) {
            System.out.println(-1);
            return;
        }
        System.out.println(mst[0]);
        for (int i = 1; i < mst.length; i += 3) {
            System.out.println(mst[i] + " " + mst[i + 1] + " " + mst[i + 2]);
        }
    }
}
`,n=`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Minimum Spanning Tree
 * LeetCode: 1584 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Minimum spanning tree, Union-Find, cut property
 *
 * <p>Problem: Given an undirected, weighted graph, build a minimum spanning tree and report
 * both its total weight and the edges it contains. This is the same MST problem as
 * <a href="https://leetcode.com/problems/min-cost-to-connect-all-points/">LeetCode 1584</a>
 * ("Min Cost to Connect All Points"), where the graph is implicit: the points form a complete
 * graph whose edge weights are Manhattan distances. Here the edges are given explicitly, which
 * is the general form of the problem.
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
 * 1 3 1
 * 0 2 2
 * 0 1 3
 * </pre>
 *
 * <p>Output: the total weight on the first line, then every MST edge as {@code u v w}, sorted
 * by weight (ties broken by {@code u} then {@code v}).
 *
 * <p>Approach: Kruskal's algorithm. Sort the edges by weight and keep an edge only when it
 * joins two different components, which a {@link UnionFind} answers in O(alpha(n)).
 *
 * <p>Complexity: Time O(m log m), Space O(n + m).
 */
public class Main {

    /**
     * Builds a minimum spanning tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected weighted edges {@code {u, v, weight}}
     * @return {@code {totalWeight, u1, v1, w1, ...}} with one triple per tree edge, or an
     *         empty array when the graph is disconnected
     */
    public static int[] minimumSpanningTree(int n, int[][] edges) {
        if (n <= 1) {
            return new int[]{0};
        }
        int[][] sorted = edges.clone();
        Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2])
                .thenComparingInt(e -> e[0])
                .thenComparingInt(e -> e[1]));

        UnionFind uf = new UnionFind(n);
        List<int[]> tree = new ArrayList<>();
        int total = 0;
        for (int[] edge : sorted) {
            if (uf.union(edge[0], edge[1])) {
                tree.add(edge);
                total += edge[2];
                if (tree.size() == n - 1) {
                    break;
                }
            }
        }
        if (tree.size() != n - 1) {
            return new int[0]; // disconnected: no spanning tree exists
        }

        int[] result = new int[1 + 3 * tree.size()];
        result[0] = total;
        for (int i = 0; i < tree.size(); i++) {
            result[1 + 3 * i] = tree.get(i)[0];
            result[2 + 3 * i] = tree.get(i)[1];
            result[3 + 3 * i] = tree.get(i)[2];
        }
        return result;
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

        int[] mst = minimumSpanningTree(n, edges);
        if (mst.length == 0) {
            System.out.println(-1);
            return;
        }
        System.out.println(mst[0]);
        for (int i = 1; i < mst.length; i += 3) {
            System.out.println(mst[i] + " " + mst[i + 1] + " " + mst[i + 2]);
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
# Minimum Spanning Tree — LeetCode 1584

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Minimum spanning tree · Union-Find |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Build a **minimum spanning tree** of an undirected, weighted graph and report both its total
weight and the edges it contains.

> **LeetCode 1584** is *"Min Cost to Connect All Points"*: the graph there is **implicit** — the
> points form a complete graph whose edge weights are Manhattan distances. This file is the
> **general** form of the very same problem, with the edges given explicitly. To solve the
> LeetCode version, build all \`O(n²)\` edges with Manhattan weights and feed them to this
> algorithm — for \`n ≤ 1000\` a dense Prim is the faster choice.

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
1 3 1
0 2 2
0 1 3
\`\`\`

Line 1 is the total weight of the MST. Every following line is one tree edge as \`u v w\`,
sorted by weight (ties broken by \`u\` then \`v\`).

## Approach — Kruskal, keeping the accepted edges

This is [Kruskal's MST](./KruskalMinimumSpanningTree.java)
with one difference: instead of only accumulating the weight, we also **remember** which edges
were accepted.

1. Sort the edges by weight (\`w\`, then \`u\`, then \`v\` so the output is deterministic).
2. Walk them in order; accept an edge when {@link com.dsa.utils.UnionFind} says its endpoints
   are in different components.
3. Stop after \`n - 1\` accepted edges.
4. Print the total weight, then the accepted edges in the sorted order they were accepted.

The tie-break matters: without it, two edges of the same weight could be accepted in either
order and the output would not be reproducible.

## Dry Run

Sorted edges: \`1—3 (1)\`, \`0—2 (2)\`, \`0—1 (3)\`, \`1—2 (4)\`, \`2—3 (5)\`

| Step | Edge | \`find(u)\` | \`find(v)\` | \`union\` | Tree edges so far | Total | Components |
|---:|---|---:|---:|---|---|---:|---:|
| 0 | — | — | — | — | \`[]\` | 0 | 4 |
| 1 | \`1—3 (1)\` | 1 | 3 | ✔ | \`[(1,3,1)]\` | 1 | 3 |
| 2 | \`0—2 (2)\` | 0 | 2 | ✔ | \`[(1,3,1), (0,2,2)]\` | 3 | 2 |
| 3 | \`0—1 (3)\` | 0 | 1 | ✔ (sets \`{0,2}\` and \`{1,3}\`) | \`[(1,3,1), (0,2,2), (0,1,3)]\` | 6 | 1 |
| 4 | — | — | — | — | 3 edges = \`n-1\` → stop | **6** | 1 |

Output:

\`\`\`
6
1 3 1
0 2 2
0 1 3
\`\`\`

## Java Solution

See [\`MinimumSpanningTree.java\`](./MinimumSpanningTree.java).

\`\`\`java
public static int[] minimumSpanningTree(int n, int[][] edges) {
    int[][] sorted = edges.clone();
    Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2])
            .thenComparingInt(e -> e[0])
            .thenComparingInt(e -> e[1]));
    UnionFind uf = new UnionFind(n);
    List<int[]> tree = new ArrayList<>();
    int total = 0;
    for (int[] edge : sorted) {
        if (uf.union(edge[0], edge[1])) {
            tree.add(edge);
            total += edge[2];
            if (tree.size() == n - 1) {
                break;
            }
        }
    }
    // ... pack {total, u1, v1, w1, ...} into an int[] ...
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log m) | The sort dominates |
| **Space** | O(n + m) | Union-Find, the sorted copy of the edges and the tree edges |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How is this different from LeetCode 1584?"* → there the graph is a complete graph on points
  with Manhattan distances, so you must materialise \`O(n²)\` edges; here they are given.
- *"Can you avoid sorting?"* → yes, use Prim's algorithm, O(m log n) with a heap.
- *"What if there are negative weights?"* → no problem, an MST is still well defined.
- *"What if the graph is disconnected?"* → no spanning tree exists; the program prints \`-1\`.
- *"Can the MST be unique?"* → no; when several edges have the same weight there can be
  several MSTs with the same total weight but different edge sets.

**Common mistakes:**
- ❌ Not breaking out of the loop after \`n - 1\` edges → extra edges are examined (harmless) but
  the total is only correct if you stop adding.
- ❌ Forgetting the tie-break in the sort → the output order of equal-weight edges is
  non-deterministic.
- ❌ Returning only the weight when the problem asks for the tree → here the edges are part of
  the answer.

**How to narrate:**
> "This is Kruskal. I sort the edges by weight — with a deterministic tie-break so the output
> is reproducible — and then walk them in order, accepting an edge only when union-find says its
> endpoints are in different components. I keep the accepted edges so I can print the tree, not
> just its weight, and I stop after n-1 edges."

## Related Problems

- [Kruskal's Minimum Spanning Tree](./KruskalMinimumSpanningTree.java) —
  the same algorithm, weight only
- [Prim's Minimum Spanning Tree](./PrimMinimumSpanningTree.java)
- [Graph Valid Tree](../graphs/GraphValidTree.java) — "is the graph already a tree?"
- [Bridges in a Graph](./BridgesInGraph.java)
`,i=[`minimumSpanningTree`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};