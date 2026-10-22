var e=`graphs.TopologicalSort`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Topological Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm
 *
 * <p>Problem: Given a directed graph, produce a linear ordering of its vertices such that every
 * edge {@code u -> v} places {@code u} before {@code v}. Such an ordering exists exactly when the
 * graph is acyclic.
 *
 * <p>Input format (stdin) — a directed graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * u2 v2
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6 6
 * 5 2
 * 5 0
 * 4 0
 * 4 1
 * 2 3
 * 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 5 0 2 3 1
 * </pre>
 *
 * <p>Approach: Kahn's algorithm with a min-heap of "ready" (in-degree 0) vertices, so the
 * smallest available vertex is always emitted first and the output is deterministic.
 *
 * <p>Complexity: Time O(m + n log n), Space O(n + m).
 */
public class TopologicalSort {

    /**
     * Computes a topological ordering of a directed graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return the ordering, or an empty array when the graph contains a cycle
     */
    public static int[] topologicalOrder(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }

        PriorityQueue<Integer> ready = new PriorityQueue<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                ready.add(v);
            }
        }

        int[] order = new int[n];
        int emitted = 0;
        while (!ready.isEmpty()) {
            int u = ready.poll();
            order[emitted++] = u;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    ready.add(v);
                }
            }
        }
        return emitted == n ? order : new int[0];
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

        int[] order = topologicalOrder(n, edges);
        if (order.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < order.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(order[i]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Topological Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm
 *
 * <p>Problem: Given a directed graph, produce a linear ordering of its vertices such that every
 * edge {@code u -> v} places {@code u} before {@code v}. Such an ordering exists exactly when the
 * graph is acyclic.
 *
 * <p>Input format (stdin) — a directed graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * u2 v2
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6 6
 * 5 2
 * 5 0
 * 4 0
 * 4 1
 * 2 3
 * 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 5 0 2 3 1
 * </pre>
 *
 * <p>Approach: Kahn's algorithm with a min-heap of "ready" (in-degree 0) vertices, so the
 * smallest available vertex is always emitted first and the output is deterministic.
 *
 * <p>Complexity: Time O(m + n log n), Space O(n + m).
 */
public class Main {

    /**
     * Computes a topological ordering of a directed graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return the ordering, or an empty array when the graph contains a cycle
     */
    public static int[] topologicalOrder(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }

        PriorityQueue<Integer> ready = new PriorityQueue<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                ready.add(v);
            }
        }

        int[] order = new int[n];
        int emitted = 0;
        while (!ready.isEmpty()) {
            int u = ready.poll();
            order[emitted++] = u;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    ready.add(v);
                }
            }
        }
        return emitted == n ? order : new int[0];
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

        int[] order = topologicalOrder(n, edges);
        if (order.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < order.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(order[i]);
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
`,r='\n# Topological Sort\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Topological sort · Kahn\'s algorithm |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |\n\n## Problem Statement\n\nGiven a **directed** graph, produce a linear ordering of its vertices such that every edge\n`u → v` places `u` **before** `v`.\n\nSuch an ordering exists **if and only if** the graph has no cycle. If the graph contains a cycle\nthe program prints `-1`.\n\n## Input Format\n\nThe program reads a directed graph given as an **edge list**:\n\n```\nn m\nu1 v1\nu2 v2\n...\num vm\n```\n\n- `n` — number of vertices, numbered `0 … n-1`\n- `m` — number of directed edges\n- `m` lines, each with two integers `u v` in `0 … n-1`: the edge `u → v`\n\n## Sample Input\n\n```\n6 6\n5 2\n5 0\n4 0\n4 1\n2 3\n3 1\n```\n\n## Expected Output\n\n```\n4 5 0 2 3 1\n```\n\nCheck: `5` before `2` ✔, `5` before `0` ✔, `4` before `0` ✔, `4` before `1` ✔, `2` before `3` ✔,\n`3` before `1` ✔.\n\n## Approach — Kahn\'s algorithm with a min-heap\n\n1. Compute the **in-degree** of every vertex.\n2. Put every vertex with in-degree `0` into a `PriorityQueue` (a min-heap).\n3. Repeatedly pop the **smallest** available vertex, emit it, and decrement the in-degree of its\n   neighbours. A neighbour whose in-degree reaches `0` joins the heap.\n4. If fewer than `n` vertices were emitted, a cycle blocked the rest → print `-1`.\n\n**Why a min-heap?** A FIFO queue produces *a* valid order, but which one depends on the order the\nedges were read. The min-heap makes the output deterministic and yields the lexicographically\nsmallest valid ordering — a much nicer property to demonstrate in an interview.\n\n**The DFS alternative.** A second classic formulation colours vertices white/grey/black and\nemits a vertex when it turns black; finding an edge into a **grey** vertex proves a cycle. Kahn\'s\nalgorithm is usually preferred because it needs no recursion and produces the order directly.\n\n## Dry Run\n\nEdges: `5→2`, `5→0`, `4→0`, `4→1`, `2→3`, `3→1`\n\nIn-degrees: `[2, 2, 1, 1, 0, 0]` → ready set `{4, 5}`\n\n| Step | Pop | `order` so far | Edges relaxed | In-degree after | Ready (min-heap) |\n|---:|---|---|---|---|---|\n| 0 | — | `[]` | — | `[2, 2, 1, 1, 0, 0]` | `[4, 5]` |\n| 1 | `4` | `[4]` | `4→0`: 2→1 · `4→1`: 2→1 | `[2, 1, 1, 1, 0, 0]` | `[5]` |\n| 2 | `5` | `[4, 5]` | `5→2`: 1→0 → unlock `2` · `5→0`: 1→0 → unlock `0` | `[1, 1, 0, 1, 0, 0]` | `[0, 2]` |\n| 3 | `0` | `[4, 5, 0]` | `0` has no outgoing edges | `[1, 1, 0, 1, 0, 0]` | `[2]` |\n| 4 | `2` | `[4, 5, 0, 2]` | `2→3`: 1→0 → unlock `3` | `[1, 1, 0, 0, 0, 0]` | `[3]` |\n| 5 | `3` | `[4, 5, 0, 2, 3]` | `3→1`: 1→0 → unlock `1` | `[1, 0, 0, 0, 0, 0]` | `[1]` |\n| 6 | `1` | `[4, 5, 0, 2, 3, 1]` | `1` has no outgoing edges | `[1, 0, 0, 0, 0, 0]` | `[]` |\n\nAll 6 vertices emitted → the ordering is **`4 5 0 2 3 1`**.\n\n## Java Solution\n\nSee [`TopologicalSort.java`](./TopologicalSort.java).\n\n```java\npublic static int[] topologicalOrder(int n, int[][] edges) {\n    // ... build adjacency list + in-degrees ...\n    PriorityQueue<Integer> ready = new PriorityQueue<>();\n    for (int v = 0; v < n; v++) {\n        if (inDegree[v] == 0) {\n            ready.add(v);\n        }\n    }\n    int[] order = new int[n];\n    int emitted = 0;\n    while (!ready.isEmpty()) {\n        int u = ready.poll();\n        order[emitted++] = u;\n        for (int v : adj.get(u)) {\n            if (--inDegree[v] == 0) {\n                ready.add(v);\n            }\n        }\n    }\n    return emitted == n ? order : new int[0];\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(m + n log n) | Each edge is relaxed once; each vertex enters and leaves the heap once |\n| **Space** | O(n + m) | Adjacency list, in-degrees, heap, result |\n\n**With a FIFO queue instead of a heap:** O(n + m) time — the same asymptotics, but the order is\nno longer deterministic.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you do it with DFS instead?"* → yes, use the white/grey/black colouring and push a vertex\n  onto the answer when it turns black; a back edge to a grey vertex means a cycle.\n- *"How do you find the longest path in a DAG?"* → topological order + DP: relax every edge in\n  the topological order and keep `longest[v] = max(longest[u] + w)`.\n- *"What if the graph is undirected?"* → a topological order exists only for graphs with at most\n  one edge; otherwise you have to detect a cycle, see [Graph Valid Tree](./GraphValidTree.java).\n- *"Can you produce several different valid orders?"* → yes: use a FIFO queue, or swap the heap\n  for a random priority queue and repeat.\n\n**Common mistakes:**\n- ❌ Emitting a vertex **before** all of its predecessors are done → the order is invalid.\n- ❌ Returning a partial order without checking the emitted count → the caller cannot detect the\n  cycle.\n- ❌ Using a `HashSet` for the ready set → non-deterministic output.\n\n**How to narrate:**\n> "Topological sort is Kahn\'s algorithm: I keep the in-degree of every vertex, seed a min-heap\n> with the vertices that have no incoming edges, and repeatedly emit the smallest available\n> vertex while unlocking its neighbours. The min-heap makes the output deterministic. If I emit\n> fewer than n vertices, the graph has a cycle and I return -1."\n\n## Related Problems\n\n- [Course Schedule](./CourseSchedule.java) — the boolean version\n- [Course Schedule II](./CourseScheduleII.java) — the same algorithm with a min-heap\n- [Alien Dictionary](./AlienDictionary.java) — precedence relations between words\n- [Reconstruct Itinerary](./ReconstructItinerary.java) — Hierholzer\'s algorithm\n',i=[`topologicalOrder`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};