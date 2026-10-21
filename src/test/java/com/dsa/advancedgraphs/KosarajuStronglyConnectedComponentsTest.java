package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class KosarajuStronglyConnectedComponentsTest {

    private static String format(List<List<Integer>> components) {
        StringBuilder sb = new StringBuilder();
        sb.append(components.size()).append('\n');
        for (List<Integer> component : components) {
            for (int i = 0; i < component.size(); i++) {
                if (i > 0) {
                    sb.append(' ');
                }
                sb.append(component.get(i));
            }
            sb.append('\n');
        }
        return sb.toString();
    }

    @Test
    void findsTheCycleAndTheSingleton() {
        assertEquals("2\n0 1 2\n3\n", format(KosarajuStronglyConnectedComponents
                .stronglyConnectedComponents(4, new int[][]{{0, 1}, {1, 2}, {2, 0}, {2, 3}})));
    }

    @Test
    void aDirectedAcyclicGraphHasOneComponentPerVertex() {
        assertEquals("3\n0\n1\n2\n", format(KosarajuStronglyConnectedComponents
                .stronglyConnectedComponents(3, new int[][]{{0, 1}, {1, 2}})));
    }

    @Test
    void aGraphWithoutEdgesHasOneComponentPerVertex() {
        assertEquals("2\n0\n1\n", format(KosarajuStronglyConnectedComponents
                .stronglyConnectedComponents(2, new int[0][2])));
    }

    @Test
    void theWholeGraphIsOneComponent() {
        assertEquals("1\n0 1 2 3\n", format(KosarajuStronglyConnectedComponents
                .stronglyConnectedComponents(4, new int[][]{{0, 1}, {1, 2}, {2, 3}, {3, 0}})));
    }

    @Test
    void twoSeparateCyclesAreTwoComponents() {
        assertEquals("2\n0 1\n2 3\n", format(KosarajuStronglyConnectedComponents
                .stronglyConnectedComponents(4, new int[][]{{0, 1}, {1, 0}, {2, 3}, {3, 2}})));
    }

    @Test
    void kosarajuAgreesWithTarjan() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 0}, {2, 3}, {3, 4}, {4, 2}, {0, 4}};
        assertEquals(format(TarjanStronglyConnectedComponents.stronglyConnectedComponents(5, edges)),
                format(KosarajuStronglyConnectedComponents.stronglyConnectedComponents(5, edges)));
    }

    @Test
    void aSelfLoopIsItsOwnComponent() {
        assertEquals("2\n0\n1\n", format(KosarajuStronglyConnectedComponents
                .stronglyConnectedComponents(2, new int[][]{{0, 0}})));
    }
}
