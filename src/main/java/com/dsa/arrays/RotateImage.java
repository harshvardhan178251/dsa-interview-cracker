package com.dsa.arrays;

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
            out.append('\n');
        }
        System.out.print(out);
    }
}
