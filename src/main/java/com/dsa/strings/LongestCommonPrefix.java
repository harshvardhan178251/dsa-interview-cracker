package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Longest Common Prefix
 * LeetCode: 14 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Vertical scan
 *
 * <p>Problem: Given an array of strings, return the longest prefix that **every**
 * string in the array starts with. When there is no common prefix, return the empty
 * string.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * strs[0]
 * strs[1]
 * ...
 * strs[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * flower
 * flow
 * flight
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * fl
 * </pre>
 *
 * <p>Approach: keep the candidate prefix in a variable and shorten it against every
 * following string, character by character.
 *
 * <p>Complexity: Time O(n * m), Space O(m) for the prefix.
 */
public class LongestCommonPrefix {

    /**
     * Returns the longest common prefix of the given strings.
     *
     * @param strs the array of strings
     * @return the longest common prefix, or {@code ""} when there is none
     */
    public static String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) {
            return "";
        }

        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            int j = 0;
            int limit = Math.min(prefix.length(), strs[i].length());
            while (j < limit && prefix.charAt(j) == strs[i].charAt(j)) {
                j++;
            }
            prefix = prefix.substring(0, j);
            if (prefix.isEmpty()) {
                return ""; // nothing can be added back, stop early
            }
        }
        return prefix;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] strs = fs.nextStringArray(n);

        System.out.println(longestCommonPrefix(strs));
    }
}
