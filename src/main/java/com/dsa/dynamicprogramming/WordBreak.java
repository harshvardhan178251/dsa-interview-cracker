package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Problem: Word Break
 * LeetCode: 139 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix DP, HashSet lookups
 *
 * <p>Problem: Decide whether a string can be split into one or more dictionary words, using each word as many times as needed.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word[0] word[1] ... word[n-1]
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * leet code
 * leetcode
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Sweep the string from left to right; at every position ask whether the prefix can be broken, trying every dictionary word that could end there.
 *
 * <p>Complexity: Time O(n x L^2), Space O(|s|).
 */
public class WordBreak {

    /**
     * Decides whether {@code s} can be segmented into a sequence of dictionary words.
     *
     * <p>{@code dp[i]} is true when the first {@code i} characters of {@code s} can be broken into
     * dictionary words. The last word of such a segmentation is some {@code word} that matches
     * {@code s} at position {@code i - word.length()}.
     *
     * @param s        the string to break
     * @param wordDict the dictionary of allowed words
     * @return {@code true} when the string can be broken
     */
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        int n = s.length();

        boolean[] dp = new boolean[n + 1];
        dp[0] = true; // the empty prefix is breakable

        for (int i = 1; i <= n; i++) {
            for (String word : words) {
                int len = word.length();
                if (i >= len && dp[i - len] && s.startsWith(word, i - len)) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] dict = fs.nextStringArray(n);
        String s = fs.next();

        System.out.println(wordBreak(s, java.util.Arrays.asList(dict)) ? 1 : 0);
    }
}
