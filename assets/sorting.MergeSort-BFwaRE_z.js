var e=`sorting.MergeSort`,t=`package com.dsa.sorting;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Merge Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Merging
 *
 * <p>Problem: Sort an array of integers in ascending order with merge sort and return
 * the sorted array.
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
 * 5 2 4 6 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 4 5 6
 * </pre>
 *
 * <p>Approach: split the array in half, sort both halves recursively and merge the two
 * sorted halves back together in linear time. The recursion stops when a range holds
 * zero or one element.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MergeSort {

    /**
     * Sorts {@code nums} in ascending order.
     *
     * @param nums the array to sort
     * @return a new, sorted array
     */
    public static int[] mergeSort(int[] nums) {
        if (nums.length <= 1) {
            return nums;
        }
        int mid = nums.length / 2;
        int[] left = Arrays.copyOfRange(nums, 0, mid);
        int[] right = Arrays.copyOfRange(nums, mid, nums.length);

        int[] sortedLeft = mergeSort(left);
        int[] sortedRight = mergeSort(right);
        return merge(sortedLeft, sortedRight);
    }

    /**
     * Merges two sorted arrays into one sorted array.
     *
     * @param left  the first sorted array
     * @param right the second sorted array
     * @return the merged array
     */
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0;
        int j = 0;
        int k = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        while (i < left.length) {
            result[k++] = left[i++];
        }
        while (j < right.length) {
            result[k++] = right[j++];
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = mergeSort(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < sorted.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(sorted[i]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Merge Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Merging
 *
 * <p>Problem: Sort an array of integers in ascending order with merge sort and return
 * the sorted array.
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
 * 5 2 4 6 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 4 5 6
 * </pre>
 *
 * <p>Approach: split the array in half, sort both halves recursively and merge the two
 * sorted halves back together in linear time. The recursion stops when a range holds
 * zero or one element.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class Main {

    /**
     * Sorts {@code nums} in ascending order.
     *
     * @param nums the array to sort
     * @return a new, sorted array
     */
    public static int[] mergeSort(int[] nums) {
        if (nums.length <= 1) {
            return nums;
        }
        int mid = nums.length / 2;
        int[] left = Arrays.copyOfRange(nums, 0, mid);
        int[] right = Arrays.copyOfRange(nums, mid, nums.length);

        int[] sortedLeft = mergeSort(left);
        int[] sortedRight = mergeSort(right);
        return merge(sortedLeft, sortedRight);
    }

    /**
     * Merges two sorted arrays into one sorted array.
     *
     * @param left  the first sorted array
     * @param right the second sorted array
     * @return the merged array
     */
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0;
        int j = 0;
        int k = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        while (i < left.length) {
            result[k++] = left[i++];
        }
        while (j < right.length) {
            result[k++] = right[j++];
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = mergeSort(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < sorted.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(sorted[i]);
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
# Merge Sort

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Divide and conquer · Merging |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft, Apple |

## Problem Statement

Sort an array of integers in ascending order using **merge sort** and print the
result.

- The algorithm splits, sorts recursively and merges.
- Print the sorted array as space-separated integers on one line.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — the length of the array (0 ≤ n ≤ 10⁴).
- \`nums\` — n space-separated integers.

## Sample Input

\`\`\`
5
5 2 4 6 1
\`\`\`

## Expected Output

\`\`\`
1 2 4 5 6
\`\`\`

## Approach — Split, sort, merge

Merge sort is the textbook **divide and conquer** algorithm:

1. **Split** the array into two halves.
2. **Sort** each half recursively (the base case is an array of 0 or 1 elements).
3. **Merge** the two sorted halves into one sorted array in linear time.

The merge keeps two indices, one per half. It repeatedly takes the smaller of the
two current elements, which is why the merge step is O(n) and not O(n²).

**Why the total is O(n log n):** the recursion has log₂ n levels, and on every level
the merge work adds up to n elements.

## Dry Run

Input: \`nums = [5, 2, 4, 6, 1]\`

### The recursion tree

\`\`\`
[5, 2, 4, 6, 1]
├── [5, 2]              → [5] + [2]        → merge → [2, 5]
└── [4, 6, 1]
    ├── [4]             → base case        → [4]
    └── [6, 1]          → [6] + [1]        → merge → [1, 6]
                          merge [4] + [1, 6] → [1, 4, 6]
        merge [2, 5] + [1, 4, 6]            → [1, 2, 4, 5, 6]
\`\`\`

### Merge 1 — \`[5]\` and \`[2]\`

| k | \`left[i]\` | \`right[j]\` | smaller | \`result\` so far |
|---:|---:|---:|---|---|
| 0 | 5 | 2 | right → 2 | \`[2]\` |
| 1 | — | — | left exhausted → copy \`5\` | \`[2, 5]\` |

### Merge 2 — \`[6]\` and \`[1]\`

| k | \`left[i]\` | \`right[j]\` | smaller | \`result\` so far |
|---:|---:|---:|---|---|
| 0 | 6 | 1 | right → 1 | \`[1]\` |
| 1 | — | — | left exhausted → copy \`6\` | \`[1, 6]\` |

### Merge 3 — \`[4]\` and \`[1, 6]\`

| k | \`left[i]\` | \`right[j]\` | smaller | \`result\` so far |
|---:|---:|---:|---|---|
| 0 | 4 | 1 | right → 1 | \`[1]\` |
| 1 | 4 | 6 | left → 4 | \`[1, 4]\` |
| 2 | — | 6 | right exhausted → copy \`6\` | \`[1, 4, 6]\` |

### Merge 4 — \`[2, 5]\` and \`[1, 4, 6]\` (the final merge)

| k | \`left[i]\` | \`right[j]\` | smaller | \`result\` so far |
|---:|---:|---:|---|---|
| 0 | 2 | 1 | right → 1 | \`[1]\` |
| 1 | 2 | 4 | left → 2 | \`[1, 2]\` |
| 2 | 5 | 4 | right → 4 | \`[1, 2, 4]\` |
| 3 | 5 | 6 | left → 5 | \`[1, 2, 4, 5]\` |
| 4 | — | 6 | right exhausted → copy \`6\` | \`[1, 2, 4, 5, 6]\` |

Final array: **\`[1, 2, 4, 5, 6]\`**

## Java Solution

See [\`MergeSort.java\`](./MergeSort.java).

\`\`\`java
public static int[] mergeSort(int[] nums) {
    if (nums.length <= 1) {
        return nums;
    }
    int mid = nums.length / 2;
    int[] left = Arrays.copyOfRange(nums, 0, mid);
    int[] right = Arrays.copyOfRange(nums, mid, nums.length);

    int[] sortedLeft = mergeSort(left);
    int[] sortedRight = mergeSort(right);
    return merge(sortedLeft, sortedRight);
}

private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result[k++] = left[i++];
        } else {
            result[k++] = right[j++];
        }
    }
    while (i < left.length) {
        result[k++] = left[i++];
    }
    while (j < right.length) {
        result[k++] = right[j++];
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | log n levels of recursion, n units of merge work per level |
| **Space** | O(n) | The halves plus the merge buffer — the recursion itself is O(log n) deep |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is it stable?"* → **yes**, as long as the merge uses \`<=\` when the two values are
  equal (take from the left half first).
- *"Can you make it in place?"* → not easily; in-place merge sort needs O(1) extra
  space tricks (rotation-based merge) and is rarely worth it.
- *"Merge sort for a linked list?"* → perfect fit: split at the middle by finding
  the midpoint with slow/fast pointers, then merge the two lists.
- *"When would you not use merge sort?"* → when you need O(1) extra space, or when
  the data is a linked list you cannot index — quicksort or heapsort fit better.

**Common mistakes:**
- ❌ **Ignoring the return value of the recursive calls** → the halves are never
  sorted; this is the classic merge sort bug.
- ❌ Using \`<\` instead of \`<=\` in the merge → the sort is no longer stable.
- ❌ Forgetting to copy the **remaining** elements after one half runs out → the tail
  of the array is lost or zero.
- ❌ Splitting into overlapping halves → elements are duplicated.

**How to narrate:**
> "Merge sort is divide and conquer: split the array, sort both halves recursively,
> then merge the two sorted halves in linear time by always taking the smaller head.
> The recursion is log n deep and each level merges n elements, so it's O(n log n)
> time with O(n) extra space. It's stable, which is why databases use it when the
> sort key has ties."

## Related Problems

- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — the in-place alternative
- [Heap Sort](../../../../../../docs/topics/08-sorting.md) — O(n log n) with O(1) extra space
- [Counting Sort](../../../../../../docs/topics/08-sorting.md) — O(n) when the value range is small
`,i=[`mergeSort`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};