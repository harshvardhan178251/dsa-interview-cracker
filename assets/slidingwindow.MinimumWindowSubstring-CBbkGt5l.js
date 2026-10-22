var e=`slidingwindow.MinimumWindowSubstring`,t=`package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Minimum Window Substring
 * LeetCode: 76 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Sliding window, Hashing, Two pointers
 *
 * <p>Problem:
 * Given strings {@code s} and {@code t}, return the **minimum window** of {@code s} that
 * contains every character of {@code t} (including duplicates). If there is no such window,
 * return the empty string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ADOBECODEBANC
 * ABC
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * BANC
 * </pre>
 *
 * <p>Approach: expand the right edge until the window covers every needed character, then
 * contract the left edge as far as possible while it stays valid, recording the best window
 * seen on the way.
 *
 * <p>Complexity: Time O(|s| + |t|), Space O(|t|).
 */
public class MinimumWindowSubstring {

    /**
     * Returns the shortest substring of {@code s} that contains every character of {@code t}.
     *
     * @param s the haystack
     * @param t the needle
     * @return the minimum window, or the empty string when none exists
     */
    public static String minWindow(String s, String t) {
        if (s.isEmpty() || t.isEmpty() || t.length() > s.length()) {
            return "";
        }
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) {
            need.merge(c, 1, Integer::sum);
        }
        Map<Character, Integer> window = new HashMap<>();

        int required = need.size();
        int formed = 0;
        int left = 0;
        int bestLength = Integer.MAX_VALUE;
        int bestStart = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need.containsKey(c)) {
                int count = window.merge(c, 1, Integer::sum);
                if (count == need.get(c)) {
                    // This character is now satisfied for the first time.
                    formed++;
                }
            }
            // Contract while the window is still valid.
            while (formed == required) {
                if (right - left + 1 < bestLength) {
                    bestLength = right - left + 1;
                    bestStart = left;
                }
                char removed = s.charAt(left);
                if (need.containsKey(removed)) {
                    int count = window.merge(removed, -1, Integer::sum);
                    if (count < need.get(removed)) {
                        formed--;
                    }
                }
                left++;
            }
        }

        return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(minWindow(s, t));
    }
}
`,n=`import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Minimum Window Substring
 * LeetCode: 76 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Sliding window, Hashing, Two pointers
 *
 * <p>Problem:
 * Given strings {@code s} and {@code t}, return the **minimum window** of {@code s} that
 * contains every character of {@code t} (including duplicates). If there is no such window,
 * return the empty string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ADOBECODEBANC
 * ABC
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * BANC
 * </pre>
 *
 * <p>Approach: expand the right edge until the window covers every needed character, then
 * contract the left edge as far as possible while it stays valid, recording the best window
 * seen on the way.
 *
 * <p>Complexity: Time O(|s| + |t|), Space O(|t|).
 */
public class Main {

    /**
     * Returns the shortest substring of {@code s} that contains every character of {@code t}.
     *
     * @param s the haystack
     * @param t the needle
     * @return the minimum window, or the empty string when none exists
     */
    public static String minWindow(String s, String t) {
        if (s.isEmpty() || t.isEmpty() || t.length() > s.length()) {
            return "";
        }
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) {
            need.merge(c, 1, Integer::sum);
        }
        Map<Character, Integer> window = new HashMap<>();

        int required = need.size();
        int formed = 0;
        int left = 0;
        int bestLength = Integer.MAX_VALUE;
        int bestStart = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need.containsKey(c)) {
                int count = window.merge(c, 1, Integer::sum);
                if (count == need.get(c)) {
                    // This character is now satisfied for the first time.
                    formed++;
                }
            }
            // Contract while the window is still valid.
            while (formed == required) {
                if (right - left + 1 < bestLength) {
                    bestLength = right - left + 1;
                    bestStart = left;
                }
                char removed = s.charAt(left);
                if (need.containsKey(removed)) {
                    int count = window.merge(removed, -1, Integer::sum);
                    if (count < need.get(removed)) {
                        formed--;
                    }
                }
                left++;
            }
        }

        return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(minWindow(s, t));
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
`,r='\n# Minimum Window Substring — LeetCode 76\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Sliding window · Hashing · Two pointers |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg, Adobe |\n\n## Problem Statement\n\nGiven strings `s` and `t`, return the **minimum window** of `s` that contains every character\nof `t` — including the multiplicity. For example, `t = "AABC"` needs two `A`s.\n\n- If no such window exists, return the empty string `""`.\n- `"ADOBECODEBANC"`, `t = "ABC"` → the answer is `"BANC"`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\nt\n```\n\n- `s` — the haystack, a string without whitespace (1 ≤ |s| ≤ 10⁵)\n- `t` — the needle, a string without whitespace (1 ≤ |t| ≤ 10⁵)\n\n## Sample Input\n\n```\nADOBECODEBANC\nABC\n```\n\n## Expected Output\n\n```\nBANC\n```\n\n`"BANC"` contains `A`, `B` and `C`. It is the shortest such window — `"BANCA"` (also 5\ncharacters) and the later `"ANC"` are too short.\n\n## Approach — Expand right, contract left\n\nMaintain two maps: `need` (how many of each character `t` requires) and `window` (how many\nthe current window holds). Also track `formed` — the number of **distinct** characters whose\nrequired count has been reached.\n\n- **Expand:** add `s[right]` to the window. If this character is needed and its window count\n  just reached the required count, increment `formed`.\n- **Contract:** while `formed == required` the window is valid — record its length and move\n  `left` forward. When the count of a required character drops *below* its requirement,\n  decrement `formed` and stop contracting.\n\n**Why `formed` counts distinct characters, not occurrences.** A window of `"AAABBC"` for\n`t = "ABC"` has three `A`s but only one `A` is needed; counting occurrences would make\n`formed` wrong. The distinct-character count is what tells us the window *covers* `t`.\n\n**Why the left pointer only moves when the window is valid.** Every recorded window is\nguaranteed to contain `t`, so every recorded length is a real candidate. Contracting as far\nas possible finds the shortest valid window ending at the current `right`.\n\n## Dry Run\n\nInput: `s = "ADOBECODEBANC"`, `t = "ABC"` — `need = {A:1, B:1, C:1}`, `required = 3`\n\n| Step | right | char | window `s[left..right]` | counts of the needed chars | `formed` | valid? | action |\n|---:|---:|---|---|---|---:|---|---|\n| 1 | 0 | `A` | `A` | A:1 | 1 | no | expand |\n| 2 | 1 | `D` | `AD` | A:1 | 1 | no | expand |\n| 3 | 2 | `O` | `ADO` | A:1 | 1 | no | expand |\n| 4 | 3 | `B` | `ADOB` | A:1 B:1 | 2 | no | expand |\n| 5 | 4 | `E` | `ADOBE` | A:1 B:1 | 2 | no | expand |\n| 6 | 5 | `C` | `ADOBEC` | A:1 B:1 C:1 | **3** | **yes** | record len **6** → contract |\n| 6a | — | drop `A` | `DOBEC` | A:0 B:1 C:1 | 2 | no | stop contracting |\n| 7 | 6 | `O` | `DOBECO` | A:0 B:1 C:1 | 2 | no | expand |\n| 8 | 7 | `D` | `DOBECOD` | A:0 B:1 C:1 | 2 | no | expand |\n| 9 | 8 | `E` | `DOBECODE` | A:0 B:1 C:1 | 2 | no | expand |\n| 10 | 9 | `B` | `DOBECODEB` | A:0 B:2 C:1 | 2 | no | expand — `B` is already over quota, so `formed` is unchanged |\n| 11 | 10 | `A` | `DOBECODEBA` | A:1 B:2 C:1 | **3** | **yes** | contract |\n| 11a | — | drop `D` | `OBECODEBA` | A:1 B:2 C:1 | 3 | yes | len 9 → not better |\n| 11b | — | drop `O` | `BECODEBA` | A:1 B:2 C:1 | 3 | yes | len 8 → not better |\n| 11c | — | drop `B` | `ECODEBA` | A:1 B:1 C:1 | 3 | yes | len 7 → not better |\n| 11d | — | drop `E` | `CODEBA` | A:1 B:1 C:1 | 3 | yes | len 6 → ties the best |\n| 11e | — | drop `C` | `ODEBA` | A:1 B:1 C:0 | 2 | no | stop contracting |\n| 12 | 11 | `N` | `ODEBAN` | A:1 B:1 C:0 | 2 | no | expand |\n| 13 | 12 | `C` | `ODEBANC` | A:1 B:1 C:1 | **3** | **yes** | contract |\n| 13a | — | drop `O` | `DEBANC` | A:1 B:1 C:1 | 3 | yes | len 6 → not better |\n| 13b | — | drop `D` | `EBANC` | A:1 B:1 C:1 | 3 | yes | len 5 → **best = 5** |\n| 13c | — | drop `E` | `BANC` | A:1 B:1 C:1 | 3 | yes | len 4 → **best = 4** ✓ |\n| 13d | — | drop `B` | `ANC` | A:1 B:0 C:1 | 2 | no | stop contracting |\n\nThe best window recorded is `"BANC"` (length 4), starting at index 9.\n\n### Every window that was a valid candidate\n\n| Window | has A | has B | has C | length | better than the previous best? |\n|---|---|---|---|---:|---|\n| `ADOBEC` | ✔ | ✔ | ✔ | 6 | first candidate → best = 6 |\n| `DOBECODEBA` | ✔ | ✔ | ✔ | 10 | no |\n| `OBECODEBA` | ✔ | ✔ | ✔ | 9 | no |\n| `BECODEBA` | ✔ | ✔ | ✔ | 8 | no |\n| `ECODEBA` | ✔ | ✔ | ✔ | 7 | no |\n| `CODEBA` | ✔ | ✔ | ✔ | 6 | no (tie) |\n| `ODEBANC` | ✔ | ✔ | ✔ | 7 | no |\n| `DEBANC` | ✔ | ✔ | ✔ | 6 | no |\n| `EBANC` | ✔ | ✔ | ✔ | 5 | **yes → best = 5** |\n| **`BANC`** | ✔ | ✔ | ✔ | **4** | **yes → best = 4** ✓ |\n\nNotice that the window keeps *growing* on the right between contractions — the left edge\nonly moves when the window is valid, so a window that is currently invalid can still\nbecome valid again later. That is why `"BANC"` is found at the very end and not earlier.\n\n## Java Solution\n\nSee [`MinimumWindowSubstring.java`](./MinimumWindowSubstring.java).\n\n```java\npublic static String minWindow(String s, String t) {\n    if (s.isEmpty() || t.isEmpty() || t.length() > s.length()) {\n        return "";\n    }\n    Map<Character, Integer> need = new HashMap<>();\n    for (char c : t.toCharArray()) {\n        need.merge(c, 1, Integer::sum);\n    }\n    Map<Character, Integer> window = new HashMap<>();\n\n    int required = need.size();\n    int formed = 0;\n    int left = 0;\n    int bestLength = Integer.MAX_VALUE;\n    int bestStart = 0;\n\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        if (need.containsKey(c)) {\n            int count = window.merge(c, 1, Integer::sum);\n            if (count == need.get(c)) {\n                formed++;\n            }\n        }\n        while (formed == required) {\n            if (right - left + 1 < bestLength) {\n                bestLength = right - left + 1;\n                bestStart = left;\n            }\n            char removed = s.charAt(left);\n            if (need.containsKey(removed)) {\n                int count = window.merge(removed, -1, Integer::sum);\n                if (count < need.get(removed)) {\n                    formed--;\n                }\n            }\n            left++;\n        }\n    }\n    return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(\\|s\\| + \\|t\\|) | Both pointers move forward at most \\|s\\| times |\n| **Space** | O(\\|t\\|) | One map entry per distinct character of `t` |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Return all minimum windows when there are several."* → collect every window whose\n  length equals the best instead of keeping only one.\n- *"What if `t` contains characters that never appear in `s`?"* → return `""` immediately;\n  the algorithm already handles it (the window never becomes valid).\n- *"How would you stream this?"* → keep the two maps and the left edge; the answer so far\n  is final for the prefix seen so far, but the window start may need to be re-scanned.\n- *"How does this relate to finding the smallest anagram window?"* → that is the same\n  algorithm with `need` built from the pattern instead of a separate string.\n\n**Common mistakes:**\n- ❌ Counting occurrences instead of distinct characters in `formed` → `"AAABC"` would be\n  judged invalid for `t = "ABC"`.\n- ❌ Shrinking the window even when it is invalid → the window may lose characters it still\n  needs and never recover.\n- ❌ Comparing counts with `==` after the increment when the character was already over\n  quota → `formed` would be incremented twice.\n- ❌ Forgetting the `bestLength == Integer.MAX_VALUE` case → you would throw instead of\n  returning `""`.\n\n**How to narrate:**\n> "I\'ll slide a window over `s`. I keep a map of what `t` needs and a map of what the window\n> has, plus a counter of how many *distinct* required characters are fully covered. When\n> that counter reaches the number of distinct characters in `t` the window is valid, and I\n> shrink it from the left as far as I can, recording the length at every step. The shortest\n> recorded window is the answer."\n\n## Related Problems\n\n- [Find All Anagrams in a String](./FindAllAnagramsInString.java) — fixed-size windows\n- [Permutation in String](./PermutationInString.java) — the same idea as a boolean\n- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the opposite constraint\n',i=[`minWindow`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};