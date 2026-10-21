package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JumpGameIITest {

    @Test
    void needsTwoJumps() {
        assertEquals(2, JumpGameII.minJumps(new int[]{2, 3, 1, 1, 4}));
    }

    @Test
    void aSingleElementNeedsNoJump() {
        assertEquals(0, JumpGameII.minJumps(new int[]{0}));
    }

    @Test
    void oneJumpReachesTheEnd() {
        assertEquals(1, JumpGameII.minJumps(new int[]{4, 2, 1, 0, 4}));
    }

    @Test
    void needsAsManyJumpsAsTheArrayIsLong() {
        assertEquals(3, JumpGameII.minJumps(new int[]{1, 1, 1, 1}));
    }

    @Test
    void anEmptyArrayNeedsNoJump() {
        assertEquals(0, JumpGameII.minJumps(new int[]{}));
    }

    @Test
    void aZeroJumpLengthAfterALongJumpIsFine() {
        assertEquals(1, JumpGameII.minJumps(new int[]{2, 0, 0}));
    }
}
