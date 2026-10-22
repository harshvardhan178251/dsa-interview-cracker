var e=`design.LRUCache`,t=`package com.dsa.design;

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
                out.append(cache.get(key)).append('\\n');
            }
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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

    public Main(int capacity) {
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
`,r=`
# LRU Cache — LeetCode 146

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · HashMap · Doubly linked list |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn, Netflix, Airbnb |

## Problem Statement

Design a cache that stores at most \`capacity\` key/value pairs.

- \`put(key, value)\` inserts or updates a pair. If the cache is full, the **least recently
  used** entry is evicted to make room.
- \`get(key)\` returns the value for the key, or \`-1\` when the key is not in the cache.
- Both operations must run in **O(1)**.

"Recently used" means *recently touched*: a \`get\` refreshes an entry exactly like a \`put\`
does.

## Input Format

\`\`\`
capacity c
put k v
get k
...
\`\`\`

- \`capacity c\` — the maximum number of entries (always the first line; a bare integer is
  accepted too).
- \`put k v\` — insert or update the pair.
- \`get k\` — read the pair.

The program prints one line per \`get\`: the cached value, or \`-1\` on a miss.

## Sample Input

\`\`\`
capacity 2
put 1 1
put 2 2
get 1
put 3 3
get 2
\`\`\`

## Expected Output

\`\`\`
1
-1
\`\`\`

\`get 1\` hits (value \`1\`). \`put 3 3\` has to evict something — key \`2\` is now the least
recently used entry — so \`get 2\` misses.

## Approach — HashMap + doubly linked list

Two data structures, one job each:

- a **HashMap** \`key → node\` gives O(1) lookup of an entry;
- a **doubly linked list** ordered *most recently used first* gives O(1) recency
  manipulation: moving a node to the front and removing the last node are both pointer
  swaps.

\`\`\`
head <-> [3] <-> [1] <-> [2] <-> tail      most recent .......... least recent
         ^                              ^
      new entry                   eviction candidate
\`\`\`

Two sentinel nodes (\`head\`, \`tail\`) mean there is never a "first node" or "last node"
special case — the list is never empty in the structural sense.

Every operation is the same three-step recipe:

1. **Look up** the node in the map. Missing → miss (\`get\`) or insert (\`put\`).
2. **Unlink** the node from its current position.
3. **Relink** it right after \`head\`.

Eviction is simply "unlink \`tail.prev\` and remove it from the map".

**Why not a plain \`LinkedHashMap\`?** Java's \`LinkedHashMap\` with \`accessOrder = true\`
does exactly this, but the interview question is about *building* it. In production you
would of course use \`LinkedHashMap\` (or Caffeine) — say that out loud.

## Dry Run

Input: \`capacity = 2\`, commands \`put 1 1\`, \`put 2 2\`, \`get 1\`, \`put 3 3\`, \`get 2\`

The list is shown most recent first. \`map\` is the key → node index.

| Step | Command | Node | \`map\` before | List before | Action | \`map\` after | List after | Output |
|---:|---|---|---|---|---|---|---|---|
| 1 | \`put 1 1\` | new(1) | \`{}\` | \`head ↔ tail\` | insert after head | \`{1→n1}\` | \`head ↔ [1] ↔ tail\` | — |
| 2 | \`put 2 2\` | new(2) | \`{1→n1}\` | \`head ↔ [1] ↔ tail\` | insert after head | \`{1→n1, 2→n2}\` | \`head ↔ [2] ↔ [1] ↔ tail\` | — |
| 3 | \`get 1\` | n1 | \`{1→n1, 2→n2}\` | \`head ↔ [2] ↔ [1] ↔ tail\` | hit → unlink n1, relink after head | \`{1→n1, 2→n2}\` | \`head ↔ [1] ↔ [2] ↔ tail\` | \`1\` |
| 4 | \`put 3 3\` | new(3) | \`{1→n1, 2→n2}\` | \`head ↔ [1] ↔ [2] ↔ tail\` | insert after head → size 3 > 2 → evict \`tail.prev\` = n2 | \`{1→n1, 3→n3}\` | \`head ↔ [3] ↔ [1] ↔ tail\` | — |
| 5 | \`get 2\` | — | \`{1→n1, 3→n3}\` | \`head ↔ [3] ↔ [1] ↔ tail\` | miss | unchanged | unchanged | \`-1\` |

The eviction victim at step 4 is key \`2\`: it was inserted at step 2 and never touched
again, while key \`1\` was refreshed at step 3.

## Java Solution

See [\`LRUCache.java\`](./LRUCache.java).

\`\`\`java
public void put(int key, int value) {
    Node node = index.get(key);
    if (node != null) {                 // update: refresh recency
        node.value = value;
        moveToFront(node);
        return;
    }
    if (capacity == 0) {
        return;
    }
    node = new Node(key, value);
    index.put(key, node);
    insertAfterHead(node);
    if (index.size() > capacity) {      // evict the least recently used entry
        Node victim = tail.prev;
        remove(victim);
        index.remove(victim.key);
    }
}

private void moveToFront(Node node) {
    remove(node);
    insertAfterHead(node);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per \`get\`/\`put\` | one map lookup + a constant number of pointer writes |
| **Space** | O(capacity) | one node per entry plus the map |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the cache is shared by several threads?"* → a \`ConcurrentHashMap\` plus a
  \`ReentrantLock\` around the list manipulation, or a striped lock; the invariant is that
  the map and the list must be changed under the same lock.
- *"What if \`get\` must not change the order?"* → that is FIFO / clock replacement, and
  the \`get\` no longer touches the list.
- *"How would you make it distributed?"* → keep the eviction order in a shared ordered
  structure (Redis \`allkeys-lru\` uses an approximated LRU with random sampling).
- *"How would you add a TTL?"* → store the expiry next to the value and treat expired
  entries as eviction candidates.

**Common mistakes:**
- ❌ Forgetting that \`get\` must refresh the recency — the classic bug that turns the
  cache into FIFO.
- ❌ Evicting the *head* instead of the tail of the list.
- ❌ Leaving the map entry behind when the node is evicted → memory leak and a stale
  "hit" that returns the wrong value.
- ❌ Not handling \`capacity == 0\`.

**How to narrate:**
> "I need O(1) lookup and O(1) recency updates, so I'll combine a hash map with a
> doubly linked list. The map gives me the node for a key; the list keeps the nodes in
> recency order with the most recent first. Every touch is 'unlink and relink at the
> front', and eviction is 'drop the last node'. With sentinel nodes I don't need any
> boundary special cases."

## Related Problems

- [LFU Cache — LeetCode 460](./LFUCache.md) — same shape, but the eviction order is by frequency
- [Design HashMap — LeetCode 706](./DesignHashMap.md) — the hash map half of this problem
- [Design Underground System — LeetCode 373](./DesignUndergroundSystem.md) — aggregation instead
  of eviction
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};