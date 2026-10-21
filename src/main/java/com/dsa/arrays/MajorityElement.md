---
title: Majority Element
leetcode: 169
difficulty: Easy
patterns: [Boyer-Moore voting, Majority guarantee]
companies: [Amazon, Google, Meta, Uber, Microsoft]
frequency: 4
tags: [array, voting, frequency]
sampleInput: |
  7
  2 2 1 1 1 2 2
sampleOutput: "2"
---

# Majority Element — LeetCode 169

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Boyer-Moore voting · Majority guarantee |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Given an array `nums` of size `n`, return the **majority element** — the element that
appears **more than `n / 2` times**.

The problem guarantees that such an element always exists, so the answer is unique.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 5 × 10⁴)
- `nums` — n space-separated integers

## Sample Input

```
7
2 2 1 1 1 2 2
```

## Expected Output

```
2
```

`2` appears 4 times; `4 > 7 / 2 = 3.5`.

## Approach — Boyer-Moore Majority Vote

A hash map with frequencies is the obvious O(n) solution, but it uses O(n) space. Because
the majority appears **more than half** the time, we can find it in **O(1) space**.

Think of the array as a battle: whenever two *different* values meet, they cancel out.
The majority has more units than all the others combined, so it can never be fully
cancelled — whatever survives is the majority.

Algorithm:

```
candidate = ?, count = 0
for each value:
    if count == 0:  candidate = value; count = 1
    else if value == candidate: count++
    else: count--
```

**Why the guarantee matters:** if no majority is guaranteed, this algorithm only produces
a *candidate*. You would need a second pass to verify that the candidate really occurs
more than `n / 2` times. Here the guarantee lets us skip that pass.

## Dry Run

Input: `nums = [2, 2, 1, 1, 1, 2, 2]`

| Step | i | `value` | `count` before | action | `candidate` after | `count` after | running array |
|---:|---:|---:|---:|---|---:|---:|---|
| 1 | 0 | 2 | 0 | `count == 0` → new candidate | 2 | 1 | `2` |
| 2 | 1 | 2 | 1 | matches candidate → `count++` | 2 | 2 | `2 2` |
| 3 | 2 | 1 | 2 | differs → cancel → `count--` | 2 | 1 | `2 2` (the 1 is cancelled) |
| 4 | 3 | 1 | 1 | differs → cancel → `count--` | 2 | 0 | `2 2` (both 1s cancelled) |
| 5 | 4 | 1 | 0 | `count == 0` → new candidate | **1** | 1 | `1` |
| 6 | 5 | 2 | 1 | differs → cancel → `count--` | 1 | 0 | `2` (the leftover 2 wins) |
| 7 | 6 | 2 | 0 | `count == 0` → new candidate | **2** | 1 | `2` |

Survivor: **2** — and indeed `2` occurs 4 times out of 7 (> 3.5) ✓

## Java Solution

See [`MajorityElement.java`](./MajorityElement.java).

```java
public static int majorityElement(int[] nums) {
    int candidate = 0;
    int count = 0;
    for (int value : nums) {
        if (count == 0) {
            candidate = value;
            count = 1;
        } else if (value == candidate) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass |
| **Space** | O(1) | Two scalars |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the majority is not guaranteed?"* → add a verification pass that recounts the
  candidate; return -1 if it does not exceed `n / 2`.
- *"What if there can be more than one majority?"* → impossible for `> n/2`, but for
  `> n/3` you need two candidates — see
  [Majority Element II](MajorityElementII.md).
- *"What if the array is a stream and you cannot revisit it?"* → Boyer-Moore works
  online; only the verification pass needs a second pass.
- *"What if the values are not integers?"* → the algorithm only needs `equals`, so it
  works for any comparable type.
- *"Can you do it in O(n) with a sort?"* → yes: sort and take the middle element (a
  majority occupies the median position), but that is O(n log n) and O(n) space.

**Common mistakes:**
- ❌ Forgetting the `count == 0` branch and always comparing to a stale candidate — the
  classic bug is writing `else if (value == candidate) count++; else count--;` without
  ever resetting the candidate.
- ❌ Using `count > 0` instead of `count == 0` for the reset — the candidate must be
  re-seeded exactly when the count drops to zero.
- ❌ Assuming the algorithm works without the majority guarantee (it only nominates a
  candidate).
- ❌ Returning the most frequent value from a map and calling it "Boyer-Moore" — that is
  the O(n) space solution, a different one.

**How to narrate:**
> "Because the majority appears more than half the time, I can cancel out pairs of
> different values and the majority will always survive. I keep a candidate and a
> counter: when the counter hits zero I pick the current value as the new candidate,
> when the value matches I increment, otherwise I decrement. Since LeetCode guarantees a
> majority exists, I don't need a verification pass. It's O(n) time and O(1) space."

## Related Problems

- [Majority Element II](MajorityElementII.md) — the same idea with two candidates
- [Contains Duplicate II](ContainsDuplicateII.md) — hash-map bookkeeping
- [Maximum Subarray](MaxSubarray.md) — the other classic single-pass scan
