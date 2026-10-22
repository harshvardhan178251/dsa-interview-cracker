var e=`dynamicprogramming.DistinctSubsequences`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Distinct Subsequences
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Counting DP, Prefix DP
 *
 * <p>Problem: Count the ways to pick indices from a string so that the characters read in order spell a given target string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * babgbag
 * bag
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: Sweep the source string; whenever a character matches the next target character, extend every way that was already possible.
 *
 * <p>Complexity: Time O(n x m), Space O(m).
 */
public class DistinctSubsequences {

    /**
     * Counts the ways to choose indices from {@code s} that spell {@code t}.
     *
     * <p>{@code dp[j]} = the number of ways to form the first {@code j} characters of {@code t} using
     * the part of {@code s} processed so far. The loop over {@code j} runs **downwards** so that the
     * current character of {@code s} is used at most once.
     *
     * @param s the source string
     * @param t the target string
     * @return the number of index selections that spell {@code t}
     */
    public static int countDistinctSubsequences(String s, String t) {
        int m = t.length();
        int[] dp = new int[m + 1];
        dp[0] = 1; // one way to form the empty target: pick nothing

        for (int i = 0; i < s.length(); i++) {
            for (int j = m; j >= 1; j--) {
                if (s.charAt(i) == t.charAt(j - 1)) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(countDistinctSubsequences(s, t));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Distinct Subsequences
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Counting DP, Prefix DP
 *
 * <p>Problem: Count the ways to pick indices from a string so that the characters read in order spell a given target string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * babgbag
 * bag
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: Sweep the source string; whenever a character matches the next target character, extend every way that was already possible.
 *
 * <p>Complexity: Time O(n x m), Space O(m).
 */
public class Main {

    /**
     * Counts the ways to choose indices from {@code s} that spell {@code t}.
     *
     * <p>{@code dp[j]} = the number of ways to form the first {@code j} characters of {@code t} using
     * the part of {@code s} processed so far. The loop over {@code j} runs **downwards** so that the
     * current character of {@code s} is used at most once.
     *
     * @param s the source string
     * @param t the target string
     * @return the number of index selections that spell {@code t}
     */
    public static int countDistinctSubsequences(String s, String t) {
        int m = t.length();
        int[] dp = new int[m + 1];
        dp[0] = 1; // one way to form the empty target: pick nothing

        for (int i = 0; i < s.length(); i++) {
            for (int j = m; j >= 1; j--) {
                if (s.charAt(i) == t.charAt(j - 1)) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(countDistinctSubsequences(s, t));
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
`,r='\n# Distinct Subsequences\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Counting DP · Prefix DP |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Adobe |\n\n## Problem Statement\n\nGiven a source string `s` and a target string `t`, count how many ways there are to choose indices `i₁ < i₂ < … < iₖ` from `s` such that `s[i₁] s[i₂] … s[iₖ] = t`.\n\nDifferent index selections count as different ways, even when they spell the same string.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\nt\n```\n\n- `s` — the source string (1 ≤ |s| ≤ 1000)\n- `t` — the target string (1 ≤ |t| ≤ 1000)\n\n## Sample Input\n\n```\nbabgbag\nbag\n```\n\n## Expected Output\n\n```\n5\n```\n\nThe index triples that spell `b`,`a`,`g` in order are `(0,1,3)`, `(0,1,6)`, `(0,5,6)`, `(2,5,6)` and `(4,5,6)` → **5** ways.\n\n## Approach\n\nThis is the classic **subsequence counting** DP:\n\n1. `dp[j]` = the number of ways to form `t[0 .. j-1]` from the prefix of `s` processed so far.\n2. `dp[0] = 1` — there is exactly one way to form the empty target: choose nothing.\n3. For every character `c` of `s` and every `j` (going **downwards**), if `c == t[j-1]` then\n   `dp[j] += dp[j-1]`: every way of forming the shorter prefix can be extended with this    character.\n4. The answer is `dp[m]`.\n\n**Why downwards?** The inner loop must read the value of `dp[j-1]` from *before* the current character of `s` was taken. Going upwards would allow the same character to be used twice, which counts the wrong thing.\n\nThe same recurrence with a **set** instead of a count answers "how many *distinct* subsequence strings does `s` have" — that variant needs the "last occurrence" correction.\n\n## Dry Run\n\nInput: `s = "babgbag"`, `t = "bag"`.\n\n| `s[i]` | matching `j` values | `dp` after the step |\n|---:|---|---|\n| `b` | j = 1 | `[1, 1, 0, 0]` |\n| `a` | j = 2 | `[1, 1, 1, 0]` |\n| `b` | j = 1 | `[1, 2, 1, 0]` |\n| `g` | j = 3 | `[1, 2, 1, 1]` |\n| `b` | j = 1 | `[1, 3, 1, 1]` |\n| `a` | j = 2 | `[1, 3, 4, 1]` |\n| `g` | j = 3 | `[1, 3, 4, 5]` |\n\n`dp[3] = 5` → answer **5**.\n\n**The five ways** (indices into `s = b a b g b a g`):\n\n| way | indices | letters |\n|---:|---|---|\n| 1 | 0, 1, 3 | b a g |\n| 2 | 0, 1, 6 | b a g |\n| 3 | 0, 5, 6 | b a g |\n| 4 | 2, 5, 6 | b a g |\n| 5 | 4, 5, 6 | b a g |\n\n**The last step in detail** (`s[6] = \'g\'`): `dp[3] += dp[2]` → `1 + 4 = 5`, because the four ways to spell `ba` (using indices up to 5) can each be finished with the `g` at index 6.\n\n**Why the loop goes downwards.** If `j` went upwards, the `g` at index 6 could be used twice in the same pass and the counts would be far too large.\n\n## Java Solution\n\nSee [`DistinctSubsequences.java`](./DistinctSubsequences.java).\n\n```java\n    public static int countDistinctSubsequences(String s, String t) {\n        int m = t.length();\n        int[] dp = new int[m + 1];\n        dp[0] = 1;\n\n        for (int i = 0; i < s.length(); i++) {\n            for (int j = m; j >= 1; j--) {\n                if (s.charAt(i) == t.charAt(j - 1)) {\n                    dp[j] += dp[j - 1];\n                }\n            }\n        }\n        return dp[m];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · m) | `n` characters of `s`, each scanning `m` target positions |\n| **Space** | O(m) | the `dp` array holds `m + 1` entries |\n\n**Space `O(m)`.** A two-dimensional table `dp[i][j]` (prefix of `s` × prefix of `t`) is the same computation with `O(n·m)` space — the one-dimensional version is its rolled-up form.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Count the **distinct** subsequence strings instead of the index selections."* → use the "last occurrence" correction so that two selections producing the same string count once.\n- "How many subsequences does `s` have in total?"* → `2ⁿ` minus the empty one, or the classic `dp[i] = 2·dp[i-1] − dp[last(s[i]) − 1]` trick.\n- "What if `t` is longer than `s`?"* → the answer is `0`; the DP handles it without a special case.\n- "Can you do it in `O(n + m)`?"* → not for arbitrary alphabets; `O(n·m)` is the standard bound.\n\n**Common mistakes:**\n\n- ❌ Iterating `j` upwards — the same character of `s` would be used more than once.\n- ❌ Forgetting `dp[0] = 1` — the empty target has exactly one realisation.\n- ❌ Counting *distinct strings* when the problem asks for index selections (or the other way round).\n\n**How to narrate:**\n\n> "`dp[j]` counts the ways to spell the first `j` characters of the target using the prefix of the source seen so far. When a character of the source matches `t[j-1]` I add `dp[j-1]` to `dp[j]` — every way of spelling the shorter prefix can be extended with it. The inner loop runs downwards so that the current character is used at most once."\n\n## Related Problems\n\n- [Decode Ways — LeetCode 91](./DecodeWays.java) — the same counting DP over digits\n- [Word Break — LeetCode 139](./WordBreak.java) — existence instead of counting\n',i=[`countDistinctSubsequences`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};