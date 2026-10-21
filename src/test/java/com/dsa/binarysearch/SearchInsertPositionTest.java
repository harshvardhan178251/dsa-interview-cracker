package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SearchInsertPositionTest {

    @Test
    void insertsBetweenTwoNeighbours() {
        assertEquals(4, SearchInsertPosition.searchInsert(new int[]{1, 3, 5, 6, 8, 9}, 7));
    }

    @Test
    void returnsTheExistingPositionOfAnExactMatch() {
        assertEquals(2, SearchInsertPosition.searchInsert(new int[]{1, 3, 5, 6, 8, 9}, 5));
    }

    @Test
    void insertsAtTheFront() {
        assertEquals(0, SearchInsertPosition.searchInsert(new int[]{1, 3, 5}, 0));
    }

    @Test
    void insertsAtTheEnd() {
        assertEquals(3, SearchInsertPosition.searchInsert(new int[]{1, 3, 5}, 6));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(0, SearchInsertPosition.searchInsert(new int[]{5}, 1));
        assertEquals(0, SearchInsertPosition.searchInsert(new int[]{5}, 5));
        assertEquals(1, SearchInsertPosition.searchInsert(new int[]{5}, 9));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, SearchInsertPosition.searchInsert(new int[]{}, 42));
    }

    @Test
    void handlesNegativeTargets() {
        assertEquals(0, SearchInsertPosition.searchInsert(new int[]{-5, -3, -1}, -10));
        assertEquals(3, SearchInsertPosition.searchInsert(new int[]{-5, -3, -1}, 0));
    }
}
