---
title: Subsets
leetcode: 78
difficulty: Medium
patterns: [Backtracking, DFS with a path]
companies: [Amazon, Google, Meta, Facebook, JP Morgan, Apple, Pinterest, TCS, Cognizant, Canva]
frequency: 5
tags: [backtracking, arrays, recursion]
sampleInput: |
  3
  1 2 3
sampleOutput: |
  1
  1 2
  1 2 3
  1 3
  2
  2 3
  3
---

# Subsets — LeetCode 78

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · DFS with a path |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an integer array `nums` of **distinct** integers, return all possible **subsets**.

The solution must not contain duplicate subsets.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — number of elements (0 ≤ n ≤ 20)
- `nums` — n space-separated distinct integers

## Sample Input

```
3
1 2 3
```

## Expected Output

```
1
1 2
1 2 3
1 3
2
2 3
3
```

The eight subsets are printed one per line; the elements inside a subset are ascending and the lines are sorted. The **empty subset is not printed** — it would be an empty line.

## Approach

The backtracking skeleton is the same in every "generate all X" problem:

1. **Record** the current state (here: the current path is a subset).
2. **Choose** — pick one of the elements that may still be used.
3. **Explore** — recurse with the element added.
4. **Backtrack** — remove the element again so the next sibling branch starts from the same state.

The `start` index is what makes each subset appear exactly once: after picking `nums[i]` the recursion may only use `nums[i+1 …]`, so the elements keep their relative order and no subset is generated twice.

The input is sorted first, which means the elements inside every subset come out ascending — and that is also the order the output is printed in.

## Dry Run

Input: `nums = [1, 2, 3]`. The table shows the path, the element that is tried and what happens after the recursive call returns.

| depth | path | try | recurse into | backtrack to |
|---:|---|---|---|---|
| 0 | `[]` | `1` | `[1]` | `[]` |
| 1 | `[1]` | `2` | `[1, 2]` | `[1]` |
| 2 | `[1, 2]` | `3` | `[1, 2, 3]` | `[1, 2]` |
| 2 | `[1, 2]` | — (no more elements) | — | `[1]` |
| 1 | `[1]` | `3` | `[1, 3]` | `[1]` |
| 1 | `[1]` | — (no more elements) | — | `[]` |
| 0 | `[]` | `2` | `[2]` | `[]` |
| 1 | `[2]` | `3` | `[2, 3]` | `[2]` |
| 1 | `[2]` | — (no more elements) | — | `[]` |
| 0 | `[]` | `3` | `[3]` | `[]` |
| 1 | `[3]` | — (no more elements) | — | `[]` |

Every node of the tree is one subset — that is the trick of this problem: **the recursion tree *is* the answer**.

**The subsets that were recorded** (in the order the DFS found them): `[]`, `[1]`, `[1, 2]`, `[1, 2, 3]`, `[1, 3]`, `[2]`, `[2, 3]`, `[3]`. Sorted lexicographically (and without the empty subset) they are exactly the seven printed lines.

**Why the `start` index matters.** Without it the DFS would also produce `[2, 1]` — the same set in a different order — and the answer would have 16 entries instead of 8.

## Java Solution

See [`Subsets.java`](./Subsets.java).

```java
    public static List<List<Integer>> subsets(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · 2ⁿ) | the recursion tree has `2ⁿ` nodes and every node copies a path of up to `n` values |
| **Space** | O(n) | the recursion stack is `n` deep, the path holds `n` values |

**Space `O(n)`** apart from the output itself, which holds `2ⁿ` subsets (each up to `n` long) — that is the real cost of this problem.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the input has duplicates?"* → sort first and skip equal elements at the same level (the trick used by [Combination Sum II](./CombinationSumII.java)).
- "How many subsets are there?"* → `2ⁿ` — the answer is the size of the recursion tree.
- "What if only subsets of exactly `k` elements are wanted?"* → add a size check: `path.size() == k`.
- "Print them without the empty subset."* → skip `path.isEmpty()` when recording.

**Common mistakes:**

- ❌ Forgetting to remove the element after the recursive call — the backtrack is what keeps the siblings correct.
- ❌ Using `i + 1` as the next `start` when you want combinations *with* repetition (`Combination Sum` needs `i` instead).
- ❌ Not sorting the input, so the printed subsets are not in ascending order.

**How to narrate:**

> "The recursion tree of this problem *is* the answer: every node is one subset. I keep the current path, record it, then try every element that comes after the last one I picked — the `start` index is what stops the same set from being generated in two different orders. After each recursive call I remove the element again, which is the backtrack."

## Related Problems

- [Combination Sum — LeetCode 39](./CombinationSum.java) — the same skeleton with a target
- [Permutations — LeetCode 46](./Permutations.java) — the same skeleton with a fixed length
