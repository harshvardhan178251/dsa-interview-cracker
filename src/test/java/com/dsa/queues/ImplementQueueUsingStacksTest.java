package com.dsa.queues;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ImplementQueueUsingStacksTest {

    @Test
    void pushThenPopReturnsTheOldestElement() {
        ImplementQueueUsingStacks.MyQueue queue = new ImplementQueueUsingStacks.MyQueue();
        queue.push(1);
        queue.push(2);
        assertEquals(1, queue.pop());
        assertEquals(2, queue.pop());
    }

    @Test
    void emptyQueueReportsEmpty() {
        ImplementQueueUsingStacks.MyQueue queue = new ImplementQueueUsingStacks.MyQueue();
        assertTrue(queue.isEmpty());
        assertEquals(0, queue.size());
    }

    @Test
    void peekDoesNotRemoveTheElement() {
        ImplementQueueUsingStacks.MyQueue queue = new ImplementQueueUsingStacks.MyQueue();
        queue.push(7);
        queue.push(8);
        assertEquals(7, queue.peek());
        assertEquals(7, queue.peek());
        assertEquals(2, queue.size());
    }

    @Test
    void keepsFifoOrderAcrossManyPushes() {
        ImplementQueueUsingStacks.MyQueue queue = new ImplementQueueUsingStacks.MyQueue();
        for (int i = 1; i <= 100; i++) {
            queue.push(i);
        }
        for (int i = 1; i <= 100; i++) {
            assertEquals(i, queue.pop());
        }
        assertTrue(queue.isEmpty());
    }

    @Test
    void interleavedPushesAndPopsStayFifo() {
        ImplementQueueUsingStacks.MyQueue queue = new ImplementQueueUsingStacks.MyQueue();
        queue.push(1);
        queue.push(2);
        assertEquals(1, queue.pop());
        queue.push(3);
        assertEquals(2, queue.pop());
        assertEquals(3, queue.pop());
        assertTrue(queue.isEmpty());
    }

    @Test
    void duplicateValuesAreReturnedInOrder() {
        ImplementQueueUsingStacks.MyQueue queue = new ImplementQueueUsingStacks.MyQueue();
        queue.push(5);
        queue.push(5);
        queue.push(5);
        assertEquals(5, queue.pop());
        assertEquals(5, queue.pop());
        assertEquals(5, queue.pop());
        assertTrue(queue.isEmpty());
    }

    @Test
    void contentsListsTheQueueFromFrontToBack() {
        ImplementQueueUsingStacks.MyQueue queue = new ImplementQueueUsingStacks.MyQueue();
        queue.push(10);
        queue.push(20);
        assertEquals("[10, 20]", queue.contents());
    }

    @Test
    void sizeCountsBothBackingStacks() {
        ImplementQueueUsingStacks.MyQueue queue = new ImplementQueueUsingStacks.MyQueue();
        queue.push(1);
        queue.push(2);
        queue.push(3);
        assertEquals(3, queue.size());
        queue.pop();
        assertEquals(2, queue.size());
        assertFalse(queue.isEmpty());
    }
}
