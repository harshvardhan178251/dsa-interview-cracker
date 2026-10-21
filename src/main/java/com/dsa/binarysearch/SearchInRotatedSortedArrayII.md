---
title: Search in Rotated Sorted Array II
leetcode: 81
difficulty: Medium
patterns: [Binary search, Rotated array, Duplicates]
companies: [Amazon, Google, Meta, Microsoft, Uber]
frequency: 4
tags: [array, sorting, binary-search]
sampleInput: |
  5
  1 0 1 1 1
  0
sampleOutput: "true"
---

# Search in Rotated Sorted Array II — LeetCode 81

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Rotated array · Duplicates |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

An ascending array of integers may contain **duplicates** and is rotated at an unknown pivot.
Given the rotated array `nums` and a `target`, return `true` if `target` is present.

This is the *decision* version of the problem — the answer is a boolean, not an index.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers: a rotated ascending array, duplicates allowed
- `target` — the value to look for

## Sample Input

```
5
1 0 1 1 1
0
```

## Expected Output

```
true
```

`0` is present at index `1`.

## Approach — The same search, with one escape hatch

The distinct-value algorithm works unchanged until we hit the ambiguity
`nums[left] == nums[mid] == nums[right]`. In that situation we cannot tell which half is
sorted, so we **shrink both ends by one** and try again:

```java
if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
    left++;
    right--;
}
```

Losing one element on each side is safe: `nums[left] == nums[mid] != target` (we already
checked for equality with the target), so the discarded element cannot be the answer.

**Why the worst case is O(n).** If every element is equal, every iteration hits the
ambiguity branch and removes only two elements. But note that the ambiguity branch only
fires when `nums[left] == nums[mid] == nums[right]` — a *uniform* neighbourhood. As soon as
the values differ the algorithm is back to O(log n) behaviour. The classic pathological
input is an array of all-equal values.

## Dry Run

Input: `nums = [1, 0, 1, 1, 1]`, `target = 0`

| Step | left | right | mid | `nums[mid]` | branch taken | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 4 | 2 | 1 | `nums[0]==nums[2]==nums[4]==1` → ambiguous | `[1, 3]` |
| 2 | 1 | 3 | 2 | 1 | left half sorted (`nums[1]=0 <= 1`); `0 <= 0 < 1` → target inside | `[1, 1]` |
| 3 | 1 | 1 | 1 | 0 | `nums[mid] == target` | **return true** |

### Trace with a miss — `nums = [2, 5, 6, 0, 0, 1, 2]`, `target = 7`

| Step | left | right | mid | `nums[mid]` | branch taken | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 0 | right half sorted; `0 < 7` but `7 > nums[6]=2` → not there | `[0, 2]` |
| 2 | 0 | 2 | 1 | 5 | left half sorted (`2 <= 5`); `7 > 5` → not there | `[2, 2]` |
| 3 | 2 | 2 | 2 | 6 | `nums[2]==nums[2]==nums[2]` → ambiguous | `[3, 1]` |

`left > right` → the range is empty → return **false**.

## Java Solution

See [`SearchInRotatedSortedArrayII.java`](./SearchInRotatedSortedArrayII.java).

```java
public static boolean search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return true;
        }
        if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
            // Ambiguous: shrink both ends.
            left++;
            right--;
        } else if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) average, **O(n) worst case** | The ambiguous branch removes only two elements per step |
| **Space** | O(1) | Only three index variables |

**Optimal?** No — the duplicates make it impossible in general. A linear scan is O(n) and
always correct; the binary search is a fast path that degenerates gracefully.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why can't you always get O(log n) here?"* → because equal elements hide the rotation
  point. Proving that Ω(n) probes are needed for the all-equal array is a nice discussion.
- *"Return the index instead of a boolean."* → any matching index is acceptable; be explicit
  that the answer may differ between runs.
- *"What if the array were rotated *and* sorted descending?"* → mirror the comparison.
- *"How would you detect the rotation point first?"* → find the index where
  `nums[i] > nums[i+1]`; with duplicates that pivot is not unique, which is exactly why this
  problem is harder.

**Common mistakes:**
- ❌ Forgetting the ambiguity branch → the "which half is sorted?" test gives a wrong answer
  on arrays like `[1,0,1,1,1]`.
- ❌ Shrinking only one end in the ambiguous case → you can discard the target.
- ❌ Claiming O(log n) time in the interview → it is O(n) in the worst case; say so.
- ❌ Comparing `nums[mid]` with the target *before* the ambiguity check → the order matters,
  the equality check must come first.

**How to narrate:**
> "This is the same rotated binary search, but duplicates can make the 'which half is sorted'
> question undecidable. When the left, middle and right values are all equal I know the
> target isn't the middle value, so I can safely shrink both ends by one. Everything else
> follows the standard rotated search, and I should mention that the worst case is linear."

## Related Problems

- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — the distinct-value version
- [Find Minimum in Rotated Sorted Array](./FindMinimumInRotatedSortedArray.java) — the same shape, a different question
- [Binary Search](./BinarySearch.java) — the plain version
