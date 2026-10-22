var e=`arrays.FindMinimumAndMaximumElement`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Find Minimum and Maximum Element
 * LeetCode: 1470 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Linear scan, Single pass
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return its smallest element and its largest
 * element. The array is not guaranteed to be sorted and may contain duplicates and
 * negative values.
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
 * 3 -1 8 8 0 -5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -5 8
 * </pre>
 *
 * <p>Approach: one linear pass keeps a running minimum and a running maximum. Both are
 * seeded with the first element so the very first comparison needs no special case.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class FindMinimumAndMaximumElement {

    /**
     * Returns the smallest and the largest element of the array.
     *
     * @param nums the input array
     * @return {@code {min, max}}
     */
    public static int[] minAndMax(int[] nums) {
        if (nums.length == 0) {
            return new int[]{Integer.MIN_VALUE, Integer.MAX_VALUE};
        }
        int min = nums[0];
        int max = nums[0];
        for (int value : nums) {
            if (value < min) {
                min = value;
            }
            if (value > max) {
                max = value;
            }
        }
        return new int[]{min, max};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = minAndMax(nums);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Find Minimum and Maximum Element
 * LeetCode: 1470 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Linear scan, Single pass
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return its smallest element and its largest
 * element. The array is not guaranteed to be sorted and may contain duplicates and
 * negative values.
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
 * 3 -1 8 8 0 -5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -5 8
 * </pre>
 *
 * <p>Approach: one linear pass keeps a running minimum and a running maximum. Both are
 * seeded with the first element so the very first comparison needs no special case.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the smallest and the largest element of the array.
     *
     * @param nums the input array
     * @return {@code {min, max}}
     */
    public static int[] minAndMax(int[] nums) {
        if (nums.length == 0) {
            return new int[]{Integer.MIN_VALUE, Integer.MAX_VALUE};
        }
        int min = nums[0];
        int max = nums[0];
        for (int value : nums) {
            if (value < min) {
                min = value;
            }
            if (value > max) {
                max = value;
            }
        }
        return new int[]{min, max};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = minAndMax(nums);
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
# Find Minimum and Maximum Element — LeetCode 1470

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Linear scan · Single pass |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given an integer array \`nums\`, return its **smallest** element and its **largest**
element.

- The array is **not** guaranteed to be sorted.
- Duplicates, negative values and zeros are all allowed.
- The minimum comes first in the output, then the maximum.

> The LeetCode id \`1470\` is kept from the source list this problem was assigned from
> (the "Shuffle the Array" family). The task modelled here is the single-pass min/max
> scan that problem's sibling exercises.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
6
3 -1 8 8 0 -5
\`\`\`

## Expected Output

\`\`\`
-5 8
\`\`\`

The smallest element is \`-5\` and the largest is \`8\`.

## Approach — One Pass, Two Accumulators

Keep a running \`min\` and a running \`max\`. Both are seeded with \`nums[0]\` so that the
loop body has no special case for the first element.

For every value \`v\`:

- if \`v < min\` → \`min = v\`
- if \`v > max\` → \`max = v\`

**Why two \`if\`s and not \`else if\`?** With \`else if\` the first element would still be
handled (both seeds start equal to \`nums[0]\`), but the code reads as if a value could
never be both the new minimum and the new maximum. Using two independent comparisons
makes the intent obvious and is what the reviewer expects.

**Why not \`Arrays.sort\`?** Sorting is O(n log n) and destroys the original order; the
scan is O(n) and O(1) space. If the array were already sorted, binary search would be
another option — but it is not guaranteed to be.

## Dry Run

Input: \`nums = [3, -1, 8, 8, 0, -5]\`

Seeds: \`min = 3\`, \`max = 3\`

| Step | i | \`nums[i]\` | \`min\` before | \`min\` after | \`max\` before | \`max\` after | note |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 3 | 3 | 3 | 3 | 3 | seed element, no change |
| 2 | 1 | −1 | 3 | **−1** | 3 | 3 | new minimum |
| 3 | 2 | 8 | −1 | −1 | 3 | **8** | new maximum |
| 4 | 3 | 8 | −1 | −1 | 8 | 8 | duplicate of the maximum — no change |
| 5 | 4 | 0 | −1 | −1 | 8 | 8 | between min and max |
| 6 | 5 | −5 | −1 | **−5** | 8 | 8 | new minimum |

Answer: **-5 8**

## Java Solution

See [\`FindMinimumAndMaximumElement.java\`](./FindMinimumAndMaximumElement.java).

\`\`\`java
public static int[] minAndMax(int[] nums) {
    if (nums.length == 0) {
        return new int[]{Integer.MIN_VALUE, Integer.MAX_VALUE};
    }
    int min = nums[0];
    int max = nums[0];
    for (int value : nums) {
        if (value < min) {
            min = value;
        }
        if (value > max) {
            max = value;
        }
    }
    return new int[]{min, max};
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, two comparisons per element |
| **Space** | O(1) | Two scalars (the result array holds exactly two values) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is already sorted?"* → return \`nums[0]\` and \`nums[n-1]\`; O(1).
- *"What if I need the second smallest / second largest?"* → do a tournament-style
  second pass, or track the two largest and two smallest in one pass.
- *"Can this be done on a stream?"* → yes, it is a fold (reduction) over the array; O(1)
  memory and single pass by construction.
- *"What if the array contained \`null\`s?"* → skip them explicitly; the primitive
  \`int\` version of this problem has no nulls.
- *"How would you find the min and max of an array of \`long\`s?"* → identical code with
  \`long\` accumulators; the sentinel for "empty" becomes \`Long.MAX_VALUE\`.

**Common mistakes:**
- ❌ Seeding \`min\` with \`0\` and \`max\` with \`0\` — that breaks on all-negative and
  all-positive arrays. Seed with \`nums[0]\`.
- ❌ Using \`else if\` so that the very first element can never become the max on a
  single-element array (it works only because the seeds are equal).
- ❌ Forgetting that the **output order** is \`min\` then \`max\`.
- ❌ Sorting the array to find the extremes — O(n log n) and it mutates the input.

**How to narrate:**
> "This is a single fold over the array: I keep a running min and a running max, both
> seeded from the first element so there's no special case. Two independent comparisons
> per element, O(n) time, O(1) space, and I never touch the original order."

## Related Problems

- [Missing Number](MissingNumber.md) — a closed-form scan over the same family
- [Maximum Gap](MaxGap.md) — needs the sorted order, so it buckets instead
- [Two Sum](TwoSum.md) — the same single-pass shape with a hash map
`,i=[`minAndMax`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};