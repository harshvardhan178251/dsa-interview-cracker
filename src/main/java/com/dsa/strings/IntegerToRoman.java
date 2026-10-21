package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Integer to Roman
 * LeetCode: 12 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Lookup table
 *
 * <p>Problem: Convert an integer between 1 and 3999 into its Roman numeral
 * representation using the standard symbols {@code I, V, X, L, C, D, M}.
 *
 * <p>Input format (stdin):
 * <pre>
 * num
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1994
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * MCMXCIV
 * </pre>
 *
 * <p>Approach: greedy. Walk a table of value/symbol pairs in descending order and
 * repeatedly append the largest symbol that still fits. The table contains the six
 * subtractive pairs ({@code CM, CD, XC, XL, IX, IV}) so that no special casing is
 * needed.
 *
 * <p>Complexity: Time O(n) in the number of output symbols, Space O(n).
 */
public class IntegerToRoman {

    private static final int[] VALUES = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    private static final String[] SYMBOLS = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

    /**
     * Converts an integer into its Roman numeral representation.
     *
     * @param num the value to convert (1 ≤ num ≤ 3999)
     * @return the Roman numeral, or {@code ""} for values below 1
     */
    public static String intToRoman(int num) {
        if (num <= 0) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < VALUES.length; i++) {
            while (num >= VALUES[i]) {
                sb.append(SYMBOLS[i]);
                num -= VALUES[i];
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int num = fs.nextInt();

        System.out.println(intToRoman(num));
    }
}
