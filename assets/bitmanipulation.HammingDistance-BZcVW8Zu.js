var e=`bitmanipulation.HammingDistance`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Hamming Distance
 * LeetCode: 461 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, XOR
 *
 * <p>Problem:
 * Given two integers {@code x} and {@code y}, return the **Hamming distance** — the number
 * of positions at which the corresponding bits of the two numbers differ.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * y
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: XOR the two numbers — every differing bit becomes a {@code 1}. Then count the
 * set bits of the XOR with Kernighan's trick.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class HammingDistance {

    /**
     * Returns the number of differing bits between {@code x} and {@code y}.
     *
     * @param x the first value
     * @param y the second value
     * @return the Hamming distance
     */
    public static int hammingDistance(int x, int y) {
        int differing = x ^ y;
        int count = 0;
        while (differing != 0) {
            differing &= differing - 1; // clear the lowest set bit
            count++;
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int x = fs.nextInt();
        int y = fs.nextInt();

        System.out.println(hammingDistance(x, y));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Hamming Distance
 * LeetCode: 461 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, XOR
 *
 * <p>Problem:
 * Given two integers {@code x} and {@code y}, return the **Hamming distance** — the number
 * of positions at which the corresponding bits of the two numbers differ.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * y
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: XOR the two numbers — every differing bit becomes a {@code 1}. Then count the
 * set bits of the XOR with Kernighan's trick.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class Main {

    /**
     * Returns the number of differing bits between {@code x} and {@code y}.
     *
     * @param x the first value
     * @param y the second value
     * @return the Hamming distance
     */
    public static int hammingDistance(int x, int y) {
        int differing = x ^ y;
        int count = 0;
        while (differing != 0) {
            differing &= differing - 1; // clear the lowest set bit
            count++;
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int x = fs.nextInt();
        int y = fs.nextInt();

        System.out.println(hammingDistance(x, y));
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
# Hamming Distance — LeetCode 461

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | XOR · Bit tricks |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given two integers \`x\` and \`y\`, return the **Hamming distance** — the number of
corresponding bits that differ between them.

- \`x = 1\`, \`y = 4\` → \`0001\` vs \`0100\` → two bits differ → the answer is \`2\`.
- \`x = 3\`, \`y = 3\` → the answer is \`0\`.

## Input Format

The program reads from standard input:

\`\`\`
x
y
\`\`\`

- \`x\` — the first value (0 ≤ x ≤ 2³¹ − 1)
- \`y\` — the second value (0 ≤ y ≤ 2³¹ − 1)

## Sample Input

\`\`\`
1
4
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

## Approach — XOR, then count the set bits

XOR is bitwise "different": a bit of \`x ^ y\` is \`1\` exactly where \`x\` and \`y\` differ.
So the Hamming distance is the **population count** of \`x ^ y\` — and we already know how
to compute that with Kernighan's trick:

\`\`\`java
int differing = x ^ y;
int count = 0;
while (differing != 0) {
    differing &= differing - 1;  // clear the lowest set bit
    count++;
}
\`\`\`

**Two ideas, one line each.** XOR finds *where* the differences are; the \`n & (n - 1)\`
loop *counts* them without ever looking at a bit that is not set.

## Dry Run

Input: \`x = 1 = 0001₂\`, \`y = 4 = 0100₂\`

| Step | \`x ^ y\` (binary) | \`differing - 1\` | \`differing & (differing - 1)\` | \`count\` |
|---:|---|---|---|---:|
| 1 | \`0101\` | \`0100\` | \`0100\` | 1 |
| 2 | \`0100\` | \`0011\` | \`0000\` | **2** |

\`differing\` is now zero → the answer is **2** ✓

### The bit-by-bit picture

| bit | 3 | 2 | 1 | 0 |
|---|---:|---:|---:|---:|
| \`x = 1\` | 0 | 0 | 0 | 1 |
| \`y = 4\` | 0 | 1 | 0 | 0 |
| \`x ^ y\` | 0 | **1** | 0 | **1** |

Two set bits in the XOR → Hamming distance **2**.

## Java Solution

See [\`HammingDistance.java\`](./HammingDistance.java).

\`\`\`java
public static int hammingDistance(int x, int y) {
    int differing = x ^ y;
    int count = 0;
    while (differing != 0) {
        differing &= differing - 1; // clear the lowest set bit
        count++;
    }
    return count;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(k) where k = number of differing bits | One iteration per set bit (≤ 32) |
| **Space** | O(1) | A single counter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the inputs were 64-bit?"* → use \`long\`; the algorithm is unchanged.
- *"What if the inputs were strings?"* → compare character by character.
- *"How would you compute the Hamming distance between two very long bit vectors?"* →
  process 64 bits at a time with \`Long.bitCount(a ^ b)\`, or use the SIMD \`popcount\`
  instruction.
- *"What is the Hamming distance used for?"* → error-correcting codes (the parity bits of
  a Hamming code are exactly this technique), and the classic "find the unique number"
  interview variant.

**Common mistakes:**
- ❌ Using \`&\` instead of \`^\` → \`x & y\` marks the bits that are *equal* to 1.
- ❌ Using \`|\` instead of \`^\` → \`x | y\` marks every bit that is set in *either* number.
- ❌ Counting all 32 positions instead of only the set bits → the answer would be the
  number of positions, not the number of differences.
- ❌ Forgetting that the width matters → \`1\` and \`4\` differ in two positions within
  32 bits, not in 3.

**How to narrate:**
> "XOR marks every bit where the two numbers differ, so the Hamming distance is just the
> number of set bits in \`x ^ y\`. I count them with Kernighan's trick — \`n & (n - 1)\` clears
> the lowest set bit — so the loop runs once per differing bit rather than 32 times."

## Related Problems

- [Single Number](./SingleNumber.java) — XOR fundamentals
- [CountSetBits](./CountSetBits.java) — the counting routine on its own
- [Reverse Bits](./ReverseBits.java) — bit-level manipulation
`,i=[`hammingDistance`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};