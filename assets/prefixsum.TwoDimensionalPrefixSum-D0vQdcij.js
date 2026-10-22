var e=`prefixsum.TwoDimensionalPrefixSum`,t=`package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

/**
 * Problem: 2D Prefix Sum
 * LeetCode: null | Difficulty: Medium | Frequency: 2/5
 * Pattern: 2D prefix sums, Inclusion-exclusion
 *
 * <p>Problem:
 * Given a fixed {@code rows x cols} matrix, answer {@code q} rectangle-sum queries.
 * A query {@code (r1, c1, r2, c2)} asks for the sum of the rectangle whose top-left
 * corner is {@code (r1, c1)} and bottom-right corner is {@code (r2, c2)}, both inclusive.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * matrix values in row-major order (rows * cols numbers)
 * q
 * r1 c1 r2 c2
 * r1 c1 r2 c2
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 3
 * 1 2 3 4 5 6
 * 2
 * 0 0 0 1
 * 1 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 11
 * </pre>
 *
 * <p>Approach: {@code prefix[r][c]} stores the sum of the rectangle {@code (0,0)..(r-1,c-1)}.
 * It is built with the classic recurrence
 * {@code prefix[r][c] = value + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1]}.
 * A query then uses inclusion-exclusion: take the big rectangle up to {@code (r2,c2)},
 * subtract the strips above and to the left, and add back the double-subtracted corner.
 *
 * <p>Complexity: Preprocessing O(rows * cols), each query O(1), Space O(rows * cols).
 */
public class TwoDimensionalPrefixSum {

    /**
     * Builds the 2D prefix-sum table.
     *
     * @param matrix the input matrix
     * @return a table of size {@code (rows + 1) x (cols + 1)}
     */
    public static int[][] buildPrefix(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        int[][] prefix = new int[rows + 1][cols + 1];
        for (int r = 1; r <= rows; r++) {
            for (int c = 1; c <= cols; c++) {
                prefix[r][c] = matrix[r - 1][c - 1]
                        + prefix[r - 1][c]
                        + prefix[r][c - 1]
                        - prefix[r - 1][c - 1];
            }
        }
        return prefix;
    }

    /**
     * Returns the sum of the rectangle {@code (r1,c1)..(r2,c2)}, both corners inclusive.
     *
     * @param prefix the table produced by {@link #buildPrefix(int[][])}
     * @param r1     top row of the rectangle
     * @param c1     left column of the rectangle
     * @param r2     bottom row of the rectangle
     * @param c2     right column of the rectangle
     * @return the rectangle sum
     */
    public static int rectangleSum(int[][] prefix, int r1, int c1, int r2, int c2) {
        return prefix[r2 + 1][c2 + 1]
                - prefix[r1][c2 + 1]
                - prefix[r2 + 1][c1]
                + prefix[r1][c1];
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
        int q = fs.nextInt();

        int[][] prefix = buildPrefix(matrix);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < q; i++) {
            int r1 = fs.nextInt();
            int c1 = fs.nextInt();
            int r2 = fs.nextInt();
            int c2 = fs.nextInt();
            if (i > 0) {
                out.append('\\n');
            }
            out.append(rectangleSum(prefix, r1, c1, r2, c2));
        }
        System.out.println(out);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: 2D Prefix Sum
 * LeetCode: null | Difficulty: Medium | Frequency: 2/5
 * Pattern: 2D prefix sums, Inclusion-exclusion
 *
 * <p>Problem:
 * Given a fixed {@code rows x cols} matrix, answer {@code q} rectangle-sum queries.
 * A query {@code (r1, c1, r2, c2)} asks for the sum of the rectangle whose top-left
 * corner is {@code (r1, c1)} and bottom-right corner is {@code (r2, c2)}, both inclusive.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * matrix values in row-major order (rows * cols numbers)
 * q
 * r1 c1 r2 c2
 * r1 c1 r2 c2
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 3
 * 1 2 3 4 5 6
 * 2
 * 0 0 0 1
 * 1 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 11
 * </pre>
 *
 * <p>Approach: {@code prefix[r][c]} stores the sum of the rectangle {@code (0,0)..(r-1,c-1)}.
 * It is built with the classic recurrence
 * {@code prefix[r][c] = value + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1]}.
 * A query then uses inclusion-exclusion: take the big rectangle up to {@code (r2,c2)},
 * subtract the strips above and to the left, and add back the double-subtracted corner.
 *
 * <p>Complexity: Preprocessing O(rows * cols), each query O(1), Space O(rows * cols).
 */
public class Main {

    /**
     * Builds the 2D prefix-sum table.
     *
     * @param matrix the input matrix
     * @return a table of size {@code (rows + 1) x (cols + 1)}
     */
    public static int[][] buildPrefix(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        int[][] prefix = new int[rows + 1][cols + 1];
        for (int r = 1; r <= rows; r++) {
            for (int c = 1; c <= cols; c++) {
                prefix[r][c] = matrix[r - 1][c - 1]
                        + prefix[r - 1][c]
                        + prefix[r][c - 1]
                        - prefix[r - 1][c - 1];
            }
        }
        return prefix;
    }

    /**
     * Returns the sum of the rectangle {@code (r1,c1)..(r2,c2)}, both corners inclusive.
     *
     * @param prefix the table produced by {@link #buildPrefix(int[][])}
     * @param r1     top row of the rectangle
     * @param c1     left column of the rectangle
     * @param r2     bottom row of the rectangle
     * @param c2     right column of the rectangle
     * @return the rectangle sum
     */
    public static int rectangleSum(int[][] prefix, int r1, int c1, int r2, int c2) {
        return prefix[r2 + 1][c2 + 1]
                - prefix[r1][c2 + 1]
                - prefix[r2 + 1][c1]
                + prefix[r1][c1];
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
        int q = fs.nextInt();

        int[][] prefix = buildPrefix(matrix);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < q; i++) {
            int r1 = fs.nextInt();
            int c1 = fs.nextInt();
            int r2 = fs.nextInt();
            int c2 = fs.nextInt();
            if (i > 0) {
                out.append('\\n');
            }
            out.append(rectangleSum(prefix, r1, c1, r2, c2));
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
# 2D Prefix Sum

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | 2D prefix sums · Inclusion-exclusion |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given a fixed \`rows x cols\` matrix, answer \`q\` **rectangle-sum** queries.

A query \`(r1, c1, r2, c2)\` asks for the sum of the rectangle whose top-left corner is
\`(r1, c1)\` and bottom-right corner is \`(r2, c2)\`, **both corners inclusive**.

This is the 2D generalisation of
[Range Sum Query — Immutable](RangeSumQuery.md) and the standard building block behind
"sum of a sub-matrix" problems.

## Input Format

\`\`\`
rows
cols
matrix values in row-major order (rows * cols numbers)
q
r1 c1 r2 c2
r1 c1 r2 c2
...
\`\`\`

- \`rows\` — number of rows
- \`cols\` — number of columns
- then \`rows * cols\` integers, read left to right, top to bottom
- \`q\` — number of queries
- then \`q\` lines, each with the inclusive rectangle corners

## Sample Input

\`\`\`
2
3
1 2 3 4 5 6
2
0 0 0 1
1 1 1 2
\`\`\`

## Expected Output

\`\`\`
3
11
\`\`\`

- Query 1: the rectangle covering row 0, columns 0–1 → \`1 + 2\` = **3**
- Query 2: the rectangle covering row 1, columns 1–2 → \`5 + 6\` = **11**

## Approach — Padded Table + Inclusion-Exclusion

### Building the table

\`prefix[r][c]\` holds the sum of the rectangle \`(0, 0) .. (r-1, c-1)\` — the region
**above and to the left** of \`(r, c)\`. The table is padded with a zero row and a zero
column so that index arithmetic never goes negative.

The recurrence is the classic one:

\`\`\`
prefix[r][c] = matrix[r-1][c-1] + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1]
\`\`\`

It adds the rectangle above, the rectangle to the left, and the current cell, and
subtracts the top-left region that was counted **twice**.

### Answering a query

The rectangle \`(r1, c1) .. (r2, c2)\` is obtained by inclusion-exclusion:

\`\`\`
sum = prefix[r2+1][c2+1]      // everything up to (r2, c2)
    - prefix[r1][c2+1]        // minus the rows above r1
    - prefix[r2+1][c1]        // minus the columns left of c1
    + prefix[r1][c1]          // plus back the corner that was subtracted twice
\`\`\`

The last \`+\` is what makes the arithmetic correct: the top-left region was removed by
both subtractions, so it has to be added back once.

## Dry Run

Input:

\`\`\`
1 2 3
4 5 6
\`\`\`

### Step 1 — build the padded prefix table (3 x 4)

| \`prefix[r][c]\` | c=0 | c=1 | c=2 | c=3 |
|---|---:|---:|---:|---:|
| **r=0** | 0 | 0 | 0 | 0 |
| **r=1** | 0 | 1 | 3 | 6 |
| **r=2** | 0 | 5 | 12 | 21 |

Cell by cell:

| Step | (r, c) | \`matrix[r-1][c-1]\` | \`prefix[r-1][c]\` | \`prefix[r][c-1]\` | \`prefix[r-1][c-1]\` | \`prefix[r][c]\` |
|---:|---|---:|---:|---:|---:|---:|
| 1 | (1, 1) | 1 | 0 | 0 | 0 | 1 + 0 + 0 − 0 = **1** |
| 2 | (1, 2) | 2 | 0 | 1 | 0 | 2 + 0 + 1 − 0 = **3** |
| 3 | (1, 3) | 3 | 0 | 3 | 0 | 3 + 0 + 3 − 0 = **6** |
| 4 | (2, 1) | 4 | 1 | 0 | 0 | 4 + 1 + 0 − 0 = **5** |
| 5 | (2, 2) | 5 | 3 | 5 | 1 | 5 + 3 + 5 − 1 = **12** |
| 6 | (2, 3) | 6 | 6 | 12 | 3 | 6 + 6 + 12 − 3 = **21** |

### Step 2 — answer the queries

Query 1 — rectangle \`(0, 0) .. (0, 1)\`:

| Term | Table entry | Value |
|---|---|---:|
| \`prefix[r2+1][c2+1]\` | \`prefix[1][2]\` | 3 |
| \`− prefix[r1][c2+1]\` | \`− prefix[0][2]\` | −0 |
| \`− prefix[r2+1][c1]\` | \`− prefix[1][0]\` | −0 |
| \`+ prefix[r1][c1]\` | \`+ prefix[0][0]\` | +0 |

Result: \`3 − 0 − 0 + 0\` = **3** (\`1 + 2\`)

Query 2 — rectangle \`(1, 1) .. (1, 2)\`:

| Term | Table entry | Value |
|---|---|---:|
| \`prefix[r2+1][c2+1]\` | \`prefix[2][3]\` | 21 |
| \`− prefix[r1][c2+1]\` | \`− prefix[1][3]\` | −6 |
| \`− prefix[r2+1][c1]\` | \`− prefix[2][1]\` | −5 |
| \`+ prefix[r1][c1]\` | \`+ prefix[1][1]\` | +1 |

Result: \`21 − 6 − 5 + 1\` = **11** (\`5 + 6\`) ✓

Answers: **3, 11**

## Java Solution

See [\`TwoDimensionalPrefixSum.java\`](./TwoDimensionalPrefixSum.java).

\`\`\`java
public static int[][] buildPrefix(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;
    int[][] prefix = new int[rows + 1][cols + 1];
    for (int r = 1; r <= rows; r++) {
        for (int c = 1; c <= cols; c++) {
            prefix[r][c] = matrix[r - 1][c - 1]
                    + prefix[r - 1][c]
                    + prefix[r][c - 1]
                    - prefix[r - 1][c - 1];
        }
    }
    return prefix;
}

public static int rectangleSum(int[][] prefix, int r1, int c1, int r2, int c2) {
    return prefix[r2 + 1][c2 + 1]
            - prefix[r1][c2 + 1]
            - prefix[r2 + 1][c1]
            + prefix[r1][c1];
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Preprocessing** | O(rows · cols) | One pass over the matrix |
| **Per query** | O(1) | Four table lookups |
| **Total** | O(rows · cols + q) | Build once, answer many |
| **Space** | O(rows · cols) | The prefix table |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the matrix changes?"* → updating one cell invalidates every prefix that
  contains it; the update is O(rows · cols) in the worst case. A Fenwick tree (2D BIT)
  gives O(log²) updates and queries.
- *"How do I count the number of sub-matrices with a given sum?"* → enumerate the top
  and bottom rows and use a 1D prefix-sum scan for the columns.
- *"What if the queries were online and the matrix huge?"* → a 2D Fenwick tree or a
  wavelet tree.
- *"How does this relate to the 1D version?"* → exactly the same idea; the 2D version
  needs one extra subtraction and one extra addition because a corner region is
  double-counted.
- *"Can you do it in O(1) space per query with O(rows·cols) preprocessing?"* → yes, that
  is precisely what this is — the space is in the *preprocessing*, not the query.

**Common mistakes:**
- ❌ Off-by-one in the query — the table is padded, so the query uses \`r2 + 1\` and
  \`c2 + 1\`.
- ❌ Forgetting the final \`+ prefix[r1][c1]\` — the top-left corner was subtracted twice.
- ❌ Not padding the table — then \`prefix[r-1][c-1]\` throws
  \`ArrayIndexOutOfBoundsException\` at \`(1, 1)\`.
- ❌ Using the recurrence with \`max\`/\`min\` instead of the sum version — the 2D prefix
  table is about sums, not maxima.

**How to narrate:**
> "It's the 1D prefix sum extended to two dimensions. I pad the matrix with a zero row
> and column and build a table where prefix[r][c] is the sum of everything above and to
> the left of (r, c), using the recurrence value + above + left − top-left. A rectangle
> query is then pure inclusion-exclusion: the big rectangle minus the strip above, minus
> the strip to the left, plus back the corner that was subtracted twice. Build once in
> O(rows·cols), each query is O(1)."

## Related Problems

- [Range Sum Query — Immutable](RangeSumQuery.md) — the 1D version
- [Running Sum of 1d Array](RunningSum.md) — the raw prefix array
- [Set Matrix Zeroes](../arrays/SetMatrixZeroes.md) — matrix traversal
`,i=[`buildPrefix`,`rectangleSum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};