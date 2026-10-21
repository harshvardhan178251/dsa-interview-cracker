package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class MoveZeroesTest {

    @Test
    void movesTheZeroesToTheEnd() {
        int[] nums = {0, 1, 0, 3, 12};
        MoveZeroes.moveZeroes(nums);
        assertArrayEquals(new int[]{1, 3, 12, 0, 0}, nums);
    }

    @Test
    void keepsTheRelativeOrder() {
        int[] nums = {4, 0, 5, 0, 0, 6};
        MoveZeroes.moveZeroes(nums);
        assertArrayEquals(new int[]{4, 5, 6, 0, 0, 0}, nums);
    }

    @Test
    void allZeroes() {
        int[] nums = {0, 0, 0};
        MoveZeroes.moveZeroes(nums);
        assertArrayEquals(new int[]{0, 0, 0}, nums);
    }

    @Test
    void noZeroes() {
        int[] nums = {1, 2, 3};
        MoveZeroes.moveZeroes(nums);
        assertArrayEquals(new int[]{1, 2, 3}, nums);
    }

    @Test
    void zeroesInFront() {
        int[] nums = {0, 0, 0, 1};
        MoveZeroes.moveZeroes(nums);
        assertArrayEquals(new int[]{1, 0, 0, 0}, nums);
    }

    @Test
    void singleElement() {
        int[] nums = {0};
        MoveZeroes.moveZeroes(nums);
        assertArrayEquals(new int[]{0}, nums);
    }

    @Test
    void negativeValuesAreSupported() {
        int[] nums = {-1, 0, -3, 0, 5};
        MoveZeroes.moveZeroes(nums);
        assertArrayEquals(new int[]{-1, -3, 5, 0, 0}, nums);
    }
}
