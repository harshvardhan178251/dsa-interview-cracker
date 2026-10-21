package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DesignHitCounterTest {

    @Test
    void countsHitsInsideTheWindow() {
        DesignHitCounter counter = new DesignHitCounter();
        assertEquals(1, counter.hit(1));
        assertEquals(2, counter.hit(2));
        assertEquals(3, counter.hit(3));
    }

    @Test
    void dropsHitsThatLeftTheWindow() {
        DesignHitCounter counter = new DesignHitCounter();
        counter.hit(1);
        counter.hit(2);
        assertEquals(1, counter.hit(302));    // the hits at 1 and 2 are 300+ old
    }

    @Test
    void aHitExactlyThreeHundredSecondsOldIsExpired() {
        DesignHitCounter counter = new DesignHitCounter();
        counter.hit(1);
        assertEquals(1, counter.hit(301));     // 1 <= 301 - 300 -> expired
    }

    @Test
    void aHitJustInsideTheWindowIsStillCounted() {
        DesignHitCounter counter = new DesignHitCounter();
        counter.hit(1);
        assertEquals(2, counter.hit(300));    // 1 > 300 - 300 -> still inside
    }

    @Test
    void countsRepeatedTimestamps() {
        DesignHitCounter counter = new DesignHitCounter();
        assertEquals(1, counter.hit(10));
        assertEquals(2, counter.hit(10));
        assertEquals(3, counter.hit(10));
    }

    @Test
    void anEmptyCounterStartsAtZero() {
        DesignHitCounter counter = new DesignHitCounter();
        assertEquals(0, counter.size());
        assertEquals(300, DesignHitCounter.WINDOW_SECONDS);
    }
}
