var e=`arrays.SetMatrixZeroes`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Set Matrix Zeroes
 * LeetCode: 73 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Marker rows and columns, Two-phase scan
 *
 * <p>Problem:
 * Given an {@code m x n} matrix, if an element is 0, set its entire row and column to 0.
 * Do it in place and print the result.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * matrix values in row-major order (rows * cols numbers)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4
 * 1 1 1 1 1 0 1 1 1 1 1 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 0 1 1
 * 0 0 0 0
 * 1 0 1 1
 * </pre>
 *
 * <p>Approach: a first pass records which rows and which columns contain a zero, without
 * changing the matrix. A second pass zeroes every cell whose row or column was marked.
 * Splitting the work this way avoids the trap of zeroing cells during the first pass and
 * then treating those fresh zeros as original ones.
 *
 * <p>Complexity: Time O(rows * cols), Space O(rows + cols).
 */
public class SetMatrixZeroes {

    /**
     * Applies the "set the whole row and column to zero" rule in place.
     *
     * @param matrix the matrix to transform
     * @return the same (mutated) matrix
     */
    public static int[][] setZeroes(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        boolean[] zeroRows = new boolean[rows];
        boolean[] zeroCols = new boolean[cols];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (matrix[r][c] == 0) {
                    zeroRows[r] = true;
                    zeroCols[c] = true;
                }
            }
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (zeroRows[r] || zeroCols[c]) {
                    matrix[r][c] = 0;
                }
            }
        }
        return matrix;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        int[][] matrix = new int[rows][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                matrix[r][c] = fs.nextInt();
            }
        }

        int[][] result = setZeroes(matrix);
        StringBuilder out = new StringBuilder();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (c > 0) {
                    out.append(' ');
                }
                out.append(result[r][c]);
            }
            out.append('\\n');
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
 * Problem: Set Matrix Zeroes
 * LeetCode: 73 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Marker rows and columns, Two-phase scan
 *
 * <p>Problem:
 * Given an {@code m x n} matrix, if an element is 0, set its entire row and column to 0.
 * Do it in place and print the result.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * matrix values in row-major order (rows * cols numbers)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4
 * 1 1 1 1 1 0 1 1 1 1 1 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 0 1 1
 * 0 0 0 0
 * 1 0 1 1
 * </pre>
 *
 * <p>Approach: a first pass records which rows and which columns contain a zero, without
 * changing the matrix. A second pass zeroes every cell whose row or column was marked.
 * Splitting the work this way avoids the trap of zeroing cells during the first pass and
 * then treating those fresh zeros as original ones.
 *
 * <p>Complexity: Time O(rows * cols), Space O(rows + cols).
 */
public class Main {

    /**
     * Applies the "set the whole row and column to zero" rule in place.
     *
     * @param matrix the matrix to transform
     * @return the same (mutated) matrix
     */
    public static int[][] setZeroes(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        boolean[] zeroRows = new boolean[rows];
        boolean[] zeroCols = new boolean[cols];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (matrix[r][c] == 0) {
                    zeroRows[r] = true;
                    zeroCols[c] = true;
                }
            }
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (zeroRows[r] || zeroCols[c]) {
                    matrix[r][c] = 0;
                }
            }
        }
        return matrix;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        int[][] matrix = new int[rows][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                matrix[r][c] = fs.nextInt();
            }
        }

        int[][] result = setZeroes(matrix);
        StringBuilder out = new StringBuilder();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (c > 0) {
                    out.append(' ');
                }
                out.append(result[r][c]);
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
# Set Matrix Zeroes — LeetCode 73

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Marker rows and columns · Two-phase scan |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Given an \`m x n\` matrix, if an element is \`0\`, set its **entire row** and **entire
column** to \`0\`. Do it **in place** and print the result.

## Input Format

\`\`\`
rows
cols
matrix values in row-major order (rows * cols numbers)
\`\`\`

- \`rows\` — number of rows
- \`cols\` — number of columns
- then \`rows * cols\` integers, read left to right, top to bottom

## Sample Input

\`\`\`
3
4
1 1 1 1 1 0 1 1 1 1 1 1
\`\`\`

## Expected Output

\`\`\`
1 0 1 1
0 0 0 0
1 0 1 1
\`\`\`

The \`0\` at row 1, column 1 clears row 1 and column 1.

## Approach — Mark, then Apply

The naive version zeroes cells as soon as it sees a \`0\`. That is **wrong**: the zeros it
writes are then read as *original* zeros and cascade across the whole matrix.

The fix is to split the work into two phases:

1. **Mark.** Scan the matrix and record *which rows* and *which columns* contain an
   original zero. The matrix is not modified in this phase.
2. **Apply.** For every cell, if its row or its column was marked, write \`0\`.

Two boolean arrays (\`zeroRows\`, \`zeroCols\`) carry the information from phase 1 to
phase 2.

**Why it is correct:** the set of cells that must become zero is exactly
\`{ (r, c) : row r is marked or column c is marked }\`. Because the marking is done on
the *original* matrix, no cell is ever zeroed because of a zero we ourselves wrote.

## Dry Run

Input:

\`\`\`
1 1 1 1
1 0 1 1
1 1 1 1
\`\`\`

### Phase 1 — mark rows and columns that contain a zero

| Step | (r, c) | \`matrix[r][c]\` | is 0? | \`zeroRows\` after | \`zeroCols\` after |
|---:|---|---:|---|---|---|
| 1 | (0, 0) | 1 | no | \`[false, false, false]\` | \`[false, false, false, false]\` |
| 2 | (0, 1) | 1 | no | \`[false, false, false]\` | \`[false, false, false, false]\` |
| 3 | (0, 2) | 1 | no | \`[false, false, false]\` | \`[false, false, false, false]\` |
| 4 | (0, 3) | 1 | no | \`[false, false, false]\` | \`[false, false, false, false]\` |
| 5 | (1, 0) | 1 | no | \`[false, false, false]\` | \`[false, false, false, false]\` |
| 6 | (1, 1) | **0** | **yes** | \`[false, **true**, false]\` | \`[false, **true**, false, false]\` |
| 7 | (1, 2) | 1 | no | \`[false, true, false]\` | \`[false, true, false, false]\` |
| 8 | (1, 3) | 1 | no | \`[false, true, false]\` | \`[false, true, false, false]\` |
| 9 | (2, 0) | 1 | no | \`[false, true, false]\` | \`[false, true, false, false]\` |
| 10 | (2, 1) | 1 | no | \`[false, true, false]\` | \`[false, true, false, false]\` |
| 11 | (2, 2) | 1 | no | \`[false, true, false]\` | \`[false, true, false, false]\` |
| 12 | (2, 3) | 1 | no | \`[false, true, false]\` | \`[false, true, false, false]\` |

Marked: row \`1\`, column \`1\`.

### Phase 2 — write the zeros

| Cell | row marked? | col marked? | value before | value after |
|---|---|---|---:|---:|
| (0, 0) | no | no | 1 | 1 |
| (0, 1) | no | **yes** | 1 | **0** |
| (0, 2) | no | no | 1 | 1 |
| (0, 3) | no | no | 1 | 1 |
| (1, 0) | **yes** | no | 1 | **0** |
| (1, 1) | **yes** | **yes** | 0 | 0 |
| (1, 2) | **yes** | no | 1 | **0** |
| (1, 3) | **yes** | no | 1 | **0** |
| (2, 0) | no | no | 1 | 1 |
| (2, 1) | no | **yes** | 1 | **0** |
| (2, 2) | no | no | 1 | 1 |
| (2, 3) | no | no | 1 | 1 |

Result:

\`\`\`
1 0 1 1
0 0 0 0
1 0 1 1
\`\`\`

## Java Solution

See [\`SetMatrixZeroes.java\`](./SetMatrixZeroes.java).

\`\`\`java
public static int[][] setZeroes(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;
    boolean[] zeroRows = new boolean[rows];
    boolean[] zeroCols = new boolean[cols];

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (matrix[r][c] == 0) {
                zeroRows[r] = true;
                zeroCols[c] = true;
            }
        }
    }

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (zeroRows[r] || zeroCols[c]) {
                matrix[r][c] = 0;
            }
        }
    }
    return matrix;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols) | Two passes over the matrix |
| **Space** | O(rows + cols) | Two boolean marker arrays |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with O(1) extra space?"* → yes: use the **first row and first column**
  as the marker arrays, and remember their own flags in two booleans.
- *"What if the matrix must not be modified?"* → return a copy; the algorithm is the
  same, only the target changes.
- *"How does the O(1) variant work?"* → scan and mark the first row / first column,
  then use them while processing the inner cells, and finally zero the first row/column
  according to their own flags.
- *"What if zeros appear only in the first row?"* → the flag for that row must be
  captured before the first row is cleared.

**Common mistakes:**
- ❌ Zeroing cells **during** the first pass — the freshly written zeros are then treated
  as original zeros and the whole matrix collapses to zeros. This is the classic bug.
- ❌ Forgetting to mark the row *and* the column of the zero.
- ❌ Clearing the first row/column in the O(1) variant without protecting their own
  original content.
- ❌ Assuming the matrix is square — \`rows\` and \`cols\` are independent.

**How to narrate:**
> "The trap here is zeroing as you scan, because then the zeros you write cascade. So I
> split it: first pass only records which rows and which columns contain an original
> zero, without touching the matrix; second pass writes the zeros using those flags.
> That's two O(rows·cols) passes and O(rows + cols) extra space. If the interviewer wants
> O(1) space, I can store the flags in the first row and first column instead."

## Related Problems

- [Rotate Image](RotateImage.md) — in-place matrix transformation
- [Spiral Matrix](SpiralMatrix.md) — matrix traversal
- [2D Prefix Sum](../../../../../../docs/topics/12-prefixsum.md) — the same matrix indexing with sums
`,i=[`setZeroes`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};