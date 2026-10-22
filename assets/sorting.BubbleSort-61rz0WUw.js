var e=`sorting.BubbleSort`,t=`package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Bubble Sort
 * LeetCode: null | Difficulty: Easy | Frequency: 3/5
 * Pattern: Comparison sort, Repeated swapping
 *
 * <p>Problem: Sort an array of integers in ascending order with the bubble sort
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
 * <p>Approach: repeated passes over the array. In every pass adjacent elements are
 * compared and swapped when they are out of order, so the largest remaining element
 * "bubbles" to the end of the unsorted region. A pass without a single swap means
 * the array is sorted and the algorithm stops early.
 *
 * <p>Complexity: Time O(n²) worst case, O(n) best case, Space O(1).
 */
public class BubbleSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] bubbleSort(int[] nums) {
        for (int end = nums.length - 1; end > 0; end--) {
            boolean swapped = false;
            for (int i = 0; i < end; i++) {
                if (nums[i] > nums[i + 1]) {
                    int temp = nums[i];
                    nums[i] = nums[i + 1];
                    nums[i + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break; // no swap in a whole pass -> already sorted
            }
        }
        return nums;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = bubbleSort(nums);

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
 * Problem: Bubble Sort
 * LeetCode: null | Difficulty: Easy | Frequency: 3/5
 * Pattern: Comparison sort, Repeated swapping
 *
 * <p>Problem: Sort an array of integers in ascending order with the bubble sort
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
 * <p>Approach: repeated passes over the array. In every pass adjacent elements are
 * compared and swapped when they are out of order, so the largest remaining element
 * "bubbles" to the end of the unsorted region. A pass without a single swap means
 * the array is sorted and the algorithm stops early.
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
    public static int[] bubbleSort(int[] nums) {
        for (int end = nums.length - 1; end > 0; end--) {
            boolean swapped = false;
            for (int i = 0; i < end; i++) {
                if (nums[i] > nums[i + 1]) {
                    int temp = nums[i];
                    nums[i] = nums[i + 1];
                    nums[i + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break; // no swap in a whole pass -> already sorted
            }
        }
        return nums;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = bubbleSort(nums);

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
# Bubble Sort

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Comparison sort · Repeated swapping |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Sort an array of integers in ascending order using **bubble sort** and print the
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

## Approach — Bubble every maximum to the back

Bubble sort makes repeated passes over the array. In each pass it compares
**adjacent** elements and swaps them when they are out of order. The largest element
of the unsorted region therefore "bubbles" to the back of that region, and after one
pass the last position is final.

Two details make it practical:

- **The pass gets shorter.** After the first pass the largest element is already in
  its final place, so the next pass only has to look at \`n - 1\` positions.
- **Early exit.** If a whole pass performs no swap, the array is already sorted and
  the algorithm can stop. That makes the best case **O(n)** instead of O(n²).

## Dry Run

Input: \`nums = [5, 2, 4, 6, 1]\`

### Pass 1 — \`end = 4\` (compare indices 0…3)

| Step | i | \`nums[i]\` | \`nums[i+1]\` | swap? | array after the step |
|---:|---:|---:|---:|---|---|
| 1 | 0 | 5 | 2 | ✔ swap | \`[2, 5, 4, 6, 1]\` |
| 2 | 1 | 5 | 4 | ✔ swap | \`[2, 4, 5, 6, 1]\` |
| 3 | 2 | 5 | 6 | ✘ | \`[2, 4, 5, 6, 1]\` |
| 4 | 3 | 6 | 1 | ✔ swap | \`[2, 4, 5, 1, 6]\` |

The largest element \`6\` has bubbled to index 4 — its final place.

### Pass 2 — \`end = 3\` (compare indices 0…2)

| Step | i | \`nums[i]\` | \`nums[i+1]\` | swap? | array after the step |
|---:|---:|---:|---:|---|---|
| 5 | 0 | 2 | 4 | ✘ | \`[2, 4, 5, 1, 6]\` |
| 6 | 1 | 4 | 5 | ✘ | \`[2, 4, 5, 1, 6]\` |
| 7 | 2 | 5 | 1 | ✔ swap | \`[2, 4, 1, 5, 6]\` |

\`5\` is now in its final place at index 3.

### Pass 3 — \`end = 2\` (compare indices 0…1)

| Step | i | \`nums[i]\` | \`nums[i+1]\` | swap? | array after the step |
|---:|---:|---:|---:|---|---|
| 8 | 0 | 2 | 4 | ✘ | \`[2, 4, 1, 5, 6]\` |
| 9 | 1 | 4 | 1 | ✔ swap | \`[2, 1, 4, 5, 6]\` |

### Pass 4 — \`end = 1\` (compare index 0 only)

| Step | i | \`nums[i]\` | \`nums[i+1]\` | swap? | array after the step |
|---:|---:|---:|---:|---|---|
| 10 | 0 | 2 | 1 | ✔ swap | \`[1, 2, 4, 5, 6]\` |

The outer loop ends (\`end\` has reached 0). Final array: **\`[1, 2, 4, 5, 6]\`**

## Java Solution

See [\`BubbleSort.java\`](./BubbleSort.java).

\`\`\`java
public static int[] bubbleSort(int[] nums) {
    for (int end = nums.length - 1; end > 0; end--) {
        boolean swapped = false;
        for (int i = 0; i < end; i++) {
            if (nums[i] > nums[i + 1]) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return nums;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) worst, O(n) best | n(n−1)/2 comparisons; a sorted array exits after the first pass |
| **Space** | O(1) | Only a counter and a swap |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Make it stable."* → bubble sort already is: equal elements are only swapped when
  \`>\` is true, never when they are equal.
- *"Why is it O(n²) when merge sort is O(n log n)?"* → bubble sort only knows how to
  move an element by **one position per pass**, so it needs O(n) passes.
- *"How would you detect that the array is already sorted?"* → the \`swapped\` flag.
- *"Can you make it faster?"* → cocktail shaker sort (bidirectional) or a
  "last swap position" optimisation that shrinks the pass boundary.

**Common mistakes:**
- ❌ Running the inner loop to \`n - 1\` on **every** pass → O(n²) even when sorted,
  and the last element is compared with a non-existent neighbour.
- ❌ Swapping when \`nums[i] >= nums[i + 1]\` → the sort is no longer stable.
- ❌ Forgetting the **early exit** → you always pay the full O(n²).
- ❌ Swapping \`nums[i]\` and \`nums[i+1]\` **after** incrementing \`i\` → off-by-one.

**How to narrate:**
> "Bubble sort makes repeated passes and swaps adjacent elements that are out of
> order. After each pass the largest remaining element is in its final position, so
> the next pass is one element shorter. I also keep a flag: if a pass performs no
> swap at all, the array is already sorted and I stop early. Worst case O(n²), best
> case O(n), and it's in place."

## Related Problems

- [Selection Sort](../../../../../../docs/topics/08-sorting.md) — the same O(n²), but only one swap per pass
- [Insertion Sort](../../../../../../docs/topics/08-sorting.md) — O(n²) but linear on nearly sorted data
- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — the practical O(n log n) comparison sort
`,i=[`bubbleSort`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};