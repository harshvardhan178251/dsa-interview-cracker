package com.dsa.intervals;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class IntervalListIntersectionsTest {

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
    void findsEveryOverlap() {
        List<Interval> result = IntervalListIntersections.intersect(
                list(new Interval(0, 2), new Interval(5, 10), new Interval(13, 23)),
                list(new Interval(1, 5), new Interval(8, 12), new Interval(15, 24)));
        assertEquals("[1,2)[8,10)[15,23)", render(result));
    }

    @Test
    void touchingIntervalsHaveNoOverlap() {
        List<Interval> result = IntervalListIntersections.intersect(
                list(new Interval(0, 5)), list(new Interval(5, 10)));
        assertTrue(result.isEmpty());
    }

    @Test
    void disjointListsProduceNoIntersection() {
        List<Interval> result = IntervalListIntersections.intersect(
                list(new Interval(0, 1)), list(new Interval(9, 10)));
        assertTrue(result.isEmpty());
    }

    @Test
    void anEmptyListProducesNoIntersection() {
        List<Interval> result = IntervalListIntersections.intersect(
                new ArrayList<>(), list(new Interval(1, 2)));
        assertTrue(result.isEmpty());
    }

    @Test
    void aFullyContainedIntervalIsReportedAsIs() {
        List<Interval> result = IntervalListIntersections.intersect(
                list(new Interval(0, 10)), list(new Interval(2, 4)));
        assertEquals("[2,4)", render(result));
    }

    @Test
    void severalOverlapsOfOneIntervalAreReported() {
        List<Interval> result = IntervalListIntersections.intersect(
                list(new Interval(0, 10)), list(new Interval(1, 2), new Interval(4, 5)));
        assertEquals("[1,2)[4,5)", render(result));
    }
}
