var e=`arrays.MissingNumber`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Missing Number
 * LeetCode: 268 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Arithmetic, XOR trick
 *
 * <p>Problem:
 * Given an array {@code nums} containing {@code n} distinct integers taken from the range
 * {@code 0 .. n} (inclusive), return the single number that is missing from it.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 1 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the complete range {@code 0 .. n} sums to {@code n(n+1)/2}. Subtracting
 * the sum of the given array leaves exactly the missing number. The XOR variant (XOR all
 * values with all indices) avoids overflow and works for any n.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MissingNumber {

    /**
     * Returns the missing number of the range {@code 0 .. nums.length}.
     *
     * @param nums the array that misses exactly one value
     * @return the missing number
     */
    public static int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int value : nums) {
            actual += value;
        }
        return expected - actual;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(missingNumber(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Missing Number
 * LeetCode: 268 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Arithmetic, XOR trick
 *
 * <p>Problem:
 * Given an array {@code nums} containing {@code n} distinct integers taken from the range
 * {@code 0 .. n} (inclusive), return the single number that is missing from it.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 1 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the complete range {@code 0 .. n} sums to {@code n(n+1)/2}. Subtracting
 * the sum of the given array leaves exactly the missing number. The XOR variant (XOR all
 * values with all indices) avoids overflow and works for any n.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the missing number of the range {@code 0 .. nums.length}.
     *
     * @param nums the array that misses exactly one value
     * @return the missing number
     */
    public static int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int value : nums) {
            actual += value;
        }
        return expected - actual;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(missingNumber(nums));
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
# Missing Number — LeetCode 268

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Arithmetic · XOR trick |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Given an array \`nums\` containing \`n\` **distinct** integers taken from the range
\`0 .. n\` (inclusive), return the single number that is missing from it.

Exactly one value of the range is absent, and every other value appears exactly once.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n distinct integers from \`0 .. n-1\`

## Sample Input

\`\`\`
3
0 1 3
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

\`2\` is the only value of \`0..2\` that is not present.

## Approach — Subtract from the Expected Sum

The full range \`0 .. n\` has the well-known sum

\`\`\`
0 + 1 + ... + n = n(n+1) / 2
\`\`\`

The array contains every one of those values **except one**, so

\`\`\`
missing = n(n+1)/2 − sum(nums)
\`\`\`

**The XOR variant** is the one interviewers like. XOR all the values of the array
together with all the indices \`0 .. n\`:

\`\`\`
missing = (0 ^ 1 ^ ... ^ n) ^ (nums[0] ^ nums[1] ^ ... ^ nums[n-1])
\`\`\`

Every value that appears in both halves cancels out (\`x ^ x == 0\`), leaving only the
missing number. XOR also avoids the overflow that \`n(n+1)/2\` can cause for very large
\`n\`.

## Dry Run

Input: \`nums = [0, 1, 3]\`, \`n = 3\`

Expected sum of the range \`0 .. 3\`: \`n(n+1)/2 = 3 * 4 / 2 = 6\`

| Step | i | \`nums[i]\` | \`actual\` before | \`actual\` after | \`expected\` | \`expected - actual\` |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0 | 0 | 0 | 0 | 6 | 6 |
| 2 | 1 | 1 | 0 | 1 | 6 | 5 |
| 3 | 2 | 3 | 1 | 4 | 6 | 2 |

Final answer: \`expected (6) − actual (4) = 2\` ✓ — the only value of \`0..3\` that is not
in \`[0, 1, 3]\`.

## Java Solution

See [\`MissingNumber.java\`](./MissingNumber.java).

\`\`\`java
public static int missingNumber(int[] nums) {
    int n = nums.length;
    int expected = n * (n + 1) / 2;
    int actual = 0;
    for (int value : nums) {
        actual += value;
    }
    return expected - actual;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the array |
| **Space** | O(1) | Two accumulators |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array can contain duplicates?"* → the sum trick breaks; you need a
  frequency array or a set, and the answer is the value in the range that is under-used.
- *"What if the range is \`1..n\` instead of \`0..n-1\`?"* → the formula becomes
  \`n(n+1)/2 - sum\`, and the XOR variant XORs the indices \`1..n\` instead of \`0..n-1\`.
- *"Why XOR and not subtraction?"* → XOR cannot overflow, and it is the classic
  "every value appears twice except one" trick, which generalises to other frequencies.
- *"Can you do it in one pass without a second loop over the range?"* → yes, that is
  what the code does — the range sum is a closed form, so only the array is scanned.
- *"What if the array is huge and streamed?"* → same, it is a single O(1)-memory pass.

**Common mistakes:**
- ❌ Using \`n(n-1)/2\` when the range is \`0..n\` — off by one. The formula must match the
  range the values come from.
- ❌ Initialising \`expected\` with \`n\` and then adding \`0..n-1\` — that double counts.
- ❌ Forgetting the special case \`n = 1\` (the range is \`0..1\`, so the answer is \`0\` or
  \`1\`) — the formula still works, but hand-written XOR loops often forget \`0\`.

**How to narrate:**
> "The complete range sums to a closed form, so I can subtract the array's sum from the
> expected sum and the difference is the missing number. If I wanted to avoid overflow
> I'd use the XOR variant: XOR the array with all the indices, and every value that
> appears in both cancels out, leaving the missing one."

## Related Problems

- [Two Sum](TwoSum.md) — complements and hash maps
- [Find Minimum and Maximum Element](FindMinimumAndMaximumElement.md) — the single-pass scan
- [Rotate Array](RotateArray.md) — another "one value is out of place" family
`,i=[`missingNumber`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};