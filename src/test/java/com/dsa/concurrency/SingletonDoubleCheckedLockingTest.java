package com.dsa.concurrency;

import org.junit.jupiter.api.Test;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SingletonDoubleCheckedLockingTest {

    @Test
    void alwaysReturnsTheSameInstance() {
        SingletonDoubleCheckedLocking first = SingletonDoubleCheckedLocking.getInstance();
        SingletonDoubleCheckedLocking second = SingletonDoubleCheckedLocking.getInstance();
        assertNotNull(first);
        assertSame(first, second);
    }

    @Test
    void theConstructorRunsOnlyOnce() {
        SingletonDoubleCheckedLocking.getInstance();
        int constructions = SingletonDoubleCheckedLocking.constructions();
        for (int i = 0; i < 100; i++) {
            SingletonDoubleCheckedLocking.getInstance();
        }
        assertEquals(constructions, SingletonDoubleCheckedLocking.constructions());
        assertEquals(1, constructions);
    }

    @Test
    void racingThreadsEndUpWithOneInstance() throws Exception {
        int threads = 32;
        SingletonDoubleCheckedLocking[] observed = new SingletonDoubleCheckedLocking[threads];
        boolean[] ready = new boolean[threads];
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(threads);

        for (int i = 0; i < threads; i++) {
            final int slot = i;
            Thread thread = new Thread(() -> {
                try {
                    start.await();
                    SingletonDoubleCheckedLocking mine = SingletonDoubleCheckedLocking.getInstance();
                    observed[slot] = mine;
                    ready[slot] = mine.isReady();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    done.countDown();
                }
            });
            thread.start();
        }

        start.countDown();
        assertTrue(done.await(10, TimeUnit.SECONDS));

        SingletonDoubleCheckedLocking reference = observed[0];
        AtomicInteger distinct = new AtomicInteger();
        for (int i = 0; i < threads; i++) {
            assertSame(reference, observed[i], "every thread must see the same instance");
            if (observed[i] != reference) {
                distinct.incrementAndGet();
            }
            assertTrue(ready[i], "no thread may see a partially constructed instance");
        }
        assertEquals(0, distinct.get());
    }

    @Test
    void theUnsafeVariantIsNotUsedByTheSafeOne() {
        SingletonDoubleCheckedLocking.UnsafeSingleton first =
                SingletonDoubleCheckedLocking.UnsafeSingleton.getInstance();
        SingletonDoubleCheckedLocking.UnsafeSingleton second =
                SingletonDoubleCheckedLocking.UnsafeSingleton.getInstance();
        assertNotNull(first);
        assertSame(first, second);
        assertNotNull(SingletonDoubleCheckedLocking.getInstance());
    }
}
