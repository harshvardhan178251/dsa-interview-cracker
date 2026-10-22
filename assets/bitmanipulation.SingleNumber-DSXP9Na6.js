var e=`bitmanipulation.SingleNumber`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Single Number
 * LeetCode: 136 | Difficulty: Easy | Frequency: 5/5
 * Pattern: XOR
 *
 * <p>Problem:
 * Given an integer array {@code nums} in which **every element appears twice except for
 * one**, find and return the single element that appears exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 1 2 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: XOR every element. XOR is associative and commutative, so the pairs cancel
 * out ({@code x ^ x == 0}) and only the unpaired value survives.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class SingleNumber {

    /**
     * Returns the element that appears exactly once.
     *
     * @param nums an array where every element but one appears twice
     * @return the single element
     */
    public static int singleNumber(int[] nums) {
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

        System.out.println(singleNumber(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Single Number
 * LeetCode: 136 | Difficulty: Easy | Frequency: 5/5
 * Pattern: XOR
 *
 * <p>Problem:
 * Given an integer array {@code nums} in which **every element appears twice except for
 * one**, find and return the single element that appears exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 1 2 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: XOR every element. XOR is associative and commutative, so the pairs cancel
 * out ({@code x ^ x == 0}) and only the unpaired value survives.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the element that appears exactly once.
     *
     * @param nums an array where every element but one appears twice
     * @return the single element
     */
    public static int singleNumber(int[] nums) {
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

        System.out.println(singleNumber(nums));
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
# Single Number — LeetCode 136

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | XOR · Bit tricks |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple, Adobe |

## Problem Statement

Given an integer array \`nums\` in which **exactly one element appears once** and every other
element appears **twice**, find and return that single element.

- You must solve it in **O(n)** time and **O(1)** extra space.
- \`"abcd"\` where each letter appears twice except \`c\` → the answer is \`c\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 3·10⁴)
- \`nums\` — n space-separated integers; every value appears twice except one

## Sample Input

\`\`\`
5
4 1 2 1 2
\`\`\`

## Expected Output

\`\`\`
4
\`\`\`

\`1\` and \`2\` each appear twice and cancel out; \`4\` appears once and survives.

## Approach — XOR cancels pairs

XOR has two properties that make it perfect for this problem:

1. \`x ^ x = 0\` — a value XORed with itself is zero.
2. \`x ^ 0 = x\` — XORing with zero changes nothing.

XOR is also **associative** and **commutative**, so the order of the elements does not
matter. Folding the whole array with XOR therefore cancels every pair and leaves exactly
the unpaired value:

\`\`\`
4 ^ 1 ^ 2 ^ 1 ^ 2
= (1 ^ 1) ^ (2 ^ 2) ^ 4      (regrouping is allowed)
= 0 ^ 0 ^ 4
= 4
\`\`\`

**Why not a hash map?** A map would work but needs O(n) extra space. XOR gives O(1).

## Dry Run

Input: \`nums = [4, 1, 2, 1, 2]\`, running XOR starts at \`0\`

| Step | i | \`nums[i]\` | running XOR (binary) | running XOR (decimal) | note |
|---:|---:|---:|---|---:|---|
| 1 | 0 | 4 | \`0000 ^ 0100\` = \`0100\` | 4 | first element |
| 2 | 1 | 1 | \`0100 ^ 0001\` = \`0101\` | 5 | |
| 3 | 2 | 2 | \`0101 ^ 0010\` = \`0111\` | 7 | |
| 4 | 3 | 1 | \`0111 ^ 0001\` = \`0110\` | 6 | the pair \`1\` cancels → bit 0 back to 0 |
| 5 | 4 | 2 | \`0110 ^ 0010\` = \`0100\` | **4** | the pair \`2\` cancels → only \`4\` remains |

The final accumulator is \`4\`, exactly the single element.

## Java Solution

See [\`SingleNumber.java\`](./SingleNumber.java).

\`\`\`java
public static int singleNumber(int[] nums) {
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

**Optimal?** Yes — you must look at every element, so Ω(n) time is required.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if exactly two elements appear once?"* → see
  [Single Number III](./SingleNumberIII.java);
  XOR everything and then split by a differing bit.
- *"What if every element appears three times?"* → the classic trick: keep two counters
  \`ones\` and \`twos\`; for each bit, \`ones = (ones ^ x) & ~twos\`, \`twos = (twos ^ x) & ~ones\`.
- *"What if you could not use XOR?"* → a hash map of counts (O(n) space) or sorting.
- *"Can you extend this to find the element missing from 1..n?"* → XOR \`1..n\` with all the
  array elements; the leftover is the missing number.

**Common mistakes:**
- ❌ XORing the **indices** instead of the values → a common bug when adapting the trick to
  the "missing number" variant.
- ❌ Using \`|=\` (bitwise OR) instead of \`^=\` → OR does not cancel duplicates.
- ❌ Forgetting the accumulator starts at \`0\` → \`x ^ 0 = x\`, so starting anywhere else
  corrupts the result.
- ❌ Assuming the array is sorted → XOR does not need it, but a sorted-array solution would.

**How to narrate:**
> "XOR cancels equal pairs because \`x ^ x = 0\`, and it's associative and commutative, so I
> can fold the whole array with XOR in any order. Every duplicate pair cancels and the one
> unpaired value survives. That's O(n) time and O(1) space."

## Related Problems

- [Single Number III](./SingleNumberIII.java) — two unpaired values
- [XOR of All Elements](./XOROfArrayElements.java) — the same fold without the pairing guarantee
- [Hamming Distance](./HammingDistance.java) — XOR then count the set bits
`,i=[`singleNumber`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};