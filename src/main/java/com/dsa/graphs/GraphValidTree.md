---
title: Graph Valid Tree
leetcode: 261
difficulty: Medium
patterns: [Union-Find, Cycle detection, Graph theory]
companies: [Amazon, Google, Meta, Uber, LinkedIn]
frequency: 3
tags: [graph, undirected, union-find, tree]
sampleInput: |
  5 4
  0 1
  0 2
  1 2
  3 4
sampleOutput: "false"
---

# Graph Valid Tree — LeetCode 261

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Union-Find · Cycle detection |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given an undirected graph with `n` vertices, decide whether it is a **valid tree**.

A graph is a tree exactly when it is **connected** and **acyclic**. Equivalently, a tree on `n`
vertices has exactly `n - 1` edges and no edge closes a cycle.

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

> Every edge is undirected: `0 1` means the edge joins vertices `0` and `1` in **both**
> directions.

## Sample Input

```
5 4
0 1
0 2
1 2
3 4
```

## Expected Output

```
false
```

Vertices `0, 1, 2` form a triangle — a cycle — so this is not a tree (it is also disconnected:
`{3, 4}` is a separate component).

## Approach — edge count plus Union-Find

Two facts about trees do all the work:

1. A tree on `n` vertices has **exactly `n - 1` edges**. If the count differs, it cannot be a
   tree.
2. Adding an edge to a forest either **merges two components** (fine) or **closes a cycle** (not
   fine). A {@link com.dsa.utils.UnionFind} answers "are these two vertices already connected?"
   in effectively constant time.

So: reject immediately if `m != n - 1`; then add the edges one at a time and reject as soon as
one of them joins two vertices that are already connected. If every edge was accepted and only
one component is left, the graph is a tree.

**A neat shortcut:** with `m == n - 1` guaranteed, "no cycle" already implies "connected" — a
forest with `n` vertices and `n - 1` edges has exactly one component. We still check the
component count because it makes the code self-evident and costs nothing.

## Dry Run

`n = 5`, `m = 4`, so `m == n - 1` ✔ — the edge count check passes.

Union-Find starts with 5 singleton sets:

| Step | Edge | `find(u)` | `find(v)` | `union` | Components after | Verdict |
|---:|---|---:|---:|---|---:|---|
| 0 | — | — | — | — | 5 | start |
| 1 | `0 — 1` | 0 | 1 | ✔ merged | 4 | keep going |
| 2 | `0 — 2` | 0 | 2 | ✔ merged | 3 | keep going |
| 3 | `1 — 2` | 0 | 0 | ✘ already in the same set | 3 | **cycle → false** |

The third edge closes the triangle `0 — 1 — 2 — 0`, so the answer is **`false`**.

### A valid tree

```
4 3
0 1
1 2
2 3
```

| Step | Edge | `find(u)` | `find(v)` | `union` | Components after |
|---:|---|---:|---:|---|---:|
| 1 | `0 — 1` | 0 | 1 | ✔ | 3 |
| 2 | `1 — 2` | 0 | 2 | ✔ | 2 |
| 3 | `2 — 3` | 0 | 3 | ✔ | 1 |

One component left → **`true`**.

## Java Solution

See [`GraphValidTree.java`](./GraphValidTree.java).

```java
public static boolean isValidTree(int n, int[][] edges) {
    if (edges.length != n - 1) {
        return false;
    }
    UnionFind uf = new UnionFind(n);
    for (int[] edge : edges) {
        if (!uf.union(edge[0], edge[1])) {
            return false; // this edge closes a cycle
        }
    }
    return uf.components() == 1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m · α(n)) | One union per edge; `α` is the inverse Ackermann function, effectively constant |
| **Space** | O(n) | The parent and rank arrays |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the graph is directed?"* → a directed tree has all in-degrees ≤ 1 and exactly one
  vertex with in-degree 0; check that plus connectivity.
- *"Can you count the number of valid trees?"* → Cayley's formula: `n^(n-2)` labelled trees.
- *"What if edges arrive one at a time and you must answer 'is it still a tree?' after each?"* →
  keep the Union-Find and the edge counter; a forest stays a forest only while no edge closes a
  cycle.
- *"How would you check a tree in O(n + m) with DFS instead?"* → count the edges seen per vertex
  and check that every vertex reaches the root.

**Common mistakes:**
- ❌ Only checking `m == n - 1` → a triangle plus an isolated pair also has 4 edges on 5
  vertices but is not a tree.
- ❌ Only checking connectivity → a triangle plus a pendant vertex is connected but has a cycle.
- ❌ Forgetting the single-vertex tree: `n = 1, m = 0` **is** a tree.

**How to narrate:**
> "A tree has exactly n-1 edges, so I check that first. Then I add the edges to a union-find: if
> an edge joins two vertices that are already connected it closes a cycle and the graph is not a
> tree. If all edges are accepted and only one component remains, it's a tree."

## Related Problems

- [Number of Connected Components](./NumberOfConnectedComponents.java) — the same Union-Find
- [Number of Provinces](./NumberOfProvinces.java) — components in an adjacency matrix
- [Keys and Rooms](./KeysAndRooms.java) — reachability from a starting vertex
- [Bipartite Check](./BipartiteCheck.java) — another undirected-graph property
