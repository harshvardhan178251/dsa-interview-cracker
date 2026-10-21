package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Search a 2D Matrix II
 * LeetCode: 240 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Staircase search from the top-right corner
 *
 * <p>Problem:
 * Given an {@code m x n} matrix where every row is sorted left to right and every column is
 * sorted top to bottom (rows are <em>not</em> globally ordered), search for a
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
 * 5 7 7 8 8 10 11 13 9 11 13 15
 * 13
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3
 * </pre>
 *
 * <p>Approach: start at the top-right corner. That cell is the largest of its row and the
 * smallest of its column, so each step can discard a whole row or a whole column. If the cell
 * is too big, every element below it in that column is also too big — move left. If it is too
 * small, every element to its left in that row is also too small — move down.
 *
 * <p>Complexity: Time O(rows + cols), Space O(1).
 */
public class Search2DMatrixII {

    /**
     * Searches the row/column sorted matrix for {@code target}.
     *
     * @param matrix the matrix
     * @param target the value to look for
     * @return {@code {row, col}} of the target, or {@code {-1, -1}} when it is absent
     */
    public static int[] searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return new int[]{-1, -1};
        }
        int row = 0;
        int col = matrix[0].length - 1;
        while (row < matrix.length && col >= 0) {
            int value = matrix[row][col];
            if (value == target) {
                return new int[]{row, col};
            } else if (value > target) {
                col--;
            } else {
                row++;
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
