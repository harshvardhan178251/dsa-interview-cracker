---
title: Longest Consecutive Sequence
leetcode: 128
difficulty: Medium
patterns: [Hashing, Run detection]
companies: [Google, Meta, Apple, Facebook, ByteDance, Cognizant, HCLTech, Deloitte]
frequency: 4
tags: [hashmap, set, array, longest-run]
sampleInput: |
  6
  100 4 200 1 3 2
sampleOutput: "4"
---

# Longest Consecutive Sequence — LeetCode 128

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Run detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Bloomberg |

## Problem Statement

Given an unsorted array of integers, return the length of the longest sequence of
consecutive integers it contains.

- The sequence does **not** have to be contiguous in the array — only the values have
  to be consecutive.
- `[100, 4, 200, 1, 3, 2]` contains `1, 2, 3, 4` → the answer is `4`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — the length of the array (0 ≤ n ≤ 10⁵).
- `nums` — n space-separated integers.

## Sample Input

```
6
100 4 200 1 3 2
```

## Expected Output

```
4
```

## Approach — Only start counting at the beginning of a run

The naive solution sorts the array and scans it: O(n log n). A hash set gets it down
to O(n) — but only with one extra rule.

**The rule:** a value `x` starts a run only when `x - 1` is **not** in the set. If
`x - 1` is present, then the run containing `x` has already been counted when we
started at `x - 1`, so counting it again would do the work twice.

Without that rule the algorithm is O(n²) in the worst case: with the array
`1, 2, 3, …, n` every value would trigger a full walk to the end.

**Why this is O(n):** every value is walked at most once, and only from the start of
its run.

## Dry Run

Input: `nums = [100, 4, 200, 1, 3, 2]`

### Phase 1 — build the set

| Step | value | `values` after |
|---:|---:|---|
| 1 | 100 | `{100}` |
| 2 | 4 | `{100, 4}` |
| 3 | 200 | `{100, 4, 200}` |
| 4 | 1 | `{100, 4, 200, 1}` |
| 5 | 3 | `{100, 4, 200, 1, 3}` |
| 6 | 2 | `{100, 4, 200, 1, 3, 2}` |

### Phase 2 — only start at the beginning of a run

| Step | value | `value - 1` in the set? | values walked | run length | `best` |
|---:|---:|---|---|---:|---:|
| 1 | 1 | 0 → **no** → start | 1, 2, 3, 4 | 4 | 4 |
| 2 | 2 | 1 → yes → skip | — | — | 4 |
| 3 | 3 | 2 → yes → skip | — | — | 4 |
| 4 | 4 | 3 → yes → skip | — | — | 4 |
| 5 | 100 | 99 → no → start | 100 (101 is missing) | 1 | 4 |
| 6 | 200 | 199 → no → start | 200 (201 is missing) | 1 | 4 |

The order in which the set is walked does not matter — every run is counted exactly
once, by its smallest element.

Final answer: **4**

### What happens without the "start of a run" rule

| value | run walked | length |
|---:|---|---:|
| 1 | 1, 2, 3, 4 | 4 |
| 2 | 2, 3, 4 | 3 |
| 3 | 3, 4 | 2 |
| 4 | 4 | 1 |

The same run is walked four times — on `[1, 2, 3, …, n]` that is O(n²).

## Java Solution

See [`LongestConsecutiveSequence.java`](./LongestConsecutiveSequence.java).

```java
public static int longestConsecutiveSequence(int[] nums) {
    Set<Integer> values = new HashSet<>();
    for (int num : nums) {
        values.add(num);
    }
    int best = 0;
    for (int num : values) {
        if (values.contains(num - 1)) {
            continue; // not the start of a run
        }
        int length = 1;
        while (values.contains(num + length)) {
            length++;
        }
        best = Math.max(best, length);
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every value is inserted once and walked at most once |
| **Space** | O(n) | The set holds the distinct values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the sequence itself, not just its length."* → remember the start value of
  the best run and rebuild it.
- *"Do it without extra space?"* → sort the array and scan the sorted runs: O(n log n)
  time, O(1) space.
- *"What if the values are huge — up to 10⁹?"* → a hash set still works; a counting
  array does not.
- *"How would you solve the 'longest consecutive sequence in a sorted stream'?"* →
  keep the start and the expected next value of the current run.

**Common mistakes:**
- ❌ Walking **every** value → O(n²) on a sorted array.
- ❌ Checking `value + 1` instead of `value - 1` to decide whether a run starts →
  every value but the last one starts a "run" and the work is repeated.
- ❌ Forgetting that the array may contain **duplicates** → the set handles them, but
  the answer must count distinct values only.

**How to narrate:**
> "I put the values in a hash set, and then I only start counting a run at a value
> whose predecessor is missing. That way every run is walked exactly once, from its
> smallest element, and the whole thing is O(n) time and O(n) space. The trick is the
> 'x - 1 is not in the set' check — without it the algorithm degrades to O(n²)."

## Related Problems

- [Contains Duplicate](../../../../../../docs/topics/09-hashing.md) — the simplest set membership check
- [Find All Duplicates in an Array](../../../../../../docs/topics/09-hashing.md) — a set used to spot repeats
- [Intersection of Two Arrays](../../../../../../docs/topics/09-hashing.md) — set intersection
