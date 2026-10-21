---
title: Set Matrix Zeroes
leetcode: 73
difficulty: Medium
patterns: [Marker rows and columns, Two-phase scan]
companies: [Amazon, Google, Meta, Uber, Microsoft]
frequency: 4
tags: [matrix, in-place, two-pass]
sampleInput: |
  3
  4
  1 1 1 1 1 0 1 1 1 1 1 1
sampleOutput: |
  1 0 1 1
  0 0 0 0
  1 0 1 1
---

# Set Matrix Zeroes — LeetCode 73

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Marker rows and columns · Two-phase scan |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Given an `m x n` matrix, if an element is `0`, set its **entire row** and **entire
column** to `0`. Do it **in place** and print the result.

## Input Format

```
rows
cols
matrix values in row-major order (rows * cols numbers)
```

- `rows` — number of rows
- `cols` — number of columns
- then `rows * cols` integers, read left to right, top to bottom

## Sample Input

```
3
4
1 1 1 1 1 0 1 1 1 1 1 1
```

## Expected Output

```
1 0 1 1
0 0 0 0
1 0 1 1
```

The `0` at row 1, column 1 clears row 1 and column 1.

## Approach — Mark, then Apply

The naive version zeroes cells as soon as it sees a `0`. That is **wrong**: the zeros it
writes are then read as *original* zeros and cascade across the whole matrix.

The fix is to split the work into two phases:

1. **Mark.** Scan the matrix and record *which rows* and *which columns* contain an
   original zero. The matrix is not modified in this phase.
2. **Apply.** For every cell, if its row or its column was marked, write `0`.

Two boolean arrays (`zeroRows`, `zeroCols`) carry the information from phase 1 to
phase 2.

**Why it is correct:** the set of cells that must become zero is exactly
`{ (r, c) : row r is marked or column c is marked }`. Because the marking is done on
the *original* matrix, no cell is ever zeroed because of a zero we ourselves wrote.

## Dry Run

Input:

```
1 1 1 1
1 0 1 1
1 1 1 1
```

### Phase 1 — mark rows and columns that contain a zero

| Step | (r, c) | `matrix[r][c]` | is 0? | `zeroRows` after | `zeroCols` after |
|---:|---|---:|---|---|---|
| 1 | (0, 0) | 1 | no | `[false, false, false]` | `[false, false, false, false]` |
| 2 | (0, 1) | 1 | no | `[false, false, false]` | `[false, false, false, false]` |
| 3 | (0, 2) | 1 | no | `[false, false, false]` | `[false, false, false, false]` |
| 4 | (0, 3) | 1 | no | `[false, false, false]` | `[false, false, false, false]` |
| 5 | (1, 0) | 1 | no | `[false, false, false]` | `[false, false, false, false]` |
| 6 | (1, 1) | **0** | **yes** | `[false, **true**, false]` | `[false, **true**, false, false]` |
| 7 | (1, 2) | 1 | no | `[false, true, false]` | `[false, true, false, false]` |
| 8 | (1, 3) | 1 | no | `[false, true, false]` | `[false, true, false, false]` |
| 9 | (2, 0) | 1 | no | `[false, true, false]` | `[false, true, false, false]` |
| 10 | (2, 1) | 1 | no | `[false, true, false]` | `[false, true, false, false]` |
| 11 | (2, 2) | 1 | no | `[false, true, false]` | `[false, true, false, false]` |
| 12 | (2, 3) | 1 | no | `[false, true, false]` | `[false, true, false, false]` |

Marked: row `1`, column `1`.

### Phase 2 — write the zeros

| Cell | row marked? | col marked? | value before | value after |
|---|---|---|---:|---:|
| (0, 0) | no | no | 1 | 1 |
| (0, 1) | no | **yes** | 1 | **0** |
| (0, 2) | no | no | 1 | 1 |
| (0, 3) | no | no | 1 | 1 |
| (1, 0) | **yes** | no | 1 | **0** |
| (1, 1) | **yes** | **yes** | 0 | 0 |
| (1, 2) | **yes** | no | 1 | **0** |
| (1, 3) | **yes** | no | 1 | **0** |
| (2, 0) | no | no | 1 | 1 |
| (2, 1) | no | **yes** | 1 | **0** |
| (2, 2) | no | no | 1 | 1 |
| (2, 3) | no | no | 1 | 1 |

Result:

```
1 0 1 1
0 0 0 0
1 0 1 1
```

## Java Solution

See [`SetMatrixZeroes.java`](./SetMatrixZeroes.java).

```java
public static int[][] setZeroes(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;
    boolean[] zeroRows = new boolean[rows];
    boolean[] zeroCols = new boolean[cols];

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (matrix[r][c] == 0) {
                zeroRows[r] = true;
                zeroCols[c] = true;
            }
        }
    }

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (zeroRows[r] || zeroCols[c]) {
                matrix[r][c] = 0;
            }
        }
    }
    return matrix;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols) | Two passes over the matrix |
| **Space** | O(rows + cols) | Two boolean marker arrays |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with O(1) extra space?"* → yes: use the **first row and first column**
  as the marker arrays, and remember their own flags in two booleans.
- *"What if the matrix must not be modified?"* → return a copy; the algorithm is the
  same, only the target changes.
- *"How does the O(1) variant work?"* → scan and mark the first row / first column,
  then use them while processing the inner cells, and finally zero the first row/column
  according to their own flags.
- *"What if zeros appear only in the first row?"* → the flag for that row must be
  captured before the first row is cleared.

**Common mistakes:**
- ❌ Zeroing cells **during** the first pass — the freshly written zeros are then treated
  as original zeros and the whole matrix collapses to zeros. This is the classic bug.
- ❌ Forgetting to mark the row *and* the column of the zero.
- ❌ Clearing the first row/column in the O(1) variant without protecting their own
  original content.
- ❌ Assuming the matrix is square — `rows` and `cols` are independent.

**How to narrate:**
> "The trap here is zeroing as you scan, because then the zeros you write cascade. So I
> split it: first pass only records which rows and which columns contain an original
> zero, without touching the matrix; second pass writes the zeros using those flags.
> That's two O(rows·cols) passes and O(rows + cols) extra space. If the interviewer wants
> O(1) space, I can store the flags in the first row and first column instead."

## Related Problems

- [Rotate Image](RotateImage.md) — in-place matrix transformation
- [Spiral Matrix](SpiralMatrix.md) — matrix traversal
- [2D Prefix Sum](../../../../../../docs/topics/12-prefixsum.md) — the same matrix indexing with sums
