package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: String to Integer (atoi)
 * LeetCode: 8 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Parsing, Overflow guards
 *
 * <p>Problem: Implement a function that converts a string to an integer, mimicking
 * {@code atoi}. Leading whitespace is ignored, an optional sign is honoured, digits
 * are read until the first non-digit character, and the result is clamped to the
 * 32-bit signed range instead of overflowing.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2147483648
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2147483647
 * </pre>
 *
 * <p>Approach: skip whitespace, read the optional sign, then accumulate digits into a
 * {@code long} and bail out with {@code Integer.MAX_VALUE} / {@code Integer.MIN_VALUE}
 * the moment the value would leave the 32-bit range.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class StringToInteger {

    /**
     * Converts a string to a 32-bit signed integer, the way {@code atoi} does.
     *
     * @param s the string to parse
     * @return the parsed value, clamped to {@code [Integer.MIN_VALUE, Integer.MAX_VALUE]}
     */
    public static int myAtoi(String s) {
        int i = 0;
        int n = s.length();

        // 1. Skip leading whitespace.
        while (i < n && Character.isWhitespace(s.charAt(i))) {
            i++;
        }
        if (i == n) {
            return 0;
        }

        // 2. Optional sign.
        int sign = 1;
        char signChar = s.charAt(i);
        if (signChar == '+' || signChar == '-') {
            sign = signChar == '-' ? -1 : 1;
            i++;
        }

        // 3. Digits, with an overflow guard on every step.
        long value = 0;
        while (i < n && isDigit(s.charAt(i))) {
            value = value * 10 + (s.charAt(i) - '0');
            if (sign == 1 && value > Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
            if (sign == -1 && -value < Integer.MIN_VALUE) {
                return Integer.MIN_VALUE;
            }
            i++;
        }

        return (int) (sign * value);
    }

    /** True for the ASCII digits {@code '0'..'9'} only. */
    private static boolean isDigit(char c) {
        return c >= '0' && c <= '9';
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(myAtoi(s));
    }
}
