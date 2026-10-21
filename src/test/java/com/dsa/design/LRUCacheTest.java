package com.dsa.design;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LRUCacheTest {

    @Test
    void storesAndReadsAValue() {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        assertEquals(1, cache.get(1));
        assertEquals(1, cache.size());
    }

    @Test
    void missesReturnMinusOne() {
        LRUCache cache = new LRUCache(2);
        assertEquals(-1, cache.get(42));
    }

    @Test
    void evictsTheLeastRecentlyUsedEntry() {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.get(1);          // key 1 is now the most recently used
        cache.put(3, 3);       // key 2 is evicted
        assertEquals(-1, cache.get(2));
        assertEquals(1, cache.get(1));
        assertEquals(3, cache.get(3));
        assertEquals(2, cache.size());
    }

    @Test
    void aGetRefreshesTheRecency() {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        assertEquals(Arrays.asList(2, 1), cache.keysMostRecentFirst());
        cache.get(2);
        assertEquals(Arrays.asList(2, 1), cache.keysMostRecentFirst());
        cache.get(1);
        assertEquals(Arrays.asList(1, 2), cache.keysMostRecentFirst());
    }

    @Test
    void updatingAnExistingKeyDoesNotGrowTheCache() {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(1, 10);
        assertEquals(1, cache.size());
        assertEquals(10, cache.get(1));
    }

    @Test
    void aCapacityOfZeroStoresNothing() {
        LRUCache cache = new LRUCache(0);
        cache.put(1, 1);
        assertEquals(0, cache.size());
        assertEquals(-1, cache.get(1));
    }

    @Test
    void theListKeepsTheMostRecentEntryFirst() {
        LRUCache cache = new LRUCache(3);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.put(3, 3);
        List<Integer> keys = cache.keysMostRecentFirst();
        assertEquals(Arrays.asList(3, 2, 1), keys);
        cache.get(1);
        assertEquals(Arrays.asList(1, 3, 2), cache.keysMostRecentFirst());
        assertTrue(cache.state().contains("1=1"));
    }

    @Test
    void evictsExactlyOneEntryWhenTheCacheOverflows() {
        LRUCache cache = new LRUCache(2);
        for (int key = 1; key <= 5; key++) {
            cache.put(key, key * 10);
            assertTrue(cache.size() <= 2);
        }
        assertEquals(2, cache.size());
        assertEquals(-1, cache.get(1));
        assertEquals(50, cache.get(5));
    }
}
