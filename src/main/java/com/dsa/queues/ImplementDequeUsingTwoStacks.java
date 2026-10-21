package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Implement Deque using Two Stacks
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Symmetric two-stack deque
 *
 * <p>Problem:
 * Implement a double-ended queue using two LIFO stacks. {@code pushFront} and
 * {@code pushBack} insert at either end; {@code popFront}, {@code popBack},
 * {@code peekFront} and {@code peekBack} read or remove from either end.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * pushFront 1
 * pushBack 2
 * popFront
 * popBack
 * peekFront
 * peekBack
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of the push operations follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * pushBack 1
 * pushBack 2
 * pushFront 0
 * pushBack 3
 * popFront
 * popBack
 * size
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [1, 2]
 * [0, 1, 2]
 * [0, 1, 2, 3]
 * 0
 * 3
 * 2
 * false
 * </pre>
 *
 * <p>Approach: {@code left} owns the front of the deque and {@code right} owns the back.
 * A push always lands on its own stack. A pop from an empty side transfers every element
 * of the opposite stack — the transfer reverses the order, so the requested end becomes
 * the top of the receiving stack.
 *
 * <p>Complexity: Time O(1) amortised per operation, Space O(n).
 */
public class ImplementDequeUsingTwoStacks {

    /** A double-ended queue built from two LIFO stacks. */
    public static class MyDeque {

        /** Stack holding the front elements (top = front of the deque). */
        private final Deque<Integer> left = new ArrayDeque<>();

        /** Stack holding the back elements (top = back of the deque). */
        private final Deque<Integer> right = new ArrayDeque<>();

        /** Inserts {@code value} at the front. */
        public void pushFront(int value) {
            left.push(value);
        }

        /** Inserts {@code value} at the back. */
        public void pushBack(int value) {
            right.push(value);
        }

        /** Removes and returns the front element. */
        public int popFront() {
            if (left.isEmpty()) {
                while (!right.isEmpty()) {
                    left.push(right.pop());
                }
            }
            return left.pop();
        }

        /** Removes and returns the back element. */
        public int popBack() {
            if (right.isEmpty()) {
                while (!left.isEmpty()) {
                    right.push(left.pop());
                }
            }
            return right.pop();
        }

        /** The front element without removing it. */
        public int peekFront() {
            if (left.isEmpty()) {
                while (!right.isEmpty()) {
                    left.push(right.pop());
                }
            }
            return left.peek();
        }

        /** The back element without removing it. */
        public int peekBack() {
            if (right.isEmpty()) {
                while (!left.isEmpty()) {
                    right.push(left.pop());
                }
            }
            return right.peek();
        }

        /** Number of elements currently stored. */
        public int size() {
            return left.size() + right.size();
        }

        /** True when the deque holds no element. */
        public boolean isEmpty() {
            return left.isEmpty() && right.isEmpty();
        }

        /** The deque contents from front to back, e.g. {@code [1, 2, 3]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : left) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            Integer[] back = right.toArray(new Integer[0]);
            for (int i = back.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(back[i]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the {@code left} stack, top first. */
        public String leftStack() {
            return stackToString(left);
        }

        /** Debug helper: the {@code right} stack, top first. */
        public String rightStack() {
            return stackToString(right);
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

        MyDeque deque = new MyDeque();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "pushFront" -> {
                    deque.pushFront(fs.nextInt());
                    System.out.println(deque.contents());
                }
                case "pushBack" -> {
                    deque.pushBack(fs.nextInt());
                    System.out.println(deque.contents());
                }
                case "popFront" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.popFront()));
                case "popBack" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.popBack()));
                case "peekFront" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.peekFront()));
                case "peekBack" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.peekBack()));
                case "size" -> System.out.println(deque.size());
                case "isEmpty" -> System.out.println(deque.isEmpty());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
        }
    }
}
