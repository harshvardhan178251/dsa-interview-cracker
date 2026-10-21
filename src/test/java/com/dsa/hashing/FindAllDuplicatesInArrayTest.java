package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

class FindAllDuplicatesInArrayTest {

    @Test
    void findsTheClassicExample() {
        assertEquals(List.of(2, 4), FindAllDuplicatesInArray.findAllDuplicates(new int[]{4, 2, 4, 1, 2}));
    }

    @Test
    void returnsAnEmptyListWhenThereAreNoDuplicates() {
        assertEquals(List.of(), FindAllDuplicatesInArray.findAllDuplicates(new int[]{1, 2, 3}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(List.of(), FindAllDuplicatesInArray.findAllDuplicates(new int[]{}));
    }

    @Test
    void reportsAValueOnlyOnceEvenWhenItAppearsThreeTimes() {
        assertEquals(List.of(2), FindAllDuplicatesInArray.findAllDuplicates(new int[]{2, 2, 2}));
    }

    @Test
    void returnsTheDuplicatesInAscendingOrder() {
        assertEquals(List.of(1, 3, 4), FindAllDuplicatesInArray.findAllDuplicates(
                new int[]{4, 3, 1, 4, 3, 1}));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(List.of(), FindAllDuplicatesInArray.findAllDuplicates(new int[]{1}));
    }
}
