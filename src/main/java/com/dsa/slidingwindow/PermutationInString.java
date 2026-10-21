package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

/**
 * Problem: Permutation in String
 * LeetCode: 567 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * Given two strings {@code s1} and {@code s2}, return {@code true} if {@code s2} contains a
 * permutation of {@code s1} — that is, if some substring of {@code s2} is an anagram of
 * {@code s1} — otherwise return {@code false}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s1
 * s2
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ab
 * eidbaooo
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: a permutation has exactly the same character counts as {@code s1}, so slide a
 * window of length {@code |s1|} over {@code s2} and keep a counter of how many required
 * character occurrences are still missing.
 *
 * <p>Complexity: Time O(|s1| + |s2|), Space O(1) — an alphabet-sized counter.
 */
public class PermutationInString {

    /**
     * Returns whether {@code s2} contains a permutation of {@code s1}.
     *
     * @param s1 the pattern
     * @param s2 the haystack
     * @return whether an anagram of {@code s1} occurs inside {@code s2}
     */
    public static boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) {
            return false;
        }
        int[] need = new int[26];
        for (char c : s1.toCharArray()) {
            need[c - 'a']++;
        }
        int[] window = new int[26];
        // Number of required character occurrences that the window is still missing.
        int missing = s1.length();

        for (int i = 0; i < s2.length(); i++) {
            char c = s2.charAt(i);
            if (need[c - 'a'] > 0 && window[c - 'a'] < need[c - 'a']) {
                missing--;
            }
            window[c - 'a']++;

            if (i >= s1.length()) {
                char removed = s2.charAt(i - s1.length());
                int index = removed - 'a';
                if (need[index] > 0 && window[index] <= need[index]) {
                    missing++;
                }
                window[index]--;
            }
            if (missing == 0) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s1 = fs.next();
        String s2 = fs.next();

        System.out.println(checkInclusion(s1, s2));
    }
}
