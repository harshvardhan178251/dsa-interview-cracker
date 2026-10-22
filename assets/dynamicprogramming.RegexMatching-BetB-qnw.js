var e=`dynamicprogramming.RegexMatching`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Regular Expression Matching
 * LeetCode: 10 | Difficulty: Hard | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Implement regular expression matching with \`.\` (any single character) and \`*\` (zero or more of the preceding element).
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
 * <p>Approach: A \`*\` always belongs to the element before it, so the DP either skips that element entirely or lets it swallow one more character.
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
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Regular Expression Matching
 * LeetCode: 10 | Difficulty: Hard | Frequency: 4/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Implement regular expression matching with \`.\` (any single character) and \`*\` (zero or more of the preceding element).
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
 * <p>Approach: A \`*\` always belongs to the element before it, so the DP either skips that element entirely or lets it swallow one more character.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class Main {

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
`,r='\n# Regular Expression Matching — LeetCode 10\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | 2-D DP · String DP |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft |\n\n## Problem Statement\n\nImplement regular expression matching for a text `s` and a pattern `p` with full support of:\n\n- `.` — matches any single character\n- `*` — matches zero or more of the element that precedes it\n\nThe matching must cover the **entire** input string (not a partial match).\n\nExamples: `"aa"` matches `"a"`, `"aa"` matches `"a*"` and `"ab"` does **not** match `"a*"`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\np\n```\n\n- `s` — the text (1 ≤ |s| ≤ 20)\n- `p` — the pattern (1 ≤ |p| ≤ 20, only lower case letters, `.` and `*`)\n\n## Sample Input\n\n```\naab\nc*a*b\n```\n\n## Expected Output\n\n```\n1\n```\n\n`c*` matches the empty string, `a` matches the first `a`, `a*` matches the second `a` and `b` matches the `b` → **1**.\n\n## Approach\n\n`dp[i][j]` = "the first `i` characters of `s` match the first `j` characters of `p`".\n\n**Without a `*`:** the last characters must match (`p[j-1]` is a literal or `.`), and the rest must match too:\n\n`dp[i][j] = matches(s[i-1], p[j-1]) && dp[i-1][j-1]`\n\n**With a `*` at `p[j-1]`:** the `*` belongs to the element `p[j-2]`, so there are two cases:\n\n1. the element matches **zero** times → `dp[i][j-2]`;\n2. the element matches **one more** time → `matches(s[i-1], p[j-2]) && dp[i-1][j]`.\n\n`dp[i][j] = dp[i][j-2] || (matches(s[i-1], p[j-2]) && dp[i-1][j])`\n\n**Base cases.** `dp[0][0] = true`; an empty text matches a pattern such as `a*b*` because each `x*` group can match zero times, so `dp[0][j] = dp[0][j-2]` whenever `p[j-1] == \'*\'`.\n\n## Dry Run\n\nInput: `s = "aab"`, `p = "c*a*b"`.\n\n| | `""` | `c` | `c*` | `c*a` | `c*a*` | `c*a*b` |\n|---|---|---|---|---|---|---|\n| `""` | true | false | true | false | true | false |\n| `a` | false | false | false | true | true | false |\n| `aa` | false | false | false | false | true | false |\n| `aab` | false | false | false | false | false | **true** |\n\nThe bottom-right cell is true → answer **1**.\n\n**The two ways a `*` can act** (at `dp[i][j]` with `p[j-1] == \'*\'`):\n\n| case | meaning | cell |\n|---|---|---|\n| zero occurrences | `p[j-2]` matches nothing | `dp[i][j-2]` |\n| one more occurrence | `p[j-2]` matches `s[i-1]` | `matches(s[i-1], p[j-2]) && dp[i-1][j]` |\n\n**The last cell in detail** (`dp[3][5]`, `p[4] = \'*\'`):\n\n| case | check | value |\n|---|---|---|\n| zero | `dp[3][3]` = false (`c*a` cannot match `aab`) | false |\n| one more | `p[3] = \'a\'` matches `s[2] = \'b\'`? no | false |\n\nSo `dp[3][5]` is false — but the answer comes from `dp[3][6]`:\n\n| cell | check | value |\n|---|---|---|\n| `dp[3][6]` (literal `b`) | `p[5] = \'b\'` matches `s[2] = \'b\'` and `dp[2][5]` = true | **true** |\n\nThe match is `c*` (empty) + `a` + `a*` (one `a`) + `b` ✓\n\n## Java Solution\n\nSee [`RegexMatching.java`](./RegexMatching.java).\n\n```java\n    public static boolean isMatch(String s, String p) {\n        int n = s.length();\n        int m = p.length();\n        boolean[][] dp = new boolean[n + 1][m + 1];\n        dp[0][0] = true;\n\n        for (int j = 1; j <= m; j++) {\n            if (p.charAt(j - 1) == \'*\' && j >= 2) {\n                dp[0][j] = dp[0][j - 2];\n            }\n        }\n\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= m; j++) {\n                char pc = p.charAt(j - 1);\n                if (pc == \'*\') {\n                    boolean zero = j >= 2 && dp[i][j - 2];\n                    boolean more = j >= 2 && matches(s.charAt(i - 1), p.charAt(j - 2)) && dp[i - 1][j];\n                    dp[i][j] = zero || more;\n                } else {\n                    dp[i][j] = matches(s.charAt(i - 1), pc) && dp[i - 1][j - 1];\n                }\n            }\n        }\n        return dp[n][m];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · m) | `(n + 1) × (m + 1)` cells, each `O(1)` |\n| **Space** | O(n · m) | the full `(n + 1) × (m + 1)` table is kept |\n\n**Space can be `O(m)`** by rolling the rows — the `*` case needs `dp[i][j-2]` and `dp[i-1][j]`, so two rows are enough.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if the pattern may contain `+` and `?`?"* → they are easy: `+` is `*` with a mandatory first occurrence, `?` is "zero or one".\n- "What about parentheses and alternation?"* → the state needs a stack of sub-expressions — that is the full regex engine.\n- "Can you match a whole file against a pattern?"* → the same idea, but the pattern is compiled into a state machine (Thompson\'s construction) instead of a table.\n- "Why is the empty text matched by `c*a*b`?"* → no: `dp[0][6]` is false, because the trailing `b` needs a character.\n\n**Common mistakes:**\n\n- ❌ Treating `*` as a standalone wildcard (it belongs to the element **before** it).\n- ❌ Forgetting the `dp[0][j]` base cases for patterns like `a*b*`.\n- ❌ Using `dp[i][j-1]` instead of `dp[i][j-2]` in the "zero occurrences" case.\n- ❌ Allowing a partial match — the answer must be `dp[n][m]`.\n\n**How to narrate:**\n\n> "`dp[i][j]` is whether the first `i` characters of the text match the first `j` characters of the pattern. Without a star the last characters simply have to match. With a star the star belongs to the previous element, and there are two possibilities: that element matches zero times, so I jump two columns back, or it matches one more character, so I stay in the same column and go one row up. The answer is `dp[n][m]` — the whole text has to match."\n\n## Related Problems\n\n- [Wildcard Matching — LeetCode 44](./WildcardMatching.java) — the same table with `?` instead of `*`\n- [Edit Distance — LeetCode 72](./EditDistance.java) — the other classic string DP\n',i=[`isMatch`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};