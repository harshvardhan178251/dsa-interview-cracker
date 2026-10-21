package com.dsa.queues;

import com.dsa.utils.FastScanner;

/**
 * Problem: Design Circular Queue
 * LeetCode: 622 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Ring buffer, Modular arithmetic
 *
 * <p>Problem:
 * Design a circular queue of fixed capacity that supports {@code enqueue}, {@code dequeue},
 * {@code peek}, {@code rear}, {@code isEmpty} and {@code isFull}.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity
 * m
 * enqueue 1
 * dequeue
 * peek
 * rear
 * isEmpty
 * isFull
 * ...
 * </pre>
 * {@code capacity} is the maximum number of elements, {@code m} is the number of operations
 * and every operation is one line.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 8
 * enqueue 1
 * enqueue 2
 * enqueue 3
 * enqueue 4
 * dequeue
 * enqueue 4
 * rear
 * isFull
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * true
 * true
 * false
 * 1
 * true
 * 4
 * true
 * </pre>
 *
 * <p>Approach: a fixed array of {@code capacity} slots plus a {@code head} index and a
 * {@code size} counter. The element that sits {@code i} positions behind the head lives at
 * {@code (head + i) % capacity}, so no shifting is ever needed and the buffer never grows.
 *
 * <p>Complexity: Time O(1) per operation, Space O(capacity).
 */
public class ImplementCircularQueue {

    /** A fixed-capacity FIFO ring buffer. */
    public static class MyCircularQueue {

        private final int[] data;
        private int head = 0;
        private int size = 0;

        public MyCircularQueue(int capacity) {
            this.data = new int[Math.max(capacity, 0)];
        }

        /** Inserts {@code value}; returns false when the queue is full. */
        public boolean enqueue(int value) {
            if (isFull()) {
                return false;
            }
            data[(head + size) % data.length] = value;
            size++;
            return true;
        }

        /** Removes and returns the front element, or -1 when the queue is empty. */
        public int dequeue() {
            if (isEmpty()) {
                return -1;
            }
            int value = data[head];
            head = (head + 1) % data.length;
            size--;
            return value;
        }

        /** The front element, or -1 when the queue is empty. */
        public int peek() {
            return isEmpty() ? -1 : data[head];
        }

        /** The rear element, or -1 when the queue is empty. */
        public int rear() {
            return isEmpty() ? -1 : data[(head + size - 1) % data.length];
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return size == 0;
        }

        /** True when the queue cannot accept another element. */
        public boolean isFull() {
            return data.length == 0 || size == data.length;
        }

        /** Number of elements currently stored. */
        public int size() {
            return size;
        }

        /** Debug helper: the slots from head to tail. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < size; i++) {
                if (i > 0) {
                    sb.append(", ");
                }
                sb.append(data[(head + i) % data.length]);
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        int m = fs.nextInt();

        MyCircularQueue queue = new MyCircularQueue(capacity);
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "enqueue" -> System.out.println(queue.enqueue(fs.nextInt()));
                case "dequeue" -> System.out.println(queue.dequeue());
                case "peek" -> System.out.println(queue.peek());
                case "rear" -> System.out.println(queue.rear());
                case "isEmpty" -> System.out.println(queue.isEmpty());
                case "isFull" -> System.out.println(queue.isFull());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
        }
    }
}
