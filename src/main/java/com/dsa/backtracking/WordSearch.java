package com.dsa.backtracking;

import com.dsa.utils.FastScanner;

/**
 * Problem: Word Search
 * LeetCode: 79 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, DFS on a grid
 *
 * <p>Problem: Decide whether a word exists in the board, where the letters of the word have to be neighbours horizontally or vertically.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * board[0]
 * board[1]
 * ...
 * board[rows-1]
 * word
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 4
 * ABCE
 * SFCS
 * ADEE
 * ABCCED
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Start a depth-first search from every cell and walk the word, marking the cells that are already used.
 *
 * <p>Complexity: Time O(rows x cols x 4^L), Space O(rows x cols).
 */
public class WordSearch {

    /**
     * Decides whether {@code word} exists in {@code board}.
     *
     * <p>The letters of the word have to be neighbours horizontally or vertically, and every cell may be
     * used only once. The cell that is currently taken is marked in the board itself and released again
     * when the branch is finished.
     *
     * @param board the grid of characters
     * @param word  the word to look for
     * @return {@code true} when the word exists in the board
     */
    public static boolean exist(char[][] board, String word) {
        if (board.length == 0 || board[0].length == 0) {
            return false;
        }
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[0].length; col++) {
                if (search(board, row, col, 0, word)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Walks the word from one cell.
     *
     * @param board the grid, the taken cell is marked while the search stands on it
     * @param row   the current row
     * @param col   the current column
     * @param index the index of the letter that has to be matched
     * @param word  the word to look for
     * @return {@code true} when the rest of the word was found
     */
    private static boolean search(char[][] board, int row, int col, int index, String word) {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
            return false; // outside the board
        }
        if (board[row][col] != word.charAt(index)) {
            return false; // the letter does not match
        }
        if (index == word.length() - 1) {
            return true; // the last letter matched
        }

        char taken = board[row][col];
        board[row][col] = '\0'; // the cell is used by this path
        boolean found = search(board, row + 1, col, index + 1, word)
                || search(board, row - 1, col, index + 1, word)
                || search(board, row, col + 1, index + 1, word)
                || search(board, row, col - 1, index + 1, word);
        board[row][col] = taken; // backtrack
        return found;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        char[][] board = new char[rows][cols];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                board[row][col] = fs.nextChar();
            }
        }
        String word = fs.next();

        System.out.println(exist(board, word) ? 1 : 0);
    }
}
