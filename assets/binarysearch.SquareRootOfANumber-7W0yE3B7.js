var e=`binarysearch.SquareRootOfANumber`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sqrt(x)
 * LeetCode: 69 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * Given a non-negative integer {@code x}, return the largest integer {@code r} such that
 * {@code r * r <= x} — i.e. the integer square root of {@code x} rounded down.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the square root is the answer to a monotone question — "is {@code mid} squared
 * still within {@code x}?". Binary search over the candidate range {@code [1, x/2]} and keep
 * the largest candidate whose square does not exceed {@code x}. Squaring is done in
 * {@code long} arithmetic so that large inputs cannot overflow.
 *
 * <p>Complexity: Time O(log x), Space O(1).
 */
public class SquareRootOfANumber {

    /**
     * Returns {@code floor(sqrt(x))} without using {@code Math.sqrt}.
     *
     * @param x the non-negative radicand
     * @return the integer square root, rounded down
     */
    public static int mySqrt(int x) {
        if (x < 2) {
            return x;
        }
        int left = 1;
        int right = x / 2;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            long square = (long) mid * mid;
            if (square == x) {
                return mid;
            } else if (square < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        // The loop exits with right = the largest value whose square is <= x.
        return right;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int x = fs.nextInt();

        System.out.println(mySqrt(x));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Sqrt(x)
 * LeetCode: 69 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * Given a non-negative integer {@code x}, return the largest integer {@code r} such that
 * {@code r * r <= x} — i.e. the integer square root of {@code x} rounded down.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the square root is the answer to a monotone question — "is {@code mid} squared
 * still within {@code x}?". Binary search over the candidate range {@code [1, x/2]} and keep
 * the largest candidate whose square does not exceed {@code x}. Squaring is done in
 * {@code long} arithmetic so that large inputs cannot overflow.
 *
 * <p>Complexity: Time O(log x), Space O(1).
 */
public class Main {

    /**
     * Returns {@code floor(sqrt(x))} without using {@code Math.sqrt}.
     *
     * @param x the non-negative radicand
     * @return the integer square root, rounded down
     */
    public static int mySqrt(int x) {
        if (x < 2) {
            return x;
        }
        int left = 1;
        int right = x / 2;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            long square = (long) mid * mid;
            if (square == x) {
                return mid;
            } else if (square < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        // The loop exits with right = the largest value whose square is <= x.
        return right;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int x = fs.nextInt();

        System.out.println(mySqrt(x));
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
`,r='\n# Sqrt(x) — LeetCode 69\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Binary search on the answer |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Facebook, Uber |\n\n## Problem Statement\n\nGiven a non-negative integer `x`, return the **integer square root** of `x`: the largest\ninteger `r` such that `r * r <= x`.\n\n- `x` is guaranteed to be in the range `[0, 2³¹ - 1]`.\n- The result is rounded **down** — `sqrt(8) = 2.828…` becomes `2`.\n- Do not use `Math.sqrt`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nx\n```\n\n- `x` — the non-negative radicand (0 ≤ x ≤ 2³¹ − 1)\n\n## Sample Input\n\n```\n8\n```\n\n## Expected Output\n\n```\n2\n```\n\n`2 * 2 = 4 <= 8` but `3 * 3 = 9 > 8`, so the answer is `2`.\n\n## Approach — Binary search on the answer\n\nInstead of searching for a *given* value, search for the **boundary** where the predicate\nflips:\n\n> `P(r) = (r * r <= x)` — monotone: true for small `r`, false for large `r`.\n\nThe last `r` where `P(r)` holds is exactly `floor(sqrt(x))`.\n\nThe search range is `[1, x / 2]` — the square root of `x` never exceeds `x / 2` for\n`x >= 4` (and `x < 2` is handled separately). Each step compares `mid * mid` with `x` and\nnarrows the range.\n\n**Overflow.** `mid * mid` overflows `int` for `mid > 46340`. The multiplication is therefore\nperformed in `long`: `(long) mid * mid`. Since `mid <= x / 2 <= 2³⁰` the square still fits in\na `long` (max ≈ 2⁶⁰).\n\n**Returning the answer.** When the loop ends, `right` holds the largest candidate whose\nsquare is `<= x` — that value *is* the floor of the square root, so we return `right`\nwithout any extra adjustment.\n\n## Dry Run\n\nInput: `x = 8`\n\n| Step | left | right | mid | `mid * mid` | comparison with 8 | range after |\n|---:|---:|---:|---:|---:|---|---|\n| 1 | 1 | 4 | 2 | 4 | 4 < 8 | `[3, 4]` |\n| 2 | 3 | 4 | 3 | 9 | 9 > 8 | `[3, 2]` |\n\nThe loop exits with `left > right`; `right = 2` is the largest value with `r² <= 8` → **2**.\n\n### Trace with a perfect square — `x = 16`\n\n| Step | left | right | mid | `mid * mid` | comparison | range after |\n|---:|---:|---:|---:|---:|---|---|\n| 1 | 1 | 8 | 4 | 16 | 16 == 16 | `[1, 8]` |\n\nExact hit → return **4** immediately.\n\n## Java Solution\n\nSee [`SquareRootOfANumber.java`](./SquareRootOfANumber.java).\n\n```java\npublic static int mySqrt(int x) {\n    if (x < 2) {\n        return x;\n    }\n    int left = 1;\n    int right = x / 2;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        long square = (long) mid * mid;\n        if (square == x) {\n            return mid;\n        } else if (square < x) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return right;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(log x) | The candidate range halves every iteration |\n| **Space** | O(1) | Only three index variables |\n\n**Optimal?** Yes for an exact answer without floating point. (Newton\'s method converges in\nO(log log x) but is fiddlier and has rounding edge cases.)\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if `x` were a `long`?"* → the search range becomes `[1, x/2]`, which is still 63\n  iterations at most, and `mid * mid` can still overflow a `long` for `x > 3·10⁹` — use\n  `Math.multiplyExact` / `BigInteger` or switch to a division-based comparison\n  (`mid <= x / mid`).\n- *"Return the exact square root as a double."* → `Math.sqrt(x)` and round carefully at the\n  boundaries.\n- *"What about `floor(sqrt(x))` for a stream of values?"* → precompute the integer square\n  roots of all values up to `n` in O(n) with a running counter, then answer each query in\n  O(1).\n- *"Why not just call `Math.sqrt`?"* → because of floating point rounding; the interview is\n  about the algorithm, but also because `Math.sqrt` is not exact for large `long` values.\n\n**Common mistakes:**\n- ❌ Computing `mid * mid` in `int` → overflow for `x > 2³¹/2`, silently returning a wrong\n  answer.\n- ❌ Starting the search at `left = 0` and treating `mid == 0` specially → an extra branch\n  that invites off-by-one bugs; starting at `1` and special-casing `x < 2` is cleaner.\n- ❌ Returning `left` instead of `right` after the loop → off by one whenever the answer is\n  not a perfect square.\n\n**How to narrate:**\n> "I\'m looking for the boundary where `r² <= x` stops holding. That predicate is monotone, so\n> I binary search over the candidate root. I\'ll widen the multiplication to `long` so that\n> squaring a large candidate can\'t overflow, and when the range collapses the right bound is\n> the floor of the square root."\n\n## Related Problems\n\n- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on a monotone answer\n- [Search Insert Position](./SearchInsertPosition.java) — binary search on a sorted array\n- [Divide Two Integers](../bitmanipulation/DivideTwoIntegers.java) — a different route to the same idea\n',i=[`mySqrt`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};