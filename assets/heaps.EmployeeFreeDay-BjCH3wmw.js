var e=`heaps.EmployeeFreeDay`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Employee Free Day
 * LeetCode: 1497 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy interval selection, Bounded heap
 *
 * <p>Problem:
 * Every event has a start day, an end day and the id of the employee who wants to attend
 * it. An employee may attend several events as long as no two of them overlap, and the
 * events are inclusive — {@code [1, 2]} and {@code [2, 3]} <em>do</em> overlap. Return
 * the maximum total number of events that all employees can attend together.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start end employeeId
 * ...
 * </pre>
 * {@code n} is the number of events; every event is one line with its start day, its end
 * day and the employee id.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 1 2 1
 * 2 3 1
 * 3 4 1
 * 3 5 1
 * 1 3 2
 * 2 4 2
 * 3 5 2
 * 4 6 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: the employees are independent, so solve the problem per employee and add
 * the answers. For one employee the events are sorted by end day and scanned greedily:
 * an event is taken when it starts strictly after the end of the last taken event. A
 * max-heap of the end days of the taken events plays the role of the "last end day"
 * pointer and also counts the answer.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class EmployeeFreeDay {

    /**
     * Returns the maximum number of events that can be attended.
     *
     * @param events one entry per event: {@code {startDay, endDay, employeeId}}
     * @return the total number of attendable events
     */
    public static int maxEvents(int[][] events) {
        if (events == null || events.length == 0) {
            return 0;
        }

        Map<Integer, List<int[]>> byEmployee = new LinkedHashMap<>();
        for (int[] event : events) {
            byEmployee.computeIfAbsent(event[2], key -> new ArrayList<>()).add(event);
        }

        int total = 0;
        for (List<int[]> employeeEvents : byEmployee.values()) {
            // Earliest end day first: the classic activity-selection greedy.
            employeeEvents.sort(Comparator.comparingInt(event -> event[1]));

            // The heap keeps the end days of the accepted events. Its maximum is the
            // end day of the last accepted event, and its size is the number of
            // accepted events.
            MaxHeap<Integer> accepted = new MaxHeap<>();
            for (int[] event : employeeEvents) {
                if (accepted.isEmpty() || accepted.peek() < event[0]) {
                    accepted.add(event[1]);
                }
            }
            total += accepted.size();
        }
        return total;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] events = new int[n][];
        for (int i = 0; i < n; i++) {
            events[i] = new int[]{fs.nextInt(), fs.nextInt(), fs.nextInt()};
        }

        System.out.println(maxEvents(events));
    }
}
`,n=`import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Employee Free Day
 * LeetCode: 1497 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy interval selection, Bounded heap
 *
 * <p>Problem:
 * Every event has a start day, an end day and the id of the employee who wants to attend
 * it. An employee may attend several events as long as no two of them overlap, and the
 * events are inclusive — {@code [1, 2]} and {@code [2, 3]} <em>do</em> overlap. Return
 * the maximum total number of events that all employees can attend together.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start end employeeId
 * ...
 * </pre>
 * {@code n} is the number of events; every event is one line with its start day, its end
 * day and the employee id.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 1 2 1
 * 2 3 1
 * 3 4 1
 * 3 5 1
 * 1 3 2
 * 2 4 2
 * 3 5 2
 * 4 6 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: the employees are independent, so solve the problem per employee and add
 * the answers. For one employee the events are sorted by end day and scanned greedily:
 * an event is taken when it starts strictly after the end of the last taken event. A
 * max-heap of the end days of the taken events plays the role of the "last end day"
 * pointer and also counts the answer.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class Main {

    /**
     * Returns the maximum number of events that can be attended.
     *
     * @param events one entry per event: {@code {startDay, endDay, employeeId}}
     * @return the total number of attendable events
     */
    public static int maxEvents(int[][] events) {
        if (events == null || events.length == 0) {
            return 0;
        }

        Map<Integer, List<int[]>> byEmployee = new LinkedHashMap<>();
        for (int[] event : events) {
            byEmployee.computeIfAbsent(event[2], key -> new ArrayList<>()).add(event);
        }

        int total = 0;
        for (List<int[]> employeeEvents : byEmployee.values()) {
            // Earliest end day first: the classic activity-selection greedy.
            employeeEvents.sort(Comparator.comparingInt(event -> event[1]));

            // The heap keeps the end days of the accepted events. Its maximum is the
            // end day of the last accepted event, and its size is the number of
            // accepted events.
            MaxHeap<Integer> accepted = new MaxHeap<>();
            for (int[] event : employeeEvents) {
                if (accepted.isEmpty() || accepted.peek() < event[0]) {
                    accepted.add(event[1]);
                }
            }
            total += accepted.size();
        }
        return total;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] events = new int[n][];
        for (int i = 0; i < n; i++) {
            events[i] = new int[]{fs.nextInt(), fs.nextInt(), fs.nextInt()};
        }

        System.out.println(maxEvents(events));
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
# Employee Free Day — LeetCode 1497

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Interval scheduling · Bounded heap |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Every event has a start day, an end day and the id of the employee who wants to attend
it. An employee may attend several events as long as **no two of them overlap**, and the
days are **inclusive** — \`[1, 2]\` and \`[2, 3]\` *do* overlap.

Return the maximum **total** number of events that all employees can attend together.

For the sample, employee \`1\` can attend \`[1,2]\` and \`[3,4]\`, employee \`2\` can attend
\`[1,3]\` and \`[4,6]\` — four events in total.

## Input Format

The program reads from standard input:

\`\`\`
n
start end employeeId
...
\`\`\`

- \`n\` — the number of events (1 ≤ n ≤ 10⁵)
- one line per event: its start day, its end day and the employee id

## Sample Input

\`\`\`
8
1 2 1
2 3 1
3 4 1
3 5 1
1 3 2
2 4 2
3 5 2
4 6 2
\`\`\`

## Expected Output

\`\`\`
4
\`\`\`

## Approach — Greedy per employee, tracked by a max-heap

The employees do not compete with each other, so the problem splits into one
**interval scheduling** problem per employee, and the answers are added up.

For one employee the classic greedy is:

> Always take the event that **finishes earliest**, then continue with the events that
> start strictly after it.

So: sort the employee's events by **end day** and scan them.

The heap plays the role of the "last accepted end day" pointer. It stores the end days
of the events that were accepted:

- the heap's **maximum** is the end day of the last accepted event — the next event must
  start strictly after it;
- the heap's **size** is the number of accepted events, i.e. this employee's answer.

The inclusive-interval rule is the detail people get wrong: an event may only follow
another one when \`next.start > lastEnd\` — **strictly** greater, because the end day
still belongs to the earlier event.

## Dry Run

Input: the eight events above

Employee \`1\` has \`[1,2] [2,3] [3,4] [3,5]\`, sorted by end day:

| Step | event | last accepted end | decision | heap (max-heap of accepted end days) |
|---:|---|---|---|---|
| 1 | \`[1,2]\` | — | **take** (2 > ∞) | \`[2]\` |
| 2 | \`[2,3]\` | 2 | skip (2 is not > 2) | \`[2]\` |
| 3 | \`[3,4]\` | 2 | **take** (3 > 2) | \`[4, 2]\` |
| 4 | \`[3,5]\` | 4 | skip (3 is not > 4) | \`[4, 2]\` |

Employee \`1\` attends 2 events.

Employee \`2\` has \`[1,3] [2,4] [3,5] [4,6]\`, sorted by end day:

| Step | event | last accepted end | decision | heap |
|---:|---|---|---|---|
| 1 | \`[1,3]\` | — | **take** | \`[3]\` |
| 2 | \`[2,4]\` | 3 | skip (2 is not > 3) | \`[3]\` |
| 3 | \`[3,5]\` | 3 | skip (3 is not > 3) | \`[3]\` |
| 4 | \`[4,6]\` | 3 | **take** (4 > 3) | \`[6, 3]\` |

Employee \`2\` attends 2 events. **Total = 2 + 2 = 4** ✓

## Java Solution

See [\`EmployeeFreeDay.java\`](./EmployeeFreeDay.java).

\`\`\`java
MaxHeap<Integer> accepted = new MaxHeap<>();
for (int[] event : employeeEvents) {
    if (accepted.isEmpty() || accepted.peek() < event[0]) {
        accepted.add(event[1]);
    }
}
total += accepted.size();
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | sorting the events, then O(log n) per accepted event |
| **Space** | O(n) | the events grouped per employee plus the heap |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Are the intervals really inclusive?"* → check the statement: LeetCode 1497 says
  \`e1 < s2\`, so \`[1,2]\` and \`[2,3]\` overlap. Getting this wrong silently changes the
  answer.
- *"What if one employee could attend several events at once?"* → then it is not a
  per-employee problem any more; you need a max-flow / matching formulation.
- *"What if you also wanted the actual schedule?"* → keep the accepted events in a list
  next to the heap, not just their end days.
- *"What if the employees must all attend the same number of events?"* → a fairness
  constraint turns the independent per-employee problems into a balancing problem.

**Common mistakes:**
- ❌ Using \`start >= lastEnd\` instead of \`start > lastEnd\` → the inclusive end day
  double-books the event.
- ❌ Sorting by **start** day instead of **end** day → the classic interval-scheduling
  greedy fails; the earliest-*end* event is the one that leaves room for the most.
- ❌ Forgetting that the answer is a **sum over employees**, not a maximum.

**How to narrate:**
> "Each employee is independent, so I solve the problem per employee and add the
> results. For one employee this is classic interval scheduling: sort the events by end
> day and take an event whenever it starts strictly after the last accepted one — the
> end day is inclusive, so the comparison has to be strict. I keep the accepted end days
> in a max-heap: its maximum is the end day of the last accepted event and its size is
> the number of events this employee attends."

## Related Problems

- [Merge Intervals](../intervals/MergeIntervals.md) — the same greedy, different question
- [Meeting Rooms II](../intervals/MeetingRoomsII.md) — maximum concurrent events
- [Task Scheduler](TaskScheduler.md) — greedy scheduling with a cooldown
- [Top K Frequent Elements](TopKFrequentElements.md) — a bounded heap
`,i=[`maxEvents`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};