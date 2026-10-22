var e=`bitmanipulation.PowerOfTwo`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Power of Two
 * LeetCode: 231 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks
 *
 * <p>Problem:
 * Given an integer {@code n}, return {@code true} if it is a **power of two**, otherwise
 * return {@code false}.
 *
 * <p>A power of two has exactly one set bit in its binary representation. The trick is that
 * {@code n & (n - 1)} clears the lowest set bit, so for a power of two the result is exactly
 * {@code n - 1}, i.e. the AND is zero.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 16
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Complexity: Time O(1), Space O(1).
 */
public class PowerOfTwo {

    /**
     * Returns whether {@code n} is a power of two.
     *
     * @param n the value to test
     * @return {@code true} when {@code n} is 1, 2, 4, 8, ...
     */
    public static boolean isPowerOfTwo(int n) {
        // n > 0 rules out 0 and the negative numbers, which have no single set bit.
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPowerOfTwo(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Power of Two
 * LeetCode: 231 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks
 *
 * <p>Problem:
 * Given an integer {@code n}, return {@code true} if it is a **power of two**, otherwise
 * return {@code false}.
 *
 * <p>A power of two has exactly one set bit in its binary representation. The trick is that
 * {@code n & (n - 1)} clears the lowest set bit, so for a power of two the result is exactly
 * {@code n - 1}, i.e. the AND is zero.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 16
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Complexity: Time O(1), Space O(1).
 */
public class Main {

    /**
     * Returns whether {@code n} is a power of two.
     *
     * @param n the value to test
     * @return {@code true} when {@code n} is 1, 2, 4, 8, ...
     */
    public static boolean isPowerOfTwo(int n) {
        // n > 0 rules out 0 and the negative numbers, which have no single set bit.
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPowerOfTwo(n));
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
`,r='\n# Power of Two — LeetCode 231\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Bit tricks |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Apple |\n\n## Problem Statement\n\nGiven an integer `n`, return `true` if it is a **power of two**, otherwise return `false`.\n\n- A power of two is `2^k` for some non-negative integer `k`: `1, 2, 4, 8, 16, …`\n- `0` is **not** a power of two, and neither is any negative number.\n- `16` → `true`; `3` → `false`; `0` → `false`; `-16` → `false`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — an integer (−2³¹ ≤ n ≤ 2³¹ − 1)\n\n## Sample Input\n\n```\n16\n```\n\n## Expected Output\n\n```\ntrue\n```\n\n`16 = 10000₂` — exactly one set bit.\n\n## Approach — One set bit and nothing else\n\nA power of two has **exactly one** set bit in its binary representation. The trick is\nKernighan\'s again:\n\n```java\nn & (n - 1)\n```\n\nclears the lowest set bit. If `n` had **only one** set bit, the result is `0` — the bit is\ngone and nothing is left. If `n` had more than one set bit, something always survives.\n\nSo the test is:\n\n```java\nn > 0 && (n & (n - 1)) == 0\n```\n\n**Why `n > 0` is needed.** For `n = 0`, `n & (n - 1)` is `0 & -1 = 0` — the test would\nsay "true", but `0` is not a power of two. Negative numbers also fail the positivity\ncheck.\n\n**The alternative.** `n > 0 && (n & (n - 1)) == 0` is O(1). The loop version — repeatedly\nhalve `n` and check that it stays even until it reaches `1` — is O(log n) and easier to\nexplain to a non-bit-twiddling audience. Know both.\n\n## Dry Run\n\nInput: `n = 16 = 10000₂`\n\n| Step | `n` (binary) | `n - 1` (binary) | `n & (n - 1)` | `== 0`? |\n|---:|---|---|---|---|\n| 1 | `10000` | `01111` | `00000` | **yes** → power of two |\n\n### The truth table\n\n| `n` | binary | `n - 1` | `n & (n - 1)` | `n > 0`? | result |\n|---:|---|---|---|---:|---|\n| 16 | `10000` | `01111` | `00000` | ✔ | `true` |\n| 1 | `00001` | `00000` | `00000` | ✔ | `true` |\n| 12 | `01100` | `01011` | `01000` | ✔ | `false` |\n| 3 | `00011` | `00010` | `00010` | ✔ | `false` |\n| 0 | `00000` | `11111` | `00000` | ✘ | `false` |\n| −16 | `11110000…0` | `11110000…1` | `11110000…0` | ✘ | `false` |\n\nRows 4 and 6 show why the `n > 0` guard is not optional.\n\n## Java Solution\n\nSee [`PowerOfTwo.java`](./PowerOfTwo.java).\n\n```java\npublic static boolean isPowerOfTwo(int n) {\n    // n > 0 rules out 0 and the negative numbers, which have no single set bit.\n    return n > 0 && (n & (n - 1)) == 0;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) | A single AND and a comparison |\n| **Space** | O(1) | No extra state |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Without bit tricks?"* → loop: while `n` is even, halve it; the answer is `n == 1`.\n- *"How would you check it for a very large number (beyond 64 bits)?"* → represent it as a\n  `BigInteger` and use `bitCount() == 1`, or use the string form.\n- *"What about powers of three?"* → the bit trick does not generalise; use division or\n  logarithms (with care about floating point).\n- *"Why is `1` a power of two?"* → `1 = 2⁰`; some definitions start at `2¹`, so state the\n  convention explicitly.\n\n**Common mistakes:**\n- ❌ Omitting the `n > 0` check → `0` would be reported as a power of two.\n- ❌ Using `(n & (n - 1)) == 0` alone → the same bug for `0`.\n- ❌ Using `n & (n + 1)` → that tests a different property (it identifies numbers of the\n  form `2^k - 1`).\n- ❌ Testing with a floating-point `log2` → rounding errors for large values.\n\n**How to narrate:**\n> "A power of two has exactly one set bit. The expression `n & (n - 1)` clears the lowest\n> set bit, so it is zero exactly when there was only one. I also require `n > 0`, because\n> zero would otherwise pass the bit test and negative numbers never can."\n\n## Related Problems\n\n- [CountSetBits](./CountSetBits.java) — the same `n & (n - 1)` trick\n- [Number of 1 Bits](./NumberOfSetBits.java) — the count for every value\n- [Hamming Distance](./HammingDistance.java) — counting differing bits\n',i=[`isPowerOfTwo`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};