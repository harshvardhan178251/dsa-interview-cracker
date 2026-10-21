package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Edit Distance
 * LeetCode: 72 | Difficulty: Medium | Frequency: 5/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the minimum number of single-character insertions, deletions or replacements needed to turn the first string into the second.
 *
 * <p>Input format (stdin):
 * <pre>
 * n m
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5 3
 * horse
 * ros
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Compare prefixes: either the last characters match (no edit) or one of the three edit operations is applied to the last character.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class EditDistance {

    /**
     * Returns the Levenshtein distance between {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the minimum number of edits that turn {@code a[0 .. i-1]} into
     * {@code b[0 .. j-1]}. When the last characters are equal nothing has to change; otherwise the
     * cheapest of insert / delete / replace decides.
     *
     * @param a the source string
     * @param b the target string
     * @return the minimum number of edits
     */
    public static int minDistance(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = i; // turn a prefix of a into "" -- i deletions
        }
        for (int j = 0; j <= m; j++) {
            dp[0][j] = j; // turn "" into a prefix of b -- j insertions
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                            Math.min(dp[i - 1][j],    // delete a[i-1]
                                    dp[i][j - 1]),   // insert b[j-1]
                            dp[i - 1][j - 1]);      // replace a[i-1] with b[j-1]
                }
            }
        }
        return dp[n][m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();
        String a = fs.next();
        String b = fs.next();

        System.out.println(minDistance(a, b));
    }
}
