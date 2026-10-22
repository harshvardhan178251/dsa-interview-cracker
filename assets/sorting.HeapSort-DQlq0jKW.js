var e=`sorting.HeapSort`,t=`package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Heap Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Heap, In-place sorting
 *
 * <p>Problem: Sort an array of integers in ascending order with heap sort and return
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
 * <p>Approach: build a max heap in place, then repeatedly move the root (the largest
 * element) to the end of the unsorted region and restore the heap property by
 * sifting the new root down.
 *
 * <p>Complexity: Time O(n log n), Space O(1).
 */
public class HeapSort {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] heapSort(int[] nums) {
        int n = nums.length;

        // Build the max heap: every internal node is sifted down, from bottom to top.
        for (int i = n / 2 - 1; i >= 0; i--) {
            siftDown(nums, i, n);
        }

        // Move the maximum to the back, then repair the heap.
        for (int end = n - 1; end > 0; end--) {
            swap(nums, 0, end);
            siftDown(nums, 0, end);
        }
        return nums;
    }

    /**
     * Restores the max heap property by moving the value at {@code root} down until
     * both of its children are smaller than it.
     *
     * @param nums the heap
     * @param root the index to start from
     * @param size the number of elements that belong to the heap
     */
    private static void siftDown(int[] nums, int root, int size) {
        while (true) {
            int largest = root;
            int left = 2 * root + 1;
            int right = 2 * root + 2;

            if (left < size && nums[left] > nums[largest]) {
                largest = left;
            }
            if (right < size && nums[right] > nums[largest]) {
                largest = right;
            }
            if (largest == root) {
                return; // the heap property holds here
            }
            swap(nums, root, largest);
            root = largest;
        }
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

        int[] sorted = heapSort(nums);

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
 * Problem: Heap Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Heap, In-place sorting
 *
 * <p>Problem: Sort an array of integers in ascending order with heap sort and return
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
 * <p>Approach: build a max heap in place, then repeatedly move the root (the largest
 * element) to the end of the unsorted region and restore the heap property by
 * sifting the new root down.
 *
 * <p>Complexity: Time O(n log n), Space O(1).
 */
public class Main {

    /**
     * Sorts {@code nums} in ascending order, in place.
     *
     * @param nums the array to sort
     * @return the same array, sorted
     */
    public static int[] heapSort(int[] nums) {
        int n = nums.length;

        // Build the max heap: every internal node is sifted down, from bottom to top.
        for (int i = n / 2 - 1; i >= 0; i--) {
            siftDown(nums, i, n);
        }

        // Move the maximum to the back, then repair the heap.
        for (int end = n - 1; end > 0; end--) {
            swap(nums, 0, end);
            siftDown(nums, 0, end);
        }
        return nums;
    }

    /**
     * Restores the max heap property by moving the value at {@code root} down until
     * both of its children are smaller than it.
     *
     * @param nums the heap
     * @param root the index to start from
     * @param size the number of elements that belong to the heap
     */
    private static void siftDown(int[] nums, int root, int size) {
        while (true) {
            int largest = root;
            int left = 2 * root + 1;
            int right = 2 * root + 2;

            if (left < size && nums[left] > nums[largest]) {
                largest = left;
            }
            if (right < size && nums[right] > nums[largest]) {
                largest = right;
            }
            if (largest == root) {
                return; // the heap property holds here
            }
            swap(nums, root, largest);
            root = largest;
        }
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

        int[] sorted = heapSort(nums);

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
# Heap Sort

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · In-place sorting |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Sort an array of integers in ascending order using **heap sort** and print the
result.

- The algorithm builds a max heap and then repeatedly extracts the maximum.
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

## Approach — Heap in place, then extract the root

The array itself is the heap: the children of index \`i\` live at \`2i + 1\` and
\`2i + 2\`.

**Phase 1 — build a max heap.** Start at the last internal node (\`n / 2 - 1\`) and
sift every node **down** to its place. Working from the bottom up means every
subtree below a node is already a valid heap when it is sifted.

**Phase 2 — extract.** The root of a max heap is the largest element. Swap it with
the last element of the heap, shrink the heap by one, and sift the new root back
down. The sorted region at the back of the array grows by one every round.

## Dry Run

Input: \`nums = [5, 2, 4, 6, 1]\` (n = 5)

Heap layout (indices):

\`\`\`
          0
        /   \\
       1     2
      / \\
     3   4
\`\`\`

### Phase 1 — build the max heap, nodes 1 and 0 (the last internal node is \`5/2 - 1 = 1\`)

**Sift down node 1** (value \`2\`; children \`nums[3] = 6\` and \`nums[4] = 1\`)

| Step | root | left | right | largest | action | array |
|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 3 (6) | 4 (1) | 3 | \`6 > 2\` → swap(1, 3) | \`[5, 6, 4, 2, 1]\` |
| 2 | 3 | 7 (–) | 8 (–) | 3 | both children out of range → stop | \`[5, 6, 4, 2, 1]\` |

**Sift down node 0** (value \`5\`; children \`nums[1] = 6\` and \`nums[2] = 4\`)

| Step | root | left | right | largest | action | array |
|---:|---:|---:|---:|---:|---|---|
| 3 | 0 | 1 (6) | 2 (4) | 1 | \`6 > 5\` → swap(0, 1) | \`[6, 5, 4, 2, 1]\` |
| 4 | 1 | 3 (2) | 4 (1) | 1 | neither child is larger → stop | \`[6, 5, 4, 2, 1]\` |

The heap is now \`[6, 5, 4, 2, 1]\` — every parent is larger than its children.

### Phase 2 — extract the maximum five times

| Round | \`end\` | action | array after the swap | sift down | array after the sift |
|---:|---:|---|---|---|---|
| 1 | 4 | \`swap(0, 4)\` → 6 to the back | \`[1, 5, 4, 2, 6]\` | root 0: child \`5\` is larger → swap(0,1); then stop | \`[5, 1, 4, 2, 6]\` |
| 2 | 3 | \`swap(0, 3)\` → 5 to the back | \`[2, 1, 4, 5, 6]\` | root 0: child \`4\` (index 2) is larger → swap(0,2); then stop | \`[4, 1, 2, 5, 6]\` |
| 3 | 2 | \`swap(0, 2)\` → 4 to the back | \`[2, 1, 4, 5, 6]\` | root 0: child \`1\` is not larger → stop | \`[2, 1, 4, 5, 6]\` |
| 4 | 1 | \`swap(0, 1)\` → 2 to the back | \`[1, 2, 4, 5, 6]\` | root 0: heap size is 1 → stop | \`[1, 2, 4, 5, 6]\` |

Final array: **\`[1, 2, 4, 5, 6]\`**

## Java Solution

See [\`HeapSort.java\`](./HeapSort.java).

\`\`\`java
public static int[] heapSort(int[] nums) {
    int n = nums.length;
    for (int i = n / 2 - 1; i >= 0; i--) {
        siftDown(nums, i, n);
    }
    for (int end = n - 1; end > 0; end--) {
        swap(nums, 0, end);
        siftDown(nums, 0, end);
    }
    return nums;
}

private static void siftDown(int[] nums, int root, int size) {
    while (true) {
        int largest = root;
        int left = 2 * root + 1;
        int right = 2 * root + 2;
        if (left < size && nums[left] > nums[largest]) {
            largest = left;
        }
        if (right < size && nums[right] > nums[largest]) {
            largest = right;
        }
        if (largest == root) {
            return;
        }
        swap(nums, root, largest);
        root = largest;
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | Building the heap is O(n), each of the n extractions is O(log n) |
| **Space** | O(1) | The heap *is* the array — no extra storage at all |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Build a heap from a stream of numbers."* → push each number into a heap; that is
  O(n log n), while heapify-ing an array is O(n).
- *"Why is building the heap O(n)?"* → most nodes are near the bottom and sift only
  a little; the sum of the work over all levels is a convergent series.
- *"Find the k-th largest element."* → use a min heap of size k, or quickselect
  (O(n) average).
- *"Is it stable?"* → **no**.

**Common mistakes:**
- ❌ Building the heap from the **last element** instead of the last **internal**
  node (\`n / 2 - 1\`) → leaves the structure broken.
- ❌ Sifting **up** instead of down when building a max heap.
- ❌ Forgetting to shrink the heap size after the swap → the element that was just
  placed at the end is sifted back into the heap.
- ❌ Using \`>=\` in the "is the right child larger" test → the heap property still
  holds, but the sift behaves differently; \`>\` is the standard choice.

**How to narrate:**
> "Heap sort stores the heap inside the array itself — children of i are at 2i+1 and
> 2i+2. First I heapify from the last internal node down to the root, which builds a
> max heap in O(n). Then I repeatedly swap the root with the last element of the heap,
> shrink the heap by one and sift the root back down. Each extraction costs O(log n),
> so the whole thing is O(n log n) with O(1) extra space — better than merge sort on
> space, worse on stability."

## Related Problems

- [Merge Sort](../../../../../../docs/topics/08-sorting.md) — O(n log n) but needs O(n) space and is stable
- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — usually faster in practice
- [Counting Sort](../../../../../../docs/topics/08-sorting.md) — O(n) when the value range is small
`,i=[`heapSort`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};