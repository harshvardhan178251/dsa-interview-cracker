var e=`math.UglyNumber`,t=`package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Ugly Number
 * LeetCode: 313 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Dynamic programming, Three pointers
 *
 * <p>Problem:
 * An ugly number is a positive integer whose only prime factors are 2, 3 and 5. The
 * sequence starts {@code 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, ...}. Return the n-th ugly
 * number (1-indexed).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 12
 * </pre>
 *
 * <p>Approach: every ugly number is {@code 2 * u}, {@code 3 * u} or {@code 5 * u} for
 * an earlier ugly number {@code u}. Three pointers walk through the sequence and the
 * smallest of the three candidates is the next ugly number; every pointer that
 * produced it is moved forward so that no duplicate is emitted.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class UglyNumber {

    /**
     * Returns the n-th ugly number.
     *
     * @param n the 1-based index, {@code n >= 1}
     * @return the n-th ugly number, {@code 0} when {@code n < 1}
     */
    public static int nthUglyNumber(int n) {
        if (n <= 0) {
            return 0;
        }
        long[] ugly = new long[n];
        ugly[0] = 1;
        int i2 = 0;
        int i3 = 0;
        int i5 = 0;
        for (int i = 1; i < n; i++) {
            long next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));
            ugly[i] = next;
            if (next == ugly[i2] * 2) {
                i2++;
            }
            if (next == ugly[i3] * 3) {
                i3++;
            }
            if (next == ugly[i5] * 5) {
                i5++;
            }
        }
        return (int) ugly[n - 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(nthUglyNumber(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Ugly Number
 * LeetCode: 313 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Dynamic programming, Three pointers
 *
 * <p>Problem:
 * An ugly number is a positive integer whose only prime factors are 2, 3 and 5. The
 * sequence starts {@code 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, ...}. Return the n-th ugly
 * number (1-indexed).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 12
 * </pre>
 *
 * <p>Approach: every ugly number is {@code 2 * u}, {@code 3 * u} or {@code 5 * u} for
 * an earlier ugly number {@code u}. Three pointers walk through the sequence and the
 * smallest of the three candidates is the next ugly number; every pointer that
 * produced it is moved forward so that no duplicate is emitted.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the n-th ugly number.
     *
     * @param n the 1-based index, {@code n >= 1}
     * @return the n-th ugly number, {@code 0} when {@code n < 1}
     */
    public static int nthUglyNumber(int n) {
        if (n <= 0) {
            return 0;
        }
        long[] ugly = new long[n];
        ugly[0] = 1;
        int i2 = 0;
        int i3 = 0;
        int i5 = 0;
        for (int i = 1; i < n; i++) {
            long next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));
            ugly[i] = next;
            if (next == ugly[i2] * 2) {
                i2++;
            }
            if (next == ugly[i3] * 3) {
                i3++;
            }
            if (next == ugly[i5] * 5) {
                i5++;
            }
        }
        return (int) ugly[n - 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(nthUglyNumber(n));
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
`,r='\n# Ugly Number — LeetCode 313\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Dynamic programming · Three pointers |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nAn **ugly number** is a positive integer whose only prime factors are `2`, `3` and `5`.\nThe sequence starts\n\n```\n1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 25, 27, 30, 32, ...\n```\n\n`1` is ugly by definition. Return the **n-th** ugly number (1-indexed).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the 1-based index (1 ≤ n ≤ 1690)\n\n## Sample Input\n\n```\n10\n```\n\n## Expected Output\n\n```\n12\n```\n\n## Approach — three pointers over the sequence\n\nEvery ugly number is `2 × u`, `3 × u` or `5 × u` for an earlier ugly number `u`. So the\nsequence can be generated with three pointers into the already computed values:\n\n- `i2` points at the ugly number whose double is the next candidate,\n- `i3` at the one whose triple is the candidate,\n- `i5` at the one whose fivefold is the candidate.\n\nThe next ugly number is the **minimum** of the three candidates. Then **every** pointer\nthat produced that minimum moves forward — otherwise duplicates appear (`6` is both\n`2 × 3` and `3 × 2`).\n\n**Why the minimum is correct:** the ugly numbers are exactly the numbers reachable by\nmultiplying `1` by 2, 3 and 5 in any order. Sorted, they form the sequence above, and\neach of them is produced by multiplying a smaller ugly number by one of the three\nfactors — so the next one must be among the three candidates, and by induction the\npointers always reference the smallest not-yet-used multiple.\n\n**Why all matching pointers move:** `12` can be written as `2 × 6` and as `3 × 4`. If\nonly `i2` moved, `12` would be emitted again later. Moving every pointer that\nproduced the minimum removes the duplicate — this is the classic "merge k sorted\nlists" trick.\n\n## Dry Run\n\nInput: `n = 10`\n\n| Step | `ugly[i2] × 2` | `ugly[i3] × 3` | `ugly[i5] × 5` | next | pointers after | `ugly` |\n|---:|---:|---:|---:|---:|---|---|\n| 0 | — | — | — | 1 | `i2 = i3 = i5 = 0` | `[1]` |\n| 1 | `1×2 = 2` | `1×3 = 3` | `1×5 = 5` | 2 | `i2 = 1` | `[1, 2]` |\n| 2 | `2×2 = 4` | `1×3 = 3` | `1×5 = 5` | 3 | `i3 = 1` | `[1, 2, 3]` |\n| 3 | `2×2 = 4` | `2×3 = 6` | `1×5 = 5` | 4 | `i2 = 2` | `[1, 2, 3, 4]` |\n| 4 | `3×2 = 6` | `2×3 = 6` | `1×5 = 5` | 5 | `i5 = 1` | `[1, 2, 3, 4, 5]` |\n| 5 | `3×2 = 6` | `2×3 = 6` | `2×5 = 10` | 6 | `i2 = 3`, `i3 = 2` | `[…, 6]` |\n| 6 | `4×2 = 8` | `3×3 = 9` | `2×5 = 10` | 8 | `i2 = 4` | `[…, 8]` |\n| 7 | `4×2 = 8` | `3×3 = 9` | `2×5 = 10` | 9 | `i3 = 3` | `[…, 9]` |\n| 8 | `5×2 = 10` | `3×3 = 9` | `2×5 = 10` | 10 | `i2 = 5`, `i5 = 2` | `[…, 10]` |\n| 9 | `6×2 = 12` | `4×3 = 12` | `3×5 = 15` | 12 | `i2 = 6`, `i3 = 4` | `[…, 12]` |\n\nThe 10-th ugly number is **12** ✓\n\n## Java Solution\n\nSee [`UglyNumber.java`](./UglyNumber.java).\n\n```java\npublic static int nthUglyNumber(int n) {\n    if (n <= 0) {\n        return 0;\n    }\n    long[] ugly = new long[n];\n    ugly[0] = 1;\n    int i2 = 0;\n    int i3 = 0;\n    int i5 = 0;\n    for (int i = 1; i < n; i++) {\n        long next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));\n        ugly[i] = next;\n        if (next == ugly[i2] * 2) {\n            i2++;\n        }\n        if (next == ugly[i3] * 3) {\n            i3++;\n        }\n        if (next == ugly[i5] * 5) {\n            i5++;\n        }\n    }\n    return (int) ugly[n - 1];\n}\n```\n\nThe array holds `long` values because the candidate `ugly[i] × 5` can exceed the range\nof an `int` even when the answer itself fits.\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | three comparisons and three pointer moves per element |\n| **Space** | O(n) | the sequence has to be kept for the pointers |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Generalise to the ugly number II — numbers with at most `k` prime factors."* → use\n  `k` pointers instead of three.\n- *"Find the nth ugly number without storing the whole sequence?"* → you need the\n  sequence for the pointers; a heap of the three candidates is the alternative.\n- *"How do you test whether a number is ugly?"* → divide out the factors of 2, 3 and\n  5 and check that what is left is 1.\n\n**Common mistakes:**\n- ❌ Moving only one pointer when several candidates tie — `12` would be emitted twice.\n- ❌ Using `int` for the array — `ugly[i] × 5` can overflow.\n- ❌ Forgetting that `1` is the first ugly number.\n\n**How to narrate:**\n> "Every ugly number is two, three or five times a smaller ugly number, so I keep the\n> sequence and three pointers, one per factor. The next number is the smallest of the\n> three candidates, and I advance *every* pointer that produced it — otherwise\n> duplicates like `12 = 2 × 6 = 3 × 4` would slip in."\n\n## Related Problems\n\n- [Coin Change with Greedy](../greedy/GreedyCoinChange.md) — a greedy over the same kind of values\n- [Count Primes](./SieveOfEratosthenes.md) — primes instead of smooth numbers\n',i=[`nthUglyNumber`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};