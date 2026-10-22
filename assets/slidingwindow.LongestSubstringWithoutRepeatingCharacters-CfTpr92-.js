var e=`slidingwindow.LongestSubstringWithoutRepeatingCharacters`,t=`package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Longest Substring Without Repeating Characters
 * LeetCode: 3 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Sliding window, Hashing
 *
 * <p>Problem:
 * Given a string {@code s}, return the length of the **longest substring** that contains no
 * repeated characters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abcabcbb
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a classic sliding window. Keep the window {@code [left, right]} free of
 * duplicates and a map of the last position of every character. When a character that already
 * lives inside the window is seen again, move {@code left} just past its previous occurrence.
 *
 * <p>Complexity: Time O(n), Space O(min(n, alphabet)).
 */
public class LongestSubstringWithoutRepeatingCharacters {

    /**
     * Returns the length of the longest substring of {@code s} with all distinct characters.
     *
     * @param s the input string
     * @return the length of the longest duplicate-free substring
     */
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            Integer previous = lastSeen.get(c);
            // Only jump forward if the previous occurrence is still inside the window.
            if (previous != null && previous >= left) {
                left = previous + 1;
            }
            lastSeen.put(c, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(lengthOfLongestSubstring(s));
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
 * Problem: Longest Substring Without Repeating Characters
 * LeetCode: 3 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Sliding window, Hashing
 *
 * <p>Problem:
 * Given a string {@code s}, return the length of the **longest substring** that contains no
 * repeated characters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abcabcbb
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a classic sliding window. Keep the window {@code [left, right]} free of
 * duplicates and a map of the last position of every character. When a character that already
 * lives inside the window is seen again, move {@code left} just past its previous occurrence.
 *
 * <p>Complexity: Time O(n), Space O(min(n, alphabet)).
 */
public class Main {

    /**
     * Returns the length of the longest substring of {@code s} with all distinct characters.
     *
     * @param s the input string
     * @return the length of the longest duplicate-free substring
     */
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            Integer previous = lastSeen.get(c);
            // Only jump forward if the previous occurrence is still inside the window.
            if (previous != null && previous >= left) {
                left = previous + 1;
            }
            lastSeen.put(c, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(lengthOfLongestSubstring(s));
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
`,r='\n# Longest Substring Without Repeating Characters — LeetCode 3\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Sliding window · Hashing · Two pointers |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Uber, Adobe, Bloomberg |\n\n## Problem Statement\n\nGiven a string `s`, return the length of the **longest substring** that does not contain any\nrepeated character.\n\n- The substring must be contiguous.\n- `"abcabcbb"` → the answer is `"abc"`, length `3`.\n- `"bbbbb"` → the answer is `"b"`, length `1`.\n- `"pwwkew"` → the answer is `"wke"`, length `3`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\n```\n\n- `s` — a non-empty string without whitespace (1 ≤ |s| ≤ 5·10⁴)\n\n## Sample Input\n\n```\nabcabcbb\n```\n\n## Expected Output\n\n```\n3\n```\n\nThe longest duplicate-free substring is `"abc"`.\n\n## Approach — Sliding window with a last-seen map\n\nKeep a window `[left, right]` that contains no repeated character, plus a map\n`lastSeen` recording the **last index** each character was seen at.\n\nFor each new `right`:\n\n1. Let `c = s[right]`.\n2. If `c` was seen before **inside the current window** (`lastSeen[c] >= left`), the window\n   would now contain `c` twice. Move `left` to `lastSeen[c] + 1`, which drops the older\n   occurrence.\n3. Record `lastSeen[c] = right`.\n4. Update the answer with `right - left + 1`.\n\n**The `>= left` check is the whole trick.** The map holds the last occurrence *anywhere* in\nthe string, but an occurrence that has already been dropped from the window must not drag\n`left` backwards. Without the check, `left` could move backwards and the window could grow\nagain, breaking the invariant.\n\n**Why this is optimal.** The window is always the *longest* duplicate-free substring ending\nat `right`: we only ever move `left` when it is forced to. So the maximum over all `right`\nis the answer.\n\n## Dry Run\n\nInput: `s = "abcabcbb"`\n\n| Step | right | char | `lastSeen` before | previous index | `left` before | `left` after | window | length | best |\n|---:|---:|---|---|---:|---:|---:|---|---:|---:|\n| 1 | 0 | `a` | `{}` | — | 0 | 0 | `a` | 1 | 1 |\n| 2 | 1 | `b` | `{a: 0}` | — | 0 | 0 | `ab` | 2 | 2 |\n| 3 | 2 | `c` | `{a: 0, b: 1}` | — | 0 | 0 | `abc` | 3 | 3 |\n| 4 | 3 | `a` | `{a: 0, b: 1, c: 2}` | 0 | 0 | 1 | `bca` | 3 | 3 |\n| 5 | 4 | `b` | `{a: 3, b: 1, c: 2}` | 1 | 1 | 2 | `cab` | 3 | 3 |\n| 6 | 5 | `c` | `{a: 3, b: 4, c: 2}` | 2 | 2 | 3 | `abc` | 3 | 3 |\n| 7 | 6 | `b` | `{a: 3, b: 4, c: 5}` | 4 | 3 | 5 | `cb` | 2 | 3 |\n| 8 | 7 | `b` | `{a: 3, b: 6, c: 5}` | 6 | 5 | 7 | `b` | 1 | **3** |\n\nNote step 7: the previous `b` was at index `4`, but index `4 < left (3)`, so the window is\nuntouched — `left` stays at `3`.\n\n## Java Solution\n\nSee [`LongestSubstringWithoutRepeatingCharacters.java`](./LongestSubstringWithoutRepeatingCharacters.java).\n\n```java\npublic static int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> lastSeen = new HashMap<>();\n    int left = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        Integer previous = lastSeen.get(c);\n        if (previous != null && previous >= left) {\n            left = previous + 1;\n        }\n        lastSeen.put(c, right);\n        best = Math.max(best, right - left + 1);\n    }\n    return best;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Each pointer moves forward at most n times |\n| **Space** | O(min(n, Σ)) | One map entry per distinct character |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Return the substring, not just its length."* → remember the `left` of the best window.\n- *"What if the alphabet is small (say 26 lowercase letters)?"* → replace the map with a\n  fixed-size array of size 26 — faster and allocation-free.\n- *"What if you need the longest substring with at most `k` distinct characters?"* → same\n  window, count distinct instead of detecting repeats.\n- *"How would you do this in a streaming fashion, where the string arrives chunk by\n  chunk?"* → keep the map and the window start; the answer so far is valid but the window\n  may need to be re-scanned if a very old duplicate arrives.\n\n**Common mistakes:**\n- ❌ Forgetting the `previous >= left` check → `left` can move backwards and the window\n  contains a duplicate.\n- ❌ Setting `left = previous` instead of `previous + 1` → the duplicate stays in the window.\n- ❌ Using `s.charAt(i)` on a string being mutated → use a `char[]` if you plan to modify it.\n- ❌ Resetting the map when `left` moves → you would lose the last-seen information for\n  characters still inside the window.\n\n**How to narrate:**\n> "I\'ll keep a window with no repeated characters and a map from each character to the index\n> where it last appeared. When a character repeats inside the window I move the left edge\n> just past its previous occurrence — and I only do that if the previous occurrence is still\n> inside the window. The window is always the longest valid one ending at the current right\n> edge, so the maximum over all steps is the answer."\n\n## Related Problems\n\n- [Longest Repeating Character Replacement](./LongestRepeatingCharacterReplacement.java) — the same window with a budget of replacements\n- [Minimum Window Substring](./MinimumWindowSubstring.java) — a window that must *contain* everything\n- [Longest Subarray with At Most K Distinct](./LongestSubarrayWithAtMostKDistinct.java) — the array version\n',i=[`lengthOfLongestSubstring`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};