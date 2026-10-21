package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JumpGameTest {

    @Test
    void reachesTheLastIndexWithTwoJumps() {
        assertTrue(JumpGame.canJump(new int[]{2, 3, 1, 1}));
    }

    @Test
    void aSingleElementArrayIsAlreadyAtTheEnd() {
        assertTrue(JumpGame.canJump(new int[]{0}));
    }

    @Test
    void aZeroEverywhereMeansNoProgress() {
        assertFalse(JumpGame.canJump(new int[]{0, 0, 0}));
    }

    @Test
    void theLastIndexIsUnreachableWhenAPositionIsSkipped() {
        assertFalse(JumpGame.canJump(new int[]{3, 2, 1, 0, 4}));
    }

    @Test
    void anEmptyArrayIsNotReachable() {
        assertFalse(JumpGame.canJump(new int[]{}));
    }

    @Test
    void oneBigJumpIsEnough() {
        assertTrue(JumpGame.canJump(new int[]{5, 0, 0, 0, 0, 0}));
    }
}
