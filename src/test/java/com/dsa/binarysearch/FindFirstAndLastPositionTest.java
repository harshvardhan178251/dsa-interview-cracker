package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class FindFirstAndLastPositionTest {

    @Test
    void findsTheWholeRunOfEqualValues() {
        assertArrayEquals(new int[]{3, 4},
                FindFirstAndLastPosition.searchRange(new int[]{5, 7, 7, 8, 8, 10}, 8));
    }

    @Test
    void findsASingleOccurrence() {
        assertArrayEquals(new int[]{0, 0},
                FindFirstAndLastPosition.searchRange(new int[]{5, 7, 7, 8, 8, 10}, 5));
    }

    @Test
    void returnsSentinelWhenTheTargetIsAbsent() {
        assertArrayEquals(new int[]{-1, -1},
                FindFirstAndLastPosition.searchRange(new int[]{5, 7, 7, 8, 8, 10}, 6));
        assertArrayEquals(new int[]{-1, -1},
                FindFirstAndLastPosition.searchRange(new int[]{5, 7, 7, 8, 8, 10}, 11));
        assertArrayEquals(new int[]{-1, -1},
                FindFirstAndLastPosition.searchRange(new int[]{5, 7, 7, 8, 8, 10}, 0));
    }

    @Test
    void handlesAnEmptyArray() {
        assertArrayEquals(new int[]{-1, -1}, FindFirstAndLastPosition.searchRange(new int[]{}, 3));
    }

    @Test
    void handlesASingleElementArray() {
        assertArrayEquals(new int[]{0, 0}, FindFirstAndLastPosition.searchRange(new int[]{4}, 4));
        assertArrayEquals(new int[]{-1, -1}, FindFirstAndLastPosition.searchRange(new int[]{4}, 5));
    }

    @Test
    void handlesAnArrayOfOnlyEqualValues() {
        assertArrayEquals(new int[]{0, 4},
                FindFirstAndLastPosition.searchRange(new int[]{7, 7, 7, 7, 7}, 7));
    }

    @Test
    void handlesTheMaximumIntegerTarget() {
        assertArrayEquals(new int[]{-1, -1},
                FindFirstAndLastPosition.searchRange(new int[]{1, 2, 3}, Integer.MAX_VALUE));
    }
}
