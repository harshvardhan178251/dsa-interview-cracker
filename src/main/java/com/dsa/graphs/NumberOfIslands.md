---
title: Number of Islands
leetcode: 200
difficulty: Medium
patterns: [DFS, BFS, Grid traversal]
companies: [Google, Meta, Goldman Sachs, Facebook, Visa, TCS, Tech Mahindra, EY]
frequency: 4
tags: [graph, grid, dfs, bfs, flood-fill]
sampleInput: |
  3 3
  110
  001
  100
sampleOutput: "3"
---

# Number of Islands — LeetCode 200

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Grid DFS · Flood fill |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Given an `m × n` grid where `'1'` is land and `'0'` is water, return the number of **islands**.

An island is a maximal group of land cells connected **4-directionally** (up, down, left, right).
Diagonal contact does *not* count.

## Input Format

```
rows cols
row0
row1
...
```

- `rows`, `cols` — the size of the grid (1 ≤ rows, cols ≤ 300)
- `rows` lines follow, each holding exactly `cols` characters **without spaces**:
  - `'1'` = land, `'0'` = water

## Sample Input

```
3 3
110
001
100
```

## Expected Output

```
3
```

The land cells form three separate groups: `{0,0)-(0,1)}`, `{(1,2)}` and `{(2,0)}`.

## Approach — scan and flood

The naive way ("for every land cell, run a full search") is O(cells²) because the same island is
re-explored once per cell. The fix is to **destroy** what you have explored:

1. Walk the grid in row-major order.
2. The moment you see a land cell that has not been flooded yet, you have found a **new
   island** — increment the counter.
3. Run an iterative DFS from that cell, turning every reachable land cell into water (`'0'`).
   Those cells can never be counted again, so each cell is visited at most once overall.

**Mark on push, not on pop.** The cell is flipped to `'0'` the moment it is pushed onto the
stack. If you flipped it on pop instead, the same cell could be pushed several times before it
was processed, and the stack could grow quadratically.

**Why iterative DFS?** The recursive version blows the stack on a 300 × 300 grid of land
(90 000 frames). An explicit `ArrayDeque` of coordinates has the same time complexity and no
recursion limit.

## Dry Run

Grid (rows separated by `/`):

```
110 / 001 / 100
```

| Step | Scan hits | Action | Stack (top → bottom) | Grid after |
|---:|---|---|---|---|
| 0 | — | initial grid | `[]` | `110 / 001 / 100` |
| 1 | `(0,0)='1'` | island **#1** found, push `(0,0)`, mark it water | `[(0,0)]` | `110 / 001 / 100` |
| 2 | — | pop `(0,0)`; neighbour `(0,1)` is land → mark, push | `[(0,1)]` | `100 / 001 / 100` |
| 3 | — | pop `(0,1)`; neighbours `(0,0)`,`(0,2)`,`(1,1)` are water | `[]` | `100 / 001 / 100` |
| 4 | `(1,2)='1'` | island **#2** found, push `(1,2)`, mark it water | `[(1,2)]` | `100 / 001 / 100` |
| 5 | — | pop `(1,2)`; neighbours `(0,2)`,`(2,2)`,`(1,1)` are water | `[]` | `100 / 000 / 100` |
| 6 | `(2,0)='1'` | island **#3** found, push `(2,0)`, mark it water | `[(2,0)]` | `100 / 000 / 100` |
| 7 | — | pop `(2,0)`; neighbours `(1,0)`,`(2,1)` are water | `[]` | `000 / 000 / 000` |
| 8 | — | scan finishes — every remaining cell is water | `[]` | `000 / 000 / 000` |

**Answer: 3 islands.**

## Java Solution

See [`NumberOfIslands.java`](./NumberOfIslands.java).

```java
public static int numIslands(char[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    int islands = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                islands++;
                sinkIsland(grid, r, c);
            }
        }
    }
    return islands;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | The outer scan touches every cell once; every land cell is pushed and popped exactly once |
| **Space** | O(rows × cols) | The DFS stack can hold every land cell in the worst case |

**Optimal?** Yes — you have to look at every cell.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the grid is huge and does not fit in memory?"* → use a disjoint-set union over the
  land cells and merge horizontally/vertically adjacent ones; the answer is the number of
  remaining sets (see [Number of Connected Components](./NumberOfConnectedComponents.java)).
- *"What if we had to label each island instead of counting them?"* → keep the island index in a
  second grid instead of overwriting with `'0'`.
- *"Does diagonal connection count?"* → it does **not** here; if it did, add the two diagonal
  offsets to the direction array.

**Common mistakes:**
- ❌ Marking the cell as visited **after** popping it → the same cell can be pushed many times
  and the stack explodes.
- ❌ Forgetting to check the grid boundaries → `ArrayIndexOutOfBoundsException` on every edge.
- ❌ Using recursion on a large grid → `StackOverflowError`; an explicit deque is the safe choice.

**How to narrate:**
> "I scan the grid once. Whenever I find land that hasn't been flooded yet, that's a new island:
> I bump the counter and then flood the whole island by DFS, turning every reachable land cell
> into water. Because the flood destroys what it visits, no cell is ever processed twice, so the
> whole thing is O(rows × cols). I'll use an explicit stack rather than recursion so a large
> grid can't blow the call stack."

## Related Problems

- [Walls and Gates](./WallAndGates.java) — the same multi-source flood fill on a grid
- [01 Matrix](./DistanceToNearestZero.java) — flood fill from every source at once
- [Number of Connected Components](./NumberOfConnectedComponents.java) — the general graph version
- [Clone Graph](./CloneGraph.java) — copying an arbitrary connected structure
