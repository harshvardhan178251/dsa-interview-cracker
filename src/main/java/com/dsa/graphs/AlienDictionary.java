package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Alien Dictionary
 * LeetCode: 269 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Topological sort, precedence graph
 *
 * <p>Problem: We are given a list of {@code n} words and {@code n-1} ordering constraints.
 * A pair {@code (u, v)} means "word u must come before word v in the alien alphabet". The
 * dictionary is valid when
 * <ol>
 *   <li>the constraints are consistent — the precedence graph has no cycle, and</li>
 *   <li>every constrained pair is also lexically ordered: the first differing character of
 *       {@code words[u]} must be smaller than the first differing character of
 *       {@code words[v]} (a strict prefix must come first).</li>
 * </ol>
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * word2
 * ...
 * wordn
 * u1 v1        (n-1 pairs: word u must come before word v)
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * abc
 * bcd
 * cde
 * 0 1
 * 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: build the precedence graph from the pairs, then run Kahn's algorithm to detect a
 * cycle. The lexical rule is checked pair by pair.
 *
 * <p>Complexity: Time O(n + m + L) where L is the total number of characters, Space O(n + m).
 */
public class AlienDictionary {

    /**
     * Decides whether the given ordering constraints describe a valid alien dictionary.
     *
     * @param words the dictionary words
     * @param pairs pairs {@code {u, v}} meaning "word u comes before word v"
     * @return {@code true} when the dictionary is valid
     */
    public static boolean isValid(String[] words, int[][] pairs) {
        int n = words.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];

        for (int[] pair : pairs) {
            int u = pair[0];
            int v = pair[1];
            if (!lexicallyOrdered(words[u], words[v])) {
                return false; // the characters contradict the requested order
            }
            adj.get(u).add(v);
            inDegree[v]++;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                queue.add(v);
            }
        }
        int placed = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            placed++;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        return placed == n;
    }

    /**
     * True when {@code a} can legally precede {@code b}: the first differing character of
     * {@code a} is smaller, or {@code a} is a (possibly equal) prefix of {@code b}.
     */
    private static boolean lexicallyOrdered(String a, String b) {
        int common = Math.min(a.length(), b.length());
        for (int i = 0; i < common; i++) {
            if (a.charAt(i) != b.charAt(i)) {
                return a.charAt(i) < b.charAt(i);
            }
        }
        // No differing character: the shorter word has to come first.
        return a.length() <= b.length();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = fs.next();
        }

        int[][] pairs = new int[Math.max(0, n - 1)][2];
        for (int i = 0; i < pairs.length; i++) {
            pairs[i][0] = fs.nextInt();
            pairs[i][1] = fs.nextInt();
        }

        System.out.println(isValid(words, pairs));
    }
}
