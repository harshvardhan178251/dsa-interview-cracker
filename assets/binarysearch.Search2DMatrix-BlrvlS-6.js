var e=`binarysearch.Search2DMatrix`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Search a 2D Matrix
 * LeetCode: 74 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search over a flattened matrix
 *
 * <p>Problem:
 * Given an {@code m x n} integer matrix where every row is sorted ascending and the first
 * value of a row is greater than the last value of the previous row, search for a
 * {@code target} and return its {@code {row, column}} position, or {@code {-1, -1}} when it
 * is absent.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * m[0][0] m[0][1] ... m[0][n-1] m[1][0] ... m[n-1][m-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4
 * 1 3 5 7 10 11 16 20 23 30 34 60
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1
 * </pre>
 *
 * <p>Approach: because the rows are globally ordered, the matrix behaves like one flat sorted
 * array of {@code rows * cols} elements. Binary search over the flat index and convert back
 * with {@code index / cols} and {@code index % cols}.
 *
 * <p>Complexity: Time O(log(rows * cols)), Space O(1) extra beyond the input matrix.
 */
public class Search2DMatrix {

    /**
     * Searches the sorted matrix for {@code target}.
     *
     * @param matrix the row-major matrix
     * @param target the value to look for
     * @return {@code {row, col}} of the target, or {@code {-1, -1}} when it is absent
     */
    public static int[] searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return new int[]{-1, -1};
        }
        int rows = matrix.length;
        int cols = matrix[0].length;

        int left = 0;
        int right = rows * cols - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int value = matrix[mid / cols][mid % cols];
            if (value == target) {
                return new int[]{mid / cols, mid % cols};
            } else if (value < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return new int[]{-1, -1};
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
        int target = fs.nextInt();

        int[] answer = searchMatrix(matrix, target);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Search a 2D Matrix
 * LeetCode: 74 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search over a flattened matrix
 *
 * <p>Problem:
 * Given an {@code m x n} integer matrix where every row is sorted ascending and the first
 * value of a row is greater than the last value of the previous row, search for a
 * {@code target} and return its {@code {row, column}} position, or {@code {-1, -1}} when it
 * is absent.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * m[0][0] m[0][1] ... m[0][n-1] m[1][0] ... m[n-1][m-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4
 * 1 3 5 7 10 11 16 20 23 30 34 60
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1
 * </pre>
 *
 * <p>Approach: because the rows are globally ordered, the matrix behaves like one flat sorted
 * array of {@code rows * cols} elements. Binary search over the flat index and convert back
 * with {@code index / cols} and {@code index % cols}.
 *
 * <p>Complexity: Time O(log(rows * cols)), Space O(1) extra beyond the input matrix.
 */
public class Main {

    /**
     * Searches the sorted matrix for {@code target}.
     *
     * @param matrix the row-major matrix
     * @param target the value to look for
     * @return {@code {row, col}} of the target, or {@code {-1, -1}} when it is absent
     */
    public static int[] searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return new int[]{-1, -1};
        }
        int rows = matrix.length;
        int cols = matrix[0].length;

        int left = 0;
        int right = rows * cols - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int value = matrix[mid / cols][mid % cols];
            if (value == target) {
                return new int[]{mid / cols, mid % cols};
            } else if (value < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return new int[]{-1, -1};
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
        int target = fs.nextInt();

        int[] answer = searchMatrix(matrix, target);
        System.out.println(answer[0] + " " + answer[1]);
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
# Search a 2D Matrix — LeetCode 74

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Matrix · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an \`m x n\` integer matrix with these properties:

1. Each row is sorted in ascending order.
2. The first integer of each row is **greater** than the last integer of the previous row.

Search for a \`target\` and return its \`{row, column}\` position, or \`[-1, -1]\` when it is
absent.

You must achieve **O(log(m·n))** time.

## Input Format

The program reads from standard input:

\`\`\`
rows
cols
m[0][0] m[0][1] ... m[0][n-1] m[1][0] ... m[n-1][m-1]
target
\`\`\`

- \`rows\` — number of rows \`m\`
- \`cols\` — number of columns \`n\`
- the next \`rows * cols\` integers — the matrix values, in row-major order
- \`target\` — the value to look for

## Sample Input

\`\`\`
3
4
1 3 5 7 10 11 16 20 23 30 34 60
3
\`\`\`

## Expected Output

\`\`\`
0 1
\`\`\`

\`3\` sits at row \`0\`, column \`1\`.

## Approach — Treat the matrix as one flat sorted array

Property 2 is the important one: the rows are not only individually sorted, they are
**globally** ordered. \`1 3 5 7 10 11 16 20 23 30 34 60\` is one sorted sequence that just
happens to be wrapped every \`cols\` elements.

So we binary search a flat index in \`[0, rows*cols)\` and convert back:

\`\`\`
row = index / cols
col = index % cols
\`\`\`

This gives O(log(rows·cols)) — half the comparisons of searching each row separately
(O(rows · log cols)).

**Conversion is exact, not approximate.** \`index / cols\` is the row because every row
contributes exactly \`cols\` elements to the flat order, and \`index % cols\` is the column
because the remainder is the offset inside that row.

## Dry Run

Input: \`matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\`, \`target = 3\`

| Step | left | right | mid | flat index → cell | value | comparison | range after |
|---:|---:|---:|---:|---|---:|---|---|
| 1 | 0 | 11 | 5 | \`5 / 4 = 1\`, \`5 % 4 = 1\` → \`[1][1]\` | 11 | 11 > 3 | \`[0, 4]\` |
| 2 | 0 | 4 | 2 | \`2 / 4 = 0\`, \`2 % 4 = 2\` → \`[0][2]\` | 5 | 5 > 3 | \`[0, 1]\` |
| 3 | 0 | 1 | 0 | \`0 / 4 = 0\`, \`0 % 4 = 0\` → \`[0][0]\` | 1 | 1 < 3 | \`[1, 1]\` |
| 4 | 1 | 1 | 1 | \`1 / 4 = 0\`, \`1 % 4 = 1\` → \`[0][1]\` | 3 | 3 == 3 | **return {0, 1}** |

### The flattened view

| Flat index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cell | \`[0][0]\` | \`[0][1]\` | \`[0][2]\` | \`[0][3]\` | \`[1][0]\` | \`[1][1]\` | \`[1][2]\` | \`[1][3]\` | \`[2][0]\` | \`[2][1]\` | \`[2][2]\` | \`[2][3]\` |
| value | 1 | 3 | 5 | 7 | 10 | 11 | 16 | 20 | 23 | 30 | 34 | 60 |

## Java Solution

See [\`Search2DMatrix.java\`](./Search2DMatrix.java).

\`\`\`java
public static int[] searchMatrix(int[][] matrix, int target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return new int[]{-1, -1};
    }
    int rows = matrix.length;
    int cols = matrix[0].length;

    int left = 0;
    int right = rows * cols - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int value = matrix[mid / cols][mid % cols];
        if (value == target) {
            return new int[]{mid / cols, mid % cols};
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return new int[]{-1, -1};
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log(rows · cols)) | A single binary search over the flattened matrix |
| **Space** | O(1) extra | Beyond the input matrix itself |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the rows are sorted but not globally ordered?"* → then this flattening is invalid;
  use the staircase search, see
  [Search a 2D Matrix II](./Search2DMatrixII.java).
- *"Return every matching position."* → the matrix may contain duplicates; continue the
  search to the left and right of the hit.
- *"Can you do it without flattening?"* → yes: binary search the rows to find the candidate
  row, then binary search inside it — but only because property 2 lets you pick the row
  correctly.
- *"The matrix is enormous and does not fit in memory."* → binary search over the file
  offsets; the same divide-and-conquer idea, with I/O instead of array access.

**Common mistakes:**
- ❌ Assuming the rows are individually sorted is enough → the flattening needs the *global*
  ordering property.
- ❌ Using \`mid / cols\` and \`mid % cols\` on the wrong index (e.g. dividing the mid *value*) →
  nonsense results.
- ❌ Forgetting the empty-matrix guard → \`matrix[0]\` throws on an empty matrix.
- ❌ Returning the flat index instead of \`{row, col}\` → the LeetCode signature wants the
  pair.

**How to narrate:**
> "The second property means the matrix is one globally sorted sequence wrapped into rows, so
> I can binary search a flat index and convert back with division and modulo by the column
> count. That gives O(log(m·n)) — fewer comparisons than searching each row separately —
> and the conversion is exact because every row contributes exactly \`cols\` elements."

## Related Problems

- [Search a 2D Matrix II](./Search2DMatrixII.java) — the version without global ordering
- [Binary Search](./BinarySearch.java) — the flat-array version of the same search
- [Peak Element](./PeakElement.java) — binary search on a local extremum
`,i=[`searchMatrix`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};