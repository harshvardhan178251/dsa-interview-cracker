package com.dsa.backtracking;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sudoku Solver
 * LeetCode: 37 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, Constraint pruning
 *
 * <p>Problem: Fill the empty cells of a 9 x 9 Sudoku board so that every row, every column and every 3 x 3 box contains the digits 1 to 9 exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * 9
 * row[0]
 * row[1]
 * ...
 * row[8]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 9
 * 53..7....
 * 6..195...
 * .98....6.
 * 8...6...3
 * 4..8.3..1
 * 7...2...6
 * .6....28.
 * ...419..5
 * ....8..79
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 534678912
 * 672195348
 * 198342567
 * 859761423
 * 426853791
 * 713924856
 * 961537284
 * 287419635
 * 345286179
 * </pre>
 *
 * <p>Approach: Fill the first empty cell with every legal digit, recurse, and undo the digit when the rest of the board cannot be solved.
 *
 * <p>Complexity: Time O(9^m), Space O(81).
 */
public class SudokuSolver {

    /**
     * Solves the Sudoku board in place.
     *
     * <p>The search always fills the **first** empty cell, so no choice is ever made twice. A digit is
     * only tried when it does not clash with the row, the column or the 3 x 3 box of the cell.
     *
     * @param board the board, {@code '.'} marks an empty cell
     * @return the same board, solved
     */
    public static char[][] solveSudoku(char[][] board) {
        solve(board);
        return board;
    }

    /**
     * Fills the board with backtracking.
     *
     * @param board the board
     * @return {@code true} when the board could be solved
     */
    private static boolean solve(char[][] board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] != '.') {
                    continue; // the cell is already filled
                }
                for (char digit = '1'; digit <= '9'; digit++) {
                    if (!isValid(board, row, col, digit)) {
                        continue; // the digit clashes with the row, the column or the box
                    }
                    board[row][col] = digit;              // choose
                    if (solve(board)) {
                        return true;                      // the whole board is solved
                    }
                    board[row][col] = '.';               // backtrack
                }
                return false; // no digit works here
            }
        }
        return true; // no empty cell is left
    }

    /**
     * Tells whether a digit may be placed in a cell.
     *
     * @param board the board
     * @param row   the row of the cell
     * @param col   the column of the cell
     * @param digit the digit to place
     * @return {@code true} when the digit does not clash with anything
     */
    private static boolean isValid(char[][] board, int row, int col, char digit) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == digit) {
                return false; // the digit is already in the row
            }
            if (board[i][col] == digit) {
                return false; // the digit is already in the column
            }
        }
        int boxRow = (row / 3) * 3;
        int boxCol = (col / 3) * 3;
        for (int r = boxRow; r < boxRow + 3; r++) {
            for (int c = boxCol; c < boxCol + 3; c++) {
                if (board[r][c] == digit) {
                    return false; // the digit is already in the 3 x 3 box
                }
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        char[][] board = new char[rows][rows];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < rows; col++) {
                board[row][col] = fs.nextChar();
            }
        }

        solveSudoku(board);

        StringBuilder out = new StringBuilder();
        for (char[] row : board) {
            out.append(row).append('\n');
        }
        System.out.print(out);
    }
}
