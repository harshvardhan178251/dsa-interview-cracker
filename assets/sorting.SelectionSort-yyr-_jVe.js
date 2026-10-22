var e=`sorting.SelectionSort`,t=`package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Selection Sort
 * LeetCode: null | Difficulty: Easy | Frequency: 2/5
 * Pattern: Comparison sort, Divide and select
 *
 * <p>Problem: Sort an array of integers in ascending order with the selection sort
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
 * <p>Approach: for every position, scan the rest of the array for the smallest
 * element and swap it into that position. The sorted region grows from the left by
 * exactly one element per pass.
 *
 * <p>Complexity: Time O(n²), Space O(1).
 */
public class SelectionSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] selectionSort(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = nums[i];
            nums[i] = nums[minIndex];
            nums[minIndex] = temp;
        }
        return nums;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = selectionSort(nums);

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
 * Problem: Selection Sort
 * LeetCode: null | Difficulty: Easy | Frequency: 2/5
 * Pattern: Comparison sort, Divide and select
 *
 * <p>Problem: Sort an array of integers in ascending order with the selection sort
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
 * <p>Approach: for every position, scan the rest of the array for the smallest
 * element and swap it into that position. The sorted region grows from the left by
 * exactly one element per pass.
 *
 * <p>Complexity: Time O(n²), Space O(1).
 */
public class Main {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] selectionSort(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = nums[i];
            nums[i] = nums[minIndex];
            nums[minIndex] = temp;
        }
        return nums;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = selectionSort(nums);

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
# Selection Sort

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Comparison sort · Divide and select |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Sort an array of integers in ascending order using **selection sort** and print the
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

## Approach — Find the minimum, put it in place

Selection sort keeps a growing **sorted region** on the left. For each position \`i\`:

1. Scan the *unsorted* region \`i … n-1\` and remember the index of the smallest
   element.
2. Swap that element with the element at position \`i\`.

After the pass, position \`i\` holds the smallest element of the region, so the sorted
region has grown by exactly one.

**Selection sort does exactly n − 1 swaps** — at most one per pass — no matter how
unsorted the input is. That is its one real advantage over bubble sort, and the
reason it can be faster on arrays with many duplicate or already-placed elements.

## Dry Run

Input: \`nums = [5, 2, 4, 6, 1]\`

### Pass 1 — \`i = 0\`, scan the whole array for the minimum

| j | \`nums[j]\` | \`nums[minIndex]\` | smaller? | \`minIndex\` after |
|---:|---:|---:|---|---:|
| 1 | 2 | 5 | ✔ | 1 |
| 2 | 4 | 2 | ✘ | 1 |
| 3 | 6 | 2 | ✘ | 1 |
| 4 | 1 | 2 | ✔ | 4 |

Minimum is \`1\` at index 4 → \`swap(nums[0], nums[4])\` → **\`[1, 2, 4, 6, 5]\`**

### Pass 2 — \`i = 1\`, scan indices 1…4

| j | \`nums[j]\` | \`nums[minIndex]\` | smaller? | \`minIndex\` after |
|---:|---:|---:|---|---:|
| 2 | 4 | 2 | ✘ | 1 |
| 3 | 6 | 2 | ✘ | 1 |
| 4 | 5 | 2 | ✘ | 1 |

Minimum is \`2\` at index 1 → \`swap(nums[1], nums[1])\` (a no-op) → **\`[1, 2, 4, 6, 5]\`**

### Pass 3 — \`i = 2\`, scan indices 2…4

| j | \`nums[j]\` | \`nums[minIndex]\` | smaller? | \`minIndex\` after |
|---:|---:|---:|---|---:|
| 3 | 6 | 4 | ✘ | 2 |
| 4 | 5 | 4 | ✘ | 2 |

Minimum is \`4\` at index 2 → \`swap(nums[2], nums[2])\` (a no-op) → **\`[1, 2, 4, 6, 5]\`**

### Pass 4 — \`i = 3\`, scan indices 3…4

| j | \`nums[j]\` | \`nums[minIndex]\` | smaller? | \`minIndex\` after |
|---:|---:|---:|---|---:|
| 4 | 5 | 6 | ✔ | 4 |

Minimum is \`5\` at index 4 → \`swap(nums[3], nums[4])\` → **\`[1, 2, 4, 5, 6]\`**

The loop ends after \`i = 3\` (the last element is already the largest). Final array:
**\`[1, 2, 4, 5, 6]\`**

## Java Solution

See [\`SelectionSort.java\`](./SelectionSort.java).

\`\`\`java
public static int[] selectionSort(int[] nums) {
    for (int i = 0; i < nums.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[minIndex]) {
                minIndex = j;
            }
        }
        int temp = nums[i];
        nums[i] = nums[minIndex];
        nums[minIndex] = temp;
    }
    return nums;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | Always n(n−1)/2 comparisons — there is no early exit |
| **Space** | O(1) | Only the index of the current minimum |
| **Swaps** | ≤ n − 1 | At most one swap per pass |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is it stable?"* → **no**. With equal elements the later one is swapped into
  place, so their relative order can change. A stable variant has to compare with
  \`<=\` and skip equal elements.
- *"When would you use it?"* → when swapping is expensive (a large record) but
  comparisons are cheap: it does at most n − 1 swaps.
- *"Can it beat O(n²)?"* → not on the comparison model; you need a different
  assumption (see [Counting Sort](../../../../../../docs/topics/08-sorting.md)).
- *"What does the inner loop find?"* → the minimum of the unsorted region — exactly
  the same information the heap sort needs, but without building a heap.

**Common mistakes:**
- ❌ Swapping **inside** the inner loop → that is exchange sort, which does up to
  O(n²) swaps.
- ❌ Comparing against \`nums[i]\` instead of \`nums[minIndex]\` → the minimum is not
  tracked correctly.
- ❌ Running the outer loop to \`n\` instead of \`n - 1\` → the last pass is wasted work.
- ❌ Forgetting to update \`minIndex\` **after** finding a smaller value.

**How to narrate:**
> "Selection sort grows a sorted region on the left. For every position I scan the
> rest of the array for the smallest element and swap it into place. The comparison
> count is always n squared over two, but there are at most n-1 swaps, which is its
> one advantage over bubble sort. It's in place, but it is not stable."

## Related Problems

- [Bubble Sort](../../../../../../docs/topics/08-sorting.md) — swaps on every inversion
- [Insertion Sort](../../../../../../docs/topics/08-sorting.md) — linear on nearly sorted data
- [Counting Sort](../../../../../../docs/topics/08-sorting.md) — beats O(n²) when the value range is small
`,i=[`selectionSort`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};