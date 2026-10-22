var e=`dynamicprogramming.EditDistance`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Edit Distance
 * LeetCode: 72 | Difficulty: Medium | Frequency: 5/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the minimum number of single-character insertions, deletions or replacements needed to turn the first string into the second.
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
 * horse
 * ros
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Compare prefixes: either the last characters match (no edit) or one of the three edit operations is applied to the last character.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class EditDistance {

    /**
     * Returns the Levenshtein distance between {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the minimum number of edits that turn {@code a[0 .. i-1]} into
     * {@code b[0 .. j-1]}. When the last characters are equal nothing has to change; otherwise the
     * cheapest of insert / delete / replace decides.
     *
     * @param a the source string
     * @param b the target string
     * @return the minimum number of edits
     */
    public static int minDistance(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = i; // turn a prefix of a into "" -- i deletions
        }
        for (int j = 0; j <= m; j++) {
            dp[0][j] = j; // turn "" into a prefix of b -- j insertions
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                            Math.min(dp[i - 1][j],    // delete a[i-1]
                                    dp[i][j - 1]),   // insert b[j-1]
                            dp[i - 1][j - 1]);      // replace a[i-1] with b[j-1]
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

        System.out.println(minDistance(a, b));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Edit Distance
 * LeetCode: 72 | Difficulty: Medium | Frequency: 5/5
 * Pattern: 2-D DP, String DP
 *
 * <p>Problem: Return the minimum number of single-character insertions, deletions or replacements needed to turn the first string into the second.
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
 * horse
 * ros
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Compare prefixes: either the last characters match (no edit) or one of the three edit operations is applied to the last character.
 *
 * <p>Complexity: Time O(n x m), Space O(n x m).
 */
public class Main {

    /**
     * Returns the Levenshtein distance between {@code a} and {@code b}.
     *
     * <p>{@code dp[i][j]} = the minimum number of edits that turn {@code a[0 .. i-1]} into
     * {@code b[0 .. j-1]}. When the last characters are equal nothing has to change; otherwise the
     * cheapest of insert / delete / replace decides.
     *
     * @param a the source string
     * @param b the target string
     * @return the minimum number of edits
     */
    public static int minDistance(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = i; // turn a prefix of a into "" -- i deletions
        }
        for (int j = 0; j <= m; j++) {
            dp[0][j] = j; // turn "" into a prefix of b -- j insertions
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                            Math.min(dp[i - 1][j],    // delete a[i-1]
                                    dp[i][j - 1]),   // insert b[j-1]
                            dp[i - 1][j - 1]);      // replace a[i-1] with b[j-1]
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

        System.out.println(minDistance(a, b));
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
`,r='\n# Edit Distance — LeetCode 72\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | 2-D DP · String DP |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |\n\n## Problem Statement\n\nGiven two strings `a` and `b`, return the minimum number of **edit operations** needed to transform `a` into `b`.\n\nThe operations are:\n\n- **insert** a character\n- **delete** a character\n- **replace** a character with another one\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn m\na\nb\n```\n\n- `n` — length of the first string (1 ≤ n ≤ 500)\n- `m` — length of the second string (1 ≤ m ≤ 500)\n- `a` — the first string (no spaces)\n- `b` — the second string (no spaces)\n\n## Sample Input\n\n```\n5 3\nhorse\nros\n```\n\n## Expected Output\n\n```\n3\n```\n\n`horse` → `ros` needs three edits: `horse` → `rorse` (replace `h`→`r`) → `rose` (delete `r`) → `ros` (delete `e`). The minimum is **3**.\n\n## Approach\n\nThe DP is over **prefixes**, exactly like the LCS problem, but the cell now stores a cost instead of a length:\n\n`dp[i][j]` = the minimum edits that turn `a[0 .. i-1]` into `b[0 .. j-1]`.\n\n- If `a[i-1] == b[j-1]` the last characters already match: `dp[i][j] = dp[i-1][j-1]`.\n- Otherwise try the three operations, each of which costs one edit:\n  - delete `a[i-1]` → `dp[i-1][j]`,\n  - insert `b[j-1]` → `dp[i][j-1]`,\n  - replace `a[i-1]` by `b[j-1]` → `dp[i-1][j-1]`.\n  `dp[i][j] = 1 + min(...)`.\n\nBase cases: `dp[i][0] = i` (delete everything) and `dp[0][j] = j` (insert everything).\n\n## Dry Run\n\nInput: `a = "horse"`, `b = "ros"`. Rows are prefixes of `a`, columns prefixes of `b`.\n\n| | `""` | `r` | `ro` | `ros` |\n|---|---:|---:|---:|---:|\n| `""` | 0 | 1 | 2 | 3 |\n| `h` | 1 | 1 | 2 | 3 |\n| `ho` | 2 | 2 | 1 | 2 |\n| `hor` | 3 | 2 | 2 | 2 |\n| `hors` | 4 | 3 | 3 | 2 |\n| `horse` | 5 | 4 | 4 | **3** |\n\nThe bottom-right cell holds **3** → answer **3**.\n\n**The three interesting cells.**\n\n| cell | characters | computation | value |\n|---|---|---|---:|\n| `dp[2][2]` | `o` vs `o` | equal → `dp[1][1] = 1` | 1 |\n| `dp[3][3]` | `r` vs `s` | differ → `1 + min(dp[2][3]=2, dp[3][2]=2, dp[2][2]=1)` | 2 |\n| `dp[5][3]` | `e` vs `s` | differ → `1 + min(dp[4][3]=2, dp[5][2]=4, dp[4][2]=3)` | 3 |\n\n**An optimal alignment**\n\n```\nh o r s e\n  r o s\n```\n\n`h` is deleted, `o` matches, `r` is deleted, `s` matches, `e` is deleted → three deletions.\n\n## Java Solution\n\nSee [`EditDistance.java`](./EditDistance.java).\n\n```java\n    public static int minDistance(String a, String b) {\n        int n = a.length();\n        int m = b.length();\n        int[][] dp = new int[n + 1][m + 1];\n\n        for (int i = 0; i <= n; i++) {\n            dp[i][0] = i;\n        }\n        for (int j = 0; j <= m; j++) {\n            dp[0][j] = j;\n        }\n\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= m; j++) {\n                if (a.charAt(i - 1) == b.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = 1 + Math.min(\n                            Math.min(dp[i - 1][j], dp[i][j - 1]),\n                            dp[i - 1][j - 1]);\n                }\n            }\n        }\n        return dp[n][m];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · m) | `(n + 1) × (m + 1)` cells, each `O(1)` |\n| **Space** | O(n · m) | the full `(n + 1) × (m + 1)` table is kept |\n\n**Space can be `O(m)`** by keeping one row plus the saved diagonal. The same trick gives `O(min(n, m))` space by swapping the strings so the rolled row is the shorter one.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Can you reconstruct the edit script?"* → keep the table and walk backwards, emitting insert / delete / replace operations.\n- "What if only insertions and deletions are allowed?"* → the answer is `n + m - 2 · LCS(a, b)`.\n- "How is this related to the LCS?"* → `editDistance = n + m - 2 · LCS` when only insert and delete are allowed; with replacements the DP is needed.\n- "What about a weighted edit distance?"* → give each operation its own cost in the `min`.\n\n**Common mistakes:**\n\n- ❌ Forgetting that the base cases are `i` and `j`, not `0` — an empty string still needs edits.\n- ❌ Adding `1` when the characters match (that edit is free).\n- ❌ Using `dp[i-1][j-1]` only — that misses the insert and delete options.\n\n**How to narrate:**\n\n> "`dp[i][j]` is the minimum edits to turn the first `i` characters of `a` into the first `j` of `b`. If the last characters match I take the diagonal for free; otherwise I try delete, insert and replace and add one to the cheapest. That is `O(n·m)` and I can roll it into a single row."\n\n## Related Problems\n\n- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — the same table shape\n- [Decode Ways — LeetCode 91](./DecodeWays.java) — prefix DP over strings\n',i=[`minDistance`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};