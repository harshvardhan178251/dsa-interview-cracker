package com.dsa.concurrency;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Concurrent Sum using Threads
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Concurrency, Work splitting, Join before reading
 *
 * <p>Problem:
 * Sum a large array with several threads. Every thread owns a contiguous chunk of the
 * array, computes the partial sum of its chunk and the partial sums are added up at the
 * end. The result must be exactly the sequential sum, no matter how the threads are
 * scheduled.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * v1 v2 ... vn
 * threads
 * </pre>
 * The program prints one line per thread with its partial sum and a final line with the
 * total.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * 9
 * 15
 * </pre>
 *
 * <p>Approach: the array is cut into {@code threads} contiguous chunks. Every worker
 * writes its partial sum into its own slot of the result array, so there is no shared
 * write and no lock. The main thread starts all workers, joins them and only then reads
 * the slots — the {@code join} creates the happens-before edge that makes the writes
 * visible.
 *
 * <p>Complexity: Time O(n) overall (O(n / threads) per worker), Space O(n) for the input
 * plus O(threads) for the partial sums.
 */
public class ConcurrentSumWithThreads {

    /**
     * Splits {@code n} elements into {@code workers} contiguous chunks. The first
     * workers get the remainder, so a chunk is never empty while elements are left.
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
     * Sums {@code values} with up to {@code threads} workers.
     *
     * @return one partial sum per worker, in worker order
     */
    public static long[] sumInChunks(long[] values, int threads) throws InterruptedException {
        int n = values.length;
        int workers = Math.max(1, Math.min(threads, Math.max(1, n)));
        long[] partial = new long[workers];
        List<Thread> workersList = new ArrayList<>();

        for (int worker = 0; worker < workers; worker++) {
            final int workerIndex = worker;
            int[] bounds = chunkBounds(n, workers, worker);
            int from = bounds[0];
            int to = bounds[1];
            Thread thread = new Thread(() -> {
                long sum = 0;
                for (int i = from; i < to; i++) {
                    sum += values[i];
                }
                partial[workerIndex] = sum;
            }, "summer-" + worker);
            workersList.add(thread);
            thread.start();
        }

        for (Thread thread : workersList) {
            thread.join();
        }
        return partial;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        long[] values = fs.nextLongArray(n);
        int threads = fs.nextInt();

        long[] partial = sumInChunks(values, Math.max(1, threads));

        StringBuilder out = new StringBuilder();
        long total = 0;
        for (long chunk : partial) {
            out.append(chunk).append('\n');
            total += chunk;
        }
        out.append(total).append('\n');
        System.out.print(out);
    }
}
