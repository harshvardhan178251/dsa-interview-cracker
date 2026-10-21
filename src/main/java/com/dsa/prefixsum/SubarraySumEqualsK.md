---
title: Subarray Sum Equals K
leetcode: 560
difficulty: Medium
patterns: [Prefix sums with a hash map]
companies: [Amazon, Meta, Microsoft, Facebook, Stripe]
frequency: 4
tags: [prefix-sum, hashmap, array]
sampleInput: |
  5
  1 2 3 4 5
  3
sampleOutput: "2"
---

# Subarray Sum Equals K — LeetCode 560

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Prefix sums with a hash map |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given an integer array `nums` and an integer `k`, return the total number of
**continuous subarrays** whose sum equals `k`.

Subarrays are counted by position, so `nums = [1, 1, 1]`, `k = 2` has **two** answers
(`[1,1]` at indices 0–1 and 1–2).

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 2 × 10⁴)
- `nums` — n space-separated integers
- `k` — the required subarray sum

## Sample Input

```
5
1 2 3 4 5
3
```

## Expected Output

```
2
```

The matching subarrays are `[1, 2]` (indices 0–1) and `[3]` (index 2).

## Approach — Prefix Sums in a Hash Map

Let `prefix[i]` be the sum of `nums[0..i]`. A subarray `nums[l..r]` has sum

```
prefix[r] − prefix[l−1]
```

So the subarray sums to `k` exactly when

```
prefix[l−1] = prefix[r] − k
```

That is: **for every running prefix sum `s`, count how many times the prefix sum
`s − k` has already occurred.** A hash map from prefix sum → occurrence count answers
that in O(1).

**Why a count and not a set?** The same prefix sum can occur several times (e.g. in
`[1, -1, 1, -1]`), and each occurrence starts a different subarray.

**The seed `0 → 1` is essential.** It represents the empty prefix *before* the array
starts, so a subarray that begins at index 0 is counted.

## Dry Run

Input: `nums = [1, 2, 3, 4, 5]`, `k = 3`

| Step | `i` | `nums[i]` | `sum` before | `sum` after | `sum - k` | `seen[sum - k]` | `count` before | `count` after | `seen` after |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 0 | 1 | −2 | absent | 0 | 0 | `{0: 1, 1: 1}` |
| 2 | 1 | 2 | 1 | 3 | 0 | **1** | 0 | **1** | `{0: 1, 1: 1, 3: 1}` |
| 3 | 2 | 3 | 3 | 6 | 3 | **1** | 1 | **2** | `{0: 1, 1: 1, 3: 1, 6: 1}` |
| 4 | 3 | 4 | 6 | 10 | 7 | absent | 2 | 2 | `{0: 1, 1: 1, 3: 1, 6: 1, 10: 1}` |
| 5 | 4 | 5 | 10 | 15 | 12 | absent | 2 | 2 | `{0: 1, 1: 1, 3: 1, 6: 1, 10: 1, 15: 1}` |

Answer: **2** ✓

### Why the seed matters — `nums = [3]`, `k = 3`

| `i` | `nums[i]` | `sum` after | `sum - k` | `seen[sum - k]` | `count` after |
|---:|---:|---:|---:|---:|---:|
| 0 | 3 | 3 | 0 | **1** (the seed) | **1** |

Without the seed `0 → 1` the answer would be 0 instead of 1.

## Java Solution

See [`SubarraySumEqualsK.java`](./SubarraySumEqualsK.java).

```java
public static int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> seen = new HashMap<>();
    seen.put(0, 1);                 // the empty prefix
    int sum = 0;
    int count = 0;
    for (int value : nums) {
        sum += value;
        Integer matches = seen.get(sum - k);
        if (matches != null) {
            count += matches;
        }
        seen.merge(sum, 1, Integer::sum);
    }
    return count;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, one map lookup and one update per element |
| **Space** | O(n) | The map holds at most n + 1 distinct prefix sums |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array contains only positive numbers?"* → a sliding window works, O(n)
  time and O(1) space, because the sum only grows.
- *"What if the array contains negative numbers?"* → the sliding window breaks (the sum
  is not monotonic), and the prefix-sum + hash map is the right answer.
- *"What if you had to return the subarrays themselves?"* → keep a map from prefix sum to
  the **list** of indices, not just the count.
- *"What if `k` was 0?"* → the same code works; you then count zero-sum subarrays.
- *"How does this compare with a prefix-sum array plus a nested loop?"* → the array
  version is O(n²); the map version is O(n).

**Common mistakes:**
- ❌ Not seeding `seen.put(0, 1)` — every subarray that starts at index 0 is missed.
- ❌ Looking up `sum + k` instead of `sum - k` — sign error, the classic bug.
- ❌ Storing a boolean instead of a **count** — repeated prefix sums are missed.
- ❌ Inserting `sum` into the map **before** the lookup — with `k = 0` the empty subarray
  would be counted.

**How to narrate:**
> "A subarray sums to k exactly when the prefix sum before it is the running prefix sum
> minus k. So I keep a map from prefix sum to how many times it has occurred, and at
> each element I add the count of `sum - k` to the answer. I seed the map with 0 → 1 for
> the empty prefix so that subarrays starting at index 0 are counted. One pass, O(n)
> time, and it works with negative numbers, unlike a sliding window."

## Related Problems

- [Contiguous Array](ContiguousArray.md) — the same machinery with a balance instead of a sum
- [Pairs With a Target Sum](PairsWithTargetSum.md) — complement counting
- [Range Sum Query — Immutable](RangeSumQuery.md) — the prefix-sum table
- [Two Sum](../arrays/TwoSum.md) — the original complement trick
