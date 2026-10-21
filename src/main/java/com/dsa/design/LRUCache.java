package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: LRU Cache
 * LeetCode: 146 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Design, HashMap + doubly linked list
 *
 * <p>Problem:
 * Design a cache that stores at most {@code capacity} key/value pairs. Both {@code put}
 * and {@code get} run in O(1). When the cache is full and a new key is inserted, the
 * least recently <em>used</em> entry is evicted. Reading a key with {@code get} also
 * refreshes its recency.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity c
 * put k v
 * get k
 * ...
 * </pre>
 * The first line may also be a bare integer {@code c}. Every {@code put} and {@code get}
 * after that is one command; the program prints one line per {@code get}.
 *
 * <p>Sample input:
 * <pre>
 * capacity 2
 * put 1 1
 * put 2 2
 * get 1
 * put 3 3
 * get 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * -1
 * </pre>
 *
 * <p>Approach: a HashMap gives O(1) lookup by key and a doubly linked list gives O(1)
 * recency manipulation. The list is ordered most-recently-used first; {@code head.next} is
 * the hottest entry and {@code tail.prev} is the eviction candidate. Two sentinel nodes
 * remove every special case at the ends of the list.
 *
 * <p>Complexity: Time O(1) per operation, Space O(capacity).
 */
public class LRUCache {

    /** One cache entry; also a node of the recency list. */
    static final class Node {
        final int key;
        int value;
        Node prev;
        Node next;

        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private final int capacity;
    private final Map<Integer, Node> index = new HashMap<>();
    private final Node head = new Node(-1, -1); // sentinel, most-recently-used side
    private final Node tail = new Node(-1, -1); // sentinel, least-recently-used side

    public LRUCache(int capacity) {
        this.capacity = Math.max(0, capacity);
        head.next = tail;
        tail.prev = head;
    }

    /** Returns the value for {@code key}, or {@code -1} when the key is absent. */
    public int get(int key) {
        Node node = index.get(key);
        if (node == null) {
            return -1;
        }
        moveToFront(node);
        return node.value;
    }

    /** Inserts or updates {@code key}, evicting the least recently used entry if needed. */
    public void put(int key, int value) {
        Node node = index.get(key);
        if (node != null) {
            node.value = value;
            moveToFront(node);
            return;
        }
        if (capacity == 0) {
            return; // nothing can ever be stored
        }
        node = new Node(key, value);
        index.put(key, node);
        insertAfterHead(node);
        if (index.size() > capacity) {
            Node victim = tail.prev;
            remove(victim);
            index.remove(victim.key);
        }
    }

    /** Number of entries currently held. */
    public int size() {
        return index.size();
    }

    /** Keys ordered most recently used first — handy for tests and dry runs. */
    public List<Integer> keysMostRecentFirst() {
        List<Integer> keys = new ArrayList<>();
        for (Node node = head.next; node != tail; node = node.next) {
            keys.add(node.key);
        }
        return keys;
    }

    /** Human readable snapshot of the cache, e.g. {@code {1=1, 2=2}}. */
    public String state() {
        StringBuilder sb = new StringBuilder("{");
        boolean first = true;
        for (Node node = head.next; node != tail; node = node.next) {
            if (!first) {
                sb.append(", ");
            }
            first = false;
            sb.append(node.key).append('=').append(node.value);
        }
        return sb.append('}').toString();
    }

    private void moveToFront(Node node) {
        remove(node);
        insertAfterHead(node);
    }

    private void insertAfterHead(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = null;
        node.next = null;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String first = fs.next();
        if (first.isEmpty()) {
            return;
        }
        int capacity = "capacity".equals(first) ? fs.nextInt() : Integer.parseInt(first);
        LRUCache cache = new LRUCache(capacity);

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
