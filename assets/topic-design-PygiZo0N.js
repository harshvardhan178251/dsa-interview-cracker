var e=`topic:design`,t=`
# Design problems — concept notes

## The mental model

A design problem is not "implement a class". It is:

1. **Clarify the contract** — the exact method signatures and their semantics.
2. **Choose the data structures** — and justify each choice.
3. **State the invariants** — what is true at every moment.
4. **Meet the complexity requirements** — say them before you start.
5. **Handle the edge cases** — empty, single element, full, duplicate keys.

**The interviewer's questions are always the same:**
- "What are the time complexities of each operation?"
- "What if the capacity changes?"
- "How would you make this thread-safe?"
- "How would you make this distributed?"
- "What is the memory cost?"

---

## The design patterns behind the classics

### 1. Composite structure — two structures working together

**LRU cache = hash map + doubly linked list.**

| Requirement | Structure | Why |
|---|---|---|
| Fast lookup by key | \`HashMap\` | O(1) |
| Fast removal of an arbitrary node | Doubly linked list | O(1), given the node |
| Fast eviction of the oldest | The list's tail | O(1) |
| Move a node to most-recent | Unlink + relink | O(1) |

**The pattern:** the map stores the *node* (not just the value), so the list surgery is
O(1). This is the single most reusable design idea.

**The sentinel trick:** two dummy nodes (head and tail) that are never removed, which
removes all null-checking from the unlink operation.

### 2. Monotonic state — a running aggregate

**Min stack = two stacks, or one stack plus a running minimum.**

**Moving average = a deque plus a running sum.**

**Hit counter = a deque of timestamps plus a running count.**

**The pattern:** keep the aggregate updated incrementally instead of recomputing it, and
use a structure that supports removing the oldest element (a deque, or a ring buffer).

### 3. Bucketed counters — grouping by a derived key

**LFU cache = a map of frequency → list of keys, plus a map of key → frequency.**

**The pattern:** maintain a hierarchy so that "the least frequently used" is O(1).

### 4. State machine — explicit legal transitions

**Moving average, browser history, text editor.**

**The pattern:** represent the legal states as an enum and reject invalid transitions
explicitly, rather than letting the fields drift into an invalid combination.

---

## LRU cache — the canonical design

\`\`\`java
public class LruCache {
    private static final class Node {
        int key, value;
        Node prev, next;
        Node(int key, int value) { this.key = key; this.value = value; }
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
        if (node == null) return -1;
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
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
        Node node = new Node(key, value);
        map.put(key, node);
        addToFront(node);
    }

    private void moveToFront(Node node) { remove(node); addToFront(node); }

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
\`\`\`

**The invariants:**
1. \`map\` and the list contain exactly the same nodes.
2. The list is ordered by recency: MRU at the head, LRU before the tail.
3. \`map.size() ≤ capacity\`.

**The \`get\` operation must reorder.** That is the bug that fails the question.

**The \`put\` on an existing key must update the value AND reorder** — two separate
mistakes people make.

**Why \`Integer\` and not \`null\` for "not found":** a stored \`null\` would be
indistinguishable from a miss.

---

## LFU cache — the harder variant

**LFU evicts the least frequently used; ties are broken by least recently used.**

\`\`\`java
public class LfuCache {
    private final int capacity;
    private final Map<Integer, Node> nodes = new HashMap<>();
    private final Map<Integer, LinkedHashSet<Integer>> frequencyBuckets = new HashMap<>();
    private int minFrequency = 0;
}
\`\`\`

**Where each node lives:** in a bucket keyed by its frequency. A bucket is a
\`LinkedHashSet\` so that the least-recently-used key within a bucket is first.

**The operations:**

\`\`\`java
public int get(int key) {
    Node node = nodes.get(key);
    if (node == null) return -1;
    bump(node);                 // move to the next frequency bucket
    return node.value;
}

private void bump(Node node) {
    LinkedHashSet<Integer> bucket = frequencyBuckets.get(node.frequency);
    bucket.remove(node.key);
    if (bucket.isEmpty()) {
        frequencyBuckets.remove(node.frequency);
        if (minFrequency == node.frequency) minFrequency++;
    }
    node.frequency++;
    frequencyBuckets.computeIfAbsent(node.frequency, k -> new LinkedHashSet<>()).add(node.key);
}
\`\`\`

**The eviction:**

\`\`\`java
private void evict() {
    LinkedHashSet<Integer> bucket = frequencyBuckets.get(minFrequency);
    Integer victim = bucket.iterator().next();     // the least recently used in the bucket
    bucket.remove(victim);
    nodes.remove(victim);
    if (bucket.isEmpty()) {
        frequencyBuckets.remove(minFrequency);
        minFrequency++;                            // the minimum may have moved up
    }
}
\`\`\`

**The \`minFrequency\` bookkeeping is the fiddly part** — it must be incremented when the
minimum bucket empties, and it is the thing that makes eviction O(1) instead of O(n).

**The alternative, simpler design:** a \`TreeMap<Integer, LinkedHashSet<Integer>>\` keyed
by frequency, where \`firstKey()\` gives the minimum frequency bucket directly. Then you
do not need to track \`minFrequency\` at all. **This is simpler and O(log n) instead of
O(1)** — a very reasonable trade, and worth offering.

---

## Min stack and min queue

**Min stack:** push the value and the current minimum together.

\`\`\`java
public void push(int val) {
    stack.push(val);
    if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);
}
public int getMin() { return minStack.peek(); }
\`\`\`

**Note \`<=\` not \`<\`** — with \`<\`, pushing a value equal to the current minimum would
skip it, and then popping that value would leave the wrong minimum.

**Min queue:** two stacks (the "queue from stacks" trick) with a min-stack for the
out-stack.

---

## Snapshot array (LC 1146)

**\`snap()\` freezes the current state; later writes are invisible to that snapshot.**

**The trick: store, per index, the history of (value, snapshotId) pairs.**

\`\`\`java
public class SnapshotArray {
    private final List<Map<Integer, Integer>> history;   // index → (snapId → value)
    private int snapId = 0;

    public void set(int index, int val) {
        history.get(index).put(snapId, val);
    }

    public int get(int index, int snapId) {
        Map<Integer, Integer> versions = history.get(index);
        int answer = 0;
        for (Map.Entry<Integer, Integer> entry : versions.entrySet()) {
            if (entry.getKey() <= snapId) {
                answer = entry.getValue();       // the latest version at or before snapId
            }
        }
        return answer;
    }
}
\`\`\`

**The versions must be stored in insertion order** — a \`TreeMap\` gives you that
naturally.

**Why not a copy per snapshot?** That is O(n) per snapshot — the whole point of the
design is to avoid it.

---

## Browser history (LC 348)

**A doubly linked list of history entries plus a stack of "future" entries.**

\`\`\`java
public String back(int steps) {
    while (steps > 0 && current != null && current.prev != null) {
        current = current.prev;
        steps--;
    }
    return current == null ? "" : current.url;
}

public void visit(String url) {
    // a new visit destroys the forward history
    while (!futureStack.isEmpty()) futureStack.pop();
    current = new Entry(url, current);
}
\`\`\`

**The key rule: visiting a new page clears the forward history.** That is the browser
behaviour and the thing people forget.

---

## Moving average (LC 346)

\`\`\`java
public class MovingAverage {
    private final Deque<Integer> window = new ArrayDeque<>();
    private final int size;
    private long sum = 0;

    public double next(int val) {
        window.addLast(val);
        sum += val;
        if (window.size() > size) {
            sum -= window.pollFirst();
        }
        return (double) sum / window.size();
    }
}
\`\`\`

**A deque plus a running sum.** O(1) per operation.

**The subtlety:** the average must be over the *actual* window size, which is smaller
than \`size\` until the window fills. Dividing by \`size\` unconditionally is a bug.

---

## Hit counter (LC 362)

**Count hits in the last 5 minutes.**

\`\`\`java
public class HitCounter {
    private final Deque<Integer> hits = new ArrayDeque<>();

    public int getHits(int minutes) {
        int cutoff = (int) (System.currentTimeMillis() / 1000) - minutes * 60;
        while (!hits.isEmpty() && hits.peekFirst() <= cutoff) {
            hits.pollFirst();
        }
        return hits.size();
    }
}
\`\`\`

**A deque of timestamps, pruned on read.** Simple and correct.

**The production version** would bucket the counts per minute so the memory is O(minutes)
rather than O(hits).

---

## The design questions every interviewer asks

| Question | What a strong answer says |
|---|---|
| "What are the complexities?" | For **every** method, stated before you wrote them |
| "What if the capacity changes?" | Rebuild, or use a dynamic structure; state the cost |
| "How would you make it thread-safe?" | Name the lock; note which methods need the write lock (not just \`get\`!) |
| "How would you distribute it?" | Shard by key; the global semantics become approximate |
| "What's the memory cost?" | Per-entry overhead plus the fixed structures |
| "What if the keys are unbounded?" | The map grows forever — need eviction or a bound |
| "How would you test this?" | Property-based tests: the invariants hold after every operation |

**The LRU thread-safety answer is worth getting right:** a \`ReadWriteLock\` does **not**
help, because \`get\` mutates the recency order. Every operation needs the **write** lock.

---

## Common traps

| Trap | Why it bites |
|---|---|
| \`get\` not reordering in an LRU | The eviction order is wrong |
| Not updating the value on an existing key | Stale data |
| Forgetting to remove the evicted key from the map | Memory leak and wrong answers |
| Using \`null\` as the "not found" marker | Ambiguous with a stored null |
| Using \`<\` instead of \`<=\` in a min-stack | The minimum is wrong after a pop |
| Not clearing the forward history on \`visit\` | Wrong browser behaviour |
| Dividing by the fixed capacity instead of the actual window size | Wrong average |
| Assuming a \`ReadWriteLock\` makes \`get\` safe in an LRU | \`get\` mutates |
| Unbounded growth in a counter or cache | Memory leak |
| Not stating the per-operation complexity | The interviewer has to ask |

---

## How to crack it in an interview

1. **Restate the contract** and the required complexities before coding.
2. **Name the data structures and justify each one.** "A hash map for O(1) lookup by key
   and a doubly linked list for O(1) removal and eviction."
3. **State the invariants.** "The map and the list contain the same nodes, and the list
   is ordered by recency."
4. **Handle the edge cases** — empty, single, full, duplicate key, update of an existing
   key.
5. **Answer the follow-ups** — thread safety, distribution, memory, capacity changes.
6. **Mention the alternatives** — \`LinkedHashMap\` with access order, a \`TreeMap\`-based
   LFU with O(log n) eviction.
`,n={id:e,body:t};export{t as body,n as default,e as id};