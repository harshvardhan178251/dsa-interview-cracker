package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Longest Substring Without Repeating Characters
 * LeetCode: 3 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Sliding window, Hashing
 *
 * <p>Problem:
 * Given a string {@code s}, return the length of the **longest substring** that contains no
 * repeated characters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abcabcbb
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a classic sliding window. Keep the window {@code [left, right]} free of
 * duplicates and a map of the last position of every character. When a character that already
 * lives inside the window is seen again, move {@code left} just past its previous occurrence.
 *
 * <p>Complexity: Time O(n), Space O(min(n, alphabet)).
 */
public class LongestSubstringWithoutRepeatingCharacters {

    /**
     * Returns the length of the longest substring of {@code s} with all distinct characters.
     *
     * @param s the input string
     * @return the length of the longest duplicate-free substring
     */
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            Integer previous = lastSeen.get(c);
            // Only jump forward if the previous occurrence is still inside the window.
            if (previous != null && previous >= left) {
                left = previous + 1;
            }
            lastSeen.put(c, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(lengthOfLongestSubstring(s));
    }
}
