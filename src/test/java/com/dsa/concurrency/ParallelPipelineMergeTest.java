package com.dsa.concurrency;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ParallelPipelineMergeTest {

    @Test
    void mergesTheResultsInInputOrder() throws Exception {
        long[] merged = ParallelPipelineMerge.run(3, new long[]{1, 2, 3, 4}, 2);
        assertArrayEquals(new long[]{64, 128, 192, 256}, merged);
    }

    @Test
    void aSingleStageDoublesTheValues() throws Exception {
        long[] merged = ParallelPipelineMerge.run(1, new long[]{5, 7}, 2);
        assertArrayEquals(new long[]{10, 14}, merged);
    }

    @Test
    void twoStagesMultiplyByEight() throws Exception {
        long[] merged = ParallelPipelineMerge.run(2, new long[]{1, 2, 3}, 1);
        assertArrayEquals(new long[]{8, 16, 24}, merged);
    }

    @Test
    void handlesNegativeAndZeroValues() throws Exception {
        long[] merged = ParallelPipelineMerge.run(2, new long[]{0, 1, -1}, 2);
        assertArrayEquals(new long[]{0, 8, -8}, merged);
    }

    @Test
    void aSingleItemGoesThroughTheWholePipeline() throws Exception {
        long[] merged = ParallelPipelineMerge.run(4, new long[]{2}, 1);
        assertArrayEquals(new long[]{2 * 2 * 4 * 8 * 16}, merged);
    }

    @Test
    void theResultIsTheSameOnEveryRun() throws Exception {
        long[] first = ParallelPipelineMerge.run(3, new long[]{1, 2, 3, 4, 5, 6, 7, 8}, 4);
        long[] second = ParallelPipelineMerge.run(3, new long[]{1, 2, 3, 4, 5, 6, 7, 8}, 4);
        assertArrayEquals(first, second);
        assertEquals(8, first.length);
        for (int i = 0; i < first.length; i++) {
            assertEquals((i + 1) * 64L, first[i]);
        }
    }
}
