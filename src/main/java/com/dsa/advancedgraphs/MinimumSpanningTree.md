---
title: Minimum Spanning Tree
leetcode: 1584
difficulty: Medium
patterns: [Minimum spanning tree, Union-Find, Greedy]
companies: [Amazon, Google, Meta, Uber, Bloomberg]
frequency: 4
tags: [graph, undirected, weighted, mst, union-find]
sampleInput: |
  4 5
  0 1 3
  1 2 4
  0 2 2
  2 3 5
  1 3 1
sampleOutput: |
  6
  1 3 1
  0 2 2
  0 1 3
---

# Minimum Spanning Tree — LeetCode 1584

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Minimum spanning tree · Union-Find |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Build a **minimum spanning tree** of an undirected, weighted graph and report both its total
weight and the edges it contains.

> **LeetCode 1584** is *"Min Cost to Connect All Points"*: the graph there is **implicit** — the
> points form a complete graph whose edge weights are Manhattan distances. This file is the
> **general** form of the very same problem, with the edges given explicitly. To solve the
> LeetCode version, build all `O(n²)` edges with Manhattan weights and feed them to this
> algorithm — for `n ≤ 1000` a dense Prim is the faster choice.

## Input Format

The program reads an **undirected**, weighted graph given as an **edge list**:

```
n m
u1 v1 w1
u2 v2 w2
...
um vm wm
```

- `n` — number of vertices, numbered `0 … n-1`
- `m` — number of undirected edges
- `m` lines, each with three integers `u v w`: the undirected edge `u — v` with weight `w`

## Sample Input

```
4 5
0 1 3
1 2 4
0 2 2
2 3 5
1 3 1
```

## Expected Output

```
6
1 3 1
0 2 2
0 1 3
```

Line 1 is the total weight of the MST. Every following line is one tree edge as `u v w`,
sorted by weight (ties broken by `u` then `v`).

## Approach — Kruskal, keeping the accepted edges

This is [Kruskal's MST](./KruskalMinimumSpanningTree.java)
with one difference: instead of only accumulating the weight, we also **remember** which edges
were accepted.

1. Sort the edges by weight (`w`, then `u`, then `v` so the output is deterministic).
2. Walk them in order; accept an edge when {@link com.dsa.utils.UnionFind} says its endpoints
   are in different components.
3. Stop after `n - 1` accepted edges.
4. Print the total weight, then the accepted edges in the sorted order they were accepted.

The tie-break matters: without it, two edges of the same weight could be accepted in either
order and the output would not be reproducible.

## Dry Run

Sorted edges: `1—3 (1)`, `0—2 (2)`, `0—1 (3)`, `1—2 (4)`, `2—3 (5)`

| Step | Edge | `find(u)` | `find(v)` | `union` | Tree edges so far | Total | Components |
|---:|---|---:|---:|---|---|---:|---:|
| 0 | — | — | — | — | `[]` | 0 | 4 |
| 1 | `1—3 (1)` | 1 | 3 | ✔ | `[(1,3,1)]` | 1 | 3 |
| 2 | `0—2 (2)` | 0 | 2 | ✔ | `[(1,3,1), (0,2,2)]` | 3 | 2 |
| 3 | `0—1 (3)` | 0 | 1 | ✔ (sets `{0,2}` and `{1,3}`) | `[(1,3,1), (0,2,2), (0,1,3)]` | 6 | 1 |
| 4 | — | — | — | — | 3 edges = `n-1` → stop | **6** | 1 |

Output:

```
6
1 3 1
0 2 2
0 1 3
```

## Java Solution

See [`MinimumSpanningTree.java`](./MinimumSpanningTree.java).

```java
public static int[] minimumSpanningTree(int n, int[][] edges) {
    int[][] sorted = edges.clone();
    Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2])
            .thenComparingInt(e -> e[0])
            .thenComparingInt(e -> e[1]));
    UnionFind uf = new UnionFind(n);
    List<int[]> tree = new ArrayList<>();
    int total = 0;
    for (int[] edge : sorted) {
        if (uf.union(edge[0], edge[1])) {
            tree.add(edge);
            total += edge[2];
            if (tree.size() == n - 1) {
                break;
            }
        }
    }
    // ... pack {total, u1, v1, w1, ...} into an int[] ...
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log m) | The sort dominates |
| **Space** | O(n + m) | Union-Find, the sorted copy of the edges and the tree edges |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How is this different from LeetCode 1584?"* → there the graph is a complete graph on points
  with Manhattan distances, so you must materialise `O(n²)` edges; here they are given.
- *"Can you avoid sorting?"* → yes, use Prim's algorithm, O(m log n) with a heap.
- *"What if there are negative weights?"* → no problem, an MST is still well defined.
- *"What if the graph is disconnected?"* → no spanning tree exists; the program prints `-1`.
- *"Can the MST be unique?"* → no; when several edges have the same weight there can be
  several MSTs with the same total weight but different edge sets.

**Common mistakes:**
- ❌ Not breaking out of the loop after `n - 1` edges → extra edges are examined (harmless) but
  the total is only correct if you stop adding.
- ❌ Forgetting the tie-break in the sort → the output order of equal-weight edges is
  non-deterministic.
- ❌ Returning only the weight when the problem asks for the tree → here the edges are part of
  the answer.

**How to narrate:**
> "This is Kruskal. I sort the edges by weight — with a deterministic tie-break so the output
> is reproducible — and then walk them in order, accepting an edge only when union-find says its
> endpoints are in different components. I keep the accepted edges so I can print the tree, not
> just its weight, and I stop after n-1 edges."

## Related Problems

- [Kruskal's Minimum Spanning Tree](./KruskalMinimumSpanningTree.java) —
  the same algorithm, weight only
- [Prim's Minimum Spanning Tree](./PrimMinimumSpanningTree.java)
- [Graph Valid Tree](../graphs/GraphValidTree.java) — "is the graph already a tree?"
- [Bridges in a Graph](./BridgesInGraph.java)
