package com.dsa.binarysearch;

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
