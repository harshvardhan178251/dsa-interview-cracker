package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Regular Expression Matching
 * LeetCode: 10 | Difficulty: Hard | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Implement regular expression matching with `.` (any single character) and `*` (zero or more of the preceding element).
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * p
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aab
 * c*a*b
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: A `*` always belongs to the element before it, so the DP either skips that element entirely or lets it swallow one more character.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class RegexMatching {

    /**
     * Decides whether the text {@code s} matches the regular expression {@code p}.
     *
     * <p>The pattern supports {@code .} (any single character) and {@code *} (zero or more of the
     * preceding element). A {@code *} belongs to the element before it, so the DP always looks at
     * {@code p[j-2]} when it handles {@code p[j-1] == '*'}.
     *
     * @param s the text
     * @param p the pattern
     * @return {@code true} when the whole text matches the whole pattern
     */
    public static boolean isMatch(String s, String p) {
        int n = s.length();
        int m = p.length();
        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        // An empty text only matches a pattern that is a run of "x*" groups.
        for (int j = 1; j <= m; j++) {
            if (p.charAt(j - 1) == '*' && j >= 2) {
                dp[0][j] = dp[0][j - 2];
            }
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    // zero occurrences, or one more occurrence of p[j-2]
                    boolean zero = j >= 2 && dp[i][j - 2];
                    boolean more = j >= 2 && matches(s.charAt(i - 1), p.charAt(j - 2)) && dp[i - 1][j];
                    dp[i][j] = zero || more;
                } else {
                    dp[i][j] = matches(s.charAt(i - 1), pc) && dp[i - 1][j - 1];
                }
            }
        }
        return dp[n][m];
    }

    /**
     * Tells whether a pattern character matches a text character.
     *
     * @param text      the character of the text
     * @param patternCh the character of the pattern
     * @return {@code true} when they match
     */
    private static boolean matches(char text, char patternCh) {
        return patternCh == '.' || patternCh == text;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String p = fs.next();

        System.out.println(isMatch(s, p) ? 1 : 0);
    }
}
