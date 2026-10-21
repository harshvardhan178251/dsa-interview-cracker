package com.dsa.queues;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ImplementStackUsingQueuesTest {

    @Test
    void pushThenPopReturnsTheNewestElement() {
        ImplementStackUsingQueues.MyStack stack = new ImplementStackUsingQueues.MyStack();
        stack.push(1);
        stack.push(2);
        assertEquals(2, stack.pop());
        assertEquals(1, stack.pop());
    }

    @Test
    void emptyStackReportsEmpty() {
        ImplementStackUsingQueues.MyStack stack = new ImplementStackUsingQueues.MyStack();
        assertTrue(stack.isEmpty());
        assertEquals(0, stack.size());
    }

    @Test
    void peekDoesNotRemoveTheElement() {
        ImplementStackUsingQueues.MyStack stack = new ImplementStackUsingQueues.MyStack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        assertEquals(3, stack.peek());
        assertEquals(3, stack.peek());
        assertEquals(3, stack.size());
    }

    @Test
    void peekDoesNotDisturbTheOrderForTheNextPop() {
        ImplementStackUsingQueues.MyStack stack = new ImplementStackUsingQueues.MyStack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        assertEquals(3, stack.peek());
        assertEquals(3, stack.pop());
        assertEquals(2, stack.pop());
    }

    @Test
    void keepsLifoOrderAcrossManyPushes() {
        ImplementStackUsingQueues.MyStack stack = new ImplementStackUsingQueues.MyStack();
        for (int i = 1; i <= 50; i++) {
            stack.push(i);
        }
        for (int i = 50; i >= 1; i--) {
            assertEquals(i, stack.pop());
        }
        assertTrue(stack.isEmpty());
    }

    @Test
    void duplicateValuesAreReturnedInOrder() {
        ImplementStackUsingQueues.MyStack stack = new ImplementStackUsingQueues.MyStack();
        stack.push(9);
        stack.push(9);
        assertEquals(9, stack.pop());
        assertEquals(9, stack.pop());
        assertTrue(stack.isEmpty());
    }

    @Test
    void contentsListsTheStackFromTopToBottom() {
        ImplementStackUsingQueues.MyStack stack = new ImplementStackUsingQueues.MyStack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        assertEquals("[3, 2, 1]", stack.contents());
    }

    @Test
    void sizeTracksTheNumberOfElements() {
        ImplementStackUsingQueues.MyStack stack = new ImplementStackUsingQueues.MyStack();
        stack.push(1);
        stack.push(2);
        assertEquals(2, stack.size());
        stack.pop();
        assertEquals(1, stack.size());
        assertFalse(stack.isEmpty());
    }
}
