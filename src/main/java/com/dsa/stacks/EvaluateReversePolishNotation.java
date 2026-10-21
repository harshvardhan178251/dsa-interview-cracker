package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Evaluate Reverse Polish Notation
 * LeetCode: 150 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Stack, Postfix evaluation
 *
 * <p>Problem:
 * Evaluate an expression given in **reverse polish notation** (postfix). The operators
 * {@code + - * /} are placed after their operands.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * token[0] token[1] ... token[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 1 + 3 * 4 -
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: push the numbers on a stack; when an operator appears, pop the two topmost
 * values, combine them and push the result back.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class EvaluateReversePolishNotation {

    /**
     * Evaluates a postfix expression.
     *
     * @param tokens the tokens of the expression
     * @return the value of the expression
     */
    public static int evaluate(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (String token : tokens) {
            if (isOperator(token)) {
                int right = stack.pop();     // the right operand is on top
                int left = stack.pop();      // then the left operand
                stack.push(apply(token, left, right));
            } else {
                stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    private static boolean isOperator(String token) {
        return token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/");
    }

    private static int apply(String operator, int left, int right) {
        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;     // truncates towards zero
            default:
                throw new IllegalArgumentException("unknown operator: " + operator);
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] tokens = fs.nextStringArray(n);

        System.out.println(evaluate(tokens));
    }
}
