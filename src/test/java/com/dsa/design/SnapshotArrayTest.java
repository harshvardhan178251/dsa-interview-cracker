package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SnapshotArrayTest {

    @Test
    void anIndexThatWasNeverWrittenIsZero() {
        SnapshotArray array = new SnapshotArray(3);
        assertEquals(0, array.get(0, 5));
        assertEquals(0, array.get(2, 100));
    }

    @Test
    void readsTheValueOfTheRequestedSnapshot() {
        SnapshotArray array = new SnapshotArray(2);
        array.set(0, 1, 5);
        array.set(1, 2, 6);
        assertEquals(5, array.get(0, 1));
        assertEquals(6, array.get(1, 2));
    }

    @Test
    void aLaterWriteDoesNotChangeAnOlderSnapshot() {
        SnapshotArray array = new SnapshotArray(1);
        array.set(0, 1, 5);
        array.set(0, 3, 7);
        assertEquals(5, array.get(0, 1));
        assertEquals(5, array.get(0, 2));
        assertEquals(7, array.get(0, 3));
    }

    @Test
    void readsTheNewestWriteAtOrBeforeTheSnapshot() {
        SnapshotArray array = new SnapshotArray(1);
        array.set(0, 1, 5);
        array.set(0, 2, 7);
        array.set(0, 4, 9);
        assertEquals(7, array.get(0, 3));
        assertEquals(9, array.get(0, 4));
    }

    @Test
    void countsTheWritesPerIndex() {
        SnapshotArray array = new SnapshotArray(2);
        array.set(0, 1, 5);
        array.set(0, 2, 6);
        array.set(1, 3, 7);
        assertEquals(2, array.versions(0));
        assertEquals(1, array.versions(1));
    }

    @Test
    void handlesAValueOfZero() {
        SnapshotArray array = new SnapshotArray(1);
        array.set(0, 1, 0);
        assertEquals(0, array.get(0, 1));
        assertEquals(1, array.versions(0));
    }
}
