---
title: Max of Min for Every Window
leetcode: null
difficulty: Hard
patterns: [Monotonic stack, Suffix maximum]
companies: [Amazon, Microsoft, Infosys]
frequency: 3
tags: [stack, monotonic-stack, sliding-window, hard]
sampleInput: |
  5
  4 2 6 1 5
  3
sampleOutput: "2"
---

# Max of Min for Every Window

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Monotonic stack · Suffix maximum |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

Given an array and a window size `k`, consider every window of `k` consecutive elements.
For each window take its **smallest** element (its minimum). The answer is the **largest**
among those minimums.

- `[4, 2, 6, 1, 5]` with `k = 3` → the windows are `[4,2,6]` (min 2), `[2,6,1]` (min 1) and
  `[6,1,5]` (min 1) → the answer is **2**.

## Input Format

The program reads from standard input:

```
n
values[0] values[1] ... values[n-1]
k
```

- `n` — the number of elements (1 ≤ n ≤ 10⁵)
- `values` — n space-separated integers (0 ≤ v ≤ 10⁹)
- `k` — the window size (1 ≤ k ≤ n)

## Sample Input

```
5
4 2 6 1 5
3
```

## Expected Output

```
2
```

## Approach — Widest Window per Element, Then a Suffix Maximum

The brute force is O(n · k): one sliding-window minimum per window. This solution is O(n).

**Step 1 — how wide can a window be around an element?**

For each index `i` compute:

- `left[i]` — the index of the closest element to the left that is **strictly smaller** than
  `values[i]` (`-1` if there is none),
- `right[i]` — the index of the closest element to the right that is **smaller than or equal
  to** `values[i]` (`n` if there is none).

The asymmetric comparison (`<` on the left, `<=` on the right) is what makes the boundaries
unambiguous when the array contains equal values.

Then

```
length[i] = right[i] - left[i] - 1
```

is the size of the **widest** window in which `values[i]` is the minimum. Inside that window
every element is at least `values[i]`, and the window is bounded exactly by the two
boundaries.

**Step 2 — bucket the answers by length.**

`maxOfMin[length[i]] = max(maxOfMin[length[i]], values[i])` — for now `maxOfMin[L]` is the
largest element that is the minimum of a window of size exactly `L`.

**Step 3 — propagate downwards.**

A window of size `L` contains windows of every smaller size, and the minimum of the small
window is never smaller than the minimum of the big one. So the answer for size `L` is at
least the answer for size `L + 1`:

```
for (L = n-1 down to 1) maxOfMin[L] = max(maxOfMin[L], maxOfMin[L+1])
```

After this pass, `maxOfMin[k]` is the maximum among the minimums of all windows of size `k`.

**Why the two monotonic-stack passes:** `left[i]` and `right[i]` are the classic
"previous smaller" / "next smaller" queries, and one monotonic stack answers all of them in
O(n) — the stack keeps the candidate boundaries with strictly decreasing values.

## Dry Run

Input: `values = [4, 2, 6, 1, 5]`, `k = 3`

**Step 1 — the boundaries**

| i | `values[i]` | `left[i]` (previous strictly smaller) | `right[i]` (next smaller-or-equal) | `length[i]` |
|---:|---:|---:|---:|---:|
| 0 | `4` | `-1` | `1` (the `2`) | `1 - (-1) - 1 = 1` |
| 1 | `2` | `-1` | `3` (the `1`) | `3 - (-1) - 1 = 3` |
| 2 | `6` | `1` (the `2`) | `3` (the `1`) | `3 - 1 - 1 = 1` |
| 3 | `1` | `-1` | `5` (end) | `5 - (-1) - 1 = 5` |
| 4 | `5` | `3` (the `1`) | `5` (end) | `5 - 3 - 1 = 1` |

**Step 2 — bucket by length**

| i | `values[i]` | `length[i]` | `maxOfMin[length]` after |
|---:|---:|---:|---|
| 0 | `4` | 1 | `maxOfMin[1] = 4` |
| 1 | `2` | 3 | `maxOfMin[3] = 2` |
| 2 | `6` | 1 | `maxOfMin[1] = max(4, 6) = 6` |
| 3 | `1` | 5 | `maxOfMin[5] = 1` |
| 4 | `5` | 1 | `maxOfMin[1] = max(6, 5) = 6` |

`maxOfMin = [_, 6, 0, 2, 0, 1]`

**Step 3 — the suffix maximum**

| length | `maxOfMin[length]` before | `maxOfMin[length + 1]` | after |
|---:|---:|---:|---:|
| 5 | `1` | `0` | `1` |
| 4 | `0` | `1` | `1` |
| 3 | `2` | `1` | `2` |
| 2 | `0` | `2` | `2` |
| 1 | `6` | `2` | `6` |

The answer for `k = 3` is `maxOfMin[3] = 2` ✓ — the same value the brute force finds
(`max(2, 1, 1)`).

## Java Solution

See [`MaxOfMinForEveryWindow.java`](./MaxOfMinForEveryWindow.java).

```java
public static int maxOfMins(int[] values, int k) {
    int n = values.length;
    if (n == 0 || k <= 0 || k > n) {
        return 0;
    }

    int[] left = new int[n];
    int[] right = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && values[stack.peek()] >= values[i]) {
            stack.pop();
        }
        left[i] = stack.isEmpty() ? -1 : stack.peek();
        stack.push(i);
    }
    stack.clear();
    for (int i = n - 1; i >= 0; i--) {
        while (!stack.isEmpty() && values[stack.peek()] > values[i]) {
            stack.pop();
        }
        right[i] = stack.isEmpty() ? n : stack.peek();
        stack.push(i);
    }

    int[] maxOfMin = new int[n + 1];
    for (int i = 0; i < n; i++) {
        int length = right[i] - left[i] - 1;
        maxOfMin[length] = Math.max(maxOfMin[length], values[i]);
    }
    for (int length = n - 1; length >= 1; length--) {
        maxOfMin[length] = Math.max(maxOfMin[length], maxOfMin[length + 1]);
    }
    return maxOfMin[k];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two monotonic stack passes, one bucketing pass, one suffix pass |
| **Space** | O(n) | The boundary arrays and the bucket array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Give the answer for every window instead of one number."* → keep a deque of the window
  minimums and a second deque of their maxima.
- *"Give the maximum minimum for every window **size**."* → the algorithm already computes
  it: return the whole `maxOfMin` array.
- *"What if the array is circular?"* → duplicate the array and handle the wrap-around
  windows separately.
- *"What about the minimum among the maximums?"* → symmetric: use the previous/next
  **greater** boundaries.

**Common mistakes:**
- ❌ Using the same comparison on both sides (`>=` on the left **and** on the right) → equal
  elements give the wrong window lengths and the answer can be too small.
- ❌ Forgetting the **suffix maximum** pass → `maxOfMin[k]` is then only correct when some
  element happens to have exactly that maximal length.
- ❌ Assuming `maxOfMin[k]` is the answer *before* the suffix pass → shorter windows are
  missed.

**How to narrate:**
> "For every element I find the widest window in which it is the minimum: the previous
> strictly smaller element on the left and the next smaller-or-equal element on the right
> are its boundaries, and I get both with two monotonic stack passes. The distance between
> the boundaries is the window length, so I bucket each element into `maxOfMin[length]`.
> Then a single suffix pass propagates the answers downwards, because a window of size L
> contains windows of every smaller size. The answer for size k is `maxOfMin[k]`. O(n) time."

## Related Problems

- [Largest Rectangle in Histogram](LargestRectangleInHistogram.md) — the same boundary computation
- [Sliding Window Maximum](../../../../../../docs/topics/11-slidingwindow.md) — the related per-window variant
- [Next Greater Element](NextGreaterElement.md) — the same monotonic stack
