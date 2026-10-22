var e=`queues.ImplementCircularQueue`,t=`package com.dsa.queues;

import com.dsa.utils.FastScanner;

/**
 * Problem: Design Circular Queue
 * LeetCode: 622 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Ring buffer, Modular arithmetic
 *
 * <p>Problem:
 * Design a circular queue of fixed capacity that supports {@code enqueue}, {@code dequeue},
 * {@code peek}, {@code rear}, {@code isEmpty} and {@code isFull}.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity
 * m
 * enqueue 1
 * dequeue
 * peek
 * rear
 * isEmpty
 * isFull
 * ...
 * </pre>
 * {@code capacity} is the maximum number of elements, {@code m} is the number of operations
 * and every operation is one line.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 8
 * enqueue 1
 * enqueue 2
 * enqueue 3
 * enqueue 4
 * dequeue
 * enqueue 4
 * rear
 * isFull
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * true
 * true
 * false
 * 1
 * true
 * 4
 * true
 * </pre>
 *
 * <p>Approach: a fixed array of {@code capacity} slots plus a {@code head} index and a
 * {@code size} counter. The element that sits {@code i} positions behind the head lives at
 * {@code (head + i) % capacity}, so no shifting is ever needed and the buffer never grows.
 *
 * <p>Complexity: Time O(1) per operation, Space O(capacity).
 */
public class ImplementCircularQueue {

    /** A fixed-capacity FIFO ring buffer. */
    public static class MyCircularQueue {

        private final int[] data;
        private int head = 0;
        private int size = 0;

        public MyCircularQueue(int capacity) {
            this.data = new int[Math.max(capacity, 0)];
        }

        /** Inserts {@code value}; returns false when the queue is full. */
        public boolean enqueue(int value) {
            if (isFull()) {
                return false;
            }
            data[(head + size) % data.length] = value;
            size++;
            return true;
        }

        /** Removes and returns the front element, or -1 when the queue is empty. */
        public int dequeue() {
            if (isEmpty()) {
                return -1;
            }
            int value = data[head];
            head = (head + 1) % data.length;
            size--;
            return value;
        }

        /** The front element, or -1 when the queue is empty. */
        public int peek() {
            return isEmpty() ? -1 : data[head];
        }

        /** The rear element, or -1 when the queue is empty. */
        public int rear() {
            return isEmpty() ? -1 : data[(head + size - 1) % data.length];
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return size == 0;
        }

        /** True when the queue cannot accept another element. */
        public boolean isFull() {
            return data.length == 0 || size == data.length;
        }

        /** Number of elements currently stored. */
        public int size() {
            return size;
        }

        /** Debug helper: the slots from head to tail. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < size; i++) {
                if (i > 0) {
                    sb.append(", ");
                }
                sb.append(data[(head + i) % data.length]);
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        int m = fs.nextInt();

        MyCircularQueue queue = new MyCircularQueue(capacity);
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "enqueue" -> System.out.println(queue.enqueue(fs.nextInt()));
                case "dequeue" -> System.out.println(queue.dequeue());
                case "peek" -> System.out.println(queue.peek());
                case "rear" -> System.out.println(queue.rear());
                case "isEmpty" -> System.out.println(queue.isEmpty());
                case "isFull" -> System.out.println(queue.isFull());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
        }
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Design Circular Queue
 * LeetCode: 622 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Ring buffer, Modular arithmetic
 *
 * <p>Problem:
 * Design a circular queue of fixed capacity that supports {@code enqueue}, {@code dequeue},
 * {@code peek}, {@code rear}, {@code isEmpty} and {@code isFull}.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity
 * m
 * enqueue 1
 * dequeue
 * peek
 * rear
 * isEmpty
 * isFull
 * ...
 * </pre>
 * {@code capacity} is the maximum number of elements, {@code m} is the number of operations
 * and every operation is one line.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 8
 * enqueue 1
 * enqueue 2
 * enqueue 3
 * enqueue 4
 * dequeue
 * enqueue 4
 * rear
 * isFull
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * true
 * true
 * false
 * 1
 * true
 * 4
 * true
 * </pre>
 *
 * <p>Approach: a fixed array of {@code capacity} slots plus a {@code head} index and a
 * {@code size} counter. The element that sits {@code i} positions behind the head lives at
 * {@code (head + i) % capacity}, so no shifting is ever needed and the buffer never grows.
 *
 * <p>Complexity: Time O(1) per operation, Space O(capacity).
 */
public class Main {

    /** A fixed-capacity FIFO ring buffer. */
    public static class MyCircularQueue {

        private final int[] data;
        private int head = 0;
        private int size = 0;

        public MyCircularQueue(int capacity) {
            this.data = new int[Math.max(capacity, 0)];
        }

        /** Inserts {@code value}; returns false when the queue is full. */
        public boolean enqueue(int value) {
            if (isFull()) {
                return false;
            }
            data[(head + size) % data.length] = value;
            size++;
            return true;
        }

        /** Removes and returns the front element, or -1 when the queue is empty. */
        public int dequeue() {
            if (isEmpty()) {
                return -1;
            }
            int value = data[head];
            head = (head + 1) % data.length;
            size--;
            return value;
        }

        /** The front element, or -1 when the queue is empty. */
        public int peek() {
            return isEmpty() ? -1 : data[head];
        }

        /** The rear element, or -1 when the queue is empty. */
        public int rear() {
            return isEmpty() ? -1 : data[(head + size - 1) % data.length];
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return size == 0;
        }

        /** True when the queue cannot accept another element. */
        public boolean isFull() {
            return data.length == 0 || size == data.length;
        }

        /** Number of elements currently stored. */
        public int size() {
            return size;
        }

        /** Debug helper: the slots from head to tail. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < size; i++) {
                if (i > 0) {
                    sb.append(", ");
                }
                sb.append(data[(head + i) % data.length]);
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        int m = fs.nextInt();

        MyCircularQueue queue = new MyCircularQueue(capacity);
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "enqueue" -> System.out.println(queue.enqueue(fs.nextInt()));
                case "dequeue" -> System.out.println(queue.dequeue());
                case "peek" -> System.out.println(queue.peek());
                case "rear" -> System.out.println(queue.rear());
                case "isEmpty" -> System.out.println(queue.isEmpty());
                case "isFull" -> System.out.println(queue.isFull());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
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
`,r='\n# Design Circular Queue — LeetCode 622\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Ring buffer · Modular arithmetic · Array |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Meta, Google, Uber, Adobe |\n\n## Problem Statement\n\nDesign a **circular queue** of fixed capacity `k` that supports:\n\n| Operation | Meaning | Result when it fails |\n|---|---|---|\n| `enqueue x` | insert `x` at the back | `false` if the queue is full |\n| `dequeue` | remove and return the front element | `-1` if the queue is empty |\n| `peek` | the front element | `-1` if the queue is empty |\n| `rear` | the back element | `-1` if the queue is empty |\n| `isEmpty` | is the queue empty? | `true` / `false` |\n| `isFull` | is the queue full? | `true` / `false` |\n\nThe queue must be **O(1)** per operation and must never grow beyond its capacity.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ncapacity\nm\nenqueue 1\ndequeue\npeek\nrear\nisEmpty\nisFull\n...\n```\n\n- `capacity` — the maximum number of elements the queue can hold (1 ≤ capacity ≤ 10³).\n- `m` — the number of operations (1 ≤ m ≤ 10⁵).\n- Every following line is **one operation**: the operation word, optionally followed by a\n  single integer argument (`enqueue` is the only operation that takes one).\n\nOutput rules — **one line per operation**:\n\n| Operation | Printed |\n|---|---|\n| `enqueue x` | `true` when the element was stored, `false` when the queue was full |\n| `dequeue` | the removed element, or `-1` when the queue was empty |\n| `peek` / `rear` | the element, or `-1` when the queue is empty |\n| `isEmpty` / `isFull` | `true` / `false` |\n\n## Sample Input\n\n```\n3\n8\nenqueue 1\nenqueue 2\nenqueue 3\nenqueue 4\ndequeue\nenqueue 4\nrear\nisFull\n```\n\n## Expected Output\n\n```\ntrue\ntrue\ntrue\nfalse\n1\ntrue\n4\ntrue\n```\n\nThe queue holds `1 2 3` after three enqueues, refuses the fourth, releases `1` and then\naccepts `4` — which now sits at the **back**, ahead of the old `3` in queue order.\n\n## Approach — Ring buffer\n\nA normal array queue would have to shift every element left on each `dequeue`, which is\nO(n). A **circular** array never shifts anything: when the index runs past the end of the\narray it wraps around to the front.\n\nThree pieces of state are enough:\n\n- `data` — the fixed array of `capacity` slots;\n- `head` — the index of the front element;\n- `size` — how many elements are currently stored.\n\nThen:\n\n| What | Where it lives |\n|---|---|\n| front element | `data[head]` |\n| back element | `data[(head + size - 1) % capacity]` |\n| the slot for the next insert | `data[(head + size) % capacity]` |\n\nThe modulo is the whole trick: it turns "off the end" into "back to the beginning".\n\nTwo things make the bookkeeping unambiguous:\n\n- **`size` instead of a second index.** A ring buffer has one free slot (the classic\n  "waste one cell" trick) or it tracks the count. Tracking the count removes the\n  ambiguity: `isEmpty` is `size == 0`, `isFull` is `size == capacity`.\n- **`dequeue` advances `head` but never clears the slot.** The stale value is simply\n  overwritten by the next insert.\n\n## Dry Run\n\nInput: capacity 3, then `enqueue 1`, `enqueue 2`, `enqueue 3`, `enqueue 4`, `dequeue`,\n`enqueue 4`, `rear`, `isFull`\n\n`data` is printed as the raw three-slot array; `head` points at the front and `size`\ncounts the live elements.\n\n| Step | Operation | `data` (slot 0, 1, 2) | `head` | `size` | Printed |\n|---:|---|---|---:|---:|---|\n| 1 | `enqueue 1` → slot `(0+0)%3 = 0` | `[1, ·, ·]` | 0 | 1 | `true` |\n| 2 | `enqueue 2` → slot `(0+1)%3 = 1` | `[1, 2, ·]` | 0 | 2 | `true` |\n| 3 | `enqueue 3` → slot `(0+2)%3 = 2` | `[1, 2, 3]` | 0 | 3 | `true` |\n| 4 | `enqueue 4` — `size == capacity` | `[1, 2, 3]` | 0 | 3 | `false` |\n| 5 | `dequeue` → takes `data[0] = 1` | `[·, 2, 3]` | 1 | 2 | `1` |\n| 6 | `enqueue 4` → slot `(1+2)%3 = 0` | `[4, 2, 3]` | 1 | 3 | `true` |\n| 7 | `rear` → `data[(1+3-1)%3] = data[0]` | `[4, 2, 3]` | 1 | 3 | `4` |\n| 8 | `isFull` → `size == capacity` | `[4, 2, 3]` | 1 | 3 | `true` |\n\nStep 5 is where the wrap-around becomes visible: the freed slot 0 is reused in step 6,\nand the queue order is now `2, 3, 4` even though the raw array reads `4, 2, 3`.\n\n## Java Solution\n\nSee [`ImplementCircularQueue.java`](./ImplementCircularQueue.java).\n\n```java\npublic boolean enqueue(int value) {\n    if (isFull()) {\n        return false;\n    }\n    data[(head + size) % data.length] = value;\n    size++;\n    return true;\n}\n\npublic int dequeue() {\n    if (isEmpty()) {\n        return -1;\n    }\n    int value = data[head];\n    head = (head + 1) % data.length;\n    size--;\n    return value;\n}\n\npublic int rear() {\n    return isEmpty() ? -1 : data[(head + size - 1) % data.length];\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) per operation | only modular arithmetic and array writes |\n| **Space** | O(capacity) | the backing array never grows |\n\n**Optimal?** Yes — every operation touches at most one slot, so no implementation can be\nfaster, and the array is exactly the size the contract demands.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you avoid the `%` operator?"* → yes, replace it with a conditional wrap\n  (`if (index == capacity) index = 0;`). The modulo is often a division instruction on\n  the CPU and matters in very hot loops.\n- *"What if the capacity is not known in advance?"* → use a `java.util.ArrayDeque`\n  (amortised O(1) growth) or a linked list with a tail pointer.\n- *"How would you implement a blocking queue?"* → add `wait()` / `notify()` on a full\n  queue and an empty queue; see `BlockingQueue`.\n- *"What about a queue with a fixed capacity that overwrites the oldest element?"* → that\n  is a **ring buffer** for streams: write into `data[head]` and always advance `head`,\n  dropping the oldest value (used in audio and networking).\n\n**Common mistakes:**\n- ❌ Using only `head` and `rear` indices without a **count** → you cannot tell "empty"\n  from "full" when both pointers coincide.\n- ❌ Writing the insert at `data[(head + size) % capacity]` but the read at\n  `data[(rear + 1) % capacity]` → mixing two different conventions; the read positions\n  must be derived from the same `head`/`size` pair.\n- ❌ Forgetting to advance `head` with a modulo in `dequeue` → the queue breaks as soon\n  as it wraps around the end of the array.\n\n**How to narrate:**\n> "I\'ll use a fixed array plus a `head` index and a `size` counter, so empty and full\n> are unambiguous. The front lives at `data[head]`, the back at\n> `data[(head + size - 1) % capacity]`, and the next free slot at\n> `data[(head + size) % capacity]`. Every operation is a couple of modulo operations, so\n> the whole thing is O(1) per call with no shifting."\n\n## Related Problems\n\n- [Implement Queue using Stacks](ImplementQueueUsingStacks.md) — a queue from two stacks\n- [Design a Min Queue](MinQueue.md) — a queue with a running minimum\n- [Sliding Window Maximum](SlidingWindowMaximum.md) — a monotonic deque\n- [Task Scheduler](../heaps/TaskScheduler.md) — a priority queue with a cooldown\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};