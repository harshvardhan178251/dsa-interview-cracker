package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;

/**
 * Problem: Trie with Prefix Counting
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Trie, Augmented node state
 *
 * <p>Problem: Build a prefix tree that also answers "how many inserted words start with
 * this prefix?". Words may be inserted more than once — every insertion counts.
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
 * {@code insert &lt;word&gt;} or {@code count &lt;prefix&gt;}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * apple
 * app
 * banana
 * 3
 * count app
 * insert applet
 * count app
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * ok
 * 3
 * </pre>
 * One line per operation: {@code ok} for an insert, the number of matching words for a
 * count.
 *
 * <p>Approach: every trie node keeps a counter of the words that pass through it. When
 * a word is inserted the counter of every node on its path is increased, so the counter
 * of the node reached by a prefix is exactly the number of inserted words with that
 * prefix.
 *
 * <p>Complexity: Time O(L) per operation, Space O(total characters inserted).
 */
public class PrefixCount {

    /** A trie node that counts the words passing through it. */
    public static class CountingNode extends TrieNode {

        /** Number of inserted words whose path contains this node. */
        public int count;

        /** Creates the child for {@code c}, keeping the {@link CountingNode} type. */
        @Override
        public CountingNode getOrCreateChild(char c) {
            CountingNode child = (CountingNode) children.get(c);
            if (child == null) {
                child = new CountingNode();
                children.put(c, child);
            }
            return child;
        }
    }

    /** The counting prefix tree. */
    public static class CountingTrie {

        private final CountingNode root = new CountingNode();

        /** Inserts a word and counts it. */
        public void insert(String word) {
            CountingNode node = root;
            node.count++;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
                node.count++;
            }
        }

        /** Returns the number of inserted words that start with {@code prefix}. */
        public int countPrefix(String prefix) {
            CountingNode node = root;
            for (int i = 0; i < prefix.length(); i++) {
                if (!node.hasChild(prefix.charAt(i))) {
                    return 0;
                }
                node = (CountingNode) node.child(prefix.charAt(i));
            }
            return node.count;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        CountingTrie trie = new CountingTrie();

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
                case "count":
                    System.out.println(trie.countPrefix(argument));
                    break;
                default:
                    throw new IllegalArgumentException("unknown operation: " + operation);
            }
        }
    }
}
