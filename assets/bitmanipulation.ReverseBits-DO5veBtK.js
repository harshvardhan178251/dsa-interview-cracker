var e=`bitmanipulation.ReverseBits`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Reverse Bits
 * LeetCode: 190 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, Shifts
 *
 * <p>Problem:
 * Given an unsigned 32-bit integer {@code n}, reverse its binary representation and return
 * the resulting unsigned integer. The leading zeros of the input become the trailing zeros
 * of the output.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 43261596
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 964176192
 * </pre>
 *
 * <p>Approach: walk the 32 bits of {@code n} from the least significant end, appending each
 * bit to the result. Shifting the result left and OR-ing in the current bit builds the
 * reversed number. The result is kept in a {@code long} because a reversed 32-bit value can
 * exceed {@link Integer#MAX_VALUE}.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class ReverseBits {

    /**
     * Reverses the 32-bit binary representation of {@code n}.
     *
     * @param n the value to reverse
     * @return the reversed value, as an unsigned 32-bit number
     */
    public static long reverseBits(int n) {
        long result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1; // unsigned shift keeps the sign bit out of the way
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(reverseBits(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Reverse Bits
 * LeetCode: 190 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, Shifts
 *
 * <p>Problem:
 * Given an unsigned 32-bit integer {@code n}, reverse its binary representation and return
 * the resulting unsigned integer. The leading zeros of the input become the trailing zeros
 * of the output.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 43261596
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 964176192
 * </pre>
 *
 * <p>Approach: walk the 32 bits of {@code n} from the least significant end, appending each
 * bit to the result. Shifting the result left and OR-ing in the current bit builds the
 * reversed number. The result is kept in a {@code long} because a reversed 32-bit value can
 * exceed {@link Integer#MAX_VALUE}.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class Main {

    /**
     * Reverses the 32-bit binary representation of {@code n}.
     *
     * @param n the value to reverse
     * @return the reversed value, as an unsigned 32-bit number
     */
    public static long reverseBits(int n) {
        long result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1; // unsigned shift keeps the sign bit out of the way
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(reverseBits(n));
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
# Reverse Bits — LeetCode 190

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bit tricks · Shifts |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given an unsigned 32-bit integer \`n\`, return the integer whose binary representation is the
**reverse** of \`n\`'s binary representation.

- The input is treated as exactly 32 bits, so leading zeros become trailing zeros.
- \`43261596 = 00000010100101000001111010011100₂\` → the answer is
  \`964176192 = 00111001011110000010100101000000₂\`.
- \`4294967293 = 11111111111111111111111111111101₂\` → the answer is \`3221225471\`.

## Input Format

The program reads from standard input:

\`\`\`
n
\`\`\`

- \`n\` — a non-negative integer (0 ≤ n ≤ 2³¹ − 1)

## Sample Input

\`\`\`
43261596
\`\`\`

## Expected Output

\`\`\`
964176192
\`\`\`

## Approach — Walk the bits from the bottom up

The reversed number is built one bit at a time, from the **least significant** bit of the
input:

\`\`\`java
result = (result << 1) | (n & 1);
n >>>= 1;
\`\`\`

Each iteration shifts \`result\` left by one (making room) and OR-s in the current low bit
of \`n\`. After 32 iterations \`result\` holds the reversed 32-bit value.

**Why exactly 32 iterations.** The input is an *unsigned* 32-bit number, so its binary
representation has 32 positions even when the value is small. \`5 = 000000...00000101₂\`
reverses to \`101000...00000000₂ = 6710886400\` — a number **larger** than
\`Integer.MAX_VALUE\`.

**Why the result is a \`long\`.** The reversed value can be up to 2³² − 1 = 4294967295, which
does not fit in a signed 32-bit \`int\`. The method returns a \`long\` so the full range is
representable.

**Why \`>>>\` and not \`>>\`.** \`>>\` is an *arithmetic* shift: it copies the sign bit, so a
negative number would stay negative forever. \`>>>\` is a *logical* shift that always brings
a zero into the top bit.

## Dry Run

Input: \`n = 43261596 = 00000010100101000001111010011100₂\`

| Step | bit taken (\`n & 1\`) | \`result\` before | \`result\` after (\`<< 1\` then \`\\| bit\`) | \`result\` in binary |
|---:|---:|---:|---:|---|
| 1 | 0 | 0 | 0 | \`0000…0\` |
| 2 | 0 | 0 | 0 | \`0000…0\` |
| 3 | 0 | 0 | 0 | \`0000…0\` |
| 4 | 1 | 0 | 1 | \`0000…1\` |
| 5 | 1 | 1 | 3 | \`0000…11\` |
| 6 | 1 | 3 | 7 | \`0000…111\` |
| 7 | 0 | 7 | 14 | \`0000…1110\` |
| 8 | 1 | 14 | 29 | \`0000…11101\` |
| 9 | 1 | 29 | 59 | \`0000…111011\` |
| 10 | 0 | 59 | 118 | \`0000…1110110\` |
| … | … | … | … | … |
| 32 | 0 | 476043904 | **964176192** | \`00111001011110000010100101000000\` |

Reading the input's bits from the bottom up and appending them to the right of \`result\`
produces exactly the reversed bit string.

### The bit strings, end to end

| | 32-bit binary | decimal |
|---|---|---:|
| input | \`00000010100101000001111010011100\` | 43 261 596 |
| reversed | \`00111001011110000010100101000000\` | **964 176 192** |

Checking the other direction: \`964176192 = 00111001011110000010100101000000₂\`, and
reversing *that* gives \`00000010100101000001111010011100₂ = 43261596\` ✓

### The first ten steps in detail

| Step | \`n\` (binary, remaining bits) | \`n & 1\` | \`result << 1\` | \`result\` |
|---:|---|---:|---:|---:|
| 1 | \`00000010100101000001111010011100\` | 0 | 0 | 0 |
| 2 | \`00000001010010100000111101001110\` | 0 | 0 | 0 |
| 3 | \`000000001010010100000011110100111\` | 0 | 0 | 0 |
| 4 | \`00000000010100101000001111010011\` | 1 | 0 | 1 |
| 5 | \`00000000001010010100000111101001\` | 1 | 2 | 3 |
| 6 | \`00000000000101001010000011110100\` | 1 | 6 | 7 |
| 7 | \`00000000000010100101000001111010\` | 0 | 14 | 14 |
| 8 | \`00000000000001010010100000111101\` | 1 | 28 | 29 |
| 9 | \`00000000000000101001010000011110\` | 1 | 58 | 59 |
| 10 | \`00000000000000010100101000001111\` | 0 | 118 | 118 |

## Java Solution

See [\`ReverseBits.java\`](./ReverseBits.java).

\`\`\`java
public static long reverseBits(int n) {
    long result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1; // unsigned shift keeps the sign bit out of the way
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(32) = O(1) | Exactly 32 iterations |
| **Space** | O(1) | Two variables |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the width were 64 bits?"* → loop 64 times and keep the accumulator in a \`long\`.
- *"Can you do it without a loop?"* → yes, with a sequence of masks:
  \`((n & 0x55555555) << 1) | ((n >> 1) & 0x55555555)\`, then 0x33333333, then 0x0F0F0F0F,
  then 0x00FF00FF, then 0x0000FFFF. Each step swaps adjacent bit pairs.
- *"Why not just convert to a string and reverse it?"* → you would, but then you have to
  handle the width (leading zeros) and the conversion is slower.
- *"How would you reverse the bits of a byte in a byte array?"* → the classic
  \`0xF0 | 0xCC | 0xAA | 0x55\` nibble-swap trick.

**Common mistakes:**
- ❌ Looping only while \`n != 0\` → the leading zeros of the 32-bit representation would be
  lost, so \`5\` would give \`160\` instead of \`6710886400\`.
- ❌ Using \`>>\` instead of \`>>>\` → a negative input would never terminate.
- ❌ Returning an \`int\` → the reversed value can exceed \`Integer.MAX_VALUE\`.
- ❌ Shifting the *input* left instead of the *result* → you would be rotating, not
  reversing.

**How to narrate:**
> "I read the input's bits from the least significant end and append each one to the result.
> Shifting the result left makes room and OR-ing the current low bit appends it. I do exactly
> 32 iterations because the input is an unsigned 32-bit value — its leading zeros are real
> bits and they become the trailing zeros of the answer. The result is a \`long\` because the
> reversed value can exceed \`Integer.MAX_VALUE\`."

## Related Problems

- [CountSetBits](./CountSetBits.java) — counting set bits
- [Power of Two](./PowerOfTwo.java) — a single-bit trick
- [Gray Code](./GrayCode.java) — another bit permutation
`,i=[`reverseBits`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};