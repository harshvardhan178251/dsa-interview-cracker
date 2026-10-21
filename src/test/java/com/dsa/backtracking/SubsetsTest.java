package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SubsetsTest {

    @Test
    void classicExample() {
        assertEquals(8, Subsets.subsets(new int[]{1, 2, 3}).size());
    }

    @Test
    void emptyInputHasOnlyTheEmptySubset() {
        assertEquals(1, Subsets.subsets(new int[]{}).size());
    }

    @Test
    void singleElement() {
        assertEquals(2, Subsets.subsets(new int[]{7}).size());
    }

    @Test
    void containsTheEmptySubset() {
        assertTrue(Subsets.subsets(new int[]{1}).contains(new ArrayList<Integer>()));
    }

    @Test
    void containsTheFullSet() {
        assertTrue(Subsets.subsets(new int[]{1, 2}).contains(java.util.Arrays.asList(1, 2)));
    }

    @Test
    void resultsAreSortedLexicographically() {
        List<List<Integer>> result = Subsets.subsets(new int[]{3, 1, 2});
        assertEquals(new ArrayList<Integer>(), result.get(0));
        assertEquals(java.util.Arrays.asList(1), result.get(1));
        assertEquals(java.util.Arrays.asList(1, 2), result.get(2));
        assertEquals(java.util.Arrays.asList(1, 2, 3), result.get(3));
        assertEquals(java.util.Arrays.asList(1, 3), result.get(4));
        assertEquals(java.util.Arrays.asList(3), result.get(7));
    }
}
