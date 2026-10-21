---
title: Contains Duplicate
leetcode: 217
difficulty: Easy
patterns: [Hashing, Set membership]
companies: [Google, Amazon, Adobe, Salesforce, Stripe]
frequency: 4
tags: [hashmap, set, array, duplicates]
sampleInput: |
  4
  1 2 3 1
sampleOutput: "true"
---

# Contains Duplicate — LeetCode 217

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · Set membership |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Adobe |

## Problem Statement

Given an array of integers, decide whether it contains the same value twice.

- Return `true` when a value appears at least twice, `false` otherwise.
- The array does **not** have to be sorted.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — the length of the array (1 ≤ n ≤ 10⁵).
- `nums` — n space-separated integers.

## Sample Input

```
4
1 2 3 1
```

## Expected Output

```
true
```

`1` appears at index 0 and index 3.

## Approach — Let the set answer the question

Walk the array and add every value to a hash set. Java's `Set.add` returns

- `true` when the value was **not** in the set yet,
- `false` when the value was **already** there.

A `false` return is exactly the answer to the question, so the algorithm can stop
immediately.

**Why not sort and compare neighbours?** That also works in O(n log n) time and O(1)
space, but the hash set is O(n) time — and the question is really a "have I seen this
before?" question, which is what a set is for.

**Why not `Arrays.sort` + a loop?** Sorting mutates the input. The set version does
not touch the array at all.

## Dry Run

Input: `nums = [1, 2, 3, 1]`

| Step | value | `seen.add(value)` | `seen` after | result |
|---:|---:|---|---|---|
| 1 | 1 | ✔ (new) | `{1}` | continue |
| 2 | 2 | ✔ (new) | `{1, 2}` | continue |
| 3 | 3 | ✔ (new) | `{1, 2, 3}` | continue |
| 4 | 1 | ✘ (**already there**) | `{1, 2, 3}` | **return true** |

Final answer: **true**

### A rejection — `nums = [1, 2, 3, 4]`

| Step | value | `seen.add(value)` | `seen` after | result |
|---:|---:|---|---|---|
| 1 | 1 | ✔ | `{1}` | continue |
| 2 | 2 | ✔ | `{1, 2}` | continue |
| 3 | 3 | ✔ | `{1, 2, 3}` | continue |
| 4 | 4 | ✔ | `{1, 2, 3, 4}` | continue |

The loop ends without a failed add → **return false**

### The empty and single-element cases

| input | steps | result |
|---|---|---|
| `[]` | the loop never runs | false |
| `[7]` | one successful add | false |

## Java Solution

See [`ContainsDuplicate.java`](./ContainsDuplicate.java).

```java
public static boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) {
            return true;
        }
    }
    return false;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One hash-set operation per element, O(1) on average |
| **Space** | O(n) | The set holds the distinct values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) space?"* → yes: sort the array (O(n log n)) and compare
  neighbours, or use the fact that the values are in `1..n` and mark them in a
  boolean array.
- *"What if the array is sorted?"* → just compare `nums[i]` with `nums[i + 1]`.
- *"What if the values are large — up to 10¹⁸?"* → a `HashSet<Long>` still works;
  a counting array does not.
- *"How would you count the duplicates instead of just detecting them?"* → see
  [Find All Duplicates in an Array](../../../../../../docs/topics/09-hashing.md).

**Common mistakes:**
- ❌ Checking `seen.contains(num)` **and then** adding it → two lookups per element;
  `add` already tells you the answer.
- ❌ Forgetting to **return** `false` at the end → the method would not compile.
- ❌ Using a `List` instead of a `Set` → the lookup becomes O(n) and the whole
  algorithm O(n²).
- ❌ Returning `true` when the set is **not empty** → every non-empty array would be
  reported as containing a duplicate.

**How to narrate:**
> "I walk the array and add every value to a hash set. `Set.add` returns false when
> the value was already there, so a failed add means I have found a duplicate and I
> can return true immediately. O(n) time, O(n) space, and the input array is never
> modified."

## Related Problems

- [Find All Duplicates in an Array](../../../../../../docs/topics/09-hashing.md) — the same trick, but collecting them
- [Longest Consecutive Sequence](../../../../../../docs/topics/09-hashing.md) — a set used to find runs
- [Intersection of Two Arrays](../../../../../../docs/topics/09-hashing.md) — set intersection
