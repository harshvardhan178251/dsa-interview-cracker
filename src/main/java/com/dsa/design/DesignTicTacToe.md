---
title: Design Tic-Tac-Toe
leetcode: null
difficulty: Medium
patterns: [Design, State machine, Win detection]
companies: [Amazon, Google, Meta, Uber]
frequency: 3
tags: [matrix, game, state machine]
sampleInput: |
  5
  0 0
  1 1
  0 1
  1 0
  0 2
sampleOutput: |
  0
  0
  0
  0
  1
---

# Design Tic-Tac-Toe

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · State machine · Win detection |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Implement a Tic-Tac-Toe board.

- Player 1 (`X`) always moves first, player 2 (`O`) always moves second, and the players
  alternate.
- A move places the current player's mark on an empty cell of the 3×3 board.
- After every move the game reports its state: `1` (X wins), `2` (O wins), `3` (draw),
  `0` (still running) or `-1` (illegal move: the cell is taken, out of range, or the game
  is already over).

## Input Format

```
n
r1 c1
r2 c2
...
rn cn
```

- `n` — number of moves.
- `ri ci` — the row and the column of the move, both between 0 and 2.

The program prints one line per move with the state of the game.

## Sample Input

```
5
0 0
1 1
0 1
1 0
0 2
```

## Expected Output

```
0
0
0
0
1
```

The moves are X(0,0), O(1,1), X(0,1), O(1,0), X(0,2) — the last one completes the top
row, so X wins.

## Approach — a 9 cell board plus the player to move

State is tiny: nine cells, each `0` (empty), `1` (X) or `2` (O), plus the index of the
player whose turn it is. Everything else is derived.

**Win detection.** There are exactly eight winning lines: three rows, three columns and
two diagonals. After a move only the player who just moved can have won, so eight
constant-time checks are enough — no need to re-check the whole board.

**Alternating turns.** After a successful move the player flips with `nextPlayer = 3 -
nextPlayer`.

**Terminal states.** A win or a full board ends the game; further moves are rejected
with `-1`.

## Dry Run

The board is printed row by row; `X` is player 1, `O` is player 2, `.` is empty.

| Step | Move | Board before | Player | Action | Board after | Winning line? | Output |
|---:|---|---|---:|---|---|---|---|
| 1 | `0 0` | `<br>. . .<br>. . .<br>. . .` | X | write X at (0,0) | `X . .<br>. . .<br>. . .` | no | `0` |
| 2 | `1 1` | `X . .<br>. . .<br>. . .` | O | write O at (1,1) | `X . .<br>. . O<br>. . .` | no | `0` |
| 3 | `0 1` | `X . .<br>. . O<br>. . .` | X | write X at (0,1) | `X X .<br>. . O<br>. . .` | no | `0` |
| 4 | `1 0` | `X X .<br>. . O<br>. . .` | O | write O at (1,0) | `X X .<br>O . O<br>. . .` | no | `0` |
| 5 | `0 2` | `X X .<br>O . O<br>. . .` | X | write X at (0,2) | `X X X<br>O . O<br>. . .` | **row 0** | `1` |

### The eight winning lines

```
rows:    (0,1,2)  (3,4,5)  (6,7,8)
columns: (0,3,6)  (1,4,7)  (2,5,8)
diags:   (0,4,8)  (2,4,6)
```

With the board flattened row by row, a line is a triple of indices — that is why the
code stores the board in a flat `int[9]`.

## Java Solution

See [`DesignTicTacToe.java`](./DesignTicTacToe.java).

```java
public int move(int row, int col) {
    if (finished || row < 0 || row > 2 || col < 0 || col > 2) {
        return -1;
    }
    int index = row * 3 + col;
    if (board[index] != 0) {
        return -1;                       // the cell is taken
    }
    board[index] = nextPlayer;
    if (hasWon(nextPlayer)) {
        finished = true;
        return nextPlayer;
    }
    if (isFull()) {
        finished = true;
        return 3;                       // draw
    }
    nextPlayer = 3 - nextPlayer;
    return 0;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per move | 8 lines × 3 cells, plus a 9 cell scan for a draw |
| **Space** | O(1) | a 3×3 board |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you detect the winner in O(1) per move for a 5×5 board?"* → keep a counter
  per row, column and diagonal and increment the ones the move touches; a counter that
  reaches 5 means a win.
- *"How would you support a board game with undo?"* → keep a stack of (cell, previous
  mark) pairs.
- *"What if the board is huge (1e9 × 1e9)?"* → store only the occupied cells in a hash
  map; the win check then only looks at the lines through the last move.
- *"How would you let two players play over the network?"* → the server owns the board
  and validates the moves — exactly the `move` method above.

**Common mistakes:**
- ❌ Checking the whole board for a winner after every move instead of only the lines
  through the last move.
- ❌ Forgetting to flip the player after a **winning** move (harmless here, but it breaks
  the "game over" check).
- ❌ Not detecting the draw — the board can be full without a winner.
- ❌ Accepting a move on a cell that is already taken.

**How to narrate:**
> "The state is a 3×3 board plus whose turn it is. There are only eight winning lines,
> and after a move only the player who just moved can have won, so I check those eight
> triples. The board is flattened into an int[9] so a line is just three indices. I also
> keep a `finished` flag so moves after a win or a draw are rejected."

## Related Problems

- [Design Browser History — LeetCode 348](./DesignBrowserHistory.md) — a small state machine
  with an explicit cursor
- [Min Max Stack](./MinMaxStack.md) — a structure with its own "terminal" states
