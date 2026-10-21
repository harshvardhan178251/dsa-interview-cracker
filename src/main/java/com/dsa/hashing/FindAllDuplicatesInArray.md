---
title: Find All Duplicates in an Array
leetcode: 442
difficulty: Medium
patterns: [Hashing, Frequency counting]
companies: [Meta, Bloomberg, Facebook]
frequency: 3
tags: [hashmap, set, array, duplicates]
sampleInput: |
  5
  4 2 4 1 2
sampleOutput: "2 4"
---

# Find All Duplicates in an Array — LeetCode 442

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Frequency counting |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given an array `nums` where every value is between `1` and `n` (`n` is the length of
the array), return all the values that occur **more than once**.

- Every duplicated value is reported **once**, no matter how often it appears.
- The result is sorted in ascending order.
- The result is printed as space-separated integers on one line.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — the length of the array (1 ≤ n ≤ 10⁵).
- `nums` — n space-separated integers, each between `1` and `n`.

## Sample Input

```
5
4 2 4 1 2
```

## Expected Output

```
2 4
```

`4` appears at indices 0 and 2, `2` appears at indices 1 and 4; `1` appears once.

## Approach — A set of seen values and a set of duplicates

Two sets do the work:

- `seen` — every value that has been visited so far.
- `duplicates` — every value that was found a **second** time.

For each value: if adding it to `seen` fails, the value was already there, so it is
a duplicate. A `LinkedHashSet` keeps the duplicates in the order they were found, and
the result is sorted before printing.

**Why a second set?** The `seen` set still holds the duplicates, so it cannot be
printed directly — and a plain `HashSet` would not give a deterministic order.

## Dry Run

Input: `nums = [4, 2, 4, 1, 2]`

| Step | value | `seen.add(value)` | `seen` after | `duplicates` after |
|---:|---:|---|---|---|
| 1 | 4 | ✔ (new) | `{4}` | `{}` |
| 2 | 2 | ✔ (new) | `{4, 2}` | `{}` |
| 3 | 4 | ✘ (already there) | `{4, 2}` | `{4}` |
| 4 | 1 | ✔ (new) | `{4, 2, 1}` | `{4}` |
| 5 | 2 | ✘ (already there) | `{4, 2, 1}` | `{4, 2}` |

### Sort the duplicates

| step | duplicates before | duplicates after |
|---:|---|---|
| 1 | `{4, 2}` | `[2, 4]` |

Final answer: **`2 4`**

### A value that appears three times — `[2, 2, 2]`

| Step | value | `seen.add(value)` | `seen` after | `duplicates` after |
|---:|---:|---|---|---|
| 1 | 2 | ✔ | `{2}` | `{}` |
| 2 | 2 | ✘ | `{2}` | `{2}` |
| 3 | 2 | ✘ | `{2}` | `{2}` |

The third occurrence is **not** added again — a set never stores the same value
twice — so `2` is reported exactly once.

## Java Solution

See [`FindAllDuplicatesInArray.java`](./FindAllDuplicatesInArray.java).

```java
public static List<Integer> findAllDuplicates(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    Set<Integer> duplicates = new LinkedHashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) {
            duplicates.add(num);
        }
    }
    List<Integer> result = new ArrayList<>(duplicates);
    Collections.sort(result);
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | O(n) for the sets, plus the sort of the (at most n) duplicates |
| **Space** | O(n) | The two sets |

**The in-place alternative:** because every value is between `1` and `n`, the array
itself can be used as the counter — for each value `v`, negate `nums[v - 1]`. A
negative entry means "already seen". That gives O(n) time and O(1) extra space, at
the price of destroying the input.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) space?"* → yes, use the array as the counter (values are in
  `1..n`).
- *"What if the values are not bounded?"* → use a hash map of counts instead of a set.
- *"What if you only need to know **whether** there is a duplicate?"* → a single set
  and an early return — see [Contains Duplicate](../../../../../../docs/topics/09-hashing.md).
- *"How would you find the duplicates in a huge array that does not fit in memory?"* →
  external sorting, or a Bloom filter.

**Common mistakes:**
- ❌ Adding the value to `duplicates` **without** checking `seen` → every value would
  be reported.
- ❌ Printing the `seen` set → it contains every value, not only the duplicates.
- ❌ Reporting a value twice when it occurs three times → the duplicate set solves
  this.
- ❌ Forgetting the **sort** → the output order would depend on the hash set.

**How to narrate:**
> "I keep a set of the values I have seen and a second set for the values I meet a
> second time. Adding to a set tells me in O(1) whether the value was already there,
> so a failed add means a duplicate. The duplicate set holds every value at most
> once, and I sort it before printing. O(n log n) with the sort, O(n) space. If the
> values are in 1..n I could also use the array itself as the counter for O(1) extra
> space."

## Related Problems

- [Contains Duplicate](../../../../../../docs/topics/09-hashing.md) — the same set trick, without the list
- [Intersection of Two Arrays](../../../../../../docs/topics/09-hashing.md) — set based intersection
- [Longest Consecutive Sequence](../../../../../../docs/topics/09-hashing.md) — a set used to find runs
