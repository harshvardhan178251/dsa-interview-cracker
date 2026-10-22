var e=`slidingwindow.LongestRepeatingCharacterReplacement`,t=`package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Longest Repeating Character Replacement
 * LeetCode: 424 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Greedy
 *
 * <p>Problem:
 * Given a string {@code s} and an integer {@code k}, return the length of the longest
 * substring of {@code s} such that **at most** {@code k} characters are replaced with other
 * characters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * AABABBA
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: a window of length L can be made uniform with at most
 * {@code L - (frequency of its most common character)} replacements. So a window is valid
 * when {@code windowLength - maxFrequency <= k}. Slide the window and shrink it from the
 * left whenever that condition breaks.
 *
 * <p>Complexity: Time O(n), Space O(min(n, alphabet)).
 */
public class LongestRepeatingCharacterReplacement {

    /**
     * Returns the length of the longest substring that can be made uniform with at most
     * {@code k} replacements.
     *
     * @param s the input string
     * @param k the number of replacements allowed
     * @return the maximum achievable length
     */
    public static int characterReplacement(String s, int k) {
        Map<Character, Integer> count = new HashMap<>();
        int left = 0;
        int maxCount = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            count.merge(c, 1, Integer::sum);
            if (count.get(c) > maxCount) {
                maxCount = count.get(c);
            }
            // Shrink until the window can be made uniform with k replacements.
            while (right - left + 1 - maxCount > k) {
                count.merge(s.charAt(left), -1, Integer::sum);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        int k = fs.nextInt();

        System.out.println(characterReplacement(s, k));
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
 * Problem: Longest Repeating Character Replacement
 * LeetCode: 424 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Greedy
 *
 * <p>Problem:
 * Given a string {@code s} and an integer {@code k}, return the length of the longest
 * substring of {@code s} such that **at most** {@code k} characters are replaced with other
 * characters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * AABABBA
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: a window of length L can be made uniform with at most
 * {@code L - (frequency of its most common character)} replacements. So a window is valid
 * when {@code windowLength - maxFrequency <= k}. Slide the window and shrink it from the
 * left whenever that condition breaks.
 *
 * <p>Complexity: Time O(n), Space O(min(n, alphabet)).
 */
public class Main {

    /**
     * Returns the length of the longest substring that can be made uniform with at most
     * {@code k} replacements.
     *
     * @param s the input string
     * @param k the number of replacements allowed
     * @return the maximum achievable length
     */
    public static int characterReplacement(String s, int k) {
        Map<Character, Integer> count = new HashMap<>();
        int left = 0;
        int maxCount = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            count.merge(c, 1, Integer::sum);
            if (count.get(c) > maxCount) {
                maxCount = count.get(c);
            }
            // Shrink until the window can be made uniform with k replacements.
            while (right - left + 1 - maxCount > k) {
                count.merge(s.charAt(left), -1, Integer::sum);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        int k = fs.nextInt();

        System.out.println(characterReplacement(s, k));
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
`,r='\n# Longest Repeating Character Replacement — LeetCode 424\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Sliding window · Greedy |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |\n\n## Problem Statement\n\nGiven a string `s` and an integer `k`, return the length of the longest substring of `s`\nsuch that **at most `k` characters** can be replaced to make all of them equal.\n\n- `"AABABBA"`, `k = 1` → the answer is `4` (`"BABA"` → `"AAAA"`, or `"AABA"` → `"AAAA"`).\n- `"ABAB"`, `k = 2` → the answer is `4`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\nk\n```\n\n- `s` — a non-empty string without whitespace (1 ≤ |s| ≤ 10⁵)\n- `k` — the number of replacements allowed (0 ≤ k ≤ |s|)\n\n## Sample Input\n\n```\nAABABBA\n1\n```\n\n## Expected Output\n\n```\n4\n```\n\n## Approach — Sliding window with a frequency budget\n\nA window of length `L` whose most common character appears `f` times can be made uniform\nwith exactly `L - f` replacements. So the window is valid iff\n\n```\nwindowLength - maxFrequency <= k\n```\n\nSlide `right` forward, maintaining the frequency map and `maxFrequency` — the largest\ncharacter count seen so far. Whenever the window becomes invalid, move `left` forward until\nit is valid again.\n\n**Why `maxFrequency` is never decreased.** This is the subtle part. If `maxFrequency` came\nfrom a character that has since left the window, the real number of replacements needed is\n*smaller* than `L - maxFrequency`, so keeping the stale (larger) `maxFrequency` is\n**conservative** — the window we accept is still valid, we might just accept a slightly\nshorter one. Not decreasing it keeps the algorithm O(n) instead of O(n²) (recomputing the\ntrue maximum on every shrink would be expensive).\n\n## Dry Run\n\nInput: `s = "AABABBA"`, `k = 1`\n\n| Step | right | char | window | `maxCount` | `len - maxCount` | `left` | valid? | best |\n|---:|---:|---|---|---:|---:|---:|---|---:|\n| 1 | 0 | `A` | `A` | 1 | 1 - 1 = 0 | 0 | yes | 1 |\n| 2 | 1 | `A` | `AA` | 2 | 2 - 2 = 0 | 0 | yes | 2 |\n| 3 | 2 | `B` | `AAB` | 2 | 3 - 2 = 1 | 0 | yes | 3 |\n| 4 | 3 | `A` | `AABA` | 3 | 4 - 3 = 1 | 0 | yes | 4 |\n| 5 | 4 | `B` | `AABAB` | 3 | 5 - 3 = 2 | 0 | **no** → shrink | 4 |\n| 5a | 4 | `B` | `ABAB` (left = 1) | 3 | 4 - 3 = 1 | 1 | yes | 4 |\n| 6 | 5 | `B` | `ABABB` | 3 | 5 - 3 = 2 | 1 | **no** → shrink | 4 |\n| 6a | 5 | `B` | `BABB` (left = 2) | 3 | 4 - 3 = 1 | 2 | yes | 4 |\n| 7 | 6 | `A` | `ABBA` + `A` → `ABBAA`? | 3 | 5 - 3 = 2 | 2 | **no** → shrink | 4 |\n| 7a | 6 | `A` | `ABBA` (left = 3) | 3 | 4 - 3 = 1 | 3 | yes | **4** |\n\nAnswer: **4**.\n\n### The frequency map at the end\n\n| Character | `A` | `B` |\n|---|---:|---:|\n| count in the final window `"ABBA"` | 2 | 2 |\n\n`4 - 3 = 1 ≤ k = 1` — one replacement turns `"ABBA"` into `"AAAA"`.\n\n## Java Solution\n\nSee [`LongestRepeatingCharacterReplacement.java`](./LongestRepeatingCharacterReplacement.java).\n\n```java\npublic static int characterReplacement(String s, int k) {\n    Map<Character, Integer> count = new HashMap<>();\n    int left = 0;\n    int maxCount = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        count.merge(c, 1, Integer::sum);\n        if (count.get(c) > maxCount) {\n            maxCount = count.get(c);\n        }\n        while (right - left + 1 - maxCount > k) {\n            count.merge(s.charAt(left), -1, Integer::sum);\n            left++;\n        }\n        best = Math.max(best, right - left + 1);\n    }\n    return best;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Each character enters and leaves the window once |\n| **Space** | O(min(n, Σ)) | One map entry per distinct character |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the string has a fixed alphabet?"* → use a 26- or 128-entry array instead of a map.\n- *"Return the substring too."* → remember the best `left` and `right`.\n- *"What if exactly `k` replacements are required?"* → the constraint becomes\n  `windowLength - maxFrequency == k`, so you must *grow* the window as well as shrink it.\n- *"Why is `maxCount` allowed to be stale?"* → because it only ever over-estimates the\n  number of replacements needed, so the accepted window is always valid; recomputing the\n  true maximum would cost O(n) per shrink.\n\n**Common mistakes:**\n- ❌ Decreasing `maxCount` when the most common character leaves the window → the classic\n  wrong answer is `3` instead of `4` for `"AABABBA"`, `k = 1`.\n- ❌ Using `==` instead of `<=` for the validity test → off-by-one.\n- ❌ Forgetting to decrement the frequency of the character leaving the window → the map\n  drifts and the window shrinks too much.\n- ❌ Assuming the most common character of the *whole string* is the one to target → it is\n  the most common character **of the current window**.\n\n**How to narrate:**\n> "A window of length L whose most common character appears f times needs exactly L - f\n> replacements to become uniform. So I slide a window and keep it valid while\n> `length - maxFrequency <= k`. I keep `maxFrequency` as the largest count seen so far and\n> never decrease it — that only makes the test stricter, never wrong, and it keeps the\n> solution linear."\n\n## Related Problems\n\n- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the same window with a budget of zero duplicates\n- [Minimum Window Substring](./MinimumWindowSubstring.java) — a window that must contain everything\n- [Longest Subarray with At Most K Distinct](./LongestSubarrayWithAtMostKDistinct.java) — the array version\n',i=[`characterReplacement`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};