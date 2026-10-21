package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;

/**
 * Problem: Longest Prefix of a Phone Number
 * LeetCode: 17 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Trie, Prefix walk
 *
 * <p>Problem: A phone company stores its numbers in a trie. For every query, report the
 * longest prefix of the query that is also the beginning of one of the stored numbers.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * number1
 * ...
 * numbern
 * m
 * query1
 * ...
 * querym
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1234567890
 * 123
 * 9876543210
 * 3
 * 12345
 * 98765
 * 123
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 12345
 * 98765
 * 123
 * </pre>
 * One line per query: the longest prefix that matches a stored number. The line is
 * empty when no prefix of the query matches.
 *
 * <p>Approach: insert every phone number into a trie. A query is answered by walking
 * down the trie as long as the next character exists; the last character that could be
 * followed is the longest matching prefix.
 *
 * <p>Complexity: Time O(total length of the numbers) to build the trie and O(L) per
 * query. Space O(total length of the numbers).
 */
public class LongestPrefixOfAPhoneNumber {

    /** The prefix tree holding the phone numbers. */
    public static class PhoneTrie {

        private final TrieNode root = new TrieNode();

        /** Inserts a phone number. */
        public void insert(String number) {
            TrieNode node = root;
            for (int i = 0; i < number.length(); i++) {
                node = node.getOrCreateChild(number.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns the longest prefix of {@code query} that starts a stored number. */
        public String longestPrefix(String query) {
            TrieNode node = root;
            StringBuilder best = new StringBuilder();
            for (int i = 0; i < query.length(); i++) {
                char c = query.charAt(i);
                if (!node.hasChild(c)) {
                    break; // no stored number continues with this digit
                }
                node = node.child(c);
                best.append(c);
            }
            return best.toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        PhoneTrie trie = new PhoneTrie();

        int n = fs.nextInt();
        for (int i = 0; i < n; i++) {
            trie.insert(fs.next());
        }

        int m = fs.nextInt();
        for (int i = 0; i < m; i++) {
            System.out.println(trie.longestPrefix(fs.next()));
        }
    }
}
