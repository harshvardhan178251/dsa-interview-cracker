package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Plus One
 * LeetCode: 66 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Carry propagation, Right-to-left scan
 *
 * <p>Problem:
 * Given a non-negative integer represented by a digit array {@code digits} (no leading
 * zeros except for the number 0 itself), increment the number by one and return the new
 * digit array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * digits[0] digits[1] ... digits[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1235
 * </pre>
 *
 * <p>Approach: start at the last digit and carry leftwards while the digit is 9. The
 * first digit that is not 9 is incremented; every 9 that was passed becomes 0. If the
 * carry runs off the left end, the answer needs one extra leading digit.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class PlusOne {

    /**
     * Returns the digits of {@code digits + 1}.
     *
     * @param digits the decimal digits, most significant first
     * @return a new array holding the incremented number
     */
    public static int[] plusOne(int[] digits) {
        int[] result = digits.clone();
        int i = result.length - 1;
        while (i >= 0 && result[i] == 9) {
            result[i] = 0;
            i--;
        }
        if (i >= 0) {
            result[i]++;
        } else {
            int[] grown = new int[digits.length + 1];
            grown[0] = 1;
            result = grown;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] digits = fs.nextIntArray(n);

        int[] answer = plusOne(digits);
        StringBuilder out = new StringBuilder();
        for (int digit : answer) {
            out.append(digit);
        }
        System.out.println(out);
    }
}
