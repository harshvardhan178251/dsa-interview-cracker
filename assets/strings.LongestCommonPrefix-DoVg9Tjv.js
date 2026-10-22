var e=`strings.LongestCommonPrefix`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Common Prefix
 * LeetCode: 14 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Vertical scan
 *
 * <p>Problem: Given an array of strings, return the longest prefix that **every**
 * string in the array starts with. When there is no common prefix, return the empty
 * string.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * strs[0]
 * strs[1]
 * ...
 * strs[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * flower
 * flow
 * flight
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * fl
 * </pre>
 *
 * <p>Approach: keep the candidate prefix in a variable and shorten it against every
 * following string, character by character.
 *
 * <p>Complexity: Time O(n * m), Space O(m) for the prefix.
 */
public class LongestCommonPrefix {

    /**
     * Returns the longest common prefix of the given strings.
     *
     * @param strs the array of strings
     * @return the longest common prefix, or {@code ""} when there is none
     */
    public static String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) {
            return "";
        }

        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            int j = 0;
            int limit = Math.min(prefix.length(), strs[i].length());
            while (j < limit && prefix.charAt(j) == strs[i].charAt(j)) {
                j++;
            }
            prefix = prefix.substring(0, j);
            if (prefix.isEmpty()) {
                return ""; // nothing can be added back, stop early
            }
        }
        return prefix;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] strs = fs.nextStringArray(n);

        System.out.println(longestCommonPrefix(strs));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Longest Common Prefix
 * LeetCode: 14 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Vertical scan
 *
 * <p>Problem: Given an array of strings, return the longest prefix that **every**
 * string in the array starts with. When there is no common prefix, return the empty
 * string.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * strs[0]
 * strs[1]
 * ...
 * strs[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * flower
 * flow
 * flight
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * fl
 * </pre>
 *
 * <p>Approach: keep the candidate prefix in a variable and shorten it against every
 * following string, character by character.
 *
 * <p>Complexity: Time O(n * m), Space O(m) for the prefix.
 */
public class Main {

    /**
     * Returns the longest common prefix of the given strings.
     *
     * @param strs the array of strings
     * @return the longest common prefix, or {@code ""} when there is none
     */
    public static String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) {
            return "";
        }

        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            int j = 0;
            int limit = Math.min(prefix.length(), strs[i].length());
            while (j < limit && prefix.charAt(j) == strs[i].charAt(j)) {
                j++;
            }
            prefix = prefix.substring(0, j);
            if (prefix.isEmpty()) {
                return ""; // nothing can be added back, stop early
            }
        }
        return prefix;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] strs = fs.nextStringArray(n);

        System.out.println(longestCommonPrefix(strs));
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
# Longest Common Prefix — LeetCode 14

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · Vertical scan |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Bloomberg |

## Problem Statement

Given an array of strings, return the longest prefix that **every** string shares.

- \`["flower", "flow", "flight"]\` → \`"fl"\`
- \`["dog", "racecar", "car"]\` → \`""\` (no common prefix)

## Input Format

The program reads from standard input:

\`\`\`
n
strs[0]
strs[1]
...
strs[n-1]
\`\`\`

- \`n\` — the number of strings (0 ≤ n ≤ 10⁴).
- The next \`n\` lines each hold one string, no quotes, no whitespace inside.

## Sample Input

\`\`\`
3
flower
flow
flight
\`\`\`

## Expected Output

\`\`\`
fl
\`\`\`

## Approach — Shrink the prefix as you go

Keep the current best prefix (initially the first string) and test it against every
following string:

1. Compare the prefix with \`strs[i]\` character by character, up to the length of the
   shorter one.
2. Cut the prefix down to the number of characters that matched.
3. If the prefix became empty, stop immediately — it can never grow again.

**Why this is efficient:** the prefix only ever gets **shorter**, so the total work is
bounded by \`n × m\` where \`m\` is the length of the first string — not
\`n × m²\` as a naive "compare every pair of strings" approach would be.

**Alternative — horizontal scan:** find the common prefix of the first two strings,
then intersect it with the third, and so on. Same complexity, slightly different
shape.

## Dry Run

Input: \`strs = ["flower", "flow", "flight"]\`

Start: \`prefix = "flower"\` (the first string)

| Step | i | \`strs[i]\` | comparison | matched \`j\` | prefix after |
|---:|---:|---|---|---:|---|
| 1 | 1 | \`"flow"\` | \`f\`=\`f\` ✓, \`l\`=\`l\` ✓, \`o\`≠\`i\` ✗ | 2 | \`"fl"\` |
| 2 | 2 | \`"flight"\` | \`f\`=\`f\` ✓, \`l\`=\`l\` ✓, \`o\`≠\`i\` ✗ | 2 | \`"fl"\` |

Loop ends → **\`"fl"\`**

### The character-by-character comparison in step 1

| j | \`prefix[j]\` | \`strs[1][j]\` | equal? |
|---:|---|---|---|
| 0 | \`f\` | \`f\` | ✓ |
| 1 | \`l\` | \`l\` | ✓ |
| 2 | \`o\` | \`o\` vs \`i\` | ✗ → stop, \`j = 2\` |

\`prefix.substring(0, 2)\` = \`"fl"\`.

### A rejection — \`["dog", "racecar", "car"]\`

| Step | i | \`strs[i]\` | comparison | matched \`j\` | prefix after |
|---:|---:|---|---|---:|---|
| 1 | 1 | \`"racecar"\` | \`d\`≠\`r\` ✗ | 0 | \`""\` → **early exit** |

The prefix is empty, so the answer is \`""\` — there is no need to look at \`"car"\`.

## Java Solution

See [\`LongestCommonPrefix.java\`](./LongestCommonPrefix.java).

\`\`\`java
public static String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) {
        return "";
    }
    String prefix = strs[0];
    for (int i = 1; i < strs.length; i++) {
        int j = 0;
        int limit = Math.min(prefix.length(), strs[i].length());
        while (j < limit && prefix.charAt(j) == strs[i].charAt(j)) {
            j++;
        }
        prefix = prefix.substring(0, j);
        if (prefix.isEmpty()) {
            return "";
        }
    }
    return prefix;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · m) | n strings, at most m characters compared per string (m = length of the first string) |
| **Space** | O(m) | The prefix string |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the input is a trie of millions of strings?"* → insert them into a trie
  and walk down until the node has no children; O(total length) to build.
- *"Find the longest common prefix of a file system — thousands of paths?"* → sort
  the paths and compare only the first and the last one; sorting guarantees they
  differ as early as possible.
- *"What if the strings are streamed and you cannot keep them all?"* → keep the
  running prefix, exactly as above.
- *"Longest common **suffix** instead?"* → the same algorithm applied to the
  reversed strings.

**Common mistakes:**
- ❌ Comparing the **full strings** instead of the prefix → O(n · m²).
- ❌ Forgetting the \`Math.min\` bound → \`StringIndexOutOfBoundsException\` when one
  string is shorter than the prefix.
- ❌ Not handling the **empty array** → \`strs[0]\` throws.
- ❌ Returning the first string when the array has **one element** without checking —
  in this case that is correct, but it should be a deliberate decision.

**How to narrate:**
> "I keep the running prefix, starting from the first string, and test it against
> every other string character by character, cutting it down to the part that
> matched. The prefix only gets shorter, so the total work is O(n times m) rather
> than comparing every pair. If it ever becomes empty I can stop right away."

## Related Problems

- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — a similar "compare two strings" contract
- [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md) — the substring cousin
`,i=[`longestCommonPrefix`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};