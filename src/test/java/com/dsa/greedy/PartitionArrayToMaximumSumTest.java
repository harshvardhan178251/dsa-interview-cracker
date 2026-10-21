package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PartitionArrayToMaximumSumTest {

    @Test
    void theTwoLargestValuesAreUsed() {
        assertEquals(9, PartitionArrayToMaximumSum.maxSumToLength(new int[]{1, 2, 3, 4, 5}, 2));
    }

    @Test
    void onePartTakesTheGlobalMaximum() {
        assertEquals(5, PartitionArrayToMaximumSum.maxSumToLength(new int[]{1, 2, 3, 4, 5}, 1));
    }

    @Test
    void onePartPerElementSumsEverythingUp() {
        assertEquals(15, PartitionArrayToMaximumSum.maxSumToLength(new int[]{1, 2, 3, 4, 5}, 5));
    }

    @Test
    void anEmptyArrayIsWorthNothing() {
        assertEquals(0, PartitionArrayToMaximumSum.maxSumToLength(new int[]{}, 2));
    }

    @Test
    void aNonPositivePartCountIsWorthNothing() {
        assertEquals(0, PartitionArrayToMaximumSum.maxSumToLength(new int[]{1, 2}, 0));
    }

    @Test
    void duplicatesAreAllCounted() {
        assertEquals(6, PartitionArrayToMaximumSum.maxSumToLength(new int[]{2, 2, 2}, 3));
    }
}
