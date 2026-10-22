var e=`heaps.TopKFrequentElements`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MinHeap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Top K Frequent Elements
 * LeetCode: 347 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Frequency counting, Bounded heap
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the k most
 * frequent elements. The answer is printed in decreasing frequency; elements with the
 * same frequency are printed in increasing value order.
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
 * 1 1 1 2 2 3
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * </pre>
 *
 * <p>Approach: count the occurrences of every value, then push the distinct values into a
 * min-heap ordered by frequency. When the heap holds more than k elements its top — the
 * least frequent of the candidates — is discarded. At the end the heap holds the k most
 * frequent values.
 *
 * <p>Complexity: Time O(n log k), Space O(n) for the frequency map plus O(k) for the heap.
 */
public class TopKFrequentElements {

    /**
     * Returns the k most frequent elements of {@code nums}.
     *
     * @param nums the input array
     * @param k    how many elements to report
     * @return the elements ordered by decreasing frequency, ties by increasing value
     */
    public static int[] topKFrequentElements(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        Map<Integer, Integer> frequency = new HashMap<>();
        for (int value : nums) {
            frequency.merge(value, 1, Integer::sum);
        }

        // The heap's top is the *least* frequent candidate, so it is the one to drop.
        // Ties are broken by value: the larger value is dropped first, which keeps the
        // smaller values among equally frequent ones.
        MinHeap<int[]> heap = new MinHeap<int[]>((a, b) -> {
            if (a[1] != b[1]) {
                return Integer.compare(a[1], b[1]);
            }
            return Integer.compare(b[0], a[0]);
        });

        // Distinct values are inserted in increasing order so the trace is reproducible.
        List<Integer> values = new ArrayList<>(frequency.keySet());
        values.sort(Integer::compare);
        for (int value : values) {
            heap.add(new int[]{value, frequency.get(value)});
            if (heap.size() > k) {
                heap.poll();
            }
        }

        List<int[]> kept = heap.asList();
        kept.sort((a, b) -> {
            if (a[1] != b[1]) {
                return Integer.compare(b[1], a[1]);
            }
            return Integer.compare(a[0], b[0]);
        });

        int[] answer = new int[kept.size()];
        for (int i = 0; i < kept.size(); i++) {
            answer[i] = kept.get(i)[0];
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = topKFrequentElements(nums, k);
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
`,n=`import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;

/**
 * Problem: Top K Frequent Elements
 * LeetCode: 347 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Frequency counting, Bounded heap
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the k most
 * frequent elements. The answer is printed in decreasing frequency; elements with the
 * same frequency are printed in increasing value order.
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
 * 1 1 1 2 2 3
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * </pre>
 *
 * <p>Approach: count the occurrences of every value, then push the distinct values into a
 * min-heap ordered by frequency. When the heap holds more than k elements its top — the
 * least frequent of the candidates — is discarded. At the end the heap holds the k most
 * frequent values.
 *
 * <p>Complexity: Time O(n log k), Space O(n) for the frequency map plus O(k) for the heap.
 */
public class Main {

    /**
     * Returns the k most frequent elements of {@code nums}.
     *
     * @param nums the input array
     * @param k    how many elements to report
     * @return the elements ordered by decreasing frequency, ties by increasing value
     */
    public static int[] topKFrequentElements(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        Map<Integer, Integer> frequency = new HashMap<>();
        for (int value : nums) {
            frequency.merge(value, 1, Integer::sum);
        }

        // The heap's top is the *least* frequent candidate, so it is the one to drop.
        // Ties are broken by value: the larger value is dropped first, which keeps the
        // smaller values among equally frequent ones.
        MinHeap<int[]> heap = new MinHeap<int[]>((a, b) -> {
            if (a[1] != b[1]) {
                return Integer.compare(a[1], b[1]);
            }
            return Integer.compare(b[0], a[0]);
        });

        // Distinct values are inserted in increasing order so the trace is reproducible.
        List<Integer> values = new ArrayList<>(frequency.keySet());
        values.sort(Integer::compare);
        for (int value : values) {
            heap.add(new int[]{value, frequency.get(value)});
            if (heap.size() > k) {
                heap.poll();
            }
        }

        List<int[]> kept = heap.asList();
        kept.sort((a, b) -> {
            if (a[1] != b[1]) {
                return Integer.compare(b[1], a[1]);
            }
            return Integer.compare(a[0], b[0]);
        });

        int[] answer = new int[kept.size()];
        for (int i = 0; i < kept.size(); i++) {
            answer[i] = kept.get(i)[0];
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = topKFrequentElements(nums, k);
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
# Top K Frequent Elements — LeetCode 347

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Heap · Top-K · Frequency counting |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Airbnb |

## Problem Statement

Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements.

For \`nums = [1, 1, 1, 2, 2, 3]\` the frequencies are \`1 → 3\`, \`2 → 2\`, \`3 → 1\`, so the two
most frequent elements are \`1\` and \`2\`.

The program prints the elements in **decreasing frequency**; elements with the same
frequency are printed in **increasing value** order (any order is accepted by the
judge, this one is simply deterministic).

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
k
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers
- \`k\` — how many elements to report (1 ≤ k ≤ number of distinct values)

## Sample Input

\`\`\`
6
1 1 1 2 2 3
2
\`\`\`

## Expected Output

\`\`\`
1 2
\`\`\`

## Approach — Count, then keep a bounded heap

Two steps:

1. **Count** the occurrences of every value with a hash map. This is O(n) expected.
2. **Select** the k highest counts with a min-heap ordered by frequency.

The heap holds at most \`k\` candidates. When it overflows, its **top — the least frequent
candidate — is discarded**, because it cannot belong to the top k. At the end the heap
contains exactly the k most frequent values.

**Why a min-heap?** Again the heap must give up its worst candidate, and the worst of
the k most frequent is the one with the **smallest** count.

The candidates are inserted in increasing value order, so the trace is reproducible; the
final answer is sorted by decreasing frequency.

## Dry Run

Input: \`nums = [1, 1, 1, 2, 2, 3]\`, \`k = 2\`

Frequencies: \`1 → 3\`, \`2 → 2\`, \`3 → 1\`. The heap is printed as \`value x count\`.

| Step | candidate | heap after insert | size | action | heap after action |
|---:|---|---|---:|---|---|
| 1 | \`1 x3\` | \`[1x3]\` | 1 | keep | \`[1x3]\` |
| 2 | \`2 x2\` | \`[2x2, 1x3]\` | 2 | keep | \`[2x2, 1x3]\` |
| 3 | \`3 x1\` | \`[3x1, 2x2, 1x3]\` | 3 | **pop the least frequent (\`3x1\`)** | \`[2x2, 1x3]\` |

The final heap holds \`1\` (count 3) and \`2\` (count 2) → printed as \`1 2\` ✓

## Java Solution

See [\`TopKFrequentElements.java\`](./TopKFrequentElements.java).

\`\`\`java
MinHeap<int[]> heap = new MinHeap<int[]>((a, b) -> {
    if (a[1] != b[1]) {
        return Integer.compare(a[1], b[1]);
    }
    return Integer.compare(b[0], a[0]);
});

for (int value : values) {
    heap.add(new int[]{value, frequency.get(value)});
    if (heap.size() > k) {
        heap.poll();
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | counting is O(n), the heap work is O(d log k) with d distinct values |
| **Space** | O(n) | the frequency map holds every distinct value; the heap holds k of them |

**Better?** Bucket sort: count the frequencies, put the values into \`frequency → list\`
buckets, and walk the buckets from the highest frequency down — **O(n)** time. The heap
is O(n log k) but needs no extra bucket array.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(n)?"* → yes, bucket sort by frequency.
- *"What if the stream never ends?"* → the frequency map grows; a Space-Saving /
  heavy-hitters algorithm (Misra–Gries) keeps the k most frequent with O(k) memory.
- *"What if the values are strings?"* → the same, the map and the heap work with any key
  that has a stable ordering.
- *"What if k is 1?"* → just return the most frequent value; the heap degenerates to a
  single-element max-heap of counts.

**Common mistakes:**
- ❌ Using a **max**-heap ordered by count → it would keep the *least* frequent values.
- ❌ Confusing "k most frequent **distinct** values" with "the k values that appear most
  often" → the first asks for distinct values, the second may repeat one value.
- ❌ Forgetting that the map's iteration order is arbitrary → the answer would be
  non-deterministic; sorting the candidates fixes it.

**How to narrate:**
> "First I count the occurrences with a hash map — O(n). Then I need the k highest
> counts, which is a bounded-heap problem: a min-heap ordered by count holds at most k
> candidates, and when it overflows I drop its minimum, the least frequent candidate.
> The final heap holds the k most frequent elements. If I want O(n) instead of O(n log
> k), I bucket the values by frequency and walk the buckets from the top."

## Related Problems

- [Kth Largest Element in an Array](KthLargestElement.md) — the same bounded heap
- [Find Kth Largest and Kth Smallest](FindKthLargestAndSmallest.md) — two bounded heaps
- [K Closest Elements](KClosestElements.md) — bounded heap by distance
- [Group Anagrams](../hashing/GroupAnagrams.md) — grouping with a canonical key
`,i=[`topKFrequentElements`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};