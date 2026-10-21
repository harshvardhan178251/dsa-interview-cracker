---
title: Two Sum
leetcode: 1
difficulty: Easy
patterns: [Hashing, One-pass]
companies: [Meta, Amazon, Google, Airbnb, Bloomberg, Adobe, Lyft, Capgemini, Wipro, Cisco]
frequency: 5
tags: [array, hashmap]
sampleInput: |
  4
  2 7 11 15
  9
sampleOutput: "0 1"
---

# Two Sum — LeetCode 1

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · One-pass lookup |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg, Adobe |

## Problem Statement

Given an array of integers `nums` and an integer `target`, return the **indices** of the two
numbers such that they add up to `target`.

- Each input has **exactly one** solution.
- The same element may **not** be used twice.
- The answer may be returned in any order.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers
- `target` — the required sum

## Sample Input

```
4
2 7 11 15
9
```

## Expected Output

```
0 1
```

`nums[0] + nums[1] = 2 + 7 = 9`, so the indices `0` and `1` are returned.

## Approach — One-pass Hash Map

Brute force checks every pair and costs **O(n²)**. The trick is to stop searching for a pair
and start searching for its *complement*.

For each element `nums[i]`, the partner we need is `target - nums[i]`. So:

1. Keep a hash map `seen` mapping **value → index**.
2. For each `i`, compute `complement = target - nums[i]`.
3. If `seen` already contains `complement`, we have found the pair → return `{seen[complement], i}`.
4. Otherwise record `seen[nums[i]] = i` and move on.

**Why one pass is enough:** when we are at index `i`, every earlier element is already in the
map. If a valid pair exists ending at `i`, its partner must be among those earlier elements,
so we will find it.

**Duplicate handling:** we always overwrite `seen[nums[i]] = i`. That means the map keeps the
*latest* index for a value, so `[3, 3]` with `target = 6` correctly returns `{0, 1}` rather
than `{1, 1}` — the lookup happens before the insert, so the element is never paired with itself.

## Dry Run

Input: `nums = [2, 7, 11, 15]`, `target = 9`

| Step | i | nums[i] | complement = target − nums[i] | `seen` before | found? | `seen` after | result |
|---:|---:|---:|---:|---|---|---|---|
| 1 | 0 | 2 | 7 | `{}` | no — 7 absent | `{2: 0}` | — |
| 2 | 1 | 7 | 2 | `{2: 0}` | **yes** — 2 at index 0 | `{2: 0}` | **return {0, 1}** |

The loop stops at step 2. `nums[0] + nums[1] = 2 + 7 = 9` ✓

### Trace with a duplicate — `nums = [3, 3]`, `target = 6`

| Step | i | nums[i] | complement | `seen` before | found? | `seen` after |
|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 3 | 3 | `{}` | no — lookup precedes insert | `{3: 0}` |
| 2 | 1 | 3 | 3 | `{3: 0}` | **yes** — 3 at index 0 | `{3: 1}` |

Returns `{0, 1}` — the same element is never used twice because the insert happens *after*
the lookup.

## Java Solution

See [`TwoSum.java`](./TwoSum.java).

```java
public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        Integer j = seen.get(complement);
        if (j != null) {
            return new int[]{j, i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{-1, -1};
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass; each map operation is O(1) on average |
| **Space** | O(n) | The map holds up to n entries |

**Optimal?** Yes for the hash-map approach. A strictly O(1)-space variant exists only if the
array is sorted — see [Two Sum II](../twopointers/TwoSumII.java)
for the O(1) extra space trade-off.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it without extra space?"* → sort the array and use two pointers; you must then
  map sorted indices back to original indices.
- *"What if there are multiple answers?"* → return all pairs; use a map of value → list of indices.
- *"What if the values are huge or you cannot store the whole map?"* → sort and two-pointer.

**Common mistakes:**
- ❌ Inserting into the map **before** the lookup → allows using the same element twice.
- ❌ Returning the **values** instead of the **indices** → the question asks for indices.
- ❌ Forgetting to handle the no-solution case → the problem guarantees one, but interview code
  should still return a sentinel.

**How to narrate:**
> "A brute-force solution is O(n²). Instead of looking for a pair, I'll look for each
> element's complement. I'll keep a hash map of values I've already passed. That gives me
> O(n) time in a single pass, and it naturally handles duplicates because I look up before
> I insert."

## Related Problems

- [Two Sum II — Input Array Is Sorted](../../../../../../docs/topics/10-twopointers.md) — O(1) extra space
- [3Sum](../../../../../../docs/topics/10-twopointers.md) — the same idea, extended to triples
- [Subarray Sum Equals K](../../../../../../docs/topics/12-prefixsum.md) — the same hash-map pattern
- [Group Anagrams](../../../../../../docs/topics/09-hashing.md) — grouping by a canonical key
