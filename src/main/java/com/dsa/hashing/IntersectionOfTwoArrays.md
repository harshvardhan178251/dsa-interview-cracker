---
title: Intersection of Two Arrays
leetcode: 349
difficulty: Easy
patterns: [Hashing, Set intersection]
companies: [Meta, Netflix, Apple, Capgemini, EY]
frequency: 3
tags: [hashmap, set, array, intersection]
sampleInput: |
  3
  4 9 5
  5
  9 4 9 8 4
sampleOutput: "4 9"
---

# Intersection of Two Arrays — LeetCode 349

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · Set intersection |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given two arrays, return the values that appear in **both** of them.

- Every value is reported **once**, even when it appears several times.
- The result is sorted in ascending order.
- The result is printed as space-separated integers on one line.

## Input Format

The program reads from standard input:

```
n
nums1[0] nums1[1] ... nums1[n-1]
m
nums2[0] nums2[1] ... nums2[m-1]
```

- `n` — the length of the first array (1 ≤ n ≤ 10⁵).
- `nums1` — n space-separated integers.
- `m` — the length of the second array (1 ≤ m ≤ 10⁵).
- `nums2` — m space-separated integers.

## Sample Input

```
3
4 9 5
5
9 4 9 8 4
```

## Expected Output

```
4 9
```

`4` and `9` are in both arrays; `5` and `8` are not.

## Approach — Hash the small side, scan the other

1. Put the values of the first array into a hash set — a lookup is now O(1).
2. Walk the second array and keep every value that is in the set.
3. The result set is a `TreeSet`, so it is duplicate-free **and** sorted.

**Why a set and not a nested loop:** checking every pair is O(n · m). Hashing the
first array makes each lookup O(1), so the whole thing is O(n + m).

**Why a `TreeSet` for the result:** a `HashSet` would be O(n + m) but the output
order would be undefined. A `TreeSet` keeps the values sorted at the cost of
O(log k) per insertion — still linear overall for the usual case.

## Dry Run

Input: `nums1 = [4, 9, 5]`, `nums2 = [9, 4, 9, 8, 4]`

### Phase 1 — hash the first array

| Step | value | `values` after |
|---:|---:|---|
| 1 | 4 | `{4}` |
| 2 | 9 | `{4, 9}` |
| 3 | 5 | `{4, 9, 5}` |

### Phase 2 — scan the second array

| Step | value | in `values`? | `common` after |
|---:|---:|---|---|
| 1 | 9 | ✔ | `{9}` |
| 2 | 4 | ✔ | `{9, 4}` |
| 3 | 9 | ✔ | `{9, 4}` — already there, the set keeps it unique |
| 4 | 8 | ✘ | `{9, 4}` |
| 5 | 4 | ✔ | `{9, 4}` |

### Phase 3 — the tree set keeps the values sorted

| order | value |
|---:|---|
| 1 | 4 |
| 2 | 9 |

Final answer: **`4 9`**

### An empty intersection — `nums1 = [1, 2]`, `nums2 = [3, 4]`

| value in `nums2` | in `values`? | `common` after |
|---|---|---|
| 3 | ✘ | `{}` |
| 4 | ✘ | `{}` |

Final answer: **an empty line** — the program prints nothing between the groups.

## Java Solution

See [`IntersectionOfTwoArrays.java`](./IntersectionOfTwoArrays.java).

```java
public static List<Integer> intersection(int[] nums1, int[] nums2) {
    Set<Integer> values = new HashSet<>();
    for (int num : nums1) {
        values.add(num);
    }
    Set<Integer> common = new TreeSet<>();
    for (int num : nums2) {
        if (values.contains(num)) {
            common.add(num);
        }
    }
    return new ArrayList<>(common);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m log m) | n inserts into a hash set, m lookups and up to m inserts into a tree set |
| **Space** | O(n + m) | Both sets |

With a plain `HashSet` for the result the time is O(n + m) — the extra log comes
from keeping the output sorted.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the result should keep the duplicates of the second array?"* → use a list
  and append every match instead of a set.
- *"What if the arrays are sorted?"* → two pointers, O(n + m) time and O(1) space.
- *"What if the input is a stream?"* → keep a hash set of the first stream and probe
  it with the second.
- *"How does this relate to LeetCode 350 (intersection with duplicates)?"* → count the
  occurrences with a map instead of a set.

**Common mistakes:**
- ❌ Returning duplicates → a set is needed, or the output has to be deduplicated.
- ❌ Forgetting that a value may appear several times in **both** arrays → it is
  still reported once.
- ❌ Relying on the `HashSet` iteration order for the output → not deterministic.
- ❌ Hashing the **larger** array → always hash the smaller one when you can choose.

**How to narrate:**
> "I hash the first array into a set so every lookup during the scan of the second
> array is O(1). The matches go into a tree set, which keeps them unique and sorted,
> so the output is deterministic. That's O(n + m) time; with a plain hash set it
> would be O(n + m) but the order would be undefined."

## Related Problems

- [Find All Duplicates in an Array](../../../../../../docs/topics/09-hashing.md) — set membership for duplicates
- [Contains Duplicate](../../../../../../docs/topics/09-hashing.md) — the simplest set check
- [Two Sum](../../../../../../docs/topics/01-arrays.md) — a hash map used to find a complement
