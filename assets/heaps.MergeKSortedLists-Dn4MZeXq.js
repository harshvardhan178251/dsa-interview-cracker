var e=`heaps.MergeKSortedLists`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;
import com.dsa.utils.MinHeap;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Merge k Sorted Lists
 * LeetCode: 23 | Difficulty: Hard | Frequency: 4/5
 * Pattern: K-way merge, Bounded heap
 *
 * <p>Problem:
 * Given k sorted singly linked lists, return one sorted linked list that contains every
 * node of the input lists.
 *
 * <p>Input format (stdin):
 * <pre>
 * k
 * m1 v1 v2 ... vm1
 * m2 v1 v2 ... vm2
 * ...
 * </pre>
 * {@code k} is the number of lists; each following line describes one list — its length
 * followed by that many values in ascending order. A length of 0 means an empty list.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4 1 4 5 6
 * 3 1 3 4
 * 2 2 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2 3 4 4 5 6 6
 * </pre>
 *
 * <p>Approach: put the head of every non-empty list into a min-heap. Repeatedly take the
 * smallest node out of the heap, emit its value and push its successor. The heap always
 * holds at most one "current" node per list, so it is the frontier of a k-way merge.
 *
 * <p>Complexity: Time O(N log k) with N total nodes, Space O(k).
 */
public class MergeKSortedLists {

    /**
     * Merges {@code lists} into one sorted list.
     *
     * @param lists the heads of the sorted lists; {@code null} entries are skipped
     * @return the head of the merged list, or {@code null} when everything is empty
     */
    public static ListNode mergeKSortedLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        MinHeap<ListNode> heap = new MinHeap<ListNode>(Comparator.comparingInt((ListNode node) -> node.val));
        for (ListNode head : lists) {
            if (head != null) {
                heap.add(head);
            }
        }

        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            tail.next = node;
            tail = node;
            if (node.next != null) {
                heap.add(node.next);
            }
        }
        tail.next = null;
        return dummy.next;
    }

    /** Flattens the merged list into an array of values. */
    public static int[] mergeToArray(ListNode[] lists) {
        ListNode merged = mergeKSortedLists(lists);
        return merged == null ? new int[0] : merged.toArray();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int k = fs.nextInt();

        ListNode[] lists = new ListNode[k];
        for (int i = 0; i < k; i++) {
            int m = fs.nextInt();
            int[] values = fs.nextIntArray(m);
            lists[i] = ListNode.fromArray(values);
        }

        int[] merged = mergeToArray(lists);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < merged.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(merged[i]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Merge k Sorted Lists
 * LeetCode: 23 | Difficulty: Hard | Frequency: 4/5
 * Pattern: K-way merge, Bounded heap
 *
 * <p>Problem:
 * Given k sorted singly linked lists, return one sorted linked list that contains every
 * node of the input lists.
 *
 * <p>Input format (stdin):
 * <pre>
 * k
 * m1 v1 v2 ... vm1
 * m2 v1 v2 ... vm2
 * ...
 * </pre>
 * {@code k} is the number of lists; each following line describes one list — its length
 * followed by that many values in ascending order. A length of 0 means an empty list.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4 1 4 5 6
 * 3 1 3 4
 * 2 2 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2 3 4 4 5 6 6
 * </pre>
 *
 * <p>Approach: put the head of every non-empty list into a min-heap. Repeatedly take the
 * smallest node out of the heap, emit its value and push its successor. The heap always
 * holds at most one "current" node per list, so it is the frontier of a k-way merge.
 *
 * <p>Complexity: Time O(N log k) with N total nodes, Space O(k).
 */
public class Main {

    /**
     * Merges {@code lists} into one sorted list.
     *
     * @param lists the heads of the sorted lists; {@code null} entries are skipped
     * @return the head of the merged list, or {@code null} when everything is empty
     */
    public static ListNode mergeKSortedLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        MinHeap<ListNode> heap = new MinHeap<ListNode>(Comparator.comparingInt((ListNode node) -> node.val));
        for (ListNode head : lists) {
            if (head != null) {
                heap.add(head);
            }
        }

        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            tail.next = node;
            tail = node;
            if (node.next != null) {
                heap.add(node.next);
            }
        }
        tail.next = null;
        return dummy.next;
    }

    /** Flattens the merged list into an array of values. */
    public static int[] mergeToArray(ListNode[] lists) {
        ListNode merged = mergeKSortedLists(lists);
        return merged == null ? new int[0] : merged.toArray();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int k = fs.nextInt();

        ListNode[] lists = new ListNode[k];
        for (int i = 0; i < k; i++) {
            int m = fs.nextInt();
            int[] values = fs.nextIntArray(m);
            lists[i] = ListNode.fromArray(values);
        }

        int[] merged = mergeToArray(lists);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < merged.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(merged[i]);
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

// ---------- inlined com.dsa.utils.ListNode ----------
/**
 * Singly linked list node used across the linked-list problems.
 */
class ListNode {

    public int val;
    public ListNode next;

    public ListNode() {
    }

    public ListNode(int val) {
        this.val = val;
    }

    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }

    /** Builds a chain from the given values, e.g. {@code ListNode.of(1, 2, 3)}. */
    public static ListNode of(int... values) {
        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        for (int v : values) {
            tail.next = new ListNode(v);
            tail = tail.next;
        }
        return dummy.next;
    }

    /** Builds a chain from an array; {@code null} for a null input. */
    public static ListNode fromArray(int[] values) {
        if (values == null) {
            return null;
        }
        return of(values);
    }

    /** Flattens the chain into an array (ignores any cycle). */
    public int[] toArray() {
        int[] out = new int[size()];
        ListNode cur = this;
        for (int i = 0; cur != null && i < out.length; i++) {
            out[i] = cur.val;
            cur = cur.next;
        }
        return out;
    }

    public int size() {
        int n = 0;
        for (ListNode cur = this; cur != null; cur = cur.next) {
            n++;
        }
        return n;
    }

    @Override
    public String toString() {
        return Arrays.toString(toArray());
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
# Merge k Sorted Lists — LeetCode 23

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Heap · K-way merge · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, LinkedIn |

## Problem Statement

Given \`k\` sorted singly linked lists, return one list that contains all the nodes of the
input lists in sorted order.

\`\`\`
List 1: 1 → 4 → 5 → 6
List 2: 1 → 3 → 4
List 3: 2 → 6
\`\`\`

Merged: \`1 → 1 → 2 → 3 → 4 → 4 → 5 → 6 → 6\`

## Input Format

The program reads from standard input:

\`\`\`
k
m1 v1 v2 ... vm1
m2 v1 v2 ... vm2
...
\`\`\`

- \`k\` — the number of lists (1 ≤ k ≤ 10³)
- one line per list: its length \`mi\` followed by its \`mi\` values in ascending order
- a length of \`0\` means an empty list

The program prints the merged values, separated by single spaces, on one line.

## Sample Input

\`\`\`
3
4 1 4 5 6
3 1 3 4
2 2 6
\`\`\`

## Expected Output

\`\`\`
1 1 2 3 4 4 5 6 6
\`\`\`

## Approach — The heap is the frontier of a k-way merge

Merging **two** sorted lists is a classic two-pointer walk. Merging **k** lists with the
same idea would need k pointers and a scan of k candidates per output element — O(k) per
element, O(Nk) in total.

A heap fixes that: keep the **current head of every list** in a min-heap. The heap's
minimum is the smallest value that has not been emitted yet.

1. Push the head of every non-empty list into the heap.
2. Pop the smallest node, append it to the output, and push its successor.
3. Repeat until the heap is empty.

The heap never holds more than one node per list, so it is exactly the set of "candidates
for the next output value".

**Why it is correct:** at every moment the heap contains the smallest not-yet-emitted
element of every list. The smallest of those is the smallest not-yet-emitted element of
the whole merge.

## Dry Run

Input: three lists \`[1,4,5,6]\`, \`[1,3,4]\`, \`[2,6]\`

The heap holds the **values** of the nodes it contains — one per list that still has
unemitted nodes.

| Step | heap before | popped | pushed back | heap after | emitted |
|---:|---|---:|---|---|---|
| 0 | — | — | 1, 1, 2 | \`[1, 1, 2]\` | — |
| 1 | \`[1, 1, 2]\` | 1 (list 1) | 4 | \`[1, 2, 4]\` | \`1\` |
| 2 | \`[1, 2, 4]\` | 1 (list 2) | 3 | \`[2, 4, 3]\` | \`1\` |
| 3 | \`[2, 4, 3]\` | 2 (list 3) | 6 | \`[3, 4, 6]\` | \`2\` |
| 4 | \`[3, 4, 6]\` | 3 (list 2) | 4 | \`[4, 6, 4]\` | \`3\` |
| 5 | \`[4, 6, 4]\` | 4 (list 1) | 5 | \`[4, 6, 5]\` | \`4\` |
| 6 | \`[4, 6, 5]\` | 4 (list 2) | — | \`[5, 6]\` | \`4\` |
| 7 | \`[5, 6]\` | 5 (list 1) | 6 | \`[6, 6]\` | \`5\` |
| 8 | \`[6, 6]\` | 6 (list 1) | — | \`[6]\` | \`6\` |
| 9 | \`[6]\` | 6 (list 3) | — | \`[]\` | \`6\` |

Every emitted value is the smallest value still hidden in one of the lists ✓

## Java Solution

See [\`MergeKSortedLists.java\`](./MergeKSortedLists.java).

\`\`\`java
MinHeap<ListNode> heap = new MinHeap<ListNode>(Comparator.comparingInt((ListNode node) -> node.val));
for (ListNode head : lists) {
    if (head != null) {
        heap.add(head);
    }
}

ListNode dummy = new ListNode();
ListNode tail = dummy;
while (!heap.isEmpty()) {
    ListNode node = heap.poll();
    tail.next = node;
    tail = node;
    if (node.next != null) {
        heap.add(node.next);
    }
}
tail.next = null;
return dummy.next;
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(N log k) | one heap push and one pop per node, N nodes in total |
| **Space** | O(k) | the heap holds at most one node per list |

**Alternatives:** dividing the lists in half and merging pairwise is also
O(N log k) time with O(1) extra space — a good follow-up answer when the interviewer
wants you to avoid the heap.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it without a heap?"* → yes, divide and conquer: merge the lists pairwise,
  halving the number of lists each round — O(N log k) time, O(1) space.
- *"What if the lists are not sorted?"* → nothing helps: you need a full sort, O(N log N).
- *"What if the merge has to be lazy / streaming?"* → the heap version is naturally
  streaming: it emits values one at a time and only holds k nodes.
- *"How would you merge k sorted files from disk?"* → the same k-way merge with a heap of
  file readers — that is literally how \`sort\` works in Unix.

**Common mistakes:**
- ❌ Forgetting to push the **successor** of the popped node → the merge stops early.
- ❌ Reusing the popped node's \`next\` pointer and then overwriting it → the input lists
  get corrupted (the classic "linked list aliasing" bug).
- ❌ Not terminating the merged list with \`null\` → the last node still points into an
  input list and the result has a cycle.

**How to narrate:**
> "Merging two lists is a two-pointer walk, but merging k lists with k pointers costs O(k)
> per output value. Instead I keep the current head of every list in a min-heap: the
> heap's minimum is always the next value of the merge. I pop it, emit it and push its
> successor. The heap holds at most k nodes, so this is O(N log k) time and O(k) space."

## Related Problems

- [Kth Smallest Element in a Sorted Matrix](KthSmallestElement.md) — the same heap over many sorted rows
- [Merge Two Sorted Lists](../linkedlist/MergeTwoSortedLists.md) — the k = 2 case
- [Top K Frequent Elements](TopKFrequentElements.md) — a bounded heap
- [Find Median from Data Stream](FindMedianFromDataStream.md) — two heaps
`,i=[`mergeKSortedLists`,`mergeToArray`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};