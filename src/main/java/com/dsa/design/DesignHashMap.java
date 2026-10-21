package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Design HashMap
 * LeetCode: 706 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Design, Hashing with separate chaining
 *
 * <p>Problem:
 * Implement a hash map that supports {@code put(key, value)}, {@code get(key)} and
 * {@code remove(key)} in average O(1) time without using any built-in hash map.
 *
 * <p>Input format (stdin):
 * <pre>
 * put k v
 * get k
 * remove k
 * ...
 * </pre>
 * The program prints one line per {@code get}: the stored value or {@code -1}.
 *
 * <p>Sample input:
 * <pre>
 * put 1 1
 * put 2 2
 * get 1
 * get 3
 * remove 2
 * get 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * -1
 * -1
 * </pre>
 *
 * <p>Approach: an array of buckets, each bucket holding a singly linked chain of entries.
 * The bucket index is {@code (key & 0x7fffffff) % buckets.length}, so even
 * {@code Integer.MIN_VALUE} lands in a valid slot. Lookups walk at most one chain.
 *
 * <p>Complexity: Time O(1) average per operation (O(chain) worst case), Space O(n + buckets).
 */
public class DesignHashMap {

    /** One entry of a bucket chain. */
    static final class Entry {
        final int key;
        int value;
        Entry next;

        Entry(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private final Entry[] buckets;
    private int size;

    public DesignHashMap() {
        this(1024);
    }

    public DesignHashMap(int bucketCount) {
        this.buckets = new Entry[Math.max(1, bucketCount)];
    }

    /** Inserts the key or overwrites its value. */
    public void put(int key, int value) {
        int index = indexOf(key);
        for (Entry entry = buckets[index]; entry != null; entry = entry.next) {
            if (entry.key == key) {
                entry.value = value;
                return;
            }
        }
        Entry fresh = new Entry(key, value);
        fresh.next = buckets[index];
        buckets[index] = fresh;
        size++;
    }

    /** Returns the value for {@code key}, or {@code -1} when the key is absent. */
    public int get(int key) {
        for (Entry entry = buckets[indexOf(key)]; entry != null; entry = entry.next) {
            if (entry.key == key) {
                return entry.value;
            }
        }
        return -1;
    }

    /** Removes {@code key}; removing an absent key is a no-op. */
    public void remove(int key) {
        int index = indexOf(key);
        Entry previous = null;
        for (Entry entry = buckets[index]; entry != null; entry = entry.next) {
            if (entry.key == key) {
                if (previous == null) {
                    buckets[index] = entry.next;
                } else {
                    previous.next = entry.next;
                }
                size--;
                return;
            }
            previous = entry;
        }
    }

    /** Number of stored entries. */
    public int size() {
        return size;
    }

    /** All keys, in bucket order — used by the tests to inspect the structure. */
    public List<Integer> keys() {
        List<Integer> keys = new ArrayList<>();
        for (Entry head : buckets) {
            for (Entry entry = head; entry != null; entry = entry.next) {
                keys.add(entry.key);
            }
        }
        return keys;
    }

    private int indexOf(int key) {
        return (key & 0x7fffffff) % buckets.length;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        DesignHashMap map = new DesignHashMap();

        StringBuilder out = new StringBuilder();
        while (fs.hasNext()) {
            String command = fs.next();
            if ("put".equals(command)) {
                int key = fs.nextInt();
                int value = fs.nextInt();
                map.put(key, value);
            } else if ("get".equals(command)) {
                int key = fs.nextInt();
                out.append(map.get(key)).append('\n');
            } else if ("remove".equals(command)) {
                int key = fs.nextInt();
                map.remove(key);
            }
        }
        System.out.print(out);
    }
}
