package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ArticulationPointsTest {

    private static List<Integer> asList(int[] values) {
        List<Integer> list = new ArrayList<>();
        for (int value : values) {
            list.add(value);
        }
        return list;
    }

    @Test
    void findsTheTwoArticulationPointsOfTheSampleGraph() {
        assertEquals(asList(new int[]{1, 3}), ArticulationPoints.findArticulationPoints(5,
                new int[][]{{0, 1}, {1, 2}, {2, 0}, {1, 3}, {3, 4}}));
    }

    @Test
    void aPathHasOnlyItsInnerVerticesAsArticulationPoints() {
        assertEquals(asList(new int[]{1, 2}), ArticulationPoints.findArticulationPoints(4,
                new int[][]{{0, 1}, {1, 2}, {2, 3}}));
    }

    @Test
    void aCycleHasNoArticulationPoints() {
        assertEquals(asList(new int[]{}), ArticulationPoints.findArticulationPoints(3,
                new int[][]{{0, 1}, {1, 2}, {2, 0}}));
    }

    @Test
    void aGraphWithoutEdgesHasNoArticulationPoints() {
        assertEquals(asList(new int[]{}), ArticulationPoints.findArticulationPoints(4, new int[0][2]));
    }

    @Test
    void theRootOfTheDfsIsAnArticulationPointWithSeveralChildren() {
        // 0 is the DFS root and has two independent subtrees; 1 and 3 are cut vertices too
        assertEquals(asList(new int[]{0, 1, 3}), ArticulationPoints.findArticulationPoints(5,
                new int[][]{{0, 1}, {1, 2}, {0, 3}, {3, 4}}));
    }

    @Test
    void aSingleVertexIsNotAnArticulationPoint() {
        assertEquals(asList(new int[]{}), ArticulationPoints.findArticulationPoints(1, new int[0][2]));
    }

    @Test
    void twoDisconnectedComponentsAreBothSearched() {
        List<Integer> points = ArticulationPoints.findArticulationPoints(6,
                new int[][]{{0, 1}, {1, 2}, {3, 4}, {4, 5}});
        assertTrue(points.contains(1));
        assertTrue(points.contains(4));
        assertEquals(2, points.size());
    }
}
