---
title: Graphs — concept notes
order: 15
summary: Choosing between BFS, DFS, topological sort and shortest-path algorithms — and reading the question to know which one is wanted.
---

# Graphs — concept notes

## The mental model

A graph is vertices and edges. Two things decide everything:

1. **Directed or undirected**
2. **Weighted or unweighted**

And three structural properties decide the algorithm:

3. **Is it a DAG?** (directed acyclic)
4. **Is it a tree?** (a connected acyclic undirected graph)
5. **Are the weights non-negative?**

---

## Choosing the algorithm

```
What is the question?
├─ "Is there a path / can we reach X?"      → DFS or BFS
├─ "What is the SHORTEST path?"              → BFS (unweighted)
│                                            → Dijkstra (non-negative weights)
│                                            → Bellman-Ford (negative weights)
│                                            → Floyd-Warshall (all pairs)
├─ "What is the ORDER of the dependencies?"  → Topological sort (DAG only)
├─ "What is the MINIMUM TOTAL COST spanning?" → Kruskal or Prim (MST)
├─ "Which vertices are mutually reachable?"  → SCC (Tarjan / Kosaraju)
├─ "How many CONNECTED components?"          → DFS/BFS with a visited set
└─ "Are there any CYCLES?"                   → DFS with colours / Union-Find
```

**This decision tree is the single most valuable thing to have in a graph interview.**
Say it out loud before writing code.

---

## BFS vs DFS

| | BFS | DFS |
|---|---|---|
| Structure | Queue | Stack / recursion |
| Memory | O(width) — can be large | O(depth) |
| Shortest path (unweighted) | **Yes** | No |
| Use when | Shortest paths, level-by-level, bipartite | Cycle detection, connected components, exhaustive search, topological sort |

**BFS gives the shortest path in an unweighted graph** because it explores in order of
distance from the start. That is the whole reason BFS exists.

**DFS is recursive by nature** and pairs naturally with backtracking.

**Both need a visited set.** The bug that catches everyone: **mark visited when you
enqueue, not when you dequeue.**

```java
public static int shortestPath(List<List<Integer>> graph, int source, int target) {
    if (source == target) return 0;
    boolean[] visited = new boolean[graph.size()];
    Deque<Integer> queue = new ArrayDeque<>();
    queue.add(source);
    visited[source] = true;
    int distance = 0;

    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            int node = queue.poll();
            for (int next : graph.get(node)) {
                if (visited[next]) continue;
                if (next == target) return distance + 1;
                visited[next] = true;
                queue.add(next);
            }
        }
        distance++;
    }
    return -1;
}
```

**Capturing `queue.size()` before the inner loop** gives the level structure — that is how
you count distance without storing it in the queue.

---

## Topological sort

**Only exists for a DAG.** It gives an ordering where every edge goes from earlier to
later — a valid order to do tasks in.

### Kahn's algorithm (BFS, in-degree based)

```java
public static List<Integer> topologicalSort(int n, List<List<Integer>> graph) {
    int[] inDegree = new int[n];
    for (List<Integer> neighbours : graph) {
        for (int to : neighbours) inDegree[to]++;
    }

    Deque<Integer> queue = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (inDegree[i] == 0) queue.add(i);

    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);
        for (int next : graph.get(node)) {
            if (--inDegree[next] == 0) queue.add(next);
        }
    }

    if (order.size() != n) throw new IllegalArgumentException("The graph has a cycle");
    return order;
}
```

**The cycle detection is free:** if the order has fewer than `n` nodes, the graph has a
cycle. That is exactly what **Course Schedule (LC 207)** asks for.

**For Course Schedule II (LC 210)**, you also need the ordering — Kahn's gives it
directly. If you need a *lexicographically smallest* order, use a `PriorityQueue` instead
of a plain queue.

### DFS-based

```java
public static void dfs(int node, List<List<Integer>> graph, boolean[] visited, Deque<Integer> stack) {
    visited[node] = true;
    for (int next : graph.get(node)) {
        if (!visited[next]) dfs(next, graph, visited, stack);
    }
    stack.push(node);
}
```

**DFS pushes on the way out**, so the stack naturally holds the reverse topological order.

**The three-colour DFS** detects cycles and gives you the cycle itself:

| Colour | Meaning |
|---|---|
| 0 (white) | Not visited |
| 1 (grey) | On the current recursion stack |
| 2 (black) | Fully processed |

**A grey neighbour means you have found a cycle.**

---

## Grid problems

A grid is a graph with a fixed neighbourhood (up, down, left, right).

```java
int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
```

**Number of Islands (LC 200)** — DFS/BFS, marking visited in place:

```java
public static int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                count++;
                sink(grid, r, c);
            }
        }
    }
    return count;
}

private static void sink(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
    if (grid[r][c] != '1') return;
    grid[r][c] = '0';                     // mark visited in place
    sink(grid, r + 1, c);
    sink(grid, r - 1, c);
    sink(grid, r, c + 1);
    sink(grid, r, c - 1);
}
```

**Marking in place avoids a separate visited array** — but it mutates the input. Say so,
because the interviewer may care.

**The iterative version** uses a stack to avoid recursion depth issues on a 10⁵-cell grid.

### Multi-source BFS

**Rotting Oranges (LC 994)**, **Walls and Gates (LC 286)**, **01 Matrix (LC 542)** — all
use **multi-source BFS**: put **every** starting point in the queue at once, then expand
outward.

```java
// Walls and Gates — BFS from every gate
public static void wallsAndGates(int[][] rooms) {
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    Deque<int[]> queue = new ArrayDeque<>();
    for (int r = 0; r < rooms.length; r++) {
        for (int c = 0; c < rooms[0].length; c++) {
            if (rooms[r][c] == 0) queue.add(new int[]{r, c});   // all gates at once
        }
    }
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] d : dirs) {
            int nr = cell[0] + d[0], nc = cell[1] + d[1];
            if (nr < 0 || nr >= rooms.length || nc < 0 || nc >= rooms[0].length) continue;
            if (rooms[nr][nc] != Integer.MAX_VALUE) continue;
            rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;
            queue.add(new int[]{nr, nc});
        }
    }
}
```

**Why multi-source BFS works:** the BFS explores in order of distance from the source
set, so the first time a cell is reached is via the shortest path from **any** source.

**Say this explicitly** — "I start BFS from all the gates simultaneously, so the first
time a cell is visited it has the minimum distance to any gate."

---

## Word Ladder (LC 127)

**BFS over words**, where the edges are "differ by one character".

```java
public static int ladderLength(String begin, String end, List<String> wordList) {
    Set<String> words = new HashSet<>(wordList);
    if (!words.contains(end)) return 0;

    Deque<String> queue = new ArrayDeque<>();
    queue.add(begin);
    words.remove(begin);
    int steps = 1;

    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            String current = queue.poll();
            if (current.equals(end)) return steps;

            char[] chars = current.toCharArray();
            for (int j = 0; j < chars.length; j++) {
                char original = chars[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == original) continue;
                    chars[j] = c;
                    String next = new String(chars);
                    if (words.remove(next)) {      // remove = mark visited
                        queue.add(next);
                    }
                }
                chars[j] = original;
            }
        }
        steps++;
    }
    return 0;
}
```

**`words.remove(next)` both checks and marks visited** — the classic one-liner.

**The alternative: bidirectional BFS.** Expand from both ends and meet in the middle. It
roughly squares the branching factor, so it is dramatically faster for large word lists.

```java
// Expand the smaller frontier at each step
if (frontier.size() > backFrontier.size()) {
    Set<String> temp = frontier;
    frontier = backFrontier;
    backFrontier = temp;
}
```

**Mention bidirectional BFS** — it is the standard follow-up and shows real algorithmic
awareness.

---

## Alien Dictionary (LC 269)

**Topological sort with a character-level graph.**

```java
public static String alienOrder(String[] words) {
    Map<Character, Set<Character>> graph = new HashMap<>();
    Set<Character> present = new HashSet<>();
    for (String word : words) {
        for (char c : word.toCharArray()) present.add(c);
    }
    for (char c : present) graph.put(c, new LinkedHashSet<>());

    for (int i = 0; i + 1 < words.length; i++) {
        String a = words[i], b = words[i + 1];
        int n = Math.min(a.length(), b.length());
        for (int j = 0; j < n; j++) {
            if (a.charAt(j) != b.charAt(j)) {
                graph.get(a.charAt(j)).add(b.charAt(j));
                break;                     // only the FIRST difference matters
            }
        }
    }
    // Kahn's algorithm over the characters
}
```

**Only the first differing character matters** — the `break` is the key.

**Edge case:** if `a` is a prefix of `b` and `a` is longer, the order is invalid.

---

## Cloning a graph (LC 133)

```java
public static Node cloneGraph(Node node) {
    if (node == null) return null;
    Map<Node, Node> copies = new HashMap<>();
    return dfs(node, copies);
}

private static Node dfs(Node node, Map<Node, Node> copies) {
    if (copies.containsKey(node)) return copies.get(node);
    Node copy = new Node(node.val);
    copies.put(node, copy);
    for (Node neighbour : node.neighbors) {
        copy.neighbors.add(dfs(neighbour, copies));
    }
    return copy;
}
```

**The `copies` map handles cycles.** A graph can have cycles, so you must check whether
you have already cloned a node before recursing.

**The dry run should show the map growing** — that is the interesting part.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Marking visited on dequeue instead of on enqueue | Nodes get enqueued many times |
| Forgetting to mark the source as visited | Infinite loop |
| Not handling the empty graph | `graph[0]` throws |
| Assuming the graph is connected | You need a loop over all vertices |
| Not handling self-loops or parallel edges | Cycle detection and degree counting break |
| Topological sort without checking for a cycle | Silently returns a partial order |
| Using recursion for a deep graph | Stack overflow — use an explicit stack |
| Mutating the input grid without saying so | The caller may not expect it |
| Forgetting the direction check in DFS-based topological sort | Wrong order |

---

## Complexity cheat sheet

| Algorithm | Time | Space |
|---|---|---|
| BFS / DFS | O(V + E) | O(V) |
| BFS shortest path (unweighted) | O(V + E) | O(V) |
| Topological sort (Kahn) | O(V + E) | O(V) |
| Topological sort (DFS) | O(V + E) | O(V) |
| Cycle detection (3-colour DFS) | O(V + E) | O(V) |
| Connected components | O(V + E) | O(V) |
| Union-Find connectivity | O(E · α(V)) | O(V) |
| Clone graph | O(V + E) | O(V) |
| Word ladder | O(N · L · 26) | O(N · L) |

---

## How to crack it in an interview

1. **Clarify the graph:** directed? weighted? connected? a DAG? a tree? **These four
   questions determine the algorithm.**
2. **Say which algorithm you are choosing and why.** "The graph is unweighted and I need
   the shortest path, so BFS."
3. **State the BFS/DFS invariant:** "the visited set contains exactly the nodes already
   enqueued."
4. **Handle the disconnected case** with an outer loop.
5. **Say whether you mutate the input.**
6. **Mention the alternative** — bidirectional BFS for word ladder, Union-Find for
   connectivity, multi-source BFS for the grid problems.
7. **Trace the queue or the recursion stack**, not just the answer.
