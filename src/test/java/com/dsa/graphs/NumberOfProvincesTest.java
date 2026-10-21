package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NumberOfProvincesTest {

    @Test
    void countsTwoProvinces() {
        assertEquals(2, NumberOfProvinces.countProvinces(new int[][]{
                {1, 1, 0},
                {1, 1, 0},
                {0, 0, 1}}));
    }

    @Test
    void aFullyConnectedMatrixIsOneProvince() {
        assertEquals(1, NumberOfProvinces.countProvinces(new int[][]{
                {1, 1, 1},
                {1, 1, 1},
                {1, 1, 1}}));
    }

    @Test
    void anEmptyMatrixIsOneProvincePerCity() {
        assertEquals(3, NumberOfProvinces.countProvinces(new int[][]{
                {0, 0, 0},
                {0, 0, 0},
                {0, 0, 0}}));
    }

    @Test
    void aSingleCityIsOneProvince() {
        assertEquals(1, NumberOfProvinces.countProvinces(new int[][]{{1}}));
    }

    @Test
    void twoSeparatePairsGiveTwoProvinces() {
        assertEquals(2, NumberOfProvinces.countProvinces(new int[][]{
                {1, 1, 0, 0},
                {1, 1, 0, 0},
                {0, 0, 1, 1},
                {0, 0, 1, 1}}));
    }

    @Test
    void aChainOfCitiesIsOneProvince() {
        assertEquals(1, NumberOfProvinces.countProvinces(new int[][]{
                {1, 1, 0},
                {1, 1, 1},
                {0, 1, 1}}));
    }

    @Test
    void anIsolatedCityIsItsOwnProvince() {
        assertEquals(2, NumberOfProvinces.countProvinces(new int[][]{
                {1, 1, 0},
                {1, 1, 0},
                {0, 0, 0}}));
    }
}
