var e=`bitmanipulation.SingleNumberIII`,t=`package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Single Number III
 * LeetCode: 260 | Difficulty: Medium | Frequency: 4/5
 * Pattern: XOR, Bit partitioning
 *
 * <p>Problem:
 * Given an integer array {@code nums} in which **exactly two** elements appear once and every
 * other element appears twice, return the two single elements in ascending order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 1 2 1 3 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 5
 * </pre>
 *
 * <p>Approach: XOR everything — the result is {@code a ^ b}, the two singles combined. Its
 * lowest set bit is a bit where {@code a} and {@code b} differ. Partition the array by that
 * bit: each half then contains exactly one single element, and XORing each half gives one of
 * them.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class SingleNumberIII {

    /**
     * Returns the two elements that appear exactly once, in ascending order.
     *
     * @param nums an array where exactly two elements appear once
     * @return {@code {a, b}} with {@code a <= b}
     */
    public static int[] singleNumberIII(int[] nums) {
        int xorAll = 0;
        for (int num : nums) {
            xorAll ^= num;
        }
        // The lowest set bit of xorAll is a bit where the two singles differ.
        int differingBit = xorAll & (-xorAll);

        int a = 0;
        int b = 0;
        for (int num : nums) {
            if ((num & differingBit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return new int[]{Math.min(a, b), Math.max(a, b)};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = singleNumberIII(nums);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Single Number III
 * LeetCode: 260 | Difficulty: Medium | Frequency: 4/5
 * Pattern: XOR, Bit partitioning
 *
 * <p>Problem:
 * Given an integer array {@code nums} in which **exactly two** elements appear once and every
 * other element appears twice, return the two single elements in ascending order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 1 2 1 3 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 5
 * </pre>
 *
 * <p>Approach: XOR everything — the result is {@code a ^ b}, the two singles combined. Its
 * lowest set bit is a bit where {@code a} and {@code b} differ. Partition the array by that
 * bit: each half then contains exactly one single element, and XORing each half gives one of
 * them.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the two elements that appear exactly once, in ascending order.
     *
     * @param nums an array where exactly two elements appear once
     * @return {@code {a, b}} with {@code a <= b}
     */
    public static int[] singleNumberIII(int[] nums) {
        int xorAll = 0;
        for (int num : nums) {
            xorAll ^= num;
        }
        // The lowest set bit of xorAll is a bit where the two singles differ.
        int differingBit = xorAll & (-xorAll);

        int a = 0;
        int b = 0;
        for (int num : nums) {
            if ((num & differingBit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return new int[]{Math.min(a, b), Math.max(a, b)};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = singleNumberIII(nums);
        System.out.println(answer[0] + " " + answer[1]);
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
# Single Number III — LeetCode 260

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | XOR · Bit partitioning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given an integer array \`nums\` in which **exactly two** elements appear **once** and every
other element appears **twice**, return those two elements **in ascending order**.

- \`[1, 2, 1, 3, 2, 5]\` → the answer is \`[3, 5]\`.
- You must solve it in O(n) time and O(1) extra space.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (2 ≤ n ≤ 3·10⁴)
- \`nums\` — n space-separated integers; exactly two of them appear once

## Sample Input

\`\`\`
6
1 2 1 3 2 5
\`\`\`

## Expected Output

\`\`\`
3 5
\`\`\`

## Approach — XOR, then split by a differing bit

**Step 1.** XOR everything. All the pairs cancel, so what is left is \`a ^ b\` — the two
unpaired values XORed together.

**Step 2.** Find a bit where \`a\` and \`b\` differ. Since \`a ^ b != 0\`, at least one of its
bits is set. The lowest set bit of \`a ^ b\` is exactly such a bit:

\`\`\`java
int differingBit = xorAll & (-xorAll);
\`\`\`

**Step 3.** Partition the array by that bit. Because \`a\` and \`b\` differ in it, **one of
them lands in each partition**, and every duplicated value lands entirely in one
partition (a value XORed with itself has the same bits). So each partition contains exactly
one unpaired value among its duplicates.

**Step 4.** XOR each partition → the unpaired value in each.

**Why \`& (-xorAll)\` finds the lowest set bit.** In two's complement, \`-x\` is \`~x + 1\`, which
flips all the bits above the lowest set bit of \`x\` and leaves that bit set. AND-ing \`x\`
with \`-x\` therefore isolates exactly that bit.

## Dry Run

Input: \`nums = [1, 2, 1, 3, 2, 5]\`

**Step 1 — XOR everything**

| i | \`nums[i]\` | running XOR (binary) | decimal |
|---:|---:|---|---:|
| — | start | \`000000\` | 0 |
| 0 | 1 | \`000001\` | 1 |
| 1 | 2 | \`000011\` | 3 |
| 2 | 1 | \`000010\` | 2 |
| 3 | 3 | \`000001\` | 1 |
| 4 | 2 | \`000011\` | 3 |
| 5 | 5 | \`000110\` | **6** |

\`xorAll = 6 = 110₂\` — that is \`3 ^ 5\`.

**Step 2 — find a differing bit**

| expression | value | binary |
|---|---:|---|
| \`xorAll\` | 6 | \`110\` |
| \`-xorAll\` | -6 | \`...11111010\` |
| \`xorAll & (-xorAll)\` | **2** | \`010\` |

Bit 1 (value \`2\`) is set in \`3 = 011\` but not in \`5 = 101\`.

**Step 3 — partition by bit 1**

| \`nums[i]\` | binary | bit 1 | partition | running XOR |
|---:|---|---:|---|---:|
| 1 | \`001\` | 0 | low | 1 |
| 2 | \`010\` | 1 | high | 2 |
| 1 | \`001\` | 0 | low | 0 |
| 3 | \`011\` | 1 | high | 3 |
| 2 | \`010\` | 1 | high | 1 |
| 5 | \`101\` | 0 | low | 5 |

The **high** partition (\`2, 3, 2\`) XORs to \`3\`; the **low** partition (\`1, 1, 5\`) XORs to
\`5\`.

Result: \`[3, 5]\` → printed as \`3 5\`.

## Java Solution

See [\`SingleNumberIII.java\`](./SingleNumberIII.java).

\`\`\`java
public static int[] singleNumberIII(int[] nums) {
    int xorAll = 0;
    for (int num : nums) {
        xorAll ^= num;
    }
    int differingBit = xorAll & (-xorAll);

    int a = 0;
    int b = 0;
    for (int num : nums) {
        if ((num & differingBit) != 0) {
            a ^= num;
        } else {
            b ^= num;
        }
    }
    return new int[]{Math.min(a, b), Math.max(a, b)};
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes |
| **Space** | O(1) | A handful of accumulators |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if three elements appear once?"* → you need two differing bits; split the array
  into four groups by those two bits and XOR each group.
- *"What if you could not use XOR?"* → a frequency map gives the answer in O(n) space.
- *"Why does the duplicated value never get split across the partitions?"* → a value and
  its copy have identical bits, so they always fall into the same partition. This is the
  key property that makes the partition work.
- *"Can you avoid the \`& (-x)\` trick?"* → yes, any set bit of \`a ^ b\` works; you can find
  one with a loop, or use \`Integer.lowestOneBit(xorAll)\`.

**Common mistakes:**
- ❌ Returning the two values in the order the partitions happened to produce → the problem
  wants ascending order.
- ❌ Using the *highest* set bit and forgetting that it might also work — it does, but the
  lowest one is the idiomatic choice.
- ❌ Forgetting that \`xorAll\` could be \`0\` → that would mean the two singles are equal,
  which the problem excludes.
- ❌ Partitioning with \`>=\` instead of a bit test → wrong groups.

**How to narrate:**
> "XOR everything and the pairs cancel, leaving \`a ^ b\`. The lowest set bit of that value is
> a bit where \`a\` and \`b\` differ. I split the array by that bit — duplicates always land in
> the same group because a value and its copy have identical bits — so each group contains
> exactly one of the singles. XORing each group gives me the two numbers."

## Related Problems

- [Single Number](./SingleNumber.java) — one unpaired value
- [XOR of All Elements](./XOROfArrayElements.java) — the same fold without the pairing guarantee
- [CountSetBits](./CountSetBits.java) — counting the set bits of a value
`,i=[`singleNumberIII`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};