---
title: Minimum Path Sum
leetcode: 64
difficulty: Medium
patterns: [Grid DP, Bottom-up DP]
companies: [Google, Amazon, Airbnb, Adobe, Datadog, Wipro, Accenture, Sony]
frequency: 4
tags: [dynamic-programming, grid]
sampleInput: |
  3 3
  1 3 1 1 5 1 4 2 1
sampleOutput: "7"
---

# Minimum Path Sum — LeetCode 64

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Grid DP · Bottom-up DP |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an `m × n` grid of non-negative integers, return the **minimum** sum of the values along a path from the top-left cell to the bottom-right cell. You may only move **right** or **down**.

## Input Format

The program reads from standard input:

```
rows cols
grid[0][0] grid[0][1] ... grid[rows-1][cols-1]
```

- `rows` — number of rows (1 ≤ rows ≤ 200)
- `cols` — number of columns (1 ≤ cols ≤ 200)
- the next `rows * cols` integers are the grid values read row by row

## Sample Input

```
3 3
1 3 1 1 5 1 4 2 1
```

## Expected Output

```
7
```

The cheapest path is `1 → 2 → 4 → 2 → 1`, which sums to **7**.

## Approach

The grid DP, with a minimising twist:

1. `dp[i][j]` = the minimum sum of a path that ends in cell `(i, j)`.
2. The start cell is its own base case: `dp[0][0] = grid[0][0]`.
3. The first row can only be entered from the left, the first column only from above.
4. Every other cell: `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`.
5. The answer is `dp[rows-1][cols-1]`.

The table can be rolled into one row (`O(cols)` space). A nicer variant mutates the grid in place — the grid cell *is* the DP cell — which is what many solutions do.

## Dry Run

Input: `grid = [[1,3,1],[1,5,1],[4,2,1]]`.

| | c0 | c1 | c2 |
|---|---:|---:|---:|
| r0 | **1** | **4** | **5** |
| r1 | **2** | **7** | **6** |
| r2 | **6** | **8** | **7** |

The bottom-right cell holds **7** → answer **7**.

**Every cell with its source:**

| cell | from above | from the left | chosen | value |
|---|---:|---:|---|---:|
| `dp[0][0]` | — | — | start | 1 |
| `dp[0][1]` | — | 1 | left | 1 + 3 = 4 |
| `dp[0][2]` | — | 4 | left | 4 + 1 = 5 |
| `dp[1][0]` | 1 | — | above | 1 + 1 = 2 |
| `dp[1][1]` | 4 | 2 | left (2 < 4) | 2 + 5 = 7 |
| `dp[1][2]` | 5 | 7 | above (5 < 7) | 5 + 1 = 6 |
| `dp[2][0]` | 2 | — | above | 2 + 4 = 6 |
| `dp[2][1]` | 7 | 6 | left (6 < 7) | 6 + 2 = 8 |
| `dp[2][2]` | 6 | 8 | above (6 < 8) | 6 + 1 = 7 |

**The winning path** is `1 → 2 → 4 → 2 → 1` = `7`.

## Java Solution

See [`MinimumPathSum.java`](./MinimumPathSum.java).

```java
    public static int minPathSum(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int[][] dp = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (i == 0 && j == 0) {
                    dp[i][j] = grid[i][j];
                } else if (i == 0) {
                    dp[i][j] = dp[i][j - 1] + grid[i][j];
                } else if (j == 0) {
                    dp[i][j] = dp[i - 1][j] + grid[i][j];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
                }
            }
        }
        return dp[rows - 1][cols - 1];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols) | `rows × cols` cells, each `O(1)` |
| **Space** | O(rows · cols) | the full `rows × cols` table is kept |

**Space `O(cols)`** with a rolling row, or `O(1)` extra if you overwrite the grid itself.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if you also had to return the path?"* → keep the table and walk backwards from the bottom-right corner.
- "What if you may move up, down, left and right?"* → Dijkstra on the grid graph.
- "What if there are obstacles?"* → give the obstacle cells a value of `+∞`.
- "What if the path must have exactly `k` moves?"* → add a dimension to the DP.

**Common mistakes:**

- ❌ Forgetting the first row / first column special cases and reading `dp[-1][j]`.
- ❌ Using `max` instead of `min`.
- ❌ Forgetting to add `grid[i][j]` to the chosen predecessor.

**How to narrate:**

> "The cheapest path into a cell comes from above or from the left, so I keep the cheaper of the two and add the cell value. The first row and column are special because they have only one predecessor. That is `O(rows·cols)` time, and I can roll the table into a single row."

## Related Problems

- [UniquePaths — LeetCode 62](./UniquePaths.java) — counting instead of minimising
- [GridUniquePathsIII — LeetCode 980](./GridUniquePathsIII.java) — four-directional paths
