---
title: Course Schedule
leetcode: 207
difficulty: Medium
patterns: [Topological sort, Cycle detection, BFS]
companies: [Meta, Google, Netflix, LinkedIn, Visa]
frequency: 4
tags: [graph, directed, topological-sort, cycle-detection]
sampleInput: |
  4 4
  0 1
  1 2
  2 3
  3 1
sampleOutput: "false"
---

# Course Schedule — LeetCode 207

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Topological sort · Cycle detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

There are `n` courses numbered `0 … n-1`. Every course is a directed edge `u → v` meaning
*"course `u` must be taken before course `v`"*.

Decide whether it is possible to finish **every** course. That is possible exactly when the
dependency graph has **no cycle**.

## Input Format

The program reads a directed graph given as an **edge list**:

```
n m
u1 v1
u2 v2
...
um vm
```

- `n` — number of courses / vertices (`1 ≤ n ≤ 10⁵`)
- `m` — number of prerequisite pairs (`0 ≤ m ≤ 10⁵`)
- `m` lines, each with two integers `u v` in `0 … n-1`: the edge `u → v`

## Sample Input

```
4 4
0 1
1 2
2 3
3 1
```

## Expected Output

```
false
```

Courses `1 → 2 → 3 → 1` form a cycle, so no ordering of the courses can satisfy every
prerequisite.

## Approach — Kahn's algorithm (BFS on in-degrees)

The classical way to answer "is this graph acyclic?" is to try to **remove** vertices that have
no prerequisites left:

1. Compute the **in-degree** of every vertex (how many edges point at it).
2. Put every vertex with in-degree `0` into a queue — those courses can be taken immediately.
3. Repeatedly dequeue a vertex `u` and "take" it. This removes the edge `u → v`, so decrement the
   in-degree of every neighbour `v`. If an in-degree drops to `0`, that course is now unlocked
   and joins the queue.
4. If we removed all `n` vertices the graph was acyclic → `true`. If the queue empties early,
   the vertices that remain are exactly the ones on (or downstream of) a cycle → `false`.

**Why it works:** in a cycle every vertex has at least one incoming edge from inside the cycle,
so no vertex of the cycle can ever reach in-degree `0`. Conversely, an acyclic graph always has
a vertex with in-degree `0` (take a vertex with no predecessors).

**The same machinery, extended:** [Course Schedule II](./CourseScheduleII.java) asks for the actual
ordering, and [Topological Sort](./TopologicalSort.java) returns it for a general graph.

## Dry Run

Edges: `0→1`, `1→2`, `2→3`, `3→1`

Initial state — in-degree per vertex (the number of edges pointing **at** it):

| Vertex | 0 | 1 | 2 | 3 |
|---|---:|---:|---:|---:|
| Out-edges | `0→1` | `1→2` | `2→3` | `3→1` |
| In-degree | 0 | 2 | 1 | 1 |

Vertex `1` has in-degree **2** because both `0→1` and `3→1` point at it.

| Step | Dequeue | Vertices removed | Edge relaxed | In-degree after | Ready queue | Still blocked |
|---:|---|---|---|---|---|---|
| 0 | — | none | — | `[0, 2, 1, 1]` | `[0]` | `1, 2, 3` |
| 1 | `0` | `0` | `0→1`: in-deg[1] `2 → 1` (still > 0, so `1` is **not** unlocked) | `[0, 1, 1, 1]` | `[]` | `1, 2, 3` |
| 2 | — | none | the ready queue is empty → the algorithm stops | `[0, 1, 1, 1]` | `[]` | `1, 2, 3` |

Only **1 of 4** vertices could be removed → the vertices `1, 2, 3` are trapped in the cycle
`1 → 2 → 3 → 1` → **`false`**.

### The same graph without the closing edge `3→1`

Edges: `0→1`, `1→2`, `2→3` — in-degrees `[0, 1, 1, 1]`

| Step | Dequeue | Vertices removed | Edge relaxed | In-degree after | Ready queue |
|---:|---|---|---|---|---|
| 0 | — | none | — | `[0, 1, 1, 1]` | `[0]` |
| 1 | `0` | `0` | `0→1`: in-deg[1] `1 → 0` → unlock `1` | `[0, 0, 1, 1]` | `[1]` |
| 2 | `1` | `0, 1` | `1→2`: in-deg[2] `1 → 0` → unlock `2` | `[0, 0, 0, 1]` | `[2]` |
| 3 | `2` | `0, 1, 2` | `2→3`: in-deg[3] `1 → 0` → unlock `3` | `[0, 0, 0, 0]` | `[3]` |
| 4 | `3` | `0, 1, 2, 3` | `3` has no outgoing edges | `[0, 0, 0, 0]` | `[]` |

All **4 of 4** vertices were removed → no cycle → **`true`**. The single edge `3→1` is what
flips the answer.

## Java Solution

See [`CourseSchedule.java`](./CourseSchedule.java).

```java
public static boolean canFinish(int n, int[][] edges) {
    // ... build adjacency list + in-degrees ...
    Deque<Integer> queue = new ArrayDeque<>();
    for (int v = 0; v < n; v++) {
        if (inDegree[v] == 0) {
            queue.add(v);
        }
    }
    int removed = 0;
    while (!queue.isEmpty()) {
        int u = queue.poll();
        removed++;
        for (int v : adj.get(u)) {
            if (--inDegree[v] == 0) {
                queue.add(v);
            }
        }
    }
    return removed == n;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every vertex is dequeued once, every edge is relaxed once |
| **Space** | O(n + m) | The adjacency list and the in-degree array |

**Optimal?** Yes — you have to read every edge to be sure there is no cycle.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you also return the order of the courses?"* → yes, see
  [Course Schedule II](./CourseScheduleII.java).
- *"What if the graph is undirected?"* → a cycle exists iff `m ≥ n` for a connected component;
  use Union-Find and check whether any edge joins two vertices that are already connected.
- *"How would you detect a cycle with DFS instead of BFS?"* → keep a colour per vertex
  (white/grey/black); finding an edge into a **grey** vertex means a back edge, i.e. a cycle.
- *"What if there are 10⁹ courses but only 10⁵ prerequisites?"* → only the vertices mentioned in
  the edges matter; compress the rest away.

**Common mistakes:**
- ❌ Pushing a vertex into the queue **twice** → decrement the in-degree as you decrement, and
  only enqueue when it *becomes* zero, not when it *is* zero.
- ❌ Forgetting that a self-loop (`u → u`) is already a cycle.
- ❌ Comparing `removed == m` instead of `removed == n` → `m` counts edges, `n` counts vertices.

**How to narrate:**
> "This is cycle detection in a directed graph, so I'll use Kahn's algorithm. I compute the
> in-degrees, seed a queue with the vertices that have no prerequisites, and repeatedly remove
> one and unlock its neighbours. If I can remove all n vertices the graph was acyclic; if the
> queue empties early, the vertices left over are trapped in a cycle."

## Related Problems

- [Course Schedule II](./CourseScheduleII.java) — the same algorithm, but return the ordering
- [Topological Sort](./TopologicalSort.java) — the ordering for an arbitrary directed graph
- [Alien Dictionary](./AlienDictionary.java) — a precedence graph built from word pairs
- [Graph Valid Tree](./GraphValidTree.java) — the undirected analogue
