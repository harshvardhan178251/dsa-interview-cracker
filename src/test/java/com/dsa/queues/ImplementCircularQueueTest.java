package com.dsa.queues;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ImplementCircularQueueTest {

    @Test
    void enqueueAndDequeueFollowFifoOrder() {
        ImplementCircularQueue.MyCircularQueue queue = new ImplementCircularQueue.MyCircularQueue(3);
        assertTrue(queue.enqueue(1));
        assertTrue(queue.enqueue(2));
        assertEquals(1, queue.dequeue());
        assertEquals(2, queue.dequeue());
    }

    @Test
    void emptyQueueReportsEmptyAndSentinels() {
        ImplementCircularQueue.MyCircularQueue queue = new ImplementCircularQueue.MyCircularQueue(2);
        assertTrue(queue.isEmpty());
        assertFalse(queue.isFull());
        assertEquals(-1, queue.dequeue());
        assertEquals(-1, queue.peek());
        assertEquals(-1, queue.rear());
    }

    @Test
    void enqueueFailsWhenFull() {
        ImplementCircularQueue.MyCircularQueue queue = new ImplementCircularQueue.MyCircularQueue(2);
        assertTrue(queue.enqueue(1));
        assertTrue(queue.enqueue(2));
        assertTrue(queue.isFull());
        assertFalse(queue.enqueue(3));
        assertEquals(2, queue.size());
    }

    @Test
    void slotsAreReusedAfterTheHeadWrapsAround() {
        ImplementCircularQueue.MyCircularQueue queue = new ImplementCircularQueue.MyCircularQueue(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        assertEquals(1, queue.dequeue());
        assertTrue(queue.enqueue(4));
        assertEquals(4, queue.rear());
        assertEquals(2, queue.peek());
        assertEquals(2, queue.dequeue());
        assertEquals(3, queue.dequeue());
        assertEquals(4, queue.dequeue());
        assertTrue(queue.isEmpty());
    }

    @Test
    void peekAndRearReportTheEnds() {
        ImplementCircularQueue.MyCircularQueue queue = new ImplementCircularQueue.MyCircularQueue(3);
        queue.enqueue(7);
        queue.enqueue(8);
        assertEquals(7, queue.peek());
        assertEquals(8, queue.rear());
    }

    @Test
    void capacityOneBehavesLikeASingleSlot() {
        ImplementCircularQueue.MyCircularQueue queue = new ImplementCircularQueue.MyCircularQueue(1);
        assertTrue(queue.enqueue(5));
        assertTrue(queue.isFull());
        assertFalse(queue.enqueue(6));
        assertEquals(5, queue.dequeue());
        assertTrue(queue.isEmpty());
    }

    @Test
    void contentsListsTheLiveElementsInOrder() {
        ImplementCircularQueue.MyCircularQueue queue = new ImplementCircularQueue.MyCircularQueue(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.dequeue();
        queue.enqueue(3);
        assertEquals("[2, 3]", queue.contents());
    }
}
