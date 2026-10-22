var e=`strings.LongestPalindromicSubstring`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Palindromic Substring
 * LeetCode: 5 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Expand around centre
 *
 * <p>Problem: Given a string {@code s}, return the longest <b>contiguous</b> substring
 * of {@code s} that is a palindrome.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * babad
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * bab
 * </pre>
 *
 * <p>Approach: every palindrome has a centre — either on a character (odd length) or
 * between two characters (even length). For each of the 2n-1 possible centres, expand
 * outwards while the two characters match and keep the longest result.
 *
 * <p>Complexity: Time O(n²), Space O(1).
 */
public class LongestPalindromicSubstring {

    /**
     * Returns the longest palindromic substring of {@code s}.
     *
     * <p>When several palindromes share the maximum length, the one that starts
     * earliest is returned (the answer is deterministic).
     *
     * @param s the input string
     * @return the longest palindromic substring, or {@code ""} for an empty string
     */
    public static String longestPalindrome(String s) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        int bestStart = 0;
        int bestLength = 1;

        for (int centre = 0; centre < s.length(); centre++) {
            // Odd length: the centre sits on s[centre].
            int odd = expand(s, centre, centre);
            if (odd > bestLength) {
                bestLength = odd;
                bestStart = centre - odd / 2;
            }

            // Even length: the centre sits between s[centre] and s[centre + 1].
            int even = expand(s, centre, centre + 1);
            if (even > bestLength) {
                bestLength = even;
                bestStart = centre - (even - 1) / 2;
            }
        }

        return s.substring(bestStart, bestStart + bestLength);
    }

    /**
     * Expands outwards from {@code left}/{@code right} while the characters match.
     *
     * @return the length of the palindrome that was found
     */
    private static int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // The loop stopped with left/right just outside the palindrome.
        return right - left - 1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestPalindrome(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Longest Palindromic Substring
 * LeetCode: 5 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Expand around centre
 *
 * <p>Problem: Given a string {@code s}, return the longest <b>contiguous</b> substring
 * of {@code s} that is a palindrome.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * babad
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * bab
 * </pre>
 *
 * <p>Approach: every palindrome has a centre — either on a character (odd length) or
 * between two characters (even length). For each of the 2n-1 possible centres, expand
 * outwards while the two characters match and keep the longest result.
 *
 * <p>Complexity: Time O(n²), Space O(1).
 */
public class Main {

    /**
     * Returns the longest palindromic substring of {@code s}.
     *
     * <p>When several palindromes share the maximum length, the one that starts
     * earliest is returned (the answer is deterministic).
     *
     * @param s the input string
     * @return the longest palindromic substring, or {@code ""} for an empty string
     */
    public static String longestPalindrome(String s) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        int bestStart = 0;
        int bestLength = 1;

        for (int centre = 0; centre < s.length(); centre++) {
            // Odd length: the centre sits on s[centre].
            int odd = expand(s, centre, centre);
            if (odd > bestLength) {
                bestLength = odd;
                bestStart = centre - odd / 2;
            }

            // Even length: the centre sits between s[centre] and s[centre + 1].
            int even = expand(s, centre, centre + 1);
            if (even > bestLength) {
                bestLength = even;
                bestStart = centre - (even - 1) / 2;
            }
        }

        return s.substring(bestStart, bestStart + bestLength);
    }

    /**
     * Expands outwards from {@code left}/{@code right} while the characters match.
     *
     * @return the length of the palindrome that was found
     */
    private static int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // The loop stopped with left/right just outside the palindrome.
        return right - left - 1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestPalindrome(s));
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
`,r=`
# Longest Palindromic Substring — LeetCode 5

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Expand around centre · Two Pointers |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given a string \`s\`, return the **longest contiguous substring** of \`s\` that is a
palindrome.

- If several answers have the same maximum length, any of them may be returned —
  this implementation returns the one that starts **earliest**, so the output is
  deterministic.
- \`"babad"\` has two length-3 answers: \`"bab"\` and \`"aba"\`. This program prints \`"bab"\`.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — the string to scan (1 ≤ |s| ≤ 10³), on a single line, no quotes.

## Sample Input

\`\`\`
babad
\`\`\`

## Expected Output

\`\`\`
bab
\`\`\`

## Approach — Expand around every centre

Brute force checks every substring: O(n³) with a palindrome test per substring.
The key observation is that **every palindrome has a centre**, and there are only
\`2n - 1\` possible centres:

- **odd** length → the centre is a character, e.g. \`"bab"\` is centred on \`a\`
- **even** length → the centre is a gap, e.g. \`"abba"\` is centred between the two \`b\`s

So we try every centre and expand outwards while the two characters match. Each
expansion is a two-pointer walk, and the longest one wins.

| Centre | Odd expansion | Even expansion |
|---|---|---|
| \`i\` | \`(i, i)\` | \`(i, i + 1)\` |

**Why it is correct:** every palindrome in the string is symmetric around exactly one
of those centres, so the maximal expansion from that centre is at least as long as
that palindrome. Taking the maximum over all centres therefore yields the longest
palindrome.

**Tie-breaking:** we only replace the best answer when the new length is *strictly*
greater, and centres are visited left to right, so the earliest (leftmost) longest
palindrome wins.

## Dry Run

Input: \`s = "babad"\` — indices \`0:'b' 1:'a' 2:'b' 3:'a' 4:'d'\`

| Step | centre | type | expansion (left, right) | characters compared | length | best (start, len) | best string |
|---:|---:|---|---|---|---:|---|---|
| 1 | 0 | odd | (0, 0) | \`b\`=\`b\` ✓ → (-1, 1) stop | 1 | (0, 1) | \`b\` |
| 2 | 0 | even | (0, 1) | \`b\`≠\`a\` ✗ | 0 | (0, 1) | \`b\` |
| 3 | 1 | odd | (1, 1) | \`a\`=\`a\` ✓ → (0, 2) \`b\`=\`b\` ✓ → (-1, 3) stop | 3 | (0, 3) | **\`bab\`** |
| 4 | 1 | even | (1, 2) | \`a\`≠\`b\` ✗ | 0 | (0, 3) | \`bab\` |
| 5 | 2 | odd | (2, 2) | \`b\`=\`b\` ✓ → (1, 3) \`a\`=\`a\` ✓ → (0, 4) \`b\`≠\`d\` ✗ stop | 3 | (0, 3) | \`bab\` (tie — not strictly longer) |
| 6 | 2 | even | (2, 3) | \`b\`≠\`a\` ✗ | 0 | (0, 3) | \`bab\` |
| 7 | 3 | odd | (3, 3) | \`a\`=\`a\` ✓ → (2, 4) \`b\`≠\`d\` ✗ stop | 1 | (0, 3) | \`bab\` |
| 8 | 3 | even | (3, 4) | \`a\`≠\`d\` ✗ | 0 | (0, 3) | \`bab\` |
| 9 | 4 | odd | (4, 4) | \`d\`=\`d\` ✓ → (3, 5) stop | 1 | (0, 3) | \`bab\` |
| 10 | 4 | even | (4, 5) | out of bounds | 0 | (0, 3) | \`bab\` |

Final answer: \`s.substring(0, 0 + 3)\` = **\`bab\`**

### Why the length formula works

When the expansion stops, \`left\` and \`right\` are the two indices *just outside* the
palindrome, so the palindrome spans \`left + 1 .. right - 1\` and its length is
\`right - left - 1\`.

| centre | odd | even |
|---|---|---|
| 1 in \`"babad"\` | length 3 → start = \`1 - 3/2\` = \`0\` | length 0 → ignored |
| 2 in \`"babad"\` | length 3 → start = \`2 - 3/2\` = \`1\` (\`"aba"\`, tie) | length 0 → ignored |

For an even-length palindrome of length \`L\` the start is \`centre - (L - 1) / 2\`;
for an odd-length one it is \`centre - L / 2\`.

## Java Solution

See [\`LongestPalindromicSubstring.java\`](./LongestPalindromicSubstring.java).

\`\`\`java
public static String longestPalindrome(String s) {
    int bestStart = 0;
    int bestLength = 1;
    for (int centre = 0; centre < s.length(); centre++) {
        int odd = expand(s, centre, centre);
        if (odd > bestLength) {
            bestLength = odd;
            bestStart = centre - odd / 2;
        }
        int even = expand(s, centre, centre + 1);
        if (even > bestLength) {
            bestLength = even;
            bestStart = centre - (even - 1) / 2;
        }
    }
    return s.substring(bestStart, bestStart + bestLength);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | \`2n - 1\` centres, each expansion walks at most O(n) steps |
| **Space** | O(1) | Only indices and counters; the answer is a substring view, not a copy |

**Can it be better?** Yes — Manacher's algorithm solves it in **O(n)** using a
mirror trick. It is worth knowing the name, but almost nobody is asked to write it
from scratch.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in linear time?"* → Manacher's algorithm (O(n) with a mirror array).
- *"What if the string is very large — millions of characters?"* → the O(n²) version
  stops being practical; go linear or use a rolling hash / suffix approach.
- *"Return the longest palindromic **subsequence** instead?"* → that is a different
  problem, solved with DP in O(n²) time.
- *"What about the longest palindrome that spans the whole string?"* → trivial check,
  but a useful warm-up.

**Common mistakes:**
- ❌ Forgetting the **even** centre (\`i, i + 1\`) → \`"cbbd"\` would be missed entirely.
- ❌ Returning the palindrome of length 1 when the string is empty → guard the empty
  case before touching \`substring\`.
- ❌ Computing the start index with the wrong formula for even lengths → off-by-one
  that slices the wrong substring (e.g. \`"abba"\` → \`"bba"\`).

**How to narrate:**
> "Brute force is O(n³). The key insight is that a palindrome is fully described by
> its centre, and there are only 2n-1 centres. For each one I expand outwards with
> two pointers while the characters match, tracking the longest expansion. That's
> O(n²) time and O(1) extra space. If the interviewer wants linear time, that's
> Manacher's algorithm."

## Related Problems

- [Longest Palindromic Subsequence](../../../../../../docs/topics/02-strings.md) — the DP variant, characters may be skipped
- [Valid Palindrome II](../../../../../../docs/topics/02-strings.md) — the two-pointer palindrome scan
`,i=[`longestPalindrome`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};