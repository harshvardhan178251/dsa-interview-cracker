---
title: 2D Prefix Sum
leetcode: null
difficulty: Medium
patterns: [2D prefix sums, Inclusion-exclusion]
companies: [Google, Microsoft]
frequency: 2
tags: [prefix-sum, matrix, range-query]
sampleInput: |
  2
  3
  1 2 3 4 5 6
  2
  0 0 0 1
  1 1 1 2
sampleOutput: |
  3
  11
---

# 2D Prefix Sum

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | 2D prefix sums · Inclusion-exclusion |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given a fixed `rows x cols` matrix, answer `q` **rectangle-sum** queries.

A query `(r1, c1, r2, c2)` asks for the sum of the rectangle whose top-left corner is
`(r1, c1)` and bottom-right corner is `(r2, c2)`, **both corners inclusive**.

This is the 2D generalisation of
[Range Sum Query — Immutable](RangeSumQuery.md) and the standard building block behind
"sum of a sub-matrix" problems.

## Input Format

```
rows
cols
matrix values in row-major order (rows * cols numbers)
q
r1 c1 r2 c2
r1 c1 r2 c2
...
```

- `rows` — number of rows
- `cols` — number of columns
- then `rows * cols` integers, read left to right, top to bottom
- `q` — number of queries
- then `q` lines, each with the inclusive rectangle corners

## Sample Input

```
2
3
1 2 3 4 5 6
2
0 0 0 1
1 1 1 2
```

## Expected Output

```
3
11
```

- Query 1: the rectangle covering row 0, columns 0–1 → `1 + 2` = **3**
- Query 2: the rectangle covering row 1, columns 1–2 → `5 + 6` = **11**

## Approach — Padded Table + Inclusion-Exclusion

### Building the table

`prefix[r][c]` holds the sum of the rectangle `(0, 0) .. (r-1, c-1)` — the region
**above and to the left** of `(r, c)`. The table is padded with a zero row and a zero
column so that index arithmetic never goes negative.

The recurrence is the classic one:

```
prefix[r][c] = matrix[r-1][c-1] + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1]
```

It adds the rectangle above, the rectangle to the left, and the current cell, and
subtracts the top-left region that was counted **twice**.

### Answering a query

The rectangle `(r1, c1) .. (r2, c2)` is obtained by inclusion-exclusion:

```
sum = prefix[r2+1][c2+1]      // everything up to (r2, c2)
    - prefix[r1][c2+1]        // minus the rows above r1
    - prefix[r2+1][c1]        // minus the columns left of c1
    + prefix[r1][c1]          // plus back the corner that was subtracted twice
```

The last `+` is what makes the arithmetic correct: the top-left region was removed by
both subtractions, so it has to be added back once.

## Dry Run

Input:

```
1 2 3
4 5 6
```

### Step 1 — build the padded prefix table (3 x 4)

| `prefix[r][c]` | c=0 | c=1 | c=2 | c=3 |
|---|---:|---:|---:|---:|
| **r=0** | 0 | 0 | 0 | 0 |
| **r=1** | 0 | 1 | 3 | 6 |
| **r=2** | 0 | 5 | 12 | 21 |

Cell by cell:

| Step | (r, c) | `matrix[r-1][c-1]` | `prefix[r-1][c]` | `prefix[r][c-1]` | `prefix[r-1][c-1]` | `prefix[r][c]` |
|---:|---|---:|---:|---:|---:|---:|
| 1 | (1, 1) | 1 | 0 | 0 | 0 | 1 + 0 + 0 − 0 = **1** |
| 2 | (1, 2) | 2 | 0 | 1 | 0 | 2 + 0 + 1 − 0 = **3** |
| 3 | (1, 3) | 3 | 0 | 3 | 0 | 3 + 0 + 3 − 0 = **6** |
| 4 | (2, 1) | 4 | 1 | 0 | 0 | 4 + 1 + 0 − 0 = **5** |
| 5 | (2, 2) | 5 | 3 | 5 | 1 | 5 + 3 + 5 − 1 = **12** |
| 6 | (2, 3) | 6 | 6 | 12 | 3 | 6 + 6 + 12 − 3 = **21** |

### Step 2 — answer the queries

Query 1 — rectangle `(0, 0) .. (0, 1)`:

| Term | Table entry | Value |
|---|---|---:|
| `prefix[r2+1][c2+1]` | `prefix[1][2]` | 3 |
| `− prefix[r1][c2+1]` | `− prefix[0][2]` | −0 |
| `− prefix[r2+1][c1]` | `− prefix[1][0]` | −0 |
| `+ prefix[r1][c1]` | `+ prefix[0][0]` | +0 |

Result: `3 − 0 − 0 + 0` = **3** (`1 + 2`)

Query 2 — rectangle `(1, 1) .. (1, 2)`:

| Term | Table entry | Value |
|---|---|---:|
| `prefix[r2+1][c2+1]` | `prefix[2][3]` | 21 |
| `− prefix[r1][c2+1]` | `− prefix[1][3]` | −6 |
| `− prefix[r2+1][c1]` | `− prefix[2][1]` | −5 |
| `+ prefix[r1][c1]` | `+ prefix[1][1]` | +1 |

Result: `21 − 6 − 5 + 1` = **11** (`5 + 6`) ✓

Answers: **3, 11**

## Java Solution

See [`TwoDimensionalPrefixSum.java`](./TwoDimensionalPrefixSum.java).

```java
public static int[][] buildPrefix(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;
    int[][] prefix = new int[rows + 1][cols + 1];
    for (int r = 1; r <= rows; r++) {
        for (int c = 1; c <= cols; c++) {
            prefix[r][c] = matrix[r - 1][c - 1]
                    + prefix[r - 1][c]
                    + prefix[r][c - 1]
                    - prefix[r - 1][c - 1];
        }
    }
    return prefix;
}

public static int rectangleSum(int[][] prefix, int r1, int c1, int r2, int c2) {
    return prefix[r2 + 1][c2 + 1]
            - prefix[r1][c2 + 1]
            - prefix[r2 + 1][c1]
            + prefix[r1][c1];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Preprocessing** | O(rows · cols) | One pass over the matrix |
| **Per query** | O(1) | Four table lookups |
| **Total** | O(rows · cols + q) | Build once, answer many |
| **Space** | O(rows · cols) | The prefix table |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the matrix changes?"* → updating one cell invalidates every prefix that
  contains it; the update is O(rows · cols) in the worst case. A Fenwick tree (2D BIT)
  gives O(log²) updates and queries.
- *"How do I count the number of sub-matrices with a given sum?"* → enumerate the top
  and bottom rows and use a 1D prefix-sum scan for the columns.
- *"What if the queries were online and the matrix huge?"* → a 2D Fenwick tree or a
  wavelet tree.
- *"How does this relate to the 1D version?"* → exactly the same idea; the 2D version
  needs one extra subtraction and one extra addition because a corner region is
  double-counted.
- *"Can you do it in O(1) space per query with O(rows·cols) preprocessing?"* → yes, that
  is precisely what this is — the space is in the *preprocessing*, not the query.

**Common mistakes:**
- ❌ Off-by-one in the query — the table is padded, so the query uses `r2 + 1` and
  `c2 + 1`.
- ❌ Forgetting the final `+ prefix[r1][c1]` — the top-left corner was subtracted twice.
- ❌ Not padding the table — then `prefix[r-1][c-1]` throws
  `ArrayIndexOutOfBoundsException` at `(1, 1)`.
- ❌ Using the recurrence with `max`/`min` instead of the sum version — the 2D prefix
  table is about sums, not maxima.

**How to narrate:**
> "It's the 1D prefix sum extended to two dimensions. I pad the matrix with a zero row
> and column and build a table where prefix[r][c] is the sum of everything above and to
> the left of (r, c), using the recurrence value + above + left − top-left. A rectangle
> query is then pure inclusion-exclusion: the big rectangle minus the strip above, minus
> the strip to the left, plus back the corner that was subtracted twice. Build once in
> O(rows·cols), each query is O(1)."

## Related Problems

- [Range Sum Query — Immutable](RangeSumQuery.md) — the 1D version
- [Running Sum of 1d Array](RunningSum.md) — the raw prefix array
- [Set Matrix Zeroes](../arrays/SetMatrixZeroes.md) — matrix traversal
