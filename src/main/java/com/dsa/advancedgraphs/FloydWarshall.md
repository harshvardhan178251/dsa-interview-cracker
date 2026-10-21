---
title: Floyd-Warshall All-Pairs Shortest Path
leetcode: null
difficulty: Medium
patterns: [Dynamic programming, All-pairs shortest path]
companies: [Amazon, Uber, LinkedIn, HCLTech, Philips]
frequency: 4
tags: [graph, weighted, shortest-path, floyd-warshall, dynamic-programming]
sampleInput: |
  4 4
  0 1 3
  1 2 4
  0 2 1
  2 3 2
sampleOutput: |
  0 3 1 3
  INF 0 4 6
  INF INF 0 2
  INF INF INF 0
---

# Floyd-Warshall All-Pairs Shortest Path

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dynamic programming · All-pairs |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Compute the shortest distance between **every pair** of vertices in a directed, weighted graph.

Negative edge weights are allowed, but a **negative cycle** makes the answers meaningless (the
distance would be `−∞`).

## Input Format

The program reads a directed, weighted graph given as an **edge list**:

```
n m
u1 v1 w1
u2 v2 w2
...
um vm wm
```

- `n` — number of vertices, numbered `0 … n-1`
- `m` — number of directed edges
- `m` lines, each with three integers `u v w`: the edge `u → v` with weight `w`

## Sample Input

```
4 4
0 1 3
1 2 4
0 2 1
2 3 2
```

## Expected Output

```
0 3 1 3
INF 0 4 6
INF INF 0 2
INF INF INF 0
```

The matrix has one row per source vertex. `INF` marks an unreachable pair, `0` is on the
diagonal, and `dist[1][3] = 6` is the cost of `1 → 2 → 3`.

## Approach — DP over the intermediate vertices

The recurrence is the whole algorithm:

> `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`

Think of it as: "the shortest path from `i` to `j` either does not use vertex `k`, or it goes
through `k` — in which case it is the shortest `i → k` path plus the shortest `k → j` path."

The **order** of the loops is the whole trick:

```
for k = 0 .. n-1:      // the intermediate vertex
    for i = 0 .. n-1:
        for j = 0 .. n-1:
            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
```

`k` must be the **outermost** loop. Then, after round `k`, `dist[i][j]` is the shortest path
whose intermediate vertices are all in `{0 … k}`. If `k` were the inner loop, a single round
could chain several `k` vertices and produce a path that is not allowed at that stage.

The result is the full all-pairs matrix in O(n³).

## Dry Run

Initial matrix (`INF` = unreachable):

```
0    3    1    ∞
∞    0    4    ∞
∞    ∞    0    2
∞    ∞    ∞    0
```

**k = 0** — only vertex `0` may be an intermediate stop. `dist[i][0]` is finite only for
`i = 0`, and `dist[0][j]` for every `j`; routing through `0` only helps if `dist[i][0]` is
finite, so only row `0` can change — and `dist[0][0] = 0`, so nothing changes.

**k = 1** — `dist[0][j] = min(dist[0][j], dist[0][1] + dist[1][j]) = min(dist[0][j], 3 + dist[1][j])`

| `i` | `j` | old | `dist[i][1] + dist[1][j]` | new |
|---:|---:|---:|---:|---:|
| 0 | 2 | 1 | 3 + 4 = 7 | 1 |
| 0 | 3 | ∞ | 3 + ∞ = ∞ | ∞ |
| 2 | 3 | 2 | `dist[2][1] = ∞` → skip | 2 |

Nothing changes (the matrix is unchanged after k = 1 as well).

**k = 2** — `dist[i][j] = min(dist[i][j], dist[i][2] + dist[2][j])`

| `i` | `j` | old | `dist[i][2] + dist[2][j]` | new |
|---:|---:|---:|---:|---:|
| 0 | 3 | ∞ | 1 + 2 = 3 | **3** |
| 1 | 3 | ∞ | 4 + 2 = 6 | **6** |
| 2 | 3 | 2 | 0 + 2 = 2 | 2 |

**k = 3** — `dist[i][3] = min(dist[i][3], dist[i][3] + dist[3][3])` — adding `0` never improves
anything, so the matrix stays the same.

**Final matrix:**

```
0    3    1    3
∞    0    4    6
∞    ∞    0    2
∞    ∞    ∞    0
```

## Java Solution

See [`FloydWarshall.java`](./FloydWarshall.java).

```java
for (int k = 0; k < n; k++) {
    for (int i = 0; i < n; i++) {
        if (dist[i][k] == Integer.MAX_VALUE) {
            continue;
        }
        for (int j = 0; j < n; j++) {
            if (dist[k][j] == Integer.MAX_VALUE) {
                continue;
            }
            int throughK = dist[i][k] + dist[k][j];
            if (throughK < dist[i][j]) {
                dist[i][j] = throughK;
            }
        }
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n³) | `n` rounds × `n²` pairs |
| **Space** | O(n²) | The distance matrix |

**When is it worth it?** Floyd-Warshall is the best choice when the graph is **small and dense**
and you need **all** pairs; for a single source, Dijkstra or Bellman-Ford are faster.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you detect a negative cycle with Floyd-Warshall?"* → after the algorithm,
  `dist[i][i] < 0` for some `i` means a negative cycle passes through `i`.
- *"Can you recover the paths?"* → keep a `next[i][j]` matrix that records the first hop of the
  best path and update it whenever you improve `dist[i][j]`.
- *"How would you do this for a sparse graph with one source?"* → Dijkstra, O(m log n) instead of
  O(n³).
- *"What is the space complexity of the in-place version?"* → O(n²) for the matrix itself; you
  need the whole matrix, so you cannot stream it.
- *"How do you detect that a graph is a DAG in O(n³)?"* → Floyd-Warshall detects cycles via
  `dist[i][i] < 0` for negative cycles; for arbitrary cycles, a topological sort is O(n + m).

**Common mistakes:**
- ❌ Putting `k` **inside** the loops → the algorithm uses intermediate vertices it is not
  allowed to use yet, and the result can be wrong.
- ❌ Not initialising `dist[i][i] = 0` → every path looks longer than it is.
- ❌ Overwriting a parallel edge instead of taking the minimum → a heavier parallel edge would
  win.
- ❌ Forgetting the `INF` guards → `Integer.MAX_VALUE + something` overflows to a negative
  number and the matrix gets garbage.

**How to narrate:**
> "Floyd-Warshall is dynamic programming over the set of allowed intermediate vertices. I
> initialise the matrix with the direct edges, zero on the diagonal and infinity elsewhere.
> Then for each vertex k, in the outermost loop, I relax every pair: either the best path from
> i to j avoids k, or it goes through k, which costs dist[i][k] + dist[k][j]. The order of the
> loops matters — k has to be outermost — and the whole thing is O(n cubed) time and O(n squared)
> space."

## Related Problems

- [Dijkstra's Shortest Path](./DijkstraShortestPath.java)
- [Bellman-Ford](./BellmanFord.java)
- [Network Delay Time](../graphs/NetworkDelayTime.java)
- [Cheapest Flights Within K Stops](../graphs/CheapestFlightsWithinKStops.java)
