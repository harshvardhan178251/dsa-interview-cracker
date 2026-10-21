package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class KeysAndRoomsTest {

    private static List<List<Integer>> rooms(Integer[]... keys) {
        List<List<Integer>> rooms = new ArrayList<>();
        for (Integer[] room : keys) {
            rooms.add(new ArrayList<>(Arrays.asList(room)));
        }
        return rooms;
    }

    @Test
    void aChainOfKeysOpensEveryRoom() {
        assertTrue(KeysAndRooms.canVisitAllRooms(rooms(new Integer[]{1}, new Integer[]{2}, new Integer[]{})));
    }

    @Test
    void anEmptyFirstRoomBlocksEverything() {
        assertFalse(KeysAndRooms.canVisitAllRooms(
                rooms(new Integer[]{}, new Integer[]{1}, new Integer[]{2})));
    }

    @Test
    void aSingleRoomIsAlwaysOpenable() {
        assertTrue(KeysAndRooms.canVisitAllRooms(rooms(new Integer[]{})));
    }

    @Test
    void extraKeysDoNotMatter() {
        assertTrue(KeysAndRooms.canVisitAllRooms(
                rooms(new Integer[]{1, 2, 99}, new Integer[]{2}, new Integer[]{})));
    }

    @Test
    void duplicateKeysAreHandled() {
        assertTrue(KeysAndRooms.canVisitAllRooms(
                rooms(new Integer[]{1, 1}, new Integer[]{2, 2}, new Integer[]{0})));
    }

    @Test
    void aCycleOfKeysStillOpensEveryRoom() {
        assertTrue(KeysAndRooms.canVisitAllRooms(
                rooms(new Integer[]{1}, new Integer[]{0, 2}, new Integer[]{1})));
    }

    @Test
    void anEmptyHouseIsTriviallyOpenable() {
        assertTrue(KeysAndRooms.canVisitAllRooms(Collections.emptyList()));
    }
}
