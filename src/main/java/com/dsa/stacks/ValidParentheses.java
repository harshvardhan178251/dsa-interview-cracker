package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Valid Parentheses
 * LeetCode: 20 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Stack, Bracket matching
 *
 * <p>Problem:
 * Given a string containing the characters {@code ( ) [ ] { }}, decide whether the brackets
 * are balanced: every opening bracket must be closed by the same type of bracket, and the
 * brackets must be closed in the correct order.
 *
 * <p>Input format (stdin): a single line with the bracket string
 * <pre>
 * ()[]{}
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ()[]{}
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: push every opening bracket on a stack; for every closing bracket the top of
 * the stack must be its matching opening bracket.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ValidParentheses {

    /**
     * Returns {@code true} when the bracket string is balanced.
     *
     * @param s the string of brackets
     * @return whether the brackets are balanced
     */
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);                       // remember what has to be closed
            } else {
                if (stack.isEmpty()) {
                    return false;                    // a closing bracket without an opener
                }
                char open = stack.pop();
                if (!matches(open, c)) {
                    return false;                    // the types do not match
                }
            }
        }
        return stack.isEmpty();                      // no opening bracket left unclosed
    }

    /** Returns whether the closing bracket {@code close} matches the opening bracket {@code open}. */
    private static boolean matches(char open, char close) {
        return (open == '(' && close == ')')
                || (open == '[' && close == ']')
                || (open == '{' && close == '}');
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(isValid(s) ? "true" : "false");
    }
}
