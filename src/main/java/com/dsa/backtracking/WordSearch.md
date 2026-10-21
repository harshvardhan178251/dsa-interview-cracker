---
title: Word Search
leetcode: 79
difficulty: Medium
patterns: [Backtracking, DFS on a grid]
companies: [Amazon, Google, Meta, Uber]
frequency: 4
tags: [backtracking, matrix, strings]
sampleInput: |
  3 4
  ABCE
  SFCS
  ADEE
  ABCCED
sampleOutput: "1"
---

# Word Search — LeetCode 79

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · DFS on a grid |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an `m × n` board of characters and a word, find whether the word **exists** in the board.

The word must be built from letters of **adjacent** cells — horizontally or vertically, not diagonally — and every cell may be used **at most once**.

## Input Format

The program reads from standard input:

```
rows cols
board[0]
board[1]
...
board[rows-1]
word
```

- `rows` — number of rows (1 ≤ rows ≤ 20)
- `cols` — number of columns (1 ≤ cols ≤ 20)
- the next `rows` lines are the rows of the board, each holding `cols` characters
- the last line is the word to look for

## Sample Input

```
3 4
ABCE
SFCS
ADEE
ABCCED
```

## Expected Output

```
1
```

The path `A(0,0) → B(0,1) → C(0,2) → C(1,2) → E(2,2) → D(2,1)` spells `ABCCED` → **1**.

## Approach

A depth-first search with backtracking:

1. Try every cell as the start of the word.
2. In the search, check that the current cell is inside the board and that its letter is the    letter the word expects at that position.
3. If it is the **last** letter, the word was found.
4. Otherwise mark the cell as used (`\0`), recurse into the four neighbours, and **unmark** the    cell afterwards — that is the backtrack.

**Why the cell has to be marked.** A cell may only be used once, so the search must not walk back onto a cell that the current path already uses. Marking the cell in the board itself is the simplest way to do that — and the mark is removed again when the branch is finished.

**Why the first letter is not marked.** The check for the last letter happens before the mark, so a one-letter word is found correctly.

## Dry Run

Input: board

```
A B C E
S F C S
A D E E
```

word = `ABCCED`. The search starts at `(0,0)` because it is the first cell with the letter `A`.

| step | cell | letter | matches the word? | mark |
|---:|---|---|---|---|
| 1 | `(0,0)` | `A` | yes — `A` | `(0,0)` taken |
| 2 | `(0,1)` | `B` | yes — `B` | `(0,1)` taken |
| 3 | `(0,2)` | `C` | yes — `C` | `(0,2)` taken |
| 4 | `(1,2)` | `C` | yes — `C` | `(1,2)` taken |
| 5 | `(2,2)` | `E` | yes — `E` | `(2,2)` taken |
| 6 | `(2,1)` | `D` | yes — `D` — the last letter | the whole word is found |

The neighbours that were rejected on the way:

| from | neighbour | letter | why it was rejected |
|---|---|---|---|
| `(0,0)` | `(1,0)` | `S` | does not match `B` |
| `(0,1)` | `(1,1)` | `F` | does not match `C` |
| `(0,2)` | `(0,3)` | `E` | does not match `C` |
| `(1,2)` | `(1,1)` | `F` | does not match `E` |
| `(2,2)` | `(2,3)` | `E` | does not match `D` |

The path worked on the first try → answer **1**.

**A backtracking example.** With the word `ABCB` the search walks `A(0,0) → B(0,1) → C(0,2)` and then needs another `B`. The neighbours of `(0,2)` are `E(0,3)` and `C(1,2)` — neither is a `B`, and `(0,1)` is already taken by the path. So the search backtracks to `(0,1)` and tries `(1,1)` (an `F`), then gives up on this start cell and continues with the next `A`.

**The mark is what makes that work.** Without the mark the search could walk `A → B → C → … → B` through the same cell twice, which the rules forbid.

## Java Solution

See [`WordSearch.java`](./WordSearch.java).

```java
    public static boolean exist(char[][] board, String word) {
        if (board.length == 0 || board[0].length == 0) {
            return false;
        }
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[0].length; col++) {
                if (search(board, row, col, 0, word)) {
                    return true;
                }
            }
        }
        return false;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols · 4^L) | every cell starts a search of at most `4^L` paths, where `L` is the length of the word |
| **Space** | O(rows · cols) | the recursion stack is at most `L` deep and the board stores the marks |

**Space `O(rows · cols)`** for the board and the recursion stack. The board is modified during the search and restored afterwards.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the word may also move diagonally?"* → add the four diagonal neighbours to the search.
- "What if the word may be reused?"* → drop the marking of the cells.
- "How do you find all words of a dictionary?"* → [Word Search II](./WordSearch.java) with a trie; that is the follow-up this problem usually leads to.
- "How do you make it faster?"* → prune the search when the remaining letters of the word do not occur in the board at all.

**Common mistakes:**

- ❌ Forgetting to unmark the cell after the recursive calls — the other start cells would fail.
- ❌ Marking the cell before the "last letter" check — a one-letter word would never be found.
- ❌ Allowing diagonal moves.
- ❌ Forgetting that the same cell may not be used twice in the same path.

**How to narrate:**

> "I try every cell as the start of the word and walk the word with a depth-first search. The important detail is the mark: while the search stands on a cell it is taken, so the search cannot walk onto it twice — and when the branch is finished I release the cell again. That is the backtrack."

## Related Problems

- [Letter Combinations of a Phone Number — LeetCode 17](./LetterCombinationsOfAPhoneNumber.java) — the same skeleton without a grid
- [GridUniquePathsIII — LeetCode 980](../dynamicprogramming/GridUniquePathsIII.java) — a grid walk that has to cover every cell
