package com.dsa.prefixsum;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class RangeSumQueryTest {

    @Test
    void buildsThePrefixTable() {
        assertArrayEquals(new int[]{0, -2, -2, 1, -4, -2, -3, 2, 5},
                RangeSumQuery.buildPrefix(new int[]{-2, 0, 3, -5, 2, -1, 5, 3}));
    }

    @Test
    void answersTheSampleQueries() {
        int[] prefix = RangeSumQuery.buildPrefix(new int[]{-2, 0, 3, -5, 2, -1, 5, 3});
        assertEquals(1, RangeSumQuery.rangeSum(prefix, 0, 2));
        assertEquals(-1, RangeSumQuery.rangeSum(prefix, 2, 5));
        assertEquals(0, RangeSumQuery.rangeSum(prefix, 1, 4));
    }

    @Test
    void answersASingleElementRange() {
        int[] prefix = RangeSumQuery.buildPrefix(new int[]{1, 2, 3});
        assertEquals(2, RangeSumQuery.rangeSum(prefix, 1, 1));
    }

    @Test
    void answersTheWholeArray() {
        int[] prefix = RangeSumQuery.buildPrefix(new int[]{1, 2, 3});
        assertEquals(6, RangeSumQuery.rangeSum(prefix, 0, 2));
    }

    @Test
    void handlesAnEmptyArray() {
        int[] prefix = RangeSumQuery.buildPrefix(new int[]{});
        assertArrayEquals(new int[]{0}, prefix);
    }
}
