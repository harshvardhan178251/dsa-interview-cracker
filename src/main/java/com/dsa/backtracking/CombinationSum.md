---
title: Combination Sum
leetcode: 39
difficulty: Medium
patterns: [Backtracking, DFS with a path]
companies: [Amazon, Google, Meta, Uber]
frequency: 5
tags: [backtracking, arrays, recursion]
sampleInput: |
  4
  2 3 6 7
  7
sampleOutput: |
  2 2 3
  7
---

# Combination Sum — LeetCode 39

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · DFS with a path |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an array of **distinct** positive integers `candidates` and a target `target`, return all possible combinations where the candidate numbers sum to `target`.

- The **same candidate may be chosen an unlimited number of times**.
- The order of the candidates does not matter.

## Input Format

The program reads from standard input:

```
n
candidates[0] candidates[1] ... candidates[n-1]
target
```

- `n` — number of candidates (1 ≤ n ≤ 30)
- `candidates` — n space-separated distinct positive integers
- `target` — the target sum (1 ≤ target ≤ 1000)

## Sample Input

```
4
2 3 6 7
7
```

## Expected Output

```
2 2 3
7
```

The two combinations are `2 + 2 + 3` and `7`. The candidates inside a combination are ascending and the combinations themselves are sorted.

## Approach

The backtracking skeleton of [Subsets](./Subsets.java) with a target and a "remaining sum" instead of a length:

1. If `remaining == 0` the current path is a solution — record it.
2. Otherwise try every candidate from `start` onwards that is not larger than `remaining`.
3. Pick it, subtract its value and recurse **with the same `start` index** — that is what allows    a candidate to be used again.
4. Backtrack: remove the candidate again.

**Two optimisations.**

- Sorting the candidates lets the loop `break` as soon as a candidate is too large — no later   candidate can fit either.
- Keeping the candidates in ascending order means every combination is generated exactly once   (no duplicates), and the printed result is already sorted inside each combination.

## Dry Run

Input: `candidates = [2, 3, 6, 7]`, `target = 7`.

| path | remaining | try | new path | new remaining | result |
|---|---:|---|---|---:|---|
| `[]` | 7 | 2 | `[2]` | 5 | — |
| `[2]` | 5 | 2 | `[2, 2]` | 3 | — |
| `[2, 2]` | 3 | 2 | `[2, 2, 2]` | 1 | — |
| `[2, 2, 2]` | 1 | 2 > 1 → **break** | — | — | — |
| `[2, 2]` | 3 | 3 | `[2, 2, 3]` | 0 | **`[2, 2, 3]`** |
| `[2, 2]` | 3 | 6 > 3 → **break** | — | — | — |
| `[2]` | 5 | 3 | `[2, 3]` | 2 | — |
| `[2, 3]` | 2 | 3 > 2 → **break** | — | — | — |
| `[2]` | 5 | 6 > 5 → **break** | — | — | — |
| `[]` | 7 | 3 | `[3]` | 4 | — |
| `[3]` | 4 | 3 | `[3, 3]` | 1 | — |
| `[3, 3]` | 1 | 3 > 1 → **break** | — | — | — |
| `[3]` | 4 | 6 > 4 → **break** | — | — | — |
| `[]` | 7 | 6 | `[6]` | 1 | — |
| `[6]` | 1 | 6 > 1 → **break** | — | — | — |
| `[]` | 7 | 7 | `[7]` | 0 | **`[7]`** |

**Why `[2, 3, 2]` never appears.** The recursion always continues at the index of the element it just picked, so the candidates inside a combination are non-decreasing — `2, 3, 2` would need the index to go backwards.

**The two recorded combinations** are `[2, 2, 3]` and `[7]`; sorted lexicographically they are printed in exactly that order.

## Java Solution

See [`CombinationSum.java`](./CombinationSum.java).

```java
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
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
| **Time** | O(n^(target / min)) | the recursion tree has `O(n^(target / min))` nodes in the worst case |
| **Space** | O(target / min) | the path holds at most `target / min` candidates |

**Space `O(target / min)`** for the recursion, plus the output. The pruning (`break` as soon as a candidate is too large) is what keeps the tree small in practice.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if every candidate may be used only once?"* → recurse with `i + 1` instead of `i` — that is [Combination Sum II](./CombinationSumII.java).
- "What if the input contains duplicates?"* → sort and skip equal candidates at the same level.
- "How many combinations are there?"* → a counting DP over the remaining sums is `O(n · target)`.
- "Can you return the combinations in a different order?"* → yes, the order of the result list is not part of the contract; the printing sorts them for a stable output.

**Common mistakes:**

- ❌ Recursing with `i + 1` — that forbids reusing a candidate and silently loses solutions.
- ❌ Not checking `remaining == 0` before adding to the path — you would record paths that still miss the target.
- ❌ Forgetting the backtrack, so the next sibling branch starts with a polluted path.

**How to narrate:**

> "I keep the remaining sum instead of a count. At every step I try a candidate that is not larger than the remaining sum, subtract it and recurse **at the same index** — that is what lets a candidate be used again. Because the candidates are sorted I can break out of the loop as soon as one is too large, and the candidates inside every combination come out ascending, so no combination is generated twice."

## Related Problems

- [Combination Sum II — LeetCode 40](./CombinationSumII.java) — no repetition, duplicates allowed
- [Subsets — LeetCode 78](./Subsets.java) — the same skeleton without a target
