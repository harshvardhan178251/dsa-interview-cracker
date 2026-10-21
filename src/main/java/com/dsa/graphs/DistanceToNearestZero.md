---
title: 01 Matrix
leetcode: 542
difficulty: Medium
patterns: [Multi-source BFS, Grid traversal]
companies: [Amazon, Meta, Facebook, Adobe, eBay, Wipro, Tech Mahindra, Razorpay]
frequency: 4
tags: [graph, grid, bfs, multi-source]
sampleInput: |
  3 4
  0001
  1011
  1111
sampleOutput: |
  0 0 0 1
  1 0 1 2
  2 1 2 3
---

# 01 Matrix — LeetCode 542

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Multi-source BFS · Grid traversal |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given a binary matrix, return the distance of every cell to the **nearest** cell that holds `0`.

## Input Format

```
rows cols
row0
row1
...
```

- `rows`, `cols` — the size of the grid (1 ≤ rows, cols ≤ 10⁴)
- `rows` lines follow, each holding exactly `cols` characters **without spaces**: `'0'` and `'1'`

## Sample Input

```
3 4
0001
1011
1111
```

## Expected Output

```
0 0 0 1
1 0 1 2
2 1 2 3
```

## Approach — multi-source BFS from every zero

Every `0` is a source with distance `0`. Put them all in the queue and run one BFS; the first
time a cell is reached, the level number is its distance to the nearest zero.

```
dist[r][c] = 0      for every zero (and it joins the queue)
dist[r][c] = -1     for every one (not visited yet)
```

The BFS then only has to look at `dist == -1` cells, which doubles as the visited marker.

**Why multi-source and not "one BFS per zero"?** One BFS per zero would be O(zeros · cells).
The multi-source version is a single traversal.

**Alternative: two-pass DP.** A left-to-right / right-to-left sweep computes the same distances
in O(cells) with O(1) extra space beyond the matrix, but it only works when movement is
4-directional *and* the matrix is processed in the right order. BFS is easier to reason about and
handles any neighbourhood.

## Dry Run

Initial `dist` (`-1` = unvisited):

```
 0  0  0 -1
-1  0 -1 -1
-1 -1 -1 -1
```

Queue (the four zeros): `[(0,0), (0,1), (0,2), (1,1)]`

| Level | Cell expanded | Newly reached | `dist` after |
|---:|---|---|---|
| 0 | — (the four zeros) | — | `0 0 0 -1 / -1 0 -1 -1 / -1 -1 -1 -1` |
| 1 | `(0,0)` | `(1,0)` = 1 | `0 0 0 -1 / 1 0 -1 -1 / -1 -1 -1 -1` |
| 1 | `(0,1)` | — (all neighbours already known) | unchanged |
| 1 | `(0,2)` | `(1,2)` = 1, `(0,3)` = 1 | `0 0 0 1 / 1 0 1 -1 / -1 -1 -1 -1` |
| 1 | `(1,1)` | `(2,1)` = 1 | `0 0 0 1 / 1 0 1 -1 / -1 1 -1 -1` |
| 2 | `(1,0)` | `(2,0)` = 2 | `0 0 0 1 / 1 0 1 -1 / 2 1 -1 -1` |
| 2 | `(1,2)` | `(2,2)` = 2 | `0 0 0 1 / 1 0 1 -1 / 2 1 2 -1` |
| 2 | `(0,3)` | `(1,3)` = 2 | `0 0 0 1 / 1 0 1 2 / 2 1 2 -1` |
| 2 | `(2,1)` | — | unchanged |
| 3 | `(2,0)` | — | unchanged |
| 3 | `(2,2)` | `(2,3)` = 3 | `0 0 0 1 / 1 0 1 2 / 2 1 2 3` |
| 3 | `(1,3)` | — (already 3) | unchanged |

Final answer:

```
0 0 0 1
1 0 1 2
2 1 2 3
```

## Java Solution

See [`DistanceToNearestZero.java`](./DistanceToNearestZero.java).

```java
public static int[][] updateMatrix(int[][] grid) {
    int[][] dist = new int[rows][cols];
    Deque<int[]> queue = new ArrayDeque<>();
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 0) {
                dist[r][c] = 0;
                queue.add(new int[]{r, c});
            } else {
                dist[r][c] = -1; // not visited yet
            }
        }
    }
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        for (int i = 0; i < levelSize; i++) {
            int[] cell = queue.poll();
            for (int[] dir : DIRS) {
                if (dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[cell[0]][cell[1]] + 1;
                    queue.add(new int[]{nr, nc});
                }
            }
        }
    }
    return dist;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | Each cell is enqueued once |
| **Space** | O(rows × cols) | The distance matrix and the queue |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) extra space?"* → yes, the two-pass DP sweep: first left-to-right and
  top-to-bottom, then right-to-left and bottom-to-top, using the matrix itself.
- *"What if the zeros were weighted differently?"* → Dijkstra with a priority queue.
- *"What if movement is diagonal as well?"* → add the diagonal offsets to `DIRS`; the distances
  change but the algorithm does not.
- *"What if you only need the distance for one cell?"* → a single-source BFS from that cell is
  simpler, but it gives the distance to the *nearest* one from that cell, not from a zero.

**Common mistakes:**
- ❌ Running BFS from each zero separately → quadratic.
- ❌ Forgetting to initialise the `1` cells to `-1` → the "unvisited" test never fires.
- ❌ Marking a cell as visited when it is **dequeued** → it can be enqueued several times.

**How to narrate:**
> "This is multi-source BFS: all the zeroes are sources at distance 0, so I put them in the
> queue together and expand in rings. The ring a cell is reached in is exactly its distance to
> the nearest zero. I mark cells with -1 and use that as the visited flag, so each cell is
> enqueued exactly once."

## Related Problems

- [Walls and Gates](./WallAndGates.java) — the same pattern with gates as the sources
- [Rotting Oranges](./RottingOranges.java) — the same pattern with time as the distance
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [Pacman Paths](./PacmanPaths.java) — single-source BFS on a grid
