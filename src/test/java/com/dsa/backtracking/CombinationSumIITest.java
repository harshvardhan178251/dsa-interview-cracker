package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CombinationSumIITest {

    @Test
    void classicExample() {
        List<List<Integer>> result = CombinationSumII.combinationSum2(new int[]{10, 1, 2, 7, 6, 1, 5}, 8);
        assertEquals(4, result.size());
        assertEquals(java.util.Arrays.asList(1, 1, 6), result.get(0));
        assertEquals(java.util.Arrays.asList(1, 2, 5), result.get(1));
        assertEquals(java.util.Arrays.asList(1, 7), result.get(2));
        assertEquals(java.util.Arrays.asList(2, 6), result.get(3));
    }

    @Test
    void eachCandidateIsUsedAtMostOnce() {
        List<List<Integer>> result = CombinationSumII.combinationSum2(new int[]{2}, 4);
        assertEquals(0, result.size());
    }

    @Test
    void duplicatesDoNotProduceDuplicateCombinations() {
        assertEquals(1, CombinationSumII.combinationSum2(new int[]{1, 1, 1}, 2).size());
    }

    @Test
    void noCombinationExists() {
        assertEquals(0, CombinationSumII.combinationSum2(new int[]{2, 3}, 7).size());
    }

    @Test
    void singleMatch() {
        assertEquals(1, CombinationSumII.combinationSum2(new int[]{8}, 8).size());
    }
}
