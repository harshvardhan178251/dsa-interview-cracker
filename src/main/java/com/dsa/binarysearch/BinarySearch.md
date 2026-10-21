---
title: Binary Search
leetcode: 704
difficulty: Easy
patterns: [Binary search, Divide and conquer]
companies: [Amazon, Meta, JP Morgan, Microsoft, Intel]
frequency: 4
tags: [array, sorting, binary-search]
sampleInput: |
  6
  -1 0 3 5 9 12
  9
sampleOutput: "4"
---

# Binary Search — LeetCode 704

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Binary search · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Microsoft, Meta, Uber |

## Problem Statement

Given an array of integers `nums` sorted in **ascending order** (all values distinct) and an
integer `target`, return the **index** of `target`.

- If `target` is not present in `nums`, return `-1`.
- You may not use the `Arrays.binarySearch` helper — write the search yourself.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers, sorted ascending
- `target` — the value to locate

## Sample Input

```
6
-1 0 3 5 9 12
9
```

## Expected Output

```
4
```

`nums[4] == 9`, so the index `4` is returned.

## Approach — Half the search space, every step

A linear scan is O(n). Because the array is sorted we can throw away **half** of the
remaining candidates with every comparison, which gives O(log n).

Maintain the inclusive range `[left, right]` of indices that could still hold the target.
On each iteration:

1. Compute `mid = left + (right - left) / 2`.
2. If `nums[mid] == target` → return `mid`.
3. If `nums[mid] < target` → everything up to and including `mid` is too small, so
   `left = mid + 1`.
4. Otherwise everything from `mid` onwards is too big, so `right = mid - 1`.

The loop ends when `left > right`: the range is empty, so the target is absent and we
return `-1`.

**Why `left + (right - left) / 2` and not `(left + right) / 2`?** The second form overflows
when `left` and `right` are both near `Integer.MAX_VALUE`. The safe form has the same
meaning and never overflows.

**Loop condition.** `left <= right` (not `left < right`) — the range must be allowed to hold
exactly one element, otherwise a single-element array could never be searched.

## Dry Run

Input: `nums = [-1, 0, 3, 5, 9, 12]`, `target = 9`

| Step | left | right | mid | `nums[mid]` | comparison | range after | result |
|---:|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 5 | 2 | 3 | 3 < 9 | `[3, 5]` | keep going |
| 2 | 3 | 5 | 4 | 9 | 9 == 9 | `[3, 5]` | **return 4** |

The range shrank from 6 candidates to 3 to a single hit — two probes for a 6-element array.

### Trace with a miss — `nums = [-1, 0, 3, 5, 9, 12]`, `target = 4`

| Step | left | right | mid | `nums[mid]` | comparison | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 5 | 2 | 3 | 3 < 4 | `[3, 5]` |
| 2 | 3 | 5 | 4 | 9 | 9 > 4 | `[3, 3]` |
| 3 | 3 | 3 | 3 | 5 | 5 > 4 | `[3, 2]` |

Now `left > right` → the range is empty → return **-1**.

## Java Solution

See [`BinarySearch.java`](./BinarySearch.java).

```java
public static int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | The candidate range halves every iteration |
| **Space** | O(1) | Only three index variables |

**Optimal?** Yes. Any comparison-based search of a sorted array needs Ω(log n) probes.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not sorted?"* → binary search is invalid; sort first (O(n log n)) or
  fall back to a hash map / linear scan.
- *"What if the array contains duplicates and you want the first occurrence?"* → use a
  lower-bound search, see [Find First and Last Position](./FindFirstAndLastPosition.java).
- *"What if you get to choose the probe order?"* → interpolation search does better on
  uniformly distributed data, but degrades to O(n) on skewed data.
- *"How would you search a huge file that does not fit in memory?"* → binary search on the
  file offsets, seeking to the middle of the byte range and re-reading.

**Common mistakes:**
- ❌ Writing `(left + right) / 2` → overflow risk on large indices.
- ❌ Using `left < right` → the last candidate is never inspected, so a one-element array
  fails.
- ❌ Off-by-one on the updates (`left = mid` instead of `left = mid + 1`) → infinite loop or
  a wrong answer.
- ❌ Returning the **value** instead of the **index** → the question asks for the index.

**How to narrate:**
> "The array is sorted, so instead of scanning I can halve the candidate range each step.
> I'll keep `[left, right]` as the still-viable window, probe the middle, and move the bound
> that the comparison rules out. The window empties out in O(log n) probes, and if it empties
> without a hit the answer is -1."

## Related Problems

- [Search Insert Position](./SearchInsertPosition.java) — the lower-bound variant
- [Find First and Last Position](./FindFirstAndLastPosition.java) — lower and upper bounds
- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — binary search on a rotated array
- [Two Sum](../arrays/TwoSum.java) — the hashing alternative
