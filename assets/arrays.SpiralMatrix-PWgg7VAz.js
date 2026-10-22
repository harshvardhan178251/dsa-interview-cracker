var e=`arrays.SpiralMatrix`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Spiral Matrix
 * LeetCode: 54 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Boundary shrinking, Simulation
 *
 * <p>Problem:
 * Given an {@code m x n} matrix, return all of its elements in spiral order — the
 * top row left to right, then the right column top to bottom, then the bottom row right
 * to left, then the left column bottom to top, and so on.
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
 * 1 2 3 6 9 8 7 4 5
 * </pre>
 *
 * <p>Approach: four boundaries — {@code top}, {@code bottom}, {@code left}, {@code right} —
 * shrink after every edge is consumed. The two extra guards before reading the bottom row
 * and the left column prevent double printing when only a single row or column is left.
 *
 * <p>Complexity: Time O(rows * cols), Space O(1) besides the output list.
 */
public class SpiralMatrix {

    /**
     * Returns the matrix elements in spiral order.
     *
     * @param matrix the input matrix
     * @return the elements in spiral order
     */
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return result;
        }
        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) {       // top row, left to right
                result.add(matrix[top][c]);
            }
            top++;

            for (int r = top; r <= bottom; r++) {       // right column, top to bottom
                result.add(matrix[r][right]);
            }
            right--;

            if (top <= bottom) {                        // bottom row, right to left
                for (int c = right; c >= left; c--) {
                    result.add(matrix[bottom][c]);
                }
                bottom--;
            }

            if (left <= right) {                        // left column, bottom to top
                for (int r = bottom; r >= top; r--) {
                    result.add(matrix[r][left]);
                }
                left++;
            }
        }
        return result;
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

        List<Integer> order = spiralOrder(matrix);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < order.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(order.get(i));
        }
        System.out.println(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Spiral Matrix
 * LeetCode: 54 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Boundary shrinking, Simulation
 *
 * <p>Problem:
 * Given an {@code m x n} matrix, return all of its elements in spiral order — the
 * top row left to right, then the right column top to bottom, then the bottom row right
 * to left, then the left column bottom to top, and so on.
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
 * 1 2 3 6 9 8 7 4 5
 * </pre>
 *
 * <p>Approach: four boundaries — {@code top}, {@code bottom}, {@code left}, {@code right} —
 * shrink after every edge is consumed. The two extra guards before reading the bottom row
 * and the left column prevent double printing when only a single row or column is left.
 *
 * <p>Complexity: Time O(rows * cols), Space O(1) besides the output list.
 */
public class Main {

    /**
     * Returns the matrix elements in spiral order.
     *
     * @param matrix the input matrix
     * @return the elements in spiral order
     */
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return result;
        }
        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) {       // top row, left to right
                result.add(matrix[top][c]);
            }
            top++;

            for (int r = top; r <= bottom; r++) {       // right column, top to bottom
                result.add(matrix[r][right]);
            }
            right--;

            if (top <= bottom) {                        // bottom row, right to left
                for (int c = right; c >= left; c--) {
                    result.add(matrix[bottom][c]);
                }
                bottom--;
            }

            if (left <= right) {                        // left column, bottom to top
                for (int r = bottom; r >= top; r--) {
                    result.add(matrix[r][left]);
                }
                left++;
            }
        }
        return result;
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

        List<Integer> order = spiralOrder(matrix);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < order.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(order.get(i));
        }
        System.out.println(out);
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
# Spiral Matrix — LeetCode 54

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Boundary shrinking · Simulation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg, Adobe |

## Problem Statement

Given an \`m x n\` matrix, return all of its elements in **spiral order**:

1. The top row, left to right.
2. The right column, top to bottom.
3. The bottom row, right to left.
4. The left column, bottom to top.
5. Repeat inward until nothing is left.

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
1 2 3 6 9 8 7 4 5
\`\`\`

## Approach — Four Shrinking Boundaries

Instead of tracking a "direction" and turning corners (which is bug-prone), keep four
boundaries of the still-unvisited rectangle:

- \`top\` — first unvisited row
- \`bottom\` — last unvisited row
- \`left\` — first unvisited column
- \`right\` — last unvisited column

Each round reads one edge and shrinks the corresponding boundary:

| Edge | Direction | Boundary moved |
|---|---|---|
| top row | left → right | \`top++\` |
| right column | top → bottom | \`right--\` |
| bottom row | right → left | \`bottom--\` |
| left column | bottom → top | \`left++\` |

**The two guards** are what make it correct on thin matrices:

- Before reading the **bottom row**, check \`top <= bottom\` — otherwise the last row was
  already consumed by the top row and you would print it twice.
- Before reading the **left column**, check \`left <= right\` — otherwise the last column
  was already consumed by the right column.

The loop ends when \`top > bottom\` or \`left > right\`.

## Dry Run

Input:

\`\`\`
1 2 3
4 5 6
7 8 9
\`\`\`

Start: \`top = 0\`, \`bottom = 2\`, \`left = 0\`, \`right = 2\`

| Step | Edge | Values added | Boundary change | \`top\` | \`bottom\` | \`left\` | \`right\` | result so far |
|---:|---|---|---|---:|---:|---:|---:|---|
| 1 | top row ← | 1, 2, 3 | \`top++\` | 1 | 2 | 0 | 2 | \`1 2 3\` |
| 2 | right col ↓ | 6, 9 | \`right--\` | 1 | 2 | 0 | 1 | \`1 2 3 6 9\` |
| 3 | bottom row ← | 8, 7 | \`bottom--\` | 1 | 1 | 0 | 1 | \`1 2 3 6 9 8 7\` |
| 4 | left col ↑ | 4 | \`left++\` | 1 | 1 | 1 | 1 | \`1 2 3 6 9 8 7 4\` |
| 5 | top row ← (the centre) | 5 | \`top++\` | 2 | 1 | 1 | 1 | \`1 2 3 6 9 8 7 4 5\` |
| 6 | right col ↓ | — (rows 2..1 is empty) | \`right--\` | 2 | 1 | 1 | 0 | unchanged |
| 7 | bottom row ← | skipped: \`top(2) > bottom(1)\` | — | 2 | 1 | 1 | 0 | unchanged |
| 8 | left col ↑ | skipped: \`left(1) > right(0)\` | — | 2 | 1 | 1 | 0 | unchanged |

The loop condition \`top <= bottom && left <= right\` is now false → stop.

Answer: **1 2 3 6 9 8 7 4 5**

## Java Solution

See [\`SpiralMatrix.java\`](./SpiralMatrix.java).

\`\`\`java
public static List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return result;
    }
    int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) { result.add(matrix[top][c]); }
        top++;
        for (int r = top; r <= bottom; r++) { result.add(matrix[r][right]); }
        right--;
        if (top <= bottom) {
            for (int c = right; c >= left; c--) { result.add(matrix[bottom][c]); }
            bottom--;
        }
        if (left <= right) {
            for (int r = bottom; r >= top; r--) { result.add(matrix[r][left]); }
            left++;
        }
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols) | Every cell is visited exactly once |
| **Space** | O(1) extra | Only four boundaries; the O(rows · cols) result list is the answer itself |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the spiral of a matrix with a hole / obstacles."* → add a visited array and
  skip visited cells; that is the classic spiral-traverse-a-maze problem.
- *"What if the matrix is sparse?"* → the same code works, but you would iterate over
  non-zero cells only.
- *"Can you do it without a direction flag?"* → yes, that is the boundary approach; the
  direction-flag version needs careful turn logic.
- *"What if you need the spiral of a rectangle, not a square?"* → the code already
  handles \`rows != cols\`; the guards exist precisely for that case.
- *"How would you generate a spiral matrix (the inverse problem)?"* → fill the same
  boundary rectangle in the same order.

**Common mistakes:**
- ❌ Omitting the \`if (top <= bottom)\` guard before the bottom row — a 1-row matrix
  prints its last row twice.
- ❌ Omitting the \`if (left <= right)\` guard before the left column — a 1-column matrix
  prints its last column twice.
- ❌ Shrinking the wrong boundary (\`bottom--\` before reading the bottom row) — the
  elements are lost.
- ❌ Assuming the matrix is square — \`rows\` and \`cols\` are independent.

**How to narrate:**
> "I keep four boundaries around the unvisited rectangle. Each round reads one edge and
> shrinks the corresponding boundary. The two subtle parts are the guards: I only read
> the bottom row if there is still a row left, and only read the left column if there is
> still a column left. Without them a single-row or single-column matrix would print
> elements twice. Every cell is visited exactly once, so it's O(rows · cols) with O(1)
> extra space."

## Related Problems

- [Rotate Image](RotateImage.md) — matrix transformation in place
- [Set Matrix Zeroes](SetMatrixZeroes.md) — boundary-free matrix rewriting
- [Spiral Matrix II](../../../../../../docs/topics/12-prefixsum.md) — the "generate it" variant
`,i=[`spiralOrder`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};