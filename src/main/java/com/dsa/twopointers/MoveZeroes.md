---
title: Move Zeroes
leetcode: 283
difficulty: Easy
patterns: [Two Pointers, In-place compaction]
companies: [Amazon, Meta, Google, Microsoft, Uber, Adobe]
frequency: 4
tags: [array, two-pointers, in-place]
sampleInput: |
  5
  0 1 0 3 12
sampleOutput: "1 3 12 0 0"
---

# Move Zeroes — LeetCode 283

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · In-place compaction |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Adobe |

## Problem Statement

Move all the `0`s of an array to the **end** of it, keeping the **relative order** of the
non-zero elements. The operation must be done **in place**.

For `[0, 1, 0, 3, 12]` the result is `[1, 3, 12, 0, 0]`.

Note that `[1, 3, 0, 0, 12]` would also move the zeroes to the end, but it destroys the
order of the non-zero elements — that is not allowed.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers (-2³¹ ≤ nums[i] ≤ 2³¹ − 1)

The program prints the rearranged values separated by single spaces on one line.

## Sample Input

```
5
0 1 0 3 12
```

## Expected Output

```
1 3 12 0 0
```

## Approach — Compact the non-zero values, then fill with zeros

The problem is a stable compaction: "keep the values that matter, in order, at the
front". That is the same shape as
[Remove Duplicates from Sorted Array](RemoveDuplicatesFromSortedArray.md),
only the predicate is different — here it is "is not zero" instead of "differs from the
previous value".

```
write = 0
for read = 0 .. n-1:
    if nums[read] != 0:
        nums[write++] = nums[read]
while write < n:
    nums[write++] = 0
```

The zeroes are simply **left behind** by the first loop — they are overwritten by the
non-zero values that follow them — and the tail of the array is then filled with zeros.

**Why the order is preserved:** the non-zero values are copied in the order they are
read, so they land at the front in exactly their original relative order.

**The naive alternative** — swap every zero with the next non-zero — also works but
performs many more writes. The compaction version touches each element once.

## Dry Run

Input: `nums = [0, 1, 0, 3, 12]`

| Step | read | value | action | array | write |
|---:|---:|---:|---|---|---:|
| 0 | — | — | start | `[0, 1, 0, 3, 12]` | 0 |
| 1 | 0 | 0 | zero → **skip** | `[0, 1, 0, 3, 12]` | 0 |
| 2 | 1 | 1 | non-zero → copy to index 0 | `[1, 1, 0, 3, 12]` | 1 |
| 3 | 2 | 0 | zero → **skip** | `[1, 1, 0, 3, 12]` | 1 |
| 4 | 3 | 3 | non-zero → copy to index 1 | `[1, 3, 0, 3, 12]` | 2 |
| 5 | 4 | 12 | non-zero → copy to index 2 | `[1, 3, 12, 3, 12]` | 3 |
| 6 | — | — | fill the tail with zeros | `[1, 3, 12, 0, 0]` | 5 |

The result is `[1, 3, 12, 0, 0]` and the non-zero values kept their order ✓

## Java Solution

See [`MoveZeroes.java`](./MoveZeroes.java).

```java
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (nums[read] != 0) {
        nums[write++] = nums[read];
    }
}
while (write < nums.length) {
    nums[write++] = 0;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | two linear passes |
| **Space** | O(1) | the array is rearranged in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in one pass?"* → yes, with a swap-based variant that keeps a pointer
  at the last zero; it writes more but is still O(n).
- *"What if the zeroes had to go to the front?"* → mirror the roles of `read` and
  `write`.
- *"What if you needed the original positions of the non-zero values?"* → you need a
  hash map or an auxiliary array; in-place compaction loses the positions.
- *"Why not use a hash set?"* → the set would tell you *which* values are zero but not
  *where*; and it costs O(n) space.

**Common mistakes:**
- ❌ Swapping a zero with the **first** non-zero element → the order of the non-zero
  values is destroyed.
- ❌ Forgetting to fill the tail with zeros → the old values stay at the end.
- ❌ Copying the non-zero values but not preserving their order (e.g. by writing them
  from the back) → the stability requirement is broken.

**How to narrate:**
> "This is a stable compaction. I scan the array with a read pointer and copy every
> non-zero value to the next free slot with a write pointer, which keeps the non-zero
> values in their original order. The zeroes are left behind and overwritten, and at the
> end I fill the remaining slots with zeros. O(n) time and O(1) space, done in place."

## Related Problems

- [Remove Duplicates from Sorted Array](RemoveDuplicatesFromSortedArray.md) — the same compaction
- [Remove Duplicates from Sorted Array II](RemoveDuplicatesFromSortedArrayII.md) — at most two copies
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — two pointers, a different goal
- [Rotate Array](../arrays/RotateArray.md) — another in-place rearrangement
