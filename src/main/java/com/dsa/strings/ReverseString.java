package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Reverse String
 * LeetCode: 344 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, In-place swap
 *
 * <p>Problem: Reverse the characters of a string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * hello
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * olleh
 * </pre>
 *
 * <p>Approach: copy the string into a character array and swap the two ends, moving
 * inwards until the pointers meet.
 *
 * <p>Complexity: Time O(n), Space O(n) for the character array.
 */
public class ReverseString {

    /**
     * Reverses the characters of {@code s}.
     *
     * @param s the string to reverse
     * @return the reversed string
     */
    public static String reverse(String s) {
        char[] chars = s.toCharArray();
        for (int left = 0, right = chars.length - 1; left < right; left++, right--) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
        }
        return new String(chars);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(reverse(s));
    }
}
