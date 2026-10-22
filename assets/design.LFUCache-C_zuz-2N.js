var e=`design.LFUCache`,t=`package com.dsa.design;

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
                out.append(cache.get(key)).append('\\n');
            }
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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

    public Main(int capacity) {
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
        Main cache = new Main(capacity);

        StringBuilder out = new StringBuilder();
        while (fs.hasNext()) {
            String command = fs.next();
            if ("put".equals(command)) {
                int key = fs.nextInt();
                int value = fs.nextInt();
                cache.put(key, value);
            } else if ("get".equals(command)) {
                int key = fs.nextInt();
                out.append(cache.get(key)).append('\\n');
            }
        }
        System.out.print(out);
    }
}

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r='\n# LFU Cache — LeetCode 460\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Design · Frequency buckets · HashMap |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn, Pinterest |\n\n## Problem Statement\n\nDesign a cache with a fixed capacity where `get` and `put` are **O(1)**.\n\n- The **least frequently used** entry is evicted when the cache is full.\n- When several entries share the lowest frequency, the **least recently used** one among\n  them is evicted.\n\nA hit increases the frequency of the entry; inserting a new entry starts at frequency 1.\n\n## Input Format\n\n```\ncapacity c\nput k v\nget k\n...\n```\n\n- `capacity c` — maximum number of entries (first line; a bare integer also works).\n- `put k v` — insert or update.\n- `get k` — read.\n\nThe program prints one line per `get`: the value, or `-1` on a miss.\n\n## Sample Input\n\n```\ncapacity 2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3\n```\n\n## Expected Output\n\n```\n1\n-1\n3\n```\n\n`get 1` makes key `1` the most used key (frequency 2), so key `2` (frequency 1) is the\neviction victim when key `3` is inserted.\n\n## Approach — buckets per frequency\n\nKeep three pieces of state:\n\n1. `cache` — `key → node`, O(1) lookup.\n2. `buckets` — `frequency → ordered set of nodes`. Each set keeps its nodes in\n   *insertion order*, i.e. **least recently used first**.\n3. `minFreq` — the lowest frequency that currently exists in the cache.\n\nOperations:\n\n- **hit on `get`** — move the node from bucket `f` to bucket `f + 1`. If bucket `f` was\n  the lowest one and is now empty, `minFreq` moves up to `f + 1`.\n- **insert** — the new node goes into bucket `1`, and `minFreq` becomes `1`.\n- **evict** — take the **first** element of the `minFreq` bucket. Because the bucket is\n  ordered least-recently-used first, that element is exactly "least frequent, and among\n  those the least recently used".\n\nEvery step is a constant number of hash map and linked-hash-set operations.\n\n## Dry Run\n\nInput: `capacity = 2`. The bucket column shows `freq → {keys in LRU→MRU order}`.\n\n| Step | Command | `cache` before | Buckets before | Action | `cache` after | Buckets after | `minFreq` | Output |\n|---:|---|---|---|---|---|---|---:|---|\n| 1 | `put 1 1` | `{}` | `{}` | insert key 1 at freq 1 | `{1=1}` | `{1→{1}}` | 1 | — |\n| 2 | `put 2 2` | `{1=1}` | `{1→{1}}` | insert key 2 at freq 1 | `{1=1, 2=2}` | `{1→{1,2}}` | 1 | — |\n| 3 | `get 1` | `{1=1, 2=2}` | `{1→{1,2}}` | hit → key 1 moves 1 → 2 | `{1=1, 2=2}` | `{1→{2}, 2→{1}}` | 1 | `1` |\n| 4 | `put 3 3` | `{1=1, 2=2}` | `{1→{2}, 2→{1}}` | cache is full → evict head of bucket 1 = key 2; insert key 3 at freq 1 | `{1=1, 3=3}` | `{1→{3}, 2→{1}}` | 1 | — |\n| 5 | `get 2` | `{1=1, 3=3}` | `{1→{3}, 2→{1}}` | miss | unchanged | unchanged | 1 | `-1` |\n| 6 | `get 3` | `{1=1, 3=3}` | `{1→{3}, 2→{1}}` | hit → key 3 moves 1 → 2 | `{1=1, 3=3}` | `{1→{}, 2→{1,3}}` | 1 | `3` |\n\nNote step 3: key `1` moved *out* of bucket 1, but bucket 1 still holds key `2`, so\n`minFreq` stays at 1. It only moves up when the whole lowest bucket becomes empty.\n\n### Tie break — two keys with the same frequency\n\n`capacity 2`, commands `put 1 1`, `put 2 2`, `put 3 3`:\n\n| Step | Command | Buckets before | Action | Buckets after | Evicted |\n|---:|---|---|---|---|---|\n| 1 | `put 1 1` | `{}` | insert key 1 | `{1→{1}}` | — |\n| 2 | `put 2 2` | `{1→{1}}` | insert key 2 | `{1→{1,2}}` | — |\n| 3 | `put 3 3` | `{1→{1,2}}` | evict head of bucket 1 | `{1→{3}}` | key **1** (inserted first ⇒ least recently used) |\n\n## Java Solution\n\nSee [`LFUCache.java`](./LFUCache.java).\n\n```java\npublic void put(int key, int value) {\n    if (capacity == 0) {\n        return;\n    }\n    Node node = cache.get(key);\n    if (node != null) {                 // update: promote to the next frequency\n        node.value = value;\n        touch(node);\n        return;\n    }\n    if (cache.size() >= capacity) {\n        evict();                        // head of the lowest bucket\n    }\n    node = new Node(key, value);\n    cache.put(key, node);\n    bucket(1).add(node);\n    minFreq = 1;\n}\n\nprivate void touch(Node node) {\n    int freq = node.freq;\n    LinkedHashSet<Node> current = bucket(freq);\n    current.remove(node);\n    if (freq == minFreq && current.isEmpty()) {\n        minFreq = freq + 1;             // the lowest bucket disappeared\n    }\n    node.freq = freq + 1;\n    bucket(node.freq).add(node);\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) per `get`/`put` | hash map lookups plus O(1) set insert/remove |\n| **Space** | O(capacity) | one node per entry plus one bucket per distinct frequency |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"How would you find the least frequently used key in O(n)?"* → keep a frequency map\n  and scan for the minimum; that is the naive version of this problem.\n- *"What if frequencies should decay over time?"* → keep a sliding-window count per key\n  (like an LFU with a TTL), often called an "LFU with aging" or "windowed LFU".\n- *"Why not just use a priority queue by frequency?"* → the heap changes on every hit, so\n  `get` would be O(log n) and promoting a key needs a lazy-deletion hack.\n- *"How does Redis do it?"* → Redis uses an approximated LFU: an 8-bit counter with a\n  logarithmic increment and random sampling, which is O(1) and needs no global ordering.\n\n**Common mistakes:**\n- ❌ Evicting the *most* recently used node of the lowest bucket — the tie break is\n  wrong.\n- ❌ Forgetting to move `minFreq` up when the lowest bucket becomes empty → the next\n  eviction looks in an empty bucket and crashes.\n- ❌ Using a `HashSet` for the bucket → the iteration order is undefined, so the "least\n  recently used" tie break is lost. `LinkedHashSet` is the right tool.\n- ❌ Not incrementing the frequency on a `get` — only on a `put`.\n\n**How to narrate:**\n> "LFU is LRU with a different ordering rule. I\'ll keep a map from key to node, a map\n> from frequency to an insertion-ordered set of nodes, and a pointer to the lowest\n> frequency in use. A hit moves a node one bucket up; an insertion always starts at\n> frequency 1; and eviction takes the first node of the lowest bucket — the bucket is\n> ordered by recency, so that handles the tie break for free. All of it is O(1)."\n\n## Related Problems\n\n- [LRU Cache — LeetCode 146](./LRUCache.md) — the simpler eviction rule\n- [Design HashMap — LeetCode 706](./DesignHashMap.md) — the hash map half of this problem\n- [Rate Limiter](./RateLimiter.md) — another sliding-window eviction rule\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};