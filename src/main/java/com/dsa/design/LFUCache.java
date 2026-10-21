package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

/**
 * Problem: LFU Cache
 * LeetCode: 460 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Design, frequency buckets + HashMap
 *
 * <p>Problem:
 * Design a cache with a fixed capacity where both {@code get} and {@code put} are O(1).
 * The least <em>frequently used</em> entry is evicted; ties are broken by evicting the
 * least recently used entry among the entries with the lowest frequency.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity c
 * put k v
 * get k
 * ...
 * </pre>
 * The program prints one line per {@code get}: the cached value, or {@code -1} on a miss.
 *
 * <p>Sample input:
 * <pre>
 * capacity 2
 * put 1 1
 * put 2 2
 * get 1
 * put 3 3
 * get 2
 * get 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * -1
 * 3
 * </pre>
 *
 * <p>Approach: keep three pieces of state — a HashMap from key to node, a map from
 * frequency to a {@link LinkedHashSet} of nodes (insertion order = least recently used
 * first) and a {@code minFreq} cursor. A hit moves a node from bucket {@code f} to bucket
 * {@code f + 1}; when the lowest bucket empties, {@code minFreq} moves up. An insertion
 * evicts the head of the lowest bucket, which is exactly "least frequent, and among those
 * the least recently used".
 *
 * <p>Complexity: Time O(1) per operation, Space O(capacity).
 */
public class LFUCache {

    /** One cache entry with its access frequency. */
    static final class Node {
        final int key;
        int value;
        int freq = 1;

        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private final int capacity;
    private final Map<Integer, Node> cache = new HashMap<>();
    private final Map<Integer, LinkedHashSet<Node>> buckets = new HashMap<>();
    private int minFreq = 0;

    public LFUCache(int capacity) {
        this.capacity = Math.max(0, capacity);
    }

    /** Returns the value for {@code key}, or {@code -1} when the key is absent. */
    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) {
            return -1;
        }
        touch(node);
        return node.value;
    }

    /** Inserts or updates {@code key}, evicting the least frequently used entry if needed. */
    public void put(int key, int value) {
        if (capacity == 0) {
            return;
        }
        Node node = cache.get(key);
        if (node != null) {
            node.value = value;
            touch(node);
            return;
        }
        if (cache.size() >= capacity) {
            evict();
        }
        node = new Node(key, value);
        cache.put(key, node);
        bucket(1).add(node);
        minFreq = 1;
    }

    /** Number of entries currently held. */
    public int size() {
        return cache.size();
    }

    /** Lowest access frequency currently in the cache. */
    public int minFrequency() {
        return minFreq;
    }

    /** Keys ordered by descending frequency, then most recently used first. */
    public List<Integer> keysByFrequency() {
        List<Integer> keys = new ArrayList<>();
        List<Integer> freqs = new ArrayList<>(buckets.keySet());
        freqs.sort((a, b) -> b - a);
        for (int freq : freqs) {
            LinkedHashSet<Node> bucket = buckets.get(freq);
            if (bucket == null) {
                continue;
            }
            List<Node> ordered = new ArrayList<>(bucket);
            for (int i = ordered.size() - 1; i >= 0; i--) {
                keys.add(ordered.get(i).key);
            }
        }
        return keys;
    }

    /** Human readable snapshot, e.g. {@code {1=1(f2), 2=2(f1)}}. */
    public String state() {
        StringBuilder sb = new StringBuilder("{");
        boolean first = true;
        for (int key : keysByFrequency()) {
            Node node = cache.get(key);
            if (!first) {
                sb.append(", ");
            }
            first = false;
            sb.append(key).append('=').append(node.value).append("(f").append(node.freq).append(')');
        }
        return sb.append('}').toString();
    }

    private LinkedHashSet<Node> bucket(int freq) {
        return buckets.computeIfAbsent(freq, k -> new LinkedHashSet<>());
    }

    private void touch(Node node) {
        int freq = node.freq;
        LinkedHashSet<Node> current = bucket(freq);
        current.remove(node);
        if (freq == minFreq && current.isEmpty()) {
            minFreq = freq + 1;
        }
        node.freq = freq + 1;
        bucket(node.freq).add(node);
    }

    private void evict() {
        LinkedHashSet<Node> lowest = bucket(minFreq);
        Iterator<Node> iterator = lowest.iterator();
        if (!iterator.hasNext()) {
            return;
        }
        Node victim = iterator.next();
        iterator.remove();
        cache.remove(victim.key);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String first = fs.next();
        if (first.isEmpty()) {
            return;
        }
        int capacity = "capacity".equals(first) ? fs.nextInt() : Integer.parseInt(first);
        LFUCache cache = new LFUCache(capacity);

        StringBuilder out = new StringBuilder();
        while (fs.hasNext()) {
            String command = fs.next();
            if ("put".equals(command)) {
                int key = fs.nextInt();
                int value = fs.nextInt();
                cache.put(key, value);
            } else if ("get".equals(command)) {
                int key = fs.nextInt();
                out.append(cache.get(key)).append('\n');
            }
        }
        System.out.print(out);
    }
}
