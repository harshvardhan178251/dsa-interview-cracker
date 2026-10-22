var e=`graphs.NetworkDelayTime`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Network Delay Time
 * LeetCode: 743 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dijkstra, shortest path
 *
 * <p>Problem: A weighted, directed network is given. Every edge {@code (u, v, w)} means a message
 * travels from {@code u} to {@code v} in {@code w} milliseconds. Starting from a source node,
 * return the time it takes for the message to reach <em>every</em> node, i.e. the largest
 * shortest-path distance. Return {@code -1} if some node can never be reached.
 *
 * <p>Input format (stdin) — a directed, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * source
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 0 1 3
 * 1 2 4
 * 0 3 2
 * 3 2 1
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Dijkstra with a min-heap. All edge weights are non-negative, so the first time we
 * settle a vertex its distance is final.
 *
 * <p>Complexity: Time O(m log n), Space O(n + m).
 */
public class NetworkDelayTime {

    /**
     * Largest shortest-path distance from {@code source}, or {@code -1} when some node is
     * unreachable.
     *
     * @param n      number of nodes {@code 0..n-1}
     * @param times  directed edges {@code {u, v, weight}}
     * @param source the starting node
     * @return the network delay in milliseconds, {@code -1} if not all nodes are reachable
     */
    public static int networkDelayTime(int n, int[][] times, int source) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : times) {
            adj.get(edge[0]).add(new int[]{edge[1], edge[2]});
        }

        int[] dist = new int[n];
        for (int i = 0; i < n; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[source] = 0;

        // entries are {distance, node}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.add(new int[]{0, source});

        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int currentDist = top[0];
            int u = top[1];
            if (currentDist > dist[u]) {
                continue; // stale heap entry
            }
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int newDist = currentDist + edge[1];
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    heap.add(new int[]{newDist, v});
                }
            }
        }

        int answer = 0;
        for (int d : dist) {
            if (d == Integer.MAX_VALUE) {
                return -1;
            }
            answer = Math.max(answer, d);
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] times = new int[m][3];
        for (int i = 0; i < m; i++) {
            times[i][0] = fs.nextInt();
            times[i][1] = fs.nextInt();
            times[i][2] = fs.nextInt();
        }
        int source = fs.nextInt();

        System.out.println(networkDelayTime(n, times, source));
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
 * Problem: Network Delay Time
 * LeetCode: 743 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dijkstra, shortest path
 *
 * <p>Problem: A weighted, directed network is given. Every edge {@code (u, v, w)} means a message
 * travels from {@code u} to {@code v} in {@code w} milliseconds. Starting from a source node,
 * return the time it takes for the message to reach <em>every</em> node, i.e. the largest
 * shortest-path distance. Return {@code -1} if some node can never be reached.
 *
 * <p>Input format (stdin) — a directed, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * source
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 0 1 3
 * 1 2 4
 * 0 3 2
 * 3 2 1
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Dijkstra with a min-heap. All edge weights are non-negative, so the first time we
 * settle a vertex its distance is final.
 *
 * <p>Complexity: Time O(m log n), Space O(n + m).
 */
public class Main {

    /**
     * Largest shortest-path distance from {@code source}, or {@code -1} when some node is
     * unreachable.
     *
     * @param n      number of nodes {@code 0..n-1}
     * @param times  directed edges {@code {u, v, weight}}
     * @param source the starting node
     * @return the network delay in milliseconds, {@code -1} if not all nodes are reachable
     */
    public static int networkDelayTime(int n, int[][] times, int source) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : times) {
            adj.get(edge[0]).add(new int[]{edge[1], edge[2]});
        }

        int[] dist = new int[n];
        for (int i = 0; i < n; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[source] = 0;

        // entries are {distance, node}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.add(new int[]{0, source});

        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int currentDist = top[0];
            int u = top[1];
            if (currentDist > dist[u]) {
                continue; // stale heap entry
            }
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int newDist = currentDist + edge[1];
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    heap.add(new int[]{newDist, v});
                }
            }
        }

        int answer = 0;
        for (int d : dist) {
            if (d == Integer.MAX_VALUE) {
                return -1;
            }
            answer = Math.max(answer, d);
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] times = new int[m][3];
        for (int i = 0; i < m; i++) {
            times[i][0] = fs.nextInt();
            times[i][1] = fs.nextInt();
            times[i][2] = fs.nextInt();
        }
        int source = fs.nextInt();

        System.out.println(networkDelayTime(n, times, source));
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
# Network Delay Time — LeetCode 743

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dijkstra · Shortest path |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A weighted, directed network is given. Every edge \`(u, v, w)\` means a message travels from \`u\`
to \`v\` in \`w\` milliseconds.

Starting from a source node, return the time it takes for the message to reach **every** node —
that is, the **largest** shortest-path distance from the source. Return \`-1\` if some node can
never be reached.

## Input Format

The program reads a directed, weighted graph given as an **edge list**:

\`\`\`
n m
u1 v1 w1
u2 v2 w2
...
um vm wm
source
\`\`\`

- \`n\` — number of nodes, numbered \`0 … n-1\`
- \`m\` — number of directed edges
- \`m\` lines, each with three integers \`u v w\`: the edge \`u → v\` with weight \`w\` (all \`w ≥ 1\`)
- \`source\` — the node the message starts from

## Sample Input

\`\`\`
4 4
0 1 3
1 2 4
0 3 2
3 2 1
0
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

Distances from \`0\`: \`[0, 3, 3, 2]\` — node \`2\` is reached through \`0 → 3 → 2\` (cost 3) rather
than \`0 → 1 → 2\` (cost 7). The largest distance is **3**.

## Approach — Dijkstra with a min-heap

All weights are non-negative, so Dijkstra applies:

1. \`dist[source] = 0\`, everything else \`∞\`.
2. Push \`(distance, vertex)\` pairs into a min-heap.
3. Pop the smallest. If the popped distance is **larger** than the current \`dist\` of that vertex,
   the entry is stale (a better path was found later) → skip it.
4. Otherwise relax every outgoing edge: if \`dist[u] + w < dist[v]\`, update \`dist[v]\` and push
   the new pair.
5. When the heap is empty the distances are final. Take the maximum, or return \`-1\` if some node
   still holds \`∞\`.

**Why the stale-entry check matters.** A vertex can be pushed several times (once per improving
path). Without the check we would relax its edges again — the answers stay correct but the work
is duplicated. With the check each vertex is *expanded* exactly once.

## Dry Run

| Step | Pop (dist, node) | Relaxations | \`dist\` after | Heap after |
|---:|---|---|---|---|
| 0 | — | — | \`[0, ∞, ∞, ∞]\` | \`[(0,0)]\` |
| 1 | \`(0, 0)\` | \`0→1\`: 0+3=3 < ∞ → \`dist[1]=3\` · \`0→3\`: 0+2=2 < ∞ → \`dist[3]=2\` | \`[0, 3, ∞, 2]\` | \`[(2,3), (3,1)]\` |
| 2 | \`(2, 3)\` | \`3→2\`: 2+1=3 < ∞ → \`dist[2]=3\` | \`[0, 3, 3, 2]\` | \`[(3,1), (3,2)]\` |
| 3 | \`(3, 1)\` | \`1→2\`: 3+4=7 > 3 → no change | \`[0, 3, 3, 2]\` | \`[(3,2)]\` |
| 4 | \`(3, 2)\` | \`2\` has no outgoing edges | \`[0, 3, 3, 2]\` | \`[]\` |

Final distances \`[0, 3, 3, 2]\`, the maximum is **\`3\`**.

## Java Solution

See [\`NetworkDelayTime.java\`](./NetworkDelayTime.java).

\`\`\`java
public static int networkDelayTime(int n, int[][] times, int source) {
    // ... build adjacency list ...
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[source] = 0;
    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
    heap.add(new int[]{0, source});
    while (!heap.isEmpty()) {
        int[] top = heap.poll();
        if (top[0] > dist[top[1]]) {
            continue; // stale entry
        }
        for (int[] edge : adj.get(top[1])) {
            int candidate = top[0] + edge[1];
            if (candidate < dist[edge[0]]) {
                dist[edge[0]] = candidate;
                heap.add(new int[]{candidate, edge[0]});
            }
        }
    }
    // ... take the maximum, or -1 if some node is unreachable ...
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log n) | Each edge is relaxed at most once per settled vertex; each heap operation is O(log m) |
| **Space** | O(n + m) | Adjacency list, distance array, heap |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the weights can be negative?"* → Dijkstra breaks (it relies on non-negativity);
  use Bellman-Ford, see [Bellman-Ford](../advancedgraphs/BellmanFord.java).
- *"What if we need the paths, not just the distances?"* → store a parent array and walk it back.
- *"What if the graph is huge and mostly unreachable?"* → run Dijkstra only on the reachable
  component; the unreachable nodes are detected by \`dist == ∞\`.
- *"How would you handle a time-dependent edge?"* → that is a time-dependent Dijkstra; relax
  with \`arrivalTime = max(currentTime, edge.openTime) + edge.duration\`.

**Common mistakes:**
- ❌ Forgetting the **stale entry** check → duplicated work, and worse, wrong answers if you
  expand a vertex with a non-final distance.
- ❌ Using a \`HashSet\` of visited vertices instead of comparing distances → the classic Dijkstra
  bug: a vertex must be allowed to be re-relaxed.
- ❌ Returning the distance to the *farthest node by edge count* instead of by weight.

**How to narrate:**
> "This is single-source shortest path with non-negative weights, so I'll use Dijkstra with a
> min-heap. I keep a distance array, relax edges when I pop the cheapest vertex, and skip stale
> heap entries whose distance is worse than what I already know. At the end I take the maximum
> distance; if any node is still at infinity the network is not fully connected and I return -1."

## Related Problems

- [Dijkstra's Shortest Path](../advancedgraphs/DijkstraShortestPath.java) —
  the full single-source algorithm
- [Cheapest Flights Within K Stops](./CheapestFlightsWithinKStops.java) — Bellman-Ford with a hop budget
- [Reconstruct Itinerary](./ReconstructItinerary.java) — Hierholzer's algorithm on flights
- [Prim's Minimum Spanning Tree](../advancedgraphs/PrimMinimumSpanningTree.java) — a min-heap over a weighted graph
`,i=[`networkDelayTime`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};