package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Add Binary
 * LeetCode: 415 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit manipulation, Carry propagation
 *
 * <p>Problem:
 * Add two binary strings and return the result as a binary string. The strings may be
 * very long, so no numeric conversion is used.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1010
 * 1011
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10101
 * </pre>
 *
 * <p>Approach: walk both strings from right to left, add the two digits plus the carry
 * and append {@code sum % 2} to the result while carrying {@code sum / 2} over. The
 * result is built backwards and reversed at the end.
 *
 * <p>Complexity: Time O(max(|a|, |b|)), Space O(max(|a|, |b|)).
 */
public class AddBinary {

    /**
     * Adds two binary strings.
     *
     * @param a first binary string
     * @param b second binary string
     * @return the sum of the two numbers as a binary string
     */
    public static String addBinary(String a, String b) {
        if (a == null) {
            a = "";
        }
        if (b == null) {
            b = "";
        }
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;
        StringBuilder result = new StringBuilder();
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) {
                sum += a.charAt(i--) - '0';
            }
            if (j >= 0) {
                sum += b.charAt(j--) - '0';
            }
            result.append((char) ('0' + (sum % 2)));
            carry = sum / 2;
        }
        return result.reverse().toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String a = fs.next();
        String b = fs.next();

        System.out.println(addBinary(a, b));
    }
}
