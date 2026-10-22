var e=`slidingwindow.LongestRepeatingSubstring`,t=`package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Repeating Substring
 * LeetCode: 1062 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Sliding window, Dynamic programming, String hashing
 *
 * <p>Problem:
 * Given a string {@code s}, return the length of the **longest substring that occurs at
 * least twice**. The two occurrences may overlap.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * banana
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: the answer is the longest pair of suffixes that share a common prefix. Define
 * {@code lcp(i, j)} as the length of the longest common prefix of the suffixes starting at
 * {@code i} and {@code j}. It satisfies
 * {@code lcp(i, j) = (s[i] == s[j]) ? 1 + lcp(i+1, j+1) : 0}. Rolling this DP into a
 * single array gives an O(n²) time, O(n) space solution.
 *
 * <p>Complexity: Time O(n²), Space O(n).
 */
public class LongestRepeatingSubstring {

    /**
     * Returns the length of the longest substring of {@code s} that appears at least twice.
     *
     * @param s the input string
     * @return the length of the longest repeating substring
     */
    public static int longestRepeatingSubstring(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        int best = 0;
        for (int i = n - 1; i >= 0; i--) {
            // Ascending j keeps dp[j + 1] on the previous row while dp[j] is rewritten.
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    dp[j] = dp[j + 1] + 1;
                    if (dp[j] > best) {
                        best = dp[j];
                    }
                } else {
                    dp[j] = 0;
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestRepeatingSubstring(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Longest Repeating Substring
 * LeetCode: 1062 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Sliding window, Dynamic programming, String hashing
 *
 * <p>Problem:
 * Given a string {@code s}, return the length of the **longest substring that occurs at
 * least twice**. The two occurrences may overlap.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * banana
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: the answer is the longest pair of suffixes that share a common prefix. Define
 * {@code lcp(i, j)} as the length of the longest common prefix of the suffixes starting at
 * {@code i} and {@code j}. It satisfies
 * {@code lcp(i, j) = (s[i] == s[j]) ? 1 + lcp(i+1, j+1) : 0}. Rolling this DP into a
 * single array gives an O(n²) time, O(n) space solution.
 *
 * <p>Complexity: Time O(n²), Space O(n).
 */
public class Main {

    /**
     * Returns the length of the longest substring of {@code s} that appears at least twice.
     *
     * @param s the input string
     * @return the length of the longest repeating substring
     */
    public static int longestRepeatingSubstring(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        int best = 0;
        for (int i = n - 1; i >= 0; i--) {
            // Ascending j keeps dp[j + 1] on the previous row while dp[j] is rewritten.
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    dp[j] = dp[j + 1] + 1;
                    if (dp[j] > best) {
                        best = dp[j];
                    }
                } else {
                    dp[j] = 0;
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestRepeatingSubstring(s));
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
`,r='\n# Longest Repeating Substring — LeetCode 1062\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Dynamic programming · Sliding window · String hashing |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |\n\n## Problem Statement\n\nGiven a string `s`, return the length of the **longest substring that occurs at least\ntwice**. The two occurrences may **overlap**.\n\n- `"banana"` → `3` (the substring `"ana"` appears at indices 1 and 3).\n- `"abcd"` → `0` (no substring repeats).\n- `"aaaa"` → `3` (the substring `"aaa"` appears at indices 0 and 1).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\n```\n\n- `s` — a non-empty string without whitespace (1 ≤ |s| ≤ 3·10⁴)\n\n## Sample Input\n\n```\nbanana\n```\n\n## Expected Output\n\n```\n3\n```\n\n## Approach — Longest common prefix of two suffixes\n\nA substring that occurs twice is a common prefix of two different suffixes of `s`. So the\nanswer is\n\n```\nmax over 0 <= i < j < n of  lcp(i, j)\n```\n\nwhere `lcp(i, j)` is the length of the longest common prefix of `s[i..]` and `s[j..]`.\n\n`lcp` satisfies a simple recurrence:\n\n```\nlcp(i, j) = (s[i] == s[j]) ? 1 + lcp(i + 1, j + 1) : 0\n```\n\nThis is a classic DP. Rolling it into a **single array** `dp` gives an O(n²) time, O(n)\nspace solution. The array is filled with `i` going **down** and `j` going **up**:\n\n- `i` descending means `dp[j + 1]` still holds `lcp(i + 1, j + 1)` when we read it;\n- `j` ascending means we overwrite `dp[j]` only *after* `dp[j + 1]` has been consumed.\n\n**Overlapping is allowed.** `lcp(1, 3)` for `"banana"` is `3`, even though the two `"ana"`\noccurrences share the index `3` — nothing in the definition forbids that.\n\n## Dry Run\n\nInput: `s = "banana"` (n = 6)\n\nThe DP rows are `i = 5, 4, 3, 2, 1, 0`; each row fills `j = i+1 .. n-1`.\n\n| row `i` | `s[i]` | `j` | `s[j]` | equal? | `dp[j+1]` (previous row) | `dp[j]` | best so far |\n|---:|---|---:|---|---|---:|---:|---:|\n| 5 | `a` | — | — | — | — | — | 0 |\n| 4 | `n` | 5 | `a` | no | — | 0 | 0 |\n| 3 | `a` | 4 | `n` | no | 0 | 0 | 0 |\n| 3 | `a` | 5 | `a` | **yes** | 0 | **1** | 1 |\n| 2 | `n` | 3 | `a` | no | 1 | 0 | 1 |\n| 2 | `n` | 4 | `n` | **yes** | 1 | **2** | 2 |\n| 2 | `n` | 5 | `a` | no | 1 | 0 | 2 |\n| 1 | `a` | 2 | `n` | no | 0 | 0 | 2 |\n| 1 | `a` | 3 | `a` | **yes** | 2 | **3** | **3** ✓ |\n| 1 | `a` | 4 | `n` | no | 2 | 0 | 3 |\n| 1 | `a` | 5 | `a` | **yes** | 0 | **1** | 3 |\n| 0 | `b` | 1–5 | `a n a n a` | no | — | 0 | 3 |\n\nThe winning cell is row `i = 1`, column `j = 3`: the suffixes `"anana"` and `"ana"` share\nthe prefix `"ana"`, so `dp[3] = 3`.\n\n**The ordering matters.** At row `i = 1`, `dp[4]` still holds the value written at row\n`i = 2` (`lcp(2, 4) = 2`), so `dp[3] = dp[4] + 1 = 3`. Had the inner loop run downwards,\n`dp[4]` would already have been reset to `0` in the current row and the answer would come\nout as `2`.\n\nFinal answer: **3** — the substring `"ana"` at indices 1 and 3.\n\n### The repeating substrings of `"banana"`\n\n| substring | length | occurrences (start indices) |\n|---|---:|---|\n| `a` | 1 | 1, 3, 5 |\n| `n` | 1 | 2, 4 |\n| `an` | 2 | 2, 4 |\n| `na` | 2 | 1, 3 |\n| `ana` | 3 | 1, 3 ✓ |\n| `nan` | 3 | — |\n| `anan` | 4 | — |\n| `anana` | 5 | — |\n\nThe longest is `"ana"` with length **3**.\n\n## Java Solution\n\nSee [`LongestRepeatingSubstring.java`](./LongestRepeatingSubstring.java).\n\n```java\npublic static int longestRepeatingSubstring(String s) {\n    int n = s.length();\n    int[] dp = new int[n + 1];\n    int best = 0;\n    for (int i = n - 1; i >= 0; i--) {\n        // Ascending j keeps dp[j + 1] on the previous row while dp[j] is rewritten.\n        for (int j = i + 1; j < n; j++) {\n            if (s.charAt(i) == s.charAt(j)) {\n                dp[j] = dp[j + 1] + 1;\n                if (dp[j] > best) {\n                    best = dp[j];\n                }\n            } else {\n                dp[j] = 0;\n            }\n        }\n    }\n    return best;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n²) | Every pair (i, j) with i < j is examined |\n| **Space** | O(n) | One DP row |\n\n**Alternative.** A rolling hash with binary search on the length gives O(n log n) time and\nO(n) space — better asymptotically, but hash collisions make it fiddly. Mention it as a\nfollow-up rather than the main solution.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you do better than O(n²)?"* → rolling hash + binary search on the answer, O(n log n);\n  or suffix-array / suffix-automaton techniques.\n- *"Do the occurrences have to be non-overlapping?"* → if they must not overlap, the answer\n  changes (e.g. `"aaa"` would be `1`, not `2`), and the DP needs a different guard.\n- *"Return the two start indices."* → keep the `(i, j)` pair that produced the maximum.\n- *"How does this relate to the longest common substring of two different strings?"* → it is\n  the same DP with the two strings kept apart.\n\n**Common mistakes:**\n- ❌ Iterating `j` **downwards** in the inner loop → `dp[j + 1]` has already been\n  overwritten in the current row, and the answer comes out too small (2 instead of 3 for\n  `"banana"`).\n- ❌ Requiring the two occurrences to be disjoint → the answer for `"banana"` is still 3.\n- ❌ Forgetting to reset `dp[j]` to `0` when the characters differ → stale values leak into\n  later rows.\n- ❌ Comparing `s.charAt(i)` with `s.charAt(j)` but storing into `dp[i]` instead of `dp[j]`.\n\n**How to narrate:**\n> "A repeating substring is a common prefix of two different suffixes, so I want the largest\n> `lcp(i, j)` over all `i < j`. The LCP obeys `lcp(i, j) = s[i] == s[j] ? 1 + lcp(i+1, j+1) : 0`,\n> which is a DP. I roll it into one array, iterating `i` downwards and `j` upwards so that\n> `dp[j + 1]` still holds the previous row when I read it — that\'s O(n²) time and O(n) space."\n\n## Related Problems\n\n- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — a different, single-window version\n- [Find All Anagrams in a String](./FindAllAnagramsInString.java) — sliding window over a string\n',i=[`longestRepeatingSubstring`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};