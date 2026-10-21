---
title: Sort Array By Parity
leetcode: 905
difficulty: Easy
patterns: [Two Pointers, Partitioning]
companies: [Amazon, Meta, Google, Uber]
frequency: 3
tags: [sorting, partitioning, two-pointers, array]
sampleInput: |
  4
  3 1 2 4
sampleOutput: "4 2 1 3"
---

# Sort Array By Parity — LeetCode 905

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · Partitioning |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given an array of integers, move every **even** number before every **odd** number.

- The relative order inside the two groups does not matter.
- The rearrangement is done in place.
- Print the array as space-separated integers on one line.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — the length of the array (1 ≤ n ≤ 10⁴).
- `nums` — n space-separated integers.

## Sample Input

```
4
3 1 2 4
```

## Expected Output

```
4 2 1 3
```

## Approach — Two pointers, one swap per pair

Two pointers start at the two ends of the array:

- `left` walks right over the even numbers that are already in place and stops at the
  first **odd** number.
- `right` walks left over the odd numbers that are already in place and stops at the
  first **even** number.

Now `nums[left]` is odd and `nums[right]` is even, so they are swapped and both
pointers move inwards. When the pointers meet, everything is in place.

This is the classic **partition** step of quicksort, specialised to two groups.

## Dry Run

Input: `nums = [3, 1, 2, 4]`, `left = 0`, `right = 3`

### Round 1

| Step | pointer | scan | stop position | note |
|---:|---|---|---:|---|
| 1 | `left` | `nums[0] = 3` is odd | 0 | stops immediately |
| 2 | `right` | `nums[3] = 4` is even | 3 | stops immediately |
| 3 | — | swap `nums[0]` and `nums[3]` | — | `[4, 1, 2, 3]`, `left = 1`, `right = 2` |

### Round 2

| Step | pointer | scan | stop position | note |
|---:|---|---|---:|---|
| 4 | `left` | `nums[1] = 1` is odd | 1 | stops immediately |
| 5 | `right` | `nums[2] = 2` is even | 2 | stops immediately |
| 6 | — | swap `nums[1]` and `nums[2]` | — | `[4, 2, 1, 3]`, `left = 2`, `right = 1` |

### Round 3

| Step | pointer | scan | stop position | note |
|---:|---|---|---:|---|
| 7 | — | `left (2) >= right (1)` → the outer loop ends | — | `[4, 2, 1, 3]` |

Final array: **`[4, 2, 1, 3]`** — the evens (`4, 2`) are in front of the odds (`1, 3`).

### A longer scan — `[2, 4, 6, 1, 3, 5]`

| Step | pointer | scan | stop position | array |
|---:|---|---|---:|---|
| 1 | `left` | `2` even → `4` even → `6` even → `1` odd | 3 | `[2, 4, 6, 1, 3, 5]` |
| 2 | `right` | `5` odd → `3` odd → `1` odd → `6` even | 2 | `[2, 4, 6, 1, 3, 5]` |
| 3 | — | swap `nums[3]` and `nums[2]` | — | `[2, 4, 1, 6, 3, 5]`, `left = 4`, `right = 1` |
| 4 | — | `left (4) >= right (1)` → stop | — | `[2, 4, 1, 6, 3, 5]` |

The evens are `2, 4, 6` and the odds are `1, 3, 5` ✓

## Java Solution

See [`SortArrayByParity.java`](./SortArrayByParity.java).

```java
public static int[] sortArrayByParity(int[] nums) {
    int left = 0;
    int right = nums.length - 1;
    while (left < right) {
        while (left < right && nums[left] % 2 == 0) {
            left++;
        }
        while (left < right && nums[right] % 2 != 0) {
            right--;
        }
        if (left < right) {
            swap(nums, left, right);
            left++;
            right--;
        }
    }
    return nums;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each pointer crosses the array at most once |
| **Space** | O(1) | Only two indices |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Keep the relative order inside each group?"* → that is the **stable** version and
  needs O(n) extra space (or a stable partition algorithm).
- *"Three groups instead of two?"* → the Dutch national flag problem with three
  pointers.
- *"What if you only need the k smallest elements?"* → quickselect, O(n) on average.
- *"Can you do it with a hash map?"* → yes, but that is O(n) space and loses the
  original order.

**Common mistakes:**
- ❌ Using `nums[right] % 2 == 1` to detect an odd number → in Java, `-3 % 2` is
  `-1`, not `1`, so negative odd numbers are missed. Use `!= 0`.
- ❌ Swapping **without** moving the pointers afterwards → an infinite loop.
- ❌ Forgetting the `left < right` guard inside the inner loops → an
  `ArrayIndexOutOfBoundsException` when the pointers cross.
- ❌ Only swapping once and stopping → the rest of the array stays unsorted.

**How to narrate:**
> "This is quicksort's partition step specialised to two groups. The left pointer
> skips the evens that are already in place and stops at the first odd; the right
> pointer skips the odds and stops at the first even. I swap those two and move both
> pointers inwards. Each pointer crosses the array once, so it's O(n) time and O(1)
> space."

## Related Problems

- [Dutch National Flag](../../../../../../docs/topics/08-sorting.md) — the three-group version
- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — the same partition idea, recursive
- [Sort a Hand of Cards](../../../../../../docs/topics/08-sorting.md) — sorting by two keys
