---
title: Unique Paths III
leetcode: 980
difficulty: Hard
patterns: [Backtracking, DFS on a grid]
companies: [Amazon, Goldman Sachs, Facebook]
frequency: 3
tags: [dynamic-programming, backtracking, grid, hard]
sampleInput: |
  3 3
  1 0 0 0 0 0 0 0 2
sampleOutput: "2"
---

# Unique Paths III — LeetCode 980

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · DFS on a grid |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

You are given an `m × n` grid where each cell is:

- `1` — the starting square (exactly one)
- `2` — the ending square (exactly one)
- `0` — an empty square that may be walked over
- `-1` — an obstacle that may not be entered

Count the **4-directional walks** that start at the `1`, end at the `2` and step on **every non-obstacle square exactly once**.

## Input Format

The program reads from standard input:

```
rows cols
grid[0][0] grid[0][1] ... grid[rows-1][cols-1]
```

- `rows` — number of rows (1 ≤ rows ≤ 20)
- `cols` — number of columns (1 ≤ cols ≤ 20)
- the next `rows * cols` integers are the grid values read row by row:
  `1` = start square, `2` = end square, `0` = empty square, `-1` = obstacle

## Sample Input

```
3 3
1 0 0 0 0 0 0 0 2
```

## Expected Output

```
2
```

The 3 × 3 grid has exactly **2** walks that start at `1`, end at `2` and step on every cell exactly once.

## Approach

A normal grid DP cannot work here: the state would have to contain the **set** of visited cells, not just the position. So this is a backtracking search.

1. Count the non-obstacle cells (`total`) and find the start square.
2. Mark the start as visited and start a depth-first search from it.
3. At every step, try the four neighbours; skip the ones outside the grid, on an obstacle or    already visited.
4. When the search reaches the `2`, it only counts if every cell has been visited.
5. Undo the mark when the branch is finished — that is the backtracking.

The visited cells are stored **in the grid itself** (marked `-1`), which saves a separate set. The search is `O(3^(m·n))` in the worst case, which is why the grid is limited to 20 × 20.

## Dry Run

Input: a 3 × 3 grid with the start at `(0,0)`, the end at `(2,2)` and no obstacles — so all **9** cells have to be visited.

The search tries all four directions from every cell and backtracks when it dead-ends. The two complete walks are:

| walk | path (row, col) |
|---:|---|
| 1 | (0,0) → (0,1) → (0,2) → (1,2) → (1,1) → (2,1) → (2,0) → (1,0) → (2,2) |
| 2 | (0,0) → (1,0) → (2,0) → (2,1) → (1,1) → (0,1) → (0,2) → (1,2) → (2,2) |

Every other branch reaches the end square before all nine cells were used, or gets stuck.

**The search tree around the start** (the four branches, with the ones that die marked):

| branch | first move | outcome |
|---:|---|---|
| 1 | down to (1,0) | completes the walk shown above |
| 2 | right to (0,1) | completes the mirror walk |
| 3 | up to (−1,0) | outside the grid — pruned |
| 4 | left to (0,−1) | outside the grid — pruned |

Answer **2**.

**How the visited-mark works.** The grid cell itself is the visited flag:

| moment | cell `(1,1)` | meaning |
|---|---|---|
| before the search | `0` | free |
| while the walk steps on it | `-1` | already used — the neighbours are skipped |
| after the branch is done | `0` | free again — the backtrack |

**Pruning.** A walk that reaches the `2` while `left > 1` is discarded: the walk has to end there, and the remaining cells could not be visited afterwards.

**The count of cells.** `total` counts every cell that is not an obstacle — the start and the end included. The search starts with `left = total`.

## Java Solution

See [`GridUniquePathsIII.java`](./GridUniquePathsIII.java).

```java
    public static int uniquePathsIII(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;

        int startRow = 0;
        int startCol = 0;
        int total = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    startRow = r;
                    startCol = c;
                }
                if (grid[r][c] != -1) {
                    total++;
                }
            }
        }

        int[] answer = new int[1];
        grid[startRow][startCol] = -1;
        dfs(grid, startRow, startCol, total, answer);
        return answer[0];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(3^(rows·cols)) | the search explores up to `3^(rows·cols)` walks (four directions, minus the one you came from) |
| **Space** | O(rows · cols) | the recursion stack is at most `rows · cols` deep; the grid is reused for the visited marks |

**Space `O(rows · cols)`** — the grid doubles as the visited set, so only the recursion stack is extra.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you prune the search?"* → yes: a connectivity check (flood fill from the current cell must still reach every unvisited cell) and a parity check for the bipartite colouring.
- "Why not a DP?"* → the state would have to contain the visited set; a bitmask DP works only for tiny grids.
- "How would you change it to count only the paths that visit every cell in order?"* → that is the ordinary Unique Paths II DP.
- "What if the robot may also move diagonally?"* → add the two diagonal directions to the search.

**Common mistakes:**

- ❌ Forgetting to restore the cell after the recursive calls — the backtrack is what makes the other branches work.
- ❌ Counting a walk that reaches the end before every cell was visited.
- ❌ Treating the start cell as an obstacle permanently — it must be marked only while the search stands on it.
- ❌ Forgetting that the end square is also one of the cells that has to be visited.

**How to narrate:**

> "This cannot be a normal grid DP because the state would have to include the set of visited cells, so it is a backtracking search. I count the non-obstacle cells, then do a DFS that marks each cell as it steps on it and unmarks it when it backtracks. When the search reaches the end square I only count it if every cell was visited. Four directions, `O(3^(m·n))` time."

## Related Problems

- [Unique Paths — LeetCode 62](./UniquePaths.java) — the monotone version that does fit in a DP
- [Minimum Path Sum — LeetCode 64](./MinimumPathSum.java) — the minimising version
