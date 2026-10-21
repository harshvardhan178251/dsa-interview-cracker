---
title: Rotting Oranges
leetcode: 994
difficulty: Medium
patterns: [Multi-source BFS, Grid traversal]
companies: [Google, Amazon, JP Morgan, Netflix, eBay, Wipro, Infosys, Barclays]
frequency: 4
tags: [graph, grid, bfs, simulation]
sampleInput: |
  3 4
  1000
  1000
  1000
sampleOutput: "3"
---

# Rotting Oranges — LeetCode 994

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Multi-source BFS · Level order |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Every minute, any orange that is **adjacent to a rotten orange** becomes rotten. Return the
number of minutes until every orange has rotted, or `-1` if some orange never rots.

Cell values:

| Value | Meaning |
|---|---|
| `0` | fresh orange |
| `1` | rotten orange |
| `2` | empty cell (no orange) |

## Input Format

```
rows cols
row0
row1
...
```

- `rows`, `cols` — the size of the grid (1 ≤ rows, cols ≤ 10)
- `rows` lines follow, each holding exactly `cols` characters **without spaces**:
  `'0'` fresh, `'1'` rotten, `'2'` empty

## Sample Input

```
3 4
1000
1000
1000
```

## Expected Output

```
3
```

Column 0 is rotten at minute 0, column 1 rots at minute 1, column 2 at minute 2 and column 3 at
minute 3.

## Approach — multi-source BFS

All rotten oranges rot **simultaneously**, so they are all sources of the same wave. Put every
rotten orange into the queue at the start and run a level-order BFS:

1. Seed the queue with every rotten orange and count the fresh ones.
2. Take the current queue **size** — that many oranges all rot in the same minute. Process
   exactly that many and enqueue the fresh oranges they infect.
3. Increment the minute counter.
4. Stop as soon as no fresh orange is left. If the queue empties while fresh oranges remain,
   they are cut off from every rotten orange → answer `-1`.

**Why level-order and not "time per cell"?** Because the minute a cell rots is exactly its
distance from the nearest initially-rotten orange. BFS computes those distances in one pass.

## Dry Run

| Minute | Queue at start | Cells that become rotten | Fresh left | Queue at end |
|---:|---|---|---:|---|
| 0 | `[(0,0), (1,0), (2,0)]` | — (the initial rotten ones) | 9 | `[(0,0), (1,0), (2,0)]` |
| 1 | `[(0,0), (1,0), (2,0)]` | `(0,1)`, `(1,1)`, `(2,1)` | 6 | `[(0,1), (1,1), (2,1)]` |
| 2 | `[(0,1), (1,1), (2,1)]` | `(0,2)`, `(1,2)`, `(2,2)` | 3 | `[(0,2), (1,2), (2,2)]` |
| 3 | `[(0,2), (1,2), (2,2)]` | `(0,3)`, `(1,3)`, `(2,3)` | 0 | `[(0,3), (1,3), (2,3)]` |

No fresh orange is left after minute **3** → answer **`3`**.

### The unreachable case

```
3 3
200
000
000
```

There is no rotten orange at all, so the queue starts empty, the loop never runs and 7 fresh
oranges remain → answer **`-1`**.

## Java Solution

See [`RottingOranges.java`](./RottingOranges.java).

```java
public static int orangesRotting(int[][] grid) {
    Deque<int[]> queue = new ArrayDeque<>();
    int fresh = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                queue.add(new int[]{r, c});
            } else if (grid[r][c] == 0) {
                fresh++;
            }
        }
    }
    int minutes = 0;
    while (!queue.isEmpty() && fresh > 0) {
        int levelSize = queue.size();
        for (int i = 0; i < levelSize; i++) {
            int[] cell = queue.poll();
            for (int[] dir : DIRS) {
                // ... infect fresh neighbours ...
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows × cols) | Each cell is enqueued at most once |
| **Space** | O(rows × cols) | The queue can hold every cell |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the infection also spreads diagonally?"* → add the two diagonal offsets to `DIRS`.
- *"What if different oranges rot at different rates?"* → it is a Dijkstra problem: use a
  min-heap keyed on the time at which each cell becomes rotten.
- *"What if the grid is a torus (it wraps around)?"* → the neighbour coordinates become
  `(r ± 1) mod rows` and `(c ± 1) mod cols`.
- *"Can you do it without a queue?"* → yes, with repeated passes over the grid, but that is
  O(rows × cols × minutes) instead of O(rows × cols).

**Common mistakes:**
- ❌ Incrementing the minute counter **per cell** instead of per level → the answer is too big.
- ❌ Taking `queue.size()` again inside the loop → new infections would be processed in the same
  minute. Snapshot the size before the loop.
- ❌ Forgetting the `fresh > 0` condition → with no fresh orange left you would keep counting
  empty minutes.

**How to narrate:**
> "This is multi-source BFS: every initially rotten orange is a source, so I put them all in
> the queue at once. Then each BFS level is exactly one minute of spreading — I snapshot the
> queue size so newly infected oranges wait for the next minute. If fresh oranges are left when
> the queue drains, they were never connected to a rotten one and the answer is -1."

## Related Problems

- [Walls and Gates](./WallAndGates.java) — the same multi-source pattern
- [01 Matrix](./DistanceToNearestZero.java) — distance to the nearest source
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [Shortest Path in a Binary Maze](./ShortestPathInBinaryGrid.java) — single-source BFS on a grid
