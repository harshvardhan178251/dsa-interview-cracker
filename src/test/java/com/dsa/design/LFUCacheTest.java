package com.dsa.design;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LFUCacheTest {

    @Test
    void storesAndReadsAValue() {
        LFUCache cache = new LFUCache(2);
        cache.put(1, 1);
        assertEquals(1, cache.get(1));
        assertEquals(1, cache.size());
    }

    @Test
    void missesReturnMinusOne() {
        LFUCache cache = new LFUCache(2);
        assertEquals(-1, cache.get(7));
    }

    @Test
    void evictsTheLeastFrequentlyUsedEntry() {
        LFUCache cache = new LFUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.get(1);          // key 1 has frequency 2, key 2 has frequency 1
        cache.put(3, 3);       // key 2 is the least frequently used -> evicted
        assertEquals(-1, cache.get(2));
        assertEquals(1, cache.get(1));
        assertEquals(3, cache.get(3));
    }

    @Test
    void breaksFrequencyTiesWithTheLeastRecentlyUsedEntry() {
        LFUCache cache = new LFUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.put(3, 3);       // both have frequency 1 -> the older one (1) is evicted
        assertEquals(-1, cache.get(1));
        assertEquals(2, cache.get(2));
        assertEquals(3, cache.get(3));
    }

    @Test
    void tracksTheLowestFrequency() {
        LFUCache cache = new LFUCache(3);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.get(1);
        cache.get(1);
        assertEquals(1, cache.minFrequency());   // key 2 is still at frequency 1
        cache.get(2);
        assertEquals(2, cache.minFrequency());   // key 1 is at 3, key 2 is at 2
        cache.get(2);
        assertEquals(3, cache.minFrequency());
    }

    @Test
    void updatingAKeyKeepsItsFrequency() {
        LFUCache cache = new LFUCache(2);
        cache.put(1, 1);
        cache.get(1);          // frequency 2
        cache.put(1, 11);      // an update is also a hit
        assertEquals(11, cache.get(1));
        assertEquals(1, cache.size());
    }

    @Test
    void aCapacityOfZeroStoresNothing() {
        LFUCache cache = new LFUCache(0);
        cache.put(1, 1);
        assertEquals(0, cache.size());
        assertEquals(-1, cache.get(1));
    }

    @Test
    void listsTheKeysByDescendingFrequency() {
        LFUCache cache = new LFUCache(3);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.get(1);
        assertEquals(Arrays.asList(1, 2), cache.keysByFrequency());
        assertTrue(cache.state().contains("f2"));
    }
}
