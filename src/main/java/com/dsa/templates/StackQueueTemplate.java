package com.dsa.templates;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Copy-paste starting points for the stack and queue shapes, including the monotonic
 * stack and the monotonic deque.
 *
 * <p>See the [stacks notes](../../../docs/topics/04-stacks.md) and the
 * [queues notes](../../../docs/topics/05-queues.md).
 */
public final class StackQueueTemplate {

    private StackQueueTemplate() {
    }

    /** Valid parentheses — a closing bracket must match the most recent opening one. */
    public static boolean isValidParentheses(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else if (stack.isEmpty() || !matches(stack.pop(), c)) {
                return false;
            }
        }
        return stack.isEmpty();
    }

    private static boolean matches(char open, char close) {
        return (open == '(' && close == ')')
                || (open == '[' && close == ']')
                || (open == '{' && close == '}');
    }

    /** Next greater element to the right — a monotonic decreasing stack of indices. */
    public static int[] nextGreaterElement(int[] nums) {
        int[] result = new int[nums.length];
        java.util.Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
                result[stack.pop()] = nums[i];
            }
            stack.push(i);
        }
        return result;
    }

    /** Largest rectangle in a histogram — a monotonic increasing stack of indices. */
    public static int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;

        for (int i = 0; i <= heights.length; i++) {
            int current = (i == heights.length) ? 0 : heights[i];   // sentinel flushes the stack
            while (!stack.isEmpty() && heights[stack.peek()] >= current) {
                int height = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                maxArea = Math.max(maxArea, height * (i - left - 1));
            }
            stack.push(i);
        }
        return maxArea;
    }

    /** Trapping rain water — two pointers, O(1) space. */
    public static int trapRainWater(int[] heights) {
        int left = 0;
        int right = heights.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;

        while (left < right) {
            if (heights[left] < heights[right]) {
                leftMax = Math.max(leftMax, heights[left]);
                water += leftMax - heights[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, heights[right]);
                water += rightMax - heights[right];
                right--;
            }
        }
        return water;
    }

    /** Evaluate a postfix expression. The second pop is the LEFT operand. */
    public static int evaluatePostfix(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String token : tokens) {
            switch (token) {
                case "+" -> stack.push(stack.pop() + stack.pop());
                case "-" -> {
                    int right = stack.pop();
                    int left = stack.pop();
                    stack.push(left - right);
                }
                case "*" -> stack.push(stack.pop() * stack.pop());
                case "/" -> {
                    int right = stack.pop();
                    int left = stack.pop();
                    stack.push(left / right);
                }
                default -> stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    /** A queue built from two stacks — O(1) amortised. */
    public static class MyQueue {
        private final Deque<Integer> inStack = new ArrayDeque<>();
        private final Deque<Integer> outStack = new ArrayDeque<>();

        public void push(int value) {
            inStack.push(value);
        }

        public int pop() {
            if (outStack.isEmpty()) {
                while (!inStack.isEmpty()) {
                    outStack.push(inStack.pop());
                }
            }
            return outStack.pop();
        }

        public int peek() {
            if (outStack.isEmpty()) {
                while (!inStack.isEmpty()) {
                    outStack.push(inStack.pop());
                }
            }
            return outStack.peek();
        }

        public boolean empty() {
            return inStack.isEmpty() && outStack.isEmpty();
        }
    }

    public static void main(String[] args) {
        System.out.println("isValidParentheses = " + isValidParentheses("()[]{}"));
        System.out.println("nextGreaterElement  = " + java.util.Arrays.toString(
                nextGreaterElement(new int[]{1, 2, 1, 4})));
        System.out.println("largestRectangle     = " + largestRectangleArea(new int[]{2, 1, 5, 6, 2, 3}));
        System.out.println("trapRainWater        = " + trapRainWater(new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}));
        System.out.println("evaluatePostfix      = "
                + evaluatePostfix(new String[]{"2", "1", "+", "3", "*"}));
        MyQueue queue = new MyQueue();
        queue.push(1);
        queue.push(2);
        System.out.println("MyQueue peek/pop     = " + queue.peek() + " / " + queue.pop());
    }
}
