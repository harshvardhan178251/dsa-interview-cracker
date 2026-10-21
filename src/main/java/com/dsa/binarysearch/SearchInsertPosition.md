---
title: Search Insert Position
leetcode: 35
difficulty: Easy
patterns: [Binary search, Lower bound]
companies: [Meta, Google, Apple, Airbnb, Lyft, Infosys, Capgemini, Freshworks]
frequency: 4
tags: [array, sorting, binary-search]
sampleInput: |
  6
  1 3 5 6 8 9
  7
sampleOutput: "4"
---

# Search Insert Position — LeetCode 35

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Binary search · Lower bound |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Given a sorted array of **distinct** ascending integers and a `target` value, return the index
where `target` would be inserted so that the array remains sorted.

- If `target` already exists, the returned index may be the position of that existing
  element.
- The answer is always in the range `[0, nums.length]` — the target may belong at the very end.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers, sorted ascending and distinct
- `target` — the value to place

## Sample Input

```
6
1 3 5 6 8 9
7
```

## Expected Output

```
4
```

`7` belongs between `6` (index 3) and `8` (index 4), so it is inserted at index `4`.

## Approach — Binary search for the lower bound

The answer is the **lower bound** of the target: the first index whose value is
`>= target`. Formally it is the smallest `i` with `nums[i] >= target`, or `n` when every
element is smaller.

The trick that makes this clean is a **half-open range** `[left, right)` with
`right = nums.length`:

- `left` is the first index that might still satisfy `nums[left] >= target`.
- `right` is the first index that is definitely past the answer.

The loop invariant is `nums[left - 1] < target <= nums[right]` (out-of-range indices read as
`-∞` / `+∞`). Inside the loop:

- If `nums[mid] < target` then `mid` is too early → `left = mid + 1`.
- Otherwise `mid` is a valid answer candidate → `right = mid`.

Because `left < right` (not `<=`), the loop terminates with `left == right`, and that value
**is** the answer — no post-loop fix-up is needed.

## Dry Run

Input: `nums = [1, 3, 5, 6, 8, 9]`, `target = 7`

| Step | left | right | mid | `nums[mid]` | `nums[mid] < 7`? | range after | `left` |
|---:|---:|---:|---:|---:|---|---|---:|
| 1 | 0 | 6 | 3 | 6 | yes | `[4, 6)` | 4 |
| 2 | 4 | 6 | 5 | 9 | no | `[4, 5)` | 4 |
| 3 | 4 | 5 | 4 | 8 | no | `[4, 4)` | 4 |

`left == right == 4` → the target is inserted at index **4**.

### Trace with a target smaller than everything — `nums = [1, 3, 5]`, `target = 0`

| Step | left | right | mid | `nums[mid]` | `nums[mid] < 0`? | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 3 | 1 | 3 | yes | `[2, 3)` |
| 2 | 2 | 3 | 2 | 5 | yes | `[3, 3)` |

`left == right == 3` → the target goes at the end, index **3** (= `nums.length`).

## Java Solution

See [`SearchInsertPosition.java`](./SearchInsertPosition.java).

```java
public static int searchInsert(int[] nums, int target) {
    int left = 0;
    int right = nums.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | The candidate range halves every iteration |
| **Space** | O(1) | Only three index variables |

**Optimal?** Yes — Ω(log n) comparison probes are necessary in the worst case.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array has duplicates?"* → the lower bound still works, but it returns the
  **first** equal position; ask whether the interviewer wants the first or the last.
- *"Now find the position of an existing element only (return -1 if absent)."* → after the
  loop, check `left < nums.length && nums[left] == target`.
- *"How would you use this in a real system?"* → it is the building block of
  `Arrays.binarySearch`, of B-tree page splits, and of insertion into a sorted cache.
- *"What if the array is on disk?"* → the same algorithm over a byte-offset range.

**Common mistakes:**
- ❌ Using an inclusive range `right = nums.length - 1` → you can no longer return `n` for a
  target larger than every element.
- ❌ Using `left < right` with `right = nums.length - 1` → the answer `n` becomes unreachable.
- ❌ Forgetting that `left == right` on exit *is* the answer (no extra `+1`/`-1` fix-up).

**How to narrate:**
> "This is a lower-bound search: the first index whose value is at least the target. I'll keep
> a half-open window `[left, right)` starting at `right = nums.length` so that inserting past
> the last element is naturally handled. When the window collapses, `left` is the insertion
> point — no extra correction needed."

## Related Problems

- [Binary Search](./BinarySearch.java) — the exact-match variant
- [Find First and Last Position](./FindFirstAndLastPosition.java) — lower bound *and* upper bound
- [Square Root of a Number](./SquareRootOfANumber.java) — binary search on the answer
