package com.dsa.concurrency;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AtomicCounterTest {

    @Test
    void allThreeImplementationsReachTheSameTotal() throws Exception {
        long[] deltas = {1, 2, 3, 4, 5};
        long atomic = AtomicCounter.runConcurrent(deltas, 4, new AtomicCounter.AtomicIntegerCounter());
        long monitor = AtomicCounter.runConcurrent(deltas, 4, new AtomicCounter.SynchronizedCounter());
        long adder = AtomicCounter.runConcurrent(deltas, 4, new AtomicCounter.LongAdderCounter());
        assertEquals(15, atomic);
        assertEquals(15, monitor);
        assertEquals(15, adder);
    }

    @Test
    void noIncrementIsLostUnderContention() throws Exception {
        long[] deltas = new long[1000];
        java.util.Arrays.fill(deltas, 1L);
        assertEquals(1000, AtomicCounter.runConcurrent(deltas, 8, new AtomicCounter.AtomicIntegerCounter()));
        assertEquals(1000, AtomicCounter.runConcurrent(deltas, 8, new AtomicCounter.SynchronizedCounter()));
        assertEquals(1000, AtomicCounter.runConcurrent(deltas, 8, new AtomicCounter.LongAdderCounter()));
    }

    @Test
    void aSingleThreadAlsoWorks() throws Exception {
        assertEquals(6, AtomicCounter.runConcurrent(new long[]{1, 2, 3}, 1,
                new AtomicCounter.AtomicIntegerCounter()));
    }

    @Test
    void anEmptyWorkloadKeepsTheCounterAtZero() throws Exception {
        assertEquals(0, AtomicCounter.runConcurrent(new long[0], 4,
                new AtomicCounter.LongAdderCounter()));
    }

    @Test
    void theChunksCoverEveryElementExactlyOnce() {
        int n = 5;
        int workers = 2;
        int covered = 0;
        for (int worker = 0; worker < workers; worker++) {
            int[] bounds = AtomicCounter.chunkBounds(n, workers, worker);
            assertTrue(bounds[0] <= bounds[1]);
            covered += bounds[1] - bounds[0];
        }
        assertEquals(n, covered);
        assertArrayEquals(new int[]{0, 3}, AtomicCounter.chunkBounds(5, 2, 0));
        assertArrayEquals(new int[]{3, 5}, AtomicCounter.chunkBounds(5, 2, 1));
    }
}
