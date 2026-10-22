var e=`heaps.KthLargestElement`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MinHeap;

/**
 * Problem: Kth Largest Element in an Array
 * LeetCode: 215 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Bounded heap, Top-K selection
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the kth largest
 * element — the element at position k in the array sorted in descending order. Duplicates
 * count separately; it is <em>not</em> the kth distinct element.
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
 * 6
 * 3 2 1 5 6 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: keep a min-heap of at most {@code k} elements holding the k largest values
 * seen so far. When the heap grows beyond k, its smallest element is discarded — that
 * element can never be in the final k. At the end the heap's minimum is the kth largest
 * value.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class KthLargestElement {

    /**
     * Returns the kth largest element of {@code nums}.
     *
     * @param nums the input array
     * @param k    the rank, 1-based, counting duplicates separately
     * @return the kth largest value, or {@code -1} when {@code k} is out of range
     */
    public static int findKthLargest(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return -1;
        }

        // The heap keeps the k largest values: its minimum is the smallest of them,
        // so it is exactly the element to throw away when the heap overflows.
        MinHeap<Integer> topK = new MinHeap<>();
        for (int value : nums) {
            topK.add(value);
            if (topK.size() > k) {
                topK.poll();
            }
        }
        return topK.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(findKthLargest(nums, k));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Kth Largest Element in an Array
 * LeetCode: 215 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Bounded heap, Top-K selection
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the kth largest
 * element — the element at position k in the array sorted in descending order. Duplicates
 * count separately; it is <em>not</em> the kth distinct element.
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
 * 6
 * 3 2 1 5 6 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: keep a min-heap of at most {@code k} elements holding the k largest values
 * seen so far. When the heap grows beyond k, its smallest element is discarded — that
 * element can never be in the final k. At the end the heap's minimum is the kth largest
 * value.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class Main {

    /**
     * Returns the kth largest element of {@code nums}.
     *
     * @param nums the input array
     * @param k    the rank, 1-based, counting duplicates separately
     * @return the kth largest value, or {@code -1} when {@code k} is out of range
     */
    public static int findKthLargest(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return -1;
        }

        // The heap keeps the k largest values: its minimum is the smallest of them,
        // so it is exactly the element to throw away when the heap overflows.
        MinHeap<Integer> topK = new MinHeap<>();
        for (int value : nums) {
            topK.add(value);
            if (topK.size() > k) {
                topK.poll();
            }
        }
        return topK.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(findKthLargest(nums, k));
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
# Kth Largest Element in an Array — LeetCode 215

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · Top-K · Bounded heap |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg |

## Problem Statement

Given an integer array \`nums\` and an integer \`k\`, return the **kth largest** element —
the element at position \`k\` when the array is sorted in descending order.

- Duplicates count separately: for \`nums = [3, 3, 1]\` and \`k = 2\` the answer is \`3\`, not
  the second *distinct* value.
- \`1 ≤ k ≤ nums.length\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
k
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers
- \`k\` — the rank, 1-based, counting duplicates separately

## Sample Input

\`\`\`
6
3 2 1 5 6 4
2
\`\`\`

## Expected Output

\`\`\`
5
\`\`\`

Sorted in descending order the array is \`[6, 5, 4, 3, 2, 1]\`, so the second largest
element is \`5\`.

## Approach — A min-heap of size k

The full sort is O(n log n) and throws away everything except the answer. The insight is
that we only ever need the **k largest** values, and everything smaller can be discarded
the moment we see it.

Keep a **min-heap** holding at most \`k\` elements:

1. Push the next value into the heap.
2. If the heap now holds more than \`k\` elements, remove its **minimum**.

The heap's minimum is the smallest of the k largest values seen so far — exactly the
value that can no longer belong to the answer. After the whole array is processed, the
heap contains the k largest values and its minimum is the kth largest.

**Why a min-heap and not a max-heap?** The heap must be able to give up its *worst*
element quickly, and the worst element of the k largest is the smallest of them — the
minimum. A max-heap would hand out the largest value, which is the one we want to keep.

## Dry Run

Input: \`nums = [3, 2, 1, 5, 6, 4]\`, \`k = 2\`

The heap array is printed as it is stored (index 0 is the root = the heap's minimum).

| Step | value | heap after insert | heap size | action | heap after action |
|---:|---:|---|---:|---|---|
| 1 | 3 | \`[3]\` | 1 | keep | \`[3]\` |
| 2 | 2 | \`[2, 3]\` | 2 | keep | \`[2, 3]\` |
| 3 | 1 | \`[1, 2, 3]\` | 3 | **pop the minimum \`1\`** | \`[2, 3]\` |
| 4 | 5 | \`[3, 5, 2]\` | 3 | **pop the minimum \`2\`** | \`[3, 5]\` |
| 5 | 6 | \`[5, 6, 3]\` | 3 | **pop the minimum \`3\`** | \`[5, 6]\` |
| 6 | 4 | \`[4, 5, 6]\` | 3 | **pop the minimum \`4\`** | \`[5, 6]\` |

The final heap is \`[5, 6]\`: its minimum \`5\` is the second largest element of the array ✓

## Java Solution

See [\`KthLargestElement.java\`](./KthLargestElement.java).

\`\`\`java
MinHeap<Integer> topK = new MinHeap<>();
for (int value : nums) {
    topK.add(value);
    if (topK.size() > k) {
        topK.poll();
    }
}
return topK.peek();
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | one heap operation per element, the heap never exceeds k + 1 elements |
| **Space** | O(k) | only the k largest values are stored |

**Better?** The heap is O(n log k); the theoretical optimum is O(n) expected time using
quickselect (choose the pivot so that the kth largest lands in place, then recurse on one
side). Quickselect is faster but mutates the array and is randomised, so the heap is the
safer interview answer.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is a stream and k changes?"* → keep the bounded heap and rebalance
  when \`k\` grows or shrinks; shrinking means dropping the extra elements.
- *"What if you need the k largest of 10 million numbers on disk?"* → external memory:
  keep a bounded heap of size k while streaming the file once — the same algorithm, only
  the source changes.
- *"What if the values are not comparable with \`<\` but with a custom key?"* → the heap
  takes a \`Comparator\`, so the ordering is injected rather than hard-coded.
- *"What about the kth largest in a stream with duplicates?"* → the heap keeps duplicates
  as separate entries, which is exactly the LeetCode semantics.

**Common mistakes:**
- ❌ Using a **max**-heap of size k and popping the maximum → that keeps the k *smallest*
  values and answers a different question.
- ❌ Popping **before** inserting → the heap can end up with k − 1 elements and the
  minimum is then not the kth largest.
- ❌ Forgetting that duplicates count → the "kth distinct element" reading gives a
  different answer for \`[3, 3, 1]\`, \`k = 2\`.

**How to narrate:**
> "Sorting is O(n log n) but I only need the top k. I'll keep a min-heap of size k: push
> every value and, whenever the heap overflows, drop its minimum — that minimum is the
> smallest of the k largest so far, so it can never be in the answer. At the end the
> heap's minimum is the kth largest. That's O(n log k) time and O(k) space."

## Related Problems

- [Kth Smallest Element in a Sorted Matrix](KthSmallestElement.md) — the mirror image
- [Find Kth Largest and Kth Smallest](FindKthLargestAndSmallest.md) — both at once
- [Top K Frequent Elements](TopKFrequentElements.md) — the same bounded heap
- [K Closest Elements](KClosestElements.md) — bounded heap by distance
`,i=[`findKthLargest`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};