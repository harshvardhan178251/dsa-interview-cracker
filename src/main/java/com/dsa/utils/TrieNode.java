package com.dsa.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * Trie node used across the trie problems.
 */
public class TrieNode {

    public Map<Character, TrieNode> children = new HashMap<>();
    public boolean isEndOfWord;

    public TrieNode() {
    }

    public TrieNode(char letter) {
        children.put(letter, new TrieNode());
    }

    public boolean hasChild(char c) {
        return children.containsKey(c);
    }

    public TrieNode child(char c) {
        return children.get(c);
    }

    public TrieNode getOrCreateChild(char c) {
        return children.computeIfAbsent(c, k -> new TrieNode());
    }
}
