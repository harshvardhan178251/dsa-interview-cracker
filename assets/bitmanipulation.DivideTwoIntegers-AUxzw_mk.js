var e=`bitmanipulation.DivideTwoIntegers`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Divide Two Integers
 * LeetCode: 29 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bit tricks, Shifts
 *
 * <p>Problem:
 * Given two integers {@code dividend} and {@code divisor}, compute their integer quotient
 * **truncated toward zero** — the result must not round toward negative infinity. Division by
 * zero is not allowed, and the quotient must fit into a 32-bit signed integer.
 *
 * <p>Input format (stdin):
 * <pre>
 * dividend
 * divisor
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 10
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: work with absolute values in {@code long} arithmetic and shift-subtract. For
 * the current dividend, find the largest power of two of the divisor that still fits, subtract
 * it and add the matching power of two to the quotient. Repeat until the remainder is smaller
 * than the divisor, then restore the sign.
 *
 * <p>Complexity: Time O(32), Space O(1).
 */
public class DivideTwoIntegers {

    /**
     * Returns {@code dividend / divisor}, truncated toward zero.
     *
     * @param dividend the number being divided
     * @param divisor  the divisor (never zero)
     * @return the truncated quotient
     */
    public static int divide(int dividend, int divisor) {
        // The only case whose mathematical result overflows a 32-bit signed integer.
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MIN_VALUE;
        }
        boolean negative = (dividend < 0) ^ (divisor < 0);
        long a = Math.abs((long) dividend);
        long b = Math.abs((long) divisor);

        long quotient = 0;
        while (a >= b) {
            long chunk = b;
            long multiple = 1;
            // Find the biggest 2^k * b that still fits into the remainder.
            while (a >= (chunk << 1)) {
                chunk <<= 1;
                multiple <<= 1;
            }
            a -= chunk;
            quotient += multiple;
        }
        return (int) (negative ? -quotient : quotient);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int dividend = fs.nextInt();
        int divisor = fs.nextInt();

        System.out.println(divide(dividend, divisor));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Divide Two Integers
 * LeetCode: 29 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bit tricks, Shifts
 *
 * <p>Problem:
 * Given two integers {@code dividend} and {@code divisor}, compute their integer quotient
 * **truncated toward zero** — the result must not round toward negative infinity. Division by
 * zero is not allowed, and the quotient must fit into a 32-bit signed integer.
 *
 * <p>Input format (stdin):
 * <pre>
 * dividend
 * divisor
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 10
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: work with absolute values in {@code long} arithmetic and shift-subtract. For
 * the current dividend, find the largest power of two of the divisor that still fits, subtract
 * it and add the matching power of two to the quotient. Repeat until the remainder is smaller
 * than the divisor, then restore the sign.
 *
 * <p>Complexity: Time O(32), Space O(1).
 */
public class Main {

    /**
     * Returns {@code dividend / divisor}, truncated toward zero.
     *
     * @param dividend the number being divided
     * @param divisor  the divisor (never zero)
     * @return the truncated quotient
     */
    public static int divide(int dividend, int divisor) {
        // The only case whose mathematical result overflows a 32-bit signed integer.
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MIN_VALUE;
        }
        boolean negative = (dividend < 0) ^ (divisor < 0);
        long a = Math.abs((long) dividend);
        long b = Math.abs((long) divisor);

        long quotient = 0;
        while (a >= b) {
            long chunk = b;
            long multiple = 1;
            // Find the biggest 2^k * b that still fits into the remainder.
            while (a >= (chunk << 1)) {
                chunk <<= 1;
                multiple <<= 1;
            }
            a -= chunk;
            quotient += multiple;
        }
        return (int) (negative ? -quotient : quotient);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int dividend = fs.nextInt();
        int divisor = fs.nextInt();

        System.out.println(divide(dividend, divisor));
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
# Divide Two Integers — LeetCode 29

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bit tricks · Shifts · Long division |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given two integers \`dividend\` and \`divisor\`, compute their integer quotient, **truncated
toward zero** (the result must not round toward negative infinity).

- \`10 / 3\` → \`3\` (not \`3.333…\`).
- \`7 / -3\` → \`-2\` (truncated toward zero, **not** \`-3\`).
- Division by zero is not allowed.
- The quotient fits into a signed 32-bit integer.

## Input Format

The program reads from standard input:

\`\`\`
dividend
divisor
\`\`\`

- \`dividend\` — the number being divided (−2³¹ ≤ dividend ≤ 2³¹ − 1)
- \`divisor\` — the divisor (never zero, −2³¹ ≤ divisor ≤ 2³¹ − 1)

## Sample Input

\`\`\`
10
3
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

## Approach — Shift-and-subtract long division

Work with **absolute values** in \`long\` arithmetic, then restore the sign at the end.

The idea is the classic long division, done in binary:

1. Find the largest \`2^k · divisor\` that still fits into the current remainder, together
   with the matching \`2^k\`.
2. Subtract it from the remainder and add \`2^k\` to the quotient.
3. Repeat until the remainder is smaller than the divisor.

**Doubling instead of searching.** Instead of testing every power of two, start with
\`chunk = divisor\` and keep doubling it (\`chunk <<= 1\`, \`multiple <<= 1\`) while it still
fits. That finds the largest usable power of two in a handful of shifts.

**The sign.** \`negative = (dividend < 0) ^ (divisor < 0)\` — the result is negative exactly
when the operands have different signs. Applying the sign *after* the magnitude division
is what makes the truncation toward zero automatic: \`7 / 3 = 2\` and \`7 / -3 = -2\`, not \`-3\`.

**The overflow case.** \`Integer.MIN_VALUE / -1\` mathematically equals \`2³¹\`, which does not
fit in an \`int\`. Java's \`int\` division wraps it to \`Integer.MIN_VALUE\`; the explicit guard
reproduces that behaviour deliberately.

## Dry Run

Input: \`dividend = 10\`, \`divisor = 3\` — both positive, so the sign is positive

| Round | remainder \`a\` | \`chunk\` | \`multiple\` | \`a\` after | quotient |
|---:|---:|---:|---:|---:|---:|
| 1 | 10 | 6 | 2 | 10 − 6 = 4 | 2 |
| 2 | 4 | 3 | 1 | 4 − 3 = 1 | 3 |
| 3 | 1 | — | — | \`1 < 3\` → the remainder is smaller than the divisor | 3 |

Quotient \`3\`, remainder \`1\` → \`10 / 3 = 3\` ✓

### The doubling inside round 1

The inner loop doubles \`chunk\` while the *next* doubling would still fit:

| check | \`chunk\` | \`multiple\` | \`a >= (chunk << 1)\`? | action |
|---|---:|---:|---|---|
| start | 3 | 1 | \`10 >= 6\` ✔ | \`chunk = 6\`, \`multiple = 2\` |
| again | 6 | 2 | \`10 >= 12\` ✘ | stop |

So round 1 subtracts \`6\` and adds \`2\` to the quotient — exactly the binary long-division
step \`10 = 1·6 + 4\`.

### The binary long division, written out

\`\`\`
dividend  1010   (10)
divisor   0011   (3)

step 1:  1010 - 0110 = 0100,  quotient += 0010
step 2:  0100 - 0011 = 0001,  quotient += 0001
                                  ---------
                                  0011   (3)
\`\`\`

## Java Solution

See [\`DivideTwoIntegers.java\`](./DivideTwoIntegers.java).

\`\`\`java
public static int divide(int dividend, int divisor) {
    // The only case whose mathematical result overflows a 32-bit signed integer.
    if (dividend == Integer.MIN_VALUE && divisor == -1) {
        return Integer.MIN_VALUE;
    }
    boolean negative = (dividend < 0) ^ (divisor < 0);
    long a = Math.abs((long) dividend);
    long b = Math.abs((long) divisor);

    long quotient = 0;
    while (a >= b) {
        long chunk = b;
        long multiple = 1;
        // Find the biggest 2^k * b that still fits into the remainder.
        while (a >= (chunk << 1)) {
            chunk <<= 1;
            multiple <<= 1;
        }
        a -= chunk;
        quotient += multiple;
    }
    return (int) (negative ? -quotient : quotient);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(32) | The chunk doubles every round, so there are at most 32 rounds |
| **Space** | O(1) | A handful of variables |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Now do it without \`/\` and \`*\`."* → this is that version: it uses only shifts,
  subtractions and comparisons.
- *"What if the divisor is a power of two?"* → just shift the dividend.
- *"How do you handle the remainder?"* → keep it; it is \`dividend - quotient * divisor\`.
- *"Why must you use \`long\` for the magnitudes?"* → \`Math.abs(Integer.MIN_VALUE)\` is still
  \`Integer.MIN_VALUE\` (it does not fit in an \`int\`), so the cast to \`long\` must come
  **before** the absolute value.

**Common mistakes:**
- ❌ Truncating toward negative infinity → \`7 / -3\` must be \`-2\`, not \`-3\`. Applying the
  sign after the magnitude division is what gets this right.
- ❌ Calling \`Math.abs\` on an \`int\` \`Integer.MIN_VALUE\` → the result is still negative, and
  the loop misbehaves. Cast to \`long\` first.
- ❌ Forgetting the \`Integer.MIN_VALUE / -1\` special case → \`Math.abs\` overflows and the
  loop never terminates.
- ❌ Adding \`multiple\` to the quotient but subtracting \`chunk\` from the wrong variable.

**How to narrate:**
> "I'll do binary long division on the absolute values. In each round I double the divisor
> as many times as it still fits into the remainder, tracking the matching power of two,
> then subtract it and add that power of two to the quotient. Because the chunk doubles
> each round, there are at most 32 rounds. I do the division on magnitudes and apply the
> sign at the end, which truncates toward zero for free."

## Related Problems

- [Sum of Two Integers](./AddTwoIntegers.java) — the carry version of arithmetic by hand
- [Subtract Two Integers without Minus](./SubtractWithoutMinus.java) — the borrow version
- [Power of Two](./PowerOfTwo.java) — the power-of-two special case
`,i=[`divide`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};