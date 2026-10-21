---
title: Bridges in a Graph
leetcode: null
difficulty: Hard
patterns: [Low-link values, DFS, Tarjan]
companies: [Amazon, Bloomberg, Salesforce, TCS, Bosch]
frequency: 4
tags: [graph, undirected, bridges, low-link, tarjan]
sampleInput: |
  5 5
  0 1
  1 2
  2 0
  1 3
  3 4
sampleOutput: |
  2
  1 3
  3 4
---

# Bridges in a Graph

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Low-link values · DFS |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

A **bridge** is an edge whose removal **disconnects** the graph. Find every bridge of an
undirected graph.

The output is the number of bridges on the first line, then one bridge per line as `u v` with
`u < v`, sorted.

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
1 3
3 4
```

The triangle `0 — 1 — 2 — 0` has no bridges (removing any of its edges keeps the triangle
connected). Removing `1 — 3` separates `{3, 4}` from the triangle, and removing `3 — 4`
separates `{4}` — both are bridges.

## Approach — low-link values

The classic DFS bridge finder keeps two numbers per vertex:

- `tin[u]` — the order in which `u` was discovered;
- `low[u]` — the **smallest** `tin` reachable from `u`'s DFS subtree by going down tree edges
  and then using **at most one** back edge.

While exploring the neighbours of `u`:

- a neighbour `w` that is already visited and is **not** the parent → a back edge:
  `low[u] = min(low[u], tin[w])`;
- a neighbour `w` that is unvisited → recurse into it, then
  `low[u] = min(low[u], low[w])`, and the tree edge `(u, w)` is a **bridge** exactly when
  `low[w] > tin[u]`.

**Why that is the bridge condition.** `low[w] > tin[u]` means the subtree of `w` cannot reach
any ancestor of `u` (not even `u` itself) without using the edge `(u, w)`. Removing that edge
therefore cuts the subtree off — the edge is a bridge. If `low[w] ≤ tin[u]`, the subtree has
another way back up, so the edge is not a bridge.

**Edge ids, not parent vertices.** The "skip the parent" rule must skip the **edge** we came in
through, not every edge to the parent vertex. If the graph has parallel edges
(`u — v` twice), only one of them is a bridge, and skipping by vertex would wrongly hide the
other one. Each edge therefore gets an id and the adjacency list stores `{neighbour, edgeId}`.

## Dry Run

Edges (with ids): `e0: 0—1`, `e1: 1—2`, `e2: 2—0`, `e3: 1—3`, `e4: 3—4`.

DFS starts at vertex `0` (the first unvisited vertex):

| Step | Vertex | `tin` | `low` | Edge | Neighbour | Action | `low` after |
|---:|---|---:|---:|---|---|---|---:|
| 1 | `0` | 0 | 0 | `e0` | `1` | unvisited → recurse into `1` | 0 |
| 2 | `1` | 1 | 1 | `e0` | `0` | parent edge → skip | 1 |
| 3 | `1` | 1 | 1 | `e1` | `2` | unvisited → recurse into `2` | 1 |
| 4 | `2` | 2 | 2 | `e1` | `1` | parent edge → skip | 2 |
| 5 | `2` | 2 | 2 | `e2` | `0` | visited, back edge → `low[2] = min(2, tin[0]=0) = 0` | **0** |
| 6 | `1` | 1 | 1 | — | — | back in `1`: `low[1] = min(1, low[2]=0) = 0`; check `low[2]=0 > tin[1]=1`? **No** → `1—2` is not a bridge | **0** |
| 7 | `1` | 1 | 0 | `e3` | `3` | unvisited → recurse into `3` | 0 |
| 8 | `3` | 3 | 3 | `e3` | `1` | parent edge → skip | 3 |
| 9 | `3` | 3 | 3 | `e4` | `4` | unvisited → recurse into `4` | 3 |
| 10 | `4` | 4 | 4 | `e4` | `3` | parent edge → skip; `low[4] = 4` | 4 |
| 11 | `3` | 3 | 3 | — | — | back in `3`: `low[3] = min(3, low[4]=4) = 3`; check `low[4]=4 > tin[3]=3`? **Yes** → **`3—4` is a bridge** | 3 |
| 12 | `1` | 1 | 0 | — | — | back in `1`: `low[1] = min(0, low[3]=3) = 0`; check `low[3]=3 > tin[1]=1`? **Yes** → **`1—3` is a bridge** | 0 |

Bridges: `(1, 3)` and `(3, 4)` → sorted → **`1 3`** and **`3 4`**.

## Java Solution

See [`BridgesInGraph.java`](./BridgesInGraph.java).

```java
void visit(int u, int parentEdge) {
    tin[u] = low[u] = timer++;
    for (int[] edge : adj.get(u)) {
        int v = edge[0];
        int id = edge[1];
        if (id == parentEdge) {
            continue; // the edge we came in through
        }
        if (tin[v] != -1) {
            low[u] = Math.min(low[u], tin[v]); // back edge
        } else {
            visit(v, id);
            low[u] = Math.min(low[u], low[v]);
            if (low[v] > tin[u]) {
                bridges.add(new int[]{Math.min(u, v), Math.max(u, v)});
            }
        }
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every vertex is visited once, every edge twice (once per direction) |
| **Space** | O(n + m) | Adjacency list, `tin`/`low` arrays, recursion stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What are articulation points, and how are they related?"* → the vertices whose removal
  disconnects the graph; the same DFS finds them, see
  [Articulation Points](./ArticulationPoints.java).
- *"How do you handle parallel edges?"* → by edge id, as done here; skipping the parent *vertex*
  would hide a genuine bridge.
- *"What about self-loops?"* → never a bridge (removing them changes nothing).
- *"Can you find the 2-edge-connected components?"* → remove all bridges; the remaining
  components are the 2-edge-connected components (compute them with a second pass).
- *"What if the graph is directed?"* → the notion of a bridge changes; you would look for
  **strong bridges** instead, which is considerably harder.

**Common mistakes:**
- ❌ Skipping the parent by **vertex** instead of by edge id → parallel edges break the answer.
- ❌ Using `>=` instead of `>` for the bridge test → you would also report edges that belong to a
  cycle.
- ❌ Forgetting to update `low[u]` with `low[w]` after the recursive call → the subtree's
  information never reaches the parent.
- ❌ Only starting the DFS from vertex `0` → a disconnected graph has unvisited components.

**How to narrate:**
> "A bridge is a DFS tree edge whose child's subtree cannot reach back above the parent. I
> track tin and low during one DFS: low is the earliest discovery time reachable from the
> subtree using tree edges and one back edge. After visiting a child w I check whether low[w]
> is greater than tin[u] — if so, the subtree of w can only escape through that edge, so it is
> a bridge. I track edges by id so parallel edges are handled correctly."

## Related Problems

- [Articulation Points in a Graph](./ArticulationPoints.java) —
  the same DFS
- [Tarjan's Strongly Connected Components](./TarjanStronglyConnectedComponents.java)
- [Graph Valid Tree](../graphs/GraphValidTree.java)
- [Minimum Spanning Tree](./MinimumSpanningTree.java)
