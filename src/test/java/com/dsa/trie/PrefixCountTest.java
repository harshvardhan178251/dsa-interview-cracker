package com.dsa.trie;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PrefixCountTest {

    @Test
    void countsTheWordsUnderAPrefix() {
        PrefixCount.CountingTrie trie = new PrefixCount.CountingTrie();
        trie.insert("apple");
        trie.insert("app");
        trie.insert("banana");
        assertEquals(2, trie.countPrefix("app"));
    }

    @Test
    void countsTheNewWordAfterAnInsert() {
        PrefixCount.CountingTrie trie = new PrefixCount.CountingTrie();
        trie.insert("apple");
        trie.insert("app");
        trie.insert("banana");
        trie.insert("applet");
        assertEquals(3, trie.countPrefix("app"));
    }

    @Test
    void returnsZeroForAnUnknownPrefix() {
        PrefixCount.CountingTrie trie = new PrefixCount.CountingTrie();
        trie.insert("apple");
        assertEquals(0, trie.countPrefix("ban"));
    }

    @Test
    void countsEveryWordForTheEmptyPrefix() {
        PrefixCount.CountingTrie trie = new PrefixCount.CountingTrie();
        trie.insert("apple");
        trie.insert("app");
        assertEquals(2, trie.countPrefix(""));
    }

    @Test
    void countsDuplicateInsertions() {
        PrefixCount.CountingTrie trie = new PrefixCount.CountingTrie();
        trie.insert("app");
        trie.insert("app");
        assertEquals(2, trie.countPrefix("app"));
    }

    @Test
    void handlesAnEmptyTrie() {
        PrefixCount.CountingTrie trie = new PrefixCount.CountingTrie();
        assertEquals(0, trie.countPrefix("app"));
    }
}
