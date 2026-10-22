var e=`dynamicprogramming.DecodeWays`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Decode Ways
 * LeetCode: 91 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix DP, String DP
 *
 * <p>Problem: Count the ways to decode a digit string where \`A\`->\`1\`, \`B\`->\`2\`, ..., \`Z\`->\`26\`. A \`0\` may only appear as part of \`10\` or \`20\`.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 226
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: At every position either take one digit or take two -- as long as the digits form a valid code.
 *
 * <p>Complexity: Time O(|s|), Space O(|s|).
 */
public class DecodeWays {

    /**
     * Counts how many ways the digit string {@code s} can be decoded.
     *
     * <p>{@code dp[i]} = the number of decodings of the first {@code i} characters. The last letter
     * consumes either one digit ({@code 1}..{@code 9}) or two digits ({@code 10}..{@code 26}).
     *
     * @param s the digit string
     * @return the number of decodings, {@code 0} when the string cannot be decoded
     */
    public static int decodeWays(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1; // one way to decode the empty prefix

        for (int i = 1; i <= n; i++) {
            if (s.charAt(i - 1) != '0') {
                dp[i] += dp[i - 1]; // a single digit 1..9
            }
            if (i >= 2) {
                int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
                if (two >= 10 && two <= 26) {
                    dp[i] += dp[i - 2]; // a two digit code 10..26
                }
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(decodeWays(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Decode Ways
 * LeetCode: 91 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix DP, String DP
 *
 * <p>Problem: Count the ways to decode a digit string where \`A\`->\`1\`, \`B\`->\`2\`, ..., \`Z\`->\`26\`. A \`0\` may only appear as part of \`10\` or \`20\`.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 226
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: At every position either take one digit or take two -- as long as the digits form a valid code.
 *
 * <p>Complexity: Time O(|s|), Space O(|s|).
 */
public class Main {

    /**
     * Counts how many ways the digit string {@code s} can be decoded.
     *
     * <p>{@code dp[i]} = the number of decodings of the first {@code i} characters. The last letter
     * consumes either one digit ({@code 1}..{@code 9}) or two digits ({@code 10}..{@code 26}).
     *
     * @param s the digit string
     * @return the number of decodings, {@code 0} when the string cannot be decoded
     */
    public static int decodeWays(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1; // one way to decode the empty prefix

        for (int i = 1; i <= n; i++) {
            if (s.charAt(i - 1) != '0') {
                dp[i] += dp[i - 1]; // a single digit 1..9
            }
            if (i >= 2) {
                int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
                if (two >= 10 && two <= 26) {
                    dp[i] += dp[i - 2]; // a two digit code 10..26
                }
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(decodeWays(s));
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
`,r='\n# Decode Ways — LeetCode 91\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Prefix DP · String DP |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Adobe, Uber |\n\n## Problem Statement\n\nA message containing letters `A` to `Z` is encoded as digits: `A` → `1`, `B` → `2`, …, `Z` → `26`.\n\nGiven a string of digits, count the number of ways to decode it. A digit string that cannot be decoded has `0` ways.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\n```\n\n- `s` — the digit string (1 ≤ |s| ≤ 300, digits only)\n\n## Sample Input\n\n```\n226\n```\n\n## Expected Output\n\n```\n3\n```\n\nThe three decodings are `2 | 2 | 6`, `2 | 26` and `22 | 6`.\n\n## Approach\n\nThe same "last block" DP as [Word Break](./WordBreak.java), only with digits instead of words:\n\n1. `dp[i]` = the number of decodings of `s[0 .. i-1]`.\n2. `dp[0] = 1` — the empty prefix has exactly one decoding.\n3. If `s[i-1] != \'0\'`, the last letter can be a single digit → `dp[i] += dp[i-1]`.\n4. If `i ≥ 2` and the two digits form a number between `10` and `26`, the last letter can be a    two-digit code → `dp[i] += dp[i-2]`.\n5. The answer is `dp[n]`.\n\n**The `0` rules.** A lone `0` is not a code, so it contributes nothing. `10` and `20` are valid two-digit codes; `30` and `40` are not. That is exactly what the range check `10 ≤ two ≤ 26` encodes — and why `0` may never start a two-digit code.\n\n## Dry Run\n\nInput: `s = "226"`.\n\n| `i` | prefix | last digit valid alone? | last two digits valid? | `dp[i]` |\n|---:|---|---|---|---:|\n| 0 | `""` | — | — | **1** (base case) |\n| 1 | `2` | yes → `dp[0]` = 1 | — | **1** |\n| 2 | `22` | yes → `dp[1]` = 1 | `22` ∈ [10,26] → `dp[0]` = 1 | **2** |\n| 3 | `226` | yes → `dp[2]` = 2 | `26` ∈ [10,26] → `dp[1]` = 1 | **3** |\n\nFull table: `dp = [1, 1, 2, 3]` → answer **3**.\n\n**The three decodings of `"226"`**\n\n| decoding | letters | path through the table |\n|---|---|---|\n| `2 2 6` | B B F | `dp[0] → dp[1] → dp[2] → dp[3]` |\n| `2 26` | B Z | `dp[0] → dp[1] → dp[3]` |\n| `22 6` | V F | `dp[0] → dp[2] → dp[3]` |\n\n**Leading zero.** `"06"` → `dp[1] = 0` (a lone `0` is not a code) and the pair `06` is not in `[10,26]` → `dp[2] = 0` → the whole string is undecodable.\n\n**Rolling memory.** Only `dp[i-1]` and `dp[i-2]` are read, so two variables suffice — `O(1)` space.\n\n## Java Solution\n\nSee [`DecodeWays.java`](./DecodeWays.java).\n\n```java\n    public static int decodeWays(String s) {\n        int n = s.length();\n        int[] dp = new int[n + 1];\n        dp[0] = 1;\n\n        for (int i = 1; i <= n; i++) {\n            if (s.charAt(i - 1) != \'0\') {\n                dp[i] += dp[i - 1];\n            }\n            if (i >= 2) {\n                int two = (s.charAt(i - 2) - \'0\') * 10 + (s.charAt(i - 1) - \'0\');\n                if (two >= 10 && two <= 26) {\n                    dp[i] += dp[i - 2];\n                }\n            }\n        }\n        return dp[n];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(|s|) | one pass over the digits |\n| **Space** | O(|s|) | the `dp` array holds `n + 1` entries |\n\n**Space can be `O(1)`** — keep only the previous two values.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if `0` were also a letter on its own?"* → the single-digit rule changes to `s[i-1] != \'0\'`.\n- "Return the actual decodings?"* → keep a parent array and backtrack.\n- "How do you detect an invalid string quickly?"* → scan for a `0` that is not followed by a valid pair, or a leading `0` — `O(n)` without a table.\n- "What if the codes were 1..100?"* → the two-digit check becomes a three-digit check.\n\n**Common mistakes:**\n\n- ❌ Allowing `0` as a single digit — `dp` then counts decodings that do not exist.\n- ❌ Checking only `two <= 26` without the lower bound `10`, so `06` would be accepted.\n- ❌ Forgetting `dp[0] = 1` (the empty decoding).\n\n**How to narrate:**\n\n> "`dp[i]` counts the decodings of the first `i` digits. The last letter either uses one digit — which must not be `0` — or two digits forming a number between 10 and 26. So I add `dp[i-1]` and `dp[i-2]` accordingly. The range check on the pair is what handles the `0` rules for free."\n\n## Related Problems\n\n- [Word Break — LeetCode 139](./WordBreak.java) — the same DP over a dictionary\n- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — string DP\n',i=[`decodeWays`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};