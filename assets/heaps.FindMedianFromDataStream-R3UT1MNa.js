var e=`heaps.FindMedianFromDataStream`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;
import com.dsa.utils.MinHeap;

/**
 * Problem: Find Median from Data Stream
 * LeetCode: 295 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Two heaps, Order statistics
 *
 * <p>Problem:
 * Support adding numbers to a stream and reporting the **median** of all the numbers
 * added so far, in O(1) amortised time per operation.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * v0 v1 ... v(n-1)
 * </pre>
 * {@code n} is the number of values; the n values are inserted one by one, in the order
 * they are read.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1.0
 * 1.5
 * 2.0
 * 2.5
 * 3.0
 * </pre>
 *
 * <p>Approach: keep two heaps — a max-heap {@code lower} with the smaller half of the
 * values and a min-heap {@code upper} with the larger half. {@code lower} always holds
 * either the same number of elements as {@code upper} or exactly one more, so the median
 * is either {@code lower}'s maximum or the average of the two heap tops.
 *
 * <p>Complexity: Time O(log n) per insertion, O(1) per median, Space O(n).
 */
public class FindMedianFromDataStream {

    /** A median finder backed by two heaps. */
    public static class MedianFinder {

        /** The smaller half — its maximum is the lower median. */
        private final MaxHeap<Integer> lower = new MaxHeap<>();

        /** The larger half — its minimum is the upper median. */
        private final MinHeap<Integer> upper = new MinHeap<>();

        /** Adds one number to the stream. */
        public void addNum(int value) {
            lower.add(value);
            upper.add(lower.poll());
            if (upper.size() > lower.size()) {
                lower.add(upper.poll());
            }
        }

        /** The median of everything added so far. */
        public double findMedian() {
            if (lower.isEmpty()) {
                throw new IllegalStateException("no numbers added yet");
            }
            if (lower.size() > upper.size()) {
                return lower.peek();
            }
            return (lower.peek() + upper.peek()) / 2.0;
        }

        /** The median formatted as {@code X.0} or {@code X.5}. */
        public String medianText() {
            double median = findMedian();
            if (median == Math.floor(median) && !Double.isInfinite(median)) {
                return ((long) median) + ".0";
            }
            return String.valueOf(median);
        }

        /** Debug helper: the lower half, largest first. */
        public String lowerState() {
            return lower.asList().toString();
        }

        /** Debug helper: the upper half, smallest first. */
        public String upperState() {
            return upper.asList().toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        MedianFinder finder = new MedianFinder();
        for (int i = 0; i < n; i++) {
            finder.addNum(fs.nextInt());
            System.out.println(finder.medianText());
        }
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
 * Problem: Find Median from Data Stream
 * LeetCode: 295 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Two heaps, Order statistics
 *
 * <p>Problem:
 * Support adding numbers to a stream and reporting the **median** of all the numbers
 * added so far, in O(1) amortised time per operation.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * v0 v1 ... v(n-1)
 * </pre>
 * {@code n} is the number of values; the n values are inserted one by one, in the order
 * they are read.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1.0
 * 1.5
 * 2.0
 * 2.5
 * 3.0
 * </pre>
 *
 * <p>Approach: keep two heaps — a max-heap {@code lower} with the smaller half of the
 * values and a min-heap {@code upper} with the larger half. {@code lower} always holds
 * either the same number of elements as {@code upper} or exactly one more, so the median
 * is either {@code lower}'s maximum or the average of the two heap tops.
 *
 * <p>Complexity: Time O(log n) per insertion, O(1) per median, Space O(n).
 */
public class Main {

    /** A median finder backed by two heaps. */
    public static class MedianFinder {

        /** The smaller half — its maximum is the lower median. */
        private final MaxHeap<Integer> lower = new MaxHeap<>();

        /** The larger half — its minimum is the upper median. */
        private final MinHeap<Integer> upper = new MinHeap<>();

        /** Adds one number to the stream. */
        public void addNum(int value) {
            lower.add(value);
            upper.add(lower.poll());
            if (upper.size() > lower.size()) {
                lower.add(upper.poll());
            }
        }

        /** The median of everything added so far. */
        public double findMedian() {
            if (lower.isEmpty()) {
                throw new IllegalStateException("no numbers added yet");
            }
            if (lower.size() > upper.size()) {
                return lower.peek();
            }
            return (lower.peek() + upper.peek()) / 2.0;
        }

        /** The median formatted as {@code X.0} or {@code X.5}. */
        public String medianText() {
            double median = findMedian();
            if (median == Math.floor(median) && !Double.isInfinite(median)) {
                return ((long) median) + ".0";
            }
            return String.valueOf(median);
        }

        /** Debug helper: the lower half, largest first. */
        public String lowerState() {
            return lower.asList().toString();
        }

        /** Debug helper: the upper half, smallest first. */
        public String upperState() {
            return upper.asList().toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        MedianFinder finder = new MedianFinder();
        for (int i = 0; i < n; i++) {
            finder.addNum(fs.nextInt());
            System.out.println(finder.medianText());
        }
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
# Find Median from Data Stream — LeetCode 295

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Heap · Two heaps · Order statistics |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg, Pinterest |

## Problem Statement

Support adding numbers to a stream and report the **median** of all the numbers added so
far, in constant time per query.

- An odd number of values → the middle value.
- An even number of values → the average of the two middle values.
- Every insertion must be O(log n) and every query O(1).

## Input Format

The program reads from standard input:

\`\`\`
n
v0 v1 ... v(n-1)
\`\`\`

- \`n\` — the number of values (1 ≤ n ≤ 10⁵)
- the n values, inserted in the order they are read

The program prints the median **after every insertion**, one per line. A median that is
an integer is printed as \`X.0\`, a half-integer as \`X.5\`.

## Sample Input

\`\`\`
5
1 2 3 4 5
\`\`\`

## Expected Output

\`\`\`
1.0
1.5
2.0
2.5
3.0
\`\`\`

## Approach — Two heaps, one partition

The median is the boundary between the smaller half and the larger half. So we keep the
values split across two heaps:

- **\`lower\`** — a **max**-heap with the smaller half. Its maximum is the lower median.
- **\`upper\`** — a **min**-heap with the larger half. Its minimum is the upper median.

Two invariants make the median a one-liner:

1. every value in \`lower\` is \`≤\` every value in \`upper\`;
2. \`lower\` holds either the same number of elements as \`upper\`, or exactly one more.

Then:

- odd count → \`lower\` is bigger by one → the median is \`lower.peek()\`;
- even count → the two heaps have the same size → the median is
  \`(lower.peek() + upper.peek()) / 2\`.

**Insertion** keeps both invariants with three moves:

1. push the new value into \`lower\` and immediately move \`lower\`'s maximum to \`upper\` —
   that guarantees the new value never sits above a bigger value in \`upper\`;
2. if \`upper\` ends up bigger than \`lower\`, move \`upper\`'s minimum into \`lower\`.

Both moves are O(log n).

## Dry Run

Input: \`1 2 3 4 5\`

\`lower\` is a max-heap (its root is the largest of the lower half), \`upper\` is a min-heap.

| Step | inserted | \`lower\` after | \`upper\` after | median |
|---:|---:|---|---|---|
| 1 | 1 | \`[1]\` | \`[]\` | \`1.0\` (odd → lower's max) |
| 2 | 2 | \`[1]\` | \`[2]\` | \`1.5\` (even → (1+2)/2) |
| 3 | 3 | \`[2, 1]\` | \`[3]\` | \`2.0\` (odd → lower's max) |
| 4 | 4 | \`[2, 1]\` | \`[3, 4]\` | \`2.5\` (even → (2+3)/2) |
| 5 | 5 | \`[3, 1, 2]\` | \`[4, 5]\` | \`3.0\` (odd → lower's max) |

Step 3 is the interesting one: \`3\` is inserted into \`lower\`, but \`lower\`'s maximum (\`3\`)
is immediately moved to \`upper\`, so the lower half stays the smaller one and keeps the
extra element. Step 4 repeats the pattern with \`4\`.

## Java Solution

See [\`FindMedianFromDataStream.java\`](./FindMedianFromDataStream.java).

\`\`\`java
public void addNum(int value) {
    lower.add(value);
    upper.add(lower.poll());
    if (upper.size() > lower.size()) {
        lower.add(upper.poll());
    }
}

public double findMedian() {
    if (lower.size() > upper.size()) {
        return lower.peek();
    }
    return (lower.peek() + upper.peek()) / 2.0;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) per insertion, O(1) per median | two heap operations per insertion |
| **Space** | O(n) | every value is stored exactly once |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if you also need the 90th percentile?"* → keep the two heaps and walk the
  percentile down into \`lower\`; the order statistics of a stream are available for free
  from the partition.
- *"What if values can be removed?"* → a plain heap cannot remove an arbitrary element;
  use a lazy-deletion heap (a map of pending deletions) or a balanced tree.
- *"What if the stream is huge and the values are approximate?"* → t-digest or
  KLL sketches give quantiles in constant memory.
- *"Why two heaps instead of one sorted list?"* → inserting into a sorted array is O(n);
  the heap gives O(log n) inserts and O(1) median.

**Common mistakes:**
- ❌ Putting the new value into the **wrong** half → the partition invariant breaks and
  the median is wrong as soon as the two halves are interleaved wrongly.
- ❌ Forgetting the **rebalance** step → the two halves drift apart in size and the
  median ends up in the wrong heap.
- ❌ Averaging with integer division → \`(1 + 2) / 2\` is \`1\`, not \`1.5\`.
- ❌ Returning \`upper.peek()\` for the odd case → the odd case is the *extra* element in
  \`lower\`.

**How to narrate:**
> "The median is the boundary between the smaller and the larger half, so I split the
> stream in two: a max-heap for the lower half and a min-heap for the upper half. Two
> invariants: everything in the lower half is at most everything in the upper half, and
> the lower half has the same size or one more. To insert, I push into the lower half,
> move its maximum up to the upper half, and rebalance if the upper half grew too big.
> The median is then either the lower heap's max or the average of the two tops."

## Related Problems

- [Median of Two Sorted Arrays](MedianOfTwoSortedArrays.md) — the same question, static input
- [Design a Min Queue](../queues/MinQueue.md) — a running minimum in a queue
- [K Closest Elements](KClosestElements.md) — order statistics on a sorted array
- [Top K Frequent Elements](TopKFrequentElements.md) — a bounded heap
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};