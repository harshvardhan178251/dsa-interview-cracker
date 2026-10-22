var e=`backtracking.SudokuSolver`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sudoku Solver
 * LeetCode: 37 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Fill the empty cells of a 9 x 9 Sudoku board so that every row, every column and every 3 x 3 box contains the digits 1 to 9 exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * 9
 * row[0]
 * row[1]
 * ...
 * row[8]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 9
 * 53..7....
 * 6..195...
 * .98....6.
 * 8...6...3
 * 4..8.3..1
 * 7...2...6
 * .6....28.
 * ...419..5
 * ....8..79
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 534678912
 * 672195348
 * 198342567
 * 859761423
 * 426853791
 * 713924856
 * 961537284
 * 287419635
 * 345286179
 * </pre>
 *
 * <p>Approach: Fill the first empty cell with every legal digit, recurse, and undo the digit when the rest of the board cannot be solved.
 *
 * <p>Complexity: Time O(9^m), Space O(81).
 */
public class SudokuSolver {

    /**
     * Solves the Sudoku board in place.
     *
     * <p>The search always fills the **first** empty cell, so no choice is ever made twice. A digit is
     * only tried when it does not clash with the row, the column or the 3 x 3 box of the cell.
     *
     * @param board the board, {@code '.'} marks an empty cell
     * @return the same board, solved
     */
    public static char[][] solveSudoku(char[][] board) {
        solve(board);
        return board;
    }

    /**
     * Fills the board with backtracking.
     *
     * @param board the board
     * @return {@code true} when the board could be solved
     */
    private static boolean solve(char[][] board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] != '.') {
                    continue; // the cell is already filled
                }
                for (char digit = '1'; digit <= '9'; digit++) {
                    if (!isValid(board, row, col, digit)) {
                        continue; // the digit clashes with the row, the column or the box
                    }
                    board[row][col] = digit;              // choose
                    if (solve(board)) {
                        return true;                      // the whole board is solved
                    }
                    board[row][col] = '.';               // backtrack
                }
                return false; // no digit works here
            }
        }
        return true; // no empty cell is left
    }

    /**
     * Tells whether a digit may be placed in a cell.
     *
     * @param board the board
     * @param row   the row of the cell
     * @param col   the column of the cell
     * @param digit the digit to place
     * @return {@code true} when the digit does not clash with anything
     */
    private static boolean isValid(char[][] board, int row, int col, char digit) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == digit) {
                return false; // the digit is already in the row
            }
            if (board[i][col] == digit) {
                return false; // the digit is already in the column
            }
        }
        int boxRow = (row / 3) * 3;
        int boxCol = (col / 3) * 3;
        for (int r = boxRow; r < boxRow + 3; r++) {
            for (int c = boxCol; c < boxCol + 3; c++) {
                if (board[r][c] == digit) {
                    return false; // the digit is already in the 3 x 3 box
                }
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        char[][] board = new char[rows][rows];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < rows; col++) {
                board[row][col] = fs.nextChar();
            }
        }

        solveSudoku(board);

        StringBuilder out = new StringBuilder();
        for (char[] row : board) {
            out.append(row).append('\\n');
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
 * Problem: Sudoku Solver
 * LeetCode: 37 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Fill the empty cells of a 9 x 9 Sudoku board so that every row, every column and every 3 x 3 box contains the digits 1 to 9 exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * 9
 * row[0]
 * row[1]
 * ...
 * row[8]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 9
 * 53..7....
 * 6..195...
 * .98....6.
 * 8...6...3
 * 4..8.3..1
 * 7...2...6
 * .6....28.
 * ...419..5
 * ....8..79
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 534678912
 * 672195348
 * 198342567
 * 859761423
 * 426853791
 * 713924856
 * 961537284
 * 287419635
 * 345286179
 * </pre>
 *
 * <p>Approach: Fill the first empty cell with every legal digit, recurse, and undo the digit when the rest of the board cannot be solved.
 *
 * <p>Complexity: Time O(9^m), Space O(81).
 */
public class Main {

    /**
     * Solves the Sudoku board in place.
     *
     * <p>The search always fills the **first** empty cell, so no choice is ever made twice. A digit is
     * only tried when it does not clash with the row, the column or the 3 x 3 box of the cell.
     *
     * @param board the board, {@code '.'} marks an empty cell
     * @return the same board, solved
     */
    public static char[][] solveSudoku(char[][] board) {
        solve(board);
        return board;
    }

    /**
     * Fills the board with backtracking.
     *
     * @param board the board
     * @return {@code true} when the board could be solved
     */
    private static boolean solve(char[][] board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] != '.') {
                    continue; // the cell is already filled
                }
                for (char digit = '1'; digit <= '9'; digit++) {
                    if (!isValid(board, row, col, digit)) {
                        continue; // the digit clashes with the row, the column or the box
                    }
                    board[row][col] = digit;              // choose
                    if (solve(board)) {
                        return true;                      // the whole board is solved
                    }
                    board[row][col] = '.';               // backtrack
                }
                return false; // no digit works here
            }
        }
        return true; // no empty cell is left
    }

    /**
     * Tells whether a digit may be placed in a cell.
     *
     * @param board the board
     * @param row   the row of the cell
     * @param col   the column of the cell
     * @param digit the digit to place
     * @return {@code true} when the digit does not clash with anything
     */
    private static boolean isValid(char[][] board, int row, int col, char digit) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == digit) {
                return false; // the digit is already in the row
            }
            if (board[i][col] == digit) {
                return false; // the digit is already in the column
            }
        }
        int boxRow = (row / 3) * 3;
        int boxCol = (col / 3) * 3;
        for (int r = boxRow; r < boxRow + 3; r++) {
            for (int c = boxCol; c < boxCol + 3; c++) {
                if (board[r][c] == digit) {
                    return false; // the digit is already in the 3 x 3 box
                }
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        char[][] board = new char[rows][rows];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < rows; col++) {
                board[row][col] = fs.nextChar();
            }
        }

        solveSudoku(board);

        StringBuilder out = new StringBuilder();
        for (char[] row : board) {
            out.append(row).append('\\n');
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
- A given cell is marked with its digit, an empty cell with \`.\`.

Fill the board and return it.

## Input Format

The program reads from standard input:

\`\`\`
9
row[0]
row[1]
...
row[8]
\`\`\`

- the first number is the number of rows (always \`9\` for Sudoku)
- the next nine lines are the rows of the board; each line holds nine characters, \`.\` for an empty cell and \`1\`–\`9\` for a given digit

## Sample Input

\`\`\`
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
\`\`\`

## Expected Output

\`\`\`
534678912
672195348
198342567
859761423
426853791
713924856
961537284
287419635
345286179
\`\`\`

The solved board, one row per line. Every row, column and box contains the digits 1 to 9 exactly once.

## Approach

A backtracking search with **pruning built into the choice**:

1. Find the first empty cell (row by row, left to right).
2. Try the digits \`1\` to \`9\` in that cell — but only the ones that do not clash with the row,    the column or the 3 × 3 box of the cell.
3. Place the digit and recurse. If the recursion fails, **backtrack**: put the \`.\` back and try    the next digit.
4. If no digit works for the cell, the current branch is dead — return \`false\` so the caller    backtracks as well.

**Why always the first empty cell?** The choice of *which* cell to fill does not matter — it only changes the order in which the solutions are found. Always taking the first one means the search never makes the same assignment twice, and it makes the pruning as strong as possible.

**The check.** A digit is legal when it appears in neither the row, nor the column, nor the box of the cell. The box of \`(row, col)\` starts at \`(row / 3 * 3, col / 3 * 3)\`.

## Dry Run

Input: the classic puzzle

\`\`\`
53..7....
6..195...
.98....6.
8...6...3
4..8.3..1
7...2...6
.6....28.
...419..5
....8..79
\`\`\`

The first empty cell is \`(0, 2)\`. The table follows the search for that cell:

| cell | digit tried | legal? | why |
|---|---|---|---|
| \`(0,2)\` | \`1\` | no | \`1\` is already in column 2 |
| \`(0,2)\` | \`2\` | no | \`2\` is already in row 1 |
| \`(0,2)\` | \`3\` | no | \`3\` is already in row 0 (the \`3\` at \`(0,0)\`) |
| \`(0,2)\` | \`4\` | **yes** | placed, the search continues |
| \`(0,3)\` | \`1\` | no | \`1\` is already in column 3 |
| \`(0,3)\` | \`2\` | no | \`2\` is already in row 1 |
| \`(0,3)\` | \`3\` | no | \`3\` is already in column 3 |
| \`(0,3)\` | \`4\` | no | \`4\` is already in row 4 |
| \`(0,3)\` | \`5\` | no | \`5\` is already in row 1 |
| \`(0,3)\` | \`6\` | **yes** | placed — and with it the whole board is solved |

The remaining cells are filled the same way; the search backtracks only when a cell has no legal digit left.

**The board while the search runs** (after \`(0,2) = 4\` and \`(0,3) = 6\`):

\`\`\`
5346 7....
6..1 95...
.98 ....6.
\`\`\`

**The check for \`(0,2) = 4\`:** the row 0 holds \`5, 3, _, _, 7, …\` — no \`4\`; column 2 holds \`_, _, 8, _, _, _, _, _, _\` — no \`4\`; the top-left box holds \`5, 3, _, 6, _, _, ., 9, 8\` — no \`4\`. So the digit is legal.

**When the search backtracks.** If every digit of a cell is illegal, the cell is reset to \`.\` and the *previous* cell tries its next digit. In the classic puzzle the first solution is found without any backtracking at all — a greedy placement would be lucky here, but it is not lucky in general.

## Java Solution

See [\`SudokuSolver.java\`](./SudokuSolver.java).

\`\`\`java
    public static char[][] solveSudoku(char[][] board) {
        solve(board);
        return board;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(9^m) | at most \`9\` choices for each of the \`m\` empty cells, so \`O(9^m)\` |
| **Space** | O(81) | the board plus the recursion stack, at most 81 frames deep |

**Space \`O(81)\`** — the board is the only real storage, the recursion uses the call stack. The bitmask variant (one \`int\` per row, column and box) is much faster in practice.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you make it faster?"* → bitmasks: one \`int\` per row, per column and per box; the candidate digits are computed with a single \`&\`, and the "lowest bit" trick picks the digit.
- "How do you know the puzzle has a unique solution?"* → count the solutions (stop at two) and compare with the number of given digits.
- "What if the board is not solvable?"* → the search returns \`false\` and the board keeps its original state (every placement was undone).
- "How would you generate a puzzle?"* → fill a complete board with a solver, then remove cells while the puzzle still has a unique solution.

**Common mistakes:**

- ❌ Forgetting to reset the cell to \`.\` when the digit does not lead to a solution — that is the backtrack.
- ❌ Forgetting the box check — the puzzle is only half solved without it.
- ❌ Checking the box with the wrong origin: \`(row / 3) * 3\`, not \`row - row % 3\` with a rounding error.
- ❌ Returning \`true\` as soon as one digit was placed instead of when the whole board is filled.

**How to narrate:**

> "I always fill the first empty cell — which cell to fill never matters, it only changes the order of the search. For that cell I try the digits one to nine and keep the ones that clash with neither the row, nor the column, nor the three by three box. I place the digit and recurse; if the recursion fails I put the dot back and try the next digit. The bitmask version makes the candidate check a single AND operation."

## Related Problems

- [N-Queens — LeetCode 51](./NQueens.java) — the same pruning technique on a board
- [Palindrome Partitioning — LeetCode 131](./PalindromePartitioning.java) — the same skeleton over a string
`,i=[`solveSudoku`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};