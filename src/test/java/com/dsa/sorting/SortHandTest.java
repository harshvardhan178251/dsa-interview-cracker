package com.dsa.sorting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class SortHandTest {

    @Test
    void sortsTheClassicExample() {
        int[][] hand = SortHand.sortHand(new int[]{5, 3, 5, 3, 5}, new int[]{2, 0, 1, 3, 0});
        assertArrayEquals(new int[][]{{3, 0}, {3, 3}, {5, 0}, {5, 1}, {5, 2}}, hand);
    }

    @Test
    void sortsByRankFirst() {
        int[][] hand = SortHand.sortHand(new int[]{13, 1, 7}, new int[]{0, 3, 1});
        assertArrayEquals(new int[][]{{1, 3}, {7, 1}, {13, 0}}, hand);
    }

    @Test
    void sortsBySuitInsideOneRank() {
        int[][] hand = SortHand.sortHand(new int[]{5, 5, 5, 5}, new int[]{3, 0, 2, 1});
        assertArrayEquals(new int[][]{{5, 0}, {5, 1}, {5, 2}, {5, 3}}, hand);
    }

    @Test
    void handlesAnEmptyHand() {
        assertArrayEquals(new int[][]{}, SortHand.sortHand(new int[]{}, new int[]{}));
    }

    @Test
    void handlesASingleCard() {
        int[][] hand = SortHand.sortHand(new int[]{10}, new int[]{2});
        assertEquals(1, hand.length);
        assertArrayEquals(new int[]{10, 2}, hand[0]);
    }

    @Test
    void handlesDuplicateCards() {
        int[][] hand = SortHand.sortHand(new int[]{9, 9}, new int[]{1, 1});
        assertArrayEquals(new int[][]{{9, 1}, {9, 1}}, hand);
    }
}
