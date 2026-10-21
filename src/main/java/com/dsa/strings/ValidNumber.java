package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Valid Number
 * LeetCode: null | Difficulty: Medium | Frequency: 2/5
 * Pattern: Parsing, Finite state machine
 *
 * <p>Problem: Decide whether a string is a valid number. A valid number matches the
 * grammar
 * <pre>
 *     [+-]? ( digits ( '.' digits* )? | '.' digits ) ( [eE] [+-]? digits )?
 * </pre>
 * that is: an optional sign, a mantissa with at least one digit, and an optional
 * exponent that itself contains at least one digit.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2e10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: an index-based scan that consumes the string in the order the grammar
 * dictates — sign, mantissa, optional exponent — and finally checks that the whole
 * string was consumed.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ValidNumber {

    /**
     * Returns {@code true} when {@code s} is a valid number.
     *
     * @param s the candidate string
     * @return {@code true} if the string matches the number grammar
     */
    public static boolean isValidNumber(String s) {
        int i = 0;
        int n = s.length();

        // Optional sign.
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            i++;
        }

        // Mantissa: digits, then optionally a dot and more digits.
        boolean hasDigit = false;
        while (i < n && isDigit(s.charAt(i))) {
            i++;
            hasDigit = true;
        }
        if (i < n && s.charAt(i) == '.') {
            i++;
            while (i < n && isDigit(s.charAt(i))) {
                i++;
                hasDigit = true;
            }
        }
        if (!hasDigit) {
            return false; // a mantissa needs at least one digit
        }

        // Optional exponent.
        if (i < n && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
            i++;
            if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                i++;
            }
            int exponentStart = i;
            while (i < n && isDigit(s.charAt(i))) {
                i++;
            }
            if (i == exponentStart) {
                return false; // "1e" and "1e+" are not numbers
            }
        }

        // Nothing may be left over.
        return i == n;
    }

    /** True for the ASCII digits {@code '0'..'9'} only. */
    private static boolean isDigit(char c) {
        return c >= '0' && c <= '9';
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(isValidNumber(s));
    }
}
