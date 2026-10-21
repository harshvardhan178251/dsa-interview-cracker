package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AllocateMinimumNumberOfPaintersTest {

    @Test
    void findsTheMinimumTime() {
        assertEquals(20, AllocateMinimumNumberOfPainters.minTimeToPaint(new int[]{10, 10, 10, 10}, 2));
    }

    @Test
    void handlesOnePainter() {
        assertEquals(30, AllocateMinimumNumberOfPainters.minTimeToPaint(new int[]{10, 10, 10}, 1));
    }

    @Test
    void handlesOnePainterPerBoard() {
        assertEquals(10, AllocateMinimumNumberOfPainters.minTimeToPaint(new int[]{10, 10, 10, 10}, 4));
    }

    @Test
    void handlesMorePaintersThanBoards() {
        assertEquals(20, AllocateMinimumNumberOfPainters.minTimeToPaint(new int[]{10, 20}, 5));
    }

    @Test
    void handlesASingleBoard() {
        assertEquals(13, AllocateMinimumNumberOfPainters.minTimeToPaint(new int[]{13}, 3));
    }

    @Test
    void theTimeIsNeverBelowTheLongestBoard() {
        int[] boards = {4, 9, 2, 7, 5};
        for (int painters = 1; painters <= boards.length; painters++) {
            int time = AllocateMinimumNumberOfPainters.minTimeToPaint(boards, painters);
            assertTrue(time >= 9, "painters = " + painters);
        }
    }
}
