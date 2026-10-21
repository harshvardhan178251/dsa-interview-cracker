---
title: Bellman-Ford Shortest Path
leetcode: null
difficulty: Medium
patterns: [Bellman-Ford, Negative weights, Cycle detection]
companies: [Amazon, Microsoft, Apple]
frequency: 4
tags: [graph, weighted, shortest-path, bellman-ford, negative-weights]
sampleInput: |
  4 4
  0 1 3
  1 2 -2
  0 2 5
  2 3 2
  0
sampleOutput: "0 3 1 3"
---

# Bellman-Ford Shortest Path

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bellman-Ford · Negative weights |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a **directed** graph whose edges may carry **negative** weights, compute the shortest
distance from a source vertex to every other vertex.

If a **negative cycle** is reachable from the source, the distances are meaningless (you could
go round the cycle for ever and keep getting a smaller distance) and the answer is
`NEGATIVE CYCLE`.

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
- `m` lines, each with three integers `u v w`: the edge `u → v` with weight `w` (**may be
  negative**)
- `source` — the starting vertex

## Sample Input

```
4 4
0 1 3
1 2 -2
0 2 5
2 3 2
0
```

## Expected Output

```
0 3 1 3
```

Vertex `2` is reached through `0 → 1 → 2` for `3 + (−2) = 1`, which beats the direct edge
`0 → 2` (cost 5). That negative edge is exactly why Dijkstra cannot be used here.

An unreachable vertex is printed as `INF`.

## Approach — relax every edge, `n - 1` times

Bellman-Ford does not need a priority queue; it simply relaxes every edge, over and over.

**The key lemma.** After round `r`, `dist[v]` is the cheapest path from the source to `v` using
at most `r` edges. A shortest path (without negative cycles) uses at most `n - 1` edges, so
after `n - 1` rounds every distance is final.

**Negative cycle detection.** Run **one extra** round. If any distance can still be improved,
there is a negative cycle reachable from the source — otherwise the extra round would change
nothing.

**Early exit.** If a whole round changes nothing, the distances have converged and we can stop
immediately.

## Dry Run

Edges: `0→1 (3)`, `1→2 (−2)`, `0→2 (5)`, `2→3 (2)`; source `0`.
`dist` starts as `[0, ∞, ∞, ∞]`.

**Round 1** (paths with at most 1 edge):

| Edge | `dist[u] + w` | `dist[v]` before | `dist[v]` after |
|---|---|---:|---:|
| `0→1 (3)` | 0 + 3 = 3 | ∞ | **3** |
| `1→2 (−2)` | 3 + (−2) = 1 | ∞ | **1** |
| `0→2 (5)` | 0 + 5 = 5 | 1 | 1 (no change) |
| `2→3 (2)` | 1 + 2 = 3 | ∞ | **3** |

`dist` = `[0, 3, 1, 3]` — everything changed → continue.

**Round 2** (paths with at most 2 edges):

| Edge | `dist[u] + w` | `dist[v]` before | `dist[v]` after |
|---|---|---:|---:|
| `0→1 (3)` | 3 | 3 | 3 |
| `1→2 (−2)` | 1 | 1 | 1 |
| `0→2 (5)` | 5 | 1 | 1 |
| `2→3 (2)` | 3 | 3 | 3 |

Nothing changed → converged, stop early.

**Negative-cycle check** (one more pass): no edge improves a distance → no negative cycle.

**Result: `0 3 1 3`.**

### A negative cycle

```
4 4
0 1 1
1 2 -1
2 1 -1
0 3 5
0
```

Rounds 1–3 never converge: `dist[1]` keeps dropping (`1 → 0 → −1 → −2 …`). The extra
detection pass still improves `dist[1]` → the program prints **`NEGATIVE CYCLE`**.

## Java Solution

See [`BellmanFord.java`](./BellmanFord.java).

```java
public static int[] shortestPaths(int n, int[][] edges, int source) {
    for (int round = 0; round < n - 1; round++) {
        boolean changed = false;
        for (int[] edge : edges) {
            if (dist[edge[0]] == Integer.MAX_VALUE) {
                continue;
            }
            if (dist[edge[0]] + edge[2] < dist[edge[1]]) {
                dist[edge[1]] = dist[edge[0]] + edge[2];
                changed = true;
            }
        }
        if (!changed) {
            break; // converged early
        }
    }
    // One more pass: any improvement means a negative cycle is reachable.
    for (int[] edge : edges) {
        if (dist[edge[0]] != Integer.MAX_VALUE && dist[edge[0]] + edge[2] < dist[edge[1]]) {
            return null;
        }
    }
    return dist;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · m) | `n - 1` rounds, each relaxing every edge |
| **Space** | O(n + m) | The distance array and the input edges |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why not just use Dijkstra?"* → Dijkstra settles a vertex permanently, which is only sound
  with non-negative weights. With a negative edge, a "settled" vertex can still be improved.
- *"How do you detect a negative cycle?"* → one extra relaxation pass; any improvement proves
  it. To find the cycle itself, keep the predecessor array and walk it back.
- *"What if the negative cycle is not reachable from the source?"* → the extra pass only finds
  cycles reachable from the source; a full-graph check needs every vertex as a source.
- *"How can you make it faster?"* → the SPFA (shortest path faster algorithm) variant uses a
  queue and only re-relaxes vertices whose distance changed; it is still O(n·m) in the worst
  case.
- *"What if the graph is a DAG?"* → topological order + DP is O(n + m) and handles negative
  weights.

**Common mistakes:**
- ❌ Running only `n - 1` rounds and forgetting the **detection** round → a negative cycle goes
  unnoticed.
- ❌ Not guarding against `Integer.MAX_VALUE` → overflow turns `∞` into a negative number.
- ❌ Assuming `n - 1` rounds are always needed → the early exit is a real optimisation for
  graphs that converge early.

**How to narrate:**
> "Bellman-Ford relaxes every edge n-1 times. After round r the distances describe the cheapest
> paths using at most r edges, and since a shortest path has at most n-1 edges, n-1 rounds are
> enough. It handles negative weights, unlike Dijkstra. I add one more pass at the end: if
> anything can still be improved, there's a negative cycle reachable from the source and the
> distances are meaningless."

## Related Problems

- [Dijkstra's Shortest Path](./DijkstraShortestPath.java)
- [Floyd-Warshall](./FloydWarshall.java)
- [Cheapest Flights Within K Stops](../graphs/CheapestFlightsWithinKStops.java)
- [Network Delay Time](../graphs/NetworkDelayTime.java)
