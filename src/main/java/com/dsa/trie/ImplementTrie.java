package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;

/**
 * Problem: Implement Trie (prefix tree)
 * LeetCode: 208 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Trie, Prefix tree
 *
 * <p>Problem: Implement a prefix tree with three operations:
 * <ul>
 *   <li>{@code insert(word)} — add a word,</li>
 *   <li>{@code search(word)} — is the word present,</li>
 *   <li>{@code startsWith(prefix)} — does any word start with the prefix.</li>
 * </ul>
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
 * The first {@code n} words are inserted before the operations run. Each operation is
 * {@code insert &lt;word&gt;}, {@code search &lt;word&gt;} or {@code startsWith &lt;prefix&gt;}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * apple
 * app
 * application
 * 4
 * search app
 * startsWith appl
 * insert banana
 * search banan
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * true
 * ok
 * false
 * </pre>
 * One line per operation: {@code ok} for a successful insert, {@code true}/{@code false}
 * for the two queries.
 *
 * <p>Approach: every node of the trie stores a map from a letter to the child node that
 * continues that letter, plus a flag saying whether a word ends there. Inserting walks
 * the characters of the word and creates the missing nodes; searching walks the same
 * way but stops at the first missing child, and it only succeeds if the last node is
 * flagged as the end of a word.
 *
 * <p>Complexity: Time O(L) per operation, where L is the length of the word. Space
 * O(total characters inserted).
 */
public class ImplementTrie {

    /** The prefix tree itself. */
    public static class Trie {

        private final TrieNode root = new TrieNode();

        /** Inserts a word into the trie. */
        public void insert(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns {@code true} when the exact word was inserted. */
        public boolean search(String word) {
            TrieNode node = walk(word);
            return node != null && node.isEndOfWord;
        }

        /** Returns {@code true} when some inserted word starts with the prefix. */
        public boolean startsWith(String prefix) {
            return walk(prefix) != null;
        }

        /** Follows the characters of {@code text}, or returns {@code null}. */
        private TrieNode walk(String text) {
            TrieNode node = root;
            for (int i = 0; i < text.length(); i++) {
                if (!node.hasChild(text.charAt(i))) {
                    return null;
                }
                node = node.child(text.charAt(i));
            }
            return node;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        Trie trie = new Trie();

        int n = fs.nextInt();
        for (int i = 0; i < n; i++) {
            trie.insert(fs.next());
        }

        int m = fs.nextInt();
        for (int i = 0; i < m; i++) {
            String operation = fs.next();
            String argument = fs.next();
            switch (operation) {
                case "insert":
                    trie.insert(argument);
                    System.out.println("ok");
                    break;
                case "search":
                    System.out.println(trie.search(argument));
                    break;
                case "startsWith":
                    System.out.println(trie.startsWith(argument));
                    break;
                default:
                    throw new IllegalArgumentException("unknown operation: " + operation);
            }
        }
    }
}
