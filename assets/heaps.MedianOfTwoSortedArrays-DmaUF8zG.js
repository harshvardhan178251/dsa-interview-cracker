var e=`heaps.MedianOfTwoSortedArrays`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: Median of Two Sorted Arrays
 * LeetCode: 4 | Difficulty: Hard | Frequency: 5/5
 * Pattern: K-way merge, Bounded heap, Order statistics
 *
 * <p>Problem:
 * Given two sorted integer arrays {@code nums1} and {@code nums2}, return the median of
 * the combined arrays.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * nums1[0] nums1[1] ... nums1[m-1]
 * n
 * nums2[0] nums2[1] ... nums2[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 1 3
 * 1
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2.0
 * </pre>
 *
 * <p>Approach: the two arrays are merged with two pointers and the merged values are fed
 * into a max-heap that is capped at {@code k = (m + n + 1) / 2}. The heap keeps the k
 * smallest values, so its maximum is the kth smallest value of the union; the first value
 * that overflowed the heap is the (k+1)th smallest. The median is that value alone for
 * an odd total and the average of the two for an even total.
 *
 * <p>Complexity: Time O((m + n) log k), Space O(k).
 */
public class MedianOfTwoSortedArrays {

    /**
     * Returns the median of the two sorted arrays.
     *
     * @param nums1 the first sorted array
     * @param nums2 the second sorted array
     * @return the median of the union
     */
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1 == null ? 0 : nums1.length;
        int n = nums2 == null ? 0 : nums2.length;
        if (m + n == 0) {
            throw new IllegalArgumentException("both arrays are empty");
        }

        int total = m + n;
        int k = (total + 1) / 2;

        // The heap keeps the k smallest values of the merged sequence.
        MaxHeap<Integer> kSmallest = new MaxHeap<>();
        Integer overflow = null;
        int i = 0;
        int j = 0;
        while (i < m || j < n) {
            int value;
            if (j >= n || (i < m && nums1[i] <= nums2[j])) {
                value = nums1[i++];
            } else {
                value = nums2[j++];
            }
            kSmallest.add(value);
            if (kSmallest.size() > k) {
                if (overflow == null) {
                    // The first value that leaves the heap is the (k+1)th smallest.
                    overflow = kSmallest.poll();
                } else {
                    kSmallest.poll();
                }
            }
        }

        int kth = kSmallest.peek();
        if (total % 2 == 1) {
            return kth;
        }
        return (kth + overflow) / 2.0;
    }

    /** Formats a median as {@code X.0} or {@code X.5}. */
    public static String formatMedian(double median) {
        if (median == Math.floor(median) && !Double.isInfinite(median)) {
            return ((long) median) + ".0";
        }
        return String.valueOf(median);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();
        int[] nums1 = fs.nextIntArray(m);
        int n = fs.nextInt();
        int[] nums2 = fs.nextIntArray(n);

        System.out.println(formatMedian(findMedianSortedArrays(nums1, nums2)));
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
 * Problem: Median of Two Sorted Arrays
 * LeetCode: 4 | Difficulty: Hard | Frequency: 5/5
 * Pattern: K-way merge, Bounded heap, Order statistics
 *
 * <p>Problem:
 * Given two sorted integer arrays {@code nums1} and {@code nums2}, return the median of
 * the combined arrays.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * nums1[0] nums1[1] ... nums1[m-1]
 * n
 * nums2[0] nums2[1] ... nums2[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 1 3
 * 1
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2.0
 * </pre>
 *
 * <p>Approach: the two arrays are merged with two pointers and the merged values are fed
 * into a max-heap that is capped at {@code k = (m + n + 1) / 2}. The heap keeps the k
 * smallest values, so its maximum is the kth smallest value of the union; the first value
 * that overflowed the heap is the (k+1)th smallest. The median is that value alone for
 * an odd total and the average of the two for an even total.
 *
 * <p>Complexity: Time O((m + n) log k), Space O(k).
 */
public class Main {

    /**
     * Returns the median of the two sorted arrays.
     *
     * @param nums1 the first sorted array
     * @param nums2 the second sorted array
     * @return the median of the union
     */
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1 == null ? 0 : nums1.length;
        int n = nums2 == null ? 0 : nums2.length;
        if (m + n == 0) {
            throw new IllegalArgumentException("both arrays are empty");
        }

        int total = m + n;
        int k = (total + 1) / 2;

        // The heap keeps the k smallest values of the merged sequence.
        MaxHeap<Integer> kSmallest = new MaxHeap<>();
        Integer overflow = null;
        int i = 0;
        int j = 0;
        while (i < m || j < n) {
            int value;
            if (j >= n || (i < m && nums1[i] <= nums2[j])) {
                value = nums1[i++];
            } else {
                value = nums2[j++];
            }
            kSmallest.add(value);
            if (kSmallest.size() > k) {
                if (overflow == null) {
                    // The first value that leaves the heap is the (k+1)th smallest.
                    overflow = kSmallest.poll();
                } else {
                    kSmallest.poll();
                }
            }
        }

        int kth = kSmallest.peek();
        if (total % 2 == 1) {
            return kth;
        }
        return (kth + overflow) / 2.0;
    }

    /** Formats a median as {@code X.0} or {@code X.5}. */
    public static String formatMedian(double median) {
        if (median == Math.floor(median) && !Double.isInfinite(median)) {
            return ((long) median) + ".0";
        }
        return String.valueOf(median);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();
        int[] nums1 = fs.nextIntArray(m);
        int n = fs.nextInt();
        int[] nums2 = fs.nextIntArray(n);

        System.out.println(formatMedian(findMedianSortedArrays(nums1, nums2)));
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
# Median of Two Sorted Arrays — LeetCode 4

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Heap · K-way merge · Order statistics · Binary search |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg, Apple |

## Problem Statement

Given two sorted integer arrays \`nums1\` and \`nums2\`, return the **median** of the
combined arrays. The arrays may have different lengths and either of them may be empty.

- An odd total → the middle value.
- An even total → the average of the two middle values.

## Input Format

The program reads from standard input:

\`\`\`
m
nums1[0] nums1[1] ... nums1[m-1]
n
nums2[0] nums2[1] ... nums2[n-1]
\`\`\`

- \`m\` — the length of the first array (0 ≤ m ≤ 1000)
- the m values of the first array, in ascending order
- \`n\` — the length of the second array (0 ≤ n ≤ 1000)
- the n values of the second array, in ascending order

The median is printed as \`X.0\` when it is a whole number and as \`X.5\` otherwise.

## Sample Input

\`\`\`
2
1 3
1
2
\`\`\`

## Expected Output

\`\`\`
2.0
\`\`\`

The combined array is \`[1, 2, 3]\` — three values, so the median is the middle one.

## Approach — Merge with two pointers, select with a bounded heap

The median of \`m + n\` values is the k-th smallest, with \`k = (m + n + 1) / 2\` (1-based).
So the question is: **what is the k-th smallest value of the union of two sorted
arrays?**

Step 1 — **merge** the two arrays with two pointers. Because both are sorted, the merged
sequence comes out in order without sorting anything.

Step 2 — **select** the k-th value with a bounded max-heap. Feed the merged values into
a max-heap that is capped at \`k\` elements; the heap then holds the k smallest values, so
its maximum is the k-th smallest. The first value that overflows the heap is the
(k+1)-th smallest — that is the second value needed for an even total.

\`\`\`
merged value → push into the heap
if the heap holds k + 1 values:
    the first value popped out is the (k+1)-th smallest → remember it
    pop again to keep the heap at k values
\`\`\`

**Why the *first* popped value is the (k+1)-th smallest:** the values arrive in
non-decreasing order, so the first time the heap holds k + 1 values, its maximum is the
largest of the first k + 1 values — which is exactly the (k+1)-th smallest of the whole
union.

## Dry Run

Input: \`nums1 = [1, 3]\`, \`nums2 = [2]\`, \`m + n = 3\`, \`k = 2\`

| Step | merged value | heap after insert | size | action | heap after action | \`(k+1)\`-th |
|---:|---:|---|---:|---|---|---|
| 1 | 1 | \`[1]\` | 1 | keep | \`[1]\` | — |
| 2 | 2 | \`[2, 1]\` | 2 | keep | \`[2, 1]\` | — |
| 3 | 3 | \`[3, 2, 1]\` | 3 | **pop the maximum \`3\`** | \`[2, 1]\` | \`3\` |

The total is odd, so the median is the k-th smallest: the heap's maximum is \`2\` ✓

For an even total the same run also yields the (k+1)-th smallest, and the median is
\`(kth + (k+1)th) / 2\`.

## Java Solution

See [\`MedianOfTwoSortedArrays.java\`](./MedianOfTwoSortedArrays.java).

\`\`\`java
MaxHeap<Integer> kSmallest = new MaxHeap<>();
Integer overflow = null;
int i = 0;
int j = 0;
while (i < m || j < n) {
    int value;
    if (j >= n || (i < m && nums1[i] <= nums2[j])) {
        value = nums1[i++];
    } else {
        value = nums2[j++];
    }
    kSmallest.add(value);
    if (kSmallest.size() > k) {
        if (overflow == null) {
            overflow = kSmallest.poll();
        } else {
            kSmallest.poll();
        }
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O((m + n) log k) | one heap operation per merged value |
| **Space** | O(k) | the heap holds at most k values |

**Better:** the classic optimal solution is **binary search on the partition** — cut
\`nums1\` after \`i\` elements and \`nums2\` after \`j\` elements so that the left half contains
\`k\` elements and every left value is \`≤\` every right value. The cut is found by binary
searching the smaller array: **O(log(min(m, n)))** time, O(1) space.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What is the optimal solution?"* → binary search on the partition of the two arrays.
- *"What if the arrays were not sorted?"* → sort (or quickselect) the union first.
- *"Can you do it in O(1) space?"* → yes, with the partition binary search.
- *"Why is the heap-based merge not the intended answer?"* → it is O(n log k) instead of
  O(log n); the sortedness is meant to be exploited.

**Common mistakes:**
- ❌ Using \`>=\` in the merge comparison inconsistently → duplicates are fine, but the
  index arithmetic must still be right.
- ❌ Forgetting that for an **even** total the second middle value is the (k+1)-th
  smallest, not the (k+2)-th.
- ❌ Using integer division for the average → \`(2 + 3) / 2\` must be \`2.5\`.
- ❌ Assuming both arrays are non-empty → one of them may be empty.

**How to narrate:**
> "The median is an order statistic: the k-th smallest of the union. I merge the two
> sorted arrays with two pointers — no sorting needed — and feed the merged values into
> a max-heap capped at k. The heap's maximum is the k-th smallest, and the first value
> that overflows the heap is the (k+1)-th, which I need for an even total. That's
> O(n log k). The optimal solution binary searches the partition point instead, which
> is O(log min(m, n))."

## Related Problems

- [Find Median from Data Stream](FindMedianFromDataStream.md) — the streaming version
- [Kth Smallest Element in a Sorted Matrix](KthSmallestElement.md) — the same order statistic
- [Merge k Sorted Lists](MergeKSortedLists.md) — the same merge machinery
- [K Closest Elements](KClosestElements.md) — order statistics by distance
`,i=[`findMedianSortedArrays`,`formatMedian`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};