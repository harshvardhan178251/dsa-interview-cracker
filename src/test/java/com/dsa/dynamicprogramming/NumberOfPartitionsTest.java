package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NumberOfPartitionsTest {

    @Test
    void classicExample() {
        assertEquals(7, NumberOfPartitions.countPartitions(5));
    }

    @Test
    void knownPartitionFunctionValues() {
        assertEquals(1, NumberOfPartitions.countPartitions(0));
        assertEquals(1, NumberOfPartitions.countPartitions(1));
        assertEquals(2, NumberOfPartitions.countPartitions(2));
        assertEquals(3, NumberOfPartitions.countPartitions(3));
        assertEquals(5, NumberOfPartitions.countPartitions(4));
    }

    @Test
    void tenHasFortyTwoPartitions() {
        assertEquals(42, NumberOfPartitions.countPartitions(10));
    }

    @Test
    void largerNumber() {
        assertEquals(176, NumberOfPartitions.countPartitions(15));
    }
}
