package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Sort by Frequency of Characters
 * LeetCode: null | Difficulty: Medium | Frequency: 2/5
 * Pattern: Frequency counting, Custom ordering
 *
 * <p>Problem: Reorder the characters of a string so that the most frequent character
 * comes first, the second most frequent comes next, and so on. Characters with the
 * same frequency are ordered by their character code (smaller first).
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * tree
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * eert
 * </pre>
 *
 * <p>Approach: count the characters in a hash map, sort the distinct characters by
 * (frequency descending, character ascending) and write each character as often as
 * it was counted.
 *
 * <p>Complexity: Time O(n + k log k), Space O(k).
 */
public class FrequencySort {

    /**
     * Sorts the characters of {@code s} by descending frequency.
     *
     * @param s the string to reorder
     * @return the reordered string
     */
    public static String frequencySort(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }

        List<Map.Entry<Character, Integer>> entries = new ArrayList<>(counts.entrySet());
        entries.sort((a, b) -> {
            int byFrequency = b.getValue() - a.getValue(); // most frequent first
            if (byFrequency != 0) {
                return byFrequency;
            }
            return Character.compare(a.getKey(), b.getKey()); // ties: smaller character first
        });

        StringBuilder sb = new StringBuilder();
        for (Map.Entry<Character, Integer> entry : entries) {
            for (int i = 0; i < entry.getValue(); i++) {
                sb.append(entry.getKey());
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(frequencySort(s));
    }
}
