---
title: Remove Duplicates from Sorted Array
leetcode: 26
difficulty: Easy
patterns: [Two Pointers, In-place compaction]
companies: [Google, Meta, Bloomberg, Goldman Sachs, eBay]
frequency: 4
tags: [array, two-pointers, in-place]
sampleInput: |
  6
  0 0 1 1 1 2
sampleOutput: |
  3
  0 1 2
---

# Remove Duplicates from Sorted Array — LeetCode 26

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · In-place compaction |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a **sorted** array `nums`, remove the duplicates **in place** so that the first
`k` elements contain the distinct values in sorted order. Return `k`.

- The array is sorted in ascending order.
- The elements **after** `k` do not matter.
- The solution must use **O(1)** extra space.

For `[0, 0, 1, 1, 1, 2]` the result is `[0, 1, 2, …]` and `k = 3`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 3 × 10⁴)
- `nums` — n space-separated integers in **ascending** order

The program prints the number of distinct values on the first line and the values
themselves on the second line.

## Sample Input

```
6
0 0 1 1 1 2
```

## Expected Output

```
3
0 1 2
```

## Approach — Two pointers over one array

Because the array is sorted, equal values are **adjacent**. That is the whole trick: a
value is new exactly when it differs from the last value that was written.

Two pointers:

- **`read`** scans every element of the array;
- **`write`** marks the position where the next distinct value belongs.

```
write = 1                       // nums[0] is always kept
for read = 1 .. n-1:
    if nums[read] != nums[write - 1]:
        nums[write] = nums[read]
        write++
return write
```

The comparison is always against `nums[write - 1]` — the **last written** value — and not
against `nums[read - 1]`, because the array is being overwritten while it is read.

## Dry Run

Input: `nums = [0, 0, 1, 1, 1, 2]`

| Step | read | value | last written | action | array | write |
|---:|---:|---:|---:|---|---|---:|
| 0 | — | — | — | keep `nums[0] = 0` | `[0, 0, 1, 1, 1, 2]` | 1 |
| 1 | 1 | 0 | 0 | equal → **skip** | `[0, 0, 1, 1, 1, 2]` | 1 |
| 2 | 2 | 1 | 0 | different → copy to index 1 | `[0, 1, 1, 1, 1, 2]` | 2 |
| 3 | 3 | 1 | 1 | equal → **skip** | `[0, 1, 1, 1, 1, 2]` | 2 |
| 4 | 4 | 1 | 1 | equal → **skip** | `[0, 1, 1, 1, 1, 2]` | 2 |
| 5 | 5 | 2 | 1 | different → copy to index 2 | `[0, 1, 2, 1, 1, 2]` | 3 |

`k = 3` and `nums[0..2] = [0, 1, 2]` ✓

## Java Solution

See [`RemoveDuplicatesFromSortedArray.java`](./RemoveDuplicatesFromSortedArray.java).

```java
int write = 1;
for (int read = 1; read < nums.length; read++) {
    if (nums[read] != nums[write - 1]) {
        nums[write++] = nums[read];
    }
}
return write;
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass over the array |
| **Space** | O(1) | the result is written into the input array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not sorted?"* → use a hash set: O(n) time but O(n) space.
- *"What if at most two copies may stay?"* → that is
  [Remove Duplicates from Sorted Array II](RemoveDuplicatesFromSortedArrayII.md).
- *"What if you cannot modify the input?"* → copy the distinct values into a new array.
- *"Can you do it with a single pointer?"* → yes, by remembering the last kept value in
  a local variable instead of reading `nums[write - 1]`.

**Common mistakes:**
- ❌ Comparing with `nums[read - 1]` instead of `nums[write - 1]` → after a copy the
  neighbours are not the same any more, so duplicates slip through.
- ❌ Starting `write` at `0` → the first element would be compared with itself and
  skipped.
- ❌ Forgetting the array is **sorted** → the "adjacent duplicates" assumption breaks.

**How to narrate:**
> "The array is sorted, so duplicates are adjacent. I use two pointers on the same array:
> `read` scans everything, `write` marks where the next distinct value goes. A value is
> copied only when it differs from the last value I wrote. One pass, O(1) extra space."

## Related Problems

- [Remove Duplicates from Sorted Array II](RemoveDuplicatesFromSortedArrayII.md) — at most two copies
- [Move Zeroes](MoveZeroes.md) — the same compaction, a different value
- [Valid Palindrome](ValidPalindrome.md) — two pointers over a string
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — two pointers, a different goal
