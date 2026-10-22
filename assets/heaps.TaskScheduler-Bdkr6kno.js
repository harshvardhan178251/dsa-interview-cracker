var e=`heaps.TaskScheduler`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Task Scheduler
 * LeetCode: 621 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Greedy scheduling, Max-heap with cooldown
 *
 * <p>Problem:
 * Given a list of tasks (uppercase letters) and a cooldown {@code k}, the same task may
 * not run twice within {@code k} slots. Return the minimum number of time slots needed
 * to run all the tasks.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * task0 task1 ... task(n-1)
 * k
 * </pre>
 * {@code n} is the number of tasks; the n task letters follow (whitespace separated),
 * then the cooldown.
 *
 * <p>Sample input:
 * <pre>
 * 6
 * A A B C D D
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: always run the task with the most remaining occurrences. A max-heap holds
 * the remaining count of every task; a small queue holds the tasks that are cooling down
 * together with the number of slots they still have to wait. When the heap runs dry the
 * only thing left to do is wait for the shortest cooldown to expire.
 *
 * <p>Complexity: Time O(n log m) with m distinct tasks, Space O(m).
 */
public class TaskScheduler {

    /** A task with its remaining number of occurrences. */
    public static class Task {
        public final char letter;
        public int remaining;

        public Task(char letter, int remaining) {
            this.letter = letter;
            this.remaining = remaining;
        }

        @Override
        public String toString() {
            return letter + "x" + remaining;
        }
    }

    /** A task that is cooling down, with the number of slots it still has to wait. */
    public static class Cooldown {
        public int remaining;
        public final Task task;

        public Cooldown(int remaining, Task task) {
            this.remaining = remaining;
            this.task = task;
        }
    }

    /**
     * Returns the minimum number of slots needed to run all the tasks.
     *
     * @param tasks the task letters
     * @param k     the cooldown: the same task may not repeat within k slots
     * @return the minimum number of slots
     */
    public static int leastInterval(char[] tasks, int k) {
        if (tasks == null || tasks.length == 0) {
            return 0;
        }
        if (k <= 0) {
            return tasks.length;
        }

        int[] counts = new int[26];
        for (char task : tasks) {
            counts[task - 'A']++;
        }

        // The heap is ordered by remaining count, so its top is the most urgent task.
        MaxHeap<Task> heap = new MaxHeap<Task>(
                (a, b) -> Integer.compare(a.remaining, b.remaining));
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) {
                heap.add(new Task((char) ('A' + i), counts[i]));
            }
        }

        // Tasks that are cooling down, with the slots they still have to wait.
        Deque<Cooldown> cooling = new ArrayDeque<>();
        int slots = 0;

        while (!heap.isEmpty() || !cooling.isEmpty()) {
            // Release the task whose cooldown expired.
            if (!cooling.isEmpty() && cooling.peek().remaining == 0) {
                heap.add(cooling.poll().task);
            }

            if (heap.isEmpty()) {
                if (cooling.isEmpty()) {
                    break;
                }
                // Nothing can run - idle until the next task is ready.
                int wait = cooling.peek().remaining;
                for (Cooldown entry : cooling) {
                    entry.remaining -= wait;
                }
                slots += wait;
                continue;
            }

            slots++;
            for (Cooldown entry : cooling) {
                entry.remaining--;
            }

            Task current = heap.poll();
            current.remaining--;
            if (current.remaining > 0) {
                cooling.addLast(new Cooldown(k, current));
            }
        }
        return slots;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        char[] tasks = new char[n];
        for (int i = 0; i < n; i++) {
            tasks[i] = fs.nextChar();
        }
        int k = fs.nextInt();

        System.out.println(leastInterval(tasks, k));
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Task Scheduler
 * LeetCode: 621 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Greedy scheduling, Max-heap with cooldown
 *
 * <p>Problem:
 * Given a list of tasks (uppercase letters) and a cooldown {@code k}, the same task may
 * not run twice within {@code k} slots. Return the minimum number of time slots needed
 * to run all the tasks.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * task0 task1 ... task(n-1)
 * k
 * </pre>
 * {@code n} is the number of tasks; the n task letters follow (whitespace separated),
 * then the cooldown.
 *
 * <p>Sample input:
 * <pre>
 * 6
 * A A B C D D
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: always run the task with the most remaining occurrences. A max-heap holds
 * the remaining count of every task; a small queue holds the tasks that are cooling down
 * together with the number of slots they still have to wait. When the heap runs dry the
 * only thing left to do is wait for the shortest cooldown to expire.
 *
 * <p>Complexity: Time O(n log m) with m distinct tasks, Space O(m).
 */
public class Main {

    /** A task with its remaining number of occurrences. */
    public static class Task {
        public final char letter;
        public int remaining;

        public Task(char letter, int remaining) {
            this.letter = letter;
            this.remaining = remaining;
        }

        @Override
        public String toString() {
            return letter + "x" + remaining;
        }
    }

    /** A task that is cooling down, with the number of slots it still has to wait. */
    public static class Cooldown {
        public int remaining;
        public final Task task;

        public Cooldown(int remaining, Task task) {
            this.remaining = remaining;
            this.task = task;
        }
    }

    /**
     * Returns the minimum number of slots needed to run all the tasks.
     *
     * @param tasks the task letters
     * @param k     the cooldown: the same task may not repeat within k slots
     * @return the minimum number of slots
     */
    public static int leastInterval(char[] tasks, int k) {
        if (tasks == null || tasks.length == 0) {
            return 0;
        }
        if (k <= 0) {
            return tasks.length;
        }

        int[] counts = new int[26];
        for (char task : tasks) {
            counts[task - 'A']++;
        }

        // The heap is ordered by remaining count, so its top is the most urgent task.
        MaxHeap<Task> heap = new MaxHeap<Task>(
                (a, b) -> Integer.compare(a.remaining, b.remaining));
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) {
                heap.add(new Task((char) ('A' + i), counts[i]));
            }
        }

        // Tasks that are cooling down, with the slots they still have to wait.
        Deque<Cooldown> cooling = new ArrayDeque<>();
        int slots = 0;

        while (!heap.isEmpty() || !cooling.isEmpty()) {
            // Release the task whose cooldown expired.
            if (!cooling.isEmpty() && cooling.peek().remaining == 0) {
                heap.add(cooling.poll().task);
            }

            if (heap.isEmpty()) {
                if (cooling.isEmpty()) {
                    break;
                }
                // Nothing can run - idle until the next task is ready.
                int wait = cooling.peek().remaining;
                for (Cooldown entry : cooling) {
                    entry.remaining -= wait;
                }
                slots += wait;
                continue;
            }

            slots++;
            for (Cooldown entry : cooling) {
                entry.remaining--;
            }

            Task current = heap.poll();
            current.remaining--;
            if (current.remaining > 0) {
                cooling.addLast(new Cooldown(k, current));
            }
        }
        return slots;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        char[] tasks = new char[n];
        for (int i = 0; i < n; i++) {
            tasks[i] = fs.nextChar();
        }
        int k = fs.nextInt();

        System.out.println(leastInterval(tasks, k));
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
# Task Scheduler — LeetCode 621

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Max-heap · Cooldown · Frequency counting |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a list of tasks (uppercase letters) and a cooldown \`k\`, the same task may not run
twice within \`k\` slots. Return the **minimum number of slots** needed to run all the
tasks.

For \`tasks = [A, A, B, C, D, D]\` and \`k = 2\` the answer is \`6\`:

\`\`\`
A B C D A D
\`\`\`

\`A\` runs in slots 1 and 5 (three slots apart), \`D\` in slots 4 and 6.

## Input Format

The program reads from standard input:

\`\`\`
n
task0 task1 ... task(n-1)
k
\`\`\`

- \`n\` — the number of tasks (1 ≤ n ≤ 26²)
- the n task letters, whitespace separated
- \`k\` — the cooldown: the same task may not repeat within k slots (0 ≤ k ≤ n)

## Sample Input

\`\`\`
6
A A B C D D
2
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

## Approach — Always run the most urgent task

The task with the **most remaining occurrences** is the one that needs the most room, so
it is always the safest to run now.

- A **max-heap** holds the remaining count of every task. Its top is the most urgent
  task.
- A small **cooldown queue** holds the tasks that are waiting, together with the number
  of slots they still have to wait.

Each slot:

1. Release the task whose cooldown expired — it goes back into the heap.
2. If the heap is empty, nothing can run: jump forward to the moment the next task
   becomes available (idle slots).
3. Otherwise run the heap's top, decrease its count, and if it still has occurrences put
   it into the cooldown queue.

**Why the greedy is optimal:** the number of slots is forced by the most frequent task.
If \`A\` appears \`f\` times, the \`f\` copies need at least \`f + (f − 1) · k\` slots, and the
other tasks can be fitted into the gaps. Running the most frequent task first is what
creates those gaps optimally.

## Dry Run

Input: \`tasks = [A, A, B, C, D, D]\`, \`k = 2\`

The heap is printed as \`task x count\`; the cooldown queue as \`task/waiting slots\`.

| Slot | released | heap before | run | heap after | cooldown after |
|---:|---|---|---|---|---|
| 1 | — | \`[Ax2, Dx2, Cx1, Bx1]\` | **A** (2 → 1) | \`[Dx2, Bx1, Cx1]\` | \`[Ax1/2]\` |
| 2 | — | \`[Dx2, Bx1, Cx1]\` | **D** (2 → 1) | \`[Cx1, Bx1]\` | \`[Ax1/1, Dx1/2]\` |
| 3 | — | \`[Cx1, Bx1]\` | **C** (1 → 0) | \`[Bx1]\` | \`[Ax1/0, Dx1/1]\` |
| 4 | \`A\` (its counter hit 0) | \`[Bx1]\` → \`[Ax1, Bx1]\` | **B** (1 → 0) | \`[Ax1]\` | \`[Dx1/0]\` |
| 5 | \`D\` (its counter hit 0) | \`[Ax1]\` → \`[Ax1, Dx1]\` | **A** (1 → 0) | \`[Dx1]\` | \`[]\` |
| 6 | — | \`[Dx1]\` | **D** (1 → 0) | \`[]\` | \`[]\` |

Six slots, and no task repeats within two slots ✓ (\`A\` in slots 1 and 5, \`D\` in slots 2
and 6).

## Java Solution

See [\`TaskScheduler.java\`](./TaskScheduler.java).

\`\`\`java
MaxHeap<Task> heap = new MaxHeap<Task>((a, b) -> Integer.compare(a.remaining, b.remaining));
Deque<Cooldown> cooling = new ArrayDeque<>();
int slots = 0;

while (!heap.isEmpty()) {
    if (!cooling.isEmpty() && cooling.peek().remaining == 0) {
        heap.add(cooling.poll().task);
    }
    if (heap.isEmpty()) {
        int wait = cooling.peek().remaining;
        for (Cooldown entry : cooling) {
            entry.remaining -= wait;
        }
        slots += wait;
        continue;
    }
    slots++;
    for (Cooldown entry : cooling) {
        entry.remaining--;
    }
    Task current = heap.poll();
    current.remaining--;
    if (current.remaining > 0) {
        cooling.addLast(new Cooldown(k, current));
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log m) | m distinct tasks, one heap operation per slot |
| **Space** | O(m) | the heap and the cooldown queue hold one entry per distinct task |

**Closed form (O(n), O(1) space):** with \`f\` = the largest frequency and \`c\` = the number
of tasks having that frequency, the answer is

\`\`\`
max(n, (f − 1) × (k + 1) + c)
\`\`\`

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you give me a formula instead of a simulation?"* → yes:
  \`max(n, (f − 1) × (k + 1) + c)\`.
- *"What if the tasks had different cooldowns?"* → the heap simulation still works, but
  the closed form does not; you need the "release the earliest available task" rule.
- *"What if the task list is a stream?"* → the same simulation, one task at a time.
- *"Why is running the most frequent task first optimal?"* → the most frequent task
  determines the number of "frames"; filling every frame with as many different tasks as
  possible minimises the total.

**Common mistakes:**
- ❌ Running the task with the **least** remaining count → the frequent tasks then pile
  up at the end and the answer grows.
- ❌ Forgetting the **idle jump** when the heap is empty → the loop either ends early
  (wrong count) or spins forever.
- ❌ Decrementing the cooldown counters in the wrong order → a task is released one slot
  too early and the schedule becomes invalid.
- ❌ Treating the cooldown as "k tasks in between" instead of "k slots apart" → off by
  one on every repetition.

**How to narrate:**
> "The task with the most occurrences left is the most urgent, so I always run the top
> of a max-heap of remaining counts. A task that was just run goes into a cooldown queue
> with the number of slots it has to wait; when that counter hits zero it re-enters the
> heap. If the heap is empty while tasks are cooling down, I jump straight to the next
> release instead of burning slots one by one. The heap simulation also mirrors the
> closed form \`max(n, (f−1)(k+1)+c)\`."

## Related Problems

- [Reorganize String](ReorganizeString.md) — the same cooldown idea
- [Employee Free Day](EmployeeFreeDay.md) — greedy scheduling
- [Top K Frequent Elements](TopKFrequentElements.md) — frequency counting
- [Find Median from Data Stream](FindMedianFromDataStream.md) — two heaps
`,i=[`leastInterval`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};