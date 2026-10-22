var e=`design.DesignHashMap`,t=`package com.dsa.design;

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
                out.append(map.get(key)).append('\\n');
            } else if ("remove".equals(command)) {
                int key = fs.nextInt();
                map.remove(key);
            }
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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

    public Main() {
        this(1024);
    }

    public Main(int bucketCount) {
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
        Main map = new Main();

        StringBuilder out = new StringBuilder();
        while (fs.hasNext()) {
            String command = fs.next();
            if ("put".equals(command)) {
                int key = fs.nextInt();
                int value = fs.nextInt();
                map.put(key, value);
            } else if ("get".equals(command)) {
                int key = fs.nextInt();
                out.append(map.get(key)).append('\\n');
            } else if ("remove".equals(command)) {
                int key = fs.nextInt();
                map.remove(key);
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
`,r='\n# Design HashMap — LeetCode 706\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Design · Hashing · Separate chaining |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |\n\n## Problem Statement\n\nImplement a hash map from scratch. It must support\n\n- `put(key, value)` — insert a pair or overwrite the value of an existing key,\n- `get(key)` — return the value, or `-1` when the key is absent,\n- `remove(key)` — delete the key; removing an absent key does nothing,\n\nall in **O(1)** average time, without using `java.util.HashMap`.\n\n## Input Format\n\n```\nput k v\nget k\nremove k\n...\n```\n\nEach line is one command. The program prints one line per `get`.\n\n## Sample Input\n\n```\nput 1 1\nput 2 2\nget 1\nget 3\nremove 2\nget 2\n```\n\n## Expected Output\n\n```\n1\n-1\n-1\n```\n\n`get 1` hits with value `1`. `get 3` misses. After `remove 2` the key `2` is gone, so\nthe last `get 2` misses too.\n\n## Approach — array of buckets with separate chaining\n\nA hash map is two things glued together:\n\n1. **A hash function** that turns a key into a bucket index. Here it is\n   `(key & 0x7fffffff) % buckets.length`. The mask matters: `Math.abs(key)` throws for\n   `Integer.MIN_VALUE`, while the mask maps it to bucket `0`.\n2. **A bucket** that can hold several entries with the same index. Each bucket is a\n   singly linked list of entries.\n\n```\nbuckets[0] → (1,1) → (5,9) → null\nbuckets[1] → (2,2) → null\nbuckets[2] → null\n```\n\n`put` walks the chain looking for the key; if it is not there, the new entry is pushed\nonto the front of the chain (O(1), no tail pointer needed). `remove` walks the chain\nkeeping the previous entry so it can unlink the match.\n\nWith 1024 buckets and a handful of keys, every chain has length 0 or 1, so every\noperation touches exactly one node.\n\n## Dry Run\n\nInput: `put 1 1`, `put 2 2`, `get 1`, `get 3`, `remove 2`, `get 2`. Bucket index =\n`(key & 0x7fffffff) % 1024`, so keys `1`, `2`, `3` all live in their own bucket.\n\n| Step | Command | Bucket touched | Chain before | Action | Chain after | Result |\n|---:|---|---|---|---|---|---|\n| 1 | `put 1 1` | `b[1]` | `null` | push `(1,1)` | `(1,1) → null` | — |\n| 2 | `put 2 2` | `b[2]` | `null` | push `(2,2)` | `(2,2) → null` | — |\n| 3 | `get 1` | `b[1]` | `(1,1) → null` | walk: key matches | unchanged | `1` |\n| 4 | `get 3` | `b[3]` | `null` | chain empty | unchanged | `-1` |\n| 5 | `remove 2` | `b[2]` | `(2,2) → null` | key matches → unlink, `b[2] = null` | `null` | — |\n| 6 | `get 2` | `b[2]` | `null` | chain empty | unchanged | `-1` |\n\n### Collision — two keys in one bucket\n\nWith 2 buckets, keys `1` and `3` share `b[1]`:\n\n| Step | Command | Chain before | Action | Chain after | Result |\n|---:|---|---|---|---|---|\n| 1 | `put 1 1` | `null` | push `(1,1)` | `(1,1) → null` | — |\n| 2 | `put 3 3` | `(1,1) → null` | walk: key `1` ≠ `3` → push `(3,3)` | `(3,3) → (1,1) → null` | — |\n| 3 | `get 1` | `(3,3) → (1,1) → null` | walk past `(3,3)`, key matches | unchanged | `1` |\n| 4 | `remove 1` | `(3,3) → (1,1) → null` | previous = `(3,3)` → unlink | `(3,3) → null` | — |\n\n## Java Solution\n\nSee [`DesignHashMap.java`](./DesignHashMap.java).\n\n```java\npublic void put(int key, int value) {\n    int index = indexOf(key);\n    for (Entry entry = buckets[index]; entry != null; entry = entry.next) {\n        if (entry.key == key) {\n            entry.value = value;          // overwrite in place\n            return;\n        }\n    }\n    Entry fresh = new Entry(key, value);\n    fresh.next = buckets[index];          // push onto the front of the chain\n    buckets[index] = fresh;\n    size++;\n}\n\npublic void remove(int key) {\n    int index = indexOf(key);\n    Entry previous = null;\n    for (Entry entry = buckets[index]; entry != null; entry = entry.next) {\n        if (entry.key == key) {\n            if (previous == null) {\n                buckets[index] = entry.next;\n            } else {\n                previous.next = entry.next;\n            }\n            size--;\n            return;\n        }\n        previous = entry;\n    }\n}\n\nprivate int indexOf(int key) {\n    return (key & 0x7fffffff) % buckets.length;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) average per operation | one bucket is touched; the chain has O(n / buckets) entries |\n| **Space** | O(n + buckets) | one entry per key plus the bucket array |\n\n**Worst case?** O(n) per operation when every key collides into one bucket. Real hash\nmaps defend against this with treeified buckets (Java 8+) or randomised hashing.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"How would you resize it?"* → keep a load factor (e.g. 0.75); when `size` exceeds\n  `buckets.length * 0.75`, double the array and rehash every key.\n- *"How do you handle `Integer.MIN_VALUE`?"* → `Math.abs` overflows; use `key & 0x7fffffff`\n  or `Math.floorMod(key, buckets.length)`.\n- *"What about open addressing instead of chaining?"* → linear probing with a load factor\n  below 0.7 and tombstones for deletions.\n- *"How would you make it thread safe?"* → a `ConcurrentHashMap`, or a lock per bucket\n  segment.\n\n**Common mistakes:**\n- ❌ Using `Math.abs(key) % n` → throws for `Integer.MIN_VALUE`.\n- ❌ Comparing keys with `==` on boxed `Integer`s → use `int` keys, or `.equals()`.\n- ❌ Forgetting the `previous` pointer in `remove` and corrupting the chain.\n- ❌ Forgetting to overwrite the value when the key already exists.\n\n**How to narrate:**\n> "A hash map is a hash function plus a container per hash value. I\'ll use an array of\n> buckets and separate chaining with a linked list per bucket. The index is the key\n> masked and modulo the bucket count — masking avoids the `Math.abs` overflow for\n> `MIN_VALUE`. Lookup, insert and delete each walk exactly one chain, so they\'re O(1) on\n> average."\n\n## Related Problems\n\n- [LRU Cache — LeetCode 146](./LRUCache.md) — a hash map plus an eviction list\n- [LFU Cache — LeetCode 460](./LFUCache.md) — a hash map plus frequency buckets\n- [Two Sum — LeetCode 1](../arrays/TwoSum.java) — the user of\n  this structure\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};