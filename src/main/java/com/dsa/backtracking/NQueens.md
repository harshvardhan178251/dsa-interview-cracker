---
title: N-Queens
leetcode: 51
difficulty: Hard
patterns: [Backtracking, Constraint pruning]
companies: [Google, Meta, Apple, Adobe, Zillow]
frequency: 4
tags: [backtracking, hard, board]
sampleInput: |
  4
sampleOutput: |
  ..Q. Q... ...Q .Q..
  .Q.. ...Q Q... ..Q.
---

# N-Queens — LeetCode 51

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · Constraint pruning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

The **N-Queens** puzzle is the problem of placing `n` queens on an `n × n` chessboard so that no two queens attack each other.

Given an integer `n`, return **all distinct solutions**.

Each solution contains `n` board rows, and every row is a string of `n` characters: `Q` for a queen and `.` for an empty square.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the size of the board (1 ≤ n ≤ 9)

## Sample Input

```
4
```

## Expected Output

```
..Q. Q... ...Q .Q..
.Q.. ...Q Q... ..Q.
```

The two solutions of the 4 × 4 board. Each solution is printed on one line; the rows of the board are separated by a space.

## Approach

Backtracking with **one queen per row**:

1. Because two queens in the same row attack each other, there is exactly one queen per row —    the row is fixed by the recursion depth and only the column has to be chosen.
2. For each candidate column, check the three attack directions:
   - the **column** itself,
   - the diagonal `row + col` (running to the top left),
   - the diagonal `row - col + n - 1` (running to the top right).
3. If the column and both diagonals are free, place the queen and recurse into the next row.
4. **Backtrack:** free the column and the diagonals again.
5. When all `n` rows are filled, the placement is a solution.

The diagonal indices are the trick that makes the check `O(1)` — no scanning along the diagonals is needed.

## Dry Run

Input: `n = 4`. The table follows the search: every row tries its columns in increasing order, and the diagonals are indexed by `row + col` (left) and `row - col + n - 1` (right).

| row | column | decision |
|---:|---:|---|
| 0 | 0 | **place** — left 0, right 3 |
| 1 | 0 | reject — column 0 is taken |
| 1 | 1 | reject — diagonal right 3 is taken |
| 1 | 2 | **place** — left 3, right 2 |
| 2 | 0 | reject — column 0 is taken |
| 2 | 1 | reject — diagonal left 3 is taken |
| 2 | 2 | reject — column 2 is taken |
| 2 | 3 | reject — diagonal right 2 is taken |
| — | — | **backtrack** from (1, 2) |
| 1 | 3 | **place** — left 4, right 1 |
| 2 | 0 | reject — column 0 is taken |
| 2 | 1 | **place** — left 3, right 4 |
| 3 | 0 | reject — column 0 is taken |
| 3 | 1 | reject — diagonal left 4 is taken |
| 3 | 2 | reject — diagonal right 4 is taken |
| 3 | 3 | reject — column 3 is taken |
| — | — | **backtrack** from (2, 1) |
| 2 | 2 | reject — diagonal left 4 is taken |
| 2 | 3 | reject — column 3 is taken |
| — | — | **backtrack** from (1, 3) and from (0, 0) |
| 0 | 1 | **place** — left 1, right 2 |
| 1 | 0 | reject — diagonal left 1 is taken |
| 1 | 1 | reject — column 1 is taken |
| 1 | 2 | reject — diagonal right 2 is taken |
| 1 | 3 | **place** — left 4, right 1 |
| 2 | 0 | **place** — left 2, right 5 |
| 3 | 0 | reject — column 0 is taken |
| 3 | 1 | reject — diagonal left 4 is taken |
| 3 | 2 | **place** — left 5, right 4 → **solution 1** |
| — | — | **backtrack** all the way to row 0 |
| 0 | 2 | **place** — left 2, right 1 |
| 1 | 0 | **place** — left 1, right 4 |
| 2 | 3 | **place** — left 5, right 2 |
| 3 | 1 | **place** — left 4, right 5 → **solution 2** |

The DFS finds solution 1 first; the sorted output prints solution 2 first.

**Solution 1** — the columns of the queens are `1, 3, 0, 2`:

```
.Q.. ...Q Q... ..Q.
```

**Solution 2** — the columns are `2, 0, 3, 1`:

```
..Q. Q... ...Q .Q..
```

**The number of solutions** for `n = 1 … 8` is `1, 0, 0, 2, 10, 4, 40, 92` — that is the [N-Queens II](./NQueensII.java) problem.

**Why the board is only `n` rows deep.** The recursion depth *is* the row, so there is no separate "row" variable to forget.

## Java Solution

See [`NQueens.java`](./NQueens.java).

```java
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        int[] columns = new int[n];
        Arrays.fill(columns, -1);

        place(0, n, columns, new boolean[n], new boolean[2 * n], new boolean[2 * n], result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n!) | in the worst case every permutation of the columns is tried, which is `O(n!)` |
| **Space** | O(n) | the columns array, the three boolean arrays and the stack are `O(n)` |

**Space `O(n)`** apart from the output, which holds every solution (each `n` rows of `n` characters).

## Interview Notes

**Follow-ups to raise yourself:**

- "How many solutions are there?"* → see [N-Queens II](./NQueensII.java) — the same search with a counter.
- "Can you do it in `O(n)`?"* → the bitmask version: one `int` per row with the attacked columns pre-computed, which fits on `n ≤ 32` rows.
- "What if the queens must be placed on given squares?"* → check the allowed squares before placing.
- "How do you print the board?"* → one row per line, `Q` for a queen and `.` for an empty square.

**Common mistakes:**

- ❌ Forgetting to free the diagonal flags in the backtrack — the next branch would reject valid columns.
- ❌ Using `row - col` directly as the diagonal index — it can be negative, hence the `+ n - 1`.
- ❌ Placing several queens in one row — the row is fixed by the recursion depth.

**How to narrate:**

> "Since two queens in the same row would attack each other, there is exactly one queen per row, so the recursion depth gives me the row and I only choose the column. I check the column and the two diagonals in `O(1)` by indexing the boolean arrays with `row + col` and `row - col + n - 1`. After the recursive call I free the column and both diagonals again — that is the backtrack."

## Related Problems

- [N-Queens II — LeetCode 52](./NQueensII.java) — counting instead of listing
- [Sudoku Solver — LeetCode 37](./SudokuSolver.java) — the same pruning idea on a grid
