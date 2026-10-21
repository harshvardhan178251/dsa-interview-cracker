package com.dsa.intervals;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MergeIntervalsTest {

    private static List<Interval> list(Interval... intervals) {
        return new ArrayList<>(Arrays.asList(intervals));
    }

    private static String render(List<Interval> intervals) {
        StringBuilder sb = new StringBuilder();
        for (Interval interval : intervals) {
            sb.append('[').append(interval.start).append(',').append(interval.end).append(')');
        }
        return sb.toString();
    }

    @Test
    void mergesOverlappingIntervals() {
        List<Interval> merged = MergeIntervals.merge(list(
                new Interval(1, 3), new Interval(2, 6), new Interval(8, 10),
                new Interval(15, 18), new Interval(4, 5)));
        assertEquals("[1,6)[8,10)[15,18)", render(merged));
    }

    @Test
    void touchingIntervalsStaySeparate() {
        List<Interval> merged = MergeIntervals.merge(list(new Interval(1, 3), new Interval(3, 5)));
        assertEquals("[1,3)[3,5)", render(merged));
    }

    @Test
    void anEmptyListMergesIntoAnEmptyList() {
        assertTrue(MergeIntervals.merge(new ArrayList<>()).isEmpty());
    }

    @Test
    void aSingleIntervalIsReturnedUnchanged() {
        List<Interval> merged = MergeIntervals.merge(list(new Interval(5, 9)));
        assertEquals("[5,9)", render(merged));
    }

    @Test
    void aFullyContainedIntervalDoesNotShrinkTheOuterOne() {
        List<Interval> merged = MergeIntervals.merge(list(new Interval(1, 10), new Interval(3, 4)));
        assertEquals("[1,10)", render(merged));
    }

    @Test
    void unsortedInputIsSortedFirst() {
        List<Interval> merged = MergeIntervals.merge(list(
                new Interval(8, 10), new Interval(1, 3), new Interval(2, 6)));
        assertEquals("[1,6)[8,10)", render(merged));
    }
}
