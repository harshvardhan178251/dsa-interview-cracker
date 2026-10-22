var e=`dynamicprogramming.PalindromicSubstrings`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Palindromic Substrings
 * LeetCode: 647 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Interval DP, Expand around the centre
 *
 * <p>Problem: Count the palindromic **substrings** of a string -- every occurrence is counted, so \`"aaa"\` has six.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aaa
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: A palindrome is a palindrome when its ends match and the inside is a palindrome -- so one table answers everything.
 *
 * <p>Complexity: Time O(n^2), Space O(n^2).
 */
public class PalindromicSubstrings {

    /**
     * Counts the palindromic substrings of {@code s} (occurrences, not distinct values).
     *
     * <p>{@code dp[i][j]} is true when {@code s[i .. j]} is a palindrome. Such a substring is a
     * palindrome when its two ends are equal and either the inside is a palindrome or the two ends are
     * adjacent.
     *
     * @param s the input string
     * @return the number of palindromic substrings
     */
    public static int countSubstrings(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        int count = 0;

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    count++;
                }
            }
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(countSubstrings(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Palindromic Substrings
 * LeetCode: 647 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Interval DP, Expand around the centre
 *
 * <p>Problem: Count the palindromic **substrings** of a string -- every occurrence is counted, so \`"aaa"\` has six.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aaa
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: A palindrome is a palindrome when its ends match and the inside is a palindrome -- so one table answers everything.
 *
 * <p>Complexity: Time O(n^2), Space O(n^2).
 */
public class Main {

    /**
     * Counts the palindromic substrings of {@code s} (occurrences, not distinct values).
     *
     * <p>{@code dp[i][j]} is true when {@code s[i .. j]} is a palindrome. Such a substring is a
     * palindrome when its two ends are equal and either the inside is a palindrome or the two ends are
     * adjacent.
     *
     * @param s the input string
     * @return the number of palindromic substrings
     */
    public static int countSubstrings(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        int count = 0;

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    count++;
                }
            }
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(countSubstrings(s));
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
`,r='\n# Palindromic Substrings — LeetCode 647\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Interval DP · Expand around the centre |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nGiven a string `s`, count the number of **palindromic substrings**.\n\nOccurrences are counted separately: in `"aaa"` the substring `"aa"` occurs twice, so the answer is `3 × "a"` + `2 × "aa"` + `1 × "aaa"` = `6`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\n```\n\n- `s` — the string (1 ≤ |s| ≤ 1000, lower case letters)\n\n## Sample Input\n\n```\naaa\n```\n\n## Expected Output\n\n```\n6\n```\n\n`"aaa"` contains the palindromes `a`, `a`, `a`, `aa`, `aa` and `aaa` → **6**.\n\n## Approach\n\nTwo classic routes lead to the same answer.\n\n**1. Interval DP (used here).** `dp[i][j]` = "is `s[i .. j]` a palindrome?".\n\n`dp[i][j] = (s[i] == s[j]) && (j - i < 2 || dp[i+1][j-1])`\n\nThe inside of a palindrome is a palindrome, and a substring of length 1 or 2 needs no inside check. Every `true` cell is one palindromic substring. The table is filled from the bottom-left so that `dp[i+1][j-1]` is always known.\n\n**2. Expand around the centre.** Every palindrome has a centre (a character or a gap). For each centre, expand outwards while the characters match. That is `O(n²)` time and `O(1)` space, and it is usually the shorter interview answer.\n\n## Dry Run\n\nInput: `s = "aaa"`. Every `true` cell is one palindromic occurrence.\n\n| | `a[0]` | `a[1]` | `a[2]` |\n|---|---|---|---|\n| `a[0]` | **true** | **true** | **true** |\n| `a[1]` | — | **true** | **true** |\n| `a[2]` | — | — | **true** |\n\nSix `true` cells → answer **6**.\n\n**Cell by cell** (`s = "aaa"`):\n\n| cell | length | ends equal? | inside a palindrome? | value |\n|---|---|---|---|---|\n| `dp[2][2]` | 1 | `a` = `a` | length < 3 → no check | **true** |\n| `dp[1][1]` | 1 | `a` = `a` | length < 3 → no check | **true** |\n| `dp[1][2]` | 2 | `a` = `a` | length < 3 → no check | **true** |\n| `dp[0][0]` | 1 | `a` = `a` | length < 3 → no check | **true** |\n| `dp[0][1]` | 2 | `a` = `a` | length < 3 → no check | **true** |\n| `dp[0][2]` | 3 | `a` = `a` | `dp[1][1]` = true | **true** |\n\n**The six palindromes** are `a`(0), `a`(1), `a`(2), `aa`(0-1), `aa`(1-2), `aaa`(0-2).\n\n**Expand-around-the-centre version** — centres `a`(0), gap, `a`(1), gap, `a`(2), gap give the same six palindromes.\n\n## Java Solution\n\nSee [`PalindromicSubstrings.java`](./PalindromicSubstrings.java).\n\n```java\n    public static int countSubstrings(String s) {\n        int n = s.length();\n        boolean[][] dp = new boolean[n][n];\n        int count = 0;\n\n        for (int i = n - 1; i >= 0; i--) {\n            for (int j = i; j < n; j++) {\n                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || dp[i + 1][j - 1])) {\n                    dp[i][j] = true;\n                    count++;\n                }\n            }\n        }\n        return count;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n²) | `n(n + 1) / 2` cells, each `O(1)` |\n| **Space** | O(n²) | the full `n × n` table is kept |\n\n**Space can be `O(1)`** with the expand-around-the-centre approach, and `O(n)` with a rolled row (only `dp[i+1][j-1]` is needed).\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Count only the **distinct** palindromic substrings."* → use a set, or the eertree / Manacher algorithm.\n- "Find the **longest** palindromic substring."* → expand around the centre and remember the best, or a rolled DP.\n- "Count the palindromic **subsequences** instead."* → a different DP (`O(n²)`), which also has the `O(2ⁿ)` brute force to contrast with.\n- "Can you do it in `O(n)`?"* → Manacher\'s algorithm computes all palindrome radii in linear time.\n\n**Common mistakes:**\n\n- ❌ Counting **distinct** palindromes instead of occurrences — `"aaa"` gives 6, not 3.\n- ❌ Forgetting the `j - i < 2` case (substrings of length 1 and 2 have no inside).\n- ❌ Filling the table in the wrong direction and reading an uncomputed `dp[i+1][j-1]`.\n\n**How to narrate:**\n\n> "A substring is a palindrome when its ends are equal and its inside is a palindrome, so I keep a table `dp[i][j]`. Length one and two need no inside check. Every `true` cell is one palindromic occurrence, and I count them as I fill the table. The alternative is expanding around each centre, which needs no table at all."\n\n## Related Problems\n\n- [Longest Common Substring — LeetCode 718](./LongestCommonSubstring.java) — the same interval table\n- [Decode Ways — LeetCode 91](./DecodeWays.java) — string DP\n',i=[`countSubstrings`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};