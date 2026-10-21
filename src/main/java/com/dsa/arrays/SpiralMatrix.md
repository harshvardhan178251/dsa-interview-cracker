---
title: Spiral Matrix
leetcode: 54
difficulty: Medium
patterns: [Boundary shrinking, Simulation]
companies: [Amazon, Google, Meta, Uber, Bloomberg, Adobe]
frequency: 4
tags: [matrix, simulation, two-pointers]
sampleInput: |
  3
  3
  1 2 3 4 5 6 7 8 9
sampleOutput: "1 2 3 6 9 8 7 4 5"
---

# Spiral Matrix — LeetCode 54

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Boundary shrinking · Simulation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg, Adobe |

## Problem Statement

Given an `m x n` matrix, return all of its elements in **spiral order**:

1. The top row, left to right.
2. The right column, top to bottom.
3. The bottom row, right to left.
4. The left column, bottom to top.
5. Repeat inward until nothing is left.

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
1 2 3 6 9 8 7 4 5
```

## Approach — Four Shrinking Boundaries

Instead of tracking a "direction" and turning corners (which is bug-prone), keep four
boundaries of the still-unvisited rectangle:

- `top` — first unvisited row
- `bottom` — last unvisited row
- `left` — first unvisited column
- `right` — last unvisited column

Each round reads one edge and shrinks the corresponding boundary:

| Edge | Direction | Boundary moved |
|---|---|---|
| top row | left → right | `top++` |
| right column | top → bottom | `right--` |
| bottom row | right → left | `bottom--` |
| left column | bottom → top | `left++` |

**The two guards** are what make it correct on thin matrices:

- Before reading the **bottom row**, check `top <= bottom` — otherwise the last row was
  already consumed by the top row and you would print it twice.
- Before reading the **left column**, check `left <= right` — otherwise the last column
  was already consumed by the right column.

The loop ends when `top > bottom` or `left > right`.

## Dry Run

Input:

```
1 2 3
4 5 6
7 8 9
```

Start: `top = 0`, `bottom = 2`, `left = 0`, `right = 2`

| Step | Edge | Values added | Boundary change | `top` | `bottom` | `left` | `right` | result so far |
|---:|---|---|---|---:|---:|---:|---:|---|
| 1 | top row ← | 1, 2, 3 | `top++` | 1 | 2 | 0 | 2 | `1 2 3` |
| 2 | right col ↓ | 6, 9 | `right--` | 1 | 2 | 0 | 1 | `1 2 3 6 9` |
| 3 | bottom row ← | 8, 7 | `bottom--` | 1 | 1 | 0 | 1 | `1 2 3 6 9 8 7` |
| 4 | left col ↑ | 4 | `left++` | 1 | 1 | 1 | 1 | `1 2 3 6 9 8 7 4` |
| 5 | top row ← (the centre) | 5 | `top++` | 2 | 1 | 1 | 1 | `1 2 3 6 9 8 7 4 5` |
| 6 | right col ↓ | — (rows 2..1 is empty) | `right--` | 2 | 1 | 1 | 0 | unchanged |
| 7 | bottom row ← | skipped: `top(2) > bottom(1)` | — | 2 | 1 | 1 | 0 | unchanged |
| 8 | left col ↑ | skipped: `left(1) > right(0)` | — | 2 | 1 | 1 | 0 | unchanged |

The loop condition `top <= bottom && left <= right` is now false → stop.

Answer: **1 2 3 6 9 8 7 4 5**

## Java Solution

See [`SpiralMatrix.java`](./SpiralMatrix.java).

```java
public static List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return result;
    }
    int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) { result.add(matrix[top][c]); }
        top++;
        for (int r = top; r <= bottom; r++) { result.add(matrix[r][right]); }
        right--;
        if (top <= bottom) {
            for (int c = right; c >= left; c--) { result.add(matrix[bottom][c]); }
            bottom--;
        }
        if (left <= right) {
            for (int r = bottom; r >= top; r--) { result.add(matrix[r][left]); }
            left++;
        }
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols) | Every cell is visited exactly once |
| **Space** | O(1) extra | Only four boundaries; the O(rows · cols) result list is the answer itself |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the spiral of a matrix with a hole / obstacles."* → add a visited array and
  skip visited cells; that is the classic spiral-traverse-a-maze problem.
- *"What if the matrix is sparse?"* → the same code works, but you would iterate over
  non-zero cells only.
- *"Can you do it without a direction flag?"* → yes, that is the boundary approach; the
  direction-flag version needs careful turn logic.
- *"What if you need the spiral of a rectangle, not a square?"* → the code already
  handles `rows != cols`; the guards exist precisely for that case.
- *"How would you generate a spiral matrix (the inverse problem)?"* → fill the same
  boundary rectangle in the same order.

**Common mistakes:**
- ❌ Omitting the `if (top <= bottom)` guard before the bottom row — a 1-row matrix
  prints its last row twice.
- ❌ Omitting the `if (left <= right)` guard before the left column — a 1-column matrix
  prints its last column twice.
- ❌ Shrinking the wrong boundary (`bottom--` before reading the bottom row) — the
  elements are lost.
- ❌ Assuming the matrix is square — `rows` and `cols` are independent.

**How to narrate:**
> "I keep four boundaries around the unvisited rectangle. Each round reads one edge and
> shrinks the corresponding boundary. The two subtle parts are the guards: I only read
> the bottom row if there is still a row left, and only read the left column if there is
> still a column left. Without them a single-row or single-column matrix would print
> elements twice. Every cell is visited exactly once, so it's O(rows · cols) with O(1)
> extra space."

## Related Problems

- [Rotate Image](RotateImage.md) — matrix transformation in place
- [Set Matrix Zeroes](SetMatrixZeroes.md) — boundary-free matrix rewriting
- [Spiral Matrix II](../../../../../../docs/topics/12-prefixsum.md) — the "generate it" variant
