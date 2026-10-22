var e=`trie.CamelCaseMatching`,t=`package com.dsa.trie;

import com.dsa.utils.FastScanner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Camelcase Matching
 * LeetCode: 1253 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Two pointers, Case rules
 *
 * <p>Problem: A query matches a pattern when the pattern can be turned into the query by
 * inserting lowercase English letters at arbitrary positions. Equivalently: the query
 * reduces to the pattern after deleting some lowercase letters. Uppercase letters of the
 * query can never be deleted, so an uppercase letter in the query must be part of the
 * pattern.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * query1
 * ...
 * queryn
 * m
 * pattern1
 * ...
 * patternm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * FooBar
 * FootBall
 * FrameBuffer
 * 3
 * FB
 * FBar
 * Buffer
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1
 * 0
 * 0
 * </pre>
 * One line per query: the indices of the patterns it matches, in ascending order. The
 * line is empty when the query matches no pattern.
 *
 * <p>Approach: two pointers, one on the query and one on the pattern. When the two
 * characters are equal the pattern character is consumed. Otherwise the query character
 * has to be an inserted lowercase letter — if it is uppercase the match is impossible
 * and we stop. The match succeeds when the whole pattern has been consumed and every
 * remaining query character is lowercase.
 *
 * <p>Complexity: Time O(sum of the query lengths) per pattern. Space O(1).
 */
public class CamelCaseMatching {

    /**
     * Checks whether a query matches a pattern.
     *
     * @param query   the query word
     * @param pattern the pattern word
     * @return {@code true} when the pattern can be turned into the query by inserting
     *         lowercase letters
     */
    public static boolean matches(String query, String pattern) {
        int i = 0; // index into the query
        int j = 0; // index into the pattern
        while (i < query.length()) {
            if (j < pattern.length() && query.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
            } else if (Character.isUpperCase(query.charAt(i))) {
                return false; // an uppercase query letter must belong to the pattern
            } else {
                i++; // this lowercase letter was inserted into the pattern
            }
        }
        return j == pattern.length();
    }

    /**
     * Returns the indices of the patterns that a query matches.
     *
     * @param query   the query word
     * @param patterns the candidate patterns
     * @return the matching pattern indices in ascending order
     */
    public static List<Integer> matchingPatterns(String query, List<String> patterns) {
        List<Integer> matches = new ArrayList<>();
        for (int i = 0; i < patterns.size(); i++) {
            if (matches(query, patterns.get(i))) {
                matches.add(i);
            }
        }
        return matches;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);

        int n = fs.nextInt();
        String[] queries = new String[n];
        for (int i = 0; i < n; i++) {
            queries[i] = fs.next();
        }

        int m = fs.nextInt();
        List<String> patterns = new ArrayList<>(m);
        for (int i = 0; i < m; i++) {
            patterns.add(fs.next());
        }

        for (String query : queries) {
            StringBuilder sb = new StringBuilder();
            for (int index : matchingPatterns(query, patterns)) {
                if (sb.length() > 0) {
                    sb.append(' ');
                }
                sb.append(index);
            }
            System.out.println(sb);
        }
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Camelcase Matching
 * LeetCode: 1253 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Two pointers, Case rules
 *
 * <p>Problem: A query matches a pattern when the pattern can be turned into the query by
 * inserting lowercase English letters at arbitrary positions. Equivalently: the query
 * reduces to the pattern after deleting some lowercase letters. Uppercase letters of the
 * query can never be deleted, so an uppercase letter in the query must be part of the
 * pattern.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * query1
 * ...
 * queryn
 * m
 * pattern1
 * ...
 * patternm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * FooBar
 * FootBall
 * FrameBuffer
 * 3
 * FB
 * FBar
 * Buffer
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1
 * 0
 * 0
 * </pre>
 * One line per query: the indices of the patterns it matches, in ascending order. The
 * line is empty when the query matches no pattern.
 *
 * <p>Approach: two pointers, one on the query and one on the pattern. When the two
 * characters are equal the pattern character is consumed. Otherwise the query character
 * has to be an inserted lowercase letter — if it is uppercase the match is impossible
 * and we stop. The match succeeds when the whole pattern has been consumed and every
 * remaining query character is lowercase.
 *
 * <p>Complexity: Time O(sum of the query lengths) per pattern. Space O(1).
 */
public class Main {

    /**
     * Checks whether a query matches a pattern.
     *
     * @param query   the query word
     * @param pattern the pattern word
     * @return {@code true} when the pattern can be turned into the query by inserting
     *         lowercase letters
     */
    public static boolean matches(String query, String pattern) {
        int i = 0; // index into the query
        int j = 0; // index into the pattern
        while (i < query.length()) {
            if (j < pattern.length() && query.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
            } else if (Character.isUpperCase(query.charAt(i))) {
                return false; // an uppercase query letter must belong to the pattern
            } else {
                i++; // this lowercase letter was inserted into the pattern
            }
        }
        return j == pattern.length();
    }

    /**
     * Returns the indices of the patterns that a query matches.
     *
     * @param query   the query word
     * @param patterns the candidate patterns
     * @return the matching pattern indices in ascending order
     */
    public static List<Integer> matchingPatterns(String query, List<String> patterns) {
        List<Integer> matches = new ArrayList<>();
        for (int i = 0; i < patterns.size(); i++) {
            if (matches(query, patterns.get(i))) {
                matches.add(i);
            }
        }
        return matches;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);

        int n = fs.nextInt();
        String[] queries = new String[n];
        for (int i = 0; i < n; i++) {
            queries[i] = fs.next();
        }

        int m = fs.nextInt();
        List<String> patterns = new ArrayList<>(m);
        for (int i = 0; i < m; i++) {
            patterns.add(fs.next());
        }

        for (String query : queries) {
            StringBuilder sb = new StringBuilder();
            for (int index : matchingPatterns(query, patterns)) {
                if (sb.length() > 0) {
                    sb.append(' ');
                }
                sb.append(index);
            }
            System.out.println(sb);
        }
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
`,r='\n# Camelcase Matching — LeetCode 1253\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Two pointers · Case rules |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nA query matches a pattern when the pattern can be turned into the query by **inserting\nlowercase English letters** at arbitrary positions (inserting nothing is allowed).\n\nRead it the other way round and the rule becomes crystal clear: **the query reduces to\nthe pattern by deleting some lowercase letters**. Uppercase letters can never be\ndeleted, so every uppercase letter of the query must be part of the pattern.\n\nFor the pattern `FB`:\n\n| query | matches? | why |\n|---|---|---|\n| `FooBar` | yes | `F` + `oo` + `B` + `ar` — only lowercase letters were inserted |\n| `FooBarTest` | no | the tail `arTest` contains an uppercase `T`, which could not have been inserted |\n| `FootBall` | yes | `F` + `oot` + `B` + `all` |\n| `FrameBuffer` | yes | `F` + `rame` + `B` + `uffer` |\n| `ForceFeedBack` | no | the segment between `F` and `B` contains an uppercase `F` |\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nquery1\n...\nqueryn\nm\npattern1\n...\npatternm\n```\n\n- `n` — how many queries follow\n- the queries — one per line, English letters\n- `m` — how many patterns follow\n- the patterns — one per line, English letters\n\n## Sample Input\n\n```\n3\nFooBar\nFootBall\nFrameBuffer\n3\nFB\nFBar\nBuffer\n```\n\n## Expected Output\n\n```\n0 1\n0\n0\n```\n\nOne line per query: the indices of the patterns it matches, in ascending order. The\nline is **empty** when the query matches no pattern.\n\n## Approach — two pointers, one rule\n\nWalk the query and the pattern with two pointers:\n\n- if the characters are **equal**, consume both (the pattern character is matched),\n- otherwise the query character was *inserted* — that is only allowed when it is\n  **lowercase**; if it is uppercase the match is impossible and we stop,\n- when the query is exhausted the pattern must be exhausted too.\n\n```java\npublic static boolean matches(String query, String pattern) {\n    int i = 0, j = 0;\n    while (i < query.length()) {\n        if (j < pattern.length() && query.charAt(i) == pattern.charAt(j)) {\n            i++; j++;\n        } else if (Character.isUpperCase(query.charAt(i))) {\n            return false;   // an uppercase query letter must belong to the pattern\n        } else {\n            i++;            // this lowercase letter was inserted into the pattern\n        }\n    }\n    return j == pattern.length();\n}\n```\n\nThe comparison is **case sensitive**: the pattern characters keep their case, so `A`\nmatches `A` but not `a`.\n\n## Dry Run\n\nQuery `FooBar` against the patterns:\n\n**Pattern `FB`**\n\n| Step | i | query[i] | j | pattern[j] | action |\n|---:|---:|---|---:|---|---|\n| 1 | 0 | `F` | 0 | `F` | equal → i=1, j=1 |\n| 2 | 1 | `o` | 1 | `B` | different, `o` is lowercase → skip, i=2 |\n| 3 | 2 | `o` | 1 | `B` | different, lowercase → skip, i=3 |\n| 4 | 3 | `B` | 1 | `B` | equal → i=4, j=2 |\n| 5 | 4 | `a` | 2 | — | the pattern is exhausted, `a` is lowercase → skip |\n| 6 | 5 | `r` | 2 | — | lowercase → skip |\n| 7 | — | end | 2 | — | `j == pattern.length()` → **true** ✓ |\n\n**Pattern `FBar`**\n\n| Step | i | query[i] | j | pattern[j] | action |\n|---:|---:|---|---:|---|---|\n| 1 | 0 | `F` | 0 | `F` | equal → i=1, j=1 |\n| 2 | 1 | `o` | 1 | `B` | lowercase → skip |\n| 3 | 2 | `o` | 1 | `B` | lowercase → skip |\n| 4 | 3 | `B` | 1 | `B` | equal → i=4, j=2 |\n| 5 | 4 | `a` | 2 | `a` | equal → i=5, j=3 |\n| 6 | 5 | `r` | 3 | `r` | equal → i=6, j=4 |\n| 7 | — | end | 4 | — | `j == pattern.length()` → **true** ✓ |\n\n**Pattern `Buffer`**\n\n| Step | i | query[i] | j | pattern[j] | action |\n|---:|---:|---|---:|---|---|\n| 1 | 0 | `F` | 0 | `B` | different, `F` is **uppercase** → **false** ✗ |\n\nSo `FooBar` matches the patterns `0` (`FB`) and `1` (`FBar`) → the line is `0 1`.\n\n**Query `FootBall`**\n\n| pattern | result |\n|---|---|\n| `FB` | `F` matches, `o`,`o`,`t` are skipped, `B` matches, tail `all` is lowercase → **true** → index `0` |\n| `FBar` | `F` matches, `o`,`o`,`t` skipped, `B` matches, `a` matches, then `r` vs `l`: `l` is skipped, `l` is skipped, the query ends but `r` is unmatched → **false** |\n| `Buffer` | `F` vs `B` → uppercase → **false** |\n\nSo the line is `0`.\n\n**Query `FrameBuffer`**\n\n| pattern | result |\n|---|---|\n| `FB` | `F` matches, `r`,`a`,`m`,`e` skipped, `B` matches, tail `uffer` is lowercase → **true** → index `0` |\n| `FBar` | after `B` the pattern wants `a` but the query has `u` — `u`,`f`,`f`,`e`,`r` are lowercase and get skipped, then the query ends with `r` unmatched → **false** |\n| `Buffer` | `F` vs `B` → uppercase → **false** |\n\nSo the line is `0`.\n\n## Java Solution\n\nSee [`CamelCaseMatching.java`](./CamelCaseMatching.java).\n\n```java\npublic static boolean matches(String query, String pattern) {\n    int i = 0; // index into the query\n    int j = 0; // index into the pattern\n    while (i < query.length()) {\n        if (j < pattern.length() && query.charAt(i) == pattern.charAt(j)) {\n            i++;\n            j++;\n        } else if (Character.isUpperCase(query.charAt(i))) {\n            return false; // an uppercase query letter must belong to the pattern\n        } else {\n            i++; // this lowercase letter was inserted into the pattern\n        }\n    }\n    return j == pattern.length();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(sum of the query lengths) per pattern | One pass over the query |\n| **Space** | O(1) | Only two pointers |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the pattern may also contain `.`?"* → the wildcard tries every character\n  (backtracking), or you use a DP table.\n- *"Return the matching patterns instead of the indices."* → the same walk, collecting\n  the pattern.\n- *"Do it for many patterns at once."* → a trie of the patterns, or a hash map from the\n  pattern\'s uppercase letters to the candidates.\n\n**Common mistakes:**\n- ❌ Comparing **case-insensitively** → the pattern characters keep their case, so `A`\n  never matches `a`.\n- ❌ Skipping an uppercase query character → uppercase letters can never be inserted.\n- ❌ Forgetting to check `j == pattern.length()` at the end → a query that is a prefix\n  of the pattern would match.\n- ❌ Continuing to match after the pattern is exhausted → the tail of the query must\n  consist of lowercase letters only.\n\n**How to narrate:**\n> "The pattern matches the query if the query can be reduced to the pattern by deleting\n> lowercase letters. So I walk both with two pointers: equal characters are consumed,\n> a lowercase query character that does not match is an inserted letter and gets\n> skipped, and an uppercase one that does not match means the answer is no. At the end\n> the pattern must be fully consumed. O(n) per pattern."\n\n## Related Problems\n\n- [Implement Trie](./ImplementTrie.java) — prefix matching in a trie\n- [Design Add and Search Words](./DesignAddAndSearchWords.java) — wildcard matching\n- [Camelcase Matching](./CamelCaseMatching.java) — the same walk, many patterns\n',i=[`matches`,`matchingPatterns`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};