var e=`dynamicprogramming.FibonacciNumber`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Fibonacci Number
 * LeetCode: 509 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Bottom-up DP, Iterative recurrence
 *
 * <p>Problem: Compute the {@code n}-th Fibonacci number, where {@code F(0) = 0}, {@code F(1) = 1} and {@code F(n) = F(n-1) + F(n-2)}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: Keep two variables holding \`F(i-1)\` and \`F(i-2)\` and shift them forward until the index is reached.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class FibonacciNumber {

    /**
     * Returns the {@code n}-th Fibonacci number.
     *
     * <p>{@code F(0) = 0}, {@code F(1) = 1} and {@code F(i) = F(i-1) + F(i-2)}. Only the last two
     * values are needed to produce the next one, so the table collapses into two variables.
     *
     * @param n index of the wanted Fibonacci number
     * @return {@code F(n)}
     */
    public static int fib(int n) {
        int prev2 = 0; // F(0)
        int prev1 = 1; // F(1)
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return n == 0 ? prev2 : prev1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(fib(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Fibonacci Number
 * LeetCode: 509 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Bottom-up DP, Iterative recurrence
 *
 * <p>Problem: Compute the {@code n}-th Fibonacci number, where {@code F(0) = 0}, {@code F(1) = 1} and {@code F(n) = F(n-1) + F(n-2)}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: Keep two variables holding \`F(i-1)\` and \`F(i-2)\` and shift them forward until the index is reached.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the {@code n}-th Fibonacci number.
     *
     * <p>{@code F(0) = 0}, {@code F(1) = 1} and {@code F(i) = F(i-1) + F(i-2)}. Only the last two
     * values are needed to produce the next one, so the table collapses into two variables.
     *
     * @param n index of the wanted Fibonacci number
     * @return {@code F(n)}
     */
    public static int fib(int n) {
        int prev2 = 0; // F(0)
        int prev1 = 1; // F(1)
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return n == 0 ? prev2 : prev1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(fib(n));
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
`,r='\n# Fibonacci Number — LeetCode 509\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Bottom-up DP · Iterative recurrence |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta |\n\n## Problem Statement\n\nThe Fibonacci numbers are defined by:\n\n- `F(0) = 0`\n- `F(1) = 1`\n- `F(n) = F(n-1) + F(n-2)` for `n > 1`\n\nGiven `n`, return `F(n)`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the index of the Fibonacci number (0 ≤ n ≤ 30)\n\n## Sample Input\n\n```\n6\n```\n\n## Expected Output\n\n```\n8\n```\n\n`F(6) = F(5) + F(4) = 5 + 3 = 8`. The first values are `0, 1, 1, 2, 3, 5, 8, 13, …`.\n\n## Approach\n\nThis is the recurrence that dynamic programming was invented for. Three ways to compute it:\n\n1. **Naive recursion** — `O(2ⁿ)` calls, exponential.\n2. **Top-down memoisation** — a hash map caches `F(k)` after the first computation, `O(n)` time, `O(n)` space.\n3. **Bottom-up tabulation** — fill a table of size `n+1`, `O(n)` time and space.\n\nBut look at the recurrence again: `F(n)` only ever needs `F(n-1)` and `F(n-2)`. Once you have computed `F(i)` the older values are dead. So two variables are enough — `O(n)` time, `O(1)` space. This "rolling window" trick is the most common space optimisation in DP interviews, and it applies to any recurrence that only looks back a fixed number of steps.\n\n## Dry Run\n\nInput: `n = 6`. Two variables hold the window `F(i-2), F(i-1)`.\n\n| iteration `i` | `prev2` = `F(i-2)` | `prev1` = `F(i-1)` | `current` = `F(i)` | state after the shift |\n|---:|---:|---:|---:|---|\n| init | `0` = F(0) | `1` = F(1) | — | `prev2 = 0`, `prev1 = 1` |\n| 2 | 0 | 1 | **1** = 1 + 0 | `prev2 = 1`, `prev1 = 1` |\n| 3 | 1 | 1 | **2** = 1 + 1 | `prev2 = 1`, `prev1 = 2` |\n| 4 | 1 | 2 | **3** = 2 + 1 | `prev2 = 2`, `prev1 = 3` |\n| 5 | 2 | 3 | **5** = 3 + 2 | `prev2 = 3`, `prev1 = 5` |\n| 6 | 3 | 5 | **8** = 5 + 3 | `prev2 = 5`, `prev1 = 8` |\n\nThe loop ends with `prev1 = 8 = F(6)` → answer **8**.\n\n**Table version for comparison.** A bottom-up table would hold `F = [0, 1, 1, 2, 3, 5, 8]` — same numbers, but it allocates `n + 1` integers to store two of them.\n\n## Java Solution\n\nSee [`FibonacciNumber.java`](./FibonacciNumber.java).\n\n```java\n    public static int fib(int n) {\n        int prev2 = 0; // F(0)\n        int prev1 = 1; // F(1)\n        for (int i = 2; i <= n; i++) {\n            int current = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = current;\n        }\n        return n == 0 ? prev2 : prev1;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | one addition per index, `n` iterations |\n| **Space** | O(1) | only two integers are alive at any moment |\n\n**Memoised recursion** is `O(n)` time and `O(n)` space (the recursion stack), and is often the follow-up the interviewer wants to see. `O(log n)` is possible with matrix exponentiation or fast doubling, but that is rarely worth the complexity in an interview.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Show me the recursive version."* → the naive `fib(n-1) + fib(n-2)` recursion, then add memoisation.\n- "Can it be `O(1)` space?"* → yes, the two-variable version above.\n- "What about `O(log n)`?"* → fast doubling `F(2k) = F(k) * (2*F(k+1) - F(k))`, or matrix exponentiation.\n- "How is this used in practice?"* → Fibonacci numbers pop up in counting binary strings without consecutive ones, tiling problems, and as a worst-case benchmark for recursive algorithms.\n\n**Common mistakes:**\n\n- ❌ Starting the loop at `i = 1` and computing `F(i) = F(i-1) + F(i-2)` — that reads `F(-1)`.\n- ❌ Returning `prev1` unconditionally — for `n == 0` the answer is `0`, not `1`.\n- ❌ Using `long` where the result overflows silently — `F(92)` no longer fits in an `int`.\n\n**How to narrate:**\n\n> "The naive recursion recomputes the same values exponentially often. The recurrence only looks back two steps, so instead of memoising with a map I can keep a rolling window of two variables and shift them forward — that is `O(n)` time and `O(1)` space. If you want the recursion, memoising it gives the same `O(n)` bound with `O(n)` space."\n\n## Related Problems\n\n- [Climbing Stairs — LeetCode 70](./ClimbingStairs.java) — the same recurrence, shifted\n- [Unique Paths — LeetCode 62](./UniquePaths.java) — binomial coefficients\n',i=[`fib`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};