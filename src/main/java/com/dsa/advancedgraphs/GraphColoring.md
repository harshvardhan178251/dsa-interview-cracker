---
title: Graph Coloring
leetcode: null
difficulty: Hard
patterns: [Backtracking, Greedy, DSATUR, NP-hard]
companies: [Meta, Airbnb, Netflix, Cognizant, Zomato]
frequency: 4
tags: [graph, undirected, coloring, backtracking, chromatic-number]
sampleInput: |
  5 5
  0 1
  1 2
  2 0
  2 3
  3 4
sampleOutput: |
  3
  1 2 3 1 2
---

# Graph Coloring

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · DSATUR |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Intel |

## Problem Statement

Colour the vertices of an undirected graph so that **no edge joins two vertices of the same
colour**, using as few colours as possible. The minimum number of colours is the **chromatic
number** of the graph.

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
5 5
0 1
1 2
2 0
2 3
3 4
```

## Expected Output

```
3
1 2 3 1 2
```

Line 1 is the chromatic number, line 2 is the colour of every vertex `0 … n-1` (colours are
numbered from 1).

Three colours are necessary because `0 — 1 — 2` is a triangle, and three are sufficient as the
output shows.

## Approach — try `k` colours, backtrack when stuck

The chromatic number is **NP-hard** in general, so there is no polynomial algorithm; the
interview answer is a pruned exponential search.

1. For `k = 1, 2, 3, …` try to colour the graph with at most `k` colours.
2. The search is a **backtracking** one: pick an uncoloured vertex, try every colour that is not
   used by its coloured neighbours, recurse, and undo on failure.
3. The first `k` that works is the chromatic number.

**Which vertex to colour next matters enormously.** Plain backtracking can take forever. The
**DSATUR** heuristic picks the uncoloured vertex whose coloured neighbours use the **most
distinct colours** (its *saturation*), breaking ties by the smallest index. A vertex with
saturation `k` cannot be coloured at all, so the search fails immediately — DSATUR finds those
dead ends much earlier.

**Why the search is fast in practice.** Trying `k = 1` and `k = 2` fails almost immediately for
any graph with an odd cycle, and DSATUR drives the search into the constrained vertices first.

## Dry Run

Graph: `0—1`, `1—2`, `2—0` (a triangle) plus `2—3`, `3—4`.

**k = 1**

| Step | Vertex chosen (saturation) | Colour tried | Result | State |
|---:|---|---:|---|---|
| 1 | `0` (sat 0) | 1 | ok | `[1, 0, 0, 0, 0]` |
| 2 | `1` (sat 1 — neighbour `0` uses colour 1) | 1 | **blocked** (colour 1 is taken by `0`) | no colour available → backtrack |

`k = 1` is impossible.

**k = 2**

| Step | Vertex chosen (saturation) | Colour tried | Result | State |
|---:|---|---:|---|---|
| 1 | `0` (sat 0) | 1 | ok | `[1, 0, 0, 0, 0]` |
| 2 | `1` (sat 1) | 1 blocked → try 2 | ok | `[1, 2, 0, 0, 0]` |
| 3 | `2` (sat 2 — neighbours `0`=1 and `1`=2) | 1 blocked, 2 blocked | **no colour available** → backtrack | `k = 2` is impossible |

**k = 3**

| Step | Vertex chosen (saturation) | Colour tried | Result | State |
|---:|---|---:|---|---|
| 1 | `0` (sat 0) | 1 | ok | `[1, 0, 0, 0, 0]` |
| 2 | `1` (sat 1) | 1 blocked → try 2 | ok | `[1, 2, 0, 0, 0]` |
| 3 | `2` (sat 2) | 1 blocked, 2 blocked → try 3 | ok | `[1, 2, 3, 0, 0]` |
| 4 | `3` (sat 1 — neighbour `2` uses colour 3) | 1 | ok | `[1, 2, 3, 1, 0]` |
| 5 | `4` (sat 1 — neighbour `3` uses colour 1) | 1 blocked → try 2 | ok | `[1, 2, 3, 1, 2]` |

Every vertex is coloured → the chromatic number is **3** and the colouring is
**`1 2 3 1 2`**.

```
3
1 2 3 1 2
```

## Java Solution

See [`GraphColoring.java`](./GraphColoring.java).

```java
private static boolean canColour(List<List<Integer>> adj, int[] colours, int k) {
    // DSATUR: pick the uncoloured vertex with the most distinct coloured-neighbour colours.
    int vertex = -1;
    int bestSaturation = -1;
    for (int v = 0; v < adj.size(); v++) {
        if (colours[v] != 0) {
            continue;
        }
        int saturation = 0;
        boolean[] seen = new boolean[colours.length + 1];
        for (int u : adj.get(v)) {
            if (colours[u] != 0 && !seen[colours[u]]) {
                seen[colours[u]] = true;
                saturation++;
            }
        }
        if (saturation > bestSaturation) {
            bestSaturation = saturation;
            vertex = v;
        }
    }
    if (vertex == -1) {
        return true; // every vertex is coloured
    }
    for (int colour = 1; colour <= k; colour++) {
        if (isAllowed(adj, colours, vertex, colour)) {
            colours[vertex] = colour;
            if (canColour(adj, colours, k)) {
                return true;
            }
            colours[vertex] = 0; // undo
        }
    }
    return false;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | Exponential (NP-hard) | In the worst case the search tries every assignment; DSATUR and the `k = 1, 2, …` loop prune it heavily in practice |
| **Space** | O(n + m) | Adjacency list, colour array and the recursion stack (depth ≤ n) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is there a faster algorithm?"* → for **bipartite** graphs, yes: two colours, decided in
  O(n + m) with BFS — see [Is Graph Bipartite](../graphs/BipartiteCheck.java).
  In general the problem is NP-hard, but there are good heuristics (DSATUR, simulated annealing)
  and exact solvers for small instances.
- *"What if the graph is a tree?"* → exactly 2 colours (1 if there is only one vertex).
- *"What if the graph is a complete graph on `k` vertices?"* → exactly `k` colours.
- *"Can you give a greedy approximation instead?"* → yes: first-fit colouring uses at most
  `Δ + 1` colours (where `Δ` is the maximum degree) and at most twice the optimum.
- *"How would you colour a huge real-world graph?"* → the heuristic greedy colouring, not the
  exact search.

**Common mistakes:**
- ❌ Trying colours in a random order → the output is not reproducible; the program must always
  print the same colouring for the same input.
- ❌ Forgetting to undo the colour on backtracking → the search explores states that do not
  exist and can report a wrong answer.
- ❌ Assuming the chromatic number is `3` (the "five-colour theorem" of planar graphs only says
  *at most* 5) → planar graphs need at most 4 by the four-colour theorem.
- ❌ Not checking that an already coloured neighbour does not use the colour you are trying.

**How to narrate:**
> "The chromatic number is NP-hard in general, so I'd do a pruned exact search. I try k = 1, 2,
> 3 … and for each k I backtrack: I colour one vertex at a time, trying only colours that no
> coloured neighbour uses, and undo on failure. The important part is the vertex order — I use
> DSATUR and always colour the vertex whose neighbours already use the most distinct colours,
> because a vertex with saturation k fails immediately and the search then backtracks much
> earlier. The first k that succeeds is the chromatic number."

## Related Problems

- [Is Graph Bipartite](../graphs/BipartiteCheck.java) — the `k = 2` case
- [Bridges in a Graph](./BridgesInGraph.java)
- [Graph Valid Tree](../graphs/GraphValidTree.java)
- [Minimum Spanning Tree](./MinimumSpanningTree.java)
