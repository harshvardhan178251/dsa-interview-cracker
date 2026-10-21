package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MovingAverageTest {

    @Test
    void averagesTheValuesSeenSoFar() {
        MovingAverage average = new MovingAverage(3);
        assertEquals(1.0, average.next(1), 1e-9);
        assertEquals(1.5, average.next(2), 1e-9);
        assertEquals(2.0, average.next(3), 1e-9);
    }

    @Test
    void slidesTheWindow() {
        MovingAverage average = new MovingAverage(3);
        average.next(1);
        average.next(2);
        average.next(3);
        assertEquals(3.0, average.next(4), 1e-9);
        assertEquals(3, average.size());
    }

    @Test
    void aWindowOfOneKeepsOnlyTheLastValue() {
        MovingAverage average = new MovingAverage(1);
        assertEquals(5.0, average.next(5), 1e-9);
        assertEquals(7.0, average.next(7), 1e-9);
    }

    @Test
    void handlesNegativeValues() {
        MovingAverage average = new MovingAverage(2);
        assertEquals(-4.0, average.next(-4), 1e-9);
        assertEquals(0.0, average.next(4), 1e-9);
    }

    @Test
    void handlesAWindowLargerThanTheInput() {
        MovingAverage average = new MovingAverage(10);
        average.next(1);
        average.next(2);
        assertEquals(2.0, average.next(3), 1e-9);
        assertEquals(3, average.size());
    }

    @Test
    void formatsTheAverageWithTwoDecimals() {
        assertEquals("1.00", MovingAverage.format(1.0));
        assertEquals("1.50", MovingAverage.format(1.5));
        assertEquals("2.33", MovingAverage.format(7.0 / 3.0));
    }
}
