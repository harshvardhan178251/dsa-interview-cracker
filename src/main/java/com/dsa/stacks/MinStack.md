---
title: Min Stack
leetcode: 155
difficulty: Medium
patterns: [Stack, Auxiliary minimum tracking]
companies: [Meta, Amazon, Google, Airbnb, Bloomberg, Uber, Cloudflare, Wipro, TCS, Zomato]
frequency: 5
tags: [stack, design, auxiliary]
sampleInput: |
  6
  push 5
  push 3
  getMin
  pop
  top
  getMin
sampleOutput: |
  3
  5
  5
---

# Min Stack — LeetCode 155

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Stack · Auxiliary minimum tracking |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Design a stack that supports `push`, `pop`, `top` and `getMin`, and does all of them in
**O(1)** time.

- `getMin` must return the smallest value currently on the stack.
- `pop` removes the top element.
- A query on an empty stack answers `empty`.

## Input Format

The program reads from standard input: a count, then one operation per line.

```
q
push <value>
pop
top
getMin
```

- `q` — the number of operations (1 ≤ q ≤ 10⁵)
- `push v` — push the integer `v` (|v| ≤ 2³¹ − 1)
- `pop` — remove the top element
- `top` — query the top element
- `getMin` — query the smallest element

The program prints **one line per query** (`top` or `getMin`), in the order the queries
appear. `push` and `pop` produce no output.

## Sample Input

```
6
push 5
push 3
getMin
pop
top
getMin
```

## Expected Output

```
3
5
5
```

The minimum of `{5, 3}` is `3`; after popping `3` the top is `5` and the minimum is `5`. ✓

## Approach — Store the Minimum With Every Entry

A plain stack cannot answer `getMin` in O(1): the minimum may be anywhere inside it, and
scanning the whole stack is O(n).

The fix is to keep the running minimum **alongside** each value. Every entry becomes a pair
`(value, minSoFar)`:

- `push(x)` → store `(x, min(x, currentMin))`; for an empty stack the minimum is `x` itself.
- `pop()` → remove the top entry; the minimum of the remaining stack is already stored in
  the new top entry.
- `top()` → the `value` of the top entry.
- `getMin()` → the `min` of the top entry.

The trick is that the minimum of the stack *after* a pop is exactly the minimum that was
recorded when the popped element was pushed — no recomputation is needed.

**Alternative:** two stacks (one for the values, one for the minima). Same complexity, more
memory traffic. The single stack of pairs is the cleaner answer.

**Why not a min-heap?** A heap gives O(1) `getMin` but O(log n) `pop`, and it does not
preserve LIFO order.

## Dry Run

Input: `push 5`, `push 3`, `getMin`, `pop`, `top`, `getMin`

| Step | operation | stack (top → bottom) | answer |
|---:|---|---|---|
| 1 | `push 5` | `[(5, 5)]` | — |
| 2 | `push 3` | `[(3, 3), (5, 5)]` | — |
| 3 | `getMin` | `[(3, 3), (5, 5)]` | `3` — the top entry's `min` |
| 4 | `pop` | `[(5, 5)]` | — (the popped value was `3`) |
| 5 | `top` | `[(5, 5)]` | `5` — the top entry's `value` |
| 6 | `getMin` | `[(5, 5)]` | `5` — the top entry's `min` |

The output is

```
3
5
5
```

✓ — note how step 4 needs no recomputation: the new top already carries the minimum `5`.

### Edge case — a query on an empty stack

| Step | operation | stack | answer |
|---:|---|---|---|
| 1 | `getMin` | `[]` | `empty` |

## Java Solution

See [`MinStack.java`](./MinStack.java).

```java
public void push(int value) {
    int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
    stack.push(new Entry(value, min));
}

public Integer pop() {
    if (stack.isEmpty()) {
        return null;
    }
    return stack.pop().value;
}

public Integer top() {
    return stack.isEmpty() ? null : stack.peek().value;
}

public Integer getMin() {
    return stack.isEmpty() ? null : stack.peek().min;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per operation | One push, one pop or one read — no scanning |
| **Space** | O(n) | One entry per element (the value plus the running minimum) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values are strings?"* → the same idea, the `min` becomes the lexicographically
  smallest string.
- *"Implement a max stack, a sum stack, a product stack."* → the same pattern with a
  different combination function.
- *"What about a queue with a minimum?"* → two stacks (in-stack/out-stack) or the same
  trick with a deque.
- *"Support `getMin` without extra memory per element."* → you cannot: the information has
  to be stored somewhere, either in the entries or in a parallel structure.

**Common mistakes:**
- ❌ Storing the minimum in a **separate variable** → after a pop the variable is stale.
- ❌ Forgetting the empty-stack case in `min` computation → `Math.min(x, peek().min)` throws
  when the stack is empty.
- ❌ Storing the *global* minimum instead of the minimum **at push time** → popping the
  minimum exposes a wrong answer.

**How to narrate:**
> "A stack alone cannot answer `getMin` in constant time, so I store the running minimum
> inside every entry: each element is a pair of the value and the minimum of the stack when
> it was pushed. Push computes the new minimum, pop just removes the entry, and `getMin`
> reads the `min` field of the top entry — after a pop the new top already carries the
> correct minimum, so nothing has to be recomputed. All operations are O(1)."

## Related Problems

- [Valid Parentheses](ValidParentheses.md) — the classic stack exercise
- [Evaluate Reverse Polish Notation](EvaluateReversePolishNotation.md) — stack of operands
- [Decode String](DecodeString.md) — a stack of partial results
