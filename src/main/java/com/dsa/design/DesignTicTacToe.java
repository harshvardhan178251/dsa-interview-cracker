package com.dsa.design;

import com.dsa.utils.FastScanner;

/**
 * Problem: Design Tic-Tac-Toe
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, State machine + win detection
 *
 * <p>Problem:
 * Implement a Tic-Tac-Toe board. Player 1 (X) always moves first, player 2 (O) always
 * moves second, and the players alternate. After every move report the state of the game.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * r1 c1
 * r2 c2
 * ...
 * rn cn
 * </pre>
 * Each move is a row and a column between 0 and 2. The program prints one line per move:
 * <ul>
 *   <li>{@code 1} — player 1 wins</li>
 *   <li>{@code 2} — player 2 wins</li>
 *   <li>{@code 3} — draw, the board is full and nobody won</li>
 *   <li>{@code 0} — the game is still running</li>
 *   <li>{@code -1} — the move was illegal (cell taken, out of range, or the game is over)</li>
 * </ul>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 0 0
 * 1 1
 * 0 1
 * 1 0
 * 0 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * 0
 * 0
 * 0
 * 1
 * </pre>
 *
 * <p>Approach: a 9 cell board plus the index of the player to move. After a move, the
 * eight possible winning lines (3 rows, 3 columns, 2 diagonals) are checked for the
 * player that just moved — checking only that player is enough because the opponent could
 * not have won on the previous move without the game already being over.
 *
 * <p>Complexity: Time O(1) per move, Space O(1).
 */
public class DesignTicTacToe {

    /** Row-major board: {@code board[r * 3 + c]}. */
    private final int[] board = new int[9];

    /** 1 = X to move, 2 = O to move. */
    private int nextPlayer = 1;

    /** True once somebody won or the board filled up. */
    private boolean finished;

    /**
     * Plays the move at ({@code row}, {@code col}).
     *
     * @return 1 or 2 for the winner, 3 for a draw, 0 while the game runs on, -1 for an
     *         illegal move
     */
    public int move(int row, int col) {
        if (finished || row < 0 || row > 2 || col < 0 || col > 2) {
            return -1;
        }
        int index = row * 3 + col;
        if (board[index] != 0) {
            return -1;
        }
        board[index] = nextPlayer;
        if (hasWon(nextPlayer)) {
            finished = true;
            return nextPlayer;
        }
        if (isFull()) {
            finished = true;
            return 3;
        }
        nextPlayer = 3 - nextPlayer;
        return 0;
    }

    /** The player whose turn it is (1 = X, 2 = O). */
    public int currentPlayer() {
        return nextPlayer;
    }

    /** The board as a 3x3 grid of strings — used by the tests. */
    public String state() {
        StringBuilder sb = new StringBuilder();
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                int cell = board[r * 3 + c];
                sb.append(cell == 0 ? '.' : cell == 1 ? 'X' : 'O');
            }
            if (r < 2) {
                sb.append('\n');
            }
        }
        return sb.toString();
    }

    private boolean hasWon(int player) {
        int[][] lines = {
            {0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // rows
            {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // columns
            {0, 4, 8}, {2, 4, 6},            // diagonals
        };
        for (int[] line : lines) {
            if (board[line[0]] == player && board[line[1]] == player && board[line[2]] == player) {
                return true;
            }
        }
        return false;
    }

    private boolean isFull() {
        for (int cell : board) {
            if (cell == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        DesignTicTacToe game = new DesignTicTacToe();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            int row = fs.nextInt();
            int col = fs.nextInt();
            out.append(game.move(row, col)).append('\n');
        }
        System.out.print(out);
    }
}
