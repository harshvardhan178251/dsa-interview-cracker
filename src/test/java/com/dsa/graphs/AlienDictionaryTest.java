package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AlienDictionaryTest {

    @Test
    void anIncreasingChainIsValid() {
        assertTrue(AlienDictionary.isValid(new String[]{"abc", "bcd", "cde"},
                new int[][]{{0, 1}, {1, 2}}));
    }

    @Test
    void lettersThatGoBackwardsAreInvalid() {
        assertFalse(AlienDictionary.isValid(new String[]{"abc", "bcd", "abd"},
                new int[][]{{0, 1}, {1, 2}}));
    }

    @Test
    void aCycleInTheConstraintsIsInvalid() {
        assertFalse(AlienDictionary.isValid(new String[]{"abc", "bcd", "cde"},
                new int[][]{{0, 1}, {1, 2}, {2, 0}}));
    }

    @Test
    void aPrefixMustComeFirst() {
        assertTrue(AlienDictionary.isValid(new String[]{"ab", "abc"},
                new int[][]{{0, 1}}));
    }

    @Test
    void aLongerWordCannotComeBeforeItsPrefix() {
        assertFalse(AlienDictionary.isValid(new String[]{"abc", "ab"},
                new int[][]{{0, 1}}));
    }

    @Test
    void identicalWordsAreFine() {
        assertTrue(AlienDictionary.isValid(new String[]{"aa", "aa"},
                new int[][]{{0, 1}}));
    }

    @Test
    void aSingleWordWithNoConstraintsIsValid() {
        assertTrue(AlienDictionary.isValid(new String[]{"abc"}, new int[0][2]));
    }

    @Test
    void onlyTheFirstDifferingCharacterMatters() {
        // "ba" vs "ab": the first difference is b > a, so the constraint is broken.
        assertFalse(AlienDictionary.isValid(new String[]{"ba", "ab"},
                new int[][]{{0, 1}}));
    }
}
