var e=`binarysearch.FindMinimumInRotatedSortedArray`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Find Minimum in Rotated Sorted Array
 * LeetCode: 153 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a rotated sorted array
 *
 * <p>Problem:
 * An array sorted in ascending order with distinct values is rotated at an unknown pivot,
 * for example {@code [0,1,2,4,5,6,7]} becomes {@code [4,5,6,7,0,1,2]}. Find and return the
 * minimum element.
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
 * 3 4 5 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: compare the middle element with the rightmost element. If
 * {@code nums[mid] > nums[right]} the minimum lies strictly to the right of {@code mid};
 * otherwise the minimum is at {@code mid} or to the left. One half is discarded each step.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class FindMinimumInRotatedSortedArray {

    /**
     * Returns the smallest element of the rotated sorted array {@code nums}.
     *
     * @param nums rotated ascending array with distinct values
     * @return the minimum element
     */
    public static int findMin(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                // The rotation point — and the minimum — is to the right of mid.
                left = mid + 1;
            } else {
                // nums[mid] is the smallest element seen so far.
                right = mid;
            }
        }
        return nums[left];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(findMin(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Find Minimum in Rotated Sorted Array
 * LeetCode: 153 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a rotated sorted array
 *
 * <p>Problem:
 * An array sorted in ascending order with distinct values is rotated at an unknown pivot,
 * for example {@code [0,1,2,4,5,6,7]} becomes {@code [4,5,6,7,0,1,2]}. Find and return the
 * minimum element.
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
 * 3 4 5 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: compare the middle element with the rightmost element. If
 * {@code nums[mid] > nums[right]} the minimum lies strictly to the right of {@code mid};
 * otherwise the minimum is at {@code mid} or to the left. One half is discarded each step.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class Main {

    /**
     * Returns the smallest element of the rotated sorted array {@code nums}.
     *
     * @param nums rotated ascending array with distinct values
     * @return the minimum element
     */
    public static int findMin(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                // The rotation point — and the minimum — is to the right of mid.
                left = mid + 1;
            } else {
                // nums[mid] is the smallest element seen so far.
                right = mid;
            }
        }
        return nums[left];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(findMin(nums));
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
# Find Minimum in Rotated Sorted Array — LeetCode 153

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Rotated array |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

An array of **distinct** integers sorted in ascending order is rotated at an unknown pivot.
For example \`[0,1,2,4,5,6,7]\` may become \`[4,5,6,7,0,1,2]\`.

Find and return the **minimum** element.

You must achieve **O(log n)** time. (The naive answer — scan for the first drop — is O(n).)

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers: a rotated ascending array with distinct values

## Sample Input

\`\`\`
5
3 4 5 1 2
\`\`\`

## Expected Output

\`\`\`
1
\`\`\`

The rotation point (the minimum) is at index \`3\`.

## Approach — Compare the middle with the right end

The pivot — the minimum — splits the array into a large sorted run and a small sorted run.
We do not know where it is, but the comparison \`nums[mid] > nums[right]\` reveals whether
the pivot is to the right of \`mid\`:

- **\`nums[mid] > nums[right]\`** → the rotation point is **after** \`mid\`. (If \`mid\` were in
  the small run, everything after it would be smaller, including \`nums[right]\`.) So set
  \`left = mid + 1\`.
- **\`nums[mid] < nums[right]\`** → \`mid\` is already in the small sorted run, so the minimum
  is at \`mid\` or to its **left**. Set \`right = mid\`.

The loop stops when \`left == right\`, and \`nums[left]\` is the minimum.

**Why compare with \`nums[right]\` and not \`nums[left]\`?** Because \`nums[mid] > nums[right]\`
is a *strict* statement about where the pivot lies, whereas \`nums[mid] < nums[left]\` is
also true when the array is **not rotated at all** — then the answer would be \`nums[0]\`,
which is at the far left, and the search would collapse incorrectly.

## Dry Run

Input: \`nums = [3, 4, 5, 1, 2]\`

| Step | left | right | mid | \`nums[mid]\` | \`nums[right]\` | \`nums[mid] > nums[right]\`? | range after |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 4 | 2 | 5 | 2 | **yes** → pivot is right of \`mid\` | \`[3, 4]\` |
| 2 | 3 | 4 | 3 | 1 | 2 | no → minimum is at \`mid\` or left | \`[3, 3]\` |

\`left == right == 3\` → \`nums[3] == 1\` → return **1**.

### The picture

\`\`\`
nums =  3  4  5 | 1  2
               ↑ pivot
               minimum = 1

step 1:  mid = 2 (value 5)  >  nums[right] = 2   →  pivot is to the right → left = 3
step 2:  mid = 3 (value 1)  <  nums[right] = 2   →  pivot is at mid or left → right = 3
\`\`\`

### Trace on a non-rotated array — \`nums = [1, 2, 3, 4]\`

| Step | left | right | mid | \`nums[mid]\` | \`nums[right]\` | comparison | range after |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 3 | 1 | 2 | 4 | 2 < 4 → \`right = mid\` | \`[0, 1]\` |
| 2 | 0 | 1 | 0 | 1 | 2 | 1 < 2 → \`right = mid\` | \`[0, 0]\` |

\`left == right == 0\` → \`nums[0] == 1\` → return **1** — correct even though the array was
never rotated.

## Java Solution

See [\`FindMinimumInRotatedSortedArray.java\`](./FindMinimumInRotatedSortedArray.java).

\`\`\`java
public static int findMin(int[] nums) {
    int left = 0;
    int right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) {
            // The rotation point — and the minimum — is to the right of mid.
            left = mid + 1;
        } else {
            // nums[mid] is the smallest element seen so far.
            right = mid;
        }
    }
    return nums[left];
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | One half of the range is discarded per iteration |
| **Space** | O(1) | Only two index variables |

**Optimal?** Yes — Ω(log n) probes are needed in the worst case.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if duplicates are allowed?"* → the comparison \`nums[mid] > nums[right]\` is no longer
  decisive when they are equal; you must shrink one end and the worst case becomes O(n).
- *"Return the index of the minimum."* → the loop already knows it: \`left\` at the end.
- *"Find the maximum too."* → the maximum is just before the pivot: once you know the
  minimum's index \`p\`, the maximum is at \`(p - 1 + n) % n\`.
- *"How do you find the pivot itself?"* → the pivot is the only index \`i\` with
  \`nums[i] < nums[i-1]\` (with wrap-around) — one O(n) scan, or O(log n) with the same
  binary search.

**Common mistakes:**
- ❌ Comparing \`nums[mid]\` with \`nums[left]\` → breaks on a non-rotated array.
- ❌ Forgetting the \`left < right\` loop condition → \`mid\` would equal \`left\` and the
  \`right = mid\` branch would never shrink the range.
- ❌ Assuming the array is always rotated → the algorithm handles the unrotated case, but
  only if the comparison is against \`nums[right]\`.
- ❌ Returning \`nums[mid]\` from inside the loop → the minimum is at \`left\` when the loop
  ends, not necessarily at the last probed \`mid\`.

**How to narrate:**
> "A rotated array has a pivot where the values wrap around, and that pivot is the minimum.
> Comparing the middle element with the rightmost element tells me on which side of the
> pivot the middle sits: if the middle is bigger, the pivot is to the right; otherwise the
> middle is already in the small sorted run. Either way I halve the range, so I find the
> minimum in O(log n) probes."

## Related Problems

- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — search by value instead
- [Search in Rotated Sorted Array II](./SearchInRotatedSortedArrayII.java) — the duplicate-heavy version
- [Find First and Last Position](./FindFirstAndLastPosition.java) — lower and upper bounds
`,i=[`findMin`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};