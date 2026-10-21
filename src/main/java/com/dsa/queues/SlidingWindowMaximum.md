---
title: Sliding Window Maximum
leetcode: 239
difficulty: Hard
patterns: [Monotonic deque, Sliding window, Two pointers]
companies: [Meta, Google, Amazon, LinkedIn, Bloomberg, Netflix, Walmart, Tech Mahindra, Cognizant, Zebra]
frequency: 5
tags: [array, deque, sliding-window, monotonic-stack]
sampleInput: |
  8
  1 3 -1 -3 5 3 6 7
  3
sampleOutput: "3 3 5 5 6 7"
---

# Sliding Window Maximum — LeetCode 239

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Monotonic deque · Sliding window · Two pointers |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg |

## Problem Statement

Given an integer array `nums` and an integer `k`, return the **maximum value of every
contiguous subarray of length `k`**.

For `nums = [1, 3, -1, -3, 5, 3, 6, 7]` and `k = 3` the windows are

| Window | Values | Maximum |
|---|---|---|
| `nums[0..2]` | `[1, 3, -1]` | 3 |
| `nums[1..3]` | `[3, -1, -3]` | 3 |
| `nums[2..4]` | `[-1, -3, 5]` | 5 |
| `nums[3..5]` | `[-3, 5, 3]` | 5 |
| `nums[4..6]` | `[5, 3, 6]` | 6 |
| `nums[5..7]` | `[3, 6, 7]` | 7 |

so the answer is `[3, 3, 5, 5, 6, 7]`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers
- `k` — the window size (1 ≤ k ≤ n)

## Sample Input

```
8
1 3 -1 -3 5 3 6 7
3
```

## Expected Output

```
3 3 5 5 6 7
```

## Approach — Monotonic deque

A brute-force solution recomputes the maximum of every window: O(n·k). A **heap** gives
O(n log k) but still pays a logarithmic factor. The optimal O(n) solution keeps a
**deque of indices** with two properties:

1. **Indices increase** from front to back (they enter in order and leave in order).
2. **Values decrease** from front to back — the front always holds the largest candidate.

For each new element `nums[i]`:

1. **Expire** indices that left the window: while `deque.peekFirst() <= i - k`, drop the
   front.
2. **Dominate** smaller values: while `nums[deque.peekLast()] <= nums[i]`, drop the
   back. Those elements can never be a maximum again — `nums[i]` is at least as large
   and leaves the window later.
3. **Admit** `i`.
4. Once the window is full (`i >= k - 1`), the front holds the maximum: `nums[deque.peekFirst()]`.

**Why dropping smaller values is safe:** suppose `nums[j] <= nums[i]` with `j < i`. Any
future window that contains `j` and ends at or after `i` also contains `i` (because
windows are contiguous and `j < i`), so `nums[j]` can never be the maximum of such a
window. Dropping it loses nothing.

## Dry Run

Input: `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`

The deque holds **indices**; the values column shows what those indices point at.

| Step | i | `nums[i]` | Expired (front) | Dominated (back) | Deque (indices) | Values | Window max |
|---:|---:|---:|---|---|---|---|---|
| 1 | 0 | 1 | — | — | `[0]` | `[1]` | — (window not full) |
| 2 | 1 | 3 | — | `0` (1 ≤ 3) | `[1]` | `[3]` | — |
| 3 | 2 | -1 | — | — | `[1, 2]` | `[3, -1]` | **3** |
| 4 | 3 | -3 | — | — | `[1, 2, 3]` | `[3, -1, -3]` | **3** |
| 5 | 4 | 5 | `1` (1 ≤ 4−3) | `3`, `2` (both ≤ 5) | `[4]` | `[5]` | **5** |
| 6 | 5 | 3 | — | — | `[4, 5]` | `[5, 3]` | **5** |
| 7 | 6 | 6 | — | `5`, `4` (both ≤ 6) | `[6]` | `[6]` | **6** |
| 8 | 7 | 7 | — | `6` (6 ≤ 7) | `[7]` | `[7]` | **7** |

Step 5 shows the two rules working together: index 1 left the window, and the three
smaller candidates behind it were dominated by the new value `5`. The deque never holds
more than `k` indices, and each index is inserted once and removed at most once — that
is where the O(n) comes from.

## Java Solution

See [`SlidingWindowMaximum.java`](./SlidingWindowMaximum.java).

```java
Deque<Integer> window = new ArrayDeque<>();
for (int i = 0; i < nums.length; i++) {
    while (!window.isEmpty() && window.peekFirst() <= i - k) {
        window.pollFirst();
    }
    while (!window.isEmpty() && nums[window.peekLast()] <= nums[i]) {
        window.pollLast();
    }
    window.addLast(i);
    if (i >= k - 1) {
        answer[i - k + 1] = nums[window.peekFirst()];
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every index is pushed once and popped at most once |
| **Space** | O(k) | the deque never holds more than `k` indices |

**Optimal?** Yes — every element has to be looked at, so Ω(n) is a lower bound and this
solution matches it.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if `k` changes between windows?"* → a heap of `(value, index)` with lazy
  deletion: O(n log n) overall, and it answers "current maximum" on demand.
- *"Can you do it without a deque?"* → yes, with two stacks and a transfer (the
  "sliding window maximum using two stacks" trick), O(n) amortised, but harder to read.
- *"What about the sliding window **minimum**?"* → identical, with the comparison
  flipped.
- *"How would you answer range-maximum queries on a static array?"* → a sparse table
  (O(n log n) build, O(1) query) or a segment tree (O(n) build, O(log n) query).

**Common mistakes:**
- ❌ Using `<=` instead of `<` in the domination loop → equal values are dropped, which
  is *fine* here, but the same habit in a **strictly increasing** variant silently
  breaks the tie-breaking.
- ❌ Forgetting to remove **expired** indices → the deque keeps growing and the front
  may point outside the current window, so the reported maximum belongs to the wrong
  window.
- ❌ Reporting the maximum **before** the window is full (`i >= k - 1`) → you emit
  `k - 1` extra answers for windows that do not exist.
- ❌ Storing **values** in the deque instead of **indices** → you can no longer tell
  which elements have expired.

**How to narrate:**
> "A heap would give O(n log k), but I can do better with a monotonic deque. I keep
> indices in decreasing value order. When a new value arrives I drop everything smaller
> from the back — it can never be a maximum again, because the new value is at least as
> large and stays in the window longer. I also drop expired indices from the front.
> The front is then always the maximum, and since each index goes in and comes out at
> most once, the whole pass is O(n)."

## Related Problems

- [Minimum Window Substring](../slidingwindow/MinimumWindowSubstring.md) — the same deque, mirrored comparison
- [Design a Min Queue](MinQueue.md) — running minimum in a queue
- [Task Scheduler](../heaps/TaskScheduler.md) — a priority queue with a cooldown
- [K Closest Elements](../heaps/KClosestElements.md) — a window sorted by distance
