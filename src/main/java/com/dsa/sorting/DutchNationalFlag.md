---
title: Dutch National Flag
leetcode: 75
difficulty: Medium
patterns: [Three-way partitioning, Two pointers]
companies: [Amazon, Google, Netflix, Adobe, ByteDance, Tech Mahindra, Cognizant, EY]
frequency: 4
tags: [sorting, partitioning, two-pointers, array]
sampleInput: |
  6
  2 0 2 1 1 0
sampleOutput: "0 0 1 1 2 2"
---

# Dutch National Flag — LeetCode 75

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Three-way partitioning · Two pointers |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

An array contains only the values `0`, `1` and `2`. Sort it **in a single pass** so
that all the `0`s come first, then all the `1`s, then all the `2`s.

- The relative order of the equal values does not matter.
- Print the sorted array as space-separated integers on one line.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — the length of the array (1 ≤ n ≤ 10⁴).
- `nums` — n space-separated integers, each `0`, `1` or `2`.

## Sample Input

```
6
2 0 2 1 1 0
```

## Expected Output

```
0 0 1 1 2 2
```

## Approach — Three pointers

Use three pointers instead of the usual two:

| Pointer | Meaning |
|---|---|
| `low` | everything **before** it is a `0` |
| `mid` | the element currently being looked at |
| `high` | everything **from** it on is a `2` |

The region between `low` and `mid` holds the `1`s that are already in place, and the
region between `mid` and `high` is still unknown.

Look at `nums[mid]`:

- **`0`** → swap it with `nums[low]`. The `0` belongs at the front and the element
  that was at `low` is a `1` that now belongs where `mid` was, so **both** `low` and
  `mid` move right.
- **`1`** → it is already in place, just move `mid` right.
- **`2`** → swap it with `nums[high]`. The value that comes back from `high` has not
  been examined yet, so `mid` **stays** and `high` moves left.

The loop stops when `mid > high`.

## Dry Run

Input: `nums = [2, 0, 2, 1, 1, 0]`, `low = 0`, `mid = 0`, `high = 5`

| Step | `low` | `mid` | `high` | `nums[mid]` | action | array after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 0 | 5 | 2 | swap(0, 5), `high = 4` | `[0, 0, 2, 1, 1, 2]` |
| 2 | 0 | 0 | 4 | 0 | swap(0, 0), `low = 1`, `mid = 1` | `[0, 0, 2, 1, 1, 2]` |
| 3 | 1 | 1 | 4 | 0 | swap(1, 1), `low = 2`, `mid = 2` | `[0, 0, 2, 1, 1, 2]` |
| 4 | 2 | 2 | 4 | 2 | swap(2, 4), `high = 3` | `[0, 0, 1, 1, 2, 2]` |
| 5 | 2 | 3 | 3 | 1 | `mid = 4` | `[0, 0, 1, 1, 2, 2]` |
| 6 | 2 | 4 | 3 | — | `mid (4) > high (3)` → stop | `[0, 0, 1, 1, 2, 2]` |

Final array: **`[0, 0, 1, 1, 2, 2]`**

### Why `mid` does not move in the `2` branch

At step 4 the value `2` at index 2 was swapped with the value `2` at index 4 — no
visible change, but `high` dropped to 3, so index 4 is now outside the unknown
region. The `2` branch is the only one where the element that arrives from `high`
has **not** been inspected yet, so `mid` must stay put and re-examine it.

### The `0` branch moves both pointers

At step 3 the `0` at index 1 was swapped with the `0` at index 1 (a no-op). In
general the element that comes back from `low` is a `1` that was already in the
correct region, so it is moved to `mid`'s position and both pointers advance.

## Java Solution

See [`DutchNationalFlag.java`](./DutchNationalFlag.java).

```java
public static int[] dutchNationalFlag(int[] nums) {
    int low = 0;
    int mid = 0;
    int high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums, low, mid);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums, mid, high);
            high--;
        }
    }
    return nums;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every element is examined at most twice; one pass, no inner loops |
| **Space** | O(1) | Three indices |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if there are k distinct values instead of three?"* → the generalisation is
  the Dutch national flag problem with k pointers; or use a hash map to count the
  values and rewrite the array (O(n) time, O(k) space).
- *"Can you do it in two passes?"* → yes: count the zeros, then fill the array with
  zeros, ones and twos — simpler but two passes instead of one.
- *"Is it stable?"* → **no**: the `2` branch swaps a `2` with an unexamined element,
  which can reorder equal values.
- *"Why not just sort it?"* → sorting is O(n log n) with comparisons; the three-way
  partition is O(n) with none.

**Common mistakes:**
- ❌ Moving `mid` in the **`2` branch** → the element swapped in from `high` is never
  examined and can end up in the wrong region.
- ❌ Forgetting to move `low` in the **`0` branch** → the next `0` may be swapped
  with a `1`, breaking the invariant.
- ❌ Using `mid < high` instead of `mid <= high` as the loop condition → the last
  element is left unsorted.
- ❌ Swapping `mid` with `low` **before** checking `nums[mid]` → the value you
  classified is not the value you swap.

**How to narrate:**
> "I use three pointers: low marks the end of the zero region, mid is the current
> element and high marks the start of the two region. A zero gets swapped with
> nums[low] and both pointers advance; a one just advances mid; a two gets swapped
> with nums[high] and only high moves, because the value that comes back from high
> hasn't been examined yet. One pass, O(n) time, O(1) space."

## Related Problems

- [Sort Array By Parity](../../../../../../docs/topics/08-sorting.md) — the same idea with two pointers and two groups
- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — partitioning with two pointers
- [Two Sum II](../../../../../../docs/topics/10-twopointers.md) — partitioning with two pointers
