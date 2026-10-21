package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Group Anagrams
 * LeetCode: 49 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Hashing, Canonical key
 *
 * <p>Problem: Given an array of strings, group the anagrams together. Every group is
 * printed on its own line, the words of a group separated by spaces.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word[0]
 * word[1]
 * ...
 * word[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * eat
 * tea
 * tan
 * nat
 * ate
 * bat
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ate eat tea
 * bat
 * nat tan
 * </pre>
 *
 * <p>Approach: two words are anagrams exactly when their sorted letters are equal,
 * so the sorted letters are used as a hash-map key. The groups are then printed in a
 * deterministic order: the words inside a group sorted alphabetically, and the groups
 * ordered by their first word.
 *
 * <p>Complexity: Time O(n * k log k) where k is the word length, Space O(n * k).
 */
public class GroupAnagrams {

    /**
     * Groups the anagrams of {@code strs}.
     *
     * @param strs the words to group
     * @return the groups, each sorted alphabetically, ordered by their first word
     */
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();

        for (String word : strs) {
            char[] letters = word.toCharArray();
            Arrays.sort(letters);
            String key = new String(letters); // the canonical form of the word
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
        }

        List<List<String>> result = new ArrayList<>();
        for (List<String> group : groups.values()) {
            Collections.sort(group);
            result.add(group);
        }
        // A deterministic group order: by the first (smallest) word of each group.
        result.sort((a, b) -> a.get(0).compareTo(b.get(0)));
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] strs = fs.nextStringArray(n);

        List<List<String>> groups = groupAnagrams(strs);

        StringBuilder sb = new StringBuilder();
        for (List<String> group : groups) {
            for (int i = 0; i < group.size(); i++) {
                if (i > 0) {
                    sb.append(' ');
                }
                sb.append(group.get(i));
            }
            sb.append('\n');
        }
        System.out.print(sb);
    }
}
