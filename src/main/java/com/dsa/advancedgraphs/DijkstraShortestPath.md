---
title: Dijkstra's Shortest Path
leetcode: null
difficulty: Medium
patterns: [Dijkstra, Priority queue, Greedy]
companies: [Google, Meta, Goldman Sachs, Netflix, Cloudflare, Accenture, Wipro, Bosch]
frequency: 5
tags: [graph, weighted, shortest-path, dijkstra, priority-queue]
sampleInput: |
  4 4
  0 1 3
  1 2 4
  0 2 1
  2 3 2
  0
sampleOutput: "0 3 1 3"
---

# Dijkstra's Shortest Path

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dijkstra · Min-heap |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Netflix |

## Problem Statement

Given a **directed** graph with **non-negative** edge weights, compute the shortest distance from
a source vertex to **every** other vertex.

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

- `n` — number of vertices, numbered `0 … n-1`
- `m` — number of directed edges
- `m` lines, each with three integers `u v w`: the edge `u → v` with weight `w` (**`w ≥ 0`**)
- `source` — the starting vertex

## Sample Input

```
4 4
0 1 3
1 2 4
0 2 1
2 3 2
0
```

## Expected Output

```
0 3 1 3
```

The distances from vertex `0`: `0 → 0` is `0`, `0 → 1` is `3`, `0 → 2` is `1`, and `0 → 3` goes
through `2` for `1 + 2 = 3`.

An unreachable vertex is printed as `INF`.

## Approach — settle the cheapest vertex first

Dijkstra's core idea: **the vertex with the smallest tentative distance is final**, provided all
weights are non-negative. No path through a more expensive vertex could improve it.

1. `dist[source] = 0`, everything else `∞`.
2. Push `(distance, vertex)` into a min-heap.
3. Pop the smallest pair. If the popped distance is **worse** than the current `dist` of that
   vertex, the entry is stale → skip it. Otherwise **settle** the vertex and relax its outgoing
   edges: `dist[v] = min(dist[v], dist[u] + w)`, pushing every improvement.
4. The heap empties when all reachable vertices are settled.

**Two details that matter.**

*The stale-entry check.* A vertex can be pushed several times (once per improving path). Without
the check we would re-expand it, which is wasted work; with the check every vertex is expanded
exactly once.

*Why non-negative weights are required.* The settling argument relies on it: if a later path
could pass through a vertex with a *smaller* distance, it would have to use a negative edge.
With a negative edge, Dijkstra settles a vertex too early and the answer is wrong — that is
exactly the case [Bellman-Ford](./BellmanFord.java)
handles.

## Dry Run

| Step | Pop (dist, node) | Relaxations | `dist` after | Heap after |
|---:|---|---|---|---|
| 0 | — | — | `[0, ∞, ∞, ∞]` | `[(0,0)]` |
| 1 | `(0, 0)` | `0→1`: 0+3=3 < ∞ → `dist[1]=3` · `0→2`: 0+1=1 < ∞ → `dist[2]=1` | `[0, 3, 1, ∞]` | `[(1,2), (3,1)]` |
| 2 | `(1, 2)` | `2→3`: 1+2=3 < ∞ → `dist[3]=3` | `[0, 3, 1, 3]` | `[(3,1), (3,3)]` |
| 3 | `(3, 1)` | `1→2`: 3+4=7 > 1 → no change | `[0, 3, 1, 3]` | `[(3,3)]` |
| 4 | `(3, 3)` | `3` has no outgoing edges | `[0, 3, 1, 3]` | `[]` |

**Result: `0 3 1 3`.**

### An unreachable vertex

```
4 2
0 1 5
1 2 5
0
```

Vertex `3` is never reached → its distance stays `∞` → the output is `0 5 10 INF`.

## Java Solution

See [`DijkstraShortestPath.java`](./DijkstraShortestPath.java).

```java
public static int[] shortestPaths(int n, int[][] edges, int source) {
    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
    heap.add(new int[]{0, source});
    while (!heap.isEmpty()) {
        int[] top = heap.poll();
        int currentDist = top[0];
        int u = top[1];
        if (currentDist > dist[u]) {
            continue; // stale entry: a better path was already found
        }
        for (int[] edge : adj.get(u)) {
            int newDist = currentDist + edge[1];
            if (newDist < dist[edge[0]]) {
                dist[edge[0]] = newDist;
                heap.add(new int[]{newDist, edge[0]});
            }
        }
    }
    return dist;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log n) | Each edge is relaxed once per settled vertex; each heap operation is O(log n) |
| **Space** | O(n + m) | Adjacency list, distance array, heap |

**Note on the heap size.** The heap can hold `O(m)` entries (one per successful relaxation), so
the precise bound is `O(m log m)`; with a lazy-deletion heap that is the usual way to write it.
A decrease-key heap gives the tighter `O(m log n)`.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the weights can be negative?"* → Bellman-Ford (and negative-cycle detection).
- *"What if the graph is undirected?"* → the algorithm is unchanged; just add the edge in both
  directions.
- *"How would you find the path, not just the distance?"* → keep a `parent` array and walk it
  back from the target.
- *"What if there are many source queries?"* → multi-source Dijkstra: push all sources with
  distance 0; or, for all-pairs answers, use Floyd-Warshall.
- *"How does Dijkstra compare to A*?"* → A* is Dijkstra with an admissible heuristic that
  estimates the remaining distance; it is faster when the heuristic is good.

**Common mistakes:**
- ❌ Forgetting the stale-entry check → duplicated expansions (and wrong answers if you relax
  from a non-final distance).
- ❌ Using a `HashSet` of "visited" vertices → a vertex must be allowed to be relaxed again when
  a better path is found.
- ❌ Applying Dijkstra to negative weights → silently wrong results.
- ❌ Forgetting to seed the heap with the source at distance 0.

**How to narrate:**
> "All weights are non-negative, so Dijkstra applies. I keep a distance array and a min-heap of
> (distance, vertex) pairs. Each time I pop the cheapest vertex I settle it and relax its
> outgoing edges, pushing every improvement. I skip heap entries whose distance is worse than
> what I already know, because those are stale. When the heap is empty every reachable vertex
> has its final distance."

## Related Problems

- [Bellman-Ford](./BellmanFord.java) — negative weights
- [Floyd-Warshall](./FloydWarshall.java) — all pairs
- [Network Delay Time](../graphs/NetworkDelayTime.java) — the LeetCode version
- [Cheapest Flights Within K Stops](../graphs/CheapestFlightsWithinKStops.java)
