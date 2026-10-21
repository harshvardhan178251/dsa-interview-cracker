---
title: Cheapest Flights Within K Stops
leetcode: 787
difficulty: Medium
patterns: [Bellman-Ford, Dynamic programming, Shortest path]
companies: [Meta, Amazon, Facebook, Goldman Sachs, Lyft]
frequency: 4
tags: [graph, weighted, shortest-path, bellman-ford, k-stops]
sampleInput: |
  4 5
  0 1 100
  1 2 100
  0 2 300
  2 3 100
  1 3 200
  0 3 1
sampleOutput: "300"
---

# Cheapest Flights Within K Stops — LeetCode 787

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bellman-Ford · Hop budget |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

A directed, weighted graph of flights is given. Find the cheapest price from `src` to `dst` using
**at most `k` intermediate stops** — that is, a path with at most `k + 1` edges. Return `-1`
when no such path exists.

## Input Format

The program reads a directed, weighted graph given as an **edge list**:

```
n m
u1 v1 w1
u2 v2 w2
...
um vm wm
src dst k
```

- `n` — number of cities, numbered `0 … n-1`
- `m` — number of directed flights
- `m` lines, each with three integers `u v w`: the flight `u → v` with price `w ≥ 0`
- `src`, `dst` — origin and destination
- `k` — maximum number of intermediate stops (`0 ≤ k ≤ n-1`)

## Sample Input

```
4 5
0 1 100
1 2 100
0 2 300
2 3 100
1 3 200
0 3 1
```

## Expected Output

```
300
```

With one stop allowed the cheapest routes are `0 → 1 → 3` (100 + 200 = **300**) and
`0 → 2 → 3` (300 + 100 = 400). The direct route `0 → 1 → 2 → 3` would be cheaper (300) but it
uses **two** stops, which is not allowed.

## Approach — Bellman-Ford with a round limit

Bellman-Ford relaxes all edges `n - 1` times, and after round `r` the distances describe the
cheapest paths using **at most `r` edges**. We only want at most `k + 1` edges, so we simply stop
after `k + 1` rounds.

The one subtlety is **not to update in place**. If we relax the edges directly into `dist`
during a round, a single round could chain several relaxations and produce a path longer than the
round allows. So each round writes into a **copy**:

```
next = dist.clone()          // paths using at most `round` edges
for each edge (u, v, w):
    next[v] = min(next[v], dist[u] + w)
dist = next
```

After the last round `dist[dst]` is the cheapest price with at most `k` stops.

**Why not Dijkstra?** Dijkstra does not limit the number of edges, and the "k stops" constraint
is exactly the kind of thing that maps onto Bellman-Ford's rounds.

## Dry Run

Edges: `0→1 (100)`, `1→2 (100)`, `0→2 (300)`, `2→3 (100)`, `1→3 (200)`; `src=0`, `dst=3`, `k=1`
→ 2 rounds.

**Round 0** (paths with at most 1 edge) — `dist = [0, ∞, ∞, ∞]`, `next` starts as a copy:

| Edge | `dist[u] + w` | `next[v]` before | `next[v]` after |
|---|---|---:|---:|
| `0→1 (100)` | 0 + 100 = 100 | ∞ | **100** |
| `1→2 (100)` | 100 + 100 = 200 | ∞ | **200** |
| `0→2 (300)` | 0 + 300 = 300 | 200 | 300 (no change) |
| `2→3 (100)` | 200 + 100 = 300 | ∞ | **300** |
| `1→3 (200)` | 100 + 200 = 300 | 300 | 300 (no change) |

`dist` after round 0 = `[0, 100, 200, 300]`

**Round 1** (paths with at most 2 edges) — `next` starts as a copy of `dist`:

| Edge | `dist[u] + w` | `next[v]` before | `next[v]` after |
|---|---|---:|---:|
| `0→1 (100)` | 100 | 100 | 100 |
| `1→2 (100)` | 200 | 200 | 200 |
| `0→2 (300)` | 300 | 200 | 200 |
| `2→3 (100)` | 300 | 300 | 300 |
| `1→3 (200)` | 300 | 300 | 300 |

`dist` after round 1 = `[0, 100, 200, 300]` → `dist[3] = ` **`300`**.

## Java Solution

See [`CheapestFlightsWithinKStops.java`](./CheapestFlightsWithinKStops.java).

```java
public static int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    for (int round = 0; round <= k; round++) {
        int[] next = dist.clone(); // paths using at most `round` edges
        for (int[] flight : flights) {
            if (dist[flight[0]] == Integer.MAX_VALUE) {
                continue;
            }
            if (dist[flight[0]] + flight[2] < next[flight[1]]) {
                next[flight[1]] = dist[flight[0]] + flight[2];
            }
        }
        dist = next;
    }
    return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O((k + 1) · m) | `k + 1` rounds, each relaxing every edge once |
| **Space** | O(n + m) | The distance array plus the copy, and the input edges |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if `k` is very large?"* → then the hop limit stops mattering and plain Dijkstra is
  O(m log n) instead of O(k·m); use `k = n - 1` as the cut-off.
- *"What if the prices can be negative?"* → Bellman-Ford still works, but you must also detect
  negative cycles (see [Bellman-Ford](../advancedgraphs/BellmanFord.java)).
- *"How would you return the cheapest itinerary, not just the price?"* → keep a parent array per
  round and walk it back.
- *"What if there are many queries with different `k`?"* → the rounds can be shared: run the
  rounds once and snapshot the distance array after each round.

**Common mistakes:**
- ❌ Relaxing **in place** inside a round → one round can chain many edges and the hop limit is
  silently violated. Use a copy.
- ❌ Running only `k` rounds instead of `k + 1` → `k` stops means `k + 1` edges.
- ❌ Forgetting the `Integer.MAX_VALUE` guard → integer overflow turns unreachable nodes into
  huge (or negative) distances.

**How to narrate:**
> "This is Bellman-Ford with a budget. Bellman-Ford's round r gives the cheapest paths using
> at most r edges, and 'k stops' means at most k+1 edges, so I just stop after k+1 rounds. The
> important detail is that each round writes into a copy of the distance array — otherwise a
> single round could chain several relaxations and use more edges than the round allows."

## Related Problems

- [Bellman-Ford](../advancedgraphs/BellmanFord.java) — the full algorithm
- [Network Delay Time](./NetworkDelayTime.java) — Dijkstra without a hop budget
- [Course Schedule II](./CourseScheduleII.java) — bounded relaxations, unweighted
- [Dijkstra's Shortest Path](../advancedgraphs/DijkstraShortestPath.java)
