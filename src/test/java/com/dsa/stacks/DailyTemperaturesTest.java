package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class DailyTemperaturesTest {

    @Test
    void findsTheHappyPath() {
        assertArrayEquals(new int[]{1, 1, 3, 2, 1, 0},
                DailyTemperatures.daysToWait(new int[]{73, 74, 75, 71, 69, 76}));
    }

    @Test
    void handlesAnIncreasingSequence() {
        assertArrayEquals(new int[]{1, 1, 1, 0},
                DailyTemperatures.daysToWait(new int[]{30, 40, 50, 60}));
    }

    @Test
    void handlesADecreasingSequence() {
        assertArrayEquals(new int[]{0, 0, 0, 0},
                DailyTemperatures.daysToWait(new int[]{60, 50, 40, 30}));
    }

    @Test
    void handlesASingleDay() {
        assertArrayEquals(new int[]{0}, DailyTemperatures.daysToWait(new int[]{50}));
    }

    @Test
    void handlesEqualTemperatures() {
        assertArrayEquals(new int[]{0, 0, 0}, DailyTemperatures.daysToWait(new int[]{50, 50, 50}));
    }

    @Test
    void handlesAWarmDayAtTheEnd() {
        assertArrayEquals(new int[]{3, 2, 1, 0},
                DailyTemperatures.daysToWait(new int[]{70, 60, 50, 80}));
    }
}
