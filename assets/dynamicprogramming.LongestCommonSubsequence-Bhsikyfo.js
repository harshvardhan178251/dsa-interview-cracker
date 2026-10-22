var e=`dynamicprogramming.LongestCommonSubsequence`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Common Subsequence
 * LeetCode: 1143 | Difficulty: Medium | Frequency: 5/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the length of the longest subsequence that appears in both of the two given strings, preserving the order of the characters.
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
 * abcde
 * ace
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Compare the two strings prefix by prefix; if the last characters match they extend the diagonal, otherwise the answer comes from the best of the two neighbours.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class LongestCommonSubsequence {

    /**
     * Returns the length of the longest common subsequence of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the LCS length of {@code a[0 .. i-1]} and {@code b[0 .. j-1]}. If the two
     * last characters are equal the answer is the diagonal plus one, otherwise it is the better of
     * "drop {@code a[i-1]}" and "drop {@code b[j-1]}".
     *
     * @param a the first string
     * @param b the second string
     * @return the length of the longest common subsequence
     */
    public static int lcs(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
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

        System.out.println(lcs(a, b));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Longest Common Subsequence
 * LeetCode: 1143 | Difficulty: Medium | Frequency: 5/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the length of the longest subsequence that appears in both of the two given strings, preserving the order of the characters.
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
 * abcde
 * ace
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Compare the two strings prefix by prefix; if the last characters match they extend the diagonal, otherwise the answer comes from the best of the two neighbours.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class Main {

    /**
     * Returns the length of the longest common subsequence of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the LCS length of {@code a[0 .. i-1]} and {@code b[0 .. j-1]}. If the two
     * last characters are equal the answer is the diagonal plus one, otherwise it is the better of
     * "drop {@code a[i-1]}" and "drop {@code b[j-1]}".
     *
     * @param a the first string
     * @param b the second string
     * @return the length of the longest common subsequence
     */
    public static int lcs(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
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

        System.out.println(lcs(a, b));
    }
}

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r='\n# Longest Common Subsequence — LeetCode 1143\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | 2-D DP · String DP |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Microsoft |\n\n## Problem Statement\n\nGiven two strings `a` and `b`, return the length of their **longest common subsequence**.\n\nA subsequence is a sequence that can be derived from the original by deleting some characters (possibly none) **without changing the order** of the remaining characters.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn m\na\nb\n```\n\n- `n` — length of the first string (1 ≤ n ≤ 1000)\n- `m` — length of the second string (1 ≤ m ≤ 1000)\n- `a` — the first string (no spaces)\n- `b` — the second string (no spaces)\n\n## Sample Input\n\n```\n5 3\nabcde\nace\n```\n\n## Expected Output\n\n```\n3\n```\n\nThe common subsequence is `ace` — length **3**.\n\n## Approach\n\nDefine the state on **prefixes** of the two strings:\n\n`dp[i][j]` = the LCS length of the first `i` characters of `a` and the first `j` characters of `b`.\n\n- If `a[i-1] == b[j-1]`, the two characters can both be used, so\n  `dp[i][j] = dp[i-1][j-1] + 1`.\n- Otherwise the last characters cannot be paired, so one of them has to be dropped:\n  `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.\n\nThe base row and column are `0` — an empty string shares nothing with anything. The answer is `dp[n][m]`.\n\nThe table can be rolled up into a single row (`O(m)` space) by keeping the old diagonal value in a temporary variable, but the two-dimensional version is what you draw first and it makes the recursion obvious.\n\n## Dry Run\n\nInput: `a = "abcde"`, `b = "ace"`. Rows are prefixes of `a`, columns are prefixes of `b`.\n\n| | `""` | `a` | `ac` | `ace` |\n|---|---:|---:|---:|---:|\n| `""` | 0 | 0 | 0 | 0 |\n| `a` | 0 | **1** | 1 | 1 |\n| `ab` | 0 | 1 | **1** | 1 |\n| `abc` | 0 | 1 | **2** | 2 |\n| `abcd` | 0 | 1 | 2 | 2 |\n| `abcde` | 0 | 1 | 2 | **3** |\n\nEvery cell in bold was computed from the diagonal (`a[i-1] == b[j-1]`), every other cell from the best of the two neighbours above / to the left.\n\n**Cell by cell for the interesting ones.**\n\n| cell | comparison | computation | value |\n|---|---|---|---:|\n| `dp[1][1]` | `a` vs `a` — equal | `dp[0][0] + 1 = 0 + 1` | 1 |\n| `dp[2][2]` | `b` vs `c` — differ | `max(dp[1][2], dp[2][1]) = max(1, 1)` | 1 |\n| `dp[3][2]` | `c` vs `c` — equal | `dp[2][1] + 1 = 1 + 1` | 2 |\n| `dp[4][3]` | `d` vs `e` — differ | `max(dp[3][3], dp[4][2]) = max(2, 2)` | 2 |\n| `dp[5][3]` | `e` vs `e` — equal | `dp[4][2] + 1 = 2 + 1` | 3 |\n\n**Reading the answer back.** Starting at `dp[5][3]` the characters match, so take `e` and move diagonally to `dp[4][2]`; `d` and `c` differ, so move to the larger neighbour, and so on — that traces `a`, `c`, `e`.\n\n## Java Solution\n\nSee [`LongestCommonSubsequence.java`](./LongestCommonSubsequence.java).\n\n```java\n    public static int lcs(String a, String b) {\n        int n = a.length();\n        int m = b.length();\n        int[][] dp = new int[n + 1][m + 1];\n\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= m; j++) {\n                if (a.charAt(i - 1) == b.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1] + 1;\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        return dp[n][m];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · m) | `(n + 1) × (m + 1)` cells, each `O(1)` |\n| **Space** | O(n · m) | the full `(n + 1) × (m + 1)` table is kept |\n\n**Space can be `O(m)`** by rolling the table up into one row (plus a saved diagonal value). A common variant asks for the subsequence itself, which needs the whole table (or a parent array).\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Print the LCS itself."* → keep the table and walk backwards from `dp[n][m]`, taking a character whenever `a[i-1] == b[j-1]`.\n- "What is the difference between a subsequence and a substring?"* → a substring must be contiguous; see [Longest Common Substring](./LongestCommonSubstring.java).\n- "Can you make the space `O(m)`?"* → roll the rows up, keeping the previous diagonal in a variable.\n- "What about three strings?"* → a 3-D table `dp[i][j][k]`, `O(n·m·p)` time and space.\n- "How does this relate to edit distance?"* → edit distance is the same shape with a different recurrence; see [Edit Distance](./EditDistance.java).\n\n**Common mistakes:**\n\n- ❌ Using `dp[i-1][j-1] + 1` even when the characters differ — that over-counts.\n- ❌ Forgetting the empty-prefix base cases (the row and column of zeros).\n- ❌ Confusing "subsequence" with "substring" and using the substring recurrence.\n\n**How to narrate:**\n\n> "I build a table over prefixes: `dp[i][j]` is the LCS of the first `i` characters of `a` and the first `j` of `b`. If the last characters are equal I extend the diagonal; otherwise one of them has to be dropped, so I take the max of the upper and left cell. That is `O(n·m)` time. If you want the subsequence itself I keep the table and walk it backwards."\n\n## Related Problems\n\n- [Longest Common Substring — LeetCode 718](./LongestCommonSubstring.java) — the contiguous variant\n- [Edit Distance — LeetCode 72](./EditDistance.java) — same shape, different recurrence\n- [Interleaving String — LeetCode 97](./InterleavingString.java) — a third two-string DP\n',i=[`lcs`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};