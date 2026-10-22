var e=`backtracking.NQueens`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: N-Queens
 * LeetCode: 51 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Place \`n\` queens on an \`n x n\` board so that no two of them attack each other, and return every distinct solution.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ..Q. Q... ...Q .Q..
 * .Q.. ...Q Q... ..Q.
 * </pre>
 *
 * <p>Approach: Place one queen per row and forbid the columns and diagonals it attacks -- the row is implicit.
 *
 * <p>Complexity: Time O(n!), Space O(n).
 */
public class NQueens {

    /**
     * Returns every placement of {@code n} queens that leaves no two of them attacking each other.
     *
     * <p>There is one queen per row, so only the column has to be tracked. Two boolean arrays mark the
     * occupied columns and the two diagonals.
     *
     * @param n the size of the board
     * @return every solution, sorted lexicographically
     */
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        int[] columns = new int[n];
        Arrays.fill(columns, -1);

        place(0, n, columns, new boolean[n], new boolean[2 * n], new boolean[2 * n], result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Tries to place the queen of the current row.
     *
     * @param row         the row that is being filled
     * @param n           the size of the board
     * @param columns     the column of the queen in every row
     * @param usedColumn  the occupied columns
     * @param usedDiagLeft the occupied diagonals running to the top left
     * @param usedDiagRight the occupied diagonals running to the top right
     * @param result      the collected solutions
     */
    private static void place(int row, int n, int[] columns, boolean[] usedColumn,
                              boolean[] usedDiagLeft, boolean[] usedDiagRight, List<List<String>> result) {
        if (row == n) {
            result.add(render(columns, n)); // every row has a queen
            return;
        }
        for (int col = 0; col < n; col++) {
            int left = row + col;
            int right = row - col + n - 1;
            if (usedColumn[col] || usedDiagLeft[left] || usedDiagRight[right]) {
                continue; // the queen would be attacked
            }
            columns[row] = col;
            usedColumn[col] = true;
            usedDiagLeft[left] = true;
            usedDiagRight[right] = true;

            place(row + 1, n, columns, usedColumn, usedDiagLeft, usedDiagRight, result);

            usedDiagRight[right] = false;  // backtrack
            usedDiagLeft[left] = false;
            usedColumn[col] = false;
            columns[row] = -1;
        }
    }

    /**
     * Renders a solution as a list of board rows.
     *
     * @param columns the column of the queen in every row
     * @param n       the size of the board
     * @return the rows of the board
     */
    private static List<String> render(int[] columns, int n) {
        List<String> board = new ArrayList<>();
        for (int row = 0; row < n; row++) {
            char[] line = new char[n];
            Arrays.fill(line, '.');
            line[columns[row]] = 'Q';
            board.add(new String(line));
        }
        return board;
    }
    /**
     * Compares two lists element by element (lexicographic order).
     *
     * @param a the first list
     * @param b the second list
     * @param <T> the element type
     * @return a negative number, zero, or a positive number
     */
    private static <T extends Comparable<? super T>> int compareLists(List<T> a, List<T> b) {
        int limit = Math.min(a.size(), b.size());
        for (int i = 0; i < limit; i++) {
            int diff = a.get(i).compareTo(b.get(i));
            if (diff != 0) {
                return diff;
            }
        }
        return Integer.compare(a.size(), b.size());
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        StringBuilder out = new StringBuilder();
        for (List<String> solution : solveNQueens(n)) {
            for (int i = 0; i < solution.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(solution.get(i));
            }
            out.append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: N-Queens
 * LeetCode: 51 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Place \`n\` queens on an \`n x n\` board so that no two of them attack each other, and return every distinct solution.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ..Q. Q... ...Q .Q..
 * .Q.. ...Q Q... ..Q.
 * </pre>
 *
 * <p>Approach: Place one queen per row and forbid the columns and diagonals it attacks -- the row is implicit.
 *
 * <p>Complexity: Time O(n!), Space O(n).
 */
public class Main {

    /**
     * Returns every placement of {@code n} queens that leaves no two of them attacking each other.
     *
     * <p>There is one queen per row, so only the column has to be tracked. Two boolean arrays mark the
     * occupied columns and the two diagonals.
     *
     * @param n the size of the board
     * @return every solution, sorted lexicographically
     */
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        int[] columns = new int[n];
        Arrays.fill(columns, -1);

        place(0, n, columns, new boolean[n], new boolean[2 * n], new boolean[2 * n], result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Tries to place the queen of the current row.
     *
     * @param row         the row that is being filled
     * @param n           the size of the board
     * @param columns     the column of the queen in every row
     * @param usedColumn  the occupied columns
     * @param usedDiagLeft the occupied diagonals running to the top left
     * @param usedDiagRight the occupied diagonals running to the top right
     * @param result      the collected solutions
     */
    private static void place(int row, int n, int[] columns, boolean[] usedColumn,
                              boolean[] usedDiagLeft, boolean[] usedDiagRight, List<List<String>> result) {
        if (row == n) {
            result.add(render(columns, n)); // every row has a queen
            return;
        }
        for (int col = 0; col < n; col++) {
            int left = row + col;
            int right = row - col + n - 1;
            if (usedColumn[col] || usedDiagLeft[left] || usedDiagRight[right]) {
                continue; // the queen would be attacked
            }
            columns[row] = col;
            usedColumn[col] = true;
            usedDiagLeft[left] = true;
            usedDiagRight[right] = true;

            place(row + 1, n, columns, usedColumn, usedDiagLeft, usedDiagRight, result);

            usedDiagRight[right] = false;  // backtrack
            usedDiagLeft[left] = false;
            usedColumn[col] = false;
            columns[row] = -1;
        }
    }

    /**
     * Renders a solution as a list of board rows.
     *
     * @param columns the column of the queen in every row
     * @param n       the size of the board
     * @return the rows of the board
     */
    private static List<String> render(int[] columns, int n) {
        List<String> board = new ArrayList<>();
        for (int row = 0; row < n; row++) {
            char[] line = new char[n];
            Arrays.fill(line, '.');
            line[columns[row]] = 'Q';
            board.add(new String(line));
        }
        return board;
    }
    /**
     * Compares two lists element by element (lexicographic order).
     *
     * @param a the first list
     * @param b the second list
     * @param <T> the element type
     * @return a negative number, zero, or a positive number
     */
    private static <T extends Comparable<? super T>> int compareLists(List<T> a, List<T> b) {
        int limit = Math.min(a.size(), b.size());
        for (int i = 0; i < limit; i++) {
            int diff = a.get(i).compareTo(b.get(i));
            if (diff != 0) {
                return diff;
            }
        }
        return Integer.compare(a.size(), b.size());
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        StringBuilder out = new StringBuilder();
        for (List<String> solution : solveNQueens(n)) {
            for (int i = 0; i < solution.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(solution.get(i));
            }
            out.append('\\n');
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
# N-Queens — LeetCode 51

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · Constraint pruning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

The **N-Queens** puzzle is the problem of placing \`n\` queens on an \`n × n\` chessboard so that no two queens attack each other.

Given an integer \`n\`, return **all distinct solutions**.

Each solution contains \`n\` board rows, and every row is a string of \`n\` characters: \`Q\` for a queen and \`.\` for an empty square.

## Input Format

The program reads from standard input:

\`\`\`
n
\`\`\`

- \`n\` — the size of the board (1 ≤ n ≤ 9)

## Sample Input

\`\`\`
4
\`\`\`

## Expected Output

\`\`\`
..Q. Q... ...Q .Q..
.Q.. ...Q Q... ..Q.
\`\`\`

The two solutions of the 4 × 4 board. Each solution is printed on one line; the rows of the board are separated by a space.

## Approach

Backtracking with **one queen per row**:

1. Because two queens in the same row attack each other, there is exactly one queen per row —    the row is fixed by the recursion depth and only the column has to be chosen.
2. For each candidate column, check the three attack directions:
   - the **column** itself,
   - the diagonal \`row + col\` (running to the top left),
   - the diagonal \`row - col + n - 1\` (running to the top right).
3. If the column and both diagonals are free, place the queen and recurse into the next row.
4. **Backtrack:** free the column and the diagonals again.
5. When all \`n\` rows are filled, the placement is a solution.

The diagonal indices are the trick that makes the check \`O(1)\` — no scanning along the diagonals is needed.

## Dry Run

Input: \`n = 4\`. The table follows the search: every row tries its columns in increasing order, and the diagonals are indexed by \`row + col\` (left) and \`row - col + n - 1\` (right).

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

**Solution 1** — the columns of the queens are \`1, 3, 0, 2\`:

\`\`\`
.Q.. ...Q Q... ..Q.
\`\`\`

**Solution 2** — the columns are \`2, 0, 3, 1\`:

\`\`\`
..Q. Q... ...Q .Q..
\`\`\`

**The number of solutions** for \`n = 1 … 8\` is \`1, 0, 0, 2, 10, 4, 40, 92\` — that is the [N-Queens II](./NQueensII.java) problem.

**Why the board is only \`n\` rows deep.** The recursion depth *is* the row, so there is no separate "row" variable to forget.

## Java Solution

See [\`NQueens.java\`](./NQueens.java).

\`\`\`java
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        int[] columns = new int[n];
        Arrays.fill(columns, -1);

        place(0, n, columns, new boolean[n], new boolean[2 * n], new boolean[2 * n], result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n!) | in the worst case every permutation of the columns is tried, which is \`O(n!)\` |
| **Space** | O(n) | the columns array, the three boolean arrays and the stack are \`O(n)\` |

**Space \`O(n)\`** apart from the output, which holds every solution (each \`n\` rows of \`n\` characters).

## Interview Notes

**Follow-ups to raise yourself:**

- "How many solutions are there?"* → see [N-Queens II](./NQueensII.java) — the same search with a counter.
- "Can you do it in \`O(n)\`?"* → the bitmask version: one \`int\` per row with the attacked columns pre-computed, which fits on \`n ≤ 32\` rows.
- "What if the queens must be placed on given squares?"* → check the allowed squares before placing.
- "How do you print the board?"* → one row per line, \`Q\` for a queen and \`.\` for an empty square.

**Common mistakes:**

- ❌ Forgetting to free the diagonal flags in the backtrack — the next branch would reject valid columns.
- ❌ Using \`row - col\` directly as the diagonal index — it can be negative, hence the \`+ n - 1\`.
- ❌ Placing several queens in one row — the row is fixed by the recursion depth.

**How to narrate:**

> "Since two queens in the same row would attack each other, there is exactly one queen per row, so the recursion depth gives me the row and I only choose the column. I check the column and the two diagonals in \`O(1)\` by indexing the boolean arrays with \`row + col\` and \`row - col + n - 1\`. After the recursive call I free the column and both diagonals again — that is the backtrack."

## Related Problems

- [N-Queens II — LeetCode 52](./NQueensII.java) — counting instead of listing
- [Sudoku Solver — LeetCode 37](./SudokuSolver.java) — the same pruning idea on a grid
`,i=[`solveNQueens`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};