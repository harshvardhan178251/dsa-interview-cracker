var e=`dynamicprogramming.WildcardMatching`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Wildcard Matching
 * LeetCode: 44 | Difficulty: Hard | Frequency: 4/5
 * Pattern: 2-D DP, String DP, Greedy
 *
 * <p>Problem: Decide whether a string matches a pattern that may contain \`*\` (any sequence, including the empty one) and \`?\` (exactly one character).
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * p
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * adceb
 * *a*b
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: A \`*\` can swallow any number of characters, so the DP needs a second dimension for the pattern.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class WildcardMatching {

    /**
     * Decides whether the text {@code s} matches the wildcard pattern {@code p}.
     *
     * <p>{@code dp[i][j]} is true when the first {@code i} characters of {@code s} match the first
     * {@code j} characters of {@code p}. A {@code *} either matches nothing (keep the cell above) or
     * swallows one more character (keep the cell to the left).
     *
     * @param s the text
     * @param p the pattern
     * @return {@code true} when the pattern matches the whole text
     */
    public static boolean isMatch(String s, String p) {
        int n = s.length();
        int m = p.length();
        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int j = 1; j <= m; j++) {
            dp[0][j] = dp[0][j - 1] && p.charAt(j - 1) == '*';
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (pc == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = dp[i - 1][j - 1] && pc == s.charAt(i - 1);
                }
            }
        }
        return dp[n][m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String p = fs.next();

        System.out.println(isMatch(s, p) ? 1 : 0);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Wildcard Matching
 * LeetCode: 44 | Difficulty: Hard | Frequency: 4/5
 * Pattern: 2-D DP, String DP, Greedy
 *
 * <p>Problem: Decide whether a string matches a pattern that may contain \`*\` (any sequence, including the empty one) and \`?\` (exactly one character).
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * p
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * adceb
 * *a*b
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: A \`*\` can swallow any number of characters, so the DP needs a second dimension for the pattern.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class Main {

    /**
     * Decides whether the text {@code s} matches the wildcard pattern {@code p}.
     *
     * <p>{@code dp[i][j]} is true when the first {@code i} characters of {@code s} match the first
     * {@code j} characters of {@code p}. A {@code *} either matches nothing (keep the cell above) or
     * swallows one more character (keep the cell to the left).
     *
     * @param s the text
     * @param p the pattern
     * @return {@code true} when the pattern matches the whole text
     */
    public static boolean isMatch(String s, String p) {
        int n = s.length();
        int m = p.length();
        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int j = 1; j <= m; j++) {
            dp[0][j] = dp[0][j - 1] && p.charAt(j - 1) == '*';
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (pc == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = dp[i - 1][j - 1] && pc == s.charAt(i - 1);
                }
            }
        }
        return dp[n][m];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String p = fs.next();

        System.out.println(isMatch(s, p) ? 1 : 0);
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
`,r='\n# Wildcard Matching — LeetCode 44\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | 2-D DP · String DP · Greedy |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Facebook |\n\n## Problem Statement\n\nGiven an input string `s` and a pattern `p`, implement wildcard matching with support for:\n\n- `?` — matches any **single** character\n- `*` — matches any **sequence** of characters (including the empty sequence)\n\nReturn `true` when the whole string matches the whole pattern.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\np\n```\n\n- `s` — the text (1 ≤ |s| ≤ 2000)\n- `p` — the pattern (1 ≤ |p| ≤ 2000, only `*`, `?` and lower case letters)\n\n## Sample Input\n\n```\nadceb\n*a*b\n```\n\n## Expected Output\n\n```\n1\n```\n\nThe pattern `*a*b` matches `adceb`: the first `*` eats `d`, the `a` matches `a`, the second `*` eats `ce` and the `b` matches `b` → **1**.\n\n## Approach\n\n`dp[i][j]` = "the first `i` characters of `s` match the first `j` characters of `p`".\n\n- **Base case** `dp[0][0] = true` (empty matches empty).\n- **Empty text**: `dp[0][j]` is true only while the pattern consists of `*`s.\n- **Pattern character `?`**: it matches exactly one character → `dp[i][j] = dp[i-1][j-1]`.\n- **Pattern character a letter**: `dp[i][j] = dp[i-1][j-1] && letter == s[i-1]`.\n- **Pattern character `*`**: it either matches the empty string (`dp[i][j-1]`) or it swallows   `s[i-1]` and keeps matching the rest of the pattern (`dp[i-1][j]`).\n  `dp[i][j] = dp[i][j-1] || dp[i-1][j]`.\n\nThere is also an `O(n · m)` **greedy** solution with `O(1)` space: remember the last seen `*`, and when a mismatch happens, let the last `*` swallow one more character. It is shorter to write but much harder to prove — the DP is the safer interview answer.\n\n## Dry Run\n\nInput: `s = "adceb"`, `p = "*a*b"`.\n\n| | `""` | `*` | `*a` | `*a*` | `*a*b` |\n|---|---|---|---|---|---|\n| `""` | true | true | false | true | false |\n| `a` | false | true | true | true | false |\n| `ad` | false | true | false | true | false |\n| `adc` | false | true | false | true | false |\n| `adce` | false | true | false | true | false |\n| `adceb` | false | true | false | true | **true** |\n\nThe bottom-right cell is true → answer **1**.\n\n**The two ways a `*` can act.** At `dp[i][j]` with `p[j-1] == \'*\'`:\n\n- `dp[i][j-1]` — the `*` matches the empty string, so the rest of the pattern must already match   the same text prefix.\n- `dp[i-1][j]` — the `*` swallows `s[i-1]`, so the same pattern prefix has to match one character   less of the text.\n\n**Reading the match.** `*a*b` against `adceb`: the first `*` takes `d`, `a` takes `a`, the second `*` takes `ce`, `b` takes `b`.\n\n**A failing case.** `s = "aa"`, `p = "a"` → `dp[2][1]` is false (the text has one character too many) → answer 0.\n\n## Java Solution\n\nSee [`WildcardMatching.java`](./WildcardMatching.java).\n\n```java\n    public static boolean isMatch(String s, String p) {\n        int n = s.length();\n        int m = p.length();\n        boolean[][] dp = new boolean[n + 1][m + 1];\n        dp[0][0] = true;\n\n        for (int j = 1; j <= m; j++) {\n            dp[0][j] = dp[0][j - 1] && p.charAt(j - 1) == \'*\';\n        }\n\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= m; j++) {\n                char pc = p.charAt(j - 1);\n                if (pc == \'*\') {\n                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];\n                } else if (pc == \'?\') {\n                    dp[i][j] = dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = dp[i - 1][j - 1] && pc == s.charAt(i - 1);\n                }\n            }\n        }\n        return dp[n][m];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · m) | `(n + 1) × (m + 1)` cells, each `O(1)` |\n| **Space** | O(n · m) | the full `(n + 1) × (m + 1)` table is kept |\n\n**Space can be `O(m)`** by rolling the rows (the `*` case needs the cell above *and* the cell to the left, so one row plus one saved boolean is enough).\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Can you do it greedily?"* → yes: keep the last `*` position and the text position it was at, and on a mismatch let the `*` absorb one more character — `O(n·m)` time, `O(1)` space.\n- "What about `**` or a `[a-z]` character class?"* → a character class needs a set lookup per cell.\n- "What if the pattern has to match the **whole** string?"* → that is what `dp[n][m]` checks — returning `dp[n][j]` would wrongly allow a trailing pattern.\n- "How does this relate to regex matching?"* → see [Regex Matching](./RegexMatching.java), which adds `+` and parentheses.\n\n**Common mistakes:**\n\n- ❌ Forgetting the `dp[0][j]` initialisation for a pattern that starts with `*`s.\n- ❌ Implementing `*` as "matches exactly one character" (that is `?`).\n- ❌ Using `dp[i][j-1] && dp[i-1][j]` instead of `||` — a `*` may do either.\n\n**How to narrate:**\n\n> "`dp[i][j]` says whether the first `i` characters of the text match the first `j` characters of the pattern. A literal or `?` consumes one character from both sides. A `*` is the interesting one: it either matches nothing, which is the cell to the left, or it swallows one more character, which is the cell above — so the cell is the OR of those two. That is `O(n·m)`."\n\n## Related Problems\n\n- [Regex Matching — LeetCode 10](./RegexMatching.java) — the richer grammar\n- [Edit Distance — LeetCode 72](./EditDistance.java) — the same table shape\n',i=[`isMatch`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};