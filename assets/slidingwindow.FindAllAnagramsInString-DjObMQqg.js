var e=`slidingwindow.FindAllAnagramsInString`,t=`package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Find All Anagrams in a String
 * LeetCode: 438 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * Given two strings {@code s} and {@code p}, return the **start indices** of every substring
 * of {@code s} that is an anagram of {@code p}. The indices may be returned in any order.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * p
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * cbaebabacd
 * abc
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 6
 * </pre>
 *
 * <p>Approach: every candidate window has the same length as {@code p}, so slide a fixed
 * size window over {@code s} and maintain a counter of how many required character
 * occurrences are still missing. When the counter reaches zero the window is an anagram.
 *
 * <p>Complexity: Time O(|s| + |p|), Space O(1) — an alphabet-sized counter.
 */
public class FindAllAnagramsInString {

    /**
     * Returns the start indices of every anagram of {@code p} inside {@code s}.
     *
     * @param s the haystack
     * @param p the pattern
     * @return the start indices, in increasing order
     */
    public static List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        if (p.isEmpty() || s.length() < p.length()) {
            return result;
        }
        int[] need = new int[26];
        for (char c : p.toCharArray()) {
            need[c - 'a']++;
        }
        int[] window = new int[26];
        int missing = p.length();

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need[c - 'a'] > 0 && window[c - 'a'] < need[c - 'a']) {
                missing--;
            }
            window[c - 'a']++;

            if (right >= p.length()) {
                char removed = s.charAt(right - p.length());
                int index = removed - 'a';
                if (need[index] > 0 && window[index] <= need[index]) {
                    missing++;
                }
                window[index]--;
            }

            if (missing == 0 && right >= p.length() - 1) {
                result.add(right - p.length() + 1);
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String p = fs.next();

        List<Integer> answer = findAnagrams(s, p);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Find All Anagrams in a String
 * LeetCode: 438 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * Given two strings {@code s} and {@code p}, return the **start indices** of every substring
 * of {@code s} that is an anagram of {@code p}. The indices may be returned in any order.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * p
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * cbaebabacd
 * abc
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 6
 * </pre>
 *
 * <p>Approach: every candidate window has the same length as {@code p}, so slide a fixed
 * size window over {@code s} and maintain a counter of how many required character
 * occurrences are still missing. When the counter reaches zero the window is an anagram.
 *
 * <p>Complexity: Time O(|s| + |p|), Space O(1) — an alphabet-sized counter.
 */
public class Main {

    /**
     * Returns the start indices of every anagram of {@code p} inside {@code s}.
     *
     * @param s the haystack
     * @param p the pattern
     * @return the start indices, in increasing order
     */
    public static List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        if (p.isEmpty() || s.length() < p.length()) {
            return result;
        }
        int[] need = new int[26];
        for (char c : p.toCharArray()) {
            need[c - 'a']++;
        }
        int[] window = new int[26];
        int missing = p.length();

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need[c - 'a'] > 0 && window[c - 'a'] < need[c - 'a']) {
                missing--;
            }
            window[c - 'a']++;

            if (right >= p.length()) {
                char removed = s.charAt(right - p.length());
                int index = removed - 'a';
                if (need[index] > 0 && window[index] <= need[index]) {
                    missing++;
                }
                window[index]--;
            }

            if (missing == 0 && right >= p.length() - 1) {
                result.add(right - p.length() + 1);
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String p = fs.next();

        List<Integer> answer = findAnagrams(s, p);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
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
`,r='\n# Find All Anagrams in a String — LeetCode 438\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Sliding window · Frequency counting |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Adobe |\n\n## Problem Statement\n\nGiven two strings `s` and `p`, return the **start indices** of every substring of `s` that\nis an anagram of `p`. The indices may be returned in any order.\n\n- `"cbaebabacd"`, `p = "abc"` → the answers are `[0, 6]` (the substrings `"cba"` and\n  `"bac"`).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\np\n```\n\n- `s` — the haystack, a string without whitespace (1 ≤ |s| ≤ 10⁵)\n- `p` — the pattern, a string without whitespace (1 ≤ |p| ≤ |s|)\n\n## Sample Input\n\n```\ncbaebabacd\nabc\n```\n\n## Expected Output\n\n```\n0 6\n```\n\n## Approach — Fixed-size window with a "missing" counter\n\nEvery candidate window has length `|p|`, so slide a window of exactly that size across `s`.\n\nKeep:\n\n- `need[c]` — how many times `c` occurs in `p`;\n- `window[c]` — how many times `c` occurs in the current window;\n- `missing` — the number of **required occurrences** the window is still missing.\n\n**Adding a character `c`.** If `c` is needed and the window holds fewer than `need[c]`\ncopies, this new copy satisfies one requirement → `missing--`. Then bump `window[c]`.\n\n**Removing a character `c`.** If `c` is needed and the window holds `window[c] <= need[c]`\ncopies *before* the removal, removing one makes the window fall short → `missing++`. Then\ndecrement `window[c]`.\n\nThe window is an anagram exactly when `missing == 0`, and it starts at `right - |p| + 1`.\n\n**Why the removal test uses `<=` and not `<`.** After removing one copy the window holds\n`window[c] - 1` copies. If `window[c] - 1 < need[c]` the window now falls short, i.e.\n`window[c] <= need[c]` before the removal. Using a strict `<` would miss the case where\nthe count is exactly the requirement — which is precisely the common case.\n\n## Dry Run\n\nInput: `s = "cbaebabacd"`, `p = "abc"` — `need = {a:1, b:1, c:1}`, `missing = 3`\n\n| Step | right | char added | char removed | counts of the needed chars | `missing` | anagram? | start index |\n|---:|---:|---|---|---|---:|---|---:|\n| 1 | 0 | `c` | — | c:1 | 2 | no | — |\n| 2 | 1 | `b` | — | b:1 c:1 | 1 | no | — |\n| 3 | 2 | `a` | — | a:1 b:1 c:1 | **0** | **yes** | **0** ✓ |\n| 4 | 3 | `e` | `c` (right ≥ 3) | a:1 b:1 c:0 | 1 | no | — |\n| 5 | 4 | `b` | `b` | a:1 b:1 c:0 | 1 | no | — |\n| 6 | 5 | `a` | `a` | a:1 b:1 c:0 | 1 | no | — |\n| 7 | 6 | `b` | `e` | a:1 b:1 c:0 | 1 | no | — |\n| 8 | 7 | `a` | `b` | a:1 b:1 c:0 | 1 | no | — |\n| 9 | 8 | `c` | `a` | a:1 b:1 c:1 | **0** | **yes** | **6** ✓ |\n| 10 | 9 | `d` | `b` | a:1 b:0 c:1 | 1 | no | — |\n\nTwo anagrams found, at indices `0` and `6`.\n\n### The windows that were a permutation\n\n| Window | start | contents | needed chars present? |\n|---|---:|---|---|\n| `cba` | 0 | c b a | ✔ a, b, c |\n| `bae` | 1 | b a e | ✘ missing c |\n| `aeb` | 2 | a e b | ✘ missing c |\n| `eba` | 3 | e b a | ✘ missing c |\n| `bab` | 4 | b a b | ✘ missing c |\n| `aba` | 5 | a b a | ✘ missing c |\n| `bac` | 6 | b a c | ✔ a, b, c |\n| `acd` | 7 | a c d | ✘ missing b |\n\nExactly two of the eight windows are anagrams of `"abc"` — the ones starting at `0` and `6`.\n\n## Java Solution\n\nSee [`FindAllAnagramsInString.java`](./FindAllAnagramsInString.java).\n\n```java\npublic static List<Integer> findAnagrams(String s, String p) {\n    List<Integer> result = new ArrayList<>();\n    if (p.isEmpty() || s.length() < p.length()) {\n        return result;\n    }\n    int[] need = new int[26];\n    for (char c : p.toCharArray()) {\n        need[c - \'a\']++;\n    }\n    int[] window = new int[26];\n    int missing = p.length();\n\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        if (need[c - \'a\'] > 0 && window[c - \'a\'] < need[c - \'a\']) {\n            missing--;\n        }\n        window[c - \'a\']++;\n\n        if (right >= p.length()) {\n            char removed = s.charAt(right - p.length());\n            int index = removed - \'a\';\n            if (need[index] > 0 && window[index] <= need[index]) {\n                missing++;\n            }\n            window[index]--;\n        }\n\n        if (missing == 0 && right >= p.length() - 1) {\n            result.add(right - p.length() + 1);\n        }\n    }\n    return result;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(\\|s\\| + \\|p\\|) | One pass over both strings |\n| **Space** | O(1) for the counters, O(k) for the answer | k = number of matches |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Return just the first anagram."* → return the index as soon as `missing == 0`.\n- *"How would you do this in a single pass over a stream?"* → the same algorithm; the\n  window start is `right - |p| + 1`.\n- *"What if the pattern is much longer than the text?"* → return an empty list immediately.\n- *"What if the alphabet is not lowercase English?"* → use a `HashMap<Character, Integer>`.\n\n**Common mistakes:**\n- ❌ Using `<` instead of `<=` in the removal test → the `b` removal at step 5 would not\n  have re-opened the requirement and the counters would drift.\n- ❌ Reporting the index as `right` instead of `right - |p| + 1`.\n- ❌ Checking `missing == 0` before the window is full → `missing` can only reach 0 once the\n  window has |p| characters, but the explicit `right >= p.length() - 1` guard makes the\n  intent clear.\n- ❌ Forgetting that `p` may contain repeated characters → the counters handle them, but a\n  naive "set of characters" check would not.\n\n**How to narrate:**\n> "An anagram has the same character counts as the pattern, so every candidate window has the\n> pattern\'s length. I slide that window across the text and keep a counter of how many\n> required occurrences are still missing. Adding a character fills a requirement if it was\n> needed; removing one re-opens a requirement if the window was not carrying extra copies.\n> When the counter hits zero I record `right - |p| + 1`."\n\n## Related Problems\n\n- [Permutation in String](./PermutationInString.java) — the boolean version\n- [Minimum Window Substring](./MinimumWindowSubstring.java) — the variable-size version\n- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the opposite constraint\n',i=[`findAnagrams`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};