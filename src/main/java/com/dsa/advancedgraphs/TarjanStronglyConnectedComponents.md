---
title: Tarjan's Strongly Connected Components
leetcode: null
difficulty: Hard
patterns: [Tarjan, Low-link values, DFS]
companies: [Meta, LinkedIn, Airbnb]
frequency: 4
tags: [graph, directed, scc, tarjan, low-link]
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

# Tarjan's Strongly Connected Components

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Tarjan · Low-link values |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given a **directed** graph, split it into **strongly connected components** — maximal sets of
vertices where every vertex can reach every other one.

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

`0 → 1 → 2 → 0` is a cycle, so `{0, 1, 2}` form one strongly connected component. Vertex `3`
can be reached from the cycle but cannot get back, so it is a component on its own.

The output lists the number of components on the first line, then one line per component with
its vertices in ascending order; the components themselves are ordered by their smallest vertex.

## Approach — Tarjan's algorithm in one DFS

Tarjan keeps two numbers per vertex:

- `index[v]` — the order in which `v` was discovered (a DFS timestamp);
- `low[v]` — the **smallest** `index` reachable from `v`'s DFS subtree using tree edges and at
  most one back edge.

During the DFS of a vertex `v`:

1. Set `index[v] = low[v] = counter++`, push `v` onto a **stack** and mark it as "on the stack".
2. For each neighbour `w`:
   - if `w` is unvisited, recurse into it and set `low[v] = min(low[v], low[w])`;
   - else if `w` is **on the stack**, set `low[v] = min(low[v], index[w])`.
3. After the neighbours, if `low[v] == index[v]`, then `v` is the **root of a component**: pop
   the stack until (and including) `v` — everything popped belongs to that component.

**Why `low[v] == index[v]` means "component root".** If `low[v] < index[v]`, then some vertex
in `v`'s subtree can reach back to a vertex discovered before `v`, so `v` is part of a bigger
cycle that continues above it — `v` is not a root. If `low[v] == index[v]`, nothing in the
subtree can escape past `v`, so the stack segment down to `v` is closed under reachability.

**The stack is the trick.** Vertices stay on it until their component is closed, which is why a
vertex that is still "on the stack" can be part of a cycle even though it was already visited.

## Dry Run

Edges: `0→1`, `1→2`, `2→0`, `2→3`

| Step | Vertex | `index` | `low` | Neighbour | Action | Stack | On stack |
|---:|---|---:|---:|---|---|---|---|
| 1 | `0` | 0 | 0 | `1` | unvisited → recurse into `1` | `[0]` | `{0}` |
| 2 | `1` | 1 | 1 | `2` | unvisited → recurse into `2` | `[0, 1]` | `{0, 1}` |
| 3 | `2` | 2 | 2 | `0` | visited **and on the stack** → `low[2] = min(2, index[0]=0) = 0` | `[0, 1, 2]` | `{0, 1, 2}` |
| 4 | `2` | 2 | 0 | `3` | unvisited → recurse into `3` | `[0, 1, 2, 3]` | `{0, 1, 2, 3}` |
| 5 | `3` | 3 | 3 | — | no neighbours; `low[3] == index[3]` → **pop the component** `{3}` | `[0, 1, 2]` | `{0, 1, 2}` |
| 6 | `2` | 2 | 0 | — | `low[2] = 0 ≠ index[2] = 2` → not a root | `[0, 1, 2]` | `{0, 1, 2}` |
| 7 | `1` | 1 | 0 | — | `low[1] = min(1, low[2]=0) = 0 ≠ index[1] = 1` → not a root | `[0, 1, 2]` | `{0, 1, 2}` |
| 8 | `0` | 0 | 0 | — | `low[0] = 0 == index[0]` → **pop the component** `{2, 1, 0}` | `[]` | `{}` |

Components found: `{3}` and `{2, 1, 0}` → sorted → **`{0, 1, 2}`** and **`{3}`**.

```
2
0 1 2
3
```

## Java Solution

See [`TarjanStronglyConnectedComponents.java`](./TarjanStronglyConnectedComponents.java).

```java
void visit(int v) {
    index[v] = low[v] = counter++;
    stack.add(v);
    onStack[v] = true;
    for (int w : adj.get(v)) {
        if (index[w] == -1) {
            visit(w);
            low[v] = Math.min(low[v], low[w]);
        } else if (onStack[w]) {
            low[v] = Math.min(low[v], index[w]);
        }
    }
    if (low[v] == index[v]) {
        List<Integer> component = new ArrayList<>();
        while (true) {
            int w = stack.remove(stack.size() - 1);
            onStack[w] = false;
            component.add(w);
            if (w == v) {
                break;
            }
        }
        components.add(component);
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every vertex is pushed/popped once, every edge is examined once |
| **Space** | O(n + m) | Adjacency list, the index/low arrays and the component stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What is the difference between Kosaraju and Tarjan?"* → Kosaraju needs two DFS passes and a
  transposed graph; Tarjan needs one pass but a stack and the low-link bookkeeping.
  See [Kosaraju](./KosarajuStronglyConnectedComponents.java).
- *"Can you find the SCC of a specific vertex?"* → in Tarjan you know it the moment you pop the
  component; in Kosaraju you need the second pass.
- *"How do you condense the SCCs into a DAG?"* → replace each component with one node; the
  result is always acyclic, so you can topologically sort it.
- *"How would you scale this to a huge graph?"* → the algorithm is already linear, but the
  recursion depth is `O(n)`; convert it to an explicit stack for very deep graphs.
- *"What about weakly connected components?"* → just ignore the edge directions and use
  Union-Find.

**Common mistakes:**
- ❌ Using `low[v] = min(low[v], index[w])` for a neighbour that is visited but **not** on the
  stack → that vertex already belongs to a finished component and must not be merged.
- ❌ Forgetting `low[v] = min(low[v], low[w])` after recursing into a child → the child's
  information never reaches the parent.
- ❌ Popping the component stack one element too few → the component misses a vertex.

**How to narrate:**
> "Tarjan does it in a single DFS. Each vertex gets a discovery index and a low-link value, the
> smallest index reachable from its subtree. When I recurse into a child I fold the child's low
> into mine; when I meet an already visited vertex that is still on my stack I fold in its
> index. Vertices stay on the stack until their component is complete, and when low equals index
> I pop the component off the stack."

## Related Problems

- [Kosaraju's Strongly Connected Components](./KosarajuStronglyConnectedComponents.java)
- [Bridges in a Graph](./BridgesInGraph.java) — the same
  low-link idea on undirected graphs
- [Articulation Points in a Graph](./ArticulationPoints.java)
- [Topological Sort](../graphs/TopologicalSort.java)
