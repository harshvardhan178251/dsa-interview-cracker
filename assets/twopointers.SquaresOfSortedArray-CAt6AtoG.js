var e=`twopointers.SquaresOfSortedArray`,t=`package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Squares of a Sorted Array
 * LeetCode: 977 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Sorted array
 *
 * <p>Problem:
 * Given an integer array {@code nums} sorted in non-decreasing order, return an array of
 * the **squares** of the numbers, also in non-decreasing order.
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
 * -4 -1 0 3 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 9 16 100
 * </pre>
 *
 * <p>Approach: the biggest square always comes from one of the two ends - the most
 * negative number or the largest number. Two pointers walk inwards from both ends and
 * fill the result **from the back**, which keeps the result sorted without sorting it.
 *
 * <p>Complexity: Time O(n), Space O(n) for the result.
 */
public class SquaresOfSortedArray {

    /**
     * Returns the squares of {@code nums} in non-decreasing order.
     *
     * @param nums a sorted input array
     * @return the sorted squares
     */
    public static int[] sortedSquares(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[0];
        }

        int n = nums.length;
        int[] result = new int[n];
        int left = 0;
        int right = n - 1;
        int write = n - 1;

        while (left <= right) {
            int leftSquare = nums[left] * nums[left];
            int rightSquare = nums[right] * nums[right];
            if (leftSquare > rightSquare) {
                result[write--] = leftSquare;
                left++;
            } else {
                result[write--] = rightSquare;
                right--;
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = sortedSquares(nums);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
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
 * Problem: Squares of a Sorted Array
 * LeetCode: 977 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Sorted array
 *
 * <p>Problem:
 * Given an integer array {@code nums} sorted in non-decreasing order, return an array of
 * the **squares** of the numbers, also in non-decreasing order.
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
 * -4 -1 0 3 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 9 16 100
 * </pre>
 *
 * <p>Approach: the biggest square always comes from one of the two ends - the most
 * negative number or the largest number. Two pointers walk inwards from both ends and
 * fill the result **from the back**, which keeps the result sorted without sorting it.
 *
 * <p>Complexity: Time O(n), Space O(n) for the result.
 */
public class Main {

    /**
     * Returns the squares of {@code nums} in non-decreasing order.
     *
     * @param nums a sorted input array
     * @return the sorted squares
     */
    public static int[] sortedSquares(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[0];
        }

        int n = nums.length;
        int[] result = new int[n];
        int left = 0;
        int right = n - 1;
        int write = n - 1;

        while (left <= right) {
            int leftSquare = nums[left] * nums[left];
            int rightSquare = nums[right] * nums[right];
            if (leftSquare > rightSquare) {
                result[write--] = leftSquare;
                left++;
            } else {
                result[write--] = rightSquare;
                right--;
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = sortedSquares(nums);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
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
# Squares of a Sorted Array — LeetCode 977

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · Sorted array |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Facebook |

## Problem Statement

Given an integer array \`nums\` sorted in **non-decreasing** order, return an array of the
**squares** of the numbers, also in non-decreasing order.

For \`nums = [-4, -1, 0, 3, 10]\` the squares are \`[16, 1, 0, 9, 100]\` and the sorted
answer is \`[0, 1, 9, 16, 100]\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers in **ascending** order (-10⁴ ≤ nums[i] ≤ 10⁴)

The program prints the n squares separated by single spaces on one line.

## Sample Input

\`\`\`
5
-4 -1 0 3 10
\`\`\`

## Expected Output

\`\`\`
0 1 9 16 100
\`\`\`

## Approach — Two pointers filling the result from the back

The largest square always comes from one of the two **ends** of the array:

- the **right** end holds the largest number, and
- the **left** end holds the most negative number, whose square is also large.

So two pointers walking inwards from both ends can produce the squares **in sorted
order** — if they are written into the result **from the back**.

Each step compares the two candidate squares, writes the larger one at the current write
position and moves that pointer inwards.

**Why no sorting is needed:** the squares of a sorted array are sorted except that the
negative part is reversed; merging the two monotone halves from the outside in is
exactly what the two pointers do.

## Dry Run

Input: \`nums = [-4, -1, 0, 3, 10]\`

| Step | left | right | left² | right² | write | action | result |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 (-4) | 4 (10) | 16 | 100 | 4 | right² is larger → \`result[4] = 100\`, \`right--\` | \`[_, _, _, _, 100]\` |
| 2 | 0 (-4) | 3 (3) | 16 | 9 | 3 | left² is larger → \`result[3] = 16\`, \`left++\` | \`[_, _, _, 16, 100]\` |
| 3 | 1 (-1) | 3 (3) | 1 | 9 | 2 | right² is larger → \`result[2] = 9\`, \`right--\` | \`[_, _, 9, 16, 100]\` |
| 4 | 1 (-1) | 2 (0) | 1 | 0 | 1 | left² is larger → \`result[1] = 1\`, \`left++\` | \`[_, 1, 9, 16, 100]\` |
| 5 | 2 (0) | 2 (0) | 0 | 0 | 0 | equal → \`result[0] = 0\`, \`right--\` | \`[0, 1, 9, 16, 100]\` |

The result is sorted and every element was written exactly once ✓

## Java Solution

See [\`SquaresOfSortedArray.java\`](./SquaresOfSortedArray.java).

\`\`\`java
int left = 0;
int right = n - 1;
int write = n - 1;
while (left <= right) {
    int leftSquare = nums[left] * nums[left];
    int rightSquare = nums[right] * nums[right];
    if (leftSquare > rightSquare) {
        result[write--] = leftSquare;
        left++;
    } else {
        result[write--] = rightSquare;
        right--;
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every element is read once |
| **Space** | O(n) for the result | the input is not modified |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not sorted?"* → sort it first, or use a max-heap of the
  absolute values.
- *"Can you do it in place?"* → only with extra care: the squares overwrite the input
  while it is still being read. It is possible (process from both ends) but easy to get
  wrong.
- *"What if the values are floats?"* → the same algorithm; watch out for \`0.0\` and
  negative zero.
- *"How would you find the k-th smallest square?"* → the same two-pointer scan, but stop
  after k writes.

**Common mistakes:**
- ❌ Writing the squares from the **front** → the result comes out in decreasing order.
- ❌ Forgetting that the **left** square is the square of a *negative* number (the sign
  disappears) → the comparison uses \`nums[left] * nums[left]\`, not \`nums[left]\`.
- ❌ Using \`left < right\` instead of \`left <= right\` → the middle element is never
  written.
- ❌ Sorting the squares instead of using two pointers → O(n log n) instead of O(n).

**How to narrate:**
> "The largest square is always at one of the two ends — the biggest number or the most
> negative number. So I walk two pointers inwards from both ends and write the larger
> square into the result **from the back**. That keeps the result sorted without any
> sorting step. O(n) time."

## Related Problems

- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — the same pointer pattern
- [Container With Most Water](ContainerWithMostWater.md) — two pointers with a greedy move
- [Merge Two Sorted Arrays](../../../../../../docs/topics/01-arrays.md) — the same idea, merging instead of squaring
- [Valid Palindrome](ValidPalindrome.md) — two pointers over a string
`,i=[`sortedSquares`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};