var e=`graphs.NumberOfProvinces`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

/**
 * Problem: Number of Provinces
 * LeetCode: 547 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Union-Find, connected components
 *
 * <p>Problem: A square matrix {@code isConnected} describes a graph: {@code isConnected[i][j] = 1}
 * means cities {@code i} and {@code j} are directly connected. Return the number of provinces,
 * i.e. the number of connected components.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * 0 1 0 0        (n lines, each with n space-separated 0/1 values)
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1 0
 * 1 1 0
 * 0 0 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the matrix is symmetric, so every {@code 1} at {@code (i, j)} with {@code j > i}
 * is an edge. Feed those edges into a {@link UnionFind} and count the surviving sets.
 *
 * <p>Complexity: Time O(n² * alpha(n)), Space O(n) besides the matrix.
 */
public class NumberOfProvinces {

    /**
     * Counts the provinces in an adjacency matrix.
     *
     * @param isConnected {@code n x n} matrix, {@code 1} = directly connected
     * @return the number of connected components
     */
    public static int countProvinces(int[][] isConnected) {
        int n = isConnected.length;
        UnionFind uf = new UnionFind(n);
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    uf.union(i, j);
                }
            }
        }
        return uf.components();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] isConnected = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                isConnected[i][j] = fs.nextInt();
            }
        }

        System.out.println(countProvinces(isConnected));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Number of Provinces
 * LeetCode: 547 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Union-Find, connected components
 *
 * <p>Problem: A square matrix {@code isConnected} describes a graph: {@code isConnected[i][j] = 1}
 * means cities {@code i} and {@code j} are directly connected. Return the number of provinces,
 * i.e. the number of connected components.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * 0 1 0 0        (n lines, each with n space-separated 0/1 values)
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1 0
 * 1 1 0
 * 0 0 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the matrix is symmetric, so every {@code 1} at {@code (i, j)} with {@code j > i}
 * is an edge. Feed those edges into a {@link UnionFind} and count the surviving sets.
 *
 * <p>Complexity: Time O(n² * alpha(n)), Space O(n) besides the matrix.
 */
public class Main {

    /**
     * Counts the provinces in an adjacency matrix.
     *
     * @param isConnected {@code n x n} matrix, {@code 1} = directly connected
     * @return the number of connected components
     */
    public static int countProvinces(int[][] isConnected) {
        int n = isConnected.length;
        UnionFind uf = new UnionFind(n);
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    uf.union(i, j);
                }
            }
        }
        return uf.components();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] isConnected = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                isConnected[i][j] = fs.nextInt();
            }
        }

        System.out.println(countProvinces(isConnected));
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
# Number of Provinces — LeetCode 547

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Union-Find · Connected components |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

A square matrix \`isConnected\` describes a graph: \`isConnected[i][j] = 1\` means cities \`i\` and
\`j\` are directly connected. Return the number of **provinces**, i.e. the number of connected
components.

## Input Format

\`\`\`
n
row0
row1
...
\`\`\`

- \`n\` — size of the matrix (\`1 ≤ n ≤ 200\`)
- \`n\` lines follow, each with \`n\` space-separated values, \`0\` or \`1\`

## Sample Input

\`\`\`
3
1 1 0
1 1 0
0 0 1
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

Cities \`{0, 1}\` form one province, city \`{2}\` forms the other.

## Approach — the same component count, fed from a matrix

The graph is undirected and the matrix is symmetric, so the upper triangle (\`j > i\`) contains
every edge exactly once. Feed those edges into a
{@link com.dsa.utils.UnionFind} and count the surviving sets.

**Why the upper triangle only.** Scanning the whole matrix would process every edge twice —
harmless for Union-Find (the second union simply fails) but twice the work, and it makes the
dry run harder to read.

**Why not BFS?** BFS over the matrix also works and is O(n²), but it needs a visited array and
a nested loop per vertex. Union-Find needs neither an adjacency list nor a visited array: one
pass over the matrix is enough.

## Dry Run

Union-Find starts with 3 components.

| Step | \`i\` | \`j\` | \`isConnected[i][j]\` | \`find(i)\` | \`find(j)\` | \`union\` | Components after |
|---:|---:|---:|---|---:|---:|---|---:|
| 0 | — | — | — | — | — | — | 3 |
| 1 | 0 | 1 | 1 | 0 | 1 | ✔ merged | 2 |
| 2 | 0 | 2 | 0 | — | — | skipped | 2 |
| 3 | 1 | 2 | 0 | — | — | skipped | 2 |

**Answer: 2 provinces** — \`{0, 1}\` and \`{2}\`.

### A fully connected matrix

\`\`\`
3
1 1 1
1 1 1
1 1 1
\`\`\`

| Step | \`i\` | \`j\` | \`isConnected[i][j]\` | \`union\` | Components after |
|---:|---:|---:|---|---|---:|
| 1 | 0 | 1 | 1 | ✔ | 2 |
| 2 | 0 | 2 | 1 | ✔ | 1 |
| 3 | 1 | 2 | 1 | ✘ already together | 1 |

**Answer: 1 province.**

## Java Solution

See [\`NumberOfProvinces.java\`](./NumberOfProvinces.java).

\`\`\`java
public static int countProvinces(int[][] isConnected) {
    int n = isConnected.length;
    UnionFind uf = new UnionFind(n);
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (isConnected[i][j] == 1) {
                uf.union(i, j);
            }
        }
    }
    return uf.components();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n² · α(n)) | We look at every matrix entry once; the unions are effectively constant |
| **Space** | O(n) | The Union-Find arrays, besides the matrix itself |

## Interview Notes

**Follow-ups to raise yourself:**
- *"The matrix is not symmetric — what then?"* → then it is a **directed** graph and you want
  the number of **strongly** connected components; use Tarjan or Kosaraju.
- *"Can you do it with BFS instead?"* → yes: for every unvisited city run a BFS over the matrix
  row and count the traversals.
- *"What if the matrix were huge and sparse?"* → store an adjacency list instead of a matrix and
  use Union-Find over the edge list.
- *"Can you also return the cities of each province?"* → keep a \`root → members\` map in the
  Union-Find and merge the lists on every union.

**Common mistakes:**
- ❌ Scanning the **whole** matrix and unioning both \`(i, j)\` and \`(j, i)\` → twice the work; the
  second union always fails.
- ❌ Forgetting that the diagonal is \`1\` for every city (a city is connected to itself) → only
  the strict upper triangle is scanned, so the diagonal never causes a problem.
- ❌ Assuming the matrix can be non-symmetric → it is a directed problem, not this one.

**How to narrate:**
> "Provinces are connected components, so I'll use union-find. The matrix is symmetric, so I
> only scan the strict upper triangle to get every edge exactly once. For each 1 I union the two
> cities, and the number of sets left is the number of provinces."

## Related Problems

- [Number of Connected Components](./NumberOfConnectedComponents.java) — the edge-list version
- [Graph Valid Tree](./GraphValidTree.java) — "is there exactly one component?"
- [Clone Graph](./CloneGraph.java) — the graph as an explicit structure
- [Bipartite Check](./BipartiteCheck.java) — colouring the components
`,i=[`countProvinces`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};