var e=`math.ReverseInteger`,t=`package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Reverse Integer
 * LeetCode: 7 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Digit manipulation, Overflow check
 *
 * <p>Problem:
 * Reverse the digits of a signed 32-bit integer. When the reversed value does not fit
 * into a signed 32-bit integer, {@code 0} is returned.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * -123
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -321
 * </pre>
 *
 * <p>Approach: pull the last digit off with {@code % 10} and append it to the result
 * with {@code result * 10 + digit}. The overflow is detected before it happens by
 * comparing the candidate result with the bounds of the 32-bit range.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class ReverseInteger {

    /**
     * Reverses the digits of {@code x}.
     *
     * @param x the number to reverse
     * @return the reversed number, or {@code 0} when it does not fit into an int
     */
    public static int reverse(int x) {
        long result = 0;
        long value = x;
        while (value != 0) {
            result = result * 10 + value % 10;
            value /= 10;
        }
        if (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) {
            return 0;
        }
        return (int) result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(reverse(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Reverse Integer
 * LeetCode: 7 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Digit manipulation, Overflow check
 *
 * <p>Problem:
 * Reverse the digits of a signed 32-bit integer. When the reversed value does not fit
 * into a signed 32-bit integer, {@code 0} is returned.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * -123
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -321
 * </pre>
 *
 * <p>Approach: pull the last digit off with {@code % 10} and append it to the result
 * with {@code result * 10 + digit}. The overflow is detected before it happens by
 * comparing the candidate result with the bounds of the 32-bit range.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class Main {

    /**
     * Reverses the digits of {@code x}.
     *
     * @param x the number to reverse
     * @return the reversed number, or {@code 0} when it does not fit into an int
     */
    public static int reverse(int x) {
        long result = 0;
        long value = x;
        while (value != 0) {
            result = result * 10 + value % 10;
            value /= 10;
        }
        if (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) {
            return 0;
        }
        return (int) result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(reverse(n));
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
# Reverse Integer — LeetCode 7

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Digit manipulation · Overflow check |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Reverse the digits of a signed 32-bit integer.

- \`-123\` → \`-321\`
- \`120\` → \`21\` (the leading zeros disappear)
- \`1534236469\` → \`0\` — the reversed value does not fit into a 32-bit integer, so \`0\`
  is returned.

## Input Format

The program reads from standard input:

\`\`\`
n
\`\`\`

- \`n\` — the number to reverse (-2³¹ ≤ n ≤ 2³¹ - 1)

## Sample Input

\`\`\`
-123
\`\`\`

## Expected Output

\`\`\`
-321
\`\`\`

## Approach — pull the digits off the end

The classic loop:

\`\`\`
result = result * 10 + n % 10
n = n / 10
\`\`\`

\`n % 10\` gives the last digit (also for negative numbers in Java: \`-123 % 10 = -3\`),
and \`n / 10\` removes it.

**Overflow:** the intermediate \`result * 10\` can leave the 32-bit range. The trick is to
accumulate in a \`long\` (64 bits) and check the bounds **once at the end** — a \`long\`
holds every value an \`int\` reversal can produce, including \`2147483647 → 7463847412\`.

## Dry Run

Input: \`n = -123\`

| Step | \`value\` before | \`value % 10\` | \`result\` after | \`value\` after |
|---:|---:|---:|---:|---:|
| 1 | -123 | -3 | \`0 * 10 + (-3) = -3\` | -12 |
| 2 | -12 | -2 | \`-3 * 10 + (-2) = -32\` | -1 |
| 3 | -1 | -1 | \`-32 * 10 + (-1) = -321\` | 0 |

\`result = -321\` fits into an \`int\` → output **-321**.

### Trace with a real overflow — \`n = 1534236469\`

| Step | \`value\` before | \`value % 10\` | \`result\` after | \`value\` after |
|---:|---:|---:|---:|---:|
| 1 | 1534236469 | 9 | 9 | 153423646 |
| 2 | 153423646 | 6 | 96 | 15342364 |
| 3 | 15342364 | 4 | 964 | 1534236 |
| 4 | 1534236 | 6 | 9646 | 153423 |
| 5 | 153423 | 3 | 96463 | 15342 |
| 6 | 15342 | 2 | 964632 | 1534 |
| 7 | 1534 | 4 | 9646324 | 153 |
| 8 | 153 | 3 | 96463243 | 15 |
| 9 | 15 | 5 | 964632435 | 1 |
| 10 | 1 | 1 | 9646324351 | 0 |

\`result = 9646324351 > Integer.MAX_VALUE (2147483647)\` → the reversal does not fit into
an \`int\` → output **0**.

### Trace with a reversal that still fits — \`n = 987654321\`

| Step | \`value\` before | \`value % 10\` | \`result\` after | \`value\` after |
|---:|---:|---:|---:|---:|
| 1 | 987654321 | 1 | 1 | 98765432 |
| … | … | … | … | … |
| 9 | 12 | 2 | 123456789 | 0 |

\`result = 123456789\` fits into an \`int\` → output **123456789**.

### Trace with the largest int — \`n = 2147483647\`

| Step | \`value\` before | \`value % 10\` | \`result\` after | \`value\` after |
|---:|---:|---:|---:|---:|
| 1 | 2147483647 | 7 | 7 | 214748364 |
| … | … | … | … | … |
| 10 | 746384741 | 1 | \`7463847412\` (a \`long\`!) | 0 |

\`7463847412 > Integer.MAX_VALUE\` → the reversal does not fit → output **0**.

## Java Solution

See [\`ReverseInteger.java\`](./ReverseInteger.java).

\`\`\`java
public static int reverse(int x) {
    long result = 0;
    long value = x;
    while (value != 0) {
        result = result * 10 + value % 10;
        value /= 10;
    }
    if (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) {
        return 0;
    }
    return (int) result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | one iteration per digit |
| **Space** | O(1) | two \`long\` accumulators |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the input is a string?"* → the same loop over the characters; no overflow
  is possible, but leading zeros still disappear.
- *"Reverse only the part between two indices (LeetCode 7 variant)?"* → the same idea
  with a bound check on the index.
- *"How do you detect the overflow without a \`long\`?"* → before computing
  \`result * 10 + digit\`, check \`result > (MAX - digit) / 10\`.

**Common mistakes:**
- ❌ Using \`Math.abs(x)\` and forgetting the sign — the negative sign must survive.
- ❌ Checking the overflow only at the end with \`int\` arithmetic — the overflow already
  happened.
- ❌ Forgetting that \`x % 10\` is negative in Java for negative numbers (that is
  actually what makes the sign "stick" automatically).

**How to narrate:**
> "I peel the last digit off with \`% 10\` and append it to the result. I accumulate in a
> \`long\` so the intermediate value cannot overflow, and I check the 32-bit bounds once
> at the end — if the reversal does not fit I return 0."

## Related Problems

- [Palindrome Number](./PalindromeNumber.md) — the same loop, only half the digits
- [Add Binary](./AddBinary.md) — digit arithmetic with a carry
`,i=[`reverse`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};