package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Word Search II
 * LeetCode: 212 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Trie + backtracking, Grid search
 *
 * <p>Problem: Given a board of characters and a list of words, return every word of the
 * list that can be spelled by moving left, right, up or down through the board without
 * reusing a cell.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * c0 c1 ... c(rows*cols-1)
 * n
 * word1
 * ...
 * wordn
 * </pre>
 * The characters are the cells of the board in row-major order.
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 4
 * o a a n e t a e i h k r i f l v
 * 4
 * oath
 * pea
 * eat
 * rain
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * eat
 * oath
 * </pre>
 * The words that were found, sorted alphabetically.
 *
 * <p>Approach: put the dictionary into a trie and start a depth-first search from every
 * cell of the board. The search only follows trie edges, so it never explores a branch
 * that cannot lead to a word. As soon as a word is found it is removed from the trie,
 * which both avoids duplicates and prunes the remaining search.
 *
 * <p>Complexity: Time O(rows * cols * L) where L is the longest word. Space O(total
 * characters of the dictionary).
 */
public class WordSearchII {

    /** The prefix tree holding the dictionary. */
    public static class Trie {

        private final TrieNode root = new TrieNode();

        /** Adds a word to the trie. */
        public void insert(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns the node reached by the word, or {@code null}. */
        public TrieNode find(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                if (!node.hasChild(word.charAt(i))) {
                    return null;
                }
                node = node.child(word.charAt(i));
            }
            return node;
        }
    }

    /**
     * Returns the words of the dictionary that occur in the board.
     *
     * @param board the grid of characters
     * @param words the dictionary
     * @return the matching words, sorted alphabetically
     */
    public static List<String> findWords(char[][] board, List<String> words) {
        List<String> found = new ArrayList<>();
        if (board == null || board.length == 0 || words == null || words.isEmpty()) {
            return found;
        }
        Trie trie = new Trie();
        for (String word : words) {
            trie.insert(word);
        }

        int rows = board.length;
        int cols = board[0].length;
        boolean[][] used = new boolean[rows][cols];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                search(board, used, trie.root, new StringBuilder(), r, c, found);
            }
        }
        Collections.sort(found);
        return found;
    }

    /** Depth-first search that follows the trie from a cell. */
    private static void search(char[][] board, boolean[][] used, TrieNode node,
                               StringBuilder path, int r, int c, List<String> found) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || used[r][c]) {
            return;
        }
        char letter = board[r][c];
        if (!node.hasChild(letter)) {
            return; // no word can continue with this letter
        }
        TrieNode next = node.child(letter);
        used[r][c] = true;
        path.append(letter);

        if (next.isEndOfWord) {
            found.add(path.toString());
            next.isEndOfWord = false; // report every word only once
        }

        search(board, used, next, path, r + 1, c, found);
        search(board, used, next, path, r - 1, c, found);
        search(board, used, next, path, r, c + 1, found);
        search(board, used, next, path, r, c - 1, found);

        path.setLength(path.length() - 1); // backtrack
        used[r][c] = false; // backtrack
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();

        char[][] board = new char[rows][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                board[r][c] = fs.next().charAt(0);
            }
        }

        int n = fs.nextInt();
        List<String> words = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            words.add(fs.next());
        }

        for (String word : findWords(board, words)) {
            System.out.println(word);
        }
    }
}
