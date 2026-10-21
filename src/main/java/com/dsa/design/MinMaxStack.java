package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Min Max Stack
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Stack with running aggregates
 *
 * <p>Problem:
 * Implement a stack that supports {@code push}, {@code pop}, {@code top}, {@code getMin}
 * and {@code getMax}, where {@code getMin} and {@code getMax} must return the minimum and
 * maximum of the whole stack in O(1) time.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * push v
 * pop
 * top
 * getMin
 * getMax
 * ...
 * </pre>
 * {@code push} prints nothing; every other operation prints one line with its result
 * ({@code -1} when the stack is empty).
 *
 * <p>Sample input:
 * <pre>
 * 7
 * push 5
 * push 3
 * push 7
 * getMin
 * getMax
 * pop
 * top
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 7
 * 7
 * 3
 * </pre>
 *
 * <p>Approach: every frame stores the pushed value <em>together with</em> the running
 * minimum and maximum of the stack up to that frame. Pushing computes the new extremes in
 * O(1); popping simply discards a frame, which restores the previous extremes for free.
 *
 * <p>Complexity: Time O(1) per operation, Space O(n).
 */
public class MinMaxStack {

    /** One stack frame: the value plus the running min and max below it. */
    static final class Frame {
        final int value;
        final int min;
        final int max;

        Frame(int value, int min, int max) {
            this.value = value;
            this.min = min;
            this.max = max;
        }
    }

    private final Deque<Frame> stack = new ArrayDeque<>();

    /** Pushes {@code value} onto the stack. */
    public void push(int value) {
        int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
        int max = stack.isEmpty() ? value : Math.max(value, stack.peek().max);
        stack.push(new Frame(value, min, max));
    }

    /** Removes and returns the top value, or {@code -1} when the stack is empty. */
    public int pop() {
        if (stack.isEmpty()) {
            return -1;
        }
        return stack.pop().value;
    }

    /** Returns the top value without removing it, or {@code -1} when the stack is empty. */
    public int top() {
        return stack.isEmpty() ? -1 : stack.peek().value;
    }

    /** Returns the smallest value on the stack, or {@code -1} when the stack is empty. */
    public int getMin() {
        return stack.isEmpty() ? -1 : stack.peek().min;
    }

    /** Returns the largest value on the stack, or {@code -1} when the stack is empty. */
    public int getMax() {
        return stack.isEmpty() ? -1 : stack.peek().max;
    }

    /** Number of elements on the stack. */
    public int size() {
        return stack.size();
    }

    /** Human readable snapshot of the stack, top first. */
    public String state() {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        for (Frame frame : stack) {
            if (!first) {
                sb.append(", ");
            }
            first = false;
            sb.append(frame.value);
        }
        return sb.append(']').toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        MinMaxStack stack = new MinMaxStack();

        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("push".equals(command)) {
                stack.push(fs.nextInt());
            } else if ("pop".equals(command)) {
                out.append(stack.pop()).append('\n');
            } else if ("top".equals(command)) {
                out.append(stack.top()).append('\n');
            } else if ("getMin".equals(command)) {
                out.append(stack.getMin()).append('\n');
            } else if ("getMax".equals(command)) {
                out.append(stack.getMax()).append('\n');
            }
        }
        System.out.print(out);
    }
}
