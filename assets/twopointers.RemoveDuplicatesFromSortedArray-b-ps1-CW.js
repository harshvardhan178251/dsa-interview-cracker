var e=`twopointers.RemoveDuplicatesFromSortedArray`,t=`package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Remove Duplicates from Sorted Array
 * LeetCode: 26 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Given a sorted array {@code nums}, remove the duplicates <b>in place</b> so that the
 * first {@code k} elements contain the distinct values in sorted order. Return {@code k}.
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
 * 0 0 1 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 0 1 2
 * </pre>
 * The first line is the number of distinct values, the second line holds them.
 *
 * <p>Approach: two pointers over the same array - {@code read} scans every element,
 * {@code write} marks where the next distinct value goes. A value is copied only when it
 * differs from the last one written.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class RemoveDuplicatesFromSortedArray {

    /**
     * Removes the duplicates in place.
     *
     * @param nums a sorted array
     * @return the number of distinct values, stored in {@code nums[0 .. k-1]}
     */
    public static int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int write = 1;
        for (int read = 1; read < nums.length; read++) {
            if (nums[read] != nums[write - 1]) {
                nums[write++] = nums[read];
            }
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int k = removeDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(k);
        System.out.println(sb);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Remove Duplicates from Sorted Array
 * LeetCode: 26 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Given a sorted array {@code nums}, remove the duplicates <b>in place</b> so that the
 * first {@code k} elements contain the distinct values in sorted order. Return {@code k}.
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
 * 0 0 1 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 0 1 2
 * </pre>
 * The first line is the number of distinct values, the second line holds them.
 *
 * <p>Approach: two pointers over the same array - {@code read} scans every element,
 * {@code write} marks where the next distinct value goes. A value is copied only when it
 * differs from the last one written.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Removes the duplicates in place.
     *
     * @param nums a sorted array
     * @return the number of distinct values, stored in {@code nums[0 .. k-1]}
     */
    public static int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int write = 1;
        for (int read = 1; read < nums.length; read++) {
            if (nums[read] != nums[write - 1]) {
                nums[write++] = nums[read];
            }
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int k = removeDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(k);
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
# Remove Duplicates from Sorted Array — LeetCode 26

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · In-place compaction |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a **sorted** array \`nums\`, remove the duplicates **in place** so that the first
\`k\` elements contain the distinct values in sorted order. Return \`k\`.

- The array is sorted in ascending order.
- The elements **after** \`k\` do not matter.
- The solution must use **O(1)** extra space.

For \`[0, 0, 1, 1, 1, 2]\` the result is \`[0, 1, 2, …]\` and \`k = 3\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 3 × 10⁴)
- \`nums\` — n space-separated integers in **ascending** order

The program prints the number of distinct values on the first line and the values
themselves on the second line.

## Sample Input

\`\`\`
6
0 0 1 1 1 2
\`\`\`

## Expected Output

\`\`\`
3
0 1 2
\`\`\`

## Approach — Two pointers over one array

Because the array is sorted, equal values are **adjacent**. That is the whole trick: a
value is new exactly when it differs from the last value that was written.

Two pointers:

- **\`read\`** scans every element of the array;
- **\`write\`** marks the position where the next distinct value belongs.

\`\`\`
write = 1                       // nums[0] is always kept
for read = 1 .. n-1:
    if nums[read] != nums[write - 1]:
        nums[write] = nums[read]
        write++
return write
\`\`\`

The comparison is always against \`nums[write - 1]\` — the **last written** value — and not
against \`nums[read - 1]\`, because the array is being overwritten while it is read.

## Dry Run

Input: \`nums = [0, 0, 1, 1, 1, 2]\`

| Step | read | value | last written | action | array | write |
|---:|---:|---:|---:|---|---|---:|
| 0 | — | — | — | keep \`nums[0] = 0\` | \`[0, 0, 1, 1, 1, 2]\` | 1 |
| 1 | 1 | 0 | 0 | equal → **skip** | \`[0, 0, 1, 1, 1, 2]\` | 1 |
| 2 | 2 | 1 | 0 | different → copy to index 1 | \`[0, 1, 1, 1, 1, 2]\` | 2 |
| 3 | 3 | 1 | 1 | equal → **skip** | \`[0, 1, 1, 1, 1, 2]\` | 2 |
| 4 | 4 | 1 | 1 | equal → **skip** | \`[0, 1, 1, 1, 1, 2]\` | 2 |
| 5 | 5 | 2 | 1 | different → copy to index 2 | \`[0, 1, 2, 1, 1, 2]\` | 3 |

\`k = 3\` and \`nums[0..2] = [0, 1, 2]\` ✓

## Java Solution

See [\`RemoveDuplicatesFromSortedArray.java\`](./RemoveDuplicatesFromSortedArray.java).

\`\`\`java
int write = 1;
for (int read = 1; read < nums.length; read++) {
    if (nums[read] != nums[write - 1]) {
        nums[write++] = nums[read];
    }
}
return write;
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass over the array |
| **Space** | O(1) | the result is written into the input array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not sorted?"* → use a hash set: O(n) time but O(n) space.
- *"What if at most two copies may stay?"* → that is
  [Remove Duplicates from Sorted Array II](RemoveDuplicatesFromSortedArrayII.md).
- *"What if you cannot modify the input?"* → copy the distinct values into a new array.
- *"Can you do it with a single pointer?"* → yes, by remembering the last kept value in
  a local variable instead of reading \`nums[write - 1]\`.

**Common mistakes:**
- ❌ Comparing with \`nums[read - 1]\` instead of \`nums[write - 1]\` → after a copy the
  neighbours are not the same any more, so duplicates slip through.
- ❌ Starting \`write\` at \`0\` → the first element would be compared with itself and
  skipped.
- ❌ Forgetting the array is **sorted** → the "adjacent duplicates" assumption breaks.

**How to narrate:**
> "The array is sorted, so duplicates are adjacent. I use two pointers on the same array:
> \`read\` scans everything, \`write\` marks where the next distinct value goes. A value is
> copied only when it differs from the last value I wrote. One pass, O(1) extra space."

## Related Problems

- [Remove Duplicates from Sorted Array II](RemoveDuplicatesFromSortedArrayII.md) — at most two copies
- [Move Zeroes](MoveZeroes.md) — the same compaction, a different value
- [Valid Palindrome](ValidPalindrome.md) — two pointers over a string
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — two pointers, a different goal
`,i=[`removeDuplicates`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};