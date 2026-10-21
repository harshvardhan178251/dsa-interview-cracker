package com.dsa.intervals;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MeetingRoomsIITest {

    private static List<Interval> list(Interval... intervals) {
        return new ArrayList<>(Arrays.asList(intervals));
    }

    @Test
    void twoRoomsAreNeeded() {
        assertEquals(2, MeetingRoomsII.minRooms(list(
                new Interval(0, 30), new Interval(5, 10), new Interval(15, 20))));
    }

    @Test
    void oneRoomIsEnoughForTouchingMeetings() {
        assertEquals(1, MeetingRoomsII.minRooms(list(
                new Interval(1, 2), new Interval(2, 3), new Interval(3, 4))));
    }

    @Test
    void withoutMeetingsNoRoomIsNeeded() {
        assertEquals(0, MeetingRoomsII.minRooms(new ArrayList<>()));
    }

    @Test
    void aSingleMeetingNeedsOneRoom() {
        assertEquals(1, MeetingRoomsII.minRooms(list(new Interval(4, 9))));
    }

    @Test
    void threeSimultaneousMeetingsNeedThreeRooms() {
        assertEquals(3, MeetingRoomsII.minRooms(list(
                new Interval(0, 10), new Interval(1, 11), new Interval(2, 12))));
    }

    @Test
    void unsortedMeetingsAreSortedFirst() {
        assertEquals(2, MeetingRoomsII.minRooms(list(
                new Interval(15, 20), new Interval(0, 30), new Interval(5, 10))));
    }
}
