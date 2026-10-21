---
title: Pacman Paths
leetcode: null
difficulty: Medium
patterns: [BFS, Grid traversal, Shortest path]
companies: [Meta, Salesforce]
frequency: 3
tags: [graph, grid, bfs, shortest-path]
sampleInput: |
  5 5
  .....
  .###.
  .###.
  .###.
  .....
  0 0
  4 4
sampleOutput: "8"
---

# Pacman Paths

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Shortest path on a grid |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Pacman walks through a maze of pellets and walls. Find the **minimum number of moves** needed to
get from the start cell to the target cell.

Pacman moves one cell **up, down, left or right** per move, and cannot enter a wall. Return
`-1` when the target cannot be reached.

## Input Format

```
rows cols
row0
row1
...
startRow startCol
targetRow targetCol
```

- `rows`, `cols` — the size of the maze
- `rows` lines follow, each holding exactly `cols` characters **without spaces**:
  - `'.'` = pellet / open cell
  - `'#'` = wall
- `startRow startCol` — the start cell (0-based)
- `targetRow targetCol` — the target cell (0-based)

## Sample Input

```
5 5
.....
.###.
.###.
.###.
.....
0 0
4 4
```

## Expected Output

```
8
```

The only route is around the wall block: right 4, down 4 — 8 moves.

## Approach — BFS on the grid

Every move costs exactly one step, so the maze is an unweighted graph and BFS gives the
shortest path:

1. `dist[sr][sc] = 0` and push the start cell.
2. Dequeue a cell and look at its four neighbours. A neighbour is enterable when it is inside
   the grid, is not a wall and has not been visited.
3. Set `dist[neighbour] = dist[cell] + 1`, enqueue it, and return immediately when it is the
   target.

The `dist` matrix doubles as the visited marker: `-1` means "not visited yet".

**Edge cases:** the start or the target sitting on a wall → `-1`; start == target → `0`.

## Dry Run

Level = the number of moves so far. The frontier is the set of cells at that distance.

| Level | Frontier (cells reached) | New cells | Frontier size |
|---:|---|---|---:|
| 0 | `(0,0)` | — | 1 |
| 1 | `(0,0)` | `(0,1)`, `(1,0)` | 2 |
| 2 | `(0,1)`, `(1,0)` | `(0,2)`, `(2,0)` | 2 |
| 3 | `(0,2)`, `(2,0)` | `(0,3)`, `(3,0)` | 2 |
| 4 | `(0,3)`, `(3,0)` | `(0,4)`, `(4,0)` | 2 |
| 5 | `(0,4)`, `(4,0)` | `(1,4)`, `(4,1)` | 2 |
| 6 | `(1,4)`, `(4,1)` | `(2,4)`, `(4,2)` | 2 |
| 7 | `(2,4)`, `(4,2)` | `(3,4)`, `(4,3)` | 2 |
| 8 | `(3,4)`, `(4,3)` | **`(4,4)` = target** | — |

The target is reached at level **8** → answer **`8`**.

### Unreachable target

```
3 3
...
.#.
...
0 0
2 2
```

| Level | Frontier | New cells |
|---:|---|---|
| 0 | `(0,0)` | — |
| 1 | `(0,0)` | `(0,1)`, `(1,0)` |
| 2 | `(0,1)`, `(1,0)` | `(0,2)` (from `(0,1)`); `(1,0)` has no open neighbour below — `(2,0)` is open → `(2,0)` |

Hmm — with the wall only at `(1,1)`, the maze is still connected: `0,0 → 1,0 → 2,0 → 2,1 → 2,2`
is 4 moves. The unreachable case needs a **wall that separates** the maze, for example:

```
3 3
.#.
.#.
.#.
```

Here column 1 is entirely wall, so `(0,0)` and `(2,2)` are in different components → the BFS
exhausts the frontier without reaching the target → answer **`-1`**.

## Java Solution

See [`PacmanPaths.java`](./PacmanPaths.java).

```java
public static int shortestPath(char[][] maze, int sr, int sc, int tr, int tc) {
    int[][] dist = new int[rows][cols];
    Arrays.fill(dist[r], -1);
    Deque<int[]> queue = new ArrayDeque<>();
    dist[sr][sc] = 0;
    queue.add(new int[]{sr, sc});
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] dir : DIRS) {
            int nr = cell[0] + dir[0], nc = cell[1] + dir[1];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                continue;
            }
            if (maze[nr][nc] == '#' || dist[nr][nc] != -1) {
                continue;
            }
            dist[nr][nc] = dist[cell[0]][cell[1]] + 1;
            if (nr == tr && nc == tc) {
                return dist[nr][nc];
            }
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
- *"Pacman eats the pellet — does that change anything?"* → not for the shortest path, but it
  changes the problem if Pacman must eat **all** pellets (that is NP-hard — the "Pac-Man
  problem").
- *"What if the moves have different costs?"* → use Dijkstra with a priority queue.
- *"What if Pacman can tunnel through walls after eating a power pill?"* → the state becomes
  `(row, col, hasPowerPill)` and you run BFS over the enlarged state space.
- *"How would you return the path, not just its length?"* → keep a parent array and walk it back.

**Common mistakes:**
- ❌ Forgetting the boundary check → `ArrayIndexOutOfBoundsException`.
- ❌ Marking visited **after** dequeuing → the same cell can be enqueued several times.
- ❌ Treating `'#'` as an open cell → the path goes through walls.

**How to narrate:**
> "Every move has the same cost, so it's a plain BFS on the grid. I keep a distance matrix that
> doubles as the visited flag, start from the given cell and expand in four directions, skipping
> walls and already visited cells. The first time I reach the target its distance is the
> minimum number of moves; if the queue empties first the target is unreachable and I return
> -1."

## Related Problems

- [Shortest Path in a Binary Maze](./ShortestPathInBinaryGrid.java) — the same shape, `0`/`1` cells
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [01 Matrix](./DistanceToNearestZero.java) — multi-source BFS
- [Word Ladder](./WordLadder.java) — BFS over a graph of strings
