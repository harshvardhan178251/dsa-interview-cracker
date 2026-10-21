---
title: Search a 2D Matrix II
leetcode: 240
difficulty: Medium
patterns: [Staircase search, Matrix]
companies: [Amazon, Google, Uber, Microsoft, Flipkart, TCS, Accenture, Siemens]
frequency: 4
tags: [matrix, array, two-pointers]
sampleInput: |
  3
  4
  5 7 7 8 8 10 11 13 9 11 13 15
  13
sampleOutput: "1 3"
---

# Search a 2D Matrix II — LeetCode 240

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Staircase search · Matrix |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an `m x n` matrix where

- every row is sorted in ascending order (left to right), and
- every column is sorted in ascending order (top to bottom),

search for a `target` and return its `{row, column}` position, or `[-1, -1]` when it is
absent.

**The rows are NOT globally ordered** — this is the difference from LeetCode 74.

## Input Format

The program reads from standard input:

```
rows
cols
m[0][0] m[0][1] ... m[0][n-1] m[1][0] ... m[n-1][m-1]
target
```

- `rows` — number of rows `m`
- `cols` — number of columns `n`
- the next `rows * cols` integers — the matrix values, in row-major order
- `target` — the value to look for

## Sample Input

```
3
4
5 7 7 8 8 10 11 13 9 11 13 15
13
```

## Expected Output

```
1 3
```

`13` is at row `1`, column `3` (it also appears at row `2`, column `2`; the search returns
the one it reaches first).

## Approach — Start at the top-right corner

Pick the cell at row `0`, column `n-1`. It is simultaneously

- the **largest** element of its row, and
- the **smallest** element of its column.

That makes every move decisive:

- `matrix[row][col] > target` → everything **below** in this column is even larger, so the
  target cannot be in this column → **move left** (`col--`).
- `matrix[row][col] < target` → everything **left** in this row is even smaller, so the
  target cannot be in this row → **move down** (`row++`).
- equal → found.

Each step eliminates one row or one column, so the walk visits at most `rows + cols` cells.

**Why not binary search?** You *can* binary search each row, but that costs
O(rows · log cols) and ignores the column ordering. The staircase uses both sort
invariants to get O(rows + cols).

## Dry Run

Input: `matrix = [[5,7,7,8],[8,10,11,13],[9,11,13,15]]`, `target = 13`

| Step | row | col | cell | value | comparison | move | why |
|---:|---:|---:|---|---:|---|---|---|
| 1 | 0 | 3 | `[0][3]` | 8 | 8 < 13 | `row++` → 1 | the whole row 0 is ≤ 8 < 13 |
| 2 | 1 | 3 | `[1][3]` | 13 | 13 == 13 | — | **return {1, 3}** |

Two cells visited for a 3×4 matrix.

### The staircase as a picture

```
            col: 0    1    2    3
row 0            5    7    7    8   ← start at the top-right (8)
row 1            8   10   11   13
row 2            9   11   13   15
                 ↑                 target = 13
                 |
          move left when the cell is too big,
          move down when the cell is too small
```

### Trace with a miss — `matrix = [[5,7,7,8],[8,10,11,13],[9,11,13,15]]`, `target = 12`

| Step | row | col | cell | value | comparison | move | why |
|---:|---:|---:|---|---:|---|---|---|
| 1 | 0 | 3 | `[0][3]` | 8 | 8 < 12 | `row++` → 1 | row 0 is all ≤ 8 |
| 2 | 1 | 3 | `[1][3]` | 13 | 13 > 12 | `col--` → 2 | column 3 is all ≥ 13 |
| 3 | 2 | 2 | `[2][2]` | 13 | 13 > 12 | `col--` → 1 | column 2 is all ≥ 13 |
| 4 | 2 | 1 | `[2][1]` | 11 | 11 < 12 | `row++` → 3 | row 2 is all ≤ 11 |

`row == 3` is past the last row → the target is absent → **-1 -1**.

## Java Solution

See [`Search2DMatrixII.java`](./Search2DMatrixII.java).

```java
public static int[] searchMatrix(int[][] matrix, int target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return new int[]{-1, -1};
    }
    int row = 0;
    int col = matrix[0].length - 1;
    while (row < matrix.length && col >= 0) {
        int value = matrix[row][col];
        if (value == target) {
            return new int[]{row, col};
        } else if (value > target) {
            col--;
        } else {
            row++;
        }
    }
    return new int[]{-1, -1};
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows + cols) | Each step removes a row or a column |
| **Space** | O(1) | Only two index variables |

**Optimal?** Yes in the worst case — the matrix has `rows · cols` cells and the staircase
visits at most `rows + cols` of them, which is the best a search can do without additional
structure.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the columns were not sorted?"* → only the row ordering remains, so you must
  binary search each row: O(rows · log cols).
- *"Return all matching positions."* → after a hit, walk left (duplicates in the row) and
  walk down (duplicates in the column), collecting every cell equal to the target.
- *"The matrix does not fit in memory — it is on disk."* → the staircase needs one random
  access per step, which is ideal for a remote matrix; a binary search per row would need
  `rows` passes.
- *"Compare this with LeetCode 74."* → there the rows are globally ordered, so the whole
  matrix flattens into one array and a plain binary search wins.

**Common mistakes:**
- ❌ Starting at the **bottom-left** corner → the same idea works, but starting at the
  top-right is the usual presentation.
- ❌ Moving diagonally → you lose the ability to discard a whole row or column.
- ❌ Using the LeetCode 74 flattening here → the rows are not globally ordered, so the
  flat array is not sorted.
- ❌ Forgetting the loop guard `col >= 0` → `ArrayIndexOutOfBoundsException` on the left
  edge.

**How to narrate:**
> "Both rows and columns are sorted, so I'll start at the top-right cell: it is the largest
> in its row and the smallest in its column. If it's too big, the whole column is too big,
> so I move left; if it's too small, the whole row is too small, so I move down. Each step
> eliminates a row or a column, giving O(rows + cols)."

## Related Problems

- [Search a 2D Matrix](./Search2DMatrix.java) — the globally ordered variant
- [Peak Element](./PeakElement.java) — binary search on a local extremum
- [Binary Search](./BinarySearch.java) — the flat-array search
