var e=`slidingwindow.PermutationInString`,t=`package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

/**
 * Problem: Permutation in String
 * LeetCode: 567 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * Given two strings {@code s1} and {@code s2}, return {@code true} if {@code s2} contains a
 * permutation of {@code s1} — that is, if some substring of {@code s2} is an anagram of
 * {@code s1} — otherwise return {@code false}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s1
 * s2
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ab
 * eidbaooo
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: a permutation has exactly the same character counts as {@code s1}, so slide a
 * window of length {@code |s1|} over {@code s2} and keep a counter of how many required
 * character occurrences are still missing.
 *
 * <p>Complexity: Time O(|s1| + |s2|), Space O(1) — an alphabet-sized counter.
 */
public class PermutationInString {

    /**
     * Returns whether {@code s2} contains a permutation of {@code s1}.
     *
     * @param s1 the pattern
     * @param s2 the haystack
     * @return whether an anagram of {@code s1} occurs inside {@code s2}
     */
    public static boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) {
            return false;
        }
        int[] need = new int[26];
        for (char c : s1.toCharArray()) {
            need[c - 'a']++;
        }
        int[] window = new int[26];
        // Number of required character occurrences that the window is still missing.
        int missing = s1.length();

        for (int i = 0; i < s2.length(); i++) {
            char c = s2.charAt(i);
            if (need[c - 'a'] > 0 && window[c - 'a'] < need[c - 'a']) {
                missing--;
            }
            window[c - 'a']++;

            if (i >= s1.length()) {
                char removed = s2.charAt(i - s1.length());
                int index = removed - 'a';
                if (need[index] > 0 && window[index] <= need[index]) {
                    missing++;
                }
                window[index]--;
            }
            if (missing == 0) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s1 = fs.next();
        String s2 = fs.next();

        System.out.println(checkInclusion(s1, s2));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Permutation in String
 * LeetCode: 567 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * Given two strings {@code s1} and {@code s2}, return {@code true} if {@code s2} contains a
 * permutation of {@code s1} — that is, if some substring of {@code s2} is an anagram of
 * {@code s1} — otherwise return {@code false}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s1
 * s2
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ab
 * eidbaooo
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: a permutation has exactly the same character counts as {@code s1}, so slide a
 * window of length {@code |s1|} over {@code s2} and keep a counter of how many required
 * character occurrences are still missing.
 *
 * <p>Complexity: Time O(|s1| + |s2|), Space O(1) — an alphabet-sized counter.
 */
public class Main {

    /**
     * Returns whether {@code s2} contains a permutation of {@code s1}.
     *
     * @param s1 the pattern
     * @param s2 the haystack
     * @return whether an anagram of {@code s1} occurs inside {@code s2}
     */
    public static boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) {
            return false;
        }
        int[] need = new int[26];
        for (char c : s1.toCharArray()) {
            need[c - 'a']++;
        }
        int[] window = new int[26];
        // Number of required character occurrences that the window is still missing.
        int missing = s1.length();

        for (int i = 0; i < s2.length(); i++) {
            char c = s2.charAt(i);
            if (need[c - 'a'] > 0 && window[c - 'a'] < need[c - 'a']) {
                missing--;
            }
            window[c - 'a']++;

            if (i >= s1.length()) {
                char removed = s2.charAt(i - s1.length());
                int index = removed - 'a';
                if (need[index] > 0 && window[index] <= need[index]) {
                    missing++;
                }
                window[index]--;
            }
            if (missing == 0) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s1 = fs.next();
        String s2 = fs.next();

        System.out.println(checkInclusion(s1, s2));
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
`,r='\n# Permutation in String — LeetCode 567\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Sliding window · Frequency counting · Hashing |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Adobe |\n\n## Problem Statement\n\nGiven two strings `s1` and `s2`, return `true` if `s2` contains a **permutation** of `s1`;\notherwise return `false`.\n\n- A permutation of `s1` is a rearrangement of its characters, so the two strings must have\n  exactly the same character counts.\n- `"ab"`, `"eidbaooo"` → `true` (the substring `"ba"`).\n- `"ab"`, `"eidboaoo"` → `false`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns1\ns2\n```\n\n- `s1` — the pattern, a string without whitespace (1 ≤ |s1| ≤ 26)\n- `s2` — the haystack, a string without whitespace (1 ≤ |s2| ≤ 10⁵)\n\n## Sample Input\n\n```\nab\neidbaooo\n```\n\n## Expected Output\n\n```\ntrue\n```\n\n`s2` contains `"ba"` (positions 3–4), which is a permutation of `"ab"`.\n\n## Approach — Fixed-size window with a "missing" counter\n\nA permutation has exactly the same character counts as `s1`, so every candidate window has\nlength `|s1|`. Slide that window across `s2` and maintain:\n\n- `need[c]` — how many times `c` occurs in `s1`;\n- `window[c]` — how many times `c` occurs in the current window;\n- `missing` — the number of **required occurrences** the window is still missing.\n\n**Adding a character `c`.** If `c` is needed and the window currently holds fewer than\n`need[c]` copies, this new copy satisfies one requirement → `missing--`. Then bump\n`window[c]`.\n\n**Removing a character `c`.** If `c` is needed and the window holds `window[c] <= need[c]`\ncopies *before* the removal, then removing one makes the window fall short → `missing++`.\nThen decrement `window[c]`.\n\nThe window is a permutation exactly when `missing == 0`.\n\n**Why not just compare the two arrays on every step?** That works, but it costs O(26) per\nposition. The `missing` counter keeps the inner work O(1).\n\n## Dry Run\n\nInput: `s1 = "ab"`, `s2 = "eidbaooo"` — `need = {a:1, b:1}`, `missing = 2`\n\n| Step | i | char added | char removed | `window` | `need` | `missing` | permutation? |\n|---:|---:|---|---|---|---|---:|---|\n| 1 | 0 | `e` | — | `{e:1}` | `{a:1, b:1}` | 2 | no |\n| 2 | 1 | `i` | — | `{e:1, i:1}` | `{a:1, b:1}` | 2 | no |\n| 3 | 2 | `d` | `e` (i ≥ 2) | `{d:1, i:1}` | `{a:1, b:1}` | 2 | no |\n| 4 | 3 | `b` | `i` | `{b:1, d:1}` | `{a:1, b:1}` | **1** | no — `a` still missing |\n| 5 | 4 | `a` | `d` | `{a:1, b:1}` | `{a:1, b:1}` | **0** | **yes → return true** |\n\nAt step 4 the `b` fills one of the two requirements (`missing` drops from 2 to 1) and the\nremoved `i` was not needed, so `missing` stays at 1. At step 5 the `a` fills the last\nrequirement and the removed `d` was not needed either — `missing` reaches 0 and the window\n`"ba"` is a permutation of `"ab"`.\n\n### A miss — `s1 = "ab"`, `s2 = "eidboaoo"`\n\n| Step | i | char added | char removed | `missing` | permutation? |\n|---:|---:|---|---|---:|---|\n| 1 | 0 | `e` | — | 2 | no |\n| 2 | 1 | `i` | — | 2 | no |\n| 3 | 2 | `d` | `e` | 2 | no |\n| 4 | 3 | `b` | `i` | 1 | no |\n| 5 | 4 | `o` | `d` | 1 | no |\n| 6 | 5 | `a` | `b` | 1 | no — removing `b` re-opens a requirement |\n| 7 | 6 | `o` | `o` | 1 | no |\n| 8 | 7 | `o` | `a` | 2 | no |\n\n`missing` never reaches 0 → **false**.\n\n## Java Solution\n\nSee [`PermutationInString.java`](./PermutationInString.java).\n\n```java\npublic static boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) {\n        return false;\n    }\n    int[] need = new int[26];\n    for (char c : s1.toCharArray()) {\n        need[c - \'a\']++;\n    }\n    int[] window = new int[26];\n    int missing = s1.length();\n\n    for (int i = 0; i < s2.length(); i++) {\n        char c = s2.charAt(i);\n        if (need[c - \'a\'] > 0 && window[c - \'a\'] < need[c - \'a\']) {\n            missing--;\n        }\n        window[c - \'a\']++;\n\n        if (i >= s1.length()) {\n            char removed = s2.charAt(i - s1.length());\n            int index = removed - \'a\';\n            if (need[index] > 0 && window[index] <= need[index]) {\n                missing++;\n            }\n            window[index]--;\n        }\n        if (missing == 0) {\n            return true;\n        }\n    }\n    return false;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(\\|s1\\| + \\|s2\\|) | One pass over both strings |\n| **Space** | O(1) | Two arrays of 26 counters |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Return the starting index of the permutation."* → return `i - s1.length() + 1` instead\n  of `true`.\n- *"Return every permutation."* → collect all such indices; that is LeetCode 438.\n- *"What if the alphabet is not lowercase English?"* → use a `HashMap<Character, Integer>`\n  instead of a 26-element array.\n- *"How would you solve it if `s2` were a stream and you wanted to react to each window?"* →\n  the same algorithm; emit a signal whenever `missing == 0`.\n\n**Common mistakes:**\n- ❌ Comparing the two count arrays for equality but forgetting the window length → a\n  window with the right counts but the wrong length would pass.\n- ❌ Incrementing `missing` when removing a character whose count is *above* the quota →\n  the removal was harmless.\n- ❌ Forgetting the `s1.length() > s2.length()` early exit → the window would never be full.\n- ❌ Using `c - \'a\'` on a non-lowercase character → an out-of-bounds array access.\n\n**How to narrate:**\n> "A permutation has the same character counts as the pattern, so every candidate window has\n> the same length as `s1`. I slide that window over `s2` and keep a counter of how many\n> required occurrences are still missing. Adding a character fills a requirement if it was\n> still needed; removing one re-opens a requirement if the window was not carrying extra\n> copies. When the counter hits zero the window is a permutation."\n\n## Related Problems\n\n- [Find All Anagrams in a String](./FindAllAnagramsInString.java) — the same window, returning every index\n- [Minimum Window Substring](./MinimumWindowSubstring.java) — the same idea with a variable window size\n- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the opposite constraint\n',i=[`checkInclusion`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};