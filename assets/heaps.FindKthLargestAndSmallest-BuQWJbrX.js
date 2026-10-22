var e=`heaps.FindKthLargestAndSmallest`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;
import com.dsa.utils.MinHeap;

/**
 * Problem: Find Kth Largest and Kth Smallest
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bounded heap, Twin top-K selection
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, report both the kth
 * largest and the kth smallest element (duplicates count separately).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 9 4 7 1 8 3 6
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * 4
 * </pre>
 *
 * <p>Approach: two bounded heaps are filled in the same pass. A min-heap of size k keeps
 * the k largest values (its minimum is the kth largest); a max-heap of size k keeps the
 * k smallest values (its maximum is the kth smallest). Each overflow discards exactly
 * the element that cannot belong to the answer.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class FindKthLargestAndSmallest {

    /**
     * Returns the kth largest and the kth smallest element of {@code nums}.
     *
     * @param nums the input array
     * @param k    the rank, 1-based, counting duplicates separately
     * @return {@code {kthLargest, kthSmallest}}, or {@code {-1, -1}} when {@code k} is
     *         out of range
     */
    public static int[] findKthLargestAndSmallest(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return new int[]{-1, -1};
        }

        MinHeap<Integer> largest = new MinHeap<>();
        MaxHeap<Integer> smallest = new MaxHeap<>();

        for (int value : nums) {
            largest.add(value);
            if (largest.size() > k) {
                largest.poll();
            }
            smallest.add(value);
            if (smallest.size() > k) {
                smallest.poll();
            }
        }
        return new int[]{largest.peek(), smallest.peek()};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = findKthLargestAndSmallest(nums, k);
        System.out.println(answer[0]);
        System.out.println(answer[1]);
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
 * Problem: Find Kth Largest and Kth Smallest
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bounded heap, Twin top-K selection
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, report both the kth
 * largest and the kth smallest element (duplicates count separately).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 9 4 7 1 8 3 6
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * 4
 * </pre>
 *
 * <p>Approach: two bounded heaps are filled in the same pass. A min-heap of size k keeps
 * the k largest values (its minimum is the kth largest); a max-heap of size k keeps the
 * k smallest values (its maximum is the kth smallest). Each overflow discards exactly
 * the element that cannot belong to the answer.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class Main {

    /**
     * Returns the kth largest and the kth smallest element of {@code nums}.
     *
     * @param nums the input array
     * @param k    the rank, 1-based, counting duplicates separately
     * @return {@code {kthLargest, kthSmallest}}, or {@code {-1, -1}} when {@code k} is
     *         out of range
     */
    public static int[] findKthLargestAndSmallest(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return new int[]{-1, -1};
        }

        MinHeap<Integer> largest = new MinHeap<>();
        MaxHeap<Integer> smallest = new MaxHeap<>();

        for (int value : nums) {
            largest.add(value);
            if (largest.size() > k) {
                largest.poll();
            }
            smallest.add(value);
            if (smallest.size() > k) {
                smallest.poll();
            }
        }
        return new int[]{largest.peek(), smallest.peek()};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = findKthLargestAndSmallest(nums, k);
        System.out.println(answer[0]);
        System.out.println(answer[1]);
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
# Find Kth Largest and Kth Smallest

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · Top-K · Twin bounded heaps |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Given an integer array \`nums\` and an integer \`k\`, report **both** the kth largest and the
kth smallest element. Duplicates count separately.

For \`nums = [9, 4, 7, 1, 8, 3, 6]\` and \`k = 3\`:

- sorted ascending: \`[1, 3, 4, 6, 7, 8, 9]\` → the 3rd smallest is \`4\`
- sorted descending: \`[9, 8, 7, 6, 4, 3, 1]\` → the 3rd largest is \`7\`

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
k
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers
- \`k\` — the rank, 1-based, counting duplicates separately (1 ≤ k ≤ n)

## Sample Input

\`\`\`
7
9 4 7 1 8 3 6
3
\`\`\`

## Expected Output

\`\`\`
7
4
\`\`\`

The first line is the kth largest element, the second line the kth smallest element.

## Approach — Two bounded heaps in one pass

Both answers come from the same idea, and both can be computed in a **single pass**:

| Answer | Heap | Kept elements | The answer is |
|---|---|---|---|
| kth largest | **min**-heap of size k | the k largest values | the heap's minimum |
| kth smallest | **max**-heap of size k | the k smallest values | the heap's maximum |

For every value: push it into both heaps and, in each heap, drop the extreme element if
the size grew past \`k\`. The two heaps mirror each other — one throws away its smallest,
the other its largest.

## Dry Run

Input: \`nums = [9, 4, 7, 1, 8, 3, 6]\`, \`k = 3\`

| Step | value | kth-largest heap (min-heap) | kth-smallest heap (max-heap) |
|---:|---:|---|---|
| 1 | 9 | \`[9]\` | \`[9]\` |
| 2 | 4 | \`[4, 9]\` | \`[9, 4]\` |
| 3 | 7 | \`[4, 9, 7]\` | \`[9, 4, 7]\` |
| 4 | 1 | \`[4, 9, 7]\` — dropped \`1\` | \`[7, 4, 1]\` |
| 5 | 8 | \`[7, 8, 9]\` — dropped \`4\` | \`[7, 4, 1]\` — dropped \`8\` |
| 6 | 3 | \`[7, 8, 9]\` — dropped \`3\` | \`[4, 3, 1]\` — dropped \`7\` |
| 7 | 6 | \`[7, 8, 9]\` — dropped \`6\` | \`[4, 3, 1]\` — dropped \`6\` |

- kth largest = the min-heap's minimum = \`7\` ✓
- kth smallest = the max-heap's maximum = \`4\` ✓

Both heaps now hold exactly the three values that matter, and every later value was
rejected by both.

## Java Solution

See [\`FindKthLargestAndSmallest.java\`](./FindKthLargestAndSmallest.java).

\`\`\`java
MinHeap<Integer> largest = new MinHeap<>();
MaxHeap<Integer> smallest = new MaxHeap<>();

for (int value : nums) {
    largest.add(value);
    if (largest.size() > k) {
        largest.poll();
    }
    smallest.add(value);
    if (smallest.size() > k) {
        smallest.poll();
    }
}
return new int[]{largest.peek(), smallest.peek()};
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | two heap operations per element |
| **Space** | O(k) | the two heaps together hold 2k values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with one heap?"* → yes, for the kth largest; for the kth smallest you
  would need to reverse the ordering, which a second heap does for free.
- *"What if k is unknown but you need the whole order statistic spectrum?"* → use a
  balanced tree / order-statistic tree, or sort once and index.
- *"What if the array is 10 GB and does not fit in memory?"* → external sort, or a
  bounded heap per partition and a merge afterwards.
- *"How would you extend this to the median?"* → the median is the kth smallest with
  \`k = (n + 1) / 2\` — see [Find Median from Data Stream](FindMedianFromDataStream.md).

**Common mistakes:**
- ❌ Using the **same** heap kind for both answers → one of the two numbers is wrong.
- ❌ Polling **before** adding → the heap can drop below k elements.
- ❌ Assuming the two answers are symmetric — with duplicates they are not, e.g.
  \`nums = [2, 2, 2]\`, \`k = 2\` gives kth largest \`2\` and kth smallest \`2\`, but
  \`nums = [1, 2, 2]\`, \`k = 2\` gives kth largest \`2\` and kth smallest \`1\`.

**How to narrate:**
> "These are two instances of the same pattern, so I can solve both in one pass. A
> min-heap of size k keeps the k largest values, so its minimum is the kth largest; a
> max-heap of size k keeps the k smallest values, so its maximum is the kth smallest.
> Each time a heap overflows I drop its extreme element. O(n log k) time, O(k) space."

## Related Problems

- [Kth Largest Element in an Array](KthLargestElement.md) — one of the two
- [Kth Smallest Element in a Sorted Matrix](KthSmallestElement.md) — the other one
- [Top K Frequent Elements](TopKFrequentElements.md) — bounded heap, different ranking
- [Find Median from Data Stream](FindMedianFromDataStream.md) — order statistics under a stream
`,i=[`findKthLargestAndSmallest`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};