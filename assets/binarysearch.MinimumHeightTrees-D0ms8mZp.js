var e=`binarysearch.MinimumHeightTrees`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Minimum Height Trees
 * LeetCode: 910 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Binary search / BFS by leaf layers
 *
 * <p>Problem:
 * Given a tree with {@code n} nodes labelled {@code 0 .. n-1} and {@code n-1} edges, and an
 * integer {@code k}, repeatedly strip one full layer of leaves (nodes of degree 1) from the
 * tree until at most {@code k} nodes remain. Return the labels of the leaves of the
 * remaining tree.
 *
 * <p>With {@code k = 2} this degenerates into the classic "minimum height tree roots"
 * problem (LeetCode 310): the surviving nodes are the tree centroids.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * u0 v0
 * u1 v1
 * ...
 * u[n-2] v[n-2]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 3 0
 * 3 1
 * 3 2
 * 3 4
 * 5 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4
 * </pre>
 *
 * <p>Approach: track the degree of every node and keep a queue of the current leaves. Remove
 * them layer by layer, decrementing the degree of their neighbours. A neighbour whose degree
 * drops to 1 becomes a leaf of the next layer. Stop as soon as at most {@code k} nodes are
 * left; the current layer is the answer.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class MinimumHeightTrees {

    /**
     * Returns the leaf labels of the tree after stripping leaf layers until at most
     * {@code k} nodes remain.
     *
     * @param n     the number of nodes
     * @param edges the {@code n-1} undirected edges
     * @param k     the number of nodes to keep
     * @return the surviving leaf labels, in ascending order
     */
    public static List<Integer> findMinHeightTrees(int n, int[][] edges, int k) {
        if (n <= 0) {
            return new ArrayList<>();
        }
        List<List<Integer>> adjacency = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            adjacency.add(new ArrayList<>());
        }
        int[] degree = new int[n];
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
            degree[edge[0]]++;
            degree[edge[1]]++;
        }

        List<Integer> leaves = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (degree[i] <= 1) {
                leaves.add(i);
            }
        }

        int remaining = n;
        while (remaining > k && !leaves.isEmpty()) {
            remaining -= leaves.size();
            List<Integer> nextLeaves = new ArrayList<>();
            for (int leaf : leaves) {
                for (int neighbour : adjacency.get(leaf)) {
                    if (--degree[neighbour] == 1) {
                        nextLeaves.add(neighbour);
                    }
                }
            }
            leaves = nextLeaves;
        }

        List<Integer> answer = new ArrayList<>(leaves);
        answer.sort(Integer::compareTo);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[][] edges = new int[Math.max(0, n - 1)][2];
        for (int i = 0; i < edges.length; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
        }
        int k = fs.nextInt();

        List<Integer> answer = findMinHeightTrees(n, edges, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Minimum Height Trees
 * LeetCode: 910 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Binary search / BFS by leaf layers
 *
 * <p>Problem:
 * Given a tree with {@code n} nodes labelled {@code 0 .. n-1} and {@code n-1} edges, and an
 * integer {@code k}, repeatedly strip one full layer of leaves (nodes of degree 1) from the
 * tree until at most {@code k} nodes remain. Return the labels of the leaves of the
 * remaining tree.
 *
 * <p>With {@code k = 2} this degenerates into the classic "minimum height tree roots"
 * problem (LeetCode 310): the surviving nodes are the tree centroids.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * u0 v0
 * u1 v1
 * ...
 * u[n-2] v[n-2]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 3 0
 * 3 1
 * 3 2
 * 3 4
 * 5 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4
 * </pre>
 *
 * <p>Approach: track the degree of every node and keep a queue of the current leaves. Remove
 * them layer by layer, decrementing the degree of their neighbours. A neighbour whose degree
 * drops to 1 becomes a leaf of the next layer. Stop as soon as at most {@code k} nodes are
 * left; the current layer is the answer.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the leaf labels of the tree after stripping leaf layers until at most
     * {@code k} nodes remain.
     *
     * @param n     the number of nodes
     * @param edges the {@code n-1} undirected edges
     * @param k     the number of nodes to keep
     * @return the surviving leaf labels, in ascending order
     */
    public static List<Integer> findMinHeightTrees(int n, int[][] edges, int k) {
        if (n <= 0) {
            return new ArrayList<>();
        }
        List<List<Integer>> adjacency = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            adjacency.add(new ArrayList<>());
        }
        int[] degree = new int[n];
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
            degree[edge[0]]++;
            degree[edge[1]]++;
        }

        List<Integer> leaves = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (degree[i] <= 1) {
                leaves.add(i);
            }
        }

        int remaining = n;
        while (remaining > k && !leaves.isEmpty()) {
            remaining -= leaves.size();
            List<Integer> nextLeaves = new ArrayList<>();
            for (int leaf : leaves) {
                for (int neighbour : adjacency.get(leaf)) {
                    if (--degree[neighbour] == 1) {
                        nextLeaves.add(neighbour);
                    }
                }
            }
            leaves = nextLeaves;
        }

        List<Integer> answer = new ArrayList<>(leaves);
        answer.sort(Integer::compareTo);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[][] edges = new int[Math.max(0, n - 1)][2];
        for (int i = 0; i < edges.length; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
        }
        int k = fs.nextInt();

        List<Integer> answer = findMinHeightTrees(n, edges, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
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
# Minimum Height Trees — LeetCode 910

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS by layers · Tree · Degree peeling |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a tree with \`n\` nodes labelled \`0 .. n-1\` and \`n-1\` edges, plus an integer \`k\`:

> Repeatedly strip one full layer of **leaves** (nodes of degree 1) from the tree until at
> most \`k\` nodes remain. Return the labels of the leaves of the remaining tree.

With \`k = 2\` this degenerates into the classic *minimum height tree roots* problem
(LeetCode 310): the surviving nodes are the tree's **centroids** — the node(s) that
minimise the height of the rooted tree.

## Input Format

The program reads from standard input:

\`\`\`
n
u0 v0
u1 v1
...
u[n-2] v[n-2]
k
\`\`\`

- \`n\` — the number of nodes (1 ≤ n ≤ 2·10⁴)
- \`n-1\` lines — the edges, each a pair of node labels
- \`k\` — how many nodes to keep (1 ≤ k ≤ n)

## Sample Input

\`\`\`
6
3 0
3 1
3 2
3 4
5 4
2
\`\`\`

## Expected Output

\`\`\`
3 4
\`\`\`

The tree looks like this:

\`\`\`
    0
    |
1 - 3 - 4 - 5
    |
    2
\`\`\`

Its leaves are \`0, 1, 2, 5\`. Stripping them leaves the two nodes \`3\` and \`4\` — exactly \`k\`
nodes — and both of them are leaves of the remaining tree.

## Approach — Peel leaves layer by layer

Track the **degree** of every node and keep a list of the current leaves.

1. Build the adjacency list and the degree of every node.
2. The initial leaves are the nodes with \`degree <= 1\`.
3. While more than \`k\` nodes remain:
   - remove the whole current layer, subtracting its size from the remaining count;
   - for every removed leaf, decrement the degree of each neighbour;
   - a neighbour whose degree drops to exactly \`1\` becomes a leaf of the **next** layer.
4. The current layer is the answer.

**Why \`degree == 1\` and not \`degree == 0\`?** A node becomes a leaf when it has exactly one
remaining neighbour. It may lose that last neighbour later in the same round (when the tree
collapses to a single node), which pushes its degree to \`0\` — the \`== 1\` test is what
registers it exactly once as a leaf.

**Why the centroid connection.** The centre of a tree is at the middle of its longest path,
and stripping leaves from the outside in reaches exactly the middle layer. The last layer
before the tree has more than two nodes is the centre.

## Dry Run

Input: \`n = 6\`, edges \`3-0, 3-1, 3-2, 3-4, 5-4\`, \`k = 2\`

**Initial state**

| Node | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| degree | 1 | 1 | 1 | 4 | 2 | 1 |
| is leaf? | ✔ | ✔ | ✔ | | | ✔ |

Leaves = \`[0, 1, 2, 5]\`, remaining = \`6\`.

**Round 1** — \`6 > 2\`, so strip the layer

| Removed leaf | Neighbour | Degree before | Degree after | Becomes leaf? |
|---:|---:|---:|---:|---|
| 0 | 3 | 4 | 3 | no |
| 1 | 3 | 3 | 2 | no |
| 2 | 3 | 2 | **1** | yes → next layer |
| 5 | 4 | 2 | **1** | yes → next layer |

\`remaining = 6 - 4 = 2\`. Leaves = \`[3, 4]\`.

**Round 2** — \`2 > 2\` is **false**, so we stop. The surviving layer is \`[3, 4]\`.

Answer: **3 4**.

### Degenerate case — a path \`0-1-2\`, \`k = 1\`

| Node | 0 | 1 | 2 |
|---|---|---|---|
| degree | 1 | 2 | 1 |

Leaves = \`[0, 2]\`, remaining = \`3 > 1\` → strip both: degree of \`1\` drops \`2 → 1\` (leaf)
then \`1 → 0\`. \`remaining = 1\`. Leaves = \`[1]\`. Now \`1 > 1\` is false → stop.

Answer: **1** — the middle of the path, exactly the centre.

## Java Solution

See [\`MinimumHeightTrees.java\`](./MinimumHeightTrees.java).

\`\`\`java
public static List<Integer> findMinHeightTrees(int n, int[][] edges, int k) {
    List<List<Integer>> adjacency = new ArrayList<>(n);
    for (int i = 0; i < n; i++) {
        adjacency.add(new ArrayList<>());
    }
    int[] degree = new int[n];
    for (int[] edge : edges) {
        adjacency.get(edge[0]).add(edge[1]);
        adjacency.get(edge[1]).add(edge[0]);
        degree[edge[0]]++;
        degree[edge[1]]++;
    }

    List<Integer> leaves = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        if (degree[i] <= 1) {
            leaves.add(i);
        }
    }

    int remaining = n;
    while (remaining > k && !leaves.isEmpty()) {
        remaining -= leaves.size();
        List<Integer> nextLeaves = new ArrayList<>();
        for (int leaf : leaves) {
            for (int neighbour : adjacency.get(leaf)) {
                if (--degree[neighbour] == 1) {
                    nextLeaves.add(neighbour);
                }
            }
        }
        leaves = nextLeaves;
    }

    List<Integer> answer = new ArrayList<>(leaves);
    answer.sort(Integer::compareTo);
    return answer;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every edge is traversed at most twice |
| **Space** | O(n) | The adjacency list and the degree array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why does this find the centroid?"* → the centroid is the middle of the longest path;
  stripping leaves from the outside in reaches exactly the middle layer.
- *"Can you find the height of the minimum height tree?"* → yes — count the number of peel
  rounds, that is the radius of the tree.
- *"What if the input is not a tree but a general graph?"* → the peeling still terminates,
  but the "centre" is then a set of nodes, and cycles need a visited array.
- *"Return the nodes in any order or sorted?"* → the problem accepts any order; sorting
  makes the output deterministic (and this solution sorts it).

**Common mistakes:**
- ❌ Using \`degree == 0\` to detect a leaf → a node with a single neighbour has degree 1.
- ❌ Adding a neighbour to the next layer **twice** → happens if you decrement degrees for
  already-removed neighbours; the \`== 1\` test is what prevents duplicates.
- ❌ Forgetting the \`remaining > k\` guard → the loop can strip past \`k\` nodes.
- ❌ Treating the graph as directed → the adjacency list must be symmetric.

**How to narrate:**
> "I'll peel the tree from the outside in. I keep the degree of every node, collect the
> leaves, and repeatedly remove a whole layer, decrementing the degree of each removed
> leaf's neighbours. A neighbour whose degree drops to one is a leaf of the next layer. I
> stop as soon as at most k nodes are left, and the current layer is the answer — with k = 2
> this is exactly the centroid of the tree."

## Related Problems

- [Binary Search](./BinarySearch.java) — the search shape used inside the tree
- [Peak Element](./PeakElement.java) — binary search on a local extremum
`,i=[`findMinHeightTrees`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};