---
title: Contiguous Array
leetcode: 525
difficulty: Medium
patterns: [Prefix sum with a hash map, Balance counting]
companies: [Meta, Adobe, Microsoft]
frequency: 3
tags: [prefix-sum, hashmap, array]
sampleInput: |
  6
  0 1 0 1 0 0
sampleOutput: "4"
---

# Contiguous Array — LeetCode 525

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Prefix sum with a hash map · Balance counting |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a binary array `nums`, return the length of the **longest contiguous subarray**
that contains an **equal number of 0s and 1s**.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated values, each `0` or `1`

## Sample Input

```
6
0 1 0 1 0 0
```

## Expected Output

```
4
```

The subarray `[0, 1, 0, 1]` (indices 0–3) has two zeros and two ones.

## Approach — Balance, remembered in a Hash Map

**Turn the problem into a prefix-sum problem.** Replace every `0` with `-1` and every
`1` with `+1`. Now a subarray has an equal number of zeros and ones **exactly when its
transformed sum is 0**.

A subarray between positions `l` and `r` sums to zero exactly when the two prefix sums
`prefix[l]` and `prefix[r + 1]` are **equal**. So we need the largest distance between
two equal prefix sums.

**The map remembers the first occurrence of each balance.** For a given balance, the
widest subarray is the one that starts at the *earliest* index with that balance — so we
only ever store the first index and never overwrite it.

The map is seeded with `balance → -1`: the empty prefix before the array starts, so a
balanced subarray that begins at index 0 is found.

**Why the leftmost index wins:** for a fixed right end `i`, the length is `i - first`,
which is maximal when `first` is minimal.

## Dry Run

Input: `nums = [0, 1, 0, 1, 0, 0]`, transformed: `[-1, +1, -1, +1, -1, -1]`

| Step | `i` | `nums[i]` | `balance` before | `balance` after | `firstIndex` before | first seen? | `firstIndex` after | `best` after |
|---:|---:|---:|---:|---:|---|---|---|---:|
| 1 | 0 | 0 | 0 | −1 | `{0: -1}` | yes | `{0: -1, -1: 0}` | 0 |
| 2 | 1 | 1 | −1 | 0 | `{0: -1, -1: 0}` | no — 0 first seen at −1 | unchanged | 1 − (−1) = **2** |
| 3 | 2 | 0 | 0 | −1 | `{0: -1, -1: 0}` | no — −1 first seen at 0 | unchanged | 2 − 0 = 2 |
| 4 | 3 | 1 | −1 | 0 | `{0: -1, -1: 0}` | no | unchanged | 3 − (−1) = **4** |
| 5 | 4 | 0 | 0 | −1 | `{0: -1, -1: 0}` | no | unchanged | 4 − 0 = 4 |
| 6 | 5 | 0 | −1 | −2 | `{0: -1, -1: 0}` | yes | `{0: -1, -1: 0, -2: 5}` | 4 |

Answer: **4** — the subarray from index 0 to index 3 (`[0, 1, 0, 1]`) ✓

## Java Solution

See [`ContiguousArray.java`](./ContiguousArray.java).

```java
public static int findMaxLength(int[] nums) {
    Map<Integer, Integer> firstIndex = new HashMap<>();
    firstIndex.put(0, -1);
    int balance = 0;
    int best = 0;
    for (int i = 0; i < nums.length; i++) {
        balance += (nums[i] == 1 ? 1 : -1);
        Integer first = firstIndex.get(balance);
        if (first == null) {
            firstIndex.put(balance, i);
        } else {
            best = Math.max(best, i - first);
        }
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, one map lookup per element |
| **Space** | O(n) | The map holds at most n + 1 balances |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array contained values other than 0 and 1?"* → the transformation needs
  a "two different groups" structure; for a general array use a map of counts.
- *"What if you had to return the subarray itself?"* → remember the best start index
  alongside the best length.
- *"Can you do it without a hash map?"* → yes, with two pointers: extend the right end
  and shrink the left end while the counts differ — O(n) time and O(1) space.
- *"What if the queries were 'at most k more zeros than ones'?"* → the same idea with a
  map of balances per count, where each balance keeps a list of indices.
- *"How does this connect to Subarray Sum Equals K?"* → identical machinery: prefix sums
  stored in a map, and the `0 → 1` seed is the same idea.

**Common mistakes:**
- ❌ Not seeding the map with `0 → -1` — a balanced subarray that starts at index 0 is
  then missed (for `[0, 1]` the answer would be 0 instead of 2).
- ❌ **Overwriting** the stored index instead of keeping the first one — the width would
  shrink. This is the single most common bug in this problem.
- ❌ Using `+1` for zeros and `-1` for ones — it works too, but the seed and the sign
  convention must be consistent.
- ❌ Forgetting to update `best` with `Math.max` — later, shorter windows would otherwise
  overwrite a longer one.

**How to narrate:**
> "I map 0 to -1 and 1 to +1, so a balanced subarray becomes a subarray with sum zero.
> A zero-sum subarray exists exactly when two prefix sums are equal, so I keep a map
> from balance to the first index where that balance appeared — the first index gives
> the longest window. I seed the map with balance 0 at index -1 so that a subarray
> starting at the beginning is counted. O(n) time, O(n) space."

## Related Problems

- [Subarray Sum Equals K](SubarraySumEqualsK.md) — the same map-of-prefix-sums idea
- [Maximum Width Ramp](../arrays/MaximumWidthRamp.md) — prefix minima in a stack
- [Maximum Subarray](../arrays/MaxSubarray.md) — Kadane's running balance
