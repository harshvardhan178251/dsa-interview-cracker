package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Min Stack
 * LeetCode: 155 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Stack, Auxiliary minimum tracking
 *
 * <p>Problem:
 * Design a stack that supports pushing an integer, popping the top element, retrieving the
 * top element and retrieving the minimum element — all in **constant time**.
 *
 * <p>Input format (stdin): a number of operations, one per line
 * <pre>
 * q
 * push 5
 * getMin
 * ...
 * </pre>
 * The program prints one line per query operation ({@code top} or {@code getMin}).
 *
 * <p>Sample input:
 * <pre>
 * 6
 * push 5
 * push 3
 * getMin
 * pop
 * top
 * getMin
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 5
 * 5
 * </pre>
 *
 * <p>Approach: every entry stores the value **and** the minimum of the stack at the moment
 * it was pushed.
 *
 * <p>Complexity: Time O(1) per operation, Space O(n).
 */
public class MinStack {

    /** One stack entry: the value and the minimum of the stack when it was pushed. */
    public static class Entry {
        public final int value;
        public final int min;

        public Entry(int value, int min) {
            this.value = value;
            this.min = min;
        }
    }

    private final Deque<Entry> stack = new ArrayDeque<>();

    /**
     * Pushes a value onto the stack.
     *
     * @param value the value to push
     */
    public void push(int value) {
        int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
        stack.push(new Entry(value, min));
    }

    /**
     * Removes the top element.
     *
     * @return the removed value, or {@code null} when the stack was empty
     */
    public Integer pop() {
        if (stack.isEmpty()) {
            return null;
        }
        return stack.pop().value;
    }

    /**
     * Returns the top element without removing it.
     *
     * @return the top value, or {@code null} when the stack is empty
     */
    public Integer top() {
        return stack.isEmpty() ? null : stack.peek().value;
    }

    /**
     * Returns the smallest value currently on the stack.
     *
     * @return the minimum, or {@code null} when the stack is empty
     */
    public Integer getMin() {
        return stack.isEmpty() ? null : stack.peek().min;
    }

    /**
     * Replays a list of operations and returns the answers of the query operations.
     *
     * @param operations operations such as {@code "push 5"}, {@code "pop"}, {@code "top"},
     *                    {@code "getMin"}
     * @return the answers, one per query operation
     */
    public static List<Integer> simulate(String[] operations) {
        MinStack stack = new MinStack();
        List<Integer> answers = new ArrayList<>();
        for (String operation : operations) {
            String[] parts = operation.trim().split("\\s+");
            String kind = parts[0].toLowerCase();
            switch (kind) {
                case "push":
                    stack.push(Integer.parseInt(parts[1]));
                    break;
                case "pop":
                    stack.pop();
                    break;
                case "top":
                    answers.add(stack.top());
                    break;
                case "getmin":
                    answers.add(stack.getMin());
                    break;
                default:
                    break;
            }
        }
        return answers;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int q = fs.nextInt();

        String[] operations = new String[q];
        for (int i = 0; i < q; i++) {
            String kind = fs.next();
            if ("push".equalsIgnoreCase(kind)) {
                operations[i] = "push " + fs.nextInt();
            } else {
                operations[i] = kind;
            }
        }

        StringBuilder sb = new StringBuilder();
        for (Integer answer : simulate(operations)) {
            if (sb.length() > 0) {
                sb.append('\n');
            }
            sb.append(answer == null ? "empty" : String.valueOf(answer));
        }
        System.out.println(sb);
    }
}
