var e=`math.DetectPrime`,t=`package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Is a Number Prime
 * LeetCode: none | Difficulty: Medium | Frequency: 3/5
 * Pattern: Number theory, Trial division
 *
 * <p>Problem:
 * Decide whether a given integer is a prime number.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 97
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: a composite number always has a divisor of at most its square root, so
 * it is enough to try the divisors up to {@code sqrt(n)}. The candidates are the odd
 * numbers only, and the loop stops as soon as {@code d * d > n}.
 *
 * <p>Complexity: Time O(sqrt(n)), Space O(1).
 */
public class DetectPrime {

    /**
     * Returns whether {@code n} is prime.
     *
     * @param n the number to test
     * @return {@code true} when {@code n} is a prime number
     */
    public static boolean isPrime(int n) {
        if (n < 2) {
            return false;
        }
        if (n % 2 == 0) {
            return n == 2;
        }
        for (int d = 3; (long) d * d <= n; d += 2) {
            if (n % d == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPrime(n) ? "true" : "false");
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Is a Number Prime
 * LeetCode: none | Difficulty: Medium | Frequency: 3/5
 * Pattern: Number theory, Trial division
 *
 * <p>Problem:
 * Decide whether a given integer is a prime number.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 97
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: a composite number always has a divisor of at most its square root, so
 * it is enough to try the divisors up to {@code sqrt(n)}. The candidates are the odd
 * numbers only, and the loop stops as soon as {@code d * d > n}.
 *
 * <p>Complexity: Time O(sqrt(n)), Space O(1).
 */
public class Main {

    /**
     * Returns whether {@code n} is prime.
     *
     * @param n the number to test
     * @return {@code true} when {@code n} is a prime number
     */
    public static boolean isPrime(int n) {
        if (n < 2) {
            return false;
        }
        if (n % 2 == 0) {
            return n == 2;
        }
        for (int d = 3; (long) d * d <= n; d += 2) {
            if (n % d == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPrime(n) ? "true" : "false");
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
`,r='\n# Is a Number Prime\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Number theory · Trial division |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nDecide whether a given integer is a **prime number** — a number greater than 1 whose\nonly divisors are 1 and itself.\n\n- `2` is prime, `1` is **not** (it has only one divisor), `0` and negative numbers are\n  not prime.\n- `97` is prime, `91 = 7 × 13` is not.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the number to test (0 ≤ n ≤ 2³¹ - 1)\n\n## Sample Input\n\n```\n97\n```\n\n## Expected Output\n\n```\ntrue\n```\n\n## Approach — trial division up to the square root\n\nIf `n` is composite, it has a divisor `d` with `1 < d ≤ sqrt(n)`: when `n = a × b`\nwith `a ≤ b`, then `a ≤ sqrt(n)`. So it is enough to try every possible divisor up to\nthe square root.\n\nTwo optimisations:\n\n- handle `2` separately — every other even number is composite;\n- after that only **odd** divisors need to be tried, halving the work.\n\nThe loop condition `d * d <= n` is written with a `long` multiplication so that `d * d`\ncannot overflow for large `n`.\n\n**Why this is complete:** if `n` is composite it has some divisor `d` with\n`1 < d ≤ sqrt(n)` (shown above). The loop visits every such `d` — every odd `d` and,\nthrough the special case for `2`, the even one as well. So the loop finds a divisor\nexactly when one exists.\n\n## Dry Run\n\nInput: `n = 97`\n\n| Step | check | value | result |\n|---:|---|---|---|\n| 1 | `n < 2`? | 97 | no |\n| 2 | `n % 2 == 0`? | `97 % 2 = 1` | not even → continue with odd divisors |\n| 3 | `d = 3`: `3 × 3 = 9 <= 97`? | yes | `97 % 3 = 1` → not a divisor |\n| 4 | `d = 5`: `5 × 5 = 25 <= 97`? | yes | `97 % 5 = 2` → not a divisor |\n| 5 | `d = 7`: `7 × 7 = 49 <= 97`? | yes | `97 % 7 = 6` → not a divisor |\n| 6 | `d = 9`: `9 × 9 = 81 <= 97`? | yes | `97 % 9 = 7` → not a divisor |\n| 7 | `d = 11`: `11 × 11 = 121 <= 97`? | **no** | loop ends → prime |\n\nAnswer: **true**\n\n### Trace of a composite number — `n = 91`\n\n| Step | check | value | result |\n|---:|---|---|---|\n| 1 | `n < 2`? | 91 | no |\n| 2 | `n % 2 == 0`? | 1 | odd → continue |\n| 3 | `d = 3`: `9 <= 91` | `91 % 3 = 1` | not a divisor |\n| 4 | `d = 5`: `25 <= 91` | `91 % 5 = 1` | not a divisor |\n| 5 | `d = 7`: `49 <= 91` | `91 % 7 = 0` | **divisor found → false** |\n\n`91 = 7 × 13` ✓\n\n## Java Solution\n\nSee [`DetectPrime.java`](./DetectPrime.java).\n\n```java\npublic static boolean isPrime(int n) {\n    if (n < 2) {\n        return false;\n    }\n    if (n % 2 == 0) {\n        return n == 2;\n    }\n    for (int d = 3; (long) d * d <= n; d += 2) {\n        if (n % d == 0) {\n            return false;\n        }\n    }\n    return true;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(√n) | at most √n/2 candidate divisors |\n| **Space** | O(1) | a single counter |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if you have to test a million numbers?"* → use a sieve\n  ([Sieve of Eratosthenes](./SieveOfEratosthenes.md)).\n- *"Can you do it in O(1) space and O(√n) time for many queries?"* → precompute primes\n  up to √(max n) with a sieve and test only those.\n- *"What about very large numbers (beyond 64 bit)?"* → Miller–Rabin, which is\n  probabilistic but extremely reliable in practice.\n\n**Common mistakes:**\n- ❌ Treating `1` as prime — it has only one divisor.\n- ❌ Forgetting that `2` is the only even prime.\n- ❌ Writing `d * d <= n` with `int` arithmetic — `d * d` overflows for `d > 46340`\n  and the loop may end too early or never.\n\n**How to narrate:**\n> "A composite number always has a divisor no larger than its square root, so I only\n> have to try divisors up to √n. I handle 2 separately and then step through the odd\n> divisors, which halves the work."\n\n## Related Problems\n\n- [Sieve of Eratosthenes](./SieveOfEratosthenes.md) — primes for a whole range\n- [Largest Prime Factor](./LargestPrimeFactor.md) — factorising a number\n- [Perfect Number](./PerfectNumber.md) — working with the divisors of a number\n',i=[`isPrime`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};