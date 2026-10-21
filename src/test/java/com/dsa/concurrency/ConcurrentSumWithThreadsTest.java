package com.dsa.concurrency;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ConcurrentSumWithThreadsTest {

    @Test
    void splitsTheArrayIntoChunks() throws Exception {
        long[] partial = ConcurrentSumWithThreads.sumInChunks(new long[]{1, 2, 3, 4, 5}, 2);
        assertArrayEquals(new long[]{6, 9}, partial);
    }

    @Test
    void thePartialSumsAddUpToTheTotal() throws Exception {
        long[] values = {4, 8, 15, 16, 23, 42};
        long[] partial = ConcurrentSumWithThreads.sumInChunks(values, 3);
        long total = 0;
        for (long chunk : partial) {
            total += chunk;
        }
        assertEquals(108, total);
        assertEquals(3, partial.length);
    }

    @Test
    void aSingleThreadDoesAllTheWork() throws Exception {
        long[] partial = ConcurrentSumWithThreads.sumInChunks(new long[]{1, 2, 3}, 1);
        assertArrayEquals(new long[]{6}, partial);
    }

    @Test
    void moreThreadsThanElementsStillWorks() throws Exception {
        long[] partial = ConcurrentSumWithThreads.sumInChunks(new long[]{5}, 4);
        assertEquals(1, partial.length);          // there is never more work than elements
        long total = 0;
        for (long chunk : partial) {
            total += chunk;
        }
        assertEquals(5, total);
    }

    @Test
    void anEmptyArraySumsToZero() throws Exception {
        long[] partial = ConcurrentSumWithThreads.sumInChunks(new long[0], 2);
        long total = 0;
        for (long chunk : partial) {
            total += chunk;
        }
        assertEquals(0, total);
    }

    @Test
    void theChunksCoverEveryElementExactlyOnce() {
        int n = 7;
        int workers = 3;
        int covered = 0;
        for (int worker = 0; worker < workers; worker++) {
            int[] bounds = ConcurrentSumWithThreads.chunkBounds(n, workers, worker);
            covered += bounds[1] - bounds[0];
        }
        assertEquals(n, covered);
        assertArrayEquals(new int[]{0, 3}, ConcurrentSumWithThreads.chunkBounds(7, 3, 0));
        assertArrayEquals(new int[]{3, 5}, ConcurrentSumWithThreads.chunkBounds(7, 3, 1));
        assertArrayEquals(new int[]{5, 7}, ConcurrentSumWithThreads.chunkBounds(7, 3, 2));
    }
}
