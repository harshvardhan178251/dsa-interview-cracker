package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: N-Queens
 * LeetCode: 51 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Place `n` queens on an `n x n` board so that no two of them attack each other, and return every distinct solution.
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
 * ..Q. Q... ...Q .Q..
 * .Q.. ...Q Q... ..Q.
 * </pre>
 *
 * <p>Approach: Place one queen per row and forbid the columns and diagonals it attacks -- the row is implicit.
 *
 * <p>Complexity: Time O(n!), Space O(n).
 */
public class NQueens {

    /**
     * Returns every placement of {@code n} queens that leaves no two of them attacking each other.
     *
     * <p>There is one queen per row, so only the column has to be tracked. Two boolean arrays mark the
     * occupied columns and the two diagonals.
     *
     * @param n the size of the board
     * @return every solution, sorted lexicographically
     */
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        int[] columns = new int[n];
        Arrays.fill(columns, -1);

        place(0, n, columns, new boolean[n], new boolean[2 * n], new boolean[2 * n], result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Tries to place the queen of the current row.
     *
     * @param row         the row that is being filled
     * @param n           the size of the board
     * @param columns     the column of the queen in every row
     * @param usedColumn  the occupied columns
     * @param usedDiagLeft the occupied diagonals running to the top left
     * @param usedDiagRight the occupied diagonals running to the top right
     * @param result      the collected solutions
     */
    private static void place(int row, int n, int[] columns, boolean[] usedColumn,
                              boolean[] usedDiagLeft, boolean[] usedDiagRight, List<List<String>> result) {
        if (row == n) {
            result.add(render(columns, n)); // every row has a queen
            return;
        }
        for (int col = 0; col < n; col++) {
            int left = row + col;
            int right = row - col + n - 1;
            if (usedColumn[col] || usedDiagLeft[left] || usedDiagRight[right]) {
                continue; // the queen would be attacked
            }
            columns[row] = col;
            usedColumn[col] = true;
            usedDiagLeft[left] = true;
            usedDiagRight[right] = true;

            place(row + 1, n, columns, usedColumn, usedDiagLeft, usedDiagRight, result);

            usedDiagRight[right] = false;  // backtrack
            usedDiagLeft[left] = false;
            usedColumn[col] = false;
            columns[row] = -1;
        }
    }

    /**
     * Renders a solution as a list of board rows.
     *
     * @param columns the column of the queen in every row
     * @param n       the size of the board
     * @return the rows of the board
     */
    private static List<String> render(int[] columns, int n) {
        List<String> board = new ArrayList<>();
        for (int row = 0; row < n; row++) {
            char[] line = new char[n];
            Arrays.fill(line, '.');
            line[columns[row]] = 'Q';
            board.add(new String(line));
        }
        return board;
    }
    /**
     * Compares two lists element by element (lexicographic order).
     *
     * @param a the first list
     * @param b the second list
     * @param <T> the element type
     * @return a negative number, zero, or a positive number
     */
    private static <T extends Comparable<? super T>> int compareLists(List<T> a, List<T> b) {
        int limit = Math.min(a.size(), b.size());
        for (int i = 0; i < limit; i++) {
            int diff = a.get(i).compareTo(b.get(i));
            if (diff != 0) {
                return diff;
            }
        }
        return Integer.compare(a.size(), b.size());
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        StringBuilder out = new StringBuilder();
        for (List<String> solution : solveNQueens(n)) {
            for (int i = 0; i < solution.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(solution.get(i));
            }
            out.append('\n');
        }
        System.out.print(out);
    }
}
