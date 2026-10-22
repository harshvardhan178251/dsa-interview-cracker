var e=`concurrency.ParallelPipelineMerge`,t=`package com.dsa.concurrency;

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
            out.append(value).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CountDownLatch;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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
            out.append(value).append('\\n');
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
`,r='\n# Parallel Pipeline Merge\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Concurrency · Pipeline · Ordered merge |\n| **Interview heat** | ★★☆☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Netflix |\n\n## Problem Statement\n\nPush a list of values through a pipeline of `stages` stages.\n\n- Every stage is executed by a pool of worker threads.\n- Stage `s` (1-based) transforms a value `x` into `x * 2^s`.\n- The stages hand their results to each other through **bounded queues**, so the stages\n  really overlap: stage 2 can already work on an item while stage 1 is still busy with\n  the next one.\n- The items leave the pipeline in **completion order**, which depends on the scheduling.\n- The **merge** step has to put them back into the original input order.\n\nThe output of the program is the merged result of every item, one per line, in input\norder — identical on every run.\n\n## Input Format\n\n```\nstages\nn\nv1 v2 ... vn\n```\n\n- `stages` — the number of pipeline stages.\n- `n` — the number of values.\n- `v1..vn` — the values.\n\nThe program prints the merged result of every item, one per line, in input order.\n\n## Sample Input\n\n```\n3\n4\n1 2 3 4\n```\n\n## Expected Output\n\n```\n64\n128\n192\n256\n```\n\nWith three stages the total factor is `2¹ · 2² · 2³ = 2⁶ = 64`, so the value `1`\nbecomes `64`, `2` becomes `128`, and so on.\n\n## Approach — one bounded queue per stage plus a merger thread\n\n```\nqueue[0] ──▶ [stage 1 workers] ──▶ queue[1] ──▶ [stage 2 workers] ──▶ queue[2] ──▶ …\n                                                     …\n                                     queue[stages] ──▶ [merger thread] ──▶ results[]\n```\n\n- `queue[0]` is pre-filled with all the items, each carrying its **original index**.\n- The workers of stage `s` take an item from `queue[s-1]`, transform it and put it into\n  `queue[s]`.\n- The **merger** thread drains `queue[stages]` and writes every value into\n  `results[item.index]` — the merge that restores the input order. The index travels\n  with the item through the whole pipeline, so no matter in which order the items\n  arrive, each one lands in its own slot.\n- A `CountDownLatch` counts the merged items. When all `n` items are merged the workers\n  are interrupted and the program reads the results.\n\n**Why the merge is necessary.** Without it the output would be the completion order,\nwhich changes from run to run — the pipeline is concurrent, the *result* must not be.\n\n**Why a bounded queue.** An unbounded queue would let the first stage run ahead and\nbuffer everything in memory; the bounded queue applies back pressure, so a slow stage\nslows the pipeline down instead of the memory growing.\n\n## Dry Run\n\n`stages = 3`, values `[1, 2, 3, 4]`. Stage `s` multiplies by `2^s`.\n\nThe table shows **one valid interleaving** — the row order changes from run to run, the\nfinal result never does.\n\n| Step | Thread | Action | `queue[0]` | `queue[1]` | `queue[2]` | `queue[3]` | `results[]` |\n|---:|---|---|---|---|---|---|---|\n| 1 | — | fill the input queue | `[1,2,3,4]` | `[]` | `[]` | `[]` | `[_,_,_,_]` |\n| 2 | S1-W0 | take `1` → `1*2 = 2` | `[2,3,4]` | `[2]` | `[]` | `[]` | `[_,_,_,_]` |\n| 3 | S1-W1 | take `2` → `2*2 = 4` | `[3,4]` | `[2,4]` | `[]` | `[]` | `[_,_,_,_]` |\n| 4 | S2-W0 | take `2` → `2*4 = 8` | `[3,4]` | `[4]` | `[8]` | `[]` | `[_,_,_,_]` |\n| 5 | S1-W2 | take `3` → `3*2 = 6` | `[4]` | `[4,6]` | `[8]` | `[]` | `[_,_,_,_]` |\n| 6 | S2-W1 | take `4` → `4*4 = 16` | `[4]` | `[6]` | `[8,16]` | `[]` | `[_,_,_,_]` |\n| 7 | S3-W0 | take `8` → `8*8 = 64` | `[4]` | `[6]` | `[16]` | `[64]` | `[_,_,_,_]` |\n| 8 | merger | take `64` (index 0) | `[4]` | `[6]` | `[16]` | `[]` | `[64,_,_,_]` |\n| 9 | S1-W3 | take `4` → `4*2 = 8` | `[]` | `[6,8]` | `[16]` | `[]` | `[64,_,_,_]` |\n| 10 | S2-W2 | take `6` → `6*4 = 24` | `[]` | `[8]` | `[16,24]` | `[]` | `[64,_,_,_]` |\n| 11 | S2-W3 | take `8` → `8*4 = 32` | `[]` | `[]` | `[16,24,32]` | `[]` | `[64,_,_,_]` |\n| 12 | S3-W1 | take `16` → `16*8 = 128` | `[]` | `[]` | `[24,32]` | `[128]` | `[64,_,_,_]` |\n| 13 | merger | take `128` (index 1) | `[]` | `[]` | `[24,32]` | `[]` | `[64,128,_,_]` |\n| 14 | S3-W2 | take `24` → `24*8 = 192` | `[]` | `[]` | `[32]` | `[192]` | `[64,128,_,_]` |\n| 15 | S3-W3 | take `32` → `32*8 = 256` | `[]` | `[]` | `[]` | `[192,256]` | `[64,128,_,_]` |\n| 16 | merger | take `192` (index 2) | `[]` | `[]` | `[]` | `[256]` | `[64,128,192,_]` |\n| 17 | merger | take `256` (index 3) → latch reaches 0 | `[]` | `[]` | `[]` | `[]` | `[64,128,192,256]` |\n\nNote how the merger receives the items in the order `64, 128, 192, 256` here, but it\ncould have received them in any order — the **index** carried by each item decides where\nit lands. That is the merge.\n\n### The merge matters — the same run without it\n\n| Step | Merger receives | Without the index | With the index |\n|---:|---|---|---|\n| 1 | item of value `64` | slot 0 | slot 0 (its index) |\n| 2 | item of value `256` | slot 1 | slot 3 (its index) |\n| 3 | item of value `192` | slot 2 | slot 2 |\n| 4 | item of value `128` | slot 3 | slot 1 |\n\nWithout the index the output would be `64, 256, 192, 128` — wrong order. With it, the\noutput is always `64, 128, 192, 256`.\n\n## Java Solution\n\nSee [`ParallelPipelineMerge.java`](./ParallelPipelineMerge.java).\n\n```java\nstatic final class Item {\n    final int index;                       // the original position of the item\n    final long value;\n}\n\n// worker of stage s\nItem in = queues[stageIndex - 1].take();\nlong out = in.value * (1L << stageIndex);\nqueues[stageIndex].put(new Item(in.index, out));\n\n// merger thread\nItem item = queues[stageCount].take();\nresults[item.index] = item.value;         // the merge restores the input order\nmerged.countDown();\n```\n\nThe main thread waits on `merged.await()`, interrupts the workers (they are blocked in\n`take()`) and then prints `results` in index order.\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · stages) overall | every item passes through every stage once |\n| **Space** | O(n · stages) worst case | the items can be queued in several stages at once |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"How would you bound the memory?"* → bounded queues (as here) apply back pressure; the\n  total number of items in flight is then limited by the queue capacities.\n- *"How would you make the stages different?"* → give each stage its own function instead\n  of the `x * 2^s` rule; the structure does not change.\n- *"What if the stages have different speeds?"* → the slow stage becomes the bottleneck;\n  more workers on the fast stages do not help. That is where a work-stealing scheduler\n  wins.\n- *"How would you parallelise it across machines?"* → each machine runs the stages for a\n  slice of the data and the merger combines the partial results — the same split/merge\n  pattern as a MapReduce job.\n- *"How would you handle an item that fails in stage 2?"* → a dead-letter queue and a\n  per-item error state carried along with the item.\n\n**Common mistakes:**\n- ❌ Returning the items in completion order → the output changes from run to run.\n- ❌ Forgetting to carry the original index along with the value.\n- ❌ Reading the results before the merger has finished → a race.\n- ❌ Using unbounded queues → the memory grows with the input size.\n- ❌ Forgetting to interrupt the workers → the program never terminates because the\n  workers wait for more items forever.\n- ❌ Sharing a plain `ArrayList` between the stages → it is not thread safe.\n\n**How to narrate:**\n> "A pipeline is a chain of bounded queues with a pool of workers behind each of them.\n> Every item carries its original index, so when the items come out in completion order\n> the merger can put each one back into its own slot — that is the merge, and it is what\n> makes the output reproducible. A countdown latch tells the main thread when all the\n> items have been merged; after that I interrupt the workers and print the result array\n> in index order."\n\n## Related Problems\n\n- [Producer–Consumer](./ProducerConsumer.md) — one bounded queue instead of a chain of them\n- [Bounded Blocking Queue](./BoundedBlockingQueue.md) — the queue this pipeline is built on\n- [Concurrent Sum using Threads](./ConcurrentSumWithThreads.md) — the same split/merge pattern\n  without the stages\n',i=[`run`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};