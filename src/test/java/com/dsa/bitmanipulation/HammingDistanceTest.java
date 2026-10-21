package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HammingDistanceTest {

    @Test
    void countsTheDifferingBits() {
        assertEquals(2, HammingDistance.hammingDistance(1, 4));
        assertEquals(1, HammingDistance.hammingDistance(1, 0));
    }

    @Test
    void handlesEqualNumbers() {
        assertEquals(0, HammingDistance.hammingDistance(3, 3));
        assertEquals(0, HammingDistance.hammingDistance(0, 0));
    }

    @Test
    void handlesZero() {
        assertEquals(1, HammingDistance.hammingDistance(0, 1));
    }

    @Test
    void agreesWithTheBuiltinPopulationCount() {
        for (int x = 0; x <= 200; x++) {
            for (int y = 0; y <= 200; y += 7) {
                assertEquals(Integer.bitCount(x ^ y), HammingDistance.hammingDistance(x, y),
                        x + " vs " + y);
            }
        }
    }
}
