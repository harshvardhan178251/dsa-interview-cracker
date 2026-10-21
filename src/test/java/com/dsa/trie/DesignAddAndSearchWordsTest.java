package com.dsa.trie;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DesignAddAndSearchWordsTest {

    @Test
    void matchesAWildcard() {
        DesignAddAndSearchWords.WordDictionary dictionary = new DesignAddAndSearchWords.WordDictionary();
        dictionary.addWord("bad");
        dictionary.addWord("dad");
        assertTrue(dictionary.search("b.d"));
    }

    @Test
    void matchesSeveralWildcards() {
        DesignAddAndSearchWords.WordDictionary dictionary = new DesignAddAndSearchWords.WordDictionary();
        dictionary.addWord("bad");
        assertTrue(dictionary.search("b.."));
    }

    @Test
    void rejectsAWildcardThatMatchesNothing() {
        DesignAddAndSearchWords.WordDictionary dictionary = new DesignAddAndSearchWords.WordDictionary();
        dictionary.addWord("bad");
        assertFalse(dictionary.search("b.x"));
    }

    @Test
    void findsAWordAddedLater() {
        DesignAddAndSearchWords.WordDictionary dictionary = new DesignAddAndSearchWords.WordDictionary();
        assertFalse(dictionary.search("b.d"));
        dictionary.addWord("bad");
        assertTrue(dictionary.search("b.d"));
    }

    @Test
    void handlesAnEmptyDictionary() {
        DesignAddAndSearchWords.WordDictionary dictionary = new DesignAddAndSearchWords.WordDictionary();
        assertFalse(dictionary.search("a"));
        assertFalse(dictionary.search("."));
    }

    @Test
    void doesNotAcceptAPrefixAsAWord() {
        DesignAddAndSearchWords.WordDictionary dictionary = new DesignAddAndSearchWords.WordDictionary();
        dictionary.addWord("bad");
        assertFalse(dictionary.search("b."));
    }
}
