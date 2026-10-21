package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Catalan Number
 * LeetCode: 96 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Counting DP, Combinatorics
 *
 * <p>Problem: Compute the `n`-th Catalan number -- the number of structurally different binary search trees with `n` nodes.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 42
 * </pre>
 *
 * <p>Approach: Split the tree at its root: the left and the right subtrees are independent, so the counts multiply and the sizes add up.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class CatalanNumber {

    /**
     * Returns the {@code n}-th Catalan number.
     *
     * <p>{@code dp[n]} counts the binary search trees with {@code n} nodes. Choosing the root splits
     * the remaining nodes into a left and a right subtree, so
     * {@code dp[n] = sum(dp[i] * dp[n-1-i])} over all splits.
     *
     * @param n the index
     * @return the {@code n}-th Catalan number
     */
    public static long catalan(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 1; // exactly one empty tree

        for (int nodes = 1; nodes <= n; nodes++) {
            for (int left = 0; left < nodes; left++) {
                dp[nodes] += dp[left] * dp[nodes - 1 - left];
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(catalan(n));
    }
}
