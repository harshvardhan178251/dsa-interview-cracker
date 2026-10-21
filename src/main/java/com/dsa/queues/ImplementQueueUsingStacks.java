package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Implement Queue using Stacks
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-stack FIFO, Amortised O(1)
 *
 * <p>Problem:
 * Implement a FIFO queue using only LIFO stacks. {@code push(x)} appends to the back,
 * {@code pop()} removes and returns the front element, {@code peek()} returns the front
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
 * 7
 * push 1
 * push 2
 * pop
 * peek
 * size
 * push 3
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [1, 2]
 * 1
 * 2
 * 1
 * [2, 3]
 * false
 * </pre>
 *
 * <p>Approach: keep two stacks. {@code in} receives every push. When a pop or a peek needs
 * the front element and {@code out} is empty, every element of {@code in} is moved onto
 * {@code out} — that single reversal turns the LIFO order into FIFO order. After that,
 * {@code out} serves the front until it is empty again.
 *
 * <p>Complexity: Time O(1) amortised per operation (each element is pushed once and moved
 * at most once), Space O(n).
 */
public class ImplementQueueUsingStacks {

    /** A FIFO queue built from two LIFO stacks. */
    public static class MyQueue {

        /** Stack that receives new elements (top = most recently pushed). */
        private final Deque<Integer> in = new ArrayDeque<>();

        /** Stack that serves the front of the queue (top = next element to leave). */
        private final Deque<Integer> out = new ArrayDeque<>();

        /** Appends {@code value} to the back of the queue. */
        public void push(int value) {
            in.push(value);
        }

        /** Removes and returns the front element. */
        public int pop() {
            shift();
            return out.pop();
        }

        /** Returns the front element without removing it. */
        public int peek() {
            shift();
            return out.peek();
        }

        /** Number of elements currently queued. */
        public int size() {
            return in.size() + out.size();
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return in.isEmpty() && out.isEmpty();
        }

        /** Reverses {@code in} into {@code out} when {@code out} is empty. */
        private void shift() {
            if (out.isEmpty()) {
                while (!in.isEmpty()) {
                    out.push(in.pop());
                }
            }
        }

        /** The queue contents from front to back, e.g. {@code [1, 2, 3]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : out) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            Integer[] pushed = in.toArray(new Integer[0]);
            for (int i = pushed.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pushed[i]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the backing {@code in} stack, top first. */
        public String inStack() {
            return stackToString(in);
        }

        /** Debug helper: the backing {@code out} stack, top first. */
        public String outStack() {
            return stackToString(out);
        }

        private static String stackToString(Deque<Integer> stack) {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : stack) {
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

        MyQueue queue = new MyQueue();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    queue.push(fs.nextInt());
                    System.out.println(queue.contents());
                }
                case "pop" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.pop()));
                case "peek" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.peek()));
                case "size" -> System.out.println(queue.size());
                case "isEmpty" -> System.out.println(queue.isEmpty());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
        }
    }
}
