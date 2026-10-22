var e=`slidingwindow.MinimumNumberOfFlips`,t=`package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

/**
 * Problem: Minimum Number of Flips to Make the Binary String Alternating
 * LeetCode: 188 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Sliding window, Counting
 *
 * <p>Problem:
 * Given a binary string {@code s}, return the **minimum number of characters to flip** so
 * that the string becomes alternating — that is, no two adjacent characters are equal.
 *
 * <p>Rotations are not allowed: the string itself must become alternating. (LeetCode 1888
 * adds a free rotation operation and is a different, harder problem.)
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 111000
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: an alternating binary string is completely determined by its first character,
 * so there are exactly two candidates: {@code 010101...} and {@code 101010...}. Count the
 * mismatches against each and take the smaller count. Because the two candidates differ at
 * every position, the second count is simply {@code length - firstCount}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MinimumNumberOfFlips {

    /**
     * Returns the minimum number of flips needed to make {@code s} alternating.
     *
     * @param s a binary string
     * @return the minimum number of character flips
     */
    public static int minimumFlips(String s) {
        int flipsStartingWithZero = 0;
        for (int i = 0; i < s.length(); i++) {
            char expected = (i % 2 == 0) ? '0' : '1';
            if (s.charAt(i) != expected) {
                flipsStartingWithZero++;
            }
        }
        // The other pattern is the exact complement, so it mismatches everywhere the first one matches.
        int flipsStartingWithOne = s.length() - flipsStartingWithZero;
        return Math.min(flipsStartingWithZero, flipsStartingWithOne);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(minimumFlips(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Minimum Number of Flips to Make the Binary String Alternating
 * LeetCode: 188 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Sliding window, Counting
 *
 * <p>Problem:
 * Given a binary string {@code s}, return the **minimum number of characters to flip** so
 * that the string becomes alternating — that is, no two adjacent characters are equal.
 *
 * <p>Rotations are not allowed: the string itself must become alternating. (LeetCode 1888
 * adds a free rotation operation and is a different, harder problem.)
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 111000
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: an alternating binary string is completely determined by its first character,
 * so there are exactly two candidates: {@code 010101...} and {@code 101010...}. Count the
 * mismatches against each and take the smaller count. Because the two candidates differ at
 * every position, the second count is simply {@code length - firstCount}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the minimum number of flips needed to make {@code s} alternating.
     *
     * @param s a binary string
     * @return the minimum number of character flips
     */
    public static int minimumFlips(String s) {
        int flipsStartingWithZero = 0;
        for (int i = 0; i < s.length(); i++) {
            char expected = (i % 2 == 0) ? '0' : '1';
            if (s.charAt(i) != expected) {
                flipsStartingWithZero++;
            }
        }
        // The other pattern is the exact complement, so it mismatches everywhere the first one matches.
        int flipsStartingWithOne = s.length() - flipsStartingWithZero;
        return Math.min(flipsStartingWithZero, flipsStartingWithOne);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(minimumFlips(s));
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
# Minimum Number of Flips to Make the Binary String Alternating — LeetCode 188

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sliding window · Counting · Strings |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Facebook |

## Problem Statement

Given a binary string \`s\`, return the **minimum number of characters to flip** so that the
string becomes **alternating** — that is, so that no two adjacent characters are equal.

- \`"111000"\` → \`2\` (flip positions 1 and 4 to get \`"101010"\`).
- \`"010"\` → \`0\` (already alternating).
- \`"1110"\` → \`1\` (flip position 1 to get \`"1010"\`).

> **Rotations are not allowed.** The string itself must become alternating. LeetCode 1888
> adds a free *rotate* operation and is a different, harder problem — the answer there can
> be smaller than the answer here.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — a non-empty binary string without whitespace (1 ≤ |s| ≤ 10⁵)

## Sample Input

\`\`\`
111000
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

## Approach — Only two possible targets

An alternating binary string is completely determined by its **first** character:

| target | pattern |
|---|---|
| A | \`0101010101…\` |
| B | \`1010101010…\` |

So there are exactly two candidates. Count the mismatches against each and take the
smaller.

**The second count is free.** The two patterns are exact complements: at every index they
disagree. So if pattern A mismatches at \`m\` positions, pattern B mismatches at exactly
\`|s| - m\` positions. One pass over the string is enough.

**Why not a sliding window?** There is nothing to slide — the target is a fixed pattern, so
the problem is a straight comparison. A "window" interpretation (a window of length \`n\`
where the window itself must alternate) leads to the same count.

## Dry Run

Input: \`s = "111000"\`

| index | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|---:|
| \`s[i]\` | \`1\` | \`1\` | \`1\` | \`0\` | \`0\` | \`0\` |
| pattern A (\`010101\`) | \`0\` | \`1\` | \`0\` | \`1\` | \`0\` | \`1\` |
| match? | ✘ | ✔ | ✘ | ✘ | ✔ | ✘ |
| pattern B (\`101010\`) | \`1\` | \`0\` | \`1\` | \`0\` | \`1\` | \`0\` |
| match? | ✔ | ✘ | ✔ | ✔ | ✘ | ✔ |

| Pattern | mismatches | count |
|---|---|---:|
| A — starts with \`0\` | indices 0, 2, 3, 5 | 4 |
| B — starts with \`1\` | indices 1, 4 | 2 |

\`min(4, 2) = 2\` → flip indices **1** and **4** to get \`"101010"\` ✓

### The counter view

| Step | i | \`s[i]\` | expected by A | A mismatch | expected by B | B mismatch |
|---:|---:|---:|---|---:|---|---:|
| 1 | 0 | \`1\` | \`0\` | 1 | \`1\` | 0 |
| 2 | 1 | \`1\` | \`1\` | 1 | \`0\` | 1 |
| 3 | 2 | \`1\` | \`0\` | 2 | \`1\` | 1 |
| 4 | 3 | \`0\` | \`1\` | 3 | \`0\` | 1 |
| 5 | 4 | \`0\` | \`0\` | 3 | \`1\` | 2 |
| 6 | 5 | \`0\` | \`1\` | 4 | \`0\` | 2 |

Final: A needs 4 flips, B needs 2 flips → **2**.

## Java Solution

See [\`MinimumNumberOfFlips.java\`](./MinimumNumberOfFlips.java).

\`\`\`java
public static int minimumFlips(String s) {
    int flipsStartingWithZero = 0;
    for (int i = 0; i < s.length(); i++) {
        char expected = (i % 2 == 0) ? '0' : '1';
        if (s.charAt(i) != expected) {
            flipsStartingWithZero++;
        }
    }
    int flipsStartingWithOne = s.length() - flipsStartingWithZero;
    return Math.min(flipsStartingWithZero, flipsStartingWithOne);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the string |
| **Space** | O(1) | Two counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if rotations are also allowed?"* → that is LeetCode 1888. For even-length strings
  a rotation swaps the two patterns, so the answer is unchanged; for odd-length strings you
  must try every rotation, which can be done in O(n) with a sliding count over \`s + s\`.
- *"Return the positions to flip."* → collect the indices where the string differs from
  the chosen pattern.
- *"What if the alphabet is larger than two symbols?"* → an alternating string over \`k\`
  symbols has \`k\` possible patterns per starting symbol; the comparison is still O(k·n).
- *"Could you do it with a sliding window?"* → yes, but it buys nothing here — the target
  is static.

**Common mistakes:**
- ❌ Forgetting that the pattern can start with either symbol → the answer would be 4
  instead of 2.
- ❌ Assuming the answer is \`min(mismatches, n - mismatches)\` without proving the two
  patterns are complementary — they are, but say why.
- ❌ Implementing the *rotation* variant (LeetCode 1888) when the problem does not allow
  it → the answer can be smaller and the code looks over-engineered.
- ❌ Off-by-one in the expected character (\`i % 2 == 0 ? '0' : '1'\`) → every comparison is
  inverted.

**How to narrate:**
> "An alternating binary string is determined by its first character, so there are only two
> possible targets: \`0101…\` and \`1010…\`. I'll count the mismatches against the first one;
> because the two patterns are exact complements, the second count is just the length minus
> the first. The answer is the smaller of the two."

## Related Problems

- [Longest Repeating Character Replacement](./LongestRepeatingCharacterReplacement.java) — the sliding-window cousin of this problem
- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the "no two neighbours equal" idea in its strictest form
`,i=[`minimumFlips`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};