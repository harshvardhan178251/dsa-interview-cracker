package com.dsa.concurrency;

import com.dsa.utils.FastScanner;

import java.util.concurrent.CountDownLatch;

/**
 * Problem: Singleton with Double-Checked Locking
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Concurrency, Double-checked locking, Safe publication
 *
 * <p>Problem:
 * Create a thread safe singleton with the classic double-checked locking pattern: the
 * fast path reads the instance without taking a lock, the slow path takes the class lock
 * and checks again. The instance field must be {@code volatile} so that the write of the
 * reference and the writes done by the constructor are published safely.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 * {@code n} is the number of threads that race for the instance. The program prints two
 * numbers: the number of distinct instances the threads observed and the number of
 * threads that saw a partially constructed instance. With the {@code volatile} field
 * both are {@code 1} and {@code 0}.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 0
 * </pre>
 *
 * <p>Approach: every thread calls {@code getInstance()} at the same time, released by a
 * {@link CountDownLatch}. The first thread that enters the synchronized block builds the
 * instance and publishes it with a volatile write; every other thread sees that write
 * and, because it is volatile, also sees the fields the constructor wrote.
 *
 * <p>Complexity: Time O(1) after the instance exists, Space O(1).
 */
public class SingletonDoubleCheckedLocking {

    /** The one and only instance — volatile is what makes the pattern safe. */
    private static volatile SingletonDoubleCheckedLocking instance;

    /** How often the constructor ran; only touched under the class monitor. */
    private static int constructions;

    /** Written last by the constructor, so a badly published instance shows up here. */
    private boolean ready;

    private final int id;

    private SingletonDoubleCheckedLocking() {
        constructions++;
        this.id = constructions;
        // A real constructor does some work; that is exactly what makes an unsafe
        // publication visible to another thread.
        this.ready = true;
    }

    /** The classic double-checked locking accessor. */
    public static SingletonDoubleCheckedLocking getInstance() {
        if (instance == null) {                 // first check: no lock
            synchronized (SingletonDoubleCheckedLocking.class) {
                if (instance == null) {         // second check: under the lock
                    instance = new SingletonDoubleCheckedLocking();
                }
            }
        }
        return instance;
    }

    /** True when the constructor finished before this instance was handed out. */
    public boolean isReady() {
        return ready;
    }

    /** The creation order of this instance. */
    public int id() {
        return id;
    }

    /** How often the constructor of the safe singleton ran. */
    public static int constructions() {
        return constructions;
    }

    /**
     * The broken variant: the field is <em>not</em> volatile, so a second thread may
     * observe a non-null reference to an instance whose constructor has not finished.
     */
    public static final class UnsafeSingleton {
        private static UnsafeSingleton unsafeInstance; // deliberately not volatile
        private boolean ready;

        private UnsafeSingleton() {
            ready = true;
        }

        public static UnsafeSingleton getInstance() {
            if (unsafeInstance == null) {
                synchronized (UnsafeSingleton.class) {
                    if (unsafeInstance == null) {
                        unsafeInstance = new UnsafeSingleton();
                    }
                }
            }
            return unsafeInstance;
        }

        public boolean isReady() {
            return ready;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int threads = Math.max(1, fs.nextInt());

        SingletonDoubleCheckedLocking[] observed = new SingletonDoubleCheckedLocking[threads];
        boolean[] ready = new boolean[threads];
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(threads);

        for (int i = 0; i < threads; i++) {
            final int slot = i;
            Thread thread = new Thread(() -> {
                try {
                    start.await();
                    SingletonDoubleCheckedLocking mine = getInstance();
                    observed[slot] = mine;
                    ready[slot] = mine.isReady();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    done.countDown();
                }
            }, "racer-" + i);
            thread.start();
        }

        start.countDown();
        done.await();

        int distinct = 0;
        int partial = 0;
        for (int i = 0; i < threads; i++) {
            if (observed[i] == null) {
                continue;
            }
            boolean known = false;
            for (int j = 0; j < i; j++) {
                if (observed[j] == observed[i]) {
                    known = true;
                    break;
                }
            }
            if (!known) {
                distinct++;
            }
            if (!ready[i]) {
                partial++;
            }
        }

        System.out.println(distinct + " " + partial);
    }
}
