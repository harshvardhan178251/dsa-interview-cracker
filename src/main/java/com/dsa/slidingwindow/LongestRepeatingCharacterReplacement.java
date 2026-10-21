package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Longest Repeating Character Replacement
 * LeetCode: 424 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Greedy
 *
 * <p>Problem:
 * Given a string {@code s} and an integer {@code k}, return the length of the longest
 * substring of {@code s} such that **at most** {@code k} characters are replaced with other
 * characters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * AABABBA
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: a window of length L can be made uniform with at most
 * {@code L - (frequency of its most common character)} replacements. So a window is valid
 * when {@code windowLength - maxFrequency <= k}. Slide the window and shrink it from the
 * left whenever that condition breaks.
 *
 * <p>Complexity: Time O(n), Space O(min(n, alphabet)).
 */
public class LongestRepeatingCharacterReplacement {

    /**
     * Returns the length of the longest substring that can be made uniform with at most
     * {@code k} replacements.
     *
     * @param s the input string
     * @param k the number of replacements allowed
     * @return the maximum achievable length
     */
    public static int characterReplacement(String s, int k) {
        Map<Character, Integer> count = new HashMap<>();
        int left = 0;
        int maxCount = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            count.merge(c, 1, Integer::sum);
            if (count.get(c) > maxCount) {
                maxCount = count.get(c);
            }
            // Shrink until the window can be made uniform with k replacements.
            while (right - left + 1 - maxCount > k) {
                count.merge(s.charAt(left), -1, Integer::sum);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        int k = fs.nextInt();

        System.out.println(characterReplacement(s, k));
    }
}
