---
title: Number of Connected Components in an Undirected Graph
leetcode: 547
difficulty: Medium
patterns: [Union-Find, Connected components, BFS]
companies: [Meta, Google, Adobe, LinkedIn, Stripe]
frequency: 4
tags: [graph, undirected, union-find, components]
sampleInput: |
  5 3
  0 1
  1 2
  3 4
sampleOutput: "2"
---

# Number of Connected Components in an Undirected Graph — LeetCode 547

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Union-Find · Connected components |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given an undirected graph, return the number of **connected components** — the number of maximal
groups of vertices in which every pair of vertices is joined by some path.

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
5 3
0 1
1 2
3 4
```

## Expected Output

```
2
```

Two components: `{0, 1, 2}` and `{3, 4}`.

## Approach — Union-Find

Start with `n` singleton sets — every vertex is its own component — and **merge** the two
endpoints of every edge. The number of sets that survive is the answer.

The {@link com.dsa.utils.UnionFind} helper does this with union by rank and path compression, so
each merge costs `O(α(n))`, effectively constant. It keeps a `components` counter that starts at
`n` and is decremented on every successful merge, so the answer is available in O(1) at the end.

**Alternative: DFS/BFS.** Start a traversal from every not-yet-visited vertex and count how many
traversals you need. Same complexity, more code. Union-Find is the better tool when the edges
arrive as a stream, because it does not need an adjacency list at all.

## Dry Run

`n = 5` → the Union-Find starts with 5 components.

| Step | Edge | `find(u)` | `find(v)` | `union` | Components after |
|---:|---|---:|---:|---|---:|
| 0 | — | — | — | — | 5 |
| 1 | `0 — 1` | 0 | 1 | ✔ merged | 4 |
| 2 | `1 — 2` | 0 | 2 | ✔ merged | 3 |
| 3 | `3 — 4` | 3 | 4 | ✔ merged | **2** |

**Answer: 2 components** — `{0, 1, 2}` and `{3, 4}`.

### A graph where nothing is connected

```
4 0
```

No edges → the Union-Find still holds 4 singleton sets → the answer is **`4`**.

## Java Solution

See [`NumberOfConnectedComponents.java`](./NumberOfConnectedComponents.java).

```java
public static int countComponents(int n, int[][] edges) {
    UnionFind uf = new UnionFind(n);
    for (int[] edge : edges) {
        uf.union(edge[0], edge[1]);
    }
    return uf.components();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m · α(n)) | Initialising `n` sets, then one union per edge |
| **Space** | O(n) | Parent and rank arrays — no adjacency list is needed |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the graph is directed?"* → the components become **strongly** connected components,
  which need Tarjan or Kosaraju, see
  [Tarjan](../advancedgraphs/TarjanStronglyConnectedComponents.java).
- *"How would you list the vertices of each component?"* → keep a `parent → members` map and
  merge the lists, or run a DFS from each unvisited vertex.
- *"What if the same edge appears twice?"* → Union-Find handles it: the second union simply
  fails and the component count does not change.
- *"How do you detect a cycle while counting components?"* → count the successful unions; if
  there are more than `n - components` of them, a cycle exists.

**Common mistakes:**
- ❌ Forgetting that an isolated vertex is a component of its own → the answer is off by one.
- ❌ Counting **vertices minus successful unions** instead of using the counter → same number,
  but easy to get wrong when the graph has self-loops.
- ❌ Treating the edges as directed → the component count changes.

**How to narrate:**
> "Connected components in an undirected graph is exactly what union-find is for. I start with n
> singleton sets and union the endpoints of every edge; each successful union removes one
> component. The helper keeps the count, so the answer is just uf.components() at the end. I
> don't even need to build an adjacency list."

## Related Problems

- [Number of Provinces](./NumberOfProvinces.java) — the same count, but the graph comes as a matrix
- [Graph Valid Tree](./GraphValidTree.java) — "is there exactly one component and no cycle?"
- [Keys and Rooms](./KeysAndRooms.java) — reachability from a single starting vertex
- [Kruskal's Minimum Spanning Tree](../advancedgraphs/KruskalMinimumSpanningTree.java)
