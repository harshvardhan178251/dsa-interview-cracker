package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PermutationsIITest {

    @Test
    void classicExample() {
        List<List<Integer>> result = PermutationsII.permutationsUnique(new int[]{1, 1, 2});
        assertEquals(3, result.size());
        assertEquals(java.util.Arrays.asList(1, 1, 2), result.get(0));
        assertEquals(java.util.Arrays.asList(1, 2, 1), result.get(1));
        assertEquals(java.util.Arrays.asList(2, 1, 1), result.get(2));
    }

    @Test
    void allEqualValuesGiveOnePermutation() {
        assertEquals(1, PermutationsII.permutationsUnique(new int[]{2, 2, 2}).size());
    }

    @Test
    void distinctValuesBehaveLikePermutations() {
        assertEquals(6, PermutationsII.permutationsUnique(new int[]{1, 2, 3}).size());
    }

    @Test
    void singleElement() {
        assertEquals(1, PermutationsII.permutationsUnique(new int[]{5}).size());
    }

    @Test
    void twoPairsGiveSixPermutations() {
        assertEquals(6, PermutationsII.permutationsUnique(new int[]{1, 1, 2, 2}).size());
    }
}
