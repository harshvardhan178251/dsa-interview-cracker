package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: Reorganize String
 * LeetCode: 358 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy scheduling, Max-heap with cooldown
 *
 * <p>Problem:
 * Rearrange the characters of a string so that no two equal characters are adjacent.
 * Return the rearranged string, or the empty string when no arrangement exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * s
 * </pre>
 * {@code n} is the length of the string and {@code s} is the string itself (lowercase
 * English letters only, no whitespace inside).
 *
 * <p>Sample input:
 * <pre>
 * 3
 * aab
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * aba
 * </pre>
 *
 * <p>Approach: a max-heap holds the remaining count of every letter. The letter with the
 * most occurrences left is always the safest to place, because it needs the most room.
 * The letter placed in the previous slot is <em>blocked</em>: it only re-enters the heap
 * after a different letter has been placed, so equal letters can never become adjacent.
 *
 * <p>Complexity: Time O(n log m) with m distinct letters, Space O(m).
 */
public class ReorganizeString {

    /** A letter with its remaining number of occurrences. */
    public static class Letter {
        public final char ch;
        public int remaining;

        public Letter(char ch, int remaining) {
            this.ch = ch;
            this.remaining = remaining;
        }

        @Override
        public String toString() {
            return ch + "x" + remaining;
        }
    }

    /**
     * Rearranges {@code s} so that no two equal characters are adjacent.
     *
     * @param s the input string, lowercase English letters
     * @return the rearranged string, or an empty string when it is impossible
     */
    public static String reorganizeString(String s) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }

        int maxCount = 0;
        for (int count : counts) {
            maxCount = Math.max(maxCount, count);
        }
        if (maxCount > (s.length() + 1) / 2) {
            return "";
        }

        MaxHeap<Letter> heap = new MaxHeap<Letter>((a, b) -> Integer.compare(a.remaining, b.remaining));
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) {
                heap.add(new Letter((char) ('a' + i), counts[i]));
            }
        }

        // The letter placed in the previous slot: it may only be used again after a
        // different letter has been placed in between.
        Letter blocked = null;
        StringBuilder result = new StringBuilder(s.length());

        while (true) {
            if (heap.isEmpty()) {
                if (blocked == null || blocked.remaining == 0) {
                    break;
                }
                // Only the blocked letter is left and it cannot follow itself.
                return "";
            }
            Letter current = heap.poll();

            result.append(current.ch);
            current.remaining--;

            // The slot is filled, so the previously blocked letter becomes usable again.
            if (blocked != null) {
                heap.add(blocked);
                blocked = null;
            }
            if (current.remaining > 0) {
                blocked = current;
            }
        }
        return result.length() == s.length() ? result.toString() : "";
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String s = fs.next();

        System.out.println(reorganizeString(s));
    }
}
