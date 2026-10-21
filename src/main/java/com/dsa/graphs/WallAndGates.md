---
title: Walls and Gates
leetcode: 286
difficulty: Medium
patterns: [Multi-source BFS, Grid traversal]
companies: [Amazon, Google, Meta, Uber]
frequency: 3
tags: [graph, grid, bfs, multi-source]
sampleInput: |
  3 3
  100000 -1 100000
  100000 -1 100000
  100000 100000 0
sampleOutput: |
  4 -1 2
  3 -1 1
  2 1 0
---

# Walls and Gates — LeetCode 286

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Multi-source BFS · Grid traversal |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Every cell of a grid is a **wall**, a **gate** or an **open space**. The distance of an open
space is the number of steps to the nearest gate. Gates keep distance `0` and walls keep `-1`.

Compute the distance of every open space in the least possible number of steps.

## Input Format

```
rows cols
row0
row1
...
```

- `rows`, `cols` — the size of the grid
- `rows` lines follow, each with `cols` **space-separated integers**:
  - `0` = gate
  - `-1` = wall
  - any **positive** value = open space (the value itself is irrelevant — it is just a marker)

## Sample Input

```
3 3
100000 -1 100000
100000 -1 100000
100000 100000 0
```

## Expected Output

```
4 -1 2
3 -1 1
2 1 0
```

The single gate is at the bottom-right corner; the distances ripple outwards from it, and the
two wall cells keep `-1`.

## Approach — multi-source BFS from every gate

All gates are the **sources** of the same wave, so put them all into the queue at distance `0`
and run one BFS:

1. Seed the queue with every gate; mark them as settled.
2. Pop a cell; each unvisited open neighbour gets `distance = distance[cell] + 1` and is queued.
3. Walls are never entered.

BFS explores in rings, and the ring a cell is reached in **is** its distance to the nearest gate.

**Why not run BFS from every gate separately?** That is `O(gates · rows · cols)` — one full
traversal per gate. Multi-source BFS does it in a single traversal.

**A subtlety.** The open cells are marked with an arbitrary positive number, so "has this cell
already been visited?" cannot be answered by looking at its value — after we write the distance
the value is still positive. We keep a separate `settled` matrix for exactly that reason.

## Dry Run

| Level | Queue at start | Cell | Neighbours (open) | Distances written | Queue at end |
|---:|---|---|---|---|---|
| 0 | `[(2,2)]` | — | — | the gate `(2,2)` is `0` | `[(2,2)]` |
| 1 | `[(2,2)]` | `(2,2)` | `(1,2)`, `(2,1)` | `(1,2)=1`, `(2,1)=1` | `[(1,2), (2,1)]` |
| 2 | `[(1,2), (2,1)]` | `(1,2)` | `(0,2)` — `(1,1)` is a wall | `(0,2)=2` | `[(2,1), (0,2)]` |
| 2 | `[(2,1)]` | `(2,1)` | `(2,0)` — `(1,1)` is a wall | `(2,0)=2` | `[(0,2), (2,0)]` |
| 3 | `[(0,2), (2,0)]` | `(0,2)` | none — `(0,1)` is a wall | — | `[(2,0)]` |
| 3 | `[(2,0)]` | `(2,0)` | `(1,0)` | `(1,0)=3` | `[(1,0)]` |
| 4 | `[(1,0)]` | `(1,0)` | `(0,0)` | `(0,0)=4` | `[(0,0)]` |
| 5 | `[(0,0)]` | `(0,0)` | none | — | `[]` |

Final grid:

```
4 -1 2
3 -1 1
2 1 0
```

## Java Solution

See [`WallAndGates.java`](./WallAndGates.java).

```java
public static void wallsAndGates(int[][] grid) {
    boolean[][] settled = new boolean[rows][cols];
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 0) {
                queue.add(new int[]{r, c});
                settled[r][c] = true;
            }
        }
    }
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        for (int i = 0; i < levelSize; i++) {
            int[] cell = queue.poll();
            for (int[] dir : DIRS) {
                // ... skip walls and already settled cells, otherwise write the distance ...
            }
        }
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | Each cell is settled once |
| **Space** | O(rows × cols) | The queue and the `settled` matrix |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if we also want the direction back to the nearest gate?"* → keep a `parent` array
  alongside the distances and walk it backwards.
- *"What if the gates have different 'open times'?"* → it becomes a time-dependent problem;
  use a priority queue keyed on arrival time.
- *"What if the grid is a maze with doors?"* → model doors as extra edge weights and use Dijkstra.
- *"What if you have to answer this for many grids?"* → the algorithm is linear in the grid size,
  which is optimal.

**Common mistakes:**
- ❌ Running a separate BFS from each gate → O(gates · cells) instead of O(cells).
- ❌ Using the cell value to detect "already visited" → after writing the distance the value is
  still positive, so the cell would be re-entered forever (infinite loop).
- ❌ Letting the BFS walk **through** walls → the distance to a cell behind a wall would be wrong.

**How to narrate:**
> "Every gate is a source, so this is a multi-source BFS: I put all the gates in the queue at
> distance 0 and expand in rings. The first time a cell is reached its distance is the distance
> to the nearest gate. Walls are never enqueued. I keep a separate visited matrix because the
> open cells are marked with an arbitrary positive number that doesn't tell me whether they've
> been settled."

## Related Problems

- [01 Matrix](./DistanceToNearestZero.java) — the same pattern with the sources in the grid
- [Rotting Oranges](./RottingOranges.java) — the same pattern with time as the distance
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [Shortest Path in a Binary Maze](./ShortestPathInBinaryGrid.java) — single-source BFS on a grid
