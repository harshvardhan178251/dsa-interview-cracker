var e=`dynamicprogramming.LongestCommonSubstring`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Common Substring
 * LeetCode: 718 | Difficulty: Medium | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the length of the longest **contiguous** substring that appears in both of the two given strings.
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
 * 1
 * </pre>
 *
 * <p>Approach: A cell holds the length of the common substring that **ends** at both positions, so a mismatch resets the cell to zero.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class LongestCommonSubstring {

    /**
     * Returns the length of the longest common substring of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the length of the common substring that ends at {@code a[i-1]} and
     * {@code b[j-1]}. Equal characters extend the diagonal by one; a mismatch resets the cell to
     * {@code 0} because a substring may not skip characters.
     *
     * @param a the first string
     * @param b the second string
     * @return the length of the longest common substring
     */
    public static int longestCommonSubstring(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];
        int best = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    best = Math.max(best, dp[i][j]);
                } else {
                    dp[i][j] = 0; // a substring cannot skip a character
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();
        String a = fs.next();
        String b = fs.next();

        System.out.println(longestCommonSubstring(a, b));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Longest Common Substring
 * LeetCode: 718 | Difficulty: Medium | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the length of the longest **contiguous** substring that appears in both of the two given strings.
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
 * 1
 * </pre>
 *
 * <p>Approach: A cell holds the length of the common substring that **ends** at both positions, so a mismatch resets the cell to zero.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class Main {

    /**
     * Returns the length of the longest common substring of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the length of the common substring that ends at {@code a[i-1]} and
     * {@code b[j-1]}. Equal characters extend the diagonal by one; a mismatch resets the cell to
     * {@code 0} because a substring may not skip characters.
     *
     * @param a the first string
     * @param b the second string
     * @return the length of the longest common substring
     */
    public static int longestCommonSubstring(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];
        int best = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    best = Math.max(best, dp[i][j]);
                } else {
                    dp[i][j] = 0; // a substring cannot skip a character
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();
        String a = fs.next();
        String b = fs.next();

        System.out.println(longestCommonSubstring(a, b));
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
`,r=`
# Longest Common Substring — LeetCode 718

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | 2-D DP · String DP |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given two strings \`a\` and \`b\`, return the length of their **longest common substring**.

A substring must be **contiguous** — unlike a subsequence it may not skip characters. If there is no common substring, return \`0\`.

## Input Format

The program reads from standard input:

\`\`\`
n m
a
b
\`\`\`

- \`n\` — length of the first string (1 ≤ n ≤ 250)
- \`m\` — length of the second string (1 ≤ m ≤ 250)
- \`a\` — the first string (no spaces)
- \`b\` — the second string (no spaces)

## Sample Input

\`\`\`
5 3
abcde
ace
\`\`\`

## Expected Output

\`\`\`
1
\`\`\`

The only common substring is \`c\` — length **1**. (\`ace\` is not contiguous in \`abcde\`.)

## Approach

The trick is to change the **meaning** of the state compared with the LCS problem:

\`dp[i][j]\` = the length of the longest common substring that **ends** at \`a[i-1]\` **and** at \`b[j-1]\`.

- If \`a[i-1] == b[j-1]\`, the substring continues: \`dp[i][j] = dp[i-1][j-1] + 1\`.
- Otherwise the cell is \`0\` — a mismatch *breaks* the run, it does not just skip a character.

The answer is the **maximum cell in the table**, not the bottom-right corner: the best common substring can end anywhere.

An \`O(n · m)\` solution with \`O(m)\` space is also possible (roll the rows), but the table version shows the run structure best.

## Dry Run

Input: \`a = "abcde"\`, \`b = "ace"\`. The non-zero cells are the runs.

| | \`""\` | \`a\` | \`ac\` | \`ace\` |
|---|---:|---:|---:|---:|
| \`""\` | 0 | 0 | 0 | 0 |
| \`a\` | 0 | **1** | 0 | 0 |
| \`ab\` | 0 | 0 | 0 | 0 |
| \`abc\` | 0 | 0 | **1** | 0 |
| \`abcd\` | 0 | 0 | 0 | 0 |
| \`abcde\` | 0 | 0 | 0 | **1** |

The largest cell is **1** → answer **1**.

**Cell by cell.**

| cell | comparison | computation | value |
|---|---|---|---:|
| \`dp[1][1]\` | \`a\` vs \`a\` | \`dp[0][0] + 1 = 1\` | 1 |
| \`dp[1][2]\` | \`a\` vs \`c\` | mismatch → reset | 0 |
| \`dp[3][2]\` | \`c\` vs \`c\` | \`dp[2][1] + 1 = 0 + 1\` | 1 |
| \`dp[5][3]\` | \`e\` vs \`e\` | \`dp[4][2] + 1 = 0 + 1\` | 1 |

**Contrast with LCS.** In the LCS table the cell for \`a\` vs \`ac\` was \`1\` — the subsequence skips characters. Here it is \`0\`, because a substring may not skip anything.

## Java Solution

See [\`LongestCommonSubstring.java\`](./LongestCommonSubstring.java).

\`\`\`java
    public static int longestCommonSubstring(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];
        int best = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    best = Math.max(best, dp[i][j]);
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        return best;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · m) | \`(n + 1) × (m + 1)\` cells, each \`O(1)\` |
| **Space** | O(n · m) | the full \`(n + 1) × (m + 1)\` table is kept |

**Space can be \`O(m)\`** by rolling the rows. A neat alternative is a single row plus a running diagonal variable, scanning the strings from the end.

## Interview Notes

**Follow-ups to raise yourself:**

- "Give me the substring itself."* → remember the cell that holds the maximum and walk the diagonal backwards.
- "What if I want all the common substrings?"* → collect every maximal run.
- "How is this different from LCS?"* → the LCS state survives a mismatch, the substring state resets to 0.
- "What if the strings are very long?"* → suffix automaton or suffix array, \`O(n + m)\` — the classic string-matching answer.

**Common mistakes:**

- ❌ Returning \`dp[n][m]\` instead of the maximum cell — the best substring can end anywhere.
- ❌ Keeping the previous value on a mismatch instead of resetting to \`0\` — that computes the LCS.
- ❌ Forgetting to track the running maximum while filling the table.

**How to narrate:**

> "Here the state is "the common substring ending at these two positions". Equal characters extend the diagonal; a mismatch resets the cell to zero because a substring has to be contiguous. Because the best run can end anywhere, I track the maximum cell instead of returning the corner."

## Related Problems

- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — the non-contiguous variant
- [Palindromic Substrings — LeetCode 647](./PalindromicSubstrings.java) — the same "expand around the centre" idea
`,i=[`longestCommonSubstring`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};