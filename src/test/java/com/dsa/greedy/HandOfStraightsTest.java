package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class HandOfStraightsTest {

    @Test
    void groupsCanBeFormed() {
        assertTrue(HandOfStraights.isStraightHand(new int[]{1, 2, 3, 6, 2, 3, 4, 7, 8}, 3));
    }

    @Test
    void aSingleCardIsAlwaysItsOwnGroup() {
        assertTrue(HandOfStraights.isStraightHand(new int[]{5}, 1));
    }

    @Test
    void theCardCountMustBeDivisibleByTheGroupSize() {
        assertFalse(HandOfStraights.isStraightHand(new int[]{1, 2, 3, 4, 5, 6, 7}, 3));
    }

    @Test
    void aMissingValueBreaksTheChain() {
        assertFalse(HandOfStraights.isStraightHand(new int[]{1, 2, 3, 4, 6, 7}, 3));
    }

    @Test
    void duplicateValuesNeedDuplicateNeighbours() {
        assertTrue(HandOfStraights.isStraightHand(new int[]{1, 1, 2, 2, 3, 3}, 3));
    }

    @Test
    void anEmptyHandIsTriviallyValid() {
        assertTrue(HandOfStraights.isStraightHand(new int[]{}, 3));
    }
}
