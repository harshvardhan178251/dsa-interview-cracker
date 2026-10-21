package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Basic Calculator
 * LeetCode: 224 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Stack of pending results, Recursive descent
 *
 * <p>Problem:
 * Given a string containing the operators {@code +}, {@code -}, parentheses and integer
 * numbers, evaluate the expression. Parentheses may be nested and a unary minus is allowed.
 *
 * <p>Input format (stdin): the expression on a single line
 * <pre>
 * 1 - (2 - 3)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1 - (2 - 3)
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: a stack of {@code (result, sign)} pairs. Every parenthesis pushes the work
 * done so far and starts a fresh sub-expression.
 *
 * <p>Complexity: Time O(n), Space O(d) with d the nesting depth.
 */
public class BasicCalculator {

    /**
     * Evaluates an expression containing {@code +}, {@code -} and parentheses.
     *
     * @param expression the expression
     * @return the value of the expression
     */
    public static int evaluate(String expression) {
        Deque<int[]> stack = new ArrayDeque<>();   // pairs of (result so far, sign)
        int result = 0;
        int number = 0;
        int sign = 1;

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c >= '0' && c <= '9') {
                number = number * 10 + (c - '0');
            } else if (c == '+' || c == '-') {
                result += sign * number;            // close the previous number
                number = 0;
                sign = (c == '+') ? 1 : -1;          // the sign of the next number
            } else if (c == '(') {
                stack.push(new int[]{result, sign}); // remember the outer state
                result = 0;
                number = 0;
                sign = 1;                           // a sub-expression starts with '+'
            } else if (c == ')') {
                result += sign * number;            // finish the sub-expression
                number = 0;
                int[] previous = stack.pop();
                result = previous[0] + previous[1] * result;
                sign = 1;
            }
            // spaces are ignored
        }
        return result + sign * number;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder expression = new StringBuilder();
        while (fs.hasNext()) {
            expression.append(fs.next());      // whitespace is irrelevant for the parser
        }

        System.out.println(evaluate(expression.toString()));
    }
}
