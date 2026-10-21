package com.dsa.design;

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
            out.append(semaphore.availablePermits()).append('\n');
        }
        System.out.print(out);
    }
}
