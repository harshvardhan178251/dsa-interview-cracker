package com.dsa.concurrency;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CountDownLatch;

/**
 * Problem: Parallel Pipeline Merge
 * LeetCode: null | Difficulty: Hard | Frequency: 2/5
 * Pattern: Concurrency, Pipeline of bounded queues, Ordered merge
 *
 * <p>Problem:
 * Push a list of values through a pipeline of {@code stages} stages. Every stage is
 * executed by a pool of worker threads and hands its results to the next stage through a
 * bounded queue, so the stages really overlap. The items leave the pipeline in
 * <em>completion</em> order, which depends on the scheduling; the merge step has to put
 * them back into the original input order.
 *
 * <p>Input format (stdin):
 * <pre>
 * stages
 * n
 * v1 v2 ... vn
 * </pre>
 * Stage {@code s} (1-based) transforms a value {@code x} into {@code x * 2^s}. The program
 * prints the merged result of every item, one per line, in input order.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 64
 * 128
 * 192
 * 256
 * </pre>
 *
 * <p>Approach: one {@link ArrayBlockingQueue} per stage. The workers of stage {@code s}
 * take an item from queue {@code s - 1}, transform it and put it into queue {@code s}. A
 * dedicated merger thread drains the last queue and writes every result into the slot
 * that belongs to the item's original index — that is the merge that restores the input
 * order. The merger counts the merged items down, and only when all of them are in place
 * the workers are interrupted.
 *
 * <p>Complexity: Time O(n * stages) overall, Space O(n * stages) for the queued items.
 */
public class ParallelPipelineMerge {

    /** One item travelling through the pipeline. */
    static final class Item {
        final int index;
        final long value;

        Item(int index, long value) {
            this.index = index;
            this.value = value;
        }
    }

    /** How many workers every stage gets. */
    public static final int MAX_WORKERS = 4;

    /**
     * Runs the pipeline and returns the merged results in input order.
     *
     * @param stages  number of stages, each multiplying by 2^stage
     * @param values  the values to push through the pipeline
     * @param workers number of worker threads per stage
     */
    @SuppressWarnings("unchecked")
    public static long[] run(int stages, long[] values, int workers) throws InterruptedException {
        int n = values.length;
        int stageCount = Math.max(1, stages);
        int workerCount = Math.max(1, Math.min(workers, Math.max(1, n)));

        BlockingQueue<Item>[] queues = new BlockingQueue[stageCount + 1];
        for (int i = 0; i <= stageCount; i++) {
            queues[i] = new ArrayBlockingQueue<>(Math.max(1, n));
        }
        for (int i = 0; i < n; i++) {
            queues[0].put(new Item(i, values[i]));
        }

        long[] results = new long[n];
        CountDownLatch merged = new CountDownLatch(n);

        Thread merger = new Thread(() -> {
            try {
                for (int i = 0; i < n; i++) {
                    Item item = queues[stageCount].take();
                    results[item.index] = item.value;
                    merged.countDown();
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "merger");
        merger.start();

        List<Thread> workerThreads = new ArrayList<>();
        for (int stage = 1; stage <= stageCount; stage++) {
            final int stageIndex = stage;
            for (int worker = 0; worker < workerCount; worker++) {
                Thread thread = new Thread(() -> {
                    try {
                        while (true) {
                            Item in = queues[stageIndex - 1].take();
                            long out = in.value * (1L << stageIndex);
                            queues[stageIndex].put(new Item(in.index, out));
                        }
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }, "stage-" + stage + "-worker-" + worker);
                workerThreads.add(thread);
                thread.start();
            }
        }

        merged.await();
        for (Thread thread : workerThreads) {
            thread.interrupt();
        }
        merger.join();
        return results;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int stages = fs.nextInt();
        int n = fs.nextInt();
        long[] values = fs.nextLongArray(n);

        long[] merged = run(stages, values, MAX_WORKERS);

        StringBuilder out = new StringBuilder();
        for (long value : merged) {
            out.append(value).append('\n');
        }
        System.out.print(out);
    }
}
