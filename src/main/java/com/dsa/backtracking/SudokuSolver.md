---
title: Sudoku Solver
leetcode: 37
difficulty: Hard
patterns: [Backtracking, Constraint pruning]
companies: [Amazon, Google, Meta, Microsoft]
frequency: 4
tags: [backtracking, hard, matrix]
sampleInput: |
  9
  53..7....
  6..195...
  .98....6.
  8...6...3
  4..8.3..1
  7...2...6
  .6....28.
  ...419..5
  ....8..79
sampleOutput: |
  534678912
  672195348
  198342567
  859761423
  426853791
  713924856
  961537284
  287419635
  345286179
---

# Sudoku Solver — LeetCode 37

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · Constraint pruning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

Solve a Sudoku puzzle.

- Every row, every column and every 3 × 3 box must contain the digits 1 to 9 exactly once.
- A given cell is marked with its digit, an empty cell with `.`.

Fill the board and return it.

## Input Format

The program reads from standard input:

```
9
row[0]
row[1]
...
row[8]
```

- the first number is the number of rows (always `9` for Sudoku)
- the next nine lines are the rows of the board; each line holds nine characters, `.` for an empty cell and `1`–`9` for a given digit

## Sample Input

```
9
53..7....
6..195...
.98....6.
8...6...3
4..8.3..1
7...2...6
.6....28.
...419..5
....8..79
```

## Expected Output

```
534678912
672195348
198342567
859761423
426853791
713924856
961537284
287419635
345286179
```

The solved board, one row per line. Every row, column and box contains the digits 1 to 9 exactly once.

## Approach

A backtracking search with **pruning built into the choice**:

1. Find the first empty cell (row by row, left to right).
2. Try the digits `1` to `9` in that cell — but only the ones that do not clash with the row,    the column or the 3 × 3 box of the cell.
3. Place the digit and recurse. If the recursion fails, **backtrack**: put the `.` back and try    the next digit.
4. If no digit works for the cell, the current branch is dead — return `false` so the caller    backtracks as well.

**Why always the first empty cell?** The choice of *which* cell to fill does not matter — it only changes the order in which the solutions are found. Always taking the first one means the search never makes the same assignment twice, and it makes the pruning as strong as possible.

**The check.** A digit is legal when it appears in neither the row, nor the column, nor the box of the cell. The box of `(row, col)` starts at `(row / 3 * 3, col / 3 * 3)`.

## Dry Run

Input: the classic puzzle

```
53..7....
6..195...
.98....6.
8...6...3
4..8.3..1
7...2...6
.6....28.
...419..5
....8..79
```

The first empty cell is `(0, 2)`. The table follows the search for that cell:

| cell | digit tried | legal? | why |
|---|---|---|---|
| `(0,2)` | `1` | no | `1` is already in column 2 |
| `(0,2)` | `2` | no | `2` is already in row 1 |
| `(0,2)` | `3` | no | `3` is already in row 0 (the `3` at `(0,0)`) |
| `(0,2)` | `4` | **yes** | placed, the search continues |
| `(0,3)` | `1` | no | `1` is already in column 3 |
| `(0,3)` | `2` | no | `2` is already in row 1 |
| `(0,3)` | `3` | no | `3` is already in column 3 |
| `(0,3)` | `4` | no | `4` is already in row 4 |
| `(0,3)` | `5` | no | `5` is already in row 1 |
| `(0,3)` | `6` | **yes** | placed — and with it the whole board is solved |

The remaining cells are filled the same way; the search backtracks only when a cell has no legal digit left.

**The board while the search runs** (after `(0,2) = 4` and `(0,3) = 6`):

```
5346 7....
6..1 95...
.98 ....6.
```

**The check for `(0,2) = 4`:** the row 0 holds `5, 3, _, _, 7, …` — no `4`; column 2 holds `_, _, 8, _, _, _, _, _, _` — no `4`; the top-left box holds `5, 3, _, 6, _, _, ., 9, 8` — no `4`. So the digit is legal.

**When the search backtracks.** If every digit of a cell is illegal, the cell is reset to `.` and the *previous* cell tries its next digit. In the classic puzzle the first solution is found without any backtracking at all — a greedy placement would be lucky here, but it is not lucky in general.

## Java Solution

See [`SudokuSolver.java`](./SudokuSolver.java).

```java
    public static char[][] solveSudoku(char[][] board) {
        solve(board);
        return board;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(9^m) | at most `9` choices for each of the `m` empty cells, so `O(9^m)` |
| **Space** | O(81) | the board plus the recursion stack, at most 81 frames deep |

**Space `O(81)`** — the board is the only real storage, the recursion uses the call stack. The bitmask variant (one `int` per row, column and box) is much faster in practice.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you make it faster?"* → bitmasks: one `int` per row, per column and per box; the candidate digits are computed with a single `&`, and the "lowest bit" trick picks the digit.
- "How do you know the puzzle has a unique solution?"* → count the solutions (stop at two) and compare with the number of given digits.
- "What if the board is not solvable?"* → the search returns `false` and the board keeps its original state (every placement was undone).
- "How would you generate a puzzle?"* → fill a complete board with a solver, then remove cells while the puzzle still has a unique solution.

**Common mistakes:**

- ❌ Forgetting to reset the cell to `.` when the digit does not lead to a solution — that is the backtrack.
- ❌ Forgetting the box check — the puzzle is only half solved without it.
- ❌ Checking the box with the wrong origin: `(row / 3) * 3`, not `row - row % 3` with a rounding error.
- ❌ Returning `true` as soon as one digit was placed instead of when the whole board is filled.

**How to narrate:**

> "I always fill the first empty cell — which cell to fill never matters, it only changes the order of the search. For that cell I try the digits one to nine and keep the ones that clash with neither the row, nor the column, nor the three by three box. I place the digit and recurse; if the recursion fails I put the dot back and try the next digit. The bitmask version makes the candidate check a single AND operation."

## Related Problems

- [N-Queens — LeetCode 51](./NQueens.java) — the same pruning technique on a board
- [Palindrome Partitioning — LeetCode 131](./PalindromePartitioning.java) — the same skeleton over a string
