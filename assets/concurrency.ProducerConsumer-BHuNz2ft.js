var e=`concurrency.ProducerConsumer`,t=`package com.dsa.concurrency;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

/**
 * Problem: Producer–Consumer Problem
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Concurrency, Blocking queue, Poison pill
 *
 * <p>Problem:
 * A producer thread creates items 1..n and pushes them into a bounded buffer; a fixed
 * number of consumer threads take items out of the buffer. The buffer has a fixed
 * capacity, so the producer must block when it is full and the consumers must block when
 * it is empty. Every produced item must be consumed exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity
 * nItems
 * nConsumers
 * </pre>
 * The program prints the consumed items, one per line, sorted so that the output does not
 * depend on the order the consumers happened to run in.
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 2
 * 3
 * 4
 * 5
 * </pre>
 *
 * <p>Approach: an {@link ArrayBlockingQueue} already provides the bounded buffer with
 * blocking {@code put}/{@code take}. The producer publishes the items and then one poison
 * pill per consumer; because the queue is FIFO the consumers always drain the real items
 * before they meet a pill, so every consumer eventually sees exactly one pill and exits.
 *
 * <p>Complexity: Time O(n) overall, Space O(capacity + n).
 */
public class ProducerConsumer {

    /** Sentinel that tells a consumer "the production is over". */
    public static final int POISON = Integer.MIN_VALUE;

    private final BlockingQueue<Integer> buffer;
    private final List<Integer> consumed = Collections.synchronizedList(new ArrayList<>());

    public ProducerConsumer(int capacity) {
        this.buffer = new ArrayBlockingQueue<>(Math.max(1, capacity));
    }

    /** Produces {@code 1..total} and then one poison pill per consumer. */
    public void produce(int total, int consumers) throws InterruptedException {
        for (int value = 1; value <= total; value++) {
            buffer.put(value);
        }
        for (int i = 0; i < consumers; i++) {
            buffer.put(POISON);
        }
    }

    /** Takes one item; the poison pill is returned as {@link #POISON}. */
    public int consume() throws InterruptedException {
        return buffer.take();
    }

    /** Contents of the buffer right now — used by the tests. */
    public List<Integer> bufferContents() {
        synchronized (buffer) {
            return new ArrayList<>(buffer);
        }
    }

    /** Items consumed so far. */
    public List<Integer> consumedItems() {
        synchronized (consumed) {
            return new ArrayList<>(consumed);
        }
    }

    /**
     * Runs a complete producer/consumer round and returns the consumed items.
     * The caller receives them in an arbitrary order.
     */
    public static List<Integer> run(int capacity, int totalItems, int nConsumers) throws InterruptedException {
        ProducerConsumer pc = new ProducerConsumer(capacity);
        List<Thread> threads = new ArrayList<>();

        Thread producer = new Thread(() -> {
            try {
                pc.produce(totalItems, nConsumers);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "producer");
        threads.add(producer);
        producer.start();

        for (int i = 0; i < nConsumers; i++) {
            Thread consumer = new Thread(() -> {
                try {
                    while (true) {
                        int value = pc.consume();
                        if (value == POISON) {
                            return;
                        }
                        pc.consumed.add(value);
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }, "consumer-" + i);
            threads.add(consumer);
            consumer.start();
        }

        for (Thread thread : threads) {
            thread.join();
        }
        return pc.consumedItems();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        int totalItems = fs.nextInt();
        int nConsumers = fs.nextInt();

        List<Integer> items = run(capacity, totalItems, Math.max(1, nConsumers));
        Collections.sort(items);

        StringBuilder out = new StringBuilder();
        for (Integer item : items) {
            out.append(item).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Producer–Consumer Problem
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Concurrency, Blocking queue, Poison pill
 *
 * <p>Problem:
 * A producer thread creates items 1..n and pushes them into a bounded buffer; a fixed
 * number of consumer threads take items out of the buffer. The buffer has a fixed
 * capacity, so the producer must block when it is full and the consumers must block when
 * it is empty. Every produced item must be consumed exactly once.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity
 * nItems
 * nConsumers
 * </pre>
 * The program prints the consumed items, one per line, sorted so that the output does not
 * depend on the order the consumers happened to run in.
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 2
 * 3
 * 4
 * 5
 * </pre>
 *
 * <p>Approach: an {@link ArrayBlockingQueue} already provides the bounded buffer with
 * blocking {@code put}/{@code take}. The producer publishes the items and then one poison
 * pill per consumer; because the queue is FIFO the consumers always drain the real items
 * before they meet a pill, so every consumer eventually sees exactly one pill and exits.
 *
 * <p>Complexity: Time O(n) overall, Space O(capacity + n).
 */
public class Main {

    /** Sentinel that tells a consumer "the production is over". */
    public static final int POISON = Integer.MIN_VALUE;

    private final BlockingQueue<Integer> buffer;
    private final List<Integer> consumed = Collections.synchronizedList(new ArrayList<>());

    public Main(int capacity) {
        this.buffer = new ArrayBlockingQueue<>(Math.max(1, capacity));
    }

    /** Produces {@code 1..total} and then one poison pill per consumer. */
    public void produce(int total, int consumers) throws InterruptedException {
        for (int value = 1; value <= total; value++) {
            buffer.put(value);
        }
        for (int i = 0; i < consumers; i++) {
            buffer.put(POISON);
        }
    }

    /** Takes one item; the poison pill is returned as {@link #POISON}. */
    public int consume() throws InterruptedException {
        return buffer.take();
    }

    /** Contents of the buffer right now — used by the tests. */
    public List<Integer> bufferContents() {
        synchronized (buffer) {
            return new ArrayList<>(buffer);
        }
    }

    /** Items consumed so far. */
    public List<Integer> consumedItems() {
        synchronized (consumed) {
            return new ArrayList<>(consumed);
        }
    }

    /**
     * Runs a complete producer/consumer round and returns the consumed items.
     * The caller receives them in an arbitrary order.
     */
    public static List<Integer> run(int capacity, int totalItems, int nConsumers) throws InterruptedException {
        Main pc = new Main(capacity);
        List<Thread> threads = new ArrayList<>();

        Thread producer = new Thread(() -> {
            try {
                pc.produce(totalItems, nConsumers);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "producer");
        threads.add(producer);
        producer.start();

        for (int i = 0; i < nConsumers; i++) {
            Thread consumer = new Thread(() -> {
                try {
                    while (true) {
                        int value = pc.consume();
                        if (value == POISON) {
                            return;
                        }
                        pc.consumed.add(value);
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }, "consumer-" + i);
            threads.add(consumer);
            consumer.start();
        }

        for (Thread thread : threads) {
            thread.join();
        }
        return pc.consumedItems();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        int totalItems = fs.nextInt();
        int nConsumers = fs.nextInt();

        List<Integer> items = run(capacity, totalItems, Math.max(1, nConsumers));
        Collections.sort(items);

        StringBuilder out = new StringBuilder();
        for (Integer item : items) {
            out.append(item).append('\\n');
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
`,r=`
# Producer–Consumer Problem

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Concurrency · Blocking queue · Poison pill |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Netflix |

## Problem Statement

The classic producer/consumer problem:

- a **producer** thread creates items and pushes them into a **bounded buffer**;
- a fixed number of **consumer** threads take items out of the buffer;
- the buffer has a fixed capacity, so the producer must **block** when it is full and the
  consumers must **block** when it is empty;
- every produced item must be consumed **exactly once** — nothing lost, nothing
  duplicated.

The output of this program is the set of consumed items. Since *which* consumer picks up
*which* item depends on the scheduler, the items are printed sorted, so the output is
identical on every run.

## Input Format

\`\`\`
capacity
nItems
nConsumers
\`\`\`

- \`capacity\` — the size of the bounded buffer (≥ 1).
- \`nItems\` — how many items the producer creates; the items are \`1..nItems\`.
- \`nConsumers\` — how many consumer threads to start.

The program prints the consumed items, one per line, in ascending order.

## Sample Input

\`\`\`
2
5
3
\`\`\`

## Expected Output

\`\`\`
1
2
3
4
5
\`\`\`

Every item is consumed exactly once, so the sorted output is always \`1..5\`.

## Approach — a blocking queue and a poison pill

An \`ArrayBlockingQueue\` already **is** the bounded buffer with blocking \`put\`/\`take\`, so
the interesting part is knowing when the consumers should stop.

The usual solution is the **poison pill**: after producing all the real items, the
producer pushes one sentinel value per consumer. Because the queue is FIFO:

- the consumers always drain the real items **before** they meet a pill,
- there is exactly one pill per consumer, so every consumer takes exactly one pill and
  exits.

No shared "are we done?" flag, no \`Thread.sleep\`, no busy waiting — and the producer
never blocks forever, because the consumers keep taking items while it is trying to push
the pills.

The main thread **joins** every thread before it reads the result, so the output can
never depend on the scheduling.

## Dry Run

\`capacity = 2\`, \`nItems = 5\`, \`nConsumers = 3\`.

The table shows **one valid interleaving** of the threads. The *order* of the rows
changes from run to run — that is the whole point of the problem — but the invariants in
the last column never do.

| Step | Thread | Action | Buffer before | Buffer after | Blocking? | Notes |
|---:|---|---|---|---|---|---|
| 1 | producer | \`put 1\` | \`[]\` | \`[1]\` | no | buffer has room |
| 2 | producer | \`put 2\` | \`[1]\` | \`[1, 2]\` | no | buffer is now **full** |
| 3 | producer | \`put 3\` | \`[1, 2]\` | \`[1, 2]\` | **yes** | \`put\` blocks, the buffer is full |
| 4 | consumer-0 | \`take\` | \`[1, 2]\` | \`[2]\` | no | takes \`1\`, frees one slot |
| 5 | producer | \`put 3\` (resumes) | \`[2]\` | \`[2, 3]\` | no | the blocked \`put\` completes |
| 6 | consumer-1 | \`take\` | \`[2, 3]\` | \`[3]\` | no | takes \`2\` |
| 7 | producer | \`put 4\` | \`[3]\` | \`[3, 4]\` | no | buffer is full again |
| 8 | producer | \`put 5\` | \`[3, 4]\` | \`[3, 4]\` | **yes** | blocks |
| 9 | consumer-2 | \`take\` | \`[3, 4]\` | \`[4]\` | no | takes \`3\` |
| 10 | producer | \`put 5\` (resumes) | \`[4]\` | \`[4, 5]\` | no | completes |
| 11 | consumer-0 | \`take\` | \`[4, 5]\` | \`[5]\` | no | takes \`4\` |
| 12 | producer | \`put pill\` | \`[5]\` | \`[5, pill]\` | no | all 5 items are produced |
| 13 | producer | \`put pill\` | \`[5, pill]\` | \`[5, pill]\` | **yes** | the buffer is full |
| 14 | consumer-1 | \`take\` | \`[5, pill]\` | \`[pill]\` | no | takes \`5\` |
| 15 | producer | \`put pill\` (resumes) | \`[pill]\` | \`[pill, pill]\` | no | second pill |
| 16 | consumer-2 | \`take\` | \`[pill, pill]\` | \`[pill]\` | no | takes a pill → consumer-2 exits |
| 17 | consumer-0 | \`take\` | \`[pill]\` | \`[]\` | no | takes a pill → consumer-0 exits |
| 18 | consumer-1 | \`take\` | \`[]\` | \`[]\` | **yes** | blocks, waiting for its pill |
| 19 | — | — | \`[]\` | — | — | consumer-1 is the only consumer left |

### The invariants that hold on **every** interleaving

| Invariant | Why |
|---|---|
| The buffer never holds more than \`capacity\` items | \`ArrayBlockingQueue\` enforces it |
| Every item \`1..nItems\` is consumed exactly once | the items are produced once and taken once |
| No consumer ever takes a real item after a pill | the queue is FIFO, the pills are pushed last |
| Every consumer takes exactly one pill | there is one pill per consumer |
| No thread is left blocked when the producer is done | the pills always unblock the consumers |

The **output** of the program is the sorted list of consumed items — \`1, 2, 3, 4, 5\` for
this sample, no matter how the rows above were interleaved.

## Java Solution

See [\`ProducerConsumer.java\`](./ProducerConsumer.java).

\`\`\`java
public void produce(int total, int consumers) throws InterruptedException {
    for (int value = 1; value <= total; value++) {
        buffer.put(value);              // blocks while the buffer is full
    }
    for (int i = 0; i < consumers; i++) {
        buffer.put(POISON);             // one pill per consumer
    }
}

public static List<Integer> run(int capacity, int totalItems, int nConsumers)
        throws InterruptedException {
    ProducerConsumer pc = new ProducerConsumer(capacity);
    List<Thread> threads = new ArrayList<>();

    Thread producer = new Thread(() -> { ... pc.produce(totalItems, nConsumers); ... });
    threads.add(producer);
    producer.start();

    for (int i = 0; i < nConsumers; i++) {
        Thread consumer = new Thread(() -> {
            while (true) {
                int value = pc.consume();          // blocks while the buffer is empty
                if (value == POISON) {
                    return;                        // the producer is done
                }
                pc.consumed.add(value);
            }
        });
        threads.add(consumer);
        consumer.start();
    }

    for (Thread thread : threads) {
        thread.join();                 // nobody is read before it finished
    }
    return pc.consumedItems();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) overall | every item is produced once and consumed once |
| **Space** | O(capacity + n) | the buffer plus the list of consumed items |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you avoid the poison pill?"* → an \`AtomicInteger\` of remaining items plus a
  \`while (remaining.get() > 0 || !queue.isEmpty())\` loop; the pill is usually cleaner.
- *"What if the consumers had to acknowledge the items?"* → an ack queue per consumer, or
  a \`CompletableFuture\` per item.
- *"How would you make it fair?"* → a \`ReentrantLock(true)\` and a fair \`ArrayBlockingQueue\`
  (\`new ArrayBlockingQueue<>(capacity, true)\`).
- *"What if the producer failed halfway?"* → catch the exception, push the pills anyway
  in a \`finally\` block, otherwise the consumers block forever.
- *"How would you scale it to many producers and consumers?"* → several producers and
  consumers sharing one queue; the queue is the only shared state.

**Common mistakes:**
- ❌ Using \`Thread.sleep\` instead of a blocking queue → the classic busy-wait.
- ❌ Forgetting to join the threads → the main thread may read the result before the
  consumers are done, so the output is not reproducible.
- ❌ Printing from the worker threads → the lines interleave, the output is garbage.
- ❌ Pushing only **one** pill → the other consumers block forever on \`take()\`.
- ❌ Not handling \`InterruptedException\` → the interrupt is swallowed.

**How to narrate:**
> "The bounded buffer is an \`ArrayBlockingQueue\` — it already blocks the producer when
> it is full and the consumers when it is empty. The only thing I have to design is the
> shutdown: the producer pushes one poison pill per consumer after the real items, and
> because the queue is FIFO every consumer drains the items first and then finds exactly
> one pill and exits. In the main thread I join everybody before I read the result, so
> the output never depends on the scheduling."

## Related Problems

- [Bounded Blocking Queue](./BoundedBlockingQueue.md) — the buffer itself, written by hand
- [Atomic Counter](./AtomicCounter.md) — a shared counter without locks
- [Concurrent Sum using Threads](./ConcurrentSumWithThreads.md) — the same join-then-read
  discipline
`,i=[`run`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};