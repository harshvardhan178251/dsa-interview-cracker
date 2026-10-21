---
title: Unique Paths
leetcode: 62
difficulty: Medium
patterns: [Grid DP, Combinatorics]
companies: [Meta, Google, Amazon, LinkedIn, Salesforce, Airbnb, Pinterest, Cognizant, Wipro, Standard Chartered]
frequency: 5
tags: [dynamic-programming, grid, combinatorics]
sampleInput: |
  3 7
sampleOutput: "28"
---

# Unique Paths — LeetCode 62

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Grid DP · Combinatorics |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

A robot starts in the top-left corner of an `m × n` grid and can only move **right** or **down**. How many distinct paths can it take to reach the bottom-right corner?

- `m` — number of rows
- `n` — number of columns

## Input Format

The program reads from standard input:

```
m n
```

- `m` — number of rows (1 ≤ m ≤ 100)
- `n` — number of columns (1 ≤ n ≤ 100)

## Sample Input

```
3 7
```

## Expected Output

```
28
```

A 3 × 7 grid has `C(3 + 7 - 2, 3 - 1) = C(8, 2) = 28` monotone paths.

## Approach

The grid DP:

1. `dp[i][j]` = the number of paths that reach cell `(i, j)`.
2. The first row and the first column each have exactly **one** path (walk straight along the edge).
3. Every other cell can only be entered from above or from the left, so
   `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.
4. The answer is `dp[m-1][n-1]`.

**The combinatorial view.** Every path is a sequence of exactly `m-1` down-moves and `n-1` right-moves, so the number of paths is the binomial coefficient `C(m+n-2, m-1)`. That is `O(min(m,n))` time and `O(1)` space, and it is a great follow-up to mention.

The table can also be rolled into a single row (`O(n)` space) with the same left-to-right sweep.

## Dry Run

Input: `m = 3`, `n = 7`. Rows are the grid rows, columns the grid columns.

| | c0 | c1 | c2 | c3 | c4 | c5 | c6 |
|---|---:|---:|---:|---:|---:|---:|---:|
| r0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| r1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| r2 | 1 | 3 | 6 | 10 | 15 | 21 | **28** |

Every interior cell is the cell above plus the cell to the left.

**One cell in detail.** `dp[2][3] = dp[1][3] + dp[2][2] = 4 + 6 = 10` — four paths arrive from above and six from the left.

**Binomial check.** `C(m + n - 2, m - 1) = C(8, 2) = 28` — the table agrees with the formula.

**Rolling row.** Keeping only one row: `[1,1,1,1,1,1,1]` → `[1,2,3,4,5,6,7]` → `[1,3,6,10,15,21,28]`. The last cell is the answer.

## Java Solution

See [`UniquePaths.java`](./UniquePaths.java).

```java
    public static int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m · n) | `m × n` cells, each `O(1)` |
| **Space** | O(m · n) | the full `m × n` table is kept |

**Space can be `O(n)`** (one row), and the whole problem can be solved in `O(min(m,n))` time and `O(1)` space with the binomial formula — but watch out for overflow when the grid is large.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if some cells are blocked?"* → set those cells to 0; see Unique Paths II.
- "Can you solve it with the binomial coefficient?"* → yes: `C(m+n-2, m-1)`, `O(min(m,n))` time.
- "How would you count the paths if the robot may also move diagonally?"* → three neighbours instead of two, `dp[i][j] = dp[i-1][j] + dp[i][j-1] + dp[i-1][j-1]`.
- "What if you want the actual paths, not the count?"* → backtrack through the table.

**Common mistakes:**

- ❌ Initialising the interior of the first row / column to 0 instead of 1.
- ❌ Using the row count and the column count the wrong way round (the answer is symmetric, but the table is not).
- ❌ Forgetting that the answer can be large — `C(198, 99)` overflows an `int`.

**How to narrate:**

> "Every path to a cell comes either from above or from the left, so the number of paths is the sum of those two numbers. The first row and first column have exactly one path each. That gives an `O(m·n)` table; if you want it in constant space I can use the binomial coefficient `C(m+n-2, m-1)`, since every path is just an ordering of `m-1` downs and `n-1` rights."

## Related Problems

- [Minimum Path Sum — LeetCode 64](./MinimumPathSum.java) — the same grid, minimising instead of counting
- [GridUniquePathsIII — LeetCode 980](./GridUniquePathsIII.java) — the four-directional Hamiltonian variant
- [Climbing Stairs — LeetCode 70](./ClimbingStairs.java) — the same recurrence in one dimension
