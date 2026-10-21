package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Design a Min Queue
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-stack queue with a running minimum
 *
 * <p>Problem:
 * Implement a FIFO queue that additionally answers {@code min()} — the smallest value
 * currently stored — in constant time.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * push 5
 * push 3
 * min
 * pop
 * front
 * back
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of {@code push} follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * push 5
 * push 3
 * push 7
 * min
 * pop
 * min
 * front
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [5]
 * [5, 3]
 * [5, 3, 7]
 * 3
 * 5
 * 3
 * 3
 * false
 * </pre>
 *
 * <p>Approach: the classic two-stack queue, but every element carries the minimum of the
 * stack it sits on. Pushing {@code x} stores {@code min(x, currentTop.min)}; the value
 * that leaves the stack head is therefore the minimum of everything below it. The queue
 * minimum is the minimum of the two stack headers.
 *
 * <p>Complexity: Time O(1) amortised per operation, Space O(n).
 */
public class MinQueue {

    /** A FIFO queue that can report its minimum in constant time. */
    public static class MyMinQueue {

        /** Element pair: {@code {value, minimum of this stack up to this element}}. */
        private final Deque<int[]> in = new ArrayDeque<>();

        /** Element pair, same layout as {@link #in}. */
        private final Deque<int[]> out = new ArrayDeque<>();

        /** Appends {@code value} to the back of the queue. */
        public void push(int value) {
            int min = in.isEmpty() ? value : Math.min(in.peek()[1], value);
            in.push(new int[]{value, min});
        }

        /** Removes and returns the front element. */
        public int pop() {
            shift();
            return out.pop()[0];
        }

        /** The front element without removing it. */
        public int front() {
            shift();
            return out.peek()[0];
        }

        /** The back element without removing it. */
        public int back() {
            return in.isEmpty() ? out.peekLast()[0] : in.peek()[0];
        }

        /** The smallest element currently stored. */
        public int min() {
            int result = Integer.MAX_VALUE;
            if (!in.isEmpty()) {
                result = Math.min(result, in.peek()[1]);
            }
            if (!out.isEmpty()) {
                result = Math.min(result, out.peek()[1]);
            }
            return result;
        }

        /** Number of elements currently queued. */
        public int size() {
            return in.size() + out.size();
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return in.isEmpty() && out.isEmpty();
        }

        /**
         * Reverses {@code in} into {@code out} when {@code out} is empty.
         *
         * <p>The running minimum is recomputed during the transfer: the order of the
         * elements changes, so a minimum that was valid for the old stack may no longer
         * be valid for the new one.
         */
        private void shift() {
            if (out.isEmpty()) {
                while (!in.isEmpty()) {
                    int[] pair = in.pop();
                    int min = out.isEmpty() ? pair[0] : Math.min(pair[0], out.peek()[1]);
                    out.push(new int[]{pair[0], min});
                }
            }
        }

        /** The queue contents from front to back, e.g. {@code [5, 3, 7]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int[] pair : out) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pair[0]);
                first = false;
            }
            int[][] pushed = in.toArray(new int[0][]);
            for (int i = pushed.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pushed[i][0]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the {@code in} stack as {@code value/min} pairs, top first. */
        public String inStack() {
            return stackToString(in);
        }

        /** Debug helper: the {@code out} stack as {@code value/min} pairs, top first. */
        public String outStack() {
            return stackToString(out);
        }

        private static String stackToString(Deque<int[]> stack) {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int[] pair : stack) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pair[0]).append("/").append(pair[1]);
                first = false;
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();

        MyMinQueue queue = new MyMinQueue();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    queue.push(fs.nextInt());
                    System.out.println(queue.contents());
                }
                case "pop" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.pop()));
                case "front" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.front()));
                case "back" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.back()));
                case "min" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.min()));
                case "size" -> System.out.println(queue.size());
                case "isEmpty" -> System.out.println(queue.isEmpty());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
        }
    }
}
