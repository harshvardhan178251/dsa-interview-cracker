package com.dsa.prefixsum;

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
                out.append('\n');
            }
            out.append(rectangleSum(prefix, r1, c1, r2, c2));
        }
        System.out.println(out);
    }
}
