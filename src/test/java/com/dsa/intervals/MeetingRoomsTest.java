package com.dsa.intervals;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MeetingRoomsTest {

    private static List<Interval> list(Interval... intervals) {
        return new ArrayList<>(Arrays.asList(intervals));
    }

    @Test
    void overlappingMeetingsCannotAllBeAttended() {
        assertFalse(MeetingRooms.canAttendAll(list(
                new Interval(0, 30), new Interval(5, 10), new Interval(15, 20))));
    }

    @Test
    void meetingsThatOnlyTouchDoNotConflict() {
        assertTrue(MeetingRooms.canAttendAll(list(
                new Interval(1, 2), new Interval(2, 3), new Interval(3, 4))));
    }

    @Test
    void anEmptyScheduleIsTriviallyAttachable() {
        assertTrue(MeetingRooms.canAttendAll(new ArrayList<>()));
    }

    @Test
    void aSingleMeetingIsAlwaysAttachable() {
        assertTrue(MeetingRooms.canAttendAll(list(new Interval(5, 6))));
    }

    @Test
    void unsortedMeetingsAreSortedBeforeTheyAreChecked() {
        assertFalse(MeetingRooms.canAttendAll(list(
                new Interval(15, 20), new Interval(0, 30), new Interval(5, 10))));
    }

    @Test
    void aConflictInTheMiddleIsDetected() {
        assertFalse(MeetingRooms.canAttendAll(list(
                new Interval(1, 2), new Interval(4, 6), new Interval(5, 7))));
    }
}
