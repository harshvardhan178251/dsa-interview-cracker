var e=`concurrency.AtomicCounter`,t=`package com.dsa.concurrency;

import com.dsa.utils.FastScanner;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.LongAdder;

/**
 * Problem: Thread-Safe Counter
 * LeetCode: null | Difficulty: Easy | Frequency: 4/5
 * Pattern: Concurrency, Atomics vs monitors vs striped adder
 *
 * <p>Problem:
 * A counter is incremented by many threads at the same time. Compare the three classic
 * ways of doing it safely — an {@link AtomicInteger}, a counter guarded by
 * {@code synchronized} and a {@link LongAdder} — and show that all three end up with the
 * same total.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * d1
 * d2
 * ...
 * dn
 * </pre>
 * {@code n} is the number of increments and {@code d1..dn} are the amounts to add (usually
 * all {@code 1}). The program prints three lines: the total reached by the
 * {@link AtomicInteger}, by the {@code synchronized} counter and by the {@link LongAdder}.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1
 * 2
 * 3
 * 4
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 15
 * 15
 * 15
 * </pre>
 *
 * <p>Approach: every implementation runs the same workload — the increments are split
 * into contiguous chunks, one per worker thread, and all workers are released at the same
 * time by a {@link CountDownLatch}. The threads are joined before the totals are read,
 * so the printed result never depends on the scheduling.
 *
 * <p>Complexity: Time O(n) overall, Space O(1) besides the workload itself.
 */
public class AtomicCounter {

    /** The behaviour every counter implementation has to provide. */
    public interface Counter {
        void add(long delta);

        long total();
    }

    /** A counter guarded by the instance monitor. */
    public static final class SynchronizedCounter implements Counter {
        private long value;

        @Override
        public synchronized void add(long delta) {
            value += delta;
        }

        @Override
        public synchronized long total() {
            return value;
        }
    }

    /** A counter backed by an {@link AtomicInteger}. */
    public static final class AtomicIntegerCounter implements Counter {
        private final AtomicInteger value = new AtomicInteger();

        @Override
        public void add(long delta) {
            value.addAndGet((int) delta);
        }

        @Override
        public long total() {
            return value.get();
        }
    }

    /** A counter backed by a {@link LongAdder} — the fastest choice under heavy contention. */
    public static final class LongAdderCounter implements Counter {
        private final LongAdder value = new LongAdder();

        @Override
        public void add(long delta) {
            value.add(delta);
        }

        @Override
        public long total() {
            return value.sum();
        }
    }

    /** How many worker threads the comparison uses. */
    public static final int MAX_THREADS = 4;

    /**
     * Splits {@code n} increments into {@code workers} contiguous chunks; the first
     * workers get the remainder.
     *
     * @return {@code {from, to}} — the half open range owned by {@code worker}
     */
    public static int[] chunkBounds(int n, int workers, int worker) {
        int base = n / workers;
        int extra = n % workers;
        int from = worker * base + Math.min(worker, extra);
        int to = from + base + (worker < extra ? 1 : 0);
        return new int[]{from, to};
    }

    /**
     * Applies every increment of {@code deltas} to {@code counter} using up to
     * {@code threads} workers that all start at the same moment.
     *
     * @return the value of the counter once every worker has finished
     */
    public static long runConcurrent(long[] deltas, int threads, Counter counter) throws InterruptedException {
        int n = deltas.length;
        int workers = Math.max(1, Math.min(threads, Math.max(1, n)));
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(workers);

        for (int worker = 0; worker < workers; worker++) {
            int[] bounds = chunkBounds(n, workers, worker);
            int from = bounds[0];
            int to = bounds[1];
            Thread thread = new Thread(() -> {
                try {
                    start.await();
                    for (int i = from; i < to; i++) {
                        counter.add(deltas[i]);
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    done.countDown();
                }
            }, "worker-" + worker);
            thread.setDaemon(true);
            thread.start();
        }

        start.countDown();
        done.await();
        return counter.total();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        long[] deltas = new long[n];
        for (int i = 0; i < n; i++) {
            deltas[i] = fs.nextLong();
        }

        long atomic = runConcurrent(deltas, MAX_THREADS, new AtomicIntegerCounter());
        long monitor = runConcurrent(deltas, MAX_THREADS, new SynchronizedCounter());
        long adder = runConcurrent(deltas, MAX_THREADS, new LongAdderCounter());

        StringBuilder out = new StringBuilder();
        out.append(atomic).append('\\n').append(monitor).append('\\n').append(adder).append('\\n');
        System.out.print(out);
    }
}
`,n=`import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.LongAdder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Thread-Safe Counter
 * LeetCode: null | Difficulty: Easy | Frequency: 4/5
 * Pattern: Concurrency, Atomics vs monitors vs striped adder
 *
 * <p>Problem:
 * A counter is incremented by many threads at the same time. Compare the three classic
 * ways of doing it safely — an {@link AtomicInteger}, a counter guarded by
 * {@code synchronized} and a {@link LongAdder} — and show that all three end up with the
 * same total.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * d1
 * d2
 * ...
 * dn
 * </pre>
 * {@code n} is the number of increments and {@code d1..dn} are the amounts to add (usually
 * all {@code 1}). The program prints three lines: the total reached by the
 * {@link AtomicInteger}, by the {@code synchronized} counter and by the {@link LongAdder}.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1
 * 2
 * 3
 * 4
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 15
 * 15
 * 15
 * </pre>
 *
 * <p>Approach: every implementation runs the same workload — the increments are split
 * into contiguous chunks, one per worker thread, and all workers are released at the same
 * time by a {@link CountDownLatch}. The threads are joined before the totals are read,
 * so the printed result never depends on the scheduling.
 *
 * <p>Complexity: Time O(n) overall, Space O(1) besides the workload itself.
 */
public class Main {

    /** The behaviour every counter implementation has to provide. */
    public interface Counter {
        void add(long delta);

        long total();
    }

    /** A counter guarded by the instance monitor. */
    public static final class SynchronizedCounter implements Counter {
        private long value;

        @Override
        public synchronized void add(long delta) {
            value += delta;
        }

        @Override
        public synchronized long total() {
            return value;
        }
    }

    /** A counter backed by an {@link AtomicInteger}. */
    public static final class AtomicIntegerCounter implements Counter {
        private final AtomicInteger value = new AtomicInteger();

        @Override
        public void add(long delta) {
            value.addAndGet((int) delta);
        }

        @Override
        public long total() {
            return value.get();
        }
    }

    /** A counter backed by a {@link LongAdder} — the fastest choice under heavy contention. */
    public static final class LongAdderCounter implements Counter {
        private final LongAdder value = new LongAdder();

        @Override
        public void add(long delta) {
            value.add(delta);
        }

        @Override
        public long total() {
            return value.sum();
        }
    }

    /** How many worker threads the comparison uses. */
    public static final int MAX_THREADS = 4;

    /**
     * Splits {@code n} increments into {@code workers} contiguous chunks; the first
     * workers get the remainder.
     *
     * @return {@code {from, to}} — the half open range owned by {@code worker}
     */
    public static int[] chunkBounds(int n, int workers, int worker) {
        int base = n / workers;
        int extra = n % workers;
        int from = worker * base + Math.min(worker, extra);
        int to = from + base + (worker < extra ? 1 : 0);
        return new int[]{from, to};
    }

    /**
     * Applies every increment of {@code deltas} to {@code counter} using up to
     * {@code threads} workers that all start at the same moment.
     *
     * @return the value of the counter once every worker has finished
     */
    public static long runConcurrent(long[] deltas, int threads, Counter counter) throws InterruptedException {
        int n = deltas.length;
        int workers = Math.max(1, Math.min(threads, Math.max(1, n)));
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(workers);

        for (int worker = 0; worker < workers; worker++) {
            int[] bounds = chunkBounds(n, workers, worker);
            int from = bounds[0];
            int to = bounds[1];
            Thread thread = new Thread(() -> {
                try {
                    start.await();
                    for (int i = from; i < to; i++) {
                        counter.add(deltas[i]);
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    done.countDown();
                }
            }, "worker-" + worker);
            thread.setDaemon(true);
            thread.start();
        }

        start.countDown();
        done.await();
        return counter.total();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        long[] deltas = new long[n];
        for (int i = 0; i < n; i++) {
            deltas[i] = fs.nextLong();
        }

        long atomic = runConcurrent(deltas, MAX_THREADS, new AtomicIntegerCounter());
        long monitor = runConcurrent(deltas, MAX_THREADS, new SynchronizedCounter());
        long adder = runConcurrent(deltas, MAX_THREADS, new LongAdderCounter());

        StringBuilder out = new StringBuilder();
        out.append(atomic).append('\\n').append(monitor).append('\\n').append(adder).append('\\n');
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
`,r=`
# Thread-Safe Counter

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Concurrency · Atomics · Lock-free |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Netflix |

## Problem Statement

A counter is incremented by many threads at the same time. Compare the three classic
ways of doing that safely:

1. an **\`AtomicInteger\`** — a lock-free compare-and-swap loop,
2. a counter guarded by **\`synchronized\`** — one monitor, one thread at a time,
3. a **\`LongAdder\`** — a striped counter that spreads the contention over several cells.

All three must produce the same total. The program runs the same workload three times,
once per implementation, and prints the three totals.

## Input Format

\`\`\`
n
d1
d2
...
dn
\`\`\`

- \`n\` — the number of increments.
- \`d1..dn\` — the amount each increment adds (usually all \`1\`).

The program prints three lines:

1. the total reached by the \`AtomicInteger\`,
2. the total reached by the \`synchronized\` counter,
3. the total reached by the \`LongAdder\`.

## Sample Input

\`\`\`
5
1
2
3
4
5
\`\`\`

## Expected Output

\`\`\`
15
15
15
\`\`\`

\`1 + 2 + 3 + 4 + 5 = 15\`, whichever implementation is used.

## Approach — the same workload, three implementations

The workload is fixed:

1. Split the \`n\` increments into contiguous chunks, one per worker.
2. Start all workers, but hold them at a \`CountDownLatch\` so they all begin at the same
   moment — that is what creates the contention.
3. Each worker applies its chunk to the counter.
4. The main thread waits on a second \`CountDownLatch\` and only then reads the total.

Because the workers are joined before the total is read, the printed result is the same
on every run — the *contention pattern* differs, the *answer* does not.

| Implementation | How it works | Cost per increment |
|---|---|---|
| \`AtomicInteger\` | \`addAndGet\` — a CAS loop on one word | one atomic instruction, but **all** threads fight for the same cache line |
| \`synchronized\` | the monitor serialises the whole method | a real blocking lock, plus the context switch |
| \`LongAdder\` | the value is spread over a table of cells, each updated with its own CAS | the cheapest under heavy contention, but \`sum()\` is not atomic |

\`LongAdder\` wins when there are many threads and many increments; \`AtomicInteger\` wins
for a single thread or a read-heavy workload.

## Dry Run

\`n = 5\`, increments \`1, 2, 3, 4, 5\`, \`MAX_THREADS = 4\` workers. The chunks are
\`[1]\`, \`[2]\`, \`[3]\`, \`[4, 5]\` — the first workers get the remainder.

The table shows **one valid interleaving** of the workers. The rows move from run to run,
the totals do not.

| Step | Worker | Chunk | \`AtomicInteger\` before | Action | \`AtomicInteger\` after | \`synchronized\` before | after | \`LongAdder\` before | after |
|---:|---|---|---:|---|---:|---:|---:|---:|---:|
| 1 | W0 | \`[1]\` | 0 | \`addAndGet(1)\` | 1 | 0 | 1 | 0 | 1 |
| 2 | W1 | \`[2]\` | 1 | \`addAndGet(2)\` | 3 | 1 | 3 | 1 | 3 |
| 3 | W2 | \`[3]\` | 3 | \`addAndGet(3)\` | 6 | 3 | 6 | 3 | 6 |
| 4 | W3 | \`[4,5]\` | 6 | \`addAndGet(4)\` | 10 | 6 | 10 | 6 | 10 |
| 5 | W3 | \`[4,5]\` | 10 | \`addAndGet(5)\` | 15 | 10 | 15 | 10 | 15 |

All three counters end at **15**.

### What a lost update would look like

Without any synchronisation, two threads can read the same value and write back the same
result — the classic lost update:

| Step | Thread A | Thread B | Counter |
|---:|---|---|---:|
| 1 | reads \`v = 0\` | | 0 |
| 2 | | reads \`v = 0\` | 0 |
| 3 | writes \`0 + 1 = 1\` | | 1 |
| 4 | | writes \`0 + 1 = 1\` | **1** — the increment of A is lost |

\`addAndGet\` cannot do this: the write is a compare-and-swap, so if two threads race,
the loser retries with the new value.

### The \`synchronized\` version serialises the same work

| Step | Thread | Monitor | Action | Counter |
|---:|---|---|---|---:|
| 1 | W0 | held | \`value += 1\` | 1 |
| 2 | W1 | held | \`value += 2\` | 3 |
| 3 | W2 | held | \`value += 3\` | 6 |
| 4 | W3 | held | \`value += 4\`, \`value += 5\` | 15 |

Identical result, but the threads take turns — with four threads on a four core machine
the monitor serialises all of them.

### The \`LongAdder\` version spreads the writes

| Step | Thread | Cell it updates | Cell totals after | \`sum()\` |
|---:|---|---|---|---:|
| 1 | W0 | cell \`a\` | \`a = 1\` | 1 |
| 2 | W1 | cell \`b\` | \`a = 1, b = 2\` | 3 |
| 3 | W2 | cell \`a\` (contended, but not the same word as W1) | \`a = 4, b = 2\` | 6 |
| 4 | W3 | cell \`c\` | \`a = 4, b = 2, c = 9\` | 15 |

Two threads that update *different* cells do not invalidate each other's cache line —
that is the whole idea of \`LongAdder\`.

## Java Solution

See [\`AtomicCounter.java\`](./AtomicCounter.java).

\`\`\`java
public static final class AtomicIntegerCounter implements Counter {
    private final AtomicInteger value = new AtomicInteger();

    @Override
    public void add(long delta) {
        value.addAndGet((int) delta);
    }

    @Override
    public long total() {
        return value.get();
    }
}

public static final class SynchronizedCounter implements Counter {
    private long value;

    @Override
    public synchronized void add(long delta) {
        value += delta;
    }

    @Override
    public synchronized long total() {
        return value;
    }
}

public static long runConcurrent(long[] deltas, int threads, Counter counter)
        throws InterruptedException {
    CountDownLatch start = new CountDownLatch(1);
    CountDownLatch done = new CountDownLatch(workers);
    for (int worker = 0; worker < workers; worker++) {
        new Thread(() -> {
            start.await();                       // all workers start together
            for (int i = from; i < to; i++) {
                counter.add(deltas[i]);
            }
            done.countDown();
        }).start();
    }
    start.countDown();
    done.await();                               // nobody reads before this returns
    return counter.total();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) overall, O(1) per increment | each increment touches one cell / one word |
| **Space** | O(1) per implementation | one word for the atomic, a small table for the adder |

## Interview Notes

**Follow-ups to raise yourself:**
- *"When do you use \`LongAdder\` over \`AtomicLong\`?"* → when there are many threads and
  many writes and the reads are rare; the adder is not atomic for \`sum()\`, so it must
  not be used when the value has to be read and written as one atomic unit.
- *"What is a compare-and-swap?"* → an atomic instruction that writes a value only if the
  memory still holds the expected value; it is the building block of every lock-free
  algorithm.
- *"What is the ABA problem?"* → a CAS can succeed on a value that changed and changed
  back; the fix is a versioned stamp (as in \`AtomicStampedReference\`).
- *"How would you build a lock-free stack?"* → a Treiber stack with a CAS on the head.
- *"What does \`volatile\` give you and what does it not?"* → visibility and ordering, but
  **not** atomicity of \`count++\`.

**Common mistakes:**
- ❌ Believing \`volatile int count; count++;\` is atomic — it is a read, a write and a race.
- ❌ Reading \`LongAdder.sum()\` and expecting an atomic snapshot of the value.
- ❌ Using \`AtomicInteger\` for the sum of a \`long\` → it truncates; use \`AtomicLong\`.
- ❌ Printing the counter from the worker threads → the output would interleave.
- ❌ Forgetting the \`join\`/\`await\` before reading the total → a torn result.

**How to narrate:**
> "There are three ways. \`synchronized\` is the simplest but serialises the threads.
> \`AtomicInteger\` is lock-free — a compare-and-swap loop on one word — but all the
> threads fight for the same cache line. \`LongAdder\` spreads the increments over several
> cells, so two threads usually touch different words; it is much faster under heavy
> contention, at the price of a \`sum()\` that is not atomic. I'll run the same workload
> three times, release all the workers at once with a latch, and join them before
> reading the totals, so the printed numbers are reproducible."

## Related Problems

- [Singleton with Double-Checked Locking](./SingletonDoubleCheckedLocking.md) — \`volatile\`
  versus a lock, the other half of the story
- [Bounded Blocking Queue](./BoundedBlockingQueue.md) — the blocking alternative
- [Concurrent Sum using Threads](./ConcurrentSumWithThreads.md) — the same latch-and-join
  discipline
`,i=[`chunkBounds`,`runConcurrent`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};