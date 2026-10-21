package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TaskSchedulerTest {

    @Test
    void schedulesTheSampleTasksInSixSlots() {
        assertEquals(6, TaskScheduler.leastInterval(new char[]{'A', 'A', 'B', 'C', 'D', 'D'}, 2));
    }

    @Test
    void identicalTasksNeedTheirOwnCooldownGaps() {
        // A _ _ A _ _ A
        assertEquals(7, TaskScheduler.leastInterval(new char[]{'A', 'A', 'A'}, 2));
    }

    @Test
    void distinctTasksNeedNoIdleTime() {
        assertEquals(3, TaskScheduler.leastInterval(new char[]{'A', 'B', 'C'}, 2));
    }

    @Test
    void aZeroCooldownRunsEverythingBackToBack() {
        assertEquals(4, TaskScheduler.leastInterval(new char[]{'A', 'A', 'B', 'B'}, 0));
    }

    @Test
    void aLargeCooldownDominatesTheSchedule() {
        assertEquals(10, TaskScheduler.leastInterval(new char[]{'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'}, 3));
    }

    @Test
    void singleTaskRunsOnce() {
        assertEquals(1, TaskScheduler.leastInterval(new char[]{'A'}, 5));
    }

    @Test
    void emptyInputNeedsNoSlots() {
        assertEquals(0, TaskScheduler.leastInterval(new char[0], 2));
    }

    @Test
    void twoTasksWithADistanceOfTwoNeedFourSlots() {
        // A _ _ A
        assertEquals(4, TaskScheduler.leastInterval(new char[]{'A', 'A'}, 2));
    }
}
