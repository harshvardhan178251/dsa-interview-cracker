package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Palindromic Substring
 * LeetCode: 5 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Expand around centre
 *
 * <p>Problem: Given a string {@code s}, return the longest <b>contiguous</b> substring
 * of {@code s} that is a palindrome.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * babad
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * bab
 * </pre>
 *
 * <p>Approach: every palindrome has a centre — either on a character (odd length) or
 * between two characters (even length). For each of the 2n-1 possible centres, expand
 * outwards while the two characters match and keep the longest result.
 *
 * <p>Complexity: Time O(n²), Space O(1).
 */
public class LongestPalindromicSubstring {

    /**
     * Returns the longest palindromic substring of {@code s}.
     *
     * <p>When several palindromes share the maximum length, the one that starts
     * earliest is returned (the answer is deterministic).
     *
     * @param s the input string
     * @return the longest palindromic substring, or {@code ""} for an empty string
     */
    public static String longestPalindrome(String s) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        int bestStart = 0;
        int bestLength = 1;

        for (int centre = 0; centre < s.length(); centre++) {
            // Odd length: the centre sits on s[centre].
            int odd = expand(s, centre, centre);
            if (odd > bestLength) {
                bestLength = odd;
                bestStart = centre - odd / 2;
            }

            // Even length: the centre sits between s[centre] and s[centre + 1].
            int even = expand(s, centre, centre + 1);
            if (even > bestLength) {
                bestLength = even;
                bestStart = centre - (even - 1) / 2;
            }
        }

        return s.substring(bestStart, bestStart + bestLength);
    }

    /**
     * Expands outwards from {@code left}/{@code right} while the characters match.
     *
     * @return the length of the palindrome that was found
     */
    private static int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // The loop stopped with left/right just outside the palindrome.
        return right - left - 1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(longestPalindrome(s));
    }
}
