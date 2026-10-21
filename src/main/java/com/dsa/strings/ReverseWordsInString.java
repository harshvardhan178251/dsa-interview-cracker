package com.dsa.strings;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Reverse Words in a String
 * LeetCode: 151 | Difficulty: Medium | Frequency: 3/5
 * Pattern: String splitting, Two pointers
 *
 * <p>Problem: Given a sentence, return the sentence with the order of its
 * <b>words</b> reversed. Any number of spaces between the words must be collapsed to
 * a single space and the result must not have leading or trailing spaces.
 *
 * <p>Input format (stdin):
 * <pre>
 * sentence
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * the sky is blue
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * blue is sky the
 * </pre>
 *
 * <p>Approach: trim the sentence, split it on runs of whitespace and then append the
 * words back in reverse order, separated by a single space.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ReverseWordsInString {

    /**
     * Reverses the order of the words in {@code s}.
     *
     * @param s the sentence
     * @return the sentence with its words reversed and single-space separated
     */
    public static String reverseWords(String s) {
        String trimmed = s.trim();
        if (trimmed.isEmpty()) {
            return "";
        }

        String[] words = trimmed.split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(words[i]);
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        // The sentence contains spaces, so the whole line has to be read at once.
        BufferedReader reader =
                new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
        String line = reader.readLine();

        System.out.println(reverseWords(line == null ? "" : line));
    }
}
