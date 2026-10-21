---
title: N-Queens II
leetcode: 52
difficulty: Hard
patterns: [Backtracking, Constraint pruning]
companies: [Meta, Airbnb, Bloomberg]
frequency: 3
tags: [backtracking, hard, board]
sampleInput: |
  4
sampleOutput: "2"
---

# N-Queens II — LeetCode 52

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · Constraint pruning |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

The **N-Queens** puzzle is the problem of placing `n` queens on an `n × n` chessboard so that no two queens attack each other.

Given an integer `n`, return the **number of distinct solutions**.

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
2
```

There are exactly **2** ways to place four queens on a 4 × 4 board.

## Approach

This is [N-Queens](./NQueens.java) with a counter instead of a list:

1. One queen per row — the recursion depth is the row, only the column is chosen.
2. A candidate column is rejected when the column itself or one of the two diagonals    (`row + col` and `row - col + n - 1`) is already occupied.
3. When all `n` rows are filled the sub-tree contributes `1` to the answer.
4. Backtrack: free the column and the diagonals again.

**The known counts** for `n = 1 … 9` are `1, 0, 0, 2, 10, 4, 40, 92, 352` — a good way to test the implementation.

## Dry Run

Input: `n = 4`. Every row of the search is shown with the columns that are tried; the leaves that are reached are the solutions.

| row | column tried | decision |
|---:|---:|---|
| 0 | 0 | **place** |
| 1 | 0 | reject — column 0 is taken |
| 1 | 1 | reject — diagonal `1 - 1 + 3 = 3` is taken |
| 1 | 2 | **place** |
| 2 | 0 | reject — column 0 is taken |
| 2 | 1 | reject — diagonal `2 + 1 = 3` is taken |
| 2 | 2 | reject — column 2 is taken |
| 2 | 3 | reject — diagonal `2 - 3 + 3 = 2` is taken |
| — | — | **backtrack** from (1, 2) |
| 1 | 3 | **place** |
| 2 | 0 | reject — column 0 is taken |
| 2 | 1 | **place** |
| 3 | 0 | reject — column 0 is taken |
| 3 | 1 | reject — diagonal `3 + 1 = 4` is taken |
| 3 | 2 | reject — diagonal `3 - 2 + 3 = 4` is taken |
| 3 | 3 | reject — column 3 is taken |
| — | — | **backtrack** from (2, 1) → (1, 3) → (0, 0) |
| 0 | 1 | **place** |
| 1 | 0 | reject — diagonal `1 + 0 = 1` is taken |
| 1 | 1 | reject — column 1 is taken |
| 1 | 2 | reject — diagonal `1 - 2 + 3 = 2` is taken |
| 1 | 3 | **place** |
| 2 | 0 | **place** |
| 3 | 0 | reject — column 0 is taken |
| 3 | 1 | reject — diagonal `3 + 1 = 4` is taken |
| 3 | 2 | **place** → **solution 1** |
| — | — | **backtrack** … |
| 0 | 2 | **place** |
| 1 | 0 | **place** |
| 2 | 3 | **place** |
| 3 | 1 | **place** → **solution 2** |

Two leaves were reached → the answer is **2**.

**The two solutions** (the columns of the queens per row):

| solution | row 0 | row 1 | row 2 | row 3 |
|---:|---:|---:|---:|---:|
| 1 | 1 | 3 | 0 | 2 |
| 2 | 2 | 0 | 3 | 1 |

**Why the search is fast enough.** Every row rejects the columns that are attacked, so the tree is far smaller than `n!` — for `n = 9` only a few thousand nodes are visited.

## Java Solution

See [`NQueensII.java`](./NQueensII.java).

```java
    public static int solveNQueens(int n) {
        return place(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n!) | at most every permutation of the columns is tried, which is `O(n!)` |
| **Space** | O(n) | the three boolean arrays and the stack are `O(n)` |

**Space `O(n)`** — no solutions are stored, only the count.

## Interview Notes

**Follow-ups to raise yourself:**

- "Show me the solutions, not just the count."* → see [N-Queens — LeetCode 51](./NQueens.java).
- "Can you do it in `O(n)`?"* → the bitmask version: one `int` per row with the attacked columns pre-computed.
- "What are the counts for larger boards?"* → `1, 0, 0, 2, 10, 4, 40, 92, 352` for `n = 1 … 9`.
- "How would you count the solutions for a board with blocked squares?"* → skip the blocked squares in the column loop.

**Common mistakes:**

- ❌ Forgetting to unmark the diagonals in the backtrack — the count would be far too small.
- ❌ Using `row - col` directly as the diagonal index — it can be negative, hence `+ n - 1`.
- ❌ Counting the rows instead of the leaves — a solution is only a fully filled board.

**How to narrate:**

> "This is the N-Queens search with a counter: one queen per row, and for every row I try the columns that are not attacked, checking the column and the two diagonals with boolean arrays so the check is `O(1)`. When the last row is filled the sub-tree contributes one to the count, and after the recursive call I free the column and the diagonals again."

## Related Problems

- [N-Queens — LeetCode 51](./NQueens.java) — the same search, listing the solutions
- [Sudoku Solver — LeetCode 37](./SudokuSolver.java) — the same pruning idea on a grid
