var e=`advancedgraphs.PrimMinimumSpanningTree`,t=`package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Prim's Minimum Spanning Tree
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prim, greedy, priority queue
 *
 * <p>Problem: Given an undirected, weighted graph, find the total weight of a minimum spanning
 * tree. Return {@code -1} when the graph is disconnected and no spanning tree exists.
 *
 * <p>Input format (stdin) — an <b>undirected</b>, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 5
 * 0 1 3
 * 1 2 4
 * 0 2 2
 * 2 3 5
 * 1 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: grow one tree outwards from vertex 0. At every step we take the cheapest edge
 * that connects the tree to a vertex outside it — a min-heap of candidate edges gives us exactly
 * that. Every edge taken crosses the cut between "in the tree" and "outside the tree", which is
 * what makes the greedy choice safe.
 *
 * <p>Complexity: Time O(m log m), Space O(n + m).
 */
public class PrimMinimumSpanningTree {

    /**
     * Total weight of a minimum spanning tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected weighted edges {@code {u, v, weight}}
     * @return the MST weight, {@code -1} when the graph is disconnected
     */
    public static int mstWeight(int n, int[][] edges) {
        if (n <= 1) {
            return 0;
        }
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(new int[]{edge[1], edge[2]});
            adj.get(edge[1]).add(new int[]{edge[0], edge[2]});
        }

        boolean[] inTree = new boolean[n];
        // entries are {weight, target}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));

        inTree[0] = true;
        for (int[] edge : adj.get(0)) {
            heap.add(new int[]{edge[1], edge[0]});
        }

        int total = 0;
        int taken = 0;
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int v = top[1];
            if (inTree[v]) {
                continue; // the far end is already in the tree
            }
            inTree[v] = true;
            total += top[0];
            taken++;
            for (int[] edge : adj.get(v)) {
                if (!inTree[edge[0]]) {
                    heap.add(new int[]{edge[1], edge[0]});
                }
            }
        }
        return taken == n - 1 ? total : -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
            edges[i][2] = fs.nextInt();
        }

        System.out.println(mstWeight(n, edges));
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
 * Problem: Prim's Minimum Spanning Tree
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prim, greedy, priority queue
 *
 * <p>Problem: Given an undirected, weighted graph, find the total weight of a minimum spanning
 * tree. Return {@code -1} when the graph is disconnected and no spanning tree exists.
 *
 * <p>Input format (stdin) — an <b>undirected</b>, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 5
 * 0 1 3
 * 1 2 4
 * 0 2 2
 * 2 3 5
 * 1 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: grow one tree outwards from vertex 0. At every step we take the cheapest edge
 * that connects the tree to a vertex outside it — a min-heap of candidate edges gives us exactly
 * that. Every edge taken crosses the cut between "in the tree" and "outside the tree", which is
 * what makes the greedy choice safe.
 *
 * <p>Complexity: Time O(m log m), Space O(n + m).
 */
public class Main {

    /**
     * Total weight of a minimum spanning tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected weighted edges {@code {u, v, weight}}
     * @return the MST weight, {@code -1} when the graph is disconnected
     */
    public static int mstWeight(int n, int[][] edges) {
        if (n <= 1) {
            return 0;
        }
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(new int[]{edge[1], edge[2]});
            adj.get(edge[1]).add(new int[]{edge[0], edge[2]});
        }

        boolean[] inTree = new boolean[n];
        // entries are {weight, target}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));

        inTree[0] = true;
        for (int[] edge : adj.get(0)) {
            heap.add(new int[]{edge[1], edge[0]});
        }

        int total = 0;
        int taken = 0;
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int v = top[1];
            if (inTree[v]) {
                continue; // the far end is already in the tree
            }
            inTree[v] = true;
            total += top[0];
            taken++;
            for (int[] edge : adj.get(v)) {
                if (!inTree[edge[0]]) {
                    heap.add(new int[]{edge[1], edge[0]});
                }
            }
        }
        return taken == n - 1 ? total : -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
            edges[i][2] = fs.nextInt();
        }

        System.out.println(mstWeight(n, edges));
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
# Prim's Minimum Spanning Tree

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Priority queue |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given an undirected, weighted graph, find the total weight of a **minimum spanning tree**.
Return \`-1\` when the graph is disconnected.

## Input Format

The program reads an **undirected**, weighted graph given as an **edge list**:

\`\`\`
n m
u1 v1 w1
u2 v2 w2
...
um vm wm
\`\`\`

- \`n\` — number of vertices, numbered \`0 … n-1\`
- \`m\` — number of undirected edges
- \`m\` lines, each with three integers \`u v w\`: the undirected edge \`u — v\` with weight \`w\`

## Sample Input

\`\`\`
4 5
0 1 3
1 2 4
0 2 2
2 3 5
1 3 1
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

The MST is \`1—3 (1)\`, \`0—2 (2)\`, \`0—1 (3)\` — total weight **6**.

## Approach — grow one tree outwards

Prim's algorithm keeps a single growing tree instead of a forest:

1. Put vertex \`0\` into the tree and push all its edges into a min-heap.
2. Repeatedly take the **cheapest** edge in the heap. If its far end is already in the tree, skip
   it; otherwise add that vertex to the tree, add the edge's weight to the total, and push the
   new vertex's edges.
3. Stop when every vertex is in the tree. If the heap empties early, the graph is disconnected.

**Why the greedy choice is safe (the cut property).** At every moment the tree's vertex set and
its complement form a cut. Every edge in the heap crosses that cut, and the heap always offers
the **cheapest** crossing edge. The cut property says the cheapest edge crossing any cut belongs
to *some* MST — so committing to it is safe.

**Kruskal vs Prim.** Both compute the same MST weight; they differ in the order they accept
edges (Kruskal by global weight, Prim by proximity to the growing tree).

## Dry Run

| Step | Pop (weight, vertex) | Far end in the tree? | Action | Tree vertices | Heap after | Total |
|---:|---|---|---|---|---|---:|
| 0 | — | — | seed the tree with \`{0}\`, push \`0\`'s edges | \`{0}\` | \`[(2,2), (3,1)]\` | 0 |
| 1 | \`(2, 2)\` | no | add vertex \`2\`, push \`2\`'s edges to \`1\`(4) and \`3\`(5) | \`{0, 2}\` | \`[(3,1), (4,2), (5,3)]\` | 2 |
| 2 | \`(3, 1)\` | no | add vertex \`1\`, push \`1\`'s edges to \`3\`(1) | \`{0, 1, 2}\` | \`[(1,3), (4,2), (5,3)]\` | 5 |
| 3 | \`(1, 3)\` | no | add vertex \`3\` — the tree is complete | \`{0, 1, 2, 3}\` | \`[(4,2), (5,3)]\` | **6** |
| 4 | \`(4, 2)\` | yes (2 is in the tree) | skip | — | \`[(5,3)]\` | 6 |
| 5 | \`(5, 3)\` | yes (3 is in the tree) | skip | — | \`[]\` | 6 |

3 vertices added → \`n - 1\` edges → total weight **\`6\`**.

## Java Solution

See [\`PrimMinimumSpanningTree.java\`](./PrimMinimumSpanningTree.java).

\`\`\`java
public static int mstWeight(int n, int[][] edges) {
    boolean[] inTree = new boolean[n];
    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
    inTree[0] = true;
    for (int[] edge : adj.get(0)) {
        heap.add(new int[]{edge[1], edge[0]}); // {weight, target}
    }
    int total = 0;
    int taken = 0;
    while (!heap.isEmpty()) {
        int[] top = heap.poll();
        int v = top[1];
        if (inTree[v]) {
            continue;
        }
        inTree[v] = true;
        total += top[0];
        taken++;
        for (int[] edge : adj.get(v)) {
            if (!inTree[edge[0]]) {
                heap.add(new int[]{edge[1], edge[0]});
            }
        }
    }
    return taken == n - 1 ? total : -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log n) | Every edge enters and leaves the heap once |
| **Space** | O(n + m) | Adjacency list, heap and the "in tree" flags |

## Interview Notes

**Follow-ups to raise yourself:**
- *"When would you use Prim over Kruskal?"* → dense graphs (Prim's O(n²) version with an
  adjacency matrix is O(n²) and beats Kruskal's O(m log m) when \`m ≈ n²\`); Prim is also nicer
  for streaming, because you only need the edges of the current frontier.
- *"Can Prim handle negative weights?"* → yes, unlike Dijkstra there is no problem with
  negative edges in a minimum spanning tree.
- *"What does the algorithm return for a disconnected graph?"* → a minimum spanning **forest**;
  report the weight of each component separately.
- *"How do you get the edges and not just the weight?"* → record the edge that accepted each new
  vertex.

**Common mistakes:**
- ❌ Accepting a heap entry whose far end is already in the tree → you double-count that edge
  and the total is too big.
- ❌ Forgetting to push the new vertex's edges → the BFS/DFS never expands past the first
  vertex.
- ❌ Not checking the final vertex count → a disconnected graph silently returns a partial total.

**How to narrate:**
> "Prim grows one tree from vertex 0. I keep a min-heap of the edges that cross from the tree to
> the outside; each step I take the cheapest one, and if its far end is already in the tree I
> skip it, otherwise I add the vertex and push its edges. The greedy step is safe by the cut
> property: the cheapest edge crossing the cut between the tree and the rest belongs to some
> MST."

## Related Problems

- [Kruskal's Minimum Spanning Tree](./KruskalMinimumSpanningTree.java)
- [Minimum Spanning Tree](./MinimumSpanningTree.java)
- [Dijkstra's Shortest Path](./DijkstraShortestPath.java) —
  the same heap, a different objective
- [Network Delay Time](../graphs/NetworkDelayTime.java)
`,i=[`mstWeight`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};