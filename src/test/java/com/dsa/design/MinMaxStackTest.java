package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MinMaxStackTest {

    @Test
    void pushesAndPops() {
        MinMaxStack stack = new MinMaxStack();
        stack.push(5);
        stack.push(3);
        assertEquals(2, stack.size());
        assertEquals(3, stack.pop());
        assertEquals(5, stack.top());
        assertEquals(1, stack.size());
    }

    @Test
    void reportsTheMinAndTheMax() {
        MinMaxStack stack = new MinMaxStack();
        stack.push(5);
        stack.push(3);
        stack.push(7);
        assertEquals(3, stack.getMin());
        assertEquals(7, stack.getMax());
    }

    @Test
    void theExtremesFollowThePoppedFrames() {
        MinMaxStack stack = new MinMaxStack();
        stack.push(5);
        stack.push(3);
        stack.push(7);
        stack.pop();                       // removes the maximum
        assertEquals(5, stack.getMax());
        assertEquals(3, stack.getMin());
        stack.pop();                       // removes the minimum
        assertEquals(5, stack.getMin());
        assertEquals(5, stack.getMax());
    }

    @Test
    void anEmptyStackAnswersMinusOne() {
        MinMaxStack stack = new MinMaxStack();
        assertEquals(-1, stack.pop());
        assertEquals(-1, stack.top());
        assertEquals(-1, stack.getMin());
        assertEquals(-1, stack.getMax());
        assertEquals(0, stack.size());
    }

    @Test
    void handlesDuplicateValues() {
        MinMaxStack stack = new MinMaxStack();
        stack.push(4);
        stack.push(4);
        stack.push(4);
        assertEquals(4, stack.getMin());
        assertEquals(4, stack.getMax());
        stack.pop();
        stack.pop();
        assertEquals(4, stack.getMin());
        assertEquals(4, stack.getMax());
    }

    @Test
    void handlesNegativeValues() {
        MinMaxStack stack = new MinMaxStack();
        stack.push(-1);
        stack.push(-9);
        stack.push(0);
        assertEquals(-9, stack.getMin());
        assertEquals(0, stack.getMax());
    }

    @Test
    void showsTheStackTopFirst() {
        MinMaxStack stack = new MinMaxStack();
        stack.push(1);
        stack.push(2);
        assertEquals("[2, 1]", stack.state());
    }
}
