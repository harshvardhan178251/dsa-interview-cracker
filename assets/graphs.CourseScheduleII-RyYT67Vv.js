var e=`graphs.CourseScheduleII`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Course Schedule II
 * LeetCode: 210 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm with a min-heap
 *
 * <p>Problem: There are {@code n} courses labelled {@code 0..n-1}. Each course is a directed
 * edge {@code u -> v} meaning "course u must be taken before course v". Return <em>any</em>
 * ordering of the courses that respects every prerequisite.
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
 * 1 0
 * 2 0
 * 3 1
 * 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 1 2 0
 * </pre>
 *
 * <p>Approach: Kahn's algorithm again, but the ready set is a {@link PriorityQueue} instead of a
 * FIFO queue. Whenever several courses are simultaneously available we always take the one with
 * the smallest label, which makes the output deterministic (and matches the lexicographically
 * smallest valid ordering).
 *
 * <p>Complexity: Time O(m + n log n), Space O(n + m).
 */
public class CourseScheduleII {

    /**
     * Returns a valid ordering of the courses.
     *
     * @param n     number of courses (vertices {@code 0..n-1})
     * @param edges prerequisite pairs {@code {u, v}} meaning "u before v"
     * @return the ordering, or an empty array when the graph has a cycle
     */
    public static int[] findOrder(int n, int[][] edges) {
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
        int taken = 0;
        while (!ready.isEmpty()) {
            int u = ready.poll();
            order[taken++] = u;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    ready.add(v);
                }
            }
        }
        // taken < n means a cycle blocked at least one course.
        return taken == n ? order : new int[0];
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

        int[] order = findOrder(n, edges);
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
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.PriorityQueue;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Course Schedule II
 * LeetCode: 210 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm with a min-heap
 *
 * <p>Problem: There are {@code n} courses labelled {@code 0..n-1}. Each course is a directed
 * edge {@code u -> v} meaning "course u must be taken before course v". Return <em>any</em>
 * ordering of the courses that respects every prerequisite.
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
 * 1 0
 * 2 0
 * 3 1
 * 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 1 2 0
 * </pre>
 *
 * <p>Approach: Kahn's algorithm again, but the ready set is a {@link PriorityQueue} instead of a
 * FIFO queue. Whenever several courses are simultaneously available we always take the one with
 * the smallest label, which makes the output deterministic (and matches the lexicographically
 * smallest valid ordering).
 *
 * <p>Complexity: Time O(m + n log n), Space O(n + m).
 */
public class Main {

    /**
     * Returns a valid ordering of the courses.
     *
     * @param n     number of courses (vertices {@code 0..n-1})
     * @param edges prerequisite pairs {@code {u, v}} meaning "u before v"
     * @return the ordering, or an empty array when the graph has a cycle
     */
    public static int[] findOrder(int n, int[][] edges) {
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
        int taken = 0;
        while (!ready.isEmpty()) {
            int u = ready.poll();
            order[taken++] = u;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    ready.add(v);
                }
            }
        }
        // taken < n means a cycle blocked at least one course.
        return taken == n ? order : new int[0];
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

        int[] order = findOrder(n, edges);
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
`,r=`
# Course Schedule II — LeetCode 210

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Topological sort · Min-heap |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

There are \`n\` courses numbered \`0 … n-1\`. Every course is a directed edge \`u → v\` meaning
*"course \`u\` must be taken before course \`v\`*.

Return **any** ordering of all courses that respects every prerequisite. If no such ordering
exists the answer is \`-1\`.

## Input Format

The program reads a directed graph given as an **edge list**:

\`\`\`
n m
u1 v1
u2 v2
...
um vm
\`\`\`

- \`n\` — number of courses / vertices (\`1 ≤ n ≤ 10⁵\`)
- \`m\` — number of prerequisite pairs (\`0 ≤ m ≤ 10⁵\`)
- \`m\` lines, each with two integers \`u v\` in \`0 … n-1\`: the edge \`u → v\`

## Sample Input

\`\`\`
4 4
1 0
2 0
3 1
3 2
\`\`\`

## Expected Output

\`\`\`
3 1 2 0
\`\`\`

Course \`3\` has no prerequisites, then \`1\` and \`2\` unlock, then \`0\`.

## Approach — Kahn's algorithm with a min-heap

The skeleton is exactly [Course Schedule](./CourseSchedule.java): compute in-degrees, seed a queue
with the vertices whose in-degree is \`0\`, and repeatedly unlock neighbours.

The one change is the **ready set**. With a plain FIFO queue the output depends on the order the
edges were read. With a \`PriorityQueue\` we always emit the **smallest available course number**,
which:

- makes the output deterministic — the same input always prints the same ordering;
- happens to be the *lexicographically smallest* valid ordering, a property interviewers like.

The heap costs \`O(log n)\` per operation instead of \`O(1)\`, so the total is \`O(m + n log n)\`.

## Dry Run

Edges: \`1→0\`, \`2→0\`, \`3→1\`, \`3→2\`

In-degrees: \`[0, 2, 1, 1]\` (vertex \`0\` needs both \`1\` and \`2\`).

| Step | Pop | \`order\` so far | Edges relaxed | In-degree after | Ready (min-heap) |
|---:|---|---|---|---|---|
| 0 | — | \`[]\` | — | \`[0, 2, 1, 1]\` | \`[3]\` |
| 1 | \`3\` | \`[3]\` | \`3→1\`: 1→0 · \`3→2\`: 1→0 | \`[0, 1, 0, 1]\` | \`[1, 2]\` |
| 2 | \`1\` | \`[3, 1]\` | \`1→0\`: 2→1 | \`[0, 1, 0, 1]\` | \`[2]\` |
| 3 | \`2\` | \`[3, 1, 2]\` | \`2→0\`: 1→0 → unlock \`0\` | \`[0, 0, 0, 1]\` | \`[0]\` |
| 4 | \`0\` | \`[3, 1, 2, 0]\` | — | \`[0, 0, 0, 1]\` | \`[]\` |

All four courses were emitted → the ordering is **\`3 1 2 0\`**.

## Java Solution

See [\`CourseScheduleII.java\`](./CourseScheduleII.java).

\`\`\`java
public static int[] findOrder(int n, int[][] edges) {
    // ... build adjacency list + in-degrees ...
    PriorityQueue<Integer> ready = new PriorityQueue<>();
    for (int v = 0; v < n; v++) {
        if (inDegree[v] == 0) {
            ready.add(v);
        }
    }
    int[] order = new int[n];
    int taken = 0;
    while (!ready.isEmpty()) {
        int u = ready.poll();
        order[taken++] = u;
        for (int v : adj.get(u)) {
            if (--inDegree[v] == 0) {
                ready.add(v);
            }
        }
    }
    return taken == n ? order : new int[0];
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m + n log n) | Each edge is relaxed once; each vertex enters and leaves the heap once |
| **Space** | O(n + m) | Adjacency list, in-degrees, heap and the result array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do we really need the min-heap?"* → no. A FIFO queue gives a valid order in O(n + m); the
  heap buys determinism and the lexicographically smallest order, not correctness.
- *"How do you detect that no ordering exists?"* → if fewer than \`n\` vertices were emitted, a
  cycle blocked the rest.
- *"What if the graph is huge and you cannot hold it in memory?"* → keep only the in-degree
  array and the edges, and re-scan the edges in each round (that is Bellman-Ford style, O(n·m)).
- *"Give me the ordering that minimises the number of parallel courses."* → that is a scheduling
  problem (list scheduling with a priority queue); mention it as a follow-up.

**Common mistakes:**
- ❌ Using a \`HashSet\` for the ready set → the output order becomes non-deterministic.
- ❌ Returning a partially filled array when a cycle exists → the caller cannot tell a valid
  order from a truncated one; return an empty array / \`-1\`.
- ❌ Decrementing in-degrees while iterating the same array you are comparing against → use a
  copy of the in-degree array when you need the "before" state.

**How to narrate:**
> "Same Kahn's algorithm as Course Schedule, but instead of a FIFO queue I'll keep the ready
> courses in a min-heap. Whenever several courses are unlocked I always take the smallest
> number, which makes the output deterministic and lexicographically smallest. If I emit fewer
> than n courses there was a cycle and I return -1."

## Related Problems

- [Course Schedule](./CourseSchedule.java) — the boolean version of the same idea
- [Topological Sort](./TopologicalSort.java) — the ordering for a general directed graph
- [Reconstruct Itinerary](./ReconstructItinerary.java) — Hierholzer's algorithm, a topological order
  with a much stronger constraint
- [Alien Dictionary](./AlienDictionary.java) — a precedence graph built from word pairs
`,i=[`findOrder`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};