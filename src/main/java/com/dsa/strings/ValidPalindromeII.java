package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Valid Palindrome II
 * LeetCode: 680 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, One deletion
 *
 * <p>Problem: Given a string {@code s}, decide whether it can become a palindrome
 * after deleting <b>at most one</b> character.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abca
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two pointers walk towards the middle of the string. Every matching
 * pair is skipped, but the <b>first</b> mismatching pair is the only place where a
 * deletion can still help: delete the left character or delete the right one, and
 * check whether the remaining range is a palindrome.
 *
 * <p>Complexity: Time O(n) &mdash; one forward pass plus at most two linear scans.
 * Space O(1).
 */
public class ValidPalindromeII {

    /**
     * Returns {@code true} when {@code s} is a palindrome after deleting at most
     * one character.
     *
     * @param s the string to test
     * @return {@code true} if at most one deletion makes {@code s} a palindrome
     */
    public static boolean validPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                // First mismatch: the single allowed deletion must remove one of these two.
                return isPalindromeRange(s, left + 1, right) || isPalindromeRange(s, left, right - 1);
            }
            left++;
            right--;
        }
        return true;
    }

    /**
     * Returns {@code true} when the substring {@code s[left..right]} reads the same
     * forwards and backwards.
     */
    private static boolean isPalindromeRange(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(validPalindrome(s));
    }
}
