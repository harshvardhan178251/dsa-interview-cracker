---
title: Rotate Image
leetcode: 48
difficulty: Medium
patterns: [Matrix transposition, In-place transformation]
companies: [Amazon, Meta, Bloomberg, Uber, ByteDance, Accenture, Tech Mahindra, Qualcomm]
frequency: 4
tags: [matrix, in-place, rotation]
sampleInput: |
  3
  3
  1 2 3 4 5 6 7 8 9
sampleOutput: |
  7 4 1
  8 5 2
  9 6 3
---

# Rotate Image — LeetCode 48

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Matrix transposition · In-place transformation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

You are given an `n x n` square matrix. Rotate it **90 degrees clockwise in place** and
print the result.

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
3
1 2 3 4 5 6 7 8 9
```

## Expected Output

```
7 4 1
8 5 2
9 6 3
```

## Approach — Transpose, then Mirror

A 90° clockwise rotation is the composition of two operations that are each trivially
in-place:

1. **Transpose** — swap `matrix[i][j]` with `matrix[j][i]`. This flips the matrix over
   its main diagonal and turns a clockwise rotation into a *horizontal* mirror.
2. **Mirror each row** — reverse every row. The result is the clockwise rotation.

Only the **upper triangle** (`j > i`) is visited during the transpose, so each pair is
swapped exactly once — visiting the whole matrix would swap every pair twice and leave
the matrix unchanged.

**Why it works:** element `(i, j)` must end up at `(j, n-1-i)`. After the transpose it
sits at `(j, i)`; reversing row `j` moves it to `(j, n-1-i)`. Exactly the target.

## Dry Run

Input: `matrix = [[1,2,3],[4,5,6],[7,8,9]]`

### Step 1 — transpose (swap `matrix[i][j]` ↔ `matrix[j][i]`, `j > i`)

| Swap | `(i, j)` | value before | value at `(j, i)` | matrix after |
|---|---|---:|---:|---|
| 1 | (0, 1) | 2 | 4 | `[[1,4,3],[2,5,6],[7,8,9]]` |
| 2 | (0, 2) | 3 | 7 | `[[1,4,7],[2,5,6],[3,8,9]]` |
| 3 | (1, 2) | 6 | 8 | `[[1,4,7],[2,5,8],[3,6,9]]` |

### Step 2 — mirror every row (reverse the elements of each row)

| Row | before | after |
|---|---|---|
| 0 | `[1, 4, 7]` | `[7, 4, 1]` |
| 1 | `[2, 5, 8]` | `[8, 5, 2]` |
| 2 | `[3, 6, 9]` | `[9, 6, 3]` |

Answer:

```
7 4 1
8 5 2
9 6 3
```

## Java Solution

See [`RotateImage.java`](./RotateImage.java).

```java
public static int[][] rotate(int[][] matrix) {
    int n = matrix.length;
    // 1) transpose
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    // 2) mirror every row
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n / 2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
    }
    return matrix;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | Every cell is touched a constant number of times |
| **Space** | O(1) | Only a handful of scalars; the matrix is rotated in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Rotate counter-clockwise instead."* → transpose, then mirror the **columns**
  (reverse the column order) — or mirror first and transpose second.
- *"Rotate 180°."* → reverse every row and reverse the order of the rows.
- *"What if the matrix is not square?"* → the transpose + mirror trick still rotates a
  rectangular matrix correctly (the result is `cols x rows`); the row-mirror step must
  use the *row's* length, not `n`.
- *"Can you do it with one pass?"* → yes — the cycle decomposition: for each cell compute
  its destination and follow the 4-cycle, moving each value into place.
- *"How do you detect a rotated image?"* → compare each element with its neighbour
  clockwise; for a square matrix rotated by 90° the rotation is a permutation of four
  4-cycles.

**Common mistakes:**
- ❌ Looping `j` from `0` in the transpose — that swaps each pair **twice** and the
  matrix comes out unchanged.
- ❌ Using `n` (the matrix size) as the row length when the matrix is rectangular.
- ❌ Mirroring the columns instead of the rows after the transpose (that gives a
  counter-clockwise rotation).
- ❌ Allocating a new matrix — the problem explicitly asks for an **in-place** rotation.

**How to narrate:**
> "A 90° clockwise rotation is a transpose followed by a horizontal mirror. I transpose
> in place by only visiting the upper triangle — that's the part people get wrong,
> because the full double loop cancels itself out. Then I reverse each row. Both steps
> are in place, so the whole thing is O(n²) time and O(1) extra space."

## Related Problems

- [Rotate Array](RotateArray.md) — the 1D counterpart
- [Spiral Matrix](SpiralMatrix.md) — reads a rotated matrix in spiral order
- [Set Matrix Zeroes](SetMatrixZeroes.md) — in-place matrix rewriting
