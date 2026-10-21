---
title: Min Max Stack
leetcode: null
difficulty: Medium
patterns: [Design, Stack, Running aggregates]
companies: [Amazon, Google, Meta, Uber, Bloomberg]
frequency: 3
tags: [stack, min, max]
sampleInput: |
  7
  push 5
  push 3
  push 7
  getMin
  getMax
  pop
  top
sampleOutput: |
  3
  7
  7
  3
---

# Min Max Stack

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Stack · Running aggregates |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Implement a stack that supports

- `push(value)` — push a value,
- `pop()` — remove and return the top value,
- `top()` — read the top value,
- `getMin()` — the smallest value **anywhere** in the stack,
- `getMax()` — the largest value anywhere in the stack,

where `getMin` and `getMax` must be **O(1)**.

## Input Format

```
n
push v
pop
top
getMin
getMax
...
```

- `n` — number of commands.
- `push v` — push the integer `v`.
- `pop`, `top`, `getMin`, `getMax` — read only.

`push` prints nothing; every other command prints one line with its result. An empty
stack answers `-1` for `pop`, `top`, `getMin` and `getMax`.

## Sample Input

```
7
push 5
push 3
push 7
getMin
getMax
pop
top
```

## Expected Output

```
3
7
7
3
```

The stack holds `[5, 3, 7]` (top is `7`). `getMin` → `3`, `getMax` → `7`, `pop` returns
the top `7`, and after that the top is `3`.

## Approach — store the extremes inside every frame

The classic mistake is to keep a *separate* min-stack and max-stack: then `pop` has to
undo the change on both of them, and you need extra bookkeeping to know whether the
popped value *was* the extreme.

Instead, every frame carries the value **and** the running minimum and maximum of the
stack up to that frame:

```
push 5  ->  frame(value=5, min=5, max=5)
push 3  ->  frame(value=3, min=3, max=5)
push 7  ->  frame(value=7, min=3, max=7)
```

- `push(v)`: `min = min(v, top.min)`, `max = max(v, top.max)` — O(1).
- `pop()`: throw the frame away — the previous extremes are automatically restored.
- `getMin()` / `getMax()`: read the top frame — O(1).

Every operation is O(1) and the extra memory is two integers per element.

## Dry Run

| Step | Command | Stack (top → bottom) before | Top frame before | Action | Stack after | Top frame after | Output |
|---:|---|---|---|---|---|---|---|
| 1 | `push 5` | `[]` | — | min = max = 5 | `[5]` | `(5, min 5, max 5)` | — |
| 2 | `push 3` | `[5]` | `(5, 5, 5)` | min = min(3,5)=3, max = max(3,5)=5 | `[3, 5]` | `(3, min 3, max 5)` | — |
| 3 | `push 7` | `[3, 5]` | `(3, 3, 5)` | min = min(7,3)=3, max = max(7,5)=7 | `[7, 3, 5]` | `(7, min 3, max 7)` | — |
| 4 | `getMin` | `[7, 3, 5]` | `(7, 3, 7)` | read `top.min` | unchanged | unchanged | `3` |
| 5 | `getMax` | `[7, 3, 5]` | `(7, 3, 7)` | read `top.max` | unchanged | unchanged | `7` |
| 6 | `pop` | `[7, 3, 5]` | `(7, 3, 7)` | discard frame | `[3, 5]` | `(3, min 3, max 5)` | `7` |
| 7 | `top` | `[3, 5]` | `(3, 3, 5)` | read `top.value` | unchanged | unchanged | `3` |

Notice step 6: the frame that is exposed again already carries `min 3, max 5` — the
extremes were restored for free, no undo logic needed.

## Java Solution

See [`MinMaxStack.java`](./MinMaxStack.java).

```java
public void push(int value) {
    int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
    int max = stack.isEmpty() ? value : Math.max(value, stack.peek().max);
    stack.push(new Frame(value, min, max));
}

public int pop() {
    if (stack.isEmpty()) {
        return -1;
    }
    return stack.pop().value;      // the frame carried the old extremes with it
}

public int getMin() {
    return stack.isEmpty() ? -1 : stack.peek().min;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per operation | one frame push/pop or one field read |
| **Space** | O(n) | one frame per element, each holding 3 integers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if `getMin` must also return the index of the minimum?"* → store the index in
  the frame as well.
- *"What if the values can be removed from the middle?"* → a min-heap with lazy deletion
  (or an indexed heap) instead of a stack.
- *"How would you do it for a queue?"* → two monotonic queues, or the same trick with a
  deque.
- *"What if you want the k-th smallest?"* → a heap of size k maintained per frame.

**Common mistakes:**
- ❌ Using two independent stacks and forgetting to undo the other one on `pop`.
- ❌ Using `if` instead of `while` when re-checking the condition — not an issue here,
  but it is the classic bug in the "min stack with two stacks" variant.
- ❌ Not handling `getMin`/`getMax` on an empty stack → exception instead of a value.

**How to narrate:**
> "I don't want a separate min-stack and max-stack because then `pop` has to undo both.
> Instead every stack frame stores the value together with the running minimum and
> maximum of the stack up to that point. Pushing computes the new extremes in constant
> time, popping just discards a frame, and the previous extremes come back for free."

## Related Problems

- [Design Browser History — LeetCode 348](./DesignBrowserHistory.md) — another "history with a
  cursor" structure
- [Design Text Editor — LeetCode 2296](./DesignTextEditor.md) — a stack plus an undo journal
- [Min Heap](../utils/MinHeap.java) — the heap based alternative
  for "k-th smallest"
