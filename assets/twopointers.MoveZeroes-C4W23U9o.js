var e=`twopointers.MoveZeroes`,t=`package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Move Zeroes
 * LeetCode: 283 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Move all the {@code 0}s of an array to the <b>end</b> of it, keeping the relative
 * order of the non-zero elements. The operation must be done in place.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 0 1 0 3 12
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 12 0 0
 * </pre>
 *
 * <p>Approach: two pointers over the same array. {@code read} scans every element and
 * {@code write} marks the next free position for a non-zero value. The zeroes are
 * simply left behind and overwritten by zeros at the end.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MoveZeroes {

    /**
     * Moves the zeroes to the end in place, keeping the order of the other values.
     *
     * @param nums the array that is rearranged
     */
    public static void moveZeroes(int[] nums) {
        if (nums == null) {
            return;
        }

        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                nums[write++] = nums[read];
            }
        }
        while (write < nums.length) {
            nums[write++] = 0;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        moveZeroes(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < nums.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Move Zeroes
 * LeetCode: 283 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Move all the {@code 0}s of an array to the <b>end</b> of it, keeping the relative
 * order of the non-zero elements. The operation must be done in place.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 0 1 0 3 12
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 12 0 0
 * </pre>
 *
 * <p>Approach: two pointers over the same array. {@code read} scans every element and
 * {@code write} marks the next free position for a non-zero value. The zeroes are
 * simply left behind and overwritten by zeros at the end.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Moves the zeroes to the end in place, keeping the order of the other values.
     *
     * @param nums the array that is rearranged
     */
    public static void moveZeroes(int[] nums) {
        if (nums == null) {
            return;
        }

        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                nums[write++] = nums[read];
            }
        }
        while (write < nums.length) {
            nums[write++] = 0;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        moveZeroes(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < nums.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(sb);
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
# Move Zeroes — LeetCode 283

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · In-place compaction |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Adobe |

## Problem Statement

Move all the \`0\`s of an array to the **end** of it, keeping the **relative order** of the
non-zero elements. The operation must be done **in place**.

For \`[0, 1, 0, 3, 12]\` the result is \`[1, 3, 12, 0, 0]\`.

Note that \`[1, 3, 0, 0, 12]\` would also move the zeroes to the end, but it destroys the
order of the non-zero elements — that is not allowed.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers (-2³¹ ≤ nums[i] ≤ 2³¹ − 1)

The program prints the rearranged values separated by single spaces on one line.

## Sample Input

\`\`\`
5
0 1 0 3 12
\`\`\`

## Expected Output

\`\`\`
1 3 12 0 0
\`\`\`

## Approach — Compact the non-zero values, then fill with zeros

The problem is a stable compaction: "keep the values that matter, in order, at the
front". That is the same shape as
[Remove Duplicates from Sorted Array](RemoveDuplicatesFromSortedArray.md),
only the predicate is different — here it is "is not zero" instead of "differs from the
previous value".

\`\`\`
write = 0
for read = 0 .. n-1:
    if nums[read] != 0:
        nums[write++] = nums[read]
while write < n:
    nums[write++] = 0
\`\`\`

The zeroes are simply **left behind** by the first loop — they are overwritten by the
non-zero values that follow them — and the tail of the array is then filled with zeros.

**Why the order is preserved:** the non-zero values are copied in the order they are
read, so they land at the front in exactly their original relative order.

**The naive alternative** — swap every zero with the next non-zero — also works but
performs many more writes. The compaction version touches each element once.

## Dry Run

Input: \`nums = [0, 1, 0, 3, 12]\`

| Step | read | value | action | array | write |
|---:|---:|---:|---|---|---:|
| 0 | — | — | start | \`[0, 1, 0, 3, 12]\` | 0 |
| 1 | 0 | 0 | zero → **skip** | \`[0, 1, 0, 3, 12]\` | 0 |
| 2 | 1 | 1 | non-zero → copy to index 0 | \`[1, 1, 0, 3, 12]\` | 1 |
| 3 | 2 | 0 | zero → **skip** | \`[1, 1, 0, 3, 12]\` | 1 |
| 4 | 3 | 3 | non-zero → copy to index 1 | \`[1, 3, 0, 3, 12]\` | 2 |
| 5 | 4 | 12 | non-zero → copy to index 2 | \`[1, 3, 12, 3, 12]\` | 3 |
| 6 | — | — | fill the tail with zeros | \`[1, 3, 12, 0, 0]\` | 5 |

The result is \`[1, 3, 12, 0, 0]\` and the non-zero values kept their order ✓

## Java Solution

See [\`MoveZeroes.java\`](./MoveZeroes.java).

\`\`\`java
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (nums[read] != 0) {
        nums[write++] = nums[read];
    }
}
while (write < nums.length) {
    nums[write++] = 0;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | two linear passes |
| **Space** | O(1) | the array is rearranged in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in one pass?"* → yes, with a swap-based variant that keeps a pointer
  at the last zero; it writes more but is still O(n).
- *"What if the zeroes had to go to the front?"* → mirror the roles of \`read\` and
  \`write\`.
- *"What if you needed the original positions of the non-zero values?"* → you need a
  hash map or an auxiliary array; in-place compaction loses the positions.
- *"Why not use a hash set?"* → the set would tell you *which* values are zero but not
  *where*; and it costs O(n) space.

**Common mistakes:**
- ❌ Swapping a zero with the **first** non-zero element → the order of the non-zero
  values is destroyed.
- ❌ Forgetting to fill the tail with zeros → the old values stay at the end.
- ❌ Copying the non-zero values but not preserving their order (e.g. by writing them
  from the back) → the stability requirement is broken.

**How to narrate:**
> "This is a stable compaction. I scan the array with a read pointer and copy every
> non-zero value to the next free slot with a write pointer, which keeps the non-zero
> values in their original order. The zeroes are left behind and overwritten, and at the
> end I fill the remaining slots with zeros. O(n) time and O(1) space, done in place."

## Related Problems

- [Remove Duplicates from Sorted Array](RemoveDuplicatesFromSortedArray.md) — the same compaction
- [Remove Duplicates from Sorted Array II](RemoveDuplicatesFromSortedArrayII.md) — at most two copies
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — two pointers, a different goal
- [Rotate Array](../arrays/RotateArray.md) — another in-place rearrangement
`,i=[`moveZeroes`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};