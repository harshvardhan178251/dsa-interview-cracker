package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RateLimiterTest {

    @Test
    void allowsRequestsUpToTheCapacity() {
        RateLimiter limiter = new RateLimiter(2, 10);
        assertTrue(limiter.allow(0));
        assertTrue(limiter.allow(0));
        assertFalse(limiter.allow(1));
    }

    @Test
    void rejectsWhenTheWindowIsFull() {
        RateLimiter limiter = new RateLimiter(1, 10);
        assertTrue(limiter.allow(0));
        assertFalse(limiter.allow(5));
        assertEquals(1, limiter.used());
    }

    @Test
    void freesUpWhenTheWindowSlides() {
        RateLimiter limiter = new RateLimiter(2, 10);
        assertTrue(limiter.allow(0));
        assertTrue(limiter.allow(1));
        assertFalse(limiter.allow(2));
        assertTrue(limiter.allow(10));     // the request at t=0 left the window
        assertTrue(limiter.allow(11));     // only the request at t=10 is still live
    }

    @Test
    void aRequestExactlyOneWindowOldHasExpired() {
        RateLimiter limiter = new RateLimiter(1, 10);
        assertTrue(limiter.allow(0));
        assertFalse(limiter.allow(9));
        assertTrue(limiter.allow(10));     // t - window == 0 -> expired
    }

    @Test
    void aCapacityOfZeroRejectsEverything() {
        RateLimiter limiter = new RateLimiter(0, 10);
        assertFalse(limiter.allow(0));
        assertFalse(limiter.allow(1000));
        assertEquals(0, limiter.used());
    }

    @Test
    void rejectedRequestsDoNotOccupyASlot() {
        RateLimiter limiter = new RateLimiter(1, 10);
        assertTrue(limiter.allow(0));
        assertFalse(limiter.allow(1));
        assertFalse(limiter.allow(2));
        assertEquals(1, limiter.used());   // only the accepted request is counted
        assertTrue(limiter.allow(10));
    }

    @Test
    void showsTheLiveWindow() {
        RateLimiter limiter = new RateLimiter(2, 10);
        limiter.allow(3);
        limiter.allow(4);
        assertEquals("[3, 4]", limiter.state());
    }
}
