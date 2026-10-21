---
title: Search a 2D Matrix
leetcode: 74
difficulty: Medium
patterns: [Binary search, Matrix, Divide and conquer]
companies: [Amazon, Google, Meta, Microsoft, Uber]
frequency: 4
tags: [matrix, array, binary-search]
sampleInput: |
  3
  4
  1 3 5 7 10 11 16 20 23 30 34 60
  3
sampleOutput: "0 1"
---

# Search a 2D Matrix — LeetCode 74

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Matrix · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an `m x n` integer matrix with these properties:

1. Each row is sorted in ascending order.
2. The first integer of each row is **greater** than the last integer of the previous row.

Search for a `target` and return its `{row, column}` position, or `[-1, -1]` when it is
absent.

You must achieve **O(log(m·n))** time.

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
1 3 5 7 10 11 16 20 23 30 34 60
3
```

## Expected Output

```
0 1
```

`3` sits at row `0`, column `1`.

## Approach — Treat the matrix as one flat sorted array

Property 2 is the important one: the rows are not only individually sorted, they are
**globally** ordered. `1 3 5 7 10 11 16 20 23 30 34 60` is one sorted sequence that just
happens to be wrapped every `cols` elements.

So we binary search a flat index in `[0, rows*cols)` and convert back:

```
row = index / cols
col = index % cols
```

This gives O(log(rows·cols)) — half the comparisons of searching each row separately
(O(rows · log cols)).

**Conversion is exact, not approximate.** `index / cols` is the row because every row
contributes exactly `cols` elements to the flat order, and `index % cols` is the column
because the remainder is the offset inside that row.

## Dry Run

Input: `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]`, `target = 3`

| Step | left | right | mid | flat index → cell | value | comparison | range after |
|---:|---:|---:|---:|---|---:|---|---|
| 1 | 0 | 11 | 5 | `5 / 4 = 1`, `5 % 4 = 1` → `[1][1]` | 11 | 11 > 3 | `[0, 4]` |
| 2 | 0 | 4 | 2 | `2 / 4 = 0`, `2 % 4 = 2` → `[0][2]` | 5 | 5 > 3 | `[0, 1]` |
| 3 | 0 | 1 | 0 | `0 / 4 = 0`, `0 % 4 = 0` → `[0][0]` | 1 | 1 < 3 | `[1, 1]` |
| 4 | 1 | 1 | 1 | `1 / 4 = 0`, `1 % 4 = 1` → `[0][1]` | 3 | 3 == 3 | **return {0, 1}** |

### The flattened view

| Flat index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cell | `[0][0]` | `[0][1]` | `[0][2]` | `[0][3]` | `[1][0]` | `[1][1]` | `[1][2]` | `[1][3]` | `[2][0]` | `[2][1]` | `[2][2]` | `[2][3]` |
| value | 1 | 3 | 5 | 7 | 10 | 11 | 16 | 20 | 23 | 30 | 34 | 60 |

## Java Solution

See [`Search2DMatrix.java`](./Search2DMatrix.java).

```java
public static int[] searchMatrix(int[][] matrix, int target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return new int[]{-1, -1};
    }
    int rows = matrix.length;
    int cols = matrix[0].length;

    int left = 0;
    int right = rows * cols - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int value = matrix[mid / cols][mid % cols];
        if (value == target) {
            return new int[]{mid / cols, mid % cols};
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return new int[]{-1, -1};
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log(rows · cols)) | A single binary search over the flattened matrix |
| **Space** | O(1) extra | Beyond the input matrix itself |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the rows are sorted but not globally ordered?"* → then this flattening is invalid;
  use the staircase search, see
  [Search a 2D Matrix II](./Search2DMatrixII.java).
- *"Return every matching position."* → the matrix may contain duplicates; continue the
  search to the left and right of the hit.
- *"Can you do it without flattening?"* → yes: binary search the rows to find the candidate
  row, then binary search inside it — but only because property 2 lets you pick the row
  correctly.
- *"The matrix is enormous and does not fit in memory."* → binary search over the file
  offsets; the same divide-and-conquer idea, with I/O instead of array access.

**Common mistakes:**
- ❌ Assuming the rows are individually sorted is enough → the flattening needs the *global*
  ordering property.
- ❌ Using `mid / cols` and `mid % cols` on the wrong index (e.g. dividing the mid *value*) →
  nonsense results.
- ❌ Forgetting the empty-matrix guard → `matrix[0]` throws on an empty matrix.
- ❌ Returning the flat index instead of `{row, col}` → the LeetCode signature wants the
  pair.

**How to narrate:**
> "The second property means the matrix is one globally sorted sequence wrapped into rows, so
> I can binary search a flat index and convert back with division and modulo by the column
> count. That gives O(log(m·n)) — fewer comparisons than searching each row separately —
> and the conversion is exact because every row contributes exactly `cols` elements."

## Related Problems

- [Search a 2D Matrix II](./Search2DMatrixII.java) — the version without global ordering
- [Binary Search](./BinarySearch.java) — the flat-array version of the same search
- [Peak Element](./PeakElement.java) — binary search on a local extremum
