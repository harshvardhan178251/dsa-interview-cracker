---
title: Remove Duplicates from Sorted Array II
leetcode: 80
difficulty: Medium
patterns: [Two Pointers, In-place compaction, Run detection]
companies: [Amazon, Meta, Google, Microsoft, Uber]
frequency: 4
tags: [array, two-pointers, in-place]
sampleInput: |
  6
  1 1 1 2 2 3
sampleOutput: |
  5
  1 1 2 2 3
---

# Remove Duplicates from Sorted Array II — LeetCode 80

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two Pointers · In-place compaction · Run detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a **sorted** array `nums`, remove the duplicates **in place** so that each element
appears **at most twice**. Return the number of elements kept — they occupy the first
`k` positions of `nums`.

- `nums = [1, 1, 1, 2, 2, 3]` → `[1, 1, 2, 2, 3]`, `k = 5`.
- `nums = [0, 0, 1, 1, 1, 2, 2, 3]` → `[0, 0, 1, 1, 2, 2, 3]`, `k = 7`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 3 × 10⁴)
- `nums` — n space-separated integers in **ascending** order

The program prints the number of elements kept on the first line and the kept elements
on the second line.

## Sample Input

```
6
1 1 1 2 2 3
```

## Expected Output

```
5
1 1 2 2 3
```

## Approach — Walk the runs, copy at most two

Because the array is sorted, it is a sequence of **runs** of equal values
(`1 1 1 | 2 2 | 3`). The rule "at most twice" is a rule about runs, so the algorithm
works run by run:

1. find the end of the current run,
2. copy **at most two** of its elements to the output area,
3. continue with the next run.

Two pointers are enough: `read` walks the runs, `write` marks where the next kept
element goes.

**The alternative (and more famous) formulation** compares against the element two
positions back (`nums[write - 2]`): a value may be copied as long as it differs from the
value that was written two slots earlier. Both are O(n) and O(1); the run-based version
is easier to explain.

## Dry Run

Input: `nums = [1, 1, 1, 2, 2, 3]`

| Step | run | value | run length | copies kept | write | array | decision |
|---:|---|---|---:|---:|---:|---|---|
| 1 | `[0, 3)` | 1 | 3 | 2 | 2 | `[1, 1, 1, 2, 2, 3]` | a run of 3 → keep only 2 |
| 2 | `[3, 5)` | 2 | 2 | 2 | 4 | `[1, 1, 2, 2, 2, 3]` | a run of 2 → keep both |
| 3 | `[5, 6)` | 3 | 1 | 1 | 5 | `[1, 1, 2, 2, 3, 3]` | a run of 1 → keep it |

`k = 5` and `nums[0..4] = [1, 1, 2, 2, 3]` ✓

## Java Solution

See [`RemoveDuplicatesFromSortedArrayII.java`](./RemoveDuplicatesFromSortedArrayII.java).

```java
int write = 0;
int read = 0;
while (read < nums.length) {
    int runEnd = read;
    while (runEnd < nums.length && nums[runEnd] == nums[read]) {
        runEnd++;
    }
    int copies = Math.min(runEnd - read, 2);
    for (int i = 0; i < copies; i++) {
        nums[write++] = nums[read];
    }
    read = runEnd;
}
return write;
```

The equivalent "two positions back" variant, often seen in interviews:

```java
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (write < 2 || nums[read] != nums[write - 2]) {
        nums[write++] = nums[read];
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every element is read once and written at most once |
| **Space** | O(1) | the result is written into the input array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if at most k copies may stay?"* → generalise the run version: keep
  `min(runLength, k)` copies.
- *"What if the array is not sorted?"* → count the occurrences with a hash map, then
  write each value as often as it may appear.
- *"Which version do you prefer?"* → the "two positions back" one-liner is shorter, the
  run-based one is easier to reason about and to extend to `k` copies.
- *"Why is the in-place requirement interesting?"* → it forces the O(1) space solution;
  with a hash map you would use O(n) space.

**Common mistakes:**
- ❌ Keeping **one** copy per run instead of two → the "at most twice" rule is broken.
- ❌ Comparing with `nums[write - 1]` instead of `nums[write - 2]` → the second copy is
  rejected.
- ❌ Reading the run while writing into it → the run detection can be corrupted; the run
  version copies from `nums[read]` after the run is measured, which is safe.

**How to narrate:**
> "The array is sorted, so it is a sequence of runs. I walk the runs, and for each run
> I copy at most two of its elements to the output area. Two pointers, one pass, O(1)
> extra space. The same idea can be written as a one-liner: copy a value unless it
> equals the value written two positions back."

## Related Problems

- [Remove Duplicates from Sorted Array](RemoveDuplicatesFromSortedArray.md) — keep one copy
- [Move Zeroes](MoveZeroes.md) — the same compaction
- [String Compression](../strings/StringCompression.md) — run-length encoding
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — two pointers, a different goal
