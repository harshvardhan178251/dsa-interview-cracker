---
title: Topological Sort
leetcode: null
difficulty: Medium
patterns: [Topological sort, Kahn's algorithm, Min-heap]
companies: [Google, Airbnb, Bloomberg, Infosys, EY]
frequency: 4
tags: [graph, directed, topological-sort, interview-core]
sampleInput: |
  6 6
  5 2
  5 0
  4 0
  4 1
  2 3
  3 1
sampleOutput: "4 5 0 2 3 1"
---

# Topological Sort

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Topological sort · Kahn's algorithm |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given a **directed** graph, produce a linear ordering of its vertices such that every edge
`u → v` places `u` **before** `v`.

Such an ordering exists **if and only if** the graph has no cycle. If the graph contains a cycle
the program prints `-1`.

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
6 6
5 2
5 0
4 0
4 1
2 3
3 1
```

## Expected Output

```
4 5 0 2 3 1
```

Check: `5` before `2` ✔, `5` before `0` ✔, `4` before `0` ✔, `4` before `1` ✔, `2` before `3` ✔,
`3` before `1` ✔.

## Approach — Kahn's algorithm with a min-heap

1. Compute the **in-degree** of every vertex.
2. Put every vertex with in-degree `0` into a `PriorityQueue` (a min-heap).
3. Repeatedly pop the **smallest** available vertex, emit it, and decrement the in-degree of its
   neighbours. A neighbour whose in-degree reaches `0` joins the heap.
4. If fewer than `n` vertices were emitted, a cycle blocked the rest → print `-1`.

**Why a min-heap?** A FIFO queue produces *a* valid order, but which one depends on the order the
edges were read. The min-heap makes the output deterministic and yields the lexicographically
smallest valid ordering — a much nicer property to demonstrate in an interview.

**The DFS alternative.** A second classic formulation colours vertices white/grey/black and
emits a vertex when it turns black; finding an edge into a **grey** vertex proves a cycle. Kahn's
algorithm is usually preferred because it needs no recursion and produces the order directly.

## Dry Run

Edges: `5→2`, `5→0`, `4→0`, `4→1`, `2→3`, `3→1`

In-degrees: `[2, 2, 1, 1, 0, 0]` → ready set `{4, 5}`

| Step | Pop | `order` so far | Edges relaxed | In-degree after | Ready (min-heap) |
|---:|---|---|---|---|---|
| 0 | — | `[]` | — | `[2, 2, 1, 1, 0, 0]` | `[4, 5]` |
| 1 | `4` | `[4]` | `4→0`: 2→1 · `4→1`: 2→1 | `[2, 1, 1, 1, 0, 0]` | `[5]` |
| 2 | `5` | `[4, 5]` | `5→2`: 1→0 → unlock `2` · `5→0`: 1→0 → unlock `0` | `[1, 1, 0, 1, 0, 0]` | `[0, 2]` |
| 3 | `0` | `[4, 5, 0]` | `0` has no outgoing edges | `[1, 1, 0, 1, 0, 0]` | `[2]` |
| 4 | `2` | `[4, 5, 0, 2]` | `2→3`: 1→0 → unlock `3` | `[1, 1, 0, 0, 0, 0]` | `[3]` |
| 5 | `3` | `[4, 5, 0, 2, 3]` | `3→1`: 1→0 → unlock `1` | `[1, 0, 0, 0, 0, 0]` | `[1]` |
| 6 | `1` | `[4, 5, 0, 2, 3, 1]` | `1` has no outgoing edges | `[1, 0, 0, 0, 0, 0]` | `[]` |

All 6 vertices emitted → the ordering is **`4 5 0 2 3 1`**.

## Java Solution

See [`TopologicalSort.java`](./TopologicalSort.java).

```java
public static int[] topologicalOrder(int n, int[][] edges) {
    // ... build adjacency list + in-degrees ...
    PriorityQueue<Integer> ready = new PriorityQueue<>();
    for (int v = 0; v < n; v++) {
        if (inDegree[v] == 0) {
            ready.add(v);
        }
    }
    int[] order = new int[n];
    int emitted = 0;
    while (!ready.isEmpty()) {
        int u = ready.poll();
        order[emitted++] = u;
        for (int v : adj.get(u)) {
            if (--inDegree[v] == 0) {
                ready.add(v);
            }
        }
    }
    return emitted == n ? order : new int[0];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m + n log n) | Each edge is relaxed once; each vertex enters and leaves the heap once |
| **Space** | O(n + m) | Adjacency list, in-degrees, heap, result |

**With a FIFO queue instead of a heap:** O(n + m) time — the same asymptotics, but the order is
no longer deterministic.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with DFS instead?"* → yes, use the white/grey/black colouring and push a vertex
  onto the answer when it turns black; a back edge to a grey vertex means a cycle.
- *"How do you find the longest path in a DAG?"* → topological order + DP: relax every edge in
  the topological order and keep `longest[v] = max(longest[u] + w)`.
- *"What if the graph is undirected?"* → a topological order exists only for graphs with at most
  one edge; otherwise you have to detect a cycle, see [Graph Valid Tree](./GraphValidTree.java).
- *"Can you produce several different valid orders?"* → yes: use a FIFO queue, or swap the heap
  for a random priority queue and repeat.

**Common mistakes:**
- ❌ Emitting a vertex **before** all of its predecessors are done → the order is invalid.
- ❌ Returning a partial order without checking the emitted count → the caller cannot detect the
  cycle.
- ❌ Using a `HashSet` for the ready set → non-deterministic output.

**How to narrate:**
> "Topological sort is Kahn's algorithm: I keep the in-degree of every vertex, seed a min-heap
> with the vertices that have no incoming edges, and repeatedly emit the smallest available
> vertex while unlocking its neighbours. The min-heap makes the output deterministic. If I emit
> fewer than n vertices, the graph has a cycle and I return -1."

## Related Problems

- [Course Schedule](./CourseSchedule.java) — the boolean version
- [Course Schedule II](./CourseScheduleII.java) — the same algorithm with a min-heap
- [Alien Dictionary](./AlienDictionary.java) — precedence relations between words
- [Reconstruct Itinerary](./ReconstructItinerary.java) — Hierholzer's algorithm
