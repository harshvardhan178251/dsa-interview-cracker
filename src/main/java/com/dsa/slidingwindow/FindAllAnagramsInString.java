package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Find All Anagrams in a String
 * LeetCode: 438 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * Given two strings {@code s} and {@code p}, return the **start indices** of every substring
 * of {@code s} that is an anagram of {@code p}. The indices may be returned in any order.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * p
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * cbaebabacd
 * abc
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 6
 * </pre>
 *
 * <p>Approach: every candidate window has the same length as {@code p}, so slide a fixed
 * size window over {@code s} and maintain a counter of how many required character
 * occurrences are still missing. When the counter reaches zero the window is an anagram.
 *
 * <p>Complexity: Time O(|s| + |p|), Space O(1) — an alphabet-sized counter.
 */
public class FindAllAnagramsInString {

    /**
     * Returns the start indices of every anagram of {@code p} inside {@code s}.
     *
     * @param s the haystack
     * @param p the pattern
     * @return the start indices, in increasing order
     */
    public static List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        if (p.isEmpty() || s.length() < p.length()) {
            return result;
        }
        int[] need = new int[26];
        for (char c : p.toCharArray()) {
            need[c - 'a']++;
        }
        int[] window = new int[26];
        int missing = p.length();

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need[c - 'a'] > 0 && window[c - 'a'] < need[c - 'a']) {
                missing--;
            }
            window[c - 'a']++;

            if (right >= p.length()) {
                char removed = s.charAt(right - p.length());
                int index = removed - 'a';
                if (need[index] > 0 && window[index] <= need[index]) {
                    missing++;
                }
                window[index]--;
            }

            if (missing == 0 && right >= p.length() - 1) {
                result.add(right - p.length() + 1);
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String p = fs.next();

        List<Integer> answer = findAnagrams(s, p);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
    }
}
