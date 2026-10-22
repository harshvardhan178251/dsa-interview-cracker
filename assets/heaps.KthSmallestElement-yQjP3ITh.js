var e=`heaps.KthSmallestElement`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: Kth Smallest Element in a Sorted Matrix
 * LeetCode: 378 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bounded heap, Top-K selection
 *
 * <p>Problem:
 * Given an {@code n x n} matrix where every row is sorted in non-decreasing order, return
 * the kth smallest element of the whole matrix (counting duplicates separately).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * row0[0] row0[1] ... row0[n-1]
 * row1[0] row1[1] ... row1[n-1]
 * ...
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 5 9
 * 10 11 13
 * 12 13 15
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 13
 * </pre>
 *
 * <p>Approach: keep a max-heap of at most {@code k} elements holding the k smallest values
 * seen so far. When the heap overflows, its largest element is discarded. At the end the
 * heap's maximum is the kth smallest value.
 *
 * <p>Complexity: Time O(n² log k), Space O(k).
 */
public class KthSmallestElement {

    /**
     * Returns the kth smallest element of a row-sorted matrix.
     *
     * @param matrix the input matrix (may be ragged)
     * @param k      the rank, 1-based, counting duplicates separately
     * @return the kth smallest value, or {@code -1} when {@code k} is out of range
     */
    public static int findKthSmallest(int[][] matrix, int k) {
        if (matrix == null || k <= 0) {
            return -1;
        }

        // The heap keeps the k smallest values: its maximum is the largest of them,
        // so it is exactly the element to throw away when the heap overflows.
        MaxHeap<Integer> topK = new MaxHeap<>();
        int total = 0;
        for (int[] row : matrix) {
            for (int value : row) {
                total++;
                topK.add(value);
                if (topK.size() > k) {
                    topK.poll();
                }
            }
        }
        if (total < k) {
            return -1;
        }
        return topK.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] matrix = new int[n][];
        for (int i = 0; i < n; i++) {
            matrix[i] = fs.nextIntArray(n);
        }
        int k = fs.nextInt();

        System.out.println(findKthSmallest(matrix, k));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Kth Smallest Element in a Sorted Matrix
 * LeetCode: 378 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bounded heap, Top-K selection
 *
 * <p>Problem:
 * Given an {@code n x n} matrix where every row is sorted in non-decreasing order, return
 * the kth smallest element of the whole matrix (counting duplicates separately).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * row0[0] row0[1] ... row0[n-1]
 * row1[0] row1[1] ... row1[n-1]
 * ...
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 5 9
 * 10 11 13
 * 12 13 15
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 13
 * </pre>
 *
 * <p>Approach: keep a max-heap of at most {@code k} elements holding the k smallest values
 * seen so far. When the heap overflows, its largest element is discarded. At the end the
 * heap's maximum is the kth smallest value.
 *
 * <p>Complexity: Time O(n² log k), Space O(k).
 */
public class Main {

    /**
     * Returns the kth smallest element of a row-sorted matrix.
     *
     * @param matrix the input matrix (may be ragged)
     * @param k      the rank, 1-based, counting duplicates separately
     * @return the kth smallest value, or {@code -1} when {@code k} is out of range
     */
    public static int findKthSmallest(int[][] matrix, int k) {
        if (matrix == null || k <= 0) {
            return -1;
        }

        // The heap keeps the k smallest values: its maximum is the largest of them,
        // so it is exactly the element to throw away when the heap overflows.
        MaxHeap<Integer> topK = new MaxHeap<>();
        int total = 0;
        for (int[] row : matrix) {
            for (int value : row) {
                total++;
                topK.add(value);
                if (topK.size() > k) {
                    topK.poll();
                }
            }
        }
        if (total < k) {
            return -1;
        }
        return topK.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] matrix = new int[n][];
        for (int i = 0; i < n; i++) {
            matrix[i] = fs.nextIntArray(n);
        }
        int k = fs.nextInt();

        System.out.println(findKthSmallest(matrix, k));
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

// ---------- inlined com.dsa.utils.MaxHeap ----------
/**
 * Array-backed binary max-heap.
 *
 * <p>Mirrors {@link MinHeap} with reversed ordering.
 *
 * @param <T> element type
 */
class MaxHeap<T> extends MinHeap<T> {

    public MaxHeap() {
        super((a, b) -> compareNatural(b, a));
    }

    public MaxHeap(Comparator<? super T> comparator) {
        super((a, b) -> comparator.compare(b, a));
    }

    /** Largest element without removing it. */
    @Override
    public T peek() {
        return heap.get(0);
    }

    /** Removes and returns the largest element. */
    @Override
    public T poll() {
        T top = heap.get(0);
        int last = heap.size() - 1;
        heap.set(0, heap.get(last));
        heap.remove(last);
        if (!heap.isEmpty()) {
            siftDown(0);
        }
        return top;
    }
}

// ---------- inlined com.dsa.utils.MinHeap ----------
/**
 * Array-backed binary min-heap.
 *
 * <p>Used by the priority-queue problems (top-K, streaming median, merge-K) so the
 * heap mechanics stay visible instead of being hidden behind {@code PriorityQueue}.
 *
 * @param <T> element type
 */
class MinHeap<T> {

    protected final List<T> heap;
    protected final Comparator<? super T> comparator;

    /** Natural ordering. */
    @SuppressWarnings("unchecked")
    public MinHeap() {
        this.comparator = (a, b) -> ((Comparable<Object>) a).compareTo(b);
        this.heap = new ArrayList<>();
    }

    public MinHeap(Comparator<? super T> comparator) {
        this.comparator = comparator;
        this.heap = new ArrayList<>();
    }

    /**
     * Natural comparison helper, usable from subclasses that need the reverse order.
     */
    @SuppressWarnings("unchecked")
    protected static <T> int compareNatural(T a, T b) {
        return ((Comparable<Object>) a).compareTo(b);
    }

    /** Builds a heap from an existing collection in O(n). */
    public MinHeap(List<T> items, Comparator<? super T> comparator) {
        this.comparator = comparator;
        this.heap = new ArrayList<>(items);
        for (int i = heap.size() / 2 - 1; i >= 0; i--) {
            siftDown(i);
        }
    }

    public void add(T item) {
        heap.add(item);
        siftUp(heap.size() - 1);
    }

    /** Smallest element without removing it. */
    public T peek() {
        return heap.get(0);
    }

    /** Removes and returns the smallest element. */
    public T poll() {
        T top = heap.get(0);
        int last = heap.size() - 1;
        heap.set(0, heap.get(last));
        heap.remove(last);
        if (!heap.isEmpty()) {
            siftDown(0);
        }
        return top;
    }

    public int size() {
        return heap.size();
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    /** Snapshot of the backing array (not a heap-ordered view). */
    public List<T> asList() {
        return new ArrayList<>(heap);
    }

    protected void siftUp(int index) {
        T item = heap.get(index);
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (comparator.compare(item, heap.get(parent)) >= 0) {
                break;
            }
            heap.set(index, heap.get(parent));
            index = parent;
        }
        heap.set(index, item);
    }

    protected void siftDown(int index) {
        int size = heap.size();
        T item = heap.get(index);
        while (true) {
            int left = 2 * index + 1;
            if (left >= size) {
                break;
            }
            int smaller = left;
            int right = left + 1;
            if (right < size && comparator.compare(heap.get(right), heap.get(left)) < 0) {
                smaller = right;
            }
            if (comparator.compare(item, heap.get(smaller)) <= 0) {
                break;
            }
            heap.set(index, heap.get(smaller));
            index = smaller;
        }
        heap.set(index, item);
    }
}
`,r=`
# Kth Smallest Element in a Sorted Matrix — LeetCode 378

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · Top-K · Bounded heap |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given an \`n x n\` matrix in which every row is sorted in non-decreasing order, return the
**kth smallest** element of the whole matrix. Duplicates count separately.

\`\`\`
1  5  9
10 11 13
12 13 15
\`\`\`

Flattened and sorted, the matrix is \`[1, 5, 9, 10, 11, 12, 13, 13, 15]\`, so with
\`k = 8\` the answer is the 8th value, \`13\`.

## Input Format

The program reads from standard input:

\`\`\`
n
row0[0] row0[1] ... row0[n-1]
row1[0] row1[1] ... row1[n-1]
...
k
\`\`\`

- \`n\` — the number of rows and columns (1 ≤ n ≤ 300)
- one line per row, n space-separated integers each
- \`k\` — the rank, 1-based, counting duplicates separately (1 ≤ k ≤ n²)

## Sample Input

\`\`\`
3
1 5 9
10 11 13
12 13 15
8
\`\`\`

## Expected Output

\`\`\`
13
\`\`\`

## Approach — A max-heap of size k

The row-sorted property is not even needed for this solution: flatten the matrix in your
head and apply the classic bounded-heap selection.

Keep a **max-heap** of at most \`k\` elements holding the k smallest values seen so far:

1. Push the next value into the heap.
2. If the heap now holds more than \`k\` elements, remove its **maximum**.

The heap's maximum is the largest of the k smallest values — exactly the value that can
no longer be in the answer. When the matrix is exhausted, the heap's maximum is the kth
smallest element.

**Why a max-heap and not a min-heap?** The heap must give up its *worst* candidate, and
the worst of the k smallest is the largest of them.

## Dry Run

Input: the matrix above, \`k = 8\`

The heap array is printed as it is stored (index 0 is the root = the heap's maximum).

| Step | value | heap after insert | size | action | heap after action |
|---:|---:|---|---:|---|---|
| 1 | 1 | \`[1]\` | 1 | keep | \`[1]\` |
| 2 | 5 | \`[5, 1]\` | 2 | keep | \`[5, 1]\` |
| 3 | 9 | \`[9, 1, 5]\` | 3 | keep | \`[9, 1, 5]\` |
| 4 | 10 | \`[10, 9, 5, 1]\` | 4 | keep | \`[10, 9, 5, 1]\` |
| 5 | 11 | \`[11, 10, 5, 1, 9]\` | 5 | keep | \`[11, 10, 5, 1, 9]\` |
| 6 | 13 | \`[13, 10, 11, 1, 9, 5]\` | 6 | keep | \`[13, 10, 11, 1, 9, 5]\` |
| 7 | 12 | \`[13, 10, 12, 1, 9, 5, 11]\` | 7 | keep | \`[13, 10, 12, 1, 9, 5, 11]\` |
| 8 | 13 | \`[13, 13, 12, 10, 9, 5, 11, 1]\` | 8 | keep | \`[13, 13, 12, 10, 9, 5, 11, 1]\` |
| 9 | 15 | \`[15, 13, 12, 10, 9, 5, 11, 1]\` | 9 | **pop the maximum \`15\`** | \`[13, 13, 12, 10, 9, 5, 11, 1]\` |

The heap ends with the eight smallest values and its maximum is \`13\` ✓

## Java Solution

See [\`KthSmallestElement.java\`](./KthSmallestElement.java).

\`\`\`java
MaxHeap<Integer> topK = new MaxHeap<>();
for (int[] row : matrix) {
    for (int value : row) {
        topK.add(value);
        if (topK.size() > k) {
            topK.poll();
        }
    }
}
return topK.peek();
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n² log k) | one heap operation per matrix element |
| **Space** | O(k) | only the k smallest values are stored |

**Better?** Yes — and this is where the sorted rows pay off. Because each row is sorted,
the answer is the largest value \`x\` such that **at least k** matrix entries are \`≤ x\`.
That count can be computed per candidate in O(n) (one binary search per row), and the
candidates themselves are binary-searched → **O(n log(max − min))** time, O(1) space.
For a \`300 x 300\` matrix the heap solution does 90 000 heap operations, while the value
binary search does about 30 · 300 = 9 000 comparisons.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you exploit the sorted rows?"* → binary search on the **value**: count how
  many entries are \`≤ x\` in O(n) and binary search the answer.
- *"What if the matrix were not square?"* → the same code works, the value binary search
  too.
- *"What if the rows were sorted but the columns were not?"* → the value binary search
  still works (only the rows matter).
- *"What if you could not hold the matrix in memory?"* → the heap solution streams the
  matrix row by row and only keeps k values; the value binary search needs random access.

**Common mistakes:**
- ❌ Using a **min**-heap of size k → it keeps the k largest values and answers the wrong
  question.
- ❌ Forgetting that the rows are 0-indexed in the code but 1-indexed in the statement →
  off-by-one on \`k\`.
- ❌ Assuming the matrix is fully sorted (it is only sorted **per row**) → a merge of the
  rows is *not* sorted overall.

**How to narrate:**
> "The simplest correct solution is a bounded heap: a max-heap of size k over all n²
> values, dropping the maximum whenever it overflows. The final maximum is the kth
> smallest. But since the rows are sorted, I can do better: binary search on the value —
> for a candidate x, count the entries that are ≤ x with one binary search per row, and
> find the smallest x whose count reaches k. That's O(n log range) instead of O(n² log k)."

## Related Problems

- [Kth Largest Element in an Array](KthLargestElement.md) — the mirror image
- [Find Kth Largest and Kth Smallest](FindKthLargestAndSmallest.md) — both at once
- [K Closest Elements](KClosestElements.md) — bounded heap by distance
- [Merge k Sorted Lists](MergeKSortedLists.md) — a heap over sorted inputs
`,i=[`findKthSmallest`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};