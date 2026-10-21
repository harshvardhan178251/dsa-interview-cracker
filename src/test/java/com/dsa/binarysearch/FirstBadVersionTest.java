package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FirstBadVersionTest {

    @Test
    void findsTheFirstBadVersion() {
        assertEquals(4, FirstBadVersion.firstBadVersion(5));
        assertEquals(4, FirstBadVersion.firstBadVersion(4));
    }

    @Test
    void theStubTreatsVersionsFromFourOnwardsAsBad() {
        assertFalse(FirstBadVersion.isBadVersion(1));
        assertFalse(FirstBadVersion.isBadVersion(3));
        assertTrue(FirstBadVersion.isBadVersion(4));
        assertTrue(FirstBadVersion.isBadVersion(99));
    }

    @Test
    void returnsMinusOneWhenNoVersionIsBad() {
        assertEquals(-1, FirstBadVersion.firstBadVersion(3));
        assertEquals(-1, FirstBadVersion.firstBadVersion(0));
        assertEquals(-1, FirstBadVersion.firstBadVersion(-5));
    }

    @Test
    void findsTheFirstBadVersionInALargeRange() {
        assertEquals(4, FirstBadVersion.firstBadVersion(1_000_000));
    }

    @Test
    void theFirstBadVersionIsNeverGreaterThanTheHighestVersion() {
        for (int n = 1; n <= 50; n++) {
            int answer = FirstBadVersion.firstBadVersion(n);
            assertTrue(answer <= n, "n = " + n);
            assertTrue(answer == -1 || FirstBadVersion.isBadVersion(answer));
        }
    }
}
