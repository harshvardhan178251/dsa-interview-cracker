package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ContainsDuplicateIITest {

    @Test
    void findsADuplicateExactlyKPositionsApart() {
        assertTrue(ContainsDuplicateII.containsNearbyDuplicate(new int[]{1, 2, 3, 1, 3}, 3));
    }

    @Test
    void findsADuplicateRightNextToEachOther() {
        assertTrue(ContainsDuplicateII.containsNearbyDuplicate(new int[]{1, 2, 1, 1}, 1));
    }

    @Test
    void returnsFalseWhenTheDuplicateIsTooFarAway() {
        // the two 3s are 2 apart and the two 1s are 3 apart
        assertFalse(ContainsDuplicateII.containsNearbyDuplicate(new int[]{1, 2, 3, 1, 3}, 1));
    }

    @Test
    void returnsFalseWhenThereIsNoDuplicateAtAll() {
        assertFalse(ContainsDuplicateII.containsNearbyDuplicate(new int[]{1, 2, 3, 4}, 3));
    }

    @Test
    void returnsFalseForAWindowOfZero() {
        assertFalse(ContainsDuplicateII.containsNearbyDuplicate(new int[]{1, 1, 1}, 0));
    }

    @Test
    void handlesAnEmptyArray() {
        assertFalse(ContainsDuplicateII.containsNearbyDuplicate(new int[]{}, 5));
    }
}
