---
title: Number of Provinces
leetcode: 547
difficulty: Medium
patterns: [Union-Find, Connected components, Adjacency matrix]
companies: [Amazon, Google, Meta, Uber, LinkedIn]
frequency: 4
tags: [graph, matrix, union-find, components]
sampleInput: |
  3
  1 1 0
  1 1 0
  0 0 1
sampleOutput: "2"
---

# Number of Provinces — LeetCode 547

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Union-Find · Connected components |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

A square matrix `isConnected` describes a graph: `isConnected[i][j] = 1` means cities `i` and
`j` are directly connected. Return the number of **provinces**, i.e. the number of connected
components.

## Input Format

```
n
row0
row1
...
```

- `n` — size of the matrix (`1 ≤ n ≤ 200`)
- `n` lines follow, each with `n` space-separated values, `0` or `1`

## Sample Input

```
3
1 1 0
1 1 0
0 0 1
```

## Expected Output

```
2
```

Cities `{0, 1}` form one province, city `{2}` forms the other.

## Approach — the same component count, fed from a matrix

The graph is undirected and the matrix is symmetric, so the upper triangle (`j > i`) contains
every edge exactly once. Feed those edges into a
{@link com.dsa.utils.UnionFind} and count the surviving sets.

**Why the upper triangle only.** Scanning the whole matrix would process every edge twice —
harmless for Union-Find (the second union simply fails) but twice the work, and it makes the
dry run harder to read.

**Why not BFS?** BFS over the matrix also works and is O(n²), but it needs a visited array and
a nested loop per vertex. Union-Find needs neither an adjacency list nor a visited array: one
pass over the matrix is enough.

## Dry Run

Union-Find starts with 3 components.

| Step | `i` | `j` | `isConnected[i][j]` | `find(i)` | `find(j)` | `union` | Components after |
|---:|---:|---:|---|---:|---:|---|---:|
| 0 | — | — | — | — | — | — | 3 |
| 1 | 0 | 1 | 1 | 0 | 1 | ✔ merged | 2 |
| 2 | 0 | 2 | 0 | — | — | skipped | 2 |
| 3 | 1 | 2 | 0 | — | — | skipped | 2 |

**Answer: 2 provinces** — `{0, 1}` and `{2}`.

### A fully connected matrix

```
3
1 1 1
1 1 1
1 1 1
```

| Step | `i` | `j` | `isConnected[i][j]` | `union` | Components after |
|---:|---:|---:|---|---|---:|
| 1 | 0 | 1 | 1 | ✔ | 2 |
| 2 | 0 | 2 | 1 | ✔ | 1 |
| 3 | 1 | 2 | 1 | ✘ already together | 1 |

**Answer: 1 province.**

## Java Solution

See [`NumberOfProvinces.java`](./NumberOfProvinces.java).

```java
public static int countProvinces(int[][] isConnected) {
    int n = isConnected.length;
    UnionFind uf = new UnionFind(n);
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (isConnected[i][j] == 1) {
                uf.union(i, j);
            }
        }
    }
    return uf.components();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n² · α(n)) | We look at every matrix entry once; the unions are effectively constant |
| **Space** | O(n) | The Union-Find arrays, besides the matrix itself |

## Interview Notes

**Follow-ups to raise yourself:**
- *"The matrix is not symmetric — what then?"* → then it is a **directed** graph and you want
  the number of **strongly** connected components; use Tarjan or Kosaraju.
- *"Can you do it with BFS instead?"* → yes: for every unvisited city run a BFS over the matrix
  row and count the traversals.
- *"What if the matrix were huge and sparse?"* → store an adjacency list instead of a matrix and
  use Union-Find over the edge list.
- *"Can you also return the cities of each province?"* → keep a `root → members` map in the
  Union-Find and merge the lists on every union.

**Common mistakes:**
- ❌ Scanning the **whole** matrix and unioning both `(i, j)` and `(j, i)` → twice the work; the
  second union always fails.
- ❌ Forgetting that the diagonal is `1` for every city (a city is connected to itself) → only
  the strict upper triangle is scanned, so the diagonal never causes a problem.
- ❌ Assuming the matrix can be non-symmetric → it is a directed problem, not this one.

**How to narrate:**
> "Provinces are connected components, so I'll use union-find. The matrix is symmetric, so I
> only scan the strict upper triangle to get every edge exactly once. For each 1 I union the two
> cities, and the number of sets left is the number of provinces."

## Related Problems

- [Number of Connected Components](./NumberOfConnectedComponents.java) — the edge-list version
- [Graph Valid Tree](./GraphValidTree.java) — "is there exactly one component?"
- [Clone Graph](./CloneGraph.java) — the graph as an explicit structure
- [Bipartite Check](./BipartiteCheck.java) — colouring the components
