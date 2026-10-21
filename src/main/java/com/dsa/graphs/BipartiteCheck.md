---
title: Is Graph Bipartite
leetcode: 785
difficulty: Medium
patterns: [BFS, Two-colouring, Union-Find]
companies: [Google, Amazon, Facebook, Bloomberg, Spotify, Capgemini, Wipro, Qualcomm]
frequency: 4
tags: [graph, undirected, bfs, bipartite]
sampleInput: |
  4 3
  0 1
  1 2
  2 0
sampleOutput: "false"
---

# Is Graph Bipartite — LeetCode 785

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two-colouring · BFS |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Decide whether an undirected graph can be split into **two groups** so that no edge joins two
vertices of the same group. Such a graph is called **bipartite**.

Equivalently: can the graph be 2-coloured without a conflict? A graph is bipartite **iff** it
contains no **odd cycle**.

## Input Format

The program reads an **undirected** graph given as an **edge list**:

```
n m
u1 v1
u2 v2
...
um vm
```

- `n` — number of vertices, numbered `0 … n-1`
- `m` — number of undirected edges
- `m` lines, each with two integers `u v` in `0 … n-1`: the undirected edge `u — v`

## Sample Input

```
4 3
0 1
1 2
2 0
```

## Expected Output

```
false
```

`0 → 1 → 2 → 0` is a cycle of length 3 (odd), so the graph cannot be split into two groups.

## Approach — BFS two-colouring

1. Give every vertex a colour: `-1` = uncoloured, `0` or `1` = the two groups.
2. For every still-uncoloured vertex, colour it `0` and start a BFS from it (the graph may be
   disconnected, so we need one BFS **per component**).
3. When we dequeue `u`, every uncoloured neighbour `v` gets the opposite colour `1 - colour[u]`.
4. If a neighbour already has the **same** colour as `u`, the two ends of that edge would be in
   the same group → not bipartite → return `false`.

**Why it works.** In a bipartite graph the colour of a vertex is forced once you pick the colour
of one vertex in its component: it must alternate along every path. If two different paths force
different colours on the same vertex, the component contains an odd cycle and no valid split
exists.

**The odd-cycle connection.** BFS computes the distance (in edges) from the root of the
component. An edge whose endpoints have the **same** distance parity is an odd cycle.

## Dry Run

Colours start as `[-1, -1, -1, -1]`.

| Step | Pop | Neighbour | Colour of neighbour | Action | Colour array |
|---:|---|---|---|---|---|
| 0 | — | — | — | colour vertex `0` with `0`, queue `[0]` | `[-1, -1, -1, -1]` → `[0, -1, -1, -1]` |
| 1 | `0` | `1` | `-1` (uncoloured) | colour it `1 - colour[0] = 1`, enqueue | `[0, 1, -1, -1]` |
| 2 | `1` | `0` | `0` | different colour → fine | `[0, 1, -1, -1]` |
| 3 | `1` | `2` | `-1` (uncoloured) | colour it `1 - colour[1] = 0`, enqueue | `[0, 1, 0, -1]` |
| 4 | `2` | `1` | `1` | different colour → fine | `[0, 1, 0, -1]` |
| 5 | `2` | `0` | `0` | **same colour as `2`** → conflict | **`false`** |

Vertex `3` is isolated and would simply be coloured `0` on its own — it never conflicts.

### A bipartite graph

```
4 4
0 1
1 2
2 3
3 0
```

| Step | Pop | Neighbour | Colour of neighbour | Action | Colour array |
|---:|---|---|---|---|---|
| 1 | `0` | `1` | `-1` | colour `1` | `[0, 1, -1, -1]` |
| 2 | `1` | `0` | `0` | fine | `[0, 1, -1, -1]` |
| 3 | `1` | `2` | `-1` | colour `0` | `[0, 1, 0, -1]` |
| 4 | `2` | `1` | `1` | fine | `[0, 1, 0, -1]` |
| 5 | `2` | `3` | `-1` | colour `1` | `[0, 1, 0, 1]` |
| 6 | `3` | `2` | `0` | fine | `[0, 1, 0, 1]` |
| 7 | `3` | `0` | `0` | fine (colour[3]=1 ≠ 0) | `[0, 1, 0, 1]` |

No conflict → **`true`** (the 4-cycle is even).

## Java Solution

See [`BipartiteCheck.java`](./BipartiteCheck.java).

```java
public static boolean isBipartite(int n, int[][] edges) {
    // ... build the (symmetric) adjacency list ...
    int[] colour = new int[n];
    Arrays.fill(colour, -1);
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
                    return false;
                }
            }
        }
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every vertex is dequeued once, every edge is inspected twice (once per direction) |
| **Space** | O(n + m) | Adjacency list, colour array, queue |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you find the actual two groups?"* → the `colour` array **is** the grouping: group 0
  = the vertices with colour `0`, group 1 = the rest.
- *"Can you detect the odd cycle itself?"* → during the BFS, the conflicting edge joins two
  vertices at the same BFS level; the cycle is that edge plus the two tree paths back to the root.
- *"What if the graph is directed?"* → then you need the notion of a bipartite orientation, which
  is a different (harder) problem.
- *"Is there a Union-Find version?"* → yes: maintain the parity of each vertex relative to its
  set; an edge whose endpoints have equal parity is a contradiction.

**Common mistakes:**
- ❌ Only starting the BFS from vertex `0` → disconnected components are never checked.
- ❌ Checking the neighbour's colour **before** colouring it → you must colour uncoloured
  neighbours first and only then compare.
- ❌ Forgetting that the adjacency list must be **symmetric** → the graph is undirected.

**How to narrate:**
> "A graph is bipartite exactly when it can be two-coloured. I'll do a BFS two-colouring: I
> colour the root of each component 0, and every neighbour gets the opposite colour. If I ever
> find an edge whose two ends already have the same colour, the graph has an odd cycle and the
> answer is false. I have to start a BFS per component, not just from vertex 0."

## Related Problems

- [Graph Coloring](../advancedgraphs/GraphColoring.java) — the general k-colour problem
- [Graph Valid Tree](./GraphValidTree.java) — another undirected-graph property
- [Number of Connected Components](./NumberOfConnectedComponents.java) — component counting
- [Course Schedule](./CourseSchedule.java) — the directed-graph analogue
