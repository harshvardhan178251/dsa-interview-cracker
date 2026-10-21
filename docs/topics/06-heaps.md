---
title: Heaps and priority queues — concept notes
order: 6
summary: The heap invariant, top-K selection, the two-heap median, and when a heap beats sorting — plus the streaming problems that are asked constantly.
---

# Heaps and priority queues — concept notes

## The mental model

A **binary heap** is a complete binary tree stored in an array, where every node is
greater than (max-heap) or less than (min-heap) its children.

```
        9
      /   \
     7     8
    / \   / \
   5   6 3   2      ← array: [9, 7, 8, 5, 6, 3, 2]
```

**The array layout is the key:** for index `i`, the parent is `(i-1)/2`, the left child is
`2i+1`, the right child is `2i+2`.

**The heap property:** a node is always ≥ (max-heap) or ≤ (min-heap) its children. The
tree is *mostly* sorted, but not fully — which is why `heap[0]` is the extreme but
`heap[1]` is not the second largest.

**In Java:**

```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
PriorityQueue<Task> byDeadline = new PriorityQueue<>((a, b) -> a.deadline - b.deadline);
```

**`PriorityQueue` is a binary heap, not a sorted list.** `peek()` gives the extreme
element in O(1); `poll()` removes it in O(log n).

---

## The operations

| Operation | Time | Note |
|---|---|---|
| `peek` | O(1) | The root |
| `poll` | O(log n) | Remove the root, sift down |
| `add` / `offer` | O(log n) | Append, sift up |
| Constructor from a collection | O(n) | Better than n×O(log n) |
| `size` | O(1) | |
| Contains | O(n) | Linear — the heap is not sorted |

**Building a heap in O(n)** matters for the streaming problems. `new PriorityQueue<>(collection)`
is O(n); adding n elements one at a time is O(n log n).

**`PriorityQueue` does not allow null** — it uses `null` as the "no children" marker.

---

## The shape of the answer: size K

Nearly every heap problem has the same shape:

> "I need the K largest / smallest elements of a stream, but the stream is huge."

**Keep a heap of size K, not of size n.** Space O(K) instead of O(n).

| You want | Heap type | What you keep |
|---|---|---|
| K largest | min-heap | The K largest seen so far; the root is the smallest of them |
| K smallest | max-heap | The K smallest seen so far; the root is the largest of them |

**The counter-intuitive part:** to find the K largest you use a **min**-heap, because you
want to be able to evict the *smallest* of your current top-K when a bigger one arrives.

```java
// Kth largest element of an array
PriorityQueue<Integer> heap = new PriorityQueue<>();   // min-heap
for (int x : nums) {
    heap.add(x);
    if (heap.size() > k) heap.poll();
}
return heap.peek();
```

**Time: O(n log k).** Space: O(k). Compare to sorting: O(n log n) time, O(n) space. For
small K the heap wins decisively, and for a **stream** (where you cannot sort because you
never see all the data) the heap is the only option.

**The dry run should show the heap contents after each element.** That is the whole
content of the problem.

---

## Top K frequent elements (LC 347)

Two phases:

1. **Count** with a hash map: O(n).
2. **Select** the K most frequent with a heap of size K.

```java
Map<Integer, Integer> counts = new HashMap<>();
for (int x : nums) counts.merge(x, 1, Integer::sum);

PriorityQueue<Map.Entry<Integer, Integer>> heap =
        new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());   // min-heap by count
for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
    heap.add(e);
    if (heap.size() > k) heap.poll();
}
```

**Alternative: bucket sort by frequency** — O(n) time, and it beats the heap for large n.

```java
// frequencies are in 1..n, so bucket them
List<Integer>[] buckets = new List[n + 1];
for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
    buckets[e.getValue()].add(e.getKey());
}
// walk buckets from the highest frequency down
```

**Mention both.** The bucket sort is the "optimal" answer and interviewers like hearing
it, but the heap is the one you will actually write.

---

## K closest elements (LC 658)

Two approaches:

**Binary search on the boundary** — find the split point, then take K elements from
around it. O(log n + k).

**A heap of size K** — keep the K closest seen so far. O(n log k).

```java
// max-heap of K elements, rooted at the largest of the K
PriorityQueue<Integer> heap = new PriorityQueue<>(Comparator.reverseOrder());
for (int x : arr) {
    heap.add(x);
    if (heap.size() > k) heap.poll();
}
```

**Why a max-heap?** Because you want to evict the *farthest* element when a closer one
arrives, and the farthest of your current K is the largest.

---

## The two-heap median

**Find the median from a data stream (LC 295).**

```
maxHeap (lower half)      minHeap (upper half)
        5                       8
      /   \                   /   \
     4     3                 9    10
```

**Invariants:**
1. `maxHeap.size() == minHeap.size()` or `maxHeap.size() == minHeap.size() + 1`.
2. Every element in `maxHeap` ≤ every element in `minHeap`.

```java
public void addNum(int num) {
    lower.offer(num);                       // max-heap
    upper.offer(lower.poll());              // min-heap
    if (upper.size() > lower.size()) {
        lower.offer(upper.poll());
    }
}

public double findMedian() {
    if (lower.size() > upper.size()) {
        return lower.peek();
    }
    return (lower.peek() + upper.peek()) / 2.0;
}
```

**The trick that makes it work:** always insert into `lower` first, then move its top to
`upper`. That guarantees the ordering invariant in one step, without comparisons.

**Why the median matters in interviews:** it is a streaming problem where you cannot
sort, and it tests whether you can maintain two structures in sync.

---

## Merge K sorted lists (LC 23)

**Use a heap of the list heads.**

```java
PriorityQueue<ListNode> heap =
        new PriorityQueue<>(Comparator.comparingInt(n -> n.val));

for (ListNode head : lists) {
    if (head != null) heap.add(head);
}

ListNode dummy = new ListNode(0);
ListNode tail = dummy;
while (!heap.isEmpty()) {
    ListNode node = heap.poll();
    tail.next = node;
    tail = tail.next;
    if (node.next != null) heap.add(node.next);
}
return dummy.next;
```

**Why a heap and not concatenate-and-sort?** Concatenating is O(N log N) with N the
total number of nodes. The heap is O(N log K) — K is the number of lists, which is
usually tiny.

**Time: O(N log K).** Space: O(K).

**K-way merge is the general form** and shows up in external sorting, log processing, and
merging time series.

---

## Task Scheduler (LC 621)

**Greedy with a max-heap.** The formula version:

```
max( (maxFrequency - 1) * (number of tasks with max frequency) + number of max tasks , n )
```

But the **heap simulation** is much easier to explain and to verify:

```java
PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
for (int f : frequencies) heap.add(f);

int idle = 0;
while (!heap.isEmpty()) {
    int size = heap.size();
    for (int i = 0; i < size; i++) {
        int f = heap.poll();
        if (--f > 0) heap.add(f);
    }
    idle += size - heap.size();   // the tasks that could not be placed
}
return tasks.length + idle;
```

**The reasoning:** arrange the most frequent tasks in rounds. Each round places at most
one instance of each distinct task. If there are fewer distinct tasks than the round
needs, fill the gaps with idle time — unless there are no more tasks to place.

**The greedy argument:** the most frequent task sets the number of rounds
(`maxFrequency`). Those rounds each need `maxFrequency - 1` separators, and the other
tasks with the same max frequency need one more separator each. That is exactly the
formula.

---

## Huffman / merging with a min-heap

**Merge K sorted files of different sizes so that the total cost is minimised.**

```java
PriorityQueue<Node> heap = new PriorityQueue<>(Comparator.comparingInt(n -> n.weight));
// repeatedly merge the two smallest
```

**The greedy argument:** merging the two smallest first is optimal. It is the same
argument as Huffman coding — you want the items that participate in the fewest merges to
be the smallest.

---

## Last Stone Weight II (LC 1049)

Turn it into a **subset-sum** problem: partition the stones into two groups whose sums
differ as little as possible. Answer = `total - 2 * (largest achievable subset ≤ total/2)`.

That is DP, not a heap — but it is usually grouped with the heap problems because the
naive approach (repeatedly smashing the two heaviest) is a greedy simulation.

**Mention that the greedy simulation is not always optimal** — it is the interesting part
of the problem.

---

## Java specifics

**Custom comparator:**

```java
PriorityQueue<Task> pq = new PriorityQueue<>((a, b) -> {
    int byDeadline = Integer.compare(a.deadline, b.deadline);
    return byDeadline != 0 ? byDeadline : Integer.compare(a.priority, b.priority);
});
```

**Never rely on the iteration order** of a `PriorityQueue` — it is not sorted. Use
`new ArrayList<>(pq)` and sort that if you need order.

**`PriorityQueue` with a `null` element throws.** Do not put nulls in.

**`Collections.reverseOrder()`** gives you a max-heap from a `PriorityQueue`.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Using a max-heap when you need a min-heap | The eviction logic inverts |
| Expecting `PriorityQueue` to iterate in order | It is not sorted |
| Putting `null` in a `PriorityQueue` | `NullPointerException` |
| Off-by-one in the K-th largest — evicting before adding | You lose the K-th element |
| Using a `Comparator` that is not a total order | `PriorityQueue` may misbehave |
| Assuming `contains` is O(1) | It is O(n) |
| Building the heap with n `add` calls when the constructor is available | O(n log n) instead of O(n) |
| Comparing `a.b - c.d` in a comparator | Integer overflow on large values — use `Integer.compare` |

---

## Complexity cheat sheet

| Operation | Time |
|---|---|
| `peek` | O(1) |
| `add` | O(log n) |
| `poll` | O(log n) |
| Build from a collection | O(n) |
| Top-K from a stream | O(n log k) time, O(k) space |
| Top-K by frequency | O(n + u log k), where u is the number of unique values |
| Merge K sorted lists | O(N log K) |
| Two-heap median | O(log n) per insert, O(1) per query |

---

## How to crack it in an interview

1. **Say the invariant** — "I keep a min-heap of size K containing the K largest elements
   seen so far". This sentence is the design.
2. **Say which heap type** and **why** — "a min-heap, because when a larger element
   arrives I need to evict the smallest of my current K".
3. **State the complexity** in terms of n and K, and compare it to sorting.
4. **Say whether the input is a stream or a collection** — a stream rules out sorting.
5. **For the median**, state both invariants out loud; they are what prove the algorithm
   correct.
6. **Mention the bucket-sort alternative** when you use a heap for frequency problems.
