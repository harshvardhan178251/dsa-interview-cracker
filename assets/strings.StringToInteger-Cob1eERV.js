var e=`strings.StringToInteger`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: String to Integer (atoi)
 * LeetCode: 8 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Parsing, Overflow guards
 *
 * <p>Problem: Implement a function that converts a string to an integer, mimicking
 * {@code atoi}. Leading whitespace is ignored, an optional sign is honoured, digits
 * are read until the first non-digit character, and the result is clamped to the
 * 32-bit signed range instead of overflowing.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2147483648
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2147483647
 * </pre>
 *
 * <p>Approach: skip whitespace, read the optional sign, then accumulate digits into a
 * {@code long} and bail out with {@code Integer.MAX_VALUE} / {@code Integer.MIN_VALUE}
 * the moment the value would leave the 32-bit range.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class StringToInteger {

    /**
     * Converts a string to a 32-bit signed integer, the way {@code atoi} does.
     *
     * @param s the string to parse
     * @return the parsed value, clamped to {@code [Integer.MIN_VALUE, Integer.MAX_VALUE]}
     */
    public static int myAtoi(String s) {
        int i = 0;
        int n = s.length();

        // 1. Skip leading whitespace.
        while (i < n && Character.isWhitespace(s.charAt(i))) {
            i++;
        }
        if (i == n) {
            return 0;
        }

        // 2. Optional sign.
        int sign = 1;
        char signChar = s.charAt(i);
        if (signChar == '+' || signChar == '-') {
            sign = signChar == '-' ? -1 : 1;
            i++;
        }

        // 3. Digits, with an overflow guard on every step.
        long value = 0;
        while (i < n && isDigit(s.charAt(i))) {
            value = value * 10 + (s.charAt(i) - '0');
            if (sign == 1 && value > Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
            if (sign == -1 && -value < Integer.MIN_VALUE) {
                return Integer.MIN_VALUE;
            }
            i++;
        }

        return (int) (sign * value);
    }

    /** True for the ASCII digits {@code '0'..'9'} only. */
    private static boolean isDigit(char c) {
        return c >= '0' && c <= '9';
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(myAtoi(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: String to Integer (atoi)
 * LeetCode: 8 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Parsing, Overflow guards
 *
 * <p>Problem: Implement a function that converts a string to an integer, mimicking
 * {@code atoi}. Leading whitespace is ignored, an optional sign is honoured, digits
 * are read until the first non-digit character, and the result is clamped to the
 * 32-bit signed range instead of overflowing.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2147483648
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2147483647
 * </pre>
 *
 * <p>Approach: skip whitespace, read the optional sign, then accumulate digits into a
 * {@code long} and bail out with {@code Integer.MAX_VALUE} / {@code Integer.MIN_VALUE}
 * the moment the value would leave the 32-bit range.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Converts a string to a 32-bit signed integer, the way {@code atoi} does.
     *
     * @param s the string to parse
     * @return the parsed value, clamped to {@code [Integer.MIN_VALUE, Integer.MAX_VALUE]}
     */
    public static int myAtoi(String s) {
        int i = 0;
        int n = s.length();

        // 1. Skip leading whitespace.
        while (i < n && Character.isWhitespace(s.charAt(i))) {
            i++;
        }
        if (i == n) {
            return 0;
        }

        // 2. Optional sign.
        int sign = 1;
        char signChar = s.charAt(i);
        if (signChar == '+' || signChar == '-') {
            sign = signChar == '-' ? -1 : 1;
            i++;
        }

        // 3. Digits, with an overflow guard on every step.
        long value = 0;
        while (i < n && isDigit(s.charAt(i))) {
            value = value * 10 + (s.charAt(i) - '0');
            if (sign == 1 && value > Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
            if (sign == -1 && -value < Integer.MIN_VALUE) {
                return Integer.MIN_VALUE;
            }
            i++;
        }

        return (int) (sign * value);
    }

    /** True for the ASCII digits {@code '0'..'9'} only. */
    private static boolean isDigit(char c) {
        return c >= '0' && c <= '9';
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(myAtoi(s));
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
# String to Integer (atoi) — LeetCode 8

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Parsing · Overflow guards |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft, Apple |

## Problem Statement

Implement a function that converts a string into a 32-bit signed integer, exactly the
way C's \`atoi\` does:

1. Skip any leading **whitespace**.
2. Read an optional sign — \`+\` or \`-\`.
3. Read as many consecutive **digits** as possible; stop at the first other character.
4. Ignore everything after that.
5. If no digits were read, the result is \`0\`.
6. The result is **clamped** to \`[−2³¹, 2³¹ − 1]\` instead of overflowing.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — the string to parse, on a single line, no quotes.
- The scanner hands the parser one whitespace-free token; the parser itself also
  handles leading whitespace, which is covered by the unit tests.

## Sample Input

\`\`\`
2147483648
\`\`\`

## Expected Output

\`\`\`
2147483647
\`\`\`

\`2147483648\` is one larger than \`Integer.MAX_VALUE\`, so the value is clamped.

## Approach — Three phases plus a guard

The parse happens in three phases, each with its own loop:

| Phase | What it does |
|---|---|
| 1 | skip leading whitespace |
| 2 | consume an optional \`+\` / \`-\` and remember the sign |
| 3 | consume digits, accumulating \`value = value * 10 + digit\` |

**The overflow guard is the interesting part.** A \`long\` accumulator would happily
grow past \`2³¹\`, but the answer must fit in an \`int\`. So after every digit the value
is compared against the limit and the function returns the clamped bound immediately:

- positive and \`value > Integer.MAX_VALUE\` → return \`Integer.MAX_VALUE\`
- negative and \`value > 2³¹\` → return \`Integer.MIN_VALUE\`

Because the check runs *after* each digit, the accumulator never grows large: it is
stopped the moment it leaves the range.

## Dry Run

Input: \`s = "2147483648"\` — no leading whitespace, no sign, all digits.

| Step | i | \`s[i]\` | \`value\` (long) | \`value ≤ 2147483647\`? | action |
|---:|---:|---|---:|---|---|
| 1 | 0 | \`2\` | 2 | ✓ | continue |
| 2 | 1 | \`1\` | 21 | ✓ | continue |
| 3 | 2 | \`4\` | 214 | ✓ | continue |
| 4 | 3 | \`7\` | 2147 | ✓ | continue |
| 5 | 4 | \`4\` | 21474 | ✓ | continue |
| 6 | 5 | \`8\` | 214748 | ✓ | continue |
| 7 | 6 | \`3\` | 2147483 | ✓ | continue |
| 8 | 7 | \`6\` | 21474836 | ✓ | continue |
| 9 | 8 | \`4\` | 214748364 | ✓ | continue |
| 10 | 9 | \`8\` | 2147483648 | ✗ | **return \`Integer.MAX_VALUE\` = 2147483647** |

The loop is never left normally — the clamp short-circuits it.

### Trace with a sign and trailing garbage — \`s = "   -42abc"\`

| Step | phase | i | \`s[i]\` | \`value\` | note |
|---:|---|---:|---|---:|---|
| 1 | whitespace | 0 | \` \` | — | skip |
| 2 | whitespace | 1 | \` \` | — | skip |
| 3 | whitespace | 2 | \` \` | — | skip |
| 4 | sign | 3 | \`-\` | — | \`sign = −1\`, \`i → 4\` |
| 5 | digits | 4 | \`4\` | 4 | \`−4 ≤ 2147483648\` ✓ |
| 6 | digits | 5 | \`2\` | 42 | \`−42 ≥ −2147483648\` ✓ |
| 7 | stop | 6 | \`a\` | 42 | not a digit → stop reading |
| 8 | — | — | — | — | return \`sign * value\` = \`−42\` |

## Java Solution

See [\`StringToInteger.java\`](./StringToInteger.java).

\`\`\`java
public static int myAtoi(String s) {
    int i = 0;
    int n = s.length();
    while (i < n && Character.isWhitespace(s.charAt(i))) {
        i++;
    }
    if (i == n) {
        return 0;
    }
    int sign = 1;
    char signChar = s.charAt(i);
    if (signChar == '+' || signChar == '-') {
        sign = signChar == '-' ? -1 : 1;
        i++;
    }
    long value = 0;
    while (i < n && isDigit(s.charAt(i))) {
        value = value * 10 + (s.charAt(i) - '0');
        if (sign == 1 && value > Integer.MAX_VALUE) {
            return Integer.MAX_VALUE;
        }
        if (sign == -1 && -value < Integer.MIN_VALUE) {
            return Integer.MIN_VALUE;
        }
        i++;
    }
    return (int) (sign * value);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each character is inspected at most once |
| **Space** | O(1) | Only an index, a sign and an accumulator |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the number has to fit in a \`long\`?"* → same code, swap the limits for
  \`Long.MAX_VALUE\` / \`Long.MIN_VALUE\`; the accumulator is already a \`long\`.
- *"Parse it into a \`double\` instead?"* → handle the fractional part and the exponent
  separately — and then the overflow question changes shape entirely.
- *"What does \`Integer.parseInt\` do differently?"* → it throws
  \`NumberFormatException\` instead of clamping, and it rejects a leading \`+\` in older
  JDKs.
- *"How would you unit-test this?"* → table-driven: sign × digits × garbage ×
  boundary values.

**Common mistakes:**
- ❌ Building the result in an **\`int\`** → it overflows silently and wraps to a
  negative number (\`2147483648\` becomes \`-2147483648\`).
- ❌ Checking the overflow **only after the loop** → the damage is already done.
- ❌ Using \`Character.isDigit\` → it accepts Unicode digits such as \`'٣'\`; the spec
  says ASCII only.
- ❌ Forgetting to handle the empty / whitespace-only string → index out of bounds.

**How to narrate:**
> "This is a three-phase scan: skip whitespace, read an optional sign, then read
> digits. The part people get wrong is overflow. I accumulate into a long and check
> the limit after every single digit, so I can never overflow and I return the
> clamped bound the moment the value leaves the 32-bit range. O(n) time, O(1) space."

## Related Problems

- [Valid Number](../../../../../../docs/topics/02-strings.md) — the "is this a number?" grammar check
- [Excel Sheet Column Title](../../../../../../docs/topics/02-strings.md) — the reverse direction: number → string
`,i=[`myAtoi`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};