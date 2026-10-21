package com.dsa.prefixsum;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PairsWithTargetSumTest {

    @Test
    void countsTheSamplePairs() {
        assertEquals(2, PairsWithTargetSum.countPairs(new int[]{1, 2, 3, 4}, 5));
    }

    @Test
    void countsEveryIndexPairWithDuplicates() {
        assertEquals(4, PairsWithTargetSum.countPairs(new int[]{1, 1, 2, 2}, 3));
    }

    @Test
    void returnsZeroWhenThereIsNoPair() {
        assertEquals(0, PairsWithTargetSum.countPairs(new int[]{1, 2, 3, 4}, 100));
    }

    @Test
    void doesNotPairAnElementWithItself() {
        assertEquals(1, PairsWithTargetSum.countPairs(new int[]{3, 3}, 6));
    }

    @Test
    void handlesNegativeValues() {
        // only (-3, 1) sums to -2
        assertEquals(1, PairsWithTargetSum.countPairs(new int[]{-3, 1, -1, 2}, -2));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(0, PairsWithTargetSum.countPairs(new int[]{5}, 10));
    }
}
