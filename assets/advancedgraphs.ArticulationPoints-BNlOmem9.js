var e=`advancedgraphs.ArticulationPoints`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Articulation Points in a Graph
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Low-link values, DFS cut vertices
 *
 * <p>Problem: An articulation point (cut vertex) is a vertex whose removal increases the number
 * of connected components. Find all articulation points of an undirected graph.
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
 * 1
 * 3
 * </pre>
 *
 * <p>Output: the number of articulation points on the first line, then one vertex per line in
 * ascending order.
 *
 * <p>Approach: the same low-link DFS used for bridges. A non-root vertex {@code u} is an
 * articulation point when some DFS child {@code v} has {@code low[v] >= tin[u]} — the subtree of
 * {@code v} can then only be reached through {@code u}. A DFS root is an articulation point when
 * it has more than one DFS child. Edges are tracked by id so parallel edges are handled
 * correctly.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class ArticulationPoints {

    /** Mutable DFS state. */
    private static final class Solver {
        final List<List<int[]>> adj; // {neighbour, edgeId}
        final int[] tin;
        final int[] low;
        final boolean[] articulation;
        int timer = 0;

        Solver(List<List<int[]>> adj) {
            this.adj = adj;
            this.tin = new int[adj.size()];
            this.low = new int[adj.size()];
            this.articulation = new boolean[adj.size()];
            Arrays.fill(tin, -1);
            Arrays.fill(low, -1);
        }

        void visit(int u, int parentEdge) {
            tin[u] = low[u] = timer++;
            int children = 0;
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int id = edge[1];
                if (id == parentEdge) {
                    continue; // the edge we came in through
                }
                if (tin[v] != -1) {
                    low[u] = Math.min(low[u], tin[v]); // back edge
                } else {
                    children++;
                    visit(v, id);
                    low[u] = Math.min(low[u], low[v]);
                    if (parentEdge != -1 && low[v] >= tin[u]) {
                        articulation[u] = true;
                    }
                }
            }
            if (parentEdge == -1 && children > 1) {
                articulation[u] = true; // a root with several DFS subtrees
            }
        }
    }

    /**
     * Finds every articulation point of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the articulation points in ascending order
     */
    public static List<Integer> findArticulationPoints(int n, int[][] edges) {
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

        List<Integer> result = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            if (solver.articulation[v]) {
                result.add(v);
            }
        }
        return result;
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

        List<Integer> points = findArticulationPoints(n, edges);
        System.out.println(points.size());
        for (int v : points) {
            System.out.println(v);
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
 * Problem: Articulation Points in a Graph
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Low-link values, DFS cut vertices
 *
 * <p>Problem: An articulation point (cut vertex) is a vertex whose removal increases the number
 * of connected components. Find all articulation points of an undirected graph.
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
 * 1
 * 3
 * </pre>
 *
 * <p>Output: the number of articulation points on the first line, then one vertex per line in
 * ascending order.
 *
 * <p>Approach: the same low-link DFS used for bridges. A non-root vertex {@code u} is an
 * articulation point when some DFS child {@code v} has {@code low[v] >= tin[u]} — the subtree of
 * {@code v} can then only be reached through {@code u}. A DFS root is an articulation point when
 * it has more than one DFS child. Edges are tracked by id so parallel edges are handled
 * correctly.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /** Mutable DFS state. */
    private static final class Solver {
        final List<List<int[]>> adj; // {neighbour, edgeId}
        final int[] tin;
        final int[] low;
        final boolean[] articulation;
        int timer = 0;

        Solver(List<List<int[]>> adj) {
            this.adj = adj;
            this.tin = new int[adj.size()];
            this.low = new int[adj.size()];
            this.articulation = new boolean[adj.size()];
            Arrays.fill(tin, -1);
            Arrays.fill(low, -1);
        }

        void visit(int u, int parentEdge) {
            tin[u] = low[u] = timer++;
            int children = 0;
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int id = edge[1];
                if (id == parentEdge) {
                    continue; // the edge we came in through
                }
                if (tin[v] != -1) {
                    low[u] = Math.min(low[u], tin[v]); // back edge
                } else {
                    children++;
                    visit(v, id);
                    low[u] = Math.min(low[u], low[v]);
                    if (parentEdge != -1 && low[v] >= tin[u]) {
                        articulation[u] = true;
                    }
                }
            }
            if (parentEdge == -1 && children > 1) {
                articulation[u] = true; // a root with several DFS subtrees
            }
        }
    }

    /**
     * Finds every articulation point of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the articulation points in ascending order
     */
    public static List<Integer> findArticulationPoints(int n, int[][] edges) {
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

        List<Integer> result = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            if (solver.articulation[v]) {
                result.add(v);
            }
        }
        return result;
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

        List<Integer> points = findArticulationPoints(n, edges);
        System.out.println(points.size());
        for (int v : points) {
            System.out.println(v);
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
`,r='\n# Articulation Points in a Graph\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Low-link values · Cut vertices |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |\n\n## Problem Statement\n\nAn **articulation point** (also called a *cut vertex*) is a vertex whose removal **increases**\nthe number of connected components. Find every articulation point of an undirected graph.\n\nThe output is the number of articulation points on the first line, then one vertex per line in\nascending order.\n\n## Input Format\n\nThe program reads an **undirected** graph given as an **edge list**:\n\n```\nn m\nu1 v1\nu2 v2\n...\num vm\n```\n\n- `n` — number of vertices, numbered `0 … n-1`\n- `m` — number of undirected edges\n- `m` lines, each with two integers `u v` in `0 … n-1`: the undirected edge `u — v`\n\n## Sample Input\n\n```\n5 5\n0 1\n1 2\n2 0\n1 3\n3 4\n```\n\n## Expected Output\n\n```\n2\n1\n3\n```\n\nRemoving vertex `1` splits the graph into `{0, 2}` and `{3, 4}`; removing vertex `3` splits off\n`{4}`. Removing `0`, `2` or `4` leaves the graph connected.\n\n## Approach — the same low-link DFS as bridges\n\nThe DFS keeps `tin[u]` (discovery order) and `low[u]` (the earliest discovery time reachable\nfrom `u`\'s subtree via tree edges and at most one back edge). Two rules turn that into the\nanswer:\n\n**Non-root vertex `u`.** `u` is an articulation point if it has a DFS child `w` with\n`low[w] >= tin[u]`. The subtree of `w` can then only reach the rest of the graph through `u`, so\nremoving `u` cuts it off.\n\n> Note the `>=` here, against `>` for bridges. `low[w] == tin[u]` means the subtree can only get\n> back to `u` itself — removing `u` still disconnects it. For a bridge the edge `u—w` must be\n> the *only* way out, so the test is strict.\n\n**Root vertex.** The root is an articulation point if it has **more than one** DFS child — each\nchild subtree is a separate piece that only the root connects.\n\n**Edge ids.** As with bridges, the "parent" is skipped by edge id, so parallel edges are handled\ncorrectly.\n\n## Dry Run\n\nEdges (with ids): `e0: 0—1`, `e1: 1—2`, `e2: 2—0`, `e3: 1—3`, `e4: 3—4`.\n\nDFS from vertex `0`; `0` is the **root**:\n\n| Step | Vertex | `tin` | `low` | Event | Children so far | `articulation` |\n|---:|---|---:|---:|---|---|---|\n| 1 | `0` | 0 | 0 | DFS root, start | 0 | false |\n| 2 | `1` | 1 | 1 | child of `0` → recurse | — | false |\n| 3 | `2` | 2 | 2 | child of `1` → recurse | — | false |\n| 4 | `2` | 2 | 0 | back edge `2→0` → `low[2] = min(2, tin[0]) = 0` | — | false |\n| 5 | `1` | 1 | 0 | back in `1`: `low[1] = min(1, low[2]=0) = 0`; check `low[2]=0 >= tin[1]=1`? **No** → `1` stays | 1 | false |\n| 6 | `3` | 3 | 3 | child of `1` → recurse | — | false |\n| 7 | `4` | 4 | 4 | child of `3` → recurse | — | false |\n| 8 | `3` | 3 | 3 | back in `3`: `low[3] = min(3, low[4]=4) = 3`; check `low[4]=4 >= tin[3]=3`? **Yes** → **`3` is an articulation point** | 1 | **true** |\n| 9 | `1` | 1 | 0 | back in `1`: `low[1] = min(0, low[3]=3) = 0`; check `low[3]=3 >= tin[1]=1`? **Yes** → **`1` is an articulation point** | 2 | **true** |\n| 10 | `0` | 0 | 0 | back in `0`: root with **1** child (`1`) → not more than one → `0` is **not** an articulation point | 1 | false |\n\nArticulation points: **`1`** and **`3`**.\n\n## Java Solution\n\nSee [`ArticulationPoints.java`](./ArticulationPoints.java).\n\n```java\nvoid visit(int u, int parentEdge) {\n    tin[u] = low[u] = timer++;\n    int children = 0;\n    for (int[] edge : adj.get(u)) {\n        int v = edge[0];\n        int id = edge[1];\n        if (id == parentEdge) {\n            continue;\n        }\n        if (tin[v] != -1) {\n            low[u] = Math.min(low[u], tin[v]);\n        } else {\n            children++;\n            visit(v, id);\n            low[u] = Math.min(low[u], low[v]);\n            if (parentEdge != -1 && low[v] >= tin[u]) {\n                articulation[u] = true;\n            }\n        }\n    }\n    if (parentEdge == -1 && children > 1) {\n        articulation[u] = true; // a root with several DFS subtrees\n    }\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n + m) | One DFS, every vertex and edge touched a constant number of times |\n| **Space** | O(n + m) | Adjacency list, `tin`/`low` arrays, recursion stack |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"How do you find the biconnected components?"* → the same DFS, but collect the vertices that\n  share a low-link subtree; the edges are grouped by the articulation point that separates them.\n- *"What is the difference between an articulation point and a bridge?"* → a bridge is an **edge**\n  whose removal disconnects the graph; an articulation point is a **vertex** whose removal does.\n  Every bridge has an articulation point at at least one of its ends, but not vice versa.\n- *"How do you handle parallel edges?"* → skip the parent **edge by id**, not the parent vertex.\n- *"What about self-loops?"* → they never make a vertex an articulation point.\n- *"How would you find them in a directed graph?"* → the notion changes completely; you would\n  look at strongly connected components and dominator trees.\n\n**Common mistakes:**\n- ❌ Using `>` instead of `>=` in the non-root test → you miss articulation points whose child\'s\n  low-link value equals the parent\'s discovery time.\n- ❌ Forgetting the **root** rule → the root is an articulation point when it has more than one\n  DFS child, regardless of any low-link value.\n- ❌ Only checking the parent rule → the root case is separate and easy to miss.\n- ❌ Only starting the DFS from vertex `0` → every component needs a DFS.\n\n**How to narrate:**\n> "It\'s the same low-link DFS as bridges. A non-root vertex u is an articulation point when one\n> of its DFS children w has low[w] greater than or equal to tin[u] — that child\'s subtree can\n> then only get out through u. The DFS root is a special case: it is an articulation point when\n> it has more than one DFS child, because each child subtree is a separate piece."\n\n## Related Problems\n\n- [Bridges in a Graph](./BridgesInGraph.java) — the same\n  DFS, one inequality apart\n- [Tarjan\'s Strongly Connected Components](./TarjanStronglyConnectedComponents.java)\n- [Graph Valid Tree](../graphs/GraphValidTree.java)\n- [Number of Connected Components](../graphs/NumberOfConnectedComponents.java)\n',i=[`findArticulationPoints`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};