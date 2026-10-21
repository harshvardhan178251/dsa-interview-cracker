---
title: Implement Stack using Queues
leetcode: null
difficulty: Medium
patterns: [Queue, Rotation, LIFO over FIFO]
companies: [Amazon, Microsoft]
frequency: 3
tags: [queue, stack, design, rotation]
sampleInput: |
  6
  push 1
  push 2
  push 3
  peek
  pop
  size
sampleOutput: |
  [1]
  [2, 1]
  [3, 2, 1]
  3
  3
  2
---

# Implement Stack using Queues

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Queue · Rotation · LIFO over FIFO |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Build a **LIFO stack** (last in, first out) out of **FIFO queues** (first in, first out).

The stack must support:

| Operation | Meaning |
|---|---|
| `push x` | put `x` on top of the stack |
| `pop` | remove and return the top element |
| `peek` | return the top element without removing it |
| `size` | number of stacked elements |
| `isEmpty` | `true` when nothing is stacked |

Queues are the only allowed building block — no `java.util.Stack` or `ArrayDeque` inside
the structure.

## Input Format

The program reads from standard input:

```
m
push 1
pop
peek
size
isEmpty
...
```

- `m` — the number of operations (1 ≤ m ≤ 10⁵), on the first line.
- Every following line is **one operation**: the operation word, optionally followed by a
  single integer argument (`push` is the only operation that takes one).

Output rules — **one line per operation**:

| Operation | Printed |
|---|---|
| `push x` | the stack contents from **top** to bottom, e.g. `[3, 2, 1]` |
| `pop` | the removed element, or `empty` when the stack is empty |
| `peek` | the top element, or `empty` when the stack is empty |
| `size` | the number of stacked elements |
| `isEmpty` | `true` / `false` |

## Sample Input

```
6
push 1
push 2
push 3
peek
pop
size
```

## Expected Output

```
[1]
[2, 1]
[3, 2, 1]
3
3
2
```

The stack prints **top first**, so after three pushes the top is `3`; the `pop` removes
`3` and one element (`2`) is left.

## Approach — Rotate the queue

A queue hands out the **oldest** element, a stack must hand out the **newest**. With one
queue we can fix that by **rotating** the queue: move the front element to the back, over
and over, until the newest element reaches the front.

The invariant is simple: **the queue always stores the stack elements in insertion
order**, so

- the **back** of the queue is the **top** of the stack → `peek` is `queue.peekLast()`,
  O(1), and it does not disturb the queue;
- the **front** of the queue is the **bottom** of the stack;
- `pop` rotates the queue `size - 1` times (`queue.add(queue.poll())` each time) so the
  newest element reaches the front, and then removes it. The survivors are left in
  insertion order again, so the invariant survives the operation.

`push` is a plain `queue.add(value)` — O(1).

**Why rotation is needed at all:** a queue has no way to "un-enqueue" an element, so the
only way to make a specific element the next one out is to rotate everything in front
of it to the back.

## Dry Run

Input: `push 1`, `push 2`, `push 3`, `peek`, `pop`, `pop`, `size`

| Step | Operation | Queue (front→back) | Stack (top→bottom) | Printed |
|---:|---|---|---|---|
| 1 | `push 1` | `[1]` | `[1]` | `[1]` |
| 2 | `push 2` | `[1, 2]` | `[2, 1]` | `[2, 1]` |
| 3 | `push 3` | `[1, 2, 3]` | `[3, 2, 1]` | `[3, 2, 1]` |
| 4 | `peek` — reads the queue's **back** | `[1, 2, 3]` | `[3, 2, 1]` | `3` |
| 5 | `pop` — rotate 1 (`1` → back) | `[2, 3, 1]` | `[3, 2, 1]` | — |
| 6 | `pop` — rotate 2 (`2` → back) | `[3, 1, 2]` | `[3, 2, 1]` | — |
| 7 | `pop` — remove the front (`3`) | `[1, 2]` | `[2, 1]` | `3` |
| 8 | `pop` — rotate 1 (`1` → back) | `[2, 1]` | `[2, 1]` | — |
| 9 | `pop` — remove the front (`2`) | `[1]` | `[1]` | `2` |
| 10 | `size` | `[1]` | `[1]` | `1` |

Notice that `peek` never touches the queue: because the queue keeps insertion order, the
top of the stack is simply its last element. Only `pop` pays for the rotation.

## Java Solution

See [`ImplementStackUsingQueues.java`](./ImplementStackUsingQueues.java).

```java
private void rotateNewestToFront() {
    int n = queue.size();
    for (int i = 0; i < n - 1; i++) {
        queue.add(queue.poll());
    }
}

public void push(int value) { queue.add(value); }
public int pop()  { rotateNewestToFront(); return queue.poll(); }
public int peek() { return queue.peekLast(); }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) per `pop`, O(1) for `push` and `peek` | `pop` rotates the whole queue |
| **Space** | O(n) | the queue holds every stacked element |

**Better?** Yes — the two-queue variant pushes the new element to the first queue and,
on `pop`, moves every element to the second queue. That makes `pop` O(n) too, but it
avoids the rotation bookkeeping. Neither variant beats O(1) amortised per operation with
queues alone, because a queue cannot remove an element from the middle.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can `pop` be made O(1)?"* → not with a single queue; a stack (or a deque) gives O(1).
  With two queues it stays O(n), with one queue plus a counter you only amortise.
- *"Why not just use two queues and swap them?"* → the transfer of *n* elements costs
  O(n) exactly like the rotation, but it does not have to keep the surviving elements in
  any particular order — easier to reason about, same complexity.
- *"How does this compare with the two-stack queue?"* → the stack version is O(1)
  amortised, the queue version is O(n) per `pop`; the asymmetry is why real stacks are
  built on arrays, not on linked queues.

**Common mistakes:**
- ❌ Rotating **n** times instead of **n − 1** → the newest element ends up back at the
  back and `pop` removes the *oldest* element, silently turning the stack into a queue.
- ❌ Implementing `peek` with a rotation and not rotating back → the queue's order is
  destroyed and the next `pop` returns the wrong element (this bug is invisible until
  the second `pop`).
- ❌ Assuming `pop` is O(1) because the queue operation is O(1) → the rotation dominates.

**How to narrate:**
> "One queue is enough if I keep the invariant that the queue stores the elements in
> insertion order. Then the back of the queue is the top of the stack, so `peek` is a
> `peekLast`. For `pop` I rotate the queue `size - 1` times to bring the newest element
> to the front and then dequeue it. Push is O(1), pop is O(n)."

## Related Problems

- [Implement Queue using Stacks](ImplementQueueUsingStacks.md) — the mirror image
- [Implement Deque using Two Stacks](ImplementDequeUsingTwoStacks.md) — both ends at once
- [Design a Min Queue](MinQueue.md) — a queue with a running minimum
- [Design Circular Queue](ImplementCircularQueue.md) — a queue backed by a ring buffer
