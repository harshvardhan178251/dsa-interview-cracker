package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Stone Game II
 * LeetCode: 1140 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Game DP, Bottom-up DP
 *
 * <p>Problem: Alice and Bob take piles from the front of a row. A player may take between 1 and `2M` piles, where `M` starts at 1 and becomes `max(M, taken)`. Return the number of stones Alice can force.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * piles[0] piles[1] ... piles[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 7 9 4 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Approach: Track the best score of the player whose turn it is; after a move the opponent plays the same sub-game, so the score is "remaining stones minus the opponent's best".
 *
 * <p>Complexity: Time O(n^3), Space O(n^2).
 */
public class StoneGameII {

    /**
     * Returns the number of stones Alice can guarantee when both players play optimally.
     *
     * <p>On every turn the current player may take between {@code 1} and {@code 2 * M} piles from the
     * front; afterwards {@code M} becomes {@code max(M, taken)} for the opponent. Because the total
     * number of stones is fixed, maximising my score is the same as minimising the opponent's, so
     * {@code dp[i][m]} = "the best score of the player to move" and the recurrence is a subtraction.
     *
     * @param piles the stones in each pile
     * @return the number of stones Alice gets when she moves first
     */
    public static int stoneGameII(int[] piles) {
        int n = piles.length;
        int[] suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + piles[i];
        }

        int[][] dp = new int[n][n + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int m = 1; m <= n; m++) {
                if (2 * m >= n - i) {
                    dp[i][m] = suffix[i]; // take every remaining pile
                    continue;
                }
                int best = 0;
                for (int taken = 1; taken <= 2 * m; taken++) {
                    int score = suffix[i] - dp[i + taken][Math.max(m, taken)];
                    best = Math.max(best, score);
                }
                dp[i][m] = best;
            }
        }
        return dp[0][1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] piles = fs.nextIntArray(n);

        System.out.println(stoneGameII(piles));
    }
}
