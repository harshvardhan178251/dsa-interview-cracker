var e=`backtracking.NQueensII`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.Arrays;

/**
 * Problem: N-Queens II
 * LeetCode: 52 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Count how many ways \`n\` queens can be placed on an \`n x n\` board so that no two of them attack each other.
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
 * 2
 * </pre>
 *
 * <p>Approach: The same search as N-Queens, but the leaves are counted instead of collected.
 *
 * <p>Complexity: Time O(n!), Space O(n).
 */
public class NQueensII {

    /**
     * Counts the placements of {@code n} queens that leave no two of them attacking each other.
     *
     * <p>There is one queen per row, so only the column has to be chosen. The occupied columns and the
     * two diagonals are tracked with boolean arrays, which makes the check for every candidate
     * column {@code O(1)}.
     *
     * @param n the size of the board
     * @return the number of solutions
     */
    public static int solveNQueens(int n) {
        return place(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
    }

    /**
     * Tries to place the queen of the current row and counts the completions.
     *
     * @param row           the row that is being filled
     * @param n             the size of the board
     * @param usedColumn    the occupied columns
     * @param usedDiagLeft  the occupied diagonals running to the top left
     * @param usedDiagRight the occupied diagonals running to the top right
     * @return the number of solutions of this sub-tree
     */
    private static int place(int row, int n, boolean[] usedColumn,
                             boolean[] usedDiagLeft, boolean[] usedDiagRight) {
        if (row == n) {
            return 1; // every row has a queen: one solution
        }
        int solutions = 0;
        for (int col = 0; col < n; col++) {
            int left = row + col;
            int right = row - col + n - 1;
            if (usedColumn[col] || usedDiagLeft[left] || usedDiagRight[right]) {
                continue; // the queen would be attacked
            }
            usedColumn[col] = true;
            usedDiagLeft[left] = true;
            usedDiagRight[right] = true;

            solutions += place(row + 1, n, usedColumn, usedDiagLeft, usedDiagRight);

            usedDiagRight[right] = false; // backtrack
            usedDiagLeft[left] = false;
            usedColumn[col] = false;
        }
        return solutions;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(solveNQueens(n));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: N-Queens II
 * LeetCode: 52 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Count how many ways \`n\` queens can be placed on an \`n x n\` board so that no two of them attack each other.
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
 * 2
 * </pre>
 *
 * <p>Approach: The same search as N-Queens, but the leaves are counted instead of collected.
 *
 * <p>Complexity: Time O(n!), Space O(n).
 */
public class Main {

    /**
     * Counts the placements of {@code n} queens that leave no two of them attacking each other.
     *
     * <p>There is one queen per row, so only the column has to be chosen. The occupied columns and the
     * two diagonals are tracked with boolean arrays, which makes the check for every candidate
     * column {@code O(1)}.
     *
     * @param n the size of the board
     * @return the number of solutions
     */
    public static int solveNQueens(int n) {
        return place(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
    }

    /**
     * Tries to place the queen of the current row and counts the completions.
     *
     * @param row           the row that is being filled
     * @param n             the size of the board
     * @param usedColumn    the occupied columns
     * @param usedDiagLeft  the occupied diagonals running to the top left
     * @param usedDiagRight the occupied diagonals running to the top right
     * @return the number of solutions of this sub-tree
     */
    private static int place(int row, int n, boolean[] usedColumn,
                             boolean[] usedDiagLeft, boolean[] usedDiagRight) {
        if (row == n) {
            return 1; // every row has a queen: one solution
        }
        int solutions = 0;
        for (int col = 0; col < n; col++) {
            int left = row + col;
            int right = row - col + n - 1;
            if (usedColumn[col] || usedDiagLeft[left] || usedDiagRight[right]) {
                continue; // the queen would be attacked
            }
            usedColumn[col] = true;
            usedDiagLeft[left] = true;
            usedDiagRight[right] = true;

            solutions += place(row + 1, n, usedColumn, usedDiagLeft, usedDiagRight);

            usedDiagRight[right] = false; // backtrack
            usedDiagLeft[left] = false;
            usedColumn[col] = false;
        }
        return solutions;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(solveNQueens(n));
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
# N-Queens II — LeetCode 52

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Backtracking · Constraint pruning |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

The **N-Queens** puzzle is the problem of placing \`n\` queens on an \`n × n\` chessboard so that no two queens attack each other.

Given an integer \`n\`, return the **number of distinct solutions**.

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
2
\`\`\`

There are exactly **2** ways to place four queens on a 4 × 4 board.

## Approach

This is [N-Queens](./NQueens.java) with a counter instead of a list:

1. One queen per row — the recursion depth is the row, only the column is chosen.
2. A candidate column is rejected when the column itself or one of the two diagonals    (\`row + col\` and \`row - col + n - 1\`) is already occupied.
3. When all \`n\` rows are filled the sub-tree contributes \`1\` to the answer.
4. Backtrack: free the column and the diagonals again.

**The known counts** for \`n = 1 … 9\` are \`1, 0, 0, 2, 10, 4, 40, 92, 352\` — a good way to test the implementation.

## Dry Run

Input: \`n = 4\`. Every row of the search is shown with the columns that are tried; the leaves that are reached are the solutions.

| row | column tried | decision |
|---:|---:|---|
| 0 | 0 | **place** |
| 1 | 0 | reject — column 0 is taken |
| 1 | 1 | reject — diagonal \`1 - 1 + 3 = 3\` is taken |
| 1 | 2 | **place** |
| 2 | 0 | reject — column 0 is taken |
| 2 | 1 | reject — diagonal \`2 + 1 = 3\` is taken |
| 2 | 2 | reject — column 2 is taken |
| 2 | 3 | reject — diagonal \`2 - 3 + 3 = 2\` is taken |
| — | — | **backtrack** from (1, 2) |
| 1 | 3 | **place** |
| 2 | 0 | reject — column 0 is taken |
| 2 | 1 | **place** |
| 3 | 0 | reject — column 0 is taken |
| 3 | 1 | reject — diagonal \`3 + 1 = 4\` is taken |
| 3 | 2 | reject — diagonal \`3 - 2 + 3 = 4\` is taken |
| 3 | 3 | reject — column 3 is taken |
| — | — | **backtrack** from (2, 1) → (1, 3) → (0, 0) |
| 0 | 1 | **place** |
| 1 | 0 | reject — diagonal \`1 + 0 = 1\` is taken |
| 1 | 1 | reject — column 1 is taken |
| 1 | 2 | reject — diagonal \`1 - 2 + 3 = 2\` is taken |
| 1 | 3 | **place** |
| 2 | 0 | **place** |
| 3 | 0 | reject — column 0 is taken |
| 3 | 1 | reject — diagonal \`3 + 1 = 4\` is taken |
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

**Why the search is fast enough.** Every row rejects the columns that are attacked, so the tree is far smaller than \`n!\` — for \`n = 9\` only a few thousand nodes are visited.

## Java Solution

See [\`NQueensII.java\`](./NQueensII.java).

\`\`\`java
    public static int solveNQueens(int n) {
        return place(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n!) | at most every permutation of the columns is tried, which is \`O(n!)\` |
| **Space** | O(n) | the three boolean arrays and the stack are \`O(n)\` |

**Space \`O(n)\`** — no solutions are stored, only the count.

## Interview Notes

**Follow-ups to raise yourself:**

- "Show me the solutions, not just the count."* → see [N-Queens — LeetCode 51](./NQueens.java).
- "Can you do it in \`O(n)\`?"* → the bitmask version: one \`int\` per row with the attacked columns pre-computed.
- "What are the counts for larger boards?"* → \`1, 0, 0, 2, 10, 4, 40, 92, 352\` for \`n = 1 … 9\`.
- "How would you count the solutions for a board with blocked squares?"* → skip the blocked squares in the column loop.

**Common mistakes:**

- ❌ Forgetting to unmark the diagonals in the backtrack — the count would be far too small.
- ❌ Using \`row - col\` directly as the diagonal index — it can be negative, hence \`+ n - 1\`.
- ❌ Counting the rows instead of the leaves — a solution is only a fully filled board.

**How to narrate:**

> "This is the N-Queens search with a counter: one queen per row, and for every row I try the columns that are not attacked, checking the column and the two diagonals with boolean arrays so the check is \`O(1)\`. When the last row is filled the sub-tree contributes one to the count, and after the recursive call I free the column and the diagonals again."

## Related Problems

- [N-Queens — LeetCode 51](./NQueens.java) — the same search, listing the solutions
- [Sudoku Solver — LeetCode 37](./SudokuSolver.java) — the same pruning idea on a grid
`,i=[`solveNQueens`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};