---
title: Kosaraju's Strongly Connected Components
leetcode: null
difficulty: Hard
patterns: [Kosaraju, Two DFS passes, Transpose graph]
companies: [Meta, Uber, Microsoft, Tech Mahindra, Zebra]
frequency: 4
tags: [graph, directed, scc, kosaraju]
sampleInput: |
  4 4
  0 1
  1 2
  2 0
  2 3
sampleOutput: |
  2
  0 1 2
  3
---

# Kosaraju's Strongly Connected Components

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Kosaraju · Two DFS passes |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given a **directed** graph, split it into **strongly connected components** — maximal sets of
vertices where every vertex can reach every other one.

The output is identical to the one produced by
[Tarjan's algorithm](./TarjanStronglyConnectedComponents.java):
the number of components, then one line per component with its vertices ascending, the
components ordered by their smallest vertex.

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
4 4
0 1
1 2
2 0
2 3
```

## Expected Output

```
2
0 1 2
3
```

## Approach — two DFS passes on the graph and its transpose

Kosaraju's algorithm needs no low-link arithmetic; it uses the **transpose** of the graph (every
edge reversed) and the order in which DFS finishes vertices.

**Pass 1 — compute a finishing order.** Run a DFS over the whole graph. Every time a vertex's
whole subtree has been explored, append the vertex to a list. The list is in *finishing order*:
vertices of a source SCC finish late, vertices of a sink SCC finish early.

**Pass 2 — find the components.** Build the transposed graph (every `u → v` becomes `v → u`).
Process the vertices in **reverse** finishing order, and for each still-unvisited vertex run a
DFS on the transposed graph. Every vertex it reaches is exactly one strongly connected component.

**Why it works.** Reversing all the edges turns a strongly connected component into a strongly
connected component. More importantly, it turns the "source" of the condensation DAG into a
"sink". The finishing order guarantees that when we start a DFS in the transposed graph we can
only reach vertices of one component — the component's "entry point" is processed before any
vertex that could leak out of it.

**Compared with Tarjan.** Kosaraju needs two passes, a transposed adjacency list and no
arithmetic on indices; Tarjan needs one pass but a stack and careful low-link updates. Both are
O(n + m).

## Dry Run

Edges: `0→1`, `1→2`, `2→0`, `2→3`. Transposed edges: `1→0`, `2→1`, `0→2`, `3→2`.

**Pass 1** — DFS from vertex `0` follows `0 → 1 → 2 → 3`:

| Step | Vertex | Action | Finish order |
|---:|---|---|---|
| 1 | `0` | visit `1` | `[]` |
| 2 | `1` | visit `2` | `[]` |
| 3 | `2` | visit `3` | `[]` |
| 4 | `3` | no neighbours → **finish** `3` | `[3]` |
| 5 | `2` | no unvisited neighbours → **finish** `2` | `[3, 2]` |
| 6 | `1` | → **finish** `1` | `[3, 2, 1]` |
| 7 | `0` | → **finish** `0` | `[3, 2, 1, 0]` |

**Pass 2** — process the finish order in reverse: `0, 1, 2, 3`, DFS on the **transposed** graph:

| Step | Start | Reached in the transposed graph | Component |
|---:|---|---|---|
| 1 | `0` | `0 → 2 → 1` (from `1` we go back to `0`, already visited) | `{0, 1, 2}` |
| 2 | `1` | already visited | — |
| 3 | `2` | already visited | — |
| 4 | `3` | `3 → 2` (already visited) | `{3}` |

Components sorted → **`{0, 1, 2}`** and **`{3}`**:

```
2
0 1 2
3
```

## Java Solution

See [`KosarajuStronglyConnectedComponents.java`](./KosarajuStronglyConnectedComponents.java).

```java
// Pass 1: record the order in which vertices finish.
private static void recordFinishOrder(List<List<Integer>> adj, boolean[] visited, int v,
        List<Integer> finishOrder) {
    visited[v] = true;
    for (int w : adj.get(v)) {
        if (!visited[w]) {
            recordFinishOrder(adj, visited, w, finishOrder);
        }
    }
    finishOrder.add(v);
}

// Pass 2: every DFS tree in the transposed graph is one component.
private static void collect(List<List<Integer>> transposed, boolean[] seen, int v,
        List<Integer> component) {
    seen[v] = true;
    component.add(v);
    for (int w : transposed.get(v)) {
        if (!seen[w]) {
            collect(transposed, seen, w, component);
        }
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Two DFS passes plus building the transpose |
| **Space** | O(n + m) | Two adjacency lists, the visited arrays and the finish order |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why do we need the transpose?"* → because in the transposed graph the condensation DAG is
  reversed, which makes the finish order a valid component-processing order.
- *"Which one do you prefer, Kosaraju or Tarjan?"* → Kosaraju is easier to remember and to
  implement; Tarjan uses less memory (no second adjacency list) and is the standard choice in
  libraries.
- *"Can you do it iteratively?"* → yes; the first pass becomes an explicit stack with a
  "finished" marker.
- *"How do you find SCCs in a graph with 10⁸ vertices?"* → you need the linear-time algorithm
  anyway; the challenge becomes memory and I/O.
- *"What is the SCC condensation DAG good for?"* → it is always acyclic, so you can topologically
  sort the components and schedule tasks per component.

**Common mistakes:**
- ❌ Processing the vertices in **forward** finishing order in pass 2 → you get one component per
  vertex instead of per SCC.
- ❌ Forgetting to build the transposed graph → pass 2 walks the original graph and merges
  unrelated components.
- ❌ Adding a vertex to the finish order when it is **discovered** instead of when it
  **finishes** → the order is wrong.

**How to narrate:**
> "Kosaraju uses two DFS passes. The first one on the original graph records the order in which
> vertices finish. I then reverse every edge and, processing the vertices in reverse finish
> order, run a second DFS on the transposed graph — each DFS tree it discovers is exactly one
> strongly connected component."

## Related Problems

- [Tarjan's Strongly Connected Components](./TarjanStronglyConnectedComponents.java)
- [Bridges in a Graph](./BridgesInGraph.java)
- [Articulation Points in a Graph](./ArticulationPoints.java)
- [Topological Sort](../graphs/TopologicalSort.java)
