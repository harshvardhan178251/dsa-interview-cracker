var e=`bitmanipulation.SubtractWithoutMinus`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Subtract Two Integers without Minus
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bit tricks, Borrow propagation
 *
 * <p>Problem:
 * Given two integers {@code a} and {@code b}, return {@code a - b} **without using the
 * {@code +} or {@code -} operators**.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: mirror the borrow of binary subtraction. {@code (~a & b)} marks the bit
 * positions where a borrow has to be produced (a has a 0 where b has a 1); shifting it left
 * moves the borrow to the next bit. {@code a ^ b} writes the difference bits. Repeating
 * until the borrow is zero finishes the subtraction.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class SubtractWithoutMinus {

    /**
     * Returns {@code a - b} using only bitwise operators.
     *
     * @param a the minuend
     * @param b the subtrahend
     * @return the difference
     */
    public static int subtract(int a, int b) {
        while (b != 0) {
            int borrow = (~a & b) << 1; // positions that must borrow from the next bit
            a = a ^ b;                 // the difference bits
            b = borrow;                // propagate the borrow
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int a = fs.nextInt();
        int b = fs.nextInt();

        System.out.println(subtract(a, b));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Subtract Two Integers without Minus
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bit tricks, Borrow propagation
 *
 * <p>Problem:
 * Given two integers {@code a} and {@code b}, return {@code a - b} **without using the
 * {@code +} or {@code -} operators**.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: mirror the borrow of binary subtraction. {@code (~a & b)} marks the bit
 * positions where a borrow has to be produced (a has a 0 where b has a 1); shifting it left
 * moves the borrow to the next bit. {@code a ^ b} writes the difference bits. Repeating
 * until the borrow is zero finishes the subtraction.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class Main {

    /**
     * Returns {@code a - b} using only bitwise operators.
     *
     * @param a the minuend
     * @param b the subtrahend
     * @return the difference
     */
    public static int subtract(int a, int b) {
        while (b != 0) {
            int borrow = (~a & b) << 1; // positions that must borrow from the next bit
            a = a ^ b;                 // the difference bits
            b = borrow;                // propagate the borrow
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int a = fs.nextInt();
        int b = fs.nextInt();

        System.out.println(subtract(a, b));
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
`,r='\n# Subtract Two Integers without Minus — classic bit-twiddling problem\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Bit tricks · Two\'s complement · Borrow propagation |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Adobe |\n\n## Problem Statement\n\nGiven two integers `a` and `b`, return `a - b` **without using the `+` or `-` operators**.\n\n- `a = 5`, `b = 3` → `2`.\n- `a = 3`, `b = 5` → `-2`.\n- `a = 0`, `b = 0` → `0`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\na\nb\n```\n\n- `a` — the minuend (−2³¹ ≤ a ≤ 2³¹ − 1)\n- `b` — the subtrahend (−2³¹ ≤ b ≤ 2³¹ − 1)\n\n## Sample Input\n\n```\n5\n3\n```\n\n## Expected Output\n\n```\n2\n```\n\n## Approach — Mirror the borrow of binary subtraction\n\nBinary subtraction works column by column. When you subtract a `1` from a `0`, you must\n**borrow** from the next column to the left.\n\n- `~a & b` marks exactly the positions where a borrow has to be produced: `b` has a `1`\n  there and `a` has a `0`.\n- `<< 1` moves each borrow to the next column, where it propagates.\n- `a ^ b` writes the difference bits (the borrow positions become `1 - 1 = 0`).\n\n```java\nwhile (b != 0) {\n    int borrow = (~a & b) << 1;\n    a = a ^ b;\n    b = borrow;\n}\nreturn a;\n```\n\n**Why the borrow keeps moving left.** A borrow out of bit `i` becomes a borrow *into* bit\n`i + 1`, so each round of the loop shifts the pending borrows one position left. The\npending borrow is absorbed as soon as the bit above it can pay for it, and in the worst\ncase it walks off the top of the 32-bit word and the loop ends.\n\n**Negative results fall out for free.** Because Java uses two\'s complement, `3 - 5` is\nsimply the bit pattern `...11111110` — the borrow chain walks all the way up and the\nanswer is `-2` without any special-casing.\n\n## Dry Run\n\nInput: `a = 5 = 0101₂`, `b = 3 = 0011₂`\n\n| Step | `a` (binary) | `b` (binary) | `~a` | `~a & b` | `borrow = (~a & b) << 1` | new `a = a ^ b` |\n|---:|---|---|---|---|---|---|\n| 1 | `0101` (5) | `0011` (3) | `...1010` | `0010` | `0100` (4) | `0110` (6) |\n| 2 | `0110` (6) | `0100` (4) | `...1001` | `0000` | `0000` (0) | `0010` (2) |\n\n`b` is now `0` → the answer is **2** ✓\n\n### The same subtraction, done by hand\n\n```\n    0101        (a = 5)\n  - 0011        (b = 3)\n  -------\n  diff 0110     (a ^ b)\n  borrow 0100   ((~a & b) << 1)\n  -------\n  result 0010   (0110 ^ 0100 = 2)\n```\n\n### A negative result — `a = 3`, `b = 5`\n\n| Step | `a` | `b` | `borrow` | new `a` |\n|---:|---|---|---|---|\n| 1 | `0011` (3) | `0101` (5) | `1000` (8) | `0110` (6) |\n| 2 | `0110` (6) | `1000` (8) | `10000` (16) | `1110` (14) |\n| 3 | `1110` (14) | `10000` (16) | `100000` (32) | `11110` (30) |\n| … | … | … | the borrow doubles each round | … |\n| 30 | `1111…1110` (−2) | `0` | 0 | `1111…1110` (−2) |\n\nThe borrow chain walks left until it is absorbed; the final accumulator is\n`...11111110` = `-2` ✓\n\n## Java Solution\n\nSee [`SubtractWithoutMinus.java`](./SubtractWithoutMinus.java).\n\n```java\npublic static int subtract(int a, int b) {\n    while (b != 0) {\n        int borrow = (~a & b) << 1; // positions that must borrow from the next bit\n        a = a ^ b;                 // the difference bits\n        b = borrow;                // propagate the borrow\n    }\n    return a;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(32) = O(1) | The borrow moves left on every iteration |\n| **Space** | O(1) | Three variables |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Explain the two\'s complement view: `a - b == a + ~b + 1`."* → the alternative route;\n  `~b` is the bitwise complement and `+ 1` turns it into `-b`. The borrow loop is the\n  direct implementation of the same idea.\n- *"Now multiply without `*`."* → shift-and-add over the set bits of one operand.\n- *"Now divide without `/`."* → shift-and-subtract, see\n  [Divide Two Integers](./DivideTwoIntegers.java).\n- *"What if the values are 64-bit?"* → the same algorithm with `long`.\n\n**Common mistakes:**\n- ❌ Using `+` anywhere in the implementation (`a + 1`, or reusing the add helper with\n  `~b + 1`) → it violates the constraint of the exercise.\n- ❌ Shifting the borrow **right** instead of left → the borrow must move to the *more*\n  significant column.\n- ❌ Forgetting to update `b` with the borrow before the next iteration → infinite loop.\n- ❌ Worrying about the negative case → two\'s complement handles it; demonstrate it with\n  `3 - 5`.\n\n**How to narrate:**\n> "Subtraction is addition with a borrow. The positions that must borrow are the ones where\n> `b` has a 1 and `a` has a 0, which is `~a & b`; shifting that left moves each borrow into\n> the next column. `a ^ b` gives the difference bits. I repeat until the borrow is zero —\n> it only ever moves left, so it terminates within 32 rounds, and two\'s complement gives the\n> right answer for negative results automatically."\n\n## Related Problems\n\n- [Sum of Two Integers](./AddTwoIntegers.java) — the carry version\n- [Divide Two Integers](./DivideTwoIntegers.java) — shift and subtract\n- [Reverse Bits](./ReverseBits.java) — another bit permutation\n',i=[`subtract`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};