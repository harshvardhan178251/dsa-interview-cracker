var e=`graphs.NumberOfConnectedComponents`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

/**
 * Problem: Number of Connected Components in an Undirected Graph
 * LeetCode: 547 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Union-Find, connected components
 *
 * <p>Problem: Given an undirected graph, return the number of connected components — the number
 * of maximal groups of vertices where every pair is connected by some path.
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
 * 5 3
 * 0 1
 * 1 2
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: start with {@code n} singleton sets and merge the two endpoints of every edge.
 * The number of sets left at the end is the number of connected components. A {@link UnionFind}
 * with union by rank and path compression makes every merge effectively constant time.
 *
 * <p>Complexity: Time O(n + m * alpha(n)), Space O(n).
 */
public class NumberOfConnectedComponents {

    /**
     * Counts the connected components of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the number of connected components
     */
    public static int countComponents(int n, int[][] edges) {
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        return uf.components();
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

        System.out.println(countComponents(n, edges));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Number of Connected Components in an Undirected Graph
 * LeetCode: 547 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Union-Find, connected components
 *
 * <p>Problem: Given an undirected graph, return the number of connected components — the number
 * of maximal groups of vertices where every pair is connected by some path.
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
 * 5 3
 * 0 1
 * 1 2
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: start with {@code n} singleton sets and merge the two endpoints of every edge.
 * The number of sets left at the end is the number of connected components. A {@link UnionFind}
 * with union by rank and path compression makes every merge effectively constant time.
 *
 * <p>Complexity: Time O(n + m * alpha(n)), Space O(n).
 */
public class Main {

    /**
     * Counts the connected components of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the number of connected components
     */
    public static int countComponents(int n, int[][] edges) {
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        return uf.components();
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

        System.out.println(countComponents(n, edges));
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
# Number of Connected Components in an Undirected Graph — LeetCode 547

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Union-Find · Connected components |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given an undirected graph, return the number of **connected components** — the number of maximal
groups of vertices in which every pair of vertices is joined by some path.

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
5 3
0 1
1 2
3 4
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

Two components: \`{0, 1, 2}\` and \`{3, 4}\`.

## Approach — Union-Find

Start with \`n\` singleton sets — every vertex is its own component — and **merge** the two
endpoints of every edge. The number of sets that survive is the answer.

The {@link com.dsa.utils.UnionFind} helper does this with union by rank and path compression, so
each merge costs \`O(α(n))\`, effectively constant. It keeps a \`components\` counter that starts at
\`n\` and is decremented on every successful merge, so the answer is available in O(1) at the end.

**Alternative: DFS/BFS.** Start a traversal from every not-yet-visited vertex and count how many
traversals you need. Same complexity, more code. Union-Find is the better tool when the edges
arrive as a stream, because it does not need an adjacency list at all.

## Dry Run

\`n = 5\` → the Union-Find starts with 5 components.

| Step | Edge | \`find(u)\` | \`find(v)\` | \`union\` | Components after |
|---:|---|---:|---:|---|---:|
| 0 | — | — | — | — | 5 |
| 1 | \`0 — 1\` | 0 | 1 | ✔ merged | 4 |
| 2 | \`1 — 2\` | 0 | 2 | ✔ merged | 3 |
| 3 | \`3 — 4\` | 3 | 4 | ✔ merged | **2** |

**Answer: 2 components** — \`{0, 1, 2}\` and \`{3, 4}\`.

### A graph where nothing is connected

\`\`\`
4 0
\`\`\`

No edges → the Union-Find still holds 4 singleton sets → the answer is **\`4\`**.

## Java Solution

See [\`NumberOfConnectedComponents.java\`](./NumberOfConnectedComponents.java).

\`\`\`java
public static int countComponents(int n, int[][] edges) {
    UnionFind uf = new UnionFind(n);
    for (int[] edge : edges) {
        uf.union(edge[0], edge[1]);
    }
    return uf.components();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m · α(n)) | Initialising \`n\` sets, then one union per edge |
| **Space** | O(n) | Parent and rank arrays — no adjacency list is needed |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the graph is directed?"* → the components become **strongly** connected components,
  which need Tarjan or Kosaraju, see
  [Tarjan](../advancedgraphs/TarjanStronglyConnectedComponents.java).
- *"How would you list the vertices of each component?"* → keep a \`parent → members\` map and
  merge the lists, or run a DFS from each unvisited vertex.
- *"What if the same edge appears twice?"* → Union-Find handles it: the second union simply
  fails and the component count does not change.
- *"How do you detect a cycle while counting components?"* → count the successful unions; if
  there are more than \`n - components\` of them, a cycle exists.

**Common mistakes:**
- ❌ Forgetting that an isolated vertex is a component of its own → the answer is off by one.
- ❌ Counting **vertices minus successful unions** instead of using the counter → same number,
  but easy to get wrong when the graph has self-loops.
- ❌ Treating the edges as directed → the component count changes.

**How to narrate:**
> "Connected components in an undirected graph is exactly what union-find is for. I start with n
> singleton sets and union the endpoints of every edge; each successful union removes one
> component. The helper keeps the count, so the answer is just uf.components() at the end. I
> don't even need to build an adjacency list."

## Related Problems

- [Number of Provinces](./NumberOfProvinces.java) — the same count, but the graph comes as a matrix
- [Graph Valid Tree](./GraphValidTree.java) — "is there exactly one component and no cycle?"
- [Keys and Rooms](./KeysAndRooms.java) — reachability from a single starting vertex
- [Kruskal's Minimum Spanning Tree](../advancedgraphs/KruskalMinimumSpanningTree.java)
`,i=[`countComponents`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};