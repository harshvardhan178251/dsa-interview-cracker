---
title: Permutations II
leetcode: 47
difficulty: Medium
patterns: [Backtracking, Duplicate pruning]
companies: [Google, Amazon, Airbnb, Uber, Intel, Wipro, Capgemini, Siemens]
frequency: 4
tags: [backtracking, arrays, recursion]
sampleInput: |
  3
  1 1 2
sampleOutput: |
  1 1 2
  1 2 1
  2 1 1
---

# Permutations II — LeetCode 47

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · Duplicate pruning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given a collection of numbers that might contain duplicates, return **all possible unique permutations**.

The same permutation may not be returned twice.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — number of elements (1 ≤ n ≤ 8)
- `nums` — n space-separated integers (may repeat)

## Sample Input

```
3
1 1 2
```

## Expected Output

```
1 1 2
1 2 1
2 1 1
```

The three distinct permutations of `[1, 1, 2]`. Identical permutations are printed only once.

## Approach

The [Permutations](./Permutations.java) skeleton with one extra rule that removes the duplicates:

> Skip `nums[i]` when `nums[i] == nums[i-1]` **and `nums[i-1]` has not been used yet**.

**Why that rule works.** The equal values are sorted next to each other. If the earlier one has not been picked yet, then picking the later one would create the same permutation in a different order of choosing — so the later one is skipped. As soon as the earlier one *has* been used, the later one becomes available again, which is exactly what is needed for `1, 1, 2` to produce both `1 1 2` and `1 2 1`.

The number of results is `n! / (f₁! · f₂! · …)` where `fᵢ` are the frequencies of the values — for `[1, 1, 2]` that is `6 / 2 = 3`.

## Dry Run

Input: `nums = [1, 1, 2]` (already sorted). `used` is shown as a set of indices.

| path | used | try | new path | backtrack to |
|---|---|---|---|---|
| `[]` | `{}` | `1` (index 0) | `[1]` | `[]` |
| `[1]` | `{0}` | `1` (index 1) | `[1, 1]` | `[1]` |
| `[1, 1]` | `{0,1}` | `2` (index 2) | `[1, 1, 2]` → **record** | `[1, 1]` |
| `[1]` | `{0}` | `1` (index 1) | `[1, 1]` | `[1]` |
| `[1, 1]` | `{0,1}` | `2` (index 2) | `[1, 1, 2]` → **record** | `[1, 1]` |
| `[1]` | `{0}` | `2` (index 2) | `[1, 2]` | `[1]` |
| `[1, 2]` | `{0,2}` | `1` (index 1) | `[1, 2, 1]` → **record** | `[1, 2]` |
| `[]` | `{}` | `1` (index 1) | **skipped** — index 0 is equal and unused | — |
| `[]` | `{}` | `2` (index 2) | `[2]` | `[]` |
| `[2]` | `{2}` | `1` (index 0) | `[2, 1]` | `[2]` |
| `[2, 1]` | `{0,2}` | `1` (index 1) | `[2, 1, 1]` → **record** | `[2, 1]` |

Three permutations were recorded — the duplicate `1, 1, 2` never appears twice.

**Reading the skip.** At the root the values are `[1(0), 1(1), 2(2)]`. The first `1` (index 0) is tried; the second `1` (index 1) is skipped because `nums[1] == nums[0]` and index 0 is not used yet. Inside the branch that already used index 0, index 1 becomes available again — that is how `1 1 2` and `1 2 1` are both produced.

**The three results** are `1 1 2`, `1 2 1` and `2 1 1` — exactly `3! / 2! = 3` permutations.

## Java Solution

See [`PermutationsII.java`](./PermutationsII.java).

```java
    public static List<List<Integer>> permutationsUnique(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, new boolean[sorted.length], new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · n!) | the recursion tree is pruned to `n! / (f₁! · f₂! · …)` leaves, each copied in `O(n)` |
| **Space** | O(n) | the recursion stack, the path and the used array are `O(n)` |

**Space `O(n)`** apart from the output.

## Interview Notes

**Follow-ups to raise yourself:**

- "Why does the rule use `!used[i-1]` instead of `used[i-1]`?"* → the earlier copy must be used **before** the later one may be picked, otherwise `1 1 2` and `1 2 1` would both come from the same branch.
- "What if the duplicates are not adjacent?"* → sort first; the rule only works on neighbours.
- "How many permutations are there?"* → `n! / (f₁! · f₂! · …)`.
- "Can you do it with a multiset instead of a used array?"* → yes, with a map of value → count.

**Common mistakes:**

- ❌ Using `used[i-1]` instead of `!used[i-1]` in the duplicate rule — that loses permutations.
- ❌ Not sorting the input — the rule only works when equal values are neighbours.
- ❌ Sorting the elements inside each permutation — that destroys the answer.

**How to narrate:**

> "This is the permutation skeleton with one extra rule. I sort the input first so equal values are neighbours, and then I skip a duplicate when the previous equal value has not been used yet. That way the copies are always taken in index order, so the same permutation cannot be built twice, while `1 1 2` still produces both `1 1 2` and `1 2 1`."

## Related Problems

- [Permutations — LeetCode 46](./Permutations.java) — the version without duplicates
- [Combination Sum II — LeetCode 40](./CombinationSumII.java) — the same duplicate rule
