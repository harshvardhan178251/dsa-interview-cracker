var e=`design.DesignTicTacToe`,t=`package com.dsa.design;

import com.dsa.utils.FastScanner;

/**
 * Problem: Design Tic-Tac-Toe
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, State machine + win detection
 *
 * <p>Problem:
 * Implement a Tic-Tac-Toe board. Player 1 (X) always moves first, player 2 (O) always
 * moves second, and the players alternate. After every move report the state of the game.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * r1 c1
 * r2 c2
 * ...
 * rn cn
 * </pre>
 * Each move is a row and a column between 0 and 2. The program prints one line per move:
 * <ul>
 *   <li>{@code 1} — player 1 wins</li>
 *   <li>{@code 2} — player 2 wins</li>
 *   <li>{@code 3} — draw, the board is full and nobody won</li>
 *   <li>{@code 0} — the game is still running</li>
 *   <li>{@code -1} — the move was illegal (cell taken, out of range, or the game is over)</li>
 * </ul>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 0 0
 * 1 1
 * 0 1
 * 1 0
 * 0 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * 0
 * 0
 * 0
 * 1
 * </pre>
 *
 * <p>Approach: a 9 cell board plus the index of the player to move. After a move, the
 * eight possible winning lines (3 rows, 3 columns, 2 diagonals) are checked for the
 * player that just moved — checking only that player is enough because the opponent could
 * not have won on the previous move without the game already being over.
 *
 * <p>Complexity: Time O(1) per move, Space O(1).
 */
public class DesignTicTacToe {

    /** Row-major board: {@code board[r * 3 + c]}. */
    private final int[] board = new int[9];

    /** 1 = X to move, 2 = O to move. */
    private int nextPlayer = 1;

    /** True once somebody won or the board filled up. */
    private boolean finished;

    /**
     * Plays the move at ({@code row}, {@code col}).
     *
     * @return 1 or 2 for the winner, 3 for a draw, 0 while the game runs on, -1 for an
     *         illegal move
     */
    public int move(int row, int col) {
        if (finished || row < 0 || row > 2 || col < 0 || col > 2) {
            return -1;
        }
        int index = row * 3 + col;
        if (board[index] != 0) {
            return -1;
        }
        board[index] = nextPlayer;
        if (hasWon(nextPlayer)) {
            finished = true;
            return nextPlayer;
        }
        if (isFull()) {
            finished = true;
            return 3;
        }
        nextPlayer = 3 - nextPlayer;
        return 0;
    }

    /** The player whose turn it is (1 = X, 2 = O). */
    public int currentPlayer() {
        return nextPlayer;
    }

    /** The board as a 3x3 grid of strings — used by the tests. */
    public String state() {
        StringBuilder sb = new StringBuilder();
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                int cell = board[r * 3 + c];
                sb.append(cell == 0 ? '.' : cell == 1 ? 'X' : 'O');
            }
            if (r < 2) {
                sb.append('\\n');
            }
        }
        return sb.toString();
    }

    private boolean hasWon(int player) {
        int[][] lines = {
            {0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // rows
            {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // columns
            {0, 4, 8}, {2, 4, 6},            // diagonals
        };
        for (int[] line : lines) {
            if (board[line[0]] == player && board[line[1]] == player && board[line[2]] == player) {
                return true;
            }
        }
        return false;
    }

    private boolean isFull() {
        for (int cell : board) {
            if (cell == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        DesignTicTacToe game = new DesignTicTacToe();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            int row = fs.nextInt();
            int col = fs.nextInt();
            out.append(game.move(row, col)).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Design Tic-Tac-Toe
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, State machine + win detection
 *
 * <p>Problem:
 * Implement a Tic-Tac-Toe board. Player 1 (X) always moves first, player 2 (O) always
 * moves second, and the players alternate. After every move report the state of the game.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * r1 c1
 * r2 c2
 * ...
 * rn cn
 * </pre>
 * Each move is a row and a column between 0 and 2. The program prints one line per move:
 * <ul>
 *   <li>{@code 1} — player 1 wins</li>
 *   <li>{@code 2} — player 2 wins</li>
 *   <li>{@code 3} — draw, the board is full and nobody won</li>
 *   <li>{@code 0} — the game is still running</li>
 *   <li>{@code -1} — the move was illegal (cell taken, out of range, or the game is over)</li>
 * </ul>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 0 0
 * 1 1
 * 0 1
 * 1 0
 * 0 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * 0
 * 0
 * 0
 * 1
 * </pre>
 *
 * <p>Approach: a 9 cell board plus the index of the player to move. After a move, the
 * eight possible winning lines (3 rows, 3 columns, 2 diagonals) are checked for the
 * player that just moved — checking only that player is enough because the opponent could
 * not have won on the previous move without the game already being over.
 *
 * <p>Complexity: Time O(1) per move, Space O(1).
 */
public class Main {

    /** Row-major board: {@code board[r * 3 + c]}. */
    private final int[] board = new int[9];

    /** 1 = X to move, 2 = O to move. */
    private int nextPlayer = 1;

    /** True once somebody won or the board filled up. */
    private boolean finished;

    /**
     * Plays the move at ({@code row}, {@code col}).
     *
     * @return 1 or 2 for the winner, 3 for a draw, 0 while the game runs on, -1 for an
     *         illegal move
     */
    public int move(int row, int col) {
        if (finished || row < 0 || row > 2 || col < 0 || col > 2) {
            return -1;
        }
        int index = row * 3 + col;
        if (board[index] != 0) {
            return -1;
        }
        board[index] = nextPlayer;
        if (hasWon(nextPlayer)) {
            finished = true;
            return nextPlayer;
        }
        if (isFull()) {
            finished = true;
            return 3;
        }
        nextPlayer = 3 - nextPlayer;
        return 0;
    }

    /** The player whose turn it is (1 = X, 2 = O). */
    public int currentPlayer() {
        return nextPlayer;
    }

    /** The board as a 3x3 grid of strings — used by the tests. */
    public String state() {
        StringBuilder sb = new StringBuilder();
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                int cell = board[r * 3 + c];
                sb.append(cell == 0 ? '.' : cell == 1 ? 'X' : 'O');
            }
            if (r < 2) {
                sb.append('\\n');
            }
        }
        return sb.toString();
    }

    private boolean hasWon(int player) {
        int[][] lines = {
            {0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // rows
            {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // columns
            {0, 4, 8}, {2, 4, 6},            // diagonals
        };
        for (int[] line : lines) {
            if (board[line[0]] == player && board[line[1]] == player && board[line[2]] == player) {
                return true;
            }
        }
        return false;
    }

    private boolean isFull() {
        for (int cell : board) {
            if (cell == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        Main game = new Main();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            int row = fs.nextInt();
            int col = fs.nextInt();
            out.append(game.move(row, col)).append('\\n');
        }
        System.out.print(out);
    }
}

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r=`
# Design Tic-Tac-Toe

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · State machine · Win detection |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Implement a Tic-Tac-Toe board.

- Player 1 (\`X\`) always moves first, player 2 (\`O\`) always moves second, and the players
  alternate.
- A move places the current player's mark on an empty cell of the 3×3 board.
- After every move the game reports its state: \`1\` (X wins), \`2\` (O wins), \`3\` (draw),
  \`0\` (still running) or \`-1\` (illegal move: the cell is taken, out of range, or the game
  is already over).

## Input Format

\`\`\`
n
r1 c1
r2 c2
...
rn cn
\`\`\`

- \`n\` — number of moves.
- \`ri ci\` — the row and the column of the move, both between 0 and 2.

The program prints one line per move with the state of the game.

## Sample Input

\`\`\`
5
0 0
1 1
0 1
1 0
0 2
\`\`\`

## Expected Output

\`\`\`
0
0
0
0
1
\`\`\`

The moves are X(0,0), O(1,1), X(0,1), O(1,0), X(0,2) — the last one completes the top
row, so X wins.

## Approach — a 9 cell board plus the player to move

State is tiny: nine cells, each \`0\` (empty), \`1\` (X) or \`2\` (O), plus the index of the
player whose turn it is. Everything else is derived.

**Win detection.** There are exactly eight winning lines: three rows, three columns and
two diagonals. After a move only the player who just moved can have won, so eight
constant-time checks are enough — no need to re-check the whole board.

**Alternating turns.** After a successful move the player flips with \`nextPlayer = 3 -
nextPlayer\`.

**Terminal states.** A win or a full board ends the game; further moves are rejected
with \`-1\`.

## Dry Run

The board is printed row by row; \`X\` is player 1, \`O\` is player 2, \`.\` is empty.

| Step | Move | Board before | Player | Action | Board after | Winning line? | Output |
|---:|---|---|---:|---|---|---|---|
| 1 | \`0 0\` | \`<br>. . .<br>. . .<br>. . .\` | X | write X at (0,0) | \`X . .<br>. . .<br>. . .\` | no | \`0\` |
| 2 | \`1 1\` | \`X . .<br>. . .<br>. . .\` | O | write O at (1,1) | \`X . .<br>. . O<br>. . .\` | no | \`0\` |
| 3 | \`0 1\` | \`X . .<br>. . O<br>. . .\` | X | write X at (0,1) | \`X X .<br>. . O<br>. . .\` | no | \`0\` |
| 4 | \`1 0\` | \`X X .<br>. . O<br>. . .\` | O | write O at (1,0) | \`X X .<br>O . O<br>. . .\` | no | \`0\` |
| 5 | \`0 2\` | \`X X .<br>O . O<br>. . .\` | X | write X at (0,2) | \`X X X<br>O . O<br>. . .\` | **row 0** | \`1\` |

### The eight winning lines

\`\`\`
rows:    (0,1,2)  (3,4,5)  (6,7,8)
columns: (0,3,6)  (1,4,7)  (2,5,8)
diags:   (0,4,8)  (2,4,6)
\`\`\`

With the board flattened row by row, a line is a triple of indices — that is why the
code stores the board in a flat \`int[9]\`.

## Java Solution

See [\`DesignTicTacToe.java\`](./DesignTicTacToe.java).

\`\`\`java
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
\`\`\`

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
  and validates the moves — exactly the \`move\` method above.

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
> keep a \`finished\` flag so moves after a win or a draw are rejected."

## Related Problems

- [Design Browser History — LeetCode 348](./DesignBrowserHistory.md) — a small state machine
  with an explicit cursor
- [Min Max Stack](./MinMaxStack.md) — a structure with its own "terminal" states
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};