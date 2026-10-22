var e=`bitmanipulation.XOROfArrayElements`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: XOR of All Elements
 * LeetCode: 1486 | Difficulty: Easy | Frequency: 3/5
 * Pattern: XOR
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the bitwise XOR of **all** elements of the
 * array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: fold the array with XOR. XOR is associative and commutative, so the order does
 * not matter, and every value that appears an even number of times cancels out.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class XOROfArrayElements {

    /**
     * Returns the bitwise XOR of every element of {@code nums}.
     *
     * @param nums the input array
     * @return the XOR of all elements
     */
    public static int xorAll(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(xorAll(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: XOR of All Elements
 * LeetCode: 1486 | Difficulty: Easy | Frequency: 3/5
 * Pattern: XOR
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the bitwise XOR of **all** elements of the
 * array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: fold the array with XOR. XOR is associative and commutative, so the order does
 * not matter, and every value that appears an even number of times cancels out.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the bitwise XOR of every element of {@code nums}.
     *
     * @param nums the input array
     * @return the XOR of all elements
     */
    public static int xorAll(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(xorAll(nums));
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
# XOR of All Elements — LeetCode 1486

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | XOR · Bit tricks |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given an integer array \`nums\`, return the **bitwise XOR of all** of its elements.

- The XOR of a list is obtained by folding with \`^\`.
- \`[1, 2, 3, 4]\` → \`1 ^ 2 ^ 3 ^ 4 = 4\`.
- \`[0]\` → \`0\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
4
1 2 3 4
\`\`\`

## Expected Output

\`\`\`
4
\`\`\`

## Approach — Fold the array with XOR

XOR is associative and commutative, so the order of the elements is irrelevant and the
array can simply be folded:

\`\`\`java
int result = 0;
for (int num : nums) {
    result ^= num;
}
\`\`\`

**Two useful corollaries.**

1. \`x ^ x = 0\` — every value that appears an **even** number of times cancels out, and
   every value that appears an **odd** number of times survives.
2. \`x ^ 0 = x\` — starting the accumulator at \`0\` is safe.

So for \`[1, 2, 3, 4]\` nothing cancels (each value appears once) and the result is
\`1 ^ 2 ^ 3 ^ 4 = 4\`.

## Dry Run

Input: \`nums = [1, 2, 3, 4]\`, running XOR starts at \`0\`

| Step | i | \`nums[i]\` | running XOR (binary) | running XOR (decimal) |
|---:|---:|---:|---|---:|
| 1 | 0 | 1 | \`0000 ^ 0001\` = \`0001\` | 1 |
| 2 | 1 | 2 | \`0001 ^ 0010\` = \`0011\` | 3 |
| 3 | 2 | 3 | \`0011 ^ 0011\` = \`0000\` | 0 |
| 4 | 3 | 4 | \`0000 ^ 0100\` = \`0100\` | **4** |

Result: **4** ✓

### The same fold, grouped by pairs

\`\`\`
1 ^ 2 ^ 3 ^ 4
= (1 ^ 3) ^ (2 ^ 4)          (regrouping — XOR is associative and commutative)
= 2 ^ 6
= 4
\`\`\`

## Java Solution

See [\`XOROfArrayElements.java\`](./XOROfArrayElements.java).

\`\`\`java
public static int xorAll(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass |
| **Space** | O(1) | A single accumulator |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if every element except one appears twice?"* → the survivor is the XOR; see
  [Single Number](./SingleNumber.java).
- *"What if exactly two elements appear once?"* → XOR gives \`a ^ b\`; split by a differing
  bit; see [Single Number III](./SingleNumberIII.java).
- *"How would you compute the XOR of a huge array without holding it in memory?"* → fold
  as the values stream in; the accumulator is one integer.
- *"What if you wanted the XOR of all *subarrays*?"* → use the prefix-XOR identity: the
  XOR of the subarray \`[l, r]\` is \`prefix[r] ^ prefix[l-1]\`, and the XOR over all subarrays
  can be computed from the frequency of each prefix value.

**Common mistakes:**
- ❌ Using \`|=\` instead of \`^=\` → OR does not cancel duplicates.
- ❌ Initialising the accumulator with \`nums[0]\` and then looping from \`nums[0]\` again →
  the first element would be XORed twice and cancel itself out.
- ❌ Forgetting that XOR is order-independent → some candidates try to sort first.
- ❌ Using \`long\` for the result but returning an \`int\` → the values are 32-bit ints here.

**How to narrate:**
> "XOR is associative and commutative, so I can fold the whole array in one pass. The handy
> property is that \`x ^ x = 0\`, which means duplicated values cancel out — the result is
> the XOR of exactly the values that appear an odd number of times."

## Related Problems

- [Single Number](./SingleNumber.java) — the classic use of XOR cancellation
- [Single Number III](./SingleNumberIII.java) — two survivors
- [Hamming Distance](./HammingDistance.java) — XOR plus a bit count
`,i=[`xorAll`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};