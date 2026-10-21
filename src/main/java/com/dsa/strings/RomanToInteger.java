package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Roman to Integer
 * LeetCode: 13 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Greedy, Left-to-right scan
 *
 * <p>Problem: Convert a Roman numeral into an integer. Roman numerals use the symbols
 * {@code I, V, X, L, C, D, M}; a symbol that is smaller than the symbol right after it
 * is subtracted, every other symbol is added.
 *
 * <p>Input format (stdin):
 * <pre>
 * roman
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * MCMXCIV
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1994
 * </pre>
 *
 * <p>Approach: one left-to-right scan. For every symbol compare its value with the
 * value of the next symbol: if it is smaller it is subtracted, otherwise it is added.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class RomanToInteger {

    /**
     * Converts a Roman numeral into its integer value.
     *
     * @param s the Roman numeral
     * @return the numeric value, or 0 for an empty string
     */
    public static int romanToInt(String s) {
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int current = valueOf(s.charAt(i));
            int next = (i + 1 < s.length()) ? valueOf(s.charAt(i + 1)) : 0;
            if (current < next) {
                total -= current; // subtractive pair such as IV or XC
            } else {
                total += current;
            }
        }
        return total;
    }

    /** The value of a single Roman symbol. */
    private static int valueOf(char c) {
        switch (c) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
            default:
                return 0;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String roman = fs.next();

        System.out.println(romanToInt(roman));
    }
}
