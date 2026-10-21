package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PalindromePartitioningTest {

    @Test
    void classicExample() {
        List<List<String>> result = PalindromePartitioning.partition("aab");
        assertEquals(2, result.size());
        assertEquals(java.util.Arrays.asList("a", "a", "b"), result.get(0));
        assertEquals(java.util.Arrays.asList("aa", "b"), result.get(1));
    }

    @Test
    void singleCharacter() {
        assertEquals(1, PalindromePartitioning.partition("a").size());
    }

    @Test
    void everyLetterIsAPalindromeSoThereIsAlwaysAPartition() {
        assertEquals(1, PalindromePartitioning.partition("ab").size());
    }

    @Test
    void everyLetterItsOwnPart() {
        List<List<String>> result = PalindromePartitioning.partition("abc");
        assertEquals(1, result.size());
        assertEquals(3, result.get(0).size());
    }

    @Test
    void fourPartitionsForAabb() {
        assertEquals(4, PalindromePartitioning.partition("aabb").size());
    }
}
