package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PermutationsTest {

    @Test
    void classicExample() {
        assertEquals(6, Permutations.permutations(new int[]{1, 2, 3}).size());
    }

    @Test
    void singleElement() {
        List<List<Integer>> result = Permutations.permutations(new int[]{1});
        assertEquals(1, result.size());
        assertEquals(java.util.Arrays.asList(1), result.get(0));
    }

    @Test
    void emptyInput() {
        assertEquals(1, Permutations.permutations(new int[]{}).size());
    }

    @Test
    void fourElementsGiveTwentyFourPermutations() {
        assertEquals(24, Permutations.permutations(new int[]{1, 2, 3, 4}).size());
    }

    @Test
    void resultsAreSortedLexicographically() {
        List<List<Integer>> result = Permutations.permutations(new int[]{3, 1, 2});
        assertEquals(java.util.Arrays.asList(1, 2, 3), result.get(0));
        assertEquals(java.util.Arrays.asList(1, 3, 2), result.get(1));
    }

    @Test
    void everyPermutationContainsEveryElement() {
        for (List<Integer> permutation : Permutations.permutations(new int[]{1, 2, 3})) {
            assertEquals(3, permutation.size());
            assertTrue(permutation.containsAll(java.util.Arrays.asList(1, 2, 3)));
        }
    }
}
