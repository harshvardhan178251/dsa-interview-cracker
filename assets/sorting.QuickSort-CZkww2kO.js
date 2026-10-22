var e=`sorting.QuickSort`,t=`package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Quick Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Partitioning
 *
 * <p>Problem: Sort an array of integers in ascending order with quick sort and return
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
 * <p>Approach: pick a pivot, partition the range so that everything smaller than the
 * pivot is on its left and everything greater is on its right, then recurse into both
 * sides. The partition uses the Lomuto scheme with the last element of the range as
 * the pivot.
 *
 * <p>Complexity: Time O(n log n) on average, O(n²) worst case, Space O(log n) for the
 * recursion stack.
 */
public class QuickSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] quickSort(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    /** Sorts the range {@code nums[low..high]} in place. */
    private static void quickSort(int[] nums, int low, int high) {
        if (low >= high) {
            return; // zero or one element -> already sorted
        }
        int pivotIndex = partition(nums, low, high);
        quickSort(nums, low, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, high);
    }

    /**
     * Moves every element smaller than or equal to the pivot to the left of it and
     * returns the final index of the pivot.
     */
    private static int partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int boundary = low - 1; // last index of the "smaller or equal" region

        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                boundary++;
                swap(nums, boundary, j);
            }
        }
        swap(nums, boundary + 1, high); // put the pivot between the two regions
        return boundary + 1;
    }

    /** Swaps two elements of the array. */
    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = quickSort(nums);

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
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Quick Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Partitioning
 *
 * <p>Problem: Sort an array of integers in ascending order with quick sort and return
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
 * <p>Approach: pick a pivot, partition the range so that everything smaller than the
 * pivot is on its left and everything greater is on its right, then recurse into both
 * sides. The partition uses the Lomuto scheme with the last element of the range as
 * the pivot.
 *
 * <p>Complexity: Time O(n log n) on average, O(n²) worst case, Space O(log n) for the
 * recursion stack.
 */
public class Main {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] quickSort(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    /** Sorts the range {@code nums[low..high]} in place. */
    private static void quickSort(int[] nums, int low, int high) {
        if (low >= high) {
            return; // zero or one element -> already sorted
        }
        int pivotIndex = partition(nums, low, high);
        quickSort(nums, low, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, high);
    }

    /**
     * Moves every element smaller than or equal to the pivot to the left of it and
     * returns the final index of the pivot.
     */
    private static int partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int boundary = low - 1; // last index of the "smaller or equal" region

        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                boundary++;
                swap(nums, boundary, j);
            }
        }
        swap(nums, boundary + 1, high); // put the pivot between the two regions
        return boundary + 1;
    }

    /** Swaps two elements of the array. */
    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = quickSort(nums);

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
# Quick Sort

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Divide and conquer · Partitioning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft, Apple |

## Problem Statement

Sort an array of integers in ascending order using **quick sort** and print the
result.

- The algorithm partitions the array around a pivot and recurses into both halves.
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

## Approach — Partition around a pivot

Quick sort picks a **pivot**, rearranges the range so that

- everything on the left of the pivot is \`<= pivot\` and
- everything on the right is \`>= pivot\`,

and then recurses into the two sides. The pivot ends up at its final position.

This implementation uses the **Lomuto partition** with the **last element of the
range** as the pivot:

1. \`boundary\` starts at \`low - 1\` — the last index of the "smaller or equal" region.
2. Scan \`j\` from \`low\` to \`high - 1\`. When \`nums[j] <= pivot\`, grow the region by
   one and swap \`nums[boundary]\` with \`nums[j]\`.
3. Finally swap the pivot (at \`high\`) with \`nums[boundary + 1]\` — that is the pivot's
   final index — and recurse into \`[low, pivotIndex - 1]\` and \`[pivotIndex + 1, high]\`.

**Why the average case is O(n log n):** for a random pivot the recursion is balanced.
**Why the worst case is O(n²):** if the pivot is always the smallest or the largest
element, the recursion degenerates into a chain of length n.

## Dry Run

Input: \`nums = [5, 2, 4, 6, 1]\`

### Call \`quickSort(0, 4)\` — pivot = \`nums[4]\` = **1**, \`boundary = -1\`

| Step | j | \`nums[j]\` | \`<= pivot\`? | action | array |
|---:|---:|---:|---|---|---|
| 1 | 0 | 5 | ✘ | — | \`[5, 2, 4, 6, 1]\` |
| 2 | 1 | 2 | ✘ | — | \`[5, 2, 4, 6, 1]\` |
| 3 | 2 | 4 | ✘ | — | \`[5, 2, 4, 6, 1]\` |
| 4 | 3 | 6 | ✘ | — | \`[5, 2, 4, 6, 1]\` |
| 5 | — | — | — | \`swap(boundary+1=0, high=4)\` → pivot to the front | \`[1, 2, 4, 6, 5]\` |

Pivot index = \`0\` → recurse into \`quickSort(0, -1)\` (empty) and \`quickSort(1, 4)\`.

### Call \`quickSort(1, 4)\` — pivot = \`nums[4]\` = **5**, \`boundary = 0\`

| Step | j | \`nums[j]\` | \`<= pivot\`? | action | array |
|---:|---:|---:|---|---|---|
| 6 | 1 | 2 | ✔ | \`boundary = 1\`, \`swap(1, 1)\` | \`[1, 2, 4, 6, 5]\` |
| 7 | 2 | 4 | ✔ | \`boundary = 2\`, \`swap(2, 2)\` | \`[1, 2, 4, 6, 5]\` |
| 8 | 3 | 6 | ✘ | — | \`[1, 2, 4, 6, 5]\` |
| 9 | — | — | — | \`swap(boundary+1=3, high=4)\` | \`[1, 2, 4, 5, 6]\` |

Pivot index = \`3\` → recurse into \`quickSort(1, 2)\` and \`quickSort(4, 4)\`.

### Call \`quickSort(1, 2)\` — pivot = \`nums[2]\` = **4**, \`boundary = 0\`

| Step | j | \`nums[j]\` | \`<= pivot\`? | action | array |
|---:|---:|---:|---|---|---|
| 10 | 1 | 2 | ✔ | \`boundary = 1\`, \`swap(1, 1)\` | \`[1, 2, 4, 5, 6]\` |
| 11 | — | — | — | \`swap(boundary+1=2, high=2)\` | \`[1, 2, 4, 5, 6]\` |

Pivot index = \`2\` → recurse into \`quickSort(1, 1)\` and \`quickSort(3, 2)\` — both empty.

### Remaining calls

| Call | Range | Result |
|---|---|---|
| \`quickSort(0, -1)\` | empty | done |
| \`quickSort(4, 4)\` | one element | done |
| \`quickSort(1, 1)\` | one element | done |
| \`quickSort(3, 2)\` | empty | done |

Final array: **\`[1, 2, 4, 5, 6]\`**

## Java Solution

See [\`QuickSort.java\`](./QuickSort.java).

\`\`\`java
public static int[] quickSort(int[] nums) {
    quickSort(nums, 0, nums.length - 1);
    return nums;
}

private static void quickSort(int[] nums, int low, int high) {
    if (low >= high) {
        return;
    }
    int pivotIndex = partition(nums, low, high);
    quickSort(nums, low, pivotIndex - 1);
    quickSort(nums, pivotIndex + 1, high);
}

private static int partition(int[] nums, int low, int high) {
    int pivot = nums[high];
    int boundary = low - 1;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            boundary++;
            swap(nums, boundary, j);
        }
    }
    swap(nums, boundary + 1, high);
    return boundary + 1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) average, O(n²) worst | balanced recursion vs. a degenerate one |
| **Space** | O(log n) | The recursion stack (average case) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you avoid the O(n²) worst case?"* → pick a **random pivot**, or use the
  median-of-three, or use an introsort that switches to heapsort after too many
  recursive levels.
- *"Hoare vs. Lomuto partition — which one?"* → Lomuto does ~9 swaps for n = 10⁶ on
  random data while Hoare does ~1.4n; Hoare is faster but the pivot ends up in an
  arbitrary position, so the partition index has to be used differently.
- *"Is it stable?"* → **no**, the partition swaps elements that may be equal.
- *"What about the space complexity — is it really O(log n)?"* → yes on average, but
  O(n) in the worst case with the naive recursion; an explicit stack with the smaller
  side recursed into keeps it O(log n) always.

**Common mistakes:**
- ❌ Forgetting the **final swap** that puts the pivot between the two regions → the
  pivot is not at its final index.
- ❌ Using \`nums[j] < pivot\` instead of \`<= \` → equal elements can end up on the
  wrong side.
- ❌ Swapping the pivot with \`boundary\` instead of \`boundary + 1\` → off-by-one.
- ❌ Missing the base case \`low >= high\` → infinite recursion on single-element
  ranges.

**How to narrate:**
> "Quick sort picks a pivot, partitions the range so everything smaller is on the
> left and everything larger on the right, and recurses. I use Lomuto partitioning
> with the last element as the pivot: a boundary index tracks the end of the
> 'smaller or equal' region, and after the scan I swap the pivot into place. Average
> case O(n log n) in place; the worst case is O(n²), which randomising the pivot
> makes vanishingly unlikely."

## Related Problems

- [Merge Sort](../../../../../../docs/topics/08-sorting.md) — the stable O(n log n) alternative
- [Heap Sort](../../../../../../docs/topics/08-sorting.md) — O(n log n) with guaranteed O(1) extra space
- [Dutch National Flag](../../../../../../docs/topics/08-sorting.md) — partitioning with three pointers
`,i=[`quickSort`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};