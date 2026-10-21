package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Problem: Word Ladder
 * LeetCode: 127 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BFS, wildcard bucketing
 *
 * <p>Problem: Given a dictionary of words and a begin/end word, return the length of the
 * shortest transformation sequence. A single letter may be changed at a time and every
 * intermediate word has to be in the dictionary. The answer counts the <em>words</em> in the
 * sequence (so {@code begin == end} gives 1). {@code 0} means the end word is unreachable.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * ...
 * wordn
 * beginWord
 * endWord
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * hot
 * dot
 * dog
 * lot
 * log
 * cog
 * hit
 * cog
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: BFS over the words. Comparing every pair of dictionary words would be O(n² * L).
 * Instead we bucket the words by a <em>wildcard</em> pattern: {@code "hot"} is bucketed under
 * {@code "*ot"}, {@code "dot"} and {@code "lot"} are all bucketed under {@code "o*"}, and so on.
 * Two words are one letter apart exactly when they share a bucket, so one BFS level expands in
 * O(total characters) instead of O(n²).
 *
 * <p>Complexity: Time O(N * L²) — L buckets per word, each hash of a length-L string. Space O(N * L).
 */
public class WordLadder {

    /**
     * Length of the shortest transformation sequence.
     *
     * @param words    the dictionary
     * @param beginWord the starting word
     * @param endWord   the target word
     * @return the number of words in the shortest sequence, {@code 0} when unreachable
     */
    public static int ladderLength(String[] words, String beginWord, String endWord) {
        Set<String> dictionary = new HashSet<>(Arrays.asList(words));
        if (!dictionary.contains(endWord)) {
            return 0;
        }
        if (beginWord.equals(endWord)) {
            return 1;
        }

        // bucket "hot" under "*ot", "dot" under "d*t", ...
        Map<String, List<String>> buckets = new HashMap<>();
        List<String> all = new ArrayList<>(Arrays.asList(words));
        all.add(beginWord);
        for (String word : all) {
            char[] chars = word.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                char original = chars[i];
                chars[i] = '*';
                buckets.computeIfAbsent(new String(chars), key -> new ArrayList<>()).add(word);
                chars[i] = original;
            }
        }

        Deque<String> queue = new ArrayDeque<>();
        queue.add(beginWord);
        dictionary.remove(beginWord);

        int wordsInSequence = 1;
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                String current = queue.poll();
                char[] chars = current.toCharArray();
                for (int p = 0; p < chars.length; p++) {
                    char original = chars[p];
                    chars[p] = '*';
                    List<String> candidates = buckets.get(new String(chars));
                    chars[p] = original;
                    if (candidates == null) {
                        continue;
                    }
                    for (String candidate : candidates) {
                        if (!dictionary.remove(candidate)) {
                            continue; // already visited
                        }
                        if (candidate.equals(endWord)) {
                            return wordsInSequence + 1;
                        }
                        queue.add(candidate);
                    }
                }
            }
            wordsInSequence++;
        }
        return 0;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = fs.next();
        }
        String beginWord = fs.next();
        String endWord = fs.next();

        System.out.println(ladderLength(words, beginWord, endWord));
    }
}
