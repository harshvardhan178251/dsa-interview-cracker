package com.dsa.trie;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ImplementTrieTest {

    @Test
    void findsAnInsertedWord() {
        ImplementTrie.Trie trie = new ImplementTrie.Trie();
        trie.insert("apple");
        assertTrue(trie.search("apple"));
    }

    @Test
    void doesNotFindAPrefixAsAWord() {
        ImplementTrie.Trie trie = new ImplementTrie.Trie();
        trie.insert("apple");
        assertFalse(trie.search("app"));
    }

    @Test
    void recognisesAPrefix() {
        ImplementTrie.Trie trie = new ImplementTrie.Trie();
        trie.insert("apple");
        assertTrue(trie.startsWith("app"));
        assertTrue(trie.startsWith("apple"));
    }

    @Test
    void rejectsAnUnknownPrefix() {
        ImplementTrie.Trie trie = new ImplementTrie.Trie();
        trie.insert("apple");
        assertFalse(trie.startsWith("ban"));
    }

    @Test
    void handlesAnEmptyTrie() {
        ImplementTrie.Trie trie = new ImplementTrie.Trie();
        assertFalse(trie.search("a"));
        assertFalse(trie.startsWith("a"));
    }

    @Test
    void handlesAnEmptyWord() {
        ImplementTrie.Trie trie = new ImplementTrie.Trie();
        trie.insert("");
        assertTrue(trie.search(""));
        assertTrue(trie.startsWith(""));
    }

    @Test
    void handlesDuplicateInsertions() {
        ImplementTrie.Trie trie = new ImplementTrie.Trie();
        trie.insert("app");
        trie.insert("app");
        assertTrue(trie.search("app"));
    }
}
