package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MinimumJumpStepsTest {

    @Test
    void classicExample() {
        assertEquals(2, MinimumJumpSteps.jump(new int[]{2, 3, 1, 1, 4}));
    }

    @Test
    void singleElementNeedsNoJump() {
        assertEquals(0, MinimumJumpSteps.jump(new int[]{0}));
    }

    @Test
    void oneJumpIsEnough() {
        assertEquals(1, MinimumJumpSteps.jump(new int[]{5, 1, 1, 1}));
    }

    @Test
    void everyStepIsOne() {
        assertEquals(3, MinimumJumpSteps.jump(new int[]{1, 1, 1, 1}));
    }

    @Test
    void zeroLengthAtTheEndIsFine() {
        assertEquals(1, MinimumJumpSteps.jump(new int[]{1, 0}));
    }
}
