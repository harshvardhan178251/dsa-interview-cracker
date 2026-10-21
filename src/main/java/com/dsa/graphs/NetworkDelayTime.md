---
title: Network Delay Time
leetcode: 743
difficulty: Medium
patterns: [Dijkstra, Shortest path, Priority queue]
companies: [Google, Amazon, Goldman Sachs, Apple, Intel, TCS, Tech Mahindra, Philips]
frequency: 4
tags: [graph, weighted, shortest-path, dijkstra]
sampleInput: |
  4 4
  0 1 3
  1 2 4
  0 3 2
  3 2 1
  0
sampleOutput: "3"
---

# Network Delay Time — LeetCode 743

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dijkstra · Shortest path |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A weighted, directed network is given. Every edge `(u, v, w)` means a message travels from `u`
to `v` in `w` milliseconds.

Starting from a source node, return the time it takes for the message to reach **every** node —
that is, the **largest** shortest-path distance from the source. Return `-1` if some node can
never be reached.

## Input Format

The program reads a directed, weighted graph given as an **edge list**:

```
n m
u1 v1 w1
u2 v2 w2
...
um vm wm
source
```

- `n` — number of nodes, numbered `0 … n-1`
- `m` — number of directed edges
- `m` lines, each with three integers `u v w`: the edge `u → v` with weight `w` (all `w ≥ 1`)
- `source` — the node the message starts from

## Sample Input

```
4 4
0 1 3
1 2 4
0 3 2
3 2 1
0
```

## Expected Output

```
3
```

Distances from `0`: `[0, 3, 3, 2]` — node `2` is reached through `0 → 3 → 2` (cost 3) rather
than `0 → 1 → 2` (cost 7). The largest distance is **3**.

## Approach — Dijkstra with a min-heap

All weights are non-negative, so Dijkstra applies:

1. `dist[source] = 0`, everything else `∞`.
2. Push `(distance, vertex)` pairs into a min-heap.
3. Pop the smallest. If the popped distance is **larger** than the current `dist` of that vertex,
   the entry is stale (a better path was found later) → skip it.
4. Otherwise relax every outgoing edge: if `dist[u] + w < dist[v]`, update `dist[v]` and push
   the new pair.
5. When the heap is empty the distances are final. Take the maximum, or return `-1` if some node
   still holds `∞`.

**Why the stale-entry check matters.** A vertex can be pushed several times (once per improving
path). Without the check we would relax its edges again — the answers stay correct but the work
is duplicated. With the check each vertex is *expanded* exactly once.

## Dry Run

| Step | Pop (dist, node) | Relaxations | `dist` after | Heap after |
|---:|---|---|---|---|
| 0 | — | — | `[0, ∞, ∞, ∞]` | `[(0,0)]` |
| 1 | `(0, 0)` | `0→1`: 0+3=3 < ∞ → `dist[1]=3` · `0→3`: 0+2=2 < ∞ → `dist[3]=2` | `[0, 3, ∞, 2]` | `[(2,3), (3,1)]` |
| 2 | `(2, 3)` | `3→2`: 2+1=3 < ∞ → `dist[2]=3` | `[0, 3, 3, 2]` | `[(3,1), (3,2)]` |
| 3 | `(3, 1)` | `1→2`: 3+4=7 > 3 → no change | `[0, 3, 3, 2]` | `[(3,2)]` |
| 4 | `(3, 2)` | `2` has no outgoing edges | `[0, 3, 3, 2]` | `[]` |

Final distances `[0, 3, 3, 2]`, the maximum is **`3`**.

## Java Solution

See [`NetworkDelayTime.java`](./NetworkDelayTime.java).

```java
public static int networkDelayTime(int n, int[][] times, int source) {
    // ... build adjacency list ...
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[source] = 0;
    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
    heap.add(new int[]{0, source});
    while (!heap.isEmpty()) {
        int[] top = heap.poll();
        if (top[0] > dist[top[1]]) {
            continue; // stale entry
        }
        for (int[] edge : adj.get(top[1])) {
            int candidate = top[0] + edge[1];
            if (candidate < dist[edge[0]]) {
                dist[edge[0]] = candidate;
                heap.add(new int[]{candidate, edge[0]});
            }
        }
    }
    // ... take the maximum, or -1 if some node is unreachable ...
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log n) | Each edge is relaxed at most once per settled vertex; each heap operation is O(log m) |
| **Space** | O(n + m) | Adjacency list, distance array, heap |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the weights can be negative?"* → Dijkstra breaks (it relies on non-negativity);
  use Bellman-Ford, see [Bellman-Ford](../advancedgraphs/BellmanFord.java).
- *"What if we need the paths, not just the distances?"* → store a parent array and walk it back.
- *"What if the graph is huge and mostly unreachable?"* → run Dijkstra only on the reachable
  component; the unreachable nodes are detected by `dist == ∞`.
- *"How would you handle a time-dependent edge?"* → that is a time-dependent Dijkstra; relax
  with `arrivalTime = max(currentTime, edge.openTime) + edge.duration`.

**Common mistakes:**
- ❌ Forgetting the **stale entry** check → duplicated work, and worse, wrong answers if you
  expand a vertex with a non-final distance.
- ❌ Using a `HashSet` of visited vertices instead of comparing distances → the classic Dijkstra
  bug: a vertex must be allowed to be re-relaxed.
- ❌ Returning the distance to the *farthest node by edge count* instead of by weight.

**How to narrate:**
> "This is single-source shortest path with non-negative weights, so I'll use Dijkstra with a
> min-heap. I keep a distance array, relax edges when I pop the cheapest vertex, and skip stale
> heap entries whose distance is worse than what I already know. At the end I take the maximum
> distance; if any node is still at infinity the network is not fully connected and I return -1."

## Related Problems

- [Dijkstra's Shortest Path](../advancedgraphs/DijkstraShortestPath.java) —
  the full single-source algorithm
- [Cheapest Flights Within K Stops](./CheapestFlightsWithinKStops.java) — Bellman-Ford with a hop budget
- [Reconstruct Itinerary](./ReconstructItinerary.java) — Hierholzer's algorithm on flights
- [Prim's Minimum Spanning Tree](../advancedgraphs/PrimMinimumSpanningTree.java) — a min-heap over a weighted graph
