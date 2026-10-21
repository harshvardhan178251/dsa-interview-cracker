---
title: Shortest Path in a Binary Maze
leetcode: 1293
difficulty: Medium
patterns: [BFS, Grid traversal, Dynamic programming]
companies: [Amazon, Google, Meta, Uber]
frequency: 3
tags: [graph, grid, bfs, shortest-path]
sampleInput: |
  3 4
  0000
  1110
  0000
sampleOutput: "5"
---

# Shortest Path in a Binary Maze — LeetCode 1293

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Shortest path on a grid |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A maze is a grid where `0` is an **open** cell and `1` is a **blocked** cell. Find the shortest
number of steps from the **top-left** cell to the **bottom-right** cell. Return `-1` when the
target cannot be reached.

## Input Format

```
rows cols
row0
row1
...
```

- `rows`, `cols` — the size of the maze (1 ≤ rows, cols ≤ 100)
- `rows` lines follow, each holding exactly `cols` characters **without spaces**:
  `'0'` = open, `'1'` = blocked

## Sample Input

```
3 4
0000
1110
0000
```

## Expected Output

```
5
```

The only route is along the top row and then down the right column:
`(0,0) → (0,1) → (0,2) → (0,3) → (1,3) → (2,3)` — 5 steps.

## Approach — BFS from the top-left corner

Every step costs one, so the maze is an unweighted graph and BFS gives the shortest path.

1. `dist[0][0] = 0`, push `(0, 0)`.
2. Expand in the four directions, skipping cells that are out of bounds, blocked, or already
   visited.
3. When the bottom-right cell is dequeued its distance is the answer.

**Movement.** This implementation moves **up, down, left and right** — a general maze. LeetCode
1293 restricts the movement to **right and down only**; with that restriction the same BFS
works, you just shrink the direction list to `{{0, 1}, {1, 0}}`. (With right/down only a
right-to-left / top-to-bottom DP sweep is another valid solution, since every path has the same
length structure.)

## Dry Run

| Level | Cell dequeued | Open neighbours | `dist` written |
|---:|---|---|---|
| 0 | `(0,0)` | `(0,1)`; `(1,0)` is blocked | `dist[0][1] = 1` |
| 1 | `(0,1)` | `(0,2)`; `(1,1)` is blocked | `dist[0][2] = 2` |
| 2 | `(0,2)` | `(0,3)`; `(1,2)` is blocked | `dist[0][3] = 3` |
| 3 | `(0,3)` | `(1,3)` | `dist[1][3] = 4` |
| 4 | `(1,3)` | `(2,3)` | `dist[2][3] = 5` |
| 5 | `(2,3)` | — this is the target | return **5** |

The `dist` matrix after the run:

```
0 1 2 3
-1 -1 -1 4
-1 -1 -1 5
```

## Java Solution

See [`ShortestPathInBinaryGrid.java`](./ShortestPathInBinaryGrid.java).

```java
public static int shortestPathBinaryGrid(int[][] grid) {
    int[][] dist = new int[rows][cols];
    Arrays.fill(dist[r], -1);
    Deque<int[]> queue = new ArrayDeque<>();
    dist[0][0] = 0;
    queue.add(new int[]{0, 0});
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        int r = cell[0], c = cell[1];
        if (r == rows - 1 && c == cols - 1) {
            return dist[r][c];
        }
        for (int[] dir : DIRS) {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                continue;
            }
            if (grid[nr][nc] == 1 || dist[nr][nc] != -1) {
                continue;
            }
            dist[nr][nc] = dist[r][c] + 1;
            queue.add(new int[]{nr, nc});
        }
    }
    return -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | Each cell is enqueued at most once |
| **Space** | O(rows × cols) | The distance matrix and the queue |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the movement is only right and down?"* → restrict the direction list; the answer can
  then also be computed with a two-line DP.
- *"What if there are weighted cells?"* → Dijkstra.
- *"What if the maze has portals?"* → model the portals as extra zero-cost edges; BFS needs to
  handle multiple sources per level.
- *"Can you count the number of shortest paths?"* → do DP over the distance matrix, adding the
  number of ways of each predecessor.

**Common mistakes:**
- ❌ Not checking that the **start** is open → the BFS starts inside a wall.
- ❌ Using `dist == 0` as "unvisited" → the start cell has distance `0`; use `-1`.
- ❌ Returning the distance of the cell *when it is generated* instead of when it is dequeued —
  that is still correct here, but returning early on generation is only valid because BFS
  distances are non-decreasing; dequeueing is the safer habit.

**How to narrate:**
> "All moves cost one step, so it's a plain BFS over the grid. I keep a distance matrix that
> doubles as the visited flag, start in the top-left corner and expand in four directions,
> skipping blocked and already visited cells. When I dequeue the bottom-right cell its distance
> is the shortest path length; if the queue empties first the target is unreachable and I
> return -1."

## Related Problems

- [Pacman Paths](./PacmanPaths.java) — the same BFS with an explicit start and target
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [01 Matrix](./DistanceToNearestZero.java) — multi-source BFS
- [Network Delay Time](./NetworkDelayTime.java) — the weighted version of the same idea
