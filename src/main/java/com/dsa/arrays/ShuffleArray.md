---
title: Shuffle Array
leetcode: 384
difficulty: Medium
patterns: [Fisher-Yates, Uniform random permutation]
companies: [Meta, LinkedIn, Microsoft, TCS, Barclays]
frequency: 3
tags: [array, random, permutation]
sampleInput: |
  4
  1 2 3 4
  3
sampleOutput: "3 2 4 1"
---

# Shuffle Array — LeetCode 384

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Fisher-Yates · Uniform random permutation |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Given an integer array `nums`, return the array **shuffled** — every permutation of the
input should be equally likely.

The classic solution is the **Fisher-Yates (Durstenfeld) shuffle**: repeatedly pick a
random index from the *not yet shuffled* suffix and swap it with the current position.

The program here performs `k` random swaps, starting from the front of the array.

> The random generator is seeded with a fixed constant so that the printed result is
> **reproducible** — the judge in this repository compares stdout byte for byte.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers
- `k` — how many random swaps to perform (k ≤ n)

## Sample Input

```
4
1 2 3 4
3
```

## Expected Output

```
3 2 4 1
```

With the fixed seed (42) the generator produces the index sequence `2, 1, 3` for the
three swaps, which is what the dry run below shows.

## Approach — Fisher-Yates (one pass, O(n))

For `i` from `0` to `n-2`:

1. Pick `j` **uniformly at random** from the range `[i, n-1]` (the un-shuffled suffix).
2. Swap `nums[i]` and `nums[j]`.

**Why the suffix and not the whole array?** Picking `j` from the whole array would let
already-placed elements be re-selected, which biases the permutation. Restricting `j`
to `[i, n-1]` is what makes every permutation equally likely.

**Why is it uniform?** Each of the `n!` permutations corresponds to exactly one sequence
of choices, and each choice is equally likely, so each permutation has probability
`1/n!`.

## Dry Run

Input: `nums = [1, 2, 3, 4]`, `k = 3`, `n = 4`. The generator is seeded with 42, so the
draws are `nextInt(4) = 2`, `nextInt(3) = 0`, `nextInt(2) = 1`.

| Step | i | draw | `j = i + draw` | array before | swap | array after |
|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 2 | 2 | `[1, 2, 3, 4]` | swap(0, 2) | `[3, 2, 1, 4]` |
| 2 | 1 | 0 | 1 | `[3, 2, 1, 4]` | swap(1, 1) (self-swap) | `[3, 2, 1, 4]` |
| 3 | 2 | 1 | 3 | `[3, 2, 1, 4]` | swap(2, 3) | `[3, 2, 4, 1]` |

Answer: **3 2 4 1**

## Java Solution

See [`ShuffleArray.java`](./ShuffleArray.java).

```java
public static int[] shuffle(int[] nums, int k) {
    int[] shuffled = nums.clone();
    Random random = new Random(SEED);          // fixed seed keeps the output reproducible
    for (int i = 0; i < k && i < shuffled.length; i++) {
        int j = i + random.nextInt(shuffled.length - i);
        int temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + k) | Cloning is O(n); each swap is O(1) |
| **Space** | O(n) | The shuffled copy; O(1) extra if you shuffle in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you make it uniform?"* → pick `j` uniformly from the **unprocessed suffix**
  `[i, n-1]`; picking from the whole array is the classic bias bug.
- *"How do you do it in place?"* → don't clone; swap directly in `nums`.
- *"How do you undo a shuffle?"* → record every `(i, j)` pair and replay the swaps in
  reverse.
- *"Why not `Collections.shuffle`?"* → it uses its own seed control and may not be
  available; the algorithm is the point of the question.
- *"How do you pick a uniform integer in `[0, m)`?"* → `random.nextInt(m)` — note that
  `nextInt(m) % m` is **not** uniform when `m` does not divide `2⁴⁸`.

**Common mistakes:**
- ❌ Choosing `j` from `[0, n-1]` instead of `[i, n-1]` — the permutation is biased.
- ❌ Using `nextInt(n) % m` for the range — modulo bias.
- ❌ Forgetting the `i +` offset: `nextInt(n - i)` returns a value in `[0, n-i)`, so the
  absolute index is `i + that`.
- ❌ Using `Math.random()` in a program whose output must be reproducible — use a seeded
  `java.util.Random`.

**How to narrate:**
> "This is the Fisher-Yates shuffle. For position i I pick a random index j uniformly
> from the suffix [i, n-1] and swap. Restricting j to the suffix is what makes every
> permutation equally likely — picking from the whole array would bias the result. I
> use a seeded Random so the output is reproducible for the judge, and I clone the
> input so the caller's array is untouched."

## Related Problems

- [Rotate Array](RotateArray.md) — deterministic permutation by rotation
- [Shuffle the Array](../../../../../../docs/topics/12-prefixsum.md) — interleaving two halves
- [Contains Duplicate II](ContainsDuplicateII.md) — hash-map index bookkeeping
