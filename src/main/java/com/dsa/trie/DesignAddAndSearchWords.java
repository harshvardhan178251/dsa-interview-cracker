package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;

/**
 * Problem: Design Add and Search Words
 * LeetCode: 211 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Trie, Backtracking with wildcards
 *
 * <p>Problem: Implement a word search that supports the character {@code '.'}, which
 * matches any single letter. Words can be added between searches.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * ...
 * wordn
 * m
 * op1
 * ...
 * opm
 * </pre>
 * The first {@code n} words are added before the operations run. Each operation is
 * {@code add &lt;word&gt;} or {@code search &lt;word&gt;} (where {@code word} may contain
 * {@code .}).
 *
 * <p>Sample input:
 * <pre>
 * 2
 * bad
 * dad
 * 3
 * search b.d
 * add bad
 * search b.d
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * ok
 * true
 * </pre>
 * One line per operation: {@code ok} for a successful add, {@code true}/{@code false}
 * for a search.
 *
 * <p>Approach: the words live in a trie. A search walks the trie; when it meets a
 * {@code .} it tries every child of the current node recursively. The search is only
 * accepted when the final node is flagged as the end of a word.
 *
 * <p>Complexity: Time O(L) for a search without wildcards, O(26^L) in the worst case
 * when every position is a wildcard. Space O(total characters added).
 */
public class DesignAddAndSearchWords {

    /** The prefix tree with wildcard-aware searching. */
    public static class WordDictionary {

        private final TrieNode root = new TrieNode();

        /** Adds a word to the dictionary. */
        public void addWord(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns {@code true} when some word matches the pattern. */
        public boolean search(String word) {
            return search(root, word, 0);
        }

        /** Recursive helper: matches {@code word} from position {@code index} onwards. */
        private boolean search(TrieNode node, String word, int index) {
            if (node == null) {
                return false;
            }
            if (index == word.length()) {
                return node.isEndOfWord;
            }
            char c = word.charAt(index);
            if (c != '.') {
                if (!node.hasChild(c)) {
                    return false;
                }
                return search(node.child(c), word, index + 1);
            }
            for (TrieNode child : node.children.values()) {
                if (search(child, word, index + 1)) {
                    return true;
                }
            }
            return false;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        WordDictionary dictionary = new WordDictionary();

        int n = fs.nextInt();
        for (int i = 0; i < n; i++) {
            dictionary.addWord(fs.next());
        }

        int m = fs.nextInt();
        for (int i = 0; i < m; i++) {
            String operation = fs.next();
            String argument = fs.next();
            switch (operation) {
                case "add":
                    dictionary.addWord(argument);
                    System.out.println("ok");
                    break;
                case "search":
                    System.out.println(dictionary.search(argument));
                    break;
                default:
                    throw new IllegalArgumentException("unknown operation: " + operation);
            }
        }
    }
}
