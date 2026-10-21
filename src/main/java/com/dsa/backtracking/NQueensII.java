package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.Arrays;

/**
 * Problem: N-Queens II
 * LeetCode: 52 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Count how many ways `n` queens can be placed on an `n x n` board so that no two of them attack each other.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: The same search as N-Queens, but the leaves are counted instead of collected.
 *
 * <p>Complexity: Time O(n!), Space O(n).
 */
public class NQueensII {

    /**
     * Counts the placements of {@code n} queens that leave no two of them attacking each other.
     *
     * <p>There is one queen per row, so only the column has to be chosen. The occupied columns and the
     * two diagonals are tracked with boolean arrays, which makes the check for every candidate
     * column {@code O(1)}.
     *
     * @param n the size of the board
     * @return the number of solutions
     */
    public static int solveNQueens(int n) {
        return place(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
    }

    /**
     * Tries to place the queen of the current row and counts the completions.
     *
     * @param row           the row that is being filled
     * @param n             the size of the board
     * @param usedColumn    the occupied columns
     * @param usedDiagLeft  the occupied diagonals running to the top left
     * @param usedDiagRight the occupied diagonals running to the top right
     * @return the number of solutions of this sub-tree
     */
    private static int place(int row, int n, boolean[] usedColumn,
                             boolean[] usedDiagLeft, boolean[] usedDiagRight) {
        if (row == n) {
            return 1; // every row has a queen: one solution
        }
        int solutions = 0;
        for (int col = 0; col < n; col++) {
            int left = row + col;
            int right = row - col + n - 1;
            if (usedColumn[col] || usedDiagLeft[left] || usedDiagRight[right]) {
                continue; // the queen would be attacked
            }
            usedColumn[col] = true;
            usedDiagLeft[left] = true;
            usedDiagRight[right] = true;

            solutions += place(row + 1, n, usedColumn, usedDiagLeft, usedDiagRight);

            usedDiagRight[right] = false; // backtrack
            usedDiagLeft[left] = false;
            usedColumn[col] = false;
        }
        return solutions;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(solveNQueens(n));
    }
}
