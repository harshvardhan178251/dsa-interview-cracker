package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;

class ShuffleArrayTest {

    @Test
    void producesTheDocumentedPermutation() {
        assertArrayEquals(new int[]{3, 2, 4, 1}, ShuffleArray.shuffle(new int[]{1, 2, 3, 4}, 3));
    }

    @Test
    void isReproducibleForTheSameSeed() {
        int[] first = ShuffleArray.shuffle(new int[]{1, 2, 3, 4, 5}, 4);
        int[] second = ShuffleArray.shuffle(new int[]{1, 2, 3, 4, 5}, 4);
        assertArrayEquals(first, second);
    }

    @Test
    void neverLosesOrDuplicatesAnElement() {
        int[] input = {1, 2, 3, 4, 5, 6, 7, 8};
        int[] shuffled = ShuffleArray.shuffle(input, 8);
        int[] sortedInput = input.clone();
        int[] sortedShuffled = shuffled.clone();
        Arrays.sort(sortedInput);
        Arrays.sort(sortedShuffled);
        assertArrayEquals(sortedInput, sortedShuffled);
    }

    @Test
    void doesNotModifyTheInput() {
        int[] input = {1, 2, 3, 4};
        ShuffleArray.shuffle(input, 3);
        assertArrayEquals(new int[]{1, 2, 3, 4}, input);
    }

    @Test
    void handlesZeroSwaps() {
        assertArrayEquals(new int[]{1, 2, 3}, ShuffleArray.shuffle(new int[]{1, 2, 3}, 0));
    }

    @Test
    void handlesASingleElement() {
        assertArrayEquals(new int[]{5}, ShuffleArray.shuffle(new int[]{5}, 1));
        assertTrue(ShuffleArray.shuffle(new int[]{5}, 1).length == 1);
    }
}
