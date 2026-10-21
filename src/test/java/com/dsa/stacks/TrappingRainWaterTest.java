package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TrappingRainWaterTest {

    @Test
    void findsTheHappyPath() {
        assertEquals(9, TrappingRainWater.trap(new int[]{4, 2, 0, 3, 2, 5}));
    }

    @Test
    void handlesTheMirrorImageCase() {
        assertEquals(8, TrappingRainWater.trap(new int[]{5, 1, 2, 1, 4}));
    }

    @Test
    void handlesTheClassicExample() {
        assertEquals(6, TrappingRainWater.trap(new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}));
    }

    @Test
    void handlesASingleBar() {
        assertEquals(0, TrappingRainWater.trap(new int[]{4}));
    }

    @Test
    void handlesTwoBars() {
        assertEquals(0, TrappingRainWater.trap(new int[]{4, 5}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, TrappingRainWater.trap(new int[]{}));
    }

    @Test
    void handlesAFlatHistogram() {
        assertEquals(0, TrappingRainWater.trap(new int[]{2, 2, 2, 2}));
    }
}
