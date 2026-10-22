var e=`dynamicprogramming.WordBreak`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Problem: Word Break
 * LeetCode: 139 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix DP, HashSet lookups
 *
 * <p>Problem: Decide whether a string can be split into one or more dictionary words, using each word as many times as needed.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word[0] word[1] ... word[n-1]
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * leet code
 * leetcode
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Sweep the string from left to right; at every position ask whether the prefix can be broken, trying every dictionary word that could end there.
 *
 * <p>Complexity: Time O(n x L^2), Space O(|s|).
 */
public class WordBreak {

    /**
     * Decides whether {@code s} can be segmented into a sequence of dictionary words.
     *
     * <p>{@code dp[i]} is true when the first {@code i} characters of {@code s} can be broken into
     * dictionary words. The last word of such a segmentation is some {@code word} that matches
     * {@code s} at position {@code i - word.length()}.
     *
     * @param s        the string to break
     * @param wordDict the dictionary of allowed words
     * @return {@code true} when the string can be broken
     */
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        int n = s.length();

        boolean[] dp = new boolean[n + 1];
        dp[0] = true; // the empty prefix is breakable

        for (int i = 1; i <= n; i++) {
            for (String word : words) {
                int len = word.length();
                if (i >= len && dp[i - len] && s.startsWith(word, i - len)) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] dict = fs.nextStringArray(n);
        String s = fs.next();

        System.out.println(wordBreak(s, java.util.Arrays.asList(dict)) ? 1 : 0);
    }
}
`,n=`import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Word Break
 * LeetCode: 139 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix DP, HashSet lookups
 *
 * <p>Problem: Decide whether a string can be split into one or more dictionary words, using each word as many times as needed.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word[0] word[1] ... word[n-1]
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * leet code
 * leetcode
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Sweep the string from left to right; at every position ask whether the prefix can be broken, trying every dictionary word that could end there.
 *
 * <p>Complexity: Time O(n x L^2), Space O(|s|).
 */
public class Main {

    /**
     * Decides whether {@code s} can be segmented into a sequence of dictionary words.
     *
     * <p>{@code dp[i]} is true when the first {@code i} characters of {@code s} can be broken into
     * dictionary words. The last word of such a segmentation is some {@code word} that matches
     * {@code s} at position {@code i - word.length()}.
     *
     * @param s        the string to break
     * @param wordDict the dictionary of allowed words
     * @return {@code true} when the string can be broken
     */
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        int n = s.length();

        boolean[] dp = new boolean[n + 1];
        dp[0] = true; // the empty prefix is breakable

        for (int i = 1; i <= n; i++) {
            for (String word : words) {
                int len = word.length();
                if (i >= len && dp[i - len] && s.startsWith(word, i - len)) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] dict = fs.nextStringArray(n);
        String s = fs.next();

        System.out.println(wordBreak(s, java.util.Arrays.asList(dict)) ? 1 : 0);
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
`,r='\n# Word Break — LeetCode 139\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Prefix DP · HashSet lookups |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Adobe |\n\n## Problem Statement\n\nGiven a string `s` and a dictionary `wordDict`, return `true` if `s` can be segmented into a sequence of one or more dictionary words that are **space separated**.\n\nA word may be used as often as the dictionary contains it.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nword[0] word[1] ... word[n-1]\ns\n```\n\n- `n` — number of dictionary words (1 ≤ n ≤ 300)\n- `word[i]` — a dictionary word (lower case letters only)\n- `s` — the string to break (1 ≤ |s| ≤ 300)\n\n## Sample Input\n\n```\n2\nleet code\nleetcode\n```\n\n## Expected Output\n\n```\n1\n```\n\n`leetcode` = `leet` + `code`, so the string can be broken → **1**.\n\n## Approach\n\nA prefix DP:\n\n1. `dp[i]` = true when the first `i` characters of `s` can be segmented.\n2. `dp[0] = true` — the empty prefix is trivially breakable, and it is the base case that lets the first word start at position 0.\n3. For every position `i` and every dictionary word `word` of length `len ≤ i`, check\n   `dp[i - len] && s.startsWith(word, i - len)`. If both hold, `dp[i] = true`.\n4. The answer is `dp[s.length()]`.\n\nThe condition is exactly "the prefix before the last word is breakable **and** the last word matches here" — the same take-or-skip idea as House Robber, but over prefixes.\n\nThe variant **Word Break II** asks for all the segmentations: keep a `parents[i]` list and walk the graph backwards.\n\n## Dry Run\n\nInput: `s = "leetcode"`, dictionary = `{leet, code}`.\n\n| `i` | prefix `s[0..i-1]` | last word tried | `dp[i-len]` | `dp[i]` | why |\n|---:|---|---|---|---:|---|\n| 0 | `""` | — | — | **true** | base case |\n| 1 | `l` | `leet` (len 4 > 1) | — | false | no word fits |\n| 2 | `le` | `leet` (len 4 > 2) | — | false | no word fits |\n| 3 | `lee` | `leet` (len 4 > 3) | — | false | no word fits |\n| 4 | `leet` | `leet` | `dp[0]` = true | **true** | `leet` matches at 0 |\n| 5 | `leetc` | `leet` | `dp[1]` = false | false | prefix `l` is not breakable |\n| 6 | `leetco` | `leet` | `dp[2]` = false | false | prefix `le` is not breakable |\n| 7 | `leetcod` | `leet` | `dp[3]` = false | false | prefix `lee` is not breakable |\n| 8 | `leetcode` | `leet` | `dp[4]` = true | **true** | `leet` matches at 0 — then `code` at 4 |\n\nFull table: `dp = [T, F, F, F, T, F, F, F, T]` → answer **true**.\n\n**The `dp[0] = true` base case matters.** It is what lets the first word start at index 0; without it every `dp[i]` stays false.\n\n**Why the check is `dp[i-len] && startsWith(...)`** — both halves are needed: the prefix must be breakable **and** the word must really be there. Either alone gives wrong answers.\n\n## Java Solution\n\nSee [`WordBreak.java`](./WordBreak.java).\n\n```java\n    public static boolean wordBreak(String s, List<String> wordDict) {\n        Set<String> words = new HashSet<>(wordDict);\n        int n = s.length();\n\n        boolean[] dp = new boolean[n + 1];\n        dp[0] = true;\n\n        for (int i = 1; i <= n; i++) {\n            for (String word : words) {\n                int len = word.length();\n                if (i >= len && dp[i - len] && s.startsWith(word, i - len)) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[n];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · L²) | for each of the `|s|` positions every dictionary word is tried; each check is `O(word length)` |\n| **Space** | O(|s|) | the `dp` array holds `|s| + 1` booleans plus the dictionary set |\n\n**Time `O(|s| · L²)`** in the worst case, where `L` is the maximum word length: `|s|` positions × `n` words × `O(L)` for the comparison. The inner loop can be restricted to words that actually match, which is what the `startsWith` call does.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Print all the ways to break the string."* → Word Break II: store the parents of each reachable prefix and enumerate backwards.\n- "What if the words may only be used once?"* → that is a different (0/1) DP over the dictionary.\n- "Can it be done in `O(|s| · n)`?"* → yes with a trie, or with a rolling hash instead of `startsWith`.\n- "How would you detect a typo?"* → a dictionary of frequencies plus a probabilistic check (Bloom filter / local sensitivity hashing).\n\n**Common mistakes:**\n\n- ❌ Forgetting `dp[0] = true` — nothing can ever be breakable.\n- ❌ Checking only that the word appears somewhere, not that it ends at position `i`.\n- ❌ Iterating the dictionary in the outer loop over the positions in the inner loop with the same formula — that turns it into a 0/1 variant.\n\n**How to narrate:**\n\n> "I use a prefix DP: `dp[i]` says whether the first `i` characters can be segmented. `dp[0]` is true. For every position I try each dictionary word as the *last* word — the part before it must be breakable and the word must match exactly there. That is `O(|s| · n · L)`."\n\n## Related Problems\n\n- [Decode Ways — LeetCode 91](./DecodeWays.java) — the same "last block" DP over digits\n- [Coin Change II — LeetCode 518](./CoinChangeII.java) — count instead of decide\n',i=[`wordBreak`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};