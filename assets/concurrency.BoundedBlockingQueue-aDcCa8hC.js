var e=`concurrency.BoundedBlockingQueue`,t=`package com.dsa.concurrency;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Problem: Bounded Blocking Queue
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Concurrency, Lock + condition variables
 *
 * <p>Problem:
 * Implement a queue with a fixed capacity that blocks its producers when it is full and
 * its consumers when it is empty. Two condition variables — {@code notFull} and
 * {@code notEmpty} — are signalled whenever the state of the queue changes.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity
 * n
 * put v
 * take
 * ...
 * </pre>
 * The program prints one line per command: the value that was enqueued by {@code put}, or
 * the value that was dequeued by {@code take}. {@code -1} means the operation could not
 * be performed — the queue was full for a {@code put}, empty for a {@code take}. The
 * driver uses the non blocking variants so it can never deadlock.
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 5
 * put 1
 * put 2
 * put 3
 * take
 * take
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 2
 * -1
 * 1
 * 2
 * </pre>
 *
 * <p>Approach: a {@link ReentrantLock} protects the deque and two {@link Condition}s
 * express the two waiting reasons. The wait is always inside a {@code while} loop, so a
 * spurious wake-up or a signalled thread that lost the race simply re-checks the
 * condition instead of corrupting the queue.
 *
 * <p>Complexity: Time O(1) per operation, Space O(capacity).
 */
public class BoundedBlockingQueue {

    private final int capacity;
    private final Deque<Integer> items = new ArrayDeque<>();
    private final ReentrantLock lock = new ReentrantLock(true);
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public BoundedBlockingQueue(int capacity) {
        this.capacity = Math.max(1, capacity);
    }

    /** Appends {@code value}, blocking while the queue is full. */
    public void put(int value) throws InterruptedException {
        lock.lock();
        try {
            while (items.size() == capacity) {
                notFull.await();
            }
            items.addLast(value);
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    /** Removes and returns the head, blocking while the queue is empty. */
    public int take() throws InterruptedException {
        lock.lock();
        try {
            while (items.isEmpty()) {
                notEmpty.await();
            }
            int value = items.pollFirst();
            notFull.signal();
            return value;
        } finally {
            lock.unlock();
        }
    }

    /** Appends {@code value} if there is room; returns {@code false} when the queue is full. */
    public boolean offer(int value) {
        lock.lock();
        try {
            if (items.size() == capacity) {
                return false;
            }
            items.addLast(value);
            notEmpty.signal();
            return true;
        } finally {
            lock.unlock();
        }
    }

    /** Removes and returns the head, or {@code -1} when the queue is empty. */
    public int poll() {
        lock.lock();
        try {
            if (items.isEmpty()) {
                return -1;
            }
            int value = items.pollFirst();
            notFull.signal();
            return value;
        } finally {
            lock.unlock();
        }
    }

    /** Number of queued items. */
    public int size() {
        lock.lock();
        try {
            return items.size();
        } finally {
            lock.unlock();
        }
    }

    /** The queue contents, oldest first — used by the tests. */
    public List<Integer> contents() {
        lock.lock();
        try {
            return new ArrayList<>(items);
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        int n = fs.nextInt();

        BoundedBlockingQueue queue = new BoundedBlockingQueue(capacity);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("put".equals(command)) {
                int value = fs.nextInt();
                out.append(queue.offer(value) ? value : -1).append('\\n');
            } else if ("take".equals(command)) {
                out.append(queue.poll()).append('\\n');
            }
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Bounded Blocking Queue
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Concurrency, Lock + condition variables
 *
 * <p>Problem:
 * Implement a queue with a fixed capacity that blocks its producers when it is full and
 * its consumers when it is empty. Two condition variables — {@code notFull} and
 * {@code notEmpty} — are signalled whenever the state of the queue changes.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity
 * n
 * put v
 * take
 * ...
 * </pre>
 * The program prints one line per command: the value that was enqueued by {@code put}, or
 * the value that was dequeued by {@code take}. {@code -1} means the operation could not
 * be performed — the queue was full for a {@code put}, empty for a {@code take}. The
 * driver uses the non blocking variants so it can never deadlock.
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 5
 * put 1
 * put 2
 * put 3
 * take
 * take
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 2
 * -1
 * 1
 * 2
 * </pre>
 *
 * <p>Approach: a {@link ReentrantLock} protects the deque and two {@link Condition}s
 * express the two waiting reasons. The wait is always inside a {@code while} loop, so a
 * spurious wake-up or a signalled thread that lost the race simply re-checks the
 * condition instead of corrupting the queue.
 *
 * <p>Complexity: Time O(1) per operation, Space O(capacity).
 */
public class Main {

    private final int capacity;
    private final Deque<Integer> items = new ArrayDeque<>();
    private final ReentrantLock lock = new ReentrantLock(true);
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public Main(int capacity) {
        this.capacity = Math.max(1, capacity);
    }

    /** Appends {@code value}, blocking while the queue is full. */
    public void put(int value) throws InterruptedException {
        lock.lock();
        try {
            while (items.size() == capacity) {
                notFull.await();
            }
            items.addLast(value);
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    /** Removes and returns the head, blocking while the queue is empty. */
    public int take() throws InterruptedException {
        lock.lock();
        try {
            while (items.isEmpty()) {
                notEmpty.await();
            }
            int value = items.pollFirst();
            notFull.signal();
            return value;
        } finally {
            lock.unlock();
        }
    }

    /** Appends {@code value} if there is room; returns {@code false} when the queue is full. */
    public boolean offer(int value) {
        lock.lock();
        try {
            if (items.size() == capacity) {
                return false;
            }
            items.addLast(value);
            notEmpty.signal();
            return true;
        } finally {
            lock.unlock();
        }
    }

    /** Removes and returns the head, or {@code -1} when the queue is empty. */
    public int poll() {
        lock.lock();
        try {
            if (items.isEmpty()) {
                return -1;
            }
            int value = items.pollFirst();
            notFull.signal();
            return value;
        } finally {
            lock.unlock();
        }
    }

    /** Number of queued items. */
    public int size() {
        lock.lock();
        try {
            return items.size();
        } finally {
            lock.unlock();
        }
    }

    /** The queue contents, oldest first — used by the tests. */
    public List<Integer> contents() {
        lock.lock();
        try {
            return new ArrayList<>(items);
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        int n = fs.nextInt();

        Main queue = new Main(capacity);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("put".equals(command)) {
                int value = fs.nextInt();
                out.append(queue.offer(value) ? value : -1).append('\\n');
            } else if ("take".equals(command)) {
                out.append(queue.poll()).append('\\n');
            }
        }
        System.out.print(out);
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
`,r='\n# Bounded Blocking Queue\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Concurrency · Lock · Condition variables |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Netflix |\n\n## Problem Statement\n\nImplement a queue with a fixed capacity from scratch, using locks and condition\nvariables instead of `ArrayBlockingQueue`.\n\n- `put(value)` — append a value; **blocks** while the queue is full.\n- `take()` — remove and return the head; **blocks** while the queue is empty.\n\nThe queue must be safe to use from several threads at the same time, and it must never\nexceed its capacity or hand out a value that is not there.\n\n## Input Format\n\n```\ncapacity\nn\nput v\ntake\n...\n```\n\n- `capacity` — the maximum number of queued values.\n- `n` — the number of commands.\n- `put v` — enqueue the value `v`.\n- `take` — dequeue the oldest value.\n\nThe program prints one line per command: the value that was enqueued by `put`, or the\nvalue that was dequeued by `take`. `-1` means the operation could not be performed — the\nqueue was full for a `put`, empty for a `take`.\n\nThe driver uses the non blocking variants (`offer` / `poll`) so that it can never\ndeadlock, whatever the input is.\n\n## Sample Input\n\n```\n2\n5\nput 1\nput 2\nput 3\ntake\ntake\n```\n\n## Expected Output\n\n```\n1\n2\n-1\n1\n2\n```\n\nThe third `put` finds the queue full (capacity 2) and is rejected; the two `take`s then\nhand out `1` and `2` in FIFO order.\n\n## Approach — one lock, two conditions\n\nThe shared state is the deque of items and its size. Both are protected by one\n`ReentrantLock`, and there are two `Condition`s:\n\n- `notEmpty` — signalled when an item is added, so a waiting consumer can wake up;\n- `notFull` — signalled when an item is removed, so a waiting producer can wake up.\n\n```java\npublic void put(int value) throws InterruptedException {\n    lock.lock();\n    try {\n        while (items.size() == capacity) {\n            notFull.await();\n        }\n        items.addLast(value);\n        notEmpty.signal();\n    } finally {\n        lock.unlock();\n    }\n}\n```\n\nThree details make this correct:\n\n1. **`await()` instead of `wait()`** — `Condition.await()` works with the explicit lock\n   and cannot be called without holding it. It releases the lock while the thread sleeps\n   and re-acquires it before returning.\n2. **The condition is checked in a `while` loop** — `signal()` wakes one waiter, but\n   another thread may have taken the slot in the meantime, and the wake-up may be\n   spurious. The loop re-checks the real state.\n3. **`unlock()` in a `finally` block** — an exception inside the critical section must\n   not leave the lock held forever.\n\n**Two conditions, not one.** With a single condition, a producer woken up by a consumer\nwould find the queue still full and go back to sleep — correct but wasteful, and it can\nstarve. With two conditions, each waiter is woken for the reason it is waiting for.\n\n**Fairness.** `new ReentrantLock(true)` hands the lock to the longest-waiting thread\nfirst, which keeps the order of the queue predictable.\n\n## Dry Run\n\n`capacity = 2`. The driver uses `offer` / `poll`, so no thread ever blocks here; the\nblocking behaviour is shown in the second table.\n\n| Step | Command | Queue before | Lock held by | Action | Queue after | Result | Output |\n|---:|---|---|---|---|---|---|---|\n| 1 | `put 1` | `[]` | main | `size (0) == capacity (2)`? no → add, `notEmpty.signal()` | `[1]` | accepted | `1` |\n| 2 | `put 2` | `[1]` | main | `size (1) == capacity (2)`? no → add | `[1, 2]` | accepted | `2` |\n| 3 | `put 3` | `[1, 2]` | main | `size (2) == capacity (2)`? **yes** → return `false` | `[1, 2]` | rejected | `-1` |\n| 4 | `take` | `[1, 2]` | main | empty? no → poll `1`, `notFull.signal()` | `[2]` | value `1` | `1` |\n| 5 | `take` | `[2]` | main | empty? no → poll `2` | `[]` | value `2` | `2` |\n\n### The blocking behaviour — a producer that has to wait\n\n`capacity = 1`, one consumer:\n\n| Step | Thread | Lock state | Condition | Action | Queue |\n|---:|---|---|---|---|---|\n| 1 | T1 (producer) | held by T1 | — | `put 1`: `size 0 < 1` → add, signal `notEmpty` | `[1]` |\n| 2 | T2 (producer) | held by T2 | — | `put 2`: `size 1 == 1` → `notFull.await()` → **releases the lock** | `[1]` |\n| 3 | T3 (consumer) | held by T3 | — | `take 1`: not empty → poll `1`, `notFull.signal()` | `[]` |\n| 4 | T2 | re-acquired | `notFull` | wakes up, re-checks `size 0 < 1` → true → add `2` | `[2]` |\n\nStep 4 is the point of the whole design: the producer was asleep, the consumer freed a\nslot and signalled, and the producer re-checked the condition under the lock before\nacting.\n\n## Java Solution\n\nSee [`BoundedBlockingQueue.java`](./BoundedBlockingQueue.java).\n\n```java\npublic void put(int value) throws InterruptedException {\n    lock.lock();\n    try {\n        while (items.size() == capacity) {\n            notFull.await();               // releases the lock while waiting\n        }\n        items.addLast(value);\n        notEmpty.signal();\n    } finally {\n        lock.unlock();\n    }\n}\n\npublic int take() throws InterruptedException {\n    lock.lock();\n    try {\n        while (items.isEmpty()) {\n            notEmpty.await();\n        }\n        int value = items.pollFirst();\n        notFull.signal();\n        return value;\n    } finally {\n        lock.unlock();\n    }\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) per operation | one lock acquisition plus a constant number of deque operations |\n| **Space** | O(capacity) | the items plus the lock\'s wait sets |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Why two conditions instead of one?"* → so that a producer is never woken up by a\n  consumer\'s signal and vice versa; with one condition the wake-ups are wasted and\n  starvation is possible.\n- *"Why `while` and not `if`?"* → spurious wake-ups and lost wake-ups: the condition must\n  be re-checked under the lock.\n- *"What is `signalAll` for?"* → when several waiters can make progress (e.g. a\n  `takeAll`); with one permit only one can proceed, so `signal` is enough.\n- *"How would you add a `peek` and a `size`?"* → both are trivial under the same lock;\n  `size` must be read under the lock to be meaningful.\n- *"How does `ArrayBlockingQueue` implement this?"* → exactly this, with a `ReentrantLock`\n  and a `Condition` per non-empty/non-full state.\n\n**Common mistakes:**\n- ❌ Using `if` instead of `while` around `await()`.\n- ❌ Calling `await()` without holding the lock → `IllegalMonitorStateException`.\n- ❌ Forgetting the `finally { lock.unlock(); }` → the lock is leaked on an exception.\n- ❌ Signalling the wrong condition.\n- ❌ Using a non-reentrant `synchronized` block with `wait()` inside a `while` that also\n  calls a helper method which needs the lock.\n\n**How to narrate:**\n> "One `ReentrantLock` guards the deque, and two conditions express the two reasons a\n> thread may have to sleep: `notFull` for the producer and `notEmpty` for the consumer.\n> `await` releases the lock while the thread waits, and the condition is always checked\n> in a `while` loop, because a signalled thread may find that another thread was faster.\n> The unlock happens in a `finally` block so an exception cannot leak the lock."\n\n## Related Problems\n\n- [Producer–Consumer](./ProducerConsumer.md) — the application of this queue\n- [Semaphore](../design/SemaphoreClass.java) — the same\n  `while` + `wait`/`notifyAll` pattern with a monitor\n- [Atomic Counter](./AtomicCounter.md) — the lock-free alternative for a single counter\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};