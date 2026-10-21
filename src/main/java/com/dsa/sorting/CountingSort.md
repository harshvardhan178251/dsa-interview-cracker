---
title: Counting Sort
leetcode: null
difficulty: Medium
patterns: [Non-comparison sort, Frequency counting]
companies: [Meta, Adobe]
frequency: 3
tags: [sorting, counting-sort, non-comparison-sort]
sampleInput: |
  7
  4 2 2 8 3 3 1
sampleOutput: "1 2 2 3 3 4 8"
---

# Counting Sort

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Non-comparison sort · Frequency counting |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Sort an array of integers in ascending order using **counting sort** and print the
result.

- Counting sort does **not** compare elements — it counts how often each value
  occurs.
- Print the sorted array as space-separated integers on one line.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — the length of the array (0 ≤ n ≤ 10⁴).
- `nums` — n space-separated integers.

## Sample Input

```
7
4 2 2 8 3 3 1
```

## Expected Output

```
1 2 2 3 3 4 8
```

## Approach — Count, then write out

1. Find the smallest and the largest value; the **range** `max - min + 1` is the
   number of buckets.
2. Count how often each value occurs into a frequency array, indexed by
   `value - min` (the offset keeps negative values working).
3. Walk the frequency array from left to right and write each value as often as it
   was counted.

**Why this beats the comparison sorts:** there are no comparisons at all, so the cost
is driven by the value *range*, not by the number of elements. If the range is
O(n), counting sort runs in **O(n)** — impossible for a comparison sort.

**The catch:** the frequency array uses O(k) space where k is the range. Sorting
`[1, 1000000]` with counting sort would allocate a million buckets for two numbers —
that is why bucket sort and radix sort exist.

## Dry Run

Input: `nums = [4, 2, 2, 8, 3, 3, 1]`

`min = 1`, `max = 8` → the frequency array has `8 - 1 + 1 = 8` buckets, where bucket
`b` counts the value `b + 1`.

### Phase 1 — count the occurrences

| Step | value | bucket = value − min | frequency array after |
|---:|---:|---:|---|
| 1 | 4 | 3 | `[0, 0, 0, 1, 0, 0, 0, 0]` |
| 2 | 2 | 1 | `[0, 1, 0, 1, 0, 0, 0, 0]` |
| 3 | 2 | 1 | `[0, 2, 0, 1, 0, 0, 0, 0]` |
| 4 | 8 | 7 | `[0, 2, 0, 1, 0, 0, 0, 1]` |
| 5 | 3 | 2 | `[0, 2, 1, 1, 0, 0, 0, 1]` |
| 6 | 3 | 2 | `[0, 2, 2, 1, 0, 0, 0, 1]` |
| 7 | 1 | 0 | `[1, 2, 2, 1, 0, 0, 0, 1]` |

### Phase 2 — write the values out

| Step | bucket | value | copies left | written | result so far |
|---:|---:|---:|---:|---|---|
| 1 | 0 | 1 | 1 | `1` | `1` |
| 2 | 1 | 2 | 2 | `2` | `1 2` |
| 3 | 1 | 2 | 1 | `2` | `1 2 2` |
| 4 | 2 | 3 | 2 | `3` | `1 2 2 3` |
| 5 | 2 | 3 | 1 | `3` | `1 2 2 3 3` |
| 6 | 3 | 4 | 1 | `4` | `1 2 2 3 3 4` |
| 7 | 4 | 5 | 0 | — | `1 2 2 3 3 4` |
| 8 | 5 | 6 | 0 | — | `1 2 2 3 3 4` |
| 9 | 6 | 7 | 0 | — | `1 2 2 3 3 4` |
| 10 | 7 | 8 | 1 | `8` | `1 2 2 3 3 4 8` |

Final array: **`[1, 2, 2, 3, 3, 4, 8]`**

## Java Solution

See [`CountingSort.java`](./CountingSort.java).

```java
public static int[] countingSort(int[] nums) {
    if (nums.length == 0) {
        return nums;
    }
    int min = nums[0];
    int max = nums[0];
    for (int num : nums) {
        min = Math.min(min, num);
        max = Math.max(max, num);
    }
    int[] counts = new int[max - min + 1];
    for (int num : nums) {
        counts[num - min]++;
    }
    int[] result = new int[nums.length];
    int index = 0;
    for (int bucket = 0; bucket < counts.length; bucket++) {
        while (counts[bucket] > 0) {
            result[index++] = bucket + min;
            counts[bucket]--;
        }
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + k) | n increments plus a walk over the k buckets |
| **Space** | O(k) | The frequency array, where k = max − min + 1 |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the range is huge?"* → use **bucket sort** (distribute into buckets and
  sort each bucket) or **radix sort** (sort digit by digit) — both avoid allocating
  one slot per possible value.
- *"Can you make it stable?"* → yes: instead of counting down, accumulate the
  prefix sums and place the elements from right to left (this is exactly what
  [Sort a Hand of Cards](../../../../../../docs/topics/08-sorting.md) does).
- *"What about floating point values?"* → not directly — the range is not integral.
  Use a radix sort on the bit representation, or bucket by the integer part.
- *"Counting sort vs. hash sort?"* → counting sort is O(n + k) and needs a bounded
  key space; hash sort is O(n log n) with no restriction on the keys.

**Common mistakes:**
- ❌ Forgetting the **`- min` offset** → negative values cause an
  `ArrayIndexOutOfBoundsException`.
- ❌ Using the **maximum value** as the array size → a single huge value allocates a
  gigantic array; the *range* is what matters.
- ❌ Forgetting that the count array is **mutated** while writing the output.
- ❌ Claiming counting sort is always O(n) → it is O(n + k); with a huge range it is
  worse than a comparison sort.

**How to narrate:**
> "Counting sort doesn't compare anything. I find the min and max, allocate a
> frequency array of size max-min+1, count how often each value occurs, and then walk
> the frequency array from left to right writing each value out as many times as it
> was counted. It's O(n + k) where k is the value range, so it beats every comparison
> sort when the range is small — but it needs O(k) space, which is why you'd reach
> for radix sort instead when the range is huge."

## Related Problems

- [Sort a Hand of Cards](../../../../../../docs/topics/08-sorting.md) — a stable counting sort used as a radix pass
- [Bucket Sort](../../../../../../docs/topics/08-sorting.md) — the answer when the range is huge
- [Merge Sort](../../../../../../docs/topics/08-sorting.md) — the O(n log n) comparison sort to fall back on
