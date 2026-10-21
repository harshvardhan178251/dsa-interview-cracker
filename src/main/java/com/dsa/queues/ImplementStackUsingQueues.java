package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Implement Stack using Queues
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Queue rotation, LIFO over FIFO
 *
 * <p>Problem:
 * Implement a LIFO stack using only FIFO queues. {@code push(x)} puts an element on top,
 * {@code pop()} removes and returns the top element, {@code peek()} returns the top
 * element without removing it.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * push 1
 * pop
 * peek
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of {@code push} follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 6
 * push 1
 * push 2
 * push 3
 * peek
 * pop
 * size
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [2, 1]
 * [3, 2, 1]
 * 3
 * 3
 * 2
 * </pre>
 *
 * <p>Approach: a single queue stores the elements in insertion order, so the <em>back</em>
 * of the queue is the top of the stack — {@code peek} is therefore O(1). To pop, the
 * queue is rotated {@code size - 1} times (each rotation moves the front element to the
 * back) until the most recently pushed element reaches the front, and that element is
 * removed.
 *
 * <p>Complexity: Time O(n) per {@code pop}, O(1) for {@code push} and {@code peek},
 * Space O(n).
 */
public class ImplementStackUsingQueues {

    /** A LIFO stack built from a single FIFO queue. */
    public static class MyStack {

        /** The single backing queue (front = the current top of the stack). */
        private final Deque<Integer> queue = new ArrayDeque<>();

        /** Puts {@code value} on top of the stack. */
        public void push(int value) {
            queue.add(value);
        }

        /** Removes and returns the top element. */
        public int pop() {
            rotateNewestToFront();
            return queue.poll();
        }

        /** Returns the top element without removing it. */
        public int peek() {
            return queue.peekLast();
        }

        /** Number of elements currently stacked. */
        public int size() {
            return queue.size();
        }

        /** True when the stack holds no element. */
        public boolean isEmpty() {
            return queue.isEmpty();
        }

        /** Moves the most recently pushed element (the queue's back) to the front. */
        private void rotateNewestToFront() {
            int n = queue.size();
            for (int i = 0; i < n - 1; i++) {
                queue.add(queue.poll());
            }
        }

        /** The stack contents from top to bottom, e.g. {@code [3, 2, 1]}. */
        public String contents() {
            Integer[] items = queue.toArray(new Integer[0]);
            StringBuilder sb = new StringBuilder("[");
            for (int i = items.length - 1; i >= 0; i--) {
                if (i != items.length - 1) {
                    sb.append(", ");
                }
                sb.append(items[i]);
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the backing queue from front to back. */
        public String queueContents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : queue) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();

        MyStack stack = new MyStack();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    stack.push(fs.nextInt());
                    System.out.println(stack.contents());
                }
                case "pop" -> System.out.println(stack.isEmpty() ? "empty" : String.valueOf(stack.pop()));
                case "peek" -> System.out.println(stack.isEmpty() ? "empty" : String.valueOf(stack.peek()));
                case "size" -> System.out.println(stack.size());
                case "isEmpty" -> System.out.println(stack.isEmpty());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
        }
    }
}
