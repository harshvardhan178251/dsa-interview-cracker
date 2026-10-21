package com.dsa.strings;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Valid Anagram
 * LeetCode: 242 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Frequency counting, Hash map
 *
 * <p>Problem: Given two strings, decide whether the second one is an anagram of the
 * first — that is, whether both use exactly the same characters the same number of
 * times, in any order.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * anagram
 * nagaram
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: count the occurrences of every character of the first string in a hash
 * map, then walk the second string and consume one occurrence per character. If a
 * character is missing (or already used up), the strings are not anagrams.
 *
 * <p>Complexity: Time O(n), Space O(k) where k is the number of distinct characters.
 */
public class ValidAnagram {

    /**
     * Returns {@code true} when {@code t} is an anagram of {@code s}.
     *
     * @param s the first string
     * @param t the candidate anagram
     * @return {@code true} when both strings contain the same characters with the same counts
     */
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }

        for (char c : t.toCharArray()) {
            Integer available = counts.get(c);
            if (available == null || available == 0) {
                return false; // unknown character, or all copies already used
            }
            counts.put(c, available - 1);
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(isAnagram(s, t));
    }
}
