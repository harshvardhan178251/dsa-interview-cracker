---
title: Partition Array Into Maximum Subarrays
leetcode: 813
difficulty: Medium
patterns: [Greedy, Keep the k largest]
companies: [Amazon, Apple, Netflix, HCLTech, Samsung]
frequency: 3
tags: [array, greedy, heap]
sampleInput: |
  5
  1 2 3 4 5
  2
sampleOutput: "9"
---

# Partition Array Into Maximum Subarrays — LeetCode 813

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Keep the k largest |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Split `nums` into **exactly `k`** non-empty contiguous subarrays. The value of a
partition is the sum of the **maximum element of every subarray**. Return the largest
possible value.

```
nums = [1, 2, 3, 4, 5], k = 2
[1, 2, 3, 4] | [5]   ->  4 + 5 = 9      <- best
[1, 2, 3]    | [4, 5] ->  3 + 5 = 8
```

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers
- `k` — number of parts (1 ≤ k ≤ n)

## Sample Input

```
5
1 2 3 4 5
2
```

## Expected Output

```
9
```

`[1, 2, 3, 4] | [5]` gives `4 + 5 = 9`.

## Approach — the answer is the sum of the k largest elements

**Upper bound.** Each of the `k` parts contributes exactly one maximum, so the value of
any partition is the sum of `k` elements of the array — never more than the sum of the
`k` largest elements.

**The bound is reachable.** Take the `k` largest elements at indices
`i₁ < i₂ < … < i_k` and cut the array right before each of them. The `j`-th part then
runs from `i_{j-1}+1` to `i_j`:

- Every element between `i_{j-1}+1` and `i_j` is **at most** `nums[i_j]`. Otherwise a
  strictly larger element would be one of the `k` largest and would sit between two
  selected indices — contradicting that `i_{j-1}` and `i_j` are consecutive.
- The last part runs from `i_{k-1}+1` to the end and its maximum is `nums[i_k]` for the
  same reason.

So `nums[i_j]` really is the maximum of its part, and the partition reaches the upper
bound: **the answer is the sum of the `k` largest elements.**

To compute it, keep a min-heap of size `k` while scanning the array: push every
value, and if the heap grows beyond `k` remove its smallest element. The running sum
is then the sum of the `k` largest values seen so far.

**Exchange argument (why keeping the k largest is safe):** whenever the heap already
holds `k` values and a new value `x` arrives, either `x` is smaller than the smallest
kept value (then it can never be one of the `k` largest — drop it) or it is larger
(replacing the smallest kept value increases the sum and keeps exactly the `k` largest
values). Every decision only ever discards a value that provably cannot be part of the
`k` largest, so the final sum is the maximum possible.

## Dry Run

Input: `nums = [1, 2, 3, 4, 5]`, `k = 2`

| Step | value | heap after push | heap (min first) | running sum | dropped |
|---:|---:|---|---|---:|---|
| 1 | 1 | `[1]` | `{1}` | 1 | — |
| 2 | 2 | `[1, 2]` | `{1, 2}` | 3 | — |
| 3 | 3 | `[1, 2, 3]` → pop 1 | `{2, 3}` | 5 | 1 |
| 4 | 4 | `[2, 3, 4]` → pop 2 | `{3, 4}` | 7 | 2 |
| 5 | 5 | `[3, 4, 5]` → pop 3 | `{4, 5}` | 9 | 3 |

Final sum = **9**, i.e. the two largest values `5` and `4`.

## Java Solution

See [`PartitionArrayToMaximumSum.java`](./PartitionArrayToMaximumSum.java).

```java
public static int maxSumToLength(int[] nums, int k) {
    if (nums.length == 0 || k <= 0) {
        return 0;
    }
    if (k >= nums.length) {
        int all = 0;
        for (int x : nums) {
            all += x;
        }
        return all;
    }
    PriorityQueue<Integer> largest = new PriorityQueue<>();   // min-heap of the k biggest
    int sum = 0;
    for (int x : nums) {
        largest.add(x);
        sum += x;
        if (largest.size() > k) {
            sum -= largest.poll();
        }
    }
    return sum;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | one heap push (and at most one pop) per element |
| **Space** | O(k) | the heap never holds more than `k + 1` values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the parts do not have to be contiguous?"* → the answer is simply the sum of
  the `k` largest values and the heap is overkill; sort instead.
- *"What if each part contributes its **minimum** instead of its maximum?"* → the same
  argument with the `k` smallest values.
- *"What if the value of a part is the sum of its elements?"* → every partition has the
  same value, so the answer is just the total sum.

**Common mistakes:**
- ❌ Assuming the parts may be empty — the statement demands exactly `k` **non-empty**
  parts; with `k == n` every part is a single element.
- ❌ Forgetting the `k >= n` shortcut — the heap would still work, but the special case
  documents the intent.
- ❌ Returning the sum of the `k` largest *without* the reachability argument — the
  interviewer's first question is "can those values really be maxima of their parts?".

**How to narrate:**
> "The value of a partition is the sum of `k` elements, so it can never beat the sum
> of the `k` largest elements. That bound is reachable: cut the array right before
> each of the `k` largest values — everything between two cuts is smaller than the
> value that opens the next cut, otherwise that value would also be among the `k`
> largest. So the answer is the sum of the `k` largest elements, and a min-heap of
> size `k` computes it in one pass."

## Related Problems

- [Hand of Straights](./HandOfStraights.md) — the same "keep the best values" heap idea
- [Maximum Units on a Truck](./MaximumUnitsOnATruck.md) — greedy on sorted values
