package com.dsa.arrays;

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
            out.append('\n');
        }
        System.out.print(out);
    }
}
