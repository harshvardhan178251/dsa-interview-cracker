package com.dsa.design;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DesignHashMapTest {

    @Test
    void storesAndReadsAValue() {
        DesignHashMap map = new DesignHashMap();
        map.put(1, 1);
        assertEquals(1, map.get(1));
        assertEquals(1, map.size());
    }

    @Test
    void missingKeysReturnMinusOne() {
        DesignHashMap map = new DesignHashMap();
        assertEquals(-1, map.get(99));
    }

    @Test
    void overwritingAKeyKeepsOneEntry() {
        DesignHashMap map = new DesignHashMap();
        map.put(1, 1);
        map.put(1, 42);
        assertEquals(42, map.get(1));
        assertEquals(1, map.size());
    }

    @Test
    void removesAnEntry() {
        DesignHashMap map = new DesignHashMap();
        map.put(1, 1);
        map.put(2, 2);
        map.remove(1);
        assertEquals(-1, map.get(1));
        assertEquals(2, map.get(2));
        assertEquals(1, map.size());
    }

    @Test
    void removingAnAbsentKeyDoesNothing() {
        DesignHashMap map = new DesignHashMap();
        map.put(1, 1);
        map.remove(1234);
        assertEquals(1, map.size());
        assertEquals(1, map.get(1));
    }

    @Test
    void handlesCollidingKeys() {
        DesignHashMap map = new DesignHashMap(2);   // keys 1 and 3 share a bucket
        map.put(1, 10);
        map.put(3, 30);
        assertEquals(10, map.get(1));
        assertEquals(30, map.get(3));
        map.remove(1);
        assertEquals(-1, map.get(1));
        assertEquals(30, map.get(3));
        assertEquals(1, map.size());
    }

    @Test
    void handlesTheMostNegativeKey() {
        DesignHashMap map = new DesignHashMap();
        map.put(Integer.MIN_VALUE, 7);
        assertEquals(7, map.get(Integer.MIN_VALUE));
        map.remove(Integer.MIN_VALUE);
        assertEquals(-1, map.get(Integer.MIN_VALUE));
    }

    @Test
    void keepsEveryKey() {
        DesignHashMap map = new DesignHashMap();
        for (int key = 0; key < 20; key++) {
            map.put(key, key * 2);
        }
        assertEquals(20, map.size());
        assertEquals(38, map.get(19));
        assertEquals(Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10, 11, 12, 13, 14, 15, 16, 17, 18, 19).size(), map.keys().size());
        assertTrue(map.keys().containsAll(Arrays.asList(0, 19)));
    }
}
