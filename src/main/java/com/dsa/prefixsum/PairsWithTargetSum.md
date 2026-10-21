---
title: Pairs With a Target Sum
leetcode: 1674
difficulty: Medium
patterns: [Hashing, Complement counting]
companies: [Amazon, Microsoft, Infosys]
frequency: 2
tags: [hashmap, prefix-sum, two-sum]
sampleInput: |
  4
  1 2 3 4
  5
sampleOutput: "2"
---

# Pairs With a Target Sum — LeetCode 1674

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Complement counting |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an integer array `nums` and an integer `target`, return the **number of index
pairs** `(i, j)` with `i < j` and

```
nums[i] + nums[j] == target
```

Pairs are counted **by position**, so duplicate values create multiple pairs. For
example, in `[1, 1, 2, 2]` with `target = 3` there are four pairs.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (2 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers
- `target` — the required sum

## Sample Input

```
4
1 2 3 4
5
```

## Expected Output

```
2
```

The pairs are `(0, 3)` — `1 + 4` — and `(1, 2)` — `2 + 3`.

## Approach — Frequency Map of the Seen Values

The same idea as [Two Sum](../arrays/TwoSum.md), but counting
instead of returning one pair.

Walk the array and keep `frequency`: value → how many times it has already been seen.

At each value `v`:

1. `need = target - v`.
2. Every earlier occurrence of `need` forms a new pair → add `frequency[need]` to the
   answer.
3. Increment `frequency[v]`.

**The order matters.** The lookup happens **before** the insert, which guarantees `i < j`
and prevents an element from pairing with itself. Inserting first would count the
element's own complement twice.

**Why add the whole frequency instead of just 1?** Because several earlier elements can
hold the complement value, and each of them is a distinct pair.

## Dry Run

Input: `nums = [1, 2, 3, 4]`, `target = 5`

| Step | `i` | `value` | `need = target - value` | `frequency` before | `frequency[need]` | `pairs` before | `pairs` after | `frequency` after |
|---:|---:|---:|---:|---|---:|---:|---:|---|
| 1 | 0 | 1 | 4 | `{}` | absent | 0 | 0 | `{1: 1}` |
| 2 | 1 | 2 | 3 | `{1: 1}` | absent | 0 | 0 | `{1: 1, 2: 1}` |
| 3 | 2 | 3 | 2 | `{1: 1, 2: 1}` | 1 | 0 | **1** | `{1: 1, 2: 1, 3: 1}` |
| 4 | 3 | 4 | 1 | `{1: 1, 2: 1, 3: 1}` | 1 | 1 | **2** | `{1: 1, 2: 1, 3: 1, 4: 1}` |

Answer: **2** — the pairs `(1, 2)` (values 2 and 3) and `(0, 3)` (values 1 and 4).

### Duplicates — `nums = [1, 1, 2, 2]`, `target = 3`

| Step | `i` | `value` | `need` | `frequency[need]` | `pairs` after | `frequency` after |
|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 2 | absent | 0 | `{1: 1}` |
| 2 | 1 | 1 | 2 | absent | 0 | `{1: 2}` |
| 3 | 2 | 2 | 1 | 2 | **2** | `{1: 2, 2: 1}` |
| 4 | 3 | 2 | 1 | 2 | **4** | `{1: 2, 2: 2}` |

Answer: **4** — the pairs `(0,2)`, `(0,3)`, `(1,2)`, `(1,3)`.

## Java Solution

See [`PairsWithTargetSum.java`](./PairsWithTargetSum.java).

```java
public static int countPairs(int[] nums, int target) {
    Map<Integer, Integer> frequency = new HashMap<>();
    int pairs = 0;
    for (int value : nums) {
        Integer seen = frequency.get(target - value);
        if (seen != null) {
            pairs += seen;
        }
        frequency.merge(value, 1, Integer::sum);
    }
    return pairs;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, one map lookup and one update per element |
| **Space** | O(n) | The frequency map holds at most n entries |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the pairs instead of the count."* → store the index list per value, or
  re-scan with a map from value → indices.
- *"What if the array were sorted?"* → two pointers, O(n) time and O(1) space.
- *"What if the values were huge or negative?"* → a `HashMap` handles any `int` key.
- *"What if `target` were a range instead of a single value?"* → keep a map of
  frequencies and, for each value, add the frequencies of every value in the range —
  that is O(n · range), so a prefix-frequency array over the value domain is better.
- *"How does this relate to counting subarrays with sum k?"* → the same idea, but the
  map stores *prefix sums* rather than values; see
  [Subarray Sum Equals K](SubarraySumEqualsK.md).

**Common mistakes:**
- ❌ Inserting the value into the map **before** the lookup — the element then pairs
  with itself (`[3,3]` with `target = 6` would count 2 pairs instead of 1).
- ❌ Counting each pair twice (once from each side) — the "insert after lookup" rule
  prevents that automatically.
- ❌ Counting **distinct value pairs** instead of **index pairs** — with duplicates the
  count is larger.
- ❌ Using `frequency.getOrDefault(need, 0)` with an `int` key and then `frequency.put`
  instead of `merge` — `merge` is the one-liner that never forgets the increment.

**How to narrate:**
> "This is Two Sum with counting. I keep a map from value to how many times I've
> already seen it. For each element I look up its complement and add that frequency to
> the answer — every earlier copy of the complement is a distinct pair. I insert the
> current value only after the lookup, which guarantees the two indices are ordered and
> that an element never pairs with itself."

## Related Problems

- [Two Sum](../arrays/TwoSum.md) — the single-pair version
- [Subarray Sum Equals K](SubarraySumEqualsK.md) — prefix sums in a hash map
- [Contiguous Array](ContiguousArray.md) — prefix balances in a hash map
