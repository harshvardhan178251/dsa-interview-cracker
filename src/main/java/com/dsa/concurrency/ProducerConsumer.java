package com.dsa.concurrency;

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
            out.append(item).append('\n');
        }
        System.out.print(out);
    }
}
