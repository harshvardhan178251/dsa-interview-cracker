---
title: Implement Deque using Two Stacks
leetcode: null
difficulty: Medium
patterns: [Stack, Symmetric two-stack deque, Amortised O(1)]
companies: [Google, Goldman Sachs, Accenture]
frequency: 3
tags: [stack, deque, design, fifo]
sampleInput: |
  8
  pushBack 1
  pushBack 2
  pushFront 0
  pushBack 3
  popFront
  popBack
  size
  isEmpty
sampleOutput: |
  [1]
  [1, 2]
  [0, 1, 2]
  [0, 1, 2, 3]
  0
  3
  2
  false
---

# Implement Deque using Two Stacks

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Stack · Symmetric two-stack deque · Amortised O(1) |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Build a **double-ended queue** (deque) out of **two LIFO stacks**. A deque can be read
and written at both ends.

| Operation | Meaning |
|---|---|
| `pushFront x` | insert `x` at the front |
| `pushBack x` | insert `x` at the back |
| `popFront` | remove and return the front element |
| `popBack` | remove and return the back element |
| `peekFront` | the front element, without removing it |
| `peekBack` | the back element, without removing it |
| `size` | number of stored elements |
| `isEmpty` | `true` when nothing is stored |

## Input Format

The program reads from standard input:

```
m
pushFront 1
pushBack 2
popFront
popBack
peekFront
peekBack
size
isEmpty
...
```

- `m` — the number of operations (1 ≤ m ≤ 10⁵), on the first line.
- Every following line is **one operation**: the operation word, optionally followed by a
  single integer argument (the two push operations take one).

Output rules — **one line per operation**:

| Operation | Printed |
|---|---|
| `pushFront x` / `pushBack x` | the deque contents from front to back, e.g. `[0, 1, 2]` |
| `popFront` / `popBack` | the removed element, or `empty` when the deque is empty |
| `peekFront` / `peekBack` | the element, or `empty` when the deque is empty |
| `size` | the number of stored elements |
| `isEmpty` | `true` / `false` |

## Sample Input

```
8
pushBack 1
pushBack 2
pushFront 0
pushBack 3
popFront
popBack
size
isEmpty
```

## Expected Output

```
[1]
[1, 2]
[0, 1, 2]
[0, 1, 2, 3]
0
3
2
false
```

`popFront` removes `0` (the element pushed at the front) and `popBack` removes `3` (the
element pushed last at the back); two elements are left.

## Approach — Two stacks, one per end

The trick from [Implement Queue using Stacks](ImplementQueueUsingStacks.md)
generalises neatly:

- **`left`** owns the front of the deque — its top is the front element;
- **`right`** owns the back of the deque — its top is the back element.

Pushes are trivial: `pushFront` goes onto `left`, `pushBack` goes onto `right`.

A removal from an end whose stack is empty needs a **transfer**: pour the whole opposite
stack onto it. The transfer reverses the order, and that reversal is exactly what puts
the correct element on top:

- `popFront` with an empty `left` → move everything from `right` to `left`. `right` held
  the elements back-to-front, so after the reversal `left` holds them front-to-back and
  its top is the true front.
- `popBack` with an empty `right` → move everything from `left` to `right`. Symmetrically.

**Why amortised O(1):** an element is pushed once and can be transferred at most once in
each direction, so the total movement over *m* operations is O(m).

## Dry Run

Input: `pushBack 1`, `pushBack 2`, `pushFront 0`, `pushBack 3`, `popFront`, `popBack`,
`popBack`, `popFront`

Stacks are printed **top first**.

| Step | Operation | `left` (top→bottom) | `right` (top→bottom) | Deque (front→back) | Printed |
|---:|---|---|---|---|---|
| 1 | `pushBack 1` | `[]` | `[1]` | `[1]` | `[1]` |
| 2 | `pushBack 2` | `[]` | `[2, 1]` | `[1, 2]` | `[1, 2]` |
| 3 | `pushFront 0` | `[0]` | `[2, 1]` | `[0, 1, 2]` | `[0, 1, 2]` |
| 4 | `pushBack 3` | `[0]` | `[3, 2, 1]` | `[0, 1, 2, 3]` | `[0, 1, 2, 3]` |
| 5 | `popFront` — `left` is not empty | `[0]` → `[]` | `[3, 2, 1]` | `[1, 2, 3]` | `0` |
| 6 | `popBack` — `right` is not empty | `[]` | `[3, 2, 1]` → `[2, 1]` | `[1, 2]` | `3` |
| 7 | `popBack` — `right` is not empty | `[]` | `[2, 1]` → `[1]` | `[1]` | `2` |
| 8 | `popFront` — `left` empty → transfer `right`→`left` | `[]` → `[1]` | `[1]` → `[]` | `[1]` | — |
| 9 | `popFront` — takes `left`'s top | `[1]` → `[]` | `[]` | `[]` | `1` |

Step 8 is the only transfer in this trace: `right` held `[1]`, so `left` received `[1]`
and the deque order is unchanged. A transfer with more than one element reverses it,
which is precisely what fixes the order for the requested end.

## Java Solution

See [`ImplementDequeUsingTwoStacks.java`](./ImplementDequeUsingTwoStacks.java).

```java
public int popFront() {
    if (left.isEmpty()) {
        while (!right.isEmpty()) {
            left.push(right.pop());
        }
    }
    return left.pop();
}

public int popBack() {
    if (right.isEmpty()) {
        while (!left.isEmpty()) {
            right.push(left.pop());
        }
    }
    return right.pop();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) amortised per operation | every element is transferred at most once per direction |
| **Space** | O(n) | the two stacks together hold every element |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Could one stack do it?"* → yes, with the classic "store a sign bit on the stack" trick:
  push negative values for the front and positive ones for the back, and use the sign to
  decide which end to pop. It is fiddly and rarely worth it.
- *"What if pushes and pops are interleaved randomly?"* → the amortised bound still holds;
  the worst single operation is O(n) (one big transfer), but the average is constant.
- *"How does `java.util.ArrayDeque` do it?"* → it uses a single circular array with a
  head and a tail index, i.e. the ring-buffer idea from
  [Design Circular Queue](ImplementCircularQueue.md).
- *"How would you add `removeFirstOccurrence(x)`?"* → you would need random access, so
  the two-stack trick stops being the right tool; use a doubly linked list.

**Common mistakes:**
- ❌ Transferring in the **wrong direction** for a pop → the deque order flips and the
  wrong element comes out.
- ❌ Transferring **every time** instead of only when the target stack is empty → the
  order is destroyed on every operation.
- ❌ Assuming `peekFront`/`peekBack` are free when the stack is empty → they also need
  the transfer (or they must peek into the opposite stack).

**How to narrate:**
> "I'll split the deque between two stacks: one owns the front, one owns the back. Every
> push is O(1) on its own stack. When I need to pop from a side whose stack is empty, I
> pour the other stack into it — the reversal that causes is exactly what puts the right
> element on top. Each element moves at most twice, so the whole thing is O(1) amortised."

## Related Problems

- [Implement Queue using Stacks](ImplementQueueUsingStacks.md) — the one-ended version
- [Implement Stack using Queues](ImplementStackUsingQueues.md) — the mirror image
- [Design a Min Queue](MinQueue.md) — the same two stacks plus a running minimum
- [Design Circular Queue](ImplementCircularQueue.md) — the array-based deque
