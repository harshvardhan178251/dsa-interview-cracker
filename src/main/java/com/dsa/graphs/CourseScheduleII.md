---
title: Course Schedule II
leetcode: 210
difficulty: Medium
patterns: [Topological sort, Priority queue, BFS]
companies: [Meta, Amazon, Adobe, Uber, Stripe]
frequency: 4
tags: [graph, directed, topological-sort, min-heap]
sampleInput: |
  4 4
  1 0
  2 0
  3 1
  3 2
sampleOutput: "3 1 2 0"
---

# Course Schedule II — LeetCode 210

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Topological sort · Min-heap |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

There are `n` courses numbered `0 … n-1`. Every course is a directed edge `u → v` meaning
*"course `u` must be taken before course `v`*.

Return **any** ordering of all courses that respects every prerequisite. If no such ordering
exists the answer is `-1`.

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
1 0
2 0
3 1
3 2
```

## Expected Output

```
3 1 2 0
```

Course `3` has no prerequisites, then `1` and `2` unlock, then `0`.

## Approach — Kahn's algorithm with a min-heap

The skeleton is exactly [Course Schedule](./CourseSchedule.java): compute in-degrees, seed a queue
with the vertices whose in-degree is `0`, and repeatedly unlock neighbours.

The one change is the **ready set**. With a plain FIFO queue the output depends on the order the
edges were read. With a `PriorityQueue` we always emit the **smallest available course number**,
which:

- makes the output deterministic — the same input always prints the same ordering;
- happens to be the *lexicographically smallest* valid ordering, a property interviewers like.

The heap costs `O(log n)` per operation instead of `O(1)`, so the total is `O(m + n log n)`.

## Dry Run

Edges: `1→0`, `2→0`, `3→1`, `3→2`

In-degrees: `[0, 2, 1, 1]` (vertex `0` needs both `1` and `2`).

| Step | Pop | `order` so far | Edges relaxed | In-degree after | Ready (min-heap) |
|---:|---|---|---|---|---|
| 0 | — | `[]` | — | `[0, 2, 1, 1]` | `[3]` |
| 1 | `3` | `[3]` | `3→1`: 1→0 · `3→2`: 1→0 | `[0, 1, 0, 1]` | `[1, 2]` |
| 2 | `1` | `[3, 1]` | `1→0`: 2→1 | `[0, 1, 0, 1]` | `[2]` |
| 3 | `2` | `[3, 1, 2]` | `2→0`: 1→0 → unlock `0` | `[0, 0, 0, 1]` | `[0]` |
| 4 | `0` | `[3, 1, 2, 0]` | — | `[0, 0, 0, 1]` | `[]` |

All four courses were emitted → the ordering is **`3 1 2 0`**.

## Java Solution

See [`CourseScheduleII.java`](./CourseScheduleII.java).

```java
public static int[] findOrder(int n, int[][] edges) {
    // ... build adjacency list + in-degrees ...
    PriorityQueue<Integer> ready = new PriorityQueue<>();
    for (int v = 0; v < n; v++) {
        if (inDegree[v] == 0) {
            ready.add(v);
        }
    }
    int[] order = new int[n];
    int taken = 0;
    while (!ready.isEmpty()) {
        int u = ready.poll();
        order[taken++] = u;
        for (int v : adj.get(u)) {
            if (--inDegree[v] == 0) {
                ready.add(v);
            }
        }
    }
    return taken == n ? order : new int[0];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m + n log n) | Each edge is relaxed once; each vertex enters and leaves the heap once |
| **Space** | O(n + m) | Adjacency list, in-degrees, heap and the result array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do we really need the min-heap?"* → no. A FIFO queue gives a valid order in O(n + m); the
  heap buys determinism and the lexicographically smallest order, not correctness.
- *"How do you detect that no ordering exists?"* → if fewer than `n` vertices were emitted, a
  cycle blocked the rest.
- *"What if the graph is huge and you cannot hold it in memory?"* → keep only the in-degree
  array and the edges, and re-scan the edges in each round (that is Bellman-Ford style, O(n·m)).
- *"Give me the ordering that minimises the number of parallel courses."* → that is a scheduling
  problem (list scheduling with a priority queue); mention it as a follow-up.

**Common mistakes:**
- ❌ Using a `HashSet` for the ready set → the output order becomes non-deterministic.
- ❌ Returning a partially filled array when a cycle exists → the caller cannot tell a valid
  order from a truncated one; return an empty array / `-1`.
- ❌ Decrementing in-degrees while iterating the same array you are comparing against → use a
  copy of the in-degree array when you need the "before" state.

**How to narrate:**
> "Same Kahn's algorithm as Course Schedule, but instead of a FIFO queue I'll keep the ready
> courses in a min-heap. Whenever several courses are unlocked I always take the smallest
> number, which makes the output deterministic and lexicographically smallest. If I emit fewer
> than n courses there was a cycle and I return -1."

## Related Problems

- [Course Schedule](./CourseSchedule.java) — the boolean version of the same idea
- [Topological Sort](./TopologicalSort.java) — the ordering for a general directed graph
- [Reconstruct Itinerary](./ReconstructItinerary.java) — Hierholzer's algorithm, a topological order
  with a much stronger constraint
- [Alien Dictionary](./AlienDictionary.java) — a precedence graph built from word pairs
