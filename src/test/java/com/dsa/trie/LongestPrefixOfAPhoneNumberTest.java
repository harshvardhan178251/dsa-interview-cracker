package com.dsa.trie;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LongestPrefixOfAPhoneNumberTest {

    @Test
    void findsTheLongestPrefixOfTheSample() {
        LongestPrefixOfAPhoneNumber.PhoneTrie trie = new LongestPrefixOfAPhoneNumber.PhoneTrie();
        trie.insert("1234567890");
        trie.insert("123");
        trie.insert("9876543210");
        assertEquals("12345", trie.longestPrefix("12345"));
        assertEquals("98765", trie.longestPrefix("98765"));
        assertEquals("123", trie.longestPrefix("123"));
    }

    @Test
    void returnsAnEmptyStringWhenNothingMatches() {
        LongestPrefixOfAPhoneNumber.PhoneTrie trie = new LongestPrefixOfAPhoneNumber.PhoneTrie();
        trie.insert("123");
        assertEquals("", trie.longestPrefix("555"));
    }

    @Test
    void handlesAnEmptyTrie() {
        LongestPrefixOfAPhoneNumber.PhoneTrie trie = new LongestPrefixOfAPhoneNumber.PhoneTrie();
        assertEquals("", trie.longestPrefix("123"));
    }

    @Test
    void returnsTheWholeQueryWhenItIsAPrefix() {
        LongestPrefixOfAPhoneNumber.PhoneTrie trie = new LongestPrefixOfAPhoneNumber.PhoneTrie();
        trie.insert("123456");
        assertEquals("123", trie.longestPrefix("123"));
    }

    @Test
    void doesNotStopAtACompleteNumber() {
        LongestPrefixOfAPhoneNumber.PhoneTrie trie = new LongestPrefixOfAPhoneNumber.PhoneTrie();
        trie.insert("123");
        trie.insert("1234567890");
        assertEquals("12345", trie.longestPrefix("12345"));
    }

    @Test
    void handlesAnEmptyQuery() {
        LongestPrefixOfAPhoneNumber.PhoneTrie trie = new LongestPrefixOfAPhoneNumber.PhoneTrie();
        trie.insert("123");
        assertEquals("", trie.longestPrefix(""));
    }
}
