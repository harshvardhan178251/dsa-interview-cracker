var e=`graphs.CourseSchedule`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Course Schedule
 * LeetCode: 207 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm (cycle detection)
 *
 * <p>Problem: There are {@code n} courses labelled {@code 0..n-1}. Each course is a directed
 * edge {@code u -> v} meaning "course u must be taken before course v". Decide whether it is
 * possible to finish every course, i.e. whether the dependency graph is acyclic.
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
 * 4 4
 * 0 1
 * 1 2
 * 2 3
 * 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: Kahn's algorithm. Count the in-degree of every vertex, push the vertices with
 * in-degree 0 into a queue and repeatedly remove one. Removing a vertex lowers the in-degree of
 * its neighbours, which may unlock more vertices. If we manage to remove all {@code n} vertices
 * the graph had no cycle; otherwise the vertices left in the queue are exactly the ones on (or
 * reachable from) a cycle.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class CourseSchedule {

    /**
     * Decides whether all courses can be completed.
     *
     * @param n     number of courses (vertices {@code 0..n-1})
     * @param edges prerequisite pairs {@code {u, v}} meaning "u before v"
     * @return {@code true} when the graph is acyclic
     */
    public static boolean canFinish(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                queue.add(v);
            }
        }

        int removed = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            removed++;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        return removed == n;
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

        System.out.println(canFinish(n, edges));
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
 * Problem: Course Schedule
 * LeetCode: 207 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm (cycle detection)
 *
 * <p>Problem: There are {@code n} courses labelled {@code 0..n-1}. Each course is a directed
 * edge {@code u -> v} meaning "course u must be taken before course v". Decide whether it is
 * possible to finish every course, i.e. whether the dependency graph is acyclic.
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
 * 4 4
 * 0 1
 * 1 2
 * 2 3
 * 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: Kahn's algorithm. Count the in-degree of every vertex, push the vertices with
 * in-degree 0 into a queue and repeatedly remove one. Removing a vertex lowers the in-degree of
 * its neighbours, which may unlock more vertices. If we manage to remove all {@code n} vertices
 * the graph had no cycle; otherwise the vertices left in the queue are exactly the ones on (or
 * reachable from) a cycle.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /**
     * Decides whether all courses can be completed.
     *
     * @param n     number of courses (vertices {@code 0..n-1})
     * @param edges prerequisite pairs {@code {u, v}} meaning "u before v"
     * @return {@code true} when the graph is acyclic
     */
    public static boolean canFinish(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                queue.add(v);
            }
        }

        int removed = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            removed++;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        return removed == n;
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

        System.out.println(canFinish(n, edges));
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
`,r='\n# Course Schedule — LeetCode 207\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Topological sort · Cycle detection |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |\n\n## Problem Statement\n\nThere are `n` courses numbered `0 … n-1`. Every course is a directed edge `u → v` meaning\n*"course `u` must be taken before course `v`"*.\n\nDecide whether it is possible to finish **every** course. That is possible exactly when the\ndependency graph has **no cycle**.\n\n## Input Format\n\nThe program reads a directed graph given as an **edge list**:\n\n```\nn m\nu1 v1\nu2 v2\n...\num vm\n```\n\n- `n` — number of courses / vertices (`1 ≤ n ≤ 10⁵`)\n- `m` — number of prerequisite pairs (`0 ≤ m ≤ 10⁵`)\n- `m` lines, each with two integers `u v` in `0 … n-1`: the edge `u → v`\n\n## Sample Input\n\n```\n4 4\n0 1\n1 2\n2 3\n3 1\n```\n\n## Expected Output\n\n```\nfalse\n```\n\nCourses `1 → 2 → 3 → 1` form a cycle, so no ordering of the courses can satisfy every\nprerequisite.\n\n## Approach — Kahn\'s algorithm (BFS on in-degrees)\n\nThe classical way to answer "is this graph acyclic?" is to try to **remove** vertices that have\nno prerequisites left:\n\n1. Compute the **in-degree** of every vertex (how many edges point at it).\n2. Put every vertex with in-degree `0` into a queue — those courses can be taken immediately.\n3. Repeatedly dequeue a vertex `u` and "take" it. This removes the edge `u → v`, so decrement the\n   in-degree of every neighbour `v`. If an in-degree drops to `0`, that course is now unlocked\n   and joins the queue.\n4. If we removed all `n` vertices the graph was acyclic → `true`. If the queue empties early,\n   the vertices that remain are exactly the ones on (or downstream of) a cycle → `false`.\n\n**Why it works:** in a cycle every vertex has at least one incoming edge from inside the cycle,\nso no vertex of the cycle can ever reach in-degree `0`. Conversely, an acyclic graph always has\na vertex with in-degree `0` (take a vertex with no predecessors).\n\n**The same machinery, extended:** [Course Schedule II](./CourseScheduleII.java) asks for the actual\nordering, and [Topological Sort](./TopologicalSort.java) returns it for a general graph.\n\n## Dry Run\n\nEdges: `0→1`, `1→2`, `2→3`, `3→1`\n\nInitial state — in-degree per vertex (the number of edges pointing **at** it):\n\n| Vertex | 0 | 1 | 2 | 3 |\n|---|---:|---:|---:|---:|\n| Out-edges | `0→1` | `1→2` | `2→3` | `3→1` |\n| In-degree | 0 | 2 | 1 | 1 |\n\nVertex `1` has in-degree **2** because both `0→1` and `3→1` point at it.\n\n| Step | Dequeue | Vertices removed | Edge relaxed | In-degree after | Ready queue | Still blocked |\n|---:|---|---|---|---|---|---|\n| 0 | — | none | — | `[0, 2, 1, 1]` | `[0]` | `1, 2, 3` |\n| 1 | `0` | `0` | `0→1`: in-deg[1] `2 → 1` (still > 0, so `1` is **not** unlocked) | `[0, 1, 1, 1]` | `[]` | `1, 2, 3` |\n| 2 | — | none | the ready queue is empty → the algorithm stops | `[0, 1, 1, 1]` | `[]` | `1, 2, 3` |\n\nOnly **1 of 4** vertices could be removed → the vertices `1, 2, 3` are trapped in the cycle\n`1 → 2 → 3 → 1` → **`false`**.\n\n### The same graph without the closing edge `3→1`\n\nEdges: `0→1`, `1→2`, `2→3` — in-degrees `[0, 1, 1, 1]`\n\n| Step | Dequeue | Vertices removed | Edge relaxed | In-degree after | Ready queue |\n|---:|---|---|---|---|---|\n| 0 | — | none | — | `[0, 1, 1, 1]` | `[0]` |\n| 1 | `0` | `0` | `0→1`: in-deg[1] `1 → 0` → unlock `1` | `[0, 0, 1, 1]` | `[1]` |\n| 2 | `1` | `0, 1` | `1→2`: in-deg[2] `1 → 0` → unlock `2` | `[0, 0, 0, 1]` | `[2]` |\n| 3 | `2` | `0, 1, 2` | `2→3`: in-deg[3] `1 → 0` → unlock `3` | `[0, 0, 0, 0]` | `[3]` |\n| 4 | `3` | `0, 1, 2, 3` | `3` has no outgoing edges | `[0, 0, 0, 0]` | `[]` |\n\nAll **4 of 4** vertices were removed → no cycle → **`true`**. The single edge `3→1` is what\nflips the answer.\n\n## Java Solution\n\nSee [`CourseSchedule.java`](./CourseSchedule.java).\n\n```java\npublic static boolean canFinish(int n, int[][] edges) {\n    // ... build adjacency list + in-degrees ...\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int v = 0; v < n; v++) {\n        if (inDegree[v] == 0) {\n            queue.add(v);\n        }\n    }\n    int removed = 0;\n    while (!queue.isEmpty()) {\n        int u = queue.poll();\n        removed++;\n        for (int v : adj.get(u)) {\n            if (--inDegree[v] == 0) {\n                queue.add(v);\n            }\n        }\n    }\n    return removed == n;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n + m) | Every vertex is dequeued once, every edge is relaxed once |\n| **Space** | O(n + m) | The adjacency list and the in-degree array |\n\n**Optimal?** Yes — you have to read every edge to be sure there is no cycle.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you also return the order of the courses?"* → yes, see\n  [Course Schedule II](./CourseScheduleII.java).\n- *"What if the graph is undirected?"* → a cycle exists iff `m ≥ n` for a connected component;\n  use Union-Find and check whether any edge joins two vertices that are already connected.\n- *"How would you detect a cycle with DFS instead of BFS?"* → keep a colour per vertex\n  (white/grey/black); finding an edge into a **grey** vertex means a back edge, i.e. a cycle.\n- *"What if there are 10⁹ courses but only 10⁵ prerequisites?"* → only the vertices mentioned in\n  the edges matter; compress the rest away.\n\n**Common mistakes:**\n- ❌ Pushing a vertex into the queue **twice** → decrement the in-degree as you decrement, and\n  only enqueue when it *becomes* zero, not when it *is* zero.\n- ❌ Forgetting that a self-loop (`u → u`) is already a cycle.\n- ❌ Comparing `removed == m` instead of `removed == n` → `m` counts edges, `n` counts vertices.\n\n**How to narrate:**\n> "This is cycle detection in a directed graph, so I\'ll use Kahn\'s algorithm. I compute the\n> in-degrees, seed a queue with the vertices that have no prerequisites, and repeatedly remove\n> one and unlock its neighbours. If I can remove all n vertices the graph was acyclic; if the\n> queue empties early, the vertices left over are trapped in a cycle."\n\n## Related Problems\n\n- [Course Schedule II](./CourseScheduleII.java) — the same algorithm, but return the ordering\n- [Topological Sort](./TopologicalSort.java) — the ordering for an arbitrary directed graph\n- [Alien Dictionary](./AlienDictionary.java) — a precedence graph built from word pairs\n- [Graph Valid Tree](./GraphValidTree.java) — the undirected analogue\n',i=[`canFinish`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};