package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JumpGameIIITest {

    @Test
    void aZeroCanBeReached() {
        assertTrue(JumpGameIII.canReach(new int[]{4, 2, 3, 0, 3, 1, 2}, 0));
    }

    @Test
    void startingOnAZeroEndsTheWalkImmediately() {
        assertTrue(JumpGameIII.canReach(new int[]{4, 2, 3, 0}, 3));
    }

    @Test
    void aCycleWithoutAZeroIsNeverFinished() {
        assertFalse(JumpGameIII.canReach(new int[]{1, 1}, 0));
    }

    @Test
    void anEmptyArrayHasNoReachableZero() {
        assertFalse(JumpGameIII.canReach(new int[]{}, 0));
    }

    @Test
    void aStartOutsideTheArrayIsRejected() {
        assertFalse(JumpGameIII.canReach(new int[]{1, 0}, 5));
    }

    @Test
    void backwardsJumpsAreAllowed() {
        assertTrue(JumpGameIII.canReach(new int[]{2, 1, 0}, 2));
    }
}
