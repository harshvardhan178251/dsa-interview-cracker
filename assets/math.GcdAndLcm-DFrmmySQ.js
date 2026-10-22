var e=`math.GcdAndLcm`,t=`package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: GCD and LCM
 * LeetCode: none | Difficulty: Easy | Frequency: 4/5
 * Pattern: Euclidean algorithm
 *
 * <p>Problem:
 * Given two positive integers, return their greatest common divisor and their least
 * common multiple.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 12
 * 18
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6 36
 * </pre>
 *
 * <p>Approach: the Euclidean algorithm replaces the pair {@code (a, b)} by
 * {@code (b, a % b)} until {@code b} becomes zero — the last non-zero value is the GCD.
 * The LCM follows from the identity {@code a * b = gcd * lcm}.
 *
 * <p>Complexity: Time O(log min(a, b)), Space O(1).
 */
public class GcdAndLcm {

    /**
     * Returns the greatest common divisor of {@code a} and {@code b}.
     *
     * @param a first number
     * @param b second number
     * @return the greatest common divisor
     */
    public static long gcd(long a, long b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b != 0) {
            long remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }

    /**
     * Returns the least common multiple of {@code a} and {@code b}.
     *
     * @param a first number
     * @param b second number
     * @return the least common multiple
     */
    public static long lcm(long a, long b) {
        if (a == 0 || b == 0) {
            return 0;
        }
        long divisor = gcd(a, b);
        return Math.abs(a / divisor) * Math.abs(b);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        long a = fs.nextLong();
        long b = fs.nextLong();

        System.out.println(gcd(a, b) + " " + lcm(a, b));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: GCD and LCM
 * LeetCode: none | Difficulty: Easy | Frequency: 4/5
 * Pattern: Euclidean algorithm
 *
 * <p>Problem:
 * Given two positive integers, return their greatest common divisor and their least
 * common multiple.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 12
 * 18
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6 36
 * </pre>
 *
 * <p>Approach: the Euclidean algorithm replaces the pair {@code (a, b)} by
 * {@code (b, a % b)} until {@code b} becomes zero — the last non-zero value is the GCD.
 * The LCM follows from the identity {@code a * b = gcd * lcm}.
 *
 * <p>Complexity: Time O(log min(a, b)), Space O(1).
 */
public class Main {

    /**
     * Returns the greatest common divisor of {@code a} and {@code b}.
     *
     * @param a first number
     * @param b second number
     * @return the greatest common divisor
     */
    public static long gcd(long a, long b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b != 0) {
            long remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }

    /**
     * Returns the least common multiple of {@code a} and {@code b}.
     *
     * @param a first number
     * @param b second number
     * @return the least common multiple
     */
    public static long lcm(long a, long b) {
        if (a == 0 || b == 0) {
            return 0;
        }
        long divisor = gcd(a, b);
        return Math.abs(a / divisor) * Math.abs(b);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        long a = fs.nextLong();
        long b = fs.nextLong();

        System.out.println(gcd(a, b) + " " + lcm(a, b));
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
# GCD and LCM

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Euclidean algorithm |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given two positive integers \`a\` and \`b\`, return their **greatest common divisor** and
their **least common multiple**.

- \`gcd(12, 18) = 6\`
- \`lcm(12, 18) = 36\`

## Input Format

The program reads from standard input:

\`\`\`
a
b
\`\`\`

- \`a\` — the first number (1 ≤ a ≤ 10¹⁸)
- \`b\` — the second number (1 ≤ b ≤ 10¹⁸)

## Sample Input

\`\`\`
12
18
\`\`\`

## Expected Output

\`\`\`
6 36
\`\`\`

## Approach — the Euclidean algorithm

The GCD can be computed with the classic loop:

\`\`\`
while (b != 0) {
    (a, b) = (b, a % b)
}
\`\`\`

The last non-zero value of \`a\` is the GCD. This works because
\`gcd(a, b) = gcd(b, a % b)\` — the set of common divisors of \`a\` and \`b\` is exactly the
set of common divisors of \`b\` and \`a % b\`, and the remainder is strictly smaller than
\`b\`, so the loop makes progress.

The LCM follows from the identity \`a × b = gcd × lcm\`:

\`\`\`
lcm(a, b) = (a / gcd) * b
\`\`\`

Dividing **before** multiplying keeps the intermediate value small.

## Dry Run

Input: \`a = 12\`, \`b = 18\`

| Step | \`a\` | \`b\` | \`a % b\` | action |
|---:|---:|---:|---:|---|
| 1 | 12 | 18 | \`12 % 18 = 12\` | \`(a, b) = (18, 12)\` |
| 2 | 18 | 12 | \`18 % 12 = 6\` | \`(a, b) = (12, 6)\` |
| 3 | 12 | 6 | \`12 % 6 = 0\` | \`(a, b) = (6, 0)\` — loop ends |

\`gcd = 6\`. Then \`lcm = (12 / 6) × 18 = 2 × 18 = 36\`.

Output: **6 36** ✓

### Trace with a bigger pair — \`a = 270\`, \`b = 192\`

| Step | \`a\` | \`b\` | \`a % b\` | action |
|---:|---:|---:|---:|---|
| 1 | 270 | 192 | 78 | \`(192, 78)\` |
| 2 | 192 | 78 | 36 | \`(78, 36)\` |
| 3 | 78 | 36 | 6 | \`(36, 6)\` |
| 4 | 36 | 6 | 0 | \`(6, 0)\` — loop ends |

\`gcd = 6\`, \`lcm = (270 / 6) × 192 = 45 × 192 = 8640\`.

## Java Solution

See [\`GcdAndLcm.java\`](./GcdAndLcm.java).

\`\`\`java
public static long gcd(long a, long b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b != 0) {
        long remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}

public static long lcm(long a, long b) {
    if (a == 0 || b == 0) {
        return 0;
    }
    long divisor = gcd(a, b);
    return Math.abs(a / divisor) * Math.abs(b);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log min(a, b)) | the remainder shrinks by at least a factor of 2 every other step |
| **Space** | O(1) | the iterative version keeps no stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if you have an array of numbers?"* → fold the GCD over the array; the LCM of
  an array needs care to avoid overflow.
- *"Implement it recursively."* → \`gcd(a, b) = b == 0 ? a : gcd(b, a % b)\`; the same
  complexity with O(log n) stack frames.
- *"How do you avoid overflow in the LCM?"* → divide before multiplying, and use
  \`long\` (or \`BigInteger\` when the result may exceed 64 bits).

**Common mistakes:**
- ❌ Computing the LCM as \`a * b / gcd\` — \`a * b\` may overflow even when the LCM fits.
- ❌ Forgetting the special case \`gcd(0, 0) = 0\`.
- ❌ Using the recursive version on \`gcd(0, n)\` — the base case must handle \`b == 0\`.

**How to narrate:**
> "The Euclidean algorithm repeatedly replaces the pair by \`(b, a % b)\`, which keeps the
> GCD unchanged and shrinks the numbers, so it finishes in logarithmic time. The LCM
> then follows from \`a × b = gcd × lcm\`, and I divide before multiplying to avoid
> overflow."

## Related Problems

- [Largest Prime Factor](./LargestPrimeFactor.md) — the other classic factorisation
- [Perfect Number](./PerfectNumber.md) — working with the divisors of a number
`,i=[`gcd`,`lcm`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};