var e=`arrays.RotateImage`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Rotate Image
 * LeetCode: 48 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Matrix transposition, In-place transformation
 *
 * <p>Problem:
 * You are given an {@code n x n} square matrix. Rotate it 90 degrees clockwise
 * <em>in place</em> and print the result.
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
 * 3
 * 1 2 3 4 5 6 7 8 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7 4 1
 * 8 5 2
 * 9 6 3
 * </pre>
 *
 * <p>Approach: a 90-degree clockwise rotation equals a transpose followed by a mirror of
 * every row. Transposing swaps {@code (i, j)} with {@code (j, i)} — only the upper
 * triangle is visited so every pair is swapped exactly once. The mirror then reverses
 * each row, which turns the transpose into the clockwise rotation.
 *
 * <p>Complexity: Time O(n^2), Space O(1).
 */
public class RotateImage {

    /**
     * Rotates the square matrix 90 degrees clockwise in place.
     *
     * @param matrix the square matrix
     * @return the same (mutated) matrix
     */
    public static int[][] rotate(int[][] matrix) {
        int n = matrix.length;
        // 1) transpose: matrix[i][j] <-> matrix[j][i] for the upper triangle only
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // 2) mirror every row horizontally
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
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

        int[][] rotated = rotate(matrix);
        StringBuilder out = new StringBuilder();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (c > 0) {
                    out.append(' ');
                }
                out.append(rotated[r][c]);
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
 * Problem: Rotate Image
 * LeetCode: 48 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Matrix transposition, In-place transformation
 *
 * <p>Problem:
 * You are given an {@code n x n} square matrix. Rotate it 90 degrees clockwise
 * <em>in place</em> and print the result.
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
 * 3
 * 1 2 3 4 5 6 7 8 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7 4 1
 * 8 5 2
 * 9 6 3
 * </pre>
 *
 * <p>Approach: a 90-degree clockwise rotation equals a transpose followed by a mirror of
 * every row. Transposing swaps {@code (i, j)} with {@code (j, i)} — only the upper
 * triangle is visited so every pair is swapped exactly once. The mirror then reverses
 * each row, which turns the transpose into the clockwise rotation.
 *
 * <p>Complexity: Time O(n^2), Space O(1).
 */
public class Main {

    /**
     * Rotates the square matrix 90 degrees clockwise in place.
     *
     * @param matrix the square matrix
     * @return the same (mutated) matrix
     */
    public static int[][] rotate(int[][] matrix) {
        int n = matrix.length;
        // 1) transpose: matrix[i][j] <-> matrix[j][i] for the upper triangle only
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // 2) mirror every row horizontally
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
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

        int[][] rotated = rotate(matrix);
        StringBuilder out = new StringBuilder();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (c > 0) {
                    out.append(' ');
                }
                out.append(rotated[r][c]);
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
# Rotate Image — LeetCode 48

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Matrix transposition · In-place transformation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

You are given an \`n x n\` square matrix. Rotate it **90 degrees clockwise in place** and
print the result.

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
3
1 2 3 4 5 6 7 8 9
\`\`\`

## Expected Output

\`\`\`
7 4 1
8 5 2
9 6 3
\`\`\`

## Approach — Transpose, then Mirror

A 90° clockwise rotation is the composition of two operations that are each trivially
in-place:

1. **Transpose** — swap \`matrix[i][j]\` with \`matrix[j][i]\`. This flips the matrix over
   its main diagonal and turns a clockwise rotation into a *horizontal* mirror.
2. **Mirror each row** — reverse every row. The result is the clockwise rotation.

Only the **upper triangle** (\`j > i\`) is visited during the transpose, so each pair is
swapped exactly once — visiting the whole matrix would swap every pair twice and leave
the matrix unchanged.

**Why it works:** element \`(i, j)\` must end up at \`(j, n-1-i)\`. After the transpose it
sits at \`(j, i)\`; reversing row \`j\` moves it to \`(j, n-1-i)\`. Exactly the target.

## Dry Run

Input: \`matrix = [[1,2,3],[4,5,6],[7,8,9]]\`

### Step 1 — transpose (swap \`matrix[i][j]\` ↔ \`matrix[j][i]\`, \`j > i\`)

| Swap | \`(i, j)\` | value before | value at \`(j, i)\` | matrix after |
|---|---|---:|---:|---|
| 1 | (0, 1) | 2 | 4 | \`[[1,4,3],[2,5,6],[7,8,9]]\` |
| 2 | (0, 2) | 3 | 7 | \`[[1,4,7],[2,5,6],[3,8,9]]\` |
| 3 | (1, 2) | 6 | 8 | \`[[1,4,7],[2,5,8],[3,6,9]]\` |

### Step 2 — mirror every row (reverse the elements of each row)

| Row | before | after |
|---|---|---|
| 0 | \`[1, 4, 7]\` | \`[7, 4, 1]\` |
| 1 | \`[2, 5, 8]\` | \`[8, 5, 2]\` |
| 2 | \`[3, 6, 9]\` | \`[9, 6, 3]\` |

Answer:

\`\`\`
7 4 1
8 5 2
9 6 3
\`\`\`

## Java Solution

See [\`RotateImage.java\`](./RotateImage.java).

\`\`\`java
public static int[][] rotate(int[][] matrix) {
    int n = matrix.length;
    // 1) transpose
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    // 2) mirror every row
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n / 2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
    }
    return matrix;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | Every cell is touched a constant number of times |
| **Space** | O(1) | Only a handful of scalars; the matrix is rotated in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Rotate counter-clockwise instead."* → transpose, then mirror the **columns**
  (reverse the column order) — or mirror first and transpose second.
- *"Rotate 180°."* → reverse every row and reverse the order of the rows.
- *"What if the matrix is not square?"* → the transpose + mirror trick still rotates a
  rectangular matrix correctly (the result is \`cols x rows\`); the row-mirror step must
  use the *row's* length, not \`n\`.
- *"Can you do it with one pass?"* → yes — the cycle decomposition: for each cell compute
  its destination and follow the 4-cycle, moving each value into place.
- *"How do you detect a rotated image?"* → compare each element with its neighbour
  clockwise; for a square matrix rotated by 90° the rotation is a permutation of four
  4-cycles.

**Common mistakes:**
- ❌ Looping \`j\` from \`0\` in the transpose — that swaps each pair **twice** and the
  matrix comes out unchanged.
- ❌ Using \`n\` (the matrix size) as the row length when the matrix is rectangular.
- ❌ Mirroring the columns instead of the rows after the transpose (that gives a
  counter-clockwise rotation).
- ❌ Allocating a new matrix — the problem explicitly asks for an **in-place** rotation.

**How to narrate:**
> "A 90° clockwise rotation is a transpose followed by a horizontal mirror. I transpose
> in place by only visiting the upper triangle — that's the part people get wrong,
> because the full double loop cancels itself out. Then I reverse each row. Both steps
> are in place, so the whole thing is O(n²) time and O(1) extra space."

## Related Problems

- [Rotate Array](RotateArray.md) — the 1D counterpart
- [Spiral Matrix](SpiralMatrix.md) — reads a rotated matrix in spiral order
- [Set Matrix Zeroes](SetMatrixZeroes.md) — in-place matrix rewriting
`,i=[`rotate`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};