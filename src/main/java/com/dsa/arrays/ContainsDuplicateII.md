---
title: Contains Duplicate II
leetcode: 219
difficulty: Medium
patterns: [Hashing, Sliding distance window]
companies: [Meta, JP Morgan, Uber, TCS, Zebra]
frequency: 3
tags: [array, hashmap, sliding-window]
sampleInput: |
  5
  1 2 3 1 3
  3
sampleOutput: "true"
---

# Contains Duplicate II — LeetCode 219

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Sliding distance window |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an integer array `nums` and an integer `k`, return `true` if there exist **two
distinct indices** `i` and `j` such that:

- `nums[i] == nums[j]`, and
- `|i - j| <= k`.

Otherwise return `false`.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers
- `k` — the maximum allowed index distance

## Sample Input

```
5
1 2 3 1 3
3
```

## Expected Output

```
true
```

`nums[0] == nums[3] == 1` and `|3 - 0| = 3 <= k`.

## Approach — Last Occurrence Map

This is LeetCode 217 ("Contains Duplicate") plus a distance constraint. A hash map from
**value → last index where it was seen** is enough.

Walking the array:

1. Look up `nums[i]` in the map. If it was seen at index `j` and `i - j <= k`, we have
   our pair → return `true`.
2. Otherwise record `lastSeen[nums[i]] = i` and continue.

**Why only the *last* occurrence matters:** suppose the value was seen at indices
`j1 < j2 < ... < jm`. The distance `i - j` is smallest for the **largest** `j`. If even
that closest occurrence is farther than `k`, every older one is farther too, so no pair
can exist. Keeping only the latest index therefore loses nothing.

This is the same "window" idea as a sliding window, but implemented with a map instead of
two pointers — the map *is* the window: it holds the values of the last `k + 1` positions.

## Dry Run

Input: `nums = [1, 2, 3, 1, 3]`, `k = 3`

| Step | i | `nums[i]` | `lastSeen` before | previous index | `i - previous` | `<= k`? | `lastSeen` after | result |
|---:|---:|---:|---|---:|---:|---|---|---|
| 1 | 0 | 1 | `{}` | — | — | — | `{1: 0}` | — |
| 2 | 1 | 2 | `{1: 0}` | — | — | — | `{1: 0, 2: 1}` | — |
| 3 | 2 | 3 | `{1: 0, 2: 1}` | — | — | — | `{1: 0, 2: 1, 3: 2}` | — |
| 4 | 3 | 1 | `{1: 0, 2: 1, 3: 2}` | 0 | 3 | **yes** | `{1: 3, 2: 1, 3: 2}` | **true** |

The loop returns at step 4 — `nums[0] == nums[3]` and the distance is exactly `k`.

### A negative case — `nums = [1, 2, 3, 1, 3]`, `k = 2`

| Step | i | `nums[i]` | previous index | `i - previous` | `<= 2`? | `lastSeen` after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 1 | — | — | — | `{1: 0}` |
| 2 | 1 | 2 | — | — | — | `{1: 0, 2: 1}` |
| 3 | 2 | 3 | — | — | — | `{1: 0, 2: 1, 3: 2}` |
| 4 | 3 | 1 | 0 | 3 | no | `{1: 3, 2: 1, 3: 2}` |
| 5 | 4 | 3 | 2 | 2 | **yes** | — |

Here the pair `nums[2] == nums[4] == 3` is exactly 2 apart, so the answer is `true`.

## Java Solution

See [`ContainsDuplicateII.java`](./ContainsDuplicateII.java).

```java
public static boolean containsNearbyDuplicate(int[] nums, int k) {
    Map<Integer, Integer> lastSeen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        Integer previous = lastSeen.get(nums[i]);
        if (previous != null && i - previous <= k) {
            return true;
        }
        lastSeen.put(nums[i], i);
    }
    return false;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, one map lookup and one put per element |
| **Space** | O(n) | The map holds at most one entry per distinct value |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(min(n, k)) space?"* → yes: keep a hash set of the last `k + 1`
  values and evict the entry that falls out of the window.
- *"Can you do it without a hash map?"* → no, in general — comparing every pair is
  O(n²); a sorted-structure approach (BST / sorted list) is also O(n log n).
- *"What if the array contained a value range instead of arbitrary ints?"* → use a
  frequency array of size `range` — O(1) lookups and better cache behaviour.
- *"What if `k` is 0?"* → the answer is always `false` (two distinct indices differ by at
  least 1).
- *"How would you find the actual pair of indices?"* → keep the previous index in the map
  and return it together with `i`.

**Common mistakes:**
- ❌ Using `i - j < k` instead of `<= k` — the constraint is "at most `k` apart".
- ❌ Checking the distance **before** the presence check, or using `Integer` unboxing
  against a `null` map value → a `NullPointerException` on the first element.
- ❌ Storing the **first** occurrence instead of the last — with `nums = [1,1,1]` and
  `k = 1` the first-occurrence map reports distance 2 and wrongly returns `false`.
- ❌ Returning `1`/`0` instead of `true`/`false` when the platform expects a boolean.

**How to narrate:**
> "I keep a map from value to the index where I last saw it. For each element I check
> whether the previous occurrence is within `k` positions. Storing only the *last*
> occurrence is enough, because the closest previous occurrence is the only one that
> could be within the distance limit. That gives O(n) time in one pass."

## Related Problems

- [Two Sum](TwoSum.md) — the same value→index map, used for a target sum
- [Remove Element](RemoveElement.md) — in-place compaction with two pointers
- [Subarray Sum Equals K](../../../../../../docs/topics/12-prefixsum.md) — prefix sums stored in a hash map
