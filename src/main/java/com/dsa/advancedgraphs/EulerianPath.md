---
title: Eulerian Path
leetcode: null
difficulty: Hard
patterns: [Hierholzer's algorithm, Eulerian path, Degree conditions]
companies: [Meta, Bloomberg, Facebook]
frequency: 4
tags: [graph, directed, eulerian-path, hierholzer, graph-theory]
sampleInput: |
  4 3
  0 1
  1 2
  2 3
sampleOutput: "0 1 2 3"
---

# Eulerian Path

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Hierholzer's algorithm · Degree conditions |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a **directed** graph, find a walk that uses **every edge exactly once** and print the
vertices it visits. Such a walk is an **Eulerian path**.

Such a walk exists exactly when:

1. every vertex that carries an edge is in **one** connected component (ignoring the edge
   directions), and
2. the degrees are right:
   - **Eulerian circuit** — every vertex has `in-degree == out-degree`;
   - **Eulerian path** — exactly one vertex has `out-degree = in-degree + 1` (the start),
     exactly one has `in-degree = out-degree + 1` (the end), and all the rest are balanced.

Return `-1` when no such walk exists.

## Input Format

The program reads a directed graph given as an **edge list**:

```
n m
u1 v1
u2 v2
...
um vm
```

- `n` — number of vertices, numbered `0 … n-1`
- `m` — number of directed edges
- `m` lines, each with two integers `u v` in `0 … n-1`: the edge `u → v`

## Sample Input

```
4 3
0 1
1 2
2 3
```

## Expected Output

```
0 1 2 3
```

`0 → 1 → 2 → 3` uses all three edges exactly once.

## Approach — check the conditions, then Hierholzer

**Step 1 — the degree conditions.** Count in- and out-degrees. Exactly one vertex may have
`out − in = 1` (the start) and exactly one may have `in − out = 1` (the end); all others must be
balanced. If that fails, there is no Eulerian path.

**Step 2 — the connectivity condition.** Ignore the directions and check that all vertices that
carry an edge are in one component. A {@link com.dsa.utils.UnionFind} over the edges does it in
one pass.

**Step 3 — Hierholzer's algorithm.** Walk the graph, but do **not** print vertices as you reach
them:

- keep a **stack** of the current route;
- if the top vertex still has an outgoing edge, remove one and push its target;
- if the top vertex has **no** outgoing edge left, pop it into the answer;
- reverse the answer at the end.

The vertices are written when they become dead ends, and reversing puts them back in the right
order. Each edge is removed from the adjacency list exactly once, so the walk is linear.

**Why the naive greedy walk fails.** Taking any unused edge until you are stuck can leave unused
edges behind (it produces a *trail*, not necessarily an *Euler trail*). The stack version repairs
that by splicing the leftovers back in.

## Dry Run

Edges: `0→1`, `1→2`, `2→3`.

| Check | Value |
|---|---|
| out-degrees | `[1, 1, 1, 0]` |
| in-degrees | `[0, 1, 1, 1]` |
| `out − in` | `[+1, 0, 0, −1]` → start `0`, end `3` ✔ |
| connectivity | all of `0, 1, 2, 3` in one component ✔ |

Hierholzer's walk:

| Step | Stack (top → bottom) | Action | Answer (reversed) |
|---:|---|---|---|
| 0 | `[0]` | push the start | `[]` |
| 1 | `[0, 1]` | `0` has an edge → take `0→1`, push `1` | `[]` |
| 2 | `[0, 1, 2]` | `1` has an edge → take `1→2`, push `2` | `[]` |
| 3 | `[0, 1, 2, 3]` | `2` has an edge → take `2→3`, push `3` | `[]` |
| 4 | `[0, 1, 2]` | `3` has no outgoing edge → pop it into the answer | `[3]` |
| 5 | `[0, 1]` | `2` has no outgoing edge → pop it | `[3, 2]` |
| 6 | `[0]` | `1` has no outgoing edge → pop it | `[3, 2, 1]` |
| 7 | `[]` | `0` has no outgoing edge → pop it | `[3, 2, 1, 0]` |

Reversing gives **`0 1 2 3`** — 4 vertices for 3 edges, so every edge was used.

### A graph without an Eulerian path

```
4 3
0 1
1 0
0 2
```

`out − in` = `[+2, 0, −1, 0]` — vertex `0` has a difference of `2`, which no Eulerian path can
have → the answer is **`-1`**.

## Java Solution

See [`EulerianPath.java`](./EulerianPath.java).

```java
public static int[] eulerianPath(int n, int[][] edges) {
    // ... in/out degrees, start/end detection, Union-Find connectivity check ...
    Deque<Integer> stack = new ArrayDeque<>();
    List<Integer> reversed = new ArrayList<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int v = stack.peek();
        if (adj.get(v).isEmpty()) {
            reversed.add(stack.pop());
        } else {
            stack.push(adj.get(v).remove(adj.get(v).size() - 1));
        }
    }
    Collections.reverse(reversed);
    // ... verify that every edge was used ...
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every edge is removed once from its adjacency list |
| **Space** | O(n + m) | Adjacency lists, the stack and the answer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What changes for an undirected graph?"* → the degree condition becomes "zero or two
  odd-degree vertices"; two odd vertices give a path, zero gives a circuit, more gives no
  solution. The Hierholzer walk is the same.
- *"How do I find all Eulerian paths?"* → for every valid start vertex, run Hierholzer and
  collect the results (be careful: there can be many).
- *"How do I find the Eulerian circuit of a graph where I must start at a given vertex?"* → that
  vertex must have out-degree = in-degree; then start the walk there.
- *"Is this the same as the Chinese postman problem?"* → no — the postman problem asks for a
  *shortest* closed walk that covers every edge, which allows repeating edges (it is solved with
  matching, not Hierholzer).

**Common mistakes:**
- ❌ Forgetting the connectivity check → a graph with two separate cycles passes the degree test
  but has no single Eulerian path.
- ❌ Printing the vertices while walking → the order is wrong; build the answer in reverse.
- ❌ Accepting a graph with two vertices of `out − in = 1` → there would be two starting points.

**How to narrate:**
> "An Eulerian path exists only if the degrees line up: either everything is balanced (a
> circuit) or exactly one vertex has one more outgoing edge and exactly one has one more
> incoming edge. I also check that all vertices with edges are in one component using union-find.
> Then I run Hierholzer's algorithm with a stack: I walk unused edges, but I only write a vertex
> into the answer when it has no outgoing edges left, and I reverse at the end."

## Related Problems

- [Reconstruct Itinerary](../graphs/ReconstructItinerary.java) — the
  flight flavour of the same algorithm
- [Bridges in a Graph](./BridgesInGraph.java)
- [Topological Sort](../graphs/TopologicalSort.java)
- [Course Schedule II](../graphs/CourseScheduleII.java)
