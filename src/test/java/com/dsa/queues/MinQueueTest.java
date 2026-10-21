package com.dsa.queues;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MinQueueTest {

    @Test
    void minTracksTheSmallestPushedValue() {
        MinQueue.MyMinQueue queue = new MinQueue.MyMinQueue();
        queue.push(5);
        queue.push(3);
        queue.push(7);
        assertEquals(3, queue.min());
    }

    @Test
    void emptyQueueReportsEmpty() {
        MinQueue.MyMinQueue queue = new MinQueue.MyMinQueue();
        assertTrue(queue.isEmpty());
        assertEquals(0, queue.size());
    }

    @Test
    void poppingTheMinimumExposesTheNextOne() {
        MinQueue.MyMinQueue queue = new MinQueue.MyMinQueue();
        queue.push(5);
        queue.push(3);
        queue.push(7);
        assertEquals(5, queue.pop());
        assertEquals(3, queue.min());
        assertEquals(3, queue.pop());
        assertEquals(7, queue.min());
    }

    @Test
    void poppingTheLastMinimumFallsBackToTheNewMinimum() {
        MinQueue.MyMinQueue queue = new MinQueue.MyMinQueue();
        queue.push(4);
        queue.push(1);
        queue.push(9);
        assertEquals(1, queue.min());
        assertEquals(4, queue.pop());
        assertEquals(1, queue.min());
        assertEquals(1, queue.pop());
        assertEquals(9, queue.min());
        assertEquals(9, queue.pop());
    }

    @Test
    void frontAndBackReportTheEnds() {
        MinQueue.MyMinQueue queue = new MinQueue.MyMinQueue();
        queue.push(5);
        queue.push(3);
        queue.push(7);
        assertEquals(5, queue.front());
        assertEquals(7, queue.back());
        assertEquals(5, queue.pop());
        assertEquals(7, queue.back());
    }

    @Test
    void duplicateValuesKeepTheMinimumCorrect() {
        MinQueue.MyMinQueue queue = new MinQueue.MyMinQueue();
        queue.push(2);
        queue.push(2);
        queue.push(8);
        assertEquals(2, queue.min());
        queue.pop();
        assertEquals(2, queue.min());
        queue.pop();
        assertEquals(8, queue.min());
    }

    @Test
    void negativeValuesAreSupported() {
        MinQueue.MyMinQueue queue = new MinQueue.MyMinQueue();
        queue.push(-1);
        queue.push(-9);
        queue.push(4);
        assertEquals(-9, queue.min());
        assertEquals(-1, queue.front());
    }

    @Test
    void contentsListsTheQueueFromFrontToBack() {
        MinQueue.MyMinQueue queue = new MinQueue.MyMinQueue();
        queue.push(5);
        queue.push(3);
        queue.push(7);
        assertEquals("[5, 3, 7]", queue.contents());
        assertEquals(3, queue.size());
        assertFalse(queue.isEmpty());
    }
}
