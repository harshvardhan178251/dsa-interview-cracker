package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Word Pattern
 * LeetCode: 290 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Bijective mapping
 *
 * <p>Problem: Given a pattern of letters and a list of words, decide whether every
 * letter of the pattern maps to exactly one word — and every word to exactly one
 * letter.
 *
 * <p>Input format (stdin):
 * <pre>
 * pattern
 * n
 * word[0] word[1] ... word[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abba
 * 4
 * dog cat cat dog
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two maps — one from letter to word and one from word to letter. Both
 * directions are needed: the first forbids one letter from standing for two words,
 * the second forbids two letters from standing for the same word.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class WordPattern {

    /**
     * Returns {@code true} when the words follow the pattern.
     *
     * @param pattern the pattern of letters
     * @param words   the words, one per letter of the pattern
     * @return {@code true} when the mapping is a bijection
     */
    public static boolean wordPattern(String pattern, String[] words) {
        if (pattern.length() != words.length) {
            return false;
        }

        Map<Character, String> letterToWord = new HashMap<>();
        Map<String, Character> wordToLetter = new HashMap<>();

        for (int i = 0; i < pattern.length(); i++) {
            char letter = pattern.charAt(i);
            String word = words[i];

            String mapped = letterToWord.get(letter);
            if (mapped == null) {
                // A fresh letter may not steal a word that another letter already uses.
                if (wordToLetter.containsKey(word)) {
                    return false;
                }
                letterToWord.put(letter, word);
                wordToLetter.put(word, letter);
            } else if (!mapped.equals(word)) {
                return false; // the same letter must always stand for the same word
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String pattern = fs.next();
        int n = fs.nextInt();
        String[] words = fs.nextStringArray(n);

        System.out.println(wordPattern(pattern, words));
    }
}
