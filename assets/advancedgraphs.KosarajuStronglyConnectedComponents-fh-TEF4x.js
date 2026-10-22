var e=`advancedgraphs.KosarajuStronglyConnectedComponents`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Kosaraju's Strongly Connected Components
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Kosaraju, two DFS passes, transpose graph
 *
 * <p>Problem: Given a directed graph, split it into strongly connected components — maximal sets
 * of vertices where every vertex can reach every other one.
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
 * 4 4
 * 0 1
 * 1 2
 * 2 0
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 0 1 2
 * 3
 * </pre>
 *
 * <p>Output: the number of components on the first line, then one line per component holding
 * its vertices in ascending order; the components themselves are listed by their smallest
 * vertex. The answer is identical to the one produced by Tarjan's algorithm.
 *
 * <p>Approach: two DFS passes. The first one on the original graph records the vertices in
 * <em>finishing</em> order. The second one runs on the transposed graph (every edge reversed)
 * and processes the vertices in reverse finishing order: each DFS tree it discovers is exactly
 * one strongly connected component.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class KosarajuStronglyConnectedComponents {

    /**
     * Splits a directed graph into its strongly connected components.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return one list per component, each list sorted ascending; the components are ordered by
     *         their smallest vertex
     */
    public static List<List<Integer>> stronglyConnectedComponents(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        List<List<Integer>> transposed = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
            transposed.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            transposed.get(edge[1]).add(edge[0]);
        }

        boolean[] visited = new boolean[n];
        List<Integer> finishOrder = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            if (!visited[v]) {
                recordFinishOrder(adj, visited, v, finishOrder);
            }
        }

        boolean[] seen = new boolean[n];
        List<List<Integer>> components = new ArrayList<>();
        for (int i = finishOrder.size() - 1; i >= 0; i--) {
            int v = finishOrder.get(i);
            if (seen[v]) {
                continue;
            }
            List<Integer> component = new ArrayList<>();
            collect(transposed, seen, v, component);
            Collections.sort(component);
            components.add(component);
        }
        components.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));
        return components;
    }

    /** First pass: append {@code v} to the finish order once its whole subtree is explored. */
    private static void recordFinishOrder(List<List<Integer>> adj, boolean[] visited, int v,
            List<Integer> finishOrder) {
        visited[v] = true;
        for (int w : adj.get(v)) {
            if (!visited[w]) {
                recordFinishOrder(adj, visited, w, finishOrder);
            }
        }
        finishOrder.add(v);
    }

    /** Second pass: collect everything reachable from {@code v} in the transposed graph. */
    private static void collect(List<List<Integer>> transposed, boolean[] seen, int v,
            List<Integer> component) {
        seen[v] = true;
        component.add(v);
        for (int w : transposed.get(v)) {
            if (!seen[w]) {
                collect(transposed, seen, w, component);
            }
        }
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

        List<List<Integer>> components = stronglyConnectedComponents(n, edges);
        System.out.println(components.size());
        for (List<Integer> component : components) {
            StringBuilder line = new StringBuilder();
            for (int i = 0; i < component.size(); i++) {
                if (i > 0) {
                    line.append(' ');
                }
                line.append(component.get(i));
            }
            System.out.println(line);
        }
    }
}
`,n=`import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Kosaraju's Strongly Connected Components
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Kosaraju, two DFS passes, transpose graph
 *
 * <p>Problem: Given a directed graph, split it into strongly connected components — maximal sets
 * of vertices where every vertex can reach every other one.
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
 * 4 4
 * 0 1
 * 1 2
 * 2 0
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 0 1 2
 * 3
 * </pre>
 *
 * <p>Output: the number of components on the first line, then one line per component holding
 * its vertices in ascending order; the components themselves are listed by their smallest
 * vertex. The answer is identical to the one produced by Tarjan's algorithm.
 *
 * <p>Approach: two DFS passes. The first one on the original graph records the vertices in
 * <em>finishing</em> order. The second one runs on the transposed graph (every edge reversed)
 * and processes the vertices in reverse finishing order: each DFS tree it discovers is exactly
 * one strongly connected component.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /**
     * Splits a directed graph into its strongly connected components.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return one list per component, each list sorted ascending; the components are ordered by
     *         their smallest vertex
     */
    public static List<List<Integer>> stronglyConnectedComponents(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        List<List<Integer>> transposed = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
            transposed.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            transposed.get(edge[1]).add(edge[0]);
        }

        boolean[] visited = new boolean[n];
        List<Integer> finishOrder = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            if (!visited[v]) {
                recordFinishOrder(adj, visited, v, finishOrder);
            }
        }

        boolean[] seen = new boolean[n];
        List<List<Integer>> components = new ArrayList<>();
        for (int i = finishOrder.size() - 1; i >= 0; i--) {
            int v = finishOrder.get(i);
            if (seen[v]) {
                continue;
            }
            List<Integer> component = new ArrayList<>();
            collect(transposed, seen, v, component);
            Collections.sort(component);
            components.add(component);
        }
        components.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));
        return components;
    }

    /** First pass: append {@code v} to the finish order once its whole subtree is explored. */
    private static void recordFinishOrder(List<List<Integer>> adj, boolean[] visited, int v,
            List<Integer> finishOrder) {
        visited[v] = true;
        for (int w : adj.get(v)) {
            if (!visited[w]) {
                recordFinishOrder(adj, visited, w, finishOrder);
            }
        }
        finishOrder.add(v);
    }

    /** Second pass: collect everything reachable from {@code v} in the transposed graph. */
    private static void collect(List<List<Integer>> transposed, boolean[] seen, int v,
            List<Integer> component) {
        seen[v] = true;
        component.add(v);
        for (int w : transposed.get(v)) {
            if (!seen[w]) {
                collect(transposed, seen, w, component);
            }
        }
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

        List<List<Integer>> components = stronglyConnectedComponents(n, edges);
        System.out.println(components.size());
        for (List<Integer> component : components) {
            StringBuilder line = new StringBuilder();
            for (int i = 0; i < component.size(); i++) {
                if (i > 0) {
                    line.append(' ');
                }
                line.append(component.get(i));
            }
            System.out.println(line);
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
# Kosaraju's Strongly Connected Components

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Kosaraju · Two DFS passes |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given a **directed** graph, split it into **strongly connected components** — maximal sets of
vertices where every vertex can reach every other one.

The output is identical to the one produced by
[Tarjan's algorithm](./TarjanStronglyConnectedComponents.java):
the number of components, then one line per component with its vertices ascending, the
components ordered by their smallest vertex.

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
4 4
0 1
1 2
2 0
2 3
\`\`\`

## Expected Output

\`\`\`
2
0 1 2
3
\`\`\`

## Approach — two DFS passes on the graph and its transpose

Kosaraju's algorithm needs no low-link arithmetic; it uses the **transpose** of the graph (every
edge reversed) and the order in which DFS finishes vertices.

**Pass 1 — compute a finishing order.** Run a DFS over the whole graph. Every time a vertex's
whole subtree has been explored, append the vertex to a list. The list is in *finishing order*:
vertices of a source SCC finish late, vertices of a sink SCC finish early.

**Pass 2 — find the components.** Build the transposed graph (every \`u → v\` becomes \`v → u\`).
Process the vertices in **reverse** finishing order, and for each still-unvisited vertex run a
DFS on the transposed graph. Every vertex it reaches is exactly one strongly connected component.

**Why it works.** Reversing all the edges turns a strongly connected component into a strongly
connected component. More importantly, it turns the "source" of the condensation DAG into a
"sink". The finishing order guarantees that when we start a DFS in the transposed graph we can
only reach vertices of one component — the component's "entry point" is processed before any
vertex that could leak out of it.

**Compared with Tarjan.** Kosaraju needs two passes, a transposed adjacency list and no
arithmetic on indices; Tarjan needs one pass but a stack and careful low-link updates. Both are
O(n + m).

## Dry Run

Edges: \`0→1\`, \`1→2\`, \`2→0\`, \`2→3\`. Transposed edges: \`1→0\`, \`2→1\`, \`0→2\`, \`3→2\`.

**Pass 1** — DFS from vertex \`0\` follows \`0 → 1 → 2 → 3\`:

| Step | Vertex | Action | Finish order |
|---:|---|---|---|
| 1 | \`0\` | visit \`1\` | \`[]\` |
| 2 | \`1\` | visit \`2\` | \`[]\` |
| 3 | \`2\` | visit \`3\` | \`[]\` |
| 4 | \`3\` | no neighbours → **finish** \`3\` | \`[3]\` |
| 5 | \`2\` | no unvisited neighbours → **finish** \`2\` | \`[3, 2]\` |
| 6 | \`1\` | → **finish** \`1\` | \`[3, 2, 1]\` |
| 7 | \`0\` | → **finish** \`0\` | \`[3, 2, 1, 0]\` |

**Pass 2** — process the finish order in reverse: \`0, 1, 2, 3\`, DFS on the **transposed** graph:

| Step | Start | Reached in the transposed graph | Component |
|---:|---|---|---|
| 1 | \`0\` | \`0 → 2 → 1\` (from \`1\` we go back to \`0\`, already visited) | \`{0, 1, 2}\` |
| 2 | \`1\` | already visited | — |
| 3 | \`2\` | already visited | — |
| 4 | \`3\` | \`3 → 2\` (already visited) | \`{3}\` |

Components sorted → **\`{0, 1, 2}\`** and **\`{3}\`**:

\`\`\`
2
0 1 2
3
\`\`\`

## Java Solution

See [\`KosarajuStronglyConnectedComponents.java\`](./KosarajuStronglyConnectedComponents.java).

\`\`\`java
// Pass 1: record the order in which vertices finish.
private static void recordFinishOrder(List<List<Integer>> adj, boolean[] visited, int v,
        List<Integer> finishOrder) {
    visited[v] = true;
    for (int w : adj.get(v)) {
        if (!visited[w]) {
            recordFinishOrder(adj, visited, w, finishOrder);
        }
    }
    finishOrder.add(v);
}

// Pass 2: every DFS tree in the transposed graph is one component.
private static void collect(List<List<Integer>> transposed, boolean[] seen, int v,
        List<Integer> component) {
    seen[v] = true;
    component.add(v);
    for (int w : transposed.get(v)) {
        if (!seen[w]) {
            collect(transposed, seen, w, component);
        }
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Two DFS passes plus building the transpose |
| **Space** | O(n + m) | Two adjacency lists, the visited arrays and the finish order |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why do we need the transpose?"* → because in the transposed graph the condensation DAG is
  reversed, which makes the finish order a valid component-processing order.
- *"Which one do you prefer, Kosaraju or Tarjan?"* → Kosaraju is easier to remember and to
  implement; Tarjan uses less memory (no second adjacency list) and is the standard choice in
  libraries.
- *"Can you do it iteratively?"* → yes; the first pass becomes an explicit stack with a
  "finished" marker.
- *"How do you find SCCs in a graph with 10⁸ vertices?"* → you need the linear-time algorithm
  anyway; the challenge becomes memory and I/O.
- *"What is the SCC condensation DAG good for?"* → it is always acyclic, so you can topologically
  sort the components and schedule tasks per component.

**Common mistakes:**
- ❌ Processing the vertices in **forward** finishing order in pass 2 → you get one component per
  vertex instead of per SCC.
- ❌ Forgetting to build the transposed graph → pass 2 walks the original graph and merges
  unrelated components.
- ❌ Adding a vertex to the finish order when it is **discovered** instead of when it
  **finishes** → the order is wrong.

**How to narrate:**
> "Kosaraju uses two DFS passes. The first one on the original graph records the order in which
> vertices finish. I then reverse every edge and, processing the vertices in reverse finish
> order, run a second DFS on the transposed graph — each DFS tree it discovers is exactly one
> strongly connected component."

## Related Problems

- [Tarjan's Strongly Connected Components](./TarjanStronglyConnectedComponents.java)
- [Bridges in a Graph](./BridgesInGraph.java)
- [Articulation Points in a Graph](./ArticulationPoints.java)
- [Topological Sort](../graphs/TopologicalSort.java)
`,i=[`stronglyConnectedComponents`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};