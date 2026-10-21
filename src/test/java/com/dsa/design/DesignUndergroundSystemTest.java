package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DesignUndergroundSystemTest {

    @Test
    void averagesASingleTrip() {
        DesignUndergroundSystem system = new DesignUndergroundSystem();
        assertEquals(4.0, system.recordTrip(1, 2, 4), 1e-9);
        assertEquals(1, system.pairCount());
    }

    @Test
    void averagesSeveralTrips() {
        DesignUndergroundSystem system = new DesignUndergroundSystem();
        system.recordTrip(1, 2, 4);
        system.recordTrip(1, 2, 6);
        assertEquals(5.0, system.average(1, 2), 1e-9);
        assertEquals(1, system.pairCount());
    }

    @Test
    void keepsTheStationPairsApart() {
        DesignUndergroundSystem system = new DesignUndergroundSystem();
        system.recordTrip(1, 2, 4);
        system.recordTrip(1, 3, 8);
        system.recordTrip(2, 3, 10);
        assertEquals(4.0, system.average(1, 2), 1e-9);
        assertEquals(8.0, system.average(1, 3), 1e-9);
        assertEquals(10.0, system.average(2, 3), 1e-9);
        assertEquals(3, system.pairCount());
    }

    @Test
    void anUnknownPairHasAnAverageOfZero() {
        DesignUndergroundSystem system = new DesignUndergroundSystem();
        system.recordTrip(1, 2, 4);
        assertEquals(0.0, system.average(5, 6), 1e-9);
        assertEquals(0.0, system.average(1, 9), 1e-9);
    }

    @Test
    void formatsTheAverageWithTwoDecimals() {
        assertEquals("5.00", DesignUndergroundSystem.format(5.0));
        assertEquals("8.00", DesignUndergroundSystem.format(8.0));
        assertEquals("3.33", DesignUndergroundSystem.format(10.0 / 3.0));
    }
}
