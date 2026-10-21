---
title: Design Circular Queue
leetcode: 622
difficulty: Medium
patterns: [Ring buffer, Modular arithmetic, Array]
companies: [Meta, LinkedIn, Salesforce, Wipro, Barclays]
frequency: 3
tags: [queue, ring-buffer, array, design]
sampleInput: |
  3
  8
  enqueue 1
  enqueue 2
  enqueue 3
  enqueue 4
  dequeue
  enqueue 4
  rear
  isFull
sampleOutput: |
  true
  true
  true
  false
  1
  true
  4
  true
---

# Design Circular Queue — LeetCode 622

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Ring buffer · Modular arithmetic · Array |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Adobe |

## Problem Statement

Design a **circular queue** of fixed capacity `k` that supports:

| Operation | Meaning | Result when it fails |
|---|---|---|
| `enqueue x` | insert `x` at the back | `false` if the queue is full |
| `dequeue` | remove and return the front element | `-1` if the queue is empty |
| `peek` | the front element | `-1` if the queue is empty |
| `rear` | the back element | `-1` if the queue is empty |
| `isEmpty` | is the queue empty? | `true` / `false` |
| `isFull` | is the queue full? | `true` / `false` |

The queue must be **O(1)** per operation and must never grow beyond its capacity.

## Input Format

The program reads from standard input:

```
capacity
m
enqueue 1
dequeue
peek
rear
isEmpty
isFull
...
```

- `capacity` — the maximum number of elements the queue can hold (1 ≤ capacity ≤ 10³).
- `m` — the number of operations (1 ≤ m ≤ 10⁵).
- Every following line is **one operation**: the operation word, optionally followed by a
  single integer argument (`enqueue` is the only operation that takes one).

Output rules — **one line per operation**:

| Operation | Printed |
|---|---|
| `enqueue x` | `true` when the element was stored, `false` when the queue was full |
| `dequeue` | the removed element, or `-1` when the queue was empty |
| `peek` / `rear` | the element, or `-1` when the queue is empty |
| `isEmpty` / `isFull` | `true` / `false` |

## Sample Input

```
3
8
enqueue 1
enqueue 2
enqueue 3
enqueue 4
dequeue
enqueue 4
rear
isFull
```

## Expected Output

```
true
true
true
false
1
true
4
true
```

The queue holds `1 2 3` after three enqueues, refuses the fourth, releases `1` and then
accepts `4` — which now sits at the **back**, ahead of the old `3` in queue order.

## Approach — Ring buffer

A normal array queue would have to shift every element left on each `dequeue`, which is
O(n). A **circular** array never shifts anything: when the index runs past the end of the
array it wraps around to the front.

Three pieces of state are enough:

- `data` — the fixed array of `capacity` slots;
- `head` — the index of the front element;
- `size` — how many elements are currently stored.

Then:

| What | Where it lives |
|---|---|
| front element | `data[head]` |
| back element | `data[(head + size - 1) % capacity]` |
| the slot for the next insert | `data[(head + size) % capacity]` |

The modulo is the whole trick: it turns "off the end" into "back to the beginning".

Two things make the bookkeeping unambiguous:

- **`size` instead of a second index.** A ring buffer has one free slot (the classic
  "waste one cell" trick) or it tracks the count. Tracking the count removes the
  ambiguity: `isEmpty` is `size == 0`, `isFull` is `size == capacity`.
- **`dequeue` advances `head` but never clears the slot.** The stale value is simply
  overwritten by the next insert.

## Dry Run

Input: capacity 3, then `enqueue 1`, `enqueue 2`, `enqueue 3`, `enqueue 4`, `dequeue`,
`enqueue 4`, `rear`, `isFull`

`data` is printed as the raw three-slot array; `head` points at the front and `size`
counts the live elements.

| Step | Operation | `data` (slot 0, 1, 2) | `head` | `size` | Printed |
|---:|---|---|---:|---:|---|
| 1 | `enqueue 1` → slot `(0+0)%3 = 0` | `[1, ·, ·]` | 0 | 1 | `true` |
| 2 | `enqueue 2` → slot `(0+1)%3 = 1` | `[1, 2, ·]` | 0 | 2 | `true` |
| 3 | `enqueue 3` → slot `(0+2)%3 = 2` | `[1, 2, 3]` | 0 | 3 | `true` |
| 4 | `enqueue 4` — `size == capacity` | `[1, 2, 3]` | 0 | 3 | `false` |
| 5 | `dequeue` → takes `data[0] = 1` | `[·, 2, 3]` | 1 | 2 | `1` |
| 6 | `enqueue 4` → slot `(1+2)%3 = 0` | `[4, 2, 3]` | 1 | 3 | `true` |
| 7 | `rear` → `data[(1+3-1)%3] = data[0]` | `[4, 2, 3]` | 1 | 3 | `4` |
| 8 | `isFull` → `size == capacity` | `[4, 2, 3]` | 1 | 3 | `true` |

Step 5 is where the wrap-around becomes visible: the freed slot 0 is reused in step 6,
and the queue order is now `2, 3, 4` even though the raw array reads `4, 2, 3`.

## Java Solution

See [`ImplementCircularQueue.java`](./ImplementCircularQueue.java).

```java
public boolean enqueue(int value) {
    if (isFull()) {
        return false;
    }
    data[(head + size) % data.length] = value;
    size++;
    return true;
}

public int dequeue() {
    if (isEmpty()) {
        return -1;
    }
    int value = data[head];
    head = (head + 1) % data.length;
    size--;
    return value;
}

public int rear() {
    return isEmpty() ? -1 : data[(head + size - 1) % data.length];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per operation | only modular arithmetic and array writes |
| **Space** | O(capacity) | the backing array never grows |

**Optimal?** Yes — every operation touches at most one slot, so no implementation can be
faster, and the array is exactly the size the contract demands.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you avoid the `%` operator?"* → yes, replace it with a conditional wrap
  (`if (index == capacity) index = 0;`). The modulo is often a division instruction on
  the CPU and matters in very hot loops.
- *"What if the capacity is not known in advance?"* → use a `java.util.ArrayDeque`
  (amortised O(1) growth) or a linked list with a tail pointer.
- *"How would you implement a blocking queue?"* → add `wait()` / `notify()` on a full
  queue and an empty queue; see `BlockingQueue`.
- *"What about a queue with a fixed capacity that overwrites the oldest element?"* → that
  is a **ring buffer** for streams: write into `data[head]` and always advance `head`,
  dropping the oldest value (used in audio and networking).

**Common mistakes:**
- ❌ Using only `head` and `rear` indices without a **count** → you cannot tell "empty"
  from "full" when both pointers coincide.
- ❌ Writing the insert at `data[(head + size) % capacity]` but the read at
  `data[(rear + 1) % capacity]` → mixing two different conventions; the read positions
  must be derived from the same `head`/`size` pair.
- ❌ Forgetting to advance `head` with a modulo in `dequeue` → the queue breaks as soon
  as it wraps around the end of the array.

**How to narrate:**
> "I'll use a fixed array plus a `head` index and a `size` counter, so empty and full
> are unambiguous. The front lives at `data[head]`, the back at
> `data[(head + size - 1) % capacity]`, and the next free slot at
> `data[(head + size) % capacity]`. Every operation is a couple of modulo operations, so
> the whole thing is O(1) per call with no shifting."

## Related Problems

- [Implement Queue using Stacks](ImplementQueueUsingStacks.md) — a queue from two stacks
- [Design a Min Queue](MinQueue.md) — a queue with a running minimum
- [Sliding Window Maximum](SlidingWindowMaximum.md) — a monotonic deque
- [Task Scheduler](../heaps/TaskScheduler.md) — a priority queue with a cooldown
