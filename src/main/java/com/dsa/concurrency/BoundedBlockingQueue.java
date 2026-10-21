package com.dsa.concurrency;

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
                out.append(queue.offer(value) ? value : -1).append('\n');
            } else if ("take".equals(command)) {
                out.append(queue.poll()).append('\n');
            }
        }
        System.out.print(out);
    }
}
