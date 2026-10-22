var e=`bitmanipulation.AddTwoIntegers`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sum of Two Integers
 * LeetCode: 371 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bit tricks, Addition without the + operator
 *
 * <p>Problem:
 * Given two integers {@code a} and {@code b}, return their sum **without using the
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
 * 2
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: bitwise addition without a carry is {@code a ^ b}; the carry bits are
 * {@code (a & b) << 1}. Add the carry back in and repeat until the carry is zero. Because
 * the carry only ever moves left, the loop runs at most 32 times.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class AddTwoIntegers {

    /**
     * Returns {@code a + b} using only bitwise operators.
     *
     * @param a the first addend
     * @param b the second addend
     * @return the sum
     */
    public static int add(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1; // the places where both addends have a 1
            a = a ^ b;                // the sum bits, without the carry
            b = carry;                // fold the carry back in
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int a = fs.nextInt();
        int b = fs.nextInt();

        System.out.println(add(a, b));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Sum of Two Integers
 * LeetCode: 371 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bit tricks, Addition without the + operator
 *
 * <p>Problem:
 * Given two integers {@code a} and {@code b}, return their sum **without using the
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
 * 2
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: bitwise addition without a carry is {@code a ^ b}; the carry bits are
 * {@code (a & b) << 1}. Add the carry back in and repeat until the carry is zero. Because
 * the carry only ever moves left, the loop runs at most 32 times.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class Main {

    /**
     * Returns {@code a + b} using only bitwise operators.
     *
     * @param a the first addend
     * @param b the second addend
     * @return the sum
     */
    public static int add(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1; // the places where both addends have a 1
            a = a ^ b;                // the sum bits, without the carry
            b = carry;                // fold the carry back in
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int a = fs.nextInt();
        int b = fs.nextInt();

        System.out.println(add(a, b));
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
`,r='\n# Sum of Two Integers — LeetCode 371\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Bit tricks · Addition without the + operator |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Apple |\n\n## Problem Statement\n\nGiven two integers `a` and `b`, return their sum **without using the `+` or `-`\noperators**.\n\n- The answer is guaranteed to fit into a signed 32-bit integer.\n- `a = 1`, `b = 2` → `3`.\n- `a = 2`, `b = 3` → `5`.\n- `a = -5`, `b = 3` → `-2`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\na\nb\n```\n\n- `a` — the first addend (−2³¹ ≤ a ≤ 2³¹ − 1)\n- `b` — the second addend (−2³¹ ≤ b ≤ 2³¹ − 1)\n\n## Sample Input\n\n```\n2\n3\n```\n\n## Expected Output\n\n```\n5\n```\n\n## Approach — Add the bits, then add the carries\n\nBinary addition happens in two parts:\n\n1. **Sum bits** — the XOR of the two numbers. `1 + 1 = 0` in the sum column, and\n   `0 + 1 = 1`.\n2. **Carry bits** — `1 + 1 = 10` in binary, so the carry goes to the *next* column. The\n   positions where both numbers have a `1` are `(a & b)`, and shifting them left by one\n   places them in the next column: `(a & b) << 1`.\n\nSo:\n\n```java\nwhile (b != 0) {\n    int carry = (a & b) << 1;\n    a = a ^ b;\n    b = carry;\n}\nreturn a;\n```\n\nThe carry only ever moves **left**, so after at most 32 iterations it falls off the top and\nthe loop terminates. Negative numbers work automatically because Java uses two\'s\ncomplement.\n\n**Why `b` is the loop variable.** After the first iteration `a` holds the sum bits and\n`b` holds the carries that still need to be added. Each iteration adds one more layer of\ncarry.\n\n## Dry Run\n\nInput: `a = 2 = 010₂`, `b = 3 = 011₂`\n\n| Step | `a` | `b` | `(a & b) << 1` (new carry) | `a ^ b` (new a) |\n|---:|---|---|---|---|\n| 1 | `010` (2) | `011` (3) | `010 & 011 = 010`; `<< 1` → `100` (4) | `010 ^ 011 = 001` (1) |\n| 2 | `001` (1) | `100` (4) | `001 & 100 = 000`; `<< 1` → `000` (0) | `001 ^ 100 = 101` (5) |\n| 3 | `101` (5) | `000` (0) | loop ends (`b == 0`) | — |\n\nResult: **5** ✓\n\n### The same addition, done by hand\n\n```\n    010        (a = 2)\n    011        (b = 3)\n  ------\n  sum  001    (a ^ b)\n  carry 100   ((a & b) << 1)\n  ------\n        101    (1 + 4 = 5, no further carry)\n```\n\n### A negative addend — `a = -5`, `b = 3`\n\n| Step | `a` | `b` | new carry | new `a` |\n|---:|---|---|---|---|\n| 1 | `-5` = `...11111011` | `3` = `...00000011` | `...00000010` → `4` | `...11111100` = `-8` |\n| 2 | `-8` = `...11111000` | `4` = `...00000100` | `...00000000` → `0` | `...11111100` = `-2` |\n\n`b` is now `0` → the answer is `-2` ✓ (Java\'s two\'s complement handles the sign for free.)\n\n## Java Solution\n\nSee [`AddTwoIntegers.java`](./AddTwoIntegers.java).\n\n```java\npublic static int add(int a, int b) {\n    while (b != 0) {\n        int carry = (a & b) << 1; // the places where both addends have a 1\n        a = a ^ b;                // the sum bits, without the carry\n        b = carry;                // fold the carry back in\n    }\n    return a;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(32) = O(1) | The carry moves left on every iteration |\n| **Space** | O(1) | Three variables |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Now do subtraction without `-`."* → the borrow version of the same loop, see\n  [Subtract Two Integers without Minus](./SubtractWithoutMinus.java).\n- *"Now do multiplication."* → shift-and-add: for every set bit of `b`, add `a` shifted\n  left by that bit\'s position.\n- *"Now do division."* → shift-and-subtract, see\n  [Divide Two Integers](./DivideTwoIntegers.java).\n- *"What if the inputs were 64-bit?"* → the same algorithm; use `long`. The loop still\n  terminates in at most 64 iterations.\n\n**Common mistakes:**\n- ❌ Swapping `a ^ b` and `(a & b) << 1` → you must compute the carry from the **old**\n  values of `a` and `b`, which is why the carry is computed first into a temporary.\n- ❌ Using `>>` instead of `<<` for the carry → the carry must move to the **more\n  significant** end.\n- ❌ Looping forever because the carry never becomes zero → it always does: each iteration\n  shifts the carry left, so after at most 32 iterations it overflows to `0`.\n- ❌ Forgetting that Java\'s `+` on `int` already wraps on overflow → the bitwise version\n  has exactly the same overflow behaviour, which is why the problem guarantees the result\n  fits.\n\n**How to narrate:**\n> "Binary addition is XOR plus carry. `a ^ b` gives the sum bits with no carry, and\n> `(a & b) << 1` gives the carries moved into the next column. I add the carries back in\n> and repeat until there are none left. The carry only moves left, so it terminates within\n> 32 iterations, and two\'s complement makes negative inputs work for free."\n\n## Related Problems\n\n- [Subtract Two Integers without Minus](./SubtractWithoutMinus.java) — the borrow version\n- [Divide Two Integers](./DivideTwoIntegers.java) — shift and subtract\n- [Single Number](./SingleNumber.java) — a different XOR trick\n',i=[`add`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};