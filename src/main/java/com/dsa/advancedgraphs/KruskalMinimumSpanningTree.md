---
title: Kruskal's Minimum Spanning Tree
leetcode: null
difficulty: Medium
patterns: [Greedy, Union-Find, Sorting]
companies: [Amazon, Airbnb, LinkedIn, Tech Mahindra, Bosch]
frequency: 4
tags: [graph, undirected, weighted, mst, union-find, kruskal]
sampleInput: |
  4 5
  0 1 3
  1 2 4
  0 2 2
  2 3 5
  1 3 1
sampleOutput: "6"
---

# Kruskal's Minimum Spanning Tree

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Union-Find |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given an undirected, weighted graph, find the total weight of a **minimum spanning tree** — a set
of edges that connects every vertex and whose total weight is as small as possible.

Return `-1` when the graph is disconnected, because then no spanning tree exists.

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
```

The MST is `1—3 (1)`, `0—2 (2)`, `0—1 (3)` — total weight **6**.

## Approach — sort, then add edges that do not create a cycle

Kruskal's algorithm is the "sort and greedily accept" version of the MST problem:

1. **Sort** all edges by weight (ascending).
2. Start with `n` singleton components.
3. Walk the sorted edges. For each edge, add it **only if** its two endpoints are in different
   components — otherwise it would create a cycle.
4. Stop after `n - 1` accepted edges.

Step 3 is exactly what a {@link com.dsa.utils.UnionFind} answers: `union(u, v)` returns `false`
when the two vertices are already in the same set.

**Why the greedy choice is safe (the cut property).** At any moment the accepted edges form a
forest. Consider the cheapest edge that connects two different components of that forest: any
spanning tree must connect those two components somehow, and the cheapest edge crossing that cut
is exactly the edge we are looking at. So there is always an MST that contains it — we can
commit to it without losing optimality.

## Dry Run

Edges sorted by weight:

| Rank | Edge | Weight |
|---:|---|---:|
| 1 | `1 — 3` | 1 |
| 2 | `0 — 2` | 2 |
| 3 | `0 — 1` | 3 |
| 4 | `1 — 2` | 4 |
| 5 | `2 — 3` | 5 |

Union-Find starts with 4 components:

| Step | Edge | `find(u)` | `find(v)` | `union` | Accepted | Total | Components |
|---:|---|---:|---:|---|---:|---:|---:|
| 0 | — | — | — | — | — | 0 | 4 |
| 1 | `1 — 3` (1) | 1 | 3 | ✔ | ✔ | 1 | 3 |
| 2 | `0 — 2` (2) | 0 | 2 | ✔ | ✔ | 3 | 2 |
| 3 | `0 — 1` (3) | 0 | 1 | ✔ (different sets: `{0,2}` and `{1,3}`) | ✔ | 6 | 1 |
| 4 | — | — | — | — | — | 6 | 1 |

3 accepted edges = `n - 1` → the tree is complete → total weight **`6`**.

### A disconnected graph

```
4 2
0 1 1
2 3 1
```

| Step | Edge | `union` | Accepted | Total | Components |
|---:|---|---|---:|---:|---:|
| 1 | `0 — 1` (1) | ✔ | ✔ | 1 | 3 |
| 2 | `2 — 3` (1) | ✔ | ✔ | 2 | 2 |

Only 2 edges were accepted but `n - 1 = 3` are needed → the graph is disconnected → answer
**`-1`**.

## Java Solution

See [`KruskalMinimumSpanningTree.java`](./KruskalMinimumSpanningTree.java).

```java
public static int mstWeight(int n, int[][] edges) {
    int[][] sorted = edges.clone();
    Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2]));
    UnionFind uf = new UnionFind(n);
    int total = 0;
    int accepted = 0;
    for (int[] edge : sorted) {
        if (uf.union(edge[0], edge[1])) {
            total += edge[2];
            if (++accepted == n - 1) {
                break;
            }
        }
    }
    return accepted == n - 1 ? total : -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log m) | The sort dominates; the unions are O(m · α(n)) |
| **Space** | O(n + m) | The Union-Find arrays and the copy of the edge list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How does Prim's algorithm differ?"* → Prim grows one tree at a time from a single vertex
  (see [Prim's MST](./PrimMinimumSpanningTree.java));
  Kruskal grows a forest over the whole edge set.
- *"Which one is faster?"* → Kruskal is O(m log m) and good for sparse graphs; Prim with a
  binary heap is O(m log n) and good for dense graphs.
- *"What if the graph is disconnected?"* → you get a **minimum spanning forest**; report the
  weight per component.
- *"Can you return the edges, not just the weight?"* → keep the accepted edges, see
  [Minimum Spanning Tree](./MinimumSpanningTree.java).
- *"How do you prove it is optimal?"* → the cut property (see the Approach section).

**Common mistakes:**
- ❌ Not sorting the edges → the greedy step picks expensive edges and the result is not minimal.
- ❌ Adding an edge without checking for a cycle → the result contains a cycle and is not a tree.
- ❌ Forgetting to check that `n - 1` edges were accepted → a disconnected graph silently returns
  a wrong total.

**How to narrate:**
> "Kruskal is sort-and-greedily-accept. I sort the edges by weight, then walk them in order and
> keep an edge only when it joins two different components — union-find answers that in
> effectively constant time. I stop after n-1 accepted edges; if I never get that many the graph
> is disconnected and I return -1."

## Related Problems

- [Prim's Minimum Spanning Tree](./PrimMinimumSpanningTree.java)
- [Minimum Spanning Tree](./MinimumSpanningTree.java)
- [Number of Connected Components](../graphs/NumberOfConnectedComponents.java)
- [Graph Valid Tree](../graphs/GraphValidTree.java)
