package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CombinationSumTest {

    @Test
    void classicExample() {
        List<List<Integer>> result = CombinationSum.combinationSum(new int[]{2, 3, 6, 7}, 7);
        assertEquals(2, result.size());
        assertEquals(java.util.Arrays.asList(2, 2, 3), result.get(0));
        assertEquals(java.util.Arrays.asList(7), result.get(1));
    }

    @Test
    void candidatesMayRepeat() {
        List<List<Integer>> result = CombinationSum.combinationSum(new int[]{2}, 4);
        assertEquals(1, result.size());
        assertEquals(java.util.Arrays.asList(2, 2), result.get(0));
    }

    @Test
    void noCombinationExists() {
        assertEquals(0, CombinationSum.combinationSum(new int[]{3}, 5).size());
    }

    @Test
    void singleCandidateMatchesTheTarget() {
        assertEquals(1, CombinationSum.combinationSum(new int[]{7}, 7).size());
    }

    @Test
    void orderOfTheInputDoesNotMatter() {
        List<List<Integer>> result = CombinationSum.combinationSum(new int[]{7, 3, 2, 6}, 7);
        assertEquals(java.util.Arrays.asList(2, 2, 3), result.get(0));
    }
}
