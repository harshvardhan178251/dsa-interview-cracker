package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class EmployeeFreeDayTest {

    @Test
    void countsTheEventsEachEmployeeCanAttend() {
        int[][] events = {
                {1, 2, 1}, {2, 3, 1}, {3, 4, 1}, {3, 5, 1},
                {1, 3, 2}, {2, 4, 2}, {3, 5, 2}, {4, 6, 2}
        };
        assertEquals(4, EmployeeFreeDay.maxEvents(events));
    }

    @Test
    void aSingleEmployeeWithNonOverlappingEvents() {
        assertEquals(3, EmployeeFreeDay.maxEvents(new int[][]{{1, 2, 1}, {3, 4, 1}, {5, 6, 1}}));
    }

    @Test
    void aSingleEmployeeWithOverlappingEvents() {
        assertEquals(1, EmployeeFreeDay.maxEvents(new int[][]{{1, 5, 1}, {2, 6, 1}, {3, 7, 1}}));
    }

    @Test
    void touchingEventsOverlapBecauseTheEndDayIsInclusive() {
        // [1,2] and [2,3] share day 2, so only one of them fits
        assertEquals(1, EmployeeFreeDay.maxEvents(new int[][]{{1, 2, 1}, {2, 3, 1}}));
    }

    @Test
    void twoEmployeesAreCountedIndependently() {
        assertEquals(2, EmployeeFreeDay.maxEvents(new int[][]{{1, 2, 1}, {1, 2, 2}}));
    }

    @Test
    void emptyInputAttendsNothing() {
        assertEquals(0, EmployeeFreeDay.maxEvents(new int[0][]));
    }

    @Test
    void threeEmployeesEachAttendOneEvent() {
        assertEquals(3, EmployeeFreeDay.maxEvents(new int[][]{{1, 2, 1}, {1, 2, 2}, {1, 2, 3}}));
    }
}
