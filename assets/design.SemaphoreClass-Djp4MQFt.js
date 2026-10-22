var e=`design.SemaphoreClass`,t=`package com.dsa.design;

import com.dsa.utils.FastScanner;

/**
 * Problem: Semaphore
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Counting semaphore with condition variables
 *
 * <p>Problem:
 * Implement a counting semaphore. {@code acquire()} takes a permit, blocking until one is
 * free; {@code release()} gives a permit back and wakes a waiting thread. The semaphore
 * never holds more permits than it was created with.
 *
 * <p>Input format (stdin):
 * <pre>
 * permits
 * n
 * acquire
 * release
 * ...
 * </pre>
 * The program prints one line per operation: the number of permits still available.
 * The driver waits with a timeout, so an unbalanced input can never hang it.
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 5
 * acquire
 * acquire
 * release
 * acquire
 * release
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 0
 * 1
 * 0
 * 1
 * </pre>
 *
 * <p>Approach: the permit count is guarded by the instance monitor. {@code acquire} waits
 * with {@code wait()} while no permit is free and is woken up by {@code notifyAll()} from
 * {@code release}. The wait has to happen inside a {@code while} loop, not an
 * {@code if}, because of spurious wake-ups and because the lock is handed back to a
 * waiting thread that may not be the one that was notified.
 *
 * <p>Complexity: Time O(1) per operation when no thread has to wait, Space O(1).
 */
public class SemaphoreClass {

    private final int permits;
    private int available;

    public SemaphoreClass(int permits) {
        this.permits = Math.max(0, permits);
        this.available = this.permits;
    }

    /** Takes a permit, blocking until one is available. */
    public synchronized void acquire() throws InterruptedException {
        while (available == 0) {
            wait();
        }
        available--;
    }

    /** Gives a permit back and wakes up one waiting thread. */
    public synchronized void release() {
        if (available >= permits) {
            throw new IllegalStateException("released more permits than were acquired");
        }
        available++;
        notifyAll();
    }

    /** Takes a permit if one is free right now. */
    public synchronized boolean tryAcquire() {
        if (available == 0) {
            return false;
        }
        available--;
        return true;
    }

    /**
     * Takes a permit, waiting at most {@code timeoutMillis} for one to be released.
     *
     * @return {@code true} when a permit was taken
     */
    public synchronized boolean tryAcquire(long timeoutMillis) throws InterruptedException {
        long deadline = System.currentTimeMillis() + timeoutMillis;
        while (available == 0) {
            long remaining = deadline - System.currentTimeMillis();
            if (remaining <= 0) {
                return false;
            }
            wait(remaining);
        }
        available--;
        return true;
    }

    /** Permits currently free. */
    public synchronized int availablePermits() {
        return available;
    }

    /** Total number of permits the semaphore was created with. */
    public int totalPermits() {
        return permits;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int permits = fs.nextInt();
        int n = fs.nextInt();

        SemaphoreClass semaphore = new SemaphoreClass(permits);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("acquire".equals(command)) {
                // A bounded wait so an unbalanced input can never hang the driver.
                semaphore.tryAcquire(50);
            } else if ("release".equals(command)) {
                semaphore.release();
            }
            out.append(semaphore.availablePermits()).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Semaphore
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Counting semaphore with condition variables
 *
 * <p>Problem:
 * Implement a counting semaphore. {@code acquire()} takes a permit, blocking until one is
 * free; {@code release()} gives a permit back and wakes a waiting thread. The semaphore
 * never holds more permits than it was created with.
 *
 * <p>Input format (stdin):
 * <pre>
 * permits
 * n
 * acquire
 * release
 * ...
 * </pre>
 * The program prints one line per operation: the number of permits still available.
 * The driver waits with a timeout, so an unbalanced input can never hang it.
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 5
 * acquire
 * acquire
 * release
 * acquire
 * release
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 0
 * 1
 * 0
 * 1
 * </pre>
 *
 * <p>Approach: the permit count is guarded by the instance monitor. {@code acquire} waits
 * with {@code wait()} while no permit is free and is woken up by {@code notifyAll()} from
 * {@code release}. The wait has to happen inside a {@code while} loop, not an
 * {@code if}, because of spurious wake-ups and because the lock is handed back to a
 * waiting thread that may not be the one that was notified.
 *
 * <p>Complexity: Time O(1) per operation when no thread has to wait, Space O(1).
 */
public class Main {

    private final int permits;
    private int available;

    public Main(int permits) {
        this.permits = Math.max(0, permits);
        this.available = this.permits;
    }

    /** Takes a permit, blocking until one is available. */
    public synchronized void acquire() throws InterruptedException {
        while (available == 0) {
            wait();
        }
        available--;
    }

    /** Gives a permit back and wakes up one waiting thread. */
    public synchronized void release() {
        if (available >= permits) {
            throw new IllegalStateException("released more permits than were acquired");
        }
        available++;
        notifyAll();
    }

    /** Takes a permit if one is free right now. */
    public synchronized boolean tryAcquire() {
        if (available == 0) {
            return false;
        }
        available--;
        return true;
    }

    /**
     * Takes a permit, waiting at most {@code timeoutMillis} for one to be released.
     *
     * @return {@code true} when a permit was taken
     */
    public synchronized boolean tryAcquire(long timeoutMillis) throws InterruptedException {
        long deadline = System.currentTimeMillis() + timeoutMillis;
        while (available == 0) {
            long remaining = deadline - System.currentTimeMillis();
            if (remaining <= 0) {
                return false;
            }
            wait(remaining);
        }
        available--;
        return true;
    }

    /** Permits currently free. */
    public synchronized int availablePermits() {
        return available;
    }

    /** Total number of permits the semaphore was created with. */
    public int totalPermits() {
        return permits;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int permits = fs.nextInt();
        int n = fs.nextInt();

        Main semaphore = new Main(permits);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("acquire".equals(command)) {
                // A bounded wait so an unbalanced input can never hang the driver.
                semaphore.tryAcquire(50);
            } else if ("release".equals(command)) {
                semaphore.release();
            }
            out.append(semaphore.availablePermits()).append('\\n');
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
`,r='\n# Semaphore\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Design · Concurrency · Condition variables |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nImplement a **counting semaphore**:\n\n- `acquire()` takes a permit. If no permit is free the calling thread **blocks** until\n  one is released.\n- `release()` gives a permit back and wakes up a waiting thread.\n- The semaphore never holds more permits than it was created with.\n\nThe number of permits still available must be observable, because that is what a test\n(and an interviewer) wants to see.\n\n## Input Format\n\n```\npermits\nn\nacquire\nrelease\n...\n```\n\n- `permits` — the number of permits the semaphore starts with.\n- `n` — the number of commands.\n- `acquire` — take a permit (blocks while none is free).\n- `release` — give a permit back.\n\nThe program prints one line per command: the number of permits still available. The\ndriver uses a bounded wait, so an unbalanced input can never hang it — the printed\nnumber is the same whether the permit was taken or not.\n\n## Sample Input\n\n```\n2\n5\nacquire\nacquire\nrelease\nacquire\nrelease\n```\n\n## Expected Output\n\n```\n1\n0\n1\n0\n1\n```\n\n## Approach — a monitor, one condition variable and a `while` loop\n\nThe permit count is the shared state, so it is guarded by the instance monitor\n(`synchronized`).\n\n```java\npublic synchronized void acquire() throws InterruptedException {\n    while (available == 0) {\n        wait();                       // releases the monitor, waits to be notified\n    }\n    available--;\n}\n```\n\n- `wait()` **releases the monitor** while the thread sleeps, so other threads can enter\n  the critical section — that is what makes the whole thing work instead of deadlocking.\n- `release()` increments the count and calls `notifyAll()`, waking the waiting threads.\n- The condition is checked in a **`while`** loop, never an `if`: a thread can be woken up\n  spuriously, and `notifyAll` wakes *all* waiters while only one permit may exist, so the\n  losers have to go back to sleep.\n\n`notifyAll` is used instead of `notify` because `release` does not know which waiter is\neligible; waking everybody and letting the `while` loop sort it out is the safe pattern.\n\n## Dry Run\n\n`permits = 2`. The "state" column is the value of `available` while the monitor is held.\n\n| Step | Command | `available` before | Waiters | Action | `available` after | Waiters notified | Output |\n|---:|---|---:|---:|---|---:|---|---|\n| 1 | `acquire` | 2 | 0 | `available > 0` → take it | 1 | — | `1` |\n| 2 | `acquire` | 1 | 0 | `available > 0` → take it | 0 | — | `0` |\n| 3 | `release` | 0 | 0 | `available++`, `notifyAll()` (nobody waiting) | 1 | — | `1` |\n| 4 | `acquire` | 1 | 0 | `available > 0` → take it | 0 | — | `0` |\n| 5 | `release` | 0 | 0 | `available++`, `notifyAll()` (nobody waiting) | 1 | — | `1` |\n\n### What happens when a thread has to wait\n\nWith `permits = 1` and two threads:\n\n| Step | Thread | Action | `available` | Waiter set |\n|---:|---|---|---:|---|\n| 1 | T1 | `acquire` → takes the only permit | 0 | `{}` |\n| 2 | T2 | `acquire` → `available == 0` → `wait()` (monitor released) | 0 | `{T2}` |\n| 3 | T1 | `release` → `available = 1`, `notifyAll()` | 1 | T2 wakes up, re-checks the loop |\n| 4 | T2 | loop condition true → `available--` | 0 | `{}` |\n\nThe `while` loop is what makes step 3 safe: `notifyAll` woke T2, but T2 still had to\nre-check that a permit was really available before taking it.\n\n## Java Solution\n\nSee [`SemaphoreClass.java`](./SemaphoreClass.java).\n\n```java\npublic synchronized void acquire() throws InterruptedException {\n    while (available == 0) {\n        wait();\n    }\n    available--;\n}\n\npublic synchronized void release() {\n    if (available >= permits) {\n        throw new IllegalStateException("released more permits than were acquired");\n    }\n    available++;\n    notifyAll();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) when no thread waits, O(w) to wake a waiter | one monitor acquisition, one `notifyAll` |\n| **Space** | O(1) | the permit count plus the monitor\'s wait set |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"How is this different from a lock?"* → a lock allows one owner, a semaphore counts\n  permits; a binary semaphore with one permit is a mutex that has no owner.\n- *"What is a fair semaphore?"* → one that hands the permits out in FIFO order of the\n  waiting threads (Java\'s `Semaphore` is not fair by default, the constructor takes a\n  `fair` flag).\n- *"How would you implement it without `synchronized`?"* → a `ReentrantLock` plus two\n  `Condition`s, exactly like the\n  [Bounded Blocking Queue](../concurrency/BoundedBlockingQueue.java).\n- *"What is the difference between `notify` and `notifyAll`?"* → `notify` wakes one\n  arbitrary waiter, which can cause a lost wake-up if that waiter is not the right one.\n\n**Common mistakes:**\n- ❌ Using `if (available == 0)` instead of `while` — the classic bug; a woken thread\n  takes a permit that is no longer there.\n- ❌ Calling `wait()` outside the monitor, or `notifyAll()` on the wrong object.\n- ❌ Not catching `InterruptedException` — `wait()` throws it, and swallowing it loses the\n  interrupt.\n- ❌ Releasing more permits than were acquired → the semaphore grows without bound.\n\n**How to narrate:**\n> "A counting semaphore is a shared counter guarded by a monitor. `acquire` waits while\n> the counter is zero — inside a `while` loop, because `notifyAll` can wake several\n> threads for one permit and because wake-ups can be spurious. `release` increments the\n> counter and notifies the waiters. `wait` gives up the monitor while sleeping, which is\n> exactly what lets the releasing thread get in."\n\n## Related Problems\n\n- [Bounded Blocking Queue](../concurrency/BoundedBlockingQueue.java)\n  — the same idea with two conditions\n- [Producer–Consumer](../concurrency/ProducerConsumer.java) — the\n  classic application of a semaphore\n- [Min Max Stack](./MinMaxStack.md) — the non-concurrent half of this repository\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};