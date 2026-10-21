---
title: Combination Sum II
leetcode: 40
difficulty: Medium
patterns: [Backtracking, Duplicate pruning]
companies: [Amazon, Google, Meta]
frequency: 4
tags: [backtracking, arrays, recursion]
sampleInput: |
  7
  10 1 2 7 6 1 5
  8
sampleOutput: |
  1 1 6
  1 2 5
  1 7
  2 6
---

# Combination Sum II — LeetCode 40

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · Duplicate pruning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given a list of positive integers `candidates` (which **may contain duplicates**) and a target `target`, return all possible combinations where the candidate numbers sum to `target`.

- Each candidate may be used **at most once** in a combination.
- The solution set must not contain duplicate combinations.

## Input Format

The program reads from standard input:

```
n
candidates[0] candidates[1] ... candidates[n-1]
target
```

- `n` — number of candidates (1 ≤ n ≤ 30)
- `candidates` — n space-separated positive integers (may repeat)
- `target` — the target sum (1 ≤ target ≤ 30)

## Sample Input

```
7
10 1 2 7 6 1 5
8
```

## Expected Output

```
1 1 6
1 2 5
1 7
2 6
```

The four combinations are `1+1+6`, `1+2+5`, `1+7` and `2+6`. The two `1`s are two different candidates, so `1+1+6` is allowed.

## Approach

The same backtracking skeleton as [Combination Sum](./CombinationSum.java) with two changes:

1. **Recurse at `i + 1`** — the candidate that was just picked is used up.
2. **Skip equal candidates inside one level** — `if (i > start && candidates[i] == candidates[i-1]) continue;`. The first occurrence of a value is always tried; the later ones are skipped. That way `[1, 1, 6]` is produced once and not twice.

**Why the duplicate check uses `i > start`** (and not `i > 0`): the check must only skip duplicates *within the same level*. Two equal values at different levels are two different candidates, and `1 + 1 + 6` is a legal combination.

Sorting first is what makes the rule possible — equal values become neighbours.

## Dry Run

Input: `candidates = [10, 1, 2, 7, 6, 1, 5]`, `target = 8`. Sorted: `[1, 1, 2, 5, 6, 7, 10]`.

| path | remaining | try | new path | result |
|---|---:|---|---|---|
| `[]` | 8 | 1 | `[1]` | — |
| `[1]` | 7 | 1 (the second `1`) | `[1, 1]` | — |
| `[1, 1]` | 6 | 2 | `[1, 1, 2]` | — (2 > 4 later, no completion) |
| `[1, 1]` | 6 | 5 | `[1, 1, 5]` | — (no completion) |
| `[1, 1]` | 6 | 6 | `[1, 1, 6]` | **`[1, 1, 6]`** |
| `[1]` | 7 | 2 | `[1, 2]` | — |
| `[1, 2]` | 5 | 5 | `[1, 2, 5]` | **`[1, 2, 5]`** |
| `[1]` | 7 | 5 | `[1, 5]` | — |
| `[1]` | 7 | 6 | `[1, 6]` | — |
| `[1]` | 7 | 7 | `[1, 7]` | **`[1, 7]`** |
| `[]` | 8 | 2 | `[2]` | — |
| `[2]` | 6 | 5 | `[2, 5]` | — |
| `[2]` | 6 | 6 | `[2, 6]` | **`[2, 6]`** |
| `[]` | 8 | 5 | `[5]` | — |
| `[]` | 8 | 6 | `[6]` | — |
| `[]` | 8 | 7 | `[7]` | — |
| `[]` | 8 | 10 | 10 > 8 → **break** | — |

**The second `1` at the top level is skipped** — the rule `i > start && candidates[i] == candidates[i-1]` fires for `i = 1` at the root, so the branch that starts with the second `1` never runs. The `1` that *is* used inside `[1, 1, 6]` is at a deeper level, where the rule does not apply.

**The four recorded combinations** — `[1, 1, 6]`, `[1, 2, 5]`, `[1, 7]`, `[2, 6]` — are already in the printed order.

## Java Solution

See [`CombinationSumII.java`](./CombinationSumII.java).

```java
    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
        int[] sorted = candidates.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, target, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · 2ⁿ) | at most `2ⁿ` subsets are explored, each in `O(n)` |
| **Space** | O(n) | the recursion stack and the path hold at most `n` values |

**Space `O(n)`** apart from the output. The duplicate pruning usually cuts the tree by a factor of the number of repeated values.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if a candidate may be used at most `k` times?"* → add a counter to the recursion state.
- "How do I avoid the duplicates?"* → sort and skip equal values at the same level (the rule above).
- "What is the difference to Combination Sum?"* → there the recursion continues at the same index (repetition allowed), here at `i + 1`.
- "Can you count the combinations instead of listing them?"* → a DP over the remaining sums.

**Common mistakes:**

- ❌ Skipping duplicates with `i > 0` instead of `i > start` — that removes the legal combination `[1, 1, 6]`.
- ❌ Recursing at `i` instead of `i + 1` — that would use a candidate twice.
- ❌ Not sorting the candidates first — the duplicate rule only works on neighbours.

**How to narrate:**

> "This is Combination Sum with two changes: I recurse at `i + 1` because a candidate may be used only once, and I sort the input so that equal values are neighbours. Inside one recursion level I skip a candidate when it equals the previous one — the check is `i > start`, not `i > 0`, so two equal values at different levels can still both be used."

## Related Problems

- [Combination Sum — LeetCode 39](./CombinationSum.java) — repetition allowed
- [Subsets — LeetCode 78](./Subsets.java) — the same duplicate-pruning rule
