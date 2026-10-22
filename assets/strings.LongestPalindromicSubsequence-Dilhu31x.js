var e=`strings.LongestPalindromicSubsequence`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Palindromic Subsequence
 * LeetCode: 516 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Dynamic programming, Interval DP
 *
 * <p>Problem: Given a string {@code s}, return the length of the longest
 * <b>subsequence</b> of {@code s} that is a palindrome. A subsequence keeps the
 * relative order of the characters but may skip any of them.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * bbbab
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: interval DP. {@code dp[i][j]} is the length of the longest palindromic
 * subsequence of {@code s[i..j]}. If the two ends match we can always use them and add
 * two to the answer for the inside; otherwise we drop one end and take the better of
 * the two remaining ranges.
 *
 * <p>Complexity: Time O(n²), Space O(n²).
 */
public class LongestPalindromicSubsequence {

    /**
     * Returns the length of the longest palindromic subsequence of {@code s}.
     *
     * @param s the input string
     * @return the length of the longest palindromic subsequence (0 for an empty string)
     */
    public static int longestPalindromeSubsequence(String s) {
        int n = s.length();
        if (n == 0) {
            return 0;
        }

        // dp[i][j] = length of the longest palindromic subsequence of s[i..j].
        int[][] dp = new int[n][n];

        // A single character is a palindrome of length 1.
        for (int i = 0; i < n; i++) {
            dp[i][i] = 1;
        }

        // Fill the table by increasing interval length.
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                if (s.charAt(i) == s.charAt(j)) {
                    // Both ends fit around the best palindrome strictly inside.
                    dp[i][j] = 2 + dp[i + 1][j - 1];
                } else {
                    // The ends cannot both be used — drop one of them.
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[0][n - 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestPalindromeSubsequence(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Longest Palindromic Subsequence
 * LeetCode: 516 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Dynamic programming, Interval DP
 *
 * <p>Problem: Given a string {@code s}, return the length of the longest
 * <b>subsequence</b> of {@code s} that is a palindrome. A subsequence keeps the
 * relative order of the characters but may skip any of them.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * bbbab
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: interval DP. {@code dp[i][j]} is the length of the longest palindromic
 * subsequence of {@code s[i..j]}. If the two ends match we can always use them and add
 * two to the answer for the inside; otherwise we drop one end and take the better of
 * the two remaining ranges.
 *
 * <p>Complexity: Time O(n²), Space O(n²).
 */
public class Main {

    /**
     * Returns the length of the longest palindromic subsequence of {@code s}.
     *
     * @param s the input string
     * @return the length of the longest palindromic subsequence (0 for an empty string)
     */
    public static int longestPalindromeSubsequence(String s) {
        int n = s.length();
        if (n == 0) {
            return 0;
        }

        // dp[i][j] = length of the longest palindromic subsequence of s[i..j].
        int[][] dp = new int[n][n];

        // A single character is a palindrome of length 1.
        for (int i = 0; i < n; i++) {
            dp[i][i] = 1;
        }

        // Fill the table by increasing interval length.
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                if (s.charAt(i) == s.charAt(j)) {
                    // Both ends fit around the best palindrome strictly inside.
                    dp[i][j] = 2 + dp[i + 1][j - 1];
                } else {
                    // The ends cannot both be used — drop one of them.
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[0][n - 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestPalindromeSubsequence(s));
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
`,r='\n# Longest Palindromic Subsequence — LeetCode 516\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Dynamic Programming · Interval DP |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Adobe |\n\n## Problem Statement\n\nGiven a string `s`, return the **length** of the longest *subsequence* of `s` that is\na palindrome.\n\n- A **subsequence** keeps the relative order of the characters but may skip any of\n  them — so `"bbbb"` is a subsequence of `"bbbab"`.\n- A **substring** must be contiguous — that is the difference from\n  [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md), which is solved by expanding around a centre.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\n```\n\n- `s` — the string to scan (1 ≤ |s| ≤ 10³), on a single line, no quotes.\n\n## Sample Input\n\n```\nbbbab\n```\n\n## Expected Output\n\n```\n4\n```\n\nThe subsequence `"bbbb"` (indices 0, 1, 2, 4) is a palindrome of length 4.\n\n## Approach — Interval dynamic programming\n\nDefine:\n\n```\ndp[i][j] = length of the longest palindromic subsequence of s[i..j]\n```\n\n**Base case:** `dp[i][i] = 1` — a single character is a palindrome.\n\n**Transition** for `i < j`:\n\n- If `s[i] == s[j]` — the two ends can wrap whatever is best inside:\n  `dp[i][j] = 2 + dp[i+1][j-1]`\n- If `s[i] != s[j]` — at least one end has to be dropped:\n  `dp[i][j] = max(dp[i+1][j], dp[i][j-1])`\n\n**Order of evaluation:** the table is filled by **increasing interval length**, so every\nstate a transition depends on (`dp[i+1][j-1]`, `dp[i+1][j]`, `dp[i][j-1]`) is already\ncomputed. The answer is `dp[0][n-1]`.\n\n**Why it is correct:** any palindromic subsequence of `s[i..j]` either uses both ends\n(possible only when they are equal, and then the inside contributes `dp[i+1][j-1]`) or\nmisses at least one end (so it is contained in `s[i+1..j]` or `s[i..j-1]`). The\nrecurrence covers both cases and takes the best.\n\n## Dry Run\n\nInput: `s = "bbbab"` — indices `0:\'b\' 1:\'b\' 2:\'b\' 3:\'a\' 4:\'b\'`\n\nBase case — every single character is a palindrome:\n\n```\ndp[0][0] = dp[1][1] = dp[2][2] = dp[3][3] = dp[4][4] = 1\n```\n\n### Length 2 intervals\n\n| Step | i | j | `s[i]` | `s[j]` | equal? | computation | `dp[i][j]` |\n|---:|---:|---:|---|---|---|---|---:|\n| 1 | 0 | 1 | `b` | `b` | ✓ | `2 + dp[1][0]` = `2 + 0` | 2 |\n| 2 | 1 | 2 | `b` | `b` | ✓ | `2 + dp[2][1]` = `2 + 0` | 2 |\n| 3 | 2 | 3 | `b` | `a` | ✗ | `max(dp[3][2], dp[2][3])` = `max(1, 1)` | 1 |\n| 4 | 3 | 4 | `a` | `b` | ✗ | `max(dp[4][3], dp[3][4])` = `max(1, 1)` | 1 |\n\n### Length 3 intervals\n\n| Step | i | j | `s[i]` | `s[j]` | equal? | computation | `dp[i][j]` |\n|---:|---:|---:|---|---|---|---|---:|\n| 5 | 0 | 2 | `b` | `b` | ✓ | `2 + dp[1][1]` = `2 + 1` | 3 |\n| 6 | 1 | 3 | `b` | `a` | ✗ | `max(dp[2][3], dp[1][2])` = `max(1, 2)` | 2 |\n| 7 | 2 | 4 | `b` | `b` | ✓ | `2 + dp[3][3]` = `2 + 1` | 3 |\n\n### Length 4 intervals\n\n| Step | i | j | `s[i]` | `s[j]` | equal? | computation | `dp[i][j]` |\n|---:|---:|---:|---|---|---|---|---:|\n| 8 | 0 | 3 | `b` | `a` | ✗ | `max(dp[1][3], dp[0][2])` = `max(2, 3)` | 3 |\n| 9 | 1 | 4 | `b` | `b` | ✓ | `2 + dp[2][3]` = `2 + 1` | 3 |\n\n### Length 5 interval\n\n| Step | i | j | `s[i]` | `s[j]` | equal? | computation | `dp[i][j]` |\n|---:|---:|---:|---|---|---|---|---:|\n| 10 | 0 | 4 | `b` | `b` | ✓ | `2 + dp[1][3]` = `2 + 2` | **4** |\n\nAnswer: `dp[0][4]` = **4**\n\n### The completed table\n\n| `dp[i][j]` | j=0 | j=1 | j=2 | j=3 | j=4 |\n|---|---:|---:|---:|---:|---:|\n| **i=0** | 1 | 2 | 3 | 3 | **4** |\n| **i=1** | — | 1 | 2 | 2 | 3 |\n| **i=2** | — | — | 1 | 1 | 3 |\n| **i=3** | — | — | — | 1 | 1 |\n| **i=4** | — | — | — | — | 1 |\n\nThe `4` at `dp[0][4]` is the `"bbbb"` subsequence.\n\n## Java Solution\n\nSee [`LongestPalindromicSubsequence.java`](./LongestPalindromicSubsequence.java).\n\n```java\npublic static int longestPalindromeSubsequence(String s) {\n    int n = s.length();\n    if (n == 0) {\n        return 0;\n    }\n    int[][] dp = new int[n][n];\n    for (int i = 0; i < n; i++) {\n        dp[i][i] = 1;\n    }\n    for (int length = 2; length <= n; length++) {\n        for (int i = 0; i + length - 1 < n; i++) {\n            int j = i + length - 1;\n            if (s.charAt(i) == s.charAt(j)) {\n                dp[i][j] = 2 + dp[i + 1][j - 1];\n            } else {\n                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);\n            }\n        }\n    }\n    return dp[0][n - 1];\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n²) | n² table cells, each computed in O(1) |\n| **Space** | O(n²) | The table itself; can be squeezed to O(n) with a rolling array |\n\n**Space optimisation:** the transition only ever reads `dp[i+1][j-1]`, `dp[i+1][j]` and\n`dp[i][j-1]`, so a single rolling row (updated right-to-left) is enough — O(n) space.\nThe 2D version is kept here because the table *is* the explanation.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you get it down to O(n) space?"* → yes, roll the DP into one array, iterating\n  `i` from right to left and `j` from left to right.\n- *"Return the subsequence itself, not just its length?"* → store the choice in the\n  table (or backtrack from `dp[0][n-1]`, following whichever end was dropped).\n- *"How does this relate to LCS?"* → the longest palindromic subsequence of `s` is\n  the LCS of `s` and `reverse(s)`, but that trick is only correct when you forbid\n  using the same character twice — the interval DP above is always safe.\n- *"What about the longest palindromic **substring**?"* → expand around centres,\n  O(n²) time, O(1) space.\n\n**Common mistakes:**\n- ❌ Filling the table with `i` in the outer loop and `j` in the inner loop **without**\n  restricting `j ≥ i` → `dp[i+1][j-1]` is read before it is written.\n- ❌ Writing `dp[i][j] = 2 + dp[i+1][j-1]` when the ends **differ** → produces answers\n  that are too large.\n- ❌ Returning the length of the longest palindromic *substring* → subsequence answers\n  are often bigger (`"bbbab"` → 4, but the longest palindromic substring is `"bbb"` → 3).\n\n**How to narrate:**\n> "This is an interval DP. `dp[i][j]` is the longest palindromic subsequence inside\n> `s[i..j]`. If the ends match I can always use them and add two to the inside; if\n> they don\'t match, one of them has to go, so I take the max of the two smaller\n> ranges. I fill the table by increasing interval length so every dependency is\n> already computed. O(n²) time, O(n²) space — and I can roll it to O(n) space if\n> asked."\n\n## Related Problems\n\n- [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md) — the contiguous version\n- [Count and Say](../../../../../../docs/topics/02-strings.md) — another "expand a string" warm-up\n',i=[`longestPalindromeSubsequence`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};