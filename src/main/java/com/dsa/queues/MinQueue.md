---
title: Design a Min Queue
leetcode: null
difficulty: Medium
patterns: [Stack, Running minimum, Amortised O(1)]
companies: [Meta, JP Morgan, Uber, HCLTech, KPMG]
frequency: 4
tags: [queue, stack, min, design]
sampleInput: |
  8
  push 5
  push 3
  push 7
  min
  pop
  min
  front
  isEmpty
sampleOutput: |
  [5]
  [5, 3]
  [5, 3, 7]
  3
  5
  3
  3
  false
---

# Design a Min Queue

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Stack · Running minimum · Amortised O(1) |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Design a **FIFO queue** that can also report its **minimum element** in constant time.

| Operation | Meaning |
|---|---|
| `push x` | append `x` to the back of the queue |
| `pop` | remove and return the front element |
| `front` | the front element, without removing it |
| `back` | the back element, without removing it |
| `min` | the smallest element currently stored |
| `size` | number of queued elements |
| `isEmpty` | `true` when nothing is queued |

`min` must be O(1) — scanning the queue on every call is not acceptable.

## Input Format

The program reads from standard input:

```
m
push 5
min
pop
front
back
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
| `push x` | the queue contents from front to back, e.g. `[5, 3, 7]` |
| `pop` | the removed element, or `empty` when the queue is empty |
| `front` / `back` | the element, or `empty` when the queue is empty |
| `min` | the smallest element, or `empty` when the queue is empty |
| `size` | the number of queued elements |
| `isEmpty` | `true` / `false` |

## Sample Input

```
8
push 5
push 3
push 7
min
pop
min
front
isEmpty
```

## Expected Output

```
[5]
[5, 3]
[5, 3, 7]
3
5
3
3
false
```

The minimum is `3`; after the `pop` removes `5` the minimum is still `3`, because `3` is
still in the queue.

## Approach — Two stacks, each carrying a running minimum

Start from [Implement Queue using Stacks](ImplementQueueUsingStacks.md)
and add one idea: **every element remembers the minimum of everything below it in its
stack**.

When an element is pushed onto a stack, it stores

```
min = min(value, minimum stored at the current top of the stack)
```

Because a stack only ever removes from the top, the stored minimum of the element that
is about to leave the stack is **exactly** the minimum of that stack at that moment. No
scanning, no extra bookkeeping.

The queue minimum is then just the minimum of the two stack headers:

```
min() = min(top(in).min, top(out).min)
```

**Why the running minimum survives a pop:** the popped element carries the minimum of
the stack *below* it, and that information is exactly what the next element down needs.
Popping never destroys the minimum of the remaining stack — it just exposes the
previously stored one.

**One trap:** the `in` → `out` transfer reverses the elements, and a running minimum is
only valid relative to the *order* of its stack. The minimum therefore has to be
**recomputed while transferring** — see the note under the dry run.

## Dry Run

Input: `push 5`, `push 3`, `push 7`, `min`, `pop`, `min`, `push 2`, `min`

Stacks are printed **top first**; each entry is shown as `value/min` — the element and
the minimum of the stack up to that element.

| Step | Operation | `in` (top→bottom) | `out` (top→bottom) | Queue (front→back) | Printed |
|---:|---|---|---|---|---|
| 1 | `push 5` → min = min(5, ∞) = 5 | `[5/5]` | `[]` | `[5]` | `[5]` |
| 2 | `push 3` → min = min(3, 5) = 3 | `[3/3, 5/5]` | `[]` | `[5, 3]` | `[5, 3]` |
| 3 | `push 7` → min = min(7, 3) = 3 | `[7/3, 3/3, 5/5]` | `[]` | `[5, 3, 7]` | `[5, 3, 7]` |
| 4 | `min` → min(3, ∞) = 3 | `[7/3, 3/3, 5/5]` | `[]` | `[5, 3, 7]` | `3` |
| 5 | `pop` → shift `in`→`out`, mins recomputed (7, 3, 5) | `[]` | `[5/3, 3/3, 7/7]` | — | — |
| 6 | `pop` → takes `out` top `5` | `[]` | `[3/3, 7/7]` | `[3, 7]` | `5` |
| 7 | `min` → min(∞, 3) = 3 | `[]` | `[3/3, 7/7]` | `[3, 7]` | `3` |
| 8 | `push 2` → min = min(2, ∞) = 2 | `[2/2]` | `[3/3, 7/7]` | `[3, 7, 2]` | `[3, 7, 2]` |
| 9 | `min` → min(2, 3) = 2 | `[2/2]` | `[3/3, 7/7]` | `[3, 7, 2]` | `2` |

Step 5 is where the running minimum has to be **recomputed**: the transfer reverses the
order, so the minimum that was stored for `7` (it was `3`, because `3` sat below it in
`in`) becomes `7` in the new stack — `7` is now at the bottom of `out`, so nothing is
below it. Step 6 then pops `5` and exposes `3/3`, whose stored minimum is still the
minimum of the remaining queue.

## The subtle part — recomputing the minimum during the transfer

A "stack with a running minimum" stores, for every element, the minimum of everything
*below it in that stack*. The trick works only as long as the stack keeps its order. The
`in` → `out` transfer **reverses** the order, so the stored minima become stale: after
moving `7` (stored min `3`) to the bottom of `out`, nothing is below it any more and its
minimum must become `7`.

The fix is to recompute while transferring:

```java
int[] pair = in.pop();
int min = out.isEmpty() ? pair[0] : Math.min(pair[0], out.peek()[1]);
out.push(new int[]{pair[0], min});
```

Now every element in `out` carries the minimum of the elements below it **in `out`**, and
the header of each stack always holds the minimum of that whole stack.

## Java Solution

See [`MinQueue.java`](./MinQueue.java).

```java
public void push(int value) {
    int min = in.isEmpty() ? value : Math.min(in.peek()[1], value);
    in.push(new int[]{value, min});
}

public int min() {
    int result = Integer.MAX_VALUE;
    if (!in.isEmpty()) {
        result = Math.min(result, in.peek()[1]);
    }
    if (!out.isEmpty()) {
        result = Math.min(result, out.peek()[1]);
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) amortised per operation | each element moves between the stacks at most once |
| **Space** | O(n) | two ints per queued element (value + running minimum) |

**Alternative:** a monotonic deque of candidates plus a plain queue — the same idea with
different containers, O(n) space in the worst case (when the input is sorted).

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if you also need the maximum?"* → store both running minima and maxima per
  element, or keep a second structure in parallel.
- *"Can you do it with one stack?"* → yes: store the minimum **under** each element
  (push the new minimum first, then the value) — the classic "stack with min" trick.
- *"What if `push`/`pop` must be thread-safe?"* → guard the shift with a lock; the
  `min` read then also needs the lock, or an `AtomicInteger`.
- *"How does this compare with `java.util.PriorityQueue`?"* → a priority queue gives
  O(1) `peek` of the minimum but **destroys the FIFO order**; you cannot recover the
  front element. Order and minimum are the two requirements that clash.

**Common mistakes:**
- ❌ Storing the **global** minimum of the queue instead of the minimum **of the stack**
  → popping the element that carried that minimum loses the information and `min`
  returns a stale value.
- ❌ **Not** recomputing the running minimum during the `in` → `out` transfer → the
  transfer reverses the order, so the stored minimum belongs to a different part of the
  queue and `min` returns a value that is no longer in the queue.
- ❌ Recomputing the minimum by scanning the queue on every `min` call → O(n) per call,
  which defeats the purpose of the exercise.
- ❌ Forgetting that `back` is the **tail** of `out` after a transfer (not its top) → the
  wrong element is returned after the first `pop`.

**How to narrate:**
> "I'll use the two-stack queue, but every element carries the minimum of the stack
> beneath it. Pushing computes `min(x, top.min)` in O(1). Because a stack only pops from
> the top, the element that leaves the stack already knows the minimum of what stays
> behind it, so `min` is just the minimum of the two stack headers — no scanning."

## Related Problems

- [Implement Queue using Stacks](ImplementQueueUsingStacks.md) — the base structure
- [Implement Deque using Two Stacks](ImplementDequeUsingTwoStacks.md) — both ends
- [Find Median from Data Stream](../heaps/FindMedianFromDataStream.md) — the same idea with two heaps
- [Sliding Window Maximum](SlidingWindowMaximum.md) — a monotonic deque
