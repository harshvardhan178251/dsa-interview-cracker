var e=`math.AddBinary`,t=`package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Add Binary
 * LeetCode: 415 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit manipulation, Carry propagation
 *
 * <p>Problem:
 * Add two binary strings and return the result as a binary string. The strings may be
 * very long, so no numeric conversion is used.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1010
 * 1011
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10101
 * </pre>
 *
 * <p>Approach: walk both strings from right to left, add the two digits plus the carry
 * and append {@code sum % 2} to the result while carrying {@code sum / 2} over. The
 * result is built backwards and reversed at the end.
 *
 * <p>Complexity: Time O(max(|a|, |b|)), Space O(max(|a|, |b|)).
 */
public class AddBinary {

    /**
     * Adds two binary strings.
     *
     * @param a first binary string
     * @param b second binary string
     * @return the sum of the two numbers as a binary string
     */
    public static String addBinary(String a, String b) {
        if (a == null) {
            a = "";
        }
        if (b == null) {
            b = "";
        }
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;
        StringBuilder result = new StringBuilder();
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) {
                sum += a.charAt(i--) - '0';
            }
            if (j >= 0) {
                sum += b.charAt(j--) - '0';
            }
            result.append((char) ('0' + (sum % 2)));
            carry = sum / 2;
        }
        return result.reverse().toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String a = fs.next();
        String b = fs.next();

        System.out.println(addBinary(a, b));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Add Binary
 * LeetCode: 415 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit manipulation, Carry propagation
 *
 * <p>Problem:
 * Add two binary strings and return the result as a binary string. The strings may be
 * very long, so no numeric conversion is used.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1010
 * 1011
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10101
 * </pre>
 *
 * <p>Approach: walk both strings from right to left, add the two digits plus the carry
 * and append {@code sum % 2} to the result while carrying {@code sum / 2} over. The
 * result is built backwards and reversed at the end.
 *
 * <p>Complexity: Time O(max(|a|, |b|)), Space O(max(|a|, |b|)).
 */
public class Main {

    /**
     * Adds two binary strings.
     *
     * @param a first binary string
     * @param b second binary string
     * @return the sum of the two numbers as a binary string
     */
    public static String addBinary(String a, String b) {
        if (a == null) {
            a = "";
        }
        if (b == null) {
            b = "";
        }
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;
        StringBuilder result = new StringBuilder();
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) {
                sum += a.charAt(i--) - '0';
            }
            if (j >= 0) {
                sum += b.charAt(j--) - '0';
            }
            result.append((char) ('0' + (sum % 2)));
            carry = sum / 2;
        }
        return result.reverse().toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String a = fs.next();
        String b = fs.next();

        System.out.println(addBinary(a, b));
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
# Add Binary — LeetCode 415

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bit manipulation · Carry propagation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given two binary strings, return the sum of the two numbers **as a binary string**.

- \`1010 + 1011 = 10101\`
- The strings may be very long — do not convert them to an integer.

## Input Format

The program reads from standard input:

\`\`\`
a
b
\`\`\`

- \`a\` — the first binary string
- \`b\` — the second binary string

## Sample Input

\`\`\`
1010
1011
\`\`\`

## Expected Output

\`\`\`
10101
\`\`\`

\`1010₂ = 10\` and \`1011₂ = 11\`, and \`10 + 11 = 21 = 10101₂\`.

## Approach — add digit by digit, from the right

Walk both strings from the **right** (least significant digit first). For every
position add the two digits and the carry:

- the resulting digit is \`sum % 2\`,
- the carry for the next position is \`sum / 2\`.

The digits are produced right-to-left, so the result is built in reverse and flipped
at the end.

**Why this is correct:** binary addition is exactly the same as decimal addition
except that the base is 2 — a sum of two digits plus a carry is at most \`1 + 1 + 1 = 3\`,
which is \`1\` with a carry of \`1\` in base 2. The loop processes every digit of both
strings and then keeps going while a carry is left, so no digit is ever missed.

## Dry Run

Input: \`a = "1010"\`, \`b = "1011"\`

| Step | digit of \`a\` | digit of \`b\` | carry in | sum | digit out (\`sum % 2\`) | carry out (\`sum / 2\`) | result (reversed) |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 0 | 1 | 1 | 0 | \`1\` |
| 2 | 1 | 1 | 0 | 2 | 0 | 1 | \`10\` |
| 3 | 0 | 0 | 1 | 1 | 1 | 0 | \`101\` |
| 4 | 1 | 1 | 0 | 2 | 0 | 1 | \`1010\` |
| 5 | — | — | 1 | 1 | 1 | 0 | \`10101\` |

Reversing \`10101\` gives \`10101\` — the same string, because the sum is symmetric here.
For \`a = "11"\`, \`b = "1"\` the reversed result \`001\` becomes \`"11"\` after the flip (and
the leading zero is dropped by the reversal of a shorter string).

## Java Solution

See [\`AddBinary.java\`](./AddBinary.java).

\`\`\`java
public static String addBinary(String a, String b) {
    int i = a.length() - 1;
    int j = b.length() - 1;
    int carry = 0;
    StringBuilder result = new StringBuilder();
    while (i >= 0 || j >= 0 || carry > 0) {
        int sum = carry;
        if (i >= 0) {
            sum += a.charAt(i--) - '0';
        }
        if (j >= 0) {
            sum += b.charAt(j--) - '0';
        }
        result.append((char) ('0' + (sum % 2)));
        carry = sum / 2;
    }
    return result.reverse().toString();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(max(\\|a\\|, \\|b\\|)) | one pass over the longer string |
| **Space** | O(max(\\|a\\|, \\|b\\|)) | the result buffer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the inputs are numbers instead of strings?"* → use the bit operators
  (\`a ^ b\` for the sum without carries, \`(a & b) << 1\` for the carries) and repeat
  until the carries vanish.
- *"Subtract two binary strings."* → the same loop, but borrow instead of carry.
- *"What if the base was 7?"* → the same algorithm with \`sum % 7\` and \`sum / 7\`.

**Common mistakes:**
- ❌ Converting the strings to \`int\` — they may be far too long.
- ❌ Forgetting to continue the loop while a carry is left (\`"1" + "1" = "10"\`).
- ❌ Not reversing the result at the end — the digits come out least-significant first.

**How to narrate:**
> "I add the two strings from the right, keeping a carry: the digit is \`sum % 2\` and
> the next carry is \`sum / 2\`. The digits come out backwards, so I flip the buffer at
> the end. It is the same as schoolbook addition, just in base 2."

## Related Problems

- [Reverse Integer](./ReverseInteger.md) — the other "pull the digits apart" routine
- [Palindrome Number](./PalindromeNumber.md) — digit manipulation
`,i=[`addBinary`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};