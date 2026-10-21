package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ContainsDuplicateTest {

    @Test
    void findsTheDuplicate() {
        assertTrue(ContainsDuplicate.containsDuplicate(new int[]{1, 2, 3, 1}));
    }

    @Test
    void reportsNoDuplicate() {
        assertFalse(ContainsDuplicate.containsDuplicate(new int[]{1, 2, 3, 4}));
    }

    @Test
    void handlesEmptyAndSingleElementArrays() {
        assertFalse(ContainsDuplicate.containsDuplicate(new int[]{}));
        assertFalse(ContainsDuplicate.containsDuplicate(new int[]{1}));
    }

    @Test
    void findsDuplicatesThatAreFarApart() {
        assertTrue(ContainsDuplicate.containsDuplicate(new int[]{1, 2, 3, 4, 1}));
    }

    @Test
    void handlesNegativeValues() {
        assertTrue(ContainsDuplicate.containsDuplicate(new int[]{-1, 2, -1}));
        assertFalse(ContainsDuplicate.containsDuplicate(new int[]{-1, 2, 3}));
    }

    @Test
    void findsThreeEqualValues() {
        assertTrue(ContainsDuplicate.containsDuplicate(new int[]{7, 7, 7}));
    }
}
