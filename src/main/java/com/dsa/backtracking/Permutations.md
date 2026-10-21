---
title: Permutations
leetcode: 46
difficulty: Medium
patterns: [Backtracking, Used array]
companies: [Google, Amazon, Meta, Adobe, JP Morgan, Uber, Stripe]
frequency: 5
tags: [backtracking, arrays, recursion]
sampleInput: |
  3
  1 2 3
sampleOutput: |
  1 2 3
  1 3 2
  2 1 3
  2 3 1
  3 1 2
  3 2 1
---

# Permutations — LeetCode 46

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · Used array |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an array `nums` of **distinct** integers, return all possible **permutations**.

You can return the answer in any order.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — number of elements (1 ≤ n ≤ 6)
- `nums` — n space-separated distinct integers

## Sample Input

```
3
1 2 3
```

## Expected Output

```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

The six permutations, one per line. The order **inside** a permutation is the permutation itself; the lines are sorted lexicographically.

## Approach

The backtracking skeleton again, this time with a **used** array:

1. If the path already contains `n` values, record it — that is a permutation.
2. Otherwise loop over all values and skip the ones that are already used.
3. Mark the value as used, append it to the path and recurse.
4. **Backtrack:** remove it from the path and unmark it.

**Why the `used` array instead of removing the element from the list?** Removing and re-inserting an element costs `O(n)` per step; the `used` array is `O(1)` and never loses the original order of the input.

**Why the result is sorted.** The order of the permutations is part of the answer, so the elements inside a permutation are **not** sorted — only the list of permutations is, which gives the program a stable output.

## Dry Run

Input: `nums = [1, 2, 3]`. The table shows the path, the value that is tried and the state after the backtrack.

| path | used | try | new path | backtrack to |
|---|---|---|---|---|
| `[]` | `{}` | 1 | `[1]` | `[]` |
| `[1]` | `{1}` | 2 | `[1, 2]` | `[1]` |
| `[1, 2]` | `{1,2}` | 3 | `[1, 2, 3]` → **record** | `[1, 2]` |
| `[1, 2]` | `{1,2}` | — (1 and 2 are used) | — | `[1]` |
| `[1]` | `{1}` | 3 | `[1, 3]` | `[1]` |
| `[1, 3]` | `{1,3}` | 2 | `[1, 3, 2]` → **record** | `[1, 3]` |
| `[1]` | `{1}` | — (nothing left) | — | `[]` |
| `[]` | `{}` | 2 | `[2]` | `[]` |
| `[2]` | `{2}` | 1 | `[2, 1]` | `[2]` |
| `[2, 1]` | `{1,2}` | 3 | `[2, 1, 3]` → **record** | `[2, 1]` |
| `[2]` | `{2}` | 3 | `[2, 3]` | `[2]` |
| `[2, 3]` | `{2,3}` | 1 | `[2, 3, 1]` → **record** | `[2, 3]` |
| `[]` | `{}` | 3 | `[3]` | `[]` |
| `[3]` | `{3}` | 1 | `[3, 1]` | `[3]` |
| `[3, 1]` | `{1,3}` | 2 | `[3, 1, 2]` → **record** | `[3, 1]` |
| `[3]` | `{3}` | 2 | `[3, 2]` | `[3]` |
| `[3, 2]` | `{2,3}` | 1 | `[3, 2, 1]` → **record** | `[3, 2]` |

Six permutations were recorded.

**The recorded permutations** (DFS order): `123`, `132`, `213`, `231`, `312`, `321`. They are already lexicographically sorted here because the input was ascending — but the result list is sorted explicitly anyway, so the output does not depend on the input order.

**The number of permutations** is `n!`: 6 for `n = 3`, 120 for `n = 5`.

## Java Solution

See [`Permutations.java`](./Permutations.java).

```java
    public static List<List<Integer>> permutations(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        generate(nums, new boolean[nums.length], new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · n!) | there are `n!` permutations, each copied in `O(n)` |
| **Space** | O(n) | the recursion stack, the path and the used array are `O(n)` |

**Space `O(n)`** apart from the output, which holds `n!` permutations of `n` values — exponential, and that is inherent to the problem.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the input contains duplicates?"* → see [Permutations II](./PermutationsII.java).
- "How many permutations are there?"* → `n!` — the size of the recursion tree.
- "Can you generate the next permutation in `O(n)`?"* → yes, the *next permutation* algorithm (find the pivot, swap, reverse) — `O(n)` per permutation instead of `O(n²)` for backtracking.
- "What is the difference to subsets?"* → a permutation uses **every** element, a subset may leave elements out.

**Common mistakes:**

- ❌ Forgetting to reset `used[i] = false` — the value would stay unavailable for the other branches.
- ❌ Sorting the elements **inside** each permutation — that would destroy the answer.
- ❌ Removing the element from the input list and re-inserting it at the end — the order of the remaining elements changes and the permutations are wrong.

**How to narrate:**

> "At every level I pick a value that is not used yet, mark it, recurse, and then unmark it — that unmarking is the backtrack. A `used` array is better than removing the element from a list because it is `O(1)` and keeps the input order. The order inside a permutation is the answer, so I only sort the list of permutations, never their contents."

## Related Problems

- [Permutations II — LeetCode 47](./PermutationsII.java) — duplicates in the input
- [Subsets — LeetCode 78](./Subsets.java) — the same skeleton without the used array
