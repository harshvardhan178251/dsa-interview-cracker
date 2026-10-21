package com.dsa.stacks;

import com.dsa.utils.FastScanner;

/**
 * Problem: Basic Calculator II
 * LeetCode: 227 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Operator precedence, Deferred evaluation
 *
 * <p>Problem:
 * Given a string containing the operators {@code +}, {@code -}, {@code *} and {@code /} and
 * integer numbers, evaluate the expression with the usual operator precedence. Division is
 * integer division that truncates towards zero.
 *
 * <p>Input format (stdin): the expression on a single line
 * <pre>
 * 3 + 2 * 2
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 + 2 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: keep the running total and the last number together with the last operator.
 * {@code *} and {@code /} are applied to the last number immediately, {@code +} and {@code -}
 * are deferred until the next number of the same level is known.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class BasicCalculatorII {

    /**
     * Evaluates an expression containing {@code +}, {@code -}, {@code *} and {@code /}.
     *
     * @param expression the expression
     * @return the value of the expression
     */
    public static int evaluate(String expression) {
        int result = 0;      // the terms that are completely finished
        int lastNumber = 0;  // the last number, already multiplied/divided
        int number = 0;      // the number currently being read
        char operator = '+';

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c >= '0' && c <= '9') {
                number = number * 10 + (c - '0');
            }
            boolean isOperator = c != ' ' && (c < '0' || c > '9');
            if (isOperator || i == expression.length() - 1) {
                switch (operator) {
                    case '+':
                        result += lastNumber;   // flush the previous term
                        lastNumber = number;
                        break;
                    case '-':
                        result += lastNumber;
                        lastNumber = -number;
                        break;
                    case '*':
                        lastNumber = lastNumber * number;
                        break;
                    case '/':
                        lastNumber = lastNumber / number;   // truncates towards zero
                        break;
                    default:
                        break;
                }
                operator = c;
                number = 0;
            }
        }
        return result + lastNumber;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder expression = new StringBuilder();
        while (fs.hasNext()) {
            expression.append(fs.next());
        }

        System.out.println(evaluate(expression.toString()));
    }
}
