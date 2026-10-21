package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: First Unique Character in a String
 * LeetCode: 387 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Frequency counting, Hash map
 *
 * <p>Problem: Given a string, return the index of the **first** character that does
 * not repeat anywhere else in the string. If there is no such character, return
 * {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * leetcode
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * </pre>
 *
 * <p>Approach: count the occurrences of every character in a hash map, then walk the
 * string again and return the first index whose character has a count of one.
 *
 * <p>Complexity: Time O(n), Space O(k) where k is the number of distinct characters.
 */
public class FirstUniqueCharacterInString {

    /**
     * Returns the index of the first non-repeating character of {@code s}.
     *
     * @param s the input string
     * @return the index of the first unique character, or {@code -1} when there is none
     */
    public static int firstUniqueCharacter(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }

        for (int i = 0; i < s.length(); i++) {
            if (counts.get(s.charAt(i)) == 1) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(firstUniqueCharacter(s));
    }
}
