package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Excel Sheet Column Title
 * LeetCode: 168 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Base-26 conversion
 *
 * <p>Problem: Convert a positive integer into its Excel column title. Columns are
 * numbered from 1, and the letters are {@code A..Z} — so 1 is {@code "A"}, 26 is
 * {@code "Z"}, 27 is {@code "AA"}, 28 is {@code "AB"} and 703 is {@code "AAA"}.
 *
 * <p>Input format (stdin):
 * <pre>
 * columnNumber
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 28
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * AB
 * </pre>
 *
 * <p>Approach: this is base-26 with digits {@code 1..26} instead of {@code 0..25}.
 * Subtract one before every division so that the remainder lands on {@code 0..25}
 * and can be mapped onto {@code 'A'..'Z'}. The letters come out least-significant
 * first, so the result is reversed at the end.
 *
 * <p>Complexity: Time O(log26 n), Space O(log26 n).
 */
public class ExcelSheetColumnTitle {

    /**
     * Converts a column number into its Excel title.
     *
     * @param columnNumber the 1-based column number
     * @return the title, e.g. {@code "AB"} for 28
     */
    public static String convertToTitle(int columnNumber) {
        StringBuilder sb = new StringBuilder();
        while (columnNumber > 0) {
            columnNumber--; // shift the digit range from 1..26 to 0..25
            sb.append((char) ('A' + columnNumber % 26));
            columnNumber /= 26;
        }
        return sb.reverse().toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int columnNumber = fs.nextInt();

        System.out.println(convertToTitle(columnNumber));
    }
}
