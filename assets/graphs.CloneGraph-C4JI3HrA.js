var e=`graphs.CloneGraph`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Clone Graph
 * LeetCode: 133 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Graph traversal, map from original to copy
 *
 * <p>Problem: Deep-copy an undirected connected graph. Every node keeps its value and the list of
 * its neighbours; the copy must share no node with the original.
 *
 * <p>Input format (stdin):
 * <pre>
 * n m
 * val0 val1 ... val(n-1)
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 2
 * 1 2 3
 * 0 1
 * 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * 2 1 3
 * 3 2
 * </pre>
 *
 * <p>The output has one line per node, in the input order: the node's own value followed by
 * the values of its neighbours in the <b>clone</b>, sorted ascending.
 *
 * <p>Approach: BFS with a map from the original node to its copy. The map is what guarantees a
 * deep copy — when we meet a neighbour for the second time we reuse the copy we already made
 * instead of creating a second one.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class CloneGraph {

    /** A node of an undirected graph. */
    public static class Node {
        public int val;
        public List<Node> neighbors;

        public Node(int val) {
            this.val = val;
            this.neighbors = new ArrayList<>();
        }
    }

    /**
     * Deep-copies the connected component that contains {@code node}.
     *
     * @param node the node to clone
     * @return the copy of {@code node}
     */
    public static Node cloneGraph(Node node) {
        return cloneGraph(node, new HashMap<>());
    }

    /**
     * Deep-copies the connected component that contains {@code node}, reusing and extending an
     * existing original-to-copy map.
     *
     * @param node   the node to clone
     * @param copies map from original node to its copy; it is filled in place
     * @return the copy of {@code node}
     */
    public static Node cloneGraph(Node node, Map<Node, Node> copies) {
        if (node == null) {
            return null;
        }
        if (copies.containsKey(node)) {
            return copies.get(node); // already copied: never make a second copy of a node
        }
        Deque<Node> queue = new ArrayDeque<>();
        queue.add(node);
        copies.put(node, new Node(node.val));

        while (!queue.isEmpty()) {
            Node current = queue.poll();
            Node currentCopy = copies.get(current);
            for (Node neighbour : current.neighbors) {
                if (!copies.containsKey(neighbour)) {
                    copies.put(neighbour, new Node(neighbour.val));
                    queue.add(neighbour);
                }
                currentCopy.neighbors.add(copies.get(neighbour));
            }
        }
        return copies.get(node);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        Node[] nodes = new Node[n];
        for (int i = 0; i < n; i++) {
            nodes[i] = new Node(fs.nextInt());
        }
        for (int i = 0; i < m; i++) {
            int u = fs.nextInt();
            int v = fs.nextInt();
            nodes[u].neighbors.add(nodes[v]);
            nodes[v].neighbors.add(nodes[u]);
        }

        Map<Node, Node> copies = new HashMap<>();
        for (int i = 0; i < n; i++) {
            cloneGraph(nodes[i], copies);
        }

        for (int i = 0; i < n; i++) {
            Node copy = copies.get(nodes[i]);
            List<Integer> neighbourValues = new ArrayList<>();
            for (Node neighbour : copy.neighbors) {
                neighbourValues.add(neighbour.val);
            }
            Collections.sort(neighbourValues);
            StringBuilder line = new StringBuilder();
            line.append(copy.val);
            for (int value : neighbourValues) {
                line.append(' ').append(value);
            }
            System.out.println(line);
        }
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Clone Graph
 * LeetCode: 133 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Graph traversal, map from original to copy
 *
 * <p>Problem: Deep-copy an undirected connected graph. Every node keeps its value and the list of
 * its neighbours; the copy must share no node with the original.
 *
 * <p>Input format (stdin):
 * <pre>
 * n m
 * val0 val1 ... val(n-1)
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 2
 * 1 2 3
 * 0 1
 * 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * 2 1 3
 * 3 2
 * </pre>
 *
 * <p>The output has one line per node, in the input order: the node's own value followed by
 * the values of its neighbours in the <b>clone</b>, sorted ascending.
 *
 * <p>Approach: BFS with a map from the original node to its copy. The map is what guarantees a
 * deep copy — when we meet a neighbour for the second time we reuse the copy we already made
 * instead of creating a second one.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /** A node of an undirected graph. */
    public static class Node {
        public int val;
        public List<Node> neighbors;

        public Node(int val) {
            this.val = val;
            this.neighbors = new ArrayList<>();
        }
    }

    /**
     * Deep-copies the connected component that contains {@code node}.
     *
     * @param node the node to clone
     * @return the copy of {@code node}
     */
    public static Node cloneGraph(Node node) {
        return cloneGraph(node, new HashMap<>());
    }

    /**
     * Deep-copies the connected component that contains {@code node}, reusing and extending an
     * existing original-to-copy map.
     *
     * @param node   the node to clone
     * @param copies map from original node to its copy; it is filled in place
     * @return the copy of {@code node}
     */
    public static Node cloneGraph(Node node, Map<Node, Node> copies) {
        if (node == null) {
            return null;
        }
        if (copies.containsKey(node)) {
            return copies.get(node); // already copied: never make a second copy of a node
        }
        Deque<Node> queue = new ArrayDeque<>();
        queue.add(node);
        copies.put(node, new Node(node.val));

        while (!queue.isEmpty()) {
            Node current = queue.poll();
            Node currentCopy = copies.get(current);
            for (Node neighbour : current.neighbors) {
                if (!copies.containsKey(neighbour)) {
                    copies.put(neighbour, new Node(neighbour.val));
                    queue.add(neighbour);
                }
                currentCopy.neighbors.add(copies.get(neighbour));
            }
        }
        return copies.get(node);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        Node[] nodes = new Node[n];
        for (int i = 0; i < n; i++) {
            nodes[i] = new Node(fs.nextInt());
        }
        for (int i = 0; i < m; i++) {
            int u = fs.nextInt();
            int v = fs.nextInt();
            nodes[u].neighbors.add(nodes[v]);
            nodes[v].neighbors.add(nodes[u]);
        }

        Map<Node, Node> copies = new HashMap<>();
        for (int i = 0; i < n; i++) {
            cloneGraph(nodes[i], copies);
        }

        for (int i = 0; i < n; i++) {
            Node copy = copies.get(nodes[i]);
            List<Integer> neighbourValues = new ArrayList<>();
            for (Node neighbour : copy.neighbors) {
                neighbourValues.add(neighbour.val);
            }
            Collections.sort(neighbourValues);
            StringBuilder line = new StringBuilder();
            line.append(copy.val);
            for (int value : neighbourValues) {
                line.append(' ').append(value);
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
# Clone Graph — LeetCode 133

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Graph traversal · Original-to-copy map |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Deep-copy an undirected connected graph. Every node keeps its **value** and the list of its
**neighbours**; the copy must share **no node** with the original.

The classic mistake is copying a node's neighbour list but then pointing the copy's neighbours
at the *original* nodes — the copy is only one level deep.

## Input Format

\`\`\`
n m
val0 val1 ... val(n-1)
u1 v1
u2 v2
...
um vm
\`\`\`

- \`n\` — number of nodes, numbered \`0 … n-1\`
- \`m\` — number of **undirected** edges
- one line with the \`n\` node values (integers)
- \`m\` lines, each with two integers \`u v\` in \`0 … n-1\`: the undirected edge \`u — v\`

## Sample Input

\`\`\`
3 2
1 2 3
0 1
1 2
\`\`\`

## Expected Output

\`\`\`
1 2
2 1 3
3 2
\`\`\`

The output has one line per node, in input order: the node's **own value** followed by the
values of its neighbours **in the clone**, sorted ascending.

\`\`\`
node 0 (value 1): neighbour with value 2
node 1 (value 2): neighbours with values 1 and 3
node 2 (value 3): neighbour with value 2
\`\`\`

## Approach — BFS with an original → copy map

The whole problem is one question: *when I meet a neighbour for the second time, do I create a
second copy?* The answer must be no — and the tool that enforces it is a map:

1. Put the start node on a queue and immediately create its copy: \`copies[start] = new Node(start.val)\`.
2. Dequeue a node \`u\`. For each neighbour \`v\`:
   - if \`v\` is **not** in the map, create its copy, remember it and queue it;
   - append \`copies[v]\` to \`copies[u].neighbours\`.
3. The map guarantees one copy per original node, so cycles and shared neighbours are handled
   automatically.

**The map is the whole trick.** Without it you would either loop forever on a cycle or produce
a shallow copy.

## Dry Run

Original: \`n0(1) — n1(2) — n2(3)\`, i.e. \`n0.neighbours = [n1]\`, \`n1.neighbours = [n0, n2]\`,
\`n2.neighbours = [n1]\`.

| Step | Pop | Neighbour | In \`copies\`? | Action | \`copies\` after |
|---:|---|---|---|---|---|
| 0 | — | — | — | seed: copy \`n0\` (value 1), queue \`[n0]\` | \`{n0 → c0}\` |
| 1 | \`n0\` | \`n1\` | no | create \`c1\` (value 2), queue it, \`c0.neighbours += c1\` | \`{n0→c0, n1→c1}\` |
| 2 | \`n1\` | \`n0\` | **yes** | \`c1.neighbours += c0\` (reuse the copy!) | \`{n0→c0, n1→c1}\` |
| 3 | \`n1\` | \`n2\` | no | create \`c2\` (value 3), queue it, \`c1.neighbours += c2\` | \`{n0→c0, n1→c1, n2→c2}\` |
| 4 | \`n2\` | \`n1\` | **yes** | \`c2.neighbours += c1\` | unchanged |
| 5 | — | — | — | queue empty → done | \`{n0→c0, n1→c1, n2→c2}\` |

The clone: \`c0(1).neighbours = [c1]\`, \`c1(2).neighbours = [c0, c2]\`, \`c2(3).neighbours = [c1]\` —
exactly the original's shape, with no shared nodes.

Printed:

| Node | Own value | Neighbour values (sorted) | Line |
|---|---:|---|---|
| \`c0\` | 1 | 2 | \`1 2\` |
| \`c1\` | 2 | 1, 3 | \`2 1 3\` |
| \`c2\` | 3 | 2 | \`3 2\` |

## Java Solution

See [\`CloneGraph.java\`](./CloneGraph.java).

\`\`\`java
public static Node cloneGraph(Node node, Map<Node, Node> copies) {
    Deque<Node> queue = new ArrayDeque<>();
    queue.add(node);
    copies.put(node, new Node(node.val));
    while (!queue.isEmpty()) {
        Node current = queue.poll();
        Node currentCopy = copies.get(current);
        for (Node neighbour : current.neighbors) {
            if (!copies.containsKey(neighbour)) {
                copies.put(neighbour, new Node(neighbour.val));
                queue.add(neighbour);
            }
            currentCopy.neighbors.add(copies.get(neighbour));
        }
    }
    return copies.get(node);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every node is visited once, every edge twice (once per direction) |
| **Space** | O(n + m) | The copy itself, the map and the queue |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the graph has multiple components?"* → run the clone for every unvisited node; the
  same map is reused so shared components are still cloned only once.
- *"What if node values are duplicated?"* → the map must be keyed on the **node object**, not on
  its value — two different nodes with the same value are still different nodes.
- *"Could you do it with DFS and recursion?"* → yes, the same map with a recursive helper; watch
  the stack depth on a long chain.
- *"How would you verify that the copy is deep?"* → walk the clone and check that no neighbour is
  in the original's node set (identity comparison, not equality of values).

**Common mistakes:**
- ❌ Copying the neighbour **lists** but not the nodes → a shallow copy.
- ❌ Keying the map by the node's **value** → duplicated values collide.
- ❌ Forgetting that the graph is undirected → the clone's adjacency is asymmetric.

**How to narrate:**
> "The key is a map from the original node to its copy. I seed the map with a copy of the
> start node, then BFS: for every neighbour I either create its copy the first time I see it or
> reuse the copy from the map, and I always append the *copy* to the copy's neighbour list.
> Because the map has exactly one entry per original node, cycles and shared neighbours work
> out of the box."

## Related Problems

- [Keys and Rooms](./KeysAndRooms.java) — traversal with a visited array
- [Number of Connected Components](./NumberOfConnectedComponents.java) — Union-Find on the same structure
- [Bipartite Check](./BipartiteCheck.java) — colouring the nodes
- [Reconstruct Itinerary](./ReconstructItinerary.java) — Hierholzer's algorithm on the same structure
`,i=[`cloneGraph`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};