---
title: Articulation Points in a Graph
leetcode: null
difficulty: Hard
patterns: [Low-link values, DFS, Cut vertices]
companies: [Amazon, Facebook, Bloomberg, HCLTech, Canva]
frequency: 4
tags: [graph, undirected, articulation-points, low-link, tarjan]
sampleInput: |
  5 5
  0 1
  1 2
  2 0
  1 3
  3 4
sampleOutput: |
  2
  1
  3
---

# Articulation Points in a Graph

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Low-link values · Cut vertices |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

An **articulation point** (also called a *cut vertex*) is a vertex whose removal **increases**
the number of connected components. Find every articulation point of an undirected graph.

The output is the number of articulation points on the first line, then one vertex per line in
ascending order.

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
1 3
3 4
```

## Expected Output

```
2
1
3
```

Removing vertex `1` splits the graph into `{0, 2}` and `{3, 4}`; removing vertex `3` splits off
`{4}`. Removing `0`, `2` or `4` leaves the graph connected.

## Approach — the same low-link DFS as bridges

The DFS keeps `tin[u]` (discovery order) and `low[u]` (the earliest discovery time reachable
from `u`'s subtree via tree edges and at most one back edge). Two rules turn that into the
answer:

**Non-root vertex `u`.** `u` is an articulation point if it has a DFS child `w` with
`low[w] >= tin[u]`. The subtree of `w` can then only reach the rest of the graph through `u`, so
removing `u` cuts it off.

> Note the `>=` here, against `>` for bridges. `low[w] == tin[u]` means the subtree can only get
> back to `u` itself — removing `u` still disconnects it. For a bridge the edge `u—w` must be
> the *only* way out, so the test is strict.

**Root vertex.** The root is an articulation point if it has **more than one** DFS child — each
child subtree is a separate piece that only the root connects.

**Edge ids.** As with bridges, the "parent" is skipped by edge id, so parallel edges are handled
correctly.

## Dry Run

Edges (with ids): `e0: 0—1`, `e1: 1—2`, `e2: 2—0`, `e3: 1—3`, `e4: 3—4`.

DFS from vertex `0`; `0` is the **root**:

| Step | Vertex | `tin` | `low` | Event | Children so far | `articulation` |
|---:|---|---:|---:|---|---|---|
| 1 | `0` | 0 | 0 | DFS root, start | 0 | false |
| 2 | `1` | 1 | 1 | child of `0` → recurse | — | false |
| 3 | `2` | 2 | 2 | child of `1` → recurse | — | false |
| 4 | `2` | 2 | 0 | back edge `2→0` → `low[2] = min(2, tin[0]) = 0` | — | false |
| 5 | `1` | 1 | 0 | back in `1`: `low[1] = min(1, low[2]=0) = 0`; check `low[2]=0 >= tin[1]=1`? **No** → `1` stays | 1 | false |
| 6 | `3` | 3 | 3 | child of `1` → recurse | — | false |
| 7 | `4` | 4 | 4 | child of `3` → recurse | — | false |
| 8 | `3` | 3 | 3 | back in `3`: `low[3] = min(3, low[4]=4) = 3`; check `low[4]=4 >= tin[3]=3`? **Yes** → **`3` is an articulation point** | 1 | **true** |
| 9 | `1` | 1 | 0 | back in `1`: `low[1] = min(0, low[3]=3) = 0`; check `low[3]=3 >= tin[1]=1`? **Yes** → **`1` is an articulation point** | 2 | **true** |
| 10 | `0` | 0 | 0 | back in `0`: root with **1** child (`1`) → not more than one → `0` is **not** an articulation point | 1 | false |

Articulation points: **`1`** and **`3`**.

## Java Solution

See [`ArticulationPoints.java`](./ArticulationPoints.java).

```java
void visit(int u, int parentEdge) {
    tin[u] = low[u] = timer++;
    int children = 0;
    for (int[] edge : adj.get(u)) {
        int v = edge[0];
        int id = edge[1];
        if (id == parentEdge) {
            continue;
        }
        if (tin[v] != -1) {
            low[u] = Math.min(low[u], tin[v]);
        } else {
            children++;
            visit(v, id);
            low[u] = Math.min(low[u], low[v]);
            if (parentEdge != -1 && low[v] >= tin[u]) {
                articulation[u] = true;
            }
        }
    }
    if (parentEdge == -1 && children > 1) {
        articulation[u] = true; // a root with several DFS subtrees
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | One DFS, every vertex and edge touched a constant number of times |
| **Space** | O(n + m) | Adjacency list, `tin`/`low` arrays, recursion stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you find the biconnected components?"* → the same DFS, but collect the vertices that
  share a low-link subtree; the edges are grouped by the articulation point that separates them.
- *"What is the difference between an articulation point and a bridge?"* → a bridge is an **edge**
  whose removal disconnects the graph; an articulation point is a **vertex** whose removal does.
  Every bridge has an articulation point at at least one of its ends, but not vice versa.
- *"How do you handle parallel edges?"* → skip the parent **edge by id**, not the parent vertex.
- *"What about self-loops?"* → they never make a vertex an articulation point.
- *"How would you find them in a directed graph?"* → the notion changes completely; you would
  look at strongly connected components and dominator trees.

**Common mistakes:**
- ❌ Using `>` instead of `>=` in the non-root test → you miss articulation points whose child's
  low-link value equals the parent's discovery time.
- ❌ Forgetting the **root** rule → the root is an articulation point when it has more than one
  DFS child, regardless of any low-link value.
- ❌ Only checking the parent rule → the root case is separate and easy to miss.
- ❌ Only starting the DFS from vertex `0` → every component needs a DFS.

**How to narrate:**
> "It's the same low-link DFS as bridges. A non-root vertex u is an articulation point when one
> of its DFS children w has low[w] greater than or equal to tin[u] — that child's subtree can
> then only get out through u. The DFS root is a special case: it is an articulation point when
> it has more than one DFS child, because each child subtree is a separate piece."

## Related Problems

- [Bridges in a Graph](./BridgesInGraph.java) — the same
  DFS, one inequality apart
- [Tarjan's Strongly Connected Components](./TarjanStronglyConnectedComponents.java)
- [Graph Valid Tree](../graphs/GraphValidTree.java)
- [Number of Connected Components](../graphs/NumberOfConnectedComponents.java)
