var e=`heaps.KClosestElements`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: K Closest Elements
 * LeetCode: 658 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bounded heap, Distance ranking
 *
 * <p>Problem:
 * Given a sorted integer array {@code nums} and an integer {@code k}, return the k
 * elements of {@code nums} that are closest to {@code x}. The result is printed in
 * increasing order. When several elements are equally close, the smaller ones are kept.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * x
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 4 8 9 15 16
 * 4
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 8 9 15
 * </pre>
 *
 * <p>Approach: keep a max-heap of at most {@code k} elements ordered by distance to
 * {@code x}. When the heap overflows, its top — the farthest candidate — is discarded.
 * At the end the heap holds the k closest elements, which are printed in increasing order.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class KClosestElements {

    /**
     * Returns the k elements of {@code nums} closest to {@code x}.
     *
     * @param nums a sorted input array
     * @param k    how many elements to return
     * @param x    the target value
     * @return the closest elements in increasing order
     */
    public static int[] kClosestElements(int[] nums, int k, int x) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        // The heap is ordered by distance, so its top is the farthest candidate — the one
        // to throw away when the heap overflows. Ties keep the smaller value.
        MaxHeap<int[]> heap = new MaxHeap<int[]>((a, b) -> {
            int da = Math.abs(a[0] - x);
            int db = Math.abs(b[0] - x);
            if (da != db) {
                return Integer.compare(da, db);
            }
            return Integer.compare(a[0], b[0]);
        });

        for (int value : nums) {
            heap.add(new int[]{value});
            if (heap.size() > k) {
                heap.poll();
            }
        }

        int[] answer = new int[heap.size()];
        int i = 0;
        for (int[] entry : heap.asList()) {
            answer[i++] = entry[0];
        }
        java.util.Arrays.sort(answer);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();
        int x = fs.nextInt();

        int[] answer = kClosestElements(nums, k, x);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
        }
        System.out.println(sb);
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
 * Problem: K Closest Elements
 * LeetCode: 658 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bounded heap, Distance ranking
 *
 * <p>Problem:
 * Given a sorted integer array {@code nums} and an integer {@code k}, return the k
 * elements of {@code nums} that are closest to {@code x}. The result is printed in
 * increasing order. When several elements are equally close, the smaller ones are kept.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * x
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 4 8 9 15 16
 * 4
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 8 9 15
 * </pre>
 *
 * <p>Approach: keep a max-heap of at most {@code k} elements ordered by distance to
 * {@code x}. When the heap overflows, its top — the farthest candidate — is discarded.
 * At the end the heap holds the k closest elements, which are printed in increasing order.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class Main {

    /**
     * Returns the k elements of {@code nums} closest to {@code x}.
     *
     * @param nums a sorted input array
     * @param k    how many elements to return
     * @param x    the target value
     * @return the closest elements in increasing order
     */
    public static int[] kClosestElements(int[] nums, int k, int x) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        // The heap is ordered by distance, so its top is the farthest candidate — the one
        // to throw away when the heap overflows. Ties keep the smaller value.
        MaxHeap<int[]> heap = new MaxHeap<int[]>((a, b) -> {
            int da = Math.abs(a[0] - x);
            int db = Math.abs(b[0] - x);
            if (da != db) {
                return Integer.compare(da, db);
            }
            return Integer.compare(a[0], b[0]);
        });

        for (int value : nums) {
            heap.add(new int[]{value});
            if (heap.size() > k) {
                heap.poll();
            }
        }

        int[] answer = new int[heap.size()];
        int i = 0;
        for (int[] entry : heap.asList()) {
            answer[i++] = entry[0];
        }
        java.util.Arrays.sort(answer);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();
        int x = fs.nextInt();

        int[] answer = kClosestElements(nums, k, x);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
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
# K Closest Elements — LeetCode 658

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · Top-K · Distance ranking · Two pointers |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a **sorted** integer array \`nums\` and an integer \`k\`, return the \`k\` elements of
\`nums\` that are closest to \`x\`. The result is printed in increasing order.

For \`nums = [1, 2, 4, 8, 9, 15, 16]\`, \`k = 4\` and \`x = 10\` the distances are

| value | 1 | 2 | 4 | 8 | 9 | 15 | 16 |
|---|---|---|---|---|---|---|---|
| distance | 9 | 8 | 6 | 2 | 1 | 5 | 6 |

The four smallest distances belong to \`9\`, \`8\`, \`15\` and \`4\` (or \`16\` — a tie at
distance 6). The program keeps the **smaller** value on a tie, so the answer is
\`4 8 9 15\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
k
x
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers in **ascending** order
- \`k\` — how many elements to return (1 ≤ k ≤ n)
- \`x\` — the target value

## Sample Input

\`\`\`
7
1 2 4 8 9 15 16
4
10
\`\`\`

## Expected Output

\`\`\`
4 8 9 15
\`\`\`

## Approach — A bounded heap ordered by distance

The same bounded-heap trick as the top-K problems, but the ranking key is the
**distance to \`x\`** instead of the value itself.

Keep a **max-heap** of at most \`k\` elements ordered by distance:

1. Push the next value into the heap.
2. If the heap now holds more than \`k\` elements, remove its **maximum** — the farthest
   candidate, which cannot be among the k closest.

At the end the heap holds the k closest elements; they are sorted before printing.

**Why a max-heap?** The heap must give up its worst candidate, and the worst of the k
closest is the **farthest** one — the maximum distance. Ties are broken towards the
larger value, so the smaller one survives.

**Why not use the sortedness?** With a sorted array the answer is a **contiguous window**
of k elements, so binary searching for the best window start is O(log n) with O(1)
space — better than the heap. The heap version is the right answer when the array is
*not* sorted.

## Dry Run

Input: \`nums = [1, 2, 4, 8, 9, 15, 16]\`, \`k = 4\`, \`x = 10\`

The heap is printed as the values it holds; the root is the farthest candidate.

| Step | value | distance | heap after insert | action | heap after action |
|---:|---:|---:|---|---|---|
| 1 | 1 | 9 | \`[1]\` | keep | \`[1]\` |
| 2 | 2 | 8 | \`[1, 2]\` | keep | \`[1, 2]\` |
| 3 | 4 | 6 | \`[1, 2, 4]\` | keep | \`[1, 2, 4]\` |
| 4 | 8 | 2 | \`[1, 2, 4, 8]\` | keep | \`[1, 2, 4, 8]\` |
| 5 | 9 | 1 | \`[2, 8, 4, 9]\` | **pop the farthest (\`1\`, d = 9)** | \`[2, 8, 4, 9]\` |
| 6 | 15 | 5 | \`[4, 15, 8, 9]\` | **pop the farthest (\`2\`, d = 8)** | \`[4, 15, 8, 9]\` |
| 7 | 16 | 6 | \`[4, 15, 8, 9]\` | **pop the farthest (\`16\`, d = 6)** | \`[4, 15, 8, 9]\` |

Step 7 is the tie: \`4\` and \`16\` are both at distance 6, and the tie-break drops the
larger value, so \`4\` survives. Sorted, the answer is \`4 8 9 15\` ✓

## Java Solution

See [\`KClosestElements.java\`](./KClosestElements.java).

\`\`\`java
MaxHeap<int[]> heap = new MaxHeap<int[]>((a, b) -> {
    int da = Math.abs(a[0] - x);
    int db = Math.abs(b[0] - x);
    if (da != db) {
        return Integer.compare(da, db);
    }
    return Integer.compare(a[0], b[0]);
});

for (int value : nums) {
    heap.add(new int[]{value});
    if (heap.size() > k) {
        heap.poll();
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | one heap operation per element |
| **Space** | O(k) | only the k closest values are stored |

**Better (with the sorted input):** binary search for the window. Find the first index
\`i\` with \`nums[i] >= x\`; the best window starts at either \`i - k\` or \`i\`; compare the
window's two end distances and pick the better one — O(log n) time, O(1) space.

## Interview Notes

**Follow-ups to raise yourself:**
- *"The array is sorted — what is the optimal solution?"* → binary search for the window
  start, O(log n).
- *"What if the array is not sorted?"* → the bounded heap, O(n log k).
- *"What if x changes between queries?"* → with the sorted array, binary search again for
  each x; with the heap, rebuild it.
- *"How would you return the k closest in an unsorted array with duplicates?"* → the same
  heap; duplicates are separate candidates.

**Common mistakes:**
- ❌ Ordering the heap by **value** instead of distance → the heap keeps the k largest
  values, not the k closest.
- ❌ Forgetting that the answer is a **contiguous window** in a sorted array → the
  "k closest" set is always a window, which makes the binary search possible.
- ❌ Getting the tie-break wrong → with \`x = 10\` and \`k = 3\`, \`[1, 2, 3]\` and
  \`[2, 3, 4]\` are both "valid" only under the rule "keep the smaller values".

**How to narrate:**
> "With a heap: I keep a max-heap of size k ordered by distance to x. Whenever it
> overflows I drop its maximum — the farthest candidate, which cannot be in the answer.
> At the end I sort the k survivors. That's O(n log k). But the input is sorted, so the
> k closest elements must be a contiguous window, and I can binary search for the best
> window start in O(log n) with O(1) space."

## Related Problems

- [Kth Largest Element in an Array](KthLargestElement.md) — the same bounded heap
- [Top K Frequent Elements](TopKFrequentElements.md) — bounded heap by count
- [Median of Two Sorted Arrays](MedianOfTwoSortedArrays.md) — order statistics
- [Find Median from Data Stream](FindMedianFromDataStream.md) — order statistics under a stream
`,i=[`kClosestElements`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};