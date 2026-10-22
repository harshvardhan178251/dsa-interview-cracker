var e=`graphs.BipartiteCheck`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Is Graph Bipartite
 * LeetCode: 785 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-colouring, BFS
 *
 * <p>Problem: Decide whether an undirected graph can be split into two groups so that no edge
 * joins two vertices of the same group. Equivalently: can the graph be 2-coloured without a
 * conflict?
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
 * 4 3
 * 0 1
 * 1 2
 * 2 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: BFS two-colouring. Start every uncoloured component with colour 0 and propagate
 * the opposite colour to the neighbours. If we ever have to give a vertex the colour it already
 * has, the graph contains an odd cycle and is not bipartite.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class BipartiteCheck {

    /**
     * Decides whether the undirected graph is bipartite.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code true} when the graph is bipartite
     */
    public static boolean isBipartite(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int[] colour = new int[n];
        java.util.Arrays.fill(colour, -1); // -1 = uncoloured, 0/1 = the two groups

        for (int start = 0; start < n; start++) {
            if (colour[start] != -1) {
                continue;
            }
            colour[start] = 0;
            Deque<Integer> queue = new ArrayDeque<>();
            queue.add(start);
            while (!queue.isEmpty()) {
                int u = queue.poll();
                for (int v : adj.get(u)) {
                    if (colour[v] == -1) {
                        colour[v] = 1 - colour[u];
                        queue.add(v);
                    } else if (colour[v] == colour[u]) {
                        return false; // same group on both ends of an edge
                    }
                }
            }
        }
        return true;
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

        System.out.println(isBipartite(n, edges));
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Is Graph Bipartite
 * LeetCode: 785 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-colouring, BFS
 *
 * <p>Problem: Decide whether an undirected graph can be split into two groups so that no edge
 * joins two vertices of the same group. Equivalently: can the graph be 2-coloured without a
 * conflict?
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
 * 4 3
 * 0 1
 * 1 2
 * 2 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: BFS two-colouring. Start every uncoloured component with colour 0 and propagate
 * the opposite colour to the neighbours. If we ever have to give a vertex the colour it already
 * has, the graph contains an odd cycle and is not bipartite.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /**
     * Decides whether the undirected graph is bipartite.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code true} when the graph is bipartite
     */
    public static boolean isBipartite(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int[] colour = new int[n];
        java.util.Arrays.fill(colour, -1); // -1 = uncoloured, 0/1 = the two groups

        for (int start = 0; start < n; start++) {
            if (colour[start] != -1) {
                continue;
            }
            colour[start] = 0;
            Deque<Integer> queue = new ArrayDeque<>();
            queue.add(start);
            while (!queue.isEmpty()) {
                int u = queue.poll();
                for (int v : adj.get(u)) {
                    if (colour[v] == -1) {
                        colour[v] = 1 - colour[u];
                        queue.add(v);
                    } else if (colour[v] == colour[u]) {
                        return false; // same group on both ends of an edge
                    }
                }
            }
        }
        return true;
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

        System.out.println(isBipartite(n, edges));
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
`,r='\n# Is Graph Bipartite — LeetCode 785\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Two-colouring · BFS |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |\n\n## Problem Statement\n\nDecide whether an undirected graph can be split into **two groups** so that no edge joins two\nvertices of the same group. Such a graph is called **bipartite**.\n\nEquivalently: can the graph be 2-coloured without a conflict? A graph is bipartite **iff** it\ncontains no **odd cycle**.\n\n## Input Format\n\nThe program reads an **undirected** graph given as an **edge list**:\n\n```\nn m\nu1 v1\nu2 v2\n...\num vm\n```\n\n- `n` — number of vertices, numbered `0 … n-1`\n- `m` — number of undirected edges\n- `m` lines, each with two integers `u v` in `0 … n-1`: the undirected edge `u — v`\n\n## Sample Input\n\n```\n4 3\n0 1\n1 2\n2 0\n```\n\n## Expected Output\n\n```\nfalse\n```\n\n`0 → 1 → 2 → 0` is a cycle of length 3 (odd), so the graph cannot be split into two groups.\n\n## Approach — BFS two-colouring\n\n1. Give every vertex a colour: `-1` = uncoloured, `0` or `1` = the two groups.\n2. For every still-uncoloured vertex, colour it `0` and start a BFS from it (the graph may be\n   disconnected, so we need one BFS **per component**).\n3. When we dequeue `u`, every uncoloured neighbour `v` gets the opposite colour `1 - colour[u]`.\n4. If a neighbour already has the **same** colour as `u`, the two ends of that edge would be in\n   the same group → not bipartite → return `false`.\n\n**Why it works.** In a bipartite graph the colour of a vertex is forced once you pick the colour\nof one vertex in its component: it must alternate along every path. If two different paths force\ndifferent colours on the same vertex, the component contains an odd cycle and no valid split\nexists.\n\n**The odd-cycle connection.** BFS computes the distance (in edges) from the root of the\ncomponent. An edge whose endpoints have the **same** distance parity is an odd cycle.\n\n## Dry Run\n\nColours start as `[-1, -1, -1, -1]`.\n\n| Step | Pop | Neighbour | Colour of neighbour | Action | Colour array |\n|---:|---|---|---|---|---|\n| 0 | — | — | — | colour vertex `0` with `0`, queue `[0]` | `[-1, -1, -1, -1]` → `[0, -1, -1, -1]` |\n| 1 | `0` | `1` | `-1` (uncoloured) | colour it `1 - colour[0] = 1`, enqueue | `[0, 1, -1, -1]` |\n| 2 | `1` | `0` | `0` | different colour → fine | `[0, 1, -1, -1]` |\n| 3 | `1` | `2` | `-1` (uncoloured) | colour it `1 - colour[1] = 0`, enqueue | `[0, 1, 0, -1]` |\n| 4 | `2` | `1` | `1` | different colour → fine | `[0, 1, 0, -1]` |\n| 5 | `2` | `0` | `0` | **same colour as `2`** → conflict | **`false`** |\n\nVertex `3` is isolated and would simply be coloured `0` on its own — it never conflicts.\n\n### A bipartite graph\n\n```\n4 4\n0 1\n1 2\n2 3\n3 0\n```\n\n| Step | Pop | Neighbour | Colour of neighbour | Action | Colour array |\n|---:|---|---|---|---|---|\n| 1 | `0` | `1` | `-1` | colour `1` | `[0, 1, -1, -1]` |\n| 2 | `1` | `0` | `0` | fine | `[0, 1, -1, -1]` |\n| 3 | `1` | `2` | `-1` | colour `0` | `[0, 1, 0, -1]` |\n| 4 | `2` | `1` | `1` | fine | `[0, 1, 0, -1]` |\n| 5 | `2` | `3` | `-1` | colour `1` | `[0, 1, 0, 1]` |\n| 6 | `3` | `2` | `0` | fine | `[0, 1, 0, 1]` |\n| 7 | `3` | `0` | `0` | fine (colour[3]=1 ≠ 0) | `[0, 1, 0, 1]` |\n\nNo conflict → **`true`** (the 4-cycle is even).\n\n## Java Solution\n\nSee [`BipartiteCheck.java`](./BipartiteCheck.java).\n\n```java\npublic static boolean isBipartite(int n, int[][] edges) {\n    // ... build the (symmetric) adjacency list ...\n    int[] colour = new int[n];\n    Arrays.fill(colour, -1);\n    for (int start = 0; start < n; start++) {\n        if (colour[start] != -1) {\n            continue;\n        }\n        colour[start] = 0;\n        Deque<Integer> queue = new ArrayDeque<>();\n        queue.add(start);\n        while (!queue.isEmpty()) {\n            int u = queue.poll();\n            for (int v : adj.get(u)) {\n                if (colour[v] == -1) {\n                    colour[v] = 1 - colour[u];\n                    queue.add(v);\n                } else if (colour[v] == colour[u]) {\n                    return false;\n                }\n            }\n        }\n    }\n    return true;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n + m) | Every vertex is dequeued once, every edge is inspected twice (once per direction) |\n| **Space** | O(n + m) | Adjacency list, colour array, queue |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"How do you find the actual two groups?"* → the `colour` array **is** the grouping: group 0\n  = the vertices with colour `0`, group 1 = the rest.\n- *"Can you detect the odd cycle itself?"* → during the BFS, the conflicting edge joins two\n  vertices at the same BFS level; the cycle is that edge plus the two tree paths back to the root.\n- *"What if the graph is directed?"* → then you need the notion of a bipartite orientation, which\n  is a different (harder) problem.\n- *"Is there a Union-Find version?"* → yes: maintain the parity of each vertex relative to its\n  set; an edge whose endpoints have equal parity is a contradiction.\n\n**Common mistakes:**\n- ❌ Only starting the BFS from vertex `0` → disconnected components are never checked.\n- ❌ Checking the neighbour\'s colour **before** colouring it → you must colour uncoloured\n  neighbours first and only then compare.\n- ❌ Forgetting that the adjacency list must be **symmetric** → the graph is undirected.\n\n**How to narrate:**\n> "A graph is bipartite exactly when it can be two-coloured. I\'ll do a BFS two-colouring: I\n> colour the root of each component 0, and every neighbour gets the opposite colour. If I ever\n> find an edge whose two ends already have the same colour, the graph has an odd cycle and the\n> answer is false. I have to start a BFS per component, not just from vertex 0."\n\n## Related Problems\n\n- [Graph Coloring](../advancedgraphs/GraphColoring.java) — the general k-colour problem\n- [Graph Valid Tree](./GraphValidTree.java) — another undirected-graph property\n- [Number of Connected Components](./NumberOfConnectedComponents.java) — component counting\n- [Course Schedule](./CourseSchedule.java) — the directed-graph analogue\n',i=[`isBipartite`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};