package com.dsa.intervals;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class EmployeeFreeTimeTest {

    @SafeVarargs
    private static List<List<Interval>> schedules(List<Interval>... employees) {
        return new ArrayList<>(Arrays.asList(employees));
    }

    private static String render(List<Interval> intervals) {
        StringBuilder sb = new StringBuilder();
        for (Interval interval : intervals) {
            sb.append('[').append(interval.start).append(',').append(interval.end).append(')');
        }
        return sb.toString();
    }

    @Test
    void findsTheGapsBetweenEverybody() {
        List<Interval> free = EmployeeFreeTime.freeTime(schedules(
                new ArrayList<>(Arrays.asList(new Interval(1, 3), new Interval(6, 7))),
                new ArrayList<>(Arrays.asList(new Interval(2, 5), new Interval(8, 9)))));
        assertEquals("[5,6)[7,8)", render(free));
    }

    @Test
    void aScheduleWithoutGapsHasNoFreeTime() {
        List<Interval> free = EmployeeFreeTime.freeTime(schedules(
                new ArrayList<>(Arrays.asList(new Interval(0, 10))),
                new ArrayList<>(Arrays.asList(new Interval(2, 5)))));
        assertTrue(free.isEmpty());
    }

    @Test
    void withoutAnyScheduleThereIsNoFreeTime() {
        assertTrue(EmployeeFreeTime.freeTime(new ArrayList<>()).isEmpty());
    }

    @Test
    void anEmployeeWithoutBusyBlocksFreesTheWholeSpan() {
        List<Interval> free = EmployeeFreeTime.freeTime(schedules(
                new ArrayList<>(Arrays.asList(new Interval(1, 3), new Interval(5, 7)))));
        assertEquals("[3,5)", render(free));
    }

    @Test
    void overlappingBlocksOfDifferentEmployeesAreMerged() {
        List<Interval> free = EmployeeFreeTime.freeTime(schedules(
                new ArrayList<>(Arrays.asList(new Interval(1, 6))),
                new ArrayList<>(Arrays.asList(new Interval(2, 4)))));
        assertTrue(free.isEmpty());
    }
}
