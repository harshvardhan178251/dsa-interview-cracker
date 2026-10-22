var e=`dynamicprogramming.InterleavingString`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Interleaving String
 * LeetCode: 97 | Difficulty: Medium | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Decide whether the third string can be produced by interleaving the first two while keeping the relative order of the characters in each.
 *
 * <p>Input format (stdin):
 * <pre>
 * n m k
 * a
 * b
 * c
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2 2 4
 * ab
 * cd
 * acbd
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: The next character of the result comes either from the first string or from the second one.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class InterleavingString {

    /**
     * Decides whether {@code c} is an interleaving of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} is true when the first {@code i} characters of {@code a} and the first
     * {@code j} characters of {@code b} can be interleaved into the first {@code i + j} characters of
     * {@code c}. The last character comes either from {@code a} or from {@code b}.
     *
     * @param a the first string
     * @param b the second string
     * @param c the candidate interleaving
     * @return {@code true} when {@code c} is an interleaving of {@code a} and {@code b}
     */
    public static boolean isInterleave(String a, String b, String c) {
        int n = a.length();
        int m = b.length();
        if (n + m != c.length()) {
            return false; // the interleaving must use every character
        }

        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0 && a.charAt(i - 1) == c.charAt(i + j - 1) && dp[i - 1][j]) {
                    dp[i][j] = true;
                } else if (j > 0 && b.charAt(j - 1) == c.charAt(i + j - 1) && dp[i][j - 1]) {
                    dp[i][j] = true;
                }
            }
        }
        return dp[n][m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();
        int k = fs.nextInt();
        String a = fs.next();
        String b = fs.next();
        String c = fs.next();

        System.out.println(isInterleave(a, b, c) ? 1 : 0);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Interleaving String
 * LeetCode: 97 | Difficulty: Medium | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Decide whether the third string can be produced by interleaving the first two while keeping the relative order of the characters in each.
 *
 * <p>Input format (stdin):
 * <pre>
 * n m k
 * a
 * b
 * c
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2 2 4
 * ab
 * cd
 * acbd
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: The next character of the result comes either from the first string or from the second one.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class Main {

    /**
     * Decides whether {@code c} is an interleaving of {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} is true when the first {@code i} characters of {@code a} and the first
     * {@code j} characters of {@code b} can be interleaved into the first {@code i + j} characters of
     * {@code c}. The last character comes either from {@code a} or from {@code b}.
     *
     * @param a the first string
     * @param b the second string
     * @param c the candidate interleaving
     * @return {@code true} when {@code c} is an interleaving of {@code a} and {@code b}
     */
    public static boolean isInterleave(String a, String b, String c) {
        int n = a.length();
        int m = b.length();
        if (n + m != c.length()) {
            return false; // the interleaving must use every character
        }

        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0 && a.charAt(i - 1) == c.charAt(i + j - 1) && dp[i - 1][j]) {
                    dp[i][j] = true;
                } else if (j > 0 && b.charAt(j - 1) == c.charAt(i + j - 1) && dp[i][j - 1]) {
                    dp[i][j] = true;
                }
            }
        }
        return dp[n][m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();
        int k = fs.nextInt();
        String a = fs.next();
        String b = fs.next();
        String c = fs.next();

        System.out.println(isInterleave(a, b, c) ? 1 : 0);
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
`,r='\n# Interleaving String — LeetCode 97\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | 2-D DP · String DP |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft |\n\n## Problem Statement\n\nGiven strings `a`, `b` and `c`, decide whether `c` is an **interleaving** of `a` and `b`.\n\nAn interleaving keeps the relative order of the characters of `a` and of `b` — the characters of `c` are taken from the front of `a` or the front of `b`, in any order.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn m k\na\nb\nc\n```\n\n- `n` — length of the first string\n- `m` — length of the second string\n- `k` — length of the third string\n- `a`, `b`, `c` — the three strings (no spaces)\n\n## Sample Input\n\n```\n2 2 4\nab\ncd\nacbd\n```\n\n## Expected Output\n\n```\n1\n```\n\n`acbd` takes `a` from `a`, `c` from `b`, `b` from `a` and `d` from `b` → **1**.\n\n## Approach\n\n`dp[i][j]` = "the first `i` characters of `a` and the first `j` characters of `b` can be interleaved into the first `i + j` characters of `c`".\n\nThe **last** character of that prefix of `c` came from somewhere:\n\n- from `a`: `a[i-1] == c[i+j-1]` and the rest (`dp[i-1][j]`) was possible, or\n- from `b`: `b[j-1] == c[i+j-1]` and the rest (`dp[i][j-1]`) was possible.\n\n`dp[0][0] = true`, and the answer is `dp[n][m]`. A length check comes first: an interleaving must use every character of both strings, so `|a| + |b|` has to equal `|c|`.\n\nThe table can be rolled up into one row (`O(m)` space) — the same trick as the edit distance.\n\n## Dry Run\n\nInput: `a = "ab"`, `b = "cd"`, `c = "acbd"`.\n\n| | `""` | `c` | `cd` |\n|---|---|---|---|\n| `""` | true | false | false |\n| `a` | true | true | false |\n| `ab` | false | true | **true** |\n\nThe bottom-right cell is true → answer **1**.\n\n**Cell by cell** (`c = "acbd"`):\n\n| cell | last character of `c` comes from | computation | value |\n|---|---|---|---:|\n| `dp[0][0]` | — | base case | true |\n| `dp[0][1]` | `b[0]` = `c` vs `c[0]` = `a` | no match | false |\n| `dp[1][0]` | `a[0]` = `a` vs `c[0]` = `a` | match and `dp[0][0]` | true |\n| `dp[1][1]` | `b[0]` = `c` vs `c[1]` = `c` | match and `dp[1][0]` | true |\n| `dp[1][2]` | `c[2]` = `b` | `a[0]` ≠ `b`, `b[1]` = `d` ≠ `b` | false |\n| `dp[2][0]` | `a[1]` = `b` vs `c[1]` = `c` | no match | false |\n| `dp[2][1]` | `a[1]` = `b` vs `c[2]` = `b` | match and `dp[1][1]` | true |\n| `dp[2][2]` | `b[1]` = `d` vs `c[3]` = `d` | match and `dp[2][1]` | true |\n\n**The interleaving** `a b` + `c d` → `acbd`: take `a` from `a`, `c` from `b`, `b` from `a`, `d` from `b` ✓\n\n**The four interleavings** of `ab` and `cd` are `abcd`, `acbd`, `cadb` and `cbad`.\n\n## Java Solution\n\nSee [`InterleavingString.java`](./InterleavingString.java).\n\n```java\n    public static boolean isInterleave(String a, String b, String c) {\n        int n = a.length();\n        int m = b.length();\n        if (n + m != c.length()) {\n            return false;\n        }\n\n        boolean[][] dp = new boolean[n + 1][m + 1];\n        dp[0][0] = true;\n\n        for (int i = 0; i <= n; i++) {\n            for (int j = 0; j <= m; j++) {\n                if (i > 0 && a.charAt(i - 1) == c.charAt(i + j - 1) && dp[i - 1][j]) {\n                    dp[i][j] = true;\n                } else if (j > 0 && b.charAt(j - 1) == c.charAt(i + j - 1) && dp[i][j - 1]) {\n                    dp[i][j] = true;\n                }\n            }\n        }\n        return dp[n][m];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · m) | `(n + 1) × (m + 1)` cells, each `O(1)` |\n| **Space** | O(n · m) | the full `(n + 1) × (m + 1)` table is kept |\n\n**Space can be `O(m)`** by rolling the table into one row.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Can you print one of the interleavings?"* → keep the table and walk it backwards to recover the choices.\n- "What if the strings are very long?"* → the same DP with a rolled row, `O(m)` space.\n- "How is this different from the edit distance?"* → the edit distance allows deletions and replacements; here every character must be used, in order.\n- "What if `c` is shorter than `a` + `b`?"* → impossible, and the length check rejects it immediately.\n\n**Common mistakes:**\n\n- ❌ Comparing against `c[i-1]` instead of `c[i+j-1]` — the index of the last character depends on both prefixes.\n- ❌ Forgetting the length check `|a| + |b| == |c|`.\n- ❌ Using `&&` between the two "comes from" branches instead of `||`.\n\n**How to narrate:**\n\n> "`dp[i][j]` says whether the first `i` characters of `a` and the first `j` of `b` interleave into the first `i+j` characters of `c`. The last character came either from `a` — matched against `c[i+j-1]` with `dp[i-1][j]` — or from `b` with `dp[i][j-1]`. If either holds the cell is true, and the answer is `dp[n][m]`."\n\n## Related Problems\n\n- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — the same table shape\n- [Edit Distance — LeetCode 72](./EditDistance.java) — the string-DP baseline\n',i=[`isInterleave`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};