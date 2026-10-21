package com.dsa.concurrency;

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
        out.append(atomic).append('\n').append(monitor).append('\n').append(adder).append('\n');
        System.out.print(out);
    }
}
