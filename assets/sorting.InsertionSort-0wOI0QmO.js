var e=`sorting.InsertionSort`,t=`package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Insertion Sort
 * LeetCode: null | Difficulty: Easy | Frequency: 3/5
 * Pattern: Comparison sort, Growing sorted prefix
 *
 * <p>Problem: Sort an array of integers in ascending order with the insertion sort
 * algorithm and return the sorted array.
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
 * <p>Approach: the first element is a sorted prefix of length one. For every following
 * element, take it out ("the key"), shift all larger elements of the prefix one
 * position to the right and drop the key into the gap.
 *
 * <p>Complexity: Time O(n²) worst case, O(n) best case, Space O(1).
 */
public class InsertionSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] insertionSort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            int key = nums[i];
            int j = i - 1;
            // Shift every larger element of the sorted prefix one step to the right.
            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
        return nums;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = insertionSort(nums);

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
 * Problem: Insertion Sort
 * LeetCode: null | Difficulty: Easy | Frequency: 3/5
 * Pattern: Comparison sort, Growing sorted prefix
 *
 * <p>Problem: Sort an array of integers in ascending order with the insertion sort
 * algorithm and return the sorted array.
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
 * <p>Approach: the first element is a sorted prefix of length one. For every following
 * element, take it out ("the key"), shift all larger elements of the prefix one
 * position to the right and drop the key into the gap.
 *
 * <p>Complexity: Time O(n²) worst case, O(n) best case, Space O(1).
 */
public class Main {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] insertionSort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            int key = nums[i];
            int j = i - 1;
            // Shift every larger element of the sorted prefix one step to the right.
            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
        return nums;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = insertionSort(nums);

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
# Insertion Sort

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Comparison sort · Growing sorted prefix |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Sort an array of integers in ascending order using **insertion sort** and print the
result.

- The algorithm sorts the array in place.
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

## Approach — Insert the next element into the sorted prefix

The first element is already a sorted prefix of length one. For every following
element:

1. Take it out and remember it as **the key**.
2. Walk left through the sorted prefix, shifting every element that is **larger**
   than the key one position to the right.
3. Drop the key into the gap that opens up.

This is exactly how people sort a hand of playing cards: each new card is inserted
into the right place of the cards you already hold.

**Why it is good:** the inner loop only runs while elements are actually out of
place, so a nearly sorted array is sorted in O(n). That makes insertion sort the
standard choice for small arrays and for "almost sorted" data.

## Dry Run

Input: \`nums = [5, 2, 4, 6, 1]\`. The sorted prefix starts as \`[5]\`.

### \`i = 1\` — key = \`2\`

| Step | j | \`nums[j]\` | \`nums[j] > key\`? | action | array |
|---:|---:|---:|---|---|---|
| 1 | 0 | 5 | ✔ | shift \`nums[1] = nums[0] = 5\`, \`j = -1\` | \`[5, 5, 4, 6, 1]\` |
| 2 | -1 | — | — | loop ends, \`nums[0] = key = 2\` | **\`[2, 5, 4, 6, 1]\`** |

### \`i = 2\` — key = \`4\`

| Step | j | \`nums[j]\` | \`nums[j] > key\`? | action | array |
|---:|---:|---:|---|---|---|
| 3 | 1 | 5 | ✔ | shift \`nums[2] = nums[1] = 5\`, \`j = 0\` | \`[2, 5, 5, 6, 1]\` |
| 4 | 0 | 2 | ✘ | loop ends, \`nums[1] = key = 4\` | **\`[2, 4, 5, 6, 1]\`** |

### \`i = 3\` — key = \`6\`

| Step | j | \`nums[j]\` | \`nums[j] > key\`? | action | array |
|---:|---:|---:|---|---|---|
| 5 | 2 | 5 | ✘ | loop ends immediately, \`nums[3] = key = 6\` | **\`[2, 4, 5, 6, 1]\`** |

### \`i = 4\` — key = \`1\`

| Step | j | \`nums[j]\` | \`nums[j] > key\`? | action | array |
|---:|---:|---:|---|---|---|
| 6 | 3 | 6 | ✔ | shift \`nums[4] = nums[3] = 6\`, \`j = 2\` | \`[2, 4, 5, 6, 6]\` |
| 7 | 2 | 5 | ✔ | shift \`nums[3] = nums[2] = 5\`, \`j = 1\` | \`[2, 4, 5, 5, 6]\` |
| 8 | 1 | 4 | ✔ | shift \`nums[2] = nums[1] = 4\`, \`j = 0\` | \`[2, 4, 4, 5, 6]\` |
| 9 | 0 | 2 | ✔ | shift \`nums[1] = nums[0] = 2\`, \`j = -1\` | \`[2, 2, 4, 5, 6]\` |
| 10 | -1 | — | — | loop ends, \`nums[0] = key = 1\` | **\`[1, 2, 4, 5, 6]\`** |

Final array: **\`[1, 2, 4, 5, 6]\`**

## Java Solution

See [\`InsertionSort.java\`](./InsertionSort.java).

\`\`\`java
public static int[] insertionSort(int[] nums) {
    for (int i = 1; i < nums.length; i++) {
        int key = nums[i];
        int j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }
    return nums;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) worst, O(n) best | n(n−1)/2 shifts; a sorted array never enters the inner loop |
| **Space** | O(1) | Only the key and two counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is it stable?"* → **yes**: elements are only shifted when they are strictly
  larger, so equal elements keep their relative order.
- *"When is insertion sort the right choice?"* → small arrays (it beats quicksort
  below ~10 elements because of the low constant factor) and nearly sorted data.
- *"How many comparisons does it need for a given array?"* → exactly the number of
  inversions (plus one comparison per element) — that is the classic characterisation.
- *"Can you make it work on a linked list?"* → yes, and it is the natural choice
  there, since no random access is needed.

**Common mistakes:**
- ❌ Using \`>=\` in the shift condition → the sort becomes unstable.
- ❌ Forgetting to store \`key\` before shifting → the value being moved is lost.
- ❌ Placing the key at \`nums[j]\` instead of \`nums[j + 1]\` → off-by-one, the key
  overwrites a shifted element.
- ❌ Starting the outer loop at \`i = 0\` → the first element has no prefix to be
  inserted into.

**How to narrate:**
> "Insertion sort keeps a sorted prefix on the left and inserts each new element
> into it. I take the element out as the key, shift everything larger in the prefix
> one place to the right, and drop the key into the gap. It's O(n²) in the worst
> case but only O(n) on nearly sorted data, it's stable, and it's the algorithm
> people use to sort a hand of cards."

## Related Problems

- [Bubble Sort](../../../../../../docs/topics/08-sorting.md) — the other quadratic comparison sort
- [Selection Sort](../../../../../../docs/topics/08-sorting.md) — quadratic but with few swaps
- [Merge Sort](../../../../../../docs/topics/08-sorting.md) — the divide and conquer alternative
`,i=[`insertionSort`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};