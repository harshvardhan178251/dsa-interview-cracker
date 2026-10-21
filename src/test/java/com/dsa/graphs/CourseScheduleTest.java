package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CourseScheduleTest {

    @Test
    void anAcyclicGraphCanBeFinished() {
        assertTrue(CourseSchedule.canFinish(4, new int[][]{{0, 1}, {1, 2}, {2, 3}}));
    }

    @Test
    void aCycleBlocksTheCourses() {
        assertFalse(CourseSchedule.canFinish(4, new int[][]{{0, 1}, {1, 2}, {2, 3}, {3, 1}}));
    }

    @Test
    void aSelfLoopIsACycle() {
        assertFalse(CourseSchedule.canFinish(2, new int[][]{{0, 0}}));
    }

    @Test
    void aGraphWithoutEdgesIsAlwaysAcyclic() {
        assertTrue(CourseSchedule.canFinish(5, new int[0][2]));
    }

    @Test
    void aSingleVertexIsAcyclic() {
        assertTrue(CourseSchedule.canFinish(1, new int[0][2]));
    }

    @Test
    void aDiamondIsAcyclic() {
        assertTrue(CourseSchedule.canFinish(4, new int[][]{{0, 1}, {0, 2}, {1, 3}, {2, 3}}));
    }

    @Test
    void twoIndependentCyclesAreStillACycle() {
        assertFalse(CourseSchedule.canFinish(4, new int[][]{{0, 1}, {1, 0}, {2, 3}, {3, 2}}));
    }

    @Test
    void duplicateEdgesDoNotCreateACycle() {
        assertTrue(CourseSchedule.canFinish(2, new int[][]{{0, 1}, {0, 1}, {0, 1}}));
    }
}
