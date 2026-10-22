var e=`bitmanipulation.NumberOfSetBits`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Counting Bits
 * LeetCode: 338 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Bit tricks, Dynamic programming
 *
 * <p>Problem:
 * Given a non-negative integer {@code n}, return an array {@code ans} of size {@code n + 1}
 * where {@code ans[i]} is the number of set bits in the binary representation of {@code i}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 1 2 1 2
 * </pre>
 *
 * <p>Approach: {@code i} is either {@code 2k} (which just shifts {@code k} left, so it has
 * the same number of set bits) or {@code 2k + 1} (which adds one set bit to {@code k}).
 * Therefore {@code ans[i] = ans[i >> 1] + (i & 1)} — one pass, O(1) per value.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class NumberOfSetBits {

    /**
     * Returns the number of set bits for every value from {@code 0} to {@code n}.
     *
     * @param n the upper bound (inclusive)
     * @return an array of length {@code n + 1}
     */
    public static int[] countBits(int n) {
        int[] result = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            result[i] = result[i >> 1] + (i & 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[] answer = countBits(n);
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
 * Problem: Counting Bits
 * LeetCode: 338 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Bit tricks, Dynamic programming
 *
 * <p>Problem:
 * Given a non-negative integer {@code n}, return an array {@code ans} of size {@code n + 1}
 * where {@code ans[i]} is the number of set bits in the binary representation of {@code i}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 1 2 1 2
 * </pre>
 *
 * <p>Approach: {@code i} is either {@code 2k} (which just shifts {@code k} left, so it has
 * the same number of set bits) or {@code 2k + 1} (which adds one set bit to {@code k}).
 * Therefore {@code ans[i] = ans[i >> 1] + (i & 1)} — one pass, O(1) per value.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the number of set bits for every value from {@code 0} to {@code n}.
     *
     * @param n the upper bound (inclusive)
     * @return an array of length {@code n + 1}
     */
    public static int[] countBits(int n) {
        int[] result = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            result[i] = result[i >> 1] + (i & 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[] answer = countBits(n);
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
`,r='\n# Counting Bits — LeetCode 338\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Bit tricks · Dynamic programming |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nGiven a non-negative integer `n`, return an array `ans` of length `n + 1` where\n`ans[i]` is the number of set bits in the binary representation of `i`.\n\n- `n = 5` → `[0, 1, 1, 2, 1, 2]` (for `0, 1, 2, 3, 4, 5`).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — a non-negative integer (0 ≤ n ≤ 10⁵)\n\n## Sample Input\n\n```\n5\n```\n\n## Expected Output\n\n```\n0 1 1 2 1 2\n```\n\n## Approach — Halve the number and reuse the answer\n\nEvery positive integer is either `2k` or `2k + 1`:\n\n- `2k` is `k` shifted left by one bit, so it has exactly the **same** number of set bits\n  as `k` — i.e. `ans[2k] = ans[k]`.\n- `2k + 1` is `k` shifted left with a `1` appended, so it has **one more** set bit —\n  `ans[2k + 1] = ans[k] + 1`.\n\nBoth cases are the single formula:\n\n```java\nans[i] = ans[i >> 1] + (i & 1);\n```\n\n`i >> 1` is always smaller than `i` (for `i >= 1`), so filling the array from `1` upwards\nalways reads an already-computed value. Total work: O(n), one pass, no bit tricks beyond\nthe shift and the mask.\n\n## Dry Run\n\nInput: `n = 5`\n\n| i | `i` in binary | `i >> 1` | `ans[i >> 1]` | `i & 1` | `ans[i]` |\n|---:|---|---:|---:|---:|---:|\n| 0 | `000` | — | — | — | **0** (base case) |\n| 1 | `001` | 0 | 0 | 1 | **1** |\n| 2 | `010` | 1 | 1 | 0 | **1** |\n| 3 | `011` | 1 | 1 | 1 | **2** |\n| 4 | `100` | 2 | 1 | 0 | **1** |\n| 5 | `101` | 2 | 1 | 1 | **2** |\n\nResult: `[0, 1, 1, 2, 1, 2]`\n\n### The array as it grows\n\n| i | binary | `ans[i]` | reasoning |\n|---:|---|---:|---|\n| 0 | `0000` | 0 | zero has no set bits |\n| 1 | `0001` | 1 | `ans[0] + 1` |\n| 2 | `0010` | 1 | `ans[1] + 0` — a left shift keeps the count |\n| 3 | `0011` | 2 | `ans[1] + 1` |\n| 4 | `0100` | 1 | `ans[2] + 0` |\n| 5 | `0101` | 2 | `ans[2] + 1` |\n| 6 | `0110` | 2 | `ans[3] + 0` |\n| 7 | `0111` | 3 | `ans[3] + 1` |\n\n## Java Solution\n\nSee [`NumberOfSetBits.java`](./NumberOfSetBits.java).\n\n```java\npublic static int[] countBits(int n) {\n    int[] result = new int[n + 1];\n    for (int i = 1; i <= n; i++) {\n        result[i] = result[i >> 1] + (i & 1);\n    }\n    return result;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One pass, O(1) per value |\n| **Space** | O(n) | The answer array itself |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you do it in O(1) extra space?"* → no, you must return n + 1 values; the output\n  array is the space.\n- *"What if you wanted the counts for all values up to 2³²?"* → the same idea, but the\n  array no longer fits in memory; process in blocks or use the formula\n  `popcount(i) = popcount(i & 0xFFFF) + popcount(i >>> 16)`.\n- *"How does this relate to `Integer.bitCount`?"* → that is the hardware instruction; this\n  DP is the software equivalent that also produces *every* count at once.\n- *"What is the total number of set bits from 0 to n?"* → sum the array; there is a closed\n  form using the per-bit-cycle counts.\n\n**Common mistakes:**\n- ❌ Starting the loop at `i = 0` → `result[0] = result[0] + 0` reads an unwritten value\n  (harmless here, but the loop must start at 1 conceptually).\n- ❌ Forgetting the `+ 1` for odd numbers → `ans[3]` would be `1` instead of `2`.\n- ❌ Using `i / 2` and `i % 2` instead of `i >> 1` and `i & 1` → equivalent, but the bit\n  form is what the name of the problem suggests.\n- ❌ Allocating an array of length `n` instead of `n + 1` → `ans[n]` would be out of\n  bounds.\n\n**How to narrate:**\n> "Every positive number is `2k` or `2k + 1`. Shifting left by one doesn\'t change the number\n> of set bits, and `2k + 1` adds exactly one. So `ans[i] = ans[i >> 1] + (i & 1)`, and\n> because `i >> 1` is always smaller than `i` I can fill the array in one forward pass — O(n)\n> time, one pass."\n\n## Related Problems\n\n- [Number of 1 Bits](./CountSetBits.java) — the count for a single value\n- [Power of Two](./PowerOfTwo.java) — a single-bit special case\n- [XOR of All Elements](./XOROfArrayElements.java) — bitwise folding over an array\n',i=[`countBits`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};