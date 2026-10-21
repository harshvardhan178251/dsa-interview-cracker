package com.dsa.queues;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ImplementDequeUsingTwoStacksTest {

    @Test
    void pushBackThenPopFrontKeepsOrder() {
        ImplementDequeUsingTwoStacks.MyDeque deque = new ImplementDequeUsingTwoStacks.MyDeque();
        deque.pushBack(1);
        deque.pushBack(2);
        deque.pushBack(3);
        assertEquals(1, deque.popFront());
        assertEquals(2, deque.popFront());
    }

    @Test
    void pushFrontThenPopBackKeepsOrder() {
        ImplementDequeUsingTwoStacks.MyDeque deque = new ImplementDequeUsingTwoStacks.MyDeque();
        deque.pushFront(1);
        deque.pushFront(2);
        deque.pushFront(3);
        // the deque is now [3, 2, 1] - the back is the element pushed first
        assertEquals(1, deque.popBack());
        assertEquals(2, deque.popBack());
        assertEquals(3, deque.popBack());
    }

    @Test
    void emptyDequeReportsEmpty() {
        ImplementDequeUsingTwoStacks.MyDeque deque = new ImplementDequeUsingTwoStacks.MyDeque();
        assertTrue(deque.isEmpty());
        assertEquals(0, deque.size());
    }

    @Test
    void bothEndsCanBeReadWithoutRemoving() {
        ImplementDequeUsingTwoStacks.MyDeque deque = new ImplementDequeUsingTwoStacks.MyDeque();
        deque.pushBack(2);
        deque.pushFront(1);
        deque.pushBack(3);
        assertEquals(1, deque.peekFront());
        assertEquals(3, deque.peekBack());
        assertEquals(3, deque.size());
    }

    @Test
    void popsAlternateBetweenTheTwoEnds() {
        ImplementDequeUsingTwoStacks.MyDeque deque = new ImplementDequeUsingTwoStacks.MyDeque();
        for (int i = 1; i <= 6; i++) {
            deque.pushBack(i);
        }
        assertEquals(1, deque.popFront());
        assertEquals(6, deque.popBack());
        assertEquals(2, deque.popFront());
        assertEquals(5, deque.popBack());
        assertEquals(3, deque.popFront());
        assertEquals(4, deque.popBack());
        assertTrue(deque.isEmpty());
    }

    @Test
    void contentsListsTheDequeFromFrontToBack() {
        ImplementDequeUsingTwoStacks.MyDeque deque = new ImplementDequeUsingTwoStacks.MyDeque();
        deque.pushBack(1);
        deque.pushBack(2);
        deque.pushFront(0);
        assertEquals("[0, 1, 2]", deque.contents());
    }

    @Test
    void sizeTracksBothStacks() {
        ImplementDequeUsingTwoStacks.MyDeque deque = new ImplementDequeUsingTwoStacks.MyDeque();
        deque.pushFront(1);
        deque.pushBack(2);
        assertEquals(2, deque.size());
        deque.popFront();
        assertEquals(1, deque.size());
        assertFalse(deque.isEmpty());
    }
}
