---
title: Implement Queue using Stacks
leetcode: null
difficulty: Medium
patterns: [Stack, Two-stack FIFO, Amortised O(1)]
companies: [Google, Salesforce, Bloomberg]
frequency: 4
tags: [stack, queue, design, fifo]
sampleInput: |
  7
  push 1
  push 2
  pop
  peek
  size
  push 3
  isEmpty
sampleOutput: |
  [1]
  [1, 2]
  1
  2
  1
  [2, 3]
  false
---

# Implement Queue using Stacks

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Stack · Two-stack FIFO · Amortised O(1) |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Build a **FIFO queue** (first in, first out) out of **LIFO stacks** (last in, first out).

The queue must support:

| Operation | Meaning |
|---|---|
| `push x` | append `x` to the **back** of the queue |
| `pop` | remove and return the **front** element |
| `peek` | return the **front** element without removing it |
| `size` | number of queued elements |
| `isEmpty` | `true` when nothing is queued |

The implementation may use any number of stacks, but stacks are the only allowed
building block — no `java.util.Queue` inside the structure.

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
| `push x` | the queue contents from front to back, e.g. `[1, 2, 3]` |
| `pop` | the removed element, or `empty` when the queue is empty |
| `peek` | the front element, or `empty` when the queue is empty |
| `size` | the number of queued elements |
| `isEmpty` | `true` / `false` |

## Sample Input

```
7
push 1
push 2
pop
peek
size
push 3
isEmpty
```

## Expected Output

```
[1]
[1, 2]
1
2
1
[2, 3]
false
```

`pop` removes the oldest element (`1`), `peek` now sees `2`, and the queue still holds
`2` after the last push.

## Approach — Two stacks, one reversal

A stack hands out the **last** element it received, a queue must hand out the **first**.
The gap between the two is exactly one reversal, and a stack is the cheapest machine
that can perform a reversal.

So we keep two stacks:

- **`in`** — receives every `push`. New elements land on its top.
- **`out`** — serves the front of the queue. Its top is the next element to leave.

The rules are short:

1. `push x` → `in.push(x)`.
2. `pop` / `peek` → if `out` is empty, **move every element of `in` onto `out`**
   (`out.push(in.pop())`, repeated). That single pass reverses the order, so the oldest
   element ends up on top of `out`. Then read (and remove) `out`'s top.
3. `size` → `in.size() + out.size()`.
4. `isEmpty` → both stacks are empty.

**Why it is amortised O(1):** every element is pushed onto `in` once and moved to `out`
**at most once** (it can never travel back). A transfer of *m* elements costs *m*, but
those *m* pops are amortised over the *m* pushes that created them — so the average cost
per operation is constant. The classic counter-example is "push, pop, push, pop, …":
each pop triggers a transfer, but the transfer only ever moves the one element that was
pushed since the last transfer, so the total work is still O(n).

## Dry Run

Input: `push 1`, `push 2`, `push 3`, `pop`, `peek`, `push 4`, `pop`, `pop`, `pop`

Stacks are printed **top first** (the element that `pop` would remove is on the left).

| Step | Operation | `in` (top→bottom) | `out` (top→bottom) | Queue (front→back) | Printed |
|---:|---|---|---|---|---|
| 1 | `push 1` | `[1]` | `[]` | `[1]` | `[1]` |
| 2 | `push 2` | `[2, 1]` | `[]` | `[1, 2]` | `[1, 2]` |
| 3 | `push 3` | `[3, 2, 1]` | `[]` | `[1, 2, 3]` | `[1, 2, 3]` |
| 4 | `pop` → shift `in`→`out` (`3`, `2`, `1` pushed) | `[]` | `[1, 2, 3]` | — | — |
| 5 | `pop` (takes `out` top `1`) | `[]` | `[2, 3]` | `[2, 3]` | `1` |
| 6 | `peek` (`out` not empty, no shift) | `[]` | `[2, 3]` | `[2, 3]` | `2` |
| 7 | `push 4` | `[4]` | `[2, 3]` | `[2, 3, 4]` | `[2, 3, 4]` |
| 8 | `pop` (takes `out` top `2`) | `[4]` | `[3]` | `[3, 4]` | `2` |
| 9 | `pop` (takes `out` top `3`) | `[4]` | `[]` | `[4]` | `3` |
| 10 | `pop` → shift `in`→`out` | `[]` | `[4]` | — | — |
| 11 | `pop` (takes `out` top `4`) | `[]` | `[]` | `[]` | `4` |

Step 4 is the only expensive step: the three elements move from `in` to `out` in the
reverse order, which is exactly what turns LIFO into FIFO. After that, `out` serves the
queue until it runs dry again.

## Java Solution

See [`ImplementQueueUsingStacks.java`](./ImplementQueueUsingStacks.java).

```java
private void shift() {
    if (out.isEmpty()) {
        while (!in.isEmpty()) {
            out.push(in.pop());
        }
    }
}

public void push(int value) { in.push(value); }
public int pop()  { shift(); return out.pop(); }
public int peek() { shift(); return out.peek(); }
public int size() { return in.size() + out.size(); }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) amortised per operation | every element is pushed once and moved at most once |
| **Space** | O(n) | the two stacks together hold every queued element |

**Optimal?** Yes for the amortised bound. A single-pop transfer costs O(n) in the worst
case, but no implementation can beat O(1) amortised per operation here.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with one stack?"* → yes: keep a single stack and, on `pop`, pour the
  whole stack into a second "auxiliary" stack — that is exactly the two-stack solution
  with the roles swapped.
- *"What if `push` and `pop` are interleaved 1:1?"* → that is the worst case for the
  naive version and the best case for amortised analysis: each transfer moves only the
  elements pushed since the previous transfer.
- *"How would you extend this to support `pop` from the back as well?"* → that is
  [Implement Deque using Two Stacks](./ImplementDequeUsingTwoStacks.md).
- *"Can it be made thread-safe?"* → yes, with a lock around the shift, or by using
  `ConcurrentLinkedDeque` and accepting that the two-stack trick is no longer needed.

**Common mistakes:**
- ❌ Forgetting to shift **only when `out` is empty** — shifting unconditionally destroys
  the FIFO order and the queue starts returning the newest element first.
- ❌ Shifting in the wrong direction (`out.push(in.push(x))` style) — the reversal is the
  whole trick; get it backwards and the queue becomes a stack again.
- ❌ Claiming O(1) *worst-case* per operation — a single `pop` right after `m` pushes
  costs O(m). Say **amortised**.

**How to narrate:**
> "A stack gives me the newest element, a queue needs the oldest, so I need exactly one
> reversal. I keep an `in` stack for pushes and an `out` stack for pops. When `out` runs
> dry I pour `in` into it — that reversal flips LIFO into FIFO. Every element is moved at
> most once, so the whole thing is O(1) amortised per operation."

## Related Problems

- [Implement Stack using Queues](ImplementStackUsingQueues.md) — the mirror image
- [Implement Deque using Two Stacks](ImplementDequeUsingTwoStacks.md) — both ends at once
- [Design a Min Queue](MinQueue.md) — the same two stacks plus a running minimum
- [Design Circular Queue](ImplementCircularQueue.md) — a queue backed by a ring buffer
