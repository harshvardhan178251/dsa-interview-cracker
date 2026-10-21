package com.dsa.design;

import org.junit.jupiter.api.Test;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SemaphoreClassTest {

    @Test
    void acquireTakesAPermit() throws Exception {
        SemaphoreClass semaphore = new SemaphoreClass(2);
        semaphore.acquire();
        assertEquals(1, semaphore.availablePermits());
        assertEquals(2, semaphore.totalPermits());
    }

    @Test
    void releaseGivesAPermitBack() throws Exception {
        SemaphoreClass semaphore = new SemaphoreClass(1);
        semaphore.acquire();
        semaphore.release();
        assertEquals(1, semaphore.availablePermits());
    }

    @Test
    void tryAcquireOnlySucceedsWhenAPermitIsFree() throws Exception {
        SemaphoreClass semaphore = new SemaphoreClass(1);
        assertTrue(semaphore.tryAcquire());
        assertFalse(semaphore.tryAcquire());
        assertEquals(0, semaphore.availablePermits());
    }

    @Test
    void releasingMoreThanAcquiredIsRejected() throws Exception {
        SemaphoreClass semaphore = new SemaphoreClass(1);
        assertThrows(IllegalStateException.class, semaphore::release);
    }

    @Test
    void aSemaphoreWithoutPermitsNeverGrantsOne() throws Exception {
        SemaphoreClass semaphore = new SemaphoreClass(0);
        assertFalse(semaphore.tryAcquire());
        assertEquals(0, semaphore.availablePermits());
    }

    @Test
    void acquireBlocksUntilAPermitIsReleased() throws Exception {
        SemaphoreClass semaphore = new SemaphoreClass(1);
        semaphore.acquire();                                  // takes the only permit

        CountDownLatch acquired = new CountDownLatch(1);
        Thread waiter = new Thread(() -> {
            try {
                semaphore.acquire();
                acquired.countDown();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        waiter.start();

        assertFalse(acquired.await(200, TimeUnit.MILLISECONDS), "the waiter must block");
        semaphore.release();
        assertTrue(acquired.await(2, TimeUnit.SECONDS), "the waiter must be woken up");
        waiter.join();
        assertEquals(0, semaphore.availablePermits());
    }
}
