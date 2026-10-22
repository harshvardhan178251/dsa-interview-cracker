var e=`graphs.ReconstructItinerary`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Reconstruct Itinerary
 * LeetCode: 332 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Hierholzer's algorithm, Eulerian path, reverse post-order
 *
 * <p>Problem: Airports are numbered {@code 0..n-1}. Every ticket {@code (u, v)} is a directed
 * flight from {@code u} to {@code v}; a ticket may be used only once. Reconstruct the itinerary
 * that uses every ticket exactly once. When several flights leave the same airport, take the one
 * with the smallest destination first.
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
 * 5 4
 * 1 2
 * 0 1
 * 3 4
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 2 3 4
 * </pre>
 *
 * <p>Approach: the itinerary is an Eulerian path — a walk that uses every edge exactly once.
 * Hierholzer's algorithm finds it: walk greedily, but instead of printing a vertex as soon as
 * you reach it, push it onto a stack and only add it to the answer when it has no outgoing
 * flights left. Reversing that list yields the itinerary. Neighbours are kept in a min-heap so
 * the greedy choice is "smallest destination first".
 *
 * <p>Complexity: Time O(m log n), Space O(n + m).
 */
public class ReconstructItinerary {

    /**
     * Reconstructs the itinerary that uses every ticket exactly once.
     *
     * @param n     number of airports {@code 0..n-1}
     * @param edges directed flights {@code {from, to}}
     * @return the itinerary, or an empty array when no itinerary uses every ticket
     */
    public static int[] reconstructItinerary(int n, int[][] edges) {
        List<PriorityQueue<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new PriorityQueue<>());
        }
        int[] inDegree = new int[n];
        int[] outDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            outDegree[edge[0]]++;
            inDegree[edge[1]]++;
        }

        // Degree check: an Eulerian path has either all vertices balanced, or exactly one
        // vertex with one extra outgoing flight (the start) and one with one extra incoming
        // flight (the end). Any other pattern means no itinerary can exist.
        int starts = 0;
        int ends = 0;
        for (int v = 0; v < n; v++) {
            int diff = outDegree[v] - inDegree[v];
            if (diff == 1) {
                starts++;
            } else if (diff == -1) {
                ends++;
            } else if (diff != 0) {
                return new int[0]; // more than one extra outgoing or incoming flight
            }
        }
        if (starts != ends) {
            return new int[0];
        }

        // The start is the airport with one more outgoing than incoming flight.
        int start = -1;
        for (int v = 0; v < n; v++) {
            if (outDegree[v] - inDegree[v] == 1) {
                start = v;
                break;
            }
        }
        if (start == -1) {
            // Eulerian circuit: start at the smallest airport that has a departing flight.
            for (int v = 0; v < n; v++) {
                if (!adj.get(v).isEmpty()) {
                    start = v;
                    break;
                }
            }
        }
        if (start == -1) {
            return new int[0];
        }

        // Every airport that carries a flight has to be in the same (undirected) component.
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        int component = -1;
        for (int v = 0; v < n; v++) {
            if (outDegree[v] == 0 && inDegree[v] == 0) {
                continue;
            }
            int root = uf.find(v);
            if (component == -1) {
                component = root;
            } else if (component != root) {
                return new int[0]; // the flights are split over several components
            }
        }

        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> reversed = new ArrayList<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int v = stack.peek();
            if (adj.get(v).isEmpty()) {
                reversed.add(stack.pop()); // dead end: flush the vertex into the answer
            } else {
                stack.push(adj.get(v).poll());
            }
        }
        Collections.reverse(reversed);

        if (reversed.size() != edges.length + 1) {
            return new int[0]; // some tickets could not be used
        }
        int[] itinerary = new int[reversed.size()];
        for (int i = 0; i < reversed.size(); i++) {
            itinerary[i] = reversed.get(i);
        }
        return itinerary;
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

        int[] itinerary = reconstructItinerary(n, edges);
        if (itinerary.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < itinerary.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(itinerary[i]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.util.PriorityQueue;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Reconstruct Itinerary
 * LeetCode: 332 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Hierholzer's algorithm, Eulerian path, reverse post-order
 *
 * <p>Problem: Airports are numbered {@code 0..n-1}. Every ticket {@code (u, v)} is a directed
 * flight from {@code u} to {@code v}; a ticket may be used only once. Reconstruct the itinerary
 * that uses every ticket exactly once. When several flights leave the same airport, take the one
 * with the smallest destination first.
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
 * 5 4
 * 1 2
 * 0 1
 * 3 4
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 2 3 4
 * </pre>
 *
 * <p>Approach: the itinerary is an Eulerian path — a walk that uses every edge exactly once.
 * Hierholzer's algorithm finds it: walk greedily, but instead of printing a vertex as soon as
 * you reach it, push it onto a stack and only add it to the answer when it has no outgoing
 * flights left. Reversing that list yields the itinerary. Neighbours are kept in a min-heap so
 * the greedy choice is "smallest destination first".
 *
 * <p>Complexity: Time O(m log n), Space O(n + m).
 */
public class Main {

    /**
     * Reconstructs the itinerary that uses every ticket exactly once.
     *
     * @param n     number of airports {@code 0..n-1}
     * @param edges directed flights {@code {from, to}}
     * @return the itinerary, or an empty array when no itinerary uses every ticket
     */
    public static int[] reconstructItinerary(int n, int[][] edges) {
        List<PriorityQueue<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new PriorityQueue<>());
        }
        int[] inDegree = new int[n];
        int[] outDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            outDegree[edge[0]]++;
            inDegree[edge[1]]++;
        }

        // Degree check: an Eulerian path has either all vertices balanced, or exactly one
        // vertex with one extra outgoing flight (the start) and one with one extra incoming
        // flight (the end). Any other pattern means no itinerary can exist.
        int starts = 0;
        int ends = 0;
        for (int v = 0; v < n; v++) {
            int diff = outDegree[v] - inDegree[v];
            if (diff == 1) {
                starts++;
            } else if (diff == -1) {
                ends++;
            } else if (diff != 0) {
                return new int[0]; // more than one extra outgoing or incoming flight
            }
        }
        if (starts != ends) {
            return new int[0];
        }

        // The start is the airport with one more outgoing than incoming flight.
        int start = -1;
        for (int v = 0; v < n; v++) {
            if (outDegree[v] - inDegree[v] == 1) {
                start = v;
                break;
            }
        }
        if (start == -1) {
            // Eulerian circuit: start at the smallest airport that has a departing flight.
            for (int v = 0; v < n; v++) {
                if (!adj.get(v).isEmpty()) {
                    start = v;
                    break;
                }
            }
        }
        if (start == -1) {
            return new int[0];
        }

        // Every airport that carries a flight has to be in the same (undirected) component.
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        int component = -1;
        for (int v = 0; v < n; v++) {
            if (outDegree[v] == 0 && inDegree[v] == 0) {
                continue;
            }
            int root = uf.find(v);
            if (component == -1) {
                component = root;
            } else if (component != root) {
                return new int[0]; // the flights are split over several components
            }
        }

        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> reversed = new ArrayList<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int v = stack.peek();
            if (adj.get(v).isEmpty()) {
                reversed.add(stack.pop()); // dead end: flush the vertex into the answer
            } else {
                stack.push(adj.get(v).poll());
            }
        }
        Collections.reverse(reversed);

        if (reversed.size() != edges.length + 1) {
            return new int[0]; // some tickets could not be used
        }
        int[] itinerary = new int[reversed.size()];
        for (int i = 0; i < reversed.size(); i++) {
            itinerary[i] = reversed.get(i);
        }
        return itinerary;
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

        int[] itinerary = reconstructItinerary(n, edges);
        if (itinerary.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < itinerary.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(itinerary[i]);
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

// ---------- inlined com.dsa.utils.UnionFind ----------
/**
 * Disjoint Set Union with union by rank and path compression.
 *
 * <p>Used by the Kruskal minimum-spanning-tree and redundant-connection problems.
 */
class UnionFind {

    private final int[] parent;
    private final int[] rank;
    private int components;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        components = n;
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    /** Representative of the set containing {@code x}. */
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    /** Merges the sets of {@code a} and {@code b}; returns false if already merged. */
    public boolean union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        if (rootA == rootB) {
            return false;
        }
        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }
        components--;
        return true;
    }

    public boolean connected(int a, int b) {
        return find(a) == find(b);
    }

    /** Number of disjoint sets remaining. */
    public int components() {
        return components;
    }
}
`,r=`
# Reconstruct Itinerary — LeetCode 332

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Hierholzer's algorithm · Eulerian path |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Airports are numbered \`0 … n-1\`. Every ticket \`(u, v)\` is a directed flight from \`u\` to \`v\`; a
ticket may be used **exactly once**. Reconstruct the itinerary that uses **every ticket exactly
once**.

When several flights leave the same airport, take the one with the **smallest destination**
first.

> LeetCode's statement uses three-letter airport codes. Here the airports are plain vertex
> numbers so that every graph problem in this repository shares the same input format — the
> original example is \`JFK → MUC → LHR → SFO → SJC\`, i.e. \`0 1 2 3 4\` in this encoding.

## Input Format

The program reads a directed graph given as an **edge list**:

\`\`\`
n m
u1 v1
u2 v2
...
um vm
\`\`\`

- \`n\` — number of airports, numbered \`0 … n-1\`
- \`m\` — number of tickets (directed edges)
- \`m\` lines, each with two integers \`u v\` in \`0 … n-1\`: the flight \`u → v\`

## Sample Input

\`\`\`
5 4
1 2
0 1
3 4
2 3
\`\`\`

## Expected Output

\`\`\`
0 1 2 3 4
\`\`\`

The flights are \`1→2\`, \`0→1\`, \`3→4\`, \`2→3\` — the chain \`0 → 1 → 2 → 3 → 4\` uses all four
tickets exactly once.

## Approach — Hierholzer's algorithm

The itinerary is an **Eulerian path**: a walk that uses every edge exactly once.

**Finding the start.** In an Eulerian path exactly one vertex has one more outgoing than
incoming edge (the start) and exactly one has one more incoming (the end); every other vertex is
balanced. If all vertices are balanced the graph has an Eulerian *circuit* and we may start
anywhere — we pick the smallest airport with a departing flight.

Before walking, the program also rejects the two impossible degree patterns (a vertex with more
than one extra outgoing/incoming flight, or a start without an end) and checks that every
airport carrying a flight is in the same component — a {@link com.dsa.utils.UnionFind} over the
edges does that in one pass. Without those checks a graph such as \`0→1, 0→2\` would produce a
walk that uses only one of the two tickets and silently claim to be a valid itinerary.

**Building the path.** The naive greedy walk ("always take the lexicographically smallest next
flight") can dead-end in the middle of the graph and strand tickets. Hierholzer's fix is to
*not* commit to the path as you go:

- Keep a **stack** of the current route.
- If the top vertex still has an outgoing edge, remove the smallest one and push its target.
- If the top vertex has **no** outgoing edge left, pop it and append it to the answer.
- Reverse the answer at the end.

The vertices are appended **when they become dead ends**, which is what puts them back into the
right order. Each edge is used exactly once, so the whole thing is linear.

## Dry Run

Edges: \`1→2\`, \`0→1\`, \`3→4\`, \`2→3\`.

In-degrees: \`[0, 1, 1, 1, 1]\`; out-degrees: \`[1, 1, 1, 1, 0]\`.
\`out − in\` = \`[+1, 0, 0, 0, −1]\` → **start = 0**, end = 4.

| Step | Stack (top → bottom) | Action | Answer (reversed) |
|---:|---|---|---|
| 0 | \`[0]\` | push the start | \`[]\` |
| 1 | \`[0, 1]\` | \`0\` has edge \`0→1\` → pop it, push \`1\` | \`[]\` |
| 2 | \`[0, 1, 2]\` | \`1\` has edge \`1→2\` → pop it, push \`2\` | \`[]\` |
| 3 | \`[0, 1, 2, 3]\` | \`2\` has edge \`2→3\` → pop it, push \`3\` | \`[]\` |
| 4 | \`[0, 1, 2, 3, 4]\` | \`3\` has edge \`3→4\` → pop it, push \`4\` | \`[]\` |
| 5 | \`[0, 1, 2, 3]\` | \`4\` has no outgoing edge → pop it into the answer | \`[4]\` |
| 6 | \`[0, 1, 2]\` | \`3\` has no outgoing edge → pop it | \`[4, 3]\` |
| 7 | \`[0, 1]\` | \`2\` has no outgoing edge → pop it | \`[4, 3, 2]\` |
| 8 | \`[0]\` | \`1\` has no outgoing edge → pop it | \`[4, 3, 2, 1]\` |
| 9 | \`[]\` | \`0\` has no outgoing edge → pop it | \`[4, 3, 2, 1, 0]\` |

Reversing the answer gives **\`0 1 2 3 4\`** — 5 vertices for 4 edges, so every ticket was used.

## Java Solution

See [\`ReconstructItinerary.java\`](./ReconstructItinerary.java).

\`\`\`java
public static int[] reconstructItinerary(int n, int[][] edges) {
    // ... adjacency lists as min-heaps, in-degrees ...
    int start = -1;
    for (int v = 0; v < n; v++) {
        if (adj.get(v).size() - inDegree[v] == 1) {
            start = v;
            break;
        }
    }
    // ... fall back to the smallest airport with a departing flight ...

    Deque<Integer> stack = new ArrayDeque<>();
    List<Integer> reversed = new ArrayList<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int v = stack.peek();
        if (adj.get(v).isEmpty()) {
            reversed.add(stack.pop()); // dead end: flush the vertex into the answer
        } else {
            stack.push(adj.get(v).poll());
        }
    }
    Collections.reverse(reversed);
    // ... verify that every ticket was used ...
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log n) | Each edge is removed once from a min-heap; the heap operation costs O(log n) |
| **Space** | O(n + m) | Adjacency lists and the stack |

Without the min-heap (any order of the neighbours) the complexity is O(n + m), but the itinerary
is no longer the lexicographically smallest one.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you know an Eulerian path exists?"* → the degree conditions plus weak connectivity of
  all vertices that carry an edge; see
  [Eulerian Path](../advancedgraphs/EulerianPath.java).
- *"What if the graph is undirected?"* → the degree condition becomes "0 or 2 odd-degree
  vertices", and the same Hierholzer walk works.
- *"Why not just take the smallest next flight greedily?"* → the greedy walk can dead-end with
  unused tickets left over (e.g. \`A→B\`, \`A→C\`, \`B→D\`, \`C→D\`); Hierholzer's stack fixes it.
- *"Can you return the itinerary when several exist?"* → yes, any Eulerian path is valid; the
  min-heap just picks a canonical one.

**Common mistakes:**
- ❌ Building the answer while walking (printing as you go) → the order can be wrong; you must
  build it in reverse and flip it.
- ❌ Forgetting to check that all tickets were used → a graph without an Eulerian path silently
  produces a partial itinerary.
- ❌ Assuming the start is vertex \`0\` → it is the vertex with \`out − in == 1\`.

**How to narrate:**
> "This is an Eulerian path problem. First I find the start: the airport with one more outgoing
> than incoming flight, or the smallest airport with a departure if the graph is an Eulerian
> circuit. Then I run Hierholzer's algorithm: I keep a stack of the current route and only move
> to the smallest unused destination. When I reach an airport with no flights left I pop it into
> the answer. Reversing that answer gives the itinerary, and if it has more vertices than tickets
> plus one, some ticket could not be used and there is no valid itinerary."

## Related Problems

- [Eulerian Path](../advancedgraphs/EulerianPath.java) — the general version
- [Topological Sort](./TopologicalSort.java) — a weaker ordering constraint
- [Course Schedule II](./CourseScheduleII.java) — the same "produce an order" shape
- [Network Delay Time](./NetworkDelayTime.java) — flights as a weighted graph
`,i=[`reconstructItinerary`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};