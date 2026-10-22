var e=`math.PowOfANumber`,t=`package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Pow(x, n)
 * LeetCode: 50 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Fast exponentiation
 *
 * <p>Problem:
 * Compute {@code x} raised to the power {@code n} without using the {@code Math.pow}
 * helper. A negative exponent means {@code 1 / x^|n|}.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2.5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 15.625
 * </pre>
 *
 * <p>Approach: binary exponentiation. Every round squares the base and halves the
 * exponent, so the number of rounds is {@code O(log |n|)} instead of {@code O(n)}.
 * A negative exponent is turned into a positive one by inverting the base.
 *
 * <p>Complexity: Time O(log |n|), Space O(1).
 */
public class PowOfANumber {

    /**
     * Computes {@code x} to the power of {@code n}.
     *
     * @param x the base
     * @param n the exponent
     * @return the value of {@code x^n}
     */
    public static double pow(double x, int n) {
        long exponent = n;
        if (exponent < 0) {
            x = 1.0 / x;
            exponent = -exponent;
        }
        double result = 1.0;
        double base = x;
        while (exponent > 0) {
            if ((exponent & 1L) == 1L) {
                result *= base;
            }
            base *= base;
            exponent >>= 1;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        double x = fs.nextDouble();
        int n = fs.nextInt();

        double result = pow(x, n);
        if (Double.isFinite(result) && result == Math.rint(result)
                && Math.abs(result) < 9.007199254740992E15) {
            System.out.println((long) result);   // print whole numbers without a decimal point
        } else {
            System.out.println(result);
        }
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Pow(x, n)
 * LeetCode: 50 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Fast exponentiation
 *
 * <p>Problem:
 * Compute {@code x} raised to the power {@code n} without using the {@code Math.pow}
 * helper. A negative exponent means {@code 1 / x^|n|}.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2.5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 15.625
 * </pre>
 *
 * <p>Approach: binary exponentiation. Every round squares the base and halves the
 * exponent, so the number of rounds is {@code O(log |n|)} instead of {@code O(n)}.
 * A negative exponent is turned into a positive one by inverting the base.
 *
 * <p>Complexity: Time O(log |n|), Space O(1).
 */
public class Main {

    /**
     * Computes {@code x} to the power of {@code n}.
     *
     * @param x the base
     * @param n the exponent
     * @return the value of {@code x^n}
     */
    public static double pow(double x, int n) {
        long exponent = n;
        if (exponent < 0) {
            x = 1.0 / x;
            exponent = -exponent;
        }
        double result = 1.0;
        double base = x;
        while (exponent > 0) {
            if ((exponent & 1L) == 1L) {
                result *= base;
            }
            base *= base;
            exponent >>= 1;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        double x = fs.nextDouble();
        int n = fs.nextInt();

        double result = pow(x, n);
        if (Double.isFinite(result) && result == Math.rint(result)
                && Math.abs(result) < 9.007199254740992E15) {
            System.out.println((long) result);   // print whole numbers without a decimal point
        } else {
            System.out.println(result);
        }
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
`,r='\n# Pow(x, n) — LeetCode 50\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Divide and conquer · Fast exponentiation |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |\n\n## Problem Statement\n\nCompute `x` raised to the power `n` without using `Math.pow`.\n\n- `n` may be negative: `x^-n = 1 / x^n`.\n- `n = 0` → the result is `1` (even for `x = 0`).\n- The result may be fractional.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nx\nn\n```\n\n- `x` — the base (a floating point number)\n- `n` — the exponent (an integer, may be negative)\n\n## Sample Input\n\n```\n2.5\n3\n```\n\n## Expected Output\n\n```\n15.625\n```\n\n`2.5³ = 2.5 × 2.5 × 2.5 = 15.625`.\n\n## Approach — binary exponentiation\n\nMultiplying `x` by itself `n` times costs O(n) — far too slow for `n = 2³¹`. Instead\nuse the fact that `x^n = (x^(n/2))²` when `n` is even:\n\n- If the exponent is even, square the base and halve the exponent.\n- If the exponent is odd, multiply the result by the base once, then do the same.\n\nEach round halves the exponent, so there are only `O(log |n|)` rounds.\n\nA negative exponent is handled by inverting the base (`x → 1/x`) and using the\nabsolute value of the exponent. `n = Integer.MIN_VALUE` is the classic trap: `-n`\noverflows an `int`, so the exponent is kept in a `long`.\n\n**Correctness invariant:** after every round the result of the algorithm equals\n`result × base^exponent` of the original problem. Squaring the base and halving the\nexponent preserves the product, and taking one factor out of the exponent (for an\nodd exponent) multiplies it into the result — so the invariant holds and the loop\nends with `exponent = 0` and `result` equal to the answer.\n\n## Dry Run\n\nInput: `x = 2.5`, `n = 3`\n\n| Round | exponent | base | result | action |\n|---:|---:|---:|---:|---|\n| 0 | 3 | 2.5 | 1.0 | `exponent` is odd → `result = 1.0 × 2.5 = 2.5`; `base = 2.5² = 6.25`; `exponent = 1` |\n| 1 | 1 | 6.25 | 2.5 | odd → `result = 2.5 × 6.25 = 15.625`; `base = 6.25² = 39.0625`; `exponent = 0` |\n\n`exponent = 0` → the result is `15.625` ✓\n\n### Negative exponent — `x = 2`, `n = -3`\n\n| Round | exponent | base | result | action |\n|---:|---:|---:|---:|---|\n| 0 | 3 | 0.5 (`1/2`) | 1.0 | odd → `result = 0.5`; `base = 0.25`; `exponent = 1` |\n| 1 | 1 | 0.25 | 0.5 | odd → `result = 0.5 × 0.25 = 0.125`; `exponent = 0` |\n\n`2^-3 = 0.125` ✓\n\n### Exponent zero — `x = 2.5`, `n = 0`\n\n| Round | exponent | base | result | action |\n|---:|---:|---:|---:|---|\n| 0 | 0 | 2.5 | 1.0 | the loop does not run → `result = 1.0` |\n\n`x⁰ = 1` ✓\n\n## Java Solution\n\nSee [`PowOfANumber.java`](./PowOfANumber.java).\n\n```java\npublic static double pow(double x, int n) {\n    long exponent = n;\n    if (exponent < 0) {\n        x = 1.0 / x;\n        exponent = -exponent;\n    }\n    double result = 1.0;\n    double base = x;\n    while (exponent > 0) {\n        if ((exponent & 1L) == 1L) {\n            result *= base;\n        }\n        base *= base;\n        exponent >>= 1;\n    }\n    return result;\n}\n```\n\nThe program prints whole results as integers (`2⁰¹⁰` → `1024`) and fractional results\nas they are (`2.5³` → `15.625`).\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(log \\|n\\|) | the exponent is halved every round |\n| **Space** | O(1) | iterative; the recursive version needs O(log \\|n\\|) stack frames |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Write it recursively."* → `pow(x, n) = x * pow(x, n-1)` for odd `n` and\n  `pow(x*x, n/2)` for even `n`; same complexity, but O(log n) stack frames.\n- *"What if the exponent is huge (a `long` or a `BigInteger`)?"* → the same loop works\n  with a `long` exponent; for a `BigInteger` you need a different approach.\n- *"How do you avoid floating point error?"* → the binary expansion of `n` determines\n  which powers are multiplied; with exact rational inputs (powers of two and five) the\n  result is exact.\n\n**Common mistakes:**\n- ❌ `-n` on `Integer.MIN_VALUE` — the negation overflows; keep the exponent in a\n  `long`.\n- ❌ Using `Math.pow` — the exercise is to implement it yourself.\n- ❌ Squaring the base **after** the exponent has been shifted in the wrong order —\n  square every round, the result only picks up the factors it needs.\n- ❌ Forgetting that `x⁰ = 1` even when `x = 0`.\n\n**How to narrate:**\n> "I use binary exponentiation: every round I square the base and halve the exponent,\n> so there are only log n rounds. If the exponent is odd I first multiply the result by\n> the base. A negative exponent is handled by inverting the base first, and I keep the\n> exponent in a long so that `Integer.MIN_VALUE` cannot overflow."\n\n## Related Problems\n\n- [Factorial Trailing Zeroes](./FactorialTrailingZeroes.md) — counting factors instead of multiplying\n- [Happy Number](./HappyNumber.md) — digit transformations\n',i=[`pow`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};