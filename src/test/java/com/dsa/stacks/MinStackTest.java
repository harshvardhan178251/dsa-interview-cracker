package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNull;

class MinStackTest {

    @Test
    void pushesPopsAndQueries() {
        MinStack stack = new MinStack();
        stack.push(5);
        stack.push(3);
        assertEquals(3, stack.getMin());
        assertEquals(3, stack.pop());
        assertEquals(5, stack.top());
        assertEquals(5, stack.getMin());
    }

    @Test
    void keepsTheMinimumAfterPoppingTheSmallest() {
        MinStack stack = new MinStack();
        stack.push(2);
        stack.push(0);
        stack.push(3);
        stack.push(0);
        assertEquals(0, stack.getMin());
        stack.pop();                      // removes the last 0
        assertEquals(0, stack.getMin());  // the other 0 is still on the stack
        stack.pop();                      // removes the 3
        assertEquals(0, stack.getMin());  // the 0 is still on the stack
        stack.pop();                      // removes the 0
        assertEquals(2, stack.getMin());  // now the smallest left is the 2
    }

    @Test
    void handlesNegativeValues() {
        MinStack stack = new MinStack();
        stack.push(-2);
        stack.push(0);
        stack.push(-3);
        assertEquals(-3, stack.getMin());
    }

    @Test
    void reportsNullOnAnEmptyStack() {
        MinStack stack = new MinStack();
        assertNull(stack.getMin());
        assertNull(stack.top());
        assertNull(stack.pop());
    }

    @Test
    void replaysTheOperations() {
        List<Integer> answers = MinStack.simulate(
                new String[]{"push 5", "push 3", "getMin", "pop", "top", "getMin"});
        assertEquals(List.of(3, 5, 5), answers);
    }

    @Test
    void replaysAnEmptyStackQuery() {
        List<Integer> answers = MinStack.simulate(new String[]{"getMin", "top"});
        assertEquals(2, answers.size());
        assertNull(answers.get(0));
        assertNull(answers.get(1));
    }
}
