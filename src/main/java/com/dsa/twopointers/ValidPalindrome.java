package com.dsa.twopointers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Valid Palindrome
 * LeetCode: 125 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, String scanning
 *
 * <p>Problem:
 * Given a string {@code s}, return {@code true} if it is a palindrome after ignoring all
 * non-alphanumeric characters and the case of the letters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 * The string is a single whitespace-free token.
 *
 * <p>Sample input:
 * <pre>
 * A man, a plan, a canal: Panama
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two pointers, one at each end. Skip everything that is not a letter or a
 * digit, compare the remaining characters case-insensitively, and move inwards. The
 * string never has to be copied or cleaned.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ValidPalindrome {

    /**
     * Returns true when {@code s} is a palindrome ignoring punctuation and case.
     *
     * @param s the input string
     * @return {@code true} / {@code false}
     */
    public static boolean isPalindrome(String s) {
        if (s == null) {
            return false;
        }

        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        // The string may contain spaces, so the whole line is read.
        BufferedReader reader =
                new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
        String s = reader.readLine();
        if (s == null) {
            s = "";
        }

        System.out.println(isPalindrome(s));
    }
}
