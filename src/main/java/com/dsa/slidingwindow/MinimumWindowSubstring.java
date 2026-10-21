package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Minimum Window Substring
 * LeetCode: 76 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Sliding window, Hashing, Two pointers
 *
 * <p>Problem:
 * Given strings {@code s} and {@code t}, return the **minimum window** of {@code s} that
 * contains every character of {@code t} (including duplicates). If there is no such window,
 * return the empty string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ADOBECODEBANC
 * ABC
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * BANC
 * </pre>
 *
 * <p>Approach: expand the right edge until the window covers every needed character, then
 * contract the left edge as far as possible while it stays valid, recording the best window
 * seen on the way.
 *
 * <p>Complexity: Time O(|s| + |t|), Space O(|t|).
 */
public class MinimumWindowSubstring {

    /**
     * Returns the shortest substring of {@code s} that contains every character of {@code t}.
     *
     * @param s the haystack
     * @param t the needle
     * @return the minimum window, or the empty string when none exists
     */
    public static String minWindow(String s, String t) {
        if (s.isEmpty() || t.isEmpty() || t.length() > s.length()) {
            return "";
        }
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) {
            need.merge(c, 1, Integer::sum);
        }
        Map<Character, Integer> window = new HashMap<>();

        int required = need.size();
        int formed = 0;
        int left = 0;
        int bestLength = Integer.MAX_VALUE;
        int bestStart = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need.containsKey(c)) {
                int count = window.merge(c, 1, Integer::sum);
                if (count == need.get(c)) {
                    // This character is now satisfied for the first time.
                    formed++;
                }
            }
            // Contract while the window is still valid.
            while (formed == required) {
                if (right - left + 1 < bestLength) {
                    bestLength = right - left + 1;
                    bestStart = left;
                }
                char removed = s.charAt(left);
                if (need.containsKey(removed)) {
                    int count = window.merge(removed, -1, Integer::sum);
                    if (count < need.get(removed)) {
                        formed--;
                    }
                }
                left++;
            }
        }

        return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(minWindow(s, t));
    }
}
