var e=`bitmanipulation.GrayCode`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Gray Code
 * LeetCode: 89 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bit tricks, XOR
 *
 * <p>Problem:
 * An {@code n}-bit Gray code is a sequence of {@code 2^n} integers that
 *
 * <ul>
 *   <li>contains every integer from {@code 0} to {@code 2^n - 1} exactly once, and</li>
 *   <li>has the property that consecutive entries differ in exactly one bit.</li>
 * </ul>
 *
 * <p>Given the bit width {@code n}, return the Gray code sequence of length {@code 2^n}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 3 2
 * </pre>
 *
 * <p>Approach: the binary-reflected Gray code of {@code i} is {@code i ^ (i >> 1)}. XOR-ing
 * a number with its own right shift is what makes two consecutive entries differ in exactly
 * one bit.
 *
 * <p>Complexity: Time O(2^n), Space O(2^n).
 */
public class GrayCode {

    /**
     * Returns the {@code n}-bit Gray code sequence.
     *
     * @param n the bit width; the sequence has {@code 2^n} entries
     * @return the Gray code sequence
     */
    public static int[] grayCode(int n) {
        int size = 1 << n; // 2^n entries
        int[] result = new int[size];
        for (int i = 0; i < size; i++) {
            result[i] = i ^ (i >> 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[] answer = grayCode(n);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer[i]);
        }
        System.out.println(out);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Gray Code
 * LeetCode: 89 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bit tricks, XOR
 *
 * <p>Problem:
 * An {@code n}-bit Gray code is a sequence of {@code 2^n} integers that
 *
 * <ul>
 *   <li>contains every integer from {@code 0} to {@code 2^n - 1} exactly once, and</li>
 *   <li>has the property that consecutive entries differ in exactly one bit.</li>
 * </ul>
 *
 * <p>Given the bit width {@code n}, return the Gray code sequence of length {@code 2^n}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 3 2
 * </pre>
 *
 * <p>Approach: the binary-reflected Gray code of {@code i} is {@code i ^ (i >> 1)}. XOR-ing
 * a number with its own right shift is what makes two consecutive entries differ in exactly
 * one bit.
 *
 * <p>Complexity: Time O(2^n), Space O(2^n).
 */
public class Main {

    /**
     * Returns the {@code n}-bit Gray code sequence.
     *
     * @param n the bit width; the sequence has {@code 2^n} entries
     * @return the Gray code sequence
     */
    public static int[] grayCode(int n) {
        int size = 1 << n; // 2^n entries
        int[] result = new int[size];
        for (int i = 0; i < size; i++) {
            result[i] = i ^ (i >> 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[] answer = grayCode(n);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer[i]);
        }
        System.out.println(out);
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
`,r='\n# Gray Code — LeetCode 89\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Bit tricks · XOR |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Apple |\n\n## Problem Statement\n\nAn `n`-bit **Gray code** is a sequence of `2^n` integers that\n\n- contains every integer from `0` to `2^n - 1` exactly once, and\n- has the property that **consecutive entries differ in exactly one bit**.\n\nGiven the bit width `n`, return the Gray code sequence of length `2^n`.\n\n- `n = 2` → `[0, 1, 3, 2]`.\n- `n = 1` → `[0, 1]`.\n- `n = 3` → `[0, 1, 3, 2, 6, 7, 5, 4]`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the bit width (0 ≤ n ≤ 16)\n\n## Sample Input\n\n```\n2\n```\n\n## Expected Output\n\n```\n0 1 3 2\n```\n\n## Approach — The binary-reflected Gray code\n\nThe **i-th** value of the Gray code is simply\n\n```\ngray(i) = i XOR (i >> 1)\n```\n\nXOR-ing a number with its own right shift is exactly what makes consecutive entries differ\nin a single bit:\n\n- `i` and `i + 1` differ in the low bits; after the shift and the XOR, all but one of\n  those differences cancel out.\n- Equivalently: `gray(i)` and `gray(i + 1)` differ exactly in the position of the\n  lowest set bit of `i + 1`.\n\n**Why the sequence is a permutation.** `gray(i) = i ^ (i >> 1)` is invertible:\n`i = gray(i) ^ (gray(i) >> 1) ^ (gray(i) >> 2) ^ …`. Since the transformation is a\nbijection on `n`-bit values, the `2^n` Gray values are exactly `0 .. 2^n - 1` in some\norder.\n\n**Why it is called *binary-reflected*.** The sequence is built by reflecting the previous\none: `G(n) = [0G(n-1), 1 reverse(G(n-1))]`. The formula above produces exactly that.\n\n## Dry Run\n\nInput: `n = 2` → the sequence has `2² = 4` entries\n\n| i | `i` (binary) | `i >> 1` (binary) | `i ^ (i >> 1)` (binary) | `gray(i)` |\n|---:|---|---|---|---:|\n| 0 | `00` | `00` | `00` | **0** |\n| 1 | `01` | `00` | `01` | **1** |\n| 2 | `10` | `01` | `11` | **3** |\n| 3 | `11` | `01` | `10` | **2** |\n\nResult: `[0, 1, 3, 2]`\n\n### The one-bit-difference check\n\n| pair | binary | differing bits |\n|---|---|---|\n| `0` → `1` | `00` → `01` | one (bit 0) |\n| `1` → `3` | `01` → `11` | one (bit 1) |\n| `3` → `2` | `11` → `10` | one (bit 0) |\n\n### The recursive picture — `G(n) = [0G(n-1), 1 reverse(G(n-1))]`\n\n```\nG(0) = [0]\nG(1) = [0, 1]\nG(2) = [ 0 0, 0 1, 1 1, 1 0 ]  =  [0, 1, 3, 2]\nG(3) = [ 0 0, 0 1, 0 3, 0 2 ,  1 2, 1 3, 1 1, 1 0 ]  =  [0, 1, 3, 2, 6, 7, 5, 4]\n```\n\nThe second half is the first half **reversed** with a `1` prefix — that is the "binary\nreflection". The formula `gray(i) = i ^ (i >> 1)` produces exactly this sequence:\n\n| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n|---|---:|---:|---:|---:|---:|---:|---:|---:|\n| `i` | `000` | `001` | `010` | `011` | `100` | `101` | `110` | `111` |\n| `i >> 1` | `000` | `000` | `001` | `001` | `010` | `010` | `011` | `011` |\n| `i ^ (i >> 1)` | `000` | `001` | `011` | `010` | `110` | `111` | `101` | `100` |\n\n## Java Solution\n\nSee [`GrayCode.java`](./GrayCode.java).\n\n```java\npublic static int[] grayCode(int n) {\n    int size = 1 << n; // 2^n entries\n    int[] result = new int[size];\n    for (int i = 0; i < size; i++) {\n        result[i] = i ^ (i >> 1);\n    }\n    return result;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(2ⁿ) | One entry per value in the range |\n| **Space** | O(2ⁿ) | The result array |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Prove it is a permutation."* → the transform is invertible: `i` can be recovered from\n  `gray(i)` by XOR-ing all of its right shifts.\n- *"Prove consecutive entries differ in one bit."* → `gray(i) ^ gray(i + 1)` equals the\n  lowest set bit of `i + 1` — one bit, always.\n- *"What is the Gray code of a large number?"* → `n ^ (n >> 1)` — O(1).\n- *"Where is Gray code used?"* → it is the standard way to minimise the number of bit\n  flips in hardware (e.g. the rotary encoders on old chessboards, and Gray-coded counters\n  in electronics), because consecutive values differ in one bit.\n\n**Common mistakes:**\n- ❌ Returning only `n` entries instead of `2^n` → the problem asks for the whole sequence.\n- ❌ Using `i >> 1` on the *previous* value instead of on `i`.\n- ❌ Forgetting that `n` is the **bit width**, so `n = 2` gives 4 values.\n- ❌ Building the sequence recursively and getting the reflection order wrong → the second\n  half is the *reverse* of the first half with a `1` prefix.\n\n**How to narrate:**\n> "The i-th Gray code value is `i ^ (i >> 1)`. XOR-ing a number with its own right shift\n> is what makes consecutive entries differ in exactly one bit, and the transform is\n> invertible, so the 2^n values are a permutation of the range. I just fill the array with\n> that formula — O(2^n) time."\n\n## Related Problems\n\n- [Reverse Bits](./ReverseBits.java) — another bit permutation\n- [Single Number](./SingleNumber.java) — XOR fundamentals\n- [Number of 1 Bits](./NumberOfSetBits.java) — counting set bits\n',i=[`grayCode`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};