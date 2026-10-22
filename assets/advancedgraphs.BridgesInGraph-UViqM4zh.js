var e=`advancedgraphs.BridgesInGraph`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Bridges in a Graph
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Low-link values, Tarjan's bridge finding, DFS
 *
 * <p>Problem: A bridge is an edge whose removal disconnects the graph. Find all bridges of an
 * undirected graph.
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
 * 1 3
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 1 3
 * 3 4
 * </pre>
 *
 * <p>Output: the number of bridges on the first line, then one bridge per line as
 * {@code u v} with {@code u < v}, sorted.
 *
 * <p>Approach: a single DFS that remembers for every vertex the earliest discovery time
 * reachable from its subtree ({@code low}). A DFS tree edge {@code (u, v)} is a bridge exactly
 * when {@code low[v] > tin[u]} — the subtree of {@code v} cannot escape without that edge.
 * Edges are tracked by id so that parallel edges are handled correctly.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class BridgesInGraph {

    /** Mutable DFS state. */
    private static final class Solver {
        final List<List<int[]>> adj; // {neighbour, edgeId}
        final int[] tin;
        final int[] low;
        final List<int[]> bridges = new ArrayList<>();
        int timer = 0;

        Solver(List<List<int[]>> adj) {
            this.adj = adj;
            this.tin = new int[adj.size()];
            this.low = new int[adj.size()];
            Arrays.fill(tin, -1);
            Arrays.fill(low, -1);
        }

        void visit(int u, int parentEdge) {
            tin[u] = low[u] = timer++;
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int id = edge[1];
                if (id == parentEdge) {
                    continue; // the edge we came in through
                }
                if (tin[v] != -1) {
                    low[u] = Math.min(low[u], tin[v]); // back edge
                } else {
                    visit(v, id);
                    low[u] = Math.min(low[u], low[v]);
                    if (low[v] > tin[u]) {
                        bridges.add(new int[]{Math.min(u, v), Math.max(u, v)});
                    }
                }
            }
        }
    }

    /**
     * Finds every bridge of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the bridges, each as {@code {min(u,v), max(u,v)}}, sorted
     */
    public static List<int[]> findBridges(int n, int[][] edges) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int id = 0; id < edges.length; id++) {
            int u = edges[id][0];
            int v = edges[id][1];
            adj.get(u).add(new int[]{v, id});
            adj.get(v).add(new int[]{u, id});
        }

        Solver solver = new Solver(adj);
        for (int v = 0; v < n; v++) {
            if (solver.tin[v] == -1) {
                solver.visit(v, -1);
            }
        }

        solver.bridges.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0])
                : Integer.compare(a[1], b[1]));
        return solver.bridges;
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

        List<int[]> bridges = findBridges(n, edges);
        System.out.println(bridges.size());
        for (int[] bridge : bridges) {
            System.out.println(bridge[0] + " " + bridge[1]);
        }
    }
}
`,n=`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Bridges in a Graph
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Low-link values, Tarjan's bridge finding, DFS
 *
 * <p>Problem: A bridge is an edge whose removal disconnects the graph. Find all bridges of an
 * undirected graph.
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
 * 1 3
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 1 3
 * 3 4
 * </pre>
 *
 * <p>Output: the number of bridges on the first line, then one bridge per line as
 * {@code u v} with {@code u < v}, sorted.
 *
 * <p>Approach: a single DFS that remembers for every vertex the earliest discovery time
 * reachable from its subtree ({@code low}). A DFS tree edge {@code (u, v)} is a bridge exactly
 * when {@code low[v] > tin[u]} — the subtree of {@code v} cannot escape without that edge.
 * Edges are tracked by id so that parallel edges are handled correctly.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /** Mutable DFS state. */
    private static final class Solver {
        final List<List<int[]>> adj; // {neighbour, edgeId}
        final int[] tin;
        final int[] low;
        final List<int[]> bridges = new ArrayList<>();
        int timer = 0;

        Solver(List<List<int[]>> adj) {
            this.adj = adj;
            this.tin = new int[adj.size()];
            this.low = new int[adj.size()];
            Arrays.fill(tin, -1);
            Arrays.fill(low, -1);
        }

        void visit(int u, int parentEdge) {
            tin[u] = low[u] = timer++;
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int id = edge[1];
                if (id == parentEdge) {
                    continue; // the edge we came in through
                }
                if (tin[v] != -1) {
                    low[u] = Math.min(low[u], tin[v]); // back edge
                } else {
                    visit(v, id);
                    low[u] = Math.min(low[u], low[v]);
                    if (low[v] > tin[u]) {
                        bridges.add(new int[]{Math.min(u, v), Math.max(u, v)});
                    }
                }
            }
        }
    }

    /**
     * Finds every bridge of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the bridges, each as {@code {min(u,v), max(u,v)}}, sorted
     */
    public static List<int[]> findBridges(int n, int[][] edges) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int id = 0; id < edges.length; id++) {
            int u = edges[id][0];
            int v = edges[id][1];
            adj.get(u).add(new int[]{v, id});
            adj.get(v).add(new int[]{u, id});
        }

        Solver solver = new Solver(adj);
        for (int v = 0; v < n; v++) {
            if (solver.tin[v] == -1) {
                solver.visit(v, -1);
            }
        }

        solver.bridges.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0])
                : Integer.compare(a[1], b[1]));
        return solver.bridges;
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

        List<int[]> bridges = findBridges(n, edges);
        System.out.println(bridges.size());
        for (int[] bridge : bridges) {
            System.out.println(bridge[0] + " " + bridge[1]);
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
`,r='\n# Bridges in a Graph\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Low-link values · DFS |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |\n\n## Problem Statement\n\nA **bridge** is an edge whose removal **disconnects** the graph. Find every bridge of an\nundirected graph.\n\nThe output is the number of bridges on the first line, then one bridge per line as `u v` with\n`u < v`, sorted.\n\n## Input Format\n\nThe program reads an **undirected** graph given as an **edge list**:\n\n```\nn m\nu1 v1\nu2 v2\n...\num vm\n```\n\n- `n` — number of vertices, numbered `0 … n-1`\n- `m` — number of undirected edges\n- `m` lines, each with two integers `u v` in `0 … n-1`: the undirected edge `u — v`\n\n## Sample Input\n\n```\n5 5\n0 1\n1 2\n2 0\n1 3\n3 4\n```\n\n## Expected Output\n\n```\n2\n1 3\n3 4\n```\n\nThe triangle `0 — 1 — 2 — 0` has no bridges (removing any of its edges keeps the triangle\nconnected). Removing `1 — 3` separates `{3, 4}` from the triangle, and removing `3 — 4`\nseparates `{4}` — both are bridges.\n\n## Approach — low-link values\n\nThe classic DFS bridge finder keeps two numbers per vertex:\n\n- `tin[u]` — the order in which `u` was discovered;\n- `low[u]` — the **smallest** `tin` reachable from `u`\'s DFS subtree by going down tree edges\n  and then using **at most one** back edge.\n\nWhile exploring the neighbours of `u`:\n\n- a neighbour `w` that is already visited and is **not** the parent → a back edge:\n  `low[u] = min(low[u], tin[w])`;\n- a neighbour `w` that is unvisited → recurse into it, then\n  `low[u] = min(low[u], low[w])`, and the tree edge `(u, w)` is a **bridge** exactly when\n  `low[w] > tin[u]`.\n\n**Why that is the bridge condition.** `low[w] > tin[u]` means the subtree of `w` cannot reach\nany ancestor of `u` (not even `u` itself) without using the edge `(u, w)`. Removing that edge\ntherefore cuts the subtree off — the edge is a bridge. If `low[w] ≤ tin[u]`, the subtree has\nanother way back up, so the edge is not a bridge.\n\n**Edge ids, not parent vertices.** The "skip the parent" rule must skip the **edge** we came in\nthrough, not every edge to the parent vertex. If the graph has parallel edges\n(`u — v` twice), only one of them is a bridge, and skipping by vertex would wrongly hide the\nother one. Each edge therefore gets an id and the adjacency list stores `{neighbour, edgeId}`.\n\n## Dry Run\n\nEdges (with ids): `e0: 0—1`, `e1: 1—2`, `e2: 2—0`, `e3: 1—3`, `e4: 3—4`.\n\nDFS starts at vertex `0` (the first unvisited vertex):\n\n| Step | Vertex | `tin` | `low` | Edge | Neighbour | Action | `low` after |\n|---:|---|---:|---:|---|---|---|---:|\n| 1 | `0` | 0 | 0 | `e0` | `1` | unvisited → recurse into `1` | 0 |\n| 2 | `1` | 1 | 1 | `e0` | `0` | parent edge → skip | 1 |\n| 3 | `1` | 1 | 1 | `e1` | `2` | unvisited → recurse into `2` | 1 |\n| 4 | `2` | 2 | 2 | `e1` | `1` | parent edge → skip | 2 |\n| 5 | `2` | 2 | 2 | `e2` | `0` | visited, back edge → `low[2] = min(2, tin[0]=0) = 0` | **0** |\n| 6 | `1` | 1 | 1 | — | — | back in `1`: `low[1] = min(1, low[2]=0) = 0`; check `low[2]=0 > tin[1]=1`? **No** → `1—2` is not a bridge | **0** |\n| 7 | `1` | 1 | 0 | `e3` | `3` | unvisited → recurse into `3` | 0 |\n| 8 | `3` | 3 | 3 | `e3` | `1` | parent edge → skip | 3 |\n| 9 | `3` | 3 | 3 | `e4` | `4` | unvisited → recurse into `4` | 3 |\n| 10 | `4` | 4 | 4 | `e4` | `3` | parent edge → skip; `low[4] = 4` | 4 |\n| 11 | `3` | 3 | 3 | — | — | back in `3`: `low[3] = min(3, low[4]=4) = 3`; check `low[4]=4 > tin[3]=3`? **Yes** → **`3—4` is a bridge** | 3 |\n| 12 | `1` | 1 | 0 | — | — | back in `1`: `low[1] = min(0, low[3]=3) = 0`; check `low[3]=3 > tin[1]=1`? **Yes** → **`1—3` is a bridge** | 0 |\n\nBridges: `(1, 3)` and `(3, 4)` → sorted → **`1 3`** and **`3 4`**.\n\n## Java Solution\n\nSee [`BridgesInGraph.java`](./BridgesInGraph.java).\n\n```java\nvoid visit(int u, int parentEdge) {\n    tin[u] = low[u] = timer++;\n    for (int[] edge : adj.get(u)) {\n        int v = edge[0];\n        int id = edge[1];\n        if (id == parentEdge) {\n            continue; // the edge we came in through\n        }\n        if (tin[v] != -1) {\n            low[u] = Math.min(low[u], tin[v]); // back edge\n        } else {\n            visit(v, id);\n            low[u] = Math.min(low[u], low[v]);\n            if (low[v] > tin[u]) {\n                bridges.add(new int[]{Math.min(u, v), Math.max(u, v)});\n            }\n        }\n    }\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n + m) | Every vertex is visited once, every edge twice (once per direction) |\n| **Space** | O(n + m) | Adjacency list, `tin`/`low` arrays, recursion stack |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What are articulation points, and how are they related?"* → the vertices whose removal\n  disconnects the graph; the same DFS finds them, see\n  [Articulation Points](./ArticulationPoints.java).\n- *"How do you handle parallel edges?"* → by edge id, as done here; skipping the parent *vertex*\n  would hide a genuine bridge.\n- *"What about self-loops?"* → never a bridge (removing them changes nothing).\n- *"Can you find the 2-edge-connected components?"* → remove all bridges; the remaining\n  components are the 2-edge-connected components (compute them with a second pass).\n- *"What if the graph is directed?"* → the notion of a bridge changes; you would look for\n  **strong bridges** instead, which is considerably harder.\n\n**Common mistakes:**\n- ❌ Skipping the parent by **vertex** instead of by edge id → parallel edges break the answer.\n- ❌ Using `>=` instead of `>` for the bridge test → you would also report edges that belong to a\n  cycle.\n- ❌ Forgetting to update `low[u]` with `low[w]` after the recursive call → the subtree\'s\n  information never reaches the parent.\n- ❌ Only starting the DFS from vertex `0` → a disconnected graph has unvisited components.\n\n**How to narrate:**\n> "A bridge is a DFS tree edge whose child\'s subtree cannot reach back above the parent. I\n> track tin and low during one DFS: low is the earliest discovery time reachable from the\n> subtree using tree edges and one back edge. After visiting a child w I check whether low[w]\n> is greater than tin[u] — if so, the subtree of w can only escape through that edge, so it is\n> a bridge. I track edges by id so parallel edges are handled correctly."\n\n## Related Problems\n\n- [Articulation Points in a Graph](./ArticulationPoints.java) —\n  the same DFS\n- [Tarjan\'s Strongly Connected Components](./TarjanStronglyConnectedComponents.java)\n- [Graph Valid Tree](../graphs/GraphValidTree.java)\n- [Minimum Spanning Tree](./MinimumSpanningTree.java)\n',i=[`findBridges`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};