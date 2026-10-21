---
title: Last Stone Weight II
leetcode: 1049
difficulty: Medium
patterns: [Partition, Subset sum DP, Greedy heap (the wrong answer)]
companies: [Amazon, Meta, Google, Microsoft]
frequency: 4
tags: [dp, knapsack, partition, heap]
sampleInput: |
  5
  31 26 33 21 40
sampleOutput: "5"
---

# Last Stone Weight II — LeetCode 1049

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Partition · Subset sum DP · Greedy heap (the wrong answer) |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Every turn you pick the two heaviest stones and smash them together: the heavier stone
survives with the difference of the two weights (a stone of weight `0` disappears).
Find the **minimum possible weight of the last remaining stone**.

For `[31, 26, 33, 21, 40]` the answer is `5`.

## Input Format

The program reads from standard input:

```
n
stones[0] stones[1] ... stones[n-1]
```

- `n` — the number of stones (1 ≤ n ≤ 30)
- `stones` — n space-separated weights (1 ≤ stones[i] ≤ 100)

## Sample Input

```
5
31 26 33 21 40
```

## Expected Output

```
5
```

## Approach — Smashing is a partition

Every smash subtracts one weight from another, and the two weights end up on **opposite
sides** of a cancellation. So the final weight is

```
|sum of group A − sum of group B|
```

and minimising it means splitting the stones into two groups whose sums are as close as
possible. The answer is therefore

```
total − 2 × best
```

where `best` is the **largest subset sum that does not exceed `total / 2`** (the smaller
group is the one we look for).

`best` is a classic **0/1 subset-sum** problem, solved with a boolean DP:

```
reachable[0] = true
for each stone s:
    for sum from target down to s:
        reachable[sum] |= reachable[sum - s]
```

The loop runs **downwards** so that each stone is used at most once.

### Why the greedy heap is wrong here

The first part of this problem (LeetCode 1049 part 1, "Last Stone Weight") *is* a
max-heap problem: smash the two heaviest, repeat. That greedy is optimal for
"simulate the game", but **not** for "find the best possible outcome" — the greedy
simulation follows one particular sequence of smashes.

The file also implements the greedy (`greedySmash`) so the two can be compared:

| | greedy max-heap | optimal partition |
|---|---|---|
| `[31, 26, 33, 21, 40]` | `9` | **`5`** |

## Dry Run — the optimal partition

Input: `stones = [31, 26, 33, 21, 40]`, `total = 151`, `target = 75`

`reachable` lists the subset sums that are achievable with the stones processed so far.

| Step | stone | `reachable` afterwards | note |
|---:|---:|---|---|
| 0 | — | `{0}` | the empty subset |
| 1 | 31 | `{0, 31}` | 0, 31 |
| 2 | 26 | `{0, 26, 31, 57}` | 26, 57 = 31+26 |
| 3 | 33 | `{0, 26, 31, 33, 57, 59, 64}` | 33, 59 = 26+33, 64 = 31+33 |
| 4 | 21 | `{0, 21, 26, 31, 33, 47, 52, 54, 57, 59, 64}` | 47 = 26+21, 52 = 31+21, 54 = 33+21, … |
| 5 | 40 | `{0, 21, 26, 31, 33, 40, 47, 52, 54, 57, 59, 61, 64, 66, 71, 73}` | 61 = 21+40, 71 = 31+40, 73 = 33+40 |

The largest reachable sum `≤ 75` is `73` (= 33 + 40), so

```
answer = total − 2 × best = 151 − 2 × 73 = 5
```

The two groups are `{33, 40}` (sum 73) and `{31, 26, 21}` (sum 78) — the difference is
`5` ✓

### Dry Run — the greedy max-heap (for comparison)

| Step | heap before | smashed | heap after |
|---:|---|---|---|
| 0 | `[40, 33, 31, 21, 26]` | — | — |
| 1 | `[40, 33, 31, 21, 26]` | 40 & 33 → 7 | `[31, 26, 21, 7]` |
| 2 | `[31, 26, 21, 7]` | 31 & 26 → 5 | `[21, 7, 5]` |
| 3 | `[21, 7, 5]` | 21 & 7 → 14 | `[14, 5]` |
| 4 | `[14, 5]` | 14 & 5 → 9 | `[9]` |

The greedy ends at `9` — it is stuck with the sequence of smashes it chose, while a
different grouping reaches `5`.

## Java Solution

See [`LastStoneWeightII.java`](./LastStoneWeightII.java).

```java
boolean[] reachable = new boolean[target + 1];
reachable[0] = true;
for (int stone : stones) {
    for (int s = target; s >= stone; s--) {
        if (reachable[s - stone]) {
            reachable[s] = true;
        }
    }
}
```

The greedy variant lives next to it:

```java
MaxHeap<Integer> heap = new MaxHeap<>();
for (int stone : stones) { heap.add(stone); }
while (heap.size() > 1) {
    int first = heap.poll();
    int second = heap.poll();
    if (first != second) { heap.add(first - second); }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · total) | the DP table is walked once per stone |
| **Space** | O(total) | the `reachable` array |

`total` is the sum of the weights, so this is a **pseudo-polynomial** algorithm — fine
for the given constraints (total ≤ 3000), but it is exponential in the *bit length* of
the weights. For huge weights you need meet-in-the-middle (O(2^(n/2))) or a bitset
implementation of the same DP.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why is the greedy max-heap not optimal here?"* → the greedy follows one particular
  smash order; a different grouping can do better (`9` vs `5` on the sample).
- *"Can you do it with a bitset?"* → yes: `dp |= dp << stone` packs the whole subset-sum
  table into a `long[]`, which is 64× faster and much smaller.
- *"What if the weights are huge (10⁹) and n is small?"* → meet in the middle: split the
  stones, enumerate the subset sums of each half (2^(n/2)), sort one half and binary
  search the other.
- *"How would you prove the partition equivalence?"* → each smash pairs one stone from
  each side of the final partition; the surviving weight is the difference of the two
  side sums.

**Common mistakes:**
- ❌ Answering with the **greedy** heap simulation → that solves part 1 of the problem,
  not this one.
- ❌ Looping the subset-sum DP **upwards** → the same stone can then be used several
  times, which yields impossible sums.
- ❌ Forgetting the `total − 2 × best` formula and reporting `best` itself.
- ❌ Ignoring the constraint that `best ≤ total / 2` → the DP must only track sums up to
  `target`.

**How to narrate:**
> "Smashing two stones is the same as putting one of them on each side of a partition
> and cancelling them out, so the final weight is the difference of the two group sums.
> I want the two sums as close as possible, so I look for the largest subset sum not
> exceeding half of the total — a 0/1 subset-sum DP over a boolean array, walked
> downwards so each stone is used once. The answer is `total − 2 × best`. The greedy
> max-heap smash is the natural first idea, and it gives 9 instead of 5 here."

## Related Problems

- [Target Sum](../dynamicprogramming/TargetSum.md) — the greedy part-1 version
- [Target Sum](../dynamicprogramming/TargetSum.md) — the same subset-sum DP, different framing
- [Partition Equal Subset Sum](../dynamicprogramming/PartitionEqualSubsetSum.md) — the same DP, boolean answer
- [Top K Frequent Elements](TopKFrequentElements.md) — bounded heap
