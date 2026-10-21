package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Isomorphic Strings
 * LeetCode: 205 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Bijective mapping
 *
 * <p>Problem: Two strings are isomorphic when every character of the first string
 * maps to exactly one character of the second string, and no two different
 * characters map to the same character.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * egg
 * add
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two maps — one in each direction. The forward map stops one character
 * from mapping to two different characters, and the backward map stops two different
 * characters from mapping to the same character.
 *
 * <p>Complexity: Time O(n), Space O(k) where k is the number of distinct characters.
 */
public class IsomorphicStrings {

    /**
     * Returns {@code true} when {@code s} and {@code t} are isomorphic.
     *
     * @param s the first string
     * @param t the second string
     * @return {@code true} when the characters correspond one to one
     */
    public static boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Character> forward = new HashMap<>();
        Map<Character, Character> backward = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char from = s.charAt(i);
            char to = t.charAt(i);

            Character mapped = forward.get(from);
            if (mapped == null) {
                if (backward.containsKey(to)) {
                    return false; // another character already maps to `to`
                }
                forward.put(from, to);
                backward.put(to, from);
            } else if (mapped != to) {
                return false; // `from` already maps to a different character
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(isIsomorphic(s, t));
    }
}
