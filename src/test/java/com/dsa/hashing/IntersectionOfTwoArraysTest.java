package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

class IntersectionOfTwoArraysTest {

    @Test
    void findsTheClassicExample() {
        assertEquals(List.of(4, 9), IntersectionOfTwoArrays.intersection(
                new int[]{4, 9, 5}, new int[]{9, 4, 9, 8, 4}));
    }

    @Test
    void returnsAnEmptyListWhenThereIsNoOverlap() {
        assertEquals(List.of(), IntersectionOfTwoArrays.intersection(new int[]{1, 2}, new int[]{3, 4}));
    }

    @Test
    void reportsEveryCommonValueOnlyOnce() {
        assertEquals(List.of(1), IntersectionOfTwoArrays.intersection(
                new int[]{1, 1, 1}, new int[]{1, 1}));
    }

    @Test
    void handlesEmptyArrays() {
        assertEquals(List.of(), IntersectionOfTwoArrays.intersection(new int[]{}, new int[]{1, 2}));
        assertEquals(List.of(), IntersectionOfTwoArrays.intersection(new int[]{1, 2}, new int[]{}));
    }

    @Test
    void returnsTheValuesInAscendingOrder() {
        assertEquals(List.of(1, 2, 3), IntersectionOfTwoArrays.intersection(
                new int[]{3, 2, 1}, new int[]{1, 2, 3}));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(List.of(-2, 0), IntersectionOfTwoArrays.intersection(
                new int[]{-2, 0, 5}, new int[]{0, -2, 7}));
    }
}
