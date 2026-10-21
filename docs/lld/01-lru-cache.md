---
title: LLD — LRU cache
order: 1
summary: The classic low-level design question. HashMap plus doubly linked list, get and put both in O(1), with the sentinel-node trick and the thread-safety variant.
---

# LLD — LRU Cache

*The most-asked low-level design question there is. If you get one right, get this one
right.*

## Requirements

- `get(key)` → the value, or `-1`.
- `put(key, value)` → insert or update.
- When the cache is full, evict the **least recently used** entry.
- Both operations in **O(1)**.
- `get` must also count as a "use" — it moves the entry to most-recently-used.

## The design

**Two structures:**

1. A `HashMap` from key → node, for O(1) lookup.
2. A **doubly linked list** in recency order, for O(1) removal and O(1) eviction of the
   tail.

```
HashMap:   key ──────────────► Node
                                 │  value
                                 ▼
List:      head ◄──► (MRU) ◄──► ... ◄──► (LRU) ◄──► tail
           sentinel                evicted when full
```

**Why a doubly linked list and not an array?** An array gives O(n) removal. A singly linked
list gives O(n) removal of an arbitrary node (you must find its predecessor). A doubly
linked list gives O(1) removal because every node knows its neighbours.

**Why a `HashMap` and not a tree?** A `LinkedHashMap` with access order is the JDK
answer, but the interviewer usually wants to see it built by hand.

## The sentinel trick

Use two dummy nodes — `head` (before the MRU) and `tail` (after the LRU) — that are
**never removed**. Every removal then becomes "unlink the node between head and its
successor", with no null checks:

```java
private void remove(Node node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
}

private void addToFront(Node node) {
    node.next = head.next;
    node.prev = head;
    head.next.prev = node;
    head.next = node;
}
```

Without sentinels you need `if (node.prev != null)` and `if (node.next != null)` on every
operation, and the eviction case (`remove tail.prev`) becomes awkward. The sentinels
remove the null handling entirely.

## The implementation

```java
public class LruCache {

    private static final class Node {
        int key;
        int value;
        Node prev;
        Node next;

        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0);   // sentinel
    private final Node tail = new Node(0, 0);   // sentinel

    public LruCache(int capacity) {
        if (capacity <= 0) throw new IllegalArgumentException("capacity must be positive");
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = map.get(key);
        if (node == null) {
            return -1;
        }
        moveToFront(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node existing = map.get(key);
        if (existing != null) {
            existing.value = value;
            moveToFront(existing);
            return;
        }
        if (map.size() == capacity) {
            Node lru = tail.prev;               // the least recently used real node
            remove(lru);
            map.remove(lru.key);
        }
        Node node = new Node(key, value);
        map.put(key, node);
        addToFront(node);
    }

    private void moveToFront(Node node) {
        remove(node);
        addToFront(node);
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToFront(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
}
```

### Why the eviction uses `tail.prev`

`tail` is a sentinel, so `tail.prev` is the last **real** node — the least recently used.
Because sentinels are never removed, `tail.prev` is never null.

## The dry run

Capacity 2, operations: `put(1,1)`, `put(2,2)`, `get(1)`, `put(3,3)`, `get(2)`.

| Step | Operation | List (head → tail) | Map | Result |
|---:|---|---|---|---|
| 0 | init | `head ↔ tail` | `{}` | — |
| 1 | `put(1,1)` | `head ↔ (1:1) ↔ tail` | `{1→(1:1)}` | — |
| 2 | `put(2,2)` | `head ↔ (2:2) ↔ (1:1) ↔ tail` | `{1,2}` | — |
| 3 | `get(1)` | `head ↔ (1:1) ↔ (2:2) ↔ tail` | `{1,2}` | **1** — 1 moves to front (it was used) |
| 4 | `put(3,3)` | full! evict `(2:2)` → `head ↔ (3:3) ↔ (1:1) ↔ tail` | `{1,3}` | — |
| 5 | `get(2)` | unchanged | `{1,3}` | **-1** — 2 was evicted |

Step 3 is the one that matters: **`get` counts as a use.** A `get` that does not reorder
is the most common bug in this question.

## Complexity

| Operation | Time | Why |
|---|---|---|
| `get` | O(1) | One hash lookup + constant list surgery |
| `put` | O(1) | One hash lookup + constant list surgery |

Space is O(capacity).

## The JDK shortcut

```java
new LinkedHashMap<>(capacity, 0.75f, true)   // true = access order
```

With `accessOrder = true`, `get` moves the entry to the end (most recent). Then the
LRU entry is the first key returned by `iterator()`. That is a five-line solution — and
it is the right answer **if** the interviewer allows it. Offer it, then offer the manual
implementation, because the manual one is what they are testing.

## Follow-ups

**"Make it thread-safe."**
Use `Collections.synchronizedMap`? No — that is not enough, because `get` mutates the
list. Use a `ReadWriteLock` around every operation, or `ConcurrentHashMap` plus a
synchronized list (but then `get` and `put` are not atomic together). The cleanest answer
is a single lock around all operations:

```java
private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
```

Every operation takes the write lock, because even `get` mutates the recency order.

**"What if capacity changes?"**
Rebuild the whole cache with the new capacity, re-inserting in the current recency order.
O(n), but rare.

**"How would you make it distributed?"**
Each node owns a shard of the key space (hash the key → shard). LRU is per-shard, so the
global LRU is approximate. This is exactly how Redis's `allkeys-lru` works.

**"How would you make it persistent across restarts?"**
Write the recency order to disk periodically, or use a log-structured store where
insertion order approximates recency.

**"What about an LFU cache?"**
Same structure, but instead of a recency list you track a frequency count per key, and
the eviction picks the lowest frequency — with ties broken by oldest access. LFU is
usually implemented with a list of frequency buckets, each holding an ordered set.

## Common mistakes

- ❌ `get` does not update recency. This is the bug that fails the question.
- ❌ Forgetting to remove the evicted key from the `HashMap` — a leak, and a wrong answer
  on a later `get`.
- ❌ Not updating the value when the key already exists.
- ❌ Removing the head/tail sentinels.
- ❌ Using `null` as the "not found" marker, so a stored `null` value is indistinguishable
  from a miss. Use a sentinel value like `-1`, or `Optional`.
- ❌ Assuming `capacity` is positive and crashing on `capacity = 0`.
