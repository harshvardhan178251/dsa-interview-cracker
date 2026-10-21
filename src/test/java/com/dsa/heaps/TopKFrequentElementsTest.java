package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class TopKFrequentElementsTest {

    @Test
    void reportsTheMostFrequentElements() {
        assertArrayEquals(new int[]{1, 2},
                TopKFrequentElements.topKFrequentElements(new int[]{1, 1, 1, 2, 2, 3}, 2));
    }

    @Test
    void kEqualToOneReportsTheSingleMostFrequent() {
        assertArrayEquals(new int[]{2},
                TopKFrequentElements.topKFrequentElements(new int[]{1, 1, 2, 2, 2, 3}, 1));
    }

    @Test
    void allDistinctValuesAreReportedInValueOrder() {
        assertArrayEquals(new int[]{1, 2, 3},
                TopKFrequentElements.topKFrequentElements(new int[]{3, 1, 2}, 3));
    }

    @Test
    void everyValueHasTheSameFrequency() {
        assertArrayEquals(new int[]{1, 2, 3},
                TopKFrequentElements.topKFrequentElements(new int[]{3, 2, 1}, 3));
    }

    @Test
    void singleValueArray() {
        assertArrayEquals(new int[]{7}, TopKFrequentElements.topKFrequentElements(new int[]{7, 7}, 1));
    }

    @Test
    void negativeValuesAreSupported() {
        assertArrayEquals(new int[]{-2, -1},
                TopKFrequentElements.topKFrequentElements(new int[]{-1, -1, -2, -2, -3}, 2));
    }

    @Test
    void emptyInputProducesNoElements() {
        assertArrayEquals(new int[0], TopKFrequentElements.topKFrequentElements(new int[0], 3));
    }
}
