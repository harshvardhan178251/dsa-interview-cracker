package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

class SpiralMatrixTest {

    @Test
    void spiralsASquareMatrix() {
        List<Integer> order = SpiralMatrix.spiralOrder(new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}});
        assertEquals(List.of(1, 2, 3, 6, 9, 8, 7, 4, 5), order);
    }

    @Test
    void spiralsASingleRow() {
        assertEquals(List.of(1, 2, 3, 4), SpiralMatrix.spiralOrder(new int[][]{{1, 2, 3, 4}}));
    }

    @Test
    void spiralsASingleColumn() {
        assertEquals(List.of(1, 2, 3, 4), SpiralMatrix.spiralOrder(new int[][]{{1}, {2}, {3}, {4}}));
    }

    @Test
    void spiralsARectangularMatrix() {
        List<Integer> order = SpiralMatrix.spiralOrder(new int[][]{{1, 2, 3, 4}, {5, 6, 7, 8}});
        assertEquals(List.of(1, 2, 3, 4, 8, 7, 6, 5), order);
    }

    @Test
    void handlesAnEmptyMatrix() {
        assertEquals(List.of(), SpiralMatrix.spiralOrder(new int[][]{}));
    }
}
