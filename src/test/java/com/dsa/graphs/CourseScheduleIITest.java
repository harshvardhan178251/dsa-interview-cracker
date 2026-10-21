package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CourseScheduleIITest {

    @Test
    void returnsAValidOrdering() {
        assertArrayEquals(new int[]{3, 1, 2, 0},
                CourseScheduleII.findOrder(4, new int[][]{{1, 0}, {2, 0}, {3, 1}, {3, 2}}));
    }

    @Test
    void theOrderingRespectsEveryPrerequisite() {
        int[][] edges = {{0, 1}, {0, 2}, {1, 3}, {2, 3}};
        int[] order = CourseScheduleII.findOrder(4, edges);
        int[] position = new int[4];
        for (int i = 0; i < order.length; i++) {
            position[order[i]] = i;
        }
        for (int[] edge : edges) {
            assertTrue(position[edge[0]] < position[edge[1]],
                    "course " + edge[0] + " must come before course " + edge[1]);
        }
    }

    @Test
    void aCycleProducesAnEmptyOrdering() {
        assertEquals(0, CourseScheduleII.findOrder(3, new int[][]{{0, 1}, {1, 2}, {2, 0}}).length);
    }

    @Test
    void aGraphWithoutEdgesReturnsTheVerticesInOrder() {
        assertArrayEquals(new int[]{0, 1, 2}, CourseScheduleII.findOrder(3, new int[0][2]));
    }

    @Test
    void aSingleCourseReturnsItself() {
        assertArrayEquals(new int[]{0}, CourseScheduleII.findOrder(1, new int[0][2]));
    }

    @Test
    void theOrderingIsTheLexicographicallySmallestOne() {
        assertArrayEquals(new int[]{0, 1, 2},
                CourseScheduleII.findOrder(3, new int[][]{{1, 2}, {0, 1}}));
    }

    @Test
    void everyCourseIsEmittedExactlyOnce() {
        int[] order = CourseScheduleII.findOrder(5, new int[][]{{0, 1}, {1, 2}, {2, 3}, {3, 4}});
        assertEquals(5, order.length);
        boolean[] seen = new boolean[5];
        for (int course : order) {
            assertFalse(seen[course]);
            seen[course] = true;
        }
    }
}
