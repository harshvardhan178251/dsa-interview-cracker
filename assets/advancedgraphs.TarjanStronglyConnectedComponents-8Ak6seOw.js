var e=`advancedgraphs.TarjanStronglyConnectedComponents`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Tarjan's Strongly Connected Components
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Tarjan, low-link values, DFS stack
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
 * vertex.
 *
 * <p>Approach: Tarjan's algorithm runs a single DFS and keeps two values per vertex: the index
 * when it was discovered and the smallest index reachable from its subtree through tree edges
 * and at most one back edge. When {@code low[v] == index[v]} the vertex is the root of a
 * strongly connected component and we pop the component stack down to it.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class TarjanStronglyConnectedComponents {

    /** Mutable DFS state, kept in one place so the recursive helper stays readable. */
    private static final class Tarjan {
        final List<List<Integer>> adj;
        final int[] index;
        final int[] low;
        final boolean[] onStack;
        final List<Integer> stack = new ArrayList<>();
        final List<List<Integer>> components = new ArrayList<>();
        int counter = 0;

        Tarjan(List<List<Integer>> adj) {
            this.adj = adj;
            this.index = new int[adj.size()];
            this.low = new int[adj.size()];
            this.onStack = new boolean[adj.size()];
            Arrays.fill(index, -1);
            Arrays.fill(low, -1);
        }

        void visit(int v) {
            index[v] = low[v] = counter++;
            stack.add(v);
            onStack[v] = true;

            for (int w : adj.get(v)) {
                if (index[w] == -1) {
                    visit(w);
                    low[v] = Math.min(low[v], low[w]);
                } else if (onStack[w]) {
                    low[v] = Math.min(low[v], index[w]);
                }
            }

            if (low[v] == index[v]) {
                List<Integer> component = new ArrayList<>();
                while (true) {
                    int w = stack.remove(stack.size() - 1);
                    onStack[w] = false;
                    component.add(w);
                    if (w == v) {
                        break;
                    }
                }
                components.add(component);
            }
        }
    }

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
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
        }

        Tarjan state = new Tarjan(adj);
        for (int v = 0; v < n; v++) {
            if (state.index[v] == -1) {
                state.visit(v);
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        for (List<Integer> component : state.components) {
            Collections.sort(component);
            result.add(component);
        }
        result.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));
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
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Tarjan's Strongly Connected Components
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Tarjan, low-link values, DFS stack
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
 * vertex.
 *
 * <p>Approach: Tarjan's algorithm runs a single DFS and keeps two values per vertex: the index
 * when it was discovered and the smallest index reachable from its subtree through tree edges
 * and at most one back edge. When {@code low[v] == index[v]} the vertex is the root of a
 * strongly connected component and we pop the component stack down to it.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /** Mutable DFS state, kept in one place so the recursive helper stays readable. */
    private static final class Tarjan {
        final List<List<Integer>> adj;
        final int[] index;
        final int[] low;
        final boolean[] onStack;
        final List<Integer> stack = new ArrayList<>();
        final List<List<Integer>> components = new ArrayList<>();
        int counter = 0;

        Tarjan(List<List<Integer>> adj) {
            this.adj = adj;
            this.index = new int[adj.size()];
            this.low = new int[adj.size()];
            this.onStack = new boolean[adj.size()];
            Arrays.fill(index, -1);
            Arrays.fill(low, -1);
        }

        void visit(int v) {
            index[v] = low[v] = counter++;
            stack.add(v);
            onStack[v] = true;

            for (int w : adj.get(v)) {
                if (index[w] == -1) {
                    visit(w);
                    low[v] = Math.min(low[v], low[w]);
                } else if (onStack[w]) {
                    low[v] = Math.min(low[v], index[w]);
                }
            }

            if (low[v] == index[v]) {
                List<Integer> component = new ArrayList<>();
                while (true) {
                    int w = stack.remove(stack.size() - 1);
                    onStack[w] = false;
                    component.add(w);
                    if (w == v) {
                        break;
                    }
                }
                components.add(component);
            }
        }
    }

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
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
        }

        Tarjan state = new Tarjan(adj);
        for (int v = 0; v < n; v++) {
            if (state.index[v] == -1) {
                state.visit(v);
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        for (List<Integer> component : state.components) {
            Collections.sort(component);
            result.add(component);
        }
        result.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));
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
`,r='\n# Tarjan\'s Strongly Connected Components\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Tarjan · Low-link values |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |\n\n## Problem Statement\n\nGiven a **directed** graph, split it into **strongly connected components** — maximal sets of\nvertices where every vertex can reach every other one.\n\n## Input Format\n\nThe program reads a directed graph given as an **edge list**:\n\n```\nn m\nu1 v1\nu2 v2\n...\num vm\n```\n\n- `n` — number of vertices, numbered `0 … n-1`\n- `m` — number of directed edges\n- `m` lines, each with two integers `u v` in `0 … n-1`: the edge `u → v`\n\n## Sample Input\n\n```\n4 4\n0 1\n1 2\n2 0\n2 3\n```\n\n## Expected Output\n\n```\n2\n0 1 2\n3\n```\n\n`0 → 1 → 2 → 0` is a cycle, so `{0, 1, 2}` form one strongly connected component. Vertex `3`\ncan be reached from the cycle but cannot get back, so it is a component on its own.\n\nThe output lists the number of components on the first line, then one line per component with\nits vertices in ascending order; the components themselves are ordered by their smallest vertex.\n\n## Approach — Tarjan\'s algorithm in one DFS\n\nTarjan keeps two numbers per vertex:\n\n- `index[v]` — the order in which `v` was discovered (a DFS timestamp);\n- `low[v]` — the **smallest** `index` reachable from `v`\'s DFS subtree using tree edges and at\n  most one back edge.\n\nDuring the DFS of a vertex `v`:\n\n1. Set `index[v] = low[v] = counter++`, push `v` onto a **stack** and mark it as "on the stack".\n2. For each neighbour `w`:\n   - if `w` is unvisited, recurse into it and set `low[v] = min(low[v], low[w])`;\n   - else if `w` is **on the stack**, set `low[v] = min(low[v], index[w])`.\n3. After the neighbours, if `low[v] == index[v]`, then `v` is the **root of a component**: pop\n   the stack until (and including) `v` — everything popped belongs to that component.\n\n**Why `low[v] == index[v]` means "component root".** If `low[v] < index[v]`, then some vertex\nin `v`\'s subtree can reach back to a vertex discovered before `v`, so `v` is part of a bigger\ncycle that continues above it — `v` is not a root. If `low[v] == index[v]`, nothing in the\nsubtree can escape past `v`, so the stack segment down to `v` is closed under reachability.\n\n**The stack is the trick.** Vertices stay on it until their component is closed, which is why a\nvertex that is still "on the stack" can be part of a cycle even though it was already visited.\n\n## Dry Run\n\nEdges: `0→1`, `1→2`, `2→0`, `2→3`\n\n| Step | Vertex | `index` | `low` | Neighbour | Action | Stack | On stack |\n|---:|---|---:|---:|---|---|---|---|\n| 1 | `0` | 0 | 0 | `1` | unvisited → recurse into `1` | `[0]` | `{0}` |\n| 2 | `1` | 1 | 1 | `2` | unvisited → recurse into `2` | `[0, 1]` | `{0, 1}` |\n| 3 | `2` | 2 | 2 | `0` | visited **and on the stack** → `low[2] = min(2, index[0]=0) = 0` | `[0, 1, 2]` | `{0, 1, 2}` |\n| 4 | `2` | 2 | 0 | `3` | unvisited → recurse into `3` | `[0, 1, 2, 3]` | `{0, 1, 2, 3}` |\n| 5 | `3` | 3 | 3 | — | no neighbours; `low[3] == index[3]` → **pop the component** `{3}` | `[0, 1, 2]` | `{0, 1, 2}` |\n| 6 | `2` | 2 | 0 | — | `low[2] = 0 ≠ index[2] = 2` → not a root | `[0, 1, 2]` | `{0, 1, 2}` |\n| 7 | `1` | 1 | 0 | — | `low[1] = min(1, low[2]=0) = 0 ≠ index[1] = 1` → not a root | `[0, 1, 2]` | `{0, 1, 2}` |\n| 8 | `0` | 0 | 0 | — | `low[0] = 0 == index[0]` → **pop the component** `{2, 1, 0}` | `[]` | `{}` |\n\nComponents found: `{3}` and `{2, 1, 0}` → sorted → **`{0, 1, 2}`** and **`{3}`**.\n\n```\n2\n0 1 2\n3\n```\n\n## Java Solution\n\nSee [`TarjanStronglyConnectedComponents.java`](./TarjanStronglyConnectedComponents.java).\n\n```java\nvoid visit(int v) {\n    index[v] = low[v] = counter++;\n    stack.add(v);\n    onStack[v] = true;\n    for (int w : adj.get(v)) {\n        if (index[w] == -1) {\n            visit(w);\n            low[v] = Math.min(low[v], low[w]);\n        } else if (onStack[w]) {\n            low[v] = Math.min(low[v], index[w]);\n        }\n    }\n    if (low[v] == index[v]) {\n        List<Integer> component = new ArrayList<>();\n        while (true) {\n            int w = stack.remove(stack.size() - 1);\n            onStack[w] = false;\n            component.add(w);\n            if (w == v) {\n                break;\n            }\n        }\n        components.add(component);\n    }\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n + m) | Every vertex is pushed/popped once, every edge is examined once |\n| **Space** | O(n + m) | Adjacency list, the index/low arrays and the component stack |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What is the difference between Kosaraju and Tarjan?"* → Kosaraju needs two DFS passes and a\n  transposed graph; Tarjan needs one pass but a stack and the low-link bookkeeping.\n  See [Kosaraju](./KosarajuStronglyConnectedComponents.java).\n- *"Can you find the SCC of a specific vertex?"* → in Tarjan you know it the moment you pop the\n  component; in Kosaraju you need the second pass.\n- *"How do you condense the SCCs into a DAG?"* → replace each component with one node; the\n  result is always acyclic, so you can topologically sort it.\n- *"How would you scale this to a huge graph?"* → the algorithm is already linear, but the\n  recursion depth is `O(n)`; convert it to an explicit stack for very deep graphs.\n- *"What about weakly connected components?"* → just ignore the edge directions and use\n  Union-Find.\n\n**Common mistakes:**\n- ❌ Using `low[v] = min(low[v], index[w])` for a neighbour that is visited but **not** on the\n  stack → that vertex already belongs to a finished component and must not be merged.\n- ❌ Forgetting `low[v] = min(low[v], low[w])` after recursing into a child → the child\'s\n  information never reaches the parent.\n- ❌ Popping the component stack one element too few → the component misses a vertex.\n\n**How to narrate:**\n> "Tarjan does it in a single DFS. Each vertex gets a discovery index and a low-link value, the\n> smallest index reachable from its subtree. When I recurse into a child I fold the child\'s low\n> into mine; when I meet an already visited vertex that is still on my stack I fold in its\n> index. Vertices stay on the stack until their component is complete, and when low equals index\n> I pop the component off the stack."\n\n## Related Problems\n\n- [Kosaraju\'s Strongly Connected Components](./KosarajuStronglyConnectedComponents.java)\n- [Bridges in a Graph](./BridgesInGraph.java) — the same\n  low-link idea on undirected graphs\n- [Articulation Points in a Graph](./ArticulationPoints.java)\n- [Topological Sort](../graphs/TopologicalSort.java)\n',i=[`stronglyConnectedComponents`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};