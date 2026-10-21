package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Excel Sheet Column Number
 * LeetCode: 171 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Base-26 conversion
 *
 * <p>Problem: Convert an Excel column title into its number. {@code "A"} is 1,
 * {@code "Z"} is 26, {@code "AA"} is 27, {@code "AB"} is 28.
 *
 * <p>Input format (stdin):
 * <pre>
 * columnTitle
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * AB
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 28
 * </pre>
 *
 * <p>Approach: treat the title as a base-26 number whose digits are {@code 1..26}
 * instead of {@code 0..25}. Fold the title left to right with
 * {@code result = result * 26 + digit}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ExcelSheetColumnNumber {

    /**
     * Converts an Excel column title into its column number.
     *
     * @param columnTitle the title, e.g. {@code "AB"}
     * @return the 1-based column number, e.g. 28
     */
    public static int titleToNumber(String columnTitle) {
        int result = 0;
        for (int i = 0; i < columnTitle.length(); i++) {
            result = result * 26 + (columnTitle.charAt(i) - 'A' + 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String columnTitle = fs.next();

        System.out.println(titleToNumber(columnTitle));
    }
}
