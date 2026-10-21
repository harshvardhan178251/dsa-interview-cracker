package com.dsa.intervals;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class InsertIntervalTest {

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
    void insertsBetweenTwoIntervals() {
        List<Interval> result = InsertInterval.insert(
                list(new Interval(1, 3), new Interval(6, 9), new Interval(12, 15)),
                new Interval(4, 5));
        assertEquals("[1,3)[4,5)[6,9)[12,15)", render(result));
    }

    @Test
    void mergesWithTheOverlappingIntervals() {
        List<Interval> result = InsertInterval.insert(
                list(new Interval(1, 3), new Interval(6, 9), new Interval(12, 15)),
                new Interval(2, 8));
        assertEquals("[1,9)[12,15)", render(result));
    }

    @Test
    void anEmptyListJustTakesTheNewInterval() {
        List<Interval> result = InsertInterval.insert(new ArrayList<>(), new Interval(4, 5));
        assertEquals("[4,5)", render(result));
    }

    @Test
    void anIntervalBeforeEverythingIsPrepended() {
        List<Interval> result = InsertInterval.insert(
                list(new Interval(6, 9), new Interval(12, 15)), new Interval(1, 3));
        assertEquals("[1,3)[6,9)[12,15)", render(result));
    }

    @Test
    void anIntervalAfterEverythingIsAppended() {
        List<Interval> result = InsertInterval.insert(
                list(new Interval(1, 3), new Interval(6, 9)), new Interval(20, 25));
        assertEquals("[1,3)[6,9)[20,25)", render(result));
    }

    @Test
    void touchingIntervalsDoNotMerge() {
        List<Interval> result = InsertInterval.insert(list(new Interval(1, 3)), new Interval(3, 5));
        assertEquals("[1,3)[3,5)", render(result));
    }
}
