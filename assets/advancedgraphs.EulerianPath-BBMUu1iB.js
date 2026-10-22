var e=`advancedgraphs.EulerianPath`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Eulerian Path
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Eulerian path, Hierholzer's algorithm, degree conditions
 *
 * <p>Problem: Given a directed graph, find a walk that uses every edge exactly once and prints
 * the visited vertices. Such a walk exists when
 * <ul>
 *   <li>all vertices with an edge are in one connected component (ignoring directions), and</li>
 *   <li>either every vertex has in-degree equal to out-degree (an Eulerian <em>circuit</em>),
 *       or exactly one vertex has out-degree = in-degree + 1 (the start), exactly one has
 *       in-degree = out-degree + 1 (the end) and the rest are balanced.</li>
 * </ul>
 * Return {@code -1} when no such walk exists.
 *
 * <p>Input format (stdin) — a directed graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 3
 * 0 1
 * 1 2
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 2 3
 * </pre>
 *
 * <p>Approach: check the degree conditions and the connectivity with a {@link UnionFind}, then
 * run Hierholzer's algorithm: walk greedily, but push the vertex onto a stack and only write it
 * to the answer when it has no outgoing edge left. Reversing that list gives the Eulerian path.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class EulerianPath {

    /**
     * Finds an Eulerian path.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return the vertex sequence of the Eulerian path, or an empty array when none exists
     */
    public static int[] eulerianPath(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        int[] outDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            outDegree[edge[0]]++;
            inDegree[edge[1]]++;
        }

        int start = -1;
        int end = -1;
        for (int v = 0; v < n; v++) {
            int diff = outDegree[v] - inDegree[v];
            if (diff == 1) {
                if (start != -1) {
                    return new int[0]; // more than one start: impossible
                }
                start = v;
            } else if (diff == -1) {
                if (end != -1) {
                    return new int[0]; // more than one end: impossible
                }
                end = v;
            } else if (diff != 0) {
                return new int[0]; // |diff| > 1: impossible
            }
        }
        if ((start == -1) != (end == -1)) {
            return new int[0]; // a path needs both a start and an end
        }
        if (start == -1) {
            // Eulerian circuit: start at the smallest vertex with an outgoing edge.
            for (int v = 0; v < n; v++) {
                if (outDegree[v] > 0) {
                    start = v;
                    break;
                }
            }
        }
        if (start == -1) {
            return new int[0]; // no edges at all
        }

        // All vertices that carry an edge have to be in the same (undirected) component.
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        int component = -1;
        for (int v = 0; v < n; v++) {
            if (outDegree[v] == 0 && inDegree[v] == 0) {
                continue;
            }
            int root = uf.find(v);
            if (component == -1) {
                component = root;
            } else if (component != root) {
                return new int[0]; // the graph is split
            }
        }

        // Hierholzer's algorithm.
        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> reversed = new ArrayList<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int v = stack.peek();
            if (adj.get(v).isEmpty()) {
                reversed.add(stack.pop());
            } else {
                stack.push(adj.get(v).remove(adj.get(v).size() - 1));
            }
        }
        Collections.reverse(reversed);

        if (reversed.size() != edges.length + 1) {
            return new int[0]; // some edges could not be used
        }
        int[] path = new int[reversed.size()];
        for (int i = 0; i < reversed.size(); i++) {
            path[i] = reversed.get(i);
        }
        return path;
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

        int[] path = eulerianPath(n, edges);
        if (path.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < path.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(path[i]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Eulerian Path
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Eulerian path, Hierholzer's algorithm, degree conditions
 *
 * <p>Problem: Given a directed graph, find a walk that uses every edge exactly once and prints
 * the visited vertices. Such a walk exists when
 * <ul>
 *   <li>all vertices with an edge are in one connected component (ignoring directions), and</li>
 *   <li>either every vertex has in-degree equal to out-degree (an Eulerian <em>circuit</em>),
 *       or exactly one vertex has out-degree = in-degree + 1 (the start), exactly one has
 *       in-degree = out-degree + 1 (the end) and the rest are balanced.</li>
 * </ul>
 * Return {@code -1} when no such walk exists.
 *
 * <p>Input format (stdin) — a directed graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 3
 * 0 1
 * 1 2
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 2 3
 * </pre>
 *
 * <p>Approach: check the degree conditions and the connectivity with a {@link UnionFind}, then
 * run Hierholzer's algorithm: walk greedily, but push the vertex onto a stack and only write it
 * to the answer when it has no outgoing edge left. Reversing that list gives the Eulerian path.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /**
     * Finds an Eulerian path.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return the vertex sequence of the Eulerian path, or an empty array when none exists
     */
    public static int[] eulerianPath(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        int[] outDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            outDegree[edge[0]]++;
            inDegree[edge[1]]++;
        }

        int start = -1;
        int end = -1;
        for (int v = 0; v < n; v++) {
            int diff = outDegree[v] - inDegree[v];
            if (diff == 1) {
                if (start != -1) {
                    return new int[0]; // more than one start: impossible
                }
                start = v;
            } else if (diff == -1) {
                if (end != -1) {
                    return new int[0]; // more than one end: impossible
                }
                end = v;
            } else if (diff != 0) {
                return new int[0]; // |diff| > 1: impossible
            }
        }
        if ((start == -1) != (end == -1)) {
            return new int[0]; // a path needs both a start and an end
        }
        if (start == -1) {
            // Eulerian circuit: start at the smallest vertex with an outgoing edge.
            for (int v = 0; v < n; v++) {
                if (outDegree[v] > 0) {
                    start = v;
                    break;
                }
            }
        }
        if (start == -1) {
            return new int[0]; // no edges at all
        }

        // All vertices that carry an edge have to be in the same (undirected) component.
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        int component = -1;
        for (int v = 0; v < n; v++) {
            if (outDegree[v] == 0 && inDegree[v] == 0) {
                continue;
            }
            int root = uf.find(v);
            if (component == -1) {
                component = root;
            } else if (component != root) {
                return new int[0]; // the graph is split
            }
        }

        // Hierholzer's algorithm.
        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> reversed = new ArrayList<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int v = stack.peek();
            if (adj.get(v).isEmpty()) {
                reversed.add(stack.pop());
            } else {
                stack.push(adj.get(v).remove(adj.get(v).size() - 1));
            }
        }
        Collections.reverse(reversed);

        if (reversed.size() != edges.length + 1) {
            return new int[0]; // some edges could not be used
        }
        int[] path = new int[reversed.size()];
        for (int i = 0; i < reversed.size(); i++) {
            path[i] = reversed.get(i);
        }
        return path;
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

        int[] path = eulerianPath(n, edges);
        if (path.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < path.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(path[i]);
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
# Eulerian Path

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Hierholzer's algorithm · Degree conditions |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a **directed** graph, find a walk that uses **every edge exactly once** and print the
vertices it visits. Such a walk is an **Eulerian path**.

Such a walk exists exactly when:

1. every vertex that carries an edge is in **one** connected component (ignoring the edge
   directions), and
2. the degrees are right:
   - **Eulerian circuit** — every vertex has \`in-degree == out-degree\`;
   - **Eulerian path** — exactly one vertex has \`out-degree = in-degree + 1\` (the start),
     exactly one has \`in-degree = out-degree + 1\` (the end), and all the rest are balanced.

Return \`-1\` when no such walk exists.

## Input Format

The program reads a directed graph given as an **edge list**:

\`\`\`
n m
u1 v1
u2 v2
...
um vm
\`\`\`

- \`n\` — number of vertices, numbered \`0 … n-1\`
- \`m\` — number of directed edges
- \`m\` lines, each with two integers \`u v\` in \`0 … n-1\`: the edge \`u → v\`

## Sample Input

\`\`\`
4 3
0 1
1 2
2 3
\`\`\`

## Expected Output

\`\`\`
0 1 2 3
\`\`\`

\`0 → 1 → 2 → 3\` uses all three edges exactly once.

## Approach — check the conditions, then Hierholzer

**Step 1 — the degree conditions.** Count in- and out-degrees. Exactly one vertex may have
\`out − in = 1\` (the start) and exactly one may have \`in − out = 1\` (the end); all others must be
balanced. If that fails, there is no Eulerian path.

**Step 2 — the connectivity condition.** Ignore the directions and check that all vertices that
carry an edge are in one component. A {@link com.dsa.utils.UnionFind} over the edges does it in
one pass.

**Step 3 — Hierholzer's algorithm.** Walk the graph, but do **not** print vertices as you reach
them:

- keep a **stack** of the current route;
- if the top vertex still has an outgoing edge, remove one and push its target;
- if the top vertex has **no** outgoing edge left, pop it into the answer;
- reverse the answer at the end.

The vertices are written when they become dead ends, and reversing puts them back in the right
order. Each edge is removed from the adjacency list exactly once, so the walk is linear.

**Why the naive greedy walk fails.** Taking any unused edge until you are stuck can leave unused
edges behind (it produces a *trail*, not necessarily an *Euler trail*). The stack version repairs
that by splicing the leftovers back in.

## Dry Run

Edges: \`0→1\`, \`1→2\`, \`2→3\`.

| Check | Value |
|---|---|
| out-degrees | \`[1, 1, 1, 0]\` |
| in-degrees | \`[0, 1, 1, 1]\` |
| \`out − in\` | \`[+1, 0, 0, −1]\` → start \`0\`, end \`3\` ✔ |
| connectivity | all of \`0, 1, 2, 3\` in one component ✔ |

Hierholzer's walk:

| Step | Stack (top → bottom) | Action | Answer (reversed) |
|---:|---|---|---|
| 0 | \`[0]\` | push the start | \`[]\` |
| 1 | \`[0, 1]\` | \`0\` has an edge → take \`0→1\`, push \`1\` | \`[]\` |
| 2 | \`[0, 1, 2]\` | \`1\` has an edge → take \`1→2\`, push \`2\` | \`[]\` |
| 3 | \`[0, 1, 2, 3]\` | \`2\` has an edge → take \`2→3\`, push \`3\` | \`[]\` |
| 4 | \`[0, 1, 2]\` | \`3\` has no outgoing edge → pop it into the answer | \`[3]\` |
| 5 | \`[0, 1]\` | \`2\` has no outgoing edge → pop it | \`[3, 2]\` |
| 6 | \`[0]\` | \`1\` has no outgoing edge → pop it | \`[3, 2, 1]\` |
| 7 | \`[]\` | \`0\` has no outgoing edge → pop it | \`[3, 2, 1, 0]\` |

Reversing gives **\`0 1 2 3\`** — 4 vertices for 3 edges, so every edge was used.

### A graph without an Eulerian path

\`\`\`
4 3
0 1
1 0
0 2
\`\`\`

\`out − in\` = \`[+2, 0, −1, 0]\` — vertex \`0\` has a difference of \`2\`, which no Eulerian path can
have → the answer is **\`-1\`**.

## Java Solution

See [\`EulerianPath.java\`](./EulerianPath.java).

\`\`\`java
public static int[] eulerianPath(int n, int[][] edges) {
    // ... in/out degrees, start/end detection, Union-Find connectivity check ...
    Deque<Integer> stack = new ArrayDeque<>();
    List<Integer> reversed = new ArrayList<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int v = stack.peek();
        if (adj.get(v).isEmpty()) {
            reversed.add(stack.pop());
        } else {
            stack.push(adj.get(v).remove(adj.get(v).size() - 1));
        }
    }
    Collections.reverse(reversed);
    // ... verify that every edge was used ...
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every edge is removed once from its adjacency list |
| **Space** | O(n + m) | Adjacency lists, the stack and the answer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What changes for an undirected graph?"* → the degree condition becomes "zero or two
  odd-degree vertices"; two odd vertices give a path, zero gives a circuit, more gives no
  solution. The Hierholzer walk is the same.
- *"How do I find all Eulerian paths?"* → for every valid start vertex, run Hierholzer and
  collect the results (be careful: there can be many).
- *"How do I find the Eulerian circuit of a graph where I must start at a given vertex?"* → that
  vertex must have out-degree = in-degree; then start the walk there.
- *"Is this the same as the Chinese postman problem?"* → no — the postman problem asks for a
  *shortest* closed walk that covers every edge, which allows repeating edges (it is solved with
  matching, not Hierholzer).

**Common mistakes:**
- ❌ Forgetting the connectivity check → a graph with two separate cycles passes the degree test
  but has no single Eulerian path.
- ❌ Printing the vertices while walking → the order is wrong; build the answer in reverse.
- ❌ Accepting a graph with two vertices of \`out − in = 1\` → there would be two starting points.

**How to narrate:**
> "An Eulerian path exists only if the degrees line up: either everything is balanced (a
> circuit) or exactly one vertex has one more outgoing edge and exactly one has one more
> incoming edge. I also check that all vertices with edges are in one component using union-find.
> Then I run Hierholzer's algorithm with a stack: I walk unused edges, but I only write a vertex
> into the answer when it has no outgoing edges left, and I reverse at the end."

## Related Problems

- [Reconstruct Itinerary](../graphs/ReconstructItinerary.java) — the
  flight flavour of the same algorithm
- [Bridges in a Graph](./BridgesInGraph.java)
- [Topological Sort](../graphs/TopologicalSort.java)
- [Course Schedule II](../graphs/CourseScheduleII.java)
`,i=[`eulerianPath`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};