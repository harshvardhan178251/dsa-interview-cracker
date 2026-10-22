var e=`bitmanipulation.CountSetBits`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Number of 1 Bits
 * LeetCode: 191 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, Kernighan's algorithm
 *
 * <p>Problem:
 * Given an unsigned integer {@code n}, return the number of set bits (the number of {@code 1}
 * bits in its binary representation).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Brian Kernighan's trick. The expression {@code n & (n - 1)} clears the lowest
 * set bit of {@code n}. Repeating it until {@code n} becomes zero counts the set bits — and
 * it runs once per set bit, not once per bit position.
 *
 * <p>Complexity: Time O(number of set bits), Space O(1).
 */
public class CountSetBits {

    /**
     * Returns the number of set bits in {@code n}.
     *
     * @param n the value to inspect
     * @return the population count
     */
    public static int countSetBits(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // clear the lowest set bit
            count++;
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countSetBits(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Number of 1 Bits
 * LeetCode: 191 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, Kernighan's algorithm
 *
 * <p>Problem:
 * Given an unsigned integer {@code n}, return the number of set bits (the number of {@code 1}
 * bits in its binary representation).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Brian Kernighan's trick. The expression {@code n & (n - 1)} clears the lowest
 * set bit of {@code n}. Repeating it until {@code n} becomes zero counts the set bits — and
 * it runs once per set bit, not once per bit position.
 *
 * <p>Complexity: Time O(number of set bits), Space O(1).
 */
public class Main {

    /**
     * Returns the number of set bits in {@code n}.
     *
     * @param n the value to inspect
     * @return the population count
     */
    public static int countSetBits(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // clear the lowest set bit
            count++;
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countSetBits(n));
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
`,r=`
# Number of 1 Bits — LeetCode 191

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bit tricks · Kernighan's algorithm |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given a non-negative integer \`n\`, return the number of \`1\` bits in its binary
representation — its **population count**.

- \`11\` → \`1011\` → \`3\`.
- \`128\` → \`10000000\` → \`1\`.
- \`4294967293\` → \`11111111111111111111111111111101\` → \`31\`.

## Input Format

The program reads from standard input:

\`\`\`
n
\`\`\`

- \`n\` — a non-negative integer (0 ≤ n ≤ 2³¹ − 1)

## Sample Input

\`\`\`
11
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

\`11 = 1011₂\` has three set bits.

## Approach — Brian Kernighan's trick

The expression

\`\`\`java
n &= (n - 1);
\`\`\`

clears the **lowest set bit** of \`n\`. Subtracting \`1\` turns the lowest \`1\` into a \`0\` and
turns all the zeros below it into \`1\`s; AND-ing with the original keeps only the bits
that were \`1\` in both — which is exactly everything except the lowest set bit.

So the loop body runs **once per set bit**, not once per bit position. The loop is
equivalent to:

\`\`\`java
while (n != 0) {
    n = n & (n - 1);   // remove the lowest 1 bit
    count++;
}
\`\`\`

**Why this beats the naive loop.** The naive \`while (n > 0) { count += n & 1; n >>= 1; }\`
always performs 32 iterations. Kernighan's version performs exactly \`popcount(n)\`
iterations — which is why it is the answer when \`n\` is large and has few set bits.

## Dry Run

Input: \`n = 11 = 1011₂\`

| Step | \`n\` before (binary) | \`n - 1\` (binary) | \`n & (n - 1)\` | \`count\` after |
|---:|---|---|---|---:|
| 1 | \`1011\` | \`1010\` | \`1010\` | 1 |
| 2 | \`1010\` | \`1001\` | \`1000\` | 2 |
| 3 | \`1000\` | \`0111\` | \`0000\` | **3** |

\`n\` is now zero → the loop stops. Answer: **3**.

### The same trace as a bit table

| step | bit 3 | bit 2 | bit 1 | bit 0 | lowest set bit removed |
|---:|---:|---:|---:|---:|---|
| start | 1 | 0 | 1 | 1 | — |
| 1 | 1 | 0 | 1 | 0 | bit 0 |
| 2 | 1 | 0 | 0 | 0 | bit 1 |
| 3 | 0 | 0 | 0 | 0 | bit 3 |

Three bits cleared, three iterations.

## Java Solution

See [\`CountSetBits.java\`](./CountSetBits.java).

\`\`\`java
public static int countSetBits(int n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1); // clear the lowest set bit
        count++;
    }
    return count;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(k) where k = number of set bits | One iteration per set bit (≤ 32) |
| **Space** | O(1) | A single counter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the input is a 64-bit value?"* → use \`long\` and \`n >>>= 1\`; the trick is
  unchanged.
- *"Is there a hardware instruction for this?"* → yes, \`POPCNT\` / \`POPCNT\` on modern CPUs;
  Java has \`Integer.bitCount(n)\`, which the JIT compiles to it when the target CPU supports
  it. Mention that the interview wants the manual implementation.
- *"How would you count the bits of a huge bit vector fast?"* → process 64 bits at a time
  with a lookup table of 2⁸ byte values.
- *"What about counting the bits of a *negative* number?"* → in two's complement the sign
  bit participates; use \`Integer.bitCount\` and be explicit about the width.

**Common mistakes:**
- ❌ Writing \`n &= (n - 1)\` but counting iterations of the *outer* loop → same thing here,
  but in a nested loop it is wrong.
- ❌ Using \`n >> 1\` instead of \`n >>> 1\` when shifting a negative number → the sign bit
  keeps the number negative and the loop never ends.
- ❌ Forgetting that \`0\` has zero set bits → the \`while (n != 0)\` guard handles it.
- ❌ Assuming the answer is \`Integer.bitCount\` → in an interview, implement it.

**How to narrate:**
> "The trick is \`n & (n - 1)\`, which clears the lowest set bit. Subtracting one flips that
> bit to zero and fills the zeros below it with ones, so the AND with the original keeps
> everything except that bit. I loop until \`n\` is zero, which takes exactly one iteration
> per set bit — so it's faster than scanning all 32 positions."

## Related Problems

- [Hamming Distance](./HammingDistance.java) — XOR then count
- [Counting Bits](./NumberOfSetBits.java) — the count for every value up to n
- [Power of Two](./PowerOfTwo.java) — a related one-bit trick
`,i=[`countSetBits`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};