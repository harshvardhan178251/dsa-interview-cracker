package com.dsa.arrays;

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
