package com.dsa.intervals;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MeetingRoomsIIITest {

    private static Interval[] meetings(int[][] specs) {
        Interval[] result = new Interval[specs.length];
        for (int i = 0; i < specs.length; i++) {
            result[i] = new Interval(specs[i][0], specs[i][1]);
        }
        return result;
    }

    @Test
    void threeOfTheFourMeetingsFit() {
        assertEquals(3, MeetingRoomsIII.maxMeetings(
                meetings(new int[][]{{1, 3}, {2, 5}, {3, 7}, {4, 8}}), 2));
    }

    @Test
    void oneRoomKeepsMeetingsThatOnlyTouch() {
        assertEquals(3, MeetingRoomsIII.maxMeetings(
                meetings(new int[][]{{1, 2}, {2, 3}, {3, 4}}), 1));
    }

    @Test
    void withoutMeetingsNothingIsScheduled() {
        assertEquals(0, MeetingRoomsIII.maxMeetings(new Interval[]{}, 3));
    }

    @Test
    void withoutRoomsNothingIsScheduled() {
        assertEquals(0, MeetingRoomsIII.maxMeetings(meetings(new int[][]{{1, 2}}), 0));
    }

    @Test
    void enoughRoomsScheduleEverything() {
        assertEquals(3, MeetingRoomsIII.maxMeetings(
                meetings(new int[][]{{1, 3}, {2, 5}, {3, 7}}), 3));
    }

    @Test
    void aSingleRoomKeepsTheEarliestFinishingMeetings() {
        assertEquals(2, MeetingRoomsIII.maxMeetings(
                meetings(new int[][]{{1, 9}, {2, 3}, {4, 5}}), 1));
    }
}
