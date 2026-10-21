package com.dsa.intervals;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NonOverlappingIntervalsTest {

    private static List<Interval> list(Interval... intervals) {
        return new ArrayList<>(Arrays.asList(intervals));
    }

    @Test
    void touchingIntervalsCanAllBeKept() {
        assertEquals(5, NonOverlappingIntervals.maxNonOverlapping(list(
                new Interval(1, 2), new Interval(2, 3), new Interval(3, 4),
                new Interval(4, 5), new Interval(5, 6))));
    }

    @Test
    void overlappingIntervalsForceRemovals() {
        assertEquals(2, NonOverlappingIntervals.maxNonOverlapping(list(
                new Interval(1, 4), new Interval(2, 5), new Interval(3, 6), new Interval(7, 8))));
    }

    @Test
    void anEmptyListKeepsNothing() {
        assertEquals(0, NonOverlappingIntervals.maxNonOverlapping(new ArrayList<>()));
    }

    @Test
    void aSingleIntervalIsAlwaysKept() {
        assertEquals(1, NonOverlappingIntervals.maxNonOverlapping(list(new Interval(3, 9))));
    }

    @Test
    void theEarliestFinishingIntervalIsKept() {
        assertEquals(2, NonOverlappingIntervals.maxNonOverlapping(list(
                new Interval(1, 100), new Interval(2, 3), new Interval(4, 5))));
    }

    @Test
    void unsortedIntervalsAreSortedFirst() {
        assertEquals(2, NonOverlappingIntervals.maxNonOverlapping(list(
                new Interval(7, 8), new Interval(1, 4), new Interval(2, 5), new Interval(3, 6))));
    }
}
