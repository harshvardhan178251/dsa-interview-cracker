---
title: Maximum Width Ramp
leetcode: 962
difficulty: Hard
patterns: [Monotonic stack, Two pointers]
companies: [Amazon, Google, Meta, Uber]
frequency: 2
tags: [array, stack, hard]
sampleInput: |
  5
  3 1 3 4 2
sampleOutput: "3"
---

# Maximum Width Ramp — LeetCode 962

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Monotonic stack · Two pointers |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an array `nums`, find the **maximum** `j - i` such that:

- `i <= j`, and
- `nums[i] <= nums[j]`.

If no such pair with `i < j` exists, return `0`.

Such a pair is called a **ramp**: you walk up from `i` to `j` without ever dropping
below the starting value.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers

## Sample Input

```
5
3 1 3 4 2
```

## Expected Output

```
3
```

`nums[1] = 1 <= nums[4] = 2` and `4 - 1 = 3`. The pairs `(1, 4)`, `(1, 3)` and `(0, 3)`
all have width 3 or less, so **3** is the maximum.

## Approach — Monotonic Stack

Brute force tries all O(n²) pairs. Two observations shrink the search space.

**Observation 1 — only prefix minima matter as the left end.** If `nums[i]` is not
strictly smaller than every element before it, then there is some `i' < i` with
`nums[i'] <= nums[i]`. Any ramp that starts at `i` also works starting at `i'`, and
`i' < i` gives a **wider** ramp. So the left end must be a *prefix minimum*.

We collect those prefix minima into a **decreasing stack** of indices (values strictly
decreasing, indices increasing).

**Observation 2 — the right end should be as far right as possible.** So we scan `j`
from the **right** and, while the stack's top satisfies `nums[top] <= nums[j]`, we pop it
and record the width `j - top`. Because `j` decreases, the first time a candidate is
popped we have found its **widest** ramp.

**Why the pop is permanent:** once a candidate `i` has been matched with some `j`, any
later `j'` would give a smaller width, so `i` can never be useful again.

## Dry Run

Input: `nums = [3, 1, 3, 4, 2]`

### Phase 1 — build the decreasing stack of prefix minima

| Step | `i` | `nums[i]` | stack before (front → back) | `nums[stack.peek()]` | push? | stack after |
|---:|---:|---:|---|---:|---|---|
| 1 | 0 | 3 | `[]` | — | yes (empty) | `[0]` |
| 2 | 1 | 1 | `[0]` | 3 | yes (1 < 3) | `[1, 0]` |
| 3 | 2 | 3 | `[1, 0]` | 1 | no (3 > 1) | `[1, 0]` |
| 4 | 3 | 4 | `[1, 0]` | 1 | no (4 > 1) | `[1, 0]` |
| 5 | 4 | 2 | `[1, 0]` | 1 | no (2 > 1) | `[1, 0]` |

Stack (front = top): `[1, 0]` → candidates `i = 1` (value 1) and `i = 0` (value 3).

### Phase 2 — scan `j` from right to left

| Step | `j` | `nums[j]` | stack top | `nums[top] <= nums[j]`? | action | width | `best` after |
|---:|---:|---:|---:|---|---|---:|---:|
| 1 | 4 | 2 | 1 (value 1) | 1 ≤ 2 → **yes** | pop 1 | 4 − 1 = **3** | 3 |
| 2 | 4 | 2 | 0 (value 3) | 3 ≤ 2 → **no** | stop popping | — | 3 |
| 3 | 3 | 4 | 0 (value 3) | 3 ≤ 4 → **yes** | pop 0 | 3 − 0 = 3 | 3 |
| 4 | 2 | 3 | — (empty) | — | skip | — | 3 |
| 5 | 1 | 1 | — (empty) | — | skip | — | 3 |
| 6 | 0 | 3 | — (empty) | — | skip | — | 3 |

Answer: **3**

## Java Solution

See [`MaximumWidthRamp.java`](./MaximumWidthRamp.java).

```java
public static int maxWidthRamp(int[] nums) {
    int n = nums.length;
    if (n == 0) {
        return 0;
    }
    Deque<Integer> candidates = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        if (candidates.isEmpty() || nums[i] < nums[candidates.peek()]) {
            candidates.push(i);
        }
    }
    int best = 0;
    for (int j = n - 1; j >= 0; j--) {
        while (!candidates.isEmpty() && nums[candidates.peek()] <= nums[j]) {
            best = Math.max(best, j - candidates.pop());
        }
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every index is pushed at most once and popped at most once |
| **Space** | O(n) | The stack holds at most n indices |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with O(1) extra space?"* → not in general; the stack is what
  compresses the O(n²) candidate pairs into O(n).
- *"What if the condition were `nums[i] < nums[j]` (strict)?"* → the same algorithm
  works, only the comparison changes.
- *"How does this relate to the "largest rectangle in histogram" problem?"* → both use
  a monotonic stack; here the stack keeps prefix minima instead of heights.
- *"What if you need the actual pair `(i, j)`?"* → remember the `i` and `j` of the best
  width while popping.
- *"Can you do it with two pointers without a stack?"* → not directly; the stack is what
  lets you skip left ends that are dominated.

**Common mistakes:**
- ❌ Pushing every index onto the stack — only **prefix minima** belong there, otherwise
  the stack is O(n) but the "pop is permanent" argument breaks.
- ❌ Scanning `j` from left to right — then the first match found is the *narrowest*
  one for that candidate and the pop would discard a better answer.
- ❌ Using `<` instead of `<=` in the pop condition — equal values form a valid ramp.
- ❌ Forgetting the `isEmpty()` guard before `peek()` — `ArrayDeque.peek()` throws
  `NoSuchElementException` on an empty deque.

**How to narrate:**
> "The left end of a ramp must be a prefix minimum — otherwise an earlier, smaller
> value would give a wider ramp. So I collect those prefix minima in a decreasing stack.
> Then I scan j from the right and, while the top candidate is at most nums[j], I pop it
> and record the width: because j only decreases, the first j that matches a candidate is
> the widest ramp it can ever get, so popping is safe. Each index is pushed and popped at
> most once, so it's O(n)."

## Related Problems

- [Maximum Subarray](MaxSubarray.md) — a different linear scan
- [Maximum Gap](MaxGap.md) — the pigeonhole/bucket argument
- [Largest Rectangle in Histogram](../../../../../../docs/topics/12-prefixsum.md) — the same monotonic-stack idea
