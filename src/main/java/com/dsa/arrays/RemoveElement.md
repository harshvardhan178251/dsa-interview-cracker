---
title: Remove Element
leetcode: 27
difficulty: Easy
patterns: [Two pointers, In-place compaction]
companies: [Amazon, Meta, Uber, Intel]
frequency: 2
tags: [array, two-pointers, in-place]
sampleInput: |
  5
  3 2 2 3 4
  2
sampleOutput: "3"
---

# Remove Element — LeetCode 27

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · In-place compaction |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Meta, Uber, Intel |

## Problem Statement

Given an integer array `nums` and an integer `val`:

- Remove every occurrence of `val` from `nums` **in place**.
- The surviving elements must keep their **original relative order**.
- Return the number of elements that remain (`k`).

After the call, the first `k` positions of `nums` hold the survivors; the positions from
`k` onwards are irrelevant.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
val
```

- `n` — length of the array (0 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers
- `val` — the value to remove

## Sample Input

```
5
3 2 2 3 4
2
```

## Expected Output

```
3
```

The survivors are `[3, 3, 4]`, so `k = 3`.

## Approach — Write Pointer / Read Pointer

Two pointers over the **same** array:

- `read` scans every element from left to right.
- `write` marks the next free slot for a surviving element.

For each `read`:

- If `nums[read] == val`, skip it — the element is dropped.
- Otherwise copy it to `nums[write]` and advance `write`.

`write` never runs ahead of `read`, so the copy never clobbers an element we have not
read yet. When `write == read` the copy is a harmless self-assignment.

**Why the order is preserved:** survivors are copied in exactly the order they are read,
so the relative order of the remaining elements is untouched.

## Dry Run

Input: `nums = [3, 2, 2, 3, 4]`, `val = 2`, `write = 0`

| Step | `read` | `nums[read]` | equals `val`? | action | array after | `write` after |
|---:|---:|---:|---|---|---|---:|
| 1 | 0 | 3 | no | `nums[0] = 3` (self-copy) | `[3, 2, 2, 3, 4]` | 1 |
| 2 | 1 | 2 | **yes** | skip | `[3, 2, 2, 3, 4]` | 1 |
| 3 | 2 | 2 | **yes** | skip | `[3, 2, 2, 3, 4]` | 1 |
| 4 | 3 | 3 | no | `nums[1] = 3` | `[3, 3, 2, 3, 4]` | 2 |
| 5 | 4 | 4 | no | `nums[2] = 4` | `[3, 3, 4, 3, 4]` | 3 |

Returned `k = 3`; the first three slots hold `[3, 3, 4]` — the original order of the
survivors is preserved ✓

## Java Solution

See [`RemoveElement.java`](./RemoveElement.java).

```java
public static int removeElement(int[] nums, int val) {
    int write = 0;
    for (int read = 0; read < nums.length; read++) {
        if (nums[read] != val) {
            nums[write] = nums[read];
            write++;
        }
    }
    return write;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | A single pass; every element is read once |
| **Space** | O(1) | Two indices, the array is reused |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the order of the survivors did not matter?"* → swap the survivor with the
  last element and shrink the array (O(1) too, but destroys the order).
- *"What if you had to remove duplicates as well?"* → use a `HashSet` to track what has
  been kept, or sort first.
- *"What if the array were a linked list?"* → use two pointers: one walks ahead, the
  other rewires the previous node's `next` to skip the doomed node.
- *"What if `val` appears zero times?"* → the algorithm degenerates to a no-op and
  returns `n` (every element is copied onto itself).
- *"How would you remove the k-th occurrence?"* → count occurrences in the copy loop
  and skip only that one.

**Common mistakes:**
- ❌ Returning the **array** instead of the count — the problem asks for `k`.
- ❌ Advancing `write` even when the element is skipped — that leaves holes (zeros or
  stale values) between survivors.
- ❌ Using a separate output array and copying back — that breaks the "in place"
  requirement and wastes O(n) space.
- ❌ **Filtering out the wrong value** — the classic "remove duplicates" variant must
  compare against the *last kept* element, not against `val` alone.

**How to narrate:**
> "I use two pointers on the same array. `read` walks every element, `write` points at
> the next free slot. When I see a value that isn't `val`, I copy it to `write` and
> advance `write`; otherwise I just skip. Because `write` never gets ahead of `read`,
> it's safe to overwrite in place, and the survivors keep their original order. The
> final value of `write` is the number of remaining elements."

## Related Problems

- [Two Sum](TwoSum.md) — the same "in-place + return an answer" contract
- [Contains Duplicate II](ContainsDuplicateII.md) — index bookkeeping with a hash map
- [Remove Duplicates from Sorted Array](../../../../../../docs/topics/12-prefixsum.md) — the sorted-array variant
